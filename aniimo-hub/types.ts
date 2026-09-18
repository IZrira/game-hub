export interface AniimoStats {
  total: number | null;
  hp: number | null;
  break: number | null;
  attack: number | null;
  magicDefense: number | null;
  physicalDefense: number | null;
  energyRecovery: number | null;
}

export interface AniimoEntry {
  number: string;
  name: string;
  elements: string[];
  positions: string[];
  sourcePath: string;
  sourceUrl: string;
  imageUrl: string | null;
  forms: AniimoForm[];
  stats: AniimoStats;
  description: string;
  locations: string[];
  homeAbilities: Array<{ type: string; value: number | null }>;
  explorationSkills: AniimoSkill[];
  traits: AniimoSkill[];
  combatSkills: AniimoSkill[];
  uniqueSkills: AniimoSkill[];
  evolution: Array<{ stage: string; imageUrl: string | null }>;
  resonanceLevels: Array<{ level: string; requirement: string; material: string; materialImageUrl: string | null }>;
  checkedAt: string;
}

export interface AniimoForm {
  key: string;
  label: string;
  imageUrl: string | null;
  description: string;
  stats: AniimoStats;
  sourceUrl: string;
}

export interface AniimoSkill {
  name: string;
  description: string;
  imageUrl: string | null;
  skillType?: string;
  energyCost?: number | null;
  power?: number | null;
}
