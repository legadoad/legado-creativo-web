"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { TypingAnimation } from "@/components/ui/typing-animation";
import HeroParticles from "@/components/hero-particles";

export default function AboutWhoWeAre() {
  const t = useTranslations("aboutWhoWeAre");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 md:pt-12 pb-28 md:pb-36 px-6 overflow-hidden bg-background"
    >
      <HeroParticles />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm font-semibold tracking-widest mb-6"
          >
            {t("badge")}
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-fluid-h2 font-bold tracking-tight mb-6"
          >
            <TypingAnimation
              as="span"
              className="text-accent leading-[0.95]"
              duration={60}
              showCursor={false}
            >
              {t("title")}
            </TypingAnimation>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/60 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
