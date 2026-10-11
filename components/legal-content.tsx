"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LEGAL_INFO } from "@/lib/legal-info";

type LegalTable = {
  headers: string[];
  rows: string[][];
};

// One content block inside a section. Exactly one key is set per block:
// p = paragraph, h = sub-heading, list = bullet list, table = data table.
type LegalBlock = {
  p?: string;
  h?: string;
  list?: string[];
  table?: LegalTable;
};

type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

const LINK_CLASS =
  "text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors";

// Replaces {tokens} with the business details from lib/legal-info.ts. Email,
// phone and website become links so they're clickable without per-string markup.
function applyTokens(text: string, locale: "en" | "es"): string {
  const { legalName, email, phone, address, website, effectiveDate } = LEGAL_INFO;
  return text
    .replaceAll("{legalName}", legalName)
    .replaceAll("{email}", `[${email}](mailto:${email})`)
    .replaceAll("{phone}", `[${phone.display}](tel:${phone.tel})`)
    .replaceAll("{address}", address)
    .replaceAll("{website}", `[${website.replace("https://", "")}](${website})`)
    .replaceAll("{effectiveDate}", effectiveDate[locale]);
}

// Tiny inline renderer for the two bits of markup the legal copy uses:
// **bold** and [label](href). Internal paths (/privacy) go through the
// locale-aware Link; mailto:/tel: stay plain; http(s) opens in a new tab.
function renderInline(text: string, locale: "en" | "es"): ReactNode {
  const parts = applyTokens(text, locale).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground/90">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href} className={LINK_CLASS}>
            {label}
          </Link>
        );
      }
      const external = href.startsWith("http");
      return (
        <a
          key={i}
          href={href}
          className={LINK_CLASS}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function LegalContent({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const locale = useLocale() as "en" | "es";

  const sections = t.raw("sections") as LegalSection[];
  const intro = t.raw("intro") as string[];
  const tocLabel = t("tocLabel");
  const inline = (text: string) => renderInline(text, locale);

  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-chart-2/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--glow-rgb)/0.02)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--glow-rgb)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-medium">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-fluid-h1 font-bold mb-4 text-heading">
            {t("title")}
          </h1>
          <p className="text-foreground/60 text-sm mb-10">
            {inline(t.raw("lastUpdated") as string)}
          </p>

          <div className="space-y-4 mb-10">
            {intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg text-foreground/70 leading-relaxed"
              >
                {inline(paragraph)}
              </p>
            ))}
          </div>

          <nav
            aria-label={tocLabel}
            className="mb-14 rounded-[4px] border border-border bg-card/50 p-6"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground/60 mb-4">
              {tocLabel}
            </h2>
            <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i + 1}`}
                    className="flex gap-3 text-sm text-foreground/70 hover:text-accent transition-colors"
                  >
                    <span className="text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              id={`section-${i + 1}`}
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-heading">
                <span className="text-accent tabular-nums mr-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>

              {section.blocks.map((block, j) => {
                if (block.h) {
                  return (
                    <h3
                      key={j}
                      className="text-lg font-semibold text-heading mt-6 mb-2"
                    >
                      {block.h}
                    </h3>
                  );
                }

                if (block.p) {
                  return (
                    <p
                      key={j}
                      className="text-foreground/70 leading-relaxed mb-4"
                    >
                      {inline(block.p)}
                    </p>
                  );
                }

                if (block.list) {
                  return (
                    <ul key={j} className="mt-2 mb-4 space-y-2">
                      {block.list.map((item, k) => (
                        <li
                          key={k}
                          className="flex gap-3 text-foreground/70 leading-relaxed"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{inline(item)}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.table) {
                  return (
                    <div
                      key={j}
                      className="mt-2 mb-6 overflow-x-auto rounded-[4px] border border-border"
                    >
                      <table className="w-full min-w-[34rem] text-left text-sm">
                        <thead className="bg-accent/5 text-heading">
                          <tr>
                            {block.table.headers.map((header, k) => (
                              <th
                                key={k}
                                scope="col"
                                className="px-4 py-3 font-semibold align-bottom"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-foreground/70">
                          {block.table.rows.map((row, k) => (
                            <tr key={k}>
                              {row.map((cell, l) => (
                                <td
                                  key={l}
                                  className="px-4 py-3 align-top leading-relaxed"
                                >
                                  {inline(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return null;
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
