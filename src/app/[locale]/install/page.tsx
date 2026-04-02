"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Tabs from "@/components/ui/Tabs";
import CodeBlock from "@/components/ui/CodeBlock";
import Accordion from "@/components/ui/Accordion";
import Breadcrumb from "@/components/ui/Breadcrumb";
import installGuide from "@/data/install-guide.json";

type Platform = "macos" | "windows" | "linux";
type LangKey = "zh" | "en";

function useL() {
  const locale = useLocale();
  return (locale === "zh-TW" ? "zh" : "en") as LangKey;
}

/* ─── Install Methods Sub-tabs ─── */
function InstallMethods({
  methods,
  lang,
}: {
  methods: Record<string, { label: Record<LangKey, string>; code: string }>;
  lang: LangKey;
}) {
  const keys = Object.keys(methods);
  const [active, setActive] = useState(keys[0]);

  return (
    <div className="mt-3 space-y-3">
      <div className="flex gap-2">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              active === key
                ? "bg-primary/20 text-primary-light"
                : "bg-white/5 text-text-muted hover:text-foreground"
            }`}
          >
            {methods[key].label[lang]}
          </button>
        ))}
      </div>
      <CodeBlock code={methods[active].code} language="bash" />
    </div>
  );
}

/* ─── AI Providers ─── */
function AIProviders({
  providers,
}: {
  providers: Array<{ name: string; envVar: string; url: string }>;
}) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {providers.map((p) => (
        <div
          key={p.envVar}
          className="rounded bg-white/5 px-3 py-2 text-xs"
        >
          <span className="font-medium text-foreground">{p.name}</span>
          <br />
          <code className="font-mono text-primary-light">{p.envVar}</code>
          <br />
          <span className="text-text-muted">{p.url}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Step Timeline ─── */
function StepTimeline({ platform }: { platform: Platform }) {
  const lang = useL();
  const steps = installGuide.platforms[platform].steps;

  return (
    <div className="relative ml-2 space-y-8 border-l border-card-border pl-6 sm:ml-4 sm:pl-8">
      {steps.map((step, i) => {
        const hasInstallMethods = "installMethods" in step && step.installMethods;
        const hasAIProviders = "aiProviders" in step && step.aiProviders;
        const noteText =
          step.note && typeof step.note === "object"
            ? (step.note as Record<LangKey, string>)[lang]
            : null;

        return (
          <div key={i} className="relative">
            {/* 步驟圓圈 */}
            <div className="absolute -left-[calc(2rem+12px)] flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary-light ring-4 ring-background">
              {step.stepNumber}
            </div>

            <h3 className="font-heading text-lg font-semibold text-foreground">
              {step.title[lang]}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              {step.description[lang]}
            </p>

            {/* AI Providers（步驟 3 特殊） */}
            {hasAIProviders && (
              <AIProviders
                providers={
                  step.aiProviders as Array<{
                    name: string;
                    envVar: string;
                    url: string;
                  }>
                }
              />
            )}

            {/* Install Methods（步驟 2 特殊） */}
            {hasInstallMethods ? (
              <InstallMethods
                methods={
                  step.installMethods as Record<
                    string,
                    { label: Record<LangKey, string>; code: string }
                  >
                }
                lang={lang}
              />
            ) : (
              step.code && (
                <div className="mt-3">
                  <CodeBlock code={step.code} language="bash" />
                </div>
              )
            )}

            {noteText && (
              <p className="mt-2 text-xs text-secondary">💡 {noteText}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ─── */
export default function InstallPage() {
  const t = useTranslations("install");
  const lang = useL();
  const [activePlatform, setActivePlatform] = useState<string>("macos");

  const platformTabs = [
    {
      key: "macos",
      label: "macOS",
      content: <StepTimeline platform="macos" />,
    },
    {
      key: "windows",
      label: "Windows",
      content: <StepTimeline platform="windows" />,
    },
    {
      key: "linux",
      label: "Linux",
      content: <StepTimeline platform="linux" />,
    },
  ];

  const faqItems = installGuide.faq.map((item, i) => ({
    key: `faq-${i}`,
    title: item.question[lang],
    content: item.answer[lang],
  }));

  const sysReq = installGuide.systemRequirements;

  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
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

        {/* System Requirements */}
        <div className="mt-12 rounded border border-card-border bg-card-bg p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            {sysReq.title[lang]}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {sysReq.items.map((item, i) => (
              <div
                key={i}
                className="rounded bg-white/5 px-4 py-3 text-sm text-text-muted"
              >
                <span className="text-primary-light">●</span> {item[lang]}
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
