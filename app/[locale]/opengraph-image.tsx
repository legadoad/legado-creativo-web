import { readFile } from "node:fs/promises";
import { join } from "node:path";
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

export default async function Image() {
  // Same logo file used in the navbar (components/header.tsx), embedded as a
  // data URI since ImageResponse can't resolve relative public/ paths.
  const logo = await readFile(
    join(process.cwd(), "public", "Logos", "LEGADO_Logotipo-06.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={760} height={176} alt="" />
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            fontWeight: 600,
            color: BRAND.navy,
            letterSpacing: 1,
          }}
        >
          Digital &amp; Marketing Agency
        </div>
      </div>
    ),
    { ...size },
  );
}
