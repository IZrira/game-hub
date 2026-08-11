import { Character } from '../../common-hub/types';

export const NTE_CHARACTERS: any[] = [];

export const NTE_WEAPON_DB: any[] = [];
export const NTE_ECHO_DB: any[] = [];
export const NTE_ITEMS: any[] = [];
export const NTE_NOTICES: any[] = [];
export const NTE_GUIDES: any[] = [];

export const NTE_DATA_ALL = {
  CHARACTER_DB: NTE_CHARACTERS.map(c => ({ ...c, gameId: 'nte' as const })),
  WEAPON_DATA: NTE_WEAPON_DB,
  ECHO_DATA: NTE_ECHO_DB,
  ITEM_DATA: NTE_ITEMS,
  NOTICES: NTE_NOTICES,
  GUIDES: NTE_GUIDES
};
