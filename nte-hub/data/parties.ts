import { NTE_CHARACTERS } from './index';
import generatedParties from './generated/parties.json';

export interface NTEPartyMember {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러' | string;
  folderName: string;
  attribute?: string;
  substitutes?: {
    id?: string;
    name: string;
    folderName: string;
    role?: string;
  }[];
}

export interface NTEPartyCombination {
  id: string;
  name: string;
  description: string;
  mainDPS?: string;
  members: NTEPartyMember[];
  tags?: string[];
  category?: string;
  pros?: string[];
  cons?: string[];
}

// 관리자 페이지의 DB(party_recommendations) 사본이다. 빌드 때 `npm run generate:content-snapshots`가 갱신하므로 직접 고치지 않는다.
export const NTE_PARTY_COMBINATIONS: NTEPartyCombination[] = generatedParties as NTEPartyCombination[];

/**
 * NTE 캐릭터가 사전 정의 파티에 없거나 미완성일 경우,
 * 역할 및 속성에 기반한 동적 대체 파티 조합을 생성하여 반환하는 헬퍼 함수
 */
export function getNTEFallbackParty(characterNameOrId: string): NTEPartyCombination {
  const char = NTE_CHARACTERS.find(
    c => c.id === characterNameOrId || c.name === characterNameOrId || c.folderName === characterNameOrId
  );

  const charName = char ? char.name : (characterNameOrId || 'NTE 캐릭터');
  const charFolder = char ? char.folderName : charName;
  const charAttribute = char ? char.attribute : '령';
  const charId = char ? char.id : `nte-${charName}`;

  // 속성이 일치하거나 다른 NTE 캐릭터들을 수집
  const matchAttrOthers = NTE_CHARACTERS.filter(c => c.name !== charName && c.attribute === charAttribute);
  const diffAttrOthers = NTE_CHARACTERS.filter(c => c.name !== charName && c.attribute !== charAttribute);
  
  const pool = [...matchAttrOthers, ...diffAttrOthers];

  const roles: ('서브 딜러' | '서포터' | '탱커/힐러')[] = ['서브 딜러', '서포터', '탱커/힐러'];
  const members: NTEPartyMember[] = [
    {
      id: charId,
      name: charName,
      role: '메인 딜러',
      folderName: charFolder,
      attribute: charAttribute
    }
  ];

  for (let i = 0; i < 3; i++) {
    const candidate = pool[i % pool.length];
    const subCandidate = pool[(i + 1) % pool.length];
    
    if (candidate) {
      members.push({
        id: candidate.id,
        name: candidate.name,
        role: roles[i] || '서포터',
        folderName: candidate.folderName || candidate.name,
        attribute: candidate.attribute,
        substitutes: subCandidate ? [
          {
            id: subCandidate.id,
            name: subCandidate.name,
            folderName: subCandidate.folderName || subCandidate.name,
            role: roles[i] || '서포터'
          }
        ] : []
      });
    } else {
      members.push({
        id: `nte-sub-${i}`,
        name: `동료 ${i + 1}`,
        role: roles[i] || '서포터',
        folderName: `동료 ${i + 1}`,
        attribute: charAttribute
      });
    }
  }

  return {
    id: `nte_fallback_${charId}`,
    name: `${charName} 범용 추천 파티`,
    description: `${charName}의 ${charAttribute} 속성과 균형 잡힌 역할군 시너지를 발휘하는 추천 파티 조합입니다.`,
    mainDPS: charName,
    category: `${charAttribute} 속성 표준 파티`,
    tags: [charName, charAttribute, '추천 파티'],
    pros: ['균형 잡힌 역할군 구성', '범용적인 전술 적응력'],
    cons: ['특화 연계 데미지 한계'],
    members
  };
}
