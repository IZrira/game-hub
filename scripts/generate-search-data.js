import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const notionPath = path.join(projectRoot, 'common-hub', 'data', 'notion-data.json');
const outputPath = path.join(projectRoot, 'common-hub', 'data', 'search', 'notion-search.json');
const notionData = JSON.parse(fs.readFileSync(notionPath, 'utf8'));

const readSourceFiles = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const target = path.join(directory, entry.name);
  if (entry.isDirectory()) return readSourceFiles(target);
  return entry.name.endsWith('.ts') && entry.name !== 'index.ts' ? [target] : [];
});

const readProperty = (source, property) => {
  const match = source.match(new RegExp(`^[ \\t]*(?:["']${property}["']|${property})\\s*:\\s*["']([^"']+)["']`, 'm'));
  return match?.[1] || '';
};

const hsrCharacterDir = path.join(projectRoot, 'hsr-hub', 'data', 'characters', 'hsr');
const hsrCharacters = readSourceFiles(hsrCharacterDir).map(file => {
  const source = fs.readFileSync(file, 'utf8');
  return {
    id: readProperty(source, 'id'),
    name: readProperty(source, 'name'),
    gameId: 'hsr',
    attribute: readProperty(source, 'attribute'),
    path: readProperty(source, 'path')
  };
}).filter(item => item.id && item.name);

const lightconeDir = path.join(projectRoot, 'hsr-hub', 'data', 'lightcones');
const hsrLightcones = readSourceFiles(lightconeDir).flatMap(file => {
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
      summary: item.briefInfo || ''
    })),
  wwWeapons: notionData
    .filter(item => item.type && wwWeaponTypes.has(item.type) && !excludedWwSources.has(item.dbSource))
    .map(item => ({ id: item.id, name: item.name, type: item.type })),
  wwGuides: notionData
    .filter(item => item.dbSource === 'ww_guides')
    .map(item => ({ id: item.id, name: item.name || item.id.replace(/_세팅_공략|_공략/g, '').trim() })),
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
  nteArcs: notionData
    .filter(item => item.dbSource === 'nte_arcs' || item.dbSource === 'nte_weapons' || nteArcTypes.has(item.type || ''))
    .map(item => ({ id: item.id, name: item.name, type: item.type || '' }))
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(searchData, null, 2)}\n`, 'utf8');

const total = Object.values(searchData).reduce((sum, items) => sum + items.length, 0);
console.log(`[Search] Generated lightweight search index with ${total} records.`);
console.log(`[Search] HSR: ${hsrCharacters.length} characters, ${hsrLightcones.length} light cones, ${hsrGuides.length} guides.`);
