"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";
import Accordion from "@/components/ui/Accordion";

const STEPS = ["day1", "day2", "day3", "week2"] as const;
type StepKey = (typeof STEPS)[number];

/* ─── 每個 Day 的步驟數量和 code snippets ─── */
interface StepConfig {
  stepCount: number;
  codes: (string | undefined)[];
  troubleshootCount: number;
}

const STEP_CONFIG: Record<StepKey, StepConfig> = {
  day1: {
    stepCount: 5,
    codes: [
      // Step 1: Install Node.js
      "# macOS (Homebrew)\nbrew install node\n\n# Windows (winget)\nwinget install OpenJS.NodeJS.LTS\n\n# Linux (nvm)\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\nnvm install 22\n\n# 驗證安裝\nnode -v    # v22.x.x\nnpm -v     # 10.x.x",
      // Step 2: Install Claude Code
      "# 一鍵安裝（推薦）\n# macOS / Linux:\ncurl -fsSL https://raw.githubusercontent.com/anthropics/claude-code/main/install.sh | bash\n\n# Windows (PowerShell):\nirm https://raw.githubusercontent.com/anthropics/claude-code/main/install.ps1 | iex\n\n# 或用 npm:\nnpm install -g @anthropic-ai/claude-code",
      // Step 3: Set API Key
      '# macOS / Linux\necho \'export ANTHROPIC_API_KEY="sk-ant-xxxxx"\' >> ~/.zshrc\nsource ~/.zshrc\n\n# Windows (PowerShell)\n[System.Environment]::SetEnvironmentVariable(\'ANTHROPIC_API_KEY\', \'sk-ant-xxxxx\', \'User\')',
      // Step 4: Launch
      "mkdir my-first-project && cd my-first-project\nclaude",
      // Step 5: Telegram
      '# 1. Telegram 搜尋 @BotFather → /newbot → 拿到 Bot Token\n\n# macOS / Linux\necho \'export TELEGRAM_BOT_TOKEN="your-bot-token"\' >> ~/.zshrc\nsource ~/.zshrc\n\n# Windows (PowerShell)\n[System.Environment]::SetEnvironmentVariable(\'TELEGRAM_BOT_TOKEN\', \'your-bot-token\', \'User\')',
    ],
    troubleshootCount: 4,
  },
  day2: {
    stepCount: 4,
    codes: [
      // Step 1: AgentGuard
      "clawhub install agentguard\n\n# 試試看：\n# 你：掃描我已安裝的所有 Skills 有沒有安全問題\n# 你：檢查一下我的環境有沒有潛在隱患",
      // Step 2: find-skills
      "npx skills add find-skills\n\n# 試試看：\n# 你：我想查 BTC 的價格，有什麼 Skill 可以用？\n# 你：幫我找一個做影片的 Skill",
      // Step 3: Pick one
      "# 交易者 → CoinAnk\nnpx skills add https://github.com/coinank/coinank-openapi-skill\n\n# 追新聞 → BlockBeats\nnpx skills add https://github.com/BlockBeatsOfficial/blockbeats-skill\n\n# 幣安用戶 → Binance（推薦）\nnpx skills add https://github.com/binance/binance-skills-hub",
      // Step 4: Verify security
      "# 掃描 Skill 安全性\n# 你：用 AgentGuard 掃描一下這個 Skill：https://github.com/xxx/skill\n\n# 額外防護：安裝 SlowMist 慢霧安全\nclawhub install slowmist-agent-security",
    ],
    troubleshootCount: 3,
  },
  day3: {
    stepCount: 3,
    codes: [
      // Step 1: Daily price check
      "# 直接跟 Claude 說：\n# 你：幫我設定一個 Cron，每天早上 9 點查 BTC 價格，然後推送到 Telegram\n\n# Claude 會生成 cron 表達式：\n# 0 1 * * *  (UTC+8 每天 9 點)",
      // Step 2: More ideas
      "# 直接跟 Claude 說你要什麼：\n# 你：每 2 小時檢查一次 BTC 價格，跌超過 5% 通知我\n# 你：每天下午 6 點幫我整理今天的加密新聞摘要\n# 你：每週一生成一份我的持倉報告",
      // Step 3: Telegram push
      "# 測試 Telegram 推送：\n# 你：幫我測試一下 Telegram 推送，發一則「Hello from AI」",
    ],
    troubleshootCount: 2,
  },
  week2: {
    stepCount: 4,
    codes: [
      // Step 1: SOUL.md
      '# 在專案目錄下建 SOUL.md：\n\n# 我的 AI 助手設定\n\n## 角色\n你是我的加密貨幣研究助手。\n\n## 風格\n- 回答用繁體中文，技術術語保留英文\n- 直接講重點，不要廢話\n- 給建議時要附上理由\n\n## 關注重點\n- BTC、ETH、SOL 為主要觀察標的\n- 關注巨鯨動態和 ETF 資金流',
      // Step 2: Multi-model
      undefined,
      // Step 3: MCP
      undefined,
      // Step 4: Write a Skill
      "# 跟 Claude 說：\n# 你：幫我寫一個 Skill，功能是：\n# 1. 查 BTC 和 ETH 的價格\n# 2. 查今天的恐懼貪婪指數\n# 3. 查巨鯨最近的大額操作\n# 4. 整理成一份簡報，推送到 Telegram\n# Skill 名稱叫 daily-vibe-check",
    ],
    troubleshootCount: 2,
  },
};

/* ─── 進度導航列 ─── */
function ProgressNav({
  activeStep,
  onSelect,
}: {
  activeStep: StepKey;
  onSelect: (step: StepKey) => void;
}) {
  const t = useTranslations("guide");
  const activeIdx = STEPS.indexOf(activeStep);

  return (
    <div className="relative flex items-center justify-between">
      {/* 背景連接線 */}
      <div className="absolute left-0 right-0 top-5 z-0 mx-8 h-0.5 bg-card-border sm:mx-12" />
      {/* 進度連接線 */}
      <div
        className="absolute left-0 top-5 z-0 mx-8 h-0.5 bg-gradient-to-r from-primary to-primary-light transition-all duration-500 ease-out sm:mx-12"
        style={{
          width: activeIdx === 0 ? "0%" : `${(activeIdx / (STEPS.length - 1)) * 100}%`,
        }}
      />

      {STEPS.map((step, i) => {
        const isActive = step === activeStep;
        const isPast = i < activeIdx;

        return (
          <button
            key={step}
            onClick={() => onSelect(step)}
            className="group relative z-10 flex flex-col items-center gap-2"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "border-primary bg-primary/20 text-primary-light scale-110 shadow-[0_0_16px_rgba(232,115,74,0.4)]"
                  : isPast
                    ? "border-primary/60 bg-primary/10 text-primary-light"
                    : "border-card-border bg-card-bg text-text-muted group-hover:border-primary/30"
              }`}
            >
              {isPast ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,8 7,12 13,4" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-xs font-medium transition-colors duration-200 sm:text-sm ${
                isActive ? "text-primary-light" : "text-text-muted"
              }`}
            >
              {t(`${step}.label`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── 步驟卡片 ─── */
function StepCard({
  number,
  title,
  description,
  code,
}: {
  number: number;
  title: string;
  description: string;
  code?: string;
}) {
  return (
    <Card hoverable={false} showGradientBar={false}>
      <div className="flex gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary-light">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-heading text-base font-semibold text-foreground sm:text-lg">
            {title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
            {description}
          </p>
          {code && (
            <div className="mt-3">
              <CodeBlock code={code} language="bash" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ─── Day 內容區塊 ─── */
function DaySection({ stepKey }: { stepKey: StepKey }) {
  const t = useTranslations(`guide.${stepKey}`);
  const config = STEP_CONFIG[stepKey];

  /* 動態生成 troubleshoot items */
  const troubleshootItems = Array.from(
    { length: config.troubleshootCount },
    (_, i) => ({
      key: `q${i + 1}`,
      title: t(`troubleshootItems.q${i + 1}`),
      content: (
        <p className="leading-relaxed">{t(`troubleshootItems.a${i + 1}`)}</p>
      ),
    })
  );

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Day 標題 */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <span className="text-sm font-bold text-primary-light">
            {t("label")}
          </span>
        </div>
        <h2 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-text-muted">
          {t("subtitle")}
        </p>
      </div>

      {/* 步驟卡片 — 動態數量 */}
      <div className="space-y-4">
        {Array.from({ length: config.stepCount }, (_, i) => (
          <StepCard
            key={i}
            number={i + 1}
            title={t(`step${i + 1}Title`)}
            description={t(`step${i + 1}Desc`)}
            code={config.codes[i]}
          />
        ))}
      </div>

      {/* 問題排除摺疊區 */}
      <div className="mt-8">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary-light">
            <circle cx="9" cy="9" r="8" />
            <path d="M9 5v4M9 12v.5" />
          </svg>
          {t("troubleshoot")}
        </h3>
        <Accordion items={troubleshootItems} />
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function GuidePage() {
  const t = useTranslations("guide");
  const [activeStep, setActiveStep] = useState<StepKey>("day1");

  const handleSelect = useCallback((step: StepKey) => {
    setActiveStep(step);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-gradient-claude font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-text-muted sm:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* 進度導航 + 內容 */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          {/* 進度條 */}
          <div className="rounded-2xl border border-card-border bg-card-bg p-6 sm:p-8">
            <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-text-muted">
              {t("progress")}
            </p>
            <ProgressNav activeStep={activeStep} onSelect={handleSelect} />
          </div>

          {/* Day 內容 */}
          <div className="mt-10">
            <DaySection key={activeStep} stepKey={activeStep} />
          </div>
        </div>
      </section>
    </>
  );
}
