"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/* ─── Hero / Intro ─── */
function IntroSection() {
  const t = useTranslations("about");

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <h1 className="text-gradient-purple text-center font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>

        {/* 51 介紹 */}
        <div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
          <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-5xl">
            👤
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {t("intro.heading")}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-text-muted">
              {t("intro.description")}
            </p>
          </div>
        </div>

        {/* OpenClaw */}
        <div className="mt-16 rounded-2xl border border-card-border bg-card-bg p-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {t("openClaw.heading")}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-text-muted">
            {t("openClaw.description")}
          </p>
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

/* ─── Transforms (3 shifts) ─── */
function Transforms() {
  const t = useTranslations("about.transforms");

  const items = ["item1", "item2", "item3"] as const;

  return (
    <section className="border-y border-card-border bg-card-bg/50 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item} className="text-center">
              <div className="text-lg text-text-muted">{t(`${item}.from`)}</div>
              <div className="my-2 text-3xl text-primary-light">→</div>
              <div className="font-heading text-xl font-bold text-foreground">
                {t(`${item}.to`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Brand Projects ─── */
function Projects() {
  const t = useTranslations("about.projects");

  const projects = [
    { key: "hunterAssociation", icon: "🐉", color: "from-red-500/20 to-orange-500/20" },
    { key: "dexless", icon: "🤖", color: "from-primary/20 to-secondary/20" },
  ] as const;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map(({ key, icon, color }) => (
            <div
              key={key}
              className={`rounded-2xl border border-card-border bg-gradient-to-br ${color} p-8`}
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 leading-relaxed text-text-muted">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contributors ─── */
function Contributors() {
  const t = useTranslations("about.contributors");

  const contributors = [
    { name: "51 (0x515151)", handle: "@0x515151", role: "Founder" },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-12 flex justify-center">
          {contributors.map((c) => (
            <div
              key={c.name}
              className="flex flex-col items-center rounded-2xl border border-card-border bg-card-bg p-8"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl">
                👤
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-primary-light">{c.handle}</p>
              <p className="mt-1 text-sm text-text-muted">{c.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Community CTA ─── */
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
          <Button size="lg" href="https://t.me/" variant="primary">
            {t("joinTelegram")}
          </Button>
          <Button size="lg" href="https://x.com/0x515151" variant="secondary">
            {t("followTwitter")}
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
      <TargetUsers />
      <Transforms />
      <Projects />
      <Contributors />
      <Community />
    </>
  );
}
