import generatedTiers from './generated/tiers.json';

export interface TierCharacter {
  id: string;
  name: string;
  folderName: string;
  role: string;
  change?: 'up' | 'down' | 'new' | 'stay';
  displayOrder?: number;
  isTrailblazer?: boolean;
}

export interface TierCategory {
  id: string;
  name: string;
  description: string;
}

export interface TierGroup {
  tier: string;
  label: string;
  color: string;
  characters: TierCharacter[];
}

export interface TierChangeLog {
  name: string;
  type: 'new' | 'up' | 'down' | 'stay' | 'rework';
  description: string;
}


export const HSR_TIER_CATEGORIES: TierCategory[] = [
  { id: 'chaos', name: '혼돈 12층', description: '와류 반영 O' },
  { id: 'fiction', name: '허구 이야기', description: '범위 공격 메타' },
  { id: 'shadow', name: '종말', description: '종말의 환영' },
  { id: 'divergent', name: '이상 중재', description: '차분화 우주' },
];

// Supabase tier_lists의 사본이다(원본은 관리자 페이지의 DB). 빌드 때 `npm run generate:content-snapshots`가 갱신하므로 직접 고치지 않는다.
export const HSR_TIER_DATA: Record<string, TierGroup[]> = generatedTiers as Record<string, TierGroup[]>;
