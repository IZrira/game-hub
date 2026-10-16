import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function writeHsrCharacterRuntime() {
  const result = await build({
    absWorkingDir: root,
    stdin: { contents: `
      import { CHARACTER_DATA as characters } from './hsr-hub/data/characters.ts';
      import { ashveil_en } from './hsr-hub/data/ashveil.ts';
      import castorice_en from './common-hub/castorice.ts';
      export default { characters, english: [ashveil_en, castorice_en] };
    `, resolveDir: root, loader: 'ts' },
    bundle: true, platform: 'node', format: 'esm', write: false, logLevel: 'silent'
  });
  const { characters, english } = (await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)).default;
  const directory = path.join(root, 'public/assets/data/hsr/characters');
  fs.mkdirSync(directory, { recursive: true });
  const manifest = {};
  for (const character of characters) {
    const alternate = english.find(item => item.id === character.id);
    const json = `${JSON.stringify({ character: { ...character, gameId: 'hsr' }, ...(alternate ? { english: { ...alternate, originalName: character.name } } : {}) })}\n`;
    const hash = createHash('sha256').update(json).digest('hex').slice(0, 12);
    const filename = `${character.id}.${hash}.json`;
    fs.writeFileSync(path.join(directory, filename), json, 'utf8');
    manifest[character.id] = `/assets/data/hsr/characters/${filename}`;
  }
  const generated = path.join(root, 'hsr-hub/data/generated');
  fs.writeFileSync(path.join(generated, 'character-runtime-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  // Preserve CHARACTER_DATA order, including the related-character recommendation order.
  fs.writeFileSync(path.join(generated, 'detail-character-summary.json'), `${JSON.stringify(characters.map(({ id, name, folderName, path, attribute }) => ({ id, name, folderName, path, attribute })), null, 2)}\n`);
  console.log(`[HSR] Generated ${characters.length} character detail runtime files.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await writeHsrCharacterRuntime();
