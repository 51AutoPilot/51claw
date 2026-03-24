"use client";

import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import blogPosts from "@/data/blog-posts.json";
import Button from "@/components/ui/Button";

export default function BlogPostPage() {
  const t = useTranslations("blog");
  const tTags = useTranslations("blog.tags");
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const isZh = locale === "zh-TW";

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            404
          </h1>
          <p className="mt-2 text-text-muted">{t("notFound")}</p>
          <div className="mt-6">
            <Button href="/blog" variant="secondary">
              {t("backToList")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <article className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        {/* 返回連結 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary-light"
        >
          ← {t("backToList")}
        </Link>

        {/* 標題區 */}
        <header className="mt-8">
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <time>{post.date}</time>
            <span>·</span>
            <span>
              {post.readTime} {t("readTime")}
            </span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {isZh ? post.title.zh : post.title.en}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 text-xs font-medium text-primary-light"
              >
                {tTags(tag)}
              </span>
            ))}
          </div>
        </header>

        {/* 內容區 */}
        <div className="mt-12 rounded-2xl border border-card-border bg-card-bg p-4 sm:p-6 md:p-8">
          <p className="text-lg leading-relaxed text-text-muted">
            {isZh ? post.excerpt.zh : post.excerpt.en}
          </p>
          <div className="mt-8 border-t border-card-border pt-8 text-text-muted">
            {isZh ? post.content.zh : post.content.en}
          </div>
        </div>
      </div>
    </article>
  );
}
