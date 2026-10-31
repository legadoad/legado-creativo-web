import type React from "react";
import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import MotionProvider from "@/components/motion-provider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const lemonMilk = localFont({
  variable: "--font-lemon-milk",
  src: [
    { path: "../../public/fonts/LEMONMILK-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/LEMONMILK-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-RegularItalic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/LEMONMILK-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/LEMONMILK-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/LEMONMILK-BoldItalic.otf", weight: "700", style: "italic" },
  ],
});

// Without this, Next.js can't know the [locale] segment's possible values at
// build time and falls back to rendering every page on-demand per request
// instead of serving pre-built static HTML from the CDN.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://legadocreativo.com";
const SITE_NAME = "Legado Creativo";
const DEFAULT_TITLE = "Legado Creativo - Web & Graphic Design";
const DEFAULT_DESCRIPTION =
  "Stunning web design and graphic design solutions that elevate your brand. We create modern, impactful digital experiences.";

// Site-wide defaults. Individual pages override title/description (and can
// override openGraph/twitter too) via their own generateMetadata — see
// about/contact/services/our-work/privacy/terms for the pattern.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  // Tells next-intl which locale is being rendered so getMessages()/
  // getTranslations() below (and in child Server Components) can read it
  // from a request-scoped cache instead of falling back to headers() —
  // that fallback is what forces a route into on-demand dynamic rendering.
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();
  const tA = await getTranslations("a11y");

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${lemonMilk.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-secondary-blue-ink focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          {tA("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
