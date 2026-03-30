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

/* ─── 相對時間計算 ─── */
function getRelativeTime(dateStr: string, daysAgoLabel: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return `1 ${daysAgoLabel}`;
  return `${diffDays} ${daysAgoLabel}`;
}

/* ─── 格式化 stars ─── */
function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
  return String(stars);
}

export default function SkillDetailPage() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const params = useParams();
  const id = params.id as string;

  const skill = skills.find((s) => s.id === id);
  if (!skill) notFound();

  const category = categories.find((c) => c.id === skill.category);
  const accent = categoryAccent[skill.category] || "#D4A574";
  const isZh = locale === "zh-TW";

  const relatedSkills = skills
    .filter((s) => s.category === skill.category && s.id !== skill.id)
    .slice(0, 3);

  const skillName = isZh ? skill.nameZh : skill.name;
  const skillDesc = isZh ? skill.descriptionZh : skill.description;
  const categoryName = isZh ? category?.nameZh : category?.name;
  const examples = isZh ? skill.examples : skill.examplesEn;
  const suitableFor = isZh ? skill.suitableFor : skill.suitableForEn;

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          currentPage={skillName}
          items={[{ label: t("title"), href: "/skills" }]}
        />

        {/* ═══ Hero Section ═══ */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Icon */}
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-card-border bg-card-bg text-4xl"
            style={{ boxShadow: `0 0 24px ${accent}15` }}
          >
            {skill.icon}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {skillName}
              </h1>

              {skill.isEssential && (
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-400">
                  ⭐ {t("essential")}
                </span>
              )}

              {skill.isOfficial && (
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-400">
                  {t("detail.official")}
                </span>
              )}

              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: `${accent}1a`, color: accent }}
              >
                {categoryName}
              </span>
            </div>

            {/* 安全徽章 */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skill.verdict === "pass" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-400">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t("detail.auditPass")}
                </span>
              )}
              {skill.verdict === "warn" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-400">
                  ⚠ {t("detail.auditWarn")}
                </span>
              )}
            </div>

            {/* Warning 文字 */}
            {skill.verdict === "warn" && skill.warning && (
              <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed text-amber-300/90">
                {skill.warning}
              </div>
            )}

            {/* Stars + Last Updated */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              {skill.stars != null && skill.stars > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-amber-400">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                  </svg>
                  {formatStars(skill.stars)} {t("detail.stars")}
                </span>
              )}
              {skill.lastUpdated && (
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="8" cy="8" r="7" />
                    <path d="M8 4v4l3 2" />
                  </svg>
                  {t("detail.lastUpdated")}: {getRelativeTime(skill.lastUpdated, t("detail.daysAgo"))}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ═══ Description ═══ */}
        <div className="mt-10">
          <p className="text-base leading-relaxed text-text-muted">{skillDesc}</p>
        </div>

        {/* ═══ Features ═══ */}
        {skill.features && skill.features.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              {t("detail.features")}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skill.features.map((feature, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-card-border bg-card-bg px-5 py-4"
                >
                  <h4 className="font-heading text-sm font-semibold text-foreground">
                    {isZh ? feature.name : feature.nameEn}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    {isZh ? feature.desc : feature.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ Install Command ═══ */}
        {skill.installCmd && (
          <div className="mt-10">
            <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t("detail.installCmd")}
            </h2>
            <CodeBlock code={skill.installCmd} language="bash" />
          </div>
        )}

        {/* ═══ Install Note ═══ */}
        {skill.installNote && (
          <div className="mt-6">
            <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t("detail.installNote")}
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4 text-sm leading-relaxed text-text-muted">
              {skill.installNote}
            </div>
          </div>
        )}

        {/* ═══ Examples ═══ */}
        {examples && examples.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              {t("detail.examples")}
            </h2>
            <div className="space-y-2">
              {examples.map((example, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-card-border bg-card-bg px-5 py-3"
                >
                  <span className="mt-0.5 flex-shrink-0 text-xs text-primary-light font-mono font-bold">
                    &gt;
                  </span>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ Suitable For ═══ */}
        {suitableFor && (
          <div className="mt-10">
            <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
              {t("detail.suitableFor")}
            </h2>
            <div className="flex items-start gap-3 rounded-xl border border-card-border bg-card-bg px-5 py-4">
              <span className="text-lg">👤</span>
              <p className="text-sm leading-relaxed text-text-muted">{suitableFor}</p>
            </div>
          </div>
        )}

        {/* ═══ Info Grid ═══ */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("detail.source")}
            </div>
            <div className="mt-1 font-heading text-sm font-semibold text-foreground">
              {skill.source}
            </div>
          </div>

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

          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("detail.tags")}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(isZh ? skill.tagsZh : skill.tags).map((tag) => (
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

        {/* ═══ External Link ═══ */}
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

        {/* ═══ Related Skills ═══ */}
        {relatedSkills.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-heading text-xl font-bold text-foreground">
              {t("detail.relatedSkills")}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {relatedSkills.map((rs) => {
                const rsAccent = categoryAccent[rs.category] || "#D4A574";
                const rsCat = categories.find((c) => c.id === rs.category);
                return (
                  <Link key={rs.id} href={`/skills/${rs.id}`} className="group block">
                    <div
                      className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:-translate-y-1"
                      style={{
                        // @ts-expect-error CSS custom property
                        "--card-accent": rsAccent,
                      }}
                    >
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
                              {isZh ? rs.nameZh : rs.name}
                            </h3>
                            <span
                              className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                              style={{
                                backgroundColor: `${rsAccent}1a`,
                                color: rsAccent,
                              }}
                            >
                              {isZh ? rsCat?.nameZh : rsCat?.name}
                            </span>
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted">
                              {isZh ? rs.descriptionZh : rs.description}
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

        {/* Back */}
        <div className="mt-12 text-center">
          <Button variant="ghost" size="md" href="/skills">
            ← {t("detail.backToSkills")}
          </Button>
        </div>
      </div>
    </div>
  );
}
