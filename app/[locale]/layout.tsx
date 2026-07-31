import type React from "react";
import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
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

export const metadata: Metadata = {
  title: "Legado Creativo - Web & Graphic Design",
  description:
    "Stunning web design and graphic design solutions that elevate your brand. We create modern, impactful digital experiences.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon/favicon.png",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${lemonMilk.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
