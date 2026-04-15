import { PartyCombination } from './index';

export const elationParties: PartyCombination[] = [
  {
    id: 'party_clara_counter_1',
    name: '클라라 반격 파티 (1순위)',
    description: '클라라의 반격 능력을 선데이와 트리비로 보조하는 조합입니다.',
    mainDPS: '클라라',
    category: '환락',
    members: [
      { id: 'char_클라라', name: '클라라', role: '메인 딜러', folderName: '클라라' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['클라라', '반격', '환락']
  },
  {
    id: 'party_sparky_elation_1',
    name: '스파키 환락 파티 (1순위)',
    description: '스파키의 환락 메커니즘을 스파클과 효광으로 보조하는 조합입니다.',
    mainDPS: '스파키',
    category: '환락',
    members: [
      { id: 'char_스파키', name: '스파키', role: '메인 딜러', folderName: '스파키' },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { 
        id: 'char_효광', 
        name: '효광', 
        role: '서포터', 
        folderName: '효광',
        substitutes: [
          { name: '트리비', folderName: '트리비' },
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '곽향', folderName: '곽향' },
          { name: '어벤츄린', folderName: '어벤츄린' },
          { name: '부현', folderName: '부현' },
          { name: '히아킨', folderName: '히아킨' },
          { name: '나찰', folderName: '나찰' }
        ]
      }
    ],
    tags: ['스파키', '환락', '스파클']
  },
  {
    id: 'party_trailblazer_memory_gen_6',
    name: '개척자 (기억) 범용 파티 (스파키)',
    description: '스파키의 화력을 개척자(기억)와 스파클로 보조하는 조합입니다.',
    mainDPS: '스파키',
    category: '환락',
    members: [
      { id: 'char_스파키', name: '스파키', role: '메인 딜러', folderName: '스파키' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['개척자', '기억', '스파키']
  },
  {
    id: 'party_yunli_counter_1',
    name: '운리 반격 파티 (1순위)',
    description: '운리의 반격 능력을 선데이와 트리비로 보조하는 조합입니다.',
    mainDPS: '운리',
    category: '환락',
    members: [
      { id: 'char_운리', name: '운리', role: '메인 딜러', folderName: '운리' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true },
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '로빈', folderName: '로빈' },
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '곽향', folderName: '곽향' },
          { name: '히아킨', folderName: '히아킨' }
        ]
      }
    ],
    tags: ['운리', '반격', '선데이']
  },
  {
    id: 'party_yunli_counter_2',
    name: '운리 반격 파티 (2순위)',
    description: '개척자(기억)와 로빈의 서포팅을 받는 운리 조합입니다.',
    mainDPS: '운리',
    category: '환락',
    members: [
      { id: 'char_운리', name: '운리', role: '메인 딜러', folderName: '운리' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_로빈', name: '로빈', role: '서포터', folderName: '로빈' },
      { id: 'char_곽향', name: '곽향', role: '탱커/힐러', folderName: '곽향' }
    ],
    tags: ['운리', '반격', '로빈']
  }
];
