"use client";

import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function About() {
  const t = useTranslations("homeAbout");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 px-6 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm font-semibold tracking-widest mb-6"
          >
            {t("sectionLabel")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-fluid-h1 font-bold text-secondary-blue tracking-tight mb-8"
          >
            <TypingAnimation
              as="span"
              className="text-secondary-blue"
              duration={60}
              showCursor={false}
            >
              {t("titleLine1")}
            </TypingAnimation>
            <TypingAnimation
              as="span"
              className="text-accent"
              duration={60}
              delay={t("titleLine1").length * 60}
            >
              {t("titleLine2")}
            </TypingAnimation>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-foreground/60 max-w-2xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - single refined image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden border border-border">
              <img
                src="/modern-creative-agency-office-workspace-with-desig.jpg"
                alt="Our workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/60 to-transparent" />
            </div>
            <p className="mt-4 text-sm text-foreground/50 tracking-wide">
              {t("foundedBadge")}
            </p>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#282828] mb-6 leading-tight tracking-tight">
              {t("contentTitle")}
              <span className="text-accent">{t("contentTitleAccent")}</span>
            </h3>
            <p className="text-lg text-foreground/60 mb-6 leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
              {t("paragraph2")}
            </p>

            <ul className="space-y-4 mb-10">
              {[0, 1, 2, 3].map((i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 text-foreground/80"
                >
                  <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </span>
                  {t(`bulletPoints.${i}`)}
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-secondary-lime text-secondary-blue font-semibold rounded-full overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">{t("learnMore")}</span>
              <motion.div
                className="absolute inset-0 bg-secondary-lime/70"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
