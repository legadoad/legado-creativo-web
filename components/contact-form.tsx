"use client";

import { useRef, useState, type FocusEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

// Public by design — Cloudflare's site keys are meant to be visible
// client-side, only the secret key (verified server-side) is sensitive.
// Unset until the key is added: the widget just doesn't render, and the
// API route skips verification too (see lib/turnstile.ts), so the form
// keeps working in the meantime instead of being blocked on it.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale() as "en" | "es";
  const creativeServices = t.raw("serviceOptions.creative") as string[];
  const mediaServices = t.raw("serviceOptions.media") as string[];
  const technologyServices = t.raw("serviceOptions.technology") as string[];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      website: "",
      // Satisfies validation when Turnstile isn't configured yet — the
      // server applies the same graceful skip (see lib/turnstile.ts).
      turnstileToken: TURNSTILE_SITE_KEY ? "" : "not-configured",
      // Determines which language the confirmation email is sent in.
      locale,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("submit_failed");
      }

      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError(t("errors.submitFailed"));
    }
  };

  // register()'s own onBlur (triggers validation) and the visual
  // focus-glow's onBlur (clears it) would otherwise silently overwrite one
  // another if both were spread onto the same element — this merges them.
  const withFocusTracking = (field: "name" | "email" | "company" | "message") => {
    const { onBlur, ...rest } = register(field);
    return {
      ...rest,
      onFocus: () => setFocusedField(field),
      onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onBlur(e);
        setFocusedField(null);
      },
    };
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
          className="text-2xl font-bold text-heading mb-4"
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
        className="text-3xl font-bold text-heading mb-2 tracking-tight"
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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        variants={formVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Honeypot — hidden from real visitors (off-screen, not display:none
            so it still reads as "visible" to naive bots), any value here
            marks the submission as spam. See lib/contact-schema.ts. */}
        <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

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
                aria-invalid={!!errors.name}
                className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder={t("namePlaceholder")}
                {...withFocusTracking("name")}
              />
            </motion.div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-destructive">{t("errors.required")}</p>
            )}
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
                aria-invalid={!!errors.email}
                className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                placeholder={t("emailPlaceholder")}
                {...withFocusTracking("email")}
              />
            </motion.div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive">
                {errors.email.type === "invalid_string" || errors.email.type === "invalid_format"
                  ? t("errors.invalidEmail")
                  : t("errors.required")}
              </p>
            )}
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
            className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
            placeholder={t("companyPlaceholder")}
            {...withFocusTracking("company")}
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
            aria-invalid={!!errors.service}
            className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition appearance-none cursor-pointer"
            defaultValue=""
            {...register("service")}
          >
            <option value="">{t("serviceDefault")}</option>
            <optgroup label={t("serviceOptions.groups.creative")}>
              {creativeServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </optgroup>
            <optgroup label={t("serviceOptions.groups.media")}>
              {mediaServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </optgroup>
            <optgroup label={t("serviceOptions.groups.technology")}>
              {technologyServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </optgroup>
            <option value="other">{t("serviceOptions.other")}</option>
          </select>
          {errors.service && (
            <p className="mt-1.5 text-xs text-destructive">{t("errors.required")}</p>
          )}
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
            aria-invalid={!!errors.message}
            className="w-full px-4 py-3 bg-card border border-border rounded-[4px] text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition resize-none"
            placeholder={t("messagePlaceholder")}
            {...withFocusTracking("message")}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-destructive">{t("errors.required")}</p>
          )}
        </motion.div>

        {TURNSTILE_SITE_KEY && (
          <motion.div variants={fieldVariants}>
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
              onExpire={() => setValue("turnstileToken", "", { shouldValidate: true })}
              onError={() => setValue("turnstileToken", "", { shouldValidate: true })}
              // "interaction-only": stays fully invisible and reserves no
              // space for most visitors — Cloudflare verifies them silently
              // in the background. A visible checkbox/challenge only
              // appears if the visitor is flagged as needing one.
              options={{ theme: "light", appearance: "interaction-only" }}
            />
            {errors.turnstileToken && (
              <p className="mt-1.5 text-xs text-destructive">{t("errors.turnstile")}</p>
            )}
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-[4px] border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {submitError}
          </motion.div>
        )}

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
