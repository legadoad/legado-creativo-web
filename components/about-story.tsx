"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Rocket, Sparkles, TrendingUp, Users } from "lucide-react";

const YEARS = ["2018", "2019", "2020"];
const YEAR_ICONS = [Rocket, TrendingUp, Sparkles];

function YearTick({
  label,
  progress,
  index,
  total,
}: {
  label: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.08), start],
    [0.35, 1]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, start - 0.08), start],
    [0.9, 1.1]
  );

  return (
    <motion.span
      style={{ opacity, scale }}
      className="tabular-nums text-accent"
    >
      {label}
    </motion.span>
  );
}

export default function AboutStory() {
  const t = useTranslations("aboutStory");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [distance, setDistance] = useState(1400);

  useEffect(() => {
    function measure() {
      if (trackRef.current && viewportRef.current) {
        setDistance(
          Math.max(
            0,
            trackRef.current.scrollWidth - viewportRef.current.clientWidth
          )
        );
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const imageFloatY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen overflow-hidden pt-24 pb-10 flex items-center"
      >
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

        {/* Progress bar + year ticks */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 w-[70vw] max-w-md z-30"
        >
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full w-full bg-accent rounded-full origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs font-bold tracking-widest">
            {YEARS.map((year, i) => (
              <YearTick
                key={year}
                label={year}
                progress={scrollYProgress}
                index={i}
                total={YEARS.length}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating image, pinned to the right, stays put while cards scroll past behind it.
            Hidden below sm: cards are ~80vw wide on mobile, so the image would overlap their text. */}
        <motion.div
          className="hidden sm:block absolute z-20 right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[230px] lg:w-[320px] xl:w-[360px]"
          style={{ y: imageFloatY }}
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative aspect-[4/5] rounded-[4px] overflow-hidden shadow-2xl"
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src="/modern-creative-agency-office-workspace-with-desig.jpg"
              alt="Legado Creativo workspace"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="absolute -bottom-5 -left-5 sm:-bottom-7 sm:-left-7 bg-card border border-border rounded-[4px] p-3 sm:p-5 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgb(var(--glow-rgb) / 0.25)",
              borderColor: "rgb(var(--glow-rgb) / 0.5)",
            }}
          >
            <div className="text-xl sm:text-3xl font-bold text-accent mb-0.5 sm:mb-1">
              {t("founded")}
            </div>
            <div className="text-foreground/60 text-[10px] sm:text-sm whitespace-nowrap">
              {t("foundedLabel")}
            </div>
          </motion.div>

          <motion.div
            // className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-20 sm:h-20 border-2 border-accent/30 rounded-[4px]"
            initial={{ opacity: 0, rotate: 10 }}
            animate={isInView ? { opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="absolute -bottom-3 -right-3 w-10 h-10 sm:w-16 sm:h-16 bg-accent/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Horizontal timeline track */}
        <motion.div
          ref={trackRef}
          className="flex items-stretch gap-6 md:gap-10 pl-4 sm:pl-8 lg:pl-16 pr-8 sm:pr-[300px] lg:pr-[420px] xl:pr-[460px]"
          style={{ x: trackX }}
        >
          {/* Intro panel */}
          <div className="flex-shrink-0 w-[80vw] sm:w-[420px] lg:w-[460px] flex flex-col justify-center">
            <p className="text-accent font-bold text-sm tracking-widest mb-4">
              {YEARS[0]} —
            </p>
            <h2 className="text-fluid-h2 font-bold text-heading mb-6 tracking-tight">
              {t("titleLine1")}
              <span className="text-accent">{t("titleLine2")}</span>
            </h2>
            <motion.div
              style={{ opacity: scrollHintOpacity }}
              className="flex items-center gap-2 text-foreground/50 text-sm font-medium"
            >
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2"
              >
                Scroll <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.div>
          </div>

          {/* Year panels */}
          {YEARS.map((year, i) => {
            const Icon = YEAR_ICONS[i];
            return (
              <div
                key={year}
                className="flex-shrink-0 w-[80vw] sm:w-[420px] lg:w-[460px] flex flex-col justify-center"
              >
                <motion.div
                  className="bg-card border border-border rounded-[4px] p-8 lg:p-10 hover:border-accent/50 transition-colors duration-300 h-full flex flex-col justify-center"
                  initial={{ y: 0, boxShadow: "0 0px 0px 0px rgb(var(--glow-rgb) / 0)" }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px -15px rgb(var(--glow-rgb) / 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-secondary-lime border-2 border-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-3xl font-bold text-accent">
                      {year}
                    </div>
                  </div>
                  <p className="text-foreground/70 text-lg leading-relaxed">
                    {t(`paragraphs.${i}`)}
                  </p>
                </motion.div>
              </div>
            );
          })}

          {/* Closing / team panel */}
          <div className="flex-shrink-0 w-[80vw] sm:w-[420px] lg:w-[460px] flex flex-col justify-center">
            <div className="bg-card border border-border rounded-[4px] p-8 lg:p-10 h-full flex flex-col justify-center">
              <div className="w-14 h-14 rounded-full bg-secondary-lime border-2 border-accent flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="flex -space-x-3 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-accent/60 to-chart-2/60 flex items-center justify-center text-xs font-bold text-foreground"
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
              <div className="text-foreground font-semibold text-lg">
                {t("teamCount")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
