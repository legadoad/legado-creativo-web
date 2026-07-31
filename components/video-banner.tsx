"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Sparkles, Clapperboard, Video, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { strokes } from "@/components/stroke-underline";

const featureIcons = [Sparkles, Clapperboard, Video, Share2];

export default function VideoBanner() {
  const t = useTranslations("videoBanner");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 md:w-96 md:h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center "
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">
            {t("sectionLabel")}
          </p>
          <h2 className="text-fluid-h2 font-bold text-foreground mb-6 tracking-tight">
            {t("titleLine1")}
            <span className="text-accent relative inline-block">
              {t("titleHighlight")}
              {isInView && <strokes.oval />}
            </span>
            {t("titleLine2")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div style={{ y, opacity, scale }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-[8px] overflow-hidden border border-accent/20 shadow-2xl shadow-accent/10"
          >
            {/* Placeholder video — swap the source for the final showreel later */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/creative-agency-showreel-dark-cinematic.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/videos/Banner.mp4" type="video/mp4" />
            </video>

            {/* Video Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/80 via-transparent to-background/30" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(to right, hsl(var(--accent)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--accent)) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Floating Text Overlay */}
            <div className="hidden sm:block absolute sm:bottom-8 sm:left-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <p className="text-foreground/60 text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">
                  {t("showreelLabel")}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {t("showreelTitle")}
                </h3>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="hidden md:block absolute md:-left-8 top-1/4 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-[4px] p-4 md:p-6 shadow-xl"
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
              {t("stat1Value")}
            </div>
            <div className="text-sm text-foreground/60">{t("stat1Label")}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="hidden md:block absolute md:-right-8 bottom-1/4 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-[4px] p-4 md:p-6 shadow-xl"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {t("stat2Value")}
            </div>
            <div className="text-sm text-foreground/60">{t("stat2Label")}</div>
          </motion.div>
        </motion.div>

        {/* Bottom Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:mt-8"
        >
          {[0, 1, 2, 3].map((i) => {
            // Divisor a la izquierda salvo en la primera columna de cada fila
            // (móvil: 2 columnas, desktop: 4 columnas)
            const divider = [
              "",
              "border-l border-accent/15",
              "border-accent/15 md:border-l",
              "border-l border-accent/15",
            ][i];
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`group flex flex-col items-center text-center px-2 md:px-4 ${divider}`}
              >
                <Icon
                  className="w-6 h-6 text-accent mb-3 transition-transform duration-300 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-1.5">
                  {t(`features.${i}.label`)}
                </h4>
                <p className="text-sm text-foreground/50 leading-snug">
                  {t(`features.${i}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
