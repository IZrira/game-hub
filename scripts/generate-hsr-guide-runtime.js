import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
import { sanitizePublicGuideData } from './lib/public-guide-links.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const normalize = value => String(value || '').replace(/\s+/g, '').replace(/[•·]/g, '').replace(/쫒/g, '쫓').normalize('NFC');

export function createHsrGuideRuntime(character, sources) {
  const searchName = normalize(character.name || character.folderName);
  const guide = sources.guides.find(guide => guide.characterName === character.name
    || guide.characterName === character.folderName || normalize(guide.characterName) === searchName
    || normalize(guide.characterName) === normalize(character.id));
  if (!guide) return null;
  const guideText = normalize(JSON.stringify(guide));
  const related = entries => entries.filter(entry => guideText.includes(normalize(entry.name)));
  return sanitizePublicGuideData({
    guide,
    lightcones: related(sources.lightcones).map(({ name, path, fileName, folderName }) => ({ name, path, fileName, folderName })),
    relics: related(sources.relics).map(({ name, type }) => ({ name, type })),
    ornaments: related(sources.ornaments).map(({ name, type }) => ({ name, type })),
    parties: sources.parties.filter(party => party.members.some(member => normalize(member.name) === normalize(character.folderName || character.name)))
  });
}

export async function writeHsrGuideRuntime() {
  const result = await build({
    absWorkingDir: root,
    stdin: {
      contents: `
        import { HSR_CHARACTER_GUIDES as guides } from './hsr-hub/data/guides/index.ts';
        import { SORTED_LIGHTCONE_DATA as lightcones } from './hsr-hub/data/lightcones/index.ts';
        import { RELIC_DATA as relics } from './hsr-hub/data/relics.ts';
        import { ORNAMENT_DATA as ornaments } from './hsr-hub/data/ornaments.ts';
        import { HSR_PARTIES as parties } from './hsr-hub/data/parties/index.ts';
        export default { guides, lightcones, relics, ornaments, parties };
      `,
      resolveDir: root, sourcefile: 'hsr-guide-runtime.ts', loader: 'ts'
    },
    bundle: true, platform: 'node', format: 'esm', write: false, logLevel: 'silent'
  });
  const sources = (await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)).default;
  const characters = JSON.parse(fs.readFileSync(path.join(root, 'hsr-hub/data/generated/character-summary.json'), 'utf8'));
  const directory = path.join(root, 'public/assets/data/hsr/guides');
  fs.mkdirSync(directory, { recursive: true });
  const manifest = {};
  for (const character of characters) {
    const runtime = createHsrGuideRuntime(character, sources);
    if (!runtime) continue;
    const json = `${JSON.stringify(runtime)}\n`;
    const hash = createHash('sha256').update(json).digest('hex').slice(0, 12);
    const filename = `${character.id}.${hash}.json`;
    fs.writeFileSync(path.join(directory, filename), json, 'utf8');
    manifest[character.id] = `/assets/data/hsr/guides/${filename}`;
  }
  fs.writeFileSync(path.join(root, 'hsr-hub/data/generated/guide-runtime-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`[HSR] Generated ${Object.keys(manifest).length} character guide runtime files.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await writeHsrGuideRuntime();
