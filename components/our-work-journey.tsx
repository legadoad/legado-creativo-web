"use client";

import { useRef } from "react";
import type { ComponentType } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ImagePlus, Newspaper, Presentation, Tv } from "lucide-react";

// Each milestone gets a different illustrative "device" frame around its
// placeholder media — purely decorative variety, not a literal product shot.
type FrameVariant = "browser" | "slide" | "newspaper" | "broadcast" | "brand";
const FRAME_ORDER: FrameVariant[] = [
  "browser",
  "slide",
  "newspaper",
  "broadcast",
  "brand",
];

function PlaceholderIcon({
  label,
  icon: Icon,
}: {
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-foreground/25">
      <Icon className="w-8 h-8" strokeWidth={1.5} />
      <span className="text-xs font-medium tracking-wide">{label}</span>
    </div>
  );
}

function BrowserFrame({ label }: { label: string }) {
  return (
    <div className="rounded-[8px] overflow-hidden border border-border shadow-sm">
      <div className="flex items-center gap-1.5 px-4 py-3 bg-card border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
        <div className="ml-3 flex-1 h-5 rounded-full bg-background/80 border border-border/60" />
      </div>
      <div className="aspect-video bg-background/60 flex items-center justify-center">
        <PlaceholderIcon label={label} icon={ImagePlus} />
      </div>
    </div>
  );
}

function SlideFrame({ label }: { label: string }) {
  return (
    <div className="rounded-[8px] overflow-hidden border border-border shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border text-[10px] font-semibold tracking-widest text-foreground/40">
        <span>SLIDE</span>
        <span>01 / 04</span>
      </div>
      <div className="aspect-video bg-background/60 flex items-center justify-center">
        <PlaceholderIcon label={label} icon={Presentation} />
      </div>
    </div>
  );
}

function NewspaperFrame({ label }: { label: string }) {
  return (
    <div className="rounded-[4px] border-2 border-border bg-card/40 p-5 shadow-sm">
      <div className="flex items-center justify-between border-b-2 border-foreground/15 pb-3 mb-4">
        <span className="font-serif font-bold text-lg tracking-wide text-foreground/60">
          THE DAILY
        </span>
        <span className="text-[10px] text-foreground/35 tracking-widest">
          EDITION
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 aspect-[4/3] rounded-[4px] bg-background/60 flex items-center justify-center">
          <PlaceholderIcon label={label} icon={Newspaper} />
        </div>
        <div className="col-span-1 space-y-2 pt-1">
          {[100, 80, 90, 60, 85].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-foreground/10"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BroadcastFrame({ label }: { label: string }) {
  return (
    <div className="rounded-[10px] border-4 border-border/70 bg-card/30 p-3 shadow-sm">
      <div className="aspect-video rounded-[4px] bg-background/60 flex items-center justify-center relative">
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-semibold tracking-widest text-foreground/40">
            LIVE
          </span>
        </div>
        <PlaceholderIcon label={label} icon={Tv} />
      </div>
    </div>
  );
}

function BrandFrame({ label }: { label: string }) {
  return (
    <div className="aspect-video rounded-[8px] border-2 border-accent bg-secondary-lime/30 flex flex-col items-center justify-center gap-3">
      <Image
        src="/Logos/LEGADO_isotipo-03.png"
        alt="Legado Creativo"
        width={72}
        height={72}
        className="w-14 h-14 md:w-16 md:h-16 object-contain"
      />
      <span className="text-xs font-medium tracking-wide text-foreground/40">
        {label}
      </span>
    </div>
  );
}

const FRAME_COMPONENTS: Record<FrameVariant, ComponentType<{ label: string }>> = {
  browser: BrowserFrame,
  slide: SlideFrame,
  newspaper: NewspaperFrame,
  broadcast: BroadcastFrame,
  brand: BrandFrame,
};

export default function OurWorkJourney() {
  const t = useTranslations("ourWorkJourney");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const milestones = t.raw("milestones") as {
    company: string;
    description: string;
  }[];

  return (
    <section ref={sectionRef} className="py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 md:mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">
            {t("sectionLabel")}
          </p>
          <h2 className="text-fluid-h2 font-bold text-[#282828] tracking-tight mb-6">
            {t("title")}
            <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="text-foreground/60 text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="divide-y divide-border">
          {milestones.map((milestone, i) => {
            const Frame = FRAME_COMPONENTS[FRAME_ORDER[i % FRAME_ORDER.length]];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <p className="text-accent font-bold text-sm tracking-widest mb-4">
                    {t("milestoneLabel")} — {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#282828] mb-5 tracking-tight">
                    {milestone.company}
                  </h3>
                  <p className="text-foreground/60 text-lg leading-relaxed max-w-lg">
                    {milestone.description}
                  </p>
                </div>

                <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                  <Frame label={t("mediaLabel")} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
