/** Notion "아주르 캐릭터 DB" 한 명 (azur-hub/data/characters.json). 비어 있는 칸은 아직 정리 전이다. */
export interface AzurCharacter {
  name: string;
  releaseOrder: number;
  rarity: string;
  elements: string[];
  job: string;
  positions: string;
  weapon: string;
  race: string;
  affiliation: string;
  birthday: string;
  releaseVersion: string;
  names: string;
  voice: string;
  description: string;
  basicAttack: string;
  skill: string;
  ultimate: string;
  switchSkill: string;
  passive: string;
}

/** 키보 (azur-hub/data/kibo.json). 번호는 도감 번호, 이미지는 기본·이색·특수 그림. */
export interface AzurKibo {
  no: number;
  name: string;
  variants: Array<{ label: string; file: string }>;
}
