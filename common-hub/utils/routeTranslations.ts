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
  if (/\/character\/[^/]+\/?$/.test(pathname)) return [...ui, `${scope}_characters`];
  if (/\/(lightcone|weapon)\//.test(pathname)) return [...ui, scope === 'hsr' ? 'hsr_lightcones' : 'ww_weapons'];
  // Keep all resources for guides, parties and other routes until their keys are audited.
  return [...ui, `${scope}_characters`, scope === 'hsr' ? 'hsr_lightcones' : 'ww_weapons'];
};
