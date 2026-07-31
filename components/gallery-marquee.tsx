"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const galleryImages = [
  { src: "/luxury-brand-packaging-design-mockup.jpg", alt: "Brand packaging" },
  { src: "/modern-website-design-on-laptop-mockup.jpg", alt: "Website design" },
  {
    src: "/creative-poster-design-colorful-typography.jpg",
    alt: "Poster design",
  },
  { src: "/mobile-app-ui-design-dark-theme.jpg", alt: "App design" },
  { src: "/corporate-business-card-design-elegant.jpg", alt: "Business cards" },
  { src: "/social-media-post-design-creative.jpg", alt: "Social media" },
];

export default function GalleryMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const row1X = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const row2X = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center mb-16 px-6"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        >
          Design <span className="text-accent">Gallery</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-foreground/60 max-w-xl mx-auto"
        >
          A glimpse into our creative universe
        </motion.p>
      </motion.div>

      <motion.div
        style={{ x: row1X }}
        className="flex animate-marquee-slow mb-8"
      >
        {[...galleryImages, ...galleryImages].map((img, index) => (
          <motion.div
            key={`row1-${index}`}
            className="flex-shrink-0 mx-4 group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-72 md:w-96 h-56 md:h-72 rounded-[4px] overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-500 relative">
              <motion.img
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className="w-full h-full object-cover"
                animate={{
                  scale: hoveredIndex === index ? 1.15 : 1,
                }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/80 via-transparent to-transparent flex items-end p-4"
              >
                <motion.span
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: hoveredIndex === index ? 0 : 10,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  className="text-foreground font-semibold"
                >
                  {img.alt}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div style={{ x: row2X }} className="flex animate-marquee-reverse">
        {[...galleryImages]
          .reverse()
          .concat([...galleryImages].reverse())
          .map((img, index) => (
            <motion.div
              key={`row2-${index}`}
              className="flex-shrink-0 mx-4 group"
              onMouseEnter={() => setHoveredIndex(index + 100)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-72 md:w-96 h-56 md:h-72 rounded-[4px] overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-500 relative">
                <motion.img
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index + 100 ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index + 100 ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/80 via-transparent to-transparent flex items-end p-4"
                >
                  <motion.span
                    initial={{ y: 10, opacity: 0 }}
                    animate={{
                      y: hoveredIndex === index + 100 ? 0 : 10,
                      opacity: hoveredIndex === index + 100 ? 1 : 0,
                    }}
                    className="text-foreground font-semibold"
                  >
                    {img.alt}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
