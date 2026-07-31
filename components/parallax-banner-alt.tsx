"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxBannerAlt() {
  const bannerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15])

  return (
    <section ref={bannerRef} className="relative py-32 overflow-hidden bg-background">
      {/* Layered parallax shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layer 1 - slowest */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-pink-500/20 to-transparent blur-3xl"
        />

        {/* Layer 2 - medium */}
        <motion.div
          style={{ y: y2, rotate }}
          className="absolute top-1/4 right-[15%] w-32 h-32 border-2 border-accent/20 rounded-[4px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 left-[10%] w-24 h-24 bg-gradient-to-br from-accent/10 to-pink-500/10 rounded-full"
        />

        {/* Layer 3 - fastest */}
        <motion.div style={{ y: y3 }} className="absolute top-1/3 left-[20%] w-4 h-4 bg-accent rounded-full" />
        <motion.div style={{ y: y3 }} className="absolute bottom-1/3 right-[25%] w-3 h-3 bg-pink-500 rounded-full" />
        <motion.div style={{ y: y3 }} className="absolute top-1/2 right-[10%] w-2 h-2 bg-foreground/50 rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full mb-6">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Design That{" "}
              <span className="bg-gradient-to-r from-accent to-pink-500 bg-clip-text text-transparent">Speaks</span>
            </h2>
            <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
              We don't just create visuals—we craft experiences that resonate with your audience and elevate your brand
              to new heights.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: "250+", label: "Projects" },
                { number: "98%", label: "Satisfaction" },
                { number: "10+", label: "Years" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent">{stat.number}</div>
                  <div className="text-sm text-foreground/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - stacked cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] hidden md:block"
          >
            {/* Card stack */}
            <motion.div
              whileHover={{ y: -10, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-0 left-0 w-64 h-80 bg-gradient-to-br from-accent/20 to-accent/5 rounded-[4px] border border-accent/20 backdrop-blur-sm p-6 cursor-pointer"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-[4px] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Brand Identity</h3>
              <p className="text-foreground/60 text-sm">
                Complete visual systems that define your brand's unique personality.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-12 left-32 w-64 h-80 bg-gradient-to-br from-pink-500/20 to-pink-500/5 rounded-[4px] border border-pink-500/20 backdrop-blur-sm p-6 cursor-pointer"
            >
              <div className="w-12 h-12 bg-pink-500/20 rounded-[4px] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Web Design</h3>
              <p className="text-foreground/60 text-sm">
                Modern, responsive websites that engage and convert visitors.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-24 left-64 w-64 h-80 bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-[4px] border border-foreground/10 backdrop-blur-sm p-6 cursor-pointer"
            >
              <div className="w-12 h-12 bg-foreground/10 rounded-[4px] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Graphics</h3>
              <p className="text-foreground/60 text-sm">Eye-catching visuals for print and digital media.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  )
}
