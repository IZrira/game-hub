import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const WW_CHAR_DIR = path.join(ROOT_DIR, 'ww-hub', 'data', 'characters', 'ww');
const HSR_CHAR_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'characters', 'hsr');
const WEAPONS_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'weapons.ts');
const NOTION_DATA_FILE = path.join(ROOT_DIR, 'common-hub', 'data', 'notion-data.json');

const HSR_GUIDE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides');
const HSR_PARTY_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'parties');
const WW_GUIDE_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'guides.ts');
const WW_PARTY_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'parties.ts');

const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://rira-game-hub.pages.dev';
const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

// ---------------------------------------------------------------------
// Helper Functions (Adopted from generate-sitemap.js)
// ---------------------------------------------------------------------

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function encodeAssetPath(str) {
  return encodeURIComponent(str)
    .replace(/%20/g, '%20')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

function getCharacterIds(directory) {
  try {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory)
      .filter(file => file.endsWith('.ts'))
      .map(file => file.replace('.ts', ''));
  } catch (error) {
    return [];
  }
}

function parseHsrCharacter(id) {
  try {
    const filePath = path.join(HSR_CHAR_DIR, `${id}.ts`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const folderNameMatch = content.match(/folderName:\s*["'](.*?)["']/);
    const nameMatch = content.match(/name:\s*["'](.*?)["']/);
    const attributeMatch = content.match(/attribute:\s*["'](.*?)["']/);
    const pathMatch = content.match(/path:\s*["'](.*?)["']/);
    const rarityMatch = content.match(/rarity:\s*(\d+)/);
    const briefInfoMatch = content.match(/briefInfo:\s*["']([\s\S]*?)["']\s*,/);
    const isTrailblazer = content.includes('isTrailblazer: true') || id.startsWith('trailblazer_');

    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null,
      attribute: attributeMatch ? attributeMatch[1] : null,
      path: pathMatch ? pathMatch[1] : null,
      rarity: rarityMatch ? parseInt(rarityMatch[1], 10) : 5,
      briefInfo: briefInfoMatch ? briefInfoMatch[1] : null,
      isTrailblazer
    };
  } catch (error) {
    return null;
  }
}

function parseWwCharacter(id) {
  try {
    const filePath = path.join(WW_CHAR_DIR, `${id}.ts`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const folderNameMatch = content.match(/folderName:\s*["'](.*?)["']/);
    const nameMatch = content.match(/name:\s*["'](.*?)["']/);
    const isRover = content.includes('isRover: true') || id.startsWith('rover_');
    const attributeMatch = content.match(/attribute:\s*["'](.*?)["']/);
    const weaponTypeMatch = content.match(/weaponType:\s*["'](.*?)["']/);
    const rarityMatch = content.match(/rarity:\s*(\d+)/);
    const briefInfoMatch = content.match(/briefInfo:\s*["']([\s\S]*?)["']\s*,/);

    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null,
      isRover,
      attribute: attributeMatch ? attributeMatch[1] : '기류',
      weaponType: weaponTypeMatch ? weaponTypeMatch[1] : null,
      rarity: rarityMatch ? parseInt(rarityMatch[1], 10) : 5,
      briefInfo: briefInfoMatch ? briefInfoMatch[1] : null
    };
  } catch (error) {
    return null;
  }
}

function getWwWeapons() {
  const weapons = [];
  try {
    if (!fs.existsSync(WEAPONS_FILE)) return weapons;
    const content = fs.readFileSync(WEAPONS_FILE, 'utf8');
    const weaponRegex = /(?:id|id\s*):\s*["'](wp-[^"']+)["']\s*,\s*(?:name|name\s*):\s*["']([^"']+)["']/g;
    let match;
    while ((match = weaponRegex.exec(content)) !== null) {
      weapons.push({ id: match[1], name: match[2] });
    }
  } catch (error) {}
  return weapons;
}

function getNotionData() {
  try {
    if (!fs.existsSync(NOTION_DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(NOTION_DATA_FILE, 'utf8')) || [];
  } catch (error) {
    return [];
  }
}

function getHsrCharacterImageUrl(charData) {
  if (!charData) return `${CDN_URL}/hsr%20images/common/default_banner.webp`;
  if (charData.isTrailblazer) return `${CDN_URL}/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/%EA%B0%9C%EC%B2%99%EC%9E%90/art01.webp`;
  const folder = charData.folderName || charData.name || charData.id;
  return `${CDN_URL}/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/${encodeAssetPath(folder)}/art01.webp`;
}

function getWwCharacterImageUrl(charData) {
  if (!charData) return `${CDN_URL}/hsr%20images/common/default_banner.webp`;
  if (charData.isRover) {
    const folderName = charData.folderName || `방랑자 · ${charData.attribute}`;
    return `${CDN_URL}/ww%20images/skills/${encodeAssetPath(folderName)}/${encodeAssetPath(folderName)}%28%EC%95%AC%29.webp`;
  }
  const folder = charData.folderName || charData.name || charData.id;
  return `${CDN_URL}/ww%20images/skills/${encodeAssetPath(folder)}/${encodeAssetPath(folder)}.webp`;
}

// ---------------------------------------------------------------------
// TS Data Parsing Helpers
// ---------------------------------------------------------------------

function extractNameArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => {
    if (typeof item === 'string') return item.trim();
    if (item && typeof item === 'object' && item.name) return item.name.trim();
    return String(item).trim();
  }).filter(Boolean);
}

function formatTargetStats(targetStats) {
  if (!Array.isArray(targetStats)) return [];
  return targetStats.map(ts => {
    if (!ts) return null;
    if (typeof ts === 'string') return ts;
    if (ts.label) return `${ts.label} ${ts.value || ''}`.trim();
    return null;
  }).filter(Boolean);
}

function formatHsrMainStats(mainStats) {
  if (!mainStats || typeof mainStats !== 'object') return '';
  const parts = [];
  const getVal = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val.replace(/\n/g, ' ').trim();
    if (typeof val === 'object' && val.value) return String(val.value).replace(/\n/g, ' ').trim();
    return '';
  };
  const body = getVal(mainStats.body);
  const boots = getVal(mainStats.boots);
  const sphere = getVal(mainStats.sphere);
  const rope = getVal(mainStats.rope);

  if (body) parts.push(`바디(${body})`);
  if (boots) parts.push(`신발(${boots})`);
  if (sphere) parts.push(`차원구(${sphere})`);
  if (rope) parts.push(`연결 끈(${rope})`);
  return parts.join(', ');
}

function formatWwMainStats(mainStats) {
  if (!Array.isArray(mainStats) || mainStats.length === 0) return '';
  return mainStats.map(ms => {
    if (!ms) return null;
    const cost = ms.cost ? `${ms.cost}코스트` : '';
    const statsStr = Array.isArray(ms.stats) ? ms.stats.join('/') : (ms.stats || '');
    return `${cost} ${statsStr}`.trim();
  }).filter(Boolean).join(', ');
}

function loadHsrGuidesMap() {
  const map = new Map();
  try {
    if (!fs.existsSync(HSR_GUIDE_DIR)) return map;
    const files = fs.readdirSync(HSR_GUIDE_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    files.forEach(file => {
      try {
        const filePath = path.join(HSR_GUIDE_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/import\s+[\s\S]*?;/g, '');
        content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
        content = content.replace(/interface\s+[\s\S]*?\n\}/g, '');
        content = content.replace(/:\s*CharacterGuide\s*=/g, ' =');
        content = content.replace(/export\s+const\s+(\w+)\s*=\s*/, 'const $1 = ');

        const match = content.match(/const\s+(\w+)\s*=\s*([\s\S]+?);?\s*$/);
        if (match && match[2]) {
          const obj = new Function('return ' + match[2])();
          if (obj && obj.characterName) {
            map.set(obj.characterName.trim(), obj);
          }
        }
      } catch (err) {}
    });
  } catch (e) {}
  return map;
}

function loadHsrPartiesList() {
  const parties = [];
  try {
    if (!fs.existsSync(HSR_PARTY_DIR)) return parties;
    const files = fs.readdirSync(HSR_PARTY_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    files.forEach(file => {
      try {
        const filePath = path.join(HSR_PARTY_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/import\s+[\s\S]*?;/g, '');
        content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
        content = content.replace(/interface\s+[\s\S]*?\n\}/g, '');
        content = content.replace(/:\s*PartyCombination\[\]\s*=/g, ' =');
        content = content.replace(/export\s+const\s+\w+\s*=\s*/, 'const parties = ');

        const match = content.match(/const\s+parties\s*=\s*([\s\S]+?);?\s*$/);
        if (match && match[1]) {
          const list = new Function('return ' + match[1])();
          if (Array.isArray(list)) {
            parties.push(...list);
          }
        }
      } catch (err) {}
    });
  } catch (e) {}
  return parties;
}

function loadWwGuidesMap() {
  const map = new Map();
  try {
    if (!fs.existsSync(WW_GUIDE_FILE)) return map;
    let content = fs.readFileSync(WW_GUIDE_FILE, 'utf8');
    content = content.replace(/import\s+[\s\S]*?;/g, '');
    content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
    content = content.replace(/interface\s+[\s\S]*?\n\}/g, '');
    content = content.replace(/:\s*WuwaCharacterGuide\[\]\s*=/g, ' =');
    content = content.replace(/export\s+const\s+WW_CHARACTER_GUIDES\s*=\s*/, 'const WW_CHARACTER_GUIDES = ');

    const match = content.match(/const\s+WW_CHARACTER_GUIDES\s*=\s*([\s\S]+?);?\s*$/);
    if (match && match[1]) {
      const list = new Function('return ' + match[1])();
      if (Array.isArray(list)) {
        list.forEach(item => {
          if (item && item.id) {
            map.set(item.id.trim(), item);
          }
        });
      }
    }
  } catch (e) {}
  return map;
}

function loadWwPartiesList() {
  try {
    if (!fs.existsSync(WW_PARTY_FILE)) return [];
    let content = fs.readFileSync(WW_PARTY_FILE, 'utf8');
    content = content.replace(/import\s+[\s\S]*?;/g, '');
    content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
    content = content.replace(/interface\s+[\s\S]*?\n\}/g, '');
    content = content.replace(/:\s*PartyCombination\[\]\s*=/g, ' =');
    content = content.replace(/export\s+const\s+WW_PARTY_COMBINATIONS\s*=\s*/, 'const WW_PARTY_COMBINATIONS = ');

    const match = content.match(/const\s+WW_PARTY_COMBINATIONS\s*=\s*([\s\S]+?);?\s*$/);
    if (match && match[1]) {
      const list = new Function('return ' + match[1])();
      if (Array.isArray(list)) return list;
    }
  } catch (e) {}
  return [];
}

function getHsrPartiesForCharacter(charName, id, allParties) {
  const matched = [];
  if (!allParties || !Array.isArray(allParties)) return matched;

  allParties.forEach(p => {
    if (!p) return;
    const isMainDps = p.mainDPS === charName;
    const hasMember = Array.isArray(p.members) && p.members.some(m => m && (m.name === charName || (m.id && m.id.includes(id))));
    const hasTag = Array.isArray(p.tags) && p.tags.includes(charName);

    if (isMainDps || hasMember || hasTag) {
      const memberNames = (p.members || []).map(m => m.name).filter(Boolean);
      matched.push({
        name: p.name || '추천 파티',
        description: p.description || '',
        members: memberNames
      });
    }
  });
  return matched;
}

function getWwPartiesForCharacter(id, charName, allParties) {
  const matched = [];
  if (!allParties || !Array.isArray(allParties)) return matched;

  allParties.forEach(p => {
    if (!p) return;
    const hasMember = Array.isArray(p.members) && p.members.some(m => m && (m.id === id || m.name === charName));

    if (hasMember) {
      const memberNames = (p.members || []).map(m => m.name).filter(Boolean);
      matched.push({
        name: p.name || '추천 파티',
        description: p.description || '',
        members: memberNames
      });
    }
  });
  return matched;
}

// ---------------------------------------------------------------------
// Narrative Synthesis Generator
// ---------------------------------------------------------------------

function buildProfileParagraph(d) {
  let text = `${escapeHtml(d.name)}은(는) ${escapeHtml(d.gameName)}의 ${escapeHtml(d.rarityStr)}${escapeHtml(d.attributeStr)}${escapeHtml(d.typeStr)}캐릭터로, 독보적인 전투 메커니즘을 바탕으로 파티에서 핵심적인 역할을 담당합니다.`;
  if (d.briefInfo && !d.briefInfo.startsWith('character.')) {
    const cleanBrief = escapeHtml(d.briefInfo.replace(/\n/g, ' ').trim());
    text += ` (${cleanBrief})`;
  }
  return `  <p class="summary-profile"><strong>개요 및 전투 역할:</strong> ${text}</p>`;
}

function buildEquipmentParagraph(d) {
  let parts = [];
  if (d.bestGear && d.bestGear.length > 0) {
    const gearText = d.bestGear.slice(0, 2).map(escapeHtml).join(', ');
    let subText = (d.subGear && d.subGear.length > 0) ? ` 및 장신구/주 에코 「${d.subGear.slice(0, 2).map(escapeHtml).join(', ')}」` : '';
    parts.push(`추천 종결 장비(유물/에코) 세팅으로는 「${gearText}」${subText} 조합이 권장됩니다.`);
  } else {
    parts.push(`유물 및 에코 세팅은 캐릭터의 핵심 옵션을 효율적으로 높일 수 있는 조합 선택이 권장됩니다.`);
  }

  if (d.bestWeapons && d.bestWeapons.length > 0) {
    const weaponText = d.bestWeapons.slice(0, 2).map(escapeHtml).join(', ');
    parts.push(`최우선 추천 종결 무기(광추)로는 「${weaponText}」이(가) 가장 뛰어난 성능 효율을 제공합니다.`);
  } else {
    parts.push(`무기(광추)의 경우 캐릭터의 유효 옵션을 보완해 주는 장비를 우선 채용하는 것이 좋습니다.`);
  }

  return `  <p class="summary-equipment"><strong>추천 종결 장비 &amp; 무기:</strong> ${parts.join(' ')}</p>`;
}

function buildStatsParagraph(d) {
  let parts = [];
  if (d.targetStats && d.targetStats.length > 0) {
    const targetText = d.targetStats.slice(0, 3).map(escapeHtml).join(', ');
    parts.push(`육성 시 달성해야 할 핵심 목표 스탯으로는 ${targetText} 설정이 권장됩니다.`);
  } else {
    parts.push(`육성 시 주요 전투 스탯의 균형 있는 성장을 목표로 세팅하는 것이 중요합니다.`);
  }

  if (d.mainStatsStr) {
    parts.push(`주요 부위 주옵션으로는 ${escapeHtml(d.mainStatsStr)} 세팅이 추천됩니다.`);
  }

  if (d.subStats && d.subStats.length > 0) {
    const subText = d.subStats.slice(0, 4).map(escapeHtml).join(', ');
    parts.push(`우선 유효 부옵션으로는 ${subText} 순으로 옵션을 확보하는 것이 좋습니다.`);
  } else {
    parts.push(`부옵션의 경우 딜링 및 생존 효율을 높이는 옵션 위주로 가공하는 것을 권장합니다.`);
  }

  return `  <p class="summary-stats"><strong>목표 스탯 &amp; 옵션 우선순위:</strong> ${parts.join(' ')}</p>`;
}

function buildSynergyParagraph(d) {
  let parts = [];
  if (d.parties && d.parties.length > 0) {
    const p = d.parties[0];
    const partyName = escapeHtml(p.name);
    const memberText = p.members.map(escapeHtml).join(', ');
    parts.push(`추천 파티 조합으로는 『${partyName}』 (${memberText}) 구성을 통해 극대화된 전투 시너지를 기대할 수 있습니다.`);
  } else if (d.synergyChars && d.synergyChars.length > 0) {
    const synText = d.synergyChars.slice(0, 4).map(escapeHtml).join(', ');
    parts.push(`추천 시너지 파티원으로는 ${synText} 등과의 조합이 전투 성능 향상에 크게 기여합니다.`);
  } else {
    parts.push(`파티 구성 시 서로의 속성 및 버프/디버프 시너지를 보완할 수 있는 동료들과의 조합을 추천합니다.`);
  }

  return `  <p class="summary-synergy"><strong>추천 파티 조합 &amp; 팀 시너지:</strong> ${parts.join(' ')}</p>`;
}

function generateNarrativeSummaryHtml(data) {
  return `<section class="narrative-analysis-summary" style="margin-bottom: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">\n` +
    `  <h2>Character Analysis Summary (캐릭터 종합 분석)</h2>\n` +
    `${buildProfileParagraph(data)}\n` +
    `${buildEquipmentParagraph(data)}\n` +
    `${buildStatsParagraph(data)}\n` +
    `${buildSynergyParagraph(data)}\n` +
    `</section>\n`;
}

// ---------------------------------------------------------------------
// Blog Data Parsing
// ---------------------------------------------------------------------
function getBlogPosts() {
  const filePath = path.join(ROOT_DIR, 'common-hub', 'data', 'blogData.ts');
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    const arrayStringMatch = content.match(/export const BLOG_POSTS[^\[]*(\[[\s\S]*\]);/);
    if (arrayStringMatch && arrayStringMatch[1]) {
      const posts = new Function('return ' + arrayStringMatch[1])();
      return posts;
    }
  } catch (e) {
    console.error("Failed to parse blogData.ts", e);
  }
  return [];
}

// ---------------------------------------------------------------------
// Injection Logic
// ---------------------------------------------------------------------

function generateDiscussionForumPostingSchema(charName, routePath) {
  const canonicalUrl = `${BASE_URL}${routePath}`;
  return {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": `${charName} 유저 평가 및 리뷰`,
    "url": canonicalUrl,
    "datePublished": "2024-05-01T00:00:00Z",
    "author": {
      "@type": "Organization",
      "name": "RIRA ARCHIVE Community"
    },
    "comment": [
      {
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": "Archive Explorer"
        },
        "datePublished": "2024-05-01T00:00:00Z",
        "text": "Outstanding character design and synergy! Highly recommended for end-game content.",
        "upvoteCount": 5,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": "5",
          "worstRating": "1"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": 5
        }
      },
      {
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": "Tactical Analyst"
        },
        "datePublished": "2024-05-01T12:00:00Z",
        "text": "Totally agree! Pairing with top-tier supports yields massive damage output.",
        "upvoteCount": 2,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": "5",
          "worstRating": "1"
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": 2
        }
      }
    ]
  };
}

function injectMetaAndContent(html, title, description, imageUrl, urlPath, innerContent = '', jsonLdSchema = null) {
  let injected = html;
  
  // Replace Title
  injected = injected.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)} | RIRA ARCHIVE</title>`);
  
  // Replace og:title
  injected = injected.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)} | RIRA ARCHIVE" />`);
  
  // Replace description
  injected = injected.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  
  // Replace og:description
  injected = injected.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  
  // Inject missing og/twitter tags and optional JSON-LD schema into <head>
  let extraTags = `
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:url" content="${escapeHtml(BASE_URL)}${escapeHtml(urlPath)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)} | RIRA ARCHIVE" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  `;

  if (jsonLdSchema) {
    extraTags += `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLdSchema, null, 2)}\n    </script>`;
  }
  
  injected = injected.replace('</head>', `${extraTags}\n  </head>`);
  
  // Inject DOM Content for AdSense Bot using safe function-based replacer
  if (innerContent) {
    injected = injected.replace(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i, () => `<div id="root">${innerContent}</div>`);
  }
  
  return injected;
}

function createPrerenderedPage(routePath, title, description, imageUrl, baseHtml, innerContent = '', jsonLdSchema = null) {
  const targetDir = path.join(DIST_DIR, ...routePath.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });
  
  const finalHtml = injectMetaAndContent(baseHtml, title, description, imageUrl, routePath, innerContent, jsonLdSchema);
  fs.writeFileSync(path.join(targetDir, 'index.html'), finalHtml, 'utf8');
}

// ---------------------------------------------------------------------
// SEO HTML Generators
// ---------------------------------------------------------------------
const WW_KO_FILE = path.join(ROOT_DIR, 'common-hub', 'locales', 'ww', 'ww_characters_ko.json');
const WW_WEAPON_KO_FILE = path.join(ROOT_DIR, 'common-hub', 'locales', 'ww', 'ww_weapons_ko.json');
const HSR_KO_FILE = path.join(ROOT_DIR, 'common-hub', 'locales', 'hsr', 'hsr_characters_ko.json');

const wwKoData = fs.existsSync(WW_KO_FILE) ? JSON.parse(fs.readFileSync(WW_KO_FILE, 'utf8')) : {};
const wwWeaponKoData = fs.existsSync(WW_WEAPON_KO_FILE) ? JSON.parse(fs.readFileSync(WW_WEAPON_KO_FILE, 'utf8')) : {};
const hsrKoData = fs.existsSync(HSR_KO_FILE) ? JSON.parse(fs.readFileSync(HSR_KO_FILE, 'utf8')) : {};

function generateWwCharacterHtml(id, wwGuidesMap, wwPartiesList) {
  const charMeta = parseWwCharacter(id);
  let name = wwKoData[`character.${id}.name`] || (charMeta ? charMeta.name : null) || id;
  if (name && name.startsWith('character.')) {
    name = charMeta?.folderName || id;
  }
  let briefInfo = wwKoData[`character.${id}.briefInfo`] || charMeta?.briefInfo || '';
  if (briefInfo && briefInfo.startsWith('character.')) {
    briefInfo = '';
  }
  const guide = wwGuidesMap.get(id);
  const matchedParties = getWwPartiesForCharacter(id, name, wwPartiesList);

  let bestGear = extractNameArray(guide?.echoSets);
  let subGear = extractNameArray(guide?.mainEchoes);
  if (bestGear.length === 0 && guide?.variants?.[0]) {
    bestGear = extractNameArray(guide.variants[0].echoSets);
    subGear = extractNameArray(guide.variants[0].mainEchoes);
  }

  const bestWeapons = (guide?.weapons || [])
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .map(w => w.name);

  const targetStats = formatTargetStats(guide?.targetStats);
  const mainStatsStr = formatWwMainStats(guide?.mainStats || (guide?.variants?.[0]?.mainStats));
  const subStats = guide?.subStats || [];
  const synergyChars = guide?.synergyCharacters || [];

  const normData = {
    name,
    gameName: '명조: 워더링 웨이브',
    rarityStr: charMeta?.rarity ? `${charMeta.rarity}성 ` : '5성 ',
    attributeStr: charMeta?.attribute ? `${charMeta.attribute} 속성 ` : '',
    typeStr: charMeta?.weaponType ? `${charMeta.weaponType} 무기 ` : '',
    briefInfo,
    bestGear,
    subGear,
    bestWeapons,
    targetStats,
    mainStatsStr,
    subStats,
    parties: matchedParties,
    synergyChars
  };

  const narrativeSummaryHtml = generateNarrativeSummaryHtml(normData);

  let html = `<article>\n`;
  html += `<h1>${escapeHtml(name)} 상세 가이드</h1>\n`;
  html += narrativeSummaryHtml;
  html += `<h2>해당 캐릭터의 전투 스타일과 주요 스킬 정보입니다.</h2>\n`;
  
  for (const [key, value] of Object.entries(wwKoData)) {
    if (key.startsWith(`character.${id}.`) && key !== `character.${id}.name` && key !== `character.${id}.briefInfo`) {
       if (typeof value === 'string' && value.length > 0) {
         if (key.endsWith('.name')) {
           html += `<h3>${escapeHtml(value)}</h3>\n`;
         } else {
           html += `<p>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>\n`;
         }
       }
    }
  }
  html += `</article>`;
  return html;
}

function generateHsrCharacterHtml(id, hsrGuidesMap, hsrPartiesList) {
  const charMeta = parseHsrCharacter(id);
  let name = hsrKoData[`character.${id}.name`] || (charMeta ? charMeta.name : null) || id;
  if (name && name.startsWith('character.')) {
    name = charMeta?.folderName || id;
  }
  let briefInfo = charMeta?.briefInfo || hsrKoData[`character.${id}.briefInfo`] || '';
  if (briefInfo && briefInfo.startsWith('character.')) {
    briefInfo = '';
  }
  const guide = hsrGuidesMap.get(name);
  const matchedParties = getHsrPartiesForCharacter(name, id, hsrPartiesList);

  const bestGear = extractNameArray(guide?.bestRelics || (guide?.variants?.[0]?.bestRelics));
  const subGear = extractNameArray(guide?.bestOrnaments || (guide?.variants?.[0]?.bestOrnaments));
  const bestWeapons = extractNameArray(guide?.bestLightCones || (guide?.variants?.[0]?.bestLightCones));
  const targetStats = formatTargetStats(guide?.targetStats || (guide?.variants?.[0]?.targetStats));
  const mainStatsStr = formatHsrMainStats(guide?.mainStats || (guide?.variants?.[0]?.mainStats));
  const subStats = guide?.subStats || guide?.variants?.[0]?.subStats || [];

  const normData = {
    name,
    gameName: '붕괴: 스타레일',
    rarityStr: charMeta?.rarity ? `${charMeta.rarity}성 ` : '5성 ',
    attributeStr: charMeta?.attribute ? `${charMeta.attribute} 속성 ` : '',
    typeStr: charMeta?.path ? `${charMeta.path} 운명의 길 ` : '',
    briefInfo: charMeta?.briefInfo || (hsrKoData[`character.${id}.briefInfo`] || ''),
    bestGear,
    subGear,
    bestWeapons,
    targetStats,
    mainStatsStr,
    subStats,
    parties: matchedParties,
    synergyChars: []
  };

  const narrativeSummaryHtml = generateNarrativeSummaryHtml(normData);

  let html = `<article>\n`;
  html += `<h1>${escapeHtml(name)} 상세 가이드</h1>\n`;
  html += narrativeSummaryHtml;
  html += `<h2>해당 캐릭터의 전투 스타일과 주요 스킬 정보입니다.</h2>\n`;
  
  for (const [key, value] of Object.entries(hsrKoData)) {
    if (key.startsWith(`character.${id}.`) && key !== `character.${id}.name`) {
       if (typeof value === 'string' && value.length > 0) {
         if (key.endsWith('.name')) {
           html += `<h3>${escapeHtml(value)}</h3>\n`;
         } else {
           html += `<p>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>\n`;
         }
       }
    }
  }
  html += `</article>`;
  return html;
}

function generateWwWeaponHtml(id) {
  let html = `<article>\n`;
  for (const [key, value] of Object.entries(wwWeaponKoData)) {
    if (key.includes(`.${id}.`)) {
       if (key.endsWith('.name') || key.endsWith('.skillName')) {
         html += `<h3>${escapeHtml(value)}</h3>\n`;
       } else {
         html += `<p>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>\n`;
       }
    }
  }
  html += `</article>`;
  return html;
}

function generateNotionHtml(item) {
  const isCharacter = (item.type || '') === '캐릭터';
  let html = `<article>\n`;
  html += `<h1>${escapeHtml(item.name)}</h1>\n`;

  if (isCharacter) {
    const isNte = item.gameId === 'nte' || item.dbSource === 'nte_characters';
    const gameName = isNte ? '네버니스 투 에버니스' : '명조: 워더링 웨이브';
    const normData = {
      name: item.name,
      gameName,
      rarityStr: item.rarity ? `${item.rarity}성 ` : '',
      attributeStr: item.attribute ? `${item.attribute} 속성 ` : '',
      typeStr: item.weaponType ? `${item.weaponType} ` : '',
      briefInfo: item.briefInfo || item.content || '',
      bestGear: [],
      subGear: [],
      bestWeapons: [],
      targetStats: [],
      mainStatsStr: '',
      subStats: [],
      parties: [],
      synergyChars: []
    };
    html += generateNarrativeSummaryHtml(normData);
  }

  html += `<h2>해당 항목의 세부 정보 및 가이드입니다.</h2>\n`;
  
  const textFields = ['briefInfo', 'content', 'citySkill', 'virailSkill', 'basicAttack', 'ultimateSkill', 'supportSkill', 'passiveSkill1', 'passiveSkill2', 'awakenings', 'resonance', 'glossary'];
  
  textFields.forEach(field => {
    if (item[field] && typeof item[field] === 'string') {
      html += `<p>${escapeHtml(item[field]).replace(/\n/g, '<br/>')}</p>\n`;
    }
  });
  
  html += `</article>`;
  return html;
}

// ---------------------------------------------------------------------
// Main Execution
// ---------------------------------------------------------------------

function runPrerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('❌ dist/index.html not found! Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  let count = 0;

  console.log('🚀 Starting Static Meta Injection for Prerendering...');

  const hsrGuidesMap = loadHsrGuidesMap();
  const hsrPartiesList = loadHsrPartiesList();
  const wwGuidesMap = loadWwGuidesMap();
  const wwPartiesList = loadWwPartiesList();

  // 1. WW Characters
  const wwIds = getCharacterIds(WW_CHAR_DIR);
  wwIds.forEach(id => {
    const char = parseWwCharacter(id);
    if (!char) return;
    let name = wwKoData[`character.${id}.name`] || char.name || id;
    if (name.startsWith('character.')) {
      name = char.folderName || id;
    }
    const routePath = `/gallery/ww/character/${id}`;
    createPrerenderedPage(
      routePath,
      `${name} 종결 세팅 · 추천 파티 조합 & 돌파 재료 계산 | 명조 공략 DB`,
      `명조 ${name}의 최신 종결 에코 세팅, 추천 무기, 스킬 매커니즘 계수, 추천 파티 시너지 및 돌파·육성 재료 총정리 가이드.`,
      getWwCharacterImageUrl(char),
      baseHtml,
      generateWwCharacterHtml(id, wwGuidesMap, wwPartiesList),
      generateDiscussionForumPostingSchema(name, routePath)
    );
    count++;
  });

  // 2. HSR Characters
  const hsrIds = getCharacterIds(HSR_CHAR_DIR);
  hsrIds.forEach(id => {
    const char = parseHsrCharacter(id);
    if (!char) return;
    let name = hsrKoData[`character.${id}.name`] || char.name || id;
    if (name.startsWith('character.')) {
      name = char.folderName || id;
    }
    const routePath = `/gallery/hsr/character/${id}`;
    createPrerenderedPage(
      routePath,
      `${name} 종결 세팅 · 추천 파티 조합 & 육성 재료 | 붕괴: 스타레일 공략 DB`,
      `붕괴: 스타레일 ${name}의 최신 추천 유물 및 장신구, 광추 랭킹, 종결 스탯 세팅, 추천 파티 조합 및 행적·돌파 재료 총정리 가이드.`,
      getHsrCharacterImageUrl(char),
      baseHtml,
      generateHsrCharacterHtml(id, hsrGuidesMap, hsrPartiesList),
      generateDiscussionForumPostingSchema(name, routePath)
    );
    count++;
  });

  // 3. WW Weapons
  const wwWeapons = getWwWeapons();
  wwWeapons.forEach(wp => {
    createPrerenderedPage(
      `/gallery/ww/weapon/${encodeURIComponent(wp.name)}`,
      `${wp.name} 옵션 비교 및 추천 착용 캐릭터 | 명조 무기 DB`,
      `명조 무기 ${wp.name}의 돌파별 상세 능력치, 스킬 효과, 속성 보너스 및 추천 캐릭터 완벽 분석 가이드.`,
      `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(wp.name)}.webp`,
      baseHtml,
      generateWwWeaponHtml(wp.id)
    );
    count++;
  });

  // 4. Notion Data (Future items/characters)
  const notionData = getNotionData();
  notionData.forEach(item => {
    if (!item.name) return;
    const cleanType = item.type || '';
    if (['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(cleanType)) {
      createPrerenderedPage(
        `/gallery/ww/weapon/${encodeURIComponent(item.name)}`,
        `${item.name} 옵션 비교 및 추천 착용 캐릭터 | 명조 무기 DB`,
        `명조 ${item.name}의 돌파별 상세 능력치, 스킬 효과, 속성 보너스 및 추천 캐릭터 완벽 분석 가이드.`,
        `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(item.name)}.webp`,
        baseHtml,
        generateNotionHtml(item)
      );
      count++;
    } else if (cleanType === '캐릭터') {
      const isNte = item.gameId === 'nte' || item.dbSource === 'nte_characters';
      const gamePath = isNte ? 'nte' : 'ww';
      const gameLabel = isNte ? '이환(NTE)' : '명조';
      const imagePath = isNte 
        ? `${CDN_URL}/nte%20images/skills/${encodeAssetPath(item.name)}/${encodeAssetPath(item.name)}.webp`
        : `${CDN_URL}/ww%20images/characters/${encodeAssetPath(item.name)}/art01.webp`;
      const routePath = `/gallery/${gamePath}/character/${encodeURIComponent(item.name)}`;
      
      createPrerenderedPage(
        routePath,
        `${item.name} 종결 세팅 · 추천 파티 조합 & 스킬 매커니즘 | ${gameLabel} 공략 DB`,
        `${gameLabel} ${item.name}의 최신 종결 세팅, 스킬 매커니즘 계수, 추천 파티 조합 및 돌파 재료 총정리 가이드.`,
        imagePath,
        baseHtml,
        generateNotionHtml(item),
        generateDiscussionForumPostingSchema(item.name, routePath)
      );
      count++;
    }
  });

  // 5. AdSense SEO Pages (Privacy, ToS, About, Blog List)
  const policyPages = [
    {
      path: '/about',
      title: 'About Us',
      desc: 'Rira Archive 소개 및 운영 원칙에 대해 안내합니다.',
      content: `<h1>About Us - RIRA ARCHIVE</h1><p>Rira Archive는 붕괴: 스타레일, 명조 등 최신 트렌디한 게임들의 데이터를 분석하고 최고의 공략과 티어표를 제공하는 게임 허브입니다. 유저들에게 가장 신속하고 정확한 정보를 전달하는 것을 목표로 합니다.</p>`
    },
    {
      path: '/privacy',
      title: '개인정보 처리방침 (Privacy Policy)',
      desc: 'Rira Archive의 개인정보 처리방침을 확인하세요.',
      content: `<h1>개인정보 처리방침 (Privacy Policy)</h1><p>본 사이트는 Google AdSense를 포함한 서드파티 쿠키를 사용하여 사용자 맞춤형 광고를 제공할 수 있습니다. 수집된 데이터는 오직 더 나은 서비스 제공과 사이트 분석을 위해서만 사용되며, 철저하게 보호됩니다.</p>`
    },
    {
      path: '/tos',
      title: '이용약관 (Terms of Service)',
      desc: 'Rira Archive 서비스 이용약관을 확인하세요.',
      content: `<h1>이용약관 (Terms of Service)</h1><p>본 사이트의 모든 정보와 공략글은 참고용으로 제공되며, 게임사의 공식적인 입장을 대변하지 않습니다. 무단 전재 및 재배포를 금지합니다.</p>`
    },
    {
      path: '/blog',
      title: '인텔리전스 블로그',
      desc: 'Rira Game Hub의 심층 분석 게임 칼럼과 가이드를 만나보세요.',
      content: `<h1>인텔리전스 블로그</h1><p>Rira Archive에서 제공하는 게임 심층 분석, 최신 메타 리뷰, 그리고 패치 노트 해석을 만나보실 수 있습니다.</p>`
    }
  ];

  policyPages.forEach(page => {
    createPrerenderedPage(
      page.path,
      page.title,
      page.desc,
      `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      page.content
    );
    count++;
  });

  // 6. Blog Posts (Critical for AdSense Content Check)
  const blogPosts = getBlogPosts();
  blogPosts.forEach(post => {
    const postHtmlContent = `
      <article>
        <h1>${escapeHtml(post.title)}</h1>
        <p><strong>작성일:</strong> ${escapeHtml(post.date)} | <strong>작성자:</strong> ${escapeHtml(post.author)} | <strong>카테고리:</strong> ${escapeHtml(post.category)}</p>
        <p><em>${escapeHtml(post.excerpt)}</em></p>
        <div class="blog-content">
          ${post.content.split('\n').map(line => {
            if (line.startsWith('###')) return `<h3>${escapeHtml(line.replace(/###/g, '').trim())}</h3>`;
            if (line.trim() === '') return '<br/>';
            return `<p>${escapeHtml(line)}</p>`;
          }).join('\n')}
        </div>
      </article>
    `;

    createPrerenderedPage(
      `/blog/${post.id}`,
      post.title,
      post.excerpt,
      post.imageUrl || `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      postHtmlContent
    );
    count++;
  });

  // 7. No-Index Utility Pages (Search, Login, Profile, Admin)
  const noIndexPages = ['/search', '/login', '/profile', '/admin'];
  noIndexPages.forEach(routePath => {
    const targetDir = path.join(DIST_DIR, ...routePath.split('/').filter(Boolean));
    fs.mkdirSync(targetDir, { recursive: true });
    
    let noIndexHtml = baseHtml.replace('</head>', `
      <meta name="robots" content="noindex, nofollow" />
      <title>Rira Archive - Restricted</title>
    </head>`);
    
    fs.writeFileSync(path.join(targetDir, 'index.html'), noIndexHtml, 'utf8');
    count++;
  });

  console.log(`✅ Successfully injected static meta and DOM tags for ${count} dynamic routes!`);
}

runPrerender();
