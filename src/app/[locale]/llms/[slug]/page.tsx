"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import llms from "@/data/llms.json";
import { notFound } from "next/navigation";

export default function LlmDetailPage() {
  const t = useTranslations("llms");
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const model = llms.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  const desc = locale === "zh-TW" ? model.description : model.descriptionEn;
  const features = locale === "zh-TW" ? model.features : model.featuresEn;
  const steps = locale === "zh-TW" ? model.steps : model.stepsEn;

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          currentPage={model.name}
          items={[{ label: t("title"), href: "/llms" }]}
        />

        {/* Hero */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-card-border bg-card-bg text-4xl">
            {model.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {model.name}
              </h1>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-text-muted">
                {model.provider}
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              {desc}
            </p>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {features.map((f) => (
            <span
              key={f}
              className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary-light"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Pricing + Context Info */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Input {t("pricing")}
            </div>
            <div className="mt-1 font-heading text-lg font-semibold text-emerald-400">
              {model.pricing.input === 0
                ? t("free")
                : `$${model.pricing.input}`}
              {model.pricing.input > 0 && (
                <span className="text-xs font-normal text-text-muted">
                  {" "}
                  / 1M tokens
                </span>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Output {t("pricing")}
            </div>
            <div className="mt-1 font-heading text-lg font-semibold text-emerald-400">
              {model.pricing.output === 0
                ? t("free")
                : `$${model.pricing.output}`}
              {model.pricing.output > 0 && (
                <span className="text-xs font-normal text-text-muted">
                  {" "}
                  / 1M tokens
                </span>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg px-5 py-4">
            <div className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Context Window
            </div>
            <div className="mt-1 font-heading text-lg font-semibold text-primary-light">
              {model.contextLength >= 1000000
                ? `${model.contextLength / 1000000}M`
                : `${model.contextLength / 1000}K`}{" "}
              tokens
            </div>
          </div>
        </div>

        {/* API Key Steps */}
        <div className="mt-10">
          <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
            {t("getApiKey")}
          </h2>
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-card-border bg-card-bg px-5 py-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary-light">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-text-muted pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* External Link */}
        <div className="mt-8">
          <Button
            variant="secondary"
            size="md"
            href={model.apiUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("visitApi")}
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

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Button variant="ghost" size="md" href="/llms">
            ← {t("backToList")}
          </Button>
        </div>
      </div>
    </div>
  );
}
