import { getTranslations, setRequestLocale } from "next-intl/server";
import { socialImages } from "@/lib/metadata";
import HomeContent from "@/components/home-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}
