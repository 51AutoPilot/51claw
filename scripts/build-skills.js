#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/skills.json'), 'utf8'));
const catMap = {
  'cex':'cex','news':'news','onchain':'onchain','analytics':'analytics',
  'security':'security','other':'analytics','wallet':'onchain','social':'social',
  'market-data':'news','defi':'onchain','chain-tools':'onchain',
  'meme':'onchain','ai-strategy':'trading'
};
const updated = existing.map(s => ({
  ...s,
  category: catMap[s.category] || s.category,
  installCmd: s.installCmd || null,
  installCount: s.installCount || null,
  source: s.source || null,
  isOfficial: s.isOfficial !== undefined ? s.isOfficial : false,
  verdict: s.verdict || 'pass',
  features: s.features || null
}));
const existingIds = new Set(updated.map(s => s.id));

// Compact skill builder
function sk(id,name,nameZh,desc,descZh,cat,tags,tagsZh,icon,url,free,cmd,cnt,src,off,verd,warn,feats){
  const o={id,name,nameZh,description:desc,descriptionZh:descZh,category:cat,tags,tagsZh,icon,url:url||"",isFree:free!==false,installCmd:cmd||null,installCount:cnt||null,source:src||null,isOfficial:!!off,verdict:verd||"pass",features:feats||null};
  if(warn)o.warning=warn;
  return o;
}

const newSkills = [
  sk("bybit-skill","Bybit AI Trading","Bybit AI 交易","253 API endpoints, natural language crypto trading, zero setup.","253 API 端點，自然語言交易，零安裝。","cex",["trading","api"],["交易","API"],"🟡","https://github.com/bybit-exchange/skills",true,null,null,"Bybit",true,"warn","建議先在 Testnet 練習"),
  sk("gate-skills","Gate Skills","Gate Skills","Gate official open-source AI skill market.","Gate 官方開源 AI 技能市場。","cex",["trading"],["交易"],"🚪","https://github.com/gate/gate-skills",true,"npx skills add gate/gate-skills",null,"Gate",true,"warn","涉及交易操作"),
  sk("solana-dev-skill","Solana Dev Skill","Solana 開發技能","Solana Foundation's 2026 best practices.","Solana 基金會 2026 最新最佳實踐。","onchain",["solana","web3"],["Solana","Web3"],"☀️","https://github.com/solana-foundation/solana-dev-skill",true,"npx skills add https://github.com/solana-foundation/solana-dev-skill",null,"Solana Foundation",true),
  sk("helius-skills","Helius Skills","Helius 開發套件","Helius official Solana full-stack — CLI + MCP + Skills.","Helius 官方 Solana 全端 — CLI + MCP + Skills。","onchain",["solana","mcp"],["Solana","MCP"],"🌞","https://github.com/helius-labs/core-ai",true,"npm install -g helius-cli",null,"Helius",true),
  sk("trust-wallet-skills","Trust Wallet Skills","Trust Wallet 技能","Token Swap, market data, security across 100+ chains.","跨 100+ 區塊鏈 Swap、市場數據、安全掃描。","onchain",["wallet","swap"],["錢包","Swap"],"🔵","https://github.com/trustwallet/tw-agent-skills",true,"npx skills add trustwallet/tw-agent-skills",null,"Trust Wallet",true),
  sk("emblem-agent-wallet","Emblem AI Wallet","Emblem AI 錢包","7 chains, 250+ tools, zero-config.","7 鏈、250+ 工具、零配置。","onchain",["wallet"],["錢包"],"💎","https://github.com/EmblemCompany/EmblemAi-AgentWallet",true,"npm install -g @emblemvault/agentwallet",null,"Emblem",false,"warn","密碼驅動錢包，需確保安全"),
  sk("blockbeats-skill","BlockBeats Skill","律動 BlockBeats 技能","Deep research, whale detective, prediction markets.","深度研報、鏈上偵探、預測市場。","news",["research","whale"],["研報","巨鯨"],"📰","https://github.com/BlockBeatsOfficial/blockbeats-skill",true,"npx skills add https://github.com/BlockBeatsOfficial/blockbeats-skill",null,"BlockBeats",true),
  sk("nunchi-yex-trader","Nunchi yex-trader","Nunchi 自動交易","Hyperliquid 14-strategy auto-trading.","Hyperliquid 14 策略自動交易。","trading",["hyperliquid","quant"],["Hyperliquid","量化"],"🎯","https://github.com/Nunchi-trade/agent-cli",true,null,null,"Nunchi",false,"warn","自動交易，涉及真實資金"),
  sk("agipro-trading","AGIPro Trading","AGIPro 交易技能","62 DeFi/quant skills, 16 categories.","62 個 DeFi/量化技能。","trading",["defi","quant"],["DeFi","量化"],"🏆","https://github.com/agiprolabs/claude-trading-skills",true,null,null,"AGIPro",false,"warn","涉及多平台交易"),
  sk("vectorbt-backtesting","VectorBT Backtesting","VectorBT 回測","Backtesting + TA-Lib + 12 templates.","回測 + TA-Lib + 12 策略模板。","trading",["backtesting"],["回測"],"📉","https://github.com/marketcalls/vectorbt-backtesting-skills"),
  sk("options-strategy-advisor","Options Advisor","選擇權策略顧問","Black-Scholes + Greeks + IB integration.","Black-Scholes + 希臘字母 + IB。","trading",["options"],["選擇權"],"📐","https://github.com/staskh/trading_skills",true,null,null,"Community",false,"warn","含 IB 整合"),
  sk("alpaca-trading","Alpaca Trading","Alpaca 交易","Stock/ETF/options Rust CLI, $100K paper.","美股 Rust CLI，$100K 模擬帳戶。","trading",["stocks","rust"],["美股","Rust"],"🦙","https://github.com/lacymorrow/openclaw-alpaca-trading-skill",true,null,null,null,false,"warn","可連接真實帳戶"),
  sk("polyclaw","Polyclaw","Polyclaw 預測市場","Polymarket trading + LLM hedge.","Polymarket 交易 + LLM 對沖。","trading",["polymarket"],["Polymarket"],"🎲","https://github.com/chainstacklabs/polyclaw",true,null,null,"Chainstack",false,"warn","涉及預測市場交易"),
  sk("bankrbot","BankrBot","BankrBot DeFi","Multi-chain DeFi + 150x leverage.","多鏈 DeFi + 150 倍槓桿。","trading",["defi","leverage"],["DeFi","槓桿"],"💰","https://github.com/BankrBot/claude-plugins",true,null,null,"BankrBot",false,"warn","150 倍槓桿高風險"),
  sk("dpro-hyperliquid","dpro-hyperliquid","dPro Hyperliquid","Hyperliquid DEX + dPro analytics.","Hyperliquid DEX + dPro 分析。","trading",["hyperliquid"],["Hyperliquid"],"📊","https://github.com/dProLabs/dpro-hyperliquid",true,null,null,"dPro",false,"warn","涉及 DEX 交易"),
  sk("hyper-alpha-arena","Hyper-Alpha-Arena","Hyper-Alpha-Arena","86 factors + 5 AI Agents auto trading.","86 因子 + 5 AI Agent 自動交易。","trading",["ai","futures"],["AI","合約"],"🏟️","https://github.com/HammerGPT/Hyper-Alpha-Arena",true,null,null,"HammerGPT",false,"warn","AI 自動合約交易"),
  sk("trump-code","Trump Code","Trump Code","Tweet signals + S&P correlation + arbitrage.","推文信號 + S&P 相關性 + 套利。","trading",["signal"],["信號"],"🗽","https://github.com/sstklen/trump-code",true,null,null,null,false,"warn","實驗性策略"),
  sk("claude-financial-services","Claude Financial Services","Claude 金融服務","Anthropic official — IB, equity research, PE, 11 data providers.","Anthropic 官方 — 投行/股研/PE，11 家數據供應商。","trading",["finance","dcf"],["金融","DCF"],"🏛️","https://github.com/anthropics/financial-services-plugins",true,"/plugin marketplace add anthropics/financial-services-plugins",null,"Anthropic",true),
  sk("trailofbits-skills","Trail of Bits","Trail of Bits 安全","40+ security skills — smart contracts, code review.","40+ 安全技能 — 智能合約審計、程式碼審查。","security",["audit","codeql"],["審計","CodeQL"],"🔬","https://github.com/trailofbits/skills",true,"npx skills add trailofbits/skills",null,"Trail of Bits",true),
  sk("owasp-security","OWASP Security","OWASP 安全","OWASP Top 10:2025 + Agentic AI security.","OWASP Top 10:2025 + AI 安全標準。","security",["owasp"],["OWASP"],"🏴","https://github.com/agamm/claude-code-owasp",true,null,null,null,false,"warn","curl 下載安裝"),
  sk("transilience-tools","Transilience Tools","Transilience 滲透測試","23 skills + 8 agents pentest suite.","23 技能 + 8 Agent 滲透測試。","security",["pentest"],["滲透測試"],"⚔️","https://github.com/transilienceai/communitytools",true,null,null,"Transilience",false,"warn","僅限授權測試"),
  sk("parry","Parry","Parry 注入掃描","ML prompt injection scanner, 8ms cached.","ML 注入掃描器，8ms 快取。","security",["prompt-injection"],["注入防護"],"🗡️","https://github.com/vaporif/parry",true,"cargo install --path crates/cli"),
  sk("dippy","Dippy","Dippy 權限管理","Auto-approve safe bash, 14K+ tests, 40% boost.","安全命令自動批准，提速 40%。","security",["permissions"],["權限"],"🔓","https://github.com/ldayton/Dippy",true,"brew tap ldayton/dippy && brew install dippy"),
  sk("agnix","agnix","agnix Linter","342 validation rules for CLAUDE.md, SKILL.md.","342 條驗證規則。","security",["linter","quality"],["Linter","品質"],"🔧","https://github.com/agent-sh/agnix",true,"npm install -g agnix"),
  sk("plamen","Plamen","Plamen Web3 審計","Autonomous Web3 audit, 3400+ historical findings.","自主 Web3 審計，3400+ 歷史發現。","security",["web3","solidity"],["Web3","Solidity"],"🔎","https://github.com/PlamenTSV/plamen",true,null,null,null,false,"warn","Agent 多需注意資源"),
  sk("superclaude","SuperClaude","SuperClaude 框架","30 commands, 20 agents, 21.8K stars.","30 指令、20 Agent、21.8K 星。","multi-agent",["framework"],["框架"],"⚡","https://github.com/SuperClaude-Org/SuperClaude_Framework",true,"pipx install superclaude"),
  sk("vibehq-hub","VibeHQ Hub","VibeHQ Hub","5 agents coding, 20 MCP tools, dashboard.","5 Agent 同時寫 code，20 MCP 工具。","multi-agent",["coordination","mcp"],["協調","MCP"],"🎵","https://github.com/0x0funky/vibehq-hub"),
  sk("container-use","Container-Use","Container-Use 容器","Isolated container + Git branch per agent.","每個 Agent 獨立容器 + Git 分支。","multi-agent",["container"],["容器"],"📦","https://github.com/dagger/container-use",true,"brew install dagger/tap/container-use",null,"Dagger",true,"warn","可選 curl | bash"),
  sk("superpowers","Superpowers","Superpowers","Design-first, Git worktree, TDD, parallel.","設計先行、worktree、TDD、平行。","multi-agent",["tdd","worktree"],["TDD","Worktree"],"💪","https://github.com/obra/superpowers"),
  sk("claude-squad","Claude Squad","Claude Squad","Go terminal UI for multiple agents.","Go 終端 UI 管理多 Agent。","multi-agent",["terminal-ui"],["終端UI"],"🫂","https://github.com/smtg-ai/claude-squad",true,"brew install claude-squad"),
  sk("ccpm","CCPM","CCPM 專案管理","PRDs → GitHub Issues + parallel agents, 3x speed.","PRD → Issues + 平行 Agent，3 倍速度。","multi-agent",["project-management"],["專案管理"],"📋","https://github.com/automazeio/ccpm"),
  sk("auto-claude","Auto-Claude","Auto-Claude","12 terminals, Kanban, 3-layer security.","12 終端、Kanban、三層安全。","multi-agent",["desktop","kanban"],["桌面","Kanban"],"🖥️","https://github.com/AndyMik90/Auto-Claude",true,null,null,null,false,"warn","Electron 桌面應用"),
  sk("ruflo","Ruflo","Ruflo 企業編排","100+ agents, 5 consensus, ~61μs vector search.","100+ Agent、5 共識、~61μs 搜尋。","multi-agent",["enterprise","swarm"],["企業","群體"],"👑","https://github.com/ruvnet/ruflo",true,null,null,null,false,"warn","curl | bash 安裝"),
  sk("contextkit","ContextKit","ContextKit","4-phase planning + quality agents.","4 階段規劃 + 品質 Agent。","multi-agent",["planning"],["規劃"],"🧭","https://github.com/FlineDev/ContextKit",true,null,null,null,false,"warn","curl | bash 安裝"),
  sk("tsk","TSK","TSK 沙箱","Rust CLI, Docker sandbox, network isolation.","Rust CLI，Docker 沙箱，網路隔離。","multi-agent",["rust","docker"],["Rust","Docker"],"🏗️","https://github.com/dtormoen/tsk",true,"cargo install tsk-ai"),
  sk("find-skills","Find Skills","Find Skills","ClawHub #1 — discover from 13,000+ skills.","ClawHub 第一 — 從 13,000+ skills 搜尋。","devtools",["discovery"],["探索"],"🔍","https://clawhub.com",true,"npx clawhub install find-skills",418600,"ClawHub",true),
  sk("self-improving-agent","Self-Improving Agent","自我進化 Agent","Highest-rated (132 stars), learns from mistakes.","最高評分（132 星），從錯誤學習。","devtools",["learning"],["學習"],"🧬","https://clawhub.com",true,"npx clawhub install self-improving-agent",15000,"ClawHub"),
  sk("github-skill","GitHub","GitHub 管理","PRs, Issues, Actions, code search.","PR、Issues、Actions、搜尋。","devtools",["github","pr"],["GitHub","PR"],"🐙","https://clawhub.com",true,"npx clawhub install github",21600,"ClawHub",true),
  sk("tavily-search","Tavily Search","Tavily 搜尋","AI search engine, 1,000 free/month.","AI 搜尋，免費 1,000/月。","devtools",["search","web"],["搜尋","Web"],"🌐","https://github.com/tavily-ai/skills",true,"npx skills add tavily-ai/skills",23800,"Tavily",true),
  sk("summarize","Summarize","一鍵摘要","URLs, PDFs, audio, YouTube.","URL、PDF、音訊、YouTube。","devtools",["summary","pdf"],["摘要","PDF"],"📝","https://clawhub.com",true,"npx clawhub install summarize",22400,"ClawHub",true),
  sk("claude-command-suite","Claude Command Suite","Claude Command Suite","216+ commands, 54 agents.","216+ 指令、54 agents。","devtools",["commands"],["指令"],"🗂️","https://github.com/qdhenry/Claude-Command-Suite",true,null,null,null,false,"warn","shell script 安裝"),
  sk("production-commands","Production Commands","生產級指令集","57 commands — 15 workflows + 42 tools.","57 指令 — 15 工作流 + 42 工具。","devtools",["commands","tdd"],["指令","TDD"],"⚙️","https://github.com/wshobson/commands"),
  sk("riper-workflow","RIPER Workflow","RIPER 工作流","5-phase with access control.","五階段 + 存取控制。","devtools",["workflow"],["工作流"],"🔄","https://github.com/tony/claude-code-riper-5"),
  sk("ab-method","AB Method","AB Method","Spec-driven incremental + sub-agents.","規格驅動增量 + 子 Agent。","devtools",["spec-driven"],["規格驅動"],"🎯","https://github.com/ayoubben18/ab-method",true,"npx ab-method"),
  sk("claudekit","claudekit","claudekit","195+ patterns, checkpoint, 6-agent review.","195+ 模式、存檔、6 Agent 審查。","devtools",["security","checkpoint"],["安全","存檔"],"🔨","https://github.com/carlrannaberg/claudekit",true,"npm install -g claudekit"),
  sk("understand-anything","Understand-Anything","知識圖譜","Codebase → interactive knowledge graph.","Codebase → 互動知識圖譜。","devtools",["knowledge-graph"],["知識圖譜"],"🗺️","https://github.com/Lum1104/Understand-Anything"),
  sk("skill-factory","Skill Factory","Skill Factory","Batch-create Skills, 69 presets.","批量建立 Skills，69 預設。","devtools",["skill-creation"],["Skill建立"],"🏭","https://github.com/alirezarezvani/claude-code-skill-factory"),
  sk("skill-seekers","Skill Seekers","Skill Seekers","17+ sources → AI Skills, AST parsing.","17+ 來源轉 Skills，AST 解析。","devtools",["data-ingestion"],["資料擷取"],"🔬","https://github.com/yusufkaraaslan/Skill_Seekers",true,"pip install skill-seekers"),
  sk("compound-engineering","Compound Engineering","Compound Engineering","80% planning + 20% execution.","80% 規劃 + 20% 執行。","devtools",["methodology"],["方法論"],"📈","https://github.com/EveryInc/compound-engineering-plugin"),
  sk("context7","Context7","Context7 即時文檔","Upstash — real-time versioned docs MCP.","Upstash — 即時版本文檔注入。","devtools",["mcp","docs"],["MCP","文檔"],"7️⃣","https://github.com/upstash/context7",true,"npx ctx7 setup",null,"Upstash",true),
  sk("github-mcp-server","GitHub MCP Server","GitHub MCP","GitHub official modular MCP Server.","GitHub 官方模組化 MCP。","devtools",["mcp","github"],["MCP","GitHub"],"🐱","https://github.com/github/github-mcp-server",true,null,null,"GitHub",true),
  sk("sentry-mcp","Sentry MCP","Sentry MCP","Sentry official — error tracking, debugging.","Sentry 官方 — 錯誤追蹤、除錯。","devtools",["mcp","sentry"],["MCP","Sentry"],"🐛","https://github.com/getsentry/sentry-mcp",true,null,null,"Sentry",true),
  sk("claude-code-mcp","Claude Code MCP","Claude Code MCP","Agent-in-Agent for Cursor/Windsurf.","讓 Cursor/Windsurf 調用 Claude Code。","devtools",["mcp","cursor"],["MCP","Cursor"],"🔗","https://github.com/steipete/claude-code-mcp",true,"npx -y @steipete/claude-code-mcp@latest",null,null,false,"warn","跳過權限確認"),
  sk("lyra-tool-discovery","Lyra Tool Discovery","Lyra MCP 發現","AI MCP Server discovery.","AI MCP Server 自動發現。","devtools",["mcp","discovery"],["MCP","發現"],"🎵","https://github.com/nirholas/lyra-tool-discovery",true,"npm install -g @nirholas/lyra-tool-discovery"),
  sk("ccusage","ccusage","ccusage 用量","Claude Code usage analytics.","Claude Code 用量分析。","devtools",["analytics","cost"],["分析","成本"],"💸","https://github.com/ryoppippi/ccusage",true,"npx ccusage@latest"),
  sk("ccflare","ccflare","ccflare API 代理","API proxy, multi-account, <10ms.","API 代理，多帳號，<10ms。","devtools",["api-proxy"],["API代理"],"⚡","https://github.com/snipeship/ccflare",true,null,null,null,false,"warn","處理 API Key"),
  sk("claudex","Claudex","Claudex 對話歷史","FTS5 search, MCP memory, 10 themes.","全文搜索、MCP 記憶、10 主題。","devtools",["history","search"],["歷史","搜索"],"📚","https://github.com/kunwar-shah/claudex",true,"npm install -g @kunwarshah/claudex"),
  sk("frontend-design","Frontend Design","Frontend Design（Anthropic）","Anti-AI-slop design philosophy.","反 AI slop 設計哲學。","frontend",["design","anthropic"],["設計","Anthropic"],"🎨","https://github.com/anthropics/frontend-design",true,"npx skills add anthropic/frontend-design",277000,"Anthropic",true),
  sk("react-best-practices","React Best Practices","React 最佳實踐（Vercel）","40+ performance rules, 10 years experience.","40+ 效能規則，十年經驗。","frontend",["react","nextjs"],["React","Next.js"],"⚛️","https://github.com/vercel-labs/agent-skills",true,"npx skills add vercel-labs/agent-skills",176400,"Vercel",true),
  sk("web-design-guidelines","Web Design Guidelines","Web 設計規範（Vercel）","100+ UI rules, auto-audit.","100+ 設計規則，自動審計。","frontend",["ui-audit"],["UI審計"],"📏","https://vercel.com/design/guidelines",true,"curl -fsSL https://vercel.com/design/guidelines/install | bash",137000,"Vercel",true,"warn","curl | bash 安裝"),
  sk("vercel-react-native","RN Guidelines","React Native 指南（Vercel）","16 RN/Expo rules, 7 domains.","16 條規則，7 領域。","frontend",["react-native","expo"],["RN","Expo"],"📱","https://github.com/vercel-labs/agent-skills",true,null,null,"Vercel",true),
  sk("stitch-design-to-code","Stitch Design-to-Code","Stitch 設計轉代碼（Google）","Design → React components.","設計稿轉 React 元件。","frontend",["design-to-code"],["設計轉代碼"],"🪡","https://github.com/google-labs-code/stitch-skills",true,"npx skills add google-labs-code/stitch-skills",null,"Google",true),
  sk("frontend-design-toolkit","Frontend Design Toolkit","前端設計工具包","70+ tools, Figma sync, animation.","70+ 工具、Figma 同步、動畫。","frontend",["figma","animation"],["Figma","動畫"],"🖌️","https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit"),
  sk("ui-ux-pro-max","UI/UX Pro Max","UI/UX Pro Max","67 styles, 161 palettes, 57 fonts.","67 風格、161 色盤、57 字型。","frontend",["design-system"],["設計系統"],"💫","https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"),
  sk("claude-code-ui-agents","UI Agent Prompts","UI Agent Prompts","27 UI/UX prompts, zero install.","27 UI/UX prompts，免安裝。","frontend",["prompts","ui"],["Prompts","UI"],"🎭","https://github.com/mustafakendiguzel/claude-code-ui-agents"),
  sk("react-native-expo-agent","RN Expo Agent","RN Expo Agent 系統","7 agents, 3 commands, 50% less dev time.","7 Agent + 3 指令，減少 50% 開發。","frontend",["react-native"],["RN"],"📲","https://github.com/senaiverse/claude-code-reactnative-expo-agent-system"),
  sk("stripe-skills","Stripe Skills","Stripe 支付","Payment best practices + SDK upgrade.","支付最佳實踐 + SDK 升級。","devops",["payment","stripe"],["支付","Stripe"],"💳","https://github.com/stripe/ai",true,"npx skills add stripe/ai",null,"Stripe",true),
  sk("cloudflare-skills","Cloudflare Skills","Cloudflare 技能","8 skills + 4 MCP — Workers, KV, D1, R2.","8 Skill + 4 MCP。","devops",["cloudflare","edge"],["Cloudflare","邊緣"],"🔶","https://github.com/cloudflare/skills",true,"npx skills add https://github.com/cloudflare/skills",null,"Cloudflare",true),
  sk("netlify-skills","Netlify Skills","Netlify 技能","12 skills — Serverless, Edge, DB, CDN.","12 技能。","devops",["netlify"],["Netlify"],"🌐","https://github.com/netlify/context-and-tools",true,"npx skills add netlify/context-and-tools",null,"Netlify",true),
  sk("supabase-skills","Supabase Skills","Supabase 技能","Postgres optimization + 20+ MCP tools.","Postgres 優化 + 20+ MCP 工具。","devops",["supabase","postgres"],["Supabase","Postgres"],"⚡","https://github.com/supabase/agent-skills",true,"npx skills add supabase/agent-skills",null,"Supabase",true),
  sk("hashicorp-skills","HashiCorp Skills","HashiCorp IaC","Terraform, modules, Stacks, Packer.","Terraform/模組/Stacks/Packer。","devops",["terraform","iac"],["Terraform","IaC"],"🏗️","https://github.com/hashicorp/agent-skills",true,"npx skills add hashicorp/agent-skills",null,"HashiCorp",true),
  sk("pulumi-skills","Pulumi Skills","Pulumi IaC","4 migration + 4 best practices.","4 遷移 + 4 最佳實踐。","devops",["pulumi"],["Pulumi"],"🌈","https://github.com/pulumi/agent-skills",true,null,null,"Pulumi",true),
  sk("neon-skills","Neon Skills","Neon Postgres","Serverless Postgres, instant temp DBs.","Serverless Postgres，免登入臨時 DB。","devops",["neon","postgres"],["Neon","Postgres"],"🗄️","https://github.com/neondatabase/agent-skills",true,"npx skills add neondatabase/agent-skills",null,"Neon",true),
  sk("terraform-skill","Terraform Skill","Terraform 技能","1.3K stars, AWS Hero.","1.3K 星，AWS Hero。","devops",["terraform"],["Terraform"],"🔷","https://github.com/antonbabenko/terraform-skill"),
  sk("cc-devops-skills","cc-devops-skills","DevOps 31 技能","31 skills: IaC, CI/CD, K8s.","31 技能：IaC/CI-CD/K8s。","devops",["devops","kubernetes"],["DevOps","K8s"],"🔩","https://github.com/akin-ozer/cc-devops-skills"),
  sk("claudebox","ClaudeBox","ClaudeBox","Docker dev — 15+ profiles, firewall.","Docker 開發 — 15+ Profile、防火牆。","devops",["docker"],["Docker"],"📦","https://github.com/RchGrav/claudebox",true,null,null,null,false,"warn",".run 自解壓腳本"),
  sk("n8n-skills","n8n Skills","n8n 自動化","7 production workflow skills.","7 生產級工作流技能。","devops",["n8n"],["n8n"],"🔄","https://github.com/czlonkowski/n8n-skills"),
  sk("better-auth-skills","Better Auth","Better Auth","Email, OAuth, 2FA, Passkey, RBAC.","Email/OAuth/2FA/Passkey/RBAC。","devops",["auth","oauth"],["認證","OAuth"],"🔐","https://github.com/better-auth/skills",true,"npx skills add better-auth/skills",null,"Better Auth",true),
  sk("apollo-graphql-skills","Apollo GraphQL","Apollo GraphQL","11 skills — Schema to Router.","11 Skill — Schema 到 Router。","devops",["graphql"],["GraphQL"],"🚀","https://github.com/apollographql/skills",true,"npx skills add apollographql/skills",null,"Apollo GraphQL",true),
  sk("speakeasy-api-skills","Speakeasy API","Speakeasy API","12 skills, 9 language SDKs.","12 技能、9 語言 SDK。","devops",["api","sdk"],["API","SDK"],"🔊","https://www.speakeasy.com",true,"speakeasy agent setup-skills",null,"Speakeasy",true),
  sk("gemini-api-skills","Gemini API Skills","Gemini API（Google）","Gemini, Vertex AI, Live API.","Gemini/Vertex AI/Live API。","devops",["gemini","google"],["Gemini","Google"],"✨","https://github.com/google-gemini/gemini-skills",true,"npx skills add google-gemini/gemini-skills",null,"Google",true),
  sk("firecrawl-skills","Firecrawl Skills","Firecrawl 爬蟲","Scraping, search, extraction.","爬取、搜尋、結構化擷取。","devops",["scraping"],["爬蟲"],"🔥","https://github.com/firecrawl/cli",true,"npx skills add firecrawl/cli",null,"Firecrawl",true),
  sk("ai-marketing-suite","AI Marketing Suite","AI 行銷套件","5 sub-agents, 6-dimension audit.","5 sub-agent、六維度審計。","marketing",["audit","seo"],["審計","SEO"],"📣","https://github.com/zubair-trabzada/ai-marketing-claude",true,null,null,null,false,"warn","curl | bash"),
  sk("claude-seo","Claude SEO","Claude SEO","13 sub-skills + 7 subagents + DataForSEO.","13 子技能 + 7 subagent + DataForSEO。","marketing",["seo"],["SEO"],"🔎","https://github.com/AgriciDaniel/claude-seo",true,null,null,null,false,"warn","curl | bash"),
  sk("seo-geo-skills","SEO & GEO Skills","SEO & GEO","20 skills, CORE-EEAT + CITE frameworks.","20 技能 + CORE-EEAT/CITE 框架。","marketing",["seo","geo"],["SEO","GEO"],"🌍","https://github.com/aaron-he-zhu/seo-geo-claude-skills",true,"npx skills add aaron-he-zhu/seo-geo-claude-skills"),
  sk("marketing-skills","Marketing Skills","行銷技能大全","160+ Markdown — SEO, ads, templates.","160+ Markdown — SEO、廣告、模板。","marketing",["seo","ads"],["SEO","廣告"],"📢","https://github.com/kostja94/marketing-skills",true,"npx skills add kostja94/marketing-skills"),
  sk("seo-machine","SEO Machine","SEO Machine","10 agents + 26 skills + GA4.","10 agent + 26 技能 + GA4。","marketing",["seo","content"],["SEO","內容"],"⚙️","https://github.com/TheCraigHewitt/seomachine"),
  sk("create-viral-content","Viral Content Forge","爆款內容","5 platforms, AI detection evasion.","5 平台、AI 偵測規避。","marketing",["viral"],["爆款"],"🔥","https://github.com/aaaronmiller/create-viral-content"),
  sk("remotion-best-practices","Remotion","Remotion 影片","Code-driven video with React/TS.","React/TS 做影片。","media",["video","react"],["影片","React"],"🎬","https://github.com/remotion-dev/skills",true,"npx skills add remotion-dev/skills",126000,"Remotion",true),
  sk("elevenlabs-mcp","ElevenLabs MCP","ElevenLabs 語音","TTS, voice cloning, transcription.","TTS、聲音複製、轉錄。","media",["tts","voice"],["TTS","語音"],"🎙️","https://github.com/elevenlabs/elevenlabs-mcp",false,"uvx elevenlabs-mcp",null,"ElevenLabs",true),
  sk("claude-media-skills","Claude Media","Claude 媒體","Gemini images + Kling video.","Gemini 圖片 + Kling 影片。","media",["gemini","kling"],["Gemini","Kling"],"🖼️","https://github.com/dennisonbertram/claude-media-skills"),
  sk("generative-media-skills","Generative Media","多模態媒體","100+ models — Midjourney, Flux, Kling.","100+ 模型 — Midjourney/Flux/Kling。","media",["midjourney","flux"],["Midjourney","Flux"],"🎥","https://github.com/SamurAIGPT/Generative-Media-Skills"),
  sk("video-toolkit","Video Toolkit","影片工具包","Remotion + ElevenLabs + FFmpeg + GPU.","Remotion + ElevenLabs + FFmpeg + GPU。","media",["video","ffmpeg"],["影片","FFmpeg"],"🎞️","https://github.com/digitalsamba/claude-code-video-toolkit"),
  sk("ai-music-production","AI Music","AI 音樂製作","52 skills + 80 MCP — Suno V5 pipeline.","52 技能 + 80 MCP — Suno V5 流水線。","media",["music","suno"],["音樂","Suno"],"🎵","https://github.com/bitwize-music-studio/claude-ai-music-skills"),
  sk("deapi-media-toolkit","deAPI Media","deAPI 媒體","Image + TTS + OCR, 1/20 cost.","圖片 + TTS + OCR，1/20 成本。","media",["image","tts"],["圖片","TTS"],"🌅","https://github.com/deapi-ai/claude-code-skills"),
  sk("game-studios","Game Studios","遊戲工作室","48 agents, Godot/Unity/Unreal.","48 Agent，Godot/Unity/Unreal。","media",["gamedev","godot"],["遊戲","Godot"],"🎮","https://github.com/Donchitos/Claude-Code-Game-Studios"),
  sk("godogen","Godogen","Godogen 遊戲","Description → Godot 4 project.","描述 → Godot 4 專案。","media",["godot"],["Godot"],"🕹️","https://github.com/htdt/godogen"),
  sk("claude-scientific-skills","Scientific Skills","科學研究","170+ skills, 250+ databases.","170+ 技能 + 250+ 資料庫。","data-ml",["science"],["科學"],"🔬","https://github.com/K-Dense-AI/claude-scientific-skills"),
  sk("altimate-data-engineering","Altimate Data","dbt + Snowflake","dbt + Snowflake, 3.6x performance.","dbt + Snowflake，3.6 倍效能。","data-ml",["dbt","snowflake"],["dbt","Snowflake"],"❄️","https://github.com/AltimateAI/data-engineering-skills"),
  sk("claude-data-analysis","Data Analysis","資料分析 Agent","6 sub-agents: explore, viz, report.","6 子 agent：探索、視覺化、報告。","data-ml",["data-analysis"],["資料分析"],"📊","https://github.com/liangdabiao/claude-data-analysis"),
  sk("data-science-team","Data Science Team","數據科學團隊","5 agents simulating real team.","5 Agent 模擬真實團隊。","data-ml",["data-science","ml"],["數據科學","ML"],"🧪","https://github.com/HungHsunHan/claude-code-data-science-team"),
  sk("x-research-skill","X Research","X Research","Search tweets, monitor KOLs.","搜索推文、監控 KOL。","social",["twitter","kol"],["Twitter","KOL"],"🐦","https://github.com/rohunvora/x-research-skill"),
  sk("cc-connect","cc-connect","cc-connect 通訊橋","Bridge 7+ platforms.","橋接 7+ 通訊平台。","social",["telegram","slack"],["Telegram","Slack"],"🔌","https://github.com/chenhg5/cc-connect",true,"npm install -g cc-connect",null,null,false,"warn","可遠端控制 AI agent"),
  sk("wacli","Wacli","Wacli WhatsApp","WhatsApp CLI, 16K+ downloads.","WhatsApp CLI，16K+ 下載。","social",["whatsapp"],["WhatsApp"],"💬","https://github.com/steipete/wacli",true,"brew install steipete/tap/wacli",16000,null,false,"warn","可代發訊息"),
  sk("claude-code-discord","Discord Bot","Discord Claude Bot","RBAC, 45+ commands, Shell/Git.","RBAC、45+ 指令、Shell/Git。","social",["discord","bot"],["Discord","Bot"],"🎮","https://github.com/zebbern/claude-code-discord",true,null,null,null,false,"warn","可遠端執行 Shell"),
  sk("gog-google-workspace","GOG","GOG Google 全家桶","Gmail, Calendar, Drive, Sheets from terminal.","Gmail/Calendar/Drive/Sheets 命令列管理。","productivity",["google","gmail"],["Google","Gmail"],"📧","https://clawhub.com",true,"npx clawhub install gog",29400,null,false,"warn","需確認 OAuth 範圍"),
  sk("anthropic-document-skills","Anthropic Documents","Anthropic 文件","Create/edit DOCX, PPTX, XLSX, PDF.","建立/編輯 Word/PPT/Excel/PDF。","productivity",["docx","pptx"],["DOCX","PPTX"],"📄","https://github.com/anthropics/skills",true,"/plugin marketplace add anthropics/skills",null,"Anthropic",true),
  sk("anthropic-canvas-design","Anthropic Canvas","Anthropic Canvas","Canvas graphics, data viz, gen art.","Canvas 圖形、數據視覺化。","productivity",["canvas"],["Canvas"],"🎨","https://github.com/anthropics/skills",true,null,null,"Anthropic",true),
  sk("anthropic-web-artifacts","Anthropic Web Artifacts","Anthropic Web 元件","Instant-preview HTML/CSS/JS.","即時預覽 HTML/CSS/JS。","productivity",["html","css"],["HTML","CSS"],"🌐","https://github.com/anthropics/skills",true,null,null,"Anthropic",true),
  sk("anthropic-mcp-builder","Anthropic MCP Builder","Anthropic MCP","Guided MCP Server building.","引導式 MCP 建構。","productivity",["mcp"],["MCP"],"🔧","https://github.com/anthropics/skills",true,null,null,"Anthropic",true),
  sk("anthropic-webapp-testing","Anthropic Testing","Anthropic 測試","Playwright E2E, screenshots.","Playwright E2E、截圖。","productivity",["playwright"],["Playwright"],"🧪","https://github.com/anthropics/skills",true,null,null,"Anthropic",true),
  sk("sanity-toolkit","Sanity Toolkit","Sanity CMS","GROQ, Schema, Visual Editing, SEO.","GROQ/Schema/Visual Editing/SEO。","productivity",["sanity","cms"],["Sanity","CMS"],"📝","https://github.com/sanity-io/agent-toolkit",true,"npx skills add sanity-io/agent-toolkit",null,"Sanity",true),
  sk("veryfi-ocr","Veryfi OCR","Veryfi OCR","Receipt/invoice → JSON, SOC 2.","收據/發票 → JSON，SOC 2。","productivity",["ocr","invoice"],["OCR","發票"],"🧾","https://www.veryfi.com",false,"clawhub install veryfi-ocr",null,"Veryfi",true),
  sk("claude-legal","Claude-Legal","Claude 法律","Contract review, NDA, GDPR/CCPA.","合約審查、NDA、GDPR/CCPA。","productivity",["legal"],["法律"],"⚖️","https://github.com/Kromer-Group/Claude-Legal"),
  sk("book-factory","Book Factory","Book Factory","Non-fiction publishing pipeline.","非虛構書籍 Pipeline。","productivity",["writing"],["寫作"],"📖","https://github.com/robertguss/claude-skills"),
  sk("web-scraper","Web Scraper","智慧爬蟲","6-phase recon, 15-60x faster.","六階段偵察，快 15-60 倍。","productivity",["scraping"],["爬蟲"],"🕷️","https://github.com/yfe404/web-scraper"),
  sk("claude-homeassistant","Home Assistant","Home Assistant","Natural language HA + SSH deploy.","自然語言 HA + SSH 部署。","productivity",["iot"],["IoT"],"🏠","https://github.com/philippb/claude-homeassistant",true,null,null,null,false,"warn","SSH 操作設備")
];

const toAdd = newSkills.filter(s => !existingIds.has(s.id));
const all = [...updated, ...toAdd];
const seen = new Set();
const deduped = all.filter(s => { if(seen.has(s.id)) return false; seen.add(s.id); return true; });

const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/categories.json'), 'utf8'));
const cc = {};
deduped.forEach(s => { cc[s.category] = (cc[s.category]||0)+1; });
fs.writeFileSync(path.join(__dirname, '../src/data/categories.json'), JSON.stringify(categories.map(c=>({...c,count:cc[c.id]||0})),null,2));
fs.writeFileSync(path.join(__dirname, '../src/data/skills.json'), JSON.stringify(deduped, null, 2));
console.log('Total:', deduped.length);
Object.entries(cc).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(' ',k+':',v));
