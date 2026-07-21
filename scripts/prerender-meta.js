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

const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://rira-game-hub.pages.dev';
const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

// ---------------------------------------------------------------------
// Helper Functions (Adopted from generate-sitemap.js)
// ---------------------------------------------------------------------

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
    const isTrailblazer = content.includes('isTrailblazer: true') || id.startsWith('trailblazer_');
    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null,
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

    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null,
      isRover,
      attribute: attributeMatch ? attributeMatch[1] : '기류'
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
// Injection Logic
// ---------------------------------------------------------------------

function injectMetaTags(html, title, description, imageUrl, urlPath) {
  let injected = html;
  
  // Replace Title
  injected = injected.replace(/<title>.*?<\/title>/s, `<title>${title} | RIRA ARCHIVE</title>`);
  
  // Replace og:title
  injected = injected.replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${title} | RIRA ARCHIVE" />`);
  
  // Replace description
  injected = injected.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${description}" />`);
  
  // Replace og:description
  injected = injected.replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${description}" />`);
  
  // Inject missing og/twitter tags into <head>
  const extraTags = `
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${BASE_URL}${urlPath}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title} | RIRA ARCHIVE" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
  `;
  
  injected = injected.replace('</head>', `${extraTags}\n  </head>`);
  
  return injected;
}

function createPrerenderedPage(routePath, title, description, imageUrl, baseHtml) {
  // routePath example: /gallery/ww/character/lucy
  const targetDir = path.join(DIST_DIR, ...routePath.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });
  
  const finalHtml = injectMetaTags(baseHtml, title, description, imageUrl, routePath);
  fs.writeFileSync(path.join(targetDir, 'index.html'), finalHtml, 'utf8');
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

  // 1. WW Characters
  const wwIds = getCharacterIds(WW_CHAR_DIR);
  wwIds.forEach(id => {
    const char = parseWwCharacter(id);
    if (!char) return;
    const name = char.name || id;
    createPrerenderedPage(
      `/gallery/ww/character/${id}`,
      `${name} 상세 가이드`,
      `명조 ${name} 종결 에코 세팅, 무기, 스킬 설명 및 파티 조합 가이드.`,
      getWwCharacterImageUrl(char),
      baseHtml
    );
    count++;
  });

  // 2. HSR Characters
  const hsrIds = getCharacterIds(HSR_CHAR_DIR);
  hsrIds.forEach(id => {
    const char = parseHsrCharacter(id);
    if (!char) return;
    const name = char.name || id;
    createPrerenderedPage(
      `/gallery/hsr/character/${id}`,
      `${name} 상세 가이드`,
      `붕괴: 스타레일 ${name} 추천 유물, 광추, 종결 스탯 및 육성 재료 가이드.`,
      getHsrCharacterImageUrl(char),
      baseHtml
    );
    count++;
  });

  // 3. WW Weapons
  const wwWeapons = getWwWeapons();
  wwWeapons.forEach(wp => {
    createPrerenderedPage(
      `/gallery/ww/weapon/${encodeURIComponent(wp.name)}`,
      `${wp.name} 무기 정보`,
      `명조 무기 ${wp.name}의 상세 능력치, 스킬, 그리고 추천 캐릭터 정보를 확인하세요.`,
      `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(wp.name)}.webp`,
      baseHtml
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
        `${item.name} 무기 정보`,
        `${item.name}의 상세 능력치와 추천 캐릭터 정보를 확인하세요.`,
        `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(item.name)}.webp`,
        baseHtml
      );
      count++;
    } else if (cleanType === '캐릭터') {
      createPrerenderedPage(
        `/gallery/ww/character/${encodeURIComponent(item.name)}`,
        `${item.name} 상세 가이드`,
        `${item.name} 종결 세팅 및 상세 가이드.`,
        `${CDN_URL}/ww%20images/characters/${encodeAssetPath(item.name)}/art01.webp`,
        baseHtml
      );
      count++;
    }
  });

  console.log(`✅ Successfully injected static meta tags for ${count} dynamic routes!`);
}

runPrerender();
