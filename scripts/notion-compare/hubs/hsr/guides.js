// HSR character guides: Notion "HSR 캐릭터 공략 DB" against hsr-hub/data/guides.
// The guide parser and comparison rules are the sync script's own (scripts/fetch-notion-data.js),
// so this comparison flags exactly what a sync would consider different.
import fs from 'node:fs';
import path from 'node:path';
import { pageMarkdown, pause } from '../../lib/notion.js';
import { parseHsrGuideMarkdown, readLocalHsrGuide, normalizeHsrGuideForComparison } from '../../../fetch-notion-data.js';
import { diffDeep } from '../../lib/diff.js';

const LABELS = [
  [/bestOrnaments/g, '추천 장신구'], [/bestLightCones/g, '추천 광추'], [/bestRelics/g, '추천 유물'],
  [/targetStats/g, '목표 스탯'], [/mainStats/g, '주옵션'], [/subStats/g, '부옵션'], [/skillPriority/g, '스킬 우선순위'],
  [/synergyCharacters/g, '추천 파티'], [/patchVersion/g, '버전'], [/variants/g, '세팅'],
  [/\.note/g, ' 설명'], [/\.name/g, ' 이름'], [/\.value/g, ' 값'], [/\.body/g, ' 몸통'], [/\.feet/g, ' 신발'], [/\.sphere/g, ' 구체'], [/\.rope/g, ' 매듭'],
];
const label = p => LABELS.reduce((s, [re, to]) => s.replace(re, to), p);

export async function compareGuides({ root, notion, rows, add }) {
  const seen = new Set();
  for (const row of rows) {
    await pause();
    const guide = parseHsrGuideMarkdown(row.title, await pageMarkdown(notion, row.id));
    const keyName = (guide.fileName || guide.characterName || row.id).trim().toLocaleLowerCase('ko-KR');
    if (seen.has(keyName)) { add({ db: '공략', target: guide.characterName || row.title, cat: 'Notion 형식', text: `같은 캐릭터 공략 페이지가 두 개 이상 있음 ("${row.title}")`, hint: 'Notion만 정리' }); continue; }
    seen.add(keyName);
    const file = guide.fileName && path.join(root, 'hsr-hub', 'data', 'guides', guide.fileName);
    const target = guide.characterName || row.title;
    if (!file || !fs.existsSync(file)) {
      add({ db: '공략', target, sub: guide.fileName, cat: '사이트에 없음', text: `Notion 공략 "${row.title}"에 맞는 사이트 공략 파일이 없음`, hint: '동기화하면 새로 추가됨' });
      continue;
    }
    const diffs = [];
    diffDeep(normalizeHsrGuideForComparison(readLocalHsrGuide(file)), normalizeHsrGuideForComparison(guide, true), '', diffs);
    for (const d of diffs) {
      const typo = /피헤|\s{2,}|\s:$/.test(d.b);
      add({ db: '공략', target, sub: guide.fileName, cat: label(d.path), notion: d.b, site: d.a, hint: typo ? 'Notion 오타 의심' : undefined });
    }
  }
}
