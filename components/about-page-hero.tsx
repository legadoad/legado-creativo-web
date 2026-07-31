"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { TypingAnimation } from "@/components/ui/typing-animation";
import HeroParticles from "@/components/hero-particles";

export default function AboutPageHero() {
  const t = useTranslations("aboutHero");
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center overflow-hidden pt-24 pb-16 px-6 bg-background"
    >
      <HeroParticles />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto w-full"
        style={{ opacity, scale, y }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm font-semibold tracking-widest mb-6"
          >
            {t("badge")}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-fluid-hero font-bold tracking-tight mb-8"
          >
            <TypingAnimation
              as="span"
              className="text-foreground leading-[0.95] mr-[0.25em]"
              duration={60}
              showCursor={false}
            >
              {t("titleLine1")}
            </TypingAnimation>
            <TypingAnimation
              as="span"
              className="text-accent leading-[0.95]"
              duration={60}
              delay={t("titleLine1").length * 60}
            >
              {t("titleLine2")}
            </TypingAnimation>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/60 max-w-3xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1.5 h-3 bg-accent rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
