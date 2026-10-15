import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  canPersistInstagramToken,
  getInstagramAccessToken,
  persistInstagramToken,
  refreshInstagramToken,
} from "@/lib/instagram-token";

// Called by Vercel Cron (see vercel.json). Vercel sends
// `Authorization: Bearer $CRON_SECRET` automatically when CRON_SECRET is set,
// which also keeps anyone else from triggering this endpoint.
export const dynamic = "force-dynamic";

const ALERT_TO = process.env.CONTACT_TO_EMAIL || "info@legadocreativo.com";
const ALERT_FROM =
  process.env.CONTACT_FROM_EMAIL || "Legado Creativo <contact@legadocreativo.com>";

// A silently dead token is what takes the feed down, so a failed refresh
// emails the owner while there's still time (the token lives 60 days and we
// retry twice a month).
async function sendFailureAlert(reason: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: "Action needed: Instagram token refresh failed",
      text:
        "The automatic renewal of the Instagram access token for legadocreativo.com failed.\n\n" +
        `Reason: ${reason}\n\n` +
        "If this keeps happening, generate a new token (Meta for Developers > your app > Instagram > " +
        "API setup with Instagram login > Generate token) and update INSTAGRAM_ACCESS_TOKEN in Vercel, then redeploy. " +
        "Until then the home page shows sample posts once the current token expires.",
    });
  } catch (error) {
    console.error("[instagram-token] failed to send alert email:", error);
  }
}

async function fail(reason: string, status: number) {
  console.error("[instagram-token]", reason);
  await sendFailureAlert(reason);
  return NextResponse.json({ ok: false, error: reason }, { status });
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check storage before refreshing: if Instagram issues a new token string
  // and we can't save it, the next run would be working from a stale one.
  if (!canPersistInstagramToken()) {
    return fail(
      "Edge Config is not set up (EDGE_CONFIG and VERCEL_API_TOKEN are required to store the renewed token).",
      500,
    );
  }

  const current = await getInstagramAccessToken();
  if (!current) {
    return fail("INSTAGRAM_ACCESS_TOKEN is not set.", 500);
  }

  try {
    const { token, expiresInDays } = await refreshInstagramToken(current);
    await persistInstagramToken(token);
    console.log(`[instagram-token] refreshed, valid for ~${expiresInDays} more days.`);
    return NextResponse.json({ ok: true, expiresInDays });
  } catch (error) {
    return fail(error instanceof Error ? error.message : String(error), 502);
  }
}
