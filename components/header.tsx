"use client";

import { useEffect, useState, useRef } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter as useNextRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const nextRouter = useNextRouter();
  const locale = useLocale();
  const t = useTranslations("header");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 10);
      // scrolling down → hide, scrolling up → show
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const newPath = `/${newLocale}${pathname === "/" ? "" : pathname}`;
    nextRouter.push(newPath);
  };

  const navLinks = [
    { href: "/gallery", label: t("gallery") },
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  // at top: transparent bg, white text
  // scrolled: white bg, dark text
  const isTransparent = atTop;

  return (
    <motion.header
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-white shadow-sm border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/Logos/LEGADO_Logotipo-06.png"
            alt="Legado Logo"
            width={220}
            height={80}
            className="h-auto w-auto max-h-16 group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-accent"
                  : isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-gray-600 hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          {/* Language Switcher */}
          <button
            onClick={() => switchLocale(locale === "en" ? "es" : "en")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium uppercase transition rounded-md ${
              isTransparent
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-gray-600 hover:text-accent hover:bg-accent/10"
            }`}
            title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
          >
            <Globe size={16} />
            <span>{locale}</span>
          </button>

          <Link
            href="/contact"
            className="px-6 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => switchLocale(locale === "en" ? "es" : "en")}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium uppercase transition ${
              isTransparent ? "text-white/80" : "text-gray-600"
            }`}
          >
            <Globe size={16} />
            <span>{locale}</span>
          </button>
          <button
            className={isTransparent ? "text-white" : "text-gray-800"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-6 py-6 space-y-4 overflow-hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`block py-2 transition text-sm font-medium ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-gray-600 hover:text-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                href="/contact"
                className="block px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("cta")}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
