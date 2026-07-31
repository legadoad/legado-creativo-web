"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Linkedin, Twitter, Dribbble } from "lucide-react";
import { useTranslations } from "next-intl";

const teamImages = [
  "/professional-headshot-creative-director-male.jpg",
  "/female-designer-headshot.png",
  "/professional-headshot-male-motion-designer.jpg",
  "/professional-headshot-female-brand-strategist.jpg",
];

export default function AboutTeam() {
  const t = useTranslations("aboutTeam");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-32 px-6 bg-gradient-to-b from-transparent via-card/50 to-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamImages.map((image, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative overflow-hidden rounded-[4px] mb-6"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={t(`members.${i}.name`)}
                    fill
                    className="object-cover"
                  />

                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: hoveredIndex === i ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gradient-overlay via-background/20 to-transparent flex items-end justify-center pb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex gap-3"
                    initial={{ y: 20 }}
                    animate={{ y: hoveredIndex === i ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {[Linkedin, Twitter, Dribbble].map((Icon, idx) => (
                      <motion.a
                        key={idx}
                        href="#"
                        className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-foreground hover:text-accent hover:bg-accent/10 transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: hoveredIndex === i ? 1 : 0,
                          scale: hoveredIndex === i ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={18} />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute inset-0 border-2 border-accent/50 rounded-[4px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <motion.h3
                className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors"
                animate={{ x: hoveredIndex === i ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {t(`members.${i}.name`)}
              </motion.h3>
              <div className="text-accent text-sm font-medium mb-2">
                {t(`members.${i}.role`)}
              </div>
              <p className="text-foreground/60 text-sm">
                {t(`members.${i}.bio`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
