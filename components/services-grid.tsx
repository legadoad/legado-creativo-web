"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Palette, Globe, Smartphone, Sparkles, Video, Camera, PenTool, Layers, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

const serviceIcons = [Palette, Globe, Smartphone, Sparkles, Video, Camera, PenTool, Layers]
const serviceColors = [
  "from-pink-500 to-accent",
  "from-accent to-blue-500",
  "from-blue-500 to-cyan-500",
  "from-cyan-500 to-teal-500",
  "from-teal-500 to-green-500",
  "from-green-500 to-yellow-500",
  "from-yellow-500 to-orange-500",
  "from-orange-500 to-pink-500",
]
const serviceGlow = [
  "hover:border-pink-500/50 hover:shadow-pink-500/20",
  "hover:border-accent/50 hover:shadow-accent/20",
  "hover:border-blue-500/50 hover:shadow-blue-500/20",
  "hover:border-cyan-500/50 hover:shadow-cyan-500/20",
  "hover:border-teal-500/50 hover:shadow-teal-500/20",
  "hover:border-green-500/50 hover:shadow-green-500/20",
  "hover:border-yellow-500/50 hover:shadow-yellow-500/20",
  "hover:border-orange-500/50 hover:shadow-orange-500/20",
]

export default function ServicesGrid() {
  const t = useTranslations("servicesGrid")
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            {t("sectionLabel")}
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {serviceIcons.map((Icon, index) => {
              const isExpanded = expandedIndex === index
              const color = serviceColors[index]
              const glow = serviceGlow[index]
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`group relative p-6 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 transition-all duration-500 hover:shadow-2xl cursor-pointer ${glow} ${
                    isExpanded ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.12 }}
                    className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-12 h-12 mb-4 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-background" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {t(`items.${index}.title`)}
                    </h3>

                    <p
                      className={`text-foreground/60 text-sm leading-relaxed mb-4 ${isExpanded ? "" : "line-clamp-2"}`}
                    >
                      {t(`items.${index}.description`)}
                    </p>

                    {/* Features - shown when expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 mb-4">
                            {(t.raw(`items.${index}.features`) as string[]).map((feature, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                              >
                                {feature}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                      <span>{isExpanded ? t("showLess") : t("learnMore")}</span>
                      <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Corner number */}
                  <motion.div
                    initial={{ opacity: 0.05 }}
                    whileHover={{ opacity: 0.1 }}
                    className="absolute top-4 right-4 text-4xl font-bold text-foreground/5"
                  >
                    0{index + 1}
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
