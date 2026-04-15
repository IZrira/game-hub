import { PartyCombination } from './index';

export const aoeParties: PartyCombination[] = [
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
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true },
          { name: '스파클', folderName: '스파클' }
        ]
      },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['블레이드', '하이퍼캐리', '선데이']
  },
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
  {
    id: 'party_jingliu_hyper_1',
    name: '경류 하이퍼캐리 파티 (1순위)',
    description: '경류의 전백 상태를 개척자(기억)와 트리비로 보조하는 조합입니다.',
    mainDPS: '경류',
    category: '범위',
    members: [
      { id: 'char_경류', name: '경류', role: '메인 딜러', folderName: '경류' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_트리비', name: '트리비', role: '서포터', folderName: '트리비' },
      { id: 'char_히아킨', name: '히아킨', role: '탱커/힐러', folderName: '히아킨' }
    ],
    tags: ['경류', '하이퍼캐리', '기억']
  },
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
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true }
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
  }
];
