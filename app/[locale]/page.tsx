"use client";
import Header from "@/components/header";
import Hero from "@/components/hero";
import LogoMarquee from "@/components/logo-marquee";
import Works from "@/components/works";
import ServicesOrbit from "@/components/services-orbit";
import GalleryMarquee from "@/components/gallery-marquee";
import About from "@/components/about";
import VideoBanner from "@/components/video-banner";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <LogoMarquee />
      <Works />
      <ServicesOrbit />
      {/* <GalleryMarquee /> */}
      <About />
      <VideoBanner />
      <CTA bg="bg-[#E4E7F7]" />
      <Footer />
    </main>
  );
}
