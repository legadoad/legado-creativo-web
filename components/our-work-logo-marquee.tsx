"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Placeholder tiles repeating the Legado mark until real client logos are
// uploaded — swap the `src` per tile once those assets land in /public/Clients.
const PLACEHOLDER_TILES = Array.from({ length: 8 });

export default function OurWorkLogoMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-14 border-y border-border/50 overflow-hidden bg-card/30 relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...PLACEHOLDER_TILES, ...PLACEHOLDER_TILES, ...PLACEHOLDER_TILES].map(
          (_, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 md:mx-6 w-32 h-16 md:w-40 md:h-20 rounded-[4px] border border-dashed border-border/70 bg-background/60 flex items-center justify-center px-4 hover:border-accent/40 transition-colors duration-300"
            >
              <Image
                src="/Logos/LEGADO_isotipo-03.png"
                alt="Legado Creativo"
                width={120}
                height={48}
                className="h-8 md:h-10 w-auto object-contain opacity-50 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          )
        )}
      </div>
    </motion.section>
  );
}
