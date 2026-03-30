# 新手 SOP 教學文案（雙語版）

> 這是 HunterKit 的核心差異化內容 — hengclaw 沒有的步驟式引導。
> 每個段落都有繁體中文 + English 版本。

---

# Day 1：安裝 + 連 Telegram

---

## 繁體中文

### 你的 AI 助手，5 分鐘上線

不需要懂程式、不需要看文檔看到眼花。跟著這 5 步走，今天就能讓 AI 幫你幹活。

---

### 步驟 1：安裝 Node.js

Claude Code 跑在 Node.js 上面。你不需要知道它是什麼，只要裝好就行。

**macOS：**
```bash
# 用 Homebrew（推薦）
brew install node

# 或用 nvm（可以管理多版本）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
```

**Windows：**
```powershell
# 用 winget 一行搞定
winget install OpenJS.NodeJS.LTS

# 或從官網下載：https://nodejs.org
```

**Linux：**
```bash
# 用 nvm（推薦）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22

# 或用 apt（Ubuntu/Debian）
sudo apt update && sudo apt install -y nodejs npm
```

裝完跑一下確認：

```bash
node -v    # 應該顯示 v22.x.x
npm -v     # 應該顯示 10.x.x
```

> **常見問題 #1：`node -v` 顯示版本太舊（v16、v18）**
> 用 nvm 裝最新版：`nvm install 22 && nvm use 22`。apt 預設版本通常太舊。

> **常見問題 #2：Windows 裝完後 `node` 指令找不到**
> 關掉終端機重新開。安裝完必須重啟終端讓 PATH 生效。

> **常見問題 #3：macOS 沒有 Homebrew**
> 先裝 Homebrew：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

---

### 步驟 2：安裝 Claude Code

三種方式，選一個就好。新手直接用一鍵安裝。

**一鍵安裝（推薦）：**

macOS / Linux：
```bash
curl -fsSL https://raw.githubusercontent.com/anthropics/claude-code/main/install.sh | bash
```

Windows（PowerShell）：
```powershell
irm https://raw.githubusercontent.com/anthropics/claude-code/main/install.ps1 | iex
```

**npm 安裝：**
```bash
npm install -g @anthropic-ai/claude-code
```

**Docker：**
```bash
docker pull anthropic/claude-code
docker run -it anthropic/claude-code
```

> **常見問題 #1：npm 安裝時出現 EACCES 權限錯誤**
> 不要用 `sudo npm install`。改用 nvm 安裝 Node.js 就能避免權限問題。

> **常見問題 #2：npm 安裝卡住不動**
> 換鏡像源：`npm config set registry https://registry.npmmirror.com`，然後重試。

> **常見問題 #3：Windows PowerShell 攔截腳本執行**
> 用系統管理員開 PowerShell，跑：`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

### 步驟 3：設定 API Key

Claude Code 需要一把 API Key 才能跟 AI 溝通。去你選的 AI 提供商那邊拿一把。

**推薦新手從這裡開始：**
- **Anthropic Claude** → [console.anthropic.com](https://console.anthropic.com)（註冊送 $5 免費額度）
- **DeepSeek** → [platform.deepseek.com](https://platform.deepseek.com)（超便宜，中文強）
- **Google Gemini** → 有免費額度，適合先試水

拿到 Key 後設定環境變數：

**macOS / Linux：**
```bash
# 以 Anthropic 為例
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.zshrc
source ~/.zshrc
```

**Windows（PowerShell）：**
```powershell
# 永久設定
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-xxxxx', 'User')
# 設定後重開終端機
```

> 把 `sk-ant-xxxxx` 換成你自己的 Key。不同提供商用不同的環境變數名：`OPENAI_API_KEY`、`DEEPSEEK_API_KEY` 等。

---

### 步驟 4：啟動 Claude Code

```bash
# 進到任意專案目錄（或隨便建一個）
mkdir my-first-project && cd my-first-project

# 啟動！
claude
```

Claude 會自動掃描目錄，然後你就可以直接打字跟它對話了。

試試看：
```
你：你好，自我介紹一下
你：幫我建一個 index.html，內容是 Hello World
你：查一下現在幾點
```

> **小訣竅：** 第一次啟動時，Claude 會生成一份 `CLAUDE.md`。這是它認識你專案的「說明書」。有了它，Claude 的回答會更精準。

---

### 步驟 5：連接 Telegram（選配但強烈推薦）

讓你不用開電腦也能跟 AI 對話。設定完之後，在手機上打開 Telegram 就能直接問問題、收通知。

**設定步驟：**

1. 在 Telegram 搜尋 `@BotFather`，發送 `/newbot`
2. 照指示取一個名字，拿到 Bot Token
3. 設定環境變數：

```bash
# macOS / Linux
echo 'export TELEGRAM_BOT_TOKEN="你的-bot-token"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell
[System.Environment]::SetEnvironmentVariable('TELEGRAM_BOT_TOKEN', '你的-bot-token', 'User')
```

4. 重啟 Claude Code，跟你的 Bot 說「你好」

> Telegram 連上之後，後面設的 Cron（定時任務）就能把通知推到你手機。這才是真正的 AI 助手。

---

### Day 1 完成！

到這裡你已經有一個能對話的 AI 助手了。明天我們來給它裝「技能」，讓它真正有用。

---

## English

### Your AI Assistant, Live in 5 Minutes

No coding background needed. No docs to read. Follow these 5 steps and you'll have an AI working for you today.

---

### Step 1: Install Node.js

Claude Code runs on Node.js. You don't need to know what it is — just install it.

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or using nvm (manage multiple versions)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
```

**Windows:**
```powershell
# One-liner with winget
winget install OpenJS.NodeJS.LTS

# Or download from https://nodejs.org
```

**Linux:**
```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22

# Or using apt (Ubuntu/Debian)
sudo apt update && sudo apt install -y nodejs npm
```

Verify installation:

```bash
node -v    # Should show v22.x.x
npm -v     # Should show 10.x.x
```

> **Trouble #1: `node -v` shows an old version (v16, v18)**
> Install the latest with nvm: `nvm install 22 && nvm use 22`. System package managers often ship outdated versions.

> **Trouble #2: Windows can't find `node` after install**
> Close and reopen your terminal. The PATH needs a restart to take effect.

> **Trouble #3: macOS doesn't have Homebrew**
> Install it first: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

---

### Step 2: Install Claude Code

Three options. Pick one. Beginners: go with the one-click install.

**One-Click (recommended):**

macOS / Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/anthropics/claude-code/main/install.sh | bash
```

Windows (PowerShell):
```powershell
irm https://raw.githubusercontent.com/anthropics/claude-code/main/install.ps1 | iex
```

**npm:**
```bash
npm install -g @anthropic-ai/claude-code
```

**Docker:**
```bash
docker pull anthropic/claude-code
docker run -it anthropic/claude-code
```

> **Trouble #1: EACCES permission error during npm install**
> Don't use `sudo npm install`. Switch to nvm for Node.js to avoid permission issues entirely.

> **Trouble #2: npm install hangs**
> Switch registry: `npm config set registry https://registry.npmmirror.com`, then retry.

> **Trouble #3: Windows PowerShell blocks script execution**
> Open PowerShell as Admin, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

### Step 3: Set Up Your API Key

Claude Code needs an API Key to talk to the AI. Grab one from your preferred provider.

**Recommended starting points:**
- **Anthropic Claude** → [console.anthropic.com](https://console.anthropic.com) ($5 free credits on signup)
- **DeepSeek** → [platform.deepseek.com](https://platform.deepseek.com) (dirt cheap, great for Chinese)
- **Google Gemini** → Free tier available, good for testing

Once you have your key:

**macOS / Linux:**
```bash
# Example for Anthropic
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.zshrc
source ~/.zshrc
```

**Windows (PowerShell):**
```powershell
# Permanent setting
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-xxxxx', 'User')
# Restart terminal after this
```

> Replace `sk-ant-xxxxx` with your actual key. Different providers use different env var names: `OPENAI_API_KEY`, `DEEPSEEK_API_KEY`, etc.

---

### Step 4: Launch Claude Code

```bash
# Navigate to any project folder (or create one)
mkdir my-first-project && cd my-first-project

# Launch!
claude
```

Claude auto-scans the directory, then you can start chatting right away.

Try it:
```
You: Hey, introduce yourself
You: Create an index.html with Hello World
You: What time is it?
```

> **Pro tip:** On first launch, Claude generates a `CLAUDE.md` file. Think of it as a "project briefing" — it helps Claude give much better answers about your code.

---

### Step 5: Connect Telegram (Optional but Highly Recommended)

Talk to your AI without opening a computer. Once set up, you can ask questions and receive notifications right from your phone.

**Setup:**

1. Search `@BotFather` on Telegram, send `/newbot`
2. Follow the prompts, get your Bot Token
3. Set the environment variable:

```bash
# macOS / Linux
echo 'export TELEGRAM_BOT_TOKEN="your-bot-token"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell
[System.Environment]::SetEnvironmentVariable('TELEGRAM_BOT_TOKEN', 'your-bot-token', 'User')
```

4. Restart Claude Code, then say "hello" to your bot

> With Telegram connected, any Cron jobs you set up later can push notifications to your phone. That's when it becomes a *real* assistant.

---

### Day 1 Complete!

You now have a conversational AI assistant. Tomorrow we'll install "Skills" to make it actually useful.

---

---

# Day 2：裝 3 個必備 Skill

---

## 繁體中文

### 光有 AI 不夠，它需要技能

Claude Code 本身很聰明，但它看不到外面的世界。裝上 Skill 之後，它就能查價格、掃安全、讀新聞 — 從「會聊天的機器人」變成「真正能幹活的助手」。

今天裝 3 個，明天你就會想裝 30 個。

---

### Skill #1：GoPlus AgentGuard — 先保護自己

**為什麼第一個裝這個？** 因為 ClawHub 上有 **13.4% 的 Skill 存在安全問題**。在你裝其他東西之前，先裝好防護。

```bash
clawhub install agentguard
```

裝完試試：
```
你：掃描我已安裝的所有 Skills 有沒有安全問題
你：檢查一下我的環境有沒有潛在隱患
```

AgentGuard 會做三件事：
1. **環境安全巡檢** — 檢查你的系統有沒有問題
2. **惡意 Skill 掃描** — 在你裝新 Skill 前幫你攔截有問題的
3. **動態監控** — 毫秒級攔截危險操作

> 這不是「可能用到」的工具，是「一定要有」的工具。就像手機要有密碼鎖。

---

### Skill #2：find-skills — 技能搜尋器

**安裝量 418.6K**，最多人裝的 Skill 之一。當你不知道要用什麼 Skill，直接問它。

```bash
npx skills add find-skills
```

裝完試試：
```
你：我想查 BTC 的價格，有什麼 Skill 可以用？
你：幫我找一個做影片的 Skill
你：有沒有可以幫我寫前端的 Skill？
```

> 不用記住幾百個 Skill 的名字。描述你要什麼功能，find-skills 幫你找。

---

### Skill #3：選一個你需要的

根據你的需求，從下面三個挑一個：

| Skill | 適合誰 | 安裝指令 |
|-------|--------|---------|
| **CoinAnk API** | 交易者 — K 線、ETF 資金流、巨鯨追蹤、爆倉數據（18 類數據） | `npx skills add https://github.com/coinank/coinank-openapi-skill` |
| **律動 BlockBeats** | 想追新聞的人 — 深度研報、1500+ 信源、巨鯨追蹤 | `npx skills add https://github.com/BlockBeatsOfficial/blockbeats-skill` |
| **Binance Skills Hub** | 幣安用戶 — 現貨行情、Meme 熱點、交易信號、安全審計（7 合 1） | `npx skills add https://github.com/binance/binance-skills-hub` |

> **怎麼選？** 如果你是交易者，裝 CoinAnk；如果你想看新聞，裝律動；如果你用幣安，裝 Binance。不確定就裝 Binance，功能最全。

---

### 怎麼找更多 Skill

三個管道：

1. **HunterKit Skills 目錄** — 到 [hunterkit.xyz/skills](/skills) 看 152+ 精選 Skill，每個都有使用範例和安全評級
2. **find-skills** — 剛剛裝的，直接問它
3. **ClawHub** — [clawhub.ai](https://clawhub.ai) 是最大的 Skill 市場，但記得用 AgentGuard 掃一下再裝

---

### 怎麼驗證 Skill 安全

裝任何新 Skill 之前，養成這個習慣：

```
你：用 AgentGuard 掃描一下這個 Skill：https://github.com/xxx/skill
```

如果你想更嚴謹，還可以用 **SlowMist 慢霧安全**：

```bash
clawhub install slowmist-agent-security
```

```
你：檢測這個 GitHub 倉庫的 Skill 有沒有投毒風險
你：驗證這個錢包地址是否安全
```

> **安全底線：** 不確定就不裝。寧可少一個功能，不要多一個風險。

---

### Day 2 完成！

你的 AI 現在有了防護（AgentGuard）、搜尋能力（find-skills）和一個實用技能。明天我們讓它學會自動幹活。

---

## English

### An AI Without Skills is Just a Chatbot

Claude Code is smart, but it can't see the outside world. Install Skills and it can check prices, scan for threats, read news — it goes from "chatbot" to "actual assistant."

Install 3 today. Tomorrow you'll want 30.

---

### Skill #1: GoPlus AgentGuard — Protect Yourself First

**Why install this first?** Because **13.4% of Skills on ClawHub have security issues**. Before you install anything else, get your defenses up.

```bash
clawhub install agentguard
```

Try it:
```
You: Scan all my installed Skills for security issues
You: Check my environment for potential risks
```

AgentGuard does three things:
1. **Environment audit** — checks your system for vulnerabilities
2. **Malicious Skill scanning** — blocks risky Skills before installation
3. **Runtime monitoring** — intercepts dangerous operations in milliseconds

> This isn't a "nice-to-have." It's a "must-have." Like putting a lock on your phone.

---

### Skill #2: find-skills — The Skill Finder

**418.6K installs** — one of the most popular Skills. When you don't know what Skill to use, just ask it.

```bash
npx skills add find-skills
```

Try it:
```
You: I want to check BTC price, what Skill can I use?
You: Find me a Skill for making videos
You: Is there a Skill that helps with frontend development?
```

> No need to memorize hundreds of Skill names. Describe what you need, find-skills finds it.

---

### Skill #3: Pick One You Need

Choose based on your use case:

| Skill | Best For | Install Command |
|-------|----------|----------------|
| **CoinAnk API** | Traders — K-lines, ETF flows, whale tracking, liquidation data (18 data categories) | `npx skills add https://github.com/coinank/coinank-openapi-skill` |
| **BlockBeats** | News junkies — research reports, 1500+ sources, whale tracking | `npx skills add https://github.com/BlockBeatsOfficial/blockbeats-skill` |
| **Binance Skills Hub** | Binance users — spot data, meme trends, trading signals, security audit (7-in-1) | `npx skills add https://github.com/binance/binance-skills-hub` |

> **How to choose?** Trader → CoinAnk. News → BlockBeats. Binance user → Binance. Not sure → go with Binance, it's the most versatile.

---

### Finding More Skills

Three channels:

1. **HunterKit Skills Directory** — [hunterkit.xyz/skills](/skills) has 152+ curated Skills with usage examples and security ratings
2. **find-skills** — the one you just installed, just ask it
3. **ClawHub** — [clawhub.ai](https://clawhub.ai) is the largest Skill marketplace, but always scan with AgentGuard before installing

---

### Verifying Skill Security

Before installing any new Skill, make this a habit:

```
You: Use AgentGuard to scan this Skill: https://github.com/xxx/skill
```

For extra rigor, add **SlowMist Security**:

```bash
clawhub install slowmist-agent-security
```

```
You: Check this GitHub repo for Skill poisoning risks
You: Verify if this wallet address is safe
```

> **Security rule:** If you're not sure, don't install it. Better to miss a feature than gain a vulnerability.

---

### Day 2 Complete!

Your AI now has protection (AgentGuard), search ability (find-skills), and a practical skill. Tomorrow we teach it to work on autopilot.

---

---

# Day 3：設定第一個 Cron

---

## 繁體中文

### 讓 AI 主動幫你做事

到目前為止，你的 AI 都是「你問它才答」。今天教你設一個 **Cron**，讓它自己知道什麼時候該做什麼事。

**Cron 是什麼？** 用白話說：**定時鬧鐘 + 自動執行**。

你設定：「每天早上 9 點查 BTC 價格，推送到我的 Telegram。」
AI 就每天 9 點自己去查、自己發訊息給你。你什麼都不用做。

> 沒有 Cron = AI 只能等你主動問。有了 Cron = AI 會主動幫你做事。

---

### 範例：每天早上 9 點查 BTC 價格

**前置條件：** 已完成 Day 1 的 Telegram 設定 + 裝了 CoinAnk 或 Binance Skill

在 Claude Code 裡直接說：

```
你：幫我設定一個 Cron，每天早上 9 點查 BTC 價格，然後推送到 Telegram
```

Claude 會幫你生成類似這樣的設定：

```bash
# cron 表達式：每天早上 9 點（UTC+8）
0 1 * * *
```

> **看不懂那串數字？不用懂。** 直接用自然語言告訴 Claude「每天早上 9 點」，它會自動幫你轉換。

---

### 更多 Cron 點子

別只查價格。Cron 能做的事比你想的多：

| 設定 | 實際效果 |
|------|---------|
| 每天早上 9 點查 BTC 價格 | 起床就看到市場狀況 |
| 每 2 小時監控 ETH 資金費率 | 超過 0.05% 自動通知 |
| 每天下午 6 點生成新聞摘要 | 下班前看完今天重點 |
| 每週一早上生成投資組合報告 | 週報自動化 |
| 每天檢查巨鯨大額轉帳 | 第一時間知道聰明錢在做什麼 |

設定方式都一樣，直接跟 Claude 說你要什麼：

```
你：每 2 小時檢查一次 BTC 價格，跌超過 5% 通知我
你：每天下午 6 點幫我整理今天的加密新聞摘要
你：每週一生成一份我的持倉報告
```

---

### 搭配 Telegram 推送

Cron 跑完之後，結果要能送到你手上才有用。最方便的方式就是 Telegram。

如果你 Day 1 已經設好 Telegram Bot，Cron 的結果會自動推送。如果還沒設：

1. 回到 Day 1 步驟 5 設定 Telegram Bot
2. 設定完後，跟 Claude 說：

```
你：幫我測試一下 Telegram 推送，發一則「Hello from AI」
```

收到訊息就代表設定成功。之後所有 Cron 結果都會推到這裡。

---

### Day 3 完成！

你的 AI 現在會自己幹活了。它每天幫你查價格、看新聞、追巨鯨，然後把結果推到你手機。這才是 AI 助手該有的樣子。

---

## English

### Make Your AI Proactive

So far, your AI only responds when you ask. Today you'll set up a **Cron** — it'll know when to do what, all by itself.

**What's a Cron?** In plain English: **scheduled alarm + auto-execution.**

You set: "Check BTC price every day at 9 AM and push to my Telegram."
The AI checks and sends you a message every day at 9 AM. You do nothing.

> Without Cron = AI waits for you to ask. With Cron = AI works for you proactively.

---

### Example: Check BTC Price Every Morning at 9 AM

**Prerequisites:** Telegram set up from Day 1 + CoinAnk or Binance Skill installed

Just tell Claude Code:

```
You: Set up a Cron that checks BTC price every day at 9 AM and pushes it to Telegram
```

Claude will generate something like this:

```bash
# cron expression: every day at 9 AM (UTC+8)
0 1 * * *
```

> **Can't read that string of numbers? You don't need to.** Just tell Claude "every day at 9 AM" in natural language and it converts it for you.

---

### More Cron Ideas

Don't just check prices. Cron can do more than you think:

| Schedule | What It Does |
|----------|-------------|
| BTC price every day at 9 AM | Wake up to market conditions |
| ETH funding rate every 2 hours | Auto-alert when it exceeds 0.05% |
| News digest every day at 6 PM | Catch up on the day's highlights before clocking out |
| Portfolio report every Monday morning | Weekly reports on autopilot |
| Whale large transfers daily | Know what smart money is doing, first |

Setup is always the same — just tell Claude what you want:

```
You: Check BTC price every 2 hours, notify me if it drops more than 5%
You: Summarize today's crypto news every day at 6 PM
You: Generate a portfolio report every Monday
```

---

### Pairing with Telegram Notifications

Cron results are only useful if they reach you. The easiest way is Telegram.

If you set up a Telegram Bot in Day 1, Cron results auto-push. If you haven't:

1. Go back to Day 1 Step 5 to set up the Telegram Bot
2. Then tell Claude:

```
You: Test Telegram push — send me a "Hello from AI" message
```

If you get the message, you're good. All future Cron results will land here.

---

### Day 3 Complete!

Your AI now works on its own. It checks prices, reads news, tracks whales, and pushes results to your phone. That's what an AI assistant is supposed to look like.

---

---

# Week 2：進階配置

---

## 繁體中文

### 從「能用」到「好用」

前三天你已經有了一個能對話、有技能、會自動幹活的 AI 助手。這週我們把它調教得更聰明、更省錢、更強大。

---

### 1. 自訂 SOUL.md / AGENTS.md — 讓 AI 有個性

`SOUL.md` 是 AI 的「人設」。沒有它，AI 就是個通用助手；有了它，AI 會按照你的偏好、風格、需求來回應。

在你的專案目錄下建一個 `SOUL.md`：

```markdown
# 我的 AI 助手設定

## 角色
你是我的加密貨幣研究助手。

## 風格
- 回答用繁體中文，技術術語保留英文
- 直接講重點，不要廢話
- 給建議時要附上理由
- 有風險的操作要主動提醒我

## 關注重點
- BTC、ETH、SOL 為主要觀察標的
- 關注巨鯨動態和 ETF 資金流
- DeFi 收益策略
```

`AGENTS.md` 是團隊設定 — 如果你需要 AI 扮演不同角色（研究員、交易員、文案師），可以在這裡定義。

> **重點：** SOUL.md 不是寫一次就不動的。用一陣子後回來調整，AI 會越來越懂你。

---

### 2. 多模型切換 — 省錢策略

不是每個任務都需要最貴的模型。聰明的做法是：**重要的用好模型，簡單的用便宜模型。**

| 模型 | 輸入 $/M tokens | 輸出 $/M tokens | 適合場景 |
|------|----------------|----------------|---------|
| Claude Opus 4.6 | $15.00 | $75.00 | 複雜推理、寫程式 |
| Claude Sonnet | $3.00 | $15.00 | **日常首選** — 性價比之王 |
| Claude Haiku | $0.25 | $1.25 | 批量任務、簡單問答 |
| GPT-5.4 Nano | $0.20 | $1.25 | 超省錢方案 |
| DeepSeek | ~$0.14 | ~$0.28 | 最便宜、中文場景強 |
| Gemini 3 | 免費額度 | — | 新手試水 |

**實際月成本估算：**

| 使用程度 | 日均 Token | Sonnet 月費 | Haiku 月費 |
|---------|-----------|-----------|-----------|
| 輕度（每天聊幾句） | ~10K | ~$0.5 | ~$0.05 |
| 中度（每天工作用） | ~100K | ~$5 | ~$0.5 |
| 重度（全天開發） | ~500K | ~$25 | ~$2.5 |

再加上 VPS 費用 $5-15/月（如果你要 24 小時跑 Cron 的話）。

> **省錢秘訣：** 日常用 Sonnet，Cron 任務用 Haiku，只有需要深度分析的時候才切 Opus。這樣一個月可能只花 $5-10。

---

### 3. MCP 是什麼 — 白話版

**MCP = Model Context Protocol**，但這個名字不重要。重要的是它做了什麼：

**想像一下：** AI 就像一個超級聰明的人，被關在一個沒有窗戶的房間裡。它什麼都能想、什麼都能算，但看不到外面的世界。

**MCP 就是給它開的窗戶。** 每扇窗戶看到不同的東西：
- 一扇看到幣安的行情
- 一扇看到鏈上的數據
- 一扇看到你的 Telegram
- 一扇看到 GitHub 上的代碼

**Skill 就是用 MCP 做的。** 當你安裝一個 Skill，其實就是幫 AI 開了一扇新的窗戶。所以：
- 更多 Skill = AI 看到更多東西 = AI 能做更多事
- 不裝 Skill = AI 只能用自己腦子裡的知識

> 你不需要了解 MCP 的技術細節。只要知道：**Skill 就是 AI 連接外部世界的橋樑。** 想讓 AI 做什麼，找對應的 Skill 裝就好。

---

### 4. 寫自己的第一個 Skill

聽起來很嚇人？其實不需要寫程式。你可以讓 Claude 幫你寫。

**範例：做一個「每日幣圈 Vibe Check」Skill**

```
你：幫我寫一個 Skill，功能是：
1. 查 BTC 和 ETH 的價格
2. 查今天的恐懼貪婪指數
3. 查巨鯨最近的大額操作
4. 整理成一份簡報，推送到 Telegram

Skill 名稱叫 daily-vibe-check
```

Claude 會幫你生成 Skill 的代碼和設定檔。你只需要：

1. 確認生成的代碼沒問題
2. 用 AgentGuard 掃一下自己的 Skill（好習慣）
3. 設定一個 Cron 讓它每天自動跑

> **這就是 Claude Code 最強的地方：** 你描述需求，它幫你實現。不會寫程式沒關係，你會說話就行。

---

### Week 2 完成！

現在你有了一個有個性、會省錢、理解 MCP、還能自己寫 Skill 的 AI 助手。你已經超越 90% 的用戶了。

---

## English

### From "It Works" to "It Works Great"

In the first three days you built an AI that can chat, has skills, and runs tasks automatically. This week we make it smarter, cheaper, and more powerful.

---

### 1. Customize SOUL.md / AGENTS.md — Give Your AI a Personality

`SOUL.md` is your AI's "character sheet." Without it, it's a generic assistant. With it, it responds according to your preferences, style, and needs.

Create a `SOUL.md` in your project directory:

```markdown
# My AI Assistant Config

## Role
You are my crypto research assistant.

## Style
- Be direct, skip the fluff
- Always give reasoning with recommendations
- Proactively warn me about risky operations
- Use data to back up claims

## Focus Areas
- Primary watchlist: BTC, ETH, SOL
- Track whale movements and ETF flows
- DeFi yield strategies
```

`AGENTS.md` is for team setups — if you need your AI to play different roles (researcher, trader, copywriter), define them here.

> **Key insight:** SOUL.md isn't write-once-forget-forever. Come back and tweak it as you learn what works. Your AI will get better at understanding you over time.

---

### 2. Multi-Model Switching — Save Money

Not every task needs the most expensive model. The smart approach: **use good models for hard stuff, cheap models for easy stuff.**

| Model | Input $/M tokens | Output $/M tokens | Best For |
|-------|-----------------|-------------------|---------|
| Claude Opus 4.6 | $15.00 | $75.00 | Complex reasoning, coding |
| Claude Sonnet | $3.00 | $15.00 | **Daily driver** — best bang for buck |
| Claude Haiku | $0.25 | $1.25 | Batch tasks, simple Q&A |
| GPT-5.4 Nano | $0.20 | $1.25 | Ultra-budget option |
| DeepSeek | ~$0.14 | ~$0.28 | Cheapest, strong in Chinese |
| Gemini 3 | Free tier | — | Testing the waters |

**Estimated monthly costs:**

| Usage Level | Daily Tokens | Sonnet/mo | Haiku/mo |
|------------|-------------|-----------|----------|
| Light (casual chats) | ~10K | ~$0.5 | ~$0.05 |
| Medium (daily work) | ~100K | ~$5 | ~$0.5 |
| Heavy (all-day dev) | ~500K | ~$25 | ~$2.5 |

Add $5-15/month for a VPS if you want Cron running 24/7.

> **Money-saving tip:** Use Sonnet for daily work, Haiku for Cron tasks, and only switch to Opus for deep analysis. That could be just $5-10/month.

---

### 3. What is MCP — The Plain English Version

**MCP = Model Context Protocol**, but the name doesn't matter. What matters is what it does:

**Imagine this:** AI is like a super-intelligent person locked in a windowless room. It can think about anything, calculate anything, but can't see the outside world.

**MCP opens windows.** Each window shows something different:
- One shows Binance market data
- One shows on-chain data
- One connects to your Telegram
- One accesses GitHub repos

**Skills are built on MCP.** When you install a Skill, you're opening a new window for your AI. So:
- More Skills = AI sees more = AI does more
- No Skills = AI only uses what's in its own head

> You don't need to understand MCP's technical details. Just know this: **Skills are bridges connecting AI to the outside world.** Want your AI to do something? Find the right Skill and install it.

---

### 4. Write Your First Skill

Sounds intimidating? It shouldn't. You don't need to code — let Claude do it for you.

**Example: Build a "Daily Crypto Vibe Check" Skill**

```
You: Help me write a Skill that:
1. Checks BTC and ETH prices
2. Gets today's Fear & Greed Index
3. Checks recent whale large transfers
4. Compiles everything into a brief and pushes to Telegram

Name it daily-vibe-check
```

Claude generates the Skill code and config. You just need to:

1. Review the generated code
2. Scan your own Skill with AgentGuard (good habit)
3. Set up a Cron to run it daily

> **This is Claude Code's superpower:** you describe what you want, it builds it. Can't code? Doesn't matter. If you can describe it, you can build it.

---

### Week 2 Complete!

You now have an AI with personality, cost optimization, MCP understanding, and the ability to build custom Skills. You've surpassed 90% of users.
