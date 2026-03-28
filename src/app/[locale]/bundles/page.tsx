"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import bundlesData from "@/data/bundles.json";
import skillsData from "@/data/skills.json";

/* ─── Bundle Card ─── */
function BundleCard({ bundle }: { bundle: (typeof bundlesData)[number] }) {
  const t = useTranslations("bundles");
  const locale = useLocale();
  const isZh = locale === "zh-TW";

  // 根據 skillIds 找到對應的 skills
  const skills = bundle.skillIds
    .map((id) => skillsData.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="rounded-2xl border border-card-border bg-card-bg transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* 頂部漸變光條 */}
      <div className="h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="p-5 sm:p-8">
        {/* Icon + 標題 */}
        <div className="flex items-center gap-4">
          <span className="text-4xl sm:text-5xl">{bundle.icon}</span>
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground">
              {t(`${bundle.id}.title`)}
            </h3>
          </div>
        </div>

        {/* 描述 */}
        <p className="mt-4 leading-relaxed text-text-muted">
          {t(`${bundle.id}.description`)}
        </p>

        {/* 適合對象 */}
        <div className="mt-6">
          <span className="text-xs font-medium uppercase tracking-wider text-primary-light">
            {t("bestFor")}
          </span>
          <p className="mt-1 text-sm text-text-muted">
            {t(`${bundle.id}.bestFor`)}
          </p>
        </div>

        {/* 特色 */}
        <div className="mt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-primary-light">
            {t("highlight")}
          </span>
          <p className="mt-1 text-sm font-medium text-foreground">
            {t(`${bundle.id}.highlight`)}
          </p>
        </div>

        {/* 包含的 Skills */}
        <div className="mt-6">
          <span className="text-xs font-medium uppercase tracking-wider text-primary-light">
            {t("includes")}
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map(
              (skill) =>
                skill && (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-white/5 px-3 py-1 text-sm text-foreground"
                  >
                    <span>{skill.icon}</span>
                    {isZh ? skill.nameZh : skill.name}
                  </span>
                )
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Button
            href={`/skills?bundle=${bundle.id}`}
            variant="secondary"
            size="md"
          >
            {t("viewSkills")} →
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function BundlesPage() {
  const t = useTranslations("bundles");

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* 標題 */}
        <div className="text-center">
          <h1 className="text-gradient-claude font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* 套餐卡片 */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {bundlesData.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}
