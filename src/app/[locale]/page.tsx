"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import categories from "@/data/categories.json";
import skills from "@/data/skills.json";
import { useEffect, useRef, useState } from "react";

/* ─── Hero Section ─── */
function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-32">
      {/* 動態網格背景 */}
      <div className="pointer-events-none absolute inset-0 hero-grid" />

      {/* 脈動光暈 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px] animate-pulse-glow-secondary" />
      </div>

      {/* 漂浮粒子 — CSS only */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${8 + (i * 7.3) % 84}%`,
              bottom: `-${(i * 13) % 20}px`,
              background: i % 3 === 0 ? "#06b6d4" : "#a855f7",
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              animationDuration: `${8 + (i % 5) * 3}s`,
              animationDelay: `${(i * 1.2) % 6}s`,
              boxShadow: `0 0 ${4 + (i % 3) * 2}px currentColor`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-gradient-purple font-heading text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
          {t("heroSubtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/skills" size="lg">
            {t("ctaPrimary")}
          </Button>
          <Button href="/install" variant="secondary" size="lg">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Skills Categories ─── */
function FeaturedSkills() {
  const t = useTranslations("home");
  const tCat = useTranslations("skills.categories");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("featuredSkills")}
        </h2>

        {/* 桌機：Grid；手機：橫滑 */}
        <div
          ref={scrollRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/skills?category=${cat.id}`}
              className="min-w-[280px] flex-shrink-0 sm:min-w-0"
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {tCat(cat.id)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {locale === "zh-TW" ? cat.descriptionZh : cat.description}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
                      {cat.count} Skills
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Counter ─── */
function AnimatedNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function Stats() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: skills.length, label: t("skillsCount"), suffix: "+" },
    { value: categories.length, label: t("categories"), suffix: "" },
    { value: 100, label: t("free"), suffix: "%" },
  ];

  return (
    <section className="bg-card-bg/50 px-4 py-16">
      <div className="gradient-line-h mb-16" />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="font-heading text-4xl font-bold text-primary-light stats-glow sm:text-5xl md:text-6xl tracking-tight">
              <AnimatedNumber target={stat.value} />
              {stat.suffix}
            </div>
            <p className="mt-2 text-sm font-medium text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="gradient-line-h mt-16" />
    </section>
  );
}

/* ─── Bottom CTA ─── */
function BottomCta() {
  const t = useTranslations("home.bottomCta");

  return (
    <section className="relative overflow-hidden px-4 py-24">
      {/* 背景漸層 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-text-muted">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <Button href="/install" size="lg">
            {t("button")}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSkills />
      <Stats />
      <BottomCta />
    </>
  );
}
