
export type GameId = 'hsr' | 'ww';
export type Category = '전체' | '캐릭터' | '광추' | '유물' | '공략' | '쿠폰' | '무기' | '에코';

export interface Post {
  id: string;
  title: string;
  category: Category;
  thumbnail: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  keywords: string[];
}

export type HSRAttribute = '화염' | '허수' | '양자' | '얼음' | '바람' | '물리' | '번개';
export type HSRPath = '보존' | '파멸' | '수렵' | '지식' | '화합' | '공허' | '풍요' | '기억' | '환락';

export type WWAttribute = '기류' | '전도' | '회절' | '인멸' | '융융' | '응결';
export type WWWeaponType = '장검' | '대검' | '직검' | '권갑' | '증폭기';

export interface MaterialItem {
  name: string;
  count?: string;
  rarity?: number;
  img?: string;
}

export interface SkillDetail {
  name: string;
  type?: string;
  category?: string;
  tag?: string; 
  energy?: string;
  energyRegen?: string; 
  break?: string;
  toughnessDMG?: string; 
  spRecovery?: string;
  description: string;
  subDescription?: string;
  details?: string; 
  specialNote?: string;
  icon?: string;
}

export interface StatBonus {
  type: string;
  value: string;
  icon?: string;
}

export interface CharacterBaseStats {
  hp?: number | number[];
  atk?: number | number[];
  def?: number | number[];
  spd?: number;
  taunt?: number;
  energy?: number;
  "기초 HP"?: number;
  "기초 공격력"?: number;
  "기초 방어력"?: number;
  "속도"?: number;
  "에너지"?: number;
  "도발"?: number;
  lv1?: Record<string, number>;
  lv20?: Record<string, number>;
  lv30?: Record<string, number>;
  lv40?: Record<string, number>;
  lv50?: Record<string, number>;
  lv60?: Record<string, number>;
  lv70?: Record<string, number>;
  lv80?: Record<string, number>;
  speed?: number;
  taunt_val?: number;
}

export interface Character {
  id: string; 
  name: string;
  gameId?: GameId;
  folderName: string; 
  fileName?: string; 
  fixedUrl?: string; 
  attribute: HSRAttribute | WWAttribute;
  path?: HSRPath;
  weaponType?: WWWeaponType;
  rarity: number;
  materials?: string; 
  img?: string;
  affiliation?: string;
  briefInfo?: string;
  brief?: string; 
  version?: string;
  releaseVersion?: string;
  languageNames?: string;
  language?: string; 
  voiceActors?: string;
  cv?: string; 
  officialLinks?: { label: string; url: string; icon: string }[];
  lastEdited?: string;
  summary?: {
    role: string[];
    pros: string[];
    cons: string[];
  };
  baseStats?: CharacterBaseStats;
  ascensionMaterials?: MaterialItem[];
  traceMaterials?: MaterialItem[];
  materialsData?: {
    ascension: string[];
    traces: string[];
  };
  metadata?: {
    name: string;
    language: string;
    element: string;
    path?: string;
    rarity: number;
    affiliation: string;
    cv: string;
    releaseVersion: string;
    brief: string;
  };
  materials_v2?: {
    ascension: MaterialItem[];
    traces: MaterialItem[];
  };
  skills?: SkillDetail[];
  bonusAbilities?: { name: string; description?: string; term?: string; icon?: string }[];
  additionalAbilities?: { name: string; description?: string; term?: string; icon?: string }[];
  statBonuses?: StatBonus[];
  attributeBonuses?: StatBonus[];
  isTrailblazer?: boolean;
  eidolons?: { 
    rank?: string; 
    name: string; 
    description: string; 
    img?: string; 
    details?: string; 
    specialNote?: string; 
    rarity?: number; 
    icon?: string;
    icon_f?: string;
    icon_m?: string;
  }[];
  specialTerms?: Record<string, string>;
  hasASBuff?: boolean;
  asBuffData?: {
    skills?: SkillDetail[];
    baseStats?: CharacterBaseStats;
    additionalAbilities?: { name: string; description?: string; term?: string; icon?: string }[];
    eidolons?: { 
      rank?: string; 
      name: string; 
      description: string; 
      img?: string; 
      details?: string; 
      specialNote?: string; 
      rarity?: number; 
      icon?: string;
      icon_f?: string;
      icon_m?: string;
    }[];
  };
}

export interface LightCone {
  id: string;
  gameId?: GameId;
  name: string;
  folderName: string;
  fileName?: string;
  rarity: number;
  path?: HSRPath;
  weaponType?: WWWeaponType;
  baseStats?: {
    lv80?: {
      "기초 HP"?: number;
      "기초 공격력"?: number;
      "기초 방어력"?: number;
      "공격력"?: number;
      "HP"?: number;
      "방어력"?: number;
    };
  };
  skill?: {
    name: string;
    description: string;
  };
  source?: string;
  story?: string;
}

export interface Relic {
  id: string;
  gameId?: GameId;
  name: string;
  folderName: string;
  type: string;
  rarity?: number;
  pieces: string[];
  setEffect: {
    '2piece': string;
    '4piece'?: string;
    '5piece'?: string;
  };
  source?: string;
  story?: string;
}

export const SONATA_SETS = [
  "야밤의 서리", "솟구치는 용암", "울려퍼지는 뇌음", "스쳐가는 바람", "빛나는 별",
  "빛을 삼키는 해", "찬란한 광휘", "떠오르는 구름", "끊임없는 잔향", "냉철한 결단",
  "영원의 광채", "어둠의 장막", "하늘의 합주곡", "파도에 맞선 용기", "끝없는 하늘",
  "영광이 깃든 바람", "울부짖는 늑대의 불꽃", "뒤틀린 피안의 꿈", "영광의 칼날로 만들어진 왕관",
  "만물의 숨결에 비롯된 울림", "불타는 깃털을 펼친 사냥꾼의 그림자", "운명을 붕괴시키는 현",
  "역광 속 눈부신 서약", "빛을 쫓는 별의 고리", "흐르는 금빛 속 진리의 답",
  "긴 여정을 떠나는 별", "오색찬란한 거품", "함의의 소리를 따라"
] as const;

export type SonataType = typeof SONATA_SETS[number];

export interface WuwaEcho {
  id: string;
  name: string;
  cost: 1 | 3 | 4;
  sonataSets: SonataType[]; // ✅ 배열로 처리하여 중복 세트 대응
  description: string;
  folderName?: string; 
  cooldown?: number;
  enemyInfo?: {
    originalName?: string;
    grade?: string;
    description?: string;
    specialNote?: string;
    resistances?: Record<string, number>;
    drops?: string[];
  };
}

export interface Ornament {
  id: string;
  gameId?: GameId;
  name: string;
  folderName: string;
  type: string;
  rarity?: number;
  pieces: string[];
  setEffect: {
    '2piece': string;
  };
  source?: string;
  story?: string;
}

export interface Game {
  id: GameId;
  title: string;
  subTitle: string;
  bannerImage: string;
  posts: Post[];
}

export interface ArchiveData {
  games: Game[];
}
