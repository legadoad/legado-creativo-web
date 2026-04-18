import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactHero from "@/components/contact-hero";
import ContactForm from "@/components/contact-form";
import ContactInfo from "@/components/contact-info";

export const metadata = {
  title: "Contact Us | VU Creative Agency",
  description:
    "Get in touch with VU Creative Agency. Let's discuss your next project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ContactHero />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <Footer />
    </main>
  );
}
