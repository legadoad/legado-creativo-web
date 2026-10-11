import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Renders for any path under a valid /en or /es prefix that doesn't match a
// page (e.g. /en/nonexistent) — reached via app/[locale]/[...rest]/page.tsx
// calling notFound(), which is what lets this nested boundary catch it
// instead of falling through to the root app/not-found.tsx.
export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-32 pb-24 text-center">
        <span className="text-sm font-semibold tracking-widest text-accent">
          {t("badge")}
        </span>
        <h1 className="max-w-2xl text-fluid-h1 font-bold tracking-tight text-heading">
          {t("title")}
        </h1>
        <p className="max-w-md text-foreground/60">{t("description")}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-secondary-lime px-6 py-3 text-sm font-medium text-secondary-blue-ink transition hover:bg-secondary-lime/90"
          >
            {t("homeButton")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent/50 hover:text-accent"
          >
            {t("contactButton")}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
