// 외부 위키 원문의 「최근 수정 시각」을 기록해 두고, 바뀐 문서를 알려 준다.
// 읽기 전용: 원문 페이지를 GET으로 받아 시각만 비교한다. 프로젝트 데이터·Notion은 바꾸지 않는다.
//   npm run check:sources                     바뀐 문서 목록 (바뀐 것이 있으면 종료 코드 1)
//   npm run check:sources -- --mark <이름>    다시 반영한 뒤 그 문서의 기록 시각을 현재 값으로 갱신
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const registryFile = path.join(here, 'sources.json');
const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const markIndex = process.argv.indexOf('--mark');
const markName = markIndex > 0 ? process.argv[markIndex + 1] : null;

async function currentRevision(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (source revision check)' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const html = await response.text();
  // 「최근 수정 시각」 옆의 <time datetime="...">이 문서 수정 시각이다.
  const near = html.slice(Math.max(0, html.indexOf('최근 수정 시각')), html.indexOf('최근 수정 시각') + 400);
  const match = near.match(/datetime="([^"]+)"/) || html.match(/datetime="([^"]+)"/);
  if (!match) throw new Error('수정 시각을 찾지 못함');
  return new Date(match[1]).toISOString();
}

const kst = iso => new Date(new Date(iso).getTime() + 9 * 3600e3).toISOString().replace('T', ' ').slice(0, 19) + ' KST';

let changed = 0;
for (const entry of registry.sources) {
  if (markName && entry.name !== markName) continue;
  try {
    const now = await currentRevision(entry.url);
    if (markName) {
      entry.revision = now;
      entry.recordedAt = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // KST 날짜
      console.log(`기록 갱신: ${entry.name} → ${kst(now)}`);
      continue;
    }
    if (now !== entry.revision) {
      changed++;
      console.log(`변경됨: ${entry.name} (${entry.game}) 기록 ${kst(entry.revision)} → 현재 ${kst(now)}`);
      console.log(`  다시 반영할 곳: ${entry.targets.join(', ')}`);
    } else {
      console.log(`그대로: ${entry.name} (${kst(now)})`);
    }
  } catch (error) {
    console.log(`확인 실패: ${entry.name} - ${error.message}`);
  }
}

if (markName) fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2) + '\n');
else console.log(changed ? `\n바뀐 문서 ${changed}개. 내용을 다시 확인해 반영한 뒤 --mark <이름>으로 기록을 갱신하세요.` : '\n바뀐 문서가 없습니다.');
process.exitCode = changed ? 1 : 0;
