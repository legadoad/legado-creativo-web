// Server-side verification for Cloudflare Turnstile — the client widget
// (components/contact-form.tsx) only proves a token exists; this is what
// actually confirms it with Cloudflare before we trust the submission.
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // No secret configured yet (e.g. mid-rollout, per .env.local.example) —
  // don't hard-block real visitors on a feature that isn't wired up. Once
  // TURNSTILE_SECRET_KEY is set in the environment this branch stops
  // applying and verification becomes mandatory.
  if (!secretKey) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification. Set it to enforce bot protection.",
    );
    return true;
  }

  try {
    const body = new URLSearchParams({ secret: secretKey, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      console.error("[turnstile] verify request failed:", res.status);
      return false;
    }

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[turnstile] verification failed:", data["error-codes"]);
    }
    return data.success;
  } catch (error) {
    console.error("[turnstile] verify request threw:", error);
    return false;
  }
}
