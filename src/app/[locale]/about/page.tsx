"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/* ─── 51 介紹區塊 ─── */
function IntroSection() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <h1 className="text-gradient-claude text-center font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>

        {/* 51 介紹 */}
        <div className="mt-16 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 to-secondary/40 blur-md" />
            <Image
              src="/51-profile.jpg"
              alt="51 (0x515151)"
              width={200}
              height={200}
              className="relative rounded-2xl border-2 border-primary/30 object-cover"
              style={{ width: 200, height: 200, objectPosition: "center 20%" }}
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              51 (0x515151)
            </h2>
            <p className="mt-1 text-sm font-medium text-primary-light">
              {t("intro.role")}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-text-muted">
              {t("intro.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 獵人協會區塊 ─── */
function HunterAssociation() {
  const t = useTranslations("about.hunterAssociation");

  const features = [
    { icon: "📈", key: "smc" },
    { icon: "🤖", key: "ai" },
    { icon: "👥", key: "community" },
  ] as const;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-card-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 sm:p-12">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-text-muted">
            {t("description")}
          </p>

          {/* CTA 按鈕 */}
          <div className="mt-8 flex justify-center">
            <a
              href="https://hunterassociation.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8734A] to-[#C75B3A] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(232,115,74,0.4),0_0_40px_rgba(232,115,74,0.2)]"
            >
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12L12 4M12 4H5M12 4v7" />
              </svg>
            </a>
          </div>

          {/* 3 特色卡片 */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map(({ icon, key }) => (
              <Card key={key} hoverable={false} showGradientBar={false}>
                <div className="text-center">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {t(`features.${key}.description`)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Target Users (4 cards) ─── */
function TargetUsers() {
  const t = useTranslations("about.targetUsers");

  const users = [
    { key: "explore", icon: "🔍" },
    { key: "efficiency", icon: "⚡" },
    { key: "develop", icon: "🛠️" },
    { key: "business", icon: "🏢" },
  ] as const;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {users.map(({ key, icon }) => (
            <Card key={key} hoverable={false}>
              <div className="text-center">
                <span className="text-4xl">{icon}</span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {t(`${key}.description`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 社群 CTA ─── */
function Community() {
  const t = useTranslations("about.community");

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 text-lg text-text-muted">{t("description")}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" href="https://line.me/ti/g2/SCwiAQSnQ2SW6fFuKcOBs0sipyzdoOJ3FepZ2Q" variant="primary">
            {t("joinLine")}
          </Button>
          <Button size="lg" href="https://x.com/0x515151" variant="secondary">
            {t("followTwitter")}
          </Button>
          <Button size="lg" href="https://www.instagram.com/hunter.ai.crypto/" variant="secondary">
            {t("followInstagram")}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function AboutPage() {
  return (
    <>
      <IntroSection />
      <HunterAssociation />
      <TargetUsers />
      <Community />
    </>
  );
}
