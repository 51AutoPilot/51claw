# FAQ 10 題答案（雙語版）

> 每題都有繁體中文 + English 版本。
> 語氣：直接、有料、不囉嗦。

---

## Q1：OpenClaw vs Claude Code 差在哪？

### 繁體中文

**一句話：** OpenClaw 是平台，Claude Code 是底層引擎之一。

Claude Code 是 Anthropic 出的 AI 開發工具，你可以把它想成一個很聰明的大腦。OpenClaw 是一個完整的系統，它把 Claude Code（以及其他 AI 模型）包起來，加上 Skill 市場、Telegram 整合、Cron 排程、Web UI — 讓你不用寫程式就能用 AI 幹活。

**簡單類比：**
- Claude Code = 引擎
- OpenClaw = 整台車（引擎 + 方向盤 + 導航 + 音響）

你不需要二選一。用 OpenClaw 的時候，底層就在用 Claude Code（或你選的其他模型）。

### English

**One-liner:** OpenClaw is the platform, Claude Code is one of the engines under the hood.

Claude Code is Anthropic's AI dev tool — think of it as a powerful brain. OpenClaw wraps Claude Code (and other AI models) into a complete system: Skill marketplace, Telegram integration, Cron scheduling, Web UI — so you can use AI without writing code.

**Simple analogy:**
- Claude Code = engine
- OpenClaw = the whole car (engine + steering + GPS + stereo)

You don't need to choose between them. When you use OpenClaw, it's already using Claude Code (or whichever model you pick) underneath.

---

## Q2：要花多少錢？

### 繁體中文

**比你想的便宜很多。** 最低每月不到 $1。

費用分兩塊：

**1. AI 模型 API 費用（按用量計費）：**

| 使用程度 | Sonnet（推薦） | Haiku（省錢） | DeepSeek（最省） |
|---------|--------------|-------------|----------------|
| 每天聊幾句 | ~$0.5/月 | ~$0.05/月 | ~$0.03/月 |
| 每天工作用 | ~$5/月 | ~$0.5/月 | ~$0.3/月 |
| 全天重度使用 | ~$25/月 | ~$2.5/月 | ~$1.5/月 |

**2. VPS 費用（如果要 24 小時跑 Cron）：** $5-15/月

**省錢策略：** 日常用 Sonnet，Cron 和簡單任務用 Haiku 或 DeepSeek。大部分人每月 $5-10 就夠了。

> Google Gemini 有免費額度，新手可以先用免費方案試水。

### English

**Way cheaper than you think.** Starting from less than $1/month.

Two cost components:

**1. AI Model API (pay-as-you-go):**

| Usage | Sonnet (recommended) | Haiku (budget) | DeepSeek (cheapest) |
|-------|---------------------|---------------|-------------------|
| Casual chats | ~$0.5/mo | ~$0.05/mo | ~$0.03/mo |
| Daily work | ~$5/mo | ~$0.5/mo | ~$0.3/mo |
| Heavy all-day | ~$25/mo | ~$2.5/mo | ~$1.5/mo |

**2. VPS (if running Cron 24/7):** $5-15/month

**Money-saving tip:** Use Sonnet for daily work, Haiku or DeepSeek for Cron and simple tasks. Most people spend $5-10/month total.

> Google Gemini has a free tier — great for beginners to test the waters before committing.

---

## Q3：怎麼裝？

### 繁體中文

**3 步，5 分鐘。**

```bash
# 1. 裝 Node.js
brew install node          # macOS
winget install OpenJS.NodeJS.LTS  # Windows

# 2. 裝 Claude Code
npm install -g @anthropic-ai/claude-code

# 3. 設定 API Key
export ANTHROPIC_API_KEY="你的-key"
```

然後打 `claude` 就能開始用。

完整圖文步驟、常見錯誤排除、三個平台（macOS/Windows/Linux）的安裝教學 → [安裝指南](/install)

### English

**3 steps, 5 minutes.**

```bash
# 1. Install Node.js
brew install node          # macOS
winget install OpenJS.NodeJS.LTS  # Windows

# 2. Install Claude Code
npm install -g @anthropic-ai/claude-code

# 3. Set API Key
export ANTHROPIC_API_KEY="your-key"
```

Run `claude` and you're in.

Full step-by-step with screenshots, troubleshooting, and platform-specific guides (macOS/Windows/Linux) → [Install Guide](/install)

---

## Q4：裝了然後呢？

### 繁體中文

**做三件事，立刻感受到價值：**

1. **裝 AgentGuard** — 保護你的安全（`clawhub install agentguard`）
2. **裝 find-skills** — 找到你需要的工具（`npx skills add find-skills`）
3. **接 Telegram** — 讓 AI 能主動聯繫你

裝完之後直接問：
```
你：我是幣圈新手，推薦我今天該關注什麼
你：幫我查 BTC 現在的價格
你：掃描我的環境有沒有安全問題
```

詳細的新手 SOP（Day 1 到 Week 2 完整引導）→ [新手指南](/guide)

### English

**Do three things to see immediate value:**

1. **Install AgentGuard** — protect yourself (`clawhub install agentguard`)
2. **Install find-skills** — find what you need (`npx skills add find-skills`)
3. **Connect Telegram** — let your AI reach you proactively

Then just ask:
```
You: I'm new to crypto, what should I be watching today?
You: Check the current BTC price
You: Scan my environment for security issues
```

Full beginner SOP (Day 1 through Week 2 guide) → [Getting Started](/guide)

---

## Q5：MCP 是什麼？

### 繁體中文

**白話版：MCP 是讓 AI 連上外部世界的橋樑。**

AI 本身很聰明，但它被關在一個封閉的房間裡 — 看不到即時價格、讀不到新聞、碰不到你的錢包。

MCP（Model Context Protocol）就是幫 AI 開窗戶。每裝一個 Skill，就是多開一扇窗：
- 裝了 Binance Skill → AI 能看到幣安行情
- 裝了 AgentGuard → AI 能掃描安全威脅
- 裝了 Telegram → AI 能發訊息給你

**你不需要懂 MCP 的技術原理。** 只需要知道：想讓 AI 做什麼，找對應的 Skill 裝就好。Skill 就是 MCP 的應用層。

### English

**Plain English: MCP is a bridge connecting AI to the outside world.**

AI is smart, but it's locked in a sealed room — can't see live prices, can't read news, can't touch your wallet.

MCP (Model Context Protocol) opens windows. Each Skill you install opens a new one:
- Install Binance Skill → AI sees market data
- Install AgentGuard → AI scans security threats
- Install Telegram → AI can message you

**You don't need to understand how MCP works technically.** Just know this: want your AI to do something? Find the matching Skill and install it. Skills are the user-facing layer of MCP.

---

## Q6：Skill 怎麼挑？

### 繁體中文

**兩個原則：看需求、看安全。**

**看需求：** 先想清楚你要 AI 幫你做什麼。查價格？追新聞？寫代碼？做影片？然後到 [HunterKit Skills 目錄](/skills) 搜尋，每個 Skill 都有使用範例，一看就知道合不合用。

**看安全：** ClawHub 上有 **13.4% 的 Skill 存在安全問題**（Snyk 審計結果）。裝之前養成習慣：

1. 看 GitHub Stars — Stars 多的通常比較可靠
2. 看是不是官方出的（幣安、Anthropic、Uniswap 等官方 Skill 優先）
3. 用 AgentGuard 掃一下：`你：用 AgentGuard 掃描這個 Skill`
4. 不確定就不裝

> **HunterKit 的 Skills 目錄已經幫你做過一輪篩選**，每個都有安全評級（pass / warn / reject）。從這裡選比直接去 ClawHub 安全得多。

### English

**Two principles: check your needs, check the security.**

**Needs:** Think about what you want AI to do. Check prices? Track news? Write code? Make videos? Then search the [HunterKit Skills Directory](/skills) — every Skill has usage examples so you know if it fits.

**Security:** **13.4% of Skills on ClawHub have security issues** (per Snyk audit). Make this a habit before installing:

1. Check GitHub Stars — more stars usually means more reliable
2. Prefer official Skills (Binance, Anthropic, Uniswap, etc.)
3. Scan with AgentGuard: `You: Scan this Skill with AgentGuard`
4. When in doubt, don't install

> **HunterKit's Skills Directory is pre-screened** — every Skill has a security rating (pass / warn / reject). Picking from here is much safer than browsing ClawHub raw.

---

## Q7：能拿來幹嘛？

### 繁體中文

**比你想的多。以下是真實用例：**

**🔥 交易 & 研究**
- 即時查價格、K 線、多空比、資金費率
- 追蹤巨鯨錢包，看聰明錢在做什麼
- BTC ETF 資金流監控
- 每天自動生成市場簡報推送到 Telegram

**🤖 自動化**
- 設 Cron 每天自動查新聞、價格、巨鯨動態
- BTC 跌超過 5% 自動告警
- 每週生成投資組合報告

**💻 寫代碼**
- 幫你建網站、寫 API、修 Bug
- 用自然語言描述需求，AI 直接寫
- 多 Agent 並行開發（oh-my-claudecode）

**📝 內容創作**
- 自動生成研究報告、新聞摘要
- 做簡報、流程圖、數據表格
- 用 React 做影片（Remotion）

### English

**More than you'd expect. Here are real use cases:**

**🔥 Trading & Research**
- Real-time prices, K-lines, long/short ratios, funding rates
- Track whale wallets, see what smart money is doing
- BTC ETF flow monitoring
- Auto-generate daily market briefs, pushed to Telegram

**🤖 Automation**
- Cron jobs for daily news, prices, whale activity
- BTC drops 5%? Auto-alert
- Weekly portfolio reports

**💻 Coding**
- Build websites, write APIs, fix bugs
- Describe what you want in plain language, AI codes it
- Multi-agent parallel development (oh-my-claudecode)

**📝 Content Creation**
- Auto-generate research reports, news digests
- Create presentations, flowcharts, data tables
- Make videos with React (Remotion)

---

## Q8：免費方案夠用嗎？

### 繁體中文

**看你怎麼用。**

- **Google Gemini** 有免費額度，每天聊幾句完全夠用。適合先試水、感受一下 AI 能做什麼。
- **Anthropic Claude** 註冊送 $5，大概能聊好幾天。
- **DeepSeek** 極度便宜（輸入 $0.14/M tokens），一個月可能 $1 都不到。

**免費方案的限制：**
- 模型能力可能較弱（免費的通常不是最強的）
- 有 rate limit（每分鐘能問幾次有上限）
- 進階功能可能受限

**建議：** 先用免費方案玩一圈，確定自己會持續用，再花 $5-10/月升級到 Sonnet。這比一杯咖啡便宜。

### English

**Depends on how you use it.**

- **Google Gemini** has a free tier — enough for casual daily chats. Great for testing the waters.
- **Anthropic Claude** gives $5 free credits on signup — that's several days of chatting.
- **DeepSeek** is absurdly cheap ($0.14/M input tokens) — could be under $1/month.

**Free tier limitations:**
- Model capability may be weaker (free ≠ best)
- Rate limits (caps on requests per minute)
- Advanced features might be restricted

**Recommendation:** Play around with free tiers first. Once you know you'll keep using it, upgrade to Sonnet for $5-10/month. That's less than a cup of coffee.

---

## Q9：安全嗎？

### 繁體中文

**給 AI 權限是要小心，但有方法管理風險。**

**風險在哪：**
- Skill 可以存取你的資料和網路 — 裝錯 Skill 就像裝了流氓 App
- ClawHub 上 13.4% 的 Skill 有安全問題
- 如果你讓 AI 操作錢包，私鑰的安全至關重要

**怎麼保護自己：**

1. **裝 AgentGuard**（GoPlus 出品）— 環境巡檢 + 惡意 Skill 攔截 + 動態監控
2. **裝 SlowMist 慢霧安全** — 投毒偵測、釣魚檢測、代碼後門掃描
3. **從 HunterKit 選 Skill** — 我們每個 Skill 都有安全評級，比直接去 ClawHub 安全
4. **不確定就不裝** — 寧可少一個功能
5. **錢包操作用專用錢包** — 不要用你主錢包的私鑰

> 安全不是 AI 的問題，是你怎麼用的問題。裝好防護、從可信來源選 Skill、敏感操作多確認，就不用怕。

### English

**Giving AI permissions requires care, but the risk is manageable.**

**Where the risk is:**
- Skills can access your data and network — a bad Skill is like a rogue app
- 13.4% of Skills on ClawHub have security issues
- If AI controls a wallet, private key security is critical

**How to protect yourself:**

1. **Install AgentGuard** (by GoPlus) — environment audits + malicious Skill blocking + runtime monitoring
2. **Install SlowMist Security** — poisoning detection, phishing checks, backdoor scanning
3. **Pick Skills from HunterKit** — every Skill has a security rating, safer than raw ClawHub
4. **When in doubt, don't install** — better to miss a feature
5. **Use a dedicated wallet for AI operations** — never your main wallet's private key

> Security isn't an AI problem, it's a usage problem. Set up defenses, choose Skills from trusted sources, double-check sensitive operations, and you'll be fine.

---

## Q10：中文支援如何？

### 繁體中文

**比你預期的好。**

- **中文 Prompt 完全沒問題** — Claude、GPT、DeepSeek 都能理解繁中和簡中
- **HunterKit 是繁體中文優先** — 所有教學、Skill 說明、FAQ 都有中文版
- **中文 Skill 生態正在長** — 飛書 CLI（19 個 Skill）、微信公眾號 Skill、xianyu110 中文教程等
- **DeepSeek 中文特別強** — 如果你主要用中文互動，它是性價比最高的選擇

**目前的限制：**
- 大部分 Skill 的官方文檔是英文，但 AI 可以即時翻譯
- 有些 Skill 的指令只接受英文輸入

> 中文市場是藍海。全球最成功的 Claude Code 教學是西班牙語的（4,425 愛心），中文市場更大卻還沒有同品質的教學 — 這就是 HunterKit 在做的事。

### English

**Better than you'd expect.**

- **Chinese prompts work perfectly** — Claude, GPT, and DeepSeek all understand Traditional and Simplified Chinese
- **HunterKit is Traditional Chinese-first** — all tutorials, Skill descriptions, and FAQs have Chinese versions
- **Chinese Skill ecosystem is growing** — Feishu/Lark CLI (19 Skills), WeChat Skill, xianyu110 Chinese tutorials, etc.
- **DeepSeek excels at Chinese** — if you primarily interact in Chinese, it's the best value pick

**Current limitations:**
- Most Skill docs are in English, but AI can translate on the fly
- Some Skills only accept English commands

> The Chinese market is wide open. The most successful Claude Code tutorial globally is in Spanish (4,425 likes). The Chinese market is even bigger but lacks equivalent quality content — that's exactly what HunterKit is building.
