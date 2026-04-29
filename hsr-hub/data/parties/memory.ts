import { PartyCombination } from './index';

export const memoryParties: PartyCombination[] = [
  {
    id: 'party_aglaya_hyper_1',
    name: '아글라이아 하이퍼캐리 (키레네 조합)',
    description: '아글라이아와 키레네의 시너지를 극대화한 1순위 조합입니다. (키레네 대체: 로빈 / 개척자 대체: 선데이 / 생존 대체: 곽향, 히아킨)',
    mainDPS: '아글라이아',
    category: '기억',
    members: [
      { id: 'char_아글라이아', name: '아글라이아', role: '메인 딜러', folderName: '아글라이아' },
      { 
        id: 'char_키레네', 
        name: '키레네', 
        role: '서포터', 
        folderName: '키레네',
        substitutes: [
          { name: '로빈', folderName: '로빈' }
        ]
      },
      { 
        id: 'char_개척자_기억', 
        name: '개척자 (기억)', 
        role: '서포터', 
        folderName: '개척자 (기억)', 
        isTrailblazer: true,
        substitutes: [
          { name: '선데이', folderName: '선데이' }
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
    tags: ['아글라이아', '기억', '키레네']
  },
  {
    id: 'party_aglaya_hyper_2',
    name: '아글라이아 하이퍼캐리 (로빈 조합)',
    description: '로빈과 선데이의 서포팅을 받는 2순위 조합입니다.',
    mainDPS: '아글라이아',
    category: '기억',
    members: [
      { id: 'char_아글라이아', name: '아글라이아', role: '메인 딜러', folderName: '아글라이아' },
      { id: 'char_로빈', name: '로빈', role: '서포터', folderName: '로빈' },
      { id: 'char_선데이', name: '선데이', role: '서포터', folderName: '선데이' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아글라이아', '기억', '로빈']
  },
  {
    id: 'party_aglaya_hyper_3',
    name: '아글라이아 하이퍼캐리 (곽향 조합)',
    description: '로빈과 선데이의 서포팅에 곽향의 에너지 회복을 더한 3순위 조합입니다.',
    mainDPS: '아글라이아',
    category: '기억',
    members: [
      { id: 'char_아글라이아', name: '아글라이아', role: '메인 딜러', folderName: '아글라이아' },
      { id: 'char_로빈', name: '로빈', role: '서포터', folderName: '로빈' },
      { id: 'char_선데이', name: '선데이', role: '서포터', folderName: '선데이' },
      { id: 'char_곽향', name: '곽향', role: '탱커/힐러', folderName: '곽향' }
    ],
    tags: ['아글라이아', '기억', '곽향']
  },
  {
    id: 'party_aglaya_3supporter',
    name: '아글라이아 3서포터 조합',
    description: '아글라이아를 위해 3명의 서포터를 기용하여 화력을 집중하는 조합입니다.',
    mainDPS: '아글라이아',
    category: '기억',
    members: [
      { id: 'char_아글라이아', name: '아글라이아', role: '메인 딜러', folderName: '아글라이아' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' }
    ],
    tags: ['아글라이아', '3서포터']
  },
  {
    id: 'party_castoris_memory_1',
    name: '카스토리스 기억 파티 (1순위)',
    description: '카스토리스의 기억 메커니즘을 에버나이트와 키레네로 극대화한 조합입니다.',
    mainDPS: '카스토리스',
    category: '기억',
    members: [
      { id: 'char_카스토리스', name: '카스토리스', role: '메인 딜러', folderName: '카스토리스' },
      { 
        id: 'char_에버나이트', 
        name: '에버나이트', 
        role: '서포터', 
        folderName: '에버나이트',
        substitutes: [
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_키레네', 
        name: '키레네', 
        role: '서포터', 
        folderName: '키레네',
        substitutes: [
          { name: '트리비', folderName: '트리비' },
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_히아킨', 
        name: '히아킨', 
        role: '탱커/힐러', 
        folderName: '히아킨',
        substitutes: [
          { name: '나찰', folderName: '나찰' },
          { name: '갤러거', folderName: '갤러거' }
        ]
      }
    ],
    tags: ['카스토리스', '기억', '에버나이트']
  },
  {
    id: 'party_trailblazer_memory_gen_1',
    name: '개척자 (기억) 범용 파티 (카스토리스)',
    description: '카스토리스와 에버나이트의 기억 메커니즘을 개척자(기억)로 보조하는 조합입니다.',
    mainDPS: '카스토리스',
    category: '기억',
    members: [
      { id: 'char_카스토리스', name: '카스토리스', role: '메인 딜러', folderName: '카스토리스' },
      { id: 'char_에버나이트', name: '에버나이트', role: '서포터', folderName: '에버나이트' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['개척자', '기억', '카스토리스']
  },
  {
    id: 'party_evernight_hyper_1',
    name: '에버나이트 하이퍼캐리 파티 (1순위)',
    description: '에버나이트의 화력을 키레네와 개척자(기억)로 극대화한 조합입니다.',
    mainDPS: '에버나이트',
    category: '기억',
    members: [
      { id: 'char_에버나이트', name: '에버나이트', role: '메인 딜러', folderName: '에버나이트' },
      { 
        id: 'char_키레네', 
        name: '키레네', 
        role: '서포터', 
        folderName: '키레네',
        substitutes: [
          { name: '트리비', folderName: '트리비' }
        ]
      },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { 
        id: 'char_히아킨', 
        name: '히아킨', 
        role: '탱커/힐러', 
        folderName: '히아킨',
        substitutes: [
          { name: '곽향', folderName: '곽향' },
          { name: '단항•등황', folderName: '단항•등황' }
        ]
      }
    ],
    tags: ['에버나이트', '하이퍼캐리', '키레네']
  },
  {
    id: 'party_trailblazer_memory_gen_2',
    name: '개척자 (기억) 범용 파티 (에버나이트)',
    description: '에버나이트와 키레네의 기억 메커니즘을 개척자(기억)로 보조하는 조합입니다.',
    mainDPS: '에버나이트',
    category: '기억',
    members: [
      { id: 'char_에버나이트', name: '에버나이트', role: '메인 딜러', folderName: '에버나이트' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['개척자', '기억', '에버나이트']
  }
];
