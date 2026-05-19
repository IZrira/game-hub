import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const WW_CHAR_DIR = path.join(ROOT_DIR, 'ww-hub', 'data', 'characters', 'ww');
const HSR_CHAR_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'characters', 'hsr');
const HSR_GUIDE_INDEX = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides', 'index.ts');

const BASE_URL = 'https://rira-game-hub.pages.dev';

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

function parseHsrCharacter(id) {
  try {
    const filePath = path.join(HSR_CHAR_DIR, `${id}.ts`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    const folderNameMatch = content.match(/folderName:\s*["'](.*?)["']/);
    const nameMatch = content.match(/name:\s*["'](.*?)["']/);
    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : null,
      name: nameMatch ? nameMatch[1] : null
    };
  } catch (error) {
    console.error(`Error parsing HSR character ${id}:`, error);
    return null;
  }
}

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

async function submitToIndexNow(urlList) {
  // Only submit in production environments (GitHub Actions, Cloudflare Pages, Vercel, or custom prod env)
  const isProduction = process.env.NODE_ENV === 'production' || 
                        process.env.GITHUB_ACTIONS === 'true' || 
                        process.env.CF_PAGES === '1' ||
                        process.env.INDEXNOW_FORCE === 'true'; // Allow forcing for testing
  
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

async function generateSitemap() {
  try {
    const lastmod = new Date().toISOString().split('T')[0];

    const wwIds = getCharacterIds(WW_CHAR_DIR);
    const hsrIds = getCharacterIds(HSR_CHAR_DIR);
    const registeredHsrGuides = getRegisteredHsrGuides();

    console.log(`Found ${wwIds.length} Wuthering Waves characters.`);
    console.log(`Found ${hsrIds.length} Honkai Star Rail characters.`);
    console.log(`Found ${registeredHsrGuides.size} HSR guides in index.`);

    let totalUrls = 3; // Start with 3 core static pages
    const urlList = [
      `${BASE_URL}/`,
      `${BASE_URL}/gallery/hsr`,
      `${BASE_URL}/gallery/ww`
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/gallery/hsr</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/gallery/ww</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Wuthering Waves Characters Detail Pages -->
`;

    wwIds.forEach(id => {
      const url = `${BASE_URL}/gallery/ww/character/${id}`;
      xml += `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod><priority>0.8</priority></url>\n`;
      urlList.push(url);
      totalUrls++;
    });

    xml += `\n  <!-- Honkai Star Rail Characters Detail & Guide Pages -->\n`;

    hsrIds.forEach(id => {
      // Add character detail page
      const detailUrl = `${BASE_URL}/gallery/hsr/character/${id}`;
      xml += `  <url><loc>${detailUrl}</loc><lastmod>${lastmod}</lastmod><priority>0.8</priority></url>\n`;
      urlList.push(detailUrl);
      totalUrls++;

      // Check if this character has a registered guide
      const charData = parseHsrCharacter(id);
      if (charData) {
        const hasGuide = (charData.folderName && registeredHsrGuides.has(charData.folderName)) ||
                         (charData.name && registeredHsrGuides.has(charData.name));
        if (hasGuide) {
          const guideUrl = `${BASE_URL}/gallery/hsr/character/${id}/guide`;
          xml += `  <url><loc>${guideUrl}</loc><lastmod>${lastmod}</lastmod><priority>0.8</priority></url>\n`;
          urlList.push(guideUrl);
          totalUrls++;
        }
      }
    });

    xml += `</urlset>\n`;

    const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf8');
    console.log(`Successfully generated sitemap.xml at ${sitemapPath} with ${totalUrls} URLs!`);

    // Submit to IndexNow
    await submitToIndexNow(urlList);

  } catch (error) {
    console.error('Fatal error during sitemap generation:', error);
  }
}

generateSitemap();
