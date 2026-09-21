import { describe, it, expect } from 'vitest';
import aniimoData from '../aniimo-hub/data/aniimo.json';
import {
  OFFICIAL_ANIIMO_HABITATS,
  OFFICIAL_HABITAT_TARGETS,
  OFFICIAL_HABITAT_SPECIES,
  OfficialAniimoHabitat
} from '../aniimo-hub/data/habitats';
import type { AniimoEntry } from '../aniimo-hub/types';

describe('Aniimo Official Habitats & Species Count Verification', () => {
  it('should have exactly 14 official habitats defined', () => {
    expect(OFFICIAL_ANIIMO_HABITATS.length).toBe(14);
    expect(Object.keys(OFFICIAL_HABITAT_TARGETS).length).toBe(14);
    expect(Object.keys(OFFICIAL_HABITAT_SPECIES).length).toBe(14);
  });

  const expectedCounts: Record<OfficialAniimoHabitat, number> = {
    '붓꽃 바다': 17,
    '구름 초원': 17,
    '스테플 숲': 15,
    '로즈타워 숲': 14,
    '늑대이빨 능선': 18,
    '청석 대지': 16,
    '뇌전의 숲': 16,
    '설산기슭 초원': 15,
    '고래첨벙 해안': 16,
    '붉은바위 고지': 22,
    '안개숲': 13,
    '갈매기 만': 13,
    '조화의 언덕': 10,
    '바다끝 구름': 16
  };

  for (const habitat of OFFICIAL_ANIIMO_HABITATS) {
    it(`[${habitat}] species count should match official target (${expectedCounts[habitat]}종) in definitions`, () => {
      const species = OFFICIAL_HABITAT_SPECIES[habitat];
      expect(species).toBeDefined();
      const uniqueSpecies = [...new Set(species)];
      expect(uniqueSpecies.length).toBe(expectedCounts[habitat]);
      expect(OFFICIAL_HABITAT_TARGETS[habitat]).toBe(expectedCounts[habitat]);
    });

    it(`[${habitat}] species count should match official target (${expectedCounts[habitat]}종) in aniimo.json`, () => {
      const entries = aniimoData as AniimoEntry[];
      const inhabitingEntries = entries.filter(e => (e.habitats || []).includes(habitat));
      expect(inhabitingEntries.length).toBe(expectedCounts[habitat]);
    });
  }

  it('should verify 클램스타 has habitat as 고래첨벙 해안 and detailLocations separated', () => {
    const entries = aniimoData as AniimoEntry[];
    const clamstar = entries.find(e => e.name === '클램스타');
    expect(clamstar).toBeDefined();
    expect(clamstar?.locations).toContain('고래첨벙 해안');
    expect(clamstar?.locations).not.toContain('초승달 만');
    expect(clamstar?.locations).not.toContain('석양 해원');
    expect(clamstar?.detailLocations).toEqual(['초승달 만', '석양 해원']);
  });
});
