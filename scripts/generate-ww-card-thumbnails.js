import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gallery = JSON.parse(await fs.readFile(path.join(root, 'ww-hub/data/generated/gallery.json'), 'utf8'));
const directory = path.join(root, 'public/assets/thumbnails/ww');
const manifestPath = path.join(root, 'ww-hub/data/generated/card-thumbnails.json');
const bundled = await build({ absWorkingDir: root, stdin: { contents: "export { resolveRoverImageInfo, CDN_URL, safeEncodeURIComponent } from './common-hub/utils/assetManager.ts';", resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', write: false, logLevel: 'silent' });
const { resolveRoverImageInfo, CDN_URL, safeEncodeURIComponent: encode } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
const urls = [...new Set(gallery.characters.flatMap(character => {
  const name = character.folderName || character.name;
  const rover = resolveRoverImageInfo(name, character.attribute, 'f');
  return rover ? [rover.url.split('?')[0], resolveRoverImageInfo(name, character.attribute, 'm').url.split('?')[0]]
    : [`${CDN_URL}/ww%20images/skills/${encode(name)}/${encode(name)}.webp`];
}))];
const previous = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const refresh = process.argv.includes('--refresh');
const manifest = {};
const download = async url => {
  const sources = [url, url.replace('https://raw.githubusercontent.com/IZrira/riragameinfo/main',
    'https://fastly.jsdelivr.net/gh/IZrira/riragameinfo@main')];
  let lastError;
  for (const sourceUrl of sources) {
    try {
      const response = await fetch(`${sourceUrl}?v=20260912_2`, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`Source image failed: ${response.status} ${sourceUrl}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) { lastError = error; }
  }
  throw lastError;
};
let downloadedSources = 0;
let smallBytes = 0;
let largeBytes = 0;
await fs.mkdir(directory, { recursive: true });
// Use --refresh after source art changes; builds use checked-in assets without network access.
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(urls.slice(offset, offset + 4).map(async url => {
    const oldPath = typeof previous[url] === 'string' ? previous[url] : previous[url]?.large;
    let large;
    if (!refresh && oldPath && /^\/assets\/thumbnails\/ww\/[a-f0-9]{20}\.webp$/.test(oldPath)) {
      try { large = await fs.readFile(path.join(directory, path.basename(oldPath))); } catch { /* Download a missing checked-in thumbnail's source. */ }
    }
    if (!large) {
      const source = await download(url);
      downloadedSources += 1;
      large = await sharp(source).resize({ width: 384, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    }
    const small = await sharp(large).resize({ width: 192, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    const writeThumbnail = async buffer => {
      const filename = `${createHash('sha256').update(buffer).digest('hex').slice(0, 20)}.webp`;
      await fs.writeFile(path.join(directory, filename), buffer);
      return `/assets/thumbnails/ww/${filename}`;
    };
    const smallMetadata = await sharp(small).metadata();
    const largeMetadata = await sharp(large).metadata();
    manifest[url] = { small: await writeThumbnail(small), large: await writeThumbnail(large), smallWidth: smallMetadata.width, largeWidth: largeMetadata.width };
    smallBytes += small.length;
    largeBytes += large.length;
  }));
  console.log(`Prepared ${Math.min(offset + 4, urls.length)}/${urls.length} thumbnails`);
}
const sortedManifest = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(manifestPath, `${JSON.stringify(sortedManifest, null, 2)}\n`);
console.log(JSON.stringify({ images: urls.length, downloadedSources, smallBytes, largeBytes }));
