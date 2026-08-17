import { NextRequest, NextResponse } from "next/server";
import { getInstagramFeed } from "@/lib/instagram";

// Reading `request.nextUrl.searchParams` makes this route dynamic, so the
// `revalidate` export alone can't promise edge caching — set Cache-Control
// explicitly so Vercel's CDN serves the same response to every visitor for
// a full day instead of re-invoking this function (and hitting the
// Instagram Graph API) on every page load.
const ONE_DAY = 60 * 60 * 24;

export const revalidate = ONE_DAY;

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = Math.min(Math.max(Number(limitParam) || 8, 1), 24);

  const feed = await getInstagramFeed(limit);

  return NextResponse.json(feed, {
    headers: {
      // Edge/CDN caches for 24h; while revalidating in the background, keep
      // serving the stale copy for up to 7 more days if Instagram's API is
      // slow or erroring, so the section never blocks on a live fetch.
      "Cache-Control": `public, s-maxage=${ONE_DAY}, stale-while-revalidate=${ONE_DAY * 7}`,
    },
  });
}
