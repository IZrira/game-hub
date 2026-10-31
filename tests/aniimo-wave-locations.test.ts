import { describe, expect, it } from 'vitest';
import { getAniimoLocationPath, getAniimoLocationGroups } from '../aniimo-hub/utils/location';
import { aniimoLocationPath, getWaveLocations } from '../scripts/lib/aniimo-locations.js';
import type { AniimoEntry } from '../aniimo-hub/types';

describe('Aniimo region location identity', () => {
  const entries = [
    { number: '001', name: '기존 애니모', habitats: ['고래첨벙 해안'], forms: [{ locations: ['고래첨벙 해안'] }] },
    { id: 'wave-archipelago-001', number: '001', name: '쉘코랄', regionId: '300301', regionName: '웨이브 군도', forms: [{ locations: ['초승달 만'] }, { locations: ['초승달 만', '스칼렛보우 습지'] }] }
  ] as AniimoEntry[];

  it('preserves legacy aliases while namespacing the new official place name', () => {
    expect(getAniimoLocationPath('초승달 만')).toBe(`/gallery/aniimo/location/${encodeURIComponent('고래첨벙-해안')}`);
    expect(getAniimoLocationPath('초승달 만', '300301')).toBe(`/gallery/aniimo/location/${encodeURIComponent('wave-archipelago--초승달-만')}`);
    expect(aniimoLocationPath('초승달 만', '300301')).toBe(getAniimoLocationPath('초승달 만', '300301'));
  });

  it('counts species once per region even when multiple forms appear in the same place', () => {
    expect(getWaveLocations(entries)).toEqual([
      { name: '초승달 만', regionId: '300301', regionName: '웨이브 군도', count: 1 },
      { name: '스칼렛보우 습지', regionId: '300301', regionName: '웨이브 군도', count: 1 }
    ]);
    expect(getAniimoLocationGroups(entries)).toHaveLength(16);
    expect(getAniimoLocationGroups(entries).slice(14)).toEqual(getWaveLocations(entries));
  });

  it('preserves unknown-area source text without publishing an empty geographic page', () => {
    const withUnknown = entries.map(entry => entry.regionId ? { ...entry, forms: entry.forms.map(form => ({ ...form, locations: [...form.locations, '미확인 구역'] })) } : entry);
    expect(getWaveLocations(withUnknown).some(location => location.name === '미확인 구역')).toBe(false);
    expect(getAniimoLocationGroups(withUnknown).some(location => location.name === '미확인 구역')).toBe(false);
    expect(withUnknown[1].forms[0].locations).toContain('미확인 구역');
  });
});
