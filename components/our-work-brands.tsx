"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { TypingAnimation } from "@/components/ui/typing-animation";
import OurWorkLogoMarquee from "@/components/our-work-logo-marquee";

export default function OurWorkBrands() {
  const t = useTranslations("ourWorkBrands");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="pt-16 pb-6 overflow-hidden">
      <motion.div
        className="text-center mb-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-accent text-sm font-semibold tracking-widest mb-4">
          {t("sectionLabel")}
        </p>
        <h2 className="text-fluid-h2 font-bold text-secondary-blue tracking-tight mb-6">
          <TypingAnimation
            as="span"
            className="text-secondary-blue"
            duration={60}
            showCursor={false}
          >
            {t("title")}
          </TypingAnimation>{" "}
          <TypingAnimation
            as="span"
            className="text-accent"
            duration={60}
            delay={t("title").length * 60}
          >
            {t("titleAccent")}
          </TypingAnimation>
        </h2>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </motion.div>

      <OurWorkLogoMarquee />
    </section>
  );
}
