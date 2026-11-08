import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RUNTIME_DIRECTORY = 'public/assets/data/hsr/lightcones';

// One hashed JSON file per light cone, so a light cone detail page downloads a
// single record instead of bundling every light cone and character.
// Light cone ids contain Korean text, so the file name is the content hash alone.
export async function writeHsrLightconeRuntime() {
  const result = await build({
    absWorkingDir: root,
    stdin: { contents: `export { SORTED_LIGHTCONE_DATA as default } from './hsr-hub/data/lightcones/index.ts';`, resolveDir: root, loader: 'ts' },
    bundle: true, platform: 'node', format: 'esm', write: false, logLevel: 'silent'
  });
  const lightcones = (await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)).default;
  const directory = path.join(root, RUNTIME_DIRECTORY);
  // The directory only holds files generated here (gitignored); drop stale hashes.
  fs.rmSync(directory, { recursive: true, force: true });
  fs.mkdirSync(directory, { recursive: true });
  const manifest = {};
  for (const lightcone of lightcones) {
    if (manifest[lightcone.name]) throw new Error(`Duplicate HSR light cone name: ${lightcone.name}`);
    const json = `${JSON.stringify({ lightcone: { ...lightcone, gameId: 'hsr' } })}\n`;
    const filename = `${createHash('sha256').update(json).digest('hex').slice(0, 16)}.json`;
    fs.writeFileSync(path.join(directory, filename), json, 'utf8');
    manifest[lightcone.name] = `/assets/data/hsr/lightcones/${filename}`;
  }
  fs.writeFileSync(path.join(root, 'hsr-hub/data/generated/lightcone-runtime-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`[HSR] Generated ${lightcones.length} light cone detail runtime files.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await writeHsrLightconeRuntime();
