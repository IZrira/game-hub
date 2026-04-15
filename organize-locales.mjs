import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commonHubPath = path.join(__dirname, 'common-hub');
const localesPath = path.join(commonHubPath, 'locales');

// 1. 생성할 스타레일(hsr) 및 명조(ww) 폴더 구조
const dirs = [
  'hsr/characters',
  'ww/characters'
];

dirs.forEach(dir => {
  const fullPath = path.join(localesPath, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log(`[폴더 생성됨] ${fullPath}`);
});

// 2. 기존 파일 자동 이동 (예: ashveil_en.json)
const oldPath = path.join(commonHubPath, 'ashveil_en.json');
const newPath = path.join(localesPath, 'hsr', 'characters', 'ashveil_en.json');

if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log(`\n[파일 이동 완료] ${oldPath} \n -> ${newPath}`);
}

console.log('\n✅ 다국어 번역(locales) 폴더 구조 정리가 완료되었습니다!');