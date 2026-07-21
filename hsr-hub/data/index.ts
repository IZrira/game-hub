import { CHARACTER_DATA } from './characters';
import { SORTED_LIGHTCONE_DATA } from './lightcones';
import { RELIC_DATA } from './relics';
import { ORNAMENT_DATA } from './ornaments';
import { HSR_CHARACTER_GUIDES } from './guides';
import { ITEM_META } from './items';
import { Character, LightCone, Relic, Ornament } from '../../common-hub/types';

export const HSR_CHARACTER_DB: Character[] = CHARACTER_DATA.map(c => ({ ...c, gameId: 'hsr' as const }));
export const HSR_LIGHTCONE_DB: LightCone[] = SORTED_LIGHTCONE_DATA.map(lc => ({ ...lc, gameId: 'hsr' as const }));
export const HSR_RELIC_DB: Relic[] = RELIC_DATA.map(r => ({ ...r, gameId: 'hsr' as const }));
export const HSR_ORNAMENT_DB: Ornament[] = ORNAMENT_DATA.map(o => ({ ...o, gameId: 'hsr' as const }));

export const HSR_DATA_ALL = {
  CHARACTER_DB: HSR_CHARACTER_DB,
  LIGHTCONE_DB: HSR_LIGHTCONE_DB,
  RELIC_DB: HSR_RELIC_DB,
  ORNAMENT_DB: HSR_ORNAMENT_DB,
  GUIDES: HSR_CHARACTER_GUIDES,
  INVENTORY_DB: ITEM_META
};
