import { PartyCombination } from './index';

export const singleParties: PartyCombination[] = [
  {
    id: 'party_archer_hyper_1',
    name: '아처 하이퍼캐리 (효광 조합)',
    description: '아처의 단일 폭딜을 효광으로 보조하는 1순위 조합입니다. (효광 대체: 트리비, 은랑, 사이퍼, 로빈, 선데이 / 생존 대체: 히아킨, 곽향)',
    mainDPS: '아처',
    category: '단일',
    members: [
      { id: 'char_아처', name: '아처', role: '메인 딜러', folderName: '아처' },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { 
        id: 'char_효광', 
        name: '효광', 
        role: '서포터', 
        folderName: '효광',
        substitutes: [
          { name: '트리비', folderName: '트리비' },
          { name: '은랑', folderName: '은랑' },
          { name: '사이퍼', folderName: '사이퍼' },
          { name: '로빈', folderName: '로빈' },
          { name: '선데이', folderName: '선데이' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '히아킨', folderName: '히아킨' },
          { name: '곽향', folderName: '곽향' }
        ]
      }
    ],
    tags: ['아처', '하이퍼캐리', '효광']
  },
  {
    id: 'party_archer_hyper_2',
    name: '아처 하이퍼캐리 (트리비 조합)',
    description: '스파클과 트리비의 서포팅을 받는 2순위 조합입니다.',
    mainDPS: '아처',
    category: '단일',
    members: [
      { id: 'char_아처', name: '아처', role: '메인 딜러', folderName: '아처' },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아처', '하이퍼캐리', '트리비']
  },
  {
    id: 'party_archer_hyper_3',
    name: '아처 하이퍼캐리 (개척자 조합)',
    description: '개척자(기억)와 스파클의 서포팅을 받는 3순위 조합입니다.',
    mainDPS: '아처',
    category: '단일',
    members: [
      { id: 'char_아처', name: '아처', role: '메인 딜러', folderName: '아처' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아처', '하이퍼캐리', '개척자']
  },
  {
    id: 'party_phinon_hyper_1',
    name: '파이논 하이퍼캐리 파티 (1순위)',
    description: '파이논의 화력을 케리드라와 선데이로 극대화한 조합입니다.',
    mainDPS: '파이논',
    category: '단일',
    members: [
      { id: 'char_파이논', name: '파이논', role: '메인 딜러', folderName: '파이논' },
      { 
        id: 'char_케리드라', 
        name: '케리드라', 
        role: '서포터', 
        folderName: '케리드라',
        substitutes: [
          { name: '브로냐', folderName: '브로냐' }
        ]
      },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '키레네', folderName: '키레네' },
          { name: '스파클', folderName: '스파클' },
          { name: '완•매', folderName: '완•매' },
          { name: '트리비', folderName: '트리비' }
        ]
      },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['파이논', '하이퍼캐리', '케리드라']
  },
  {
    id: 'party_saber_hyper_1',
    name: '세이버 하이퍼캐리 파티 (1순위)',
    description: '세이버의 화력을 선데이와 트리비로 보조하는 조합입니다.',
    mainDPS: '세이버',
    category: '단일',
    members: [
      { id: 'char_세이버', name: '세이버', role: '메인 딜러', folderName: '세이버' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '스파클', folderName: '스파클' },
          { name: '브로냐', folderName: '브로냐' }
        ]
      },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '로빈', folderName: '로빈' }
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
    tags: ['세이버', '하이퍼캐리', '선데이']
  },
  {
    id: 'party_seele_hyper_1',
    name: '제레 하이퍼캐리 파티 (1순위)',
    description: '제레의 재행동을 트리비와 스파클로 극대화한 조합입니다.',
    mainDPS: '제레',
    category: '단일',
    members: [
      { id: 'char_제레', name: '제레', role: '메인 딜러', folderName: '제레' },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '케리드라', folderName: '케리드라' },
          { name: '로빈', folderName: '로빈' },
          { name: '은랑', folderName: '은랑' }
        ]
      },
      { 
        id: 'char_스파클', 
        name: '스파클', 
        role: '서포터', 
        folderName: '스파클',
        substitutes: [
          { name: '케리드라', folderName: '케리드라' },
          { name: '선데이', folderName: '선데이' },
          { name: '브로냐', folderName: '브로냐' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '부현', folderName: '부현' },
          { name: '히아킨', folderName: '히아킨' },
          { name: '나찰', folderName: '나찰' }
        ]
      }
    ],
    tags: ['제레', '하이퍼캐리', '트리비']
  },
  {
    id: 'party_trailblazer_memory_gen_3',
    name: '개척자 (기억) 범용 파티 (아처)',
    description: '아처의 화력을 개척자(기억)와 스파클로 보조하는 조합입니다.',
    mainDPS: '아처',
    category: '단일',
    members: [
      { id: 'char_아처', name: '아처', role: '메인 딜러', folderName: '아처' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['개척자', '기억', '아처']
  },
  {
    id: 'party_trailblazer_memory_gen_4',
    name: '개척자 (기억) 범용 파티 (파이논)',
    description: '파이논과 케리드라의 화력을 키레네와 개척자(기억)로 보조하는 조합입니다.',
    mainDPS: '파이논',
    category: '단일',
    members: [
      { id: 'char_파이논', name: '파이논', role: '메인 딜러', folderName: '파이논' },
      { id: 'char_케리드라', name: '케리드라', role: '서포터', folderName: '케리드라' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true }
    ],
    tags: ['개척자', '기억', '파이논']
  },
  {
    id: 'party_yanqing_hyper_1',
    name: '연경 하이퍼캐리 파티 (1순위)',
    description: '연경의 화력을 선데이와 케리드라로 보조하는 조합입니다.',
    mainDPS: '연경',
    category: '단일',
    members: [
      { id: 'char_연경', name: '연경', role: '메인 딜러', folderName: '연경' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '케리드라', folderName: '케리드라' },
          { name: '스파클', folderName: '스파클' },
          { name: '브로냐', folderName: '브로냐' },
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_케리드라', 
        name: '케리드라', 
        role: '서포터', 
        folderName: '케리드라',
        substitutes: [
          { name: '선데이', folderName: '선데이' },
          { name: '스파클', folderName: '스파클' },
          { name: '브로냐', folderName: '브로냐' },
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '어벤츄린', folderName: '어벤츄린' },
          { name: '히아킨', folderName: '히아킨' }
        ]
      }
    ],
    tags: ['연경', '하이퍼캐리', '선데이']
  }
];
