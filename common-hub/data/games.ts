import { HSR_DATA_ALL } from '../../hsr-hub/data/index';
import { WW_DATA_ALL } from '../../ww-hub/data/index';
import { ArchiveData, Character, LightCone, Relic, Ornament } from '../types';

export const CHARACTER_DB: Character[] = [
  ...HSR_DATA_ALL.CHARACTER_DB,
  ...WW_DATA_ALL.CHARACTER_DB
];

export const LIGHTCONE_DB: LightCone[] = [
  ...HSR_DATA_ALL.LIGHTCONE_DB
];

export const RELIC_DB: any[] = [
  ...HSR_DATA_ALL.RELIC_DB,
  ...WW_DATA_ALL.ECHO_DATA
];

export const ORNAMENT_DB: Ornament[] = HSR_DATA_ALL.ORNAMENT_DB;

export const ARCHIVE_DATA: ArchiveData = {
  games: [
    {
      id: 'hsr',
      title: '붕괴: 스타레일',
      subTitle: 'Honkai: Star Rail Archive',
      bannerImage: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/hsr_main.webp',
      posts: [] // 데이터 레이어 분리에 따라 각 도메인에서 관리
    },
    {
      id: 'ww',
      title: '명조: 워더링 웨이브',
      subTitle: 'Wuthering Waves Archive',
      bannerImage: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/ww_main.webp',
      posts: []
    }
  ]
};
