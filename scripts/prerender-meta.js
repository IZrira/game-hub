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
const SITEMAP_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');
const ANIIMO_DATA_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');

const HSR_GUIDE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides');
const HSR_PARTY_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'parties');
const WW_GUIDE_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'guides.ts');
const WW_PARTY_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'parties.ts');

const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://riragamehub.com';
const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
const prerenderedRoutes = new Set();

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
        content = content.replace(/export\s+const\s+([^\s=:]+)\s*=\s*/, 'const $1 = ');

        const match = content.match(/const\s+([^\s=:]+)\s*=\s*([\s\S]+?);?\s*$/);
        if (match && match[2]) {
          const obj = new Function('return ' + match[2])();
          if (obj && obj.characterName) {
            map.set(obj.characterName.trim(), obj);
            map.set(file.replace('.ts', '').trim(), obj);
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
        content = content.replace(/export\s+const\s+[^\s=:]+\s*=\s*/, 'const parties = ');

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
    // Notion 연동 가이드 로드
    const notionData = getNotionData();
    notionData.forEach(item => {
      if (item.dbSource === 'ww_guides') {
        if (item.id) map.set(item.id.trim(), item);
        if (item.name) map.set(item.name.trim(), item);
      }
    });
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

function generateGuideSchema(charName, gameName, routePath, imageUrl) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "홈",
            "item": "https://rira-game-hub.pages.dev"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": gameName,
            "item": `https://rira-game-hub.pages.dev${routePath.split('/').slice(0, 3).join('/')}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${charName} 공략`,
            "item": `https://rira-game-hub.pages.dev${routePath}`
          }
        ]
      },
      {
        "@type": "Article",
        "headline": `${gameName} ${charName} 종결 육성 공략 가이드`,
        "image": imageUrl,
        "author": {
          "@type": "Organization",
          "name": "RIRA Game Archive"
        },
        "publisher": {
          "@type": "Organization",
          "name": "RIRA Game Archive",
          "logo": {
            "@type": "ImageObject",
            "url": "https://rira-game-hub.pages.dev/assets/logo.png"
          }
        },
        "description": `${gameName} ${charName}의 추천 무기/광추, 에코/유물 세팅, 추천 파티 조합 및 스탯 목표치 완벽 공략.`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://rira-game-hub.pages.dev${routePath}`
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
  
  // The SPA shell has no stable canonical, so make every prerendered route explicit.
  injected = injected.replace(/\s*<link\s+rel=["']canonical["'][^>]*>\s*/gi, '\n');

  // Inject missing canonical/og/twitter tags and optional JSON-LD schema into <head>
  let extraTags = `
    <link rel="canonical" href="${escapeHtml(BASE_URL)}${escapeHtml(urlPath)}" />
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
  
  // Keep prerendered content inside #root so React replaces it completely on mount.
  if (innerContent) {
    const startMarker = '<!-- PRERENDER_CONTENT_START -->';
    const endMarker = '<!-- PRERENDER_CONTENT_END -->';
    const startIndex = injected.indexOf(startMarker);
    const endIndex = injected.indexOf(endMarker);
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      throw new Error('Prerender content markers are missing or malformed in index.html.');
    }
    injected = `${injected.slice(0, startIndex + startMarker.length)}\n${innerContent}\n    ${injected.slice(endIndex)}`;
  }
  
  return injected;
}

function createPrerenderedPage(routePath, title, description, imageUrl, baseHtml, innerContent = '', jsonLdSchema = null) {
  // Static hosts resolve percent-encoded URLs to decoded filesystem names.
  // decodeURI preserves reserved characters such as %2F and %3A while decoding
  // Korean names and spaces, which also keeps the path safe on Windows builds.
  const routeSegments = routePath.split('/').filter(Boolean).map(segment => decodeURI(segment));
  const targetDir = path.join(DIST_DIR, ...routeSegments);
  fs.mkdirSync(targetDir, { recursive: true });
  
  const finalHtml = injectMetaAndContent(baseHtml, title, description, imageUrl, routePath, innerContent, jsonLdSchema);
  fs.writeFileSync(path.join(targetDir, 'index.html'), finalHtml, 'utf8');
  prerenderedRoutes.add(routePath);
}

function getSitemapRoutes() {
  if (!fs.existsSync(SITEMAP_FILE)) {
    throw new Error('public/sitemap.xml not found. Generate the sitemap before prerendering.');
  }

  const xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(match => match[1].replace(/&amp;/g, '&'))
    .filter(url => url.startsWith(BASE_URL))
    .map(url => new URL(url).pathname);
}

function getFallbackMeta(routePath) {
  const parts = routePath.split('/').filter(Boolean).map(part => decodeURIComponent(part));
  const entityName = parts.at(-1) || 'Rira Archive';
  const game = parts[1];
  const type = parts[2];
  const gameLabel = game === 'hsr' ? '붕괴: 스타레일' : game === 'ww' ? '명조' : game === 'nte' ? '이환(NTE)' : game === 'aniimo' ? '애니모(Aniimo)' : 'Rira Archive';
  const typeLabels = {
    lightcone: '광추', relic: '유물', ornament: '차원 장신구', echo: '에코',
    weapon: '무기', character: '캐릭터', guide: '공략'
  };
  const typeLabel = typeLabels[type] || '게임 정보';
  const title = parts.length >= 4
    ? `${entityName} 상세 정보 | ${gameLabel} ${typeLabel} DB`
    : `${gameLabel} ${typeLabel} | Rira Archive`;
  const description = parts.length >= 4
    ? `${gameLabel} ${entityName}의 최신 상세 정보, 능력치와 활용 정보를 확인하세요.`
    : `${gameLabel}의 최신 데이터, 공략과 추천 정보를 확인하세요.`;
  const content = `<article><h1>${escapeHtml(entityName)}</h1><p>${escapeHtml(description)}</p></article>`;
  return { title, description, content };
}

function generateInternalLinkList(title, routes) {
  if (routes.length === 0) return '';
  const links = routes.map(route => {
    const label = decodeURIComponent(route.split('/').filter(Boolean).at(-1) || route);
    return `<li><a href="${escapeHtml(route)}">${escapeHtml(label)}</a></li>`;
  }).join('\n');
  return `<nav aria-label="${escapeHtml(title)}"><h2>${escapeHtml(title)}</h2><ul>${links}</ul></nav>`;
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

function generateWwGuideHtml(id, guide, char) {
  let name = wwKoData[`character.${id}.name`] || char?.name || guide?.name || id;
  if (name && name.startsWith('character.')) {
    name = char?.folderName || guide?.name || id;
  }
  let html = `<article>\n`;
  html += `<h1>명조: 워더링 웨이브 ${escapeHtml(name)} 종결 육성 공략 가이드</h1>\n`;
  if (guide?.patchVersion) {
    html += `<p><strong>적용 패치 버전:</strong> v${escapeHtml(guide.patchVersion)}</p>\n`;
  }

  // 추천 무기 랭킹
  if (guide?.weapons && Array.isArray(guide.weapons) && guide.weapons.length > 0) {
    html += `<h2>${escapeHtml(name)} 추천 무기 순위</h2>\n<ol>\n`;
    guide.weapons.forEach(w => {
      let wName = w.name;
      let wNote = w.note;
      if (!wNote && (wName.includes(':') || wName.includes('：'))) {
        const parts = wName.split(/[:：]/);
        wName = parts[0].trim();
        wNote = parts.slice(1).join(':').trim();
      }
      html += `<li><strong>${w.rank || ''}순위:</strong> ${escapeHtml(wName)}${wNote ? ` (${escapeHtml(wNote)})` : ''}</li>\n`;
    });
    html += `</ol>\n`;
  }

  // 추천 에코 세트
  if (guide?.echoSets && Array.isArray(guide.echoSets) && guide.echoSets.length > 0) {
    html += `<h2>추천 에코 세트</h2>\n<ul>\n`;
    guide.echoSets.forEach(e => {
      let eName = typeof e === 'string' ? e : e?.name;
      let eNote = typeof e === 'object' && e ? e.note : '';
      if (!eNote && (eName.includes(':') || eName.includes('：'))) {
        const parts = eName.split(/[:：]/);
        eName = parts[0].trim();
        eNote = parts.slice(1).join(':').trim();
      }
      html += `<li>${escapeHtml(eName)}${eNote ? ` (${escapeHtml(eNote)})` : ''}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 메인 에코
  if (guide?.mainEchoes && Array.isArray(guide.mainEchoes) && guide.mainEchoes.length > 0) {
    html += `<h2>메인 에코 및 채용 이유</h2>\n<ul>\n`;
    guide.mainEchoes.forEach(me => {
      let meName = me.name;
      let meReason = me.reason;
      if (!meReason && (meName.includes(':') || meName.includes('：'))) {
        const parts = meName.split(/[:：]/);
        meName = parts[0].trim();
        meReason = parts.slice(1).join(':').trim();
      }
      html += `<li><strong>${escapeHtml(meName)}</strong>${meReason ? `: ${escapeHtml(meReason)}` : ''}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 종결 목표 스탯
  if (guide?.targetStats && Array.isArray(guide.targetStats) && guide.targetStats.length > 0) {
    html += `<h2>목표 육성 수치 (종결 스탯)</h2>\n<ul>\n`;
    guide.targetStats.forEach(ts => {
      if (ts && ts.label) {
        html += `<li><strong>${escapeHtml(ts.label)}:</strong> ${escapeHtml(ts.value || '')}</li>\n`;
      }
    });
    html += `</ul>\n`;
  }

  // 에코 주옵션
  if (guide?.mainStats && Array.isArray(guide.mainStats) && guide.mainStats.length > 0) {
    html += `<h2>에코 코스트별 주옵션</h2>\n<ul>\n`;
    guide.mainStats.forEach(ms => {
      const statsStr = Array.isArray(ms.stats) ? ms.stats.join(' or ') : (ms.stats || '');
      html += `<li><strong>${ms.cost} Cost:</strong> ${escapeHtml(statsStr)}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 추천 부옵션
  if (guide?.subStats && Array.isArray(guide.subStats) && guide.subStats.length > 0) {
    html += `<h2>에코 추천 부옵션 우선순위</h2>\n<p>${escapeHtml(guide.subStats.join(' > '))}</p>\n`;
  }

  // 스킬 우선순위
  if (guide?.skillPriority && Array.isArray(guide.skillPriority) && guide.skillPriority.length > 0) {
    html += `<h2>스킬 레벨업 우선순위</h2>\n<p>${escapeHtml(guide.skillPriority.join(' > '))}</p>\n`;
  }

  // 파티 시너지
  if (guide?.synergyCharacters && Array.isArray(guide.synergyCharacters) && guide.synergyCharacters.length > 0) {
    html += `<h2>추천 파티 조합 및 시너지 캐릭터</h2>\n<p>${escapeHtml(guide.synergyCharacters.join(', '))}</p>\n`;
  }

  html += `</article>`;
  return html;
}

function generateHsrGuideHtml(id, guide, char) {
  let name = hsrKoData[`character.${id}.name`] || char?.name || guide?.name || id;
  if (name && name.startsWith('character.')) {
    name = char?.folderName || guide?.name || id;
  }
  let html = `<article>\n`;
  html += `<h1>붕괴: 스타레일 ${escapeHtml(name)} 종결 육성 공략 가이드</h1>\n`;

  // 추천 광추
  const lightCones = guide?.bestLightCones || guide?.variants?.[0]?.bestLightCones;
  if (lightCones && Array.isArray(lightCones) && lightCones.length > 0) {
    html += `<h2>${escapeHtml(name)} 추천 광추 랭킹</h2>\n<ol>\n`;
    lightCones.forEach((lc, idx) => {
      const lcName = typeof lc === 'string' ? lc : lc?.name;
      html += `<li><strong>${idx + 1}순위:</strong> ${escapeHtml(lcName)}</li>\n`;
    });
    html += `</ol>\n`;
  }

  // 추천 유물
  const relics = guide?.bestRelics || guide?.variants?.[0]?.bestRelics;
  if (relics && Array.isArray(relics) && relics.length > 0) {
    html += `<h2>추천 터널 유물 세트</h2>\n<ul>\n`;
    relics.forEach(r => {
      const rName = typeof r === 'string' ? r : r?.name;
      html += `<li>${escapeHtml(rName)}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 차원 장신구
  const ornaments = guide?.bestOrnaments || guide?.variants?.[0]?.bestOrnaments;
  if (ornaments && Array.isArray(ornaments) && ornaments.length > 0) {
    html += `<h2>추천 차원 장신구 세트</h2>\n<ul>\n`;
    ornaments.forEach(o => {
      const oName = typeof o === 'string' ? o : o?.name;
      html += `<li>${escapeHtml(oName)}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 목표 스탯
  const targetStats = guide?.targetStats || guide?.variants?.[0]?.targetStats;
  if (targetStats && Array.isArray(targetStats) && targetStats.length > 0) {
    html += `<h2>목표 육성 수치 (종결 스탯)</h2>\n<ul>\n`;
    targetStats.forEach(ts => {
      if (ts && ts.label) {
        html += `<li><strong>${escapeHtml(ts.label)}:</strong> ${escapeHtml(ts.value || '')}</li>\n`;
      }
    });
    html += `</ul>\n`;
  }

  // 유물 부위별 주옵션
  const mainStats = guide?.mainStats || guide?.variants?.[0]?.mainStats;
  if (mainStats && typeof mainStats === 'object') {
    html += `<h2>유물 부위별 주옵션</h2>\n<ul>\n`;
    if (mainStats.body) html += `<li><strong>바디:</strong> ${escapeHtml(Array.isArray(mainStats.body) ? mainStats.body.join(' / ') : mainStats.body)}</li>\n`;
    if (mainStats.feet) html += `<li><strong>신발:</strong> ${escapeHtml(Array.isArray(mainStats.feet) ? mainStats.feet.join(' / ') : mainStats.feet)}</li>\n`;
    if (mainStats.sphere) html += `<li><strong>차원구:</strong> ${escapeHtml(Array.isArray(mainStats.sphere) ? mainStats.sphere.join(' / ') : mainStats.sphere)}</li>\n`;
    if (mainStats.rope) html += `<li><strong>연결줄:</strong> ${escapeHtml(Array.isArray(mainStats.rope) ? mainStats.rope.join(' / ') : mainStats.rope)}</li>\n`;
    html += `</ul>\n`;
  }

  // 부옵션
  const subStats = guide?.subStats || guide?.variants?.[0]?.subStats;
  if (subStats && Array.isArray(subStats) && subStats.length > 0) {
    html += `<h2>유물 추천 부옵션 우선순위</h2>\n<p>${escapeHtml(subStats.join(' > '))}</p>\n`;
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
  const sitemapRoutes = getSitemapRoutes();
  const sitemapRouteSet = new Set(sitemapRoutes);
  let count = 0;

  console.log('🚀 Starting Static Meta Injection for Prerendering...');

  createPrerenderedPage(
    '/',
    'Rira Archive | 애니모·명조·스타레일 게임 DB',
    '애니모(Aniimo), 명조, 붕괴: 스타레일, 이환의 캐릭터 도감, 능력치 비교, 티어표와 육성 가이드를 한곳에서 확인하세요.',
    `${CDN_URL}/hsr%20images/common/default_banner.webp`,
    baseHtml
  );
  count++;

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
    const guide = wwGuidesMap.get(id) || wwGuidesMap.get(name) || (char.folderName ? wwGuidesMap.get(char.folderName) : null);
    const guideRoute = `/gallery/ww/character/${id}/guide`;
    const guideLink = guide && sitemapRouteSet.has(guideRoute)
      ? `<p><a href="${guideRoute}">${escapeHtml(name)} 종결 세팅 공략 보기</a></p>`
      : '';
    createPrerenderedPage(
      routePath,
      `${name} 종결 세팅 · 추천 파티 조합 & 돌파 재료 계산 | 명조 공략 DB`,
      `명조 ${name}의 최신 종결 에코 세팅, 추천 무기, 스킬 매커니즘 계수, 추천 파티 시너지 및 돌파·육성 재료 총정리 가이드.`,
      getWwCharacterImageUrl(char),
      baseHtml,
      generateWwCharacterHtml(id, wwGuidesMap, wwPartiesList) + guideLink
    );
    count++;

    // WW 캐릭터 가이드 전용 페이지 프리렌더링
    if (guide) {
      createPrerenderedPage(
        guideRoute,
        `명조 ${name} 공략 | 종결 에코 세팅 · 추천 무기 순위 · 파티 조합`,
        `명조: 워더링 웨이브 ${name}의 최신 종결 에코 세트(주옵션/부옵션 목표치), 추천 무기 1~4순위 랭킹, 스킬 레벨업 우선순위, 최적 파티 시너지 조합 완벽 공략 가이드.`,
        getWwCharacterImageUrl(char),
        baseHtml,
        generateWwGuideHtml(id, guide, char) + `<p><a href="${routePath}">${escapeHtml(name)} 캐릭터 상세 정보 보기</a></p>`,
        generateGuideSchema(name, '명조: 워더링 웨이브', guideRoute, getWwCharacterImageUrl(char))
      );
      count++;
    }
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
    const guide = hsrGuidesMap.get(name) || (char.folderName ? hsrGuidesMap.get(char.folderName) : null) || hsrGuidesMap.get(id);
    const guideRoute = `/gallery/hsr/character/${id}/guide`;
    const guideLink = guide && sitemapRouteSet.has(guideRoute)
      ? `<p><a href="${guideRoute}">${escapeHtml(name)} 종결 세팅 공략 보기</a></p>`
      : '';
    createPrerenderedPage(
      routePath,
      `${name} 종결 세팅 · 추천 파티 조합 & 육성 재료 | 붕괴: 스타레일 공략 DB`,
      `붕괴: 스타레일 ${name}의 최신 추천 유물 및 장신구, 광추 랭킹, 종결 스탯 세팅, 추천 파티 조합 및 행적·돌파 재료 총정리 가이드.`,
      getHsrCharacterImageUrl(char),
      baseHtml,
      generateHsrCharacterHtml(id, hsrGuidesMap, hsrPartiesList) + guideLink
    );
    count++;

    // HSR 캐릭터 가이드 전용 페이지 프리렌더링
    if (guide) {
      createPrerenderedPage(
        guideRoute,
        `스타레일 ${name} 공략 | 종결 유물 세팅 · 추천 광추 순위 · 파티 조합`,
        `붕괴: 스타레일 ${name}의 최신 추천 유물 및 차원 장신구, 종결 광추 랭킹, 주옵션/부옵션 목표 수치, 추천 파티 조합 완벽 공략 가이드.`,
        getHsrCharacterImageUrl(char),
        baseHtml,
        generateHsrGuideHtml(id, guide, char) + `<p><a href="${routePath}">${escapeHtml(name)} 캐릭터 상세 정보 보기</a></p>`,
        generateGuideSchema(name, '붕괴: 스타레일', guideRoute, getHsrCharacterImageUrl(char))
      );
      count++;
    }
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

  // 4. Notion Data (only routes owned by an explicit database source)
  const notionData = getNotionData();
  notionData.forEach(item => {
    if (!item.name) return;
    const cleanType = item.type || '';
    const isWwWeapon = item.dbSource === 'weapons' && ['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(cleanType);

    if (isWwWeapon) {
      createPrerenderedPage(
        `/gallery/ww/weapon/${encodeURIComponent(item.name)}`,
        `${item.name} 옵션 비교 및 추천 착용 캐릭터 | 명조 무기 DB`,
        `명조 ${item.name}의 돌파별 상세 능력치, 스킬 효과, 속성 보너스 및 추천 캐릭터 완벽 분석 가이드.`,
        `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(item.name)}.webp`,
        baseHtml,
        generateNotionHtml(item)
      );
      count++;
    } else if (item.dbSource === 'nte_characters') {
      const gameLabel = '이환(NTE)';
      const imagePath = `${CDN_URL}/nte%20images/skills/${encodeAssetPath(item.name)}/${encodeAssetPath(item.name)}.webp`;
      const routePath = `/gallery/nte/character/${encodeURIComponent(item.name)}`;
      
      createPrerenderedPage(
        routePath,
        `${item.name} 종결 세팅 · 추천 파티 조합 & 스킬 매커니즘 | ${gameLabel} 공략 DB`,
        `${gameLabel} ${item.name}의 최신 종결 세팅, 스킬 매커니즘 계수, 추천 파티 조합 및 돌파 재료 총정리 가이드.`,
        imagePath,
        baseHtml,
        generateNotionHtml(item) + '<p><a href="/gallery/nte">이환 캐릭터 도감으로 돌아가기</a></p>'
      );
      count++;
    } else if (item.dbSource === 'nte_arcs') {
      const routePath = `/gallery/nte/weapon/${encodeURIComponent(item.name)}`;
      createPrerenderedPage(
        routePath,
        `${item.name} 상세 옵션 및 추천 캐릭터 | 이환(NTE) 무기 DB`,
        `이환(NTE) ${item.name}의 상세 능력치, 스킬 효과와 추천 캐릭터 정보를 확인하세요.`,
        `${CDN_URL}/nte%20images/arcs/${encodeAssetPath(item.name)}.webp`,
        baseHtml,
        generateNotionHtml(item) + '<p><a href="/gallery/nte">이환 아크 도감으로 돌아가기</a></p>'
      );
      count++;
    } else if (item.dbSource === 'ww_echoes') {
      const routePath = `/gallery/ww/echo/${encodeURIComponent(item.name)}`;
      createPrerenderedPage(
        routePath,
        `${item.name} 에코 상세 정보 | 명조 에코 DB`,
        `명조 ${item.name} 에코의 코스트, 메인 어빌리티와 활용 정보를 확인하세요.`,
        `${CDN_URL}/hsr%20images/common/default_banner.webp`,
        baseHtml,
        generateNotionHtml(item) + '<p><a href="/gallery/ww">명조 에코 도감으로 돌아가기</a></p>'
      );
      count++;
    } else if (item.dbSource === 'ww_guides') {
      const charParam = encodeURIComponent(item.id || item.name);
      const guideRoute = `/gallery/ww/character/${charParam}/guide`;
      const characterRoute = `/gallery/ww/character/${charParam}`;
      const imageUrl = `${CDN_URL}/ww%20images/characters/${encodeAssetPath(item.name)}/art01.webp`;
      createPrerenderedPage(
        guideRoute,
        `명조 ${item.name} 공략 | 종결 에코 세팅 · 추천 무기 순위 · 파티 조합`,
        `명조: 워더링 웨이브 ${item.name}의 최신 종결 에코 세트(주옵션/부옵션 목표치), 추천 무기 1~4순위 랭킹, 스킬 레벨업 우선순위, 최적 파티 시너지 조합 완벽 공략 가이드.`,
        imageUrl,
        baseHtml,
        generateWwGuideHtml(item.id || item.name, item, item) + `<p><a href="${characterRoute}">${escapeHtml(item.name)} 캐릭터 상세 정보 보기</a></p>`,
        generateGuideSchema(item.name, '명조: 워더링 웨이브', guideRoute, imageUrl)
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

  // 7. Ensure every indexable sitemap route has distinct initial HTML.
  // Rich pages above take precedence; this closes coverage gaps for database
  // routes such as HSR equipment and for top-level gallery pages.
  sitemapRoutes.forEach(routePath => {
    if (prerenderedRoutes.has(routePath)) return;
    const meta = getFallbackMeta(routePath);
    if (routePath === '/gallery/ww') {
      const weaponRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/ww/weapon/'));
      const echoRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/ww/echo/'));
      const characterRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/ww\/character\/[^/]+$/.test(candidate));
      const guideRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/ww\/character\/[^/]+\/guide$/.test(candidate));
      meta.content += generateInternalLinkList('명조 무기 상세 페이지', weaponRoutes);
      meta.content += generateInternalLinkList('명조 에코 상세 페이지', echoRoutes);
      meta.content += generateInternalLinkList('명조 캐릭터 상세 페이지', characterRoutes);
      meta.content += generateInternalLinkList('명조 캐릭터 공략', guideRoutes);
    } else if (routePath === '/gallery/hsr') {
      const characterRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/hsr\/character\/[^/]+$/.test(candidate));
      const guideRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/hsr\/character\/[^/]+\/guide$/.test(candidate));
      const lightConeRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/hsr/lightcone/'));
      const relicRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/hsr/relic/'));
      const ornamentRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/hsr/ornament/'));
      meta.content += generateInternalLinkList('붕괴: 스타레일 캐릭터 상세 페이지', characterRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 캐릭터 공략', guideRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 광추 상세 페이지', lightConeRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 유물 상세 페이지', relicRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 차원 장신구 상세 페이지', ornamentRoutes);
    } else if (routePath === '/gallery/nte') {
      const characterRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/nte\/character\/[^/]+$/.test(candidate));
      const weaponRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/nte/weapon/'));
      meta.content += generateInternalLinkList('이환 캐릭터 상세 페이지', characterRoutes);
      meta.content += generateInternalLinkList('이환 아크 상세 페이지', weaponRoutes);
    } else if (routePath === '/gallery/aniimo') {
      const aniimoFile = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
      const aniimoEntries = fs.existsSync(aniimoFile) ? JSON.parse(fs.readFileSync(aniimoFile, 'utf8')) : [];
      const locations = [...new Set(aniimoEntries.flatMap(item => (item.forms || []).flatMap(form => form.locations || item.locations || [])))].sort((a, b) => a.localeCompare(b, 'ko'));
      const formCount = aniimoEntries.reduce((total, item) => total + (item.forms || []).length, 0);
      meta.title = '애니모 허브 | 도감·원소 상성·지역 데이터베이스';
      meta.description = `애니모 ${aniimoEntries.length}종의 형태별 도감, 능력치 비교, 9원소 상성표와 ${locations.length}개 지역별 출현 정보를 한곳에서 확인하세요.`;
      meta.content = `<article><h1>애니모 허브</h1><p>${escapeHtml(meta.description)}</p><dl><dt>등록 애니모</dt><dd>${aniimoEntries.length}종</dd><dt>형태 데이터</dt><dd>${formCount}개</dd><dt>출현 지역</dt><dd>${locations.length}곳</dd></dl><nav><ul><li><a href="/gallery/aniimo/characters">애니모 도감·능력치 비교</a></li><li><a href="/gallery/aniimo/type-chart">애니모 원소 상성표·약점 계산</a></li><li><a href="/gallery/aniimo/personality">애니모 성격 추천·MBTI 효과</a></li><li><a href="/gallery/aniimo/party-builder">애니모 파티 추천</a></li><li><a href="/gallery/aniimo/locations">애니모 지역별 도감</a></li></ul></nav><p><a href="https://www.aniimo.com/ko">애니모 공식 사이트</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/characters') {
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      meta.title = '애니모 도감·능력치 비교기 | Aniimo 아카이브';
      meta.description = `애니모 공식 위키에서 확인한 ${aniimoEntries.length}종의 원소, 포지션과 능력치를 검색하고 최대 3종까지 비교하세요.`;
      meta.content = `<article><h1>애니모 도감·능력치 비교기</h1><p>${escapeHtml(meta.description)}</p><ul>${aniimoEntries.map(item => `<li><a href="/gallery/aniimo/character/${encodeURIComponent(item.name)}">${escapeHtml(`NO.${item.number} ${item.name} · ${item.elements.join('/')} · ${item.positions.join('/')}`)}</a></li>`).join('')}</ul><p><a href="/gallery/aniimo">애니모 허브로 돌아가기</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/locations') {
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      const locations = [...new Set(aniimoEntries.flatMap(item => (item.forms || []).flatMap(form => form.locations || item.locations || [])))].sort((a, b) => a.localeCompare(b, 'ko'));
      meta.title = `애니모 출현 지역 ${locations.length}곳 | 지역별 도감`;
      meta.description = `애니모의 출현 지역 ${locations.length}곳과 지역별 애니모·형태 정보를 확인하세요.`;
      meta.content = `<article><h1>지역별 애니모 도감</h1><p>${escapeHtml(meta.description)}</p><ul>${locations.map(location => `<li><a href="/gallery/aniimo/location/${encodeURIComponent(location.trim().replace(/\s+/g, '-'))}">${escapeHtml(location)}</a></li>`).join('')}</ul><p><a href="/gallery/aniimo">애니모 허브로 돌아가기</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/type-chart') {
      const rows = [
        ['불', '풀·얼음', '불·물·바위·빛'], ['물', '불·바위', '물·풀·얼음·빛'],
        ['풀', '물·바위', '불·풀·빛'], ['전기', '물·바람', '전기·얼음·바위'],
        ['얼음', '물·전기', '불·얼음·바위'], ['바위', '불·얼음', '물·풀·바위·어둠'],
        ['바람', '풀·어둠', '전기·바람'], ['빛', '바람·어둠', '전기·빛'],
        ['어둠', '풀·전기·빛', '물·바람']
      ];
      meta.title = '애니모 원소 상성표·약점 계산 | 9원소 공략';
      meta.description = '애니모의 불, 물, 풀, 전기, 얼음, 바위, 바람, 빛, 어둠 상성과 1.6배·1배·0.625배 피해 배율을 확인하고 상대 원소별 추천 공격 원소를 찾으세요.';
      meta.content = `<article><h1>애니모 원소 상성표</h1><p>${escapeHtml(meta.description)}</p><p>효과적 1.6배 · 보통 1배 · 저항 0.625배이며 면역은 없습니다.</p><table><thead><tr><th>공격 원소</th><th>효과적</th><th>저항</th></tr></thead><tbody>${rows.map(([element, strong, resisted]) => `<tr><th>${element}</th><td>${strong}</td><td>${resisted}</td></tr>`).join('')}</tbody></table><p>복합 원소는 두 배율을 곱하지 않고 각 방어 원소에 대한 결과를 따로 확인합니다.</p><p><a href="/gallery/aniimo">애니모 도감으로 돌아가기</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/personality') {
      const traits = [['E 애착', '공격 2%·무력화 2%'], ['I 낯가림', '에너지 회복 4%'], ['S 현실', '피해 4%'], ['N 영감', '치명타율 5%'], ['T 냉정', '물리 방어 6%'], ['F 배려', '마법 방어 6%'], ['J 순종', 'HP 4%'], ['P 배려', '피해 감소 4%']];
      meta.title = '애니모 성격 추천·MBTI 효과 | 전투·홈 공략';
      meta.description = '애니모 성격 8종의 전투 보너스와 E/I·S/N·T/F·J/P 선택법, 딜러·치명타·무력화·지원 역할별 추천 성격을 확인하세요.';
      meta.content = `<article><h1>애니모 성격 선택 가이드</h1><p>${escapeHtml(meta.description)}</p><table><thead><tr><th>성격</th><th>전투 보너스</th></tr></thead><tbody>${traits.map(([trait, effect]) => `<tr><th>${trait}</th><td>${effect}</td></tr>`).join('')}</tbody></table><h2>선택 기준</h2><p>치명타 연계가 없다면 S, 치명타 관련 스킬이나 특성이 있다면 N을 고려합니다. T와 F는 상대의 물리·마법 피해에 따라 선택하고, 전투용과 홈 운영용 개체를 구분합니다.</p><p><a href="/gallery/aniimo">애니모 허브로 돌아가기</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/party-builder') {
      meta.title = '애니모 파티 추천 | 역할별 추천 조합';
      meta.description = '애니모의 역할과 형태를 반영한 추천 파티, 운용 특징과 대체 조합을 확인하세요.';
      meta.content = `<article><h1>애니모 파티 추천</h1><p>${escapeHtml(meta.description)}</p><h2>추천 조합 확인</h2><p>관리자가 검토한 4인 추천 조합을 분류별로 확인하고, 각 애니모의 형태별 능력과 스킬 상세 페이지로 이동할 수 있습니다.</p><p><a href="/gallery/aniimo/characters">애니모 도감에서 형태 확인</a></p></article>`;
    } else if (/^\/gallery\/aniimo\/location\//.test(routePath)) {
      const locationSlug = decodeURIComponent(routePath.split('/').at(-1));
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      const locations = [...new Set(aniimoEntries.flatMap(item => (item.forms || []).flatMap(form => form.locations || item.locations || [])))].sort((a, b) => a.localeCompare(b, 'ko'));
      const location = locations.find(candidate => candidate.trim().replace(/\s+/g, '-') === locationSlug);
      if (location) {
        const appearances = aniimoEntries.map(item => ({
          item,
          forms: (item.forms || []).filter(form => (form.locations || item.locations || []).includes(location))
        })).filter(appearance => appearance.forms.length > 0);
        meta.title = `${location} 출현 애니모 ${appearances.length}종 | 애니모 지역 도감`;
        meta.description = `${location}에서 출현하는 애니모 ${appearances.length}종과 각 지역 형태를 확인하세요.`;
        const appearanceLinks = appearances.map(({ item, forms }) => forms.map(form => {
          const query = form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : '';
          return `<li><a href="/gallery/aniimo/character/${encodeURIComponent(item.name)}${query}">${escapeHtml(`NO.${item.number} ${item.name} · ${form.label}`)}</a></li>`;
        }).join('')).join('');
        const otherLocations = locations.filter(candidate => candidate !== location).map(candidate => `<li><a href="/gallery/aniimo/location/${encodeURIComponent(candidate.trim().replace(/\s+/g, '-'))}">${escapeHtml(candidate)}</a></li>`).join('');
        meta.content = `<article><h1>${escapeHtml(location)} 출현 애니모</h1><p>${escapeHtml(meta.description)}</p><ul>${appearanceLinks}</ul><h2>다른 출현 지역</h2><ul>${otherLocations}</ul><p><a href="/gallery/aniimo">애니모 도감으로 돌아가기</a></p></article>`;
      }
    } else if (/^\/gallery\/aniimo\/character\//.test(routePath)) {
      const name = decodeURIComponent(routePath.split('/').at(-1));
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      const item = aniimoEntries.find(candidate => candidate.name === name);
      if (item) {
        meta.title = `${item.name} 능력치·스킬·진화 | 애니모 도감`;
        meta.description = `애니모 ${item.name}(NO.${item.number})의 소개, 능력치, 진화, 출현 지역, 특성, 스킬과 공명 육성 정보를 확인하세요.`;
        const skillHtml = [...(item.combatSkills || []), ...(item.uniqueSkills || [])].map(skill => `<section><h3>${escapeHtml(skill.name)}</h3><p>${escapeHtml(skill.description)}</p><p>${escapeHtml(skill.skillType)} · 에너지 ${escapeHtml(skill.energyCost)} · 위력 ${escapeHtml(skill.power)}</p></section>`).join('');
        const locationHtml = item.locations?.length ? `<h2>출현 지역</h2><ul>${item.locations.map(location => `<li><a href="/gallery/aniimo/location/${encodeURIComponent(location.trim().replace(/\s+/g, '-'))}">${escapeHtml(location)}</a></li>`).join('')}</ul>` : '';
        meta.content = `<article><h1>${escapeHtml(item.name)}</h1><p>NO.${escapeHtml(item.number)} · ${escapeHtml(item.elements.join('/'))} · ${escapeHtml(item.positions.join('/'))}</p><h2>소개</h2><p>${escapeHtml(item.description)}</p><h2>기본 능력치</h2><dl>${Object.entries(item.stats).map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join('')}</dl>${locationHtml}${item.traits?.length ? `<h2>애니모 특성</h2>${item.traits.map(trait => `<h3>${escapeHtml(trait.name)}</h3><p>${escapeHtml(trait.description)}</p>`).join('')}` : ''}<h2>스킬 소개</h2>${skillHtml}<p><a href="/gallery/aniimo">애니모 도감으로 돌아가기</a></p></article>`;
      }
    } else if (/^\/gallery\/hsr\/(lightcone|relic|ornament)\//.test(routePath)) {
      meta.content += '<p><a href="/gallery/hsr">붕괴: 스타레일 장비 도감으로 돌아가기</a></p>';
    }
    createPrerenderedPage(
      routePath,
      meta.title,
      meta.description,
      `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      meta.content
    );
    count++;
  });

  const missingRoutes = sitemapRoutes.filter(routePath => !prerenderedRoutes.has(routePath));
  if (missingRoutes.length > 0) {
    throw new Error(`Missing prerendered sitemap routes: ${missingRoutes.join(', ')}`);
  }

  // 8. No-Index Utility Pages (Search, Login, Profile, Admin)
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

  console.log(`✅ Successfully injected static meta and DOM tags for ${count} routes (${sitemapRoutes.length} sitemap routes covered)!`);
}

runPrerender();
