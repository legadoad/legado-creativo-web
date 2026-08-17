"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  MessageCircle,
  Play,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { strokes, type StrokeVariant } from "@/components/stroke-underline";
import { cn } from "@/lib/utils";
import type { InstagramPost } from "@/lib/instagram";

// ─── Props ──────────────────────────────────────────────────────────────────
// Generic, drop-in section: <InstagramFeed /> works with defaults anywhere.

interface InstagramFeedProps {
  /** Tailwind bg class for the section. Defaults to a plain white background. */
  bg?: string;
  /** How many posts to request/display */
  postCount?: number;
  strokeVariant?: StrokeVariant;
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function InstagramFeed({
  bg = "bg-background",
  postCount = 8,
  strokeVariant = "wide",
  className,
}: InstagramFeedProps) {
  const t = useTranslations("instagramFeed");
  const locale = useLocale();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (direction: "left" | "right") => {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const selected = selectedIndex !== null ? posts[selectedIndex] : null;

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? i : (i + 1) % posts.length));
    setDirection(1);
  }, [posts.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? i : (i - 1 + posts.length) % posts.length));
    setDirection(-1);
  }, [posts.length]);

  // Arrow-key navigation while the lightbox is open.
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goNext, goPrev]);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/instagram?limit=${postCount}`)
      .then((res) => res.json())
      .then((data: { username: string | null; posts: InstagramPost[] }) => {
        if (cancelled) return;
        setUsername(data.username);
        setPosts(data.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [postCount]);

  // Nothing to show and nothing loading — hide gracefully instead of a broken/empty section.
  if (!loading && posts.length === 0) return null;

  const Stroke = strokes[strokeVariant];
  const title = t("title");
  const highlightWord = t("highlightWord");
  const parts = highlightWord ? title.split(highlightWord) : [title];

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      ref={sectionRef}
      className={cn(bg, "py-16 md:py-24 px-6", className)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 tracking-wide uppercase mb-3">
              <Instagram size={16} strokeWidth={2} />
              {username ? `@${username}` : t("label")}
            </p>
            <h2 className="text-fluid-h2 font-bold text-heading tracking-tight max-w-2xl">
              {parts[0]?.trimEnd()}{" "}
              {highlightWord && (
                <span className="relative inline-block">
                  {highlightWord}
                  {isInView && <Stroke />}
                </span>
              )}
              {parts[1] && <>{" "}{parts[1].trimStart()}</>}
            </h2>
            <p className="mt-4 text-foreground/60 max-w-xl">{t("subtitle")}</p>
          </motion.div>

          {username && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="shrink-0"
            >
              <a
                href={`https://www.instagram.com/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center group cursor-pointer"
              >
                <span className="bg-heading text-background text-sm font-medium pl-6 pr-5 py-3.5 rounded-full transition-opacity duration-200 group-hover:opacity-80">
                  {t("followButton")}
                </span>
                <span className="bg-heading text-background w-11 h-11 rounded-full flex items-center justify-center transition-opacity duration-200 group-hover:opacity-80">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </motion.div>
          )}
        </div>

        {/* Row */}
        <div className="relative">
          {!loading && posts.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => scrollRow("left")}
                aria-label="Scroll left"
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-heading text-background items-center justify-center shadow-md hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollRow("right")}
                aria-label="Scroll right"
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-heading text-background items-center justify-center shadow-md hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {loading ? (
            <div className="flex gap-3 md:gap-4 overflow-hidden">
              {Array.from({ length: postCount }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-40 sm:w-52 md:w-60 lg:w-64 aspect-square rounded-[4px] bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              ref={rowRef}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
              className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {posts.map((post, index) => (
                <motion.button
                  key={post.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative shrink-0 snap-start w-40 sm:w-52 md:w-60 lg:w-64 aspect-square overflow-hidden rounded-[4px] border border-border/50 hover:border-accent/50 transition-colors duration-300 text-left cursor-pointer"
                >
                  <Image
                    src={post.imageUrl}
                    alt={post.caption ? post.caption.slice(0, 100) : "Instagram post"}
                    fill
                    sizes="(max-width: 768px) 40vw, 256px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {post.mediaType === "VIDEO" && (
                    <span className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <Play size={13} className="text-white fill-white ml-0.5" />
                    </span>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-gradient-overlay/90 via-gradient-overlay/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-4 pb-4">
                    <span className="flex items-center gap-1.5 text-white text-sm font-medium">
                      <Heart size={15} className="fill-white" />
                      {post.likeCount}
                    </span>
                    <span className="flex items-center gap-1.5 text-white text-sm font-medium">
                      <MessageCircle size={15} />
                      {post.commentCount}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="max-w-4xl sm:max-w-4xl w-[calc(100%-2rem)] max-h-[90vh] p-0 gap-0 overflow-hidden rounded-[4px] border-border/50">
          {selected && (
            <div className="grid md:grid-cols-[1.15fr_1fr] md:h-[600px] max-h-[90vh]">
              <div className="relative h-72 md:h-full bg-muted overflow-hidden">
                {/* Prev / next arrows — switch posts without closing the modal */}
                {posts.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label={t("previousPost")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label={t("nextPost")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={selected.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {selected.mediaType === "VIDEO" && selected.videoUrl ? (
                      <video
                        src={selected.videoUrl}
                        poster={selected.imageUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={selected.imageUrl}
                        alt={selected.caption ? selected.caption.slice(0, 100) : "Instagram post"}
                        fill
                        sizes="(max-width: 768px) 100vw, 58vw"
                        className="object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {posts.length > 1 && (
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    {selectedIndex! + 1} / {posts.length}
                  </span>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col min-h-0">
                <DialogHeader className="mb-5">
                  <DialogTitle className="flex items-center gap-3 text-base font-semibold text-heading">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-heading text-background flex items-center justify-center">
                      <Instagram size={16} />
                    </span>
                    {username ? `@${username}` : "Instagram"}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col flex-1 min-h-0">
                  <p className="text-sm text-foreground/70 leading-relaxed overflow-y-auto flex-1 min-h-0 whitespace-pre-line">
                    {selected.caption}
                  </p>

                  <div className="shrink-0">
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/50 text-sm text-foreground/60">
                      <span className="flex items-center gap-1.5">
                        <Heart size={15} />
                        {selected.likeCount}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle size={15} />
                        {selected.commentCount}
                      </span>
                      <span className="ml-auto text-xs">
                        {dateFormatter.format(new Date(selected.timestamp))}
                      </span>
                    </div>

                    <a
                      href={selected.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 w-full bg-heading text-background text-sm font-medium py-3.5 px-6 rounded-full transition-opacity duration-200 hover:opacity-80"
                    >
                      {t("viewOnInstagram")}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
