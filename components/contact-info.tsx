"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, Clock, Linkedin, Instagram, Twitter, Dribbble } from "lucide-react"
import { useTranslations } from "next-intl"

const contactIcons = [Mail, Phone, Clock]
const contactHrefs = [
  "mailto:vickyurbaneja@gmail.com",
  "tel:+16175155000",
  null,
]
const contactValues = [
  "vickyurbaneja@gmail.com",
  "+1 (617) 515-5000",
  null, // Will use translation for hours value
]

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
]

export default function ContactInfo() {
  const t = useTranslations("contactInfo")
  const labelKeys = ["email", "phone", "hours"]
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  }

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight" variants={itemVariants}>
        {t("title")}
      </motion.h2>
      <motion.p className="text-foreground/60 mb-8" variants={itemVariants}>
        {t("subtitle")}
      </motion.p>

      <div className="space-y-6 mb-12">
        {contactIcons.map((Icon, i) => {
          const href = contactHrefs[i]
          const value = contactValues[i] || t("hoursValue")
          const content = (
            <motion.div
              key={i}
              className="flex items-start gap-4 group"
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-secondary-lime rounded-[4px] flex items-center justify-center shrink-0 transition"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-5 h-5 text-accent" />
              </motion.div>
              <div>
                <div className="text-sm text-foreground/60 mb-1">{t(labelKeys[i])}</div>
                <div className="text-foreground font-medium group-hover:text-accent transition">{value}</div>
              </div>
            </motion.div>
          )

          return href ? (
            <a key={i} href={href} className="block">
              {content}
            </a>
          ) : (
            <div key={i}>{content}</div>
          )
        })}
      </div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-foreground mb-4">{t("followUs")}</h3>
        <div className="flex gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 bg-accent/10 rounded-[4px] flex items-center justify-center hover:bg-accent/20 transition"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 text-accent" />
              </motion.a>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        className="mt-12 p-6 bg-gradient-to-br from-accent/10 to-chart-2/5 border border-accent/20 rounded-[4px]"
        variants={itemVariants}
        whileHover={{
          scale: 1.02,
          borderColor: "rgb(var(--glow-rgb) / 0.4)",
          boxShadow: "0 10px 40px -10px rgb(var(--glow-rgb) / 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-foreground font-semibold">{t("quickResponse")}</span>
        </div>
        <p className="text-foreground/60 text-sm">
          {t("quickResponseText")}
        </p>
      </motion.div>
    </motion.div>
  )
}
