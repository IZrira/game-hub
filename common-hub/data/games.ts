import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { WW_DATA_ALL } from '../../ww-hub/data/index';
import { Character, LightCone, Ornament } from '../types';
export { ARCHIVE_DATA } from './archive';

import { getGameData } from './dataManager';

export const CHARACTER_DB: Character[] = getGameData('all').CHARACTER_DB;

export const LIGHTCONE_DB: LightCone[] = [
  ...HSR_DATA_ALL.LIGHTCONE_DB
];

export const RELIC_DB: any[] = [
  ...HSR_DATA_ALL.RELIC_DB,
  ...WW_DATA_ALL.ECHO_DATA
];

export const ORNAMENT_DB: Ornament[] = HSR_DATA_ALL.ORNAMENT_DB;
