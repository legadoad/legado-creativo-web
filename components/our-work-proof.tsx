"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Lock } from "lucide-react";

// Full-page screenshots. At rest the frame shows just the top slice (roughly
// each site's hero); on hover it slow-scrolls down through the whole capture.
const CASES = [
  { img: "/portfolio/porterparts.webp", ratio: 1801 / 5228 },
  { img: "/portfolio/templeofgroombarbershop.webp", ratio: 1100 / 6052 },
  { img: "/portfolio/cjbservice.webp", ratio: 1801 / 6236 },
];

const SCREEN_HEIGHT = "clamp(220px, 24vw, 320px)";

export default function OurWorkProof() {
  const t = useTranslations("ourWorkProof");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cases = t.raw("cases") as {
    name: string;
    url: string;
    result: string;
    tags: string[];
  }[];

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">
            {t("sectionLabel")}
          </p>
          <h2 className="text-fluid-h2 font-bold text-accent tracking-tight">
            {t("title")}{" "}
            <span className="text-secondary-blue">{t("titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {cases.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group flex flex-col rounded-[4px] border border-border overflow-hidden bg-card transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 h-10 px-4 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                  <span className="w-2 h-2 rounded-full bg-border" />
                </div>
                <div className="flex-1 flex items-center gap-1.5 h-6 px-3 rounded-full bg-background border border-border text-[11px] text-foreground/50 truncate">
                  <Lock className="w-2.5 h-2.5 flex-shrink-0" />
                  {c.url}
                </div>
              </div>

              {/* Screenshot: fixed-height window, full capture slow-scrolls into view on hover */}
              <div
                className="relative overflow-hidden bg-muted"
                style={{ height: SCREEN_HEIGHT }}
              >
                <div
                  className="absolute inset-x-0 top-0 w-full transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:duration-[9000ms] group-hover:ease-linear group-hover:translate-y-[calc(-100%+var(--screen-h))]"
                  style={
                    {
                      aspectRatio: CASES[i].ratio,
                      "--screen-h": SCREEN_HEIGHT,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={CASES[i].img}
                    alt={`Sitio de ${c.name}`}
                    fill
                    sizes="(max-width: 768px) 92vw, 30vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-heading tracking-tight">
                    {c.name}
                  </h3>
                  <a
                    href={`https://${c.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-foreground/50 whitespace-nowrap transition-colors group-hover:text-accent"
                  >
                    {t("viewProject")}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <p className="text-sm text-foreground/60 leading-relaxed">
                  {c.result}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium text-accent bg-accent/10 border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
