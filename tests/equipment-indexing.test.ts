import fs from 'node:fs';
import { expect, it } from 'vitest';
import {
  buildNteArcRecommendations,
  isIndexableEquipment,
  SEARCH_TRAFFIC_EXCEPTIONS,
} from '../common-hub/utils/equipmentRecommendations.js';
import { isHsrEquipmentIndexable } from '../hsr-hub/data/equipmentIndex';
import { isWwEquipmentIndexable } from '../ww-hub/data/equipmentIndex';
import { getNteArcRecommendations, isNteArcIndexable } from '../nte-hub/data/arcRecommendations';

const sitemapPaths = (file: string) =>
  [...fs.readFileSync(file, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decodeURIComponent(new URL(match[1]).pathname));
const edgeRoutes = fs.readFileSync('functions/generated-routes.ts', 'utf8');

it('parses ranked arc picks from the "아크" block of an NTE build guide', () => {
  const guides = [{ characterId: 'c1', content: '세팅\n\n\n아크\n「영원한 왈츠」 1순위 : 전용 아크.\n입에 쓴 약이 몸에 좋다 2순위 : 방어 아크.\n\n\n콘솔 세트 1\n작은 대모험 1순위 : 무시' }];
  const characters = [{ id: 'c1', name: '파디아' }];
  const arcs = [{ name: '영원한 왈츠' }, { name: '입에 쓴 약이 몸에 좋다' }, { name: '작은 대모험' }];
  const { weapon } = buildNteArcRecommendations(guides, characters, arcs);
  expect(weapon.get('영원한 왈츠')).toEqual([{ charId: 'c1', charName: '파디아', rank: 1, note: '전용 아크.' }]);
  expect(weapon.get('입에 쓴 약이 몸에 좋다')?.[0].rank).toBe(2);
  expect(weapon.has('작은 대모험')).toBe(false);
});

it('keeps search-traffic exceptions indexable without a recommendation', () => {
  expect(SEARCH_TRAFFIC_EXCEPTIONS.echo).toContain('절식백');
  expect(isIndexableEquipment(new Map(), 'echo', '절식백')).toBe(true);
  expect(isIndexableEquipment(new Map(), 'echo', '금정후')).toBe(false);
});

it('applies the same indexing rule in the pages as in the sitemap and edge routes', () => {
  const cases = [
    // 전우의 의리 is a 4-star weapon (corrected 2026-11-12), so it is no longer a signature page.
    { indexable: isWwEquipmentIndexable('weapon', '전우의 의리'), path: '/gallery/ww/weapon/전우의 의리', sitemap: 'public/sitemap-ww.xml' },
    { indexable: isWwEquipmentIndexable('weapon', '태초의 권갑'), path: '/gallery/ww/weapon/태초의 권갑', sitemap: 'public/sitemap-ww.xml' },
    { indexable: isWwEquipmentIndexable('echo', '절식백'), path: '/gallery/ww/echo/절식백', sitemap: 'public/sitemap-ww.xml' },
    { indexable: isWwEquipmentIndexable('echo', '금정후'), path: '/gallery/ww/echo/금정후', sitemap: 'public/sitemap-ww.xml' },
    { indexable: isHsrEquipmentIndexable('lightcone', '풍작'), path: '/gallery/hsr/lightcone/풍작', sitemap: 'public/sitemap-hsr.xml' },
    { indexable: isNteArcIndexable('영원한 왈츠'), path: '/gallery/nte/weapon/영원한 왈츠', sitemap: 'public/sitemap-nte.xml' },
  ];
  expect(cases.map(c => c.indexable)).toEqual([false, false, true, false, false, true]);
  for (const c of cases) {
    expect(sitemapPaths(c.sitemap).includes(c.path)).toBe(c.indexable);
    // Every equipment page stays reachable at the edge, indexed or not.
    expect(edgeRoutes).toContain(JSON.stringify(c.path));
  }
});

it('shows the generated arc recommendations on NTE arc pages', () => {
  expect(getNteArcRecommendations('영원한 왈츠')[0]).toMatchObject({ charName: '파디아', rank: 1 });
  expect(fs.readFileSync('nte-hub/pages/NTEArcDetail.tsx', 'utf8')).toContain('getNteArcRecommendations(arc.name)');
});
