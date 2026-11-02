import fs from 'node:fs';
import { expect, it } from 'vitest';

const publicSources = ['aniimo-hub/pages/CharacterDetail.tsx', 'aniimo-hub/pages/Gallery.tsx', 'scripts/prerender-meta.js', 'common-hub/data/guideArticles.json'];

it('cites the official encyclopedia by check date instead of naming or linking the wiki', () => {
  for (const file of publicSources) {
    const source = fs.readFileSync(file, 'utf8');
    expect(source).not.toContain('공식 위키');
    expect(source).not.toMatch(/href=\{[^}]*sourceUrl/);
  }
  expect(fs.readFileSync('aniimo-hub/pages/CharacterDetail.tsx', 'utf8')).toContain('공식 도감 기준 · 확인일 {item.checkedAt}');
  expect(fs.readFileSync('aniimo-hub/pages/Gallery.tsx', 'utf8')).toContain('공식 도감 기준 · 항목별 확인일');
});

it('links each prerendered Aniimo entry to the type chart and shows its check date', () => {
  const source = fs.readFileSync('scripts/prerender-meta.js', 'utf8');
  expect(source).toContain('<a href="/gallery/aniimo/type-chart">원소 상성표 보기</a>');
  expect(source).toContain('공식 도감 기준 · 확인일 ${escapeHtml(item.checkedAt)}');
});
