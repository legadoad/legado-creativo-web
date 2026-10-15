import { getTranslations, setRequestLocale } from "next-intl/server";
import { socialImages } from "@/lib/metadata";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesPageHero from "@/components/services-page-hero";
import ServicesStatement from "@/components/services-statement";
import ServicesGrid from "@/components/services-grid";
import ServicesProcess from "@/components/services-process";
import ServicesFaq from "@/components/services-faq";
import CTA from "@/components/cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesCta");

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none min-h-screen bg-background">
      <Header />
      <ServicesPageHero />
      <ServicesGrid />
      <ServicesStatement />
      <ServicesProcess />
      <ServicesFaq />
      <CTA
        bg="bg-[var(--secondary-blue)]"
        label={t("label")}
        title={t("title")}
        highlightWord={t("highlightWord")}
        strokeVariant="oval"
        buttonText={t("buttonText")}
        href="/contact"
        textColor="text-[var(--secondary-lime)]"
        buttonBg="bg-[var(--secondary-lime)]"
        buttonTextColor="text-[var(--secondary-blue)]"
      />
      <Footer />
    </main>
  );
}
