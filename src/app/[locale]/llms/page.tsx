"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import llms from "@/data/llms.json";
import pricingData from "@/data/pricing-estimates.json";

type FilterType = "all" | "open" | "closed";
type FilterFree = "all" | "free" | "paid";
type LLM = (typeof llms)[number];

/* ─── 推薦標籤樣式 ─── */
const recommendedStyles: Record<string, { bg: string; text: string }> = {
  daily: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  budget: { bg: "bg-amber-500/15", text: "text-amber-400" },
  complex: { bg: "bg-purple-500/15", text: "text-purple-400" },
  general: { bg: "bg-blue-500/15", text: "text-blue-400" },
};

/* ─── 成本估算區塊 ─── */
function CostEstimateSection() {
  const t = useTranslations("llms.costEstimate");
  const tTips = useTranslations("llms.savingTips");
  const locale = useLocale();
  const isZh = locale === "zh-TW";

  const levels = [
    { key: "light", icon: "💬" },
    { key: "medium", icon: "💼" },
    { key: "heavy", icon: "🔥" },
  ] as const;

  const modelLabels = ["Sonnet", "Haiku", "DeepSeek", "GPT-5.4 Nano"];
  const costKeys = ["sonnet", "haiku", "deepseek", "gpt54nano"] as const;

  return (
    <section className="mt-20">
      {/* 標題 */}
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-text-muted">
          {t("subtitle")}
        </p>
      </div>

      {/* 成本表 — 手機版可橫向捲動 */}
      <div className="mt-10 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[600px]">
          <div className="overflow-hidden rounded border border-card-border">
            {/* 表頭 */}
            <div className="grid grid-cols-6 gap-px bg-white/5">
              <div className="px-4 py-3 text-xs font-semibold text-text-muted" />
              <div className="px-4 py-3 text-xs font-semibold text-text-muted">
                {t("dailyTokens")}
              </div>
              {modelLabels.map((label) => (
                <div key={label} className="px-4 py-3 text-center text-xs font-semibold text-foreground">
                  {label}
                </div>
              ))}
            </div>

            {/* 行 */}
            {pricingData.estimates.map((est, i) => {
              const level = levels[i];
              return (
                <div
                  key={est.level}
                  className="grid grid-cols-6 gap-px border-t border-card-border transition-colors hover:bg-white/10"
                >
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span>{level.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {t(level.key)}
                        </div>
                        <div className="mt-0.5 text-[11px] leading-tight text-text-muted">
                          {t(`${level.key}Desc`)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center px-4 py-4 text-xs text-text-muted font-mono">
                    {est.dailyTokens}
                  </div>
                  {costKeys.map((key) => (
                    <div key={key} className="flex items-center justify-center px-4 py-4">
                      <span className="rounded bg-card-bg px-3 py-1 text-sm font-semibold text-foreground">
                        {est.costs[key]}<span className="text-[10px] text-text-muted">{t("perMonth")}</span>
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* VPS 說明 */}
      <div className="mt-6 rounded border border-card-border bg-card-bg px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">☁️</span>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">
              {t("vpsTitle")}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {t("vpsDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* 省錢策略 */}
      <div className="mt-10">
        <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
          💡 {tTips("title")}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {([1, 2, 3] as const).map((n) => (
            <Card key={n} hoverable={false} showGradientBar={false}>
              <div>
                <h4 className="font-heading text-sm font-medium text-primary-light">
                  {tTips(`tip${n}`)}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {tTips(`tip${n}Desc`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function LlmsPage() {
  const t = useTranslations("llms");
  const locale = useLocale();
  const isZh = locale === "zh-TW";
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [freeFilter, setFreeFilter] = useState<FilterFree>("all");

  const filtered = useMemo(() => {
    return llms.filter((model) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !model.name.toLowerCase().includes(q) &&
          !model.provider.toLowerCase().includes(q)
        )
          return false;
      }
      if (typeFilter !== "all") {
        const mType = (model as Record<string, unknown>).type as string | undefined;
        if (mType !== typeFilter) return false;
      }
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
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
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
              className="w-full rounded border border-card-border bg-card-bg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-text-muted outline-none transition-colors focus:border-primary/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "open", "closed"] as FilterType[]).map((val) => (
              <button
                key={val}
                onClick={() => setTypeFilter(val)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-all ${
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
                className={`rounded px-3 py-1.5 text-xs font-medium transition-all ${
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
          <div className="mt-14 flex flex-col items-center justify-center rounded border border-card-border bg-card-bg px-8 py-16 text-center">
            <div className="text-4xl">🔍</div>
            <p className="mt-4 text-text-muted">{t("noResults")}</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((model, index) => {
              const desc = isZh ? model.description : model.descriptionEn;
              const features = isZh ? model.features : model.featuresEn;
              const mType = (model as Record<string, unknown>).type as string | undefined;
              const mFree = (model as Record<string, unknown>).free as boolean | undefined;
              const recommended = (model as Record<string, unknown>).recommended as string | undefined;
              const recStyle = recommended ? recommendedStyles[recommended] : null;

              return (
                <Link
                  key={model.slug}
                  href={`/llms/${model.slug}`}
                  className="group block"
                >
                  <div
                    className="relative h-full overflow-hidden rounded border border-card-border bg-card-bg transition-all duration-300 hover:border-primary/20"
                    style={{ animationDelay: `${Math.min(index * 60, 400)}ms` }}
                  >
                    {/* Hover accent line */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="px-6 py-5">
                      {/* Badges 右上角 */}
                      <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
                        {recommended && recStyle && (
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${recStyle.bg} ${recStyle.text}`}>
                            {t(`recommended.${recommended}`)}
                          </span>
                        )}
                        {mFree && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary-light">
                            {t("freeTier")}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-4 pr-24">
                        <span className="text-3xl">{model.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {model.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
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
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-muted">
                        {desc}
                      </p>

                      {/* Pricing + Context */}
                      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-400 font-bold">$</span>
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
                          <span className="text-primary-light font-bold">ctx</span>
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

        {/* 成本估算區塊 */}
        <CostEstimateSection />
      </div>
    </div>
  );
}
