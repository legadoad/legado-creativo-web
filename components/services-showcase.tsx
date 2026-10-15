"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import VideoPauseToggle from "@/components/video-pause-toggle";

// Same showreel used in the Our Work page (components/video-banner.tsx).
const SHOWREEL_SRC = "/videos/Legado Banner Web 1.mp4";

export default function ServicesShowcase() {
  const t = useTranslations("homeVideoShowcase");
  const sectionRef = useRef<HTMLElement>(null);
  // Observe the section, not the clipped panel: a fully clipped element never reports as visible.
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-secondary-blue">
      {/* Curtain opens outward from the centre line as the section scrolls in */}
      <motion.div
        initial={{ clipPath: "inset(0% 50% 0% 50%)" }}
        animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative aspect-video max-h-screen min-h-[60vh] w-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={SHOWREEL_SRC} type="video/mp4" />
        </video>
        {/* subtle tint so the CTA always reads */}
        <div className="absolute inset-0 bg-black/15" />
      </motion.div>

      <VideoPauseToggle className="absolute bottom-4 left-4 z-30" />

      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-20 flex justify-center">
        <Link
          href="/services"
          className="group pointer-events-auto inline-flex items-center rounded-full bg-gradient-to-r from-accent to-secondary-blue-ink p-1 shadow-2xl transition-transform duration-200 hover:scale-105"
        >
          <span className="rounded-full px-6 py-3.5 text-sm font-medium text-accent-foreground">
            {t("ctaButton")}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-accent-foreground">
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </span>
        </Link>
      </div>
    </section>
  );
}
