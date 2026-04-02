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
      <section className="px-4 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-text-muted">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl">
          <Accordion items={accordionItems} exclusive className="space-y-3" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            {t("stillHaveQuestions")}
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            {t("communityDesc")}
          </p>
          <div className="mt-8">
            <Button size="lg" href={t("communityUrl")} variant="primary">
              {t("joinCommunity")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
