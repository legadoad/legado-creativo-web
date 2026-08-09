"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

export default function OurWorkClosing() {
  const t = useTranslations("ourWorkClosing");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#16233f] py-20 md:py-28 px-6"
    >
      {/* Decorative concentric circles, bleeding off the right edge */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/10" />
        <div className="absolute -right-56 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-serif italic text-xl md:text-2xl text-white/90 mb-12 md:mb-16 text-balance"
        >
          &ldquo;{t("quote")}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white/[0.06] border border-white/10 rounded-[8px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
        >
          <Image
            src="/Logos/LEGADO_Logotipo-05.png"
            alt="Legado Creativo"
            width={200}
            height={56}
            className="w-40 md:w-44 h-auto flex-shrink-0"
          />
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            {t("description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
