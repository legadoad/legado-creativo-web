import { getTranslations, setRequestLocale } from "next-intl/server";
import { socialImages } from "@/lib/metadata";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LegalContent from "@/components/legal-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // generateMetadata runs in its own pass before the page body, so
  // setRequestLocale below wouldn't be set yet — pass locale explicitly.
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });
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

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LegalContent namespace="privacyPolicy" />
      <Footer />
    </main>
  );
}
