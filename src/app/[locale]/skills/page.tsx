"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import skills from "@/data/skills.json";
import categories from "@/data/categories.json";

type Skill = (typeof skills)[number];

const categoryAccent: Record<string, string> = {
  cex: "#fbbf24",
  news: "#38bdf8",
  onchain: "#D4A574",
  analytics: "#34d399",
  security: "#f87171",
  trading: "#4ade80",
  frontend: "#f472b6",
  devtools: "#fb923c",
  multiagent: "#E8734A",
  cloud: "#22d3ee",
  data: "#a3e635",
  media: "#F09070",
  marketing: "#fb7185",
  productivity: "#94a3b8",
};

/* ─── Fade-up 動畫 hook ─── */
function useFadeUp() {
  const [visibleSet, setVisibleSet] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-skill-id");
            if (id) {
              setVisibleSet((prev) => {
                const next = new Set(prev);
                next.add(id);
                return next;
              });
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const observe = useCallback((el: HTMLElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return { visibleSet, observe };
}

/* ─── 一鍵複製按鈕 ─── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    [text]
  );

  return (
    <button
      onClick={handleCopy}
      className={`flex-shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition-all duration-200 ${
        copied
          ? "bg-green-500/20 text-green-400"
          : "text-text-muted hover:bg-white/5 hover:text-foreground"
      }`}
      title={text}
    >
      {copied ? "✓" : "📋"}
    </button>
  );
}

/* ─── 格式化 stars 數字 ─── */
function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`;
  }
  return String(stars);
}

export default function SkillsPage() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") ?? "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sortByStars, setSortByStars] = useState(false);
  const { visibleSet, observe } = useFadeUp();

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const filtered = useMemo(() => {
    let result: Skill[] = [...skills];

    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.nameZh.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.descriptionZh.toLowerCase().includes(q) ||
          s.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          s.tagsZh.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // 排序：essentials 置頂，然後按 stars 或預設
    if (sortByStars) {
      result.sort((a, b) => {
        if (a.isEssential !== b.isEssential) return a.isEssential ? -1 : 1;
        return (b.stars ?? 0) - (a.stars ?? 0);
      });
    } else {
      result.sort((a, b) => {
        if (a.isEssential !== b.isEssential) return a.isEssential ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [activeCategory, search, sortByStars]);

  const allCategories = [
    { id: "all", nameZh: t("all"), name: t("all") },
    ...categories,
  ];

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <Breadcrumb currentPage={t("title")} />

        {/* Header */}
        <div className="text-center">
          <h1 className="text-gradient-claude font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl border border-card-border bg-card-bg py-3 pl-12 pr-4 text-sm text-foreground placeholder-text-muted outline-none transition-colors duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-8 py-4 -mx-4 px-4 overflow-x-auto scrollbar-hide sm:mx-0 sm:px-0 sm:overflow-x-visible">
          <div className="flex gap-2 sm:flex-wrap sm:justify-center min-w-max sm:min-w-0">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary/20 text-primary-light border border-primary/40"
                    : "border border-card-border text-text-muted hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {locale === "zh-TW" ? cat.nameZh : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort + Count */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-text-muted">
            {filtered.length} {t("skillCount")}
          </span>
          <button
            onClick={() => setSortByStars((prev) => !prev)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
              sortByStars
                ? "bg-primary/15 text-primary-light border border-primary/30"
                : "border border-card-border text-text-muted hover:text-foreground"
            }`}
          >
            {sortByStars ? `⭐ ${t("sortByStars")}` : t("sortDefault")}
          </button>
        </div>

        {/* Skills Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((skill, index) => {
              const accent = categoryAccent[skill.category] || "#D4A574";
              const isVisible = visibleSet.has(skill.id);
              const staggerDelay = Math.min(index * 50, 300);

              return (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.id}`}
                  className="group block"
                >
                  <div
                    ref={observe}
                    data-skill-id={skill.id}
                    className="skill-card relative h-full overflow-hidden rounded-2xl border border-card-border bg-card-bg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_4px_24px_rgba(232,115,74,0.08)]"
                    style={{
                      // @ts-expect-error CSS custom property
                      "--card-accent": accent,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "none"
                        : "translateY(16px)",
                      transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
                    }}
                  >
                    {/* Hover 頂部 accent 漸層線 */}
                    <div
                      className="h-[2px] w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                      }}
                    />

                    <div className="relative px-5 py-5">
                      {/* Badges 區域（右上角） */}
                      <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
                        {skill.isEssential && (
                          <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                            ⭐ {t("essential")}
                          </span>
                        )}
                        {skill.isOfficial && (
                          <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-medium text-blue-400">
                            {t("detail.official")}
                          </span>
                        )}
                        {skill.verdict === "warn" && (
                          <span
                            className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400"
                            title={skill.warning || ""}
                          >
                            ⚠️ {t("detail.auditWarn")}
                          </span>
                        )}
                      </div>

                      {/* Icon + Name + Category */}
                      <div className="flex items-start gap-3 pr-20">
                        <span className="text-2xl">{skill.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-base font-semibold text-foreground truncate">
                            {locale === "zh-TW" ? skill.nameZh : skill.name}
                          </h3>
                          <span
                            className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: `${accent}1a`,
                              color: accent,
                            }}
                          >
                            {locale === "zh-TW"
                              ? categories.find((c) => c.id === skill.category)?.nameZh
                              : categories.find((c) => c.id === skill.category)?.name}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-muted">
                        {locale === "zh-TW"
                          ? skill.descriptionZh
                          : skill.description}
                      </p>

                      {/* Stars + Tags */}
                      <div className="mt-3 flex items-center gap-3">
                        {skill.stars != null && skill.stars > 0 && (
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-amber-400">
                              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                            </svg>
                            {formatStars(skill.stars)}
                          </span>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                          {(locale === "zh-TW" ? skill.tagsZh : skill.tags)
                            .slice(0, 3)
                            .map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Install 指令 + 複製 */}
                      {skill.installCmd && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/20 px-3 py-2">
                          <code className="flex-1 truncate font-mono text-[11px] text-text-muted">
                            {skill.installCmd}
                          </code>
                          <CopyButton text={skill.installCmd} />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <div className="text-5xl">🔍</div>
            <p className="mt-4 text-lg font-medium text-foreground">
              {t("noResults")}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              {t("noResultsHint")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
