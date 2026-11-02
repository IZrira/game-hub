import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const read = (file: string) => fs.readFileSync(file, 'utf8');

it('serves ads.txt without a byte order mark and with the publisher record', () => {
  const bytes = fs.readFileSync('public/ads.txt');
  expect([...bytes.subarray(0, 3)]).not.toEqual([0xef, 0xbb, 0xbf]);
  expect(bytes.toString('utf8').trim()).toBe('google.com, pub-7014148671633305, DIRECT, f08c47fec0942fa0');
});

it('keeps the privacy policy ad disclosure current in the app and the prerendered copy', () => {
  for (const source of [read('common-hub/pages/PrivacyPolicy.tsx'), read('scripts/prerender-meta.js')]) {
    expect(source).toContain('https://policies.google.com/technologies/partner-sites');
    expect(source).toContain('https://www.aboutads.info/choices/');
    expect(source).toContain('2026년 11월 2일');
  }
  expect(read('common-hub/pages/PrivacyPolicy.tsx')).not.toMatch(/DART|\*\*/);
  expect(read('common-hub/pages/TermsOfService.tsx')).not.toContain('DART');
});

it('never renders ad slots faded or scaled down', () => {
  const pages = ['common-hub', 'hsr-hub', 'ww-hub', 'nte-hub', 'aniimo-hub']
    .flatMap(dir => fs.readdirSync(dir, { recursive: true }).map(file => path.join(dir, String(file))))
    .filter(file => file.endsWith('.tsx'));
  const adUsages = pages.flatMap(file => read(file).match(/<AdPlaceholder[^>]*>/g) ?? []);
  expect(adUsages.length).toBeGreaterThan(0);
  for (const usage of adUsages) expect(usage).not.toMatch(/opacity-|scale-/);
});
