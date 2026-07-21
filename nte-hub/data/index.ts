import { Character } from '../../common-hub/types';

export const NTE_CHARACTERS: any[] = [
  {
    id: 'nte-guwon',
    name: '구원',
    originalName: '구원',
    gameId: 'nte',
    folderName: '구원',
    attribute: '령',
    weaponType: '미정', // 무기 타입은 현재 공개된 세부 사항 없음
    rarity: 5,
    releaseVersion: '1.0',
    obtain: '기원',
    briefInfo: '에이본 골동품점 소속',
    isNotion: false,
    content: '구원 캐릭터 상세 설명입니다.'
  },
  {
    id: 'nte-mint',
    name: '민트',
    originalName: '민트',
    gameId: 'nte',
    folderName: '민트',
    attribute: '령',
    weaponType: '미정',
    rarity: 4,
    releaseVersion: '1.0',
    obtain: '기원',
    briefInfo: '에이본 골동품점 소속',
    isNotion: false,
    content: '민트 캐릭터 상세 설명입니다.'
  },
  {
    id: 'nte-cheese',
    name: '치즈',
    originalName: '치즈',
    gameId: 'nte',
    folderName: '치즈',
    attribute: '빛',
    weaponType: '미정',
    rarity: 5,
    releaseVersion: '1.0',
    obtain: '기원',
    briefInfo: '초기 캐릭터',
    isNotion: false,
    content: '치즈 캐릭터 상세 설명입니다.'
  },
  {
    id: 'nte-hotori',
    name: '호토리',
    originalName: '호토리',
    gameId: 'nte',
    folderName: '호토리',
    attribute: '빛',
    weaponType: '미정',
    rarity: 5,
    releaseVersion: '1.0',
    obtain: '기원',
    briefInfo: '초기 캐릭터',
    isNotion: false,
    content: '호토리 캐릭터 상세 설명입니다.'
  },
  {
    id: 'nte-adler',
    name: '아들러',
    originalName: '아들러',
    gameId: 'nte',
    folderName: '아들러',
    attribute: '주',
    weaponType: '미정',
    rarity: 4,
    releaseVersion: '1.0',
    obtain: '기원',
    briefInfo: '초기 캐릭터',
    isNotion: false,
    content: '아들러 캐릭터 상세 설명입니다.'
  },
  {
    id: 'nte-lacrimosa',
    name: '라크리모사',
    originalName: '라크리모사',
    gameId: 'nte',
    folderName: '라크리모사',
    attribute: '암',
    weaponType: '미정',
    rarity: 5,
    releaseVersion: '1.0',
    obtain: '기원',
    briefInfo: '초기 캐릭터',
    isNotion: false,
    content: '라크리모사 캐릭터 상세 설명입니다.'
  }
];

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
