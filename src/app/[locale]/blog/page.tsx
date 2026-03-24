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
    <div className="flex flex-wrap justify-center gap-3">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 sm:px-4 sm:text-sm ${
            activeTag === tag
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "border border-card-border text-text-muted hover:border-primary/50 hover:text-primary-light"
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
        {/* 頂部漸變光條 */}
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex flex-col gap-3">
          {/* 日期 + 閱讀時間 */}
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <time>{post.date}</time>
            <span>·</span>
            <span>
              {post.readTime} {t("readTime")}
            </span>
          </div>

          {/* 標題 */}
          <h3 className="font-heading text-lg font-semibold leading-tight text-foreground">
            {isZh ? post.title.zh : post.title.en}
          </h3>

          {/* 摘要 */}
          <p className="text-sm leading-relaxed text-text-muted line-clamp-3">
            {isZh ? post.excerpt.zh : post.excerpt.en}
          </p>

          {/* 標籤 */}
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 text-xs font-medium text-primary-light"
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

/* ─── Page ─── */
export default function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState("all");

  const filteredPosts =
    activeTag === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(activeTag));

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* 標題 */}
        <div className="text-center">
          <h1 className="text-gradient-purple font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            {t("subtitle")}
          </p>
        </div>

        {/* 標籤篩選 */}
        <div className="mt-12">
          <TagFilter activeTag={activeTag} onSelect={setActiveTag} />
        </div>

        {/* 文章列表 */}
        {filteredPosts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center text-text-muted">
            {t("noResults")}
          </div>
        )}
      </div>
    </section>
  );
}
