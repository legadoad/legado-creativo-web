"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ContactMarquee() {
  const t = useTranslations("contactMarquee");
  const phrases = t.raw("phrases") as string[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 border-y border-border/50 overflow-hidden bg-secondary-blue relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary-blue to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary-blue to-transparent z-10 pointer-events-none" />

      <motion.div style={{ skewX }} className="flex animate-marquee whitespace-nowrap">
        {[...phrases, ...phrases, ...phrases].map((phrase, index) => (
          <motion.div key={index} className="flex items-center mx-12" whileHover={{ scale: 1.1 }}>
            <motion.span
              className="text-2xl md:text-3xl font-bold text-secondary-lime hover:text-secondary-magenta transition-colors duration-300 cursor-default"
              whileHover={{ color: "var(--secondary-magenta)" }}
            >
              {phrase}
            </motion.span>
            <span className="ml-12 text-secondary-lime">•</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
