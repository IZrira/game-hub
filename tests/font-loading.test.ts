// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { load } from 'cheerio';

const FONT_CSS = '/fonts/pretendard-1.3.9/pretendardvariable-dynamic-subset.css';

it('loads self-hosted Pretendard without blocking render and keeps startup and app font stacks aligned', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../common-hub/index.css', import.meta.url), 'utf8');
  const $ = load(html);
  const preload = $('link[rel="preload"][as="style"]').toArray().find(element => $(element).attr('href') === FONT_CSS);
  expect(preload).toBeDefined();
  expect($(preload!).attr('onload')).toContain("this.rel='stylesheet'");
  expect($('noscript').html()).toContain(FONT_CSS);
  // No third-party font requests: the font is served from this site (CSP font-src 'self').
  expect(html).not.toContain('fonts.googleapis.com/css');
  expect(html).not.toContain('Noto Sans KR');

  const fontCss = readFileSync(new URL(`../public${FONT_CSS}`, import.meta.url), 'utf8');
  expect(fontCss).toContain('font-display: swap');
  const files = [...fontCss.matchAll(/url\(\.\/([^)]+)\)/g)].map(match => match[1]);
  expect(files.length).toBeGreaterThan(50);
  for (const file of files) expect(existsSync(new URL(`../public/fonts/pretendard-1.3.9/${file}`, import.meta.url)), file).toBe(true);

  const fontStack = css.match(/--font-sans:\s*([^;]+);/)?.[1];
  expect(fontStack).toMatch(/^"Pretendard Variable"/);
  expect(html).toContain(`font-family: ${fontStack};`);
});
