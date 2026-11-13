import generatedParties from './generated/parties.json';

export interface PartyMember {
  id: string;
  name: string;
  folderName: string;
  role: string;
}

export interface PartyCombination {
  id: string;
  name: string;
  description: string;
  members: PartyMember[];
  pros: string[];
  cons: string[];
}

// 관리자 페이지의 DB(party_recommendations) 사본이다. 빌드 때 `npm run generate:content-snapshots`가 갱신하므로 직접 고치지 않는다.
export const WW_PARTY_COMBINATIONS: PartyCombination[] = (generatedParties as Partial<PartyCombination>[]).map(party => ({
  ...party,
  pros: party.pros || [],
  cons: party.cons || [],
}) as PartyCombination);
