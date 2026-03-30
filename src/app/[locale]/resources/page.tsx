"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import tutorials from "@/data/tutorials.json";
import resources from "@/data/resources.json";

type Tutorial = (typeof tutorials)[number];

/* ─── 編輯推薦語 ─── */
const editorPicks: Record<string, { zh: string; en: string }> = {
  "guillecasaus-cc-tutorial": {
    zh: "🔥 全球迴響最高的 CC 教學，西班牙語也能爆",
    en: "🔥 Highest engagement CC tutorial globally — Spanish goes viral too",
  },
  "avthar-52-lessons": {
    zh: "📚 12 個月經驗濃縮成 52 條，從新手到進階一次看完",
    en: "📚 12 months distilled into 52 lessons, beginner to advanced in one go",
  },
  "bridgemindai-cancel-save": {
    zh: "💰 省錢教學永遠有人看，教你怎麼花最少的錢",
    en: "💰 Cost-saving content always clicks — learn to spend the absolute minimum",
  },
  "codewithimanshu-vibe-coding": {
    zh: "🚀 零經驗也能靠 AI 工具賺錢，5 個工具推薦",
    en: "🚀 Zero experience to $10K/mo with AI tools — 5 tool recommendations",
  },
  "petergyang-15min-intro": {
    zh: "⚡ 15 分鐘快速入門，核心觀點：setup 決定輸出品質",
    en: "⚡ 15-min quick start — core insight: setup determines output quality",
  },
  "boxmining-minimax-save": {
    zh: "💸 用 MiniMax 2.7 跑 CC 省 90% 費用，實測教學",
    en: "💸 Run CC with MiniMax 2.7 and save 90% — tested and proven",
  },
  "vasuman-eyad-intermediate": {
    zh: "🎯 已經入門了？這篇教你像 pro 一樣 vibe-code",
    en: "🎯 Past the basics? This teaches you to vibe-code like a pro",
  },
  "arceyul-claude-cowork": {
    zh: "🇪🇸 西語社群持續活躍，含 Claude Cowork 介紹",
    en: "🇪🇸 Spanish community stays active, includes Claude Cowork intro",
  },
  "petergyang-20-tips": {
    zh: "🛠 20 個實用技巧，邊做邊學",
    en: "🛠 20 practical tips, learn by doing",
  },
  "alliekmiller-beginner-collection": {
    zh: "📋 官方教學合集整理，一站式入門",
    en: "📋 Official tutorial collection, one-stop beginner resource",
  },
  "aisuperdomain-oc-cc": {
    zh: "🇨🇳 中文社群少見的實用教學，OC + CC 省 80% Token",
    en: "🇨🇳 Rare practical Chinese tutorial — OC + CC saves 80% tokens",
  },
};

/* ─── 格式化數字 ─── */
function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/* ─── 所有可用 tags ─── */
const ALL_TAGS = [
  "beginner", "intermediate", "advanced", "video",
  "cost-saving", "tips", "collection", "monetization",
  "quick-start", "models",
] as const;

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const isZh = locale === "zh-TW";
  const [activeTag, setActiveTag] = useState("all");

  const filteredTutorials = useMemo(() => {
    const sorted = [...tutorials].sort((a, b) => b.reactions - a.reactions);
    if (activeTag === "all") return sorted;
    return sorted.filter((tut) => tut.tags.includes(activeTag));
  }, [activeTag]);

  const sortedResources = useMemo(
    () => [...resources].sort((a, b) => b.stars - a.stars),
    []
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-gradient-claude font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-text-muted sm:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* ═══ 推薦教學 ═══ */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t("tutorials.heading")}
          </h2>
          <p className="mt-2 text-text-muted">
            {t("tutorials.subtitle")}
          </p>

          {/* Tag Filter */}
          <div className="mt-6 -mx-4 px-4 overflow-x-auto scrollbar-hide sm:mx-0 sm:px-0 sm:overflow-x-visible">
            <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
              <button
                onClick={() => setActiveTag("all")}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeTag === "all"
                    ? "bg-primary/20 text-primary-light border border-primary/40"
                    : "border border-card-border text-text-muted hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {t("tags.all")}
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTag === tag
                      ? "bg-primary/20 text-primary-light border border-primary/40"
                      : "border border-card-border text-text-muted hover:border-primary/20 hover:text-foreground"
                  }`}
                >
                  {t(`tags.${tag}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Tutorial Cards */}
          <div className="mt-8 space-y-4">
            {filteredTutorials.map((tut, i) => {
              const pick = editorPicks[tut.id];
              return (
                <a
                  key={tut.id}
                  href={`https://x.com/search?q=${encodeURIComponent(tut.searchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_4px_24px_rgba(232,115,74,0.08)]">
                    <div className="px-5 py-5 sm:px-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        {/* 排名 */}
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary-light">
                          #{i + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Title + Author */}
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">
                              {isZh ? tut.title : tut.titleEn}
                            </h3>
                            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
                              {tut.author}
                            </span>
                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-text-muted">
                              {isZh ? tut.languageLabel : tut.languageLabelEn}
                            </span>
                          </div>

                          {/* Editor Pick */}
                          {pick && (
                            <p className="mt-2 text-sm text-primary-light/80">
                              {isZh ? pick.zh : pick.en}
                            </p>
                          )}

                          {/* Tags */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {tut.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] text-primary-light"
                              >
                                {t(`tags.${tag}`)}
                              </span>
                            ))}

                            <span className="mx-1 text-card-border">·</span>

                            {/* Stats */}
                            <span className="flex items-center gap-1 text-xs text-text-muted">
                              ❤️ {formatNum(tut.reactions)}
                            </span>
                            {tut.retweets > 0 && (
                              <span className="flex items-center gap-1 text-xs text-text-muted">
                                🔁 {formatNum(tut.retweets)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* X Link indicator */}
                        <div className="hidden sm:flex flex-shrink-0 items-center">
                          <span className="rounded-lg border border-card-border px-3 py-1.5 text-xs text-text-muted transition-colors group-hover:border-primary/30 group-hover:text-primary-light">
                            {t("tutorials.viewOnX")} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ GitHub 合集 ═══ */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t("collections.heading")}
          </h2>
          <p className="mt-2 text-text-muted">
            {t("collections.subtitle")}
          </p>
          <p className="mt-1 text-xs text-text-muted/60">
            {t("collections.sortNote")}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sortedResources.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-full overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_4px_24px_rgba(232,115,74,0.08)]">
                  {/* accent line */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="px-5 py-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {isZh ? repo.name : repo.nameEn}
                      </h3>
                      <span className="flex flex-shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                        </svg>
                        {formatNum(repo.stars)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {isZh ? repo.description : repo.descriptionEn}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted/60">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                      </svg>
                      GitHub
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t("cta.title")}
          </h2>
          <p className="mt-3 text-text-muted">
            {t("cta.description")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" href="/install" variant="primary">
              {t("cta.install")}
            </Button>
            <Button size="lg" href="/skills" variant="secondary">
              {t("cta.skills")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
