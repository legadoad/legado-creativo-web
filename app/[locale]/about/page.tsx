import { getTranslations } from "next-intl/server"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AboutPageHero from "@/components/about-page-hero"
import AboutStory from "@/components/about-story"
import AboutTimeline from "@/components/about-timeline"
import AboutTeam from "@/components/about-team"
import AboutValues from "@/components/about-values"
import CTA from "@/components/cta"

export const metadata = {
  title: "About Us | VU Creative Agency",
  description: "Learn about VU Creative Agency - our story, team, values, and creative journey.",
}

export default async function AboutPage() {
  const t = await getTranslations("aboutCta")

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutPageHero />
      <AboutStory />
      <AboutTimeline />
      <AboutValues />
      <AboutTeam />
      <CTA
        bg="bg-[#F7EDD8]"
        label={t("label")}
        title={t("title")}
        highlightWord={t("highlightWord")}
        strokeVariant="oval"
        buttonText={t("buttonText")}
        href="/contact"
      />
      <Footer />
    </main>
  )
}
