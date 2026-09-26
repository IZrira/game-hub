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
const GUIDE_ARTICLES_FILE = path.join(ROOT_DIR, 'common-hub', 'data', 'guideArticles.json');

const HSR_GUIDE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'guides');
const HSR_PARTY_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'parties');
const HSR_LIGHTCONE_DIR = path.join(ROOT_DIR, 'hsr-hub', 'data', 'lightcones');
const HSR_RELICS_FILE = path.join(ROOT_DIR, 'hsr-hub', 'data', 'relics.ts');
const HSR_ORNAMENTS_FILE = path.join(ROOT_DIR, 'hsr-hub', 'data', 'ornaments.ts');
const WW_GUIDE_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'guides.ts');
const WW_PARTY_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'parties.ts');

const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://riragamehub.com';
const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
const prerenderedRoutes = new Set();
const globalHsrNameToIdMap = new Map();
const globalWwNameToIdMap = new Map();
let globalSitemapRouteSet = new Set();

function initGlobalCharacterMaps() {
  const hsrIds = getCharacterIds(HSR_CHAR_DIR);
  hsrIds.forEach(id => {
    const meta = parseHsrCharacter(id);
    let name = hsrKoData[`character.${id}.name`] || meta?.name || id;
    if (name.startsWith('character.')) name = meta?.folderName || id;
    globalHsrNameToIdMap.set(id, id);
    if (meta?.name) globalHsrNameToIdMap.set(meta.name.trim(), id);
    if (meta?.folderName) globalHsrNameToIdMap.set(meta.folderName.trim(), id);
    if (name) globalHsrNameToIdMap.set(name.trim(), id);
  });

  const wwIds = getCharacterIds(WW_CHAR_DIR);
  wwIds.forEach(id => {
    const meta = parseWwCharacter(id);
    let name = wwKoData[`character.${id}.name`] || meta?.name || id;
    if (name.startsWith('character.')) name = meta?.folderName || id;
    globalWwNameToIdMap.set(id, id);
    if (meta?.name) globalWwNameToIdMap.set(meta.name.trim(), id);
    if (meta?.folderName) globalWwNameToIdMap.set(meta.folderName.trim(), id);
    if (name) globalWwNameToIdMap.set(name.trim(), id);
  });
}

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

    let fullChar = null;
    try {
      let code = content.replace(/import\s+[\s\S]*?;/g, '');
      code = code.replace(/const\s+\w+:\s*Character\s*=\s*/, 'return ');
      code = code.replace(/export\s+default\s+\w+;?/, '');
      const mockBaseStats = (hp, atk, def, speed = 100, taunt = 100, energy = 100) => ({
        lv1: { '기초 HP': hp[0], '기초 공격력': atk[0], '기초 방어력': def[0] },
        lv80: { '기초 HP': hp[hp.length - 1], '기초 공격력': atk[atk.length - 1], '기초 방어력': def[def.length - 1] },
        speed, taunt, energy
      });
      const mockMaterial = (name, count, rarity) => ({ name, count, rarity });
      const mockSkill = (name, tag, description, icon) => ({ name, tag, description, icon });
      fullChar = new Function('createHsrBaseStats', 'createMaterial', 'createSkill', code)(mockBaseStats, mockMaterial, mockSkill);
    } catch (e) {}

    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : fullChar?.folderName || null,
      name: nameMatch ? nameMatch[1] : fullChar?.name || null,
      attribute: attributeMatch ? attributeMatch[1] : fullChar?.attribute || null,
      path: pathMatch ? pathMatch[1] : fullChar?.path || null,
      rarity: rarityMatch ? parseInt(rarityMatch[1], 10) : fullChar?.rarity || 5,
      briefInfo: briefInfoMatch ? briefInfoMatch[1] : fullChar?.briefInfo || null,
      isTrailblazer,
      baseStats: fullChar?.baseStats,
      skills: fullChar?.skills || [],
      additionalAbilities: fullChar?.additionalAbilities || [],
      eidolons: fullChar?.eidolons || [],
      materials_v2: fullChar?.materials_v2
    };
  } catch (error) {
    return null;
  }
}

function parseWwCharacter(id) {
  try {
    const filePath = path.join(WW_CHAR_DIR, `${id}.ts`);
    if (!fs.existsSync(filePath)) return null;
    let content = fs.readFileSync(filePath, 'utf8');
    const folderNameMatch = content.match(/folderName:\s*["'](.*?)["']/);
    const nameMatch = content.match(/name:\s*["'](.*?)["']/);
    const isRover = content.includes('isRover: true') || id.startsWith('rover_');
    const attributeMatch = content.match(/attribute:\s*["'](.*?)["']/);
    const weaponTypeMatch = content.match(/weaponType:\s*["'](.*?)["']/);
    const rarityMatch = content.match(/rarity:\s*(\d+)/);
    const briefInfoMatch = content.match(/briefInfo:\s*["']([\s\S]*?)["']\s*,/);

    let fullChar = null;
    try {
      let code = content.replace(/import\s+[\s\S]*?;/g, '');
      code = code.replace(/const\s+\w+:\s*WuwaCharacter\s*=\s*/, 'return ');
      code = code.replace(/export\s+default\s+\w+;?/, '');
      const mockBaseStats = (hp, atk, def) => ({
        lv1: { '기초 HP': hp[0], '기초 공격력': atk[0], '기초 방어력': def[0] },
        lv90: { '기초 HP': hp[hp.length - 1], '기초 공격력': atk[atk.length - 1], '기초 방어력': def[def.length - 1] }
      });
      const mockMaterial = (name, count, rarity) => ({ name, count, rarity });
      const mockSkill = (name, tag, description, icon) => ({ name, tag, description, icon });
      fullChar = new Function('createWwBaseStats', 'createMaterial', 'createWwSkill', code)(mockBaseStats, mockMaterial, mockSkill);
    } catch (e) {}

    return {
      id,
      folderName: folderNameMatch ? folderNameMatch[1] : fullChar?.folderName || null,
      name: nameMatch ? nameMatch[1] : fullChar?.name || null,
      isRover,
      attribute: attributeMatch ? attributeMatch[1] : fullChar?.attribute || '기류',
      weaponType: weaponTypeMatch ? weaponTypeMatch[1] : fullChar?.weaponType || null,
      rarity: rarityMatch ? parseInt(rarityMatch[1], 10) : fullChar?.rarity || 5,
      briefInfo: briefInfoMatch ? briefInfoMatch[1] : fullChar?.briefInfo || null,
      baseStats: fullChar?.baseStats,
      skills: fullChar?.skills || [],
      additionalAbilities: fullChar?.additionalAbilities || [],
      eidolons: fullChar?.eidolons || [],
      materials_v2: fullChar?.materials_v2
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

function loadHsrRelics() {
  try {
    if (!fs.existsSync(HSR_RELICS_FILE)) return [];
    let content = fs.readFileSync(HSR_RELICS_FILE, 'utf8');
    content = content.replace(/export\s+const\s+RELIC_DATA\s*=\s*/, 'return ');
    content = content.replace(/export\s+default\s+RELIC_DATA;?/, '');
    return new Function(content)() || [];
  } catch (e) {
    return [];
  }
}

function loadHsrOrnaments() {
  try {
    if (!fs.existsSync(HSR_ORNAMENTS_FILE)) return [];
    let content = fs.readFileSync(HSR_ORNAMENTS_FILE, 'utf8');
    content = content.replace(/export\s+type\s+[\s\S]*?;/g, '');
    content = content.replace(/export\s+interface\s+[\s\S]*?\n\}/g, '');
    content = content.replace(/export\s+const\s+ORNAMENT_DATA:\s*Ornament\[\]\s*=\s*/, 'return ');
    return new Function(content)() || [];
  } catch (e) {
    return [];
  }
}

function loadHsrLightcones() {
  try {
    if (!fs.existsSync(HSR_LIGHTCONE_DIR)) return [];
    const files = fs.readdirSync(HSR_LIGHTCONE_DIR).filter(f => f.endsWith('.ts') && !['index.ts', 'dataFactory.ts'].includes(f));
    const allLcs = [];
    files.forEach(file => {
      try {
        let content = fs.readFileSync(path.join(HSR_LIGHTCONE_DIR, file), 'utf8');
        content = content.replace(/import\s+[\s\S]*?;/g, '');
        content = content.replace(/export\s+const\s+\w+:\s*HsrLightCone\[\]\s*=\s*/, 'return ');
        const fn = new Function('createDetailedBaseStats', 'createMaterial', content);
        const mockDetailedStats = (hp, atk, def) => ({
          hp: Array.isArray(hp) ? hp[hp.length - 1] : hp,
          atk: Array.isArray(atk) ? atk[atk.length - 1] : atk,
          def: Array.isArray(def) ? def[def.length - 1] : def
        });
        const mockMaterial = (name, count, rarity) => ({ name, count, rarity });
        const list = fn(mockDetailedStats, mockMaterial);
        if (Array.isArray(list)) allLcs.push(...list);
      } catch (err) {}
    });
    return allLcs;
  } catch (e) {
    return [];
  }
}

function buildHsrEquipmentToCharactersMap(hsrGuidesMap) {
  const lightConeToChars = new Map();
  const relicToChars = new Map();
  const ornamentToChars = new Map();

  const charNameToIdMap = new Map();
  const hsrIds = getCharacterIds(HSR_CHAR_DIR);
  hsrIds.forEach(id => {
    const meta = parseHsrCharacter(id);
    if (meta) {
      if (meta.name) charNameToIdMap.set(meta.name.trim(), id);
      if (meta.folderName) charNameToIdMap.set(meta.folderName.trim(), id);
    }
    charNameToIdMap.set(id, id);
  });

  hsrGuidesMap.forEach((g) => {
    const charName = g.characterName || '';
    const charId = charNameToIdMap.get(charName) || charNameToIdMap.get(g.name) || charName;
    if (!charId) return;

    // Lightcones
    const lightCones = [
      ...(Array.isArray(g.bestLightCones) ? g.bestLightCones : []),
      ...(Array.isArray(g.variants?.[0]?.bestLightCones) ? g.variants[0].bestLightCones : [])
    ];
    lightCones.forEach((lc, idx) => {
      const lcName = typeof lc === 'string' ? lc.trim() : lc?.name?.trim();
      const lcNote = typeof lc === 'object' ? lc?.note : '';
      if (lcName) {
        if (!lightConeToChars.has(lcName)) lightConeToChars.set(lcName, []);
        const list = lightConeToChars.get(lcName);
        if (!list.some(item => item.charId === charId)) {
          list.push({ charId, charName: charName || charId, rank: idx + 1, note: lcNote });
        }
      }
    });

    // Relics
    const relics = [
      ...(Array.isArray(g.bestRelics) ? g.bestRelics : []),
      ...(Array.isArray(g.variants?.[0]?.bestRelics) ? g.variants[0].bestRelics : [])
    ];
    relics.forEach(r => {
      const rName = typeof r === 'string' ? r.trim() : r?.name?.trim();
      const rNote = typeof r === 'object' ? r?.note : '';
      if (rName) {
        if (!relicToChars.has(rName)) relicToChars.set(rName, []);
        const list = relicToChars.get(rName);
        if (!list.some(item => item.charId === charId)) {
          list.push({ charId, charName: charName || charId, note: rNote });
        }
      }
    });

    // Ornaments
    const ornaments = [
      ...(Array.isArray(g.bestOrnaments) ? g.bestOrnaments : []),
      ...(Array.isArray(g.variants?.[0]?.bestOrnaments) ? g.variants[0].bestOrnaments : [])
    ];
    ornaments.forEach(o => {
      const oName = typeof o === 'string' ? o.trim() : o?.name?.trim();
      const oNote = typeof o === 'object' ? o?.note : '';
      if (oName) {
        if (!ornamentToChars.has(oName)) ornamentToChars.set(oName, []);
        const list = ornamentToChars.get(oName);
        if (!list.some(item => item.charId === charId)) {
          list.push({ charId, charName: charName || charId, note: oNote });
        }
      }
    });
  });

  return { lightConeToChars, relicToChars, ornamentToChars };
}

function buildWwWeaponToCharactersMap() {
  const weaponToChars = new Map();
  const notionData = getNotionData();
  notionData.forEach(item => {
    if (item.dbSource === 'ww_guides' && Array.isArray(item.weapons)) {
      const charId = item.id || item.name;
      const charName = item.name || item.id;
      item.weapons.forEach(w => {
        let wName = (typeof w === 'string' ? w : w?.name || '').trim();
        let wNote = typeof w === 'object' ? w?.note : '';
        if (!wNote && (wName.includes(':') || wName.includes('：'))) {
          const parts = wName.split(/[:：]/);
          wName = parts[0].trim();
          wNote = parts.slice(1).join(':').trim();
        }
        if (wName) {
          if (!weaponToChars.has(wName)) weaponToChars.set(wName, []);
          const list = weaponToChars.get(wName);
          if (!list.some(c => c.charId === charId)) {
            list.push({ charId, charName, rank: typeof w === 'object' ? w.rank : undefined, note: wNote });
          }
        }
      });
    }
  });
  return weaponToChars;
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
            "item": BASE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": gameName,
            "item": `${BASE_URL}${routePath.split('/').slice(0, 3).join('/')}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${charName} 공략`,
            "item": `${BASE_URL}${routePath}`
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
            "url": `${BASE_URL}/assets/logo.png`
          }
        },
        "description": `${gameName} ${charName}의 추천 무기/광추, 에코/유물 세팅, 추천 파티 조합 및 스탯 목표치 완벽 공략.`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}${routePath}`
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

  // Enforce non-trailing slash policy: root remains '/', all other routes strip trailing slash
  const cleanUrlPath = (urlPath.length > 1 && urlPath.endsWith('/'))
    ? urlPath.replace(/\/+$/, '')
    : urlPath;
  const canonicalUrl = cleanUrlPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanUrlPath}`;

  // Inject missing canonical/og/twitter tags and optional JSON-LD schema into <head>
  let extraTags = `
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
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

    const alreadyWrapped = innerContent.includes('prerender-shell');
    const wrappedContent = alreadyWrapped ? innerContent : `
    <div class="prerender-shell" id="prerender-root">
      <div class="prerender-top-shimmer" aria-hidden="true"></div>
      <header class="prerender-header-bar">
        <div class="prerender-brand">
          <span class="prerender-logo-dot"></span>
          <a href="/" class="prerender-brand-name">RIRA GAME HUB</a>
        </div>
      </header>
      <main class="prerender-main">
        ${innerContent}
      </main>
      <footer class="prerender-footer">
        <p>© 2026 Rira Game Hub. All rights reserved.</p>
        <p>
          <a href="/about">About Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/tos">Terms of Service</a>
          <a href="/contact">Contact</a>
        </p>
      </footer>
    </div>`;

    injected = `${injected.slice(0, startIndex + startMarker.length)}\n${wrappedContent}\n    ${injected.slice(endIndex)}`;
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

  // Also write [route].html so static clean-url engines can serve the file directly without directory 308 redirect
  if (routeSegments.length > 0) {
    const parentDir = path.join(DIST_DIR, ...routeSegments.slice(0, -1));
    const htmlFileName = `${routeSegments[routeSegments.length - 1]}.html`;
    fs.writeFileSync(path.join(parentDir, htmlFileName), finalHtml, 'utf8');
  }

  prerenderedRoutes.add(routePath);
}

function getSitemapRoutes() {
  const routes = new Set();
  const subSitemaps = [
    'sitemap-main.xml',
    'sitemap-hsr.xml',
    'sitemap-ww.xml',
    'sitemap-nte.xml',
    'sitemap-aniimo.xml',
    'sitemap-blog.xml'
  ];

  let foundAny = false;
  for (const file of subSitemaps) {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      foundAny = true;
      const xml = fs.readFileSync(filePath, 'utf8');
      for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
        const url = match[1].replace(/&amp;/g, '&');
        if (url.startsWith(BASE_URL)) {
          routes.add(new URL(url).pathname);
        }
      }
    }
  }

  if (!foundAny && fs.existsSync(SITEMAP_FILE)) {
    const xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
    for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
      const url = match[1].replace(/&amp;/g, '&');
      if (url.startsWith(BASE_URL) && !url.endsWith('.xml')) {
        routes.add(new URL(url).pathname);
      }
    }
  }

  return [...routes];
}

function loadAniimoEvolutionConditions() {
  const filePath = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'evolutionConditions.ts');
  if (!fs.existsSync(filePath)) return { conditions: {}, formConditions: {} };
  const text = fs.readFileSync(filePath, 'utf8');
  const conditions = {};
  const formConditions = {};
  const condMatches = text.matchAll(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g);
  for (const match of condMatches) {
    const key = match[1];
    const val = match[2];
    if (key.includes(':')) {
      formConditions[key] = val;
    } else {
      conditions[key] = val;
    }
  }
  return { conditions, formConditions };
}

function generateRichAniimoCharacterHtml(item, evolutionData) {
  const STAT_LABEL_MAP = {
    total: '종합 능력치',
    hp: 'HP',
    break: '무력화',
    attack: '공격력',
    magicDefense: '마법 방어',
    physicalDefense: '물리 방어',
    energyRecovery: '에너지 회복'
  };

  const statsList = Object.entries(item.stats || {}).map(([key, value]) => {
    return `<dt>${escapeHtml(STAT_LABEL_MAP[key] || key)}</dt><dd>${escapeHtml(value)}</dd>`;
  }).join('');

  // Evolution Condition info
  const evoCond = (evolutionData && evolutionData.conditions) ? (evolutionData.conditions[item.number] || '') : '';
  let evoCondHtml = '';
  if (evoCond) {
    const parts = evoCond.split('|').map(p => p.trim()).filter(Boolean);
    const criteria = [];
    const unlocks = [];
    const costs = [];
    parts.forEach(part => {
      if (part.startsWith('소모:') || part.includes('소모:')) {
        costs.push(part.replace(/^소모:\s*/, '').trim());
      } else if (
        part.includes('레벨 달성') ||
        part.includes('포인트 이상') ||
        part.includes('성격에') ||
        part.includes('습득') ||
        part.includes('보유') ||
        part.includes('평가')
      ) {
        criteria.push(part);
      } else {
        unlocks.push(part);
      }
    });

    evoCondHtml = `
      <section>
        <h3>진화 조건 및 해제</h3>
        ${criteria.length ? `<p><strong>진화 기준:</strong> ${escapeHtml(criteria.join(', '))}</p>` : ''}
        ${unlocks.length ? `<p><strong>진화 해제:</strong> ${escapeHtml(unlocks.join(', '))}</p>` : ''}
        ${costs.length ? `<p><strong>소모 재료:</strong> ${escapeHtml(costs.join(', '))}</p>` : ''}
      </section>
    `;
  }

  // Evolution tree links
  let evoTreeHtml = '';
  if (item.evolution && item.evolution.length > 0) {
    const treeLinks = item.evolution.map(node => {
      const isCurrent = node.name === item.name;
      const nodeLabel = `[${node.stage}] NO.${node.number} ${node.name || '미공개'}`;
      if (!node.name) {
        return `<li>${escapeHtml(nodeLabel)}</li>`;
      }
      return isCurrent
        ? `<li><strong>${escapeHtml(nodeLabel)} (현재)</strong></li>`
        : `<li><a href="/gallery/aniimo/character/${encodeURIComponent(node.name)}">${escapeHtml(nodeLabel)}</a></li>`;
    }).join('');
    evoTreeHtml = `<h2>진화 계보</h2><ul>${treeLinks}</ul>${evoCondHtml}`;
  }

  // Forms data
  let formsHtml = '';
  if (item.forms && item.forms.length > 0) {
    const formItems = item.forms.map(form => {
      const formStats = Object.entries(form.stats || {}).map(([k, v]) => `${STAT_LABEL_MAP[k] || k}: ${v}`).join(' · ');
      const formLocs = (form.locations || []).join(', ') || '정보 없음';
      return `<div>
        <h3>${escapeHtml(form.label || form.key)}</h3>
        <p>원소: ${escapeHtml((form.elements || []).join('/'))} | 역할: ${escapeHtml((form.positions || []).join('/'))}</p>
        <p>능력치: ${escapeHtml(formStats)}</p>
        <p>출현 위치: ${escapeHtml(formLocs)}</p>
      </div>`;
    }).join('');
    formsHtml = `<h2>형태별 정보</h2>${formItems}`;
  }

  // Skills
  const skills = [...(item.combatSkills || []), ...(item.uniqueSkills || [])];
  const skillHtml = skills.map(skill => `
    <section>
      <h3>${escapeHtml(skill.name)}</h3>
      <p>${escapeHtml(skill.description)}</p>
      <p>${escapeHtml(skill.skillType)} · 에너지 ${escapeHtml(skill.energyCost)} · 위력 ${escapeHtml(skill.power)}</p>
    </section>
  `).join('');

  // Locations
  const locationHtml = item.locations?.length
    ? `<h2>출현 지역</h2><ul>${item.locations.map(loc => `<li><a href="/gallery/aniimo/location/${encodeURIComponent(loc.trim().replace(/\s+/g, '-'))}">${escapeHtml(loc)}</a></li>`).join('')}</ul>`
    : '';

  // Traits
  const traitsHtml = item.traits?.length
    ? `<h2>애니모 특성</h2>${item.traits.map(trait => `<h3>${escapeHtml(trait.name)}</h3><p>${escapeHtml(trait.description)}</p>`).join('')}`
    : '';

  return `<article>
    <h1>${escapeHtml(item.name)}</h1>
    <p>NO.${escapeHtml(item.number)} · 원소: ${escapeHtml(item.elements.join('/'))} · 포지션: ${escapeHtml(item.positions.join('/'))}</p>
    <h2>소개</h2>
    <p>${escapeHtml(item.description)}</p>
    <h2>기본 능력치</h2>
    <dl>${statsList}</dl>
    ${evoTreeHtml}
    ${formsHtml}
    ${locationHtml}
    ${traitsHtml}
    <h2>스킬 소개</h2>
    ${skillHtml}
    <p><a href="/gallery/aniimo">애니모 허브</a> &gt; <a href="/gallery/aniimo/characters">애니모 도감</a></p>
  </article>`;
}

function getFallbackMeta(routePath) {
  const parts = routePath.split('/').filter(Boolean).map(part => decodeURIComponent(part));
  const entityName = parts.at(-1) || 'Rira Archive';
  const game = parts[1];
  const type = parts[2];
  const gameLabel = game === 'hsr' ? '붕괴: 스타레일' : game === 'ww' ? '명조' : game === 'nte' ? '이환(NTE)' : game === 'aniimo' ? '애니모(Aniimo)' : 'Rira Archive';
  const typeLabels = {
    lightcone: '광추', relic: '유물', ornament: '차원 장신구', echo: '에코',
    weapon: '무기', character: '캐릭터', guide: '공략', guides: '공략 모음',
    tierlist: '티어표', parties: '추천 파티', terminology: '용어집',
    locations: '서식지 도감', 'party-builder': '파티 추천', notices: '공지사항'
  };
  const typeLabel = typeLabels[type] || typeLabels[entityName] || '게임 정보';
  const title = parts.length >= 4
    ? `${entityName} 상세 정보 | ${gameLabel} ${typeLabel} DB`
    : `${gameLabel} ${typeLabel} | Rira Archive 공략 DB`;
  const description = parts.length >= 4
    ? `${gameLabel} ${entityName}의 최신 상세 능력치, 핵심 효과, 획득 정보와 추천 활용법을 Rira Archive 데이터베이스에서 확인하세요.`
    : `${gameLabel} ${typeLabel}의 최신 데이터와 실전 공략, 추천 세팅 및 관련 상세 페이지를 Rira Archive에서 한눈에 확인하세요.`;
  const content = `<article><h1>${escapeHtml(entityName)}</h1><p>${escapeHtml(description)}</p></article>`;
  return { title, description, content };
}

// ---------------------------------------------------------------------
// SEO HTML Generators & Localization
// ---------------------------------------------------------------------
const WW_KO_FILE = path.join(ROOT_DIR, 'common-hub', 'locales', 'ww', 'ww_characters_ko.json');
const WW_WEAPON_KO_FILE = path.join(ROOT_DIR, 'common-hub', 'locales', 'ww', 'ww_weapons_ko.json');
const HSR_KO_FILE = path.join(ROOT_DIR, 'common-hub', 'locales', 'hsr', 'hsr_characters_ko.json');

const wwKoData = fs.existsSync(WW_KO_FILE) ? JSON.parse(fs.readFileSync(WW_KO_FILE, 'utf8')) : {};
const wwWeaponKoData = fs.existsSync(WW_WEAPON_KO_FILE) ? JSON.parse(fs.readFileSync(WW_WEAPON_KO_FILE, 'utf8')) : {};
const hsrKoData = fs.existsSync(HSR_KO_FILE) ? JSON.parse(fs.readFileSync(HSR_KO_FILE, 'utf8')) : {};

function getRouteDisplayLabel(route) {
  const decoded = decodeURI(route);
  const segments = decoded.split('/').filter(Boolean);

  // HSR character: /gallery/hsr/character/:id
  if (segments[1] === 'hsr' && segments[2] === 'character') {
    const id = segments[3];
    const isGuide = segments[4] === 'guide';
    const char = parseHsrCharacter(id);
    let name = hsrKoData[`character.${id}.name`] || char?.name || id;
    if (name.startsWith('character.')) name = char?.folderName || id;

    if (isGuide) {
      return `${name} 종결 육성 공략 (광추·유물 세팅 & 파티 조합)`;
    }
    const rarity = char?.rarity ? `${char.rarity}성` : '5성';
    const attribute = char?.attribute ? ` · ${char.attribute}` : '';
    const path = char?.path ? ` · ${char.path}` : '';
    return `${name} (${rarity}${attribute}${path})`;
  }

  // HSR equipment
  if (segments[1] === 'hsr' && segments[2] === 'lightcone') {
    return `광추 · ${decodeURIComponent(segments[3])}`;
  }
  if (segments[1] === 'hsr' && segments[2] === 'relic') {
    return `유물 · ${decodeURIComponent(segments[3])} (2/4세트 효과)`;
  }
  if (segments[1] === 'hsr' && segments[2] === 'ornament') {
    return `차원 장신구 · ${decodeURIComponent(segments[3])} (2세트 효과)`;
  }

  // WW character: /gallery/ww/character/:id
  if (segments[1] === 'ww' && segments[2] === 'character') {
    const id = segments[3];
    const isGuide = segments[4] === 'guide';
    const char = parseWwCharacter(id);
    let name = wwKoData[`character.${id}.name`] || char?.name || id;
    if (name.startsWith('character.')) name = char?.folderName || id;

    if (isGuide) {
      return `${name} 종결 세팅 공략 (무기·에코 랭킹 & 파티 시너지)`;
    }
    const attribute = char?.attribute ? `${char.attribute}` : '';
    const weapon = char?.weaponType ? ` · ${char.weaponType}` : '';
    const desc = attribute || weapon ? ` (${attribute}${weapon})` : '';
    return `${name}${desc}`;
  }

  // WW equipment
  if (segments[1] === 'ww' && segments[2] === 'weapon') {
    return `무기 · ${decodeURIComponent(segments[3])}`;
  }
  if (segments[1] === 'ww' && segments[2] === 'echo') {
    return `에코 · ${decodeURIComponent(segments[3])}`;
  }

  // NTE character: /gallery/nte/character/:name
  if (segments[1] === 'nte' && segments[2] === 'character') {
    return `${decodeURIComponent(segments[3])} (이환 캐릭터 정보 & 추천 아크)`;
  }
  if (segments[1] === 'nte' && segments[2] === 'weapon') {
    return `아크 · ${decodeURIComponent(segments[3])}`;
  }

  // Aniimo: /gallery/aniimo/character/:name
  if (segments[1] === 'aniimo' && segments[2] === 'character') {
    return `애니모 · ${decodeURIComponent(segments[3])}`;
  }
  if (segments[1] === 'aniimo' && segments[2] === 'location') {
    return `서식지 · ${decodeURIComponent(segments[3]).replace(/-/g, ' ')}`;
  }

  return decodeURIComponent(segments.at(-1) || route);
}

function generateInternalLinkList(title, routes) {
  if (routes.length === 0) return '';
  const links = routes.map(route => {
    const label = getRouteDisplayLabel(route);
    return `<li><a href="${escapeHtml(route)}">${escapeHtml(label)}</a></li>`;
  }).join('\n');
  return `<nav aria-label="${escapeHtml(title)}"><h2>${escapeHtml(title)}</h2><ul>${links}</ul></nav>`;
}

function generateWwCharacterHtml(id, wwGuidesMap, wwPartiesList) {
  const char = parseWwCharacter(id);
  let name = wwKoData[`character.${id}.name`] || (char ? char.name : null) || id;
  if (name && name.startsWith('character.')) {
    name = char?.folderName || id;
  }
  let briefInfo = wwKoData[`character.${id}.briefInfo`] || char?.briefInfo || '';
  if (briefInfo && briefInfo.startsWith('character.')) {
    briefInfo = '';
  }
  const guide = wwGuidesMap.get(id) || wwGuidesMap.get(name);
  const matchedParties = getWwPartiesForCharacter(id, name, wwPartiesList);

  let bestGear = extractNameArray(guide?.echoSets);
  let subGear = extractNameArray(guide?.mainEchoes);
  if (bestGear.length === 0 && guide?.variants?.[0]) {
    bestGear = extractNameArray(guide.variants[0].echoSets);
    subGear = extractNameArray(guide.variants[0].mainEchoes);
  }

  const bestWeapons = (guide?.weapons || [])
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .map(w => ({
      name: w.name,
      rank: w.rank,
      note: w.note
    }));

  const targetStats = formatTargetStats(guide?.targetStats);
  const mainStatsStr = formatWwMainStats(guide?.mainStats || (guide?.variants?.[0]?.mainStats));
  const subStats = guide?.subStats || [];
  const synergyChars = guide?.synergyCharacters || [];

  const normData = {
    name,
    gameName: '명조: 워더링 웨이브',
    rarityStr: char?.rarity ? `${char.rarity}성 ` : '5성 ',
    attributeStr: char?.attribute ? `${char.attribute} 속성 ` : '',
    typeStr: char?.weaponType ? `${char.weaponType} 무기 ` : '',
    briefInfo,
    bestGear,
    subGear,
    bestWeapons: bestWeapons.map(w => w.name),
    targetStats,
    mainStatsStr,
    subStats,
    parties: matchedParties,
    synergyChars
  };

  const narrativeSummaryHtml = generateNarrativeSummaryHtml(normData);

  let html = `<article>\n`;
  html += `<h1>명조 ${escapeHtml(name)} 상세 정보 &amp; 종결 육성 가이드</h1>\n`;
  html += `<p><strong>분류:</strong> ${escapeHtml(normData.rarityStr)}${escapeHtml(normData.attributeStr)}${escapeHtml(normData.typeStr)} | <strong>게임:</strong> 명조: 워더링 웨이브</p>\n`;
  if (briefInfo) {
    html += `<p>${escapeHtml(briefInfo).replace(/\n/g, '<br/>')}</p>\n`;
  }
  html += narrativeSummaryHtml;

  // 1. Base Stats
  if (char?.baseStats) {
    const lv90 = char.baseStats.lv90 || {};
    html += `<h2>기본 능력치 (Lv.90 기준)</h2>\n<ul>\n`;
    if (lv90['기초 HP']) html += `<li><strong>기초 HP:</strong> ${escapeHtml(lv90['기초 HP'])}</li>\n`;
    if (lv90['기초 공격력']) html += `<li><strong>기초 공격력:</strong> ${escapeHtml(lv90['기초 공격력'])}</li>\n`;
    if (lv90['기초 방어력']) html += `<li><strong>기초 방어력:</strong> ${escapeHtml(lv90['기초 방어력'])}</li>\n`;
    html += `</ul>\n`;
  }

  // 2. Recommended Weapons & Echoes with clickable links
  if (bestWeapons.length > 0) {
    html += `<h2>추천 무기 순위</h2>\n<ol>\n`;
    bestWeapons.forEach(w => {
      const noteStr = w.note ? ` (${escapeHtml(w.note)})` : '';
      const weaponRoute = `/gallery/ww/weapon/${encodeURIComponent(w.name)}`;
      const link = globalSitemapRouteSet.has(weaponRoute)
        ? `<a href="${weaponRoute}">${escapeHtml(w.name)}</a>`
        : escapeHtml(w.name);
      html += `<li><strong>[${w.rank || ''}순위]</strong> ${link}${noteStr}</li>\n`;
    });
    html += `</ol>\n`;
  }

  if (bestGear.length > 0) {
    html += `<h2>추천 에코 세트</h2>\n<ul>\n`;
    bestGear.forEach(e => {
      const echoRoute = `/gallery/ww/echo/${encodeURIComponent(e)}`;
      const link = globalSitemapRouteSet.has(echoRoute)
        ? `<a href="${echoRoute}">${escapeHtml(e)}</a>`
        : escapeHtml(e);
      html += `<li>${link}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 3. Recommended Parties
  if (matchedParties.length > 0) {
    html += `<h2>추천 파티 조합</h2>\n`;
    matchedParties.forEach(p => {
      const memberLinks = (p.members || []).map(m => {
        const memberId = globalWwNameToIdMap.get(m.trim()) || globalWwNameToIdMap.get(m);
        const memberRoute = memberId ? `/gallery/ww/character/${encodeURIComponent(memberId)}` : null;
        if (memberRoute && globalSitemapRouteSet.has(memberRoute)) {
          return `<a href="${memberRoute}">${escapeHtml(m)}</a>`;
        }
        return escapeHtml(m);
      }).join(', ');
      html += `<section><h3>${escapeHtml(p.name)}</h3><p>${memberLinks}</p>${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}</section>\n`;
    });
  }

  // 4. Guide Link
  const guideRoute = `/gallery/ww/character/${encodeURIComponent(id)}/guide`;
  if (guide && globalSitemapRouteSet.has(guideRoute)) {
    html += `<p><a href="${guideRoute}"><strong>${escapeHtml(name)} 종결 세팅 및 무기·에코 공략 가이드 전문 보기</strong></a></p>\n`;
  }

  // 5. Skills
  const skills = char?.skills || [];
  if (skills.length > 0) {
    html += `<h2>스킬 및 공명 회로 정보</h2>\n`;
    skills.forEach(s => {
      let sName = wwKoData[s.name] || s.name;
      let sDesc = wwKoData[s.description] || s.description;
      const tagStr = s.tag ? ` (${escapeHtml(s.tag)})` : '';
      html += `<h3>${escapeHtml(sName)}${tagStr}</h3>\n<p>${escapeHtml(sDesc || '').replace(/\n/g, '<br/>')}</p>\n`;
    });
  }

  // 6. Resonance Chain (Eidolons)
  const eidolons = char?.eidolons || [];
  if (eidolons.length > 0) {
    html += `<h2>공명 체인 돌파 효과</h2>\n`;
    eidolons.forEach(e => {
      let eName = wwKoData[e.name] || e.name;
      let eDesc = wwKoData[e.description] || e.description;
      html += `<h3>${escapeHtml(e.rank || '')}: ${escapeHtml(eName || '')}</h3>\n<p>${escapeHtml(eDesc || '').replace(/\n/g, '<br/>')}</p>\n`;
    });
  }

  // 7. Materials
  if (char?.materials_v2) {
    html += `<h2>돌파 및 스킬 육성 재료</h2>\n`;
    if (char.materials_v2.ascension?.length > 0) {
      html += `<h3>공명자 돌파 재료</h3>\n<ul>\n`;
      char.materials_v2.ascension.forEach(m => {
        html += `<li>${escapeHtml(m.name)} x${escapeHtml(m.count)}</li>\n`;
      });
      html += `</ul>\n`;
    }
  }

  html += `<p><a href="/gallery/ww">명조 공명자 목록으로 돌아가기</a></p>\n`;
  html += `</article>`;
  return html;
}

function generateHsrCharacterHtml(id, hsrGuidesMap, hsrPartiesList) {
  const char = parseHsrCharacter(id);
  let name = hsrKoData[`character.${id}.name`] || (char ? char.name : null) || id;
  if (name && name.startsWith('character.')) {
    name = char?.folderName || id;
  }
  let briefInfo = char?.briefInfo || hsrKoData[`character.${id}.briefInfo`] || '';
  if (briefInfo && briefInfo.startsWith('character.')) {
    briefInfo = '';
  }
  const guide = hsrGuidesMap.get(name) || (char?.folderName ? hsrGuidesMap.get(char.folderName) : null) || hsrGuidesMap.get(id);
  const matchedParties = getHsrPartiesForCharacter(name, id, hsrPartiesList);

  const bestLcsRaw = [
    ...(Array.isArray(guide?.bestLightCones) ? guide.bestLightCones : []),
    ...(Array.isArray(guide?.variants?.[0]?.bestLightCones) ? guide.variants[0].bestLightCones : [])
  ];
  const bestLightCones = bestLcsRaw.map((lc, idx) => ({
    name: typeof lc === 'string' ? lc.trim() : lc?.name?.trim(),
    note: typeof lc === 'object' ? lc?.note : '',
    rank: idx + 1
  })).filter(l => l.name);

  const bestRelicsRaw = [
    ...(Array.isArray(guide?.bestRelics) ? guide.bestRelics : []),
    ...(Array.isArray(guide?.variants?.[0]?.bestRelics) ? guide.variants[0].bestRelics : [])
  ];
  const bestRelics = bestRelicsRaw.map(r => ({
    name: typeof r === 'string' ? r.trim() : r?.name?.trim(),
    note: typeof r === 'object' ? r?.note : ''
  })).filter(r => r.name);

  const bestOrnamentsRaw = [
    ...(Array.isArray(guide?.bestOrnaments) ? guide.bestOrnaments : []),
    ...(Array.isArray(guide?.variants?.[0]?.bestOrnaments) ? guide.variants[0].bestOrnaments : [])
  ];
  const bestOrnaments = bestOrnamentsRaw.map(o => ({
    name: typeof o === 'string' ? o.trim() : o?.name?.trim(),
    note: typeof o === 'object' ? o?.note : ''
  })).filter(o => o.name);

  const targetStats = formatTargetStats(guide?.targetStats || (guide?.variants?.[0]?.targetStats));
  const mainStatsStr = formatHsrMainStats(guide?.mainStats || (guide?.variants?.[0]?.mainStats));
  const subStats = guide?.subStats || guide?.variants?.[0]?.subStats || [];

  const normData = {
    name,
    gameName: '붕괴: 스타레일',
    rarityStr: char?.rarity ? `${char.rarity}성 ` : '5성 ',
    attributeStr: char?.attribute ? `${char.attribute} 속성 ` : '',
    typeStr: char?.path ? `${char.path} 운명의 길 ` : '',
    briefInfo,
    bestGear: bestRelics.map(r => r.name),
    subGear: bestOrnaments.map(o => o.name),
    bestWeapons: bestLightCones.map(l => l.name),
    targetStats,
    mainStatsStr,
    subStats,
    parties: matchedParties,
    synergyChars: []
  };

  const narrativeSummaryHtml = generateNarrativeSummaryHtml(normData);

  let html = `<article>\n`;
  html += `<h1>${escapeHtml(name)} 상세 정보 &amp; 종결 육성 가이드</h1>\n`;
  html += `<p><strong>분류:</strong> ${escapeHtml(normData.rarityStr)}${escapeHtml(normData.attributeStr)}${escapeHtml(normData.typeStr)} | <strong>게임:</strong> 붕괴: 스타레일</p>\n`;
  if (briefInfo) {
    html += `<p>${escapeHtml(briefInfo).replace(/\n/g, '<br/>')}</p>\n`;
  }
  html += narrativeSummaryHtml;

  // 1. Base Stats
  if (char?.baseStats) {
    const lv80 = char.baseStats.lv80 || {};
    html += `<h2>기본 능력치 (Lv.80 기준)</h2>\n<ul>\n`;
    if (lv80['기초 HP']) html += `<li><strong>기초 HP:</strong> ${escapeHtml(lv80['기초 HP'])}</li>\n`;
    if (lv80['기초 공격력']) html += `<li><strong>기초 공격력:</strong> ${escapeHtml(lv80['기초 공격력'])}</li>\n`;
    if (lv80['기초 방어력']) html += `<li><strong>기초 방어력:</strong> ${escapeHtml(lv80['기초 방어력'])}</li>\n`;
    if (char.baseStats.speed) html += `<li><strong>기본 속도:</strong> ${escapeHtml(char.baseStats.speed)}</li>\n`;
    if (char.baseStats.energy) html += `<li><strong>에너지 최대치:</strong> ${escapeHtml(char.baseStats.energy)}</li>\n`;
    html += `</ul>\n`;
  }

  // 2. Recommended Equipment (Light Cones, Relics, Ornaments) with clickable links
  if (bestLightCones.length > 0) {
    html += `<h2>추천 광추 순위</h2>\n<ol>\n`;
    bestLightCones.forEach(lc => {
      const noteStr = lc.note ? ` (${escapeHtml(lc.note)})` : '';
      const lcRoute = `/gallery/hsr/lightcone/${encodeURIComponent(lc.name)}`;
      const link = globalSitemapRouteSet.has(lcRoute)
        ? `<a href="${lcRoute}">${escapeHtml(lc.name)}</a>`
        : escapeHtml(lc.name);
      html += `<li><strong>[${lc.rank}순위]</strong> ${link}${noteStr}</li>\n`;
    });
    html += `</ol>\n`;
  }

  if (bestRelics.length > 0 || bestOrnaments.length > 0) {
    html += `<h2>추천 유물 및 차원 장신구 세팅</h2>\n`;
    if (bestRelics.length > 0) {
      html += `<h3>추천 터널 유물</h3>\n<ul>\n`;
      bestRelics.forEach(r => {
        const noteStr = r.note ? ` (${escapeHtml(r.note)})` : '';
        const relicRoute = `/gallery/hsr/relic/${encodeURIComponent(r.name)}`;
        const link = globalSitemapRouteSet.has(relicRoute)
          ? `<a href="${relicRoute}">${escapeHtml(r.name)}</a>`
          : escapeHtml(r.name);
        html += `<li>${link}${noteStr}</li>\n`;
      });
      html += `</ul>\n`;
    }
    if (bestOrnaments.length > 0) {
      html += `<h3>추천 차원 장신구</h3>\n<ul>\n`;
      bestOrnaments.forEach(o => {
        const noteStr = o.note ? ` (${escapeHtml(o.note)})` : '';
        const ornamentRoute = `/gallery/hsr/ornament/${encodeURIComponent(o.name)}`;
        const link = globalSitemapRouteSet.has(ornamentRoute)
          ? `<a href="${ornamentRoute}">${escapeHtml(o.name)}</a>`
          : escapeHtml(o.name);
        html += `<li>${link}${noteStr}</li>\n`;
      });
      html += `</ul>\n`;
    }
  }

  // 3. Recommended Parties
  if (matchedParties.length > 0) {
    html += `<h2>추천 파티 조합</h2>\n`;
    matchedParties.forEach(p => {
      const memberLinks = (p.members || []).map(m => {
        const memberId = globalHsrNameToIdMap.get(m.trim()) || globalHsrNameToIdMap.get(m);
        const memberRoute = memberId ? `/gallery/hsr/character/${encodeURIComponent(memberId)}` : null;
        if (memberRoute && globalSitemapRouteSet.has(memberRoute)) {
          return `<a href="${memberRoute}">${escapeHtml(m)}</a>`;
        }
        return escapeHtml(m);
      }).join(', ');
      html += `<section><h3>${escapeHtml(p.name)}</h3><p>${memberLinks}</p>${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}</section>\n`;
    });
  }

  // 4. Dedicated Guide Link
  const guideRoute = `/gallery/hsr/character/${encodeURIComponent(id)}/guide`;
  if (guide && globalSitemapRouteSet.has(guideRoute)) {
    html += `<p><a href="${guideRoute}"><strong>${escapeHtml(name)} 종결 세팅 및 육성 공략 가이드 전문 보기</strong></a></p>\n`;
  }

  // 5. Skills
  const skills = char?.skills || [];
  if (skills.length > 0) {
    html += `<h2>스킬 및 행적 정보</h2>\n`;
    skills.forEach(s => {
      const tagStr = s.tag ? ` (${escapeHtml(s.tag)})` : '';
      html += `<h3>${escapeHtml(s.name)}${tagStr}</h3>\n<p>${escapeHtml(s.description || '').replace(/\n/g, '<br/>')}</p>\n`;
    });
  }

  // 6. Eidolons
  const eidolons = char?.eidolons || [];
  if (eidolons.length > 0) {
    html += `<h2>성혼 돌파 효과</h2>\n`;
    eidolons.forEach(e => {
      html += `<h3>${escapeHtml(e.rank || '')}: ${escapeHtml(e.name || '')}</h3>\n<p>${escapeHtml(e.description || '').replace(/\n/g, '<br/>')}</p>\n`;
    });
  }

  // 7. Materials
  if (char?.materials_v2) {
    html += `<h2>승급 및 행적 육성 재료</h2>\n`;
    if (char.materials_v2.ascension?.length > 0) {
      html += `<h3>승급 필요 재료</h3>\n<ul>\n`;
      char.materials_v2.ascension.forEach(m => {
        html += `<li>${escapeHtml(m.name)} x${escapeHtml(m.count)}</li>\n`;
      });
      html += `</ul>\n`;
    }
    if (char.materials_v2.traces?.length > 0) {
      html += `<h3>행적 레벨업 필요 재료</h3>\n<ul>\n`;
      char.materials_v2.traces.forEach(m => {
        html += `<li>${escapeHtml(m.name)} x${escapeHtml(m.count)}</li>\n`;
      });
      html += `</ul>\n`;
    }
  }

  html += `<p><a href="/gallery/hsr">붕괴: 스타레일 캐릭터 목록으로 돌아가기</a></p>\n`;
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

function generateHsrGuideHtml(id, guide, char, hsrPartiesList) {
  let name = hsrKoData[`character.${id}.name`] || char?.name || guide?.name || id;
  if (name && name.startsWith('character.')) {
    name = char?.folderName || guide?.name || id;
  }
  let html = `<article>\n`;
  html += `<h1>붕괴: 스타레일 ${escapeHtml(name)} 종결 육성 공략 가이드</h1>\n`;
  html += `<p>${escapeHtml(name)}의 광추·유물·차원 장신구 조합과 목표 능력치, 스킬 및 성혼 투자 순서를 한 페이지에서 비교할 수 있도록 정리했습니다.</p>\n`;
  if (guide?.patchVersion || guide?.lastUpdated) {
    html += `<p>`;
    if (guide.patchVersion) html += `<strong>적용 버전:</strong> ${escapeHtml(guide.patchVersion)} `;
    if (guide.lastUpdated) html += `<strong>최종 갱신:</strong> ${escapeHtml(guide.lastUpdated)}`;
    html += `</p>\n`;
  }

  // 추천 광추
  const lightCones = guide?.bestLightCones || guide?.variants?.[0]?.bestLightCones;
  if (lightCones && Array.isArray(lightCones) && lightCones.length > 0) {
    html += `<h2>${escapeHtml(name)} 추천 광추 랭킹</h2>\n<ol>\n`;
    lightCones.forEach((lc, idx) => {
      const lcName = typeof lc === 'string' ? lc : lc?.name;
      const lcNote = typeof lc === 'object' ? lc?.note : '';
      const lcRoute = `/gallery/hsr/lightcone/${encodeURIComponent(lcName)}`;
      const lcLabel = globalSitemapRouteSet.has(lcRoute)
        ? `<a href="${lcRoute}">${escapeHtml(lcName)}</a>`
        : escapeHtml(lcName);
      html += `<li><strong>${idx + 1}순위:</strong> ${lcLabel}${lcNote ? ` — ${escapeHtml(lcNote)}` : ''}</li>\n`;
    });
    html += `</ol>\n`;
  }

  // 추천 유물
  const relics = guide?.bestRelics || guide?.variants?.[0]?.bestRelics;
  if (relics && Array.isArray(relics) && relics.length > 0) {
    html += `<h2>추천 터널 유물 세트</h2>\n<ul>\n`;
    relics.forEach(r => {
      const rName = typeof r === 'string' ? r : r?.name;
      const rNote = typeof r === 'object' ? r?.note : '';
      const relicRoute = `/gallery/hsr/relic/${encodeURIComponent(rName)}`;
      const relicLabel = globalSitemapRouteSet.has(relicRoute)
        ? `<a href="${relicRoute}">${escapeHtml(rName)}</a>`
        : escapeHtml(rName);
      html += `<li>${relicLabel}${rNote ? ` — ${escapeHtml(rNote)}` : ''}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 차원 장신구
  const ornaments = guide?.bestOrnaments || guide?.variants?.[0]?.bestOrnaments;
  if (ornaments && Array.isArray(ornaments) && ornaments.length > 0) {
    html += `<h2>추천 차원 장신구 세트</h2>\n<ul>\n`;
    ornaments.forEach(o => {
      const oName = typeof o === 'string' ? o : o?.name;
      const oNote = typeof o === 'object' ? o?.note : '';
      const ornamentRoute = `/gallery/hsr/ornament/${encodeURIComponent(oName)}`;
      const ornamentLabel = globalSitemapRouteSet.has(ornamentRoute)
        ? `<a href="${ornamentRoute}">${escapeHtml(oName)}</a>`
        : escapeHtml(oName);
      html += `<li>${ornamentLabel}${oNote ? ` — ${escapeHtml(oNote)}` : ''}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // 목표 스탯
  const targetStats = guide?.targetStats || guide?.variants?.[0]?.targetStats;
  if (targetStats && Array.isArray(targetStats) && targetStats.length > 0) {
    html += `<h2>목표 육성 수치 (종결 스탯)</h2>\n<ul>\n`;
    targetStats.forEach(ts => {
      if (ts && ts.label) {
        html += `<li><strong>${escapeHtml(ts.label)}:</strong> ${escapeHtml(ts.value || '')}${ts.note ? ` — ${escapeHtml(ts.note)}` : ''}</li>\n`;
      }
    });
    html += `</ul>\n`;
  }

  // 유물 부위별 주옵션
  const mainStats = guide?.mainStats || guide?.variants?.[0]?.mainStats;
  if (mainStats && typeof mainStats === 'object') {
    html += `<h2>유물 부위별 주옵션</h2>\n<ul>\n`;
    if (mainStats.body) html += `<li><strong>바디:</strong> ${escapeHtml(Array.isArray(mainStats.body) ? mainStats.body.join(' / ') : mainStats.body)}</li>\n`;
    const boots = mainStats.feet || mainStats.boots;
    if (boots) html += `<li><strong>신발:</strong> ${escapeHtml(Array.isArray(boots) ? boots.join(' / ') : boots)}</li>\n`;
    if (mainStats.sphere) html += `<li><strong>차원구:</strong> ${escapeHtml(Array.isArray(mainStats.sphere) ? mainStats.sphere.join(' / ') : mainStats.sphere)}</li>\n`;
    if (mainStats.rope) html += `<li><strong>연결줄:</strong> ${escapeHtml(Array.isArray(mainStats.rope) ? mainStats.rope.join(' / ') : mainStats.rope)}</li>\n`;
    html += `</ul>\n`;
  }

  // 부옵션
  const subStats = guide?.subStats || guide?.variants?.[0]?.subStats;
  if (subStats && Array.isArray(subStats) && subStats.length > 0) {
    html += `<h2>유물 추천 부옵션 우선순위</h2>\n<p>${escapeHtml(subStats.join(' > '))}</p>\n`;
  }

  const skillPriority = guide?.skillPriority || guide?.variants?.[0]?.skillPriority;
  if (Array.isArray(skillPriority) && skillPriority.length > 0) {
    html += `<h2>스킬 레벨업 우선순위</h2>\n<p>${escapeHtml(skillPriority.join(' > '))}</p>\n`;
  }

  if (guide?.recommendedEidolon) {
    html += `<h2>추천 성혼 돌파</h2>\n<p><strong>효율 구간:</strong> ${escapeHtml(guide.recommendedEidolon)}</p>\n`;
  }
  if (Array.isArray(guide?.eidolonEfficiency) && guide.eidolonEfficiency.length > 0) {
    html += `<table><thead><tr><th>성혼</th><th>영향도</th><th>효율</th><th>핵심 효과</th></tr></thead><tbody>\n`;
    guide.eidolonEfficiency.forEach(e => {
      const efficiency = e.efficiency3 || e.efficiency1 || '';
      html += `<tr><th>E${escapeHtml(e.level)}</th><td>${escapeHtml(e.impact || '')}</td><td>${escapeHtml(efficiency)}</td><td>${escapeHtml(e.description || '')}</td></tr>\n`;
    });
    html += `</tbody></table>\n`;
  }

  const matchedParties = getHsrPartiesForCharacter(name, id, hsrPartiesList || []);
  if (matchedParties.length > 0) {
    html += `<h2>추천 파티 조합</h2>\n`;
    matchedParties.forEach(party => {
      const members = (party.members || []).map(member => {
        const memberId = globalHsrNameToIdMap.get(member.trim()) || globalHsrNameToIdMap.get(member);
        const route = memberId ? `/gallery/hsr/character/${encodeURIComponent(memberId)}` : '';
        return route && globalSitemapRouteSet.has(route)
          ? `<a href="${route}">${escapeHtml(member)}</a>`
          : escapeHtml(member);
      }).join(', ');
      html += `<section><h3>${escapeHtml(party.name)}</h3><p>${members}</p>${party.description ? `<p>${escapeHtml(party.description)}</p>` : ''}</section>\n`;
    });
  }

  html += `<p><a href="/gallery/hsr/character/${encodeURIComponent(id)}">${escapeHtml(name)} 캐릭터 상세 정보 보기</a></p>\n`;
  html += `<p><a href="/gallery/hsr?menu=${encodeURIComponent('공략')}">붕괴: 스타레일 전체 육성 공략 보기</a></p>\n`;

  html += `</article>`;
  return html;
}

function generateRichWwWeaponHtml(weaponName, wpId, wpNotion, recommendedChars = []) {
  let html = `<article>\n`;
  html += `<h1>명조 ${escapeHtml(weaponName)} 상세 정보 및 추천 캐릭터</h1>\n`;

  const rarity = wpNotion?.rarity || (wpId?.includes('wp-5') ? 5 : wpId?.includes('wp-4') ? 4 : wpId?.includes('wp-3') ? 3 : '');
  const type = wpNotion?.type || (wpId?.includes('-bb-') ? '대검' : wpId?.includes('-sw-') ? '직검' : wpId?.includes('-ps-') ? '권총' : wpId?.includes('-ga-') ? '권갑' : wpId?.includes('-rc-') ? '증폭기' : '무기');
  html += `<p><strong>분류:</strong> ${rarity ? rarity + '성 ' : ''}${escapeHtml(type)} | <strong>게임:</strong> 명조: 워더링 웨이브</p>\n`;

  // Skill Name & Description
  const skillName = wpNotion?.skillName || (wpId ? wwWeaponKoData[`weapon.${wpId}.skillName`] : '') || '';
  const skillDesc = wpNotion?.skillDescription || (wpId ? wwWeaponKoData[`weapon.${wpId}.skillDescription`] : '') || '';
  if (skillName || skillDesc) {
    html += `<h2>무기 스킬: ${escapeHtml(skillName)}</h2>\n`;
    if (skillDesc) html += `<p>${escapeHtml(skillDesc).replace(/\n/g, '<br/>')}</p>\n`;
  }

  // Recommended Resonators
  if (recommendedChars.length > 0) {
    html += `<h2>${escapeHtml(weaponName)} 추천 착용 공명자</h2>\n<ul>\n`;
    recommendedChars.forEach(rc => {
      const rankStr = rc.rank ? `<strong>[${rc.rank}순위]</strong> ` : '';
      const noteStr = rc.note ? `: ${escapeHtml(rc.note)}` : '';
      const guideRoute = `/gallery/ww/character/${encodeURIComponent(rc.charId)}/guide`;
      const charRoute = `/gallery/ww/character/${encodeURIComponent(rc.charId)}`;
      let linkHtml = escapeHtml(rc.charName);
      if (globalSitemapRouteSet.has(guideRoute)) {
        linkHtml = `<a href="${guideRoute}">${escapeHtml(rc.charName)} 종결 공략</a>`;
      } else if (globalSitemapRouteSet.has(charRoute)) {
        linkHtml = `<a href="${charRoute}">${escapeHtml(rc.charName)} 캐릭터 정보</a>`;
      }
      html += `<li>${rankStr}${linkHtml}${noteStr}</li>\n`;
    });
    html += `</ul>\n`;
  }

  // Growth Stats
  if (wpNotion?.growthStats) {
    html += `<h2>레벨별 성장 스탯 (1~90Lv)</h2>\n<pre>${escapeHtml(wpNotion.growthStats)}</pre>\n`;
  }

  // Ascension Materials
  if (wpNotion?.ascensionMaterials) {
    html += `<h2>돌파 및 육성 재료</h2>\n<p>${escapeHtml(wpNotion.ascensionMaterials).replace(/\n/g, '<br/>')}</p>\n`;
  }

  // Obtain
  if (wpNotion?.obtain) {
    html += `<h2>획득 방법</h2>\n<p>${escapeHtml(wpNotion.obtain)}</p>\n`;
  }

  // Story
  const story = wpNotion?.weaponStory || (wpId ? wwWeaponKoData[`weapon.${wpId}.description`] : '') || '';
  if (story) {
    html += `<h2>무기 스토리</h2>\n<p>${escapeHtml(story).replace(/\n/g, '<br/>')}</p>\n`;
  }

  html += `<p><a href="/gallery/ww">명조 무기 도감 목록으로 이동</a></p>\n`;
  html += `</article>`;
  return html;
}

function generateHsrLightconeHtml(lc, recommendedChars = []) {
  let html = `<article>\n`;
  html += `<h1>붕괴: 스타레일 ${escapeHtml(lc.name)} 상세 스탯 및 추천 캐릭터</h1>\n`;
  html += `<p><strong>운명의 길:</strong> ${escapeHtml(lc.path || '')} | <strong>희귀도:</strong> ${escapeHtml(lc.rarity || 5)}성 | <strong>출시 버전:</strong> v${escapeHtml(lc.releaseVersion || '1.0')}</p>\n`;

  if (lc.baseStats) {
    html += `<h2>Lv.80 기초 스탯</h2>\n<ul>\n`;
    if (lc.baseStats.hp) html += `<li><strong>기초 HP:</strong> ${escapeHtml(lc.baseStats.hp)}</li>\n`;
    if (lc.baseStats.atk) html += `<li><strong>기초 공격력:</strong> ${escapeHtml(lc.baseStats.atk)}</li>\n`;
    if (lc.baseStats.def) html += `<li><strong>기초 방어력:</strong> ${escapeHtml(lc.baseStats.def)}</li>\n`;
    html += `</ul>\n`;
  }

  if (lc.skill) {
    html += `<h2>광추 스킬: ${escapeHtml(lc.skill.name || '')}</h2>\n`;
    html += `<p>${escapeHtml(lc.skill.description || '').replace(/\n/g, '<br/>')}</p>\n`;
  }

  if (recommendedChars.length > 0) {
    html += `<h2>${escapeHtml(lc.name)} 추천 장착 캐릭터</h2>\n<ul>\n`;
    recommendedChars.forEach(rc => {
      const rankStr = rc.rank ? `<strong>[${rc.rank}순위]</strong> ` : '';
      const noteStr = rc.note ? `: ${escapeHtml(rc.note)}` : '';
      const guideRoute = `/gallery/hsr/character/${encodeURIComponent(rc.charId)}/guide`;
      const charRoute = `/gallery/hsr/character/${encodeURIComponent(rc.charId)}`;
      let linkHtml = escapeHtml(rc.charName);
      if (globalSitemapRouteSet.has(guideRoute)) {
        linkHtml = `<a href="${guideRoute}">${escapeHtml(rc.charName)} 종결 공략</a>`;
      } else if (globalSitemapRouteSet.has(charRoute)) {
        linkHtml = `<a href="${charRoute}">${escapeHtml(rc.charName)} 캐릭터 정보</a>`;
      }
      html += `<li>${rankStr}${linkHtml}${noteStr}</li>\n`;
    });
    html += `</ul>\n`;
  }

  if (lc.ascensionMaterials && Array.isArray(lc.ascensionMaterials) && lc.ascensionMaterials.length > 0) {
    html += `<h2>승급 단계별 필요 재료</h2>\n<ul>\n`;
    lc.ascensionMaterials.forEach(m => {
      const itemsStr = (m.items || []).map(it => `${it.name} x${it.count}`).join(', ');
      html += `<li><strong>Lv.${m.level} 돌파:</strong> ${escapeHtml(itemsStr)}</li>\n`;
    });
    html += `</ul>\n`;
  }

  if (lc.story) {
    html += `<h2>광추 스토리</h2>\n<p>${escapeHtml(lc.story).replace(/\n/g, '<br/>')}</p>\n`;
  }

  html += `<p><a href="/gallery/hsr">붕괴: 스타레일 광추 도감으로 돌아가기</a></p>\n`;
  html += `</article>`;
  return html;
}

function generateHsrRelicHtml(relic, recommendedChars = []) {
  let html = `<article>\n`;
  html += `<h1>붕괴: 스타레일 ${escapeHtml(relic.name)} 유물 세트 효과 및 추천 캐릭터</h1>\n`;
  html += `<p><strong>유형:</strong> 터널 유물 | <strong>게임:</strong> 붕괴: 스타레일</p>\n`;

  if (relic['2piece']) {
    html += `<h2>2세트 효과</h2>\n<p>${escapeHtml(relic['2piece'])}</p>\n`;
  }
  if (relic['4piece']) {
    html += `<h2>4세트 효과</h2>\n<p>${escapeHtml(relic['4piece'])}</p>\n`;
  }
  if (Array.isArray(relic.pieces) && relic.pieces.length > 0) {
    html += `<h2>세트 구성 부위</h2>\n<ul>\n`;
    relic.pieces.forEach(p => {
      html += `<li><strong>${escapeHtml(p.type)}:</strong> ${escapeHtml(p.name)}</li>\n`;
    });
    html += `</ul>\n`;
  }

  if (recommendedChars.length > 0) {
    html += `<h2>${escapeHtml(relic.name)} 추천 착용 캐릭터</h2>\n<ul>\n`;
    recommendedChars.forEach(rc => {
      const noteStr = rc.note ? `: ${escapeHtml(rc.note)}` : '';
      const guideRoute = `/gallery/hsr/character/${encodeURIComponent(rc.charId)}/guide`;
      const charRoute = `/gallery/hsr/character/${encodeURIComponent(rc.charId)}`;
      let linkHtml = escapeHtml(rc.charName);
      if (globalSitemapRouteSet.has(guideRoute)) {
        linkHtml = `<a href="${guideRoute}">${escapeHtml(rc.charName)} 종결 세팅 공략</a>`;
      } else if (globalSitemapRouteSet.has(charRoute)) {
        linkHtml = `<a href="${charRoute}">${escapeHtml(rc.charName)} 캐릭터 정보</a>`;
      }
      html += `<li>${linkHtml}${noteStr}</li>\n`;
    });
    html += `</ul>\n`;
  }

  html += `<p><a href="/gallery/hsr">붕괴: 스타레일 유물 도감으로 돌아가기</a></p>\n`;
  html += `</article>`;
  return html;
}

function generateHsrOrnamentHtml(ornament, recommendedChars = []) {
  let html = `<article>\n`;
  html += `<h1>붕괴: 스타레일 ${escapeHtml(ornament.name)} 차원 장신구 세트 효과 및 추천 캐릭터</h1>\n`;
  html += `<p><strong>유형:</strong> 차원 장신구 | <strong>게임:</strong> 붕괴: 스타레일</p>\n`;

  const setEffect = ornament.setEffect?.['2piece'] || ornament['2piece'];
  if (setEffect) {
    html += `<h2>2세트 효과</h2>\n<p>${escapeHtml(setEffect)}</p>\n`;
  }
  if (Array.isArray(ornament.pieces) && ornament.pieces.length > 0) {
    html += `<h2>장신구 구성 부위</h2>\n<ul>\n`;
    ornament.pieces.forEach(p => {
      html += `<li><strong>${escapeHtml(p.type)}:</strong> ${escapeHtml(p.name)}</li>\n`;
    });
    html += `</ul>\n`;
  }

  if (recommendedChars.length > 0) {
    html += `<h2>${escapeHtml(ornament.name)} 추천 착용 캐릭터</h2>\n<ul>\n`;
    recommendedChars.forEach(rc => {
      const noteStr = rc.note ? `: ${escapeHtml(rc.note)}` : '';
      const guideRoute = `/gallery/hsr/character/${encodeURIComponent(rc.charId)}/guide`;
      const charRoute = `/gallery/hsr/character/${encodeURIComponent(rc.charId)}`;
      let linkHtml = escapeHtml(rc.charName);
      if (globalSitemapRouteSet.has(guideRoute)) {
        linkHtml = `<a href="${guideRoute}">${escapeHtml(rc.charName)} 종결 세팅 공략</a>`;
      } else if (globalSitemapRouteSet.has(charRoute)) {
        linkHtml = `<a href="${charRoute}">${escapeHtml(rc.charName)} 캐릭터 정보</a>`;
      }
      html += `<li>${linkHtml}${noteStr}</li>\n`;
    });
    html += `</ul>\n`;
  }

  html += `<p><a href="/gallery/hsr">붕괴: 스타레일 차원 장신구 도감으로 돌아가기</a></p>\n`;
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

  if (item.cost) {
    html += `<p><strong>코스트:</strong> ${escapeHtml(item.cost)}</p>\n`;
  }
  if (item.sonataSets && Array.isArray(item.sonataSets) && item.sonataSets.length > 0) {
    html += `<p><strong>소나타 이펙트:</strong> ${escapeHtml(item.sonataSets.join(', '))}</p>\n`;
  }

  const textFields = [
    'briefInfo', 'content', 'growthStats', 'skillName', 'skillDescription',
    'ascensionMaterials', 'weaponStory', 'obtain', 'citySkill', 'virailSkill',
    'basicAttack', 'ultimateSkill', 'supportSkill', 'passiveSkill1', 'passiveSkill2',
    'awakenings', 'resonance', 'glossary', 'description'
  ];

  textFields.forEach(field => {
    if (item[field] && typeof item[field] === 'string') {
      html += `<p>${escapeHtml(item[field]).replace(/\n/g, '<br/>')}</p>\n`;
    }
  });

  const isNte = item.gameId === 'nte' || item.dbSource === 'nte_characters' || item.dbSource === 'nte_arcs';
  if (isNte) {
    html += `<p><a href="/gallery/nte">이환 (NTE) 데이터베이스 허브로 돌아가기</a></p>\n`;
  }

  html += `</article>`;
  return html;
}

// ---------------------------------------------------------------------
// Habitat Validation
// ---------------------------------------------------------------------

function validateAniimoHabitats(aniimoEntries) {
  console.log('\n🌿 [Habitat Validation] Validating official 14 Aniimo habitats against official species targets...');
  let hasError = false;

  OFFICIAL_ANIIMO_HABITATS.forEach(habitat => {
    const target = OFFICIAL_HABITAT_TARGETS[habitat];
    const matchingEntries = aniimoEntries.filter(entry =>
      (entry.habitats || []).includes(habitat) ||
      (entry.forms || []).some(form => (form.locations || []).includes(habitat))
    );
    const count = matchingEntries.length;

    if (count === target) {
      console.log(`  ✓ ${habitat.padEnd(14)}: ${count} / ${target} 종 (일치)`);
    } else {
      hasError = true;
      console.error(`  ✕ ${habitat.padEnd(14)}: ${count} / ${target} 종 (불일치: ${count > target ? count - target + '종 초과' : target - count + '종 누락'})`);
    }
  });

  if (hasError) {
    throw new Error('❌ Aniimo habitat validation failed! Check aniimo.json habitat mappings against official targets.');
  }
  console.log('✅ All 14 official habitats verified with 100% exact species counts!\n');
}

// ---------------------------------------------------------------------
// Main Execution
// ---------------------------------------------------------------------

function runPrerender() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error('❌ dist/index.html not found! Run `vite build` first.');
    process.exit(1);
  }

  const aniimoValidationEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
  validateAniimoHabitats(aniimoValidationEntries);

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const sitemapRoutes = getSitemapRoutes();
  const sitemapRouteSet = new Set(sitemapRoutes);
  globalSitemapRouteSet = sitemapRouteSet;
  initGlobalCharacterMaps();
  let count = 0;

  console.log('🚀 Starting Static Meta Injection for Prerendering...');

  const homeArticleHtml = `<article>
    <h1>Rira Game Hub - 서브컬쳐 게임 종합 아카이브</h1>
    <p>애니모(Aniimo), 명조(Wuthering Waves), 붕괴: 스타레일(Honkai: Star Rail), 이환(Neverness to Everness)의 정밀 캐릭터 도감, 장비 스탯, 티어표와 실전 육성 가이드를 제공합니다.</p>
    <nav aria-label="빠른 접근 및 핵심 기능">
      <h2>빠른 접근 및 핵심 기능</h2>
      <ul>
        <li><a href="/search">통합 검색 (전체 게임 DB ⌘K)</a></li>
        <li><a href="/gallery/hsr">스타레일 DB (붕괴: 스타레일 캐릭터·광추·유물)</a></li>
        <li><a href="/gallery/ww">명조 DB (명조 공명자·무기·에코)</a></li>
        <li><a href="/gallery/nte">이환 DB (이환 캐릭터·아크)</a></li>
        <li><a href="/gallery/aniimo">애니모 도감 (애니모 진화·형태·스탯·상성)</a></li>
        <li><a href="/gallery/aniimo/characters">데이터 비교 (애니모 스탯 델타 비교기)</a></li>
      </ul>
    </nav>
  </article>`;

  createPrerenderedPage(
    '/',
    'Rira Archive | 애니모·명조·스타레일 게임 DB',
    '애니모(Aniimo), 명조, 붕괴: 스타레일, 이환의 캐릭터 도감, 능력치 비교, 티어표와 육성 가이드를 한곳에서 확인하세요.',
    `${CDN_URL}/hsr%20images/common/default_banner.webp`,
    baseHtml,
    homeArticleHtml
  );
  count++;

  const aniimoEvolutionData = loadAniimoEvolutionConditions();
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
        generateHsrGuideHtml(id, guide, char, hsrPartiesList),
        generateGuideSchema(name, '붕괴: 스타레일', guideRoute, getHsrCharacterImageUrl(char))
      );
      count++;
    }
  });

  // 3. WW Weapons (Unified local and Notion weapons)
  const wwWeapons = getWwWeapons();
  const wwWeaponToChars = buildWwWeaponToCharactersMap();
  const notionData = getNotionData();
  const notionWeaponsMap = new Map();
  notionData.forEach(item => {
    if (item.name && item.dbSource === 'weapons') {
      notionWeaponsMap.set(item.name.trim(), item);
    }
  });

  const allWwWeapons = new Map();
  wwWeapons.forEach(wp => {
    allWwWeapons.set(wp.name.trim(), {
      name: wp.name.trim(),
      id: wp.id,
      wpNotion: notionWeaponsMap.get(wp.name.trim()) || null
    });
  });
  notionData.forEach(item => {
    if (item.name && item.dbSource === 'weapons') {
      const cleanType = item.type || '';
      if (['대검', '직검', '권총', '권갑', '증폭기', '무기'].includes(cleanType)) {
        if (!allWwWeapons.has(item.name.trim())) {
          allWwWeapons.set(item.name.trim(), {
            name: item.name.trim(),
            id: null,
            wpNotion: item
          });
        }
      }
    }
  });

  allWwWeapons.forEach(({ name, id, wpNotion }) => {
    const routePath = `/gallery/ww/weapon/${encodeURIComponent(name)}`;
    const recommendedChars = wwWeaponToChars.get(name) || [];
    createPrerenderedPage(
      routePath,
      `${name} 옵션 비교 및 추천 착용 캐릭터 | 명조 무기 DB`,
      `명조 무기 ${name}의 돌파별 상세 능력치, 스킬 효과, 속성 보너스 및 추천 착용 공명자 완벽 분석 가이드.`,
      `${CDN_URL}/ww%20images/Weapons/${encodeAssetPath(name)}.webp`,
      baseHtml,
      generateRichWwWeaponHtml(name, id, wpNotion, recommendedChars)
    );
    count++;
  });

  // 4. HSR Equipment (Lightcones, Relics, Ornaments)
  const { lightConeToChars, relicToChars, ornamentToChars } = buildHsrEquipmentToCharactersMap(hsrGuidesMap);

  const hsrLightcones = loadHsrLightcones();
  hsrLightcones.forEach(lc => {
    if (!lc.name) return;
    const routePath = `/gallery/hsr/lightcone/${encodeURIComponent(lc.name)}`;
    const recommendedChars = lightConeToChars.get(lc.name) || [];
    createPrerenderedPage(
      routePath,
      `${lc.name} 상세 스탯 및 추천 캐릭터 | 붕괴: 스타레일 광추 DB`,
      `붕괴: 스타레일 ${lc.name}(${lc.rarity || 5}성 ${lc.path || ''})의 80레벨 기초 스탯, 광추 스킬 효과, 승급 재료 및 추천 장착 캐릭터 가이드.`,
      `${CDN_URL}/hsr%20images/%EA%B4%91%EC%B6%94/${encodeAssetPath(lc.name)}.webp`,
      baseHtml,
      generateHsrLightconeHtml(lc, recommendedChars)
    );
    count++;
  });

  const hsrRelics = loadHsrRelics();
  hsrRelics.forEach(relic => {
    if (!relic.name) return;
    const routePath = `/gallery/hsr/relic/${encodeURIComponent(relic.name)}`;
    const recommendedChars = relicToChars.get(relic.name) || [];
    createPrerenderedPage(
      routePath,
      `${relic.name} 세트 효과 및 추천 캐릭터 | 붕괴: 스타레일 유물 DB`,
      `붕괴: 스타레일 ${relic.name} 유물의 2세트/4세트 효과, 구성 부위 및 최적 추천 착용 캐릭터 총정리.`,
      `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      generateHsrRelicHtml(relic, recommendedChars)
    );
    count++;
  });

  const hsrOrnaments = loadHsrOrnaments();
  hsrOrnaments.forEach(ornament => {
    if (!ornament.name) return;
    const routePath = `/gallery/hsr/ornament/${encodeURIComponent(ornament.name)}`;
    const recommendedChars = ornamentToChars.get(ornament.name) || [];
    createPrerenderedPage(
      routePath,
      `${ornament.name} 세트 효과 및 추천 캐릭터 | 붕괴: 스타레일 차원 장신구 DB`,
      `붕괴: 스타레일 ${ornament.name} 차원 장신구의 2세트 효과, 구성 부위 및 추천 장착 캐릭터 완벽 분석.`,
      `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      generateHsrOrnamentHtml(ornament, recommendedChars)
    );
    count++;
  });

  // 5. Notion Data (NTE characters, NTE arcs, WW echoes, WW guides)
  notionData.forEach(item => {
    if (!item.name) return;
    if (item.dbSource === 'nte_characters') {
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
        `이환(NTE) ${item.name} 아크의 등급별 능력치, 블록 구성, 고유 스킬 효과와 추천 캐릭터 및 활용 정보를 확인하세요.`,
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
        `명조 ${item.name} 에코의 코스트, 메인 어빌리티 효과, 전투 활용 방식과 관련 에코 도감 정보를 한 페이지에서 확인하세요.`,
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
      const charLink = sitemapRouteSet.has(characterRoute)
        ? `<p><a href="${characterRoute}">${escapeHtml(item.name)} 캐릭터 상세 정보 보기</a></p>`
        : '';
      createPrerenderedPage(
        guideRoute,
        `명조 ${item.name} 공략 | 종결 에코 세팅 · 추천 무기 순위 · 파티 조합`,
        `명조: 워더링 웨이브 ${item.name}의 최신 종결 에코 세트(주옵션/부옵션 목표치), 추천 무기 1~4순위 랭킹, 스킬 레벨업 우선순위, 최적 파티 시너지 조합 완벽 공략 가이드.`,
        imageUrl,
        baseHtml,
        generateWwGuideHtml(item.id || item.name, item, item) + charLink,
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
      desc: 'Rira Archive가 제공하는 게임 데이터베이스와 공략의 제작 기준, 정보 검수 방식 및 사이트 운영 원칙을 안내합니다.',
      content: `<h1>About Us - RIRA ARCHIVE</h1><p>Rira Archive는 붕괴: 스타레일, 명조 등 최신 트렌디한 게임들의 데이터를 분석하고 최고의 공략과 티어표를 제공하는 게임 허브입니다. 유저들에게 가장 신속하고 정확한 정보를 전달하는 것을 목표로 합니다.</p>`
    },
    {
      path: '/privacy',
      title: '개인정보 처리방침 (Privacy Policy)',
      desc: 'Rira Archive의 쿠키, 분석 도구, 광고 서비스 이용과 개인정보 수집·처리·보관 및 사용자 권리에 관한 정책을 확인하세요.',
      content: `<h1>개인정보 처리방침 (Privacy Policy)</h1><p>본 사이트는 Google AdSense를 포함한 서드파티 쿠키를 사용하여 사용자 맞춤형 광고를 제공할 수 있습니다. 수집된 데이터는 오직 더 나은 서비스 제공과 사이트 분석을 위해서만 사용되며, 철저하게 보호됩니다.</p>`
    },
    {
      path: '/tos',
      title: '이용약관 (Terms of Service)',
      desc: 'Rira Archive가 제공하는 게임 데이터와 공략 정보의 이용 범위, 저작권, 면책 사항 및 서비스 이용 조건을 확인하세요.',
      content: `<h1>이용약관 (Terms of Service)</h1><p>본 사이트의 모든 정보와 공략글은 참고용으로 제공되며, 게임사의 공식적인 입장을 대변하지 않습니다. 무단 전재 및 재배포를 금지합니다.</p>`
    },
    {
      path: '/contact',
      title: '문의하기 (Contact Us)',
      desc: 'Rira Archive의 게임 데이터 오류 제보, 공략 내용 수정 요청, 저작권 및 사이트 이용 관련 문의 방법을 확인하세요.',
      content: `<h1>문의하기 (Contact Us)</h1><p>게임 데이터 오류, 공략 내용 수정, 저작권 및 사이트 이용과 관련된 문의를 접수합니다. 제보 시 대상 게임과 페이지 주소, 확인이 필요한 내용을 함께 알려주세요.</p>`
    },
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

  // 6-1. Hub-specific reviewed guides
  const guideArticles = fs.existsSync(GUIDE_ARTICLES_FILE)
    ? JSON.parse(fs.readFileSync(GUIDE_ARTICLES_FILE, 'utf8')).filter(article => article.status === 'published')
    : [];
  const guideGameLabels = { hsr: '붕괴: 스타레일', ww: '명조', nte: '이환', aniimo: '애니모' };
  [...new Set(guideArticles.map(article => article.gameId))].forEach(gameId => {
    const gameGuides = guideArticles.filter(article => article.gameId === gameId);
    const gameLabel = guideGameLabels[gameId] || gameId;
    const listHtml = gameGuides.map(article => `<li><a href="/gallery/${gameId}/guides/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a><p>${escapeHtml(article.excerpt)}</p></li>`).join('');
    createPrerenderedPage(
      `/gallery/${gameId}/guides`,
      `${gameLabel} 공략 모음`,
      `${gameLabel}의 공식 정보와 Rira 분석을 구분하고 적용 버전과 검수일을 표시한 캐릭터 육성, 전투 및 시스템 공략을 확인하세요.`,
      `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      `<article><h1>${escapeHtml(gameLabel)} 공략</h1><p>적용 기준일과 출처를 확인한 글만 공개합니다.</p><ul>${listHtml}</ul></article>`
    );
    count++;
  });

  guideArticles.forEach(article => {
    const gameLabel = guideGameLabels[article.gameId] || article.gameId;
    const renderGuideInline = value => escapeHtml(value.replace(/\*\*/g, '').replace(/`/g, ''))
      .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');
    const contentHtml = article.content.split('\n').map(line => {
      const text = line.trim();
      if (text.startsWith('### ')) return `<h3>${renderGuideInline(text.slice(4))}</h3>`;
      if (text.startsWith('## ')) return `<h2>${renderGuideInline(text.slice(3))}</h2>`;
      if (/^\d+\.\s/.test(text)) return `<p>${renderGuideInline(text)}</p>`;
      if (text.startsWith('- ')) return `<p>${renderGuideInline(text.slice(2))}</p>`;
      if (!text) return '';
      return `<p>${renderGuideInline(text)}</p>`;
    }).join('');
    const sourcesHtml = article.sources.map(source => `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.label)}</a></li>`).join('');
    createPrerenderedPage(
      `/gallery/${article.gameId}/guides/${encodeURIComponent(article.slug)}`,
      article.title,
      article.excerpt,
      `${CDN_URL}/hsr%20images/common/default_banner.webp`,
      baseHtml,
      `<article><p><a href="/gallery/${article.gameId}">${escapeHtml(gameLabel)} 허브</a> &gt; <a href="/gallery/${article.gameId}/guides">공략</a></p><h1>${escapeHtml(article.title)}</h1><p><strong>적용 기준:</strong> ${escapeHtml(article.applicableVersion)} · <strong>최종 검수:</strong> ${escapeHtml(article.reviewedAt)}</p>${contentHtml}<h2>검증 출처</h2><ul>${sourcesHtml}</ul></article>`
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
      meta.title = '명조 허브 | 공명자·무기·에코 도감 & 심경의 탑 티어표';
      meta.description = `명조: 워더링 웨이브(Wuthering Waves)의 전체 ${characterRoutes.length}명 공명자, ${weaponRoutes.length}개 무기, ${echoRoutes.length}종 에코 도감과 종결 세팅 가이드, 심경의 탑 티어표 및 파티 조합을 확인하세요.`;
      meta.content = `<article>
        <h1>명조: 워더링 웨이브 아카이브</h1>
        <p>${escapeHtml(meta.description)}</p>
        <dl>
          <dt>등록 공명자</dt><dd>${characterRoutes.length}명</dd>
          <dt>등록 무기</dt><dd>${weaponRoutes.length}개</dd>
          <dt>등록 에코</dt><dd>${echoRoutes.length}종</dd>
          <dt>공명자 공략</dt><dd>${guideRoutes.length}편</dd>
        </dl>
        <nav aria-label="명조 데이터베이스 카테고리">
          <h2>데이터베이스 카테고리</h2>
          <ul>
            <li><a href="/gallery/ww?menu=캐릭터">공명자 도감 (${characterRoutes.length}명)</a></li>
            <li><a href="/gallery/ww?menu=무기">무기 도감 (${weaponRoutes.length}개)</a></li>
            <li><a href="/gallery/ww?menu=에코">에코 도감 (${echoRoutes.length}종)</a></li>
            <li><a href="/gallery/ww?menu=공략">공명자 육성 공략 (${guideRoutes.length}편)</a></li>
            <li><a href="/gallery/ww/tierlist">심경의 탑 티어표</a></li>
            <li><a href="/gallery/ww/parties">추천 파티 조합</a></li>
          </ul>
        </nav>
      </article>`;
      meta.content += generateInternalLinkList('명조 공명자 상세 도감', characterRoutes);
      meta.content += generateInternalLinkList('명조 공명자 종결 공략 가이드', guideRoutes);
      meta.content += generateInternalLinkList('명조 무기 데이터베이스', weaponRoutes);
      meta.content += generateInternalLinkList('명조 에코 도감 및 어빌리티', echoRoutes);
    } else if (routePath === '/gallery/hsr') {
      const characterRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/hsr\/character\/[^/]+$/.test(candidate));
      const guideRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/hsr\/character\/[^/]+\/guide$/.test(candidate));
      const lightConeRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/hsr/lightcone/'));
      const relicRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/hsr/relic/'));
      const ornamentRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/hsr/ornament/'));
      meta.title = '붕괴: 스타레일 허브 | 전체 캐릭터·광추·유물 도감 & 티어표';
      meta.description = `붕괴: 스타레일(Honkai: Star Rail)의 전체 ${characterRoutes.length}명 캐릭터, ${lightConeRoutes.length}개 광추, ${relicRoutes.length + ornamentRoutes.length}개 유물·차원 장신구 도감과 실전 육성 가이드, 혼돈의 기억 티어표를 확인하세요.`;
      meta.content = `<article>
        <h1>붕괴: 스타레일 아카이브</h1>
        <p>${escapeHtml(meta.description)}</p>
        <dl>
          <dt>등록 캐릭터</dt><dd>${characterRoutes.length}명</dd>
          <dt>등록 광추</dt><dd>${lightConeRoutes.length}개</dd>
          <dt>유물 &amp; 장신구</dt><dd>${relicRoutes.length + ornamentRoutes.length}세트</dd>
          <dt>육성 공략</dt><dd>${guideRoutes.length}편</dd>
        </dl>
        <nav aria-label="스타레일 데이터베이스 카테고리">
          <h2>데이터베이스 카테고리</h2>
          <ul>
            <li><a href="/gallery/hsr?menu=캐릭터">캐릭터 도감 (${characterRoutes.length}명)</a></li>
            <li><a href="/gallery/hsr?menu=광추">광추 도감 (${lightConeRoutes.length}개)</a></li>
            <li><a href="/gallery/hsr?menu=유물%20%26%20장신구">유물 & 차원 장신구 도감 (${relicRoutes.length + ornamentRoutes.length}세트)</a></li>
            <li><a href="/gallery/hsr?menu=공략">캐릭터 육성 공략 (${guideRoutes.length}편)</a></li>
            <li><a href="/gallery/hsr/tierlist">혼돈·허구 티어표</a></li>
            <li><a href="/gallery/hsr/parties">추천 파티 조합</a></li>
          </ul>
        </nav>
      </article>`;
      meta.content += generateInternalLinkList('붕괴: 스타레일 캐릭터 상세 도감', characterRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 캐릭터 종결 공략 가이드', guideRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 광추 데이터베이스', lightConeRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 유물 도감 (세트 효과)', relicRoutes);
      meta.content += generateInternalLinkList('붕괴: 스타레일 차원 장신구 도감 (세트 효과)', ornamentRoutes);
    } else if (routePath === '/gallery/nte') {
      const characterRoutes = sitemapRoutes.filter(candidate => /^\/gallery\/nte\/character\/[^/]+$/.test(candidate));
      const weaponRoutes = sitemapRoutes.filter(candidate => candidate.startsWith('/gallery/nte/weapon/'));
      meta.title = '이환 허브 | 캐릭터·아크 도감 & 추천 세팅';
      meta.description = `이환: 네버네스 투 에버네스(Neverness to Everness)의 최신 ${characterRoutes.length}명 캐릭터 도감, ${weaponRoutes.length}개 아크 장비 데이터, 추천 파티 조합 및 육성 가이드를 확인하세요.`;
      meta.content = `<article>
        <h1>이환 (Neverness to Everness) 아카이브</h1>
        <p>${escapeHtml(meta.description)}</p>
        <dl>
          <dt>등록 캐릭터</dt><dd>${characterRoutes.length}명</dd>
          <dt>등록 아크</dt><dd>${weaponRoutes.length}개</dd>
        </dl>
        <nav aria-label="이환 데이터베이스 카테고리">
          <h2>데이터베이스 카테고리</h2>
          <ul>
            <li><a href="/gallery/nte?menu=캐릭터">캐릭터 도감 (${characterRoutes.length}명)</a></li>
            <li><a href="/gallery/nte?menu=무기">아크 도감 (${weaponRoutes.length}개)</a></li>
            <li><a href="/gallery/nte?menu=공략">캐릭터 육성 공략</a></li>
            <li><a href="/gallery/nte?menu=티어표">최신 티어표</a></li>
            <li><a href="/gallery/nte/parties">추천 파티 조합</a></li>
          </ul>
        </nav>
      </article>`;
      meta.content += generateInternalLinkList('이환 캐릭터 상세 도감', characterRoutes);
      meta.content += generateInternalLinkList('이환 아크 무기 데이터베이스', weaponRoutes);
    } else if (routePath === '/gallery/aniimo') {
      const aniimoFile = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
      const aniimoEntries = fs.existsSync(aniimoFile) ? JSON.parse(fs.readFileSync(aniimoFile, 'utf8')) : [];
      const locations = OFFICIAL_ANIIMO_HABITATS;
      const formCount = aniimoEntries.reduce((total, item) => total + (item.forms || []).length, 0);
      meta.title = '애니모 허브 | 도감·원소 상성·공식 서식지 데이터베이스';
      meta.description = `애니모 ${aniimoEntries.length}종의 형태별 도감, 능력치 비교, 9원소 상성표와 ${locations.length}개 공식 서식지별 출현 정보를 한곳에서 확인하세요.`;
      meta.content = `<article><h1>애니모 허브</h1><p>${escapeHtml(meta.description)}</p><dl><dt>등록 애니모</dt><dd>${aniimoEntries.length}종</dd><dt>형태 데이터</dt><dd>${formCount}개</dd><dt>공식 서식지</dt><dd>${locations.length}곳</dd></dl><nav><ul><li><a href="/gallery/aniimo/characters">애니모 도감·능력치 비교</a></li><li><a href="/gallery/aniimo/type-chart">애니모 원소 상성표·약점 계산</a></li><li><a href="/gallery/aniimo/personality">애니모 성격 추천·MBTI 효과</a></li><li><a href="/gallery/aniimo/party-builder">애니모 파티 추천</a></li><li><a href="/gallery/aniimo/locations">애니모 서식지 도감</a></li></ul></nav><p><a href="https://www.aniimo.com/ko">애니모 공식 사이트</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/characters') {
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      meta.title = '애니모 도감·능력치 비교기 | Aniimo 아카이브';
      meta.description = `애니모 공식 위키에서 확인한 ${aniimoEntries.length}종의 원소, 포지션과 능력치를 검색하고 최대 3종까지 비교하세요.`;
      meta.content = `<article><h1>애니모 도감·능력치 비교기</h1><p>${escapeHtml(meta.description)}</p><ul>${aniimoEntries.map(item => `<li><a href="/gallery/aniimo/character/${encodeURIComponent(item.name)}">${escapeHtml(`NO.${item.number} ${item.name} · ${item.elements.join('/')} · ${item.positions.join('/')}`)}</a></li>`).join('')}</ul><p><a href="/gallery/aniimo">애니모 허브로 돌아가기</a></p></article>`;
    } else if (routePath === '/gallery/aniimo/locations') {
      const locations = OFFICIAL_ANIIMO_HABITATS;
      meta.title = `애니모 공식 서식지 ${locations.length}곳 | 서식지별 도감`;
      meta.description = `애니모의 공식 서식지 ${locations.length}곳을 지역별로 탐색하고 각 서식지에서 만날 수 있는 애니모 종류와 형태 정보를 확인하세요.`;
      meta.content = `<article><h1>서식지별 애니모 도감</h1><p>${escapeHtml(meta.description)}</p><ul>${locations.map(location => `<li><a href="/gallery/aniimo/location/${encodeURIComponent(location.trim().replace(/\s+/g, '-'))}">${escapeHtml(location)}</a></li>`).join('')}</ul><p><a href="/gallery/aniimo">애니모 허브로 돌아가기</a></p></article>`;
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
      let partyListHtml = '';
      try {
        const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
        const partiesFilePath = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'parties.ts');
        if (fs.existsSync(partiesFilePath)) {
          const content = fs.readFileSync(partiesFilePath, 'utf8');
          const partyMatch = content.match(/name:\s*['"](.*?)['"][\s\S]*?description:\s*['"](.*?)['"][\s\S]*?category:\s*['"](.*?)['"]/);
          if (partyMatch) {
            partyListHtml = `<h2>추천 파티 목록</h2><section><h3>${escapeHtml(partyMatch[1])} (${escapeHtml(partyMatch[3])})</h3><p>${escapeHtml(partyMatch[2])}</p></section>`;
          }
        }
      } catch (e) {}
      meta.title = '애니모 파티 추천 | 역할별 추천 조합';
      meta.description = '애니모의 역할과 형태별 능력, 원소 구성을 반영한 추천 파티와 운용 특징, 핵심 조합 및 대체 애니모를 확인하세요.';
      meta.content = `<article><h1>애니모 파티 추천</h1><p>${escapeHtml(meta.description)}</p>${partyListHtml || '<h2>추천 조합 확인</h2><p>관리자가 검토한 4인 추천 조합을 분류별로 확인하고, 각 애니모의 형태별 능력과 스킬 상세 페이지로 이동할 수 있습니다.</p>'}<p><a href="/gallery/aniimo/characters">애니모 도감에서 형태 확인</a></p></article>`;
    } else if (/^\/gallery\/aniimo\/location\//.test(routePath)) {
      const locationSlug = decodeURIComponent(routePath.split('/').at(-1));
      const rawLocation = locationSlug.replace(/-/g, ' ').trim();
      const location = OFFICIAL_ANIIMO_HABITATS.find(candidate => candidate.trim().replace(/\s+/g, '-') === locationSlug || candidate === rawLocation) || rawLocation;
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      const appearances = aniimoEntries.filter(entry =>
        (entry.habitats || []).includes(location) ||
        (entry.forms || []).some(form => (form.locations || []).includes(location))
      ).map(entry => {
        const matchingForms = (entry.forms || []).filter(form => (form.locations || []).includes(location));
        return {
          entry,
          forms: matchingForms.length > 0 ? matchingForms : entry.forms
        };
      });
      const officialCount = OFFICIAL_HABITAT_TARGETS[location] || appearances.length;
      meta.title = `${location} 공식 서식지 · 서식 애니모 ${officialCount}종 | 애니모 서식지 도감`;
      meta.description = `${location}에서 서식하는 애니모 ${officialCount}종의 이름과 지역별 형태, 원소·포지션 정보를 확인하고 각 애니모 상세 도감으로 이동하세요.`;
      const appearanceLinks = appearances.map(({ entry, forms }) => forms.map(form => {
        const query = form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : '';
        return `<li><a href="/gallery/aniimo/character/${encodeURIComponent(entry.name)}${query}">${escapeHtml(`NO.${entry.number} ${entry.name} · ${form.label}`)}</a></li>`;
      }).join('')).join('');
      const otherLocations = OFFICIAL_ANIIMO_HABITATS.filter(candidate => candidate !== location).map(candidate => `<li><a href="/gallery/aniimo/location/${encodeURIComponent(candidate.trim().replace(/\s+/g, '-'))}">${escapeHtml(candidate)}</a></li>`).join('');
      meta.content = `<article><h1>${escapeHtml(location)} 공식 서식지</h1><p>${escapeHtml(meta.description)}</p><ul>${appearanceLinks}</ul><h2>다른 공식 서식지</h2><ul>${otherLocations}</ul><p><a href="/gallery/aniimo/locations">애니모 서식지 도감으로 돌아가기</a></p></article>`;
    } else if (/^\/gallery\/aniimo\/character\//.test(routePath)) {
      const name = decodeURIComponent(routePath.split('/').at(-1));
      const aniimoEntries = fs.existsSync(ANIIMO_DATA_FILE) ? JSON.parse(fs.readFileSync(ANIIMO_DATA_FILE, 'utf8')) : [];
      const item = aniimoEntries.find(candidate => candidate.name === name);
      if (item) {
        meta.title = `${item.name} 능력치·스킬·진화 | 애니모 도감`;
        meta.description = `애니모 ${item.name}(NO.${item.number})의 소개, 능력치, 진화 조건, 형태별 데이터, 출현 지역, 특성과 스킬 정보를 확인하세요.`;
        meta.content = generateRichAniimoCharacterHtml(item, aniimoEvolutionData);
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

  // 9. Legacy redirects for Aniimo locations
  const legacyLocationRedirects = [
    { from: '/gallery/aniimo/location/초승달-만', to: '/gallery/aniimo/location/고래첨벙-해안', targetName: '고래첨벙 해안' },
    { from: '/gallery/aniimo/location/석양-해원', to: '/gallery/aniimo/location/고래첨벙-해안', targetName: '고래첨벙 해안' },
    { from: '/gallery/aniimo/location/스타폴-숲', to: '/gallery/aniimo/location/스테플-숲', targetName: '스테플 숲' },
    { from: '/gallery/aniimo/location/눈기슭-초원', to: '/gallery/aniimo/location/설산기슭-초원', targetName: '설산기슭 초원' },
    { from: '/gallery/aniimo/location/바다끝-구릉', to: '/gallery/aniimo/location/바다끝-구름', targetName: '바다끝 구름' }
  ];

  legacyLocationRedirects.forEach(({ from, to, targetName }) => {
    const targetDir = path.join(DIST_DIR, ...from.split('/').filter(Boolean));
    fs.mkdirSync(targetDir, { recursive: true });
    const canonicalUrl = `${BASE_URL}${encodeURI(to)}`;
    const redirectHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>이동 중... - ${targetName} | Rira Game Hub</title>
  <meta name="description" content="${targetName} 공식 서식지로 이동합니다." />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta http-equiv="refresh" content="0;url=${encodeURI(to)}" />
  <meta name="robots" content="noindex, follow" />
</head>
<body>
  <h1>${targetName} 공식 서식지로 이동</h1>
  <p>공식 서식지 <a href="${encodeURI(to)}">${targetName}</a>(으)로 이동합니다.</p>
</body>
</html>`;
    fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml, 'utf8');
    count++;
  });

  console.log(`✅ Successfully injected static meta and DOM tags for ${count} routes (${sitemapRoutes.length} sitemap routes covered)!`);
}

runPrerender();
