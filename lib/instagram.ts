// Server-only helper for the Instagram feed section (components/instagram-feed.tsx).
// Never import this from a client component — it reads INSTAGRAM_ACCESS_TOKEN.
//
// Uses the Instagram Graph API via "Instagram Login" (graph.instagram.com), which is
// what the "content management" Meta app template issues tokens for — no Facebook
// Page/IG Business Account ID needed, just the Instagram user access token.

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramPost {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  imageUrl: string;
  videoUrl?: string;
  permalink: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
}

export interface InstagramFeed {
  username: string | null;
  posts: InstagramPost[];
}

const GRAPH_API_VERSION = "v23.0";
const MEDIA_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count";

// Shown whenever the real feed can't be fetched — no token set, the Graph
// API errors out, or the request throws. This is what visitors actually see
// in that case (in dev and in prod), so it uses real Legado Creativo work
// from /public/images instead of a placeholder/empty section.
const FALLBACK_FEED: InstagramFeed = {
  username: "legadoad",
  posts: [
    {
      id: "mock-1",
      caption:
        "New brand identity, fresh off the press 🎨 Swipe to see the full system we built for our latest client.",
      mediaType: "IMAGE",
      imageUrl: "/images/home/brand-positioning.png",
      permalink: "https://www.instagram.com/legadoad/",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      likeCount: 214,
      commentCount: 12,
    },
    {
      id: "mock-2",
      caption: "Behind the scenes: turning a client's story into content that connects.",
      mediaType: "IMAGE",
      imageUrl: "/images/home/content-story.png",
      permalink: "https://www.instagram.com/legadoad/",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      likeCount: 158,
      commentCount: 6,
    },
    {
      id: "mock-3",
      caption: "Visual identity concepts for a new client — which direction is your favorite?",
      mediaType: "IMAGE",
      imageUrl: "/images/services/creative/visual-identity.jpg",
      permalink: "https://www.instagram.com/legadoad/",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
      likeCount: 302,
      commentCount: 27,
    },
    {
      id: "mock-4",
      caption: "A little motion never hurt anybody. Reel breakdown coming soon.",
      mediaType: "VIDEO",
      imageUrl: "/images/services/media/video-production.jpg",
      videoUrl: undefined,
      permalink: "https://www.instagram.com/legadoad/",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
      likeCount: 421,
      commentCount: 34,
    },
    {
      id: "mock-5",
      caption: "Bringing a brand to life through production that actually communicates.",
      mediaType: "IMAGE",
      imageUrl: "/images/home/creativity-production.png",
      permalink: "https://www.instagram.com/legadoad/",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
      likeCount: 189,
      commentCount: 9,
    },
    {
      id: "mock-6",
      caption: "Scaling a brand with strategy, content, and measurable performance.",
      mediaType: "IMAGE",
      imageUrl: "/images/home/digital-growth.png",
      permalink: "https://www.instagram.com/legadoad/",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 130).toISOString(),
      likeCount: 176,
      commentCount: 8,
    },
  ],
};

interface GraphMediaNode {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

function normalizeMedia(node: GraphMediaNode): InstagramPost {
  const isVideo = node.media_type === "VIDEO";
  return {
    id: node.id,
    caption: node.caption ?? "",
    mediaType: node.media_type,
    // Videos need a static poster image; thumbnail_url provides that.
    imageUrl: (isVideo ? node.thumbnail_url : node.media_url) ?? node.media_url ?? "",
    videoUrl: isVideo ? node.media_url : undefined,
    permalink: node.permalink,
    timestamp: node.timestamp,
    likeCount: node.like_count ?? 0,
    commentCount: node.comments_count ?? 0,
  };
}

function fallbackFeed(limit: number): InstagramFeed {
  return { ...FALLBACK_FEED, posts: FALLBACK_FEED.posts.slice(0, limit) };
}

export async function getInstagramFeed(limit = 8): Promise<InstagramFeed> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return fallbackFeed(limit);
  }

  try {
    const [profileRes, mediaRes] = await Promise.all([
      fetch(
        `https://graph.instagram.com/${GRAPH_API_VERSION}/me?fields=username&access_token=${accessToken}`,
        { next: { revalidate: 86400 } },
      ),
      fetch(
        `https://graph.instagram.com/${GRAPH_API_VERSION}/me/media?fields=${MEDIA_FIELDS}&limit=${limit}&access_token=${accessToken}`,
        { next: { revalidate: 86400 } },
      ),
    ]);

    const [profileData, mediaData] = await Promise.all([
      profileRes.json(),
      mediaRes.json(),
    ]);

    if (profileData?.error) {
      console.error("[instagram] profile fetch error:", profileData.error);
    }
    if (mediaData?.error) {
      console.error("[instagram] media fetch error:", mediaData.error);
      return fallbackFeed(limit);
    }

    const posts: InstagramPost[] = Array.isArray(mediaData?.data)
      ? mediaData.data.map(normalizeMedia).filter((post: InstagramPost) => post.imageUrl)
      : [];

    // An empty real feed reads as broken to a visitor — show the fallback
    // instead of a blank section.
    if (posts.length === 0) {
      return fallbackFeed(limit);
    }

    return { username: profileData?.username ?? null, posts };
  } catch (error) {
    console.error("[instagram] failed to fetch feed:", error);
    return fallbackFeed(limit);
  }
}
