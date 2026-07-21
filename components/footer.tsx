"use client";

import { Link } from "@/i18n/navigation";
import { Mail, Linkedin, Instagram, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-gradient-to-b from-transparent to-primary/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
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

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-foreground mb-4">
              {t("company")}
            </h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/"
                  className="text-foreground/60 hover:text-accent text-sm transition"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground/60 hover:text-accent text-sm transition"
                >
                  {t("about")}
                </Link>
              </li>

              <li>
                <Link
                  href="/#services"
                  className="text-foreground/60 hover:text-accent text-sm transition"
                >
                  {t("services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/60 hover:text-accent text-sm transition"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-foreground mb-4">
              {t("connect")}
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Mail, href: "/contact" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={i}
                    href={social.href}
                    className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-foreground/60 hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/40 text-sm text-center">
              {t("copyright")}
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-foreground/40 hover:text-accent text-sm transition"
              >
                {t("privacy")}
              </Link>
              <Link
                href="#"
                className="text-foreground/40 hover:text-accent text-sm transition"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
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
