# HunterKit 網站升級施工提示詞 — V2

> 給 Claude Code 團隊（Claw-PM / Claw-Content / Claw-Frontend）
> 最後更新：2026-03-30

---

## 目標

基於現有 HunterKit 網站，用 `content/素材庫.md` 的內容升級所有頁面。
**不是從零建站，是更新既有架構。**

參考網站：https://hengclaw.ai/ （我們 80% 相似但更完整）

---

## 現有架構（必讀，別覆蓋掉）

### 技術棧
- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- next-intl 雙語（繁中 / English）
- 部署：Vercel
- 專案路徑：`C:/Users/User/Desktop/51claw`

### 已有頁面路由
```
src/app/[locale]/
├── page.tsx              # 首頁
├── about/page.tsx        # 關於
├── blog/page.tsx         # Blog 列表
│   └── [slug]/page.tsx   # Blog 文章
├── bundles/page.tsx      # Skill 套裝推薦
├── install/page.tsx      # 安裝指南
├── llms/page.tsx         # LLM 模型列表
│   └── [slug]/page.tsx   # LLM 詳情
├── models/page.tsx       # 模型排行
└── skills/page.tsx       # Skills 目錄
    └── [id]/page.tsx     # Skill 詳情頁
```

### 已有資料檔（src/data/）
| 檔案 | 說明 | 現狀 |
|------|------|------|
| `skills.json` | 152 個 Skill，完整 schema | 部分缺 installCmd、features、使用範例 |
| `skills-updated.json` | 舊版備份 | 大部分欄位為 null |
| `categories.json` | 14 個分類 | 已定義，count 需更新 |
| `skill-audit.json` | 安全審查結果 | verdict: pass/warn/reject |
| `llms.json` | 模型列表 + 定價 | 需要更新價格和新增模型 |
| `install-guide.json` | 安裝教學（macOS/Win/Linux） | 已有完整步驟 |
| `bundles.json` | 套裝推薦（starter/analytics/security） | 已有 |
| `blog-posts.json` | Blog 文章 | 已有 2 篇 |

### Skill 資料 Schema（每個欄位都要填）
```json
{
  "id": "binance",
  "name": "Binance Skills Hub",
  "nameZh": "Binance Skills Hub",
  "description": "English description",
  "descriptionZh": "中文說明",
  "category": "cex",
  "tags": ["trading", "security"],
  "tagsZh": ["交易", "安全"],
  "icon": "🔶",
  "url": "https://github.com/binance/binance-skills-hub",
  "isFree": true,
  "installCmd": "npx skills add https://github.com/binance/binance-skills-hub",
  "installCount": null,
  "source": "官方",
  "isOfficial": true,
  "verdict": "pass",
  "warning": null,
  "features": [
    {
      "name": "現貨行情",
      "nameEn": "Spot Market Data",
      "desc": "即時查詢 Binance 現貨行情和交易對",
      "descEn": "Real-time Binance spot market data and trading pairs"
    }
  ],
  "installNote": "需要幣安帳號與 API Key。",
  "examples": [
    "查詢 BTC 排名和最新價格",
    "檢查地址 0x1234... 的風險",
    "有哪些新 Meme 代幣在 Binance 上熱度飆升？",
    "給我 SOL 的交易信號分析",
    "審計一下這個合約是否安全"
  ],
  "examplesEn": [
    "Check BTC ranking and latest price",
    "Check risk for address 0x1234...",
    "Any new meme tokens trending on Binance?",
    "Give me trading signal analysis for SOL",
    "Audit this contract for safety"
  ],
  "suitableFor": "幣安用戶、想快速查行情和代幣安全的人",
  "suitableForEn": "Binance users who want quick market data and token safety checks",
  "isEssential": false,
  "stars": null,
  "lastUpdated": null
}
```

**新增欄位（素材庫有但現有 schema 缺的）：**
- `examples` / `examplesEn` — 5-6 個使用範例（對話格式）
- `suitableFor` / `suitableForEn` — 適合誰
- `isEssential` — 新手必裝標記（素材庫中有 ⭐ 的）
- `stars` — GitHub Stars 數
- `lastUpdated` — GitHub 最後更新時間

### 現有 14 個分類（categories.json）
| ID | 名稱 | icon |
|----|------|------|
| cex | CEX 官方 | 🏦 |
| news | 信息流 | 📡 |
| onchain | 鏈上工具 | ⛓️ |
| analytics | 數據分析 | 📊 |
| security | 安全 | 🛡️ |
| trading | 交易 & 金融 | 💹 |
| frontend | 前端 & UI | 🎨 |
| devtools | 開發工具 | 🔧 |
| multiagent | 多 Agent | 🤖 |
| cloud | 雲端 & DevOps | ☁️ |
| data | 數據 & AI | 🧬 |
| media | 媒體生成 | 🎬 |
| marketing | 行銷 & SEO | 📢 |
| productivity | 生產力 | 💼 |

**可擴充的新分類（如果素材庫有新 Skill 放不進現有分類）：**
- `prediction` — 預測市場（Polymarket / Kalshi）
- `social` — 社群工具（X/Telegram/微信/飛書）
- `defi` — DeFi 專用（從 onchain 拆出）

新增分類前先確認：該分類至少要有 3 個 Skill，否則併入現有分類。

### 已有元件（src/components/）
```
layout/Nav.tsx, Footer.tsx
ui/Accordion.tsx, Breadcrumb.tsx, Button.tsx, Card.tsx,
   CodeBlock.tsx, MarkdownRenderer.tsx, Tabs.tsx
JsonLd.tsx
```

---

## 素材來源

- 主素材：`content/素材庫.md`（持續更新）
- 每日更新：`content/daily-intel/YYYY-MM-DD.md`（如果有的話）

---

## 施工任務（按優先級）

### Phase 1：資料補全（Claw-Content 負責）

#### 1A. 用 GitHub API 驗證所有 Skill 的 link + 拉最新數據

對素材庫中的每個 Skill 跑：
```bash
gh api repos/{owner}/{repo} --jq '{stars: .stargazers_count, desc: .description, updated: .updated_at, language: .language}'
```

產出一份報告：
- ✅ 有效的 link + 最新 stars
- ❌ 404 / broken 的 link（需要搜尋替代）
- ⚠️ 沒有 GitHub link 的（Lista DAO、melvynx CRON、Railway Deploy、WeWrite）

#### 1B. 更新 skills.json

對現有 152 個 Skill：
1. 用素材庫的資料**補全**缺失欄位（installCmd、features、examples 等）
2. 新增 schema 欄位（examples、suitableFor、isEssential、stars、lastUpdated）
3. 素材庫有但 skills.json 沒有的 Skill → **新增**
4. **不要刪除**現有 Skill，只新增和更新

#### 1C. 修正素材庫的已知問題
- 編號重複：#43、#44、#45 各出現兩次 → 重新編號
- 4 個 Skill 無 GitHub link → 搜尋補上或標注「暫無」
- 分類對齊：素材庫的 6 類 → 對應到現有 14 類

**素材庫分類 → 網站分類對照：**
| 素材庫分類 | 對應網站 category ID |
|-----------|-------------------|
| 🔥 Crypto/DeFi — CEX 官方 | `cex` |
| 🔥 Crypto/DeFi — 鏈上工具 | `onchain` |
| 🔥 Crypto/DeFi — 數據分析 | `analytics` |
| 📰 信息流 | `news` |
| 🛡 安全 | `security` |
| 🎨 開發/設計/影片 | `frontend` / `devtools` / `media`（按性質分） |
| 🤖 自動化/整合 | `multiagent` / `productivity`（按性質分） |
| 📊 其他/金融 | `trading` |

---

### Phase 2：Skills 頁面升級（Claw-Frontend 負責）

更新 `/skills` 和 `/skills/[id]` 頁面，呈現完整的 Skill 卡片。

#### Skill 卡片設計規範

```
┌─────────────────────────────────────────────┐
│ 🔶 Binance Skills Hub    ⭐ 新手必裝  官方  │
│                                             │
│ 7 個 Skill 合一：現貨行情、Meme 發現、      │
│ 合約審計、地址洞察、交易信號                │
│                                             │
│ 安裝：npx skills add binance-skills-hub     │ [📋 複製]
│ GitHub：github.com/binance/...              │ [🔗 連結]
│ Stars：2,847 ⭐  |  最後更新：3 天前         │
│                                             │
│ 📝 使用範例：                                │
│ • 「查詢 BTC 排名和最新價格」                │
│ • 「檢查地址 0x1234... 的風險」              │
│ • 「有哪些新 Meme 代幣熱度飆升？」           │
│ • 「給我 SOL 的交易信號分析」                │
│ • 「審計一下這個合約是否安全」               │
│                                             │
│ 👤 適合：幣安用戶、快速查行情和代幣安全      │
│                                             │
│ 🛡 安全評級：pass                            │
└─────────────────────────────────────────────┘
```

必須有的互動：
- 安裝指令一鍵複製（用現有 `CodeBlock.tsx`）
- GitHub link 可點擊
- `isEssential: true` 的顯示「⭐ 新手必裝」badge
- `verdict: warn` 的顯示黃色警告 badge
- 分類篩選（14 類 tab 或 dropdown）
- 搜尋（中英文都要能搜）

---

### Phase 3：新手 SOP 頁面（Claw-Content + Frontend）

**新增路由：`/guide` 或更新現有 `/install` 頁面**

這是跟 hengclaw 的核心差異化，必須做好。

#### Day 1：安裝 + 連 Telegram
- 現有 `install-guide.json` 已有安裝步驟 → **擴充**，不要重寫
- 加上 Telegram 連接教學
- 每步配程式碼區塊（可複製）+ 常見錯誤排除

#### Day 2：裝 3 個必備 Skill
```
1. GoPlus AgentGuard — 安全防護（保護自己）
2. find-skills — Skill 搜尋器（找到好東西）
3. 選一個你需要的（Web Browsing / CoinAnk / Telegram...）
```
- 教怎麼找 Skill（ClawHub / npx skills add / find-skills）
- 教怎麼驗證安全（AgentGuard / SlowMist 掃描）

#### Day 3：設定第一個 Cron
- Cron 是什麼（白話解釋，不要技術語言）
- 範例：「每天早上 9 點幫我查 BTC 價格」
- 進階：搭配 Telegram 推送通知

#### Week 2：進階配置
- 自訂 SOUL.md / AGENTS.md（讓 AI 有個性）
- 多模型切換（省錢策略）
- MCP 是什麼 + 怎麼用
- 寫自己的第一個 Skill

---

### Phase 4：模型庫 + 成本頁面升級（Claw-Content + Frontend）

更新 `llms.json`，用素材庫的最新定價。

#### 必須包含的模型（素材庫版本）
| 模型 | 提供商 | 輸入 $/M | 輸出 $/M | 特色 |
|------|--------|---------|---------|------|
| Claude Opus 4.6 | Anthropic | $15.00 | $75.00 | 最強推理+編程 |
| Claude Sonnet | Anthropic | $3.00 | $15.00 | 性價比之王 |
| Claude Haiku | Anthropic | $0.25 | $1.25 | 最便宜 |
| GPT-5.4 Mini | OpenAI | $0.75 | $4.50 | 推理+400K 上下文 |
| GPT-5.4 Nano | OpenAI | $0.20 | $1.25 | 超便宜 |
| Gemini 3 | Google | 免費額度 | — | 多模態 |
| MiMo-V2-Omni | Xiaomi | $0.40 | $2.00 | 推理+多模態 |
| MiniMax M2.7 | NovitaAI | $0.30 | $1.20 | 長上下文 |
| Mistral Small 4 | Mistral | $0.15 | $0.60 | 便宜+推理 |
| DeepSeek | DeepSeek | ~$0.14 | ~$0.28 | 國產最強性價比 |

#### 新增：月成本估算表
| 使用程度 | 日均 token | 月成本（Sonnet） | 月成本（Haiku） |
|---------|-----------|----------------|----------------|
| 輕度 | ~10K | ~$0.5 | ~$0.05 |
| 中度 | ~100K | ~$5 | ~$0.5 |
| 重度 | ~500K | ~$25 | ~$2.5 |
| VPS 費用 | — | $5-15/月 | 同左 |

放在 `/models` 頁面，或新增 `/pricing` 路由。

---

### Phase 5：FAQ 頁面（Claw-Content + Frontend）

用現有 `Accordion.tsx` 元件做可展開的 FAQ。
放在 `/about` 頁面底部，或新增 `/faq` 路由。

10 題（從素材庫的 FAQ 素材）：

1. **OpenClaw vs Claude Code 差在哪？**
2. **要花多少錢？**
3. **怎麼裝？**
4. **裝了然後呢？**
5. **MCP 是什麼？**
6. **Skill 怎麼挑？**
7. **能拿來幹嘛？**
8. **免費方案夠用嗎？**
9. **安全嗎？**
10. **中文支援如何？**

每題答案要雙語（存在 data json 或 i18n messages 裡）。

---

### Phase 6：推薦教學 + 合集資源（Claw-Content）

#### 推薦外部教學
新增到 Blog 或獨立頁面 `/resources`。按迴響數排序，每條包含：
- 作者 + 語言 + 迴響數
- 一句話描述
- 連結（X 搜尋或直連）

教學列表見素材庫「推薦外部教學」段落（11 條）。

#### 合集 / 教程資源（GitHub）
| 資源 | 說明 |
|------|------|
| VoltAgent Awesome Agent Skills | 1000+ skills 合集 |
| Antigravity Awesome Skills | 22K ⭐，1,234+ skills |
| travisvn Awesome Claude Skills | 精選列表 |
| alirezarezvani Claude Skills | 5.2K ⭐，192+ skills |
| xianyu110 中文教程 | 最全中文教程 |
| Vercel Agent Skills | 官方 Skills 工具 |
| Anthropic 官方 Skills | 官方技能倉庫 |

---

### Phase 7：每日更新區（選做）

如果 `content/daily-intel/` 有每日 markdown，自動拉進 `/blog` 或首頁「最新動態」區塊。

每日內容包含：
- 本日最火 Skill
- 市場熱點（金融/迷因/AI）
- GitHub Trending 相關項目

---

## 內容規範

### 品牌名稱
- 網站品牌：**HunterKit**（不是 OpenClaw、不是 Claude Code）
- 提到 OpenClaw/Claude Code 時作為第三方產品名，不是我們的品牌

### 語言
- 繁體中文為主
- 技術術語保留英文：Skill、Cron、MCP、Token、API、GitHub
- 安裝指令、代碼全部英文
- **所有文字必須雙語**（zh-TW + en），存在對應的 data 欄位或 i18n messages

### 語氣
- 對新手友善但不幼稚
- 直接講重點，不要「歡迎來到 HunterKit 的世界！」這種廢話
- 可以有個性（「這個 Skill 真的很猛」>「此 Skill 功能強大」）

### 使用範例格式
統一用對話格式，不要功能列表：
```
你：查詢 BTC 排名和最新價格
你：檢查地址 0x1234... 的風險
你：有哪些新 Meme 代幣在 Binance 上熱度飆升？
```

### 安裝指令格式
統一用可複製的代碼塊，用現有 `CodeBlock.tsx` 元件：
```
npx skills add https://github.com/binance/binance-skills-hub
```

---

## GitHub API 使用指引

團隊有 `gh` CLI 可用，以下常用操作：

```bash
# 拉 Skill 的 Stars + 描述
gh api repos/{owner}/{repo} --jq '{stars: .stargazers_count, desc: .description, updated: .updated_at}'

# 搜索相關 repo
gh api 'search/repositories?q=openclaw+skill&sort=stars&per_page=20' --jq '.items[] | {name: .full_name, stars: .stargazers_count}'

# 拉 repo 的 README
gh api repos/{owner}/{repo}/readme --jq '.content' | base64 -d

# 批量驗證 link 是否有效
gh api repos/{owner}/{repo} --jq '.stargazers_count' 2>/dev/null && echo "OK" || echo "BROKEN"
```

---

## 設計規範（參照 CLAUDE.md）

- 深色底（#0a0a0f ~ #12121a）
- 主強調色：霓虹紫（#a855f7 → #c084fc）
- 次強調色：冷青藍（#06b6d4）
- 字體：Space Grotesk / Noto Sans TC / JetBrains Mono
- 禁止：白底、Inter/Roboto/Arial、預設 transition
- 卡片 hover：微放大 + 邊框紫光 + 陰影

---

## 禁止事項

- ❌ 不要刪除現有的 152 個 Skill
- ❌ 不要改動現有的 category ID（可以新增，不要改名）
- ❌ 不要破壞雙語結構（每個文字欄位都要有 zh + en）
- ❌ 不要裝新的 npm 套件而不先說明
- ❌ 不要一次改太多檔案，每個 Phase 完成後 commit 一次

---

## Commit 規範

每個 Phase 完成後 commit：
```
feat: Phase 1 — 補全 skills.json 資料（examples、stars、installCmd）
feat: Phase 2 — 升級 Skills 頁面卡片設計
feat: Phase 3 — 新增新手 SOP 引導頁
feat: Phase 4 — 更新模型庫定價 + 成本估算表
feat: Phase 5 — 新增 FAQ 頁面
feat: Phase 6 — 新增推薦教學 + 合集資源
feat: Phase 7 — 每日更新區
```
