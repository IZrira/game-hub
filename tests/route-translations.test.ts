import { describe, expect, it } from 'vitest';
import { getRouteTranslationPacks } from '../common-hub/utils/routeTranslations';

describe('route translation selection', () => {
  it('does not wait for skill or weapon descriptions in character lists', () => {
    expect(getRouteTranslationPacks('hsr', '/gallery/hsr', '?menu=캐릭터')).toEqual([]);
    expect(getRouteTranslationPacks('ww', '/gallery/ww/', '?menu=캐릭터')).toEqual(['ww_ui']);
  });
  it('loads equipment translations on menu changes and direct detail links', () => {
    expect(getRouteTranslationPacks('hsr', '/gallery/hsr', '?menu=광추')).toEqual(['hsr_lightcones']);
    expect(getRouteTranslationPacks('ww', '/gallery/ww', '?menu=무기')).toEqual(['ww_ui', 'ww_weapons']);
    expect(getRouteTranslationPacks('ww', '/gallery/ww/weapon/example')).toEqual(['ww_ui', 'ww_weapons']);
  });
  it('keeps complete resources for guides and character details', () => {
    expect(getRouteTranslationPacks('ww', '/gallery/ww/character/camellya')).toEqual(['ww_ui', 'ww_characters']);
    expect(getRouteTranslationPacks('hsr', '/gallery/hsr/character/cyrene/guide')).toEqual(['hsr_characters', 'hsr_lightcones']);
  });
});
