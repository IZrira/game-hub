export type Gf2Job = '불워크' | '센티널' | '뱅가드' | '서포트';
export type Gf2Element = '물리' | '산성' | '연소' | '탁류' | '전도' | '공진' | '빙결';

/** 목록·허브용 요약 (gf2-hub/data/generated/summary.json) */
export interface Gf2DollSummary {
  name: string;
  releaseOrder: number;
  rarity: '정예' | '표준' | string;
  job: Gf2Job | string;
  element: Gf2Element | string;
  weakness: string;
  weapon: string;
  affiliation: string;
  imageFolder: string;
}

/** 상세용 전체 데이터 (gf2-hub/data/generated/dolls/NNN.json). 긴 항목은 Notion 원문 줄바꿈을 유지한다. */
export interface Gf2Doll extends Gf2DollSummary {
  model: string;
  names: string;
  voice: string;
  description: string;
  stats: string;
  basicAttack: string;
  active1: string;
  active2: string;
  ultimate: string;
  passive: string;
  mind: string;
  helix: string;
  bondKey: string;
  bondReward: string;
  core: string;
  gifts: string;
  skins: string;
  terms: string;
}
