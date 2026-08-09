"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

const STEP_COUNT = 4;

export default function ServicesProcess() {
  const t = useTranslations("servicesProcess");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const displayStep = activeStep ?? 0;

  const timelineRef = useRef<HTMLDivElement>(null)
  const firstCircleRef = useRef<HTMLDivElement>(null)
  const lastCircleRef = useRef<HTMLDivElement>(null)
  const [lineBounds, setLineBounds] = useState({ top: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useLayoutEffect(() => {
    const updateLineBounds = () => {
      const container = timelineRef.current
      const first = firstCircleRef.current
      const last = lastCircleRef.current
      if (!container || !first || !last) return

      const containerRect = container.getBoundingClientRect()
      const firstRect = first.getBoundingClientRect()
      const lastRect = last.getBoundingClientRect()
      const top = firstRect.top + firstRect.height / 2 - containerRect.top
      const bottom = lastRect.top + lastRect.height / 2 - containerRect.top
      setLineBounds({ top, height: bottom - top })
    }

    updateLineBounds()
    window.addEventListener("resize", updateLineBounds)
    document.fonts?.ready.then(updateLineBounds)
    return () => window.removeEventListener("resize", updateLineBounds)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 relative overflow-hidden bg-card/30"
    >
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
          <h2 className="text-fluid-h2 font-bold text-heading mb-6 tracking-tight">
            {t("title")} <span className="text-secondary-blue">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Vertical line - connects circle centers */}
            <div
              className="absolute left-6 w-0.5 bg-border"
              style={{ top: lineBounds.top, height: lineBounds.height }}
            />
            <motion.div
              className="absolute left-6 w-0.5 bg-primary origin-top"
              style={{ top: lineBounds.top, height: lineBounds.height }}
              initial={{ scaleY: 0 }}
              animate={
                isInView
                  ? {
                      scaleY:
                        activeStep === null ? 0 : activeStep / (STEP_COUNT - 1),
                    }
                  : {}
              }
              transition={{ duration: 0.7 }}
            />

            <div className="space-y-8">
              {Array.from({ length: STEP_COUNT }).map((_, index) => {
                const isActive = index === activeStep;
                const isPast = activeStep !== null && index < activeStep;
                const isFilled = isActive || isPast;
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
                      ref={index === 0 ? firstCircleRef : index === STEP_COUNT - 1 ? lastCircleRef : undefined}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      whileHover={{ scale: 1.15 }}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                        isFilled
                          ? "bg-secondary-lime border-primary"
                          : "bg-card border-border"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold transition-colors  duration-300 ${isFilled ? "text-primary" : "text-foreground/40"}`}
                      ></span>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 8 }}
                      className={`p-6 rounded-[4px] border transition-all duration-300 ${
                        isFilled
                          ? "bg-secondary-lime border-primary"
                          : "hover:bg-secondary-lime/50 hover:border-secondary-lime"
                      }`}
                    >
                      <h3
                        className={`font-sans text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? "text-secondary-blue" : "text-heading"}`}
                      >
                        {t(`steps.${index}.title`)}
                      </h3>
                      <p className="text-foreground/60 text-sm">
                        {t(`steps.${index}.description`)}
                      </p>
                    </motion.div>
                  </motion.div>
                );
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
              className="relative p-10 rounded-[4px] bg-gradient-to-br from-card to-card/50 border border-border overflow-hidden"
            >
              {/* Background decoration */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                <span className="text-4xl font-bold text-secondary-blue leading-none">
                  {String(displayStep + 1).padStart(2, "0")}
                </span>

                <motion.h3
                  key={`title-${displayStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold text-heading mt-2 mb-6"
                >
                  {t(`steps.${displayStep}.title`)}
                </motion.h3>
                <motion.p
                  key={`details-${displayStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/70 text-lg leading-relaxed mb-8"
                >
                  {t(`steps.${displayStep}.details`)}
                </motion.p>

                {/* Progress dots */}
                <div className="flex gap-2">
                  {Array.from({ length: STEP_COUNT }).map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ width: i === displayStep ? 32 : 8 }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === displayStep
                          ? "bg-secondary-lime"
                          : "bg-foreground/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
