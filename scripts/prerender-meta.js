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
// Blog Data Parsing
// ---------------------------------------------------------------------
function getBlogPosts() {
  const filePath = path.join(ROOT_DIR, 'common-hub', 'data', 'blogData.ts');
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    const arrayStringMatch = content.match(/export const BLOG_POSTS[^\[]*(\[[\s\S]*\]);/);
    if (arrayStringMatch && arrayStringMatch[1]) {
      // Remove type annotations if any, though eval usually handles plain JS literals
      // Use Function constructor instead of eval for safer execution of literals
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

function injectMetaAndContent(html, title, description, imageUrl, urlPath, innerContent = '') {
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
  
  // Inject DOM Content for AdSense Bot
  if (innerContent) {
    injected = injected.replace('<div id="root"></div>', `<div id="root">${innerContent}</div>`);
  }
  
  return injected;
}

function createPrerenderedPage(routePath, title, description, imageUrl, baseHtml, innerContent = '') {
  // routePath example: /gallery/ww/character/lucy
  const targetDir = path.join(DIST_DIR, ...routePath.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });
  
  const finalHtml = injectMetaAndContent(baseHtml, title, description, imageUrl, routePath, innerContent);
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
    // Generate inner text DOM for AdSense crawler
    const postHtmlContent = `
      <article>
        <h1>${post.title}</h1>
        <p><strong>작성일:</strong> ${post.date} | <strong>작성자:</strong> ${post.author} | <strong>카테고리:</strong> ${post.category}</p>
        <p><em>${post.excerpt}</em></p>
        <div class="blog-content">
          ${post.content.split('\n').map(line => {
            if (line.startsWith('###')) return `<h3>${line.replace(/###/g, '').trim()}</h3>`;
            if (line.trim() === '') return '<br/>';
            return `<p>${line}</p>`;
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

  console.log(`✅ Successfully injected static meta and DOM tags for ${count} dynamic routes!`);
}

runPrerender();
