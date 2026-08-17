import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OurWorkHero from "@/components/our-work-hero";
import OurWorkStats from "@/components/our-work-stats";
import OurWorkBrands from "@/components/our-work-brands";
import OurWorkJourney from "@/components/our-work-journey";
import OurWorkProof from "@/components/our-work-proof";
import CTA from "@/components/cta";
import VideoBanner from "@/components/video-banner";

export const metadata = {
  title: "Our Work | Legado Creativo",
  description:
    "The story behind Legado Creativo: our founder's journey, our milestones, and the brands we've partnered with.",
};

export default async function OurWorkPage() {
  const t = await getTranslations("cta");

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <OurWorkHero />
      <VideoBanner />

      <OurWorkJourney />
      <OurWorkProof />
      <OurWorkBrands />

      <CTA
        bg="bg-[var(--secondary-magenta)]"
        label={t("label")}
        title={t("title")}
        highlightWord={t("highlightWord")}
        strokeVariant="oval"
        buttonText={t("buttonText")}
        href="/contact"
      />
      <Footer />
    </main>
  );
}
