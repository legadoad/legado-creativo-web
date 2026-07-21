import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesPageHero from "@/components/services-page-hero";
import ServicesGrid from "@/components/services-grid";
import ServicesProcess from "@/components/services-process";
import ServicesFaq from "@/components/services-faq";
import CTA from "@/components/cta";

export const metadata = {
  title: "Services | Legado Creativo",
  description:
    "Explore our creative services - graphic design, web design, branding, UI/UX and more.",
};

export default async function ServicesPage() {
  const t = await getTranslations("servicesCta");

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServicesPageHero />
      <ServicesGrid />
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
      />
      <Footer />
    </main>
  );
}
