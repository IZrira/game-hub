// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { isIndexableEquipment, SEARCH_TRAFFIC_EXCEPTIONS } from '../common-hub/utils/equipmentRecommendations.js';
import { loadEquipmentRecommendations } from '../scripts/lib/equipment-recommendations.js';
import { isHsrEquipmentIndexable } from '../hsr-hub/data/equipmentIndex';
import { isWwEquipmentIndexable } from '../ww-hub/data/equipmentIndex';
import { isNteArcIndexable } from '../nte-hub/data/arcRecommendations';
import signature from '../common-hub/data/generated/signature-equipment.json';
import { SORTED_LIGHTCONE_DATA } from '../hsr-hub/data/lightcones';
import wwWeapons from '../ww-hub/data/generated/weapons.json';
import nteArcs from '../nte-hub/data/generated/arcs.json';

const one = new Map([['일반 광추', [{ charId: 'a' }]], ['전용 광추', [{ charId: 'a' }]], ['세트', [{ charId: 'a' }]]]);
const two = new Map([['일반 광추', [{ charId: 'a' }, { charId: 'b' }]]]);

describe('equipment indexing rule (D1)', () => {
  it('indexes two recommenders, signature gear and single-recommendation sets, but not other single picks', () => {
    const sig = { lightcone: ['전용 광추'] };
    expect(isIndexableEquipment(two, 'lightcone', '일반 광추', sig)).toBe(true);
    expect(isIndexableEquipment(one, 'lightcone', '전용 광추', sig)).toBe(true);
    expect(isIndexableEquipment(one, 'lightcone', '일반 광추', sig)).toBe(false);
    expect(isIndexableEquipment(one, 'relic', '세트', sig)).toBe(true);
    expect(isIndexableEquipment(new Map(), 'lightcone', '전용 광추', sig)).toBe(false);
  });

  it('keeps pages that already had search traffic', () => {
    for (const [kind, names] of Object.entries(SEARCH_TRAFFIC_EXCEPTIONS)) {
      for (const name of names) expect(isIndexableEquipment(new Map(), kind as never, name), name).toBe(true);
    }
  });

  it('treats every 5-star light cone, weapon and arc as signature gear', () => {
    expect(signature.lightcone).toEqual(expect.arrayContaining(SORTED_LIGHTCONE_DATA.filter(lc => lc.rarity === 5).map(lc => lc.name.normalize('NFC'))));
    expect(signature.weapon).toEqual(expect.arrayContaining(wwWeapons.filter(w => w.rarity === 5).map(w => w.name.normalize('NFC'))));
    expect(signature.arc).toEqual(expect.arrayContaining(nteArcs.filter(a => a.rarity === 5).map(a => a.name.normalize('NFC'))));
  });

  it('gives the detail pages the same answer as the sitemap and prerender for every item', () => {
    const server = loadEquipmentRecommendations();
    for (const lc of SORTED_LIGHTCONE_DATA) expect(isHsrEquipmentIndexable('lightcone', lc.name), lc.name).toBe(server.isIndexable('lightcone', lc.name));
    for (const weapon of wwWeapons) expect(isWwEquipmentIndexable('weapon', weapon.name), weapon.name).toBe(server.isIndexable('weapon', weapon.name));
    for (const arc of nteArcs) expect(isNteArcIndexable(arc.name), arc.name).toBe(server.isIndexable('arc', arc.name));
  });
});
