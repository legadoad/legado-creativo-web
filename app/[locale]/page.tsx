"use client";
import { useTranslations } from "next-intl";
import Header from "@/components/header";
import Hero from "@/components/hero";
import LogoMarquee from "@/components/logo-marquee";
import Works from "@/components/works";
import GalleryMarquee from "@/components/gallery-marquee";
import About from "@/components/about";
import VideoBanner from "@/components/video-banner";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  const t = useTranslations("cta");

  return (
    <main className="bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <LogoMarquee />
      <Works />
      {/* <GalleryMarquee /> */}
      <About />
      <VideoBanner />
      <CTA
        bg="bg-secondary-lime"
        label={t("label")}
        title={t("title")}
        highlightWord={t("highlightWord")}
        buttonText={t("buttonText")}
        textColor="text-secondary-blue"
        buttonTextColor="text-secondary-lime"
        buttonBg="bg-secondary-blue"
      />
      <Footer />
    </main>
  );
}
