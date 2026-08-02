"use client";

import { Link } from "@/i18n/navigation";
import { Mail, Instagram, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-gradient-to-b from-transparent to-primary/5 pt-8 pb-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-3 group">
              <Image
                src="/Logos/LEGADO_Logotipo-06.png"
                alt="Legado Logo"
                width={180}
                height={60}
                className="h-auto w-auto max-h-12 group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
            <p className="text-foreground/60 text-sm text-center md:text-left max-w-xs">
              {t("tagline")}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:items-end">
            <h4 className="font-semibold text-[#1A1A1A] mb-3">
              {t("connect")}
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com/legadoad", label: "Instagram", external: true },
                { icon: Facebook, href: "https://www.facebook.com/legadoad", label: "Facebook", external: true },
                { icon: Mail, href: "/contact", label: "Email", external: false },
              ].map((social, i) => {
                const Icon = social.icon;
                const className =
                  "w-10 h-10 bg-card border border-border rounded-[4px] flex items-center justify-center text-foreground/60 hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition";

                if (social.external) {
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={className}
                    >
                      <Icon size={18} />
                    </a>
                  );
                }

                return (
                  <Link
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className={className}
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-foreground/40 text-sm text-center">
              {t("copyright")}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-foreground/40 hover:text-accent text-sm transition"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-foreground/40 hover:text-accent text-sm transition"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
          <div className="mt-1 text-center">
            <a
              href="https://developwave.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/25 hover:text-foreground/50 text-xs transition"
            >
              {t("poweredBy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
