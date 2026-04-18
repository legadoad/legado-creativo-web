"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const solutionImages = [
  "/modern-ecommerce-website-design-dark-theme.jpg",
  "/digital-marketing-dashboard-app-interface.jpg",
  "/brand-identity-design-system-logo-mockup.jpg",
  "/interactive-portfolio-website-modern-design.jpg",
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const t = useTranslations("works");

  const cards = [0, 1, 2, 3];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] max-w-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-foreground/60 max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-12">
          {cards.map((index) => {
            const isLowerCard = index === 1 || index === 3;

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`group relative ${
                  isLowerCard ? "xl:mt-12" : "xl:mt-0"
                }`}
              >
                {/* Number behind card */}
                <div className="absolute -top-16 right-2 z-0 text-[72px] md:text-[90px] leading-none font-bold text-foreground/10 pointer-events-none select-none">
                  {" "}
                  {t(`cards.${index}.number`)}
                </div>

                {/* Card image */}
                <div className="relative z-10 aspect-[0.82/1] overflow-hidden rounded-2xl bg-[#d8d2c9]">
                  <Image
                    src={solutionImages[index]}
                    alt={t(`cards.${index}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="pt-4 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">
                    {t(`cards.${index}.title`)}
                  </h3>
                  <p className="mt-3 text-[15px] md:text-base text-foreground/60 leading-relaxed max-w-sm">
                    {t(`cards.${index}.description`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
