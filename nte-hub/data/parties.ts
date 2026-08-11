import { NTE_CHARACTERS } from './index';

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

export const NTE_PARTY_COMBINATIONS: NTEPartyCombination[] = [
  {
    id: 'nte_guwon_spirit_hyper',
    name: '구원 령 속성 폭딜 파티',
    description: '구원의 강력한 령 속성 메인 딜링과 민트의 속성 시너지를 극대화하는 에이본 골동품점 대표 파티 조합입니다.',
    mainDPS: '구원',
    tags: ['구원', '령', '에이본 골동품점', '폭딜'],
    category: '령 속성 시너지',
    pros: ['강력한 령 속성 연계 딜링', '에이본 골동품점 캐릭터 시너지'],
    cons: ['속성 디버프 해제 수단 부족'],
    members: [
      { id: 'nte-guwon', name: '구원', role: '메인 딜러', folderName: '구원', attribute: '령' },
      { 
        id: 'nte-mint', 
        name: '민트', 
        role: '서브 딜러', 
        folderName: '민트', 
        attribute: '령',
        substitutes: [{ id: 'nte-adler', name: '아들러', folderName: '아들러', role: '서브 딜러' }]
      },
      { 
        id: 'nte-hotori', 
        name: '호토리', 
        role: '서포터', 
        folderName: '호토리', 
        attribute: '빛',
        substitutes: [{ id: 'nte-cheese', name: '치즈', folderName: '치즈', role: '서포터' }]
      },
      {
        id: 'nte-lacrimosa',
        name: '라크리모사',
        role: '탱커/힐러',
        folderName: '라크리모사',
        attribute: '암',
        substitutes: [{ id: 'nte-cheese', name: '치즈', folderName: '치즈', role: '탱커/힐러' }]
      }
    ]
  },
  {
    id: 'nte_mint_spirit_control',
    name: '민트 령 속성 제어 파티',
    description: '민트의 령 속성 보조 딜링과 구원의 강력한 범위 타격을 결합한 에이본 시너지 파티입니다.',
    mainDPS: '민트',
    tags: ['민트', '령', '제어'],
    category: '령 속성 시너지',
    pros: ['유연한 서브 딜링', '높은 속성 연계성'],
    cons: ['방어적 지원의존도 존재'],
    members: [
      { id: 'nte-mint', name: '민트', role: '메인 딜러', folderName: '민트', attribute: '령' },
      { 
        id: 'nte-guwon', 
        name: '구원', 
        role: '서브 딜러', 
        folderName: '구원', 
        attribute: '령',
        substitutes: [{ id: 'nte-lacrimosa', name: '라크리모사', folderName: '라크리모사', role: '서브 딜러' }]
      },
      { 
        id: 'nte-adler', 
        name: '아들러', 
        role: '서포터', 
        folderName: '아들러', 
        attribute: '주',
        substitutes: [{ id: 'nte-hotori', name: '호토리', folderName: '호토리', role: '서포터' }]
      },
      {
        id: 'nte-cheese',
        name: '치즈',
        role: '탱커/힐러',
        folderName: '치즈',
        attribute: '빛',
        substitutes: [{ id: 'nte-lacrimosa', name: '라크리모사', folderName: '라크리모사', role: '탱커/힐러' }]
      }
    ]
  },
  {
    id: 'nte_cheese_light_synergy',
    name: '치즈 & 호토리 빛 속성 연계 파티',
    description: '빛 속성 캐릭터들의 유기적인 전술 연계 및 지속적인 화력 보조를 구현한 조합입니다.',
    mainDPS: '치즈',
    tags: ['치즈', '빛', '광휘'],
    category: '빛 속성 시너지',
    pros: ['지속적인 광휘 피해', '뛰어난 파티 시너지'],
    cons: ['단일 대상 폭딜 한계'],
    members: [
      { id: 'nte-cheese', name: '치즈', role: '메인 딜러', folderName: '치즈', attribute: '빛' },
      { 
        id: 'nte-hotori', 
        name: '호토리', 
        role: '서브 딜러', 
        folderName: '호토리', 
        attribute: '빛',
        substitutes: [{ id: 'nte-adler', name: '아들러', folderName: '아들러', role: '서브 딜러' }]
      },
      { 
        id: 'nte-mint', 
        name: '민트', 
        role: '서포터', 
        folderName: '민트', 
        attribute: '령',
        substitutes: [{ id: 'nte-lacrimosa', name: '라크리모사', folderName: '라크리모사', role: '서포터' }]
      },
      {
        id: 'nte-guwon',
        name: '구원',
        role: '탱커/힐러',
        folderName: '구원',
        attribute: '령',
        substitutes: [{ id: 'nte-adler', name: '아들러', folderName: '아들러', role: '탱커/힐러' }]
      }
    ]
  },
  {
    id: 'nte_hotori_light_radiance',
    name: '호토리 빛 속성 광휘 파티',
    description: '호토리의 광휘 스킬을 중심으로 치즈와 함께 빛 속성 공조를 일으키는 공격형 조합입니다.',
    mainDPS: '호토리',
    tags: ['호토리', '빛', '공격형'],
    category: '빛 속성 시너지',
    pros: ['빠른 스킬 순환', '빛 속성 공조 효과'],
    cons: ['체력 관리 주의 필요'],
    members: [
      { id: 'nte-hotori', name: '호토리', role: '메인 딜러', folderName: '호토리', attribute: '빛' },
      { 
        id: 'nte-cheese', 
        name: '치즈', 
        role: '서브 딜러', 
        folderName: '치즈', 
        attribute: '빛',
        substitutes: [{ id: 'nte-mint', name: '민트', folderName: '민트', role: '서브 딜러' }]
      },
      { 
        id: 'nte-guwon', 
        name: '구원', 
        role: '서포터', 
        folderName: '구원', 
        attribute: '령',
        substitutes: [{ id: 'nte-lacrimosa', name: '라크리모사', folderName: '라크리모사', role: '서포터' }]
      },
      {
        id: 'nte-adler',
        name: '아들러',
        role: '탱커/힐러',
        folderName: '아들러',
        attribute: '주',
        substitutes: [{ id: 'nte-mint', name: '민트', folderName: '민트', role: '탱커/힐러' }]
      }
    ]
  },
  {
    id: 'nte_adler_curse_support',
    name: '아들러 주 속성 지원 파티',
    description: '아들러의 주 속성 디버프 능력과 라크리모사의 제어 성능을 극대화한 전술적 파티 조합입니다.',
    mainDPS: '아들러',
    tags: ['아들러', '주', '전술'],
    category: '주/암 속성 시너지',
    pros: ['상대 디버프 및 지속 피해', '안정적인 보조 성능'],
    cons: ['순간 폭딜 능력 부족'],
    members: [
      { id: 'nte-adler', name: '아들러', role: '메인 딜러', folderName: '아들러', attribute: '주' },
      { 
        id: 'nte-lacrimosa', 
        name: '라크리모사', 
        role: '서브 딜러', 
        folderName: '라크리모사', 
        attribute: '암',
        substitutes: [{ id: 'nte-guwon', name: '구원', folderName: '구원', role: '서브 딜러' }]
      },
      { 
        id: 'nte-mint', 
        name: '민트', 
        role: '서포터', 
        folderName: '민트', 
        attribute: '령',
        substitutes: [{ id: 'nte-hotori', name: '호토리', folderName: '호토리', role: '서포터' }]
      },
      {
        id: 'nte-cheese',
        name: '치즈',
        role: '탱커/힐러',
        folderName: '치즈',
        attribute: '빛',
        substitutes: [{ id: 'nte-hotori', name: '호토리', folderName: '호토리', role: '탱커/힐러' }]
      }
    ]
  },
  {
    id: 'nte_lacrimosa_dark_control',
    name: '라크리모사 암속성 제어 파티',
    description: '라크리모사의 단일 암속성 딜링과 아들러의 주 속성 지원을 결합한 제어 특화 파티입니다.',
    mainDPS: '라크리모사',
    tags: ['라크리모사', '암', '제어'],
    category: '암/주 속성 시너지',
    pros: ['강력한 단일 제어', '암/주 속성 시너지'],
    cons: ['광역 잡몹 처리 속도 저하'],
    members: [
      { id: 'nte-lacrimosa', name: '라크리모사', role: '메인 딜러', folderName: '라크리모사', attribute: '암' },
      { 
        id: 'nte-adler', 
        name: '아들러', 
        role: '서브 딜러', 
        folderName: '아들러', 
        attribute: '주',
        substitutes: [{ id: 'nte-mint', name: '민트', folderName: '민트', role: '서브 딜러' }]
      },
      { 
        id: 'nte-hotori', 
        name: '호토리', 
        role: '서포터', 
        folderName: '호토리', 
        attribute: '빛',
        substitutes: [{ id: 'nte-cheese', name: '치즈', folderName: '치즈', role: '서포터' }]
      },
      {
        id: 'nte-guwon',
        name: '구원',
        role: '탱커/힐러',
        folderName: '구원',
        attribute: '령',
        substitutes: [{ id: 'nte-mint', name: '민트', folderName: '민트', role: '탱커/힐러' }]
      }
    ]
  }
];

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
