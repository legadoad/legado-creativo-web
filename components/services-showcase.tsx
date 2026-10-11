"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import VideoPauseToggle from "@/components/video-pause-toggle";

const VIDEO_SOURCES = [
  "/videos/Banner.mp4",
  "/videos/Legado Banner Web 1.mp4",
  "/videos/Legado Banner Web 2.mp4",
];

/** Portion of the scroll track spent opening the curtain before videos start cycling. */
const REVEAL_END = 0.14;

interface PanelProps {
  bg: string;
  label: string;
  videoIndex: number;
  clipPath: MotionValue<string>;
  badgeBg: string;
  badgeText: string;
}

function VideoPanel({
  bg,
  label,
  videoIndex,
  clipPath,
  badgeBg,
  badgeText,
}: PanelProps) {
  return (
    <div className={`relative h-full overflow-hidden ${bg}`}>
      {/* Video layers stay mounted and playing; only opacity crossfades.
          Keeps fast scrolling smooth — no remount, no reload flicker. */}
      <motion.div style={{ clipPath }} className="absolute inset-0">
        {VIDEO_SOURCES.map((src, i) => (
          <motion.div
            key={src}
            animate={{ opacity: i === videoIndex ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              disablePictureInPicture
              className="h-full w-full object-cover"
            >
              <source src={src} type="video/mp4" />
            </video>
          </motion.div>
        ))}
        {/* subtle tint so the frosted label and centered logo always read */}
        <div className="absolute inset-0 bg-black/15" />
      </motion.div>

      {/* Service label — sits low, away from the centered CTA */}
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className={`whitespace-nowrap rounded-full px-6 py-3 backdrop-blur-xl ${badgeBg}`}
          >
            <span
              className={`block text-lg font-light tracking-tight sm:text-xl md:text-2xl ${badgeText}`}
            >
              {label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  const t = useTranslations("homeVideoShowcase");
  const tServices = useTranslations("homeServices");
  const sectionRef = useRef<HTMLElement>(null);

  const services = tServices.raw("items") as { name: string }[];
  const labels = services.map((item) => item.name);
  const offset = Math.floor(labels.length / 2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const cycled = (p - REVEAL_END) / (1 - REVEAL_END);
    const next = Math.floor(cycled * labels.length);
    setIndex(Math.min(labels.length - 1, Math.max(0, next)));
  });

  // Curtain: each half reveals outward from the centre line.
  const inset = useTransform(scrollYProgress, [0, REVEAL_END], [100, 0]);
  const leftClip = useMotionTemplate`inset(0% 0% 0% ${inset}%)`;
  const rightClip = useMotionTemplate`inset(0% ${inset}% 0% 0%)`;

  const rightIndex = (index + offset) % labels.length;

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid h-full grid-cols-1 md:grid-cols-2">
          <VideoPanel
            bg="bg-secondary-lime"
            label={labels[index]}
            videoIndex={index % VIDEO_SOURCES.length}
            clipPath={leftClip}
            badgeBg="bg-white/55"
            badgeText="text-foreground"
          />
          <VideoPanel
            bg="bg-secondary-blue"
            label={labels[rightIndex]}
            videoIndex={rightIndex % VIDEO_SOURCES.length}
            clipPath={rightClip}
            badgeBg="bg-black/45"
            badgeText="text-white"
          />
        </div>

        <VideoPauseToggle className="absolute bottom-4 left-4 z-30" />

        {/* Centred stack: split duotone logo + CTA, straddling the divide */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-10">
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
      </div>
    </section>
  );
}
