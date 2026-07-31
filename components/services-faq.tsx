"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ServicesFaq() {
  const t = useTranslations("servicesFaq")
  const faqCount = 6
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-card/30">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left"
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-foreground/60">{t("subtitle")}</p>
        </motion.div>

        <div className="space-y-4">
          {Array.from({ length: faqCount }).map((_, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[4px] border border-border overflow-hidden"
              >
                <motion.button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  whileHover={{ backgroundColor: "hsl(var(--accent) / 0.05)" }}
                  animate={{
                    backgroundColor: isOpen ? "hsl(var(--accent) / 0.05)" : "hsl(var(--card))",
                  }}
                  className="w-full p-6 flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <span
                    className={`font-semibold text-lg transition-colors ${isOpen ? "text-accent" : "text-foreground"}`}
                  >
                    {t(`items.${index}.question`)}
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        className="px-6 pb-6 text-foreground/70 leading-relaxed"
                      >
                        {t(`items.${index}.answer`)}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
