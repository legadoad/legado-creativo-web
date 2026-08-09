"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export default function OurWorkJourney() {
  const t = useTranslations("ourWorkJourney");
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const milestones = t.raw("milestones") as {
    company: string;
    description: string;
  }[];

  return (
    <section ref={sectionRef} className="py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 md:mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">
            {t("sectionLabel")}
          </p>
          <h2 className="text-fluid-h2 font-bold text-heading tracking-tight mb-6">
            {t("title")}
            <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="text-foreground/60 text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-20 items-start">
          {/* Founder photo */}
          <motion.div
            className="lg:sticky lg:top-28 w-[260px] sm:w-[300px] mx-auto lg:w-full lg:mx-0"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-5 md:-inset-6 bg-secondary-lime rounded-[8px] -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 border-2 border-accent/40 rounded-[8px] -z-10" />
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/fotos-vicky/vicky-no-bg.png"
                  alt={t("founderAlt")}
                  fill
                  sizes="(min-width: 1024px) 320px, 300px"
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            <motion.div
              className="absolute left-[7px] top-2 w-px bg-accent origin-top"
              style={{ height: lineHeight }}
            />

            <div className="space-y-12 md:space-y-14">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  className="relative pl-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-background border-2 border-accent" />
                  <p className="text-accent font-bold text-xs tracking-widest mb-3">
                    {t("milestoneLabel")} — {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-heading mb-3 tracking-tight">
                    {milestone.company}
                  </h3>
                  <p className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-xl">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
