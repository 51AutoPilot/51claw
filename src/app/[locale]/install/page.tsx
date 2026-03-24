"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Tabs from "@/components/ui/Tabs";
import CodeBlock from "@/components/ui/CodeBlock";
import Accordion from "@/components/ui/Accordion";
import installGuide from "@/data/install-guide.json";

type Platform = "macos" | "windows" | "linux";

function StepTimeline({ platform }: { platform: Platform }) {
  const locale = useLocale();
  const steps = installGuide.platforms[platform].steps;

  return (
    <div className="relative ml-4 space-y-8 border-l border-card-border pl-8">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* 步驟圓圈 */}
          <div className="absolute -left-[calc(2rem+12px)] flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary-light ring-4 ring-background">
            {i + 1}
          </div>

          <h3 className="font-heading text-lg font-semibold text-foreground">
            {locale === "zh-TW" ? step.titleZh : step.titleEn}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">
            {locale === "zh-TW" ? step.descZh : step.descEn}
          </p>

          <div className="mt-3">
            <CodeBlock code={step.code} language="bash" />
          </div>

          {((locale === "zh-TW" && step.noteZh) ||
            (locale !== "zh-TW" && step.noteEn)) && (
            <p className="mt-2 text-xs text-secondary">
              💡 {locale === "zh-TW" ? step.noteZh : step.noteEn}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function InstallPage() {
  const t = useTranslations("install");
  const locale = useLocale();
  const [activePlatform, setActivePlatform] = useState<string>("macos");

  const platformTabs = [
    { key: "macos", label: "macOS", content: <StepTimeline platform="macos" /> },
    { key: "windows", label: "Windows", content: <StepTimeline platform="windows" /> },
    { key: "linux", label: "Linux", content: <StepTimeline platform="linux" /> },
  ];

  const faqItems = installGuide.faq.map((item, i) => ({
    key: `faq-${i}`,
    title: locale === "zh-TW" ? item.qZh : item.qEn,
    content: locale === "zh-TW" ? item.aZh : item.aEn,
  }));

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-gradient-purple font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* System Requirements */}
        <div className="mt-12 rounded-xl border border-card-border bg-card-bg p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {t("systemReq.title")}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["nodeVersion", "claudeDesktop", "os"].map((key) => (
              <div
                key={key}
                className="rounded-lg bg-white/5 px-4 py-3 text-sm text-text-muted"
              >
                <span className="text-primary-light">●</span>{" "}
                {t(`systemReq.${key}`)}
              </div>
            ))}
          </div>
        </div>

        {/* OS Tabs + Steps */}
        <div className="mt-12">
          <Tabs
            tabs={platformTabs}
            activeKey={activePlatform}
            onChange={setActivePlatform}
          />
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t("faq.title")}
          </h2>
          <div className="mt-8">
            <Accordion items={faqItems} exclusive />
          </div>
        </div>
      </div>
    </div>
  );
}
