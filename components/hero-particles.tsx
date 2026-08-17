"use client";

import { motion } from "framer-motion";

/**
 * Subtle floating particle layer for page heroes.
 * Sits behind the hero content (render it before the z-10 content) as an
 * ambient decorative layer. Uses only brand tokens.
 */
export default function HeroParticles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* Solid circles */}
      <motion.div
        className="absolute top-[20%] left-[8%] w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full"
        animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {/* <motion.div
        className="absolute top-[74%] left-[40%] w-3 h-3 sm:w-4 sm:h-4 bg-secondary-lime rounded-full"
        animate={{ y: [12, -12, 12], x: [6, -6, 6] }}
        transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      /> */}
      <motion.div
        className="absolute top-[46%] left-[5%] w-3 h-3 sm:w-4 sm:h-4 bg-secondary-blue rounded-full"
        animate={{ y: [-10, 10, -10], x: [-6, 6, -6] }}
        transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Outline circles */}
      {/* <motion.div
        className="absolute top-[82%] left-[18%] w-4 h-4 sm:w-5 sm:h-5 border-2 border-chart-2 rounded-full"
        animate={{ y: [15, -15, 15], rotate: [0, 180, 360] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[14%] left-[46%] w-4 h-4 sm:w-5 sm:h-5 border-2 border-secondary-lime rounded-full"
        animate={{ y: [-14, 14, -14], rotate: [0, -180, -360] }}
        transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      /> */}

      {/* Blurred squares */}
      {/* <motion.div
        className="absolute top-[34%] left-[52%] w-2.5 h-2.5 sm:w-3 sm:h-3 bg-chart-2/50 rotate-45"
        animate={{ y: [-12, 12, -12], rotate: [45, 225, 405] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[62%] left-[10%] w-2.5 h-2.5 sm:w-3 sm:h-3 bg-secondary-blue/50 rotate-45"
        animate={{ y: [10, -10, 10], rotate: [45, -135, -315] }}
        transition={{ duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      /> */}
    </div>
  );
}
