import { Character } from '../../common-hub/types';
import { NTE_ARCS } from './arcs';
import { NTE_ITEM_META } from './items';

export const NTE_CHARACTERS: any[] = [];

export const NTE_WEAPON_DB = NTE_ARCS;
export const NTE_ECHO_DB: any[] = [];
export const NTE_ITEMS = Object.values(NTE_ITEM_META);
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

export * from './arcs';
export * from './items';
export * from './parties';
export * from './terms';
