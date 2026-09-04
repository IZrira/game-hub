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
const WEAPONS_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'weapons.ts');
const NOTION_DATA_FILE = path.join(ROOT_DIR, 'common-hub', 'data', 'notion-data.json');

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

const BASE_URL = 'https://rira-game-hub.pages.dev';
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
  node += `    <lastmod>${lastmod}</lastmod>\n`;
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
    host: 'rira-game-hub.pages.dev',
    key: 'b6be7d1e8c7c4b2ca559a4bc5ef4d89a',
    keyLocation: 'https://rira-game-hub.pages.dev/b6be7d1e8c7c4b2ca559a4bc5ef4d89a.txt',
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

function getFileLastmod(filePath, defaultLastmod) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch (e) {
    console.error(`Error getting mtime for ${filePath}:`, e);
  }
  return defaultLastmod;
}

async function generateSitemap() {
  try {
    const defaultLastmod = new Date().toISOString().split('T')[0];
    const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
    const staticLastmod = getFileLastmod(indexHtmlPath, defaultLastmod);

    const wwIds = getCharacterIds(WW_CHAR_DIR);
    const hsrIds = getCharacterIds(HSR_CHAR_DIR);
    const registeredHsrGuides = getRegisteredHsrGuides();
    const registeredWwGuides = getRegisteredWwGuides();
    const wwWeapons = getWwWeapons();

    console.log(`Found ${wwIds.length} Wuthering Waves characters.`);
    console.log(`Found ${registeredWwGuides.size} Wuthering Waves guides.`);
    console.log(`Found ${hsrIds.length} Honkai Star Rail characters.`);
    console.log(`Found ${registeredHsrGuides.size} HSR guides in index.`);
    console.log(`Found ${wwWeapons.length} Wuthering Waves weapons.`);

    const urlList = [
      `${BASE_URL}/`,
      `${BASE_URL}/gallery/hsr`,
      `${BASE_URL}/gallery/ww`,
      `${BASE_URL}/gallery/nte`,
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
      xml += buildUrlNode(u, staticLastmod, u === `${BASE_URL}/` ? '1.0' : '0.9', 'daily', [defaultBanner]);
    });

    // 2. Wuthering Waves Characters Detail & Guide Pages
    xml += `\n  <!-- Wuthering Waves Characters Detail & Guide Pages -->\n`;
    wwIds.forEach(id => {
      const url = `${BASE_URL}/gallery/ww/character/${id}`;
      const charData = parseWwCharacter(id);
      const images = getWwCharacterImages(charData);
      const charFilePath = path.join(WW_CHAR_DIR, `${id}.ts`);
      const charLastmod = getFileLastmod(charFilePath, defaultLastmod);
      
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
      const charFilePath = path.join(HSR_CHAR_DIR, `${id}.ts`);
      const charLastmod = getFileLastmod(charFilePath, defaultLastmod);

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
    const weaponsLastmod = getFileLastmod(WEAPONS_FILE, defaultLastmod);
    wwWeapons.forEach(wp => {
      const url = `${BASE_URL}/gallery/ww/weapon/${encodeURIComponent(wp.name)}`;
      const imageUrl = `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(wp.name)}.webp`;
      
      if (!urlList.includes(url)) {
        xml += buildUrlNode(url, weaponsLastmod, '0.8', 'daily', [imageUrl]);
        urlList.push(url);
      }
    });

    // 5. Notion Imported Items Detail Pages (WW, HSR, NTE)
    xml += `\n  <!-- Notion Imported Items Detail Pages -->\n`;
    const notionData = getNotionData();
    console.log(`Processing ${notionData.length} Notion items for sitemap...`);
    notionData.forEach(item => {
      if (!item.name) return;
      const cleanType = item.type || '';
      const isWwWeapon = ['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(cleanType);
      const isWwCharacter = item.dbSource === 'ww_characters' || (cleanType === '캐릭터' && item.dbSource !== 'nte_characters');
      const isNteCharacter = item.dbSource === 'nte_characters';
      const isNteArc = item.dbSource === 'nte_arcs' || ['고체', '액체', '기체', '결합', '플라즈마'].includes(cleanType);
      const isHsrLightCone = cleanType === '광추';
      const isHsrRelic = cleanType === '터널 유물';
      const isHsrOrnament = cleanType === '차원 장신구';

      if (isNteCharacter) {
        const url = `${BASE_URL}/gallery/nte/character/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/nte%20images/skills/${encodeAssetPath(item.name)}/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isNteArc) {
        const url = `${BASE_URL}/gallery/nte/weapon/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/nte%20images/arcs/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isWwWeapon) {
        const url = `${BASE_URL}/gallery/ww/weapon/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isWwCharacter) {
        const url = `${BASE_URL}/gallery/ww/character/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/ww%20images/characters/${encodeAssetPath(item.name)}/art01.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.8', 'daily', [imageUrl]);
          urlList.push(url);
        }
      } else if (isHsrLightCone) {
        const url = `${BASE_URL}/gallery/hsr/lightcone/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/hsr%20images/light%20cones/${encodeAssetPath(item.name)}.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.7', 'weekly', [imageUrl]);
          urlList.push(url);
        }
      } else if (isHsrRelic) {
        const url = `${BASE_URL}/gallery/hsr/relic/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/hsr%20images/relics/${encodeAssetPath(item.name)}_1.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.7', 'weekly', [imageUrl]);
          urlList.push(url);
        }
      } else if (isHsrOrnament) {
        const url = `${BASE_URL}/gallery/hsr/ornament/${encodeURIComponent(item.name)}`;
        const imageUrl = `${CDN_URL}/hsr%20images/relics/${encodeAssetPath(item.name)}_1.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.7', 'weekly', [imageUrl]);
          urlList.push(url);
        }
      } else if (item.dbSource === 'ww_guides') {
        const charParam = encodeURIComponent(item.id || item.name);
        const url = `${BASE_URL}/gallery/ww/character/${charParam}/guide`;
        const imageUrl = `${CDN_URL}/ww%20images/characters/${encodeAssetPath(item.name)}/art01.webp`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.9', 'daily', [imageUrl]);
          urlList.push(url);
        }
      }
    });

    // 6. Blog Posts
    xml += `\n  <!-- Blog Articles -->\n`;
    const blogFilePath = path.join(ROOT_DIR, 'common-hub', 'data', 'blogData.ts');
    if (fs.existsSync(blogFilePath)) {
      const blogContent = fs.readFileSync(blogFilePath, 'utf8');
      const idMatches = [...blogContent.matchAll(/id:\s*["'](.*?)["']/g)];
      idMatches.forEach(m => {
        const blogId = m[1];
        const url = `${BASE_URL}/blog/${encodeURIComponent(blogId)}`;
        if (!urlList.includes(url)) {
          xml += buildUrlNode(url, defaultLastmod, '0.8', 'weekly');
          urlList.push(url);
        }
      });
    }

    xml += `</urlset>\n`;

    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf8');
    console.log(`Successfully generated sitemap.xml at ${sitemapPath} with ${urlList.length} URLs!`);

    // Submit to IndexNow
    await submitToIndexNow(urlList);

  } catch (error) {
    console.error('Fatal error during sitemap generation:', error);
  }
}

generateSitemap();
