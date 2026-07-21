import { GameId, WWAttribute, WWWeaponType, MaterialItem, SkillDetail, CharacterBaseStats, BaseItem, HSRAttribute } from '../common-hub/types';

export type SonataType = 
  | '야밤의 서리'
  | '솟구치는 용암'
  | '울려퍼지는 뇌음'
  | '스쳐가는 바람'
  | '빛나는 별'
  | '빛을 삼키는 해'
  | '찬란한 광휘'
  | '떠오르는 구름'
  | '끊임없는 잔향'
  | '냉철한 결단'
  | '영원의 광채'
  | '어둠의 장막'
  | '하늘의 합주곡'
  | '파도에 맞선 용기'
  | '끝없는 하늘'
  | '영광이 깃든 바람'
  | '울부짖는 늑대의 불꽃'
  | '뒤틀린 피안의 꿈'
  | '영광의 칼날로 만들어진 왕관'
  | '만물의 숨결에 비롯된 울림'
  | '불타는 깃털을 펼친 사냥꾼의 그림자'
  | '운명을 붕괴시키는 현'
  | '역광 속 눈부신 서약'
  | '빛을 쫓는 별의 고리'
  | '흐르는 금빛 속 진리의 답'
  | '긴 여정을 떠나는 별'
  | '오색찬란한 거품'
  | '함의의 소리를 따라'
  | '소리 없이 내려앉은 기도의 눈'
  | '마음을 엮은 꿈의 그림자'
  | '꿈을 깨뜨리는 망령의 악몽'
  | '내려앉은 깃털의 노래'
  | '악을 씻어내는 마음'
  | '황천길을 밝히는 등불';

export const SONATA_SETS: SonataType[] = [
  '야밤의 서리',
  '솟구치는 용암',
  '울려퍼지는 뇌음',
  '스쳐가는 바람',
  '빛나는 별',
  '빛을 삼키는 해',
  '찬란한 광휘',
  '떠오르는 구름',
  '끊임없는 잔향',
  '냉철한 결단',
  '영원의 광채',
  '어둠의 장막',
  '하늘의 합주곡',
  '파도에 맞선 용기',
  '끝없는 하늘',
  '영광이 깃든 바람',
  '울부짖는 늑대의 불꽃',
  '뒤틀린 피안의 꿈',
  '영광의 칼날로 만들어진 왕관',
  '만물의 숨결에 비롯된 울림',
  '불타는 깃털을 펼친 사냥꾼의 그림자',
  '운명을 붕괴시키는 현',
  '역광 속 눈부신 서약',
  '빛을 쫓는 별의 고리',
  '흐르는 금빛 속 진리의 답',
  '긴 여정을 떠나는 별',
  '오색찬란한 거품',
  '함의의 소리를 따라',
  '소리 없이 내려앉은 기도의 눈',
  '마음을 엮은 꿈의 그림자',
  '꿈을 깨뜨리는 망령의 악몽',
  '내려앉은 깃털의 노래',
  '악을 씻어내는 마음',
  '황천길을 밝히는 등불'
] as const;

export type WuwaCategory = 
  | "전체"
  | "공명자 돌파 재료" | "공명자 경험치 재료" | "무기 경험치 재료" | "스킬 업그레이드 재료"
  | "무기 및 스킬 재료" | "재료" | "소모품" | "특수 화폐" | "튜닝 관련 아이템" 
  | "에코 육성 재료" | "돌파 재료" | "무기 제작 재료" | "요리" | "에코"
  | "이벤트 아이템" | "임무 아이템" | "행적 재료";

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
  metadata?: {
    name: string;
    brief?: string;
    element: string;
    weapon: string;
    rarity: number;
  };
  skillInputGuide?: string;
  combatCycle?: string;
  baseStats?: CharacterBaseStats;
  skills?: SkillDetail[];
  additionalAbilities?: any[];
  attributeBonuses?: any[];
  eidolons?: any[];
  isRover?: boolean;
  [key: string]: any;
}

export interface WuwaWeapon extends BaseItem {
  id: string;
  gameId: 'ww';
  name: string;
  rarity: number;
  type: WWWeaponType;
  releaseVersion?: string;
  obtain?: string;
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
  isNotion?: boolean;
  content?: string;
}

export interface WuwaEcho extends BaseItem {
  id: string;
  name: string;
  cost: 1 | 3 | 4;
  sonataSets: string[];
  description: string;
  folderName?: string; 
  hasPhantom?: boolean;
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
