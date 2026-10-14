import { describe, expect, it } from 'vitest';
import { NTE_GALLERY_CHARACTERS } from '../nte-hub/data/galleryData';
import { NTE_TIER_CATEGORIES } from '../nte-hub/data/tiers';
import { onRequest } from '../functions/_middleware';
import { mergeAdminTiers } from '../nte-hub/data/adminData';

const checkCatalog = (categories: typeof NTE_TIER_CATEGORIES) => {
  for (const category of categories) {
    const seen = new Set<string>();
    for (const character of category.tiers.flatMap(group => group.characters)) {
      const registered = NTE_GALLERY_CHARACTERS.find(item => item.name === character.name);
      expect(registered, character.name).toBeTruthy();
      expect(character.id).toBe(registered.id);
      expect(character.attribute).toBe(registered.attribute);
      expect(character.folderName).toBe(registered.folderName);
      expect(character.fileName).toBe(registered.fileName);
      expect(seen.has(character.name)).toBe(false);
      seen.add(character.name);
    }
  }
};

describe('NTE tier list uses the character gallery catalog', () => {
  it('contains only registered characters in every fallback category', () => {
    checkCatalog(NTE_TIER_CATEGORIES);
    expect(NTE_TIER_CATEGORIES[0].tiers.find(group => group.tier === 'S+')?.characters.some(character => character.name === '잔홍')).toBe(true);
  });

  it('rejects unknown remote rows and preserves valid remote rankings and order', () => {
    const before = JSON.stringify(NTE_TIER_CATEGORIES);
    const categories = mergeAdminTiers([
      { category_id: 'overall', character_name: '엠버', tier: 'OP', display_order: 0 },
      { category_id: 'overall', character_name: '도감에없는캐릭터', tier: 'OP' },
      { category_id: 'overall', character_name: '잔 홍', tier: 'A', display_order: 2, role: '메인 딜러', attribute: '가짜 속성' },
      { category_id: 'overall', character_name: '레이븐', tier: 'A', display_order: 1, role: '메인 딜러' },
      { category_id: 'endgame2', character_name: '감정사', tier: 'S', display_order: 1, role: '서포터' },
    ]);
    checkCatalog(categories);
    expect(categories[0].tiers.some(group => group.tier as string === 'OP')).toBe(false);
    expect(categories[0].tiers.find(group => group.tier === 'A')?.characters.map(character => character.name)).toEqual(['레이븐', '잔홍']);
    expect(categories[1].tiers.find(group => group.tier === 'S')?.characters.some(character => character.name === '감정사')).toBe(true);
    expect(JSON.stringify(NTE_TIER_CATEGORIES)).toBe(before);
  });
});


it('allows direct NTE tier-list requests through the production edge', async () => {
  const response = await onRequest({ request: new Request('https://riragamehub.com/gallery/nte/tierlist'), next: async () => new Response('tier-list page') });
  expect(response.status).toBe(200);
  expect(await response.text()).toBe('tier-list page');
});
