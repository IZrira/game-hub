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
  stats: AniimoStats;
  checkedAt: string;
}
