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

export default function AboutPage() {
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
        label="Connect"
        title="How can we help you innovate? Drop us a line."
        highlightWord="innovate?"
        strokeVariant="oval"
        buttonText="Connect with us"
        href="/contact"
      />
      <Footer />
    </main>
  )
}
