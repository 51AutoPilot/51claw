# Skill 大規模匯入任務

> 來源檔：`C:\Users\User\Desktop\skill-collection-final.md`（113 個 skill，25 品類）
> 目標：審查安全性、分類、寫使用說明、匯入 HunterKit 網站

---

## 角色分工

- **Claw-PM**：統籌進度、分配工作、最終驗收
- **Claw-Content**：安全審查 + 分類 + 撰寫使用說明（主力）
- **Claw-Frontend**：更新 categories.json、skills.json 資料結構，新增 Skill 詳情頁

---

## Phase 1：安全審查（Claw-Content 負責）

逐一檢視 `skill-collection-final.md` 裡的 113 個 skill，每個 skill 都要：

### 檢查項目
1. **來源可信度**：是否來自官方團隊或知名開發者？GitHub repo 是否公開？
2. **權限範圍**：是否要求不合理的權限（如讀取 `.env`、存取錢包私鑰、任意 shell 執行）？
3. **安裝方式**：安裝指令是否來自可信的 registry（npm/GitHub）？有沒有 `curl | bash` 這種高風險安裝？
4. **更新狀態**：最後更新是否超過 6 個月？（原始資料已初步篩過，但要再確認）
5. **ClawHavoc 事件關聯**：是否在已知惡意 skill 清單上？

### 輸出格式
在 `src/data/` 建立 `skill-audit.json`，每個 skill 一筆紀錄：

```json
{
  "id": "skill-id",
  "name": "Skill Name",
  "sourceUrl": "https://github.com/...",
  "verdict": "pass | warn | reject",
  "reason": "審查結論，例如：官方出品、權限合理 / curl|bash 安裝需注意 / 疑似惡意已排除",
  "checkedAt": "2026-03-26"
}
```

**verdict 規則：**
- `pass`：來源可信 + 權限合理 + 仍在維護 → 直接收錄
- `warn`：有小疑慮但整體可用 → 收錄但標注警告
- `reject`：高風險或已失效 → 不收錄

---

## Phase 2：分類對齊（Claw-Content 負責）

原始檔案有 25 個品類，HunterKit 目前只有 6 個。需要：

1. 讀取目前的 `src/data/categories.json`（6 個分類）
2. 根據 113 個 skill 的內容，設計新的分類體系
3. 新分類要求：
   - 最多 **12-15 個分類**（太多會亂）
   - 每個分類至少 **3 個 skill**（太少就合併）
   - 保留現有 6 個分類的 ID（`cex`、`news`、`onchain`、`analytics`、`security`、`other`）
   - 新增分類參考原始資料的品類，例如：
     - `devtools`（開發工具 & Slash Commands）
     - `trading`（交易 & 金融）
     - `frontend`（前端 & UI/UX）
     - `devops`（DevOps & 基礎設施）
     - `marketing`（行銷 & SEO）
     - `ai-ml`（數據科學 & ML）
     - `multi-agent`（多 Agent 協調）
     - 等等，根據實際 skill 數量決定
4. 更新 `src/data/categories.json`，格式沿用現有的：
   ```json
   {
     "id": "devtools",
     "name": "Dev Tools",
     "nameZh": "開發工具",
     "icon": "💻",
     "description": "...",
     "descriptionZh": "...",
     "count": 0
   }
   ```
   count 先填 0，Phase 3 會自動算

---

## Phase 3：Skill 資料寫入（Claw-Content + Claw-Frontend 協作）

### Claw-Content：撰寫每個 skill 的資料

把通過審查（pass / warn）的 skill 轉成 `skills.json` 格式：

```json
{
  "id": "frontend-design",
  "name": "Frontend Design",
  "nameZh": "Frontend Design（Anthropic 官方）",
  "description": "Anthropic's official design philosophy skill. Anti-AI-slop aesthetic system with brutalist, retro-futuristic, luxury styles.",
  "descriptionZh": "Anthropic 官方設計哲學 Skill。反 AI slop 美學系統，支援 brutalist、retro-futuristic、luxury 等風格方向。",
  "category": "frontend",
  "tags": ["design", "ui"],
  "tagsZh": ["設計", "UI"],
  "icon": "🎨",
  "url": "https://github.com/anthropics/frontend-design",
  "installCmd": "npx skills add anthropic/frontend-design",
  "installCount": 277000,
  "source": "Anthropic",
  "isFree": true,
  "isOfficial": true,
  "verdict": "pass",
  "features": [
    { "name": "Design Direction", "nameZh": "設計方向", "desc": "Choose aesthetic direction based on purpose and audience", "descZh": "根據目的和受眾選擇美學方向" },
    { "name": "Typography", "nameZh": "排版設計", "desc": "Unexpected font pairings, no Inter/Roboto/Arial", "descZh": "意想不到的字體配對，拒絕 Inter/Roboto/Arial" }
  ]
}
```

**寫入規則：**
- `description` / `descriptionZh`：1-2 句話，講清楚這個 skill 做什麼、為什麼好用
- `features`：最多 5 個核心功能，從原始資料的表格欄位提取
- `installCmd`：直接從原始資料抄安裝指令
- `installCount`：有數據的填，沒有的填 `null`
- `verdict` 為 `warn` 的 skill，額外加 `"warning": "警告原因"`
- `url`：填 GitHub 或官方連結，沒有的填空字串
- 不要亂編資料，原始資料沒寫的就不填

### Claw-Frontend：更新資料結構和頁面

1. **擴展 skills.json schema**：
   - 新增欄位：`installCmd`、`installCount`、`source`、`isOfficial`、`verdict`、`warning`、`features`
   - 現有 27 個 skill 也要補上這些欄位（沒有的填 null）

2. **更新 categories.json**：
   - 加入新分類
   - `count` 欄位改成自動從 skills.json 計算，不要手動填

3. **Skills 目錄頁 `/skills` 更新**：
   - 分類篩選要支援新的分類
   - 搜尋要能搜中英文
   - 卡片要顯示：安裝量（有的話）、來源、是否官方、verdict badge
   - verdict 為 `warn` 的顯示黃色警告標籤

4. **新增 Skill 詳情頁 `/skills/[id]`**（如果還沒有）：
   - Skill 名稱 + 描述
   - 安裝指令（附複製按鈕）
   - 功能列表（features）
   - 來源連結
   - 安裝量
   - 安全審查結果（pass = 綠色、warn = 黃色）
   - 標籤

---

## Phase 4：驗收

PM 驗收以下項目：

```
□ skill-audit.json 存在，113 個 skill 都有審查結果
□ 被 reject 的 skill 沒有出現在 skills.json
□ categories.json 分類合理，沒有空分類（count = 0）
□ skills.json 格式統一，所有必填欄位都有值
□ /skills 頁面能正常顯示所有 skill
□ 分類篩選正常
□ 搜尋功能正常（中英文都測）
□ Skill 詳情頁正常顯示
□ 手機版 RWD 正常
□ 沒有 console error
□ i18n 中英文都正常
□ npm run build 沒有報錯
```

---

## 注意事項

- **不要刪除現有的 27 個 skill**，只新增
- 所有文案走 i18n（如果 Skill 詳情頁有新的靜態文案，要加到 messages/zh-TW.json 和 messages/en.json）
- 設計風格嚴格遵守 `CLAUDE.md` 的規範（深色底、紫色強調、禁止通用字體）
- 每完成一個 Phase 就 commit：
  - `feat: Phase 1 — skill 安全審查完成（X pass / Y warn / Z reject）`
  - `feat: Phase 2 — 分類體系重整（N 個分類）`
  - `feat: Phase 3 — 匯入 N 個 skills + 詳情頁`
  - `fix: Phase 4 — 驗收修復`
