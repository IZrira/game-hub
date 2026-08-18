// 공통 슬롯 인터페이스 (서브/대체 캐릭터 포함)
export interface PartySlot {
  characterId: string;
  characterName: string;
  folderName?: string;
  role?: string; // HSR: 메인 딜러/서브 딜러/서포터/탱커·힐러, WW: 메인/서브/서포터/생존, NTE: 메인/서브/서포터/탱커·힐러
  substitutes?: Array<{
    characterId: string;
    characterName: string;
    folderName?: string;
    description?: string;
    role?: string;
  }>;
}

// 공통 파티 기본 스키마
export interface BasePartyData {
  id: string;
  game: 'HSR' | 'WW' | 'NTE';
  name: string;
  description: string;
  tags: string[];
  mainDPS?: string;
  pros?: string[];
  cons?: string[];
  order: number;
  updatedAt: string;
}

// 게임별 특화 파티 타입
export interface HSRPartyData extends BasePartyData {
  game: 'HSR';
  category: '단일' | '범위' | '지속 피해' | '추가 공격' | '격파' | '기억' | '환락' | string;
  slots: [PartySlot, PartySlot, PartySlot, PartySlot]; // 4인 고정
}

export interface WWPartyData extends BasePartyData {
  game: 'WW';
  slots: [PartySlot, PartySlot, PartySlot]; // 3인 고정
}

export interface NTEPartyData extends BasePartyData {
  game: 'NTE';
  elementSynergy: string;
  slots: [PartySlot, PartySlot, PartySlot, PartySlot]; // 4인 고정
}

export type UnifiedPartyData = HSRPartyData | WWPartyData | NTEPartyData;

/**
 * TypeScript 코드 내보내기 직렬화 엔진
 */
export const exportPartyToTSCode = (game: 'HSR' | 'WW' | 'NTE', parties: UnifiedPartyData[]): string => {
  const varName = game === 'HSR' ? 'HSR_PARTIES' : game === 'WW' ? 'WW_PARTY_COMBINATIONS' : 'NTE_PARTY_COMBINATIONS';
  return `export const ${varName} = ${JSON.stringify(parties, null, 2)};\n`;
};
