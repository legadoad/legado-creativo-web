"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const packages = [
  {
    name: "Starter",
    price: "$1,500",
    description: "Perfect for small businesses and startups",
    features: [
      "Logo Design",
      "Brand Color Palette",
      "2 Social Media Templates",
      "Business Card Design",
      "1 Revision Round",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$3,500",
    description: "Complete branding solution for growing brands",
    features: [
      "Everything in Starter",
      "Full Brand Guidelines",
      "Website Design (5 pages)",
      "Social Media Kit (10 templates)",
      "Stationery Design",
      "3 Revision Rounds",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    features: [
      "Everything in Professional",
      "Unlimited Pages",
      "Custom Illustrations",
      "Motion Graphics",
      "Photography Direction",
      "Unlimited Revisions",
      "Dedicated Team",
      "24/7 Support",
    ],
    popular: false,
  },
]

export default function ServicesPricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-accent text-sm font-semibold tracking-widest mb-4"
          >
            PRICING
          </motion.p>
          <h2 className="text-fluid-h2 font-bold text-heading mb-6">
            Transparent <span className="text-accent">Pricing</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Flexible packages designed to meet your needs and budget
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -12, scale: pkg.popular ? 1.02 : 1.05 }}
              className={`relative group p-8 rounded-[4px] border transition-all duration-500 ${
                pkg.popular
                  ? "bg-gradient-to-b from-accent/10 to-card border-accent/30 scale-105"
                  : "bg-card border-border hover:border-accent/30"
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-background text-sm font-bold rounded-full flex items-center gap-1.5"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </motion.div>
                  Most Popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-heading mb-2">{pkg.name}</h3>
                <p className="text-foreground/60 text-sm mb-6">{pkg.description}</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="flex items-baseline justify-center gap-1"
                >
                  <span className="text-5xl font-bold text-foreground">{pkg.price}</span>
                  {pkg.price !== "Custom" && <span className="text-foreground/60">/project</span>}
                </motion.div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + i * 0.05 + 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        pkg.popular ? "bg-accent" : "bg-accent/20"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${pkg.popular ? "text-background" : "text-accent"}`} />
                    </motion.div>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full py-6 text-lg font-semibold rounded-full transition-all duration-300 bg-secondary-lime hover:bg-secondary-lime/90 text-secondary-blue cursor-pointer"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-foreground/50 text-sm mt-12"
        >
          All packages include initial consultation. Custom quotes available for unique projects.
        </motion.p>
      </div>
    </section>
  )
}
