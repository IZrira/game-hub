import { abundanceLightcones } from './abundance';
import { destructionLightcones } from './destruction';
import { eruditionLightcones } from './erudition';
import { harmonyLightcones } from './harmony';
import { huntLightcones } from './hunt';
import { nihilityLightcones } from './nihility';
import { preservationLightcones } from './preservation';
import { elationLightcones } from './elation';
import { remembranceLightcones } from './remembrance';

const ALL_LIGHTCONE_DATA = [
  ...abundanceLightcones,
  ...destructionLightcones,
  ...eruditionLightcones,
  ...harmonyLightcones,
  ...huntLightcones,
  ...nihilityLightcones,
  ...preservationLightcones,
  ...elationLightcones,
  ...remembranceLightcones
];

// 동일 광추가 임시 데이터와 완성 데이터로 중복 등록되더라도 마지막 완성본만 노출한다.
export const SORTED_LIGHTCONE_DATA = Array.from(
  new Map(ALL_LIGHTCONE_DATA.map(lightcone => [lightcone.name, lightcone])).values()
);
