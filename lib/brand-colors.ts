// Hex mirror of the design tokens in app/globals.css, for places that can't
// read CSS variables (react-email templates, next/og ImageResponse).
// Keep in sync by hand if the palette in globals.css changes.
export const BRAND = {
  lime: "#e0feae", // --secondary-lime
  blue: "#7a95d8", // --secondary-blue
  magenta: "#edb7fc", // --secondary-magenta
  navy: "#0a1a3f", // --brand-navy
  blueDeep: "#1d4fd8", // --brand-blue-deep
  mutedSoft: "#5b6472", // --muted-soft
  border: "#e3e5e6", // --input
  background: "#f7f8fa", // --background
  card: "#f1f2f3", // --card
  white: "#ffffff",
} as const;
