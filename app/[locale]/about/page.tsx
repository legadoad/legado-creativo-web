import { getTranslations, setRequestLocale } from "next-intl/server";
import { socialImages } from "@/lib/metadata";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AboutPageHero from "@/components/about-page-hero";
import AboutStory from "@/components/about-story";
import AboutWhoWeAre from "@/components/about-who-we-are";
import AboutTimeline from "@/components/about-timeline";
import AboutValues from "@/components/about-values";
import CTA from "@/components/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutCta");

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutPageHero />
      <AboutStory />
      <AboutWhoWeAre />
      <AboutTimeline />
      <AboutValues />
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
