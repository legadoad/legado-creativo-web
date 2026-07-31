"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { TypingAnimation } from "@/components/ui/typing-animation"

export default function ServicesStatement() {
  const t = useTranslations("servicesStatement")
  const sentences = t.raw("sentences") as string[]
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[42vh] md:min-h-[48vh] flex items-center justify-center pt-6 pb-16 md:pb-24 px-6 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.4, 0.25, 0.4],
          }}
          transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--glow-rgb)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--glow-rgb)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-accent text-sm font-semibold tracking-widest mb-6"
        >
          {t("kicker")}
        </motion.p>

        <TypingAnimation
          as="h2"
          words={sentences}
          wordClassNames={[
            "text-accent",
            "text-[var(--secondary-magenta)]",
            "text-[var(--secondary-blue)]",
          ]}
          loop
          duration={45}
          deleteSpeed={25}
          pauseDelay={2200}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="text-fluid-h1 font-bold tracking-tight transition-colors duration-500 cursor-default inline-block"
        />
      </div>
    </section>
  )
}
