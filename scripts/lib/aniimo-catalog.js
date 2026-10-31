import fs from 'node:fs';
import path from 'node:path';

export function loadAniimoCatalog(rootDir) {
  const directory = path.join(rootDir, 'aniimo-hub', 'data');
  const legacy = JSON.parse(fs.readFileSync(path.join(directory, 'aniimo.json'), 'utf8'));
  const additionsPath = path.join(directory, 'wave-archipelago.json');
  const additions = fs.existsSync(additionsPath) ? JSON.parse(fs.readFileSync(additionsPath, 'utf8')) : [];
  const entries = [...legacy, ...additions];
  for (const field of ['name', 'identity']) {
    const values = entries.map(entry => field === 'identity' ? entry.id || entry.number : entry.name);
    if (new Set(values).size !== entries.length) throw new Error(`Duplicate Aniimo ${field}`);
  }
  for (const entry of additions) {
    if (entry.regionId !== '300301' || entry.id !== `wave-archipelago-${entry.number}`) {
      throw new Error(`Invalid Wave Archipelago identity: ${entry.name}`);
    }
  }
  return entries;
}
