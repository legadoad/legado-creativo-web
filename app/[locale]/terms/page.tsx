import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LegalContent from "@/components/legal-content";

export async function generateMetadata() {
  const t = await getTranslations("metadata.terms");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LegalContent namespace="termsOfService" />
      <Footer />
    </main>
  );
}
