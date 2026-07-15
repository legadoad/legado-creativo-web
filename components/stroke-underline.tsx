"use client";

import { motion } from "framer-motion";

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
      className="absolute inset-0 pointer-events-none opacity-70"
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
      className="absolute inset-0 pointer-events-none opacity-70"
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

export const strokes = { wide: StrokeWide, oval: StrokeOval, loop: StrokeLoop } as const;

export type StrokeVariant = keyof typeof strokes;
