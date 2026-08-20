import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";
import ContactEmail from "@/emails/contact-email";
import ContactConfirmationEmail from "@/emails/contact-confirmation-email";

// The Resend SDK throws immediately if constructed without a key — lazy,
// so its absence doesn't crash the build or module load, only an actual
// send attempt (guarded below) before RESEND_API_KEY is set.
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "vickyurbaneja@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Legado Creativo <contact@legadocreativo.com>";

// Best-effort in-memory rate limit — resets whenever the serverless
// instance recycles, and isn't shared across instances, so it's a
// deterrent against a single abusive client hammering the endpoint, not a
// substitute for Turnstile (which is the real bot defense here).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, company, service, message, website, turnstileToken, locale } =
    parsed.data;

  // Honeypot tripped — a bot filled a field real visitors never see. Return
  // success without actually sending, so the bot has no signal to adapt to.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const isHuman = await verifyTurnstileToken(turnstileToken, ip);
  if (!isHuman) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set — cannot send email.");
    return NextResponse.json(
      { error: "The contact form isn't fully configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const resend = getResendClient();

  // The lead notification (to the business) is the critical email — if
  // this fails, the request fails, since that's the entire point of the
  // form. The visitor confirmation below is a nice-to-have on top.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name} — ${service}`,
      react: ContactEmail({
        name,
        email,
        company,
        service,
        message,
        submittedAt: new Date().toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "America/New_York",
        }),
      }),
    });

    if (error) {
      console.error("[contact] Resend error (lead notification):", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] failed to send lead notification:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 500 },
    );
  }

  // Best-effort — the lead notification above already succeeded, so the
  // submission is a success regardless of whether this confirmation gets
  // through. A visitor not getting a "we got it!" email is a much smaller
  // problem than the lead itself failing to reach the business.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject:
        locale === "es" ? "Recibimos tu mensaje — Legado Creativo" : "We got your message — Legado Creativo",
      react: ContactConfirmationEmail({ name, locale }),
    });
    if (error) {
      console.error("[contact] Resend error (visitor confirmation):", error);
    }
  } catch (error) {
    console.error("[contact] failed to send visitor confirmation:", error);
  }

  return NextResponse.json({ ok: true });
}
