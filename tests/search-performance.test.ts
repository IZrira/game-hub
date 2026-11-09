// @vitest-environment node
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  groupCoverage, pageGroup, pagePath, settingIntentSplit, sitemapPaths, summarizeWeeks, totalsByPath, weekStart,
} from '../scripts/lib/search-performance.js';

const row = (keys: string[], clicks: number, impressions: number) => ({ keys, clicks, impressions });

describe('search performance check helpers (R4)', () => {
  it('decodes our own URLs and ignores other hosts', () => {
    expect(pagePath('https://riragamehub.com/gallery/nte/guides/%EC%9E%94%ED%99%8D-build-guide?x=1')).toBe('/gallery/nte/guides/잔홍-build-guide');
    expect(pagePath('https://rira-game-hub.pages.dev/')).toBeNull();
  });

  it('groups days into Monday weeks', () => {
    expect(weekStart('2026-11-08')).toBe('2026-11-02');
    expect(weekStart('2026-11-02')).toBe('2026-11-02');
    expect(summarizeWeeks([row(['2026-11-01'], 1, 10), row(['2026-11-02'], 2, 20), row(['2026-11-08'], 3, 30)])).toEqual([
      { week: '2026-10-26', days: 1, clicks: 1, impressions: 10 },
      { week: '2026-11-02', days: 2, clicks: 5, impressions: 50 },
    ]);
  });

  it('labels the page groups used in the recovery plan', () => {
    expect(pageGroup('/gallery/hsr/character/acheron')).toBe('hsr 캐릭터 상세');
    expect(pageGroup('/gallery/hsr/character/acheron/guide')).toBe('hsr 캐릭터 가이드');
    expect(pageGroup('/gallery/nte/weapon/금기의 문')).toBe('nte 아크');
    expect(pageGroup('/gallery/ww/weapon/뇌전')).toBe('ww 무기');
    expect(pageGroup('/gallery/nte/guides')).toBe('nte 공략 목록');
    expect(pageGroup('/')).toBe('홈');
  });

  it('counts sitemap URLs with impressions per group', () => {
    const totals = totalsByPath([row(['https://riragamehub.com/gallery/hsr/lightcone/%ED%92%8D%EC%9E%91'], 1, 5)]);
    expect(groupCoverage(['/gallery/hsr/lightcone/풍작', '/gallery/hsr/lightcone/앰버'], totals)).toEqual([
      { group: 'hsr 광추', urls: 2, withImpressions: 1, impressions: 5, clicks: 1 },
    ]);
  });

  it('splits setting-intent queries between character pages and setting pages (D2)', () => {
    const split = settingIntentSplit([
      row(['https://riragamehub.com/gallery/hsr/character/acheron', '아케론 세팅'], 0, 10),
      row(['https://riragamehub.com/gallery/hsr/character/acheron/guide', '아케론 세팅'], 2, 30),
      row(['https://riragamehub.com/gallery/hsr/character/acheron', '아케론 성우'], 1, 50),
      row(['https://riragamehub.com/gallery/nte/guides/%EC%9E%94%ED%99%8D-build-guide', '잔홍 공략'], 1, 7),
    ]);
    expect(split.hsr).toEqual({ detail: { clicks: 0, impressions: 10 }, guide: { clicks: 2, impressions: 30 } });
    expect(split.nte.guide).toEqual({ clicks: 1, impressions: 7 });
  });

  it('reads every committed sitemap', () => {
    const paths = sitemapPaths(fs.readFileSync('public/sitemap-hsr.xml', 'utf8'));
    expect(paths.length).toBeGreaterThan(0);
    expect(paths.every(path => path.startsWith('/gallery/hsr'))).toBe(true);
  });
});
