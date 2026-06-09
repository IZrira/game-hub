import { PartyCombination } from './index';

export const elationParties: PartyCombination[] = [
  {
    id: 'party_evanescia_elation_1',
    name: '에바네시아 파티 (1순위)',
    description: '에바네시아의 화력을 극대화하는 환락 특화 시너지 조합입니다.',
    mainDPS: '에바네시아',
    category: '환락',
    members: [
      { id: 'char_에바네시아', name: '에바네시아', role: '메인 딜러', folderName: '에바네시아' },
      { 
        id: 'char_효광', 
        name: '효광', 
        role: '서포터', 
        folderName: '효광',
        substitutes: [
          { name: '트리비', role: '서포터', folderName: '트리비' },
          { name: '완•매', role: '서포터', folderName: '완•매' },
          { name: '선데이', role: '서포터', folderName: '선데이' },
          { name: '키레네', role: '서포터', folderName: '키레네' }
        ]
      },
      { 
        id: 'char_개척자_환락', 
        name: '개척자 (환락)', 
        role: '서포터', 
        folderName: '개척자 (환락)',
        isTrailblazer: true,
        substitutes: [
          { name: '스파키', role: '서포터', folderName: '스파키' },
          { name: '트리비', role: '서포터', folderName: '트리비' }
        ]
      },
      { 
        id: 'char_곽향', 
        name: '곽향', 
        role: '탱커/힐러', 
        folderName: '곽향',
        substitutes: [
          { name: '단항•등황', role: '메인 딜러', folderName: '단항•등황' },
          { name: '히아킨', role: '힐러', folderName: '히아킨' },
          { name: '어벤츄린', role: '탱커', folderName: '어벤츄린' },
          { name: '부현', role: '탱커', folderName: '부현' }
        ]
      }
    ],
    tags: ['에바네시아', '환락', '효광']
  },
  {
    id: 'party_silverwolf_999_elation_1',
    name: '은랑 LV.999 파티',
    description: '은랑 LV.999의 화력을 스파키와 효광으로 보조하는 환락 특화 시너지 조합입니다.',
    mainDPS: '은랑 LV.999',
    category: '환락',
    members: [
      { id: 'char_은랑_LV999', name: '은랑 LV.999', role: '메인 딜러', folderName: '은랑 LV.999' },
      { id: 'char_스파키', name: '스파키', role: '서브 딜러', folderName: '스파키' },
      { 
        id: 'char_효광', 
        name: '효광', 
        role: '서포터', 
        folderName: '효광',
        substitutes: [
          { name: '아스타', role: '서포터', folderName: '아스타' },
          { name: '개척자 (환락)', role: '서포터', folderName: '개척자 (환락)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_곽향', 
        name: '곽향', 
        role: '탱커/힐러', 
        folderName: '곽향',
        substitutes: [
          { name: '단항•등황', role: '메인 딜러', folderName: '단항•등황' },
          { name: '히아킨', role: '힐러', folderName: '히아킨' }
        ]
      }
    ],
    tags: ['은랑 LV.999', '환락', '스파키']
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
          { name: '트리비', role: '서포터', folderName: '트리비' },
          { name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '곽향', role: '힐러', folderName: '곽향' },
          { name: '어벤츄린', role: '탱커', folderName: '어벤츄린' },
          { name: '부현', role: '탱커', folderName: '부현' },
          { name: '히아킨', role: '힐러', folderName: '히아킨' },
          { name: '나찰', role: '힐러', folderName: '나찰' }
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
          { name: '스파클', role: '서포터', folderName: '스파클' }
        ]
      },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['클라라', '반격', '환락']
  }
];
