"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language,
  className = "",
}: CodeBlockProps) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-card-border bg-[#0d0d14] ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-card-border px-4 py-2">
        {language && (
          <span className="text-xs font-medium text-text-muted font-mono">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className={`ml-auto rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 ${
            copied
              ? "bg-green-500/20 text-green-400"
              : "text-text-muted hover:bg-white/5 hover:text-foreground"
          }`}
        >
          {copied ? `✓ ${t("copied")}` : t("copyCode")}
        </button>
      </div>

      {/* Code content */}
      <pre className="overflow-x-auto p-3 sm:p-4">
        <code className="text-xs leading-relaxed text-foreground/90 font-mono sm:text-sm">
          {code}
        </code>
      </pre>
    </div>
  );
}
