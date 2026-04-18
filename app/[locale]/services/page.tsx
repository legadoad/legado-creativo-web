import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicesPageHero from "@/components/services-page-hero";
import ServicesGrid from "@/components/services-grid";
import ServicesProcess from "@/components/services-process";
import ServicesFaq from "@/components/services-faq";
import CTA from "@/components/cta";

export const metadata = {
  title: "Services | VU Creative Agency",
  description:
    "Explore our creative services - graphic design, web design, branding, UI/UX and more.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ServicesPageHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesFaq />
      <CTA
        bg="bg-[#D8EAE2]"
        label="Work with us"
        title="Ready to start your next project? Let's talk."
        highlightWord="project?"
        strokeVariant="wide"
        buttonText="Start a project"
        href="/contact"
      />
      <Footer />
    </main>
  );
}
