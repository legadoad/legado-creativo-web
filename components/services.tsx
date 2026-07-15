"use client"

import { useRef, useState } from "react"
import { Palette, Smartphone, Globe, Sparkles, ArrowRight } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const services = [
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching visuals that tell your brand story and leave lasting impressions on your audience.",
    color: "from-pink-500 to-accent",
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Beautiful, responsive websites that convert visitors into customers with stunning UX.",
    color: "from-accent to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Mobile UI/UX",
    description: "Intuitive mobile interfaces designed for engagement and seamless user experiences.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Branding",
    description: "Comprehensive brand strategies that elevate your identity and resonate with your market.",
    color: "from-cyan-500 to-accent",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const leftBlobY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rightBlobY = useTransform(scrollYProgress, [0, 1], [-50, 150])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
      <motion.div
        style={{ y: leftBlobY }}
        className="absolute top-1/4 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: rightBlobY }}
        className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.p variants={cardVariants} className="text-accent text-sm font-semibold tracking-widest mb-4">
            OUR SERVICES
          </motion.p>
          <motion.h2 variants={cardVariants} className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            What We <span className="text-accent">Offer</span>
          </motion.h2>
          <motion.p variants={cardVariants} className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Comprehensive creative solutions tailored to elevate your brand
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group p-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 relative overflow-hidden cursor-pointer"
                style={{ transformPerspective: 1000 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredIndex === index ? 0.1 : 0,
                    scale: hoveredIndex === index ? 1.2 : 0.8,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 bg-gradient-to-br ${service.color}`}
                />

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 mb-6 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="w-7 h-7 text-background" />
                  </motion.div>

                  <motion.h3
                    animate={{ color: hoveredIndex === index ? "rgb(var(--magenta-rgb))" : "rgb(255 255 255)" }}
                    className="text-2xl font-bold mb-3"
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-foreground/60 leading-relaxed mb-6">{service.description}</p>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-accent"
                  >
                    <span className="text-sm font-semibold">Learn More</span>
                    <motion.div
                      animate={{ x: hoveredIndex === index ? [0, 5, 0] : 0 }}
                      transition={{ duration: 0.6, repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 0.15 : 0.05,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  className="absolute top-6 right-6 text-6xl font-bold text-foreground"
                >
                  0{index + 1}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
