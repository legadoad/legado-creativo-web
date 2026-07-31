"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type LegalSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export default function LegalContent({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);

  const sections = t.raw("sections") as LegalSection[];
  const intro = t.raw("intro") as string[];

  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-chart-2/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--glow-rgb)/0.02)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--glow-rgb)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-medium">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-foreground/50 text-sm mb-10">{t("lastUpdated")}</p>

          <div className="space-y-4 mb-14">
            {intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg text-foreground/70 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                <span className="text-accent tabular-nums mr-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>

              {section.body?.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-foreground/70 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="mt-2 space-y-2">
                  {section.list.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-foreground/70 leading-relaxed"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
