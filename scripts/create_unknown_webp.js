import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createUnknownWebp() {
  // Valid 1x1 VP8L WebP binary image
  const webpBase64 = 'UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const buffer = Buffer.from(webpBase64, 'base64');
  const targetDir = path.resolve(__dirname, '../public/assets');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetPath = path.join(targetDir, 'unknown.webp');
  fs.writeFileSync(targetPath, buffer);
  console.log('[Assets] Created valid unknown.webp at:', targetPath);
}

if (process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url)) {
  createUnknownWebp();
}
