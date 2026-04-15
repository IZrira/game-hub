export interface PartyMember {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러';
  folderName: string;
  isTrailblazer?: boolean;
  substitutes?: { name: string; folderName: string; isTrailblazer?: boolean }[];
}

export interface PartyCombination {
  id: string;
  name: string;
  description: string;
  mainDPS: string;
  members: PartyMember[];
  tags: string[];
  category: '단일' | '범위' | '추가 공격' | '지속 피해' | '격파' | '기억' | '환락';
}

import { aoeParties } from './aoe';
import { memoryParties } from './memory';
import { singleParties } from './single';
import { breakParties } from './break';
import { elationParties } from './elation';
import { followUpParties } from './follow_up';
import { dotParties } from './dot';

export const HSR_PARTIES: PartyCombination[] = [
  ...aoeParties,
  ...memoryParties,
  ...singleParties,
  ...breakParties,
  ...elationParties,
  ...followUpParties,
  ...dotParties
];
