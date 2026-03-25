
export interface PartyMember {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러';
  folderName: string;
  isTrailblazer?: boolean;
  substitutes?: { name: string; folderName: string; isTrailblazer?: boolean }[];
}

export interface PartyCombination {
  id: string;
  name: string;
  description: string;
  mainDPS: string;
  members: PartyMember[];
  tags: string[];
  category: '단일' | '범위' | '추가 공격' | '지속 피해' | '격파' | '기억' | '환락';
}

export const HSR_PARTIES: PartyCombination[] = [
  // --- 아케론 하이퍼캐리 ---
  {
    id: 'party_acheron_hyper_1',
    name: '아케론 하이퍼캐리 (초구 조합)',
    description: '아케론의 필살기 스택을 초구로 빠르게 쌓고 스파클로 턴을 당겨 폭딜을 넣는 1순위 조합입니다. (초구 대체: 은랑, 사이퍼 / 스파클 대체: 트리비, 선데이 / 생존 대체: 어벤츄린, 히아킨)',
    mainDPS: '아케론',
    category: '범위',
    members: [
      { id: 'char_아케론', name: '아케론', role: '메인 딜러', folderName: '아케론' },
      { 
        id: 'char_초구', 
        name: '초구', 
        role: '서포터', 
        folderName: '초구',
        substitutes: [
          { name: '은랑', folderName: '은랑' },
          { name: '사이퍼', folderName: '사이퍼' }
        ]
      },
      { 
        id: 'char_스파클', 
        name: '스파클', 
        role: '서포터', 
        folderName: '스파클',
        substitutes: [
          { name: '트리비', folderName: '트리비' },
          { name: '선데이', folderName: '선데이' }
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
    tags: ['아케론', '하이퍼캐리', '초구']
  },
  {
    id: 'party_acheron_hyper_2',
    name: '아케론 하이퍼캐리 (은랑 조합)',
    description: '은랑의 디버프와 트리비의 서포팅을 활용하는 2순위 조합입니다.',
    mainDPS: '아케론',
    category: '범위',
    members: [
      { id: 'char_아케론', name: '아케론', role: '메인 딜러', folderName: '아케론' },
      { id: 'char_은랑', name: '은랑', role: '서포터', folderName: '은랑' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아케론', '하이퍼캐리', '은랑']
  },
  {
    id: 'party_acheron_hyper_3',
    name: '아케론 하이퍼캐리 (사이퍼 조합)',
    description: '사이퍼의 디버프 지원을 받는 3순위 조합입니다.',
    mainDPS: '아케론',
    category: '범위',
    members: [
      { id: 'char_아케론', name: '아케론', role: '메인 딜러', folderName: '아케론' },
      { id: 'char_사이퍼', name: '사이퍼', role: '서브 딜러', folderName: '사이퍼' },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아케론', '하이퍼캐리', '사이퍼']
  },

  // --- 아글라이아 조합 ---
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
        name: '개척자 기억', 
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
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' }
    ],
    tags: ['아글라이아', '3서포터']
  },

  // --- 아낙사 조합 ---
  {
    id: 'party_anaxa_sub_1',
    name: '아낙사 서브딜러 (더 헤르타 조합)',
    description: '더 헤르타와 아낙사의 광역 시너지를 활용하는 1순위 조합입니다. (생존 대체: 히아킨, 어벤츄린)',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { id: 'char_아낙사', name: '아낙사', role: '서브 딜러', folderName: '아낙사' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '히아킨', folderName: '히아킨' },
          { name: '어벤츄린', folderName: '어벤츄린' }
        ]
      }
    ],
    tags: ['아낙사', '더 헤르타', '서브딜러']
  },
  {
    id: 'party_anaxa_sub_2',
    name: '아낙사 서브딜러 (히아킨 조합)',
    description: '더 헤르타와 아낙사의 조합에 히아킨의 생존 지원을 더한 2순위 조합입니다.',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { id: 'char_아낙사', name: '아낙사', role: '서브 딜러', folderName: '아낙사' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['아낙사', '더 헤르타', '히아킨']
  },
  {
    id: 'party_anaxa_sub_3',
    name: '아낙사 서브딜러 (어벤츄린 조합)',
    description: '더 헤르타와 아낙사의 조합에 어벤츄린의 실드를 더한 3순위 조합입니다.',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { id: 'char_아낙사', name: '아낙사', role: '서브 딜러', folderName: '아낙사' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_어벤츄린', name: '어벤츄린', role: '탱커/힐러', folderName: '어벤츄린' }
    ],
    tags: ['아낙사', '더 헤르타', '어벤츄린']
  },
  {
    id: 'party_anaxa_hyper_1',
    name: '아낙사 하이퍼캐리 (케리드라 조합)',
    description: '아낙사의 화력을 케리드라와 키레네로 극대화한 1순위 조합입니다. (케리드라 대체: 선데이, 로빈, 스파클 / 키레네 대체: 선데이 / 생존 대체: 히아킨, 어벤츄린)',
    mainDPS: '아낙사',
    category: '범위',
    members: [
      { id: 'char_아낙사', name: '아낙사', role: '메인 딜러', folderName: '아낙사' },
      { 
        id: 'char_케리드라', 
        name: '케리드라', 
        role: '서포터', 
        folderName: '케리드라',
        substitutes: [
          { name: '선데이', folderName: '선데이' },
          { name: '로빈', folderName: '로빈' },
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { 
        id: 'char_키레네', 
        name: '키레네', 
        role: '서포터', 
        folderName: '키레네',
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
          { name: '히아킨', folderName: '히아킨' },
          { name: '어벤츄린', folderName: '어벤츄린' }
        ]
      }
    ],
    tags: ['아낙사', '하이퍼캐리', '케리드라']
  },
  {
    id: 'party_anaxa_hyper_2',
    name: '아낙사 하이퍼캐리 (선데이 조합)',
    description: '케리드라와 선데이의 서포팅을 받는 2순위 조합입니다.',
    mainDPS: '아낙사',
    category: '범위',
    members: [
      { id: 'char_아낙사', name: '아낙사', role: '메인 딜러', folderName: '아낙사' },
      { id: 'char_케리드라', name: '케리드라', role: '서포터', folderName: '케리드라' },
      { id: 'char_선데이', name: '선데이', role: '서포터', folderName: '선데이' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아낙사', '하이퍼캐리', '선데이']
  },
  {
    id: 'party_anaxa_hyper_3',
    name: '아낙사 하이퍼캐리 (히아킨 조합)',
    description: '케리드라와 키레네의 서포팅에 히아킨의 생존 지원을 더한 3순위 조합입니다.',
    mainDPS: '아낙사',
    category: '범위',
    members: [
      { id: 'char_아낙사', name: '아낙사', role: '메인 딜러', folderName: '아낙사' },
      { id: 'char_케리드라', name: '케리드라', role: '서포터', folderName: '케리드라' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['아낙사', '하이퍼캐리', '히아킨']
  },

  // --- 아처 조합 ---
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
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아처', '하이퍼캐리', '개척자']
  },

  // --- 아젠티 조합 ---
  {
    id: 'party_argenti_sub_1',
    name: '아젠티 허구 서브딜러 (단항•등황 조합)',
    description: '더 헤르타와 아젠티를 함께 기용하여 허구 이야기에서 활약하는 1순위 조합입니다.',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { id: 'char_아젠티', name: '아젠티', role: '메인 딜러', folderName: '아젠티' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['아젠티', '더 헤르타', '허구이야기']
  },
  {
    id: 'party_argenti_sub_2',
    name: '아젠티 허구 서브딜러 (어벤츄린 조합)',
    description: '더 헤르타와 아젠티의 조합에 어벤츄린의 실드를 더한 2순위 조합입니다.',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { id: 'char_아젠티', name: '아젠티', role: '메인 딜러', folderName: '아젠티' },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_어벤츄린', name: '어벤츄린', role: '탱커/힐러', folderName: '어벤츄린' }
    ],
    tags: ['아젠티', '더 헤르타', '어벤츄린']
  },

  // --- 블레이드 조합 ---
  {
    id: 'party_blade_hyper_1',
    name: '블레이드 하이퍼캐리 조합',
    description: '블레이드의 생존과 화력을 선데이와 트리비로 보조하는 조합입니다. (선데이 대체: 개척자 기억, 스파클)',
    mainDPS: '블레이드',
    category: '범위',
    members: [
      { id: 'char_블레이드', name: '블레이드', role: '메인 딜러', folderName: '블레이드' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true },
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['블레이드', '하이퍼캐리', '선데이']
  },

  // --- 부트힐 격파 파티 ---
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
          { name: '개척자 화합', folderName: '개척자 (화합)', isTrailblazer: true }
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
          { name: '개척자 화합', folderName: '개척자 (화합)', isTrailblazer: true }
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

  // --- 카스토리스 기억 파티 ---
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
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_키레네', 
        name: '키레네', 
        role: '서포터', 
        folderName: '키레네',
        substitutes: [
          { name: '트리비', folderName: '트리비' },
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
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

  // --- 클라라 반격 파티 ---
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

  // --- 단항•음월 하이퍼캐리 파티 ---
  {
    id: 'party_danheng_il_hyper_1',
    name: '단항•음월 하이퍼캐리 파티 (1순위)',
    description: '단항•음월의 강력한 화력을 스파클과 선데이로 극대화한 조합입니다.',
    mainDPS: '단항•음월',
    category: '범위',
    members: [
      { id: 'char_단항_음월', name: '단항•음월', role: '메인 딜러', folderName: '단항•음월' },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '스파클', folderName: '스파클' },
          { name: '효광', folderName: '효광' }
        ]
      },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['단항•음월', '하이퍼캐리', '스파클']
  },

  // --- Dr. 레이시오 추공 파티 ---
  {
    id: 'party_ratio_followup_1',
    name: 'Dr. 레이시오 추공 파티 (1순위)',
    description: '레이시오의 추가 공격을 로빈과 사이퍼의 디버프로 보조하는 조합입니다.',
    mainDPS: 'Dr. 레이시오',
    category: '추가 공격',
    members: [
      { id: 'char_Dr_레이시오', name: 'Dr. 레이시오', role: '메인 딜러', folderName: 'Dr. 레이시오' },
      { 
        id: 'char_로빈', 
        name: '로빈', 
        role: '서포터', 
        folderName: '로빈',
        substitutes: [
          { name: '초구', folderName: '초구' }
        ]
      },
      { 
        id: 'char_사이퍼', 
        name: '사이퍼', 
        role: '서브 딜러', 
        folderName: '사이퍼',
        substitutes: [
          { name: '토파즈 & 복순이', folderName: '토파즈 & 복순이' },
          { name: '맥택', folderName: '맥택' },
          { name: 'Mar. 7th (수렵)', folderName: 'Mar. 7th (수렵)' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '어벤츄린', folderName: '어벤츄린' }
        ]
      }
    ],
    tags: ['레이시오', '추가공격', '사이퍼']
  },

  // --- 비소 추공 파티 ---
  {
    id: 'party_feixiao_followup_1',
    name: '비소 추공 파티 (1순위)',
    description: '비소의 필살기 스택을 사이퍼와 로빈의 잦은 공격으로 채우는 조합입니다.',
    mainDPS: '비소',
    category: '추가 공격',
    members: [
      { id: 'char_비소', name: '비소', role: '메인 딜러', folderName: '비소' },
      { 
        id: 'char_사이퍼', 
        name: '사이퍼', 
        role: '서브 딜러', 
        folderName: '사이퍼',
        substitutes: [
          { name: '토파즈 & 복순이', folderName: '토파즈 & 복순이' },
          { name: '맥택', folderName: '맥택' },
          { name: 'Mar. 7th (수렵)', folderName: 'Mar. 7th (수렵)' }
        ]
      },
      { 
        id: 'char_로빈', 
        name: '로빈', 
        role: '서포터', 
        folderName: '로빈',
        substitutes: [
          { name: '트리비', folderName: '트리비' },
          { name: '효광', folderName: '효광' },
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '어벤츄린', folderName: '어벤츄린' }
        ]
      }
    ],
    tags: ['비소', '추가공격', '사이퍼']
  },

  // --- 반디 격파 파티 ---
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
          { name: '개척자 화합', folderName: '개척자 (화합)', isTrailblazer: true },
          { name: '갤러거', folderName: '갤러거' },
          { name: '완•매', folderName: '완•매' }
        ]
      }
    ],
    tags: ['반디', '격파', '망귀인']
  },

  // --- 히메코 격파 파티 ---
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
  },

  // --- 히실렌스 지속 피해 파티 ---
  {
    id: 'party_hisilence_dot_1',
    name: '히실렌스 지속 피해 파티 (1순위)',
    description: '히실렌스의 지속 피해 능력을 카프카와 블랙 스완으로 보조하는 조합입니다.',
    mainDPS: '히실렌스',
    category: '지속 피해',
    members: [
      { id: 'char_히실렌스', name: '히실렌스', role: '메인 딜러', folderName: '히실렌스' },
      { id: 'char_카프카', name: '카프카', role: '메인 딜러', folderName: '카프카' },
      { 
        id: 'char_블랙_스완', 
        name: '블랙 스완', 
        role: '서포터', 
        folderName: '블랙 스완',
        substitutes: [
          { name: '완•매', folderName: '완•매' },
          { name: '키레네', folderName: '키레네' },
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
          { name: '히아킨', folderName: '히아킨' },
          { name: '어벤츄린', folderName: '어벤츄린' },
          { name: '갤러거', folderName: '갤러거' },
          { name: '나찰', folderName: '나찰' }
        ]
      }
    ],
    tags: ['히실렌스', '지속피해', '카프카']
  },

  // --- 제이드 서브딜러 허구 파티 ---
  {
    id: 'party_jade_sub_1',
    name: '제이드 서브딜러 허구 파티 (1순위)',
    description: '더 헤르타와 제이드의 광역 공격 시너지를 활용한 허구 이야기 최적화 조합입니다.',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { id: 'char_제이드', name: '제이드', role: '서브 딜러', folderName: '제이드' },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '로빈', folderName: '로빈' },
          { name: '선데이', folderName: '선데이' },
          { name: '효광', folderName: '효광' }
        ]
      },
      { 
        id: 'char_어벤츄린', 
        name: '어벤츄린', 
        role: '탱커/힐러', 
        folderName: '어벤츄린',
        substitutes: [
          { name: '히아킨', folderName: '히아킨' },
          { name: '단항•등황', folderName: '단항•등황' }
        ]
      }
    ],
    tags: ['제이드', '더 헤르타', '허구이야기']
  },
  {
    id: 'party_jade_sub_2',
    name: '제이드 서브딜러 허구 파티 (2순위)',
    description: '블레이드와 제이드의 자해 및 공격 시너지를 활용한 조합입니다.',
    mainDPS: '블레이드',
    category: '범위',
    members: [
      { id: 'char_블레이드', name: '블레이드', role: '메인 딜러', folderName: '블레이드' },
      { id: 'char_제이드', name: '제이드', role: '서브 딜러', folderName: '제이드' },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '로빈', folderName: '로빈' },
          { name: '선데이', folderName: '선데이' },
          { name: '효광', folderName: '효광' }
        ]
      },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['제이드', '블레이드', '허구이야기']
  },

  // --- 경원 하이퍼캐리 파티 ---
  {
    id: 'party_jingyuan_hyper_1',
    name: '경원 하이퍼캐리 파티 (1순위)',
    description: '경원의 신군 데미지를 선데이와 트리비로 극대화한 조합입니다.',
    mainDPS: '경원',
    category: '범위',
    members: [
      { id: 'char_경원', name: '경원', role: '메인 딜러', folderName: '경원' },
      { id: 'char_선데이', name: '선데이', role: '서포터', folderName: '선데이' },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '로빈', folderName: '로빈' }
        ]
      },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['경원', '하이퍼캐리', '선데이']
  },

  // --- 경류 하이퍼캐리 파티 ---
  {
    id: 'party_jingliu_hyper_1',
    name: '경류 하이퍼캐리 파티 (1순위)',
    description: '경류의 전백 상태를 개척자(기억)와 트리비로 보조하는 조합입니다.',
    mainDPS: '경류',
    category: '범위',
    members: [
      { id: 'char_경류', name: '경류', role: '메인 딜러', folderName: '경류' },
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['경류', '하이퍼캐리', '기억']
  },

  // --- 에버나이트 하이퍼캐리 파티 ---
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
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
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

  // --- 마이데이 하이퍼캐리 파티 ---
  {
    id: 'party_myday_hyper_1',
    name: '마이데이 하이퍼캐리 파티 (1순위)',
    description: '마이데이의 화력을 키레네와 트리비로 보조하는 조합입니다.',
    mainDPS: '마이데이',
    category: '추가 공격',
    members: [
      { id: 'char_마이데이', name: '마이데이', role: '메인 딜러', folderName: '마이데이' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
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
    tags: ['마이데이', '하이퍼캐리', '키레네']
  },
  {
    id: 'party_myday_hyper_2',
    name: '마이데이 하이퍼캐리 파티 (2순위)',
    description: '케리드라와 키레네의 서포팅을 받는 마이데이 조합입니다.',
    mainDPS: '마이데이',
    category: '추가 공격',
    members: [
      { id: 'char_마이데이', name: '마이데이', role: '메인 딜러', folderName: '마이데이' },
      { id: 'char_케리드라', name: '케리드라', role: '서포터', folderName: '케리드라' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
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
    tags: ['마이데이', '하이퍼캐리', '케리드라']
  },

  // --- 마이데이 2딜 파티 ---
  {
    id: 'party_myday_2dps_1',
    name: '마이데이 2딜 파티 (1순위)',
    description: '카스토리스와 마이데이의 시너지를 활용한 2딜 조합입니다.',
    mainDPS: '마이데이',
    category: '추가 공격',
    members: [
      { id: 'char_카스토리스', name: '카스토리스', role: '메인 딜러', folderName: '카스토리스' },
      { id: 'char_마이데이', name: '마이데이', role: '메인 딜러', folderName: '마이데이' },
      { id: 'char_키레네', name: '키레네', role: '서포터', folderName: '키레네' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['마이데이', '카스토리스', '2딜']
  },

  // --- 파이논 하이퍼캐리 파티 ---
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

  // --- 라파 격파 파티 ---
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
          { name: '개척자 화합', folderName: '개척자 (화합)', isTrailblazer: true },
          { name: '단항•등황', folderName: '단항•등황' },
          { name: '완•매', folderName: '완•매' }
        ]
      }
    ],
    tags: ['라파', '격파', '망귀인']
  },

  // --- 세이버 하이퍼캐리 파티 ---
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

  // --- 제레 하이퍼캐리 파티 ---
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

  // --- 스파키 환락 파티 ---
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
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
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

  // --- 더 헤르타 허구 2딜 파티 ---
  {
    id: 'party_the_herta_2dps_1',
    name: '더 헤르타 허구 2딜 파티 (1순위)',
    description: '더 헤르타와 아낙사의 광역 시너지를 활용한 허구 이야기 조합입니다.',
    mainDPS: '더 헤르타',
    category: '범위',
    members: [
      { id: 'char_더_헤르타', name: '더 헤르타', role: '메인 딜러', folderName: '더 헤르타' },
      { 
        id: 'char_아낙사', 
        name: '아낙사', 
        role: '서브 딜러', 
        folderName: '아낙사',
        substitutes: [
          { name: '헤르타', folderName: '헤르타' },
          { name: '제이드', folderName: '제이드' }
        ]
      },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '히아킨', folderName: '히아킨' },
          { name: '어벤츄린', folderName: '어벤츄린' },
          { name: '곽향', folderName: '곽향' }
        ]
      }
    ],
    tags: ['더 헤르타', '아낙사', '허구이야기']
  },

  // --- 토파즈 & 복순이 서브딜러 파티 ---
  {
    id: 'party_topaz_sub_1',
    name: '토파즈 & 복순이 서브딜러 파티 (1순위)',
    description: '비소와 토파즈의 추가 공격 시너지를 활용한 조합입니다.',
    mainDPS: '비소',
    category: '추가 공격',
    members: [
      { id: 'char_비소', name: '비소', role: '메인 딜러', folderName: '비소' },
      { id: 'char_토파즈_복순이', name: '토파즈 & 복순이', role: '서브 딜러', folderName: '토파즈 & 복순이' },
      { id: 'char_로빈', name: '로빈', role: '서포터', folderName: '로빈' },
      { 
        id: 'char_어벤츄린', 
        name: '어벤츄린', 
        role: '탱커/힐러', 
        folderName: '어벤츄린',
        substitutes: [
          { name: '단항•등황', folderName: '단항•등황' }
        ]
      }
    ],
    tags: ['토파즈', '비소', '추가공격']
  },

  // --- 개척자 (기억) 범용 파티 ---
  {
    id: 'party_trailblazer_memory_gen_1',
    name: '개척자 (기억) 범용 파티 (카스토리스)',
    description: '카스토리스와 에버나이트의 기억 메커니즘을 개척자(기억)로 보조하는 조합입니다.',
    mainDPS: '카스토리스',
    category: '기억',
    members: [
      { id: 'char_카스토리스', name: '카스토리스', role: '메인 딜러', folderName: '카스토리스' },
      { id: 'char_에버나이트', name: '에버나이트', role: '서포터', folderName: '에버나이트' },
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['개척자', '기억', '카스토리스']
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
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['개척자', '기억', '에버나이트']
  },
  {
    id: 'party_trailblazer_memory_gen_3',
    name: '개척자 (기억) 범용 파티 (아처)',
    description: '아처의 화력을 개척자(기억)와 스파클로 보조하는 조합입니다.',
    mainDPS: '아처',
    category: '단일',
    members: [
      { id: 'char_아처', name: '아처', role: '메인 딜러', folderName: '아처' },
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
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
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true }
    ],
    tags: ['개척자', '기억', '파이논']
  },
  {
    id: 'party_trailblazer_memory_gen_5',
    name: '개척자 (기억) 범용 파티 (마이데이)',
    description: '마이데이의 화력을 개척자(기억)와 스파클로 보조하는 조합입니다.',
    mainDPS: '마이데이',
    category: '추가 공격',
    members: [
      { id: 'char_마이데이', name: '마이데이', role: '메인 딜러', folderName: '마이데이' },
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['개척자', '기억', '마이데이']
  },
  {
    id: 'party_trailblazer_memory_gen_6',
    name: '개척자 (기억) 범용 파티 (스파키)',
    description: '스파키의 화력을 개척자(기억)와 스파클로 보조하는 조합입니다.',
    mainDPS: '스파키',
    category: '환락',
    members: [
      { id: 'char_스파키', name: '스파키', role: '메인 딜러', folderName: '스파키' },
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['개척자', '기억', '스파키']
  },

  // --- 연경 하이퍼캐리 파티 ---
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
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
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
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true }
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
  },

  // --- 운리 반격 파티 ---
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
          { name: '개척자 기억', folderName: '개척자 (기억)', isTrailblazer: true },
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
      { id: 'char_개척자_기억', name: '개척자 기억', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_로빈', name: '로빈', role: '서포터', folderName: '로빈' },
      { id: 'char_곽향', name: '곽향', role: '탱커/힐러', folderName: '곽향' }
    ],
    tags: ['운리', '반격', '로빈']
  }
];
