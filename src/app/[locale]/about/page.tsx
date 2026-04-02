"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/* ─── 51 介紹區塊 ─── */
function IntroSection() {
  const t = useTranslations("about");

  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("title")}
        </h1>

        <div className="mt-16 flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/51-profile.jpg"
              alt="51 (0x515151)"
              width={180}
              height={180}
              className="rounded-lg border border-card-border object-cover"
              style={{ width: 180, height: 180, objectPosition: "center 20%" }}
            />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              51 (0x515151)
            </h2>
            <p className="mt-1 text-sm text-primary-light">
              {t("intro.role")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
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
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded border border-card-border bg-card-bg p-8 sm:p-12">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-text-muted">
            {t("description")}
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="https://hunterassociation.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 rounded bg-gradient-to-r from-[#E8734A] to-[#da7756] px-8 py-3 text-base font-medium text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-[0_0_24px_rgba(232,115,74,0.3)]"
            >
              {t("cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12L12 4M12 4H5M12 4v7" />
              </svg>
            </a>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map(({ icon, key }) => (
              <Card key={key} hoverable={false}>
                <div className="text-center">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="mt-3 font-heading text-base font-semibold text-foreground">
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

/* ─── Target Users ─── */
function TargetUsers() {
  const t = useTranslations("about.targetUsers");

  const users = [
    { key: "explore", icon: "🔍" },
    { key: "efficiency", icon: "⚡" },
    { key: "develop", icon: "🛠️" },
    { key: "business", icon: "🏢" },
  ] as const;

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {t("heading")}
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {users.map(({ key, icon }) => (
            <Card key={key} hoverable={false}>
              <div className="text-center">
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
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
    <section className="px-4 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {t("heading")}
        </h2>
        <p className="mt-4 text-base text-text-muted">{t("description")}</p>
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
