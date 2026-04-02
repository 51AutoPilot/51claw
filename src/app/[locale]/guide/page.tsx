"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";
import Accordion from "@/components/ui/Accordion";

const STEPS = ["day1", "day2", "day3", "week2"] as const;
type StepKey = (typeof STEPS)[number];

interface StepConfig {
  stepCount: number;
  codes: (string | undefined)[];
  troubleshootCount: number;
}

const STEP_CONFIG: Record<StepKey, StepConfig> = {
  day1: {
    stepCount: 5,
    codes: [
      "# macOS (Homebrew)\nbrew install node\n\n# Windows (winget)\nwinget install OpenJS.NodeJS.LTS\n\n# Linux (nvm)\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\nnvm install 22\n\n# 驗證安裝\nnode -v    # v22.x.x\nnpm -v     # 10.x.x",
      "# 一鍵安裝（推薦）\n# macOS / Linux:\ncurl -fsSL https://raw.githubusercontent.com/anthropics/claude-code/main/install.sh | bash\n\n# Windows (PowerShell):\nirm https://raw.githubusercontent.com/anthropics/claude-code/main/install.ps1 | iex\n\n# 或用 npm:\nnpm install -g @anthropic-ai/claude-code",
      '# macOS / Linux\necho \'export ANTHROPIC_API_KEY="sk-ant-xxxxx"\' >> ~/.zshrc\nsource ~/.zshrc\n\n# Windows (PowerShell)\n[System.Environment]::SetEnvironmentVariable(\'ANTHROPIC_API_KEY\', \'sk-ant-xxxxx\', \'User\')',
      "mkdir my-first-project && cd my-first-project\nclaude",
      '# 1. Telegram 搜尋 @BotFather → /newbot → 拿到 Bot Token\n\n# macOS / Linux\necho \'export TELEGRAM_BOT_TOKEN="your-bot-token"\' >> ~/.zshrc\nsource ~/.zshrc\n\n# Windows (PowerShell)\n[System.Environment]::SetEnvironmentVariable(\'TELEGRAM_BOT_TOKEN\', \'your-bot-token\', \'User\')',
    ],
    troubleshootCount: 4,
  },
  day2: {
    stepCount: 4,
    codes: [
      "clawhub install agentguard\n\n# 試試看：\n# 你：掃描我已安裝的所有 Skills 有沒有安全問題\n# 你：檢查一下我的環境有沒有潛在隱患",
      "npx skills add find-skills\n\n# 試試看：\n# 你：我想查 BTC 的價格，有什麼 Skill 可以用？\n# 你：幫我找一個做影片的 Skill",
      "# 交易者 → CoinAnk\nnpx skills add https://github.com/coinank/coinank-openapi-skill\n\n# 追新聞 → BlockBeats\nnpx skills add https://github.com/BlockBeatsOfficial/blockbeats-skill\n\n# 幣安用戶 → Binance（推薦）\nnpx skills add https://github.com/binance/binance-skills-hub",
      "# 掃描 Skill 安全性\n# 你：用 AgentGuard 掃描一下這個 Skill：https://github.com/xxx/skill\n\n# 額外防護：安裝 SlowMist 慢霧安全\nclawhub install slowmist-agent-security",
    ],
    troubleshootCount: 3,
  },
  day3: {
    stepCount: 3,
    codes: [
      "# 直接跟 Claude 說：\n# 你：幫我設定一個 Cron，每天早上 9 點查 BTC 價格，然後推送到 Telegram\n\n# Claude 會生成 cron 表達式：\n# 0 1 * * *  (UTC+8 每天 9 點)",
      "# 直接跟 Claude 說你要什麼：\n# 你：每 2 小時檢查一次 BTC 價格，跌超過 5% 通知我\n# 你：每天下午 6 點幫我整理今天的加密新聞摘要\n# 你：每週一生成一份我的持倉報告",
      "# 測試 Telegram 推送：\n# 你：幫我測試一下 Telegram 推送，發一則「Hello from AI」",
    ],
    troubleshootCount: 2,
  },
  week2: {
    stepCount: 4,
    codes: [
      '# 在專案目錄下建 SOUL.md：\n\n# 我的 AI 助手設定\n\n## 角色\n你是我的加密貨幣研究助手。\n\n## 風格\n- 回答用繁體中文，技術術語保留英文\n- 直接講重點，不要廢話\n- 給建議時要附上理由\n\n## 關注重點\n- BTC、ETH、SOL 為主要觀察標的\n- 關注巨鯨動態和 ETF 資金流',
      undefined,
      undefined,
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
      <div className="absolute left-0 right-0 top-4 z-0 mx-8 h-px bg-card-border sm:mx-12" />
      {/* 進度連接線 */}
      <div
        className="absolute left-0 top-4 z-0 mx-8 h-px bg-primary transition-all duration-300 ease-out sm:mx-12"
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
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-primary bg-primary/15 text-primary-light"
                  : isPast
                    ? "border-primary/50 bg-primary/8 text-primary-light"
                    : "border-card-border bg-card-bg text-text-muted group-hover:border-primary/30"
              }`}
            >
              {isPast ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,8 7,12 13,4" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-xs transition-colors duration-200 sm:text-sm ${
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
    <Card hoverable={false}>
      <div className="flex gap-4">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-primary/10 text-sm font-medium text-primary-light">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-heading text-base font-medium text-foreground">
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
    <div className="animate-[fadeIn_0.2s_ease-out]">
      <div className="mb-8">
        <span className="inline-block rounded bg-primary/10 px-3 py-1 text-sm text-primary-light">
          {t("label")}
        </span>
        <h2 className="mt-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          {t("subtitle")}
        </p>
      </div>

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

      <div className="mt-8">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-foreground">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-text-muted">
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

export default function GuidePage() {
  const t = useTranslations("guide");
  const [activeStep, setActiveStep] = useState<StepKey>("day1");

  const handleSelect = useCallback((step: StepKey) => {
    setActiveStep(step);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="px-4 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-text-muted">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Progress + Content */}
      <section className="px-4 pb-28">
        <div className="mx-auto max-w-2xl">
          <div className="rounded border border-card-border bg-card-bg p-6 sm:p-8">
            <p className="mb-6 text-center text-xs uppercase tracking-widest text-text-muted">
              {t("progress")}
            </p>
            <ProgressNav activeStep={activeStep} onSelect={handleSelect} />
          </div>

          <div className="mt-12">
            <DaySection key={activeStep} stepKey={activeStep} />
          </div>
        </div>
      </section>
    </>
  );
}
