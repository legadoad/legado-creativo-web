import "./globals.css";

// Root-level fallback — there's no app/layout.tsx (app/[locale]/layout.tsx
// provides the <html>/<body> for every real route), so this is the only
// not-found boundary reachable for paths that don't even resolve to a valid
// locale segment (e.g. a stray /foo, or the locale layout itself calling
// notFound() on an unsupported locale). No locale is known at this point,
// so this stays bilingual instead of using next-intl.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center font-sans antialiased">
        <span className="text-sm font-semibold tracking-widest text-accent">
          404
        </span>
        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-heading">
          This page went off-brand
          <br />
          Esta página se salió del guion
        </h1>
        <p className="max-w-md text-foreground/60">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved.
          <br />
          La página que buscas no existe o puede que se haya movido.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/en"
            className="rounded-full bg-secondary-lime px-6 py-3 text-sm font-medium text-secondary-blue transition hover:bg-secondary-lime/90"
          >
            English
          </a>
          <a
            href="/es"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent/50 hover:text-accent"
          >
            Español
          </a>
        </div>
      </body>
    </html>
  );
}
