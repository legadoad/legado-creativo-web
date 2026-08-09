"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function OurWorkStats() {
  const t = useTranslations("ourWorkStats");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative mb-14"
        >
          <Quote className="w-7 h-7 text-accent/40 mx-auto mb-4" />
          <p className="text-2xl md:text-3xl font-semibold text-heading leading-snug tracking-tight">
            {t("quote")}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 sm:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={i > 0 ? "border-l border-border" : ""}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-foreground/50 tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
