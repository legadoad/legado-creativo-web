"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoPauseToggle from "@/components/video-pause-toggle";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLogo, setShowLogo] = useState(false);

  // Safari (and every iOS browser, all WebKit) renders the WebM alpha as black, so skip the logo overlay there
  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isDesktopSafari =
      /Safari/.test(ua) && !/Chrome|Chromium|Android|Edg|OPR|Firefox/.test(ua);
    setShowLogo(!isIOS && !isDesktopSafari);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/Banner.mp4" type="video/mp4" />
      </video>
      <VideoPauseToggle className="absolute bottom-8 left-6 z-20" />
      {/* Logo video overlay */}
      {showLogo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          disablePictureInPicture
          className="absolute inset-0 z-[5] w-full h-full object-contain pointer-events-none"
        >
          <source src="/videos/LOGOTIPOLEGADO.webm" type='video/webm; codecs="vp09.00.10.08"' />
        </video>
      )}
      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-8"
      ></motion.div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1.5 h-3 bg-accent rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
