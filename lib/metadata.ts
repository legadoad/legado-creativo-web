// Next.js does NOT deep-merge `openGraph`/`twitter` objects across the
// layout → page chain — whichever segment defines them last wins outright.
// Since every page defines its own (for locale-correct title/description),
// each one needs to re-include the social image explicitly, or it silently
// disappears from that page's card. Centralized here so every page builds
// the same URLs the same way.
export function socialImages(locale: string) {
  return {
    openGraph: [`/${locale}/opengraph-image`],
    twitter: [`/${locale}/twitter-image`],
  };
}
