"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { TypingAnimation } from "@/components/ui/typing-animation"

const categoryStyles = [
  { tint: "bg-section-lavender/78", direction: "animate-marquee" },
  { tint: "bg-section-mint/78", direction: "animate-marquee-reverse" },
  { tint: "bg-secondary-blue/72", direction: "animate-marquee" },
]

const categoryImages = [
  [
    "/brand-identity-design-system-logo-mockup.jpg",
    "/creative-poster-design-colorful-typography.jpg",
    "/creative-visual-campaign-poster-design.jpg",
    "/event-branding-design-conference-materials.jpg",
    "/startup-branding-package-mockup-dark.jpg",
  ],
  [
    "/digital-marketing-dashboard-app-interface.jpg",
    "/social-media-post-design-creative.jpg",
    "/creative-agency-showreel-dark-cinematic.jpg",
    "/social-media-design-kit-templates-dark.jpg",
    "/digital-marketing-app-interface.jpg",
  ],
  [
    "/modern-website-design-on-laptop-mockup.jpg",
    "/modern-ecommerce-website-design-dark-theme.jpg",
    "/interactive-portfolio-website-modern-design.jpg",
    "/mobile-app-ui-design-dark-theme.jpg",
    "/finance-dashboard-ui-design-dark-theme.jpg",
  ],
]

export default function ServicesGrid() {
  const t = useTranslations("servicesGrid")
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const categories = categoryStyles.map((style, index) => ({
    ...style,
    title: t(`categories.${index}.title`),
    description: t(`categories.${index}.description`),
    items: t.raw(`categories.${index}.items`) as string[],
    images: categoryImages[index],
  }))

  const toggleExpanded = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index))
  }

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            {t("sectionLabel")}
          </motion.p>
          <h2 className="text-fluid-h2 font-bold text-foreground mb-6 tracking-tight">
            <TypingAnimation
              as="span"
              className="text-foreground"
              duration={60}
              showCursor={false}
            >
              {t("title")}
            </TypingAnimation>{" "}
            <TypingAnimation
              as="span"
              className="text-accent"
              duration={60}
              delay={t("title").length * 60}
            >
              {t("titleAccent")}
            </TypingAnimation>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-2 md:gap-3">
        {categories.map((category, index) => {
          const isHovered = hoveredIndex === index
          const isExpanded = expandedIndex === index
          const loopedImages = [...category.images, ...category.images]

          return (
            <div key={category.title}>
              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setHoveredIndex(index)
                  toggleExpanded(index)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setHoveredIndex(index)
                    toggleExpanded(index)
                  }
                }}
                className="group relative h-64 md:h-80 overflow-hidden cursor-pointer select-none"
              >
                {/* Infinite image filmstrip */}
                <div
                  className={`absolute top-0 left-0 h-full flex ${category.direction} transition-[filter] duration-500 ${
                    isHovered ? "blur-none" : "blur-md"
                  }`}
                  style={{ animationDuration: `${category.images.length * 8}s` }}
                >
                  {loopedImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-full w-56 sm:w-72 md:w-96 flex-shrink-0"
                    >
                      <img
                        src={src}
                        alt={category.items[i % category.items.length]}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center text-center p-4 bg-black/35 transition-opacity duration-500 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <span className="text-white text-lg md:text-2xl font-semibold leading-snug">
                          {category.items[i % category.items.length]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Color tint + centered category title */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${category.tint} ${
                    isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <span className="text-fluid-h2 font-bold lowercase text-foreground/80">
                    {category.title}
                  </span>
                </div>

                {/* Expand indicator */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* FAQ-style expanded panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-card"
                  >
                    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <p className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-2xl">
                        {category.description}
                      </p>
                      <Link
                        href="/contact"
                        className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-secondary-lime text-secondary-blue font-medium rounded-full hover:bg-secondary-lime/90 transition"
                      >
                        {t("ctaLabel")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
