"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { strokes } from "@/components/stroke-underline";

export default function VideoBanner() {
  const t = useTranslations("videoBanner");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center "
        >
          <p className="text-accent text-sm font-semibold tracking-widest mb-4">
            {t("sectionLabel")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t("titleLine1")}
            <span className="text-accent relative inline-block">
              {t("titleHighlight")}
              {isInView && <strokes.oval />}
            </span>
            {t("titleLine2")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div style={{ y, opacity, scale }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-accent/20 shadow-2xl shadow-accent/10"
          >
            {/* Video Placeholder - Replace with actual video */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('/creative-agency-showreel-dark-cinematic.jpg')`,
              }}
            />

            {/* Video Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/80 via-transparent to-background/30" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(to right, hsl(var(--accent)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--accent)) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Center Play Button */}
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-accent"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              {isPlaying ? (
                <Pause className="w-10 h-10 md:w-12 md:h-12 text-background relative z-10" />
              ) : (
                <Play className="w-10 h-10 md:w-12 md:h-12 text-background relative z-10 ml-1" />
              )}
            </motion.button>

            {/* Video Controls */}
            <div className="absolute bottom-6 right-6 flex gap-3">
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm border border-accent/20 flex items-center justify-center cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-foreground" />
                ) : (
                  <Volume2 className="w-5 h-5 text-foreground" />
                )}
              </motion.button>
            </div>

            {/* Floating Text Overlay */}
            <div className="absolute bottom-8 left-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <p className="text-foreground/60 text-sm uppercase tracking-widest mb-2">
                  {t("showreelLabel")}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t("showreelTitle")}
                </h3>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="absolute -left-4 md:-left-8 top-1/4 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 md:p-6 shadow-xl"
          >
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
              {t("stat1Value")}
            </div>
            <div className="text-sm text-foreground/60">{t("stat1Label")}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="absolute -right-4 md:-right-8 bottom-1/4 bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-4 md:p-6 shadow-xl"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {t("stat2Value")}
            </div>
            <div className="text-sm text-foreground/60">{t("stat2Label")}</div>
          </motion.div>
        </motion.div>

        {/* Bottom Feature List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-card/30 backdrop-blur-sm border border-accent/10 rounded-2xl hover:border-accent/30 transition-all"
            >
              <h4 className="text-lg font-semibold text-foreground mb-1">
                {t(`features.${i}.label`)}
              </h4>
              <p className="text-sm text-foreground/60">
                {t(`features.${i}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
