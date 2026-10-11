// Server-only. Keeps the Instagram long-lived token alive.
//
// Instagram tokens last 60 days and can be refreshed (for another 60) any time
// after they're 24h old and before they expire. Vercel env vars can't be changed
// at runtime, so the refreshed token is stored in a Vercel Edge Config and read
// back from there. INSTAGRAM_ACCESS_TOKEN stays the seed/fallback: if you paste a
// new one, it takes over automatically (see getInstagramAccessToken).
//
// Edge Config is accessed over its REST API, so no extra npm dependency:
//   reads  -> EDGE_CONFIG (connection string Vercel adds when the store is connected)
//   writes -> VERCEL_API_TOKEN (+ VERCEL_TEAM_ID if the project belongs to a team)

const EDGE_CONFIG_KEY = "instagramToken";

interface StoredToken {
  token: string;
  // The INSTAGRAM_ACCESS_TOKEN this token was refreshed from. If the env var no
  // longer matches, someone pasted a new token and the stored one is stale.
  envToken: string;
  refreshedAt: string;
}

function parseEdgeConfig(): { id: string; readToken: string } | null {
  const connection = process.env.EDGE_CONFIG;
  if (!connection) return null;
  try {
    const url = new URL(connection);
    const id = url.pathname.replace(/^\//, "");
    const readToken = url.searchParams.get("token");
    return id && readToken ? { id, readToken } : null;
  } catch {
    return null;
  }
}

async function readStoredToken(): Promise<StoredToken | null> {
  const edge = parseEdgeConfig();
  if (!edge) return null;

  try {
    const res = await fetch(
      `https://edge-config.vercel.com/${edge.id}/item/${EDGE_CONFIG_KEY}?token=${edge.readToken}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const value = (await res.json()) as Partial<StoredToken> | null;
    return value?.token && value.envToken ? (value as StoredToken) : null;
  } catch (error) {
    console.error("[instagram-token] failed to read Edge Config:", error);
    return null;
  }
}

// The token the feed should use right now.
export async function getInstagramAccessToken(): Promise<string | undefined> {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!envToken) return undefined;

  const stored = await readStoredToken();
  return stored && stored.envToken === envToken ? stored.token : envToken;
}

export function canPersistInstagramToken(): boolean {
  return Boolean(parseEdgeConfig() && process.env.VERCEL_API_TOKEN);
}

export async function persistInstagramToken(token: string): Promise<void> {
  const edge = parseEdgeConfig();
  const apiToken = process.env.VERCEL_API_TOKEN;
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!edge || !apiToken || !envToken) {
    throw new Error("Edge Config (EDGE_CONFIG) or VERCEL_API_TOKEN is not configured.");
  }

  const team = process.env.VERCEL_TEAM_ID;
  const value: StoredToken = { token, envToken, refreshedAt: new Date().toISOString() };

  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${edge.id}/items${team ? `?teamId=${team}` : ""}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [{ operation: "upsert", key: EDGE_CONFIG_KEY, value }] }),
    },
  );

  if (!res.ok) {
    throw new Error(`Edge Config write failed (${res.status}): ${await res.text()}`);
  }
}

// Exchanges a still-valid long-lived token for a fresh one (another 60 days).
export async function refreshInstagramToken(
  currentToken: string,
): Promise<{ token: string; expiresInDays: number }> {
  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`,
    { cache: "no-store" },
  );
  const data = await res.json();

  if (!res.ok || !data?.access_token) {
    throw new Error(`Instagram refresh failed (${res.status}): ${JSON.stringify(data?.error ?? data)}`);
  }

  return {
    token: data.access_token as string,
    expiresInDays: Math.round(Number(data.expires_in) / 86400),
  };
}
