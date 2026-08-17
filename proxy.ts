import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /static (static files)
  // - /_vercel (Vercel internals)
  // - all files with extensions (e.g. favicon.ico, robots.txt)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
