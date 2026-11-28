// GF2 파츠 교체 스킨의 파츠 이미지 목록을 만든다.
// 이미지 저장소(IZrira/riragameinfo)의 `gf2 images/skills/<인형>/skins/<스킨>/` 폴더를 읽어
// gf2-hub/data/generated/skin-parts.json에 { 인형 폴더: { 스킨: [파츠 파일 이름] } }로 저장한다.
// 사이트는 저장소 폴더를 직접 나열할 수 없어서 이 목록으로 파츠 이미지를 그린다.
// 실행: npm run generate:gf2-skin-parts  (읽기 전용, 빌드에는 포함하지 않는다)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = path.join(ROOT_DIR, 'gf2-hub', 'data', 'generated', 'skin-parts.json');
const API = 'https://api.github.com/repos/IZrira/riragameinfo';
const PREFIX = 'gf2 images/skills/';

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'rira-game-hub-build' };
if (process.env.GITHUB_PAT_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_PAT_TOKEN}`;

const getJson = async url => {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

// 파츠1, 파츠2 … 파츠10 순서로 두고, 특수 효과는 뒤에 둔다.
const partOrder = name => {
  const match = name.match(/^파츠(\d+)$/);
  return match ? Number(match[1]) : 1000;
};

const main = async () => {
  const branch = await getJson(`${API}/branches/main`);
  const tree = await getJson(`${API}/git/trees/${branch.commit.commit.tree.sha}?recursive=1`);
  if (tree.truncated) throw new Error('저장소 트리가 잘려서 전체 목록을 확인할 수 없습니다.');
  const result = {};
  for (const item of tree.tree) {
    if (item.type !== 'blob' || !item.path.startsWith(PREFIX)) continue;
    const parts = item.path.slice(PREFIX.length).normalize('NFC').split('/');
    if (parts.length !== 4 || parts[1] !== 'skins' || !parts[3].endsWith('.webp')) continue;
    const [folder, , skin, file] = parts;
    const name = file.replace(/\.webp$/, '');
    if (name === '대표') continue;
    ((result[folder] ||= {})[skin] ||= []).push(name);
  }
  const sorted = Object.fromEntries(Object.keys(result).sort().map(folder => [folder, Object.fromEntries(
    Object.keys(result[folder]).sort().map(skin => [skin, result[folder][skin].sort((a, b) => partOrder(a) - partOrder(b) || a.localeCompare(b, 'ko'))]),
  )]));
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(sorted, null, 2)}\n`);
  const count = Object.values(sorted).reduce((sum, skins) => sum + Object.keys(skins).length, 0);
  console.log(`[gf2-skin-parts] ${count} skins written to ${path.relative(ROOT_DIR, OUT_FILE)}`);
};

main().catch(error => { console.error('[gf2-skin-parts]', error.message); process.exit(1); });
