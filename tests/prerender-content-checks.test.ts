import { expect, it } from 'vitest';
import { inspectPrerenderContent } from '../scripts/lib/prerender-content-checks.js';

const route = '/gallery/hsr/guides/damage-formula-guide';
const wrap = (article: string) => `<div class="prerender-shell"><nav>${'메뉴'.repeat(500)}</nav>${article}<footer>${'푸터'.repeat(500)}</footer></div>`;
const full = `<article><h1>제목</h1><p>${'고유 본문 설명. '.repeat(60)}</p></article>`;

it('accepts complete guide body without changing indexing policy', () => {
  expect(inspectPrerenderContent(wrap(full), route).problems).toEqual([]);
});
it.each(['', '<article><h1>제목</h1></article>', `<article><nav>${'메뉴'.repeat(500)}</nav><h1>${'제목'.repeat(500)}</h1></article>`])('does not let navigation or footer hide missing guide content: %s', article => {
  expect(inspectPrerenderContent(wrap(article), route).problems.length).toBeGreaterThan(0);
});
it('does not apply the guide-body floor to equipment or hub pages', () => {
  expect(inspectPrerenderContent(wrap(''), '/gallery/hsr/lightcone/풍작').problems).toEqual([]);
  expect(inspectPrerenderContent(wrap(''), '/gallery/hsr/guides').problems).toEqual([]);
});
it('rejects duplicate AdSense loaders with different query parameters', () => {
  const script = (client: string) => `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}"></script>`;
  expect(inspectPrerenderContent(wrap(full) + script('one'), route).problems).toEqual([]);
  expect(inspectPrerenderContent(wrap(full) + script('one') + script('two'), route).problems).toContain('Duplicate AdSense loader scripts (2)');
});
