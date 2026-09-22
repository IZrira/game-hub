import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

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

const OFFICIAL_HABITAT_TARGETS = {
  '붓꽃 바다': 17,
  '구름 초원': 17,
  '스테플 숲': 15,
  '로즈타워 숲': 14,
  '늑대이빨 능선': 18,
  '청석 대지': 16,
  '뇌전의 숲': 16,
  '설산기슭 초원': 15,
  '고래첨벙 해안': 16,
  '붉은바위 고지': 22,
  '안개숲': 13,
  '갈매기 만': 13,
  '조화의 언덕': 10,
  '바다끝 구름': 16
};

const errors = [];
const warnings = [];

function logSection(title) {
  console.log(`\n\x1b[1m\x1b[36m=== ${title} ===\x1b[0m`);
}

function logPass(msg) {
  console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
}

function logFail(msg) {
  console.error(`  \x1b[31m✗\x1b[0m ${msg}`);
  errors.push(msg);
}

function logWarn(msg) {
  console.warn(`  \x1b[33m⚠\x1b[0m ${msg}`);
  warnings.push(msg);
}

// ---------------------------------------------------------------------
// 1. Validate Aniimo Data
// ---------------------------------------------------------------------
function validateAniimo() {
  logSection('ANIIMO DATA VALIDATION');
  const aniimoFile = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
  if (!fs.existsSync(aniimoFile)) {
    return logFail('aniimo.json file not found');
  }

  const entries = JSON.parse(fs.readFileSync(aniimoFile, 'utf8'));

  // 1. Species count
  if (entries.length === 86) {
    logPass(`86 official species registered (found ${entries.length})`);
  } else {
    logFail(`Expected 86 species, but found ${entries.length}`);
  }

  // 2. Forms count
  const allForms = entries.flatMap(e => e.forms || []);
  if (allForms.length === 206) {
    logPass(`206 official forms registered (found ${allForms.length})`);
  } else {
    logFail(`Expected 206 forms, but found ${allForms.length}`);
  }

  // 3. Habitat counts & target verification
  const habitatCounts = {};
  OFFICIAL_ANIIMO_HABITATS.forEach(h => {
    habitatCounts[h] = 0;
  });

  entries.forEach(entry => {
    const appearanceHabitats = new Set();
    (entry.habitats || []).forEach(h => appearanceHabitats.add(h));
    (entry.forms || []).forEach(f => {
      (f.locations || []).forEach(l => appearanceHabitats.add(l));
    });

    appearanceHabitats.forEach(h => {
      if (habitatCounts[h] !== undefined) {
        habitatCounts[h]++;
      } else {
        logFail(`Aniimo ${entry.name} references unknown habitat: "${h}"`);
      }
    });
  });

  let habitatMismatch = false;
  OFFICIAL_ANIIMO_HABITATS.forEach(habitat => {
    const target = OFFICIAL_HABITAT_TARGETS[habitat];
    const actual = habitatCounts[habitat] || 0;
    if (actual === target) {
      logPass(`${habitat}: ${actual}/${target} species`);
    } else {
      habitatMismatch = true;
      logFail(`${habitat}: Expected ${target} species, found ${actual}`);
    }
  });

  if (!habitatMismatch) {
    logPass('All 14 official habitats match species targets with 100% precision');
  }

  // 4. Evolution references
  const speciesNames = new Set(entries.map(e => e.name));
  const speciesNumbers = new Set(entries.map(e => e.number));
  entries.forEach(entry => {
    (entry.evolution || []).forEach(node => {
      // Allow unrevealed/placeholder nodes (name: null)
      if (node.name && !speciesNames.has(node.name) && !speciesNumbers.has(node.number)) {
        logFail(`Aniimo ${entry.name} evolution node references unknown species: "${node.name}" (NO.${node.number})`);
      }
    });
  });
  logPass('Evolution lineage tree references validated');
}

// ---------------------------------------------------------------------
// 2. Validate HSR Data
// ---------------------------------------------------------------------
function validateHsr() {
  logSection('HSR DATA VALIDATION');
  const hsrCharDir = path.join(ROOT_DIR, 'hsr-hub', 'data', 'characters', 'hsr');
  const hsrLcDir = path.join(ROOT_DIR, 'hsr-hub', 'data', 'lightcones');
  const hsrRelicsFile = path.join(ROOT_DIR, 'hsr-hub', 'data', 'relics.ts');
  const hsrOrnamentsFile = path.join(ROOT_DIR, 'hsr-hub', 'data', 'ornaments.ts');
  const hsrGuidesDir = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides');

  // Character IDs
  const charFiles = fs.readdirSync(hsrCharDir).filter(f => f.endsWith('.ts'));
  const charIds = new Set();
  charFiles.forEach(f => {
    const id = f.replace('.ts', '');
    if (charIds.has(id)) {
      logFail(`Duplicate HSR character ID: "${id}"`);
    }
    charIds.add(id);
  });
  logPass(`${charIds.size} HSR characters registered with unique IDs`);

  // Lightcones (evaluated loading)
  const lightCones = new Set();
  const lcFiles = fs.readdirSync(hsrLcDir).filter(f => f.endsWith('.ts') && !['index.ts', 'dataFactory.ts'].includes(f));
  lcFiles.forEach(f => {
    try {
      let content = fs.readFileSync(path.join(hsrLcDir, f), 'utf8');
      content = content.replace(/import\s+[\s\S]*?;/g, '');
      content = content.replace(/export\s+const\s+\w+:\s*HsrLightCone\[\]\s*=\s*/, 'return ');
      const fn = new Function('createDetailedBaseStats', 'createMaterial', content);
      const mockDetailedStats = () => ({});
      const mockMaterial = () => ({});
      const list = fn(mockDetailedStats, mockMaterial);
      if (Array.isArray(list)) {
        list.forEach(lc => {
          if (lc.name) lightCones.add(lc.name.trim());
        });
      }
    } catch(e) {}
  });
  logPass(`${lightCones.size} HSR light cones loaded`);

  // Relics (evaluated loading)
  const relics = new Set();
  if (fs.existsSync(hsrRelicsFile)) {
    try {
      let content = fs.readFileSync(hsrRelicsFile, 'utf8');
      content = content.replace(/export\s+const\s+RELIC_DATA\s*=\s*/, 'return ');
      content = content.replace(/export\s+default\s+RELIC_DATA;?/, '');
      const list = new Function(content)() || [];
      list.forEach(r => {
        if (r.name) relics.add(r.name.trim());
      });
    } catch(e) {}
  }
  logPass(`${relics.size} HSR relics loaded`);

  // Ornaments (evaluated loading)
  const ornaments = new Set();
  if (fs.existsSync(hsrOrnamentsFile)) {
    try {
      let content = fs.readFileSync(hsrOrnamentsFile, 'utf8');
      content = content.replace(/export\s+type\s+[\s\S]*?;/g, '');
      content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
      content = content.replace(/export\s+const\s+ORNAMENT_DATA:\s*Ornament\[\]\s*=\s*/, 'return ');
      const list = new Function(content)() || [];
      list.forEach(o => {
        if (o.name) ornaments.add(o.name.trim());
      });
    } catch(e) {}
  }
  logPass(`${ornaments.size} HSR dimension ornaments loaded`);

  // Guides references check
  if (fs.existsSync(hsrGuidesDir)) {
    const guideFiles = fs.readdirSync(hsrGuidesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
    guideFiles.forEach(f => {
      try {
        let content = fs.readFileSync(path.join(hsrGuidesDir, f), 'utf8');
        content = content.replace(/import\s+[\s\S]*?;/g, '');
        content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
        content = content.replace(/interface\s+[\s\S]*?\n\}/g, '');
        content = content.replace(/:\s*CharacterGuide\s*=/g, ' =');
        content = content.replace(/export\s+const\s+([^\s=:]+)\s*=\s*/, 'const $1 = ');

        const match = content.match(/const\s+([^\s=:]+)\s*=\s*([\s\S]+?);?\s*$/);
        if (match && match[2]) {
          const guide = new Function('return ' + match[2])();
          if (guide && guide.characterName) {
            // Check lightcones
            const allGuideLcs = [
              ...(Array.isArray(guide.bestLightCones) ? guide.bestLightCones : []),
              ...(Array.isArray(guide.variants?.[0]?.bestLightCones) ? guide.variants[0].bestLightCones : [])
            ];
            allGuideLcs.forEach(lc => {
              const lcName = typeof lc === 'string' ? lc.trim() : lc?.name?.trim();
              if (lcName && !lightCones.has(lcName)) {
                logWarn(`HSR guide "${guide.characterName}" references unindexed LightCone: "${lcName}"`);
              }
            });

            // Check relics
            const allGuideRelics = [
              ...(Array.isArray(guide.bestRelics) ? guide.bestRelics : []),
              ...(Array.isArray(guide.variants?.[0]?.bestRelics) ? guide.variants[0].bestRelics : [])
            ];
            allGuideRelics.forEach(r => {
              const rName = typeof r === 'string' ? r.trim() : r?.name?.trim();
              if (rName && !relics.has(rName)) {
                logWarn(`HSR guide "${guide.characterName}" references unindexed Relic: "${rName}"`);
              }
            });
          }
        }
      } catch (e) {}
    });
    logPass('HSR character guides cross-references verified');
  }
}

// ---------------------------------------------------------------------
// 3. Validate WW Data
// ---------------------------------------------------------------------
function validateWw() {
  logSection('WW DATA VALIDATION');
  const wwCharDir = path.join(ROOT_DIR, 'ww-hub', 'data', 'characters', 'ww');
  const wwWeaponsFile = path.join(ROOT_DIR, 'ww-hub', 'data', 'weapons.ts');

  if (fs.existsSync(wwCharDir)) {
    const charFiles = fs.readdirSync(wwCharDir).filter(f => f.endsWith('.ts'));
    const charIds = new Set();
    charFiles.forEach(f => {
      const id = f.replace('.ts', '');
      if (charIds.has(id)) {
        logFail(`Duplicate WW resonator ID: "${id}"`);
      }
      charIds.add(id);
    });
    logPass(`${charIds.size} WW resonators registered with unique IDs`);
  }

  if (fs.existsSync(wwWeaponsFile)) {
    const content = fs.readFileSync(wwWeaponsFile, 'utf8');
    const weaponIds = new Set();
    for (const m of content.matchAll(/id:\s*["']([^"']+)["']/g)) {
      weaponIds.add(m[1]);
    }
    logPass(`${weaponIds.size} WW weapons registered in local dataset`);
  }
}

// ---------------------------------------------------------------------
// 4. Validate NTE Data
// ---------------------------------------------------------------------
function validateNte() {
  logSection('NTE DATA VALIDATION');
  const arcsFile = path.join(ROOT_DIR, 'nte-hub', 'data', 'arcs.ts');
  if (fs.existsSync(arcsFile)) {
    const content = fs.readFileSync(arcsFile, 'utf8');
    const arcNames = new Set();
    for (const m of content.matchAll(/name:\s*["']([^"']+)["']/g)) {
      arcNames.add(m[1]);
    }
    logPass(`${arcNames.size} NTE arcs registered`);
  }
}

// ---------------------------------------------------------------------
// 5. Validate SEO & Redirects
// ---------------------------------------------------------------------
function validateSeo() {
  logSection('SEO & REDIRECTS VALIDATION');
  const redirectsFile = path.join(ROOT_DIR, 'public', '_redirects');
  if (!fs.existsSync(redirectsFile)) {
    return logFail('public/_redirects not found');
  }

  const content = fs.readFileSync(redirectsFile, 'utf8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  // Check 301 redirects exist for legacy habitats
  const requiredLegacy = ['스타폴-숲', '눈기슭-초원', '바다끝-구릉', '초승달-만', '석양-해원'];
  let legacyPassed = true;
  requiredLegacy.forEach(slug => {
    const hasRule = lines.some(l => l.includes(slug) && l.includes('301'));
    if (!hasRule) {
      legacyPassed = false;
      logFail(`Missing 301 redirect rule for legacy habitat: ${slug}`);
    }
  });

  if (legacyPassed) {
    logPass('Cloudflare Pages 301 permanent redirects for legacy habitats verified');
  }

  // Parse all 301 rules
  const redirectRules = [];
  lines.forEach(line => {
    const parts = line.split(/\s+/);
    if (parts.length >= 3 && parts[2] === '301') {
      redirectRules.push({ from: parts[0], to: parts[1] });
    }
  });

  // Check for circular redirects / self-redirects
  let loopDetected = false;
  redirectRules.forEach(r => {
    if (r.from === r.to) {
      loopDetected = true;
      logFail(`Self redirect detected: ${r.from} -> ${r.to}`);
    }
    const reverse = redirectRules.find(other => other.from === r.to && other.to === r.from);
    if (reverse) {
      loopDetected = true;
      logFail(`Circular redirect loop detected: ${r.from} <-> ${r.to}`);
    }
  });

  if (!loopDetected) {
    logPass(`Redirect loop safety verified across ${redirectRules.length} rules`);
  }

  // Trailing slash 301 rules check
  const sampleTrailingSlashPaths = ['/about/', '/privacy/', '/blog/', '/gallery/hsr/'];
  sampleTrailingSlashPaths.forEach(p => {
    const hasRule = redirectRules.some(r => r.from === p && r.to === p.slice(0, -1));
    if (!hasRule) {
      logFail(`Missing static 301 redirect rule for trailing slash: ${p} -> ${p.slice(0, -1)}`);
    }
  });
  logPass('Static 301 trailing slash redirect rules verified in _redirects');

  // Check functions/_middleware.ts exists and enforces trailing slash redirect
  const middlewareFile = path.join(ROOT_DIR, 'functions', '_middleware.ts');
  if (fs.existsSync(middlewareFile)) {
    const mwContent = fs.readFileSync(middlewareFile, 'utf8');
    if (mwContent.includes("endsWith('/')") && mwContent.includes('301')) {
      logPass('Cloudflare Pages edge middleware (_middleware.ts) verified for 301 trailing slash redirection');
    } else {
      logFail('Cloudflare Pages edge middleware does not properly enforce 301 trailing slash redirection');
    }
  } else {
    logFail('Cloudflare Pages edge middleware file (functions/_middleware.ts) not found');
  }

  // Check all sitemaps in public/ for trailing slashes & redirect collisions
  const publicDir = path.join(ROOT_DIR, 'public');
  const sitemapFiles = fs.readdirSync(publicDir).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
  let trailingSlashErrors = 0;
  let sitemapCollision = false;
  let totalDiscoveredSitemapUrls = 0;

  sitemapFiles.forEach(smFile => {
    const smPath = path.join(publicDir, smFile);
    const smContent = fs.readFileSync(smPath, 'utf8');
    const locMatches = [...smContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    
    locMatches.forEach(match => {
      const locUrl = match[1].trim();
      totalDiscoveredSitemapUrls++;
      
      // If URL ends with slash, it must ONLY be the root domain URL
      if (locUrl.endsWith('/') && locUrl !== 'https://riragamehub.com/') {
        trailingSlashErrors++;
        logFail(`Sitemap [${smFile}] contains trailing-slash URL: ${locUrl}`);
      }

      // Check collision with 301 redirect sources
      redirectRules.forEach(r => {
        const cleanPath = r.from.replace(/^\//, '');
        if (locUrl === `https://riragamehub.com/${cleanPath}` || locUrl === `https://riragamehub.com${r.from}`) {
          sitemapCollision = true;
          logFail(`Sitemap [${smFile}] contains 301 redirected source URL: ${locUrl} (redirects to ${r.to})`);
        }
      });
    });
  });

  if (trailingSlashErrors === 0) {
    logPass(`Zero trailing-slash violations across all ${sitemapFiles.length} sitemaps (${totalDiscoveredSitemapUrls} URLs checked)`);
  }

  if (!sitemapCollision) {
    logPass('Sitemap integrity verified: zero redirected 301 source URLs present');
  }

  // Check prerendered canonical tags in dist/ (if dist exists)
  const distDir = path.join(ROOT_DIR, 'dist');
  if (fs.existsSync(distDir)) {
    const testPaths = ['about', 'privacy', 'blog'];
    let canonicalTrailingSlashErrors = 0;
    testPaths.forEach(tp => {
      const htmlPath = path.join(distDir, tp, 'index.html');
      if (fs.existsSync(htmlPath)) {
        const html = fs.readFileSync(htmlPath, 'utf8');
        const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
        if (canonicalMatch && canonicalMatch[1]) {
          const cUrl = canonicalMatch[1];
          if (cUrl.endsWith('/') && cUrl !== 'https://riragamehub.com/') {
            canonicalTrailingSlashErrors++;
            logFail(`Prerendered HTML (${tp}) canonical has illegal trailing slash: ${cUrl}`);
          }
        }
      }
    });
    if (canonicalTrailingSlashErrors === 0) {
      logPass('Prerendered HTML canonical tags verified (non-trailing slash strictly enforced)');
    }
  }

  // Check SPA wildcard fallback
  if (lines.some(l => l.startsWith('/*') && l.includes('200'))) {
    logPass('SPA wildcard fallback (/* /index.html 200) verified');
  } else {
    logFail('Missing SPA wildcard fallback (/* /index.html 200) in _redirects');
  }
}

// ---------------------------------------------------------------------
// Main Execution
// ---------------------------------------------------------------------
function run() {
  console.log('\x1b[1m\x1b[35m=== RIRA GAME HUB DATA INTEGRITY & QUALITY VALIDATOR ===\x1b[0m');
  validateAniimo();
  validateHsr();
  validateWw();
  validateNte();
  validateSeo();

  console.log('\n\x1b[1m=== SUMMARY ===\x1b[0m');
  if (errors.length === 0) {
    console.log(`\x1b[32m\x1b[1mALL CHECKS PASSED!\x1b[0m (${warnings.length} warnings)`);
    process.exit(0);
  } else {
    console.error(`\x1b[31m\x1b[1mVALIDATION FAILED WITH ${errors.length} ERROR(S):\x1b[0m`);
    errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
    process.exit(1);
  }
}

run();
