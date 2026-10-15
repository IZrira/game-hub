import characterTranslations from '../data/search/character-translations.json';

export type GameLanguageScope = 'hsr' | 'ww';

/** Lists use summary names; detailed translation keys are needed only by detail pages. */
export const getRouteTranslationPacks = (scope: GameLanguageScope, pathname: string, search = ''): string[] => {
  const ui = scope === 'ww' ? ['ww_ui'] : [];
  if (pathname.replace(/\/$/, '') === `/gallery/${scope}`) {
    const menu = new URLSearchParams(search).get('menu');
    if (menu === '광추') return [...ui, 'hsr_lightcones'];
    if (menu === '무기') return [...ui, 'ww_weapons'];
    return ui;
  }
  if (/\/character\/[^/]+\/guide\/?$/.test(pathname)) return [...ui, 'guide_labels'];
  const detailMatch = pathname.match(/\/character\/([^/]+)\/?$/);
  if (detailMatch) {
    try {
      const aliases = characterTranslations[scope].aliases as Record<string, string>;
      const id = aliases[decodeURIComponent(detailMatch[1])];
      if (id) {
        const available = Object.values(characterTranslations[scope].packs).flat() as string[];
        return [...ui, 'characters/shared', ...(available.includes(id) ? [`characters/${id}`] : [])];
      }
    } catch {
      // Preserve the complete pack for malformed or unrecognized legacy links.
    }
    return [...ui, `${scope}_characters`];
  }
  if (/\/(lightcone|weapon)\//.test(pathname)) return [...ui, scope === 'hsr' ? 'hsr_lightcones' : 'ww_weapons'];
  // Keep complete resources for other routes until their keys are audited.
  return [...ui, `${scope}_characters`, scope === 'hsr' ? 'hsr_lightcones' : 'ww_weapons'];
};
