// @vitest-environment node
import { expect, it } from 'vitest';
import { inspectPrerenderHead } from '../scripts/lib/prerender-head-checks.js';

const head = `<title>제목 &amp; 설명</title><meta content="설명" name="description">
  <link href="https://riragamehub.com/gallery/nte/parties?a=1&amp;b=2" rel="canonical">
  <meta name="robots" content="index, follow"><meta property="og:url" content="/one">`;
it('reads semantic head metadata independently of attribute order and HTML entities', () => {
  expect(inspectPrerenderHead(`<html><head>${head}</head><body><h1>본문</h1></body></html>`)).toEqual({
    problems: [], title: '제목 & 설명', description: '설명', canonical: 'https://riragamehub.com/gallery/nte/parties?a=1&b=2',
  });
});
it.each([
  ['<title>다른 제목</title>', 'title'],
  ['<link rel="canonical" href="https://riragamehub.com/">', 'canonical'],
  ['<meta name="description" content="다른 설명">', 'description'],
  ['<meta name="robots" content="noindex">', 'robots'],
  ['<meta property="og:url" content="/other">', 'og:url'],
])('rejects duplicates instead of accepting the first matching tag: %s', (extra, label) => {
  expect(inspectPrerenderHead(`<head>${head}${extra}</head>`).problems.join(' ')).toContain(label);
});
it('requires public-page title, description and canonical without requiring a robots tag', () => {
  expect(inspectPrerenderHead('<head></head>').problems).toHaveLength(3);
  expect(inspectPrerenderHead(`<head>${head.replace('<meta name="robots" content="index, follow">', '')}</head>`).problems).toEqual([]);
});
