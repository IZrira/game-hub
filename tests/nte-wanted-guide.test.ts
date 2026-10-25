import fs from 'node:fs';
import { expect, it } from 'vitest';

const articles = JSON.parse(fs.readFileSync('common-hub/data/guideArticles.json', 'utf8'));
const matches = articles.filter((item: { gameId: string; slug: string }) => item.gameId === 'nte' && item.slug === 'wanted-and-jail-guide');

it('publishes one wanted guide with the approved draft and no external source links', () => {
  expect(matches).toHaveLength(1);
  const draft = fs.readFileSync('docs/drafts/nte-wanted-guide.md', 'utf8').replace(/^# .*\r?\n\r?\n/, '').trim();
  expect(matches[0].status).toBe('published');
  expect(matches[0].content).toBe(draft);
  expect(matches[0].sources).toEqual([]);
  expect(draft).not.toMatch(/https?:\/\/|\|/);
  expect(matches[0].applicableVersion).toContain('실전 검증 전');
});

it('preserves the key conditions reviewed against the provided document', () => {
  const body = matches[0].content;
  for (const fact of ['파티원 4명이 모두 쓰러져야', '99레벨', '유치장 내 일과 기준 5일', '30,000폰즈', '30초', '다음 날 야외 활동 시간', '합계 4장 이상', '쪽문 열쇠', '정식 탈출 루트 보상은 없습니다']) {
    expect(body).toContain(fact);
  }
  expect(body).toContain('### 별 4개');
  expect(body).toContain('## 탈출 루트 5개');
});
