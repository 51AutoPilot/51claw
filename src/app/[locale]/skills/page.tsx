"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import skills from "@/data/skills.json";
import categories from "@/data/categories.json";

type Skill = (typeof skills)[number];

// 分類 accent 色
const categoryAccent: Record<string, string> = {
  cex: "#fbbf24",
  news: "#38bdf8",
  onchain: "#a78bfa",
  analytics: "#34d399",
  security: "#f87171",
  trading: "#4ade80",
  frontend: "#f472b6",
  devtools: "#fb923c",
  multiagent: "#818cf8",
  cloud: "#22d3ee",
  data: "#a3e635",
  media: "#c084fc",
  marketing: "#fb7185",
  productivity: "#94a3b8",
};

// Fade-up 動畫用的 hook
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

export default function SkillsPage() {
  const t = useTranslations("skills");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") ?? "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const { visibleSet, observe } = useFadeUp();

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    // 同步到 URL query param
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
    let result: Skill[] = skills;

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
          s.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, search]);

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
          <h1 className="text-gradient-purple font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
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

        {/* Category Filter — 手機版水平滾動，桌面版 flex-wrap 換行 */}
        <div className="mt-8 -mx-4 px-4 overflow-x-auto scrollbar-hide sm:mx-0 sm:px-0 sm:overflow-x-visible">
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

        {/* Skills Grid */}
        {filtered.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((skill, index) => {
              const accent = categoryAccent[skill.category] || "#a78bfa";
              const isVisible = visibleSet.has(skill.id);
              const staggerDelay = Math.min(index * 50, 300);

              return (
                <div
                  key={skill.id}
                  ref={observe}
                  data-skill-id={skill.id}
                  className="skill-card group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg backdrop-blur-sm"
                  style={{
                    // @ts-expect-error CSS custom property
                    "--card-accent": accent,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "none" : "translateY(16px)",
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

                  <div className="relative px-6 py-5">
                    {/* 官方 badge（右上角） */}
                    {skill.isOfficial && (
                      <span className="absolute right-4 top-4 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                        Official
                      </span>
                    )}

                    {/* Warn 標記（右上角，官方下方） */}
                    {skill.verdict === "warn" && (
                      <span
                        className={`absolute ${skill.isOfficial ? "right-4 top-10" : "right-4 top-4"} text-amber-400 text-sm`}
                        title={skill.warning || ""}
                      >
                        ⚠️
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 pr-16">
                          <h3 className="font-heading text-base font-semibold text-foreground truncate">
                            {locale === "zh-TW" ? skill.nameZh : skill.name}
                          </h3>
                          {/* 分類 badge — 用分類 accent 色 */}
                          <span
                            className="flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: `${accent}1a`,
                              color: accent,
                            }}
                          >
                            {locale === "zh-TW"
                              ? categories.find(
                                  (c) => c.id === skill.category
                                )?.nameZh
                              : categories.find(
                                  (c) => c.id === skill.category
                                )?.name}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
                          {locale === "zh-TW"
                            ? skill.descriptionZh
                            : skill.description}
                        </p>
                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {skill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-card-border">
                      <Link
                        href={`/skills/${skill.id}`}
                        className="inline-flex w-full items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium text-text-muted transition-all duration-300 ease-out hover:text-foreground hover:bg-white/5"
                      >
                        {tCommon("viewDetails")}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
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
