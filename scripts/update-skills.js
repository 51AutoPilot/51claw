const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/skills.json', 'utf8'));

// === UPDATE EXISTING SKILLS' STARS ===
const starUpdates = {
  'superpowers': { stars: 129965, lastUpdated: '2026-04-01' },
  'visual-explainer': { stars: 7109, lastUpdated: '2026-04-01' },
  'oh-my-claudecode': { stars: 20545, lastUpdated: '2026-04-01' },
  'last30days-skill': { stars: 17230, lastUpdated: '2026-04-01' },
  'coinmarketcap': { stars: 39, lastUpdated: '2026-03-28' },
};

for (const [id, update] of Object.entries(starUpdates)) {
  const skill = data.find(s => s.id === id);
  if (skill) {
    console.log('Updated stars:', id, skill.stars, '->', update.stars);
    skill.stars = update.stars;
    skill.lastUpdated = update.lastUpdated;
  }
}

// === ADD NEW SKILLS ===
const newSkills = [
  {
    id: 'weex-trader',
    name: 'WEEX Trader Skill',
    nameZh: 'WEEX 交易 Skill',
    description: 'AI trading skill for WEEX exchange, compatible with Codex/OpenClaw/Claude Code.',
    descriptionZh: 'WEEX 官方 AI 交易 Skill，兼容 Codex / OpenClaw / Claude Code。',
    category: 'cex',
    tags: ['trading'],
    tagsZh: ['\u4EA4\u6613'],
    icon: '\uD83D\uDCC8',
    url: 'https://github.com/weex-labs/weex-trader-skill',
    isFree: true,
    installCmd: 'npx skills add https://github.com/weex-labs/weex-trader-skill',
    installCount: null,
    source: '\u5B98\u65B9',
    isOfficial: true,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '\u5408\u7D04\u4EA4\u6613', nameEn: 'Futures Trading', desc: '\u6C38\u7E8C\u5408\u7D04\u5831\u50F9\u8207\u4EA4\u6613', descEn: 'Perpetual futures quotes and trading' },
      { name: '\u73FE\u8CA8\u4EA4\u6613', nameEn: 'Spot Trading', desc: '\u73FE\u8CA8\u8CB7\u8CE3\u64CD\u4F5C', descEn: 'Spot buy/sell operations' },
      { name: '\u6301\u5009\u7BA1\u7406', nameEn: 'Position Management', desc: '\u67E5\u770B\u6301\u5009\u548C\u76C8\u8667', descEn: 'View positions and PnL' }
    ],
    installNote: '\u9700\u8981 WEEX \u5E33\u865F\u8207 API Key\u3002',
    examples: ['\u67E5\u770B BTC/USDT \u6C38\u7E8C\u5408\u7D04\u7684\u6700\u65B0\u5831\u50F9', '\u5E6B\u6211\u5728 WEEX \u4E0A\u505A\u591A ETH\uFF0C\u5009\u4F4D 100 USDT', '\u67E5\u770B\u6211\u7684 WEEX \u6301\u5009\u548C\u76C8\u8667'],
    examplesEn: ['Check BTC/USDT perpetual contract latest price', 'Go long on ETH with 100 USDT on WEEX', 'View my WEEX positions and PnL'],
    suitableFor: 'WEEX \u7528\u6236\u3001\u60F3\u7528 AI \u81EA\u52D5\u4EA4\u6613\u7684\u4EBA',
    suitableForEn: 'WEEX users who want AI-powered trading',
    isEssential: false,
    stars: 1,
    lastUpdated: '2026-03-27'
  },
  {
    id: 'injective-agent',
    name: 'Injective Agent Skills',
    nameZh: 'Injective Agent Skills',
    description: 'On-chain agentic skills for Injective \u2014 swap, trade, DeFi operations.',
    descriptionZh: '\u93C8\u4E0A agentic skills\uFF0C\u652F\u6301 Injective \u93C8\u4E0A\u7684 swap\u3001\u4EA4\u6613\u3001DeFi \u64CD\u4F5C\u3002',
    category: 'onchain',
    tags: ['trading', 'defi'],
    tagsZh: ['\u4EA4\u6613', 'DeFi'],
    icon: '\uD83D\uDC89',
    url: '',
    isFree: true,
    installCmd: '',
    installCount: null,
    source: '\u5B98\u65B9',
    isOfficial: true,
    verdict: 'pass',
    warning: 'GitHub link \u5F85\u78BA\u8A8D\uFF0C\u900F\u904E Injective \u5B98\u65B9\u9801\u9762\u63A5\u5165\u3002',
    features: [
      { name: 'Swap', nameEn: 'Swap', desc: '\u5728 Injective \u4E0A\u4EE3\u5E63\u5151\u63DB', descEn: 'Token swap on Injective' },
      { name: 'Staking', nameEn: 'Staking', desc: '\u67E5\u8A62 INJ staking APR', descEn: 'Check INJ staking APR' },
      { name: '\u6301\u5009\u67E5\u8A62', nameEn: 'Portfolio', desc: '\u67E5\u770B\u93C8\u4E0A\u6301\u5009', descEn: 'View on-chain positions' }
    ],
    installNote: '\u900F\u904E Injective \u5B98\u65B9 Skill \u9801\u9762\u63A5\u5165\uFF08\u652F\u6301 OpenClaw/Claude Code/Codex\uFF09\u3002',
    examples: ['\u5728 Injective \u4E0A\u7528 INJ \u63DB USDT', '\u67E5\u770B\u6211\u7684 Injective \u93C8\u4E0A\u6301\u5009', '\u67E5\u8A62 INJ \u76EE\u524D\u7684 staking APR'],
    examplesEn: ['Swap INJ for USDT on Injective', 'View my Injective on-chain positions', 'Check current INJ staking APR'],
    suitableFor: 'Injective \u751F\u614B\u7528\u6236',
    suitableForEn: 'Injective ecosystem users',
    isEssential: false,
    stars: null,
    lastUpdated: '2026-03-28'
  },
  {
    id: 'ai-website-cloner',
    name: 'AI Website Cloner',
    nameZh: 'AI \u7DB2\u7AD9\u8907\u88FD\u5668',
    description: 'Clone any website with one command \u2014 screenshot, extract design tokens, download assets, rebuild.',
    descriptionZh: '\u4E00\u53E5\u6307\u4EE4\u8907\u88FD\u4EFB\u4F55\u7DB2\u7AD9 \u2014 \u622A\u5716\u3001\u63D0\u53D6\u8A2D\u8A08 token\u3001\u4E0B\u8F09\u7D20\u6750\u3001\u91CD\u5EFA\u3002',
    category: 'frontend',
    tags: ['frontend', 'design'],
    tagsZh: ['\u524D\u7AEF', '\u8A2D\u8A08'],
    icon: '\uD83E\uDDEC',
    url: 'https://github.com/JCodesMore/ai-website-cloner-template',
    isFree: true,
    installCmd: 'npx skills add https://github.com/ai-website-cloner-template/ai-website-cloner',
    installCount: null,
    source: '\u793E\u5340',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '\u4E00\u9375\u8907\u88FD', nameEn: 'One-click Clone', desc: '\u622A\u5716 + \u63D0\u53D6\u8A2D\u8A08 + \u91CD\u5EFA', descEn: 'Screenshot + extract design + rebuild' },
      { name: '\u8A2D\u8A08\u63D0\u53D6', nameEn: 'Design Extraction', desc: '\u81EA\u52D5\u63D0\u53D6\u984F\u8272\u3001\u5B57\u9AD4\u3001\u9593\u8DDD', descEn: 'Auto-extract colors, fonts, spacing' },
      { name: '\u7D20\u6750\u4E0B\u8F09', nameEn: 'Asset Download', desc: '\u4E0B\u8F09\u5716\u7247\u548C\u5716\u6A19', descEn: 'Download images and icons' }
    ],
    installNote: '',
    examples: ['/clone-website https://stripe.com', '\u8907\u88FD\u9019\u500B\u7DB2\u7AD9\u7684\u8A2D\u8A08\u98A8\u683C', '\u5E6B\u6211\u4EFF\u9020\u4E00\u500B\u8DDF\u9019\u500B landing page \u4E00\u6A23\u7684\u9801\u9762'],
    examplesEn: ['/clone-website https://stripe.com', 'Clone this website design style', 'Build a page that looks like this landing page'],
    suitableFor: '\u524D\u7AEF\u958B\u767C\u8005\u3001\u60F3\u5FEB\u901F\u8907\u88FD\u7DB2\u7AD9\u8A2D\u8A08\u7684\u4EBA',
    suitableForEn: 'Frontend developers who want to quickly clone website designs',
    isEssential: false,
    stars: 6894,
    lastUpdated: '2026-04-01'
  },
  {
    id: 'scrapling-skill',
    name: 'Web Scraping Skill (scrapling)',
    nameZh: 'Web Scraping Skill\uFF08scrapling\uFF09',
    description: 'Web scraping inside Claude Code \u2014 auto fetcher selection, Cloudflare bypass, site patterns.',
    descriptionZh: 'Claude Code \u5167\u5EFA web scraping \u2014 \u6293\u53D6\u3001\u89E3\u6790\u3001\u7D50\u69CB\u5316\u7DB2\u9801\u6578\u64DA\uFF0C\u652F\u6301 Cloudflare \u7E5E\u904E\u3002',
    category: 'devtools',
    tags: ['scraping', 'data'],
    tagsZh: ['\u722C\u87F2', '\u6578\u64DA'],
    icon: '\uD83D\uDD77\uFE0F',
    url: 'https://github.com/Cedriccmh/claude-code-skill-scrapling',
    isFree: true,
    installCmd: 'npx skills add https://github.com/Cedriccmh/claude-code-skill-scrapling',
    installCount: null,
    source: '\u793E\u5340',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '\u81EA\u52D5\u6293\u53D6', nameEn: 'Auto Scraping', desc: '\u81EA\u52D5\u9078\u64C7\u6700\u4F73 Fetcher', descEn: 'Auto-select best fetcher' },
      { name: 'Cloudflare \u7E5E\u904E', nameEn: 'Cloudflare Bypass', desc: '\u7E5E\u904E Cloudflare \u4FDD\u8B77', descEn: 'Bypass Cloudflare protection' },
      { name: '\u7D50\u69CB\u5316\u6578\u64DA', nameEn: 'Structured Data', desc: '\u89E3\u6790\u7DB2\u9801\u70BA\u7D50\u69CB\u5316\u8CC7\u6599', descEn: 'Parse web pages into structured data' }
    ],
    installNote: '',
    examples: ['\u6293\u53D6\u9019\u500B\u7DB2\u9801\u4E0A\u6240\u6709\u7684\u50F9\u683C\u8CC7\u8A0A', '\u628A\u9019\u500B\u7522\u54C1\u5217\u8868\u9801\u7684\u6578\u64DA\u6574\u7406\u6210\u8868\u683C', '\u5B9A\u671F\u6293\u53D6\u9019\u500B\u9801\u9762\u7684\u66F4\u65B0'],
    examplesEn: ['Scrape all pricing info from this webpage', 'Organize product listing data into a table', 'Periodically scrape updates from this page'],
    suitableFor: '\u9700\u8981\u722C\u87F2/\u6578\u64DA\u63A1\u96C6\u7684\u4EBA',
    suitableForEn: 'Users who need web scraping and data collection',
    isEssential: false,
    stars: 192,
    lastUpdated: '2026-04-01'
  },
  {
    id: 'sync-lipsync',
    name: 'sync. MCP Server',
    nameZh: 'sync. \u5507\u5F62\u540C\u6B65 MCP',
    description: 'AI lipsync video generation \u2014 create lipsynced videos, manage assets, track renders.',
    descriptionZh: 'AI \u5507\u5F62\u540C\u6B65\u5F71\u7247\u751F\u6210 \u2014 \u751F\u6210 lipsynced videos\u3001\u7BA1\u7406\u7D20\u6750\u3001\u8FFD\u8E64 render\u3002',
    category: 'media',
    tags: ['video', 'ai'],
    tagsZh: ['\u5F71\u7247', 'AI'],
    icon: '\uD83C\uDFAC',
    url: 'https://github.com/synchronicity-labs/mcp-server',
    isFree: true,
    installCmd: '',
    installCount: null,
    source: '\u5B98\u65B9',
    isOfficial: true,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '\u5507\u5F62\u540C\u6B65', nameEn: 'Lipsync', desc: 'AI \u751F\u6210\u5507\u5F62\u540C\u6B65\u5F71\u7247', descEn: 'AI-generated lipsync videos' },
      { name: '\u7D20\u6750\u7BA1\u7406', nameEn: 'Asset Management', desc: '\u7BA1\u7406\u5F71\u7247\u7D20\u6750\u5EAB', descEn: 'Manage video asset library' },
      { name: 'Render \u8FFD\u8E64', nameEn: 'Render Tracking', desc: '\u8FFD\u8E64\u6E32\u67D3\u9032\u5EA6', descEn: 'Track render progress' }
    ],
    installNote: 'MCP server \u5B89\u88DD\uFF0C\u8A73\u898B https://go.sync.so/MCP',
    examples: ['\u7528\u9019\u6BB5\u97F3\u6A94\u751F\u6210\u4E00\u500B\u5507\u5F62\u540C\u6B65\u5F71\u7247', '\u7BA1\u7406\u6211\u7684 lipsync \u7D20\u6750\u5EAB', '\u8FFD\u8E64\u76EE\u524D render \u7684\u9032\u5EA6'],
    examplesEn: ['Generate a lipsync video from this audio', 'Manage my lipsync asset library', 'Track current render progress'],
    suitableFor: '\u5F71\u7247\u5275\u4F5C\u8005\u3001\u884C\u92B7\u5718\u968A',
    suitableForEn: 'Video creators, marketing teams',
    isEssential: false,
    stars: 1,
    lastUpdated: '2026-03-24'
  },
  {
    id: 'wechat-autopublish',
    name: 'WeChat AutoPublish Skill',
    nameZh: '\u516C\u773E\u865F\u5168\u6D41\u7A0B\u81EA\u52D5\u5316 Skill\uFF08Ray Wang \u7248\uFF09',
    description: 'Full WeChat article automation \u2014 trending topics, SEO writing, AI images, formatting, draft push.',
    descriptionZh: '\u5168\u6D41\u7A0B\u4E00\u53E5\u8A71\u641E\u5B9A\uFF1A\u71B1\u9EDE\u6293\u53D6\u3001\u9078\u984C\u8A55\u5206\u3001\u6846\u67B6\u751F\u6210\u3001\u5BEB\u4F5C\u3001SEO \u512A\u5316\u3001AI \u914D\u5716\u3001\u6392\u7248\u3001\u63A8\u9001\u8349\u7A3F\u7BB1\u3002',
    category: 'productivity',
    tags: ['content', 'automation'],
    tagsZh: ['\u5167\u5BB9', '\u81EA\u52D5\u5316'],
    icon: '\uD83D\uDCF1',
    url: '',
    isFree: true,
    installCmd: '',
    installCount: null,
    source: '\u793E\u5340',
    isOfficial: false,
    verdict: 'pass',
    warning: 'GitHub link \u5F85\u78BA\u8A8D\u3002',
    features: [
      { name: '\u71B1\u9EDE\u6293\u53D6', nameEn: 'Trending Topics', desc: '\u81EA\u52D5\u6293\u53D6\u71B1\u9580\u8A71\u984C', descEn: 'Auto-fetch trending topics' },
      { name: 'SEO \u5BEB\u4F5C', nameEn: 'SEO Writing', desc: '\u57FA\u65BC\u641C\u7D22\u6578\u64DA\u512A\u5316\u6587\u7AE0', descEn: 'Optimize articles based on search data' },
      { name: '\u53BB AI \u75D5\u8DE1', nameEn: 'De-AI Writing', desc: '\u53BB\u9664 AI \u751F\u6210\u611F', descEn: 'Remove AI-generated feel' }
    ],
    installNote: '\u958B\u6E90\uFF0C\u7531 @wangray\uFF08Ray Wang\uFF09\u958B\u767C\u3002\u4E2D\u6587\u751F\u614B\u55AE\u4E00 Skill \u767C\u5E03\u6700\u9AD8\u8FF4\u97FF\uFF08923\u2764 225RT\uFF09\u3002',
    examples: ['\u5E6B\u6211\u5BEB\u4E00\u7BC7\u4ECA\u5929\u52A0\u5BC6\u5E02\u5834\u71B1\u9EDE\u7684\u516C\u773E\u865F\u6587\u7AE0', '\u7528\u53BB AI \u75D5\u8DE1\u6A21\u5F0F\u5BEB\u4F5C\uFF0CSEO \u512A\u5148', '\u81EA\u52D5\u751F\u6210\u914D\u5716\u4E26\u6392\u7248'],
    examplesEn: ['Write a WeChat article about today crypto market trends', 'Write in de-AI mode with SEO priority', 'Auto-generate images and format'],
    suitableFor: '\u516C\u773E\u865F\u904B\u71DF\u8005\u3001\u5167\u5BB9\u5275\u4F5C\u8005\u3001\u81EA\u5A92\u9AD4',
    suitableForEn: 'WeChat public account operators, content creators',
    isEssential: false,
    stars: null,
    lastUpdated: '2026-03-30'
  },
  {
    id: 'weclaw',
    name: 'WeClaw',
    nameZh: 'WeClaw\uFF08\u5FAE\u4FE1\u591A Agent \u707D\u5099\uFF09',
    description: 'Connect multiple AI agents via WeChat ClawBot \u2014 switch between Claude Code, OpenClaw, remote restart.',
    descriptionZh: '\u901A\u904E\u5FAE\u4FE1 ClawBot \u9023\u63A5\u591A\u500B Agent\uFF08Claude Code\u3001OpenClaw \u7B49\uFF09\uFF0C\u96A8\u6642\u5207\u63DB\uFF0C\u4F5C\u70BA\u591A\u91CD\u707D\u5099\u65B9\u6848\u3002',
    category: 'multiagent',
    tags: ['wechat', 'agent'],
    tagsZh: ['\u5FAE\u4FE1', 'Agent'],
    icon: '\uD83D\uDCAC',
    url: 'https://github.com/fastclaw-ai/weclaw',
    isFree: true,
    installCmd: '',
    installCount: null,
    source: '\u793E\u5340',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '\u591A Agent \u9023\u63A5', nameEn: 'Multi-Agent Connect', desc: '\u5FAE\u4FE1\u9023\u63A5 CC\u3001OC \u7B49\u591A\u500B Agent', descEn: 'Connect CC, OC and other agents via WeChat' },
      { name: '\u9060\u7A0B\u91CD\u555F', nameEn: 'Remote Restart', desc: '\u5FAE\u4FE1\u9060\u7A0B\u91CD\u555F OpenClaw', descEn: 'Remote restart OpenClaw via WeChat' },
      { name: '\u707D\u5099\u5207\u63DB', nameEn: 'Failover Switch', desc: 'Agent \u639B\u4E86\u53EF\u5373\u6642\u5207\u63DB', descEn: 'Instant switch when agent goes down' }
    ],
    installNote: '',
    examples: ['\uFF08\u5728\u5FAE\u4FE1 ClawBot \u4E2D\uFF09/cc \u5207\u5230 Claude Code', '\u5E6B\u6211\u91CD\u555F openclaw', '\u5207\u56DE OpenClaw \u4E3B session'],
    examplesEn: ['(In WeChat ClawBot) /cc switch to Claude Code', 'Restart openclaw for me', 'Switch back to main OpenClaw session'],
    suitableFor: '\u5FAE\u4FE1\u91CD\u5EA6\u7528\u6236\u3001\u9700\u8981\u9060\u7A0B\u7BA1\u7406\u591A Agent \u7684\u4EBA',
    suitableForEn: 'WeChat power users who need remote multi-agent management',
    isEssential: false,
    stars: 1045,
    lastUpdated: '2026-04-01'
  },
  {
    id: 'tmux-bridge-mcp',
    name: 'tmux-bridge MCP',
    nameZh: 'tmux-bridge MCP\uFF08\u8DE8 Agent \u7D42\u7AEF\u5354\u4F5C\uFF09',
    description: 'Cross-pane AI agent communication via tmux \u2014 lets Claude Code, Codex, Gemini, Kimi CLI talk to each other.',
    descriptionZh: '\u8B93 Claude Code\u3001Codex\u3001Gemini\u3001Kimi \u8B80\u5F7C\u6B64\u7684\u7D42\u7AEF\u4E26\u901A\u904E MCP \u5354\u8ABF\u3002',
    category: 'multiagent',
    tags: ['tmux', 'agent', 'mcp'],
    tagsZh: ['tmux', 'Agent', 'MCP'],
    icon: '\uD83D\uDD17',
    url: 'https://github.com/howardpen9/tmux-bridge-mcp',
    isFree: true,
    installCmd: 'npx tmux-bridge-mcp setup',
    installCount: null,
    source: '\u793E\u5340',
    isOfficial: false,
    verdict: 'pass',
    warning: null,
    features: [
      { name: '\u8DE8 Agent \u901A\u8A0A', nameEn: 'Cross-Agent Communication', desc: '\u4E0D\u540C AI \u5DE5\u5177\u901A\u904E tmux \u6E9D\u901A', descEn: 'Different AI tools communicate via tmux' },
      { name: '\u7D42\u7AEF\u8B80\u53D6', nameEn: 'Terminal Reading', desc: '\u8B80\u53D6\u5176\u4ED6 agent \u7684\u7D42\u7AEF\u8F38\u51FA', descEn: 'Read other agent terminal output' },
      { name: 'MCP \u6A19\u6E96', nameEn: 'MCP Standard', desc: '\u6A19\u6E96 MCP \u5354\u8B70', descEn: 'Standard MCP protocol' }
    ],
    installNote: '',
    examples: ['\u8B93 Codex \u548C Claude Code \u5728\u4E0D\u540C tmux \u7A97\u683C\u5354\u4F5C', '\u67E5\u770B\u5176\u4ED6 agent \u7684\u7D42\u7AEF\u8F38\u51FA'],
    examplesEn: ['Have Codex and Claude Code collaborate in different tmux panes', 'View other agent terminal output'],
    suitableFor: '\u591A agent \u9032\u968E\u7528\u6236\u3001\u60F3\u8B93\u4E0D\u540C AI \u5DE5\u5177\u5354\u4F5C\u7684\u4EBA',
    suitableForEn: 'Advanced multi-agent users who want different AI tools to collaborate',
    isEssential: false,
    stars: 10,
    lastUpdated: '2026-03-30'
  }
];

// Check for duplicates
const existingIds = new Set(data.map(s => s.id));
const toAdd = newSkills.filter(s => {
  if (existingIds.has(s.id)) {
    console.log('SKIP (already exists):', s.id);
    return false;
  }
  return true;
});

data.push(...toAdd);
console.log('Added', toAdd.length, 'new skills');
console.log('New total:', data.length);

fs.writeFileSync('src/data/skills.json', JSON.stringify(data, null, 2) + '\n');
console.log('skills.json written successfully');
