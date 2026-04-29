import { PartyCombination } from './index';

export const breakParties: PartyCombination[] = [
  {
    id: 'party_rappa_break_1',
    name: '라파 격파 파티 (1순위)',
    description: '라파의 격파 능력을 망귀인과 달리아로 보조하는 조합입니다.',
    mainDPS: '라파',
    category: '격파',
    members: [
      { id: 'char_라파', name: '라파', role: '메인 딜러', folderName: '라파' },
      { id: 'char_망귀인', name: '망귀인', role: '서포터', folderName: '망귀인' },
      { id: 'char_달리아', name: '달리아', role: '서포터', folderName: '달리아' },
      { 
        id: 'char_영사', 
        name: '영사', 
        role: '탱커/힐러', 
        folderName: '영사',
        substitutes: [
          { name: '갤러거', folderName: '갤러거' },
          { name: '개척자 (화합)', folderName: '개척자 (화합)', isTrailblazer: true },
          { name: '단항•등황', folderName: '단항•등황' },
          { name: '완•매', folderName: '완•매' }
        ]
      }
    ],
    tags: ['라파', '격파', '망귀인']
  },
  {
    id: 'party_firefly_break_1',
    name: '반디 격파 파티 (1순위)',
    description: '반디의 격파 능력을 망귀인과 달리아로 보조하는 최신 격파 조합입니다.',
    mainDPS: '반디',
    category: '격파',
    members: [
      { id: 'char_반디', name: '반디', role: '메인 딜러', folderName: '반디' },
      { id: 'char_망귀인', name: '망귀인', role: '서포터', folderName: '망귀인' },
      { id: 'char_달리아', name: '달리아', role: '서포터', folderName: '달리아' },
      { 
        id: 'char_영사', 
        name: '영사', 
        role: '탱커/힐러', 
        folderName: '영사',
        substitutes: [
          { name: '개척자 (화합)', folderName: '개척자 (화합)', isTrailblazer: true },
          { name: '갤러거', folderName: '갤러거' },
          { name: '완•매', folderName: '완•매' }
        ]
      }
    ],
    tags: ['반디', '격파', '망귀인']
  },
  {
    id: 'party_boothill_break_1',
    name: '부트힐 격파 파티 (1순위)',
    description: '부트힐의 강력한 격파 능력을 망귀인과 완•매로 보조하는 최적의 조합입니다.',
    mainDPS: '부트힐',
    category: '격파',
    members: [
      { id: 'char_부트힐', name: '부트힐', role: '메인 딜러', folderName: '부트힐' },
      { id: 'char_망귀인', name: '망귀인', role: '서포터', folderName: '망귀인' },
      { 
        id: 'char_완매', 
        name: '완•매', 
        role: '서포터', 
        folderName: '완•매',
        substitutes: [
          { name: '개척자 (화합)', folderName: '개척자 (화합)', isTrailblazer: true }
        ]
      },
      { id: 'char_달리아', name: '달리아', role: '탱커/힐러', folderName: '달리아' }
    ],
    tags: ['부트힐', '격파', '망귀인']
  },
  {
    id: 'party_boothill_break_2',
    name: '부트힐 격파 파티 (2순위)',
    description: '영사를 기용하여 안정성을 높인 부트힐 격파 조합입니다.',
    mainDPS: '부트힐',
    category: '격파',
    members: [
      { id: 'char_부트힐', name: '부트힐', role: '메인 딜러', folderName: '부트힐' },
      { id: 'char_망귀인', name: '망귀인', role: '서포터', folderName: '망귀인' },
      { 
        id: 'char_완매', 
        name: '완•매', 
        role: '서포터', 
        folderName: '완•매',
        substitutes: [
          { name: '개척자 (화합)', folderName: '개척자 (화합)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_영사', 
        name: '영사', 
        role: '탱커/힐러', 
        folderName: '영사',
        substitutes: [
          { name: '단항•등황', folderName: '단항•등황' },
          { name: '어벤츄린', folderName: '어벤츄린' }
        ]
      }
    ],
    tags: ['부트힐', '격파', '영사']
  },
  {
    id: 'party_himeko_break_1',
    name: '히메코 격파 파티 (1순위)',
    description: '히메코의 강인도 소모 능력을 망귀인과 달리아로 극대화한 격파 조합입니다.',
    mainDPS: '히메코',
    category: '격파',
    members: [
      { id: 'char_히메코', name: '히메코', role: '메인 딜러', folderName: '히메코' },
      { id: 'char_망귀인', name: '망귀인', role: '서포터', folderName: '망귀인' },
      { id: 'char_달리아', name: '달리아', role: '서포터', folderName: '달리아' },
      { id: 'char_영사', name: '영사', role: '탱커/힐러', folderName: '영사' }
    ],
    tags: ['히메코', '격파', '망귀인']
  }
];
