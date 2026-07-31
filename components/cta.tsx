"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { strokes, type StrokeVariant } from "@/components/stroke-underline";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CTAProps {
  /** Tailwind bg class e.g. "bg-section-lavender" */
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
  /** Tailwind text color class for the headline, e.g. "text-white" */
  textColor?: string;
  /** Tailwind bg color class for the button, e.g. "bg-white" */
  buttonBg?: string;
  /** Tailwind text color class for the button label/icon, e.g. "text-black" */
  buttonTextColor?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CTA({
  bg = "bg-section-lavender",
  label = "Connect",
  title = "How can we help you innovate? Drop us a line.",
  highlightWord = "innovate?",
  strokeVariant = "oval",
  buttonText = "Connect with us",
  href = "/contact",
  textColor = "text-black",
  buttonBg = "bg-black",
  buttonTextColor = "text-white",
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
            className="invisible md:absolute md:top-0 md:left-0 text-sm font-medium text-black/50 tracking-wide leading-none md:pt-1 text-center md:text-left mb-4 md:mb-0"
          >
            {label}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`font-sans text-fluid-h1 font-bold ${textColor} tracking-tight md:indent-24 text-center md:text-left`}
          >
            {parts[0].trimEnd()}{" "}
            {highlightWord && (<span className="relative inline-block indent-0">{highlightWord}{isInView && <Stroke />}</span>)}
            {parts[1] && <>{" "}{parts[1].trimStart()}</>}
          </motion.h2>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center md:justify-start"
        >
          <Link href={href} className="inline-flex items-center group cursor-pointer">
            {/* Text pill — fully rounded on both sides */}
            <span className={`${buttonBg} ${buttonTextColor} text-sm font-medium pl-6 pr-5 py-3.5 rounded-full transition-opacity duration-200 group-hover:opacity-80`}>
              {buttonText}
            </span>

            {/* Arrow circle — overlaps slightly for the joined look */}
            <span className={`${buttonBg} ${buttonTextColor} w-11 h-11 rounded-full flex items-center justify-center transition-opacity duration-200 group-hover:opacity-80`}>
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
