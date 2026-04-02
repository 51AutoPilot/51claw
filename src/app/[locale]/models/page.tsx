"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo, useCallback } from "react";

/* ─── Types ─── */
interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  context_length: number;
  pricing: {
    prompt: string;
    completion: string;
  };
  top_provider?: {
    is_moderated: boolean;
  };
  architecture?: {
    modality: string;
    tokenizer: string;
    instruct_type: string | null;
  };
}

type SortKey = "name" | "price-asc" | "price-desc" | "context-desc";

/* ─── Helpers ─── */
function extractProvider(id: string): string {
  const prefix = id.split("/")[0];
  const map: Record<string, string> = {
    anthropic: "Anthropic",
    openai: "OpenAI",
    google: "Google",
    meta: "Meta",
    "meta-llama": "Meta",
    mistralai: "Mistral AI",
    deepseek: "DeepSeek",
    cohere: "Cohere",
    "x-ai": "xAI",
    qwen: "Alibaba",
    microsoft: "Microsoft",
    "01-ai": "01.AI",
    perplexity: "Perplexity",
    nvidia: "NVIDIA",
    amazon: "Amazon",
  };
  return map[prefix] || prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function formatPrice(raw: string): number {
  const n = parseFloat(raw);
  if (isNaN(n)) return 0;
  return n * 1_000_000;
}

function formatCtx(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  return `${Math.round(n / 1000)}K`;
}

function formatDollar(n: number): string {
  if (n === 0) return "Free";
  if (n < 0.01) return `$${n.toFixed(4)}`;
  if (n < 1) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
}

const TOP_PROVIDERS = [
  "Anthropic", "OpenAI", "Google", "Meta", "Mistral AI",
  "DeepSeek", "Cohere", "xAI", "Alibaba", "Microsoft",
];

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-4 sm:px-6 animate-pulse">
      <div className="h-7 w-7 rounded bg-white/5" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded bg-white/5" />
        <div className="h-3 w-24 rounded bg-white/5" />
      </div>
      <div className="hidden sm:block h-3 w-16 rounded bg-white/5" />
      <div className="hidden sm:block h-3 w-20 rounded bg-white/5" />
    </div>
  );
}

export default function ModelsPage() {
  const t = useTranslations("models");
  const [models, setModels] = useState<OpenRouterModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("price-desc");
  const [freeOnly, setFreeOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchModels() {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/models");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setModels(data.data || []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch");
          setLoading(false);
        }
      }
    }
    fetchModels();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let list = models.filter((m) => {
      if (search) {
        const q = search.toLowerCase();
        if (!m.name.toLowerCase().includes(q) && !m.id.toLowerCase().includes(q)) return false;
      }
      if (provider !== "all") {
        if (extractProvider(m.id) !== provider) return false;
      }
      if (freeOnly) {
        if (formatPrice(m.pricing.prompt) > 0) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      switch (sort) {
        case "name": return a.name.localeCompare(b.name);
        case "price-asc": return formatPrice(a.pricing.prompt) - formatPrice(b.pricing.prompt);
        case "price-desc": return formatPrice(b.pricing.prompt) - formatPrice(a.pricing.prompt);
        case "context-desc": return b.context_length - a.context_length;
        default: return 0;
      }
    });

    return list;
  }, [models, search, provider, sort, freeOnly]);

  const availableProviders = useMemo(() => {
    const set = new Set<string>();
    models.forEach((m) => set.add(extractProvider(m.id)));
    return TOP_PROVIDERS.filter((p) => set.has(p));
  }, [models]);

  const maxCtx = useMemo(
    () => Math.max(...models.map((m) => m.context_length), 1),
    [models]
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            {t("subtitle")}
          </p>
          {!loading && !error && (
            <p className="mt-2 text-sm text-text-muted">
              {filtered.length} / {models.length} {t("modelsCount")}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded border border-card-border bg-card-bg py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-text-muted outline-none transition-colors focus:border-primary/40"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded border border-card-border bg-card-bg px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/40"
            >
              <option value="price-desc">{t("sortPriceDesc")}</option>
              <option value="price-asc">{t("sortPriceAsc")}</option>
              <option value="context-desc">{t("sortContext")}</option>
              <option value="name">{t("sortName")}</option>
            </select>

            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`rounded border px-3 py-2.5 text-sm transition-colors ${
                freeOnly
                  ? "border-primary/40 bg-primary/10 text-primary-light"
                  : "border-card-border bg-card-bg text-text-muted hover:text-foreground"
              }`}
            >
              {t("freeOnly")}
            </button>
          </div>
        </div>

        {/* Provider Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setProvider("all")}
            className={`rounded px-3 py-1.5 text-xs transition-colors ${
              provider === "all"
                ? "bg-primary/15 text-primary-light"
                : "bg-white/5 text-text-muted hover:text-foreground"
            }`}
          >
            {t("allProviders")}
          </button>
          {availableProviders.map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p === provider ? "all" : p)}
              className={`rounded px-3 py-1.5 text-xs transition-colors ${
                provider === p
                  ? "bg-primary/15 text-primary-light"
                  : "bg-white/5 text-text-muted hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8">
          {loading ? (
            <div className="overflow-hidden rounded border border-card-border bg-card-bg">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={i < 9 ? "border-b border-card-border" : ""}>
                  <SkeletonRow />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center rounded border border-card-border bg-card-bg px-8 py-20 text-center">
              <h3 className="font-heading text-base font-semibold text-foreground">
                {t("errorTitle")}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{t("errorDesc")}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded border border-card-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/30"
              >
                {t("retry")}
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded border border-card-border bg-card-bg px-8 py-20 text-center">
              <p className="text-text-muted">{t("noResults")}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded border border-card-border bg-card-bg">
              {/* Table header */}
              <div className="hidden border-b border-card-border px-4 py-3 text-xs uppercase tracking-wider text-text-muted sm:flex sm:items-center sm:gap-4 sm:px-6">
                <div className="w-7" />
                <div className="flex-1">{t("colModel")}</div>
                <div className="w-28 text-right">{t("colInput")}</div>
                <div className="w-28 text-right">{t("colOutput")}</div>
                <div className="w-36">{t("colContext")}</div>
              </div>

              {filtered.map((model, i) => {
                const inputPrice = formatPrice(model.pricing.prompt);
                const outputPrice = formatPrice(model.pricing.completion);
                const isFree = inputPrice === 0 && outputPrice === 0;
                const ctxRatio = Math.min(model.context_length / maxCtx, 1);
                const prov = extractProvider(model.id);

                return (
                  <div
                    key={model.id}
                    className={`flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 sm:px-6 ${
                      i < filtered.length - 1 ? "border-b border-card-border" : ""
                    }`}
                  >
                    <div className={`hidden sm:flex h-7 w-7 flex-shrink-0 items-center justify-center rounded font-heading text-xs font-medium ${
                      i === 0 ? "bg-[#FFD700]/10 text-[#FFD700]" :
                      i === 1 ? "bg-[#C0C0C0]/10 text-[#C0C0C0]" :
                      i === 2 ? "bg-[#CD7F32]/10 text-[#CD7F32]" :
                      "bg-white/5 text-text-muted"
                    }`}>
                      {i + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-medium text-foreground truncate">
                          {model.name}
                        </span>
                        <span className="hidden shrink-0 rounded bg-white/5 px-2 py-0.5 text-[10px] text-text-muted sm:inline">
                          {prov}
                        </span>
                        {isFree && (
                          <span className="shrink-0 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                            FREE
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-text-muted sm:hidden">
                        {prov}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs sm:contents">
                      <div className="w-28 text-right">
                        <span className="font-mono text-sm text-foreground">
                          {formatDollar(inputPrice)}
                        </span>
                      </div>
                      <div className="w-28 text-right">
                        <span className="font-mono text-sm text-foreground">
                          {formatDollar(outputPrice)}
                        </span>
                      </div>
                    </div>

                    <div className="w-36 hidden sm:block">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/60 transition-all"
                            style={{ width: `${Math.max(ctxRatio * 100, 2)}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-text-muted whitespace-nowrap">
                          {formatCtx(model.context_length)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-text-muted sm:hidden">
                      <span className="text-primary-light">ctx</span>
                      <span>{formatCtx(model.context_length)}</span>
                      <span className="mx-1">·</span>
                      <span>{formatDollar(inputPrice)} / {formatDollar(outputPrice)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
