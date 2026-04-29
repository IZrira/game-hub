import { GameId, WWAttribute, WWWeaponType, MaterialItem, SkillDetail, CharacterBaseStats, BaseItem, HSRAttribute } from '../common-hub/types';

export type SonataType = 
  | '떠오르는 구름' 
  | '은빛 구름' 
  | '끊임없는 잔향' 
  | '용암의 틈' 
  | '야밤의 서리' 
  | '울려퍼지는 뇌음' 
  | '포효하는 광풍' 
  | '찬란한 광휘' 
  | '파멸의 흑염';

export const SONATA_SETS: SonataType[] = [
  '떠오르는 구름',
  '은빛 구름',
  '끊임없는 잔향',
  '용암의 틈',
  '야밤의 서리',
  '울려퍼지는 뇌음',
  '포효하는 광풍',
  '찬란한 광휘',
  '파멸의 흑염'
];

export type WuwaCategory = 
  | "전체"
  | "공명자 돌파 재료" | "공명자 경험치 재료" | "무기 경험치 재료" | "스킬 업그레이드 재료"
  | "무기 및 스킬 재료" | "재료" | "소모품" | "특수 화폐" | "튜닝 관련 아이템" 
  | "에코 육성 재료" | "돌파 재료" | "무기 제작 재료" | "요리" | "에코";

export interface WuwaItem {
  id: string;
  name: string;
  folderName?: string; // 이미지 파일명으로 사용될 수 있는 폴더명 (선택 사항)
  rarity: number;
  category: WuwaCategory; // Use WuwaCategory here
  description: string;
  source?: string;
}

export interface WuwaCharacter extends BaseItem {
  id?: string; 
  name?: string;
  originalName?: string;
  gameId?: GameId;
  folderName?: string; 
  attribute?: HSRAttribute | WWAttribute;
  weaponType?: WWWeaponType;
  rarity?: number;
  materials?: string; 
  img?: string;
  affiliation?: string;
  briefInfo?: string;
  brief?: string; 
  voiceActors?: string;
  cv?: string; 
  releaseVersion?: string;
  languageNames?: string;
  materials_v2?: {
    ascension: any[];
    traces: any[];
  };
  baseStats?: CharacterBaseStats;
  skills?: SkillDetail[];
  additionalAbilities?: any[];
  attributeBonuses?: any[];
  eidolons?: any[];
  [key: string]: any;
}

export interface WuwaWeapon extends BaseItem {
  id: string;
  gameId: 'ww';
  name: string;
  rarity: number;
  type: WWWeaponType;
  stats: {
    atk: number;
    subStatName: string;
    subStatValue: string;
  };
  skill: {
    name: string;
    description: string;
  };
  description?: string;
}

export interface WuwaEcho extends BaseItem {
  id: string;
  name: string;
  cost: 1 | 3 | 4;
  sonataSets: string[];
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
