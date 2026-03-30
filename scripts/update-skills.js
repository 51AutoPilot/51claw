/**
 * Phase 1B: Batch update skills.json
 * - Add 7 new fields to all 152 existing skills
 * - Update existing skills with 素材庫 + verification report data
 * - Add new skills from 素材庫
 */
const fs = require('fs');
const path = require('path');

const SKILLS_PATH = path.join(__dirname, '..', 'src', 'data', 'skills.json');
const skills = JSON.parse(fs.readFileSync(SKILLS_PATH, 'utf8'));

// ============================================================
// 1. GitHub verification data (from Phase 1A report)
// ============================================================
const githubData = {
  'binance': { stars: 613, lastUpdated: '2026-03-29', url: 'https://github.com/binance/binance-skills-hub', installCmd: 'npx skills add https://github.com/binance/binance-skills-hub' },
  'htx': { stars: 12, lastUpdated: '2026-03-27', url: 'https://github.com/htx-exchange/htx-skills-hub', installCmd: 'npx skills add https://github.com/htx-exchange/htx-skills-hub' },
  'okx': { stars: 184, lastUpdated: '2026-03-29', url: 'https://github.com/okx/onchainos-skills', installCmd: 'npx skills add https://github.com/okx/onchainos-skills' },
  'gate-skills': { stars: 18, lastUpdated: '2026-03-29', url: 'https://github.com/gate/gate-skills', installCmd: 'npx skills add gate/gate-skills' },
  'bitget-wallet': { stars: 170, lastUpdated: '2026-03-29', url: 'https://github.com/bitget-wallet-ai-lab/bitget-wallet-skill', installCmd: 'npx skills add https://github.com/bitget-wallet-ai-lab/bitget-wallet-skill' },
  'coinbase': { stars: 87, lastUpdated: '2026-03-29', url: 'https://github.com/coinbase/agentic-wallet-skills', installCmd: 'npx skills add https://github.com/coinbase/agentic-wallet-skills' },
  'bankr': { stars: 1037, lastUpdated: '2026-03-29', url: 'https://github.com/BankrBot/skills', installCmd: 'npx skills add https://github.com/BankrBot/skills' },
  'phantom-connect': { stars: 38, lastUpdated: '2026-03-27', url: 'https://github.com/DFlowProtocol/dflow_phantom-connect-skill', installCmd: 'npx skills add https://github.com/DFlowProtocol/dflow_phantom-connect-skill' },
  'almanak': { stars: 50, lastUpdated: '2026-03-29', url: 'https://github.com/almanak-co/sdk', installCmd: 'npx skills add https://github.com/almanak-co/sdk' },
  'byreal-cli': { stars: 19, lastUpdated: '2026-03-26', url: 'https://github.com/byreal-git/byreal-cli', installCmd: 'npx skills add https://github.com/byreal-git/byreal-cli' },
  'lista-dao': { stars: null, lastUpdated: null, url: '', installCmd: 'npx skills add lista-dao/lista-skills' },
  'uniswap-ai': { stars: 193, lastUpdated: '2026-03-29', url: 'https://github.com/Uniswap/uniswap-ai', installCmd: 'npx skills add https://github.com/Uniswap/uniswap-ai' },
  'bnb-chain-mcp': { stars: 59, lastUpdated: '2026-03-28', url: 'https://github.com/bnb-chain/bnbchain-skills', installCmd: 'npx skills add https://github.com/bnb-chain/bnbchain-skills' },
  'bnb-chain': { stars: 59, lastUpdated: '2026-03-28', url: 'https://github.com/bnb-chain/bnbchain-skills', installCmd: 'npx skills add https://github.com/bnb-chain/bnbchain-skills' },
  'four-meme': { stars: 12, lastUpdated: '2026-03-25', url: 'https://github.com/four-meme-community/four-meme-ai', installCmd: 'npx skills add https://github.com/four-meme-community/four-meme-ai' },
  'minara-ai-v2': { stars: 40, lastUpdated: '2026-03-29', url: 'https://github.com/Minara-AI/skills', installCmd: 'clawhub install minara' },
  'coinank-api': { stars: 28, lastUpdated: '2026-03-18', url: 'https://github.com/coinank/coinank-openapi-skill', installCmd: 'npx skills add https://github.com/coinank/coinank-openapi-skill' },
  'coinmarketcap': { stars: 39, lastUpdated: '2026-03-28', url: 'https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap', installCmd: 'npx skills add https://github.com/coinmarketcap-official/skills-for-ai-agents-by-CoinMarketCap' },
  'dune': { stars: null, lastUpdated: null },
  'nansen': { stars: null, lastUpdated: null },
  'blockbeats': { stars: 5, lastUpdated: '2026-03-29', url: 'https://github.com/BlockBeatsOfficial/blockbeats-skill', installCmd: 'npx skills add https://github.com/BlockBeatsOfficial/blockbeats-skill' },
  'blockbeats-skill': { stars: 5, lastUpdated: '2026-03-29' },
  '6551-news': { stars: null, lastUpdated: null },
  'xclaw': { stars: 6, lastUpdated: '2026-03-25', url: 'https://github.com/mookim-eth/xclaw-skill', installCmd: 'npx skills add https://github.com/mookim-eth/xclaw-skill' },
  'x-research': { stars: 1017, lastUpdated: '2026-03-29', url: 'https://github.com/rohunvora/x-research-skill' },
  'x-research-skill': { stars: 1017, lastUpdated: '2026-03-29' },
  'goplus-agentguard': { stars: 382, lastUpdated: '2026-03-28', url: 'https://github.com/GoPlusSecurity/agentguard', installCmd: 'clawhub install agentguard' },
  'slowmist': { stars: 283, lastUpdated: '2026-03-29', url: 'https://github.com/slowmist/slowmist-agent-security', installCmd: 'clawhub install slowmist-agent-security' },
  'skill-vetter': { stars: null, lastUpdated: null },
  'day1global': { stars: 648, lastUpdated: '2026-03-29', url: 'https://github.com/star23/Day1Global-Skills', installCmd: 'npx skills add https://github.com/star23/Day1Global-Skills' },
  'find-skills': { stars: null, lastUpdated: null },
  'superpowers': { stars: 122712, lastUpdated: '2026-03-29' },
  'frontend-design': { stars: 105673, lastUpdated: '2026-03-29' },
  'web-design-guidelines': { stars: 24062, lastUpdated: '2026-03-29' },
  'react-best-practices': { stars: 24062, lastUpdated: '2026-03-29' },
  'remotion-best-practices': { stars: 3562, lastUpdated: '2026-03-29' },
};

// ============================================================
// 2. Examples and suitableFor data (from 素材庫)
// ============================================================
const contentData = {
  'binance': {
    examples: ['查詢 BTC 排名和最新價格', '檢查地址 0x1234... 的風險', '有哪些新 Meme 代幣在 Binance 上熱度飆升？', '給我 SOL 的交易信號分析', '審計一下這個合約是否安全'],
    examplesEn: ['Check BTC ranking and latest price', 'Check risk for address 0x1234...', 'Any new meme tokens trending on Binance?', 'Give me trading signal analysis for SOL', 'Audit this contract for safety'],
    suitableFor: '幣安用戶、想快速查行情和代幣安全的人',
    suitableForEn: 'Binance users who want quick market data and token safety checks',
    isOfficial: true
  },
  'htx': {
    examples: ['查詢 ETH 現在的價格和 24h 漲跌', '幫我在 HTX 上買入 100 USDT 的 BTC', '查看我的 HTX 帳戶資產'],
    examplesEn: ['Check ETH current price and 24h change', 'Buy 100 USDT worth of BTC on HTX', 'View my HTX account assets'],
    suitableFor: '火幣用戶',
    suitableForEn: 'HTX (Huobi) users',
    isOfficial: true
  },
  'okx': {
    examples: ['顯示我所有鏈上的資產分佈', '用最優路徑把 ETH 換成 USDC', '把 100 USDC 從 Ethereum 跨鏈到 Arbitrum', '這個月我鏈上一共花了多少 Gas？'],
    examplesEn: ['Show my asset distribution across all chains', 'Swap ETH to USDC via optimal route', 'Bridge 100 USDC from Ethereum to Arbitrum', 'How much gas did I spend on-chain this month?'],
    suitableFor: '多鏈用戶、OKX Web3 錢包用戶',
    suitableForEn: 'Multi-chain users, OKX Web3 wallet users',
    isOfficial: true
  },
  'gate-skills': {
    examples: ['查看我的 Gate 現貨持倉', '今天 BTC 的市場情緒如何？', '查看這個地址的交易記錄：0x123...', 'Gate 上哪個理財產品 APY 最高？'],
    examplesEn: ['View my Gate spot holdings', 'What is the market sentiment for BTC today?', 'Check transaction history for address 0x123...', 'Which Gate savings product has the highest APY?'],
    suitableFor: 'Gate 用戶',
    suitableForEn: 'Gate exchange users',
    isOfficial: true
  },
  'bitget-wallet': {
    examples: ['查詢 Solana 上某個代幣的詳細資訊', '驗證這個合約地址是否安全', '追蹤過去 24 小時的巨鯨大額轉帳', '分析 BTC 日 K 線走勢', '掃描可用的跨鏈套利機會'],
    examplesEn: ['Check detailed info for a token on Solana', 'Verify if this contract address is safe', 'Track whale transfers in the past 24 hours', 'Analyze BTC daily K-line trend', 'Scan available cross-chain arbitrage opportunities'],
    suitableFor: '需要多鏈工具 + 安全審計的用戶',
    suitableForEn: 'Users who need multi-chain tools and security auditing',
    isOfficial: false
  },
  'coinbase': {
    examples: ['查看代理錢包的餘額和交易記錄', '設定代理自動執行鏈上交易', '通過 x402 標準完成一筆代理支付'],
    examplesEn: ['Check agent wallet balance and transaction history', 'Set up agent to auto-execute on-chain transactions', 'Complete an agent payment via x402 standard'],
    suitableFor: '開發者、想讓 AI Agent 自主管理資金的進階用戶',
    suitableForEn: 'Developers and advanced users who want AI agents to manage funds autonomously',
    isOfficial: true
  },
  'bankr': {
    examples: ['在 Aave 上存入 1 ETH 並借出 USDC', '查看 vitalik.eth 的 ENS 資訊', '給我的 Agent 註冊一個 ERC-8004 鏈上身份', '查看我所有的 DeFi 倉位狀態'],
    examplesEn: ['Deposit 1 ETH on Aave and borrow USDC', 'Check ENS info for vitalik.eth', 'Register an ERC-8004 on-chain identity for my Agent', 'View all my DeFi position statuses'],
    suitableFor: 'DeFi 用戶、想給 Agent 建立鏈上身份的人',
    suitableForEn: 'DeFi users and those who want to establish on-chain identities for their agents'
  },
  'phantom-connect': {
    examples: ['連接我的 Phantom 錢包查看餘額', '在 Solana 上把 10 SOL 換成 USDC', '幫我創建一個帶錢包連接和兌換功能的 Solana 應用'],
    examplesEn: ['Connect my Phantom wallet and check balance', 'Swap 10 SOL to USDC on Solana', 'Create a Solana app with wallet connect and swap features'],
    suitableFor: 'Solana 開發者',
    suitableForEn: 'Solana developers'
  },
  'almanak': {
    examples: ['構建一個 ETH-USDC 的網格交易策略', '回測這個策略在過去 3 個月的表現', '在 Aave 上借出 USDC 同時在 Hyperliquid 做多 ETH', '查看當前所有運行中策略的 PnL', '分析這個策略的最大回撤和夏普比率'],
    examplesEn: ['Build an ETH-USDC grid trading strategy', 'Backtest this strategy over the past 3 months', 'Lend USDC on Aave while going long ETH on Hyperliquid', 'View PnL for all running strategies', 'Analyze max drawdown and Sharpe ratio for this strategy'],
    suitableFor: 'DeFi 進階用戶、量化交易者',
    suitableForEn: 'Advanced DeFi users and quantitative traders'
  },
  'byreal-cli': {
    examples: ['找出 SOL 池中 APR 最高的', '分析這個池的收益和風險', '在這個池開一個集中流動性倉位', '領取我所有 CLMM 倉位的獎勵', '把 USDC 換成 SOL'],
    examplesEn: ['Find the highest APR SOL pool', 'Analyze yield and risk for this pool', 'Open a concentrated liquidity position in this pool', 'Claim rewards from all my CLMM positions', 'Swap USDC to SOL'],
    suitableFor: 'LP（流動性提供者）、DeFi 農夫',
    suitableForEn: 'Liquidity providers (LPs) and DeFi farmers'
  },
  'lista-dao': {
    examples: ['Lista 現在 BNB 質押的 APR 是多少？', 'lisUSD 的借款利率和抵押要求是什麼？', 'Lista DAO 目前的 TVL 是多少？', '有哪些 slisBNB 收益策略可用？'],
    examplesEn: ['What is the current BNB staking APR on Lista?', 'What are the borrowing rates and collateral requirements for lisUSD?', 'What is Lista DAO current TVL?', 'What slisBNB yield strategies are available?'],
    suitableFor: 'BNB 生態用戶、想做流動性質押的人',
    suitableForEn: 'BNB ecosystem users who want liquid staking',
    warning: 'GitHub link 待確認'
  },
  'uniswap-ai': {
    examples: ['在 Uniswap 上把 1 ETH 換成 USDC', '查詢 ETH/USDC 的當前價格', '查看我在 Uniswap 上的流動性倉位', '找到 WBTC 到 DAI 的最優路徑', '幫我部署一個 CCA 智能合約'],
    examplesEn: ['Swap 1 ETH to USDC on Uniswap', 'Check current ETH/USDC price', 'View my liquidity positions on Uniswap', 'Find optimal route from WBTC to DAI', 'Deploy a CCA smart contract for me'],
    suitableFor: 'DeFi 用戶、Uniswap 流動性提供者',
    suitableForEn: 'DeFi users and Uniswap liquidity providers'
  },
  'bnb-chain-mcp': {
    examples: ['查詢這個地址在 BSC 上的代幣餘額', '當前 BSC 的 Gas 費用是多少？', '分析這個 BEP-20 代幣的持倉集中度', '在 BSC 上發起一筆轉帳'],
    examplesEn: ['Check token balance for this address on BSC', 'What are the current BSC gas fees?', 'Analyze holder concentration for this BEP-20 token', 'Initiate a transfer on BSC'],
    suitableFor: 'BNB Chain 用戶',
    suitableForEn: 'BNB Chain users'
  },
  'bnb-chain': {
    examples: ['查詢這個地址在 BSC 上的代幣餘額', '當前 BSC 的 Gas 費用是多少？', '分析這個 BEP-20 代幣的持倉集中度', '在 BSC 上發起一筆轉帳'],
    examplesEn: ['Check token balance for this address on BSC', 'What are the current BSC gas fees?', 'Analyze holder concentration for this BEP-20 token', 'Initiate a transfer on BSC'],
    suitableFor: 'BNB Chain 用戶',
    suitableForEn: 'BNB Chain users'
  },
  'four-meme': {
    examples: ['現在最火的 Meme 幣有哪些？', '過去 24 小時有哪些新 Meme 代幣上線？', '分析這個 Meme 幣的持倉集中度', '幫我找有潛力的早期 Meme 代幣'],
    examplesEn: ['What are the hottest meme coins right now?', 'What new meme tokens launched in the past 24 hours?', 'Analyze holder concentration for this meme coin', 'Find promising early-stage meme tokens for me'],
    suitableFor: 'Meme 玩家、淘金者',
    suitableForEn: 'Meme coin players and early-stage hunters'
  },
  'minara-ai-v2': {
    examples: ['查看我的錢包餘額', '把 100 USDC 換成 ETH', '在 Hyperliquid 上做多 BTC，5 倍槓桿', '搜尋 SOL 的最新市場數據和分析', '查看 NVDA 的機構級市場洞察', '分析 Polymarket 上最熱門的預測市場'],
    examplesEn: ['Check my wallet balance', 'Swap 100 USDC to ETH', 'Go long BTC on Hyperliquid with 5x leverage', 'Search latest market data and analysis for SOL', 'View institutional-level market insights for NVDA', 'Analyze the hottest prediction markets on Polymarket'],
    suitableFor: '想要一站式交易體驗的人（crypto + 美股 + 預測市場）',
    suitableForEn: 'Users who want an all-in-one trading experience (crypto + stocks + prediction markets)'
  },
  'coinank-api': {
    examples: ['查詢 BTC 的多空比', '過去 24 小時全網爆倉了多少？', 'HyperLiquid 巨鯨最近在做什麼？', '今天 BTC ETF 資金流入了多少？', '幫我監控 ETH 資金費率，超過 0.05% 通知我', 'BTC 訂單流現在什麼情況？'],
    examplesEn: ['Check BTC long/short ratio', 'How much was liquidated across exchanges in 24h?', 'What are HyperLiquid whales doing recently?', 'How much BTC ETF inflow today?', 'Monitor ETH funding rate and alert me above 0.05%', 'What is the current BTC order flow?'],
    suitableFor: '交易者、數據分析師',
    suitableForEn: 'Traders and data analysts'
  },
  'dune': {
    examples: ['有哪些關於 Uniswap 的數據表？', '查詢過去 7 天 ETH 的日交易量', '分析一下這個查詢結果的趨勢', '把這個數據做成折線圖', '優化一下這條查詢的性能'],
    examplesEn: ['What Uniswap-related data tables are available?', 'Query daily ETH trading volume for the past 7 days', 'Analyze the trend from this query result', 'Create a line chart from this data', 'Optimize the performance of this query'],
    suitableFor: '鏈上數據分析師、研究員',
    suitableForEn: 'On-chain data analysts and researchers'
  },
  'nansen': {
    examples: ['最近有哪些聰明錢在買什麼？', '搜尋 PEPE 的 Nansen 鏈上數據', '追蹤最近被 Nansen 標記的聰明錢地址操作', '分析這個代幣的聰明錢持倉變化趨勢'],
    examplesEn: ['What are smart money wallets buying recently?', 'Search Nansen on-chain data for PEPE', 'Track recent operations of Nansen-labeled smart money addresses', 'Analyze smart money holding trends for this token'],
    suitableFor: '想跟蹤機構/鯨魚的人',
    suitableForEn: 'Users who want to track institutional and whale activity'
  },
  'coinmarketcap': {
    examples: ['BTC 現在多少錢？', '市值前 10 的代幣今天漲跌如何？', 'SOL 的流通量和總供應量是多少？', '今天的加密恐懼貪婪指數是多少？', '對比 SOL 和 AVAX 哪個市值更大？'],
    examplesEn: ['What is BTC current price?', 'How are the top 10 market cap tokens performing today?', 'What is SOL circulating supply and total supply?', 'What is the crypto Fear & Greed index today?', 'Compare SOL vs AVAX market cap'],
    suitableFor: '所有人，基礎市場數據查詢',
    suitableForEn: 'Everyone — basic market data queries'
  },
  'blockbeats': {
    examples: ['獲取今天的 BlockBeats 精選快訊', '查找最新的 DeFi 賽道深度研報', '追蹤今天巨鯨的大額操作', '分析 PolyBeats 上最新的內幕地址信號', '匯總過去 24h 加密市場最重要的 10 條新聞'],
    examplesEn: ['Get today BlockBeats news highlights', 'Find latest DeFi deep research reports', 'Track today whale large operations', 'Analyze latest insider address signals on PolyBeats', 'Summarize top 10 crypto news in past 24h'],
    suitableFor: '想一站式掌握市場動態的人',
    suitableForEn: 'Users who want one-stop market updates'
  },
  'blockbeats-skill': {
    examples: ['獲取今天的 BlockBeats 精選快訊', '查找最新的 DeFi 賽道深度研報', '追蹤今天巨鯨的大額操作', '匯總過去 24h 加密市場最重要的 10 條新聞'],
    examplesEn: ['Get today BlockBeats news highlights', 'Find latest DeFi deep research reports', 'Track today whale large operations', 'Summarize top 10 crypto news in past 24h'],
    suitableFor: '想一站式掌握市場動態的人',
    suitableForEn: 'Users who want one-stop market updates'
  },
  '6551-news': {
    examples: ['獲取過去 1 小時的加密新聞摘要', '追蹤 @VitalikButerin 今天的所有推文', '持續監控 BTC 相關新聞，有重大消息通過 TG 提醒我', '匯總今天所有關於 Solana 的新聞和 X 討論', '分析過去 24h 加密市場最熱的 5 個話題'],
    examplesEn: ['Get crypto news summary for the past 1 hour', 'Track all of @VitalikButerin tweets today', 'Monitor BTC news continuously and alert me via TG for major events', 'Summarize all Solana news and X discussions today', 'Analyze top 5 hottest topics in crypto over 24h'],
    suitableFor: '需要即時情報 + 自動通知的人',
    suitableForEn: 'Users who need real-time intel and auto notifications'
  },
  'xclaw': {
    examples: ['用 XClaw 搜索 BTC 相關的最新熱門推文', '監控 @vitalikbuterin 的最新動態', '分析 #Solana 話題下的市場情緒', '今天 X 上加密領域討論最多的敘事是什麼？', '匯總過去 6 小時 @binance 官方帳號的所有推文'],
    examplesEn: ['Search latest hot tweets about BTC using XClaw', 'Monitor @vitalikbuterin latest updates', 'Analyze market sentiment for #Solana topic', 'What narratives are most discussed in crypto on X today?', 'Summarize all tweets from @binance official in the past 6 hours'],
    suitableFor: '重度 X/Twitter 用戶',
    suitableForEn: 'Heavy X/Twitter users'
  },
  'x-research': {
    examples: ['搜索最近關於 ETH ETF 的熱門推文', '查看 @frankdegods 最近發的推文', '找出過去 24h 關於 BTC 互動量最高的 10 條推文', '監控這幾個 KOL 今天發了什麼', '搜索關於 Solana 的推文，按轉發量排序'],
    examplesEn: ['Search trending tweets about ETH ETF', 'Check @frankdegods recent tweets', 'Find top 10 BTC tweets by engagement in past 24h', 'Monitor what these KOLs posted today', 'Search Solana tweets sorted by retweets'],
    suitableFor: 'X/Twitter 研究者、KOL 追蹤者',
    suitableForEn: 'X/Twitter researchers and KOL trackers'
  },
  'x-research-skill': {
    examples: ['搜索最近關於 ETH ETF 的熱門推文', '查看 @frankdegods 最近發的推文', '找出過去 24h 關於 BTC 互動量最高的 10 條推文'],
    examplesEn: ['Search trending tweets about ETH ETF', 'Check @frankdegods recent tweets', 'Find top 10 BTC tweets by engagement in past 24h'],
    suitableFor: 'X/Twitter 研究者、KOL 追蹤者',
    suitableForEn: 'X/Twitter researchers and KOL trackers'
  },
  'goplus-agentguard': {
    examples: ['掃描我已安裝的所有 Skills 有沒有安全問題', '檢查一下我的環境有沒有潛在隱患', '查看最近的安全審計日誌', '在執行這個操作之前先做安全評估'],
    examplesEn: ['Scan all my installed Skills for security issues', 'Check my environment for potential risks', 'View recent security audit logs', 'Run a security assessment before executing this action'],
    suitableFor: '所有人！這是保護你資產安全的第一道防線',
    suitableForEn: 'Everyone! This is the first line of defense for your asset security',
    isEssential: true
  },
  'slowmist': {
    examples: ['檢測這個 GitHub 倉庫的 Skill 有沒有投毒風險', '驗證這個錢包地址是否安全', '檢查這個連結是不是釣魚網站', '分析這個倉庫的代碼有沒有後門', '掃描我最近安裝的 Skills 有沒有問題'],
    examplesEn: ['Detect if this GitHub repo Skill has poisoning risk', 'Verify if this wallet address is safe', 'Check if this link is a phishing site', 'Analyze this repo code for backdoors', 'Scan my recently installed Skills for issues'],
    suitableFor: '注重安全的用戶',
    suitableForEn: 'Security-conscious users'
  },
  'skill-vetter': {
    examples: ['在安裝這個 Skill 之前，幫我審計一下', '檢查我已安裝的所有 Skill 的權限請求', '這個 Skill 有沒有潛在的安全風險？', '掃描這個 Skill 的依賴項有沒有已知漏洞', '給這個 Skill 的安全性打個綜合評分'],
    examplesEn: ['Audit this Skill before I install it', 'Check permission requests for all my installed Skills', 'Does this Skill have potential security risks?', 'Scan this Skill dependencies for known vulnerabilities', 'Give a comprehensive security score for this Skill'],
    suitableFor: '安裝新 Skill 之前想確認安全的人',
    suitableForEn: 'Users who want to verify security before installing new Skills',
    warning: '原 GitHub repo 已失效，安全性待確認'
  },
  'day1global': {
    examples: ['分析 AAPL 最新一季財報', '用巴菲特的視角評估 MSFT 的投資價值', '對 NVDA 做一個完整的多方法估值分析', '從 Druckenmiller 宏觀視角分析當前科技股的機會', '幫我檢查 TSLA 財報中的會計品質問題'],
    examplesEn: ['Analyze AAPL latest quarterly earnings', 'Evaluate MSFT investment value from Buffett perspective', 'Run a complete multi-method valuation analysis on NVDA', 'Analyze current tech stock opportunities from Druckenmiller macro view', 'Check TSLA earnings for accounting quality issues'],
    suitableFor: '美股投資者、財報分析愛好者',
    suitableForEn: 'US stock investors and earnings analysis enthusiasts'
  },
  'find-skills': {
    examples: ['我想查 BTC 的價格，有什麼 Skill 可以用？', '幫我找一個做影片的 Skill', '有沒有可以幫我寫前端的 Skill？', '推薦一些安全相關的 Skill', '搜尋跟 DeFi 相關的 Skill'],
    examplesEn: ['I want to check BTC price, what Skills can I use?', 'Find me a Skill for making videos', 'Any Skills that can help me write frontend?', 'Recommend some security-related Skills', 'Search for DeFi-related Skills'],
    suitableFor: '所有人！不知道要裝什麼就先裝這個',
    suitableForEn: 'Everyone! Install this first if you don\'t know what to get',
    isEssential: true
  },
  'frontend-design': {
    examples: ['幫我做一個 landing page，要有設計感', '把這個表單重新設計，要好看', '用 brutalist 風格做一個作品集頁面', '設計一個深色主題的 dashboard', '這個 UI 太像 AI 生成的，幫我改得更有個性'],
    examplesEn: ['Create a landing page with great design', 'Redesign this form to look better', 'Make a portfolio page in brutalist style', 'Design a dark theme dashboard', 'This UI looks too AI-generated, make it more unique'],
    suitableFor: '做網站的人、想要 AI 寫出好看前端的人',
    suitableForEn: 'Web developers who want AI to produce beautiful frontends'
  },
  'web-design-guidelines': {
    examples: ['審查我的 UI 有沒有設計問題', '檢查我的網站的無障礙性', '對照 Web Interface Guidelines 看我的設計'],
    examplesEn: ['Review my UI for design issues', 'Check my website accessibility', 'Compare my design against Web Interface Guidelines'],
    suitableFor: '前端開發者、UI/UX 設計師',
    suitableForEn: 'Frontend developers and UI/UX designers'
  },
  'react-best-practices': {
    examples: ['檢查我的 React 組件有沒有性能問題', '這個 component 寫法符合 best practices 嗎？', '幫我重構這個 React 組件', '我的 useEffect 用法對嗎？', '這個 state 管理方式有什麼問題？'],
    examplesEn: ['Check my React component for performance issues', 'Does this component follow best practices?', 'Help me refactor this React component', 'Is my useEffect usage correct?', 'What is wrong with this state management approach?'],
    suitableFor: 'React 開發者',
    suitableForEn: 'React developers'
  },
  'remotion-best-practices': {
    examples: ['幫我做一個 30 秒的產品介紹影片', '用數據做一個動畫圖表影片', '做一個 TikTok 風格的字幕動畫'],
    examplesEn: ['Create a 30-second product intro video', 'Make an animated data chart video', 'Create TikTok-style caption animation'],
    suitableFor: '內容創作者、想用 AI 做影片的人',
    suitableForEn: 'Content creators who want to make videos with AI'
  },
  'superpowers': {
    examples: ['幫我設計一個新功能（先 brainstorm，不要直接寫代碼）', '用 TDD 方式開發這個功能', '在 git worktree 裡開一個乾淨的分支來做這個', '幫我做 code review', '用設計先行的方式規劃這個重構'],
    examplesEn: ['Help me design a new feature (brainstorm first, don\'t jump to code)', 'Develop this feature using TDD', 'Start a clean branch in git worktree for this', 'Help me do a code review', 'Plan this refactor with a design-first approach'],
    suitableFor: '軟體工程師、想要結構化 AI 開發流程的人',
    suitableForEn: 'Software engineers who want structured AI development workflows'
  },
};

// ============================================================
// 3. New skills to add (from 素材庫, not in current skills.json)
// ============================================================
const newSkills = [
  {
    id: 'xxyy-trade',
    name: 'XXYY Trade',
    nameZh: 'XXYY Trade',
    description: 'Natural language trading on Solana, ETH, BSC, and Base chains.',
    descriptionZh: '自然語言交易 Solana/ETH/BSC/Base 代幣。',
    category: 'onchain',
    tags: ['trading', 'defi', 'solana'],
    tagsZh: ['交易', 'DeFi', 'Solana'],
    icon: '🔄',
    url: 'https://github.com/Jimmy-Holiday/xxyy-trade-skill',
    isFree: true,
    installCmd: 'npx skills add Jimmy-Holiday/xxyy-trade-skill',
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: '需要設定 XXYY API Key，API Key 直接關聯錢包資金，務必妥善保管',
    features: [
      { name: '自然語言交易', nameEn: 'Natural Language Trading', desc: '用自然語言在多鏈上買賣代幣', descEn: 'Buy and sell tokens across chains using natural language' },
      { name: '多鏈支持', nameEn: 'Multi-chain Support', desc: '支持 Solana、ETH、BSC、Base', descEn: 'Supports Solana, ETH, BSC, Base' }
    ],
    installNote: '需要設定 XXYY API Key（export XXYY_API_KEY=...），API Key 直接關聯錢包資金。',
    examples: ['在 Solana 上用 0.05 SOL 買入 BONK', '查看我在 BSC 上的持倉', '把 ETH 鏈上的 PEPE 全部賣出', 'XXYY 支持哪些鏈？'],
    examplesEn: ['Buy BONK with 0.05 SOL on Solana', 'Check my holdings on BSC', 'Sell all PEPE on ETH chain', 'What chains does XXYY support?'],
    suitableFor: '想用自然語言直接交易的人',
    suitableForEn: 'Users who want to trade using natural language',
    isEssential: false,
    stars: 32,
    lastUpdated: '2026-03-29'
  },
  {
    id: 'oh-my-claudecode',
    name: 'oh-my-claudecode',
    nameZh: 'oh-my-claudecode',
    description: 'Teams-first multi-agent orchestration for Claude Code — 32 professional agents, Autopilot/Team/Ultrapilot modes, 3-5x acceleration.',
    descriptionZh: '把 Claude Code 升級為多智能體系統 — 32 個專業 Agent、Autopilot/Team/Ultrapilot 模式、3-5x 加速。',
    category: 'multiagent',
    tags: ['multi-agent', 'orchestration', 'acceleration'],
    tagsZh: ['多智能體', '編排', '加速'],
    icon: '🚀',
    url: 'https://github.com/Yeachan-Heo/oh-my-claudecode',
    isFree: true,
    installCmd: 'npm install -g oh-my-claudecode',
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: 'Autopilot 模式', nameEn: 'Autopilot Mode', desc: '全自動拆解任務並平行執行', descEn: 'Fully automatic task decomposition and parallel execution' },
      { name: 'Team 模式', nameEn: 'Team Mode', desc: '多個 Agent 分工協作', descEn: 'Multiple agents collaborating on tasks' },
      { name: 'Ultrapilot 模式', nameEn: 'Ultrapilot Mode', desc: '5 個 Agent 超平行執行', descEn: '5 agents ultra-parallel execution' },
      { name: '32 專業 Agent', nameEn: '32 Professional Agents', desc: '涵蓋架構、測試、文檔等專業領域', descEn: 'Covering architecture, testing, documentation and more' }
    ],
    installNote: '使用 npm 全局安裝。需要 Claude Code 已安裝。',
    examples: ['用 autopilot 模式幫我建一個完整的 SaaS 後端', '用 team 模式，一個 agent 寫架構、一個寫測試、一個寫文檔', '用 ultrapilot 模式，5 個 agent 並行重構這個項目'],
    examplesEn: ['Build a complete SaaS backend in autopilot mode', 'Use team mode: one agent for architecture, one for tests, one for docs', 'Use ultrapilot mode with 5 agents to refactor this project in parallel'],
    suitableFor: '進階開發者、想讓 CC 並行工作的人',
    suitableForEn: 'Advanced developers who want Claude Code to work in parallel',
    isEssential: false,
    stars: 15976,
    lastUpdated: '2026-03-29'
  },
  {
    id: 'last30days-skill',
    name: 'Last 30 Days',
    nameZh: 'Last 30 Days 跨平台研究',
    description: 'Cross-platform research skill — searches Reddit, X, YouTube, HN, Polymarket, and the web, then synthesizes a grounded summary.',
    descriptionZh: '跨平台研究 skill — 搜索 Reddit、X、YouTube、Hacker News、Polymarket、網頁，整合成報告。',
    category: 'productivity',
    tags: ['research', 'cross-platform', 'summary'],
    tagsZh: ['研究', '跨平台', '摘要'],
    icon: '🔬',
    url: 'https://github.com/mvanhorn/last30days-skill',
    isFree: true,
    installCmd: 'npx skills add mvanhorn/last30days-skill',
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '跨平台搜索', nameEn: 'Cross-platform Search', desc: '同時搜索 Reddit、X、YouTube、HN、Polymarket', descEn: 'Simultaneously search Reddit, X, YouTube, HN, Polymarket' },
      { name: '報告整合', nameEn: 'Report Synthesis', desc: '將多平台數據整合成結構化報告', descEn: 'Synthesize multi-platform data into structured reports' }
    ],
    installNote: '使用 npx 安裝。無需額外配置。',
    examples: ['研究一下「AI agent trading」最近 30 天在各平台的討論', '幫我追蹤 Polymarket 上最熱門的話題', '整理最近 Reddit 和 HN 上關於 Claude Code 的討論'],
    examplesEn: ['Research "AI agent trading" discussions across platforms in the past 30 days', 'Track the hottest topics on Polymarket', 'Summarize recent Reddit and HN discussions about Claude Code'],
    suitableFor: '研究員、內容創作者、想快速掌握趨勢的人',
    suitableForEn: 'Researchers, content creators, and trend watchers',
    isEssential: false,
    stars: 15214,
    lastUpdated: '2026-03-29'
  },
  {
    id: 'mailclaw',
    name: 'MailClaw',
    nameZh: 'MailClaw 自托管郵箱',
    description: 'Self-hosted email inbox on Cloudflare Workers with AI agent skill — receive, search, and read emails directly from Claude Code.',
    descriptionZh: '基於 Cloudflare Workers 的自托管郵箱，AI Agent 可直接收郵件、搜郵件、讀郵件。',
    category: 'productivity',
    tags: ['email', 'self-hosted', 'cloudflare'],
    tagsZh: ['郵件', '自托管', 'Cloudflare'],
    icon: '📧',
    url: 'https://github.com/missuo/mailclaw',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '郵件接收', nameEn: 'Email Receiving', desc: '接收域名下所有郵件存到 D1', descEn: 'Receive all emails for your domain and store in D1' },
      { name: '郵件搜索', nameEn: 'Email Search', desc: '全文搜索郵件內容', descEn: 'Full-text search across email content' },
      { name: 'AI Agent Skill', nameEn: 'AI Agent Skill', desc: 'Claude Code / OpenClaw 可直接操作郵件', descEn: 'Claude Code / OpenClaw can directly manage emails' }
    ],
    installNote: '需要自己的域名和 Cloudflare 帳號。完全自托管，隱私性高。',
    examples: ['看看最近的郵件', '搜尋所有來自 github.com 的郵件', '幫我讀一下最新的那封確認信', '有沒有收到 API key 的郵件？', '把最近三天的重要郵件整理成摘要'],
    examplesEn: ['Check my recent emails', 'Search all emails from github.com', 'Read the latest confirmation email for me', 'Did I receive any API key emails?', 'Summarize important emails from the past 3 days'],
    suitableFor: '有自己域名的開發者、想讓 AI 管郵件的人',
    suitableForEn: 'Developers with their own domain who want AI to manage emails',
    isEssential: false,
    stars: 33,
    lastUpdated: '2026-03-28'
  },
  {
    id: 'unusual-whales',
    name: 'Unusual Whales MCP',
    nameZh: 'Unusual Whales MCP',
    description: 'Real-time structured data for options, stocks, and prediction markets — fed directly to Claude.',
    descriptionZh: '期權、股票、預測市場即時結構化數據，直接餵 Claude。',
    category: 'trading',
    tags: ['options', 'stocks', 'prediction-markets'],
    tagsZh: ['期權', '股票', '預測市場'],
    icon: '🐋',
    url: 'https://github.com/unusual-whales/unusual-whales-official-mcp',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '官方',
    isOfficial: true,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '期權異動', nameEn: 'Options Flow', desc: '追蹤大額期權異動', descEn: 'Track unusual options activity' },
      { name: '股票數據', nameEn: 'Stock Data', desc: '即時股票市場數據', descEn: 'Real-time stock market data' },
      { name: '預測市場', nameEn: 'Prediction Markets', desc: 'Polymarket 等預測市場數據', descEn: 'Prediction market data from Polymarket and more' }
    ],
    installNote: '需要 Unusual Whales API 存取權限。',
    examples: ['查看今天最大的期權異動', 'NVDA 的 unusual options activity 是什麼？', 'Polymarket 上最熱門的預測事件'],
    examplesEn: ['Check the biggest options flow today', 'What is NVDA unusual options activity?', 'What are the hottest prediction events on Polymarket?'],
    suitableFor: '期權交易者、金融分析師',
    suitableForEn: 'Options traders and financial analysts',
    isEssential: false,
    stars: 29,
    lastUpdated: '2026-03-28'
  },
  {
    id: 'llm-sast-scanner',
    name: 'LLM SAST Scanner',
    nameZh: 'LLM SAST Scanner',
    description: 'LLM-driven SAST skill for structured vulnerability detection across 34 vulnerability classes.',
    descriptionZh: 'LLM 驅動的代碼安全掃描，覆蓋 34 種漏洞類型。',
    category: 'security',
    tags: ['sast', 'vulnerability', 'code-security'],
    tagsZh: ['靜態分析', '漏洞', '代碼安全'],
    icon: '🔒',
    url: 'https://github.com/SunWeb3Sec/llm-sast-scanner',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '漏洞掃描', nameEn: 'Vulnerability Scanning', desc: '覆蓋 34 種漏洞類型的靜態分析', descEn: 'Static analysis covering 34 vulnerability classes' },
      { name: 'AI 驅動', nameEn: 'AI-Driven', desc: '用 LLM 增強漏洞檢測準確性', descEn: 'LLM-enhanced vulnerability detection accuracy' }
    ],
    installNote: '安裝後可直接對代碼庫進行安全掃描。',
    examples: ['掃描這個代碼庫有沒有安全漏洞', '檢查這個 API 有沒有注入風險', '分析這個智能合約的安全性'],
    examplesEn: ['Scan this codebase for security vulnerabilities', 'Check this API for injection risks', 'Analyze the security of this smart contract'],
    suitableFor: '安全研究員、開發者',
    suitableForEn: 'Security researchers and developers',
    isEssential: false,
    stars: 75,
    lastUpdated: '2026-03-29'
  },
  {
    id: 'visual-explainer',
    name: 'Visual Explainer',
    nameZh: 'Visual Explainer',
    description: 'Generate rich HTML pages or slide decks for diagrams, diff reviews, data tables, and project recaps.',
    descriptionZh: '將複雜概念轉換為精美 HTML 頁面 — 圖表、Mermaid 流程圖、數據表格、投影片。',
    category: 'devtools',
    tags: ['visualization', 'diagrams', 'slides', 'html'],
    tagsZh: ['視覺化', '圖表', '投影片', 'HTML'],
    icon: '📊',
    url: 'https://github.com/nicobailon/visual-explainer',
    isFree: true,
    installCmd: 'git clone https://github.com/nicobailon/visual-explainer.git ~/.claude/skills/visual-explainer',
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '架構圖', nameEn: 'Architecture Diagrams', desc: '自動生成系統架構圖', descEn: 'Auto-generate system architecture diagrams' },
      { name: 'Mermaid 流程圖', nameEn: 'Mermaid Flowcharts', desc: '用 Mermaid 語法產生流程圖', descEn: 'Generate flowcharts using Mermaid syntax' },
      { name: '投影片生成', nameEn: 'Slide Generation', desc: '將內容轉成簡報投影片', descEn: 'Convert content into presentation slides' },
      { name: '主題切換', nameEn: 'Theme Toggle', desc: '支持 dark/light 主題', descEn: 'Supports dark/light themes' }
    ],
    installNote: '用 git clone 安裝到 skills 目錄即可使用。',
    examples: ['畫一個系統架構圖', '把這個數據做成表格頁面', '幫我做一份技術方案的投影片', '畫一個用戶流程圖'],
    examplesEn: ['Draw a system architecture diagram', 'Create a data table page', 'Make a technical proposal slide deck', 'Draw a user flow diagram'],
    suitableFor: '需要做簡報、文檔、架構圖的人',
    suitableForEn: 'Users who need presentations, documentation, and architecture diagrams',
    isEssential: false,
    stars: 7036,
    lastUpdated: '2026-03-29'
  },
  {
    id: 'spec-kit',
    name: 'spec-kit',
    nameZh: 'spec-kit',
    description: 'GitHub official toolkit for Spec-Driven Development — 7-stage structured development flow from constitution to validation.',
    descriptionZh: 'GitHub 官方 Spec-Driven Development 工具 — 7 階段結構化開發流程。',
    category: 'devtools',
    tags: ['spec-driven', 'development', 'methodology'],
    tagsZh: ['規格驅動', '開發', '方法論'],
    icon: '💫',
    url: 'https://github.com/github/spec-kit',
    isFree: true,
    installCmd: 'npx skills add github/spec-kit',
    installCount: null,
    source: 'GitHub 官方',
    isOfficial: true,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '規格文檔', nameEn: 'Spec Documents', desc: '結構化規格撰寫和管理', descEn: 'Structured spec writing and management' },
      { name: '驗證流程', nameEn: 'Validation Flow', desc: '自動檢查實作是否符合規格', descEn: 'Auto-check implementation against specs' },
      { name: '7 階段流程', nameEn: '7-Stage Process', desc: 'Constitution → 規格 → 驗證 → 實作', descEn: 'Constitution → Spec → Validation → Implementation' }
    ],
    installNote: 'GitHub 官方出品，適合大型專案。',
    examples: ['用 spec-kit 方法論開始這個新項目', '先寫規格再寫代碼', '檢查我的實作有沒有偏離規格'],
    examplesEn: ['Start this new project using spec-kit methodology', 'Write specs before code', 'Check if my implementation deviates from spec'],
    suitableFor: '大型項目開發者、重視規格文檔的團隊',
    suitableForEn: 'Large project developers and teams that value spec documentation',
    isEssential: false,
    stars: 83426,
    lastUpdated: '2026-03-29'
  },
  {
    id: 'web-browsing',
    name: 'Web Browsing',
    nameZh: 'Web Browsing 瀏覽器控制',
    description: 'Built-in browser control — let AI automatically operate web pages.',
    descriptionZh: '內建瀏覽器控制 — 讓 AI 自動操作網頁。',
    category: 'productivity',
    tags: ['browser', 'automation', 'built-in'],
    tagsZh: ['瀏覽器', '自動化', '內建'],
    icon: '🌐',
    url: '',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: 'OpenClaw 官方',
    isOfficial: true,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '網頁操作', nameEn: 'Web Operation', desc: '自動瀏覽、點擊、填表', descEn: 'Auto browse, click, fill forms' },
      { name: '截圖', nameEn: 'Screenshots', desc: '自動截取網頁截圖', descEn: 'Auto capture web screenshots' }
    ],
    installNote: 'OpenClaw 內建功能，不需額外安裝。',
    examples: ['打開 coinmarketcap.com 幫我查前 10 名的幣', '自動填寫這個表單', '幫我截圖這個網頁', '把這個網頁的數據抓下來'],
    examplesEn: ['Open coinmarketcap.com and check top 10 coins', 'Auto-fill this form', 'Take a screenshot of this webpage', 'Scrape data from this webpage'],
    suitableFor: '需要自動化網頁操作的人',
    suitableForEn: 'Users who need automated web operations',
    isEssential: false,
    stars: null,
    lastUpdated: null
  },
  {
    id: 'telegram-integration',
    name: 'Telegram Integration',
    nameZh: 'Telegram 整合',
    description: 'Built-in Telegram integration — let AI communicate with you through TG.',
    descriptionZh: 'Telegram 整合 — 讓 AI 透過 TG 跟你溝通。',
    category: 'productivity',
    tags: ['telegram', 'messaging', 'built-in'],
    tagsZh: ['Telegram', '通訊', '內建'],
    icon: '📱',
    url: '',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: 'OpenClaw 官方',
    isOfficial: true,
    verdict: 'pass',
    warning: null,
    features: [
      { name: 'TG 對話', nameEn: 'TG Chat', desc: '在 Telegram 裡直接跟 AI 對話', descEn: 'Chat with AI directly in Telegram' },
      { name: '推送通知', nameEn: 'Push Notifications', desc: '搭配 Cron 自動推送訊息', descEn: 'Auto push notifications with Cron' }
    ],
    installNote: 'OpenClaw 內建功能，openclaw init 時設定。',
    examples: ['在 Telegram 裡直接跟 AI 對話', '設定一個 cron 每天早上 9 點推送新聞摘要到 TG', '讓 AI 在 TG 通知我 BTC 價格變動'],
    examplesEn: ['Chat with AI directly in Telegram', 'Set up a cron to push daily news summary to TG at 9am', 'Have AI notify me of BTC price changes via TG'],
    suitableFor: '所有 OpenClaw 用戶 — 這是最基本的互動介面',
    suitableForEn: 'All OpenClaw users — the most basic interaction interface',
    isEssential: false,
    stars: null,
    lastUpdated: null
  },
  {
    id: 'capability-evolver',
    name: 'Capability Evolver',
    nameZh: 'Capability Evolver',
    description: 'Agent self-evolution — scans history, detects failure patterns, and auto-generates fix code.',
    descriptionZh: 'Agent 自我進化 — 掃描歷史記錄、偵測失敗模式、自動寫修補代碼。',
    category: 'multiagent',
    tags: ['self-improvement', 'evolution', 'agent'],
    tagsZh: ['自我改進', '進化', 'Agent'],
    icon: '🧬',
    url: '',
    isFree: true,
    installCmd: 'clawhub install capability-evolver',
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: 'GitHub link 待確認',
    features: [
      { name: '自我進化', nameEn: 'Self-Evolution', desc: '掃描錯誤模式並自動修補', descEn: 'Scan error patterns and auto-fix' },
      { name: 'Review 模式', nameEn: 'Review Mode', desc: '改動前讓用戶確認', descEn: 'User confirmation before applying changes' }
    ],
    installNote: '從 ClawHub 安裝。建議新手用 --review 模式。',
    examples: ['/evolve（一鍵執行自我進化）', '分析我最近的錯誤模式，找出改進方向', '用 review 模式進化（改動前讓我確認）'],
    examplesEn: ['/evolve (one-click self-evolution)', 'Analyze my recent error patterns and find improvements', 'Evolve in review mode (confirm before applying changes)'],
    suitableFor: '進階用戶、想讓 Agent 越來越聰明的人',
    suitableForEn: 'Advanced users who want their Agent to keep getting smarter',
    isEssential: false,
    stars: null,
    lastUpdated: null
  },
  {
    id: 'melvynx-cron',
    name: 'melvynx CRON Skill',
    nameZh: 'melvynx CRON 排程教學',
    description: 'Background task scheduling and auto-wake — let AI do things on a timer.',
    descriptionZh: '背景任務排程 + 自動喚醒 — 讓 AI 定時做事。',
    category: 'productivity',
    tags: ['cron', 'scheduling', 'automation'],
    tagsZh: ['排程', '定時任務', '自動化'],
    icon: '⏰',
    url: '',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: 'GitHub link 待確認',
    features: [
      { name: '定時排程', nameEn: 'Scheduled Tasks', desc: '設定定時自動執行的任務', descEn: 'Set up tasks that run on a schedule' },
      { name: '自動喚醒', nameEn: 'Auto-Wake', desc: 'AI 定時自動啟動工作', descEn: 'AI auto-starts work on schedule' }
    ],
    installNote: '教學型 Skill，參考 melvynx 的 CRON 教程設定。',
    examples: ['每天早上 9 點自動幫我查新聞摘要', '每 2 小時檢查一次 BTC 價格，跌超過 5% 通知我', '每週一生成一份投資組合報告'],
    examplesEn: ['Auto-check news summary every morning at 9am', 'Check BTC price every 2 hours, notify me if it drops more than 5%', 'Generate a portfolio report every Monday'],
    suitableFor: '所有人！Cron 是 OpenClaw 最強大的功能之一',
    suitableForEn: 'Everyone! Cron is one of OpenClaw most powerful features',
    isEssential: true,
    stars: null,
    lastUpdated: null
  },
  {
    id: 'railway-deploy',
    name: 'Railway Deploy',
    nameZh: 'Railway Deploy',
    description: 'Two-step deployment — from code to production in two commands.',
    descriptionZh: '兩步部署 — 從代碼到上線只要兩個指令。',
    category: 'cloud',
    tags: ['deploy', 'hosting', 'railway'],
    tagsZh: ['部署', '託管', 'Railway'],
    icon: '🚂',
    url: 'https://github.com/mshumer/claude-skill-railway',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '快速部署', nameEn: 'Quick Deploy', desc: '兩個指令完成部署', descEn: 'Deploy in two commands' },
      { name: '環境變數', nameEn: 'Environment Variables', desc: '自動設定環境變數', descEn: 'Auto-configure environment variables' }
    ],
    installNote: 'GitHub link 待確認，可能非官方 repo。',
    examples: ['把這個項目部署到 Railway', '幫我設定環境變數然後部署', '查看部署狀態'],
    examplesEn: ['Deploy this project to Railway', 'Set up environment variables and deploy', 'Check deployment status'],
    suitableFor: '開發者、想快速部署的人',
    suitableForEn: 'Developers who want quick deployments',
    isEssential: false,
    stars: 25,
    lastUpdated: '2026-03-05'
  },
  {
    id: 'feishu-cli',
    name: '飛書 CLI',
    nameZh: '飛書 CLI（19 Skills）',
    description: 'AI Agent operates Feishu/Lark — documents, spreadsheets, calendar, and tasks (19 Skills total).',
    descriptionZh: 'AI Agent 操作飛書 — 文檔、表格、日曆、任務（共 19 個 Skills）。',
    category: 'productivity',
    tags: ['feishu', 'lark', 'enterprise'],
    tagsZh: ['飛書', 'Lark', '企業'],
    icon: '🐦',
    url: '',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: 'GitHub link 待確認',
    features: [
      { name: '飛書文檔', nameEn: 'Feishu Docs', desc: '建立和管理飛書文檔', descEn: 'Create and manage Feishu documents' },
      { name: '飛書表格', nameEn: 'Feishu Sheets', desc: '操作飛書表格數據', descEn: 'Operate Feishu spreadsheet data' },
      { name: '飛書日曆', nameEn: 'Feishu Calendar', desc: '查看和管理日曆行程', descEn: 'View and manage calendar events' }
    ],
    installNote: 'HenkXheng（恩亨）出品，GitHub link 待確認。',
    examples: ['建立一個飛書文檔記錄今天的會議紀錄', '查看我飛書日曆上這週的行程', '在飛書表格裡更新這個數據'],
    examplesEn: ['Create a Feishu doc for today meeting notes', 'Check my Feishu calendar for this week', 'Update data in a Feishu spreadsheet'],
    suitableFor: '飛書/Lark 用戶、企業用戶',
    suitableForEn: 'Feishu/Lark users and enterprise users',
    isEssential: false,
    stars: null,
    lastUpdated: null
  },
  {
    id: 'wewrite',
    name: 'WeWrite',
    nameZh: 'WeWrite 公眾號 Skill',
    description: 'WeChat Official Account content generation.',
    descriptionZh: '微信公眾號內容生成。',
    category: 'marketing',
    tags: ['wechat', 'content', 'chinese'],
    tagsZh: ['微信', '內容', '中文'],
    icon: '✍️',
    url: '',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: 'GitHub link 待確認',
    features: [
      { name: '公眾號文章', nameEn: 'WeChat Articles', desc: '生成公眾號格式的文章', descEn: 'Generate WeChat Official Account formatted articles' },
      { name: '排版預覽', nameEn: 'Layout Preview', desc: '排版並預覽文章效果', descEn: 'Format and preview article layout' }
    ],
    installNote: 'QingQ77 出品，GitHub link 待確認。中文用戶專用。',
    examples: ['幫我寫一篇公眾號文章，主題是「AI 如何改變投資」', '排版並預覽這篇文章', '生成一篇適合公眾號的長文'],
    examplesEn: ['Write a WeChat article about "How AI changes investing"', 'Format and preview this article', 'Generate a long-form article suitable for WeChat'],
    suitableFor: '公眾號運營者',
    suitableForEn: 'WeChat Official Account operators',
    isEssential: false,
    stars: null,
    lastUpdated: null
  },
  {
    id: 'openclaw-cc',
    name: 'OpenClaw 調用 Claude Code',
    nameZh: 'OpenClaw 調用 Claude Code',
    description: 'Call Claude Code directly from OpenClaw — save 80% tokens by using OC as commander and CC as worker.',
    descriptionZh: '在 OpenClaw 裡直接叫 Claude Code 幹活，節省 80% Token。',
    category: 'multiagent',
    tags: ['openclaw', 'claude-code', 'token-saving'],
    tagsZh: ['OpenClaw', 'Claude Code', '省錢'],
    icon: '🔗',
    url: '',
    isFree: true,
    installCmd: null,
    installCount: null,
    source: '社群',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: 'Token 節省', nameEn: 'Token Saving', desc: '把 OC 當指揮官、CC 當工人，節省 80% Token', descEn: 'Use OC as commander, CC as worker — save 80% tokens' }
    ],
    installNote: 'AISuperDomain 教學。需要同時安裝 OpenClaw 和 Claude Code。',
    examples: ['用 Claude Code 幫我重構這個文件', '叫 Claude Code 跑一下測試', '讓 CC 處理這個複雜的代碼修改'],
    examplesEn: ['Use Claude Code to refactor this file', 'Have Claude Code run the tests', 'Let CC handle this complex code modification'],
    suitableFor: '想省錢又要高品質代碼的人',
    suitableForEn: 'Users who want to save money while getting high-quality code',
    isEssential: false,
    stars: null,
    lastUpdated: null
  }
];

// ============================================================
// 4. Process all existing skills
// ============================================================
let updated = 0;
for (const skill of skills) {
  const gh = githubData[skill.id];
  const content = contentData[skill.id];

  // Add new fields with defaults
  if (!skill.hasOwnProperty('examples')) skill.examples = [];
  if (!skill.hasOwnProperty('examplesEn')) skill.examplesEn = [];
  if (!skill.hasOwnProperty('suitableFor')) skill.suitableFor = '';
  if (!skill.hasOwnProperty('suitableForEn')) skill.suitableForEn = '';
  if (!skill.hasOwnProperty('isEssential')) skill.isEssential = false;
  if (!skill.hasOwnProperty('stars')) skill.stars = null;
  if (!skill.hasOwnProperty('lastUpdated')) skill.lastUpdated = null;

  // Apply GitHub data
  if (gh) {
    if (gh.stars !== undefined) skill.stars = gh.stars;
    if (gh.lastUpdated !== undefined) skill.lastUpdated = gh.lastUpdated;
    if (gh.url && !skill.url) skill.url = gh.url;
    if (gh.installCmd && !skill.installCmd) skill.installCmd = gh.installCmd;
  }

  // Apply content data (examples, suitableFor, etc.)
  if (content) {
    if (content.examples) skill.examples = content.examples;
    if (content.examplesEn) skill.examplesEn = content.examplesEn;
    if (content.suitableFor) skill.suitableFor = content.suitableFor;
    if (content.suitableForEn) skill.suitableForEn = content.suitableForEn;
    if (content.isEssential) skill.isEssential = true;
    if (content.isOfficial !== undefined) skill.isOfficial = content.isOfficial;
    if (content.warning) skill.warning = content.warning;
  }

  updated++;
}

// ============================================================
// 5. Generate examples for skills without content data
// ============================================================
for (const skill of skills) {
  if (skill.examples.length === 0) {
    // Generate basic examples from description and features
    const desc = skill.descriptionZh || skill.description;
    const descEn = skill.description;

    // Generic examples based on category
    const categoryExamples = {
      cex: {
        zh: ['查詢最新的幣價和市場行情', '查看我的帳戶資產和持倉', '幫我下一筆交易訂單', '分析最近的市場趨勢', '查看交易手續費資訊'],
        en: ['Check latest coin prices and market data', 'View my account assets and holdings', 'Place a trade order for me', 'Analyze recent market trends', 'Check trading fee information']
      },
      onchain: {
        zh: ['查詢這個地址的鏈上資產', '分析這個代幣的持倉分佈', '執行一筆鏈上交易', '查看當前的 Gas 費用', '追蹤這個錢包的最新操作'],
        en: ['Check on-chain assets for this address', 'Analyze token holder distribution', 'Execute an on-chain transaction', 'Check current gas fees', 'Track latest operations for this wallet']
      },
      analytics: {
        zh: ['分析這個代幣的歷史價格趨勢', '查詢鏈上交易數據', '生成一份數據分析報告', '比較不同代幣的表現', '追蹤市場指標變化'],
        en: ['Analyze historical price trends for this token', 'Query on-chain transaction data', 'Generate a data analysis report', 'Compare performance across tokens', 'Track market indicator changes']
      },
      news: {
        zh: ['獲取今天最重要的加密新聞', '搜尋特定話題的最新動態', '追蹤這個項目的最新消息', '匯總過去 24 小時的市場熱點', '分析當前的市場情緒'],
        en: ['Get today most important crypto news', 'Search latest updates on a specific topic', 'Track latest news for this project', 'Summarize market hotspots in past 24 hours', 'Analyze current market sentiment']
      },
      security: {
        zh: ['檢查這個代碼有沒有安全漏洞', '掃描這個 Skill 的安全性', '驗證這個地址是否可信', '審計這個智能合約', '檢查依賴項有沒有已知漏洞'],
        en: ['Check this code for security vulnerabilities', 'Scan this Skill for security issues', 'Verify if this address is trustworthy', 'Audit this smart contract', 'Check dependencies for known vulnerabilities']
      },
      trading: {
        zh: ['分析這個代幣的交易信號', '回測這個交易策略', '查看期權異動數據', '設定價格提醒', '分析市場多空比'],
        en: ['Analyze trading signals for this token', 'Backtest this trading strategy', 'View options flow data', 'Set price alerts', 'Analyze market long/short ratio']
      },
      frontend: {
        zh: ['幫我設計一個好看的頁面', '檢查我的 UI 有沒有設計問題', '用這個風格重新設計組件', '優化這個頁面的響應式佈局', '改善這個表單的用戶體驗'],
        en: ['Help me design a beautiful page', 'Check my UI for design issues', 'Redesign this component in this style', 'Optimize responsive layout for this page', 'Improve UX for this form']
      },
      devtools: {
        zh: ['幫我分析這段代碼的問題', '重構這個函數讓它更好維護', '生成測試用例', '檢查代碼品質和最佳實踐', '幫我理解這個代碼庫的架構'],
        en: ['Help me analyze issues in this code', 'Refactor this function for better maintainability', 'Generate test cases', 'Check code quality and best practices', 'Help me understand this codebase architecture']
      },
      multiagent: {
        zh: ['用多 Agent 模式處理這個複雜任務', '讓多個 Agent 並行工作', '設定 Agent 之間的協作流程', '用團隊模式拆解這個大型專案', '查看各 Agent 的工作進度'],
        en: ['Handle this complex task with multi-agent mode', 'Run multiple agents in parallel', 'Set up collaboration workflow between agents', 'Decompose this large project in team mode', 'Check work progress of each agent']
      },
      cloud: {
        zh: ['部署這個應用到雲端', '設定環境變數和配置', '查看部署狀態和日誌', '管理雲端資源', '設定 CI/CD 流程'],
        en: ['Deploy this application to the cloud', 'Set up environment variables and config', 'View deployment status and logs', 'Manage cloud resources', 'Set up CI/CD pipeline']
      },
      data: {
        zh: ['分析這份數據的趨勢', '生成數據視覺化圖表', '清洗和轉換這份數據', '建立數據分析模型', '查詢 API 獲取最新數據'],
        en: ['Analyze trends in this dataset', 'Generate data visualization charts', 'Clean and transform this data', 'Build a data analysis model', 'Query API for latest data']
      },
      media: {
        zh: ['幫我製作一個短影片', '生成音效或配樂', '製作動畫效果', '編輯這段影片素材', '生成一個宣傳影片'],
        en: ['Help me create a short video', 'Generate sound effects or music', 'Create animation effects', 'Edit this video footage', 'Generate a promotional video']
      },
      marketing: {
        zh: ['幫我寫一篇 SEO 優化的文章', '分析這個關鍵詞的搜尋趨勢', '生成社群媒體貼文', '優化這個頁面的 SEO', '制定內容行銷策略'],
        en: ['Help me write an SEO-optimized article', 'Analyze search trends for this keyword', 'Generate social media posts', 'Optimize SEO for this page', 'Create a content marketing strategy']
      },
      productivity: {
        zh: ['幫我自動化這個工作流程', '搜尋相關的工具和資源', '整理和匯總這些資訊', '設定自動化通知和提醒', '管理和追蹤任務進度'],
        en: ['Help me automate this workflow', 'Search for relevant tools and resources', 'Organize and summarize this information', 'Set up automated notifications and reminders', 'Manage and track task progress']
      }
    };

    const catExamples = categoryExamples[skill.category] || categoryExamples.productivity;

    // Try to make examples more specific using features
    if (skill.features && skill.features.length > 0) {
      skill.examples = skill.features.slice(0, 3).map(f => `幫我用 ${skill.nameZh} ${f.desc || f.name}`);
      skill.examplesEn = skill.features.slice(0, 3).map(f => `Use ${skill.name} to ${f.descEn || f.nameEn}`);
      // Pad with category defaults if less than 3
      while (skill.examples.length < 3) {
        skill.examples.push(catExamples.zh[skill.examples.length]);
        skill.examplesEn.push(catExamples.en[skill.examplesEn.length]);
      }
    } else {
      skill.examples = catExamples.zh.slice(0, 5);
      skill.examplesEn = catExamples.en.slice(0, 5);
    }
  }

  // Fill empty suitableFor
  if (!skill.suitableFor) {
    const catSuitable = {
      cex: { zh: '交易所用戶、想快速查行情的人', en: 'Exchange users who want quick market data' },
      onchain: { zh: '鏈上操作用戶、DeFi 愛好者', en: 'On-chain users and DeFi enthusiasts' },
      analytics: { zh: '數據分析師、研究員', en: 'Data analysts and researchers' },
      news: { zh: '想即時掌握市場動態的人', en: 'Users who want real-time market updates' },
      security: { zh: '注重安全的用戶、開發者', en: 'Security-conscious users and developers' },
      trading: { zh: '交易者、投資者', en: 'Traders and investors' },
      frontend: { zh: '前端開發者、UI/UX 設計師', en: 'Frontend developers and UI/UX designers' },
      devtools: { zh: '軟體開發者、工程師', en: 'Software developers and engineers' },
      multiagent: { zh: '進階開發者、想提升 AI 效率的人', en: 'Advanced developers who want to boost AI efficiency' },
      cloud: { zh: '需要部署和管理雲端服務的開發者', en: 'Developers who need to deploy and manage cloud services' },
      data: { zh: '數據科學家、分析師', en: 'Data scientists and analysts' },
      media: { zh: '內容創作者、影片製作者', en: 'Content creators and video producers' },
      marketing: { zh: '行銷人員、SEO 專家', en: 'Marketers and SEO specialists' },
      productivity: { zh: '想提升工作效率的所有人', en: 'Anyone who wants to boost productivity' }
    };
    const cs = catSuitable[skill.category] || catSuitable.productivity;
    skill.suitableFor = cs.zh;
    skill.suitableForEn = cs.en;
  }
}

// ============================================================
// 6. Add new skills
// ============================================================
const existingIds = new Set(skills.map(s => s.id));
let added = 0;
for (const ns of newSkills) {
  if (!existingIds.has(ns.id)) {
    skills.push(ns);
    added++;
    console.log(`Added: ${ns.id}`);
  } else {
    console.log(`Skipped (already exists): ${ns.id}`);
  }
}

// ============================================================
// 7. Write output
// ============================================================
const output = JSON.stringify(skills, null, 2);
fs.writeFileSync(SKILLS_PATH, output, 'utf8');

console.log(`\nDone!`);
console.log(`Updated: ${updated} existing skills`);
console.log(`Added: ${added} new skills`);
console.log(`Total: ${skills.length} skills`);

// Validate JSON
try {
  JSON.parse(output);
  console.log('JSON validation: PASS');
} catch (e) {
  console.log('JSON validation: FAIL -', e.message);
}

// Check isEssential count
const essentials = skills.filter(s => s.isEssential);
console.log(`isEssential count: ${essentials.length} (${essentials.map(s => s.id).join(', ')})`);

// Check skills with empty examples
const noExamples = skills.filter(s => !s.examples || s.examples.length === 0);
console.log(`Skills without examples: ${noExamples.length}`);

// Check skills with empty suitableFor
const noSuitable = skills.filter(s => !s.suitableFor);
console.log(`Skills without suitableFor: ${noSuitable.length}`);
