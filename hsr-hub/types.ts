import { GameId, HSRAttribute, HSRPath, MaterialItem, SkillDetail, StatBonus, CharacterBaseStats, BaseItem, WWAttribute } from '../common-hub/types';

export interface HsrCharacter extends BaseItem {
  id?: string; 
  name?: string;
  gameId?: GameId;
  folderName?: string; 
  fileName?: string; 
  fixedUrl?: string; 
  attribute?: HSRAttribute | WWAttribute;
  path?: HSRPath;
  rarity?: number;
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

export interface HsrLightConeStat {
  "기초 HP": number;
  "기초 공격력": number;
  "기초 방어력": number;
}

export interface AscensionMaterialStep {
  level: number;
  items: MaterialItem[];
}

export interface HsrLightCone extends BaseItem {
  id: string;
  gameId?: 'hsr';
  name: string;
  folderName: string;
  fileName?: string;
  rarity: number;
  path: HSRPath;
  baseStats?: {
    lv1?: HsrLightConeStat;
    lv20?: HsrLightConeStat;
    lv30?: HsrLightConeStat;
    lv40?: HsrLightConeStat;
    lv50?: HsrLightConeStat;
    lv60?: HsrLightConeStat;
    lv70?: HsrLightConeStat;
    lv80?: HsrLightConeStat;
  };
  skill?: {
    name: string;
    description: string;
    descriptions?: string[]; // [rank1, rank2, rank3, rank4, rank5]
  };
  ascensionMaterials?: AscensionMaterialStep[];
  source?: string;
  story?: string;
  releaseVersion?: string;
}

export interface HsrRelic extends BaseItem {
  id: string;
  gameId: 'hsr';
  name: string;
  folderName: string;
  type: string;
  rarity?: number;
  pieces: string[];
  setEffect: {
    '2piece': string;
    '4piece'?: string;
  };
  source?: string;
  story?: string;
}

export interface HsrOrnament extends BaseItem {
  id: string;
  gameId: 'hsr';
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
