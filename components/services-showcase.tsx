"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface PanelProps {
  bg: string;
  videoSrc: string;
  labels: string[];
  startIndex: number;
  badgeBg: string;
  badgeText: string;
  isInView: boolean;
  delay: number;
}

function VideoPanel({
  bg,
  videoSrc,
  labels,
  startIndex,
  badgeBg,
  badgeText,
  isInView,
  delay,
}: PanelProps) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % labels.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [labels.length]);

  return (
    <div
      className={`relative min-h-[70vh] overflow-hidden md:min-h-[85vh] ${bg}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay }}
        className="absolute inset-4 overflow-hidden rounded-[8px] shadow-2xl sm:inset-6 md:inset-8"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full px-8 py-4 backdrop-blur-md ${badgeBg}`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={labels[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className={`block text-lg font-medium tracking-tight sm:text-xl ${badgeText}`}
              >
                {labels[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesShowcase() {
  const t = useTranslations("homeVideoShowcase");
  const tServices = useTranslations("homeServices");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = tServices.raw("items") as { name: string }[];
  const labels = services.map((item) => item.name);
  const midpoint = Math.floor(labels.length / 2);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <VideoPanel
          bg="bg-secondary-lime"
          // videoSrc="/videos/Banner.mp4"
          videoSrc="/videos/Banner compress.mp4"
          labels={labels}
          startIndex={0}
          badgeBg="bg-background/70"
          badgeText="text-foreground"
          isInView={isInView}
          delay={0.1}
        />
        <VideoPanel
          bg="bg-secondary-blue"
          videoSrc="/videos/Legado Banner Web 1.mp4"
          labels={labels}
          startIndex={midpoint}
          badgeBg="bg-foreground/70"
          badgeText="text-background"
          isInView={isInView}
          delay={0.25}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <Link
          href="/services"
          className="group inline-flex items-center rounded-full bg-gradient-to-r from-accent to-secondary-blue p-1 shadow-2xl transition-transform duration-200 hover:scale-105"
        >
          <span className="rounded-full px-6 py-3.5 text-sm font-medium text-accent-foreground">
            {t("ctaButton")}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 text-accent-foreground">
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
