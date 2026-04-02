"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-10 mb-4 font-heading text-2xl font-semibold text-foreground first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 border-b border-card-border pb-2 font-heading text-xl font-semibold text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-heading text-lg font-semibold text-foreground first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 font-heading text-base font-semibold text-foreground first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-text-muted last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-muted">{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary-light transition-colors hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1.5 text-text-muted marker:text-primary-light last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1.5 text-text-muted marker:text-primary-light last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-[3px] border-primary-light bg-white/[0.03] py-2 pl-4 pr-3 italic text-text-muted">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`${className} text-sm leading-relaxed`}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-primary-light">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-black/40 p-4 font-mono text-sm">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded border border-card-border">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/[0.06]">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-card-border">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors even:bg-white/[0.02] hover:bg-white/[0.04]">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-text-muted">{children}</td>
  ),
  hr: () => <hr className="my-8 border-card-border" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      className="my-4 max-w-full rounded"
      loading="lazy"
    />
  ),
  input: ({ checked, disabled }) => (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      className="mr-2 accent-primary-light"
      readOnly
    />
  ),
  del: ({ children }) => (
    <del className="text-text-muted/60 line-through">{children}</del>
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
