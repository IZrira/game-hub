import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { Character, LightCone, Ornament } from '../types';
export { ARCHIVE_DATA } from './archive';

export const CHARACTER_DB: Character[] = HSR_DATA_ALL.CHARACTER_DB;

export const LIGHTCONE_DB: LightCone[] = [
  ...HSR_DATA_ALL.LIGHTCONE_DB
];

export const RELIC_DB: any[] = [
  ...HSR_DATA_ALL.RELIC_DB
];

export const ORNAMENT_DB: Ornament[] = HSR_DATA_ALL.ORNAMENT_DB;
