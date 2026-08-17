"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const CLIENT_LOGOS = [
  { src: "/Clients/amuleto.png", alt: "Amuleto" },
  { src: "/Clients/bicca.png", alt: "Bicca" },
  { src: "/Clients/biomedical.png", alt: "Biomedical" },
  { src: "/Clients/cic.png", alt: "CIC" },
  { src: "/Clients/estrella-law.png", alt: "Estrella Law" },
  { src: "/Clients/euroka.png", alt: "Euroka" },
  { src: "/Clients/europro.png", alt: "Europro" },
  { src: "/Clients/everett-furniture.png", alt: "Everett Furniture" },
  { src: "/Clients/gsp-latam.png", alt: "GSP Latam" },
  { src: "/Clients/gsp-na.png", alt: "GSP NA" },
  { src: "/Clients/gsp-xtv.png", alt: "GSP XTV" },
  { src: "/Clients/la-fabrica.png", alt: "La Fabrica" },
  { src: "/Clients/la-garita.png", alt: "La Garita" },
  { src: "/Clients/legado.png", alt: "Legado" },
  { src: "/Clients/mayaguez.png", alt: "Mayaguez" },
  { src: "/Clients/nv-cargo.png", alt: "NV Cargo" },
  { src: "/Clients/peka.png", alt: "Peka" },
  { src: "/Clients/pollo-royal.png", alt: "Pollo Royal" },
  { src: "/Clients/porter.png", alt: "Porter" },
  { src: "/Clients/salgado.png", alt: "Salgado" },
  { src: "/Clients/swift-demolition.png", alt: "Swift Demolition" },
  { src: "/Clients/waltham-furniture.png", alt: "Waltham Furniture" },
  { src: "/Clients/eclat.png", alt: "Éclat" },
];

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
        {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map(
          (logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={220}
                height={100}
                className="h-20 md:h-24 w-auto max-w-[190px] md:max-w-[240px] object-contain opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            </div>
          )
        )}
      </div>
    </motion.section>
  );
}
