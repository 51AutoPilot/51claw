# 51Claw — 專案規範

## 專案概述
**51Claw.xyz** — 51 的個人品牌 AI Skills Hub 網站
- 參考對象：https://hengclaw.ai/（做到 9 成像但更完整）
- 定位：AI Skills / MCP / Claude / OpenClaw 方向的導航站 + 實戰指南
- 品牌主人：51（0x515151）— Crypto KOL、Hunter Association 創辦人

## 技術棧
- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** — 深色主題
- **next-intl** — 繁中 / English 雙語切換
- 部署：Vercel
- 專案路徑：`C:/Users/User/Desktop/51claw`

## 設計規範

### 配色（紫色高端 AI 風格）
- 背景：深色底（#0a0a0f 到 #12121a 範圍）
- 主強調色：霓虹紫（#a855f7 → #c084fc）
- 次強調色：冷青藍（#06b6d4）
- 卡片背景：略淺深色（rgba(255,255,255,0.05)）
- 文字：白色為主、灰色次要、紫色強調
- 禁止：白底、淺色主題、通用 AI 紫漸層

### 字體
- 英文標題：Space Grotesk 或 Outfit（有科技感的無襯線）
- 中文：Noto Sans TC
- 代碼：JetBrains Mono
- 禁止：Inter / Roboto / Arial

### 動畫
- 卡片 hover：微放大 + 邊框紫光 + 陰影
- 頁面轉場：淡入淡出
- 背景：網格或粒子裝飾
- 禁止：預設 transition、閃爍、過度動畫

## 頁面結構

### 1. 首頁 `/`
- Hero：大標題 + 副標題 + 2 個 CTA
- 精選 Skills 輪播（6 大分類卡片）
- 數據統計列（Skills 數量、分類數、免費標示）
- 底部 CTA

### 2. 安裝頁 `/install`
- 系統要求
- 分步驟安裝教程（支援 macOS/Windows/Linux tab 切換）
- 代碼區塊附複製按鈕
- FAQ 手風琴

### 3. Skills 目錄 `/skills`
- 分類篩選（CEX、信息流、鏈上工具、數據分析、安全、其他）
- Skill 卡片（名稱、描述、標籤、查看詳情）
- 搜尋功能

### 4. 關於 `/about`
- 51 的個人介紹 + Hunter Association + Dexless
- OpenClaw 是什麼
- 目標用戶
- 社群入口（X / Telegram）

### 5. Blog `/blog`
- 文章列表（卡片式）
- 文章詳情頁
- 標籤分類
- 第一版先建好頁面結構，內容之後填

### 6. 推薦組合 `/bundles`
- 策展式 Skill 套餐（新手包、鏈上分析包等）
- 第一版先建好頁面結構，內容之後填

## 語言（i18n）
- 預設：繁體中文（zh-TW）
- 支援：English（en）
- 頂部導航要有語言切換按鈕
- 所有靜態文案都走 i18n，不要 hardcode

## Skills 資料（第一版）
沿用 hengclaw.ai 的 27 個 Skills，6 大分類：
- CEX 官方：Bitget Wallet、Coinbase、Binance、HTX、OKX
- 信息流：律動 BlockBeats、6551 新聞源、CoinMarketCap、XClaw
- 鏈上工具：Almanak、Bankr、BNB Chain MCP、BNB Chain、Byreal CLI、Four Meme、Lista DAO、Minara AI v2、Phantom Connect、Uniswap AI
- 數據分析：CoinAnk API、Dune、Nansen
- 安全：GoPlus AgentGuard、SlowMist 慢霧、Skill Vetter
- 其他：Day1Global、X Research

## Git 規範
- Commit message 格式：`feat:` / `fix:` / `refactor:` / `style:` / `docs:`
- 每完成一個頁面就 commit + push
- 分支：直接在 master 開發（第一版）

## 重要提醒
- 所有文案都要走 i18n（messages/zh-TW.json 和 messages/en.json）
- 手機版 RWD 必須完整
- 代碼要乾淨，組件拆分合理
- 不要裝沒列在這裡的套件，需要的話先回報 PM
