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
const HSR_GUIDE_INDEX = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides', 'index.ts');
const HSR_LIGHTCONE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'lightcones');
const HSR_RELICS_FILE = path.join(ROOT_DIR, 'hsr-hub', 'data', 'relics.ts');
const HSR_ORNAMENTS_FILE = path.join(ROOT_DIR, 'hsr-hub', 'data', 'ornaments.ts');
const WEAPONS_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'weapons.ts');
const NOTION_DATA_FILE = path.join(ROOT_DIR, 'common-hub', 'data', 'notion-data.json');
const ANIIMO_DATA_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');

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
    /^\/gallery\/hsr(?:\/(?:tierlist|parties|terminology))?$/,
    /^\/gallery\/hsr\/character\/[^/]+(?:\/guide)?$/,
    /^\/gallery\/hsr\/(?:lightcone|relic|ornament)\/[^/]+$/,
    /^\/gallery\/ww(?:\/(?:tierlist|parties))?$/,
    /^\/gallery\/ww\/character\/[^/]+(?:\/guide)?$/,
    /^\/gallery\/ww\/(?:weapon|echo)\/[^/]+$/,
    /^\/gallery\/nte(?:\/parties)?$/,
    /^\/gallery\/nte\/(?:character|weapon)\/[^/]+$/,
    /^\/gallery\/aniimo(?:\/(?:characters|locations|type-chart|personality))?$/,
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

    const urlList = [
      `${BASE_URL}/`,
      `${BASE_URL}/gallery/hsr`,
      `${BASE_URL}/gallery/ww`,
      `${BASE_URL}/gallery/nte`,
      `${BASE_URL}/gallery/aniimo`,
      `${BASE_URL}/gallery/aniimo/characters`,
      `${BASE_URL}/gallery/aniimo/locations`,
      `${BASE_URL}/gallery/aniimo/type-chart`,
      `${BASE_URL}/gallery/aniimo/personality`,
      `${BASE_URL}/gallery/hsr/tierlist`,
      `${BASE_URL}/gallery/ww/tierlist`,
      `${BASE_URL}/gallery/hsr/parties`,
      `${BASE_URL}/gallery/ww/parties`,
      `${BASE_URL}/gallery/nte/parties`,
      `${BASE_URL}/gallery/hsr/terminology`,
      `${BASE_URL}/about`,
      `${BASE_URL}/privacy`,
      `${BASE_URL}/tos`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/notices`
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Static Pages -->
`;

    // 1. Core Static Pages 추가
    const defaultBanner = `${CDN_URL}/hsr%20images/common/default_banner.webp`;
    urlList.forEach(u => {
      xml += buildUrlNode(u, null, u === `${BASE_URL}/` ? '1.0' : '0.9', 'daily', [defaultBanner]);
    });

    // 2. Wuthering Waves Characters Detail & Guide Pages
    xml += `\n  <!-- Wuthering Waves Characters Detail & Guide Pages -->\n`;
    wwIds.forEach(id => {
      const url = `${BASE_URL}/gallery/ww/character/${id}`;
      const charData = parseWwCharacter(id);
      const images = getWwCharacterImages(charData);
      const charLastmod = null;
      
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, charLastmod, '0.8', 'daily', images);
        urlList.push(url);
      }

      // 캐릭터 가이드 페이지
      const charName = charData?.name || charData?.folderName || id;
      const hasWwGuide = registeredWwGuides.has(charName) || 
                         registeredWwGuides.has(charData?.folderName) || 
                         registeredWwGuides.has(id);
      if (hasWwGuide) {
        const guideUrl = `${BASE_URL}/gallery/ww/character/${id}/guide`;
        if (!urlList.includes(guideUrl)) {
          xml += buildUrlNode(guideUrl, charLastmod, '0.9', 'daily', images);
          urlList.push(guideUrl);
        }
      }
    });

    // 3. Honkai Star Rail Characters Detail & Guide Pages
    xml += `\n  <!-- Honkai Star Rail Characters Detail & Guide Pages -->\n`;
    hsrIds.forEach(id => {
      const charData = parseHsrCharacter(id);
      const images = getHsrCharacterImages(charData);
      const charLastmod = null;

      // 캐릭터 상세 페이지
      const detailUrl = `${BASE_URL}/gallery/hsr/character/${id}`;
      if (!urlList.includes(detailUrl)) {
        xml += buildUrlNode(detailUrl, charLastmod, '0.8', 'daily', images);
        urlList.push(detailUrl);
      }

      // 캐릭터 가이드 페이지
      if (charData) {
        const hasGuide = (charData.folderName && registeredHsrGuides.has(charData.folderName)) ||
                         (charData.name && registeredHsrGuides.has(charData.name));
        if (hasGuide) {
          const guideUrl = `${BASE_URL}/gallery/hsr/character/${id}/guide`;
          if (!urlList.includes(guideUrl)) {
            xml += buildUrlNode(guideUrl, charLastmod, '0.8', 'daily', images);
            urlList.push(guideUrl);
          }
        }
      }
    });

    // 4. Wuthering Waves Weapons Detail Pages
    xml += `\n  <!-- Wuthering Waves Weapons Detail Pages -->\n`;
    const weaponsLastmod = null;
    wwWeapons.forEach(wp => {
      const url = `${BASE_URL}/gallery/ww/weapon/${encodeURIComponent(wp.name)}`;
      const imageUrl = `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(wp.name)}.webp`;
      
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, weaponsLastmod, '0.8', 'daily', [imageUrl]);
        urlList.push(url);
      }
    });

    // 5. Notion Imported Detail Pages with explicit source ownership
    xml += `\n  <!-- Notion Imported Detail Pages -->\n`;
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
        const url = `${BASE_URL}/gallery/nte/character/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/nte%20images/skills/${encodeAssetPath(item.name)}/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, null, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isNteArc) {
        const url = `${BASE_URL}/gallery/nte/weapon/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/nte%20images/arcs/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, null, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isWwWeapon) {
        const url = `${BASE_URL}/gallery/ww/weapon/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, null, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isWwEcho) {
        const url = `${BASE_URL}/gallery/ww/echo/${encodeURIComponent(item.name)}`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, null, '0.7', 'weekly');
          urlList.push(url);
        }
      }
    });

    // 6. HSR equipment detail pages from the canonical local databases
    xml += `\n  <!-- Honkai Star Rail Equipment Detail Pages -->\n`;
    hsrLightConeNames.forEach(name => {
      const url = `${BASE_URL}/gallery/hsr/lightcone/${encodeURIComponent(name)}`;
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, null, '0.7', 'weekly');
        urlList.push(url);
      }
    });

    hsrRelicNames.forEach(name => {
      const url = `${BASE_URL}/gallery/hsr/relic/${encodeURIComponent(name)}`;
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, null, '0.7', 'weekly');
        urlList.push(url);
      }
    });

    hsrOrnamentNames.forEach(name => {
      const url = `${BASE_URL}/gallery/hsr/ornament/${encodeURIComponent(name)}`;
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, null, '0.7', 'weekly');
        urlList.push(url);
      }
    });

    // 7. Aniimo detail pages from the verified official roster snapshot
    xml += `\n  <!-- Aniimo Detail Pages -->\n`;
    const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
    aniimoEntries.forEach(item => {
      const url = `${BASE_URL}/gallery/aniimo/character/${encodeURIComponent(item.name)}`;
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, item.checkedAt || null, '0.8', 'weekly', item.imageUrl ? [item.imageUrl] : []);
        urlList.push(url);
      }
    });

    // 8. Aniimo location pages derived from every form's verified locations
    xml += `\n  <!-- Aniimo Location Pages -->\n`;
    const aniimoLocations = [...new Set(aniimoEntries.flatMap(item =>
      (item.forms || []).flatMap(form => form.locations || item.locations || [])
    ))].sort((a, b) => a.localeCompare(b, 'ko'));
    aniimoLocations.forEach(location => {
      const slug = location.trim().replace(/\s+/g, '-');
      const url = `${BASE_URL}/gallery/aniimo/location/${encodeURIComponent(slug)}`;
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, null, '0.7', 'weekly');
        urlList.push(url);
      }
    });

    // 9. Blog Posts
    xml += `\n  <!-- Blog Articles -->\n`;
    const blogFilePath = path.join(ROOT_DIR, 'common-hub', 'data', 'blogData.ts');
    if (fs.existsSync(blogFilePath)) {
      const blogContent = fs.readFileSync(blogFilePath, 'utf8');
      const blogMatches = [...blogContent.matchAll(/id:\s*["'](.*?)["'][\s\S]*?date:\s*["'](\d{4}-\d{2}-\d{2})["']/g)];
      blogMatches.forEach(m => {
        const blogId = m[1];
        const publishedDate = m[2];
        const url = `${BASE_URL}/blog/${encodeURIComponent(blogId)}`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, publishedDate, '0.8', 'weekly');
          urlList.push(url);
        }
      });
    }

    validateGeneratedUrls(urlList, new Set(wwIds));
    xml += `</urlset>\n`;

    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf8');
    console.log(`Successfully generated sitemap.xml at ${sitemapPath} with ${urlList.length} URLs!`);

    // Submit to IndexNow
    await submitToIndexNow(urlList);

  } catch (error) {
    console.error('Fatal error during sitemap generation:', error);
    process.exitCode = 1;
  }
}

generateSitemap();
