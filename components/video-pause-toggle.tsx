"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";

// Pause/play control for the looping background videos in the surrounding
// <section> (WCAG 2.2.2: auto-playing motion longer than 5s needs a way to
// stop it). Also starts those videos paused for visitors whose OS asks for
// reduced motion. Drop it inside any <section> that contains <video> elements.
export default function VideoPauseToggle({
  className = "absolute bottom-4 left-4 z-30",
}: {
  className?: string;
}) {
  const t = useTranslations("a11y");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  const getVideos = () =>
    Array.from(buttonRef.current?.closest("section")?.querySelectorAll("video") ?? []);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    getVideos().forEach((video) => {
      video.autoplay = false;
      video.pause();
    });
    setPaused(true);
  }, []);

  const toggle = () => {
    const next = !paused;
    getVideos().forEach((video) => {
      if (next) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    });
    setPaused(next);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={paused ? t("playVideo") : t("pauseVideo")}
      className={`${className} flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 cursor-pointer`}
    >
      {paused ? <Play size={16} className="fill-white" /> : <Pause size={16} className="fill-white" />}
    </button>
  );
}
