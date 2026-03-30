/**
 * extract-and-merge.js
 *
 * 從 4 個 task output 檔案中提取 JSON 陣列，
 * 與現有 skills.json 合併、去重、修正欄位，
 * 輸出 skills.json 和 skill-audit.json
 */

const fs = require('fs');
const path = require('path');

// ── Paths ──────────────────────────────────────────────
const BASE = 'C:/Users/User/AppData/Local/Temp/claude/C--Users-User-Desktop-vibehq-hub-agents-51claw-pm/67a4096c-f1fe-4a76-84e3-6055928be38c/tasks/';
const OUTPUT_FILES = [
  'a36f2f9db6373ce14.output',
  'af4fe7bbcdc0e82af.output',
  'a4e81075775b5b248.output',
  'a8013bc317ae62964.output',
];
const SKILLS_PATH = 'C:/Users/User/Desktop/51claw/src/data/skills.json';
const AUDIT_PATH  = 'C:/Users/User/Desktop/51claw/src/data/skill-audit.json';

// ── Step 1 & 2: Read output files, extract JSON arrays ──
function extractJsonArrays(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n').filter(Boolean);
  const results = [];

  for (const line of lines) {
    const obj = JSON.parse(line);
    const content = obj.message?.content;
    let text = '';
    if (typeof content === 'string') {
      text = content;
    } else if (Array.isArray(content)) {
      text = content.map(c => c.text || '').join('\n');
    }

    // Match ```json ... ``` blocks
    const regex = /```json\n([\s\S]*?)\n```/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        if (Array.isArray(parsed)) {
          results.push(...parsed);
        }
      } catch (e) {
        // Skip unparseable blocks (e.g. user prompt examples)
      }
    }
  }
  return results;
}

console.log('=== Extracting from 4 output files ===\n');

let allNew = [];
for (const fname of OUTPUT_FILES) {
  const entries = extractJsonArrays(BASE + fname);
  console.log(`  ${fname}: ${entries.length} entries`);
  if (entries.length >= 2) {
    console.log(`    First 2: ${entries[0].id}, ${entries[1].id}`);
    console.log(`    Last  2: ${entries[entries.length - 2].id}, ${entries[entries.length - 1].id}`);
  }

  // Report field issues
  const sample = entries[0];
  if (sample) {
    const keys = Object.keys(sample);
    if (keys.includes('install') && !keys.includes('installCmd')) {
      console.log('    ⚠ Has "install" instead of "installCmd"');
    }
    if (!keys.includes('nameZh')) {
      console.log('    ⚠ Missing "nameZh" field');
    }
    const emptyWarnings = entries.filter(e => e.warning === '').length;
    if (emptyWarnings) console.log(`    ⚠ ${emptyWarnings} entries with warning:""`);
    const nullUrls = entries.filter(e => e.url === null).length;
    if (nullUrls) console.log(`    ⚠ ${nullUrls} entries with url:null`);
  }

  allNew.push(...entries);
}

console.log(`\n  Total new entries extracted: ${allNew.length}`);

// ── Step 3: Read existing skills.json ──
const existing = JSON.parse(fs.readFileSync(SKILLS_PATH, 'utf8'));
console.log(`  Existing skills: ${existing.length}`);

// ── Step 4: Fix existing skills ──
// Add missing fields to all existing skills
for (const skill of existing) {
  if (skill.installCmd === undefined) skill.installCmd = '';
  if (skill.source === undefined || skill.source === null) skill.source = '官方';
  if (skill.isOfficial === undefined) skill.isOfficial = true;
  if (skill.verdict === undefined || skill.verdict === null) skill.verdict = 'pass';
  if (skill.warning === undefined) skill.warning = null;

  // Category fixes
  if (skill.id === 'day1global' && skill.category === 'other') skill.category = 'trading';
  if (skill.id === 'x-research' && skill.category === 'other') skill.category = 'productivity';
}

// ── Step 5: Fix new skills ──
for (const skill of allNew) {
  // Rename "install" -> "installCmd"
  if (skill.install !== undefined && skill.installCmd === undefined) {
    skill.installCmd = skill.install;
    delete skill.install;
  }

  // Missing "nameZh" -> copy from "name"
  if (!skill.nameZh) {
    skill.nameZh = skill.name;
  }

  // warning:"" -> null for pass and reject verdicts
  if (skill.warning === '' && (skill.verdict === 'pass' || skill.verdict === 'reject')) {
    skill.warning = null;
  }

  // url:null -> ""
  if (skill.url === null) {
    skill.url = '';
  }

  // Ensure all standard fields exist
  if (skill.installCmd === undefined) skill.installCmd = '';
  if (skill.source === undefined) skill.source = '社群';
  if (skill.isOfficial === undefined) skill.isOfficial = false;
  if (skill.verdict === undefined) skill.verdict = 'pass';
  if (skill.warning === undefined) skill.warning = null;
  if (skill.installCount === undefined) skill.installCount = null;
  if (skill.features === undefined) skill.features = null;
}

// ── Step 6: Merge and deduplicate by id (new entries overwrite existing) ──
const mergedMap = new Map();
let dupeCount = 0;
const dupeIds = [];

// Add existing first
for (const skill of existing) {
  mergedMap.set(skill.id, skill);
}

// Then new entries (overwrite if duplicate)
for (const skill of allNew) {
  if (mergedMap.has(skill.id)) {
    dupeCount++;
    dupeIds.push(skill.id);
  }
  mergedMap.set(skill.id, skill);
}

const merged = [...mergedMap.values()];

// ── Normalize all entries to consistent field order ──
const FIELD_ORDER = [
  'id', 'name', 'nameZh', 'description', 'descriptionZh',
  'category', 'tags', 'tagsZh', 'icon', 'url', 'isFree',
  'installCmd', 'installCount', 'source', 'isOfficial',
  'verdict', 'warning', 'features'
];

const normalized = merged.map(skill => {
  const ordered = {};
  for (const key of FIELD_ORDER) {
    if (key in skill) {
      ordered[key] = skill[key];
    } else {
      // Set defaults for missing fields
      switch (key) {
        case 'installCmd': ordered[key] = ''; break;
        case 'installCount': ordered[key] = null; break;
        case 'source': ordered[key] = '社群'; break;
        case 'isOfficial': ordered[key] = false; break;
        case 'verdict': ordered[key] = 'pass'; break;
        case 'warning': ordered[key] = null; break;
        case 'features': ordered[key] = null; break;
        default: ordered[key] = null;
      }
    }
  }
  return ordered;
});

// ── Step 7: Write merged skills.json ──
fs.writeFileSync(SKILLS_PATH, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
console.log(`\n=== Wrote ${normalized.length} skills to skills.json ===`);

// ── Step 8: Generate skill-audit.json ──
// Include verdict/warning from all entries, plus 3 explicit rejects
const rejects = [
  { id: 'htx-skills-hub', reason: 'duplicate of htx', verdict: 'reject', warning: 'Duplicate entry - use htx instead' },
  { id: 'blockbeats-detail', reason: 'duplicate of blockbeats', verdict: 'reject', warning: 'Duplicate entry - use blockbeats instead' },
  { id: 'x-research-detail', reason: 'duplicate of x-research', verdict: 'reject', warning: 'Duplicate entry - use x-research instead' },
];

const auditEntries = normalized.map(s => ({
  id: s.id,
  name: s.name,
  verdict: s.verdict,
  warning: s.warning,
}));

// Add rejects
for (const r of rejects) {
  auditEntries.push({
    id: r.id,
    name: r.id,
    verdict: r.verdict,
    warning: r.warning,
  });
}

fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditEntries, null, 2) + '\n', 'utf8');
console.log(`  Wrote ${auditEntries.length} audit entries to skill-audit.json`);

// ── Step 9: Print summary ──
console.log('\n=== Summary ===');
console.log(`  Total skills: ${normalized.length}`);
console.log(`  Duplicates found (overwritten): ${dupeCount}`);
console.log(`  Unique duplicate IDs: ${[...new Set(dupeIds)].length}`);

const catDist = {};
for (const s of normalized) {
  catDist[s.category] = (catDist[s.category] || 0) + 1;
}
console.log('\n  Category distribution:');
const sortedCats = Object.entries(catDist).sort((a, b) => b[1] - a[1]);
for (const [cat, count] of sortedCats) {
  console.log(`    ${cat}: ${count}`);
}

// Verdict distribution
const verdictDist = {};
for (const a of auditEntries) {
  verdictDist[a.verdict] = (verdictDist[a.verdict] || 0) + 1;
}
console.log('\n  Verdict distribution (audit):');
for (const [v, c] of Object.entries(verdictDist)) {
  console.log(`    ${v}: ${c}`);
}
