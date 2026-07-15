"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutStory() {
  const t = useTranslations("aboutStory");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const floatingCardY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={sectionRef} className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ y: imageY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/modern-creative-agency-office-workspace-with-desig.jpg"
                alt="VU Creative Agency workspace"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/80 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-8 bg-card border border-border rounded-2xl p-6 shadow-2xl"
              style={{ y: floatingCardY }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgb(var(--glow-rgb) / 0.25)",
                borderColor: "rgb(var(--glow-rgb) / 0.5)",
              }}
            >
              <motion.div
                className="text-4xl font-bold text-accent mb-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                {t("founded")}
              </motion.div>
              <div className="text-foreground/60 text-sm">
                {t("foundedLabel")}
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 border-2 border-accent/30 rounded-2xl"
              initial={{ opacity: 0, rotate: -10 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div style={{ y: contentY }}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("titleLine1")}
              <motion.span
                className="text-accent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                {t("titleLine2")}
              </motion.span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-foreground/70 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                >
                  {t(`paragraphs.${i}`)}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-accent/60 to-chart-2/60 flex items-center justify-center text-xs font-bold text-foreground"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 1 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="text-foreground font-semibold">
                  {t("teamCount")}
                </div>
                <div className="text-foreground/60 text-sm">
                  {t("teamSpread")}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
