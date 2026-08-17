import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactHero from "@/components/contact-hero";
import ContactMarquee from "@/components/contact-marquee";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";
import InstagramFeed from "@/components/instagram-feed";

export const metadata = {
  title: "Contact Us | Legado Creativo",
  description:
    "Get in touch with Legado Creativo. Let's discuss your next project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ContactHero />
      <ContactMarquee />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <InstagramFeed />
      <Footer />
    </main>
  );
}
