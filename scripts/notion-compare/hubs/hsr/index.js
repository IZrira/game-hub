// HSR hub: which Notion databases to read and how each is compared with the site data.
import fs from 'node:fs';
import path from 'node:path';
import { readDatabase, listRows } from '../../lib/notion.js';
import { loadSiteModule } from '../../lib/site-data.js';
import { compareCharacters } from './characters.js';
import { compareLightcones } from './lightcones.js';
import { compareRelics } from './relics.js';
import { compareGuides } from './guides.js';
import { compareParties } from './parties.js';

// Database ids are not secrets; env overrides keep parity with the sync script's settings.
export const HSR_DATABASES = {
  characters: process.env.NOTION_HSR_CHARACTER_DB_ID || '34f95fae3dc780608431d4624c086df7',
  lightcones: process.env.NOTION_HSR_LIGHTCONE_DB_ID || '34895fae3dc780139667e5a927743059',
  relics: process.env.NOTION_HSR_RELIC_DB_ID || '36f95fae3dc780c8802ef922df4e4a6c',
  guides: process.env.NOTION_HSR_GUIDES_DB_ID || '36f95fae3dc780c8abe7dfad2cfebc24',
  parties: process.env.NOTION_HSR_PARTY_DB_ID || '37395fae3dc78094995be08179dc9e31',
};

const SITE_ENTRY = `
  import { CHARACTER_DATA } from './hsr-hub/data/characters.ts';
  import { SORTED_LIGHTCONE_DATA } from './hsr-hub/data/lightcones/index.ts';
  import { RELIC_DATA } from './hsr-hub/data/relics.ts';
  import { ORNAMENT_DATA } from './hsr-hub/data/ornaments.ts';
  import { HSR_PARTIES } from './hsr-hub/data/parties/index.ts';
  export default { characters: CHARACTER_DATA, lightcones: SORTED_LIGHTCONE_DATA, relics: RELIC_DATA, ornaments: ORNAMENT_DATA, parties: HSR_PARTIES };
`;

function loadCharacterLocale(root) {
  const dir = path.join(root, 'common-hub', 'locales', 'hsr', 'characters');
  if (!fs.existsSync(dir)) return {};
  return Object.assign({}, ...fs.readdirSync(dir).filter(f => f.endsWith('_ko.json')).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))));
}

export const hsr = {
  id: 'hsr',
  name: '붕괴: 스타레일',
  async compare({ root, notion, list, log }) {
    const site = await loadSiteModule(root, SITE_ENTRY);
    const sources = {};
    for (const [key, id] of Object.entries(HSR_DATABASES)) {
      log(`  Notion ${key} 읽는 중…`);
      sources[key] = key === 'guides' ? await listRows(notion, id) : await readDatabase(notion, id);
    }
    const add = list.add;
    compareCharacters({ pages: sources.characters, characters: site.characters, locale: loadCharacterLocale(root), add });
    compareLightcones({ pages: sources.lightcones, lightcones: site.lightcones, add });
    compareRelics({ pages: sources.relics, relics: site.relics, ornaments: site.ornaments, add });
    log('  Notion 공략 본문 읽는 중…');
    await compareGuides({ root, notion, rows: sources.guides, add });
    compareParties({ pages: sources.parties, parties: site.parties, add });
    return {
      databases: Object.fromEntries(Object.entries(sources).map(([k, rows]) => [k, { pages: rows.length, lastEdited: rows.map(r => r.edited).sort().pop() }])),
    };
  },
};
