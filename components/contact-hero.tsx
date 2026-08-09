"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import { TypingAnimation } from "@/components/ui/typing-animation"
import HeroParticles from "@/components/hero-particles"

export default function ContactHero() {
  const t = useTranslations("contactHero")
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[65vh] flex items-center overflow-hidden bg-background"
    >
      <HeroParticles />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto w-full"
        style={{ opacity, y }}      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm font-semibold tracking-widest mb-6"
          >
            {t("badge")}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-fluid-h1 font-bold tracking-tight mb-8"
          >
            <TypingAnimation
              as="span"
              className="text-heading leading-[0.95] mr-[0.25em]"
              duration={60}
              showCursor={false}
            >
              {t("titleLine1")}
            </TypingAnimation>
            <TypingAnimation
              as="span"
              className="text-accent leading-[0.95]"
              duration={60}
              delay={t("titleLine1").length * 60}
            >
              {t("titleLine2")}
            </TypingAnimation>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/60 max-w-2xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  )
}
