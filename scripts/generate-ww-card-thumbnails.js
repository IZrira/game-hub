import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gallery = JSON.parse(await fs.readFile(path.join(root, 'ww-hub/data/generated/gallery.json'), 'utf8'));
const directory = path.join(root, 'public/assets/thumbnails/ww');
const manifestPath = path.join(root, 'ww-hub/data/generated/card-thumbnails.json');
const encode = value => encodeURIComponent(value.normalize('NFC')).replace(/\(/g, '%28').replace(/\)/g, '%29');
const urls = [...new Set(gallery.characters.filter(character => !character.isRover && !character.name.includes('방랑자'))
  .map(character => character.folderName || character.name)
  .map(name => `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/skills/${encode(name)}/${encode(name)}.webp`))];
const manifest = {};
const download = async url => {
  const sources = [url, url.replace('cdn.jsdelivr.net', 'fastly.jsdelivr.net'),
    url.replace('https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main', 'https://raw.githubusercontent.com/IZrira/riragameinfo/main')];
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
let originalBytes = 0;
let thumbnailBytes = 0;
await fs.mkdir(directory, { recursive: true });
// Run explicitly when source images change; builds use checked-in assets without network access.
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(urls.slice(offset, offset + 4).map(async url => {
    const source = await download(url);
    const thumbnail = await sharp(source).resize({ width: 384, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    const filename = `${createHash('sha256').update(thumbnail).digest('hex').slice(0, 20)}.webp`;
    await fs.writeFile(path.join(directory, filename), thumbnail);
    manifest[url] = `/assets/thumbnails/ww/${filename}`;
    originalBytes += source.length;
    thumbnailBytes += thumbnail.length;
  }));
  console.log(`Prepared ${Math.min(offset + 4, urls.length)}/${urls.length} thumbnails`);
}
const sortedManifest = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(manifestPath, `${JSON.stringify(sortedManifest, null, 2)}\n`);
console.log(JSON.stringify({ images: urls.length, originalBytes, thumbnailBytes }));
