"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Heart, Lightbulb, Target, Handshake, Palette, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

const valueIcons = [Heart, Lightbulb, Target, Handshake, Palette, Sparkles]
const valueColors = [
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-violet-500",
  "from-accent to-chart-2",
]
const valueGlow = [
  "hover:border-pink-500/50 hover:shadow-pink-500/20",
  "hover:border-amber-500/50 hover:shadow-amber-500/20",
  "hover:border-blue-500/50 hover:shadow-blue-500/20",
  "hover:border-green-500/50 hover:shadow-green-500/20",
  "hover:border-purple-500/50 hover:shadow-purple-500/20",
  "hover:border-accent/50 hover:shadow-accent/20",
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
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
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
            const color = valueColors[i]
            const glow = valueGlow[i]
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 },
                }}
                className={`group relative bg-card border border-border rounded-2xl p-8 shadow-none hover:shadow-xl transition-all duration-300 cursor-default ${glow}`}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.12 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
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
