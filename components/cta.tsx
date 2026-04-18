"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Stroke variants ──────────────────────────────────────────────────────────

function StrokeWide() {
  return (
    <svg
      viewBox="0 0 603 239"
      fill="none"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-[0.45em] pointer-events-none opacity-70"
      aria-hidden
    >
      <motion.path
        d="M538.849 50.948C421.88 21.889 80.689-4.55 9.821 114.736c-38.538 109.421 181.184 85.605 222.992 87.73 30.995 1.576 350.28-16.47 362.292-69.377 14.613-64.36-146-74.373-175.866-76.657"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.5 }}
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

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
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.5 }}
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

function StrokeLoop() {
  return (
    <svg
      viewBox="0 0 457 166"
      fill="none"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 w-full h-[0.5em] pointer-events-none opacity-70"
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
        transition={{ duration: 1.3, ease: "easeInOut", delay: 0.5 }}
        style={{ vectorEffect: "non-scaling-stroke" }}
      />
    </svg>
  );
}

const strokes = { wide: StrokeWide, oval: StrokeOval, loop: StrokeLoop } as const;

export type StrokeVariant = keyof typeof strokes;

// ─── Props ────────────────────────────────────────────────────────────────────

interface CTAProps {
  /** Tailwind bg class e.g. "bg-[#c9b8f0]" */
  bg?: string;
  /** Small label aligned top-right of the headline */
  label?: string;
  /** Full headline text */
  title?: string;
  /** Word inside title to apply the pencil stroke to */
  highlightWord?: string;
  strokeVariant?: StrokeVariant;
  buttonText?: string;
  href?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CTA({
  bg = "bg-[#c9b8f0]",
  label = "Connect",
  title = "How can we help you innovate? Drop us a line.",
  highlightWord = "innovate?",
  strokeVariant = "oval",
  buttonText = "Connect with us",
  href = "/contact",
}: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const Stroke = strokes[strokeVariant];
  const parts = highlightWord ? title.split(highlightWord) : [title];

  return (
    <section ref={ref} className={`${bg} px-8 md:px-16 py-16 md:py-20`}>
      <div className="max-w-7xl mx-auto">

        {/* Headline row — label sits top-right on the same line as headline starts */}
        <div className="relative mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-0 left-0 text-sm font-medium text-black/50 tracking-wide leading-none pt-1"
          >
            {label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.1] tracking-tight indent-24"
          >
            {parts[0].trimEnd()}{" "}
            {highlightWord && (<span className="relative inline-block">{highlightWord}{isInView && <Stroke />}</span>)}
            {parts[1]?.trimStart()}
          </motion.h2>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href={href} className="inline-flex items-center group">
            {/* Text pill — fully rounded on both sides */}
            <span className="bg-black text-white text-sm font-medium pl-6 pr-5 py-3.5 rounded-full transition-colors duration-200 group-hover:bg-black/80">
              {buttonText}
            </span>

            {/* Arrow circle — overlaps slightly for the joined look */}
            <span className="bg-black text-white w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-black/80">
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
