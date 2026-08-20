import { z } from "zod";

// Shared between the client form (components/contact-form.tsx) and the API
// route (app/api/contact/route.ts) so both validate the exact same rules —
// client-side validation is only ever a UX nicety, the server re-validates
// everything regardless of what the client sent.
export const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().min(1).max(200).email(),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(5000),
  // Honeypot — a real visitor never sees or fills this field (hidden off
  // screen); a bot that fills every input in the DOM will. Deliberately
  // unconstrained: rejecting a filled value here at the schema level would
  // return a 400 that tips a bot off it was caught. Instead the route
  // checks this *after* validation passes and fakes a normal success
  // response without sending anything — see app/api/contact/route.ts.
  website: z.string().max(500).optional().or(z.literal("")),
  // Cloudflare Turnstile response token, verified server-side.
  turnstileToken: z.string().min(1, "Please complete the verification"),
  // Which locale the visitor was on when they submitted — determines the
  // language of the confirmation email (emails/contact-confirmation-email.tsx).
  // Keep in sync with i18n/routing.ts's `locales`.
  locale: z.enum(["en", "es"]).default("en"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
