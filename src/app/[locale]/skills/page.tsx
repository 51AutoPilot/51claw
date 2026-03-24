"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import skills from "@/data/skills.json";
import categories from "@/data/categories.json";

type Skill = (typeof skills)[number];

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

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary/20 text-primary-light border border-primary/40"
                  : "border border-card-border text-text-muted hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {locale === "zh-TW" ? cat.nameZh : cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filtered.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((skill) => (
              <Card key={skill.id} className="flex flex-col">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-base font-semibold text-foreground truncate">
                        {skill.name}
                      </h3>
                      <span className="flex-shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-light">
                        {locale === "zh-TW"
                          ? categories.find((c) => c.id === skill.category)?.nameZh
                          : categories.find((c) => c.id === skill.category)?.name}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
                      {locale === "zh-TW" ? skill.descriptionZh : skill.description}
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
                  <Button variant="ghost" size="sm" className="w-full">
                    {tCommon("viewDetails")}
                  </Button>
                </div>
              </Card>
            ))}
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
