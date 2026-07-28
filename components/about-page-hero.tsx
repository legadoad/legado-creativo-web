"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function AboutPageHero() {
  const t = useTranslations("aboutHero");
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--glow-rgb)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--glow-rgb)/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Solid circles */}
      <motion.div
        className="absolute top-[18%] left-[12%] w-4 h-4 bg-accent rounded-full"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[80%] left-[58%] w-4 h-4 bg-[#e0feae] rounded-full"
        animate={{
          y: [15, -15, 15],
          x: [8, -8, 8],
        }}
        transition={{
          duration: 6.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-[46%] left-[6%] w-4 h-4 bg-[#7a95d8] rounded-full"
        animate={{
          y: [-16, 16, -16],
          x: [-9, 9, -9],
        }}
        transition={{
          duration: 6.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* Outline circles */}
      <motion.div
        className="absolute top-[78%] left-[20%] w-6 h-6 border-2 border-chart-2 rounded-full"
        animate={{
          y: [20, -20, 20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[19%] left-[85%] w-6 h-6 border-2 border-[#e0feae] rounded-full"
        animate={{
          y: [-18, 18, -18],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute top-[50%] left-[92%] w-6 h-6 border-2 border-[#7a95d8] rounded-full"
        animate={{
          y: [17, -17, 17],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blurred squares */}
      <motion.div
        className="absolute top-[35%] left-[90%] w-3 h-3 bg-chart-2/50 rotate-45"
        animate={{
          y: [-15, 15, -15],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[74%] left-[80%] w-3 h-3 bg-[#e0feae]/50 rotate-45"
        animate={{
          y: [12, -12, 12],
          rotate: [45, -135, -315],
        }}
        transition={{
          duration: 7.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-[17%] left-[50%] w-3 h-3 bg-[#7a95d8]/50 rotate-45"
        animate={{
          y: [-13, 13, -13],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 7.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.8,
        }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8"
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(var(--glow-rgb) / 0.5)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-accent text-sm font-medium">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
          >
            <TypingAnimation
              as="span"
              className="text-foreground"
              duration={60}
              showCursor={false}
            >
              {`${t("titleLine1")} `}
            </TypingAnimation>
            <TypingAnimation
              as="span"
              className="bg-gradient-to-r from-accent via-chart-2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent inline-block"
              duration={60}
              delay={(t("titleLine1").length + 1) * 60}
            >
              {t("titleLine2")}
            </TypingAnimation>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2"
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
