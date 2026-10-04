import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { normalizeNteCharacter } from './lib/normalize-nte-character.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const notionPath = path.join(projectRoot, 'common-hub', 'data', 'notion-data.json');
const outputPath = path.join(projectRoot, 'common-hub', 'data', 'search', 'notion-search.json');
const homeStatsPath = path.join(projectRoot, 'common-hub', 'data', 'search', 'home-stats.json');
const hsrCharacterSummaryPath = path.join(projectRoot, 'hsr-hub', 'data', 'generated', 'character-summary.json');
const wwWeaponsPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'weapons.json');
const nteArcsPath = path.join(projectRoot, 'nte-hub', 'data', 'generated', 'arcs.json');
const notionItemsPath = path.join(projectRoot, 'common-hub', 'data', 'generated', 'notion-items.json');
const nteCharactersPath = path.join(projectRoot, 'nte-hub', 'data', 'generated', 'characters.json');
const nteCharacterSummaryPath = path.join(projectRoot, 'nte-hub', 'data', 'generated', 'character-summary.json');
const wwGuideCharactersPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'guide-characters.json');
const wwGuidesPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'guides.json');
const wwCharactersPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'characters.json');
const wwAdminWeaponsPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'admin-weapons.json');
const wwGalleryPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'gallery.json');
const wwRecommendationsPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'recommendations.json');
const wwEchoesPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'echoes.json');
const wwInventoryPath = path.join(projectRoot, 'ww-hub', 'data', 'generated', 'inventory.json');
const notionData = JSON.parse(fs.readFileSync(notionPath, 'utf8'));
const aniimoData = JSON.parse(fs.readFileSync(path.join(projectRoot, 'aniimo-hub', 'data', 'aniimo.json'), 'utf8'));

const readSourceFiles = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const target = path.join(directory, entry.name);
  if (entry.isDirectory()) return readSourceFiles(target);
  return entry.name.endsWith('.ts') && entry.name !== 'index.ts' ? [target] : [];
});

const readProperty = (source, property) => {
  const match = source.match(new RegExp(`^[ \\t]*(?:["']${property}["']|${property})\\s*:\\s*["']([^"']+)["']`, 'm'));
  return match?.[1] || '';
};

const readNumericProperty = (source, property) => {
  const match = source.match(new RegExp(`^[ \\t]*(?:["']${property}["']|${property})\\s*:\\s*(\\d+)`, 'm'));
  return match ? Number.parseInt(match[1], 10) : undefined;
};

const hsrCharacterDir = path.join(projectRoot, 'hsr-hub', 'data', 'characters', 'hsr');
const hsrCharacterSummary = readSourceFiles(hsrCharacterDir).map(file => {
  const source = fs.readFileSync(file, 'utf8');
  return {
    id: readProperty(source, 'id'),
    name: readProperty(source, 'name'),
    gameId: 'hsr',
    folderName: readProperty(source, 'folderName') || readProperty(source, 'name'),
    rarity: readNumericProperty(source, 'rarity') || 5,
    attribute: readProperty(source, 'attribute'),
    path: readProperty(source, 'path'),
    releaseVersion: readProperty(source, 'releaseVersion') || '1.0'
  };
}).filter(item => item.id && item.name);

const hsrCharacters = hsrCharacterSummary.map(({ id, name, gameId, attribute, path }) => ({
  id,
  name,
  gameId,
  attribute,
  path
}));

hsrCharacterSummary.sort((a, b) => {
  const versionDelta = Number.parseFloat(b.releaseVersion) - Number.parseFloat(a.releaseVersion);
  if (versionDelta !== 0) return versionDelta;
  if (a.rarity !== b.rarity) return b.rarity - a.rarity;
  return a.name.localeCompare(b.name, 'ko-KR');
});

fs.mkdirSync(path.dirname(hsrCharacterSummaryPath), { recursive: true });
fs.writeFileSync(hsrCharacterSummaryPath, `${JSON.stringify(hsrCharacterSummary, null, 2)}\n`, 'utf8');

const lightconeDir = path.join(projectRoot, 'hsr-hub', 'data', 'lightcones');
const parsedHsrLightcones = readSourceFiles(lightconeDir).flatMap(file => {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const records = [];
  for (let index = 0; index < lines.length; index += 1) {
    const idMatch = lines[index].match(/^ {4}["']?id["']?\s*:\s*["']([^"']+)["']/);
    if (!idMatch) continue;
    const nearby = lines.slice(index, index + 15).join('\n');
    const name = readProperty(nearby, 'name');
    const lightconePath = readProperty(nearby, 'path');
    if (name && lightconePath) records.push({ id: idMatch[1], name, path: lightconePath });
  }
  return records;
});
const hsrLightcones = Array.from(new Map(parsedHsrLightcones.map(lightcone => [lightcone.name, lightcone])).values());

const guideDir = path.join(projectRoot, 'hsr-hub', 'data', 'guides');
const hsrGuides = readSourceFiles(guideDir).map(file => {
  const source = fs.readFileSync(file, 'utf8');
  const characterName = readProperty(source, 'characterName');
  return characterName ? { characterName } : null;
}).filter(Boolean);

const hsrPaths = new Set(['지식', '수렵', '파멸', '보존', '풍요', '공허', '화합']);
const wwWeaponTypes = new Set(['대검', '직검', '권총', '권갑', '증폭기', '무기']);
const excludedWwSources = new Set([
  'nte_weapons', 'nte_characters', 'nte_items', 'nte_arcs',
  'ww_items', 'ww_echoes', 'ww_characters', 'ww_guides'
]);
const nteArcTypes = new Set(['고체', '액체', '기체', '결합', '플라즈마']);
const notionWwWeapons = notionData
  .filter(item => item.type && wwWeaponTypes.has(item.type) && !excludedWwSources.has(item.dbSource));

const parseWwWeapon = item => {
  let atk = 500;
  let subStatName = '공격력';
  let subStatValue = '36.4%';
  if (item.growthStats) {
    const extractStats = level => item.growthStats.match(new RegExp(`${level}\\s*:\\s*(?:기초\\s*)?공격력\\s*\\*?\\*?(\\d+)\\*?\\*?\\s*\\/\\s*([^\\n*]+?)\\s*\\*?\\*?([\\d.]+%?)\\*?\\*?`, 'i'));
    const levelMatch = extractStats(90) || extractStats(80) || extractStats(70);
    if (levelMatch) {
      atk = Number.parseInt(levelMatch[1], 10);
      subStatName = levelMatch[2].trim();
      subStatValue = levelMatch[3].trim();
      if (subStatValue.endsWith('%') && Number.parseFloat(subStatValue) > 100) {
        subStatValue = `${(Number.parseFloat(subStatValue) / 10).toFixed(1).replace(/\.0$/, '')}%`;
      }
    }
  }
  return {
    id: item.id,
    gameId: 'ww',
    name: item.name,
    rarity: Number(item.rarity) || 5,
    type: wwWeaponTypes.has(item.type) && item.type !== '무기' ? item.type : '직검',
    releaseVersion: item.releaseVersion || '1.0',
    obtain: item.obtain || '노션 연동',
    stats: { atk, subStatName, subStatValue },
    skill: {
      name: (item.skillName || '노션 연동 스킬').replace(/\*\*/g, '').trim(),
      description: (item.skillDescription || '노션에서 연동된 무기 스킬 설명입니다.').trim()
    },
    ascensionMaterials: item.ascensionMaterials || '',
    growthStats: item.growthStats || '',
    weaponStory: item.weaponStory || '',
    description: (item.weaponStory || item.content || '노션에서 연동된 무기 스토리입니다.').trim(),
    isNotion: true,
    content: item.content || ''
  };
};

const notionNteArcs = notionData
  .filter(item => item.dbSource === 'nte_arcs' || item.dbSource === 'nte_weapons' || nteArcTypes.has(item.type || ''));

const notionItems = notionData
  .filter(item =>
    item.dbSource === 'ww_items'
    || item.dbSource === 'nte_items'
    || (!item.dbSource && ['아이템', '소모품', '재료', '육성 아이템', '성급', undefined, null, ''].includes(item.type))
  )
  .map(item => ({
    name: item.name,
    type: item.type,
    rarity: item.rarity,
    content: item.content,
    skillDescription: item.skillDescription,
    briefInfo: item.briefInfo,
    obtain: item.obtain,
    fileName: item.fileName,
    dbSource: item.dbSource
  }));

const notionNteCharacters = notionData.filter(item => item.dbSource === 'nte_characters');

const parseWwGuideCharacter = item => {
  let attribute = item.itemAttribute || '회절';
  let weaponType = item.weapon || '직검';
  if (item.content) {
    if (!item.itemAttribute) {
      const attributeMatch = item.content.match(/(?:속성|공명\s*속성)\s*:\s*([^\s\n]+)/i);
      if (attributeMatch) attribute = attributeMatch[1].trim();
    }
    if (!item.weapon) {
      const weaponMatch = item.content.match(/(?:무기|무기\s*종류|무기\s*타입)\s*:\s*([^\s\n]+)/i);
      if (weaponMatch) weaponType = weaponMatch[1].trim();
    }
  }
  return {
    id: item.id,
    name: item.name,
    folderName: item.name,
    attribute,
    weaponType,
    isRover: Boolean(item.name?.includes('방랑자') || item.id?.startsWith('rover_')),
    roles: item.combatRoles ? item.combatRoles.split('\n').map(role => {
      const parts = role.includes(':') ? role.split(':') : role.split('：');
      return {
        label: parts[0].replace(/\*/g, '').trim(),
        description: parts.length > 1 ? parts.slice(1).join(':').replace(/\*/g, '').trim() : ''
      };
    }).filter(role => role.label) : []
  };
};

const notionWwGuideCharacters = notionData
  .filter(item => item.type === '캐릭터' && item.dbSource !== 'nte_characters' && item.dbSource !== 'nte_items')
  .map(parseWwGuideCharacter);

const notionWwGuides = notionData
  .filter(item => item.dbSource === 'ww_guides')
  .map(item => ({
    id: item.id,
    name: item.name || item.id.replace(/_세팅_공략|_공략/g, '').trim(),
    patchVersion: item.patchVersion || '1.0',
    weapons: item.weapons || [],
    echoSets: item.echoSets || [],
    mainEchoes: item.mainEchoes || [],
    variants: item.variants,
    targetStats: item.targetStats || [],
    mainStats: item.mainStats || [],
    subStats: item.subStats || [],
    skillPriority: item.skillPriority || [],
    isUniversalSynergy: item.isUniversalSynergy,
    synergyCharacters: item.synergyCharacters || []
  }));

const buildWwData = async () => {
  const result = await build({
    absWorkingDir: projectRoot,
    stdin: {
      contents: `import { getGameData } from './common-hub/data/dataManager.ts'; export default getGameData('ww');`,
      resolveDir: projectRoot,
      sourcefile: 'generate-ww-character-data.ts',
      loader: 'ts'
    },
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    banner: { js: 'const __generationGlob = () => ({});' },
    plugins: [{
      name: 'generation-i18n-shim',
      setup(buildContext) {
        buildContext.onResolve({ filter: /common-hub[\\/]i18n$/ }, () => ({ path: 'generation-i18n', namespace: 'generation' }));
        buildContext.onLoad({ filter: /.*/, namespace: 'generation' }, () => ({
          contents: `export default { t: (value) => value };`,
          loader: 'js'
        }));
      }
    }],
    define: {
      'import.meta.env.DEV': 'false',
      'import.meta.glob': '__generationGlob'
    },
    logLevel: 'silent'
  });
  const bundledSource = result.outputFiles[0].text;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundledSource).toString('base64')}`;
  return (await import(moduleUrl)).default;
};

const parseNteArc = item => {
  const baseStats = {};
  let baseAtk = 395;
  let subStatName = '방어력';
  let subStatValue = '52.5%';

  for (const rawLine of (item.growthStats || '').split('\n')) {
    const line = rawLine.replace(/\*\*/g, '').trim();
    const match = line.match(/(\d+)\s*:\s*(?:기초\s*)?공격력\s*([\d,]+)\s*(?:\/|\,)\s*([^\d\n]+?)\s*([\d.]+%?)/i);
    if (!match) continue;
    const level = Number.parseInt(match[1], 10);
    const stat = {
      atk: Number.parseInt(match[2].replace(/,/g, ''), 10),
      subStatName: match[3].trim(),
      subStatValue: match[4].trim()
    };
    baseStats[level] = stat;
    if (level === 80 || level === Math.max(...Object.keys(baseStats).map(Number))) {
      baseAtk = stat.atk;
      subStatName = stat.subStatName;
      subStatValue = stat.subStatValue;
    }
  }

  const materials = (item.ascensionMaterials || '').split('\n').flatMap(rawLine => {
    const line = rawLine.trim();
    if (!line) return [];
    const separated = line.match(/^([^xX*]+)[xX*]\s*([\d,]+)/);
    if (separated) {
      return [{ name: separated[1].trim(), count: Number.parseInt(separated[2].replace(/,/g, ''), 10) || 1 }];
    }
    const count = line.match(/[\d,]+$/);
    const name = line.replace(/[\d,xX*]+$/, '').trim();
    return name ? [{ name, count: count ? Number.parseInt(count[0].replace(/,/g, ''), 10) : 1 }] : [];
  });

  const rarityText = String(item.rarity || 'A').toUpperCase();
  const rarity = rarityText === 'S' || rarityText === '5' ? 5 : rarityText === 'B' || rarityText === '3' ? 3 : 4;
  const story = item.weaponStory || item.description || item.content || '';

  return {
    id: item.id,
    name: item.name,
    gameId: 'nte',
    rarity,
    rarityGrade: rarity === 5 ? 'S' : rarity === 4 ? 'A' : 'B',
    type: item.type || '결합',
    releaseVersion: item.releaseVersion || '1.0',
    obtain: item.obtain || '',
    dedicatedChar: (item.dedicatedChar || item.exclusive || '').replace(/\*\*/g, '').trim(),
    growthStats: item.growthStats || '',
    baseStats,
    stats: { atk: baseAtk, subStatName, subStatValue },
    skill: {
      name: (item.skillName || '아크 스킬').replace(/\*\*/g, '').trim(),
      description: (item.skillDescription || '').replace(/\*\*/g, '')
    },
    ascensionMaterials: item.ascensionMaterials || '',
    materials,
    description: story,
    story,
    weaponStory: story,
    isNotion: true
  };
};

const searchData = {
  hsrCharacters,
  hsrGuides,
  hsrStaticLightcones: hsrLightcones,
  hsrLightcones: notionData
    .filter(item => item.dbSource === 'weapons' && hsrPaths.has(item.type || ''))
    .map(item => ({ id: item.id, name: item.name, path: item.type || '파멸' })),
  wwCharacters: notionData
    .filter(item => item.type === '캐릭터' && item.dbSource !== 'nte_characters' && item.dbSource !== 'nte_items')
    .map(item => ({
      id: item.id,
      name: item.name,
      gameId: 'ww',
      attribute: item.itemAttribute || '',
      weaponType: item.weapon || '',
      folderName: item.folderName || item.name,
      rarity: item.rarity || 5,
      summary: item.briefInfo || ''
    })),
  wwWeapons: notionData
    .filter(item => item.type && wwWeaponTypes.has(item.type) && !excludedWwSources.has(item.dbSource))
    .map(item => ({ id: item.id, name: item.name, type: item.type })),
  wwGuides: notionData
    .filter(item => item.dbSource === 'ww_guides')
    .map(item => ({
      id: item.id,
      name: item.name || item.id.replace(/_세팅_공략|_공략/g, '').trim(),
      weapons: item.weapons || [],
      mainEchoes: item.mainEchoes || [],
      variantMainEchoes: item.variants?.[0]?.mainEchoes || []
    })),
  wwEchoes: notionData
    .filter(item => item.dbSource === 'ww_echoes')
    .map(item => ({
      id: item.id,
      name: item.name,
      cost: item.cost,
      sonataSets: item.sonataSets || [],
      folderName: item.name,
      cooldown: item.cooldown,
      description: item.content || item.skillDescription || '',
      hasPhantom: item.hasPhantom || false,
      enemyInfo: {
        originalName: item.enemyOriginalName || '',
        grade: item.enemyGrade || '',
        description: item.enemyDescription || '',
        specialNote: item.enemySpecialNote || '',
        drops: item.drops || []
      }
    })),
  nteCharacters: notionData
    .filter(item => item.dbSource === 'nte_characters')
    .map(item => ({
      id: item.id,
      name: item.name,
      gameId: 'nte',
      attribute: item.abilityAttribute || item.itemAttribute || '',
      arc: item.arc || '',
      summary: item.briefInfo || ''
    })),
  nteArcs: notionNteArcs
    .map(item => ({ id: item.id, name: item.name, type: item.type || '' }))
};
const wwGuideDisplayCount = searchData.wwGuides.length
  + searchData.wwGuides.filter(guide => guide.name.includes('방랑자')).length;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(searchData, null, 2)}\n`, 'utf8');

const homeStats = {
  global: {
    games: 4,
    characters: hsrCharacters.length + searchData.wwCharacters.length + searchData.nteCharacters.length + aniimoData.length,
    guides: hsrGuides.length + wwGuideDisplayCount + 5,
    items: 2098
  },
  games: {
    hsr: { characters: hsrCharacters.length, guides: hsrGuides.length },
    ww: { characters: searchData.wwCharacters.length, guides: wwGuideDisplayCount },
    nte: { characters: searchData.nteCharacters.length, guides: 0 },
    aniimo: { characters: aniimoData.length, guides: 5 }
  }
};
fs.writeFileSync(homeStatsPath, `${JSON.stringify(homeStats, null, 2)}\n`, 'utf8');
fs.mkdirSync(path.dirname(wwWeaponsPath), { recursive: true });
fs.writeFileSync(wwWeaponsPath, `${JSON.stringify(notionWwWeapons.map(parseWwWeapon), null, 2)}\n`, 'utf8');
fs.mkdirSync(path.dirname(nteArcsPath), { recursive: true });
fs.writeFileSync(nteArcsPath, `${JSON.stringify(notionNteArcs.map(parseNteArc), null, 2)}\n`, 'utf8');
fs.mkdirSync(path.dirname(notionItemsPath), { recursive: true });
fs.writeFileSync(notionItemsPath, `${JSON.stringify(notionItems, null, 2)}\n`, 'utf8');
fs.mkdirSync(path.dirname(nteCharactersPath), { recursive: true });
const normalizedNteCharacters = notionNteCharacters.map(normalizeNteCharacter);
fs.writeFileSync(nteCharactersPath, `${JSON.stringify(normalizedNteCharacters, null, 2)}\n`, 'utf8');
fs.writeFileSync(nteCharacterSummaryPath, `${JSON.stringify(normalizedNteCharacters.map(character => ({
  id: character.id,
  name: character.name,
  folderName: character.folderName,
  rarity: character.rarity,
  attribute: character.attribute,
  arc: character.arc,
  releaseVersion: character.releaseVersion
})), null, 2)}\n`, 'utf8');
fs.mkdirSync(path.dirname(wwGuideCharactersPath), { recursive: true });
fs.writeFileSync(wwGuideCharactersPath, `${JSON.stringify(notionWwGuideCharacters, null, 2)}\n`, 'utf8');
fs.writeFileSync(wwGuidesPath, `${JSON.stringify(notionWwGuides, null, 2)}\n`, 'utf8');
const wwData = await buildWwData();
const wwCharacters = wwData.CHARACTER_DB;
fs.writeFileSync(wwCharactersPath, `${JSON.stringify(wwCharacters, null, 2)}\n`, 'utf8');
fs.writeFileSync(wwAdminWeaponsPath, `${JSON.stringify((wwData.WEAPON_DB || []).map(weapon => ({
  id: weapon.id,
  name: weapon.name,
  rarity: weapon.rarity,
  type: weapon.type,
  releaseVersion: weapon.releaseVersion,
  obtain: weapon.obtain,
  stats: weapon.stats,
  skill: weapon.skill,
  description: weapon.description
})), null, 2)}\n`, 'utf8');
fs.writeFileSync(wwEchoesPath, `${JSON.stringify(wwData.ECHO_DB, null, 2)}\n`, 'utf8');
fs.writeFileSync(wwInventoryPath, `${JSON.stringify(wwData.WW_INVENTORY, null, 2)}\n`, 'utf8');
const wwGalleryData = {
  characters: wwCharacters.map(character => ({
    id: character.id,
    name: character.name,
    originalName: character.originalName,
    folderName: character.folderName,
    gameId: 'ww',
    attribute: character.attribute,
    weaponType: character.weaponType,
    rarity: character.rarity,
    releaseVersion: character.releaseVersion,
    isRover: character.isRover
  })),
  inventoryCount: Object.keys(wwData.WW_INVENTORY || {}).length
};
fs.writeFileSync(wwGalleryPath, `${JSON.stringify(wwGalleryData, null, 2)}\n`, 'utf8');
const wwRecommendationData = {
  characters: wwGalleryData.characters,
  guides: notionWwGuides.map(guide => ({
    id: guide.id,
    name: guide.name,
    weapons: guide.weapons,
    mainEchoes: guide.mainEchoes,
    variantMainEchoes: guide.variants?.[0]?.mainEchoes || []
  }))
};
fs.writeFileSync(wwRecommendationsPath, `${JSON.stringify(wwRecommendationData, null, 2)}\n`, 'utf8');

const total = Object.values(searchData).reduce((sum, items) => sum + items.length, 0);
console.log(`[Search] Generated lightweight search index with ${total} records.`);
console.log(`[Search] HSR: ${hsrCharacters.length} characters, ${hsrLightcones.length} light cones, ${hsrGuides.length} guides.`);
console.log(`[Home] Generated lightweight stats for ${homeStats.global.characters} characters and ${homeStats.global.guides} guides.`);
console.log(`[WW] Generated ${wwCharacters.length} merged character detail records.`);
