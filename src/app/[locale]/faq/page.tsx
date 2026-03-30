"use client";

import { useTranslations, useLocale } from "next-intl";
import Accordion from "@/components/ui/Accordion";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import Button from "@/components/ui/Button";
import faqData from "@/data/faq.json";

interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export default function FaqPage() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const isZh = locale === "zh-TW";

  const accordionItems = (faqData as FaqItem[]).map((item, index) => ({
    key: item.id,
    title: `${String(index + 1).padStart(2, "0")}. ${isZh ? item.question : item.questionEn}`,
    content: (
      <MarkdownRenderer content={isZh ? item.answer : item.answerEn} />
    ),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24">
        {/* 背景光暈 */}
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

      {/* FAQ 列表 */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-3xl">
          <Accordion items={accordionItems} exclusive className="space-y-4" />
        </div>
      </section>

      {/* 還有問題？CTA */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t("stillHaveQuestions")}
          </h2>
          <p className="mt-3 text-text-muted">
            {t("communityDesc")}
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              href={t("communityUrl")}
              variant="primary"
            >
              {t("joinCommunity")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
