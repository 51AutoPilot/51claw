# 參考模板：hengclaw.ai 完整結構分析

> 這份文件是 51Claw 的設計參考。我們要做到 9 成像這個網站，但風格改為紫色高端 AI 風。
> **所有 agent 開發前必須讀這份文件。**

---

## 一、網站概述

**EnhengClaw** 是一個 OpenClaw 中文社區 / Web3 AI Agent Skills Hub。
- 技術框架：Next.js（App Router）
- 主題：深色底 + 霓虹綠/紫雙色
- 頁面數：4 頁（首頁、安裝、Skills、關於）
- Footer：Logo + 版權 + 標語

---

## 二、導航結構

頂部固定導航列：

| 項目 | 路徑 |
|------|------|
| 首頁 | `/` |
| 安裝 | `/install` |
| Skills | `/skills` |
| 關於 | `/about` |
| 「立即開始」CTA 按鈕 | 連到 /install |

子頁面有「首頁 > 當前頁」麵包屑導航。

Skills 有分類子路徑：
- `/skills/category/CEX`
- `/skills/category/信息流`
- `/skills/category/鏈上工具`
- `/skills/category/數據分析`
- `/skills/category/安全`
- `/skills/category/其他`

---

## 三、各頁面詳細結構

### 1. 首頁 `/`

**Hero 區塊**：
- 大標題：「EnhengClaw — 你的 Web3 Skills Hub」
- 副標題：「用自然語言駕馭鏈上世界」
- 兩個 CTA 按鈕：「開始探索」（實心）+「安裝 OpenClaw」（邊框）
- 背景：深色 + 網格裝飾

**精選 Skills 區塊**：
- 6 張分類卡片，可左右滑動/輪播
- 每張卡片包含：分類名稱、簡介文字、文章數量、「查看詳情」連結
- 左右箭頭導航按鈕（圓形）

**數據統計列**：
- 三個數字：27 篇教程文章 | 6 個技能分類 | 100% 完全免費
- 等寬字體顯示數字

**底部 CTA 區塊**：
- 標題：「準備好開始了嗎？」
- CTA 按鈕引導安裝

---

### 2. 安裝頁 `/install`

**系統要求區塊**：
- macOS 12+ / Windows 10+11 / Linux
- Node.js v20+、npm v9+、500MB 空間
- 用圖示 + 文字列表呈現

**6 步安裝教程**：
每步包含：步驟編號 + 標題 + 說明文字 + 代碼區塊

| 步驟 | 標題 | 內容 |
|------|------|------|
| 1 | 安裝 Node.js | 下載連結 + 驗證指令 `node -v` |
| 2 | 安裝 OpenClaw | **三種方式 Tab 切換**：一鍵安裝 / npm / Docker |
| 3 | 初始化配置 | 支持選擇 AI 提供者：Anthropic Claude、OpenAI、智譜 AI、DeepSeek |
| 4 | 初始化項目 | 可選，生成 CLAUDE.md |
| 5 | 安裝 Skills | 可選，`openclaw skill install xxx` |
| 6 | 啟動 OpenClaw | Web 控制台 / 終端 TUI 兩種方式 |

**關鍵 UI 組件**：
- 操作系統 Tab 切換（macOS / Windows / Linux）
- 安裝方式 Tab 切換（一鍵 / npm / Docker）
- 每個代碼區塊右上角有「複製」按鈕
- 步驟之間有進度指示器

**FAQ 手風琴**（底部）：
- 6 個常見問題，點擊展開/收合
- 權限問題、npm 卡住、sharp 安裝失敗、API Key、Windows 腳本攔截、端口占用

---

### 3. Skills 目錄頁 `/skills`

**頂部**：
- 標題 + 描述
- 搜尋欄

**分類篩選**：
- 6 個分類 Tab/按鈕，點擊篩選

**Skill 卡片 Grid**（3 欄 PC / 2 欄平板 / 1 欄手機）：
每張卡片包含：
- Skill 名稱（粗體）
- 一段描述文字
- 標籤（如「DeFi」「安全」「閱讀」，用小 badge 呈現）
- 「查看詳情」按鈕
- 卡片頂部有漸變光條（hover 時亮度增強）
- hover 效果：微放大 1.02 + 邊框變亮 + 陰影加深

**完整 Skills 清單（27 個）**：

#### CEX 官方（5 個）
| 名稱 | 描述 | 標籤 |
|------|------|------|
| Bitget Wallet | 多鏈資產查詢、巨鯨監測、K 線技術分析 | 交易, 數據 |
| Coinbase Agentic Wallets | 自主代理錢包基礎設施 | DeFi, 錢包 |
| Binance Skills Hub | 7 個 Skill：現貨行情、Meme 發現、合約審計 | 交易, 安全 |
| HTX Skills Hub | 火幣行情查詢、交易執行、帳戶管理 | 交易 |
| OKX OnchainOS | 多鏈資產管理、DEX 交易、跨鏈橋 | DeFi, 交易 |

#### 信息流（4 個）
| 名稱 | 描述 | 標籤 |
|------|------|------|
| 律動 BlockBeats | 深度研報 + 1500+ 信源即時新聞 | 閱讀, 資訊 |
| 6551 新聞源 | X 數據 + 50+ 實時新聞源 + Telegram 提醒 | 閱讀, 資訊 |
| CoinMarketCap | 代幣價格、市值排名、交易量查詢 | 數據 |
| XClaw | X 平台情報收集，節省 95%+ Token 消耗 | 資訊 |

#### 鏈上工具（10 個）
| 名稱 | 描述 | 標籤 |
|------|------|------|
| Almanak | DeFi 策略自動化，智能資金配置 | DeFi |
| Bankr | ENS 域名管理、錢包操作 | 工具 |
| BNB Chain MCP | BNB Chain 原生 MCP 整合 | 工具, DeFi |
| BNB Chain | BNB Chain 生態資源和工具集 | 工具 |
| Byreal CLI | 命令列 DeFi 操作工具 | DeFi, 工具 |
| Four Meme | BNB Chain Meme 代幣發現與分析 | Meme |
| Lista DAO | BNB Chain 質押與流動性協議 | DeFi |
| Minara AI v2 | AI 驅動的 CLMM 策略管理 | DeFi, AI |
| Phantom Connect | Solana 錢包連接與操作 | 錢包, Solana |
| Uniswap AI | Uniswap DEX 智能交易 | DeFi, 交易 |

#### 數據分析（3 個）
| 名稱 | 描述 | 標籤 |
|------|------|------|
| CoinAnk API | K 線圖表、ETF 數據、聰明錢追蹤 | 數據 |
| Dune | 鏈上 SQL 查詢、自訂儀表板 | 數據, 分析 |
| Nansen | 聰明錢地址追蹤、鏈上行為分析 | 數據, 分析 |

#### 安全（3 個）
| 名稱 | 描述 | 標籤 |
|------|------|------|
| GoPlus AgentGuard | 合約安全審計、惡意地址偵測 | 安全 |
| SlowMist 慢霧 | 投毒風險檢測、合約漏洞掃描 | 安全 |
| Skill Vetter | Skills 本身的安全性審計工具 | 安全 |

#### 其他（2 個）
| 名稱 | 描述 | 標籤 |
|------|------|------|
| Day1Global | 美股財報分析與數據查詢 | 數據, 美股 |
| X Research | Twitter/X 帳號監控與數據分析 | 資訊 |

---

### 4. 關於頁 `/about`

**OpenClaw 是什麼**：
- 開源 AI 命令列工具
- 用自然語言與鏈上世界對話
- 基於 Claude Code 的 MCP 生態

**四類目標用戶**（4 張卡片）：
1. 興趣探索 — 想了解 AI × Web3 的新手
2. 效率提升 — 想用 AI 自動化鏈上操作的交易者
3. 技術開發 — 想開發 Skills 的開發者
4. 商業落地 — 想用 AI Agent 做產品的團隊

**三個轉變**：
- 了解 → 掌握
- 盲目試錯 → 精準匹配
- 單一工具 → 生態構建

**核心貢獻者區塊**：
- 頭像 + 名字 + X handle + 簡介

**聯繫方式**：
- 社交連結按鈕（X / Telegram）

---

## 四、視覺設計細節

### 配色（hengclaw 原版，51Claw 要改為紫色系）
| 角色 | hengclaw 原版 | 51Claw 改為 |
|------|-------------|------------|
| 背景 | 深色 #0a0a0f | 深色 #0a0a0f（保持） |
| 主強調色 | 霓虹綠 | 霓虹紫 #a855f7 |
| 次強調色 | 霓虹紫 | 冷青藍 #06b6d4 |
| 卡片背景 | rgba 微亮 | rgba(255,255,255,0.05) |
| 文字主色 | 白色 | 白色（保持） |
| 文字次色 | 灰色 | 灰色（保持） |
| 強調文字 | 綠色 | 紫色 #c084fc |

### 卡片設計
```
┌─────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔ 漸變光條 ▔▔▔▔▔▔▔▔▔▔ │  ← 頂部 gradient 光條（主色 → 透明）
│                                 │
│  Skill 名稱（粗體白色）          │
│                                 │
│  描述文字（灰色，2-3 行）        │
│                                 │
│  [標籤1] [標籤2] [標籤3]        │  ← 小 badge，主色邊框
│                                 │
│  查看詳情 →                     │  ← 主色文字
│                                 │
└─────────────────────────────────┘
  圓角：rounded-xl
  背景：略淺深色
  邊框：1px 透明，hover 時變主色
  hover：scale 1.02 + 邊框亮 + 陰影加深
```

### 按鈕設計
- **主按鈕（CTA）**：實心主色背景 + 白色文字，hover 放大 1.05 + 光暈
- **次按鈕**：透明背景 + 主色邊框 + 主色文字，hover 背景微亮

### 代碼區塊
```
┌──────────────────────────── [複製] ─┐
│ $ npm install -g openclaw           │
│                                     │
└─────────────────────────────────────┘
  背景：比頁面背景更深
  字體：JetBrains Mono / 等寬
  左側可能有行號
  右上角「複製」按鈕
```

### Tab 切換組件
```
┌─────────┬─────────┬─────────┐
│ macOS   │ Windows │  Linux  │  ← 選中的 tab 底部有主色指示線
├─────────┴─────────┴─────────┤
│                             │
│  對應內容...                 │
│                             │
└─────────────────────────────┘
```

### FAQ 手風琴
```
┌─────────────────────────────────┐
│ ▸ 權限問題怎麼解決？             │  ← 點擊展開
├─────────────────────────────────┤
│ ▾ npm 安裝卡住怎麼辦？           │  ← 已展開
│   解答文字...                    │
│   代碼區塊...                    │
├─────────────────────────────────┤
│ ▸ API Key 怎麼設定？             │
└─────────────────────────────────┘
```

### 動畫規格
| 元素 | 效果 | CSS |
|------|------|-----|
| 卡片 hover | 微放大 + 邊框亮 + 陰影 | `transition-all duration-300 hover:scale-[1.02]` |
| 按鈕 hover | 放大 + 光暈 | `hover:scale-105 hover:shadow-lg` |
| 卡片頂部光條 | hover 亮度增強 | `bg-gradient-to-r from-transparent via-purple-500/50 to-transparent` |
| 頁面載入 | 淡入 + 上移 | `opacity-0 → opacity-100, translateY(10px) → 0` |
| 輪播切換 | 滑入 | `transition-all duration-400 ease-in-out` |

### 佈局斷點
| 裝置 | Grid 欄數 | 寬度 |
|------|----------|------|
| 手機 | 1 欄 | < 768px |
| 平板 | 2 欄 | 768px - 1024px |
| 桌面 | 3 欄 | > 1024px |

### 背景裝飾
- 全站有微弱的網格背景圖案（grid pattern）
- Hero 區可能有粒子效果或漸層光暈
- 毛玻璃效果用在浮層和 Nav bar（`backdrop-blur`）

---

## 五、SEO 結構（照做）

- Schema.org：WebSite（含 SearchAction）+ Organization
- Open Graph：title, description, image, locale
- Canonical URL
- robots: index, follow
- 每頁獨立 title + description

---

## 六、51Claw 要額外加的（hengclaw 沒有的）

1. **語言切換**（繁中/English）— Nav 右側語言切換按鈕
2. **Blog 頁** `/blog` — 文章列表 + 標籤分類
3. **推薦組合頁** `/bundles` — 策展式 Skill 套餐
4. **個人品牌元素** — 51、Hunter Association、Dexless 的介紹
5. **更完整的 Skill 詳情** — 每個 Skill 有完整使用教學，不只一句話
