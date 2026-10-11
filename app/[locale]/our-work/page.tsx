import { getTranslations, setRequestLocale } from "next-intl/server";
import { socialImages } from "@/lib/metadata";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OurWorkStats from "@/components/our-work-stats";
import OurWorkBrands from "@/components/our-work-brands";
import OurWorkJourney from "@/components/our-work-journey";
import OurWorkProof from "@/components/our-work-proof";
import CTA from "@/components/cta";
import VideoBanner from "@/components/video-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.ourWork" });
  const title = t("title");
  const description = t("description");
  const images = socialImages(locale);
  return {
    title,
    description,
    openGraph: { title, description, images: images.openGraph },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.twitter,
    },
  };
}

export default async function OurWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cta");

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none min-h-screen bg-background overflow-x-hidden">
      <Header />
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
