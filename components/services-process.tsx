"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { MessageSquare, Search, PenTool, Rocket } from "lucide-react"
import { useTranslations } from "next-intl"

const stepIcons = [MessageSquare, Search, PenTool, Rocket]

export default function ServicesProcess() {
  const t = useTranslations("servicesProcess")
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden bg-card/30">
      {/* Decorative shapes */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
      />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps Timeline */}
          <div className="relative">
            {/* Vertical line - connects circle centers */}
            <div className="absolute left-6 top-[50px] bottom-[50px] w-0.5 bg-border" />
            <motion.div
              className="absolute left-6 w-0.5 bg-accent origin-top"
              style={{ top: '50px', height: 'calc(100% - 100px)' }}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: activeStep / (stepIcons.length - 1) } : {}}
              transition={{ duration: 0.7 }}
            />

            <div className="space-y-8">
              {stepIcons.map((Icon, index) => {
                const isActive = index === activeStep
                const isPast = index < activeStep
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative pl-16 cursor-pointer"
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Step circle - centered vertically */}
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      whileHover={{ scale: 1.15 }}
                      style={{
                        backgroundColor: isActive || isPast ? "var(--accent)" : "var(--card)",
                        borderColor: isActive || isPast ? "var(--accent)" : "var(--border)",
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border"
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${isActive || isPast ? "text-white" : "text-foreground/40"}`}
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 8 }}
                      animate={{
                        backgroundColor: isActive ? "hsl(var(--accent) / 0.1)" : "transparent",
                        borderColor: isActive ? "hsl(var(--accent) / 0.2)" : "transparent",
                      }}
                      className="p-6 rounded-xl border transition-all duration-300 hover:border-border"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.span
                          animate={{ color: isActive ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.7)" }}
                          className="text-sm font-bold"
                        >
                          0{index + 1}
                        </motion.span>
                        <h3
                          className={`text-xl font-bold transition-colors ${isActive ? "text-accent" : "text-foreground"}`}
                        >
                          {t(`steps.${index}.title`)}
                        </h3>
                      </div>
                      <p className="text-foreground/60 text-sm">{t(`steps.${index}.description`)}</p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Active Step Detail */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              layout
              className="relative p-10 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border overflow-hidden"
            >
              {/* Background decoration */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                <motion.div
                  key={activeStep}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-accent to-chart-2 rounded-2xl flex items-center justify-center mb-8"
                >
                  {(() => {
                    const Icon = stepIcons[activeStep]
                    return <Icon className="w-10 h-10 text-background" />
                  })()}
                </motion.div>

                <motion.span
                  key={`step-${activeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent text-sm font-bold tracking-widest"
                >
                  {t("stepLabel")} 0{activeStep + 1}
                </motion.span>
                <motion.h3
                  key={`title-${activeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6"
                >
                  {t(`steps.${activeStep}.title`)}
                </motion.h3>
                <motion.p
                  key={`details-${activeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/70 text-lg leading-relaxed mb-8"
                >
                  {t(`steps.${activeStep}.details`)}
                </motion.p>

                {/* Progress dots */}
                <div className="flex gap-2">
                  {stepIcons.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        width: i === activeStep ? 32 : 8,
                        backgroundColor: i === activeStep ? "hsl(var(--accent))" : "hsl(var(--foreground) / 0.2)",
                      }}
                      className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
