import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = 'common-hub/data/generated/signature-equipment.json';

// Signature gear is usually recommended only by the character it was made for,
// so a "two or more recommenders" rule alone would drop it. This list is the
// data-backed definition used by isIndexableEquipment:
// 5-star HSR light cones, WW weapons and NTE arcs. For arcs the dedicatedChar
// field alone misses dedicated arcs that the guides name (e.g. 영원한 왈츠, 파디아).
export async function writeSignatureEquipment() {
  const result = await build({
    absWorkingDir: root,
    stdin: { contents: `export { SORTED_LIGHTCONE_DATA as default } from './hsr-hub/data/lightcones/index.ts';`, resolveDir: root, loader: 'ts' },
    bundle: true, platform: 'node', format: 'esm', write: false, logLevel: 'silent'
  });
  const lightcones = (await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)).default;
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  const names = list => [...new Set(list.map(item => String(item.name).normalize('NFC').trim()))].sort((a, b) => a.localeCompare(b, 'ko'));
  const signature = {
    lightcone: names(lightcones.filter(item => item.rarity === 5)),
    weapon: names(read('ww-hub/data/generated/weapons.json').filter(item => item.rarity === 5)),
    arc: names(read('nte-hub/data/generated/arcs.json').filter(item => item.rarity === 5 || item.dedicatedChar)),
  };
  fs.writeFileSync(path.join(root, OUTPUT), `${JSON.stringify(signature, null, 2)}\n`, 'utf8');
  console.log(`[Equipment] Signature gear: ${signature.lightcone.length} light cones, ${signature.weapon.length} weapons, ${signature.arc.length} arcs.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await writeSignatureEquipment();
