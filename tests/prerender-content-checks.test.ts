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
it('rejects generic NTE party prose or truncated parties even when the text floor is satisfied', () => {
  expect(inspectPrerenderContent(wrap(full), '/gallery/nte/parties').problems)
    .toContain('NTE party recommendations missing from initial article');
  const party = (count: number) => `<article><section data-nte-party="one">${Array.from({ length: count }, () => '<li data-nte-member>멤버</li>').join('')}</section></article>`;
  expect(inspectPrerenderContent(wrap(party(3)), '/gallery/nte/parties').problems)
    .toContain('NTE initial party must retain all four members');
  expect(inspectPrerenderContent(wrap(party(4)), '/gallery/nte/parties').problems).toEqual([]);
});
