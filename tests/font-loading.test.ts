// @vitest-environment node
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { load } from 'cheerio';

it('keeps startup fonts aligned with the app without requesting an unused Korean webfont', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../common-hub/index.css', import.meta.url), 'utf8');
  const $ = load(html);
  const preload = $('link[rel="preload"][as="style"]').toArray()
    .find(element => $(element).attr('href')?.startsWith('https://fonts.googleapis.com/'));
  expect(preload).toBeDefined();
  const url = new URL($(preload!).attr('href')!);
  expect(url.searchParams.getAll('family')).toEqual(['Inter:wght@400;500;600;700']);
  expect(url.searchParams.get('display')).toBe('swap');
  expect($(preload!).attr('onload')).toContain("this.rel='stylesheet'");
  expect($('noscript').html()).toContain($(preload!).attr('href'));
  expect(html).not.toContain('Noto Sans KR');
  const fontStack = css.match(/--font-sans:\s*([^;]+);/)?.[1];
  expect(fontStack).toBeDefined();
  expect(html).toContain(`font-family: ${fontStack};`);
});
