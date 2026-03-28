"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import llms from "@/data/llms.json";

type FilterType = "all" | "open" | "closed";
type FilterFree = "all" | "free" | "paid";

export default function LlmsPage() {
  const t = useTranslations("llms");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [freeFilter, setFreeFilter] = useState<FilterFree>("all");

  const filtered = useMemo(() => {
    return llms.filter((model) => {
      // 搜尋
      if (search) {
        const q = search.toLowerCase();
        const name = model.name.toLowerCase();
        const provider = model.provider.toLowerCase();
        if (!name.includes(q) && !provider.includes(q)) return false;
      }
      // 類型篩選
      if (typeFilter !== "all") {
        const mType = (model as Record<string, unknown>).type as string | undefined;
        if (mType !== typeFilter) return false;
      }
      // 免費篩選
      if (freeFilter !== "all") {
        const mFree = (model as Record<string, unknown>).free as boolean | undefined;
        if (freeFilter === "free" && !mFree) return false;
        if (freeFilter === "paid" && mFree) return false;
      }
      return true;
    });
  }, [search, typeFilter, freeFilter]);

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

        {/* Search + Filters */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* 搜尋 */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-xl border border-card-border bg-card-bg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-text-muted outline-none transition-colors focus:border-primary/50"
            />
          </div>

          {/* 篩選標籤 */}
          <div className="flex flex-wrap gap-2">
            {(["all", "open", "closed"] as FilterType[]).map((val) => (
              <button
                key={val}
                onClick={() => setTypeFilter(val)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  typeFilter === val
                    ? "bg-primary/15 text-primary-light"
                    : "bg-white/5 text-text-muted hover:bg-white/10"
                }`}
              >
                {t(`filter.${val}`)}
              </button>
            ))}
            <div className="mx-1 w-px bg-card-border" />
            {(["all", "free", "paid"] as FilterFree[]).map((val) => (
              <button
                key={val}
                onClick={() => setFreeFilter(val)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  freeFilter === val
                    ? "bg-primary/15 text-primary-light"
                    : "bg-white/5 text-text-muted hover:bg-white/10"
                }`}
              >
                {t(`filter.${val === "all" ? "allModels" : val}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Model Grid */}
        {filtered.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-card-border bg-card-bg px-8 py-16 text-center">
            <div className="text-4xl">🔍</div>
            <p className="mt-4 text-text-muted">{t("noResults")}</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((model, index) => {
              const desc = locale === "zh-TW" ? model.description : model.descriptionEn;
              const features = locale === "zh-TW" ? model.features : model.featuresEn;
              const mType = (model as Record<string, unknown>).type as string | undefined;
              const mFree = (model as Record<string, unknown>).free as boolean | undefined;

              return (
                <Link
                  key={model.slug}
                  href={`/llms/${model.slug}`}
                  className="group block"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                    style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
                  >
                    {/* Hover accent line */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="px-6 py-5">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{model.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-heading text-lg font-semibold text-foreground">
                              {model.name}
                            </h3>
                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted">
                              {model.provider}
                            </span>
                            {mType && (
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                mType === "open"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-white/5 text-text-muted"
                              }`}>
                                {mType === "open" ? t("filter.open") : t("filter.closed")}
                              </span>
                            )}
                            {mFree && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-light">
                                {t("filter.free")}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
                            {desc}
                          </p>
                        </div>
                      </div>

                      {/* Pricing + Context */}
                      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400">$</span>
                          <span>
                            {model.pricing.input === 0
                              ? t("free")
                              : `${model.pricing.input} / ${model.pricing.output}`}
                          </span>
                          {model.pricing.input > 0 && (
                            <span className="text-text-muted/50">{t("perMillion")}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-primary-light">ctx</span>
                          <span>
                            {model.contextLength >= 1000000
                              ? `${model.contextLength / 1000000}M`
                              : `${model.contextLength / 1000}K`}
                          </span>
                        </div>
                      </div>

                      {/* Feature Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {features.map((f) => (
                          <span
                            key={f}
                            className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary-light"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
