"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Target, Fingerprint, Sprout, Heart, Handshake, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

// Orden fijo por título: Estrategia, Narrativa, Raíces, Honestidad, Colaboración, Impacto
const valueIcons = [Target, Fingerprint, Sprout, Heart, Handshake, Sparkles]
const valueIconBg = [
  "bg-secondary-lime",
  "bg-section-lavender/60",
  "bg-secondary-blue/20",
  "bg-section-mint/60",
  "bg-secondary-magenta/20",
  "bg-accent/10",
]
const valueIconColor = [
  "text-accent",
  "text-primary",
  "text-secondary-blue",
  "text-primary",
  "text-secondary-magenta",
  "text-accent",
]

export default function AboutValues() {
  const t = useTranslations("aboutValues")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-fluid-h2 font-bold text-[#282828] mb-6 tracking-tight">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {valueIcons.map((Icon, i) => {
            const iconBg = valueIconBg[i]
            const iconColor = valueIconColor[i]
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 },
                }}
                className="group relative bg-card border border-border rounded-[4px] p-8 shadow-none hover:shadow-xl hover:border-accent/50 hover:shadow-accent/20 transition-all duration-300 cursor-default"
              >
                <div className="relative z-10">
                  <motion.div
                    className={`w-14 h-14 rounded-[4px] ${iconBg} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-[#282828] mb-3 group-hover:text-accent transition-colors">
                    {t(`items.${i}.title`)}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">{t(`items.${i}.description`)}</p>
                </div>

                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent/50"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
