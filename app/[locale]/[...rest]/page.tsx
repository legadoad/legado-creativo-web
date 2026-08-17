import { notFound } from "next/navigation";

// Catches any path under a valid locale that doesn't match a real page
// (e.g. /en/nonexistent). Without this, such a path fails to match any
// route at all and falls straight to the root app/not-found.tsx, bypassing
// app/[locale]/not-found.tsx's branded, translated version — calling
// notFound() here from inside a route that DOES match lets that nested
// boundary render instead.
export default function CatchAll(): never {
  notFound();
}
