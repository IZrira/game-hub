import { WW_CHARACTERS } from './characters';
import { WEAPON_DATA } from './weapons';
import { ECHO_DATA } from './echoes';
import { WW_NOTICES } from './notices';
import { wuwaItemsSet1 } from './items';
import { WW_CHARACTER_GUIDES } from './guides';
import { Character, BaseItem } from '../../common-hub/types';

export const WW_CHARACTER_DB: Character[] = WW_CHARACTERS.map(c => ({ ...c, gameId: 'ww' as const }));
export const WW_WEAPON_DB = WEAPON_DATA.map(w => ({ ...w, gameId: 'ww' as const }));
export const WW_ECHO_DB = ECHO_DATA.map(e => ({ ...e, gameId: 'ww' as const }));

export const WW_DATA_ALL = {
  CHARACTER_DB: WW_CHARACTER_DB,
  WEAPON_DATA: WW_WEAPON_DB,
  ECHO_DATA: WW_ECHO_DB,
  ITEM_DATA: wuwaItemsSet1,
  NOTICES: WW_NOTICES,
  GUIDES: WW_CHARACTER_GUIDES
};
