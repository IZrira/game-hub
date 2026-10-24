import fs from 'node:fs';
import { expect, it } from 'vitest';

const articles = JSON.parse(fs.readFileSync('common-hub/data/guideArticles.json', 'utf8'));
const matches = articles.filter((item: { gameId: string; slug: string }) => item.gameId === 'hsr' && item.slug === 'content-reset-guide');

it('publishes exactly one reset guide with the reviewed draft body', () => {
  expect(matches).toHaveLength(1);
  const draft = fs.readFileSync('docs/drafts/hsr-content-reset-guide.md', 'utf8').replace(/^# .*\r?\n\r?\n/, '').trim();
  expect(matches[0].status).toBe('published');
  expect(matches[0].content).toBe(draft);
  expect(matches[0].sources).toEqual([]);
  expect(draft).not.toMatch(/https?:\/\/|\|/);
});

it('separates support storage from daily earnings and preserves the cycle exception', () => {
  const body = matches[0].content;
  expect(body).toContain('신용 포인트 120,000까지 보관');
  expect(body).toContain('주간 획득 한도가 아니라 보관 한도');
  expect(body).toContain('하루 최대 10회');
  expect(body).toContain('1회당 신용 포인트 2,000');
  expect(body).toContain('5주로 운영되는 예외');
  expect(body).toContain('34번째 판의 첫 대상');
});
