export interface WuwaMainStat {
  cost: number;
  stats: string[];
  note?: string;
}

export interface WuwaCharacterGuide {
  id: string;
  patchVersion: string;
  weapons: {
    name: string;
    rank: number;
    note?: string;
  }[];
  echoSets: (string | { name: string; note?: string })[];
  mainEchoes: {
    name: string;
    reason?: string;
  }[];
  variants?: {
    name: string;
    echoSets: (string | { name: string; note?: string })[];
    mainEchoes: {
      name: string;
      reason?: string;
    }[];
    mainStats?: WuwaMainStat[];
    note?: string;
  }[];
  targetStats: {
    label: string;
    value: string;
  }[];
  mainStats: WuwaMainStat[];
  subStats: string[];
  skillPriority: string[];
  isUniversalSynergy?: boolean;
  synergyCharacters: string[];
}

// All WW character guides are now dynamically managed via Notion synchronization.
// Pre-Notion static hardcoded guides have been removed.
export const WW_CHARACTER_GUIDES: WuwaCharacterGuide[] = [];
