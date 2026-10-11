import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";
import { BRAND } from "@/lib/brand-colors";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Metadata image routes inside a dynamic segment don't automatically
// inherit the layout's generateStaticParams — without this, Next can't
// resolve a concrete /en or /es path at build time and falls back to
// rendering it on-demand at a placeholder "/-/opengraph-image" URL.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Two-tone wordmark colors, matching public/Logos/LEGADO_Logotipo-06.png,
// which is itself designed for a plain white background — reproducing that
// here (rather than the lime/blue split) avoids the light half of the
// wordmark blending into a same-toned background.
const WORDMARK_DARK = BRAND.blueDeep;
const WORDMARK_LIGHT = BRAND.blue;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.white,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span
            style={{
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: 2,
              color: WORDMARK_DARK,
            }}
          >
            LEGA
          </span>
          <span
            style={{
              fontSize: 108,
              fontWeight: 800,
              letterSpacing: 2,
              color: WORDMARK_LIGHT,
            }}
          >
            DO
          </span>
        </div>
        <span
          style={{
            marginTop: 4,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 10,
            color: WORDMARK_LIGHT,
          }}
        >
          CREATIVO
        </span>
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            fontWeight: 600,
            color: BRAND.navy,
            letterSpacing: 1,
          }}
        >
          Web &amp; Graphic Design Agency
        </div>
      </div>
    ),
    { ...size },
  );
}
