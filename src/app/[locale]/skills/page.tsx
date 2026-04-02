"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import skills from "@/data/skills.json";
import categories from "@/data/categories.json";

type Skill = (typeof skills)[number];

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
      className={`flex-shrink-0 rounded px-2 py-1 text-[11px] font-medium transition-colors duration-200 ${
        copied
          ? "bg-green-500/20 text-green-400"
          : "text-text-muted hover:text-foreground"
      }`}
      title={text}
    >
      {copied ? "✓" : "Copy"}
    </button>
  );
}

function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
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
    <div className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb currentPage={t("title")} />

        {/* Header */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-lg">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              width="16"
              height="16"
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
              className="w-full rounded border border-card-border bg-card-bg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-text-muted outline-none transition-colors duration-200 focus:border-primary/40"
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
                className={`shrink-0 rounded px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary/15 text-primary-light"
                    : "border border-card-border text-text-muted hover:text-foreground"
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
            className={`rounded px-3 py-1.5 text-xs transition-colors duration-200 ${
              sortByStars
                ? "bg-primary/15 text-primary-light"
                : "border border-card-border text-text-muted hover:text-foreground"
            }`}
          >
            {sortByStars ? `⭐ ${t("sortByStars")}` : t("sortDefault")}
          </button>
        </div>

        {/* Skills Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((skill) => (
              <Link
                key={skill.id}
                href={`/skills/${skill.id}`}
                className="group block"
              >
                <div className="skill-card relative h-full overflow-hidden rounded border border-card-border bg-card-bg">
                  <div className="px-5 py-5">
                    {/* Badges */}
                    <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
                      {skill.isEssential && (
                        <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                          ⭐ {t("essential")}
                        </span>
                      )}
                      {skill.isOfficial && (
                        <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">
                          {t("detail.official")}
                        </span>
                      )}
                      {skill.verdict === "warn" && (
                        <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400" title={skill.warning || ""}>
                          ⚠️ {t("detail.auditWarn")}
                        </span>
                      )}
                    </div>

                    {/* Icon + Name */}
                    <div className="flex items-start gap-3 pr-20">
                      <span className="text-xl">{skill.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-sm font-semibold text-foreground truncate">
                          {locale === "zh-TW" ? skill.nameZh : skill.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-muted">
                      {locale === "zh-TW" ? skill.descriptionZh : skill.description}
                    </p>

                    {/* Stars */}
                    <div className="mt-3 flex items-center gap-3">
                      {skill.stars != null && skill.stars > 0 && (
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-amber-400">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                          </svg>
                          {formatStars(skill.stars)}
                        </span>
                      )}
                    </div>

                    {/* Install */}
                    {skill.installCmd && (
                      <div className="mt-3 flex items-center gap-2 rounded bg-black/20 px-3 py-2">
                        <code className="flex-1 truncate font-mono text-[11px] text-text-muted">
                          {skill.installCmd}
                        </code>
                        <CopyButton text={skill.installCmd} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-24 text-center">
            <p className="text-base text-foreground">
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
