"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

function StrokeOval() {
  return (
    <svg
      viewBox="0 0 457 166"
      fill="none"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-[0.45em] pointer-events-none opacity-70"
      aria-hidden
    >
      <motion.path
        d="M23.652 37.57c-49.713 32.158-36.71 138.536 237.723 125.923 173.239-7.961 203.906-74.972 191.822-96.122C441.112 46.22 407.649 3.28 254.105 1.05 92.241-1.303 31.338 80.263 64.788 92.366"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.8 }}
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

export default function ServicesPageHero() {
  const t = useTranslations("servicesHero");
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/services.mp4" type="video/mp4" />
        <source
          src="https://www.monks.com/data/s3fs-public/2025-06/Monks-RealTimeBrands-Culture.mp4?VersionId=xbvPZh9tJI8sTs6EUyUkvKfiruxldRM5"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[rgb(var(--overlay-dark-rgb)/0.4)]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Label + Headline */}
          <div className="relative mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="invisible absolute top-0 left-0 text-sm font-medium text-white/50 tracking-wide leading-none pt-1"
            >
              {t("badge")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-fluid-h1 font-bold text-white tracking-tight indent-24"
            >
              {t("titleLine1")}
              <span className="relative inline-block indent-0 text-white">
                {t("titleLine2")}
                <StrokeOval />
              </span>
              {t("titleLine3")}
            </motion.h1>
          </div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/contact" className="inline-flex items-center group">
              <span className="bg-white text-black text-sm font-medium pl-6 pr-5 py-3.5 rounded-full transition-colors duration-200 group-hover:bg-white/90">
                {t("button")}
              </span>
              <span className="bg-white text-black w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-white/90">
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-3 bg-accent rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
