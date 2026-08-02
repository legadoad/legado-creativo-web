"use client";

import type React from "react";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        ref={sectionRef}
        className="bg-card border border-border rounded-[4px] p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
        </motion.div>
        <motion.h3
          className="text-2xl font-bold text-[#1A1A1A] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t("successTitle")}
        </motion.h3>
        <motion.p
          className="text-foreground/60 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t("successMessage")}
        </motion.p>
        <motion.button
          onClick={() => setIsSubmitted(false)}
          className="text-accent hover:text-accent/80 font-medium transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("sendAnother")}
        </motion.button>
      </motion.div>
    );
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-3xl font-bold text-[#1A1A1A] mb-2 tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        {t("title")}
      </motion.h2>
      <motion.p
        className="text-foreground/60 mb-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        {t("subtitle")}
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        variants={formVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={fieldVariants}
          className="grid sm:grid-cols-2 gap-6"
        >
          <div className="relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("nameLabel")}
            </label>
            <motion.div
              animate={{
                boxShadow:
                  focusedField === "name"
                    ? "0 0 0 2px rgb(var(--glow-rgb) / 0.3)"
                    : "none",
              }}
              className="rounded-[4px]"
            >
              <input
                type="text"
                id="name"
                required
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder={t("namePlaceholder")}
              />
            </motion.div>
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {t("emailLabel")}
            </label>
            <motion.div
              animate={{
                boxShadow:
                  focusedField === "email"
                    ? "0 0 0 2px rgb(var(--glow-rgb) / 0.3)"
                    : "none",
              }}
              className="rounded-[4px]"
            >
              <input
                type="email"
                id="email"
                required
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder={t("emailPlaceholder")}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={fieldVariants}>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t("companyLabel")} <span className="text-foreground/40">{t("companyOptional")}</span>
          </label>
          <input
            type="text"
            id="company"
            onFocus={() => setFocusedField("company")}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
            placeholder={t("companyPlaceholder")}
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t("serviceLabel")}
          </label>
          <select
            id="service"
            required
            className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition appearance-none cursor-pointer"
          >
            <option value="">{t("serviceDefault")}</option>
            <option value="web-design">{t("serviceOptions.webDesign")}</option>
            <option value="brand-identity">{t("serviceOptions.brandIdentity")}</option>
            <option value="ui-ux">{t("serviceOptions.uiUx")}</option>
            <option value="motion-graphics">{t("serviceOptions.motionGraphics")}</option>
            <option value="print-design">{t("serviceOptions.printDesign")}</option>
            <option value="other">{t("serviceOptions.other")}</option>
          </select>
        </motion.div>

        <motion.div variants={fieldVariants}>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            rows={5}
            required
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition resize-none"
            placeholder={t("messagePlaceholder")}
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-secondary-lime text-secondary-blue font-semibold rounded-full hover:bg-secondary-lime/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t("submitting")}
                </motion.div>
              ) : (
                <motion.div
                  key="send"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {t("submit")}
                  <Send className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
