import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUnknownWebp } from './create_unknown_webp.js';

createUnknownWebp();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const WW_CHAR_DIR = path.join(ROOT_DIR, 'ww-hub', 'data', 'characters', 'ww');
const HSR_CHAR_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'characters', 'hsr');
const HSR_GUIDE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides');
const HSR_GUIDE_INDEX = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides', 'index.ts');
const HSR_LIGHTCONE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'lightcones');
const HSR_RELICS_FILE = path.join(ROOT_DIR, 'hsr-hub', 'data', 'relics.ts');
const HSR_ORNAMENTS_FILE = path.join(ROOT_DIR, 'hsr-hub', 'data', 'ornaments.ts');
const WEAPONS_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'weapons.ts');
const NOTION_DATA_FILE = path.join(ROOT_DIR, 'common-hub', 'data', 'notion-data.json');
const ANIIMO_DATA_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
const GUIDE_ARTICLES_FILE = path.join(ROOT_DIR, 'common-hub', 'data', 'guideArticles.json');

function getNotionData() {
  try {
    if (!fs.existsSync(NOTION_DATA_FILE)) return [];
    const content = fs.readFileSync(NOTION_DATA_FILE, 'utf8');
    return JSON.parse(content) || [];
  } catch (error) {
    console.error('Error reading notion-data.json:', error);
    return [];
  }
}

const BASE_URL = 'https://riragamehub.com';
const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

// URL 인코딩 헬퍼 (공백을 %20으로 변환하고 괄호 등을 처리)
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
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

function getFileLastmod(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

// HSR 캐릭터 정보 파싱
function parseHsrCharacter(id) {
  try {
    const filePath = path.join(HSR_CHAR_DIR, `${id}.ts`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const folderNameMatch = content.match(/folderName:\s*["'](.*?)["']/);
    const nameMatch = content.match(/name:\s*["'](.*?)["']/);
    const fixedUrlMatch = content.match(/fixedUrl:\s*["'](.*?)["']/);
    const isTrailblazer = content.includes('isTrailblazer: true') || id.startsWith('trailblazer_');
    return {
      id,
      filePath,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null,
      fixedUrl: fixedUrlMatch ? fixedUrlMatch[1] : null,
      isTrailblazer
    };
  } catch (error) {
    console.error(`Error parsing HSR character ${id}:`, error);
    return null;
  }
}

// WW 캐릭터 정보 파싱
function parseWwCharacter(id) {
  try {
    const filePath = path.join(WW_CHAR_DIR, `${id}.ts`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const folderNameMatch = content.match(/folderName:\s*["'](.*?)["']/);
    const nameMatch = content.match(/name:\s*["'](.*?)["']/);
    const fixedUrlMatch = content.match(/fixedUrl:\s*["'](.*?)["']/);
    const isRover = content.includes('isRover: true') || id.startsWith('rover_');
    // Attribute 추출 (방랑자 파일명 매칭 보조용)
    const attributeMatch = content.match(/attribute:\s*["'](.*?)["']/);

    return {
      id,
      filePath,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null,
      fixedUrl: fixedUrlMatch ? fixedUrlMatch[1] : null,
      isRover,
      attribute: attributeMatch ? attributeMatch[1] : '기류'
    };
  } catch (error) {
    console.error(`Error parsing WW character ${id}:`, error);
    return null;
  }
}

// HSR 가이드 존재 여부 목록 조회
function getRegisteredHsrGuides() {
  const registered = new Set();
  try {
    if (!fs.existsSync(HSR_GUIDE_INDEX)) return registered;
    const content = fs.readFileSync(HSR_GUIDE_INDEX, 'utf8');
    const importRegex = /import\s+.*?\s+from\s+['"]\.\/(.*?)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      if (match[1] && match[1] !== 'index') {
        registered.add(match[1].trim());
      }
    }
  } catch (error) {
    console.error('Error reading HSR guide index:', error);
  }
  return registered;
}

// WW 가이드 존재 여부 목록 조회
function getRegisteredWwGuides() {
  const registered = new Set();
  try {
    const notionData = getNotionData();
    notionData.forEach(item => {
      if (item.dbSource === 'ww_guides' && item.name) {
        registered.add(item.name.trim());
        if (item.id) registered.add(item.id.trim());
      }
    });
    const WW_GUIDE_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'guides.ts');
    if (fs.existsSync(WW_GUIDE_FILE)) {
      const content = fs.readFileSync(WW_GUIDE_FILE, 'utf8');
      const idMatches = [...content.matchAll(/id:\s*["'](.*?)["']/g)];
      idMatches.forEach(m => registered.add(m[1].trim()));
    }
  } catch (error) {
    console.error('Error reading WW guide index:', error);
  }
  return registered;
}

// WW 무기 목록 추출
function getWwWeapons() {
  const weapons = [];
  try {
    if (!fs.existsSync(WEAPONS_FILE)) return weapons;
    const content = fs.readFileSync(WEAPONS_FILE, 'utf8');
    // id와 name을 한 쌍으로 찾는 정규식
    const weaponRegex = /(?:id|id\s*):\s*["'](wp-[^"']+)["']\s*,\s*(?:name|name\s*):\s*["']([^"']+)["']/g;
    let match;
    while ((match = weaponRegex.exec(content)) !== null) {
      weapons.push({
        id: match[1],
        name: match[2]
      });
    }
  } catch (error) {
    console.error('Error parsing weapons file:', error);
  }
  return weapons;
}

function getTopLevelStringValues(filePath, fieldName) {
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  const fieldPattern = new RegExp(`^\\s{4}["']?${fieldName}["']?\\s*:\\s*["'](.*?)["']`, 'gm');
  return [...content.matchAll(fieldPattern)].map(match => match[1]);
}

function getHsrLightConeNames() {
  if (!fs.existsSync(HSR_LIGHTCONE_DIR)) return [];

  return fs.readdirSync(HSR_LIGHTCONE_DIR)
    .filter(file => file.endsWith('.ts') && !['index.ts', 'dataFactory.ts'].includes(file))
    .flatMap(file => getTopLevelStringValues(path.join(HSR_LIGHTCONE_DIR, file), 'name'));
}

function validateGeneratedUrls(urlList, wwCharacterIds) {
  const duplicateUrls = urlList.filter((url, index) => urlList.indexOf(url) !== index);
  if (duplicateUrls.length > 0) {
    throw new Error(`Duplicate sitemap URLs detected: ${[...new Set(duplicateUrls)].join(', ')}`);
  }

  const invalidWwCharacterUrls = urlList.filter(url => {
    const match = new URL(url).pathname.match(/^\/gallery\/ww\/character\/([^/]+)(?:\/guide)?$/);
    return match && !wwCharacterIds.has(decodeURIComponent(match[1]));
  });

  if (invalidWwCharacterUrls.length > 0) {
    throw new Error(`Invalid WW character sitemap URLs detected: ${invalidWwCharacterUrls.join(', ')}`);
  }

  const allowedPathPatterns = [
    /^\/$/,
    /^\/(?:about|privacy|tos|contact|blog|notices)$/,
    /^\/blog\/[^/]+$/,
    /^\/gallery\/(?:hsr|ww|nte|aniimo)\/guides(?:\/[^/]+)?$/,
    /^\/gallery\/hsr(?:\/(?:tierlist|parties|terminology))?$/,
    /^\/gallery\/hsr\/character\/[^/]+(?:\/guide)?$/,
    /^\/gallery\/hsr\/(?:lightcone|relic|ornament)\/[^/]+$/,
    /^\/gallery\/ww(?:\/(?:tierlist|parties))?$/,
    /^\/gallery\/ww\/character\/[^/]+(?:\/guide)?$/,
    /^\/gallery\/ww\/(?:weapon|echo)\/[^/]+$/,
    /^\/gallery\/nte(?:\/parties)?$/,
    /^\/gallery\/nte\/(?:character|weapon)\/[^/]+$/,
    /^\/gallery\/aniimo(?:\/(?:characters|locations|type-chart|personality|party-builder))?$/,
    /^\/gallery\/aniimo\/character\/[^/]+$/,
    /^\/gallery\/aniimo\/location\/[^/]+$/
  ];
  const invalidRouteUrls = urlList.filter(url => {
    const pathname = new URL(url).pathname;
    return !allowedPathPatterns.some(pattern => pattern.test(pathname));
  });

  if (invalidRouteUrls.length > 0) {
    throw new Error(`Unsupported sitemap routes detected: ${invalidRouteUrls.join(', ')}`);
  }

  const uuidEntityUrls = urlList.filter(url => /\/gallery\/(?:hsr|ww|nte|aniimo)\/character\/[0-9a-f]{8}-[0-9a-f-]{27}(?:\/|$)/i.test(new URL(url).pathname));
  if (uuidEntityUrls.length > 0) {
    throw new Error(`UUID-based character sitemap URLs detected: ${uuidEntityUrls.join(', ')}`);
  }
}

// HSR 캐릭터 이미지 목록 빌드
function getHsrCharacterImages(charData) {
  if (!charData) return [];
  if (charData.fixedUrl) return [charData.fixedUrl];

  if (charData.isTrailblazer) {
    return [
      `${CDN_URL}/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/%EA%B0%9C%EC%B2%99%EC%9E%90/art01.webp`,
      `${CDN_URL}/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/%EA%B0%9C%EC%B2%99%EC%9E%90/art01-01.webp`
    ];
  }

  const folder = charData.folderName || charData.name || charData.id;
  return [`${CDN_URL}/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/${encodeAssetPath(folder)}/art01.webp`];
}

// WW 캐릭터 이미지 목록 빌드
function getWwCharacterImages(charData) {
  if (!charData) return [];
  if (charData.fixedUrl) return [charData.fixedUrl];

  if (charData.isRover) {
    const folderName = charData.folderName || `방랑자 · ${charData.attribute}`;
    return [
      `${CDN_URL}/ww%20images/skills/${encodeAssetPath(folderName)}/${encodeAssetPath(folderName)}%28%EB%82%A8%29.webp`,
      `${CDN_URL}/ww%20images/skills/${encodeAssetPath(folderName)}/${encodeAssetPath(folderName)}%28%EC%95%AC%29.webp`
    ];
  }

  const folder = charData.folderName || charData.name || charData.id;
  return [`${CDN_URL}/ww%20images/skills/${encodeAssetPath(folder)}/${encodeAssetPath(folder)}.webp`];
}

// XML URL 노드 생성기
function buildUrlNode(locUrl, lastmod, priority, changefreq = 'daily', imageUrls = []) {
  // XML 특수문자 (&) 이스케이프
  const escapedLocUrl = locUrl.replace(/&/g, '&amp;');
  const koUrl = locUrl.includes('?') ? `${locUrl}&amp;lng=ko` : `${locUrl}?lng=ko`;
  const enUrl = locUrl.includes('?') ? `${locUrl}&amp;lng=en` : `${locUrl}?lng=en`;

  let node = `  <url>\n`;
  node += `    <loc>${escapedLocUrl}</loc>\n`;
  if (lastmod) {
    node += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  node += `    <changefreq>${changefreq}</changefreq>\n`;
  node += `    <priority>${priority}</priority>\n`;
  node += `    <xhtml:link rel="alternate" hreflang="ko" href="${koUrl}"/>\n`;
  node += `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n`;
  node += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapedLocUrl}"/>\n`;

  imageUrls.forEach(img => {
    const escapedImg = img.replace(/&/g, '&amp;');
    node += `    <image:image>\n`;
    node += `      <image:loc>${escapedImg}</image:loc>\n`;
    node += `    </image:image>\n`;
  });

  node += `  </url>\n`;
  return node;
}

async function submitToIndexNow(urlList) {
  const isProduction = process.env.NODE_ENV === 'production' ||
                        process.env.GITHUB_ACTIONS === 'true' ||
                        process.env.CF_PAGES === '1' ||
                        process.env.INDEXNOW_FORCE === 'true';

  if (!isProduction) {
    console.log('Skipping IndexNow submission: Not in a production deployment environment (use INDEXNOW_FORCE=true to force).');
    return;
  }

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const payload = {
    host: 'riragamehub.com',
    key: 'b6be7d1e8c7c4b2ca559a4bc5ef4d89a',
    keyLocation: 'https://riragamehub.com/b6be7d1e8c7c4b2ca559a4bc5ef4d89a.txt',
    urlList: urlList
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Successfully submitted all URLs to IndexNow! Bing and Naver will reindex them instantly.');
    } else {
      console.error(`IndexNow submission returned status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to submit to IndexNow due to network error:', error);
  }
}

async function generateSitemap() {
  try {
    const wwIds = getCharacterIds(WW_CHAR_DIR);
    const hsrIds = getCharacterIds(HSR_CHAR_DIR);
    const registeredHsrGuides = getRegisteredHsrGuides();
    const registeredWwGuides = getRegisteredWwGuides();
    const wwWeapons = getWwWeapons();
    const hsrLightConeNames = getHsrLightConeNames();
    const hsrRelicNames = getTopLevelStringValues(HSR_RELICS_FILE, 'name');
    const hsrOrnamentNames = getTopLevelStringValues(HSR_ORNAMENTS_FILE, 'name');

    console.log(`Found ${wwIds.length} Wuthering Waves characters.`);
    console.log(`Found ${registeredWwGuides.size} Wuthering Waves guides.`);
    console.log(`Found ${hsrIds.length} Honkai Star Rail characters.`);
    console.log(`Found ${registeredHsrGuides.size} HSR guides in index.`);
    console.log(`Found ${wwWeapons.length} Wuthering Waves weapons.`);
    console.log(`Found ${hsrLightConeNames.length} HSR light cones.`);
    console.log(`Found ${hsrRelicNames.length} HSR relic sets.`);
    console.log(`Found ${hsrOrnamentNames.length} HSR ornament sets.`);

    const allUrls = [];
    const allUrlSet = new Set();

    const mainEntries = [];
    const hsrEntries = [];
    const wwEntries = [];
    const nteEntries = [];
    const aniimoEntries = [];
    const blogEntries = [];

    const defaultBanner = `${CDN_URL}/hsr%20images/common/default_banner.webp`;

    function addEntry(targetArray, url, lastmod, priority, changefreq, images = []) {
      if (allUrlSet.has(url)) return;
      allUrlSet.add(url);
      allUrls.push(url);
      const xmlNode = buildUrlNode(url, lastmod, priority, changefreq, images);
      targetArray.push({ url, lastmod, xmlNode });
    }

    // 1. Core Static & Hub Pages -> sitemap-main.xml
    addEntry(mainEntries, `${BASE_URL}/`, null, '1.0', 'daily', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/about`, null, '0.8', 'monthly', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/privacy`, null, '0.5', 'monthly', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/tos`, null, '0.5', 'monthly', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/contact`, null, '0.5', 'monthly', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/gallery/hsr`, null, '0.9', 'daily', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/gallery/ww`, null, '0.9', 'daily', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/gallery/nte`, null, '0.9', 'daily', [defaultBanner]);
    addEntry(mainEntries, `${BASE_URL}/gallery/aniimo`, null, '0.9', 'daily', [defaultBanner]);

    // 2. Honkai: Star Rail -> sitemap-hsr.xml
    addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/tierlist`, null, '0.9', 'daily', [defaultBanner]);
    addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/parties`, null, '0.8', 'weekly', [defaultBanner]);
    addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/terminology`, null, '0.7', 'monthly', [defaultBanner]);

    hsrIds.forEach(id => {
      const charData = parseHsrCharacter(id);
      const images = getHsrCharacterImages(charData);
      const charLastmod = charData?.filePath ? getFileLastmod(charData.filePath) : null;
      addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/character/${id}`, charLastmod, '0.8', 'daily', images);

      if (charData) {
        const hasGuide = (charData.folderName && registeredHsrGuides.has(charData.folderName)) ||
                         (charData.name && registeredHsrGuides.has(charData.name));
        if (hasGuide) {
          const guideFilePath = path.join(HSR_GUIDE_DIR, `${id}.ts`);
          const guideLastmod = getFileLastmod(guideFilePath) || charLastmod;
          addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/character/${id}/guide`, guideLastmod, '0.8', 'daily', images);
        }
      }
    });

    hsrLightConeNames.forEach(name => {
      addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/lightcone/${encodeURIComponent(name)}`, null, '0.7', 'weekly');
    });

    const relicLastmod = getFileLastmod(HSR_RELICS_FILE);
    const ornamentLastmod = getFileLastmod(HSR_ORNAMENTS_FILE);

    hsrRelicNames.forEach(name => {
      addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/relic/${encodeURIComponent(name)}`, relicLastmod, '0.7', 'weekly');
    });

    hsrOrnamentNames.forEach(name => {
      addEntry(hsrEntries, `${BASE_URL}/gallery/hsr/ornament/${encodeURIComponent(name)}`, ornamentLastmod, '0.7', 'weekly');
    });

    // 3. Wuthering Waves -> sitemap-ww.xml
    addEntry(wwEntries, `${BASE_URL}/gallery/ww/tierlist`, null, '0.9', 'daily', [defaultBanner]);
    addEntry(wwEntries, `${BASE_URL}/gallery/ww/parties`, null, '0.8', 'weekly', [defaultBanner]);

    const wwGuideFileLastmod = getFileLastmod(path.join(ROOT_DIR, 'ww-hub', 'data', 'guides.ts'));
    wwIds.forEach(id => {
      const charData = parseWwCharacter(id);
      const images = getWwCharacterImages(charData);
      const charLastmod = charData?.filePath ? getFileLastmod(charData.filePath) : null;
      addEntry(wwEntries, `${BASE_URL}/gallery/ww/character/${id}`, charLastmod, '0.8', 'daily', images);

      const charName = charData?.name || charData?.folderName || id;
      const hasWwGuide = registeredWwGuides.has(charName) ||
                         registeredWwGuides.has(charData?.folderName) ||
                         registeredWwGuides.has(id);
      if (hasWwGuide) {
        const guideLastmod = wwGuideFileLastmod || charLastmod;
        addEntry(wwEntries, `${BASE_URL}/gallery/ww/character/${id}/guide`, guideLastmod, '0.9', 'daily', images);
      }
    });

    const weaponsLastmod = getFileLastmod(WEAPONS_FILE);
    wwWeapons.forEach(wp => {
      const imageUrl = `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(wp.name)}.webp`;
      addEntry(wwEntries, `${BASE_URL}/gallery/ww/weapon/${encodeURIComponent(wp.name)}`, weaponsLastmod, '0.8', 'daily', [imageUrl]);
    });

    // Notion WW and NTE items
    const notionData = getNotionData();
    console.log(`Processing ${notionData.length} Notion items for sitemap...`);
    notionData.forEach(item => {
      if (!item.name) return;
      const cleanType = item.type || '';
      const isWwWeapon = item.dbSource === 'weapons' && ['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(cleanType);
      const isNteCharacter = item.dbSource === 'nte_characters';
      const isNteArc = item.dbSource === 'nte_arcs';
      const isWwEcho = item.dbSource === 'ww_echoes';

      if (isNteCharacter) {
        const imageUrl = `${CDN_URL}/nte%20images/skills/${encodeAssetPath(item.name)}/${encodeAssetPath(item.name)}.webp`;
        addEntry(nteEntries, `${BASE_URL}/gallery/nte/character/${encodeURIComponent(item.name)}`, null, '0.8', 'daily', [imageUrl]);
      } else if (isNteArc) {
        const imageUrl = `${CDN_URL}/nte%20images/arcs/${encodeAssetPath(item.name)}.webp`;
        addEntry(nteEntries, `${BASE_URL}/gallery/nte/weapon/${encodeURIComponent(item.name)}`, null, '0.8', 'daily', [imageUrl]);
      } else if (isWwWeapon) {
        const imageUrl = `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(item.name)}.webp`;
        addEntry(wwEntries, `${BASE_URL}/gallery/ww/weapon/${encodeURIComponent(item.name)}`, null, '0.8', 'daily', [imageUrl]);
      } else if (isWwEcho) {
        addEntry(wwEntries, `${BASE_URL}/gallery/ww/echo/${encodeURIComponent(item.name)}`, null, '0.7', 'weekly');
      }
    });

    // 4. Neverness to Everness (NTE) -> sitemap-nte.xml
    addEntry(nteEntries, `${BASE_URL}/gallery/nte/parties`, null, '0.8', 'weekly', [defaultBanner]);

    // 5. Aniimo -> sitemap-aniimo.xml
    addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/characters`, null, '0.8', 'weekly', [defaultBanner]);
    addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/locations`, null, '0.8', 'weekly', [defaultBanner]);
    addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/type-chart`, null, '0.8', 'weekly', [defaultBanner]);
    addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/personality`, null, '0.8', 'weekly', [defaultBanner]);
    addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/party-builder`, null, '0.8', 'weekly', [defaultBanner]);

    if (fs.existsSync(GUIDE_ARTICLES_FILE)) {
      const publishedGuides = JSON.parse(fs.readFileSync(GUIDE_ARTICLES_FILE, 'utf8'))
        .filter(article => article.status === 'published');
      const guideTargets = { hsr: hsrEntries, ww: wwEntries, nte: nteEntries, aniimo: aniimoEntries };
      const gamesWithGuides = new Set(publishedGuides.map(article => article.gameId));
      gamesWithGuides.forEach(gameId => {
        const target = guideTargets[gameId];
        if (target) addEntry(target, `${BASE_URL}/gallery/${gameId}/guides`, null, '0.8', 'weekly', [defaultBanner]);
      });
      publishedGuides.forEach(article => {
        const target = guideTargets[article.gameId];
        if (target) addEntry(target, `${BASE_URL}/gallery/${article.gameId}/guides/${encodeURIComponent(article.slug)}`, article.reviewedAt || article.publishedAt, '0.8', 'monthly', [defaultBanner]);
      });
    }

    const aniimoFileLastmod = getFileLastmod(ANIIMO_DATA_FILE);
    const aniimoItems = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
    aniimoItems.forEach(item => {
      addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/character/${encodeURIComponent(item.name)}`, item.checkedAt || aniimoFileLastmod, '0.8', 'weekly', item.imageUrl ? [item.imageUrl] : []);
    });

    const OFFICIAL_ANIIMO_HABITATS = [
      '붓꽃 바다',
      '구름 초원',
      '스테플 숲',
      '로즈타워 숲',
      '늑대이빨 능선',
      '청석 대지',
      '뇌전의 숲',
      '설산기슭 초원',
      '고래첨벙 해안',
      '붉은바위 고지',
      '안개숲',
      '갈매기 만',
      '조화의 언덕',
      '바다끝 구름'
    ];

    OFFICIAL_ANIIMO_HABITATS.forEach(habitat => {
      const slug = habitat.trim().replace(/\s+/g, '-');
      addEntry(aniimoEntries, `${BASE_URL}/gallery/aniimo/location/${encodeURIComponent(slug)}`, aniimoFileLastmod, '0.7', 'weekly');
    });

    // 6. Blog & Notices -> sitemap-blog.xml
    addEntry(blogEntries, `${BASE_URL}/notices`, null, '0.8', 'weekly', [defaultBanner]);

    const blogFilePath = path.join(ROOT_DIR, 'common-hub', 'data', 'blogData.ts');
    if (fs.existsSync(blogFilePath)) {
      const blogContent = fs.readFileSync(blogFilePath, 'utf8');
      const blogMatches = [...blogContent.matchAll(/id:\s*["'](.*?)["'][\s\S]*?date:\s*["'](\d{4}-\d{2}-\d{2})["']/g)];
      blogMatches.forEach(m => {
        const blogId = m[1];
        const publishedDate = m[2];
        addEntry(blogEntries, `${BASE_URL}/blog/${encodeURIComponent(blogId)}`, publishedDate, '0.8', 'weekly');
      });
    }

    // Validation
    validateGeneratedUrls(allUrls, new Set(wwIds));

    // File writing helper
    const today = new Date().toISOString().split('T')[0];
    function getMaxLastmod(entries) {
      let max = null;
      for (const e of entries) {
        if (e.lastmod && (!max || e.lastmod > max)) {
          max = e.lastmod;
        }
      }
      return max || today;
    }

    function writeSubSitemap(filename, entries) {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(e => e.xmlNode).join('')}</urlset>
`;
      const filePath = path.join(PUBLIC_DIR, filename);
      fs.writeFileSync(filePath, xml, 'utf8');
      console.log(`Successfully generated ${filename} with ${entries.length} URLs.`);
    }

    // Write 6 sub-sitemaps
    writeSubSitemap('sitemap-main.xml', mainEntries);
    writeSubSitemap('sitemap-hsr.xml', hsrEntries);
    writeSubSitemap('sitemap-ww.xml', wwEntries);
    writeSubSitemap('sitemap-nte.xml', nteEntries);
    writeSubSitemap('sitemap-aniimo.xml', aniimoEntries);
    writeSubSitemap('sitemap-blog.xml', blogEntries);

    // Build & Write master sitemap index (sitemap.xml)
    const subSitemaps = [
      { name: 'sitemap-main.xml', entries: mainEntries },
      { name: 'sitemap-hsr.xml', entries: hsrEntries },
      { name: 'sitemap-ww.xml', entries: wwEntries },
      { name: 'sitemap-nte.xml', entries: nteEntries },
      { name: 'sitemap-aniimo.xml', entries: aniimoEntries },
      { name: 'sitemap-blog.xml', entries: blogEntries },
    ];

    let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    subSitemaps.forEach(s => {
      const lastmod = getMaxLastmod(s.entries);
      indexXml += `  <sitemap>
    <loc>${BASE_URL}/${s.name}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
`;
    });
    indexXml += `</sitemapindex>\n`;

    const masterSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    fs.writeFileSync(masterSitemapPath, indexXml, 'utf8');
    console.log(`Successfully generated sitemap index at ${masterSitemapPath} (${allUrls.length} total indexed URLs across ${subSitemaps.length} sub-sitemaps).`);

    // Submit all URLs to IndexNow
    await submitToIndexNow(allUrls);

  } catch (error) {
    console.error('Fatal error during sitemap generation:', error);
    process.exitCode = 1;
  }
}

generateSitemap();
