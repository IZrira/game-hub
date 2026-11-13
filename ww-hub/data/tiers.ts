import generatedTiers from './generated/tiers.json';

export interface TierCharacter {
  id: string;
  name: string;
  folderName: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '생존';
  change?: 'up' | 'down' | 'new' | 'stay';
  displayOrder?: number;
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

export const WW_TIER_CATEGORIES: TierCategory[] = [
  { id: 'tower', name: '역경의 탑', description: '심층 구역 기준' },
  { id: 'illusive', name: '죽음의 노래와 바닷속 폐허', description: '로그라이크 컨텐츠' },
  { id: 'hologram', name: '종말 매트릭스', description: '전략적 대응 필요' },
];

// Supabase tier_lists의 사본이다(원본은 관리자 페이지의 DB). 빌드 때 `npm run generate:content-snapshots`가 갱신하므로 직접 고치지 않는다.
export const WW_TIER_DATA: Record<string, TierGroup[]> = generatedTiers as Record<string, TierGroup[]>;
