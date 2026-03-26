"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CodeBlock from "@/components/ui/CodeBlock";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import skills from "@/data/skills.json";
import categories from "@/data/categories.json";
import { notFound } from "next/navigation";

// 分類 accent 色對應
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

export default function SkillDetailPage() {
  const t = useTranslations("skills");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const params = useParams();
  const id = params.id as string;

  const skill = skills.find((s) => s.id === id);

  if (!skill) {
    notFound();
  }

  const category = categories.find((c) => c.id === skill.category);
  const accent = categoryAccent[skill.category] || "#a78bfa";

  // 同分類的其他 skill，最多 3 個
  const relatedSkills = skills
    .filter((s) => s.category === skill.category && s.id !== skill.id)
    .slice(0, 3);

  const categoryName = locale === "zh-TW" ? category?.nameZh : category?.name;
  const skillName = locale === "zh-TW" ? skill.nameZh : skill.name;
  const skillDesc = locale === "zh-TW" ? skill.descriptionZh : skill.description;

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          currentPage={skillName}
          items={[{ label: t("title"), href: "/skills" }]}
        />

        {/* Hero Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Icon */}
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-card-border bg-card-bg text-4xl"
            style={{
              boxShadow: `0 0 24px ${accent}15`,
            }}
          >
            {skill.icon}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {skillName}
              </h1>

              {/* 分類 badge */}
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${accent}1a`,
                  color: accent,
                }}
              >
                {categoryName}
              </span>

              {/* 官方 badge */}
              {skill.isOfficial && (
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-400">
                  {t("detail.official")}
                </span>
              )}
            </div>

            {/* 安全徽章 */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skill.verdict === "pass" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7l3 3 5-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t("detail.auditPass")}
                </span>
              )}
              {skill.verdict === "warn" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-400">
                  <span className="text-base">⚠</span>
                  {t("detail.auditWarn")}
                </span>
              )}
            </div>

            {/* Warning 文字 */}
            {skill.verdict === "warn" && skill.warning && (
              <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed text-amber-300/90">
                {skill.warning}
              </div>
            )}
          </div>
        </div>

        {/* 完整描述 */}
        <div className="mt-10">
          <p className="text-base leading-relaxed text-text-muted">
            {skillDesc}
          </p>
        </div>

        {/* 安裝指令 */}
        {skill.installCmd && (
          <div className="mt-8">
            <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t("detail.installCmd")}
            </h2>
            <CodeBlock code={skill.installCmd} language="bash" />
          </div>
        )}

        {/* 安裝說明（非指令的描述性安裝資訊） */}
        {skill.installNote && (
          <div className="mt-8">
            <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t("detail.installNote")}
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4 text-sm leading-relaxed text-text-muted">
              {skill.installNote}
            </div>
          </div>
        )}

        {/* 資訊列 */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* 來源 */}
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("detail.source")}
            </div>
            <div className="mt-1 font-heading text-sm font-semibold text-foreground">
              {skill.source}
            </div>
          </div>

          {/* 免費/付費 */}
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {skill.isFree ? t("detail.free") : t("detail.paid")}
            </div>
            <div className="mt-1 text-sm font-semibold">
              {skill.isFree ? (
                <span className="text-emerald-400">{t("detail.free")}</span>
              ) : (
                <span className="text-amber-400">{t("detail.paid")}</span>
              )}
            </div>
          </div>

          {/* 標籤 */}
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("detail.tags")}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(locale === "zh-TW" ? skill.tagsZh : skill.tags).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 外部連結 */}
        {skill.url && skill.url.length > 0 && (
          <div className="mt-8">
            <Button
              variant="secondary"
              size="md"
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("detail.visitLink")}
              <svg
                className="ml-2"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 2h7v7" />
                <path d="M12 2L2 12" />
              </svg>
            </Button>
          </div>
        )}

        {/* 相關 Skills */}
        {relatedSkills.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
              {t("detail.relatedSkills")}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {relatedSkills.map((rs) => {
                const rsAccent = categoryAccent[rs.category] || "#a78bfa";
                const rsCat = categories.find((c) => c.id === rs.category);
                return (
                  <Link
                    key={rs.id}
                    href={`/skills/${rs.id}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:-translate-y-1"
                      style={{
                        // @ts-expect-error CSS custom property
                        "--card-accent": rsAccent,
                      }}
                    >
                      {/* accent 頂線 */}
                      <div
                        className="h-[2px] w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(to right, transparent, ${rsAccent}, transparent)`,
                        }}
                      />
                      <div className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <span className="text-xl">{rs.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-sm font-semibold text-foreground truncate">
                              {locale === "zh-TW" ? rs.nameZh : rs.name}
                            </h3>
                            <span
                              className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                              style={{
                                backgroundColor: `${rsAccent}1a`,
                                color: rsAccent,
                              }}
                            >
                              {locale === "zh-TW" ? rsCat?.nameZh : rsCat?.name}
                            </span>
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted">
                              {locale === "zh-TW" ? rs.descriptionZh : rs.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 返回按鈕 */}
        <div className="mt-12 text-center">
          <Button variant="ghost" size="md" href="/skills">
            ← {t("detail.backToSkills")}
          </Button>
        </div>
      </div>
    </div>
  );
}
