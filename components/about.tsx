"use client";

import { useRef } from "react";
import { CheckCircle2, Award, Users, Zap, Heart } from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("homeAbout");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgCircle1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgCircle2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });

  const values = [
    { icon: Award, key: "excellence" },
    { icon: Users, key: "collaboration" },
    { icon: Zap, key: "innovation" },
    { icon: Heart, key: "passion" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden"
    >
      <motion.div
        style={{ y: bgCircle1Y }}
        className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgCircle2Y }}
        className="absolute bottom-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 45,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/5 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.p
            variants={itemVariants}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            {t("sectionLabel")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            {t("titleLine1")}
            <motion.span
              className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0%", "200%"] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {t("titleLine2")}
            </motion.span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-foreground/60 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Collage with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              style={{ y: smoothImageY }}
              className="relative h-[600px]"
            >
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl overflow-hidden border-2 border-accent/20 shadow-2xl shadow-accent/10"
                style={{ transformPerspective: 1000 }}
              >
                <img
                  src="/modern-creative-agency-office-workspace-with-desig.jpg"
                  alt="Our workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/60 to-transparent" />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                whileHover={{ scale: 1.02, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute bottom-0 right-0 w-2/3 h-1/2 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-xl"
                style={{ transformPerspective: 1000 }}
              >
                <img
                  src="/designer-working-on-tablet-creative-studio.jpg"
                  alt="Designer at work"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 bg-accent text-background px-6 py-3 rounded-full font-bold shadow-lg shadow-accent/30"
              >
                {t("foundedBadge")}
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-4 left-1/4 w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-2xl border border-primary/30 flex items-center justify-center"
              >
                <Award className="w-10 h-10 text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("contentTitle")}
              <span className="text-accent">{t("contentTitleAccent")}</span>
            </h3>
            <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-lg text-foreground/60 mb-10 leading-relaxed">
              {t("paragraph2")}
            </p>

            <ul className="space-y-4 mb-10">
              {[0, 1, 2, 3].map((i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 text-foreground/80"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  </motion.div>
                  {t(`bulletPoints.${i}`)}
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-secondary-lime text-secondary-blue font-semibold rounded-xl overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">{t("learnMore")}</span>
              <motion.div
                className="absolute inset-0 bg-secondary-lime/70"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
