// @vitest-environment node
import { expect, it } from 'vitest';
import { load } from 'cheerio';
import { serializeJsonLd } from '../common-hub/utils/serializeJsonLd.js';

it.each([undefined, 2])('preserves JSON values without permitting script boundary escapes (indent %s)', space => {
  const data = { name: '한글 & "인용"', description: '</script><script>bad()</script>\u2028\u2029' };
  const json = serializeJsonLd(data, space);
  expect(json).not.toContain('<');
  expect(JSON.parse(json)).toEqual(data);
  const $ = load(`<head><script type="application/ld+json">${json}</script></head>`);
  expect($('script')).toHaveLength(1);
  expect(JSON.parse($('script').text())).toEqual(data);
});
