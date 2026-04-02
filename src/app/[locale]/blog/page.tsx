"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Card from "@/components/ui/Card";
import blogPosts from "@/data/blog-posts.json";
import { useState } from "react";

/* ─── Tag Filter ─── */
function TagFilter({
  activeTag,
  onSelect,
}: {
  activeTag: string;
  onSelect: (tag: string) => void;
}) {
  const t = useTranslations("blog.tags");
  const tags = ["all", "tutorial", "review", "update", "tips", "deepDive"];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`rounded px-3.5 py-1.5 text-sm transition-colors duration-200 ${
            activeTag === tag
              ? "bg-primary/15 text-primary-light"
              : "border border-card-border text-text-muted hover:text-foreground"
          }`}
        >
          {t(tag)}
        </button>
      ))}
    </div>
  );
}

/* ─── Blog Card ─── */
function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const tTags = useTranslations("blog.tags");
  const isZh = locale === "zh-TW";

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span>
              {post.readTime} {t("readTime")}
            </span>
          </div>

          <h3 className="font-heading text-base font-semibold leading-tight text-foreground">
            {isZh ? post.title.zh : post.title.en}
          </h3>

          <p className="text-sm leading-relaxed text-text-muted line-clamp-3">
            {isZh ? post.excerpt.zh : post.excerpt.en}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-primary/8 px-2.5 py-0.5 text-xs text-primary-light"
              >
                {tTags(tag)}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const [activeTag, setActiveTag] = useState("all");

  const filteredPosts =
    activeTag === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(activeTag));

  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12">
          <TagFilter activeTag={activeTag} onSelect={setActiveTag} />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-24 text-center text-text-muted">
            {t("noResults")}
          </div>
        )}
      </div>
    </section>
  );
}
