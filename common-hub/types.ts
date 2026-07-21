
export type GameId = 'hsr' | 'ww' | 'nte';
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

export type HSRAttribute = '화염' | '허수' | '양자' | '얼음' | '바람' | '물리' | '번개'
  | 'Fire' | 'Imaginary' | 'Quantum' | 'Ice' | 'Wind' | 'Physical' | 'Lightning';
export type HSRPath = '보존' | '파멸' | '수렵' | '지식' | '화합' | '공허' | '풍요' | '기억' | '환락'
  | 'Preservation' | 'Destruction' | 'The Hunt' | 'Erudition' | 'Harmony' | 'Nihility' | 'Abundance' | 'Remembrance' | 'Elation';

export type WWAttribute = '기류' | '전도' | '회절' | '인멸' | '용융' | '응결'
  | 'Aero' | 'Electro' | 'Spectro' | 'Havoc' | 'Fusion' | 'Glacio';
export type WWWeaponType = '장검' | '대검' | '직검' | '권갑' | '증폭기' | '권총';

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
  lv90?: Record<string, number>;
  speed?: number;
  taunt_val?: number;
}

export interface BaseItem {
  id?: string; 
  name?: string;
  originalName?: string;
  gameId?: GameId;
  folderName?: string;
  fileName?: string;
  rarity?: number;
  path?: any;
}

export interface Character extends BaseItem {
  attribute?: HSRAttribute | WWAttribute;
  path?: HSRPath;
  img?: string;
  affiliation?: string;
  briefInfo?: string;
  brief?: string;
  weaponType?: WWWeaponType;
  releaseVersion?: string;
  version?: string;
  voiceActors?: string;
  cv?: string;
  languageNames?: string;
  fixedUrl?: string;
  asBuffData?: any;
  metadata?: any;
  baseStats?: CharacterBaseStats;
  skills?: SkillDetail[];
  materials_v2?: {
    ascension: any[];
    traces: any[];
  };
  additionalAbilities?: any[];
  attributeBonuses?: any[];
  eidolons?: any[];
  bonusAbilities?: any[];
  hasASBuff?: boolean;
  specialTerms?: Record<string, string>;
  isTrailblazer?: boolean;
  [key: string]: any;
}

export interface LightCone extends BaseItem {
  source?: string;
  path?: HSRPath;
  releaseVersion?: string;
  story?: string | string[];
  baseStats?: {
    hp?: number | number[];
    atk?: number | number[];
    def?: number | number[];
    lv80?: {
      hp?: number;
      atk?: number;
      def?: number;
      "기초 HP"?: number;
      "기초 공격력"?: number;
      "기초 방어력"?: number;
    };
  };
  skill?: {
    name: string;
    description: string;
  };
}

export interface ItemDetail extends BaseItem {
  type: string;
  rarity?: number;
  sources: string[];
  desc: string;
  enName?: string;
  enDesc?: string;
  enSources?: string[];
}

export interface Relic extends BaseItem {
  type: string;
  pieces: any[];
}

export interface Ornament extends BaseItem {
  type: string;
  pieces: any[];
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
