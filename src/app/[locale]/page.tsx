"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import categories from "@/data/categories.json";
import skills from "@/data/skills.json";
import blogPosts from "@/data/blog-posts.json";
import { useEffect, useRef, useState } from "react";

/* ─── Section 1: Hero ─── */
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

      {/* 漂浮粒子 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${8 + (i * 7.3) % 84}%`,
              bottom: `-${(i * 13) % 20}px`,
              background: i % 3 === 0 ? "#D4A574" : "#E8734A",
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
        <h1 className="text-gradient-claude font-heading text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
          {t("heroSubtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/install" size="lg">
            {t("ctaInstall")}
          </Button>
          <Button href="/skills" variant="secondary" size="lg">
            {t("ctaSkills")}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: 三大核心功能卡片 ─── */
function CoreFeatures() {
  const t = useTranslations("home.coreFeatures");

  const features = [
    {
      key: "install",
      icon: "🚀",
      href: "/install",
      stat: "10",
      statSuffix: t("minSuffix"),
    },
    {
      key: "skills",
      icon: "⚡",
      href: "/skills",
      stat: String(skills.length),
      statSuffix: "+",
    },
    {
      key: "models",
      icon: "🧠",
      href: "/models",
      stat: "12",
      statSuffix: "+",
    },
  ] as const;

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map(({ key, icon, href, stat, statSuffix }) => (
            <Link key={key} href={href} className="group block">
              <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl">{icon}</span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {t(`${key}.desc`)}
                  </p>
                  <div className="mt-4 font-heading text-3xl font-bold text-primary-light stats-glow">
                    <AnimatedNumber target={parseInt(stat)} />
                    {statSuffix}
                  </div>
                  <span className="mt-1 text-xs text-text-muted">{t(`${key}.statLabel`)}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-light transition-colors group-hover:text-primary">
                    {t(`${key}.cta`)} →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: 精選 Skills 展示 ─── */
function FeaturedSkills() {
  const t = useTranslations("home");
  const tCat = useTranslations("skills.categories");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-card-bg/30 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("featuredSkills")}
        </h2>

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

        <div className="mt-10 text-center">
          <Button href="/skills" variant="secondary" size="md">
            {t("viewAllSkills")} →
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: 模型排行預覽 ─── */
const topModels = [
  { rank: 1, name: "Claude Opus 4.6", provider: "Anthropic", input: "$15", output: "$75" },
  { rank: 2, name: "GPT-5.4", provider: "OpenAI", input: "$2.50", output: "$10" },
  { rank: 3, name: "Gemini 2.5 Pro", provider: "Google", input: "$1.25", output: "$10" },
  { rank: 4, name: "DeepSeek V3", provider: "DeepSeek", input: "$0.27", output: "$1.10" },
  { rank: 5, name: "Qwen3 235B", provider: "Alibaba", input: "$0.70", output: "$2.80" },
];

function ModelRanking() {
  const t = useTranslations("home.modelRanking");

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-center text-sm text-text-muted">
          {t("source")}
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-card-border bg-card-bg">
          {topModels.map((model, i) => (
            <div
              key={model.rank}
              className={`flex items-center gap-4 px-6 py-4 transition-colors hover:bg-primary/5 ${
                i < topModels.length - 1 ? "border-b border-card-border" : ""
              }`}
            >
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold ${
                model.rank === 1
                  ? "bg-primary/20 text-primary"
                  : model.rank === 2
                  ? "bg-secondary/20 text-secondary"
                  : model.rank === 3
                  ? "bg-fire/20 text-fire"
                  : "bg-white/5 text-text-muted"
              }`}>
                {model.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-heading font-semibold text-foreground truncate">
                  {model.name}
                </div>
                <div className="text-xs text-text-muted">{model.provider}</div>
              </div>
              <div className="hidden text-right text-sm sm:block">
                <div className="text-foreground">
                  <span className="text-text-muted text-xs">{t("inputPrice")} </span>
                  {model.input}
                </div>
                <div className="text-foreground">
                  <span className="text-text-muted text-xs">{t("outputPrice")} </span>
                  {model.output}
                </div>
              </div>
              <div className="text-right text-xs text-text-muted hidden sm:block">
                {t("perMillion")}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button href="/models" variant="secondary" size="md">
            {t("viewAll")} →
          </Button>
          <Button href="/llms" variant="ghost" size="md">
            {t("apiGuide")} →
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: 最新 Blog 文章 ─── */
function LatestBlog() {
  const t = useTranslations("home.blog");
  const tBlog = useTranslations("blog");
  const locale = useLocale();

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-card-bg/30 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {latestPosts.map((post) => {
            const title = locale === "zh-TW" ? post.title.zh : post.title.en;
            const excerpt = locale === "zh-TW"
              ? (post.excerpt as { zh: string; en: string }).zh
              : (post.excerpt as { zh: string; en: string }).en;

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <Card className="h-full">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary-light"
                      >
                        {tBlog(`tags.${tag}`)}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground leading-snug group-hover:text-primary-light transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
                    {excerpt}
                  </p>
                  <div className="mt-3 text-xs text-text-muted">{post.date}</div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href="/blog" variant="secondary" size="md">
            {t("viewAll")} →
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: 社群 CTA ─── */
function CommunityCta() {
  const t = useTranslations("home.community");

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 text-lg text-text-muted">
          {t("description")}
        </p>

        {/* 獵人協會 CTA */}
        <div className="mt-8">
          <a
            href="https://hunterassociation.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8734A] to-[#C75B3A] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(232,115,74,0.4),0_0_40px_rgba(232,115,74,0.2)]"
          >
            {t("hunterCta")}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12L12 4M12 4H5M12 4v7" />
            </svg>
          </a>
        </div>

        {/* 社群連結 */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="md" href="https://line.me/ti/g2/SCwiAQSnQ2SW6fFuKcOBs0sipyzdoOJ3FepZ2Q" variant="secondary">
            {t("joinLine")}
          </Button>
          <Button size="md" href="https://x.com/0x515151" variant="ghost">
            {t("followX")}
          </Button>
          <Button size="md" href="https://www.instagram.com/hunter.ai.crypto/" variant="ghost">
            {t("followIg")}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Animated Number (shared) ─── */
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

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <CoreFeatures />
      <FeaturedSkills />
      <ModelRanking />
      <LatestBlog />
      <CommunityCta />
    </>
  );
}
