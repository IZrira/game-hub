export interface PartyMember {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러';
  folderName: string;
  isTrailblazer?: boolean;
  substitutes?: { name: string; folderName: string; isTrailblazer?: boolean; role?: string; }[];
}

export interface PartyCombination {
  id: string;
  name: string;
  description: string;
  mainDPS: string;
  members: PartyMember[];
  tags: string[];
  category: '단일' | '범위' | '지속 피해' | '추가 공격' | '격파' | '기억' | '환락';
}

import { followUpParties } from './follow_up';
import { elationParties } from './elation';
import { aoeParties } from './aoe';
import { memoryParties } from './memory';
import { singleParties } from './single';
import { breakParties } from './break';
import { dotParties } from './dot';

// 캐릭터 도감 최신순 기반 버전 매핑
const CHAR_VERSION_MAP: Record<string, number> = {
  // v4.2
  '에바네시아': 4.2,
  '은랑 LV.999': 4.2,
  '개척자 (환락)': 4.2,
  // v4.1
  '애쉬베일': 4.1,
  '스파키': 4.1,
  '효광': 4.1,
  // v4.0
  '아처': 4.0,
  // v3.x
  '마이데이': 3.5,
  '카스토리스': 3.5,
  '히실렌스': 3.5,
  '아글라이아': 3.5,
  '더 헤르타': 3.5,
  '아낙사': 3.5,
  '트리비': 3.5,
  '키레네': 3.5,
  '히아킨': 3.5,
  '단항•등황': 3.5,
  '케리드라': 3.5,
  '파이논': 3.2,
  '에버나이트': 3.2,
  '세이버': 3.1,
  // v2.x (정규 업데이트순)
  '선데이': 2.7,
  '라파': 2.6,
  '비소': 2.5,
  '영사': 2.5,
  '맥택': 2.5,
  '운리': 2.4,
  '초구': 2.4,
  '반디': 2.3,
  '제이드': 2.3,
  '로빈': 2.2,
  '부트힐': 2.2,
  '아케론': 2.1,
  '어벤츄린': 2.1,
  '갤러거': 2.1,
  '블랙 스완': 2.0,
  '스파클': 2.0,
  // v1.x
  'Dr. 레이시오': 1.6,
  '완•매': 1.6,
  '곽향': 1.5,
  '아젠티': 1.5,
  '경류': 1.4,
  '토파즈 & 복순이': 1.4,
  '부현': 1.3,
  '단항•음월': 1.3,
  '카프카': 1.2,
  '블레이드': 1.2,
  '나찰': 1.1,
  '은랑': 1.1,
  '제레': 1.0,
  '경원': 1.0,
  '클라라': 1.0,
  '연경': 1.0,
  '히메코': 1.0
};

const allParties: PartyCombination[] = [
  ...followUpParties,
  ...elationParties,
  ...aoeParties,
  ...memoryParties,
  ...singleParties,
  ...breakParties,
  ...dotParties
];

/**
 * 파티원 중 도감에서 가장 최신(가장 높은 버전) 캐릭터의 버전을 반환
 */
const getPartyMaxVersion = (party: PartyCombination): number => {
  const versions = party.members.map(member => CHAR_VERSION_MAP[member.name] || 1.0);
  return Math.max(...versions);
};

// 도감 최신 캐릭터 포함 여부를 기준으로 내림차순 정렬
export const HSR_PARTIES: PartyCombination[] = [...allParties].sort((a, b) => {
  const maxVersionA = getPartyMaxVersion(a);
  const maxVersionB = getPartyMaxVersion(b);

  return maxVersionB - maxVersionA;
});
