// Composes a character's "EX 성혼" scene background from the separate layer images nanoka.cc
// ships (AvtarRankDLCDetailBg2~5 + BgDeco1~5). The game's own asset bundle provides these as
// separate transparent layers (for its own parallax effect) rather than one merged picture, so
// nanoka.cc stacks them with CSS. This script reads a full "Save As > Webpage, Complete" copy of
// that page (the matching "<name>_files" folder sits next to the .html) and composites the same
// layers into a single flattened image.
//
//   node scripts/compose-ex-background.js <saved.html> <out.webp> [--width 1600] [--height 1000]
//
// The output canvas's aspect ratio is the visible card's (8:5 by default); each layer's width/left/
// top percentages (read straight from the page's inline styles) are resolved against that canvas,
// matching how the browser resolves percentages for an absolutely positioned child.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [, , htmlPath, outPath, ...rest] = process.argv;
if (!htmlPath || !outPath) {
  console.log('Usage: node scripts/compose-ex-background.js <saved.html> <out.webp> [--width 1600] [--height 1000]');
  process.exit(1);
}
const flag = (name, fallback) => {
  const i = rest.indexOf(name);
  return i >= 0 ? Number(rest[i + 1]) : fallback;
};
const CANVAS_WIDTH = flag('--width', 1600);
const CANVAS_HEIGHT = flag('--height', 1000);

const html = fs.readFileSync(htmlPath, 'utf8');
const filesDir = htmlPath.replace(/\.html?$/i, '_files');
if (!fs.existsSync(filesDir)) {
  throw new Error(`Expected the saved page's asset folder next to it: ${filesDir}`);
}

// Pull every "scene" layer <img> in document order (DOM order is paint order: first = bottom).
const layerRe = /<img[^>]*class="layer[^"]*"[^>]*>/g;
const attrRe = (name) => new RegExp(`${name}="([^"]*)"`);
const styleNumRe = (prop) => new RegExp(`${prop}:\\s*([\\d.]+)%`);

const layers = [];
for (const tag of html.match(layerRe) || []) {
  const src = tag.match(attrRe('src'))?.[1];
  const style = tag.match(attrRe('style'))?.[1] || '';
  const width = Number(style.match(styleNumRe('width'))?.[1]);
  const left = Number(style.match(styleNumRe('left'))?.[1]);
  const top = Number(style.match(styleNumRe('top'))?.[1]);
  if (!src || !Number.isFinite(width) || !Number.isFinite(left) || !Number.isFinite(top)) continue;
  const fileName = decodeURIComponent(src.replace(/^\.\//, ''));
  layers.push({ file: path.join(path.dirname(htmlPath), fileName), width, left, top });
}
if (!layers.length) throw new Error('No "scene" layer <img> tags found — is this the right saved page?');

console.log(`Found ${layers.length} layers:`);
for (const l of layers) console.log(`  ${path.basename(l.file)}  width=${l.width}%  left=${l.left}%  top=${l.top}%`);

const composites = [];
for (const layer of layers) {
  if (!fs.existsSync(layer.file)) throw new Error(`Missing layer file: ${layer.file}`);
  const meta = await sharp(layer.file).metadata();
  const targetW = Math.max(1, Math.round((layer.width / 100) * CANVAS_WIDTH));
  const targetH = Math.max(1, Math.round(targetW * (meta.height / meta.width)));
  const resized = await sharp(layer.file).resize(targetW, targetH).toBuffer();
  const centerX = (layer.left / 100) * CANVAS_WIDTH;
  const centerY = (layer.top / 100) * CANVAS_HEIGHT;
  composites.push({
    input: resized,
    left: Math.round(centerX - targetW / 2),
    top: Math.round(centerY - targetH / 2)
  });
}

await sharp({ create: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(composites)
  .webp({ quality: 92 })
  .toFile(outPath);

console.log(`\nComposited -> ${outPath} (${CANVAS_WIDTH}x${CANVAS_HEIGHT})`);
