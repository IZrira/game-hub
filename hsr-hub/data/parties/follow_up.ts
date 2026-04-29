import { PartyCombination } from './index';

export const followUpParties: PartyCombination[] = [
  {
    id: 'party_ashveil_hyper_1',
    name: '애쉬베일 하이퍼캐리 파티 (1순위)',
    description: '선데이와 트리비의 강력한 서포팅을 통해 애쉬베일의 추가 공격 화력을 극대화하는 하이퍼캐리 조합입니다.',
    mainDPS: '애쉬베일',
    category: '추가 공격',
    members: [
      { id: 'char_애쉬베일', name: '애쉬베일', role: '메인 딜러', folderName: '애쉬베일' },
      { 
        id: 'char_선데이', 
        name: '선데이', 
        role: '서포터', 
        folderName: '선데이',
        substitutes: [
          { name: '스파클', folderName: '스파클' },
          { name: '개척자 (기억)', folderName: '개척자 (기억)', isTrailblazer: true },
          { name: '로빈', folderName: '로빈' }
        ]
      },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '사이퍼', folderName: '사이퍼' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '어벤츄린', folderName: '어벤츄린' },
          { name: '곽향', folderName: '곽향' }
        ]
      }
    ],
    tags: ['애쉬베일', '하이퍼캐리', '선데이']
  },
  {
    id: 'party_ashveil_followup_1',
    name: '비소-애쉬베일 추공 파티 (1순위)',
    description: '비소의 빠른 공격 횟수를 활용해 애쉬베일의 [미끼] 추가 공격과 [탐닉] 스택을 극대화하는 조합입니다.',
    mainDPS: '비소',
    category: '추가 공격',
    members: [
      { id: 'char_비소', name: '비소', role: '메인 딜러', folderName: '비소' },
      { 
        id: 'char_애쉬베일', 
        name: '애쉬베일', 
        role: '서브 딜러', 
        folderName: '애쉬베일',
        substitutes: [
          { name: '사이퍼', folderName: '사이퍼' },
          { name: '토파즈 & 복순이', folderName: '토파즈 & 복순이' },
          { name: '맥택', folderName: '맥택' }
        ]
      },
      { 
        id: 'char_트리비', 
        name: '트리비', 
        role: '서포터', 
        folderName: '트리비',
        substitutes: [
          { name: '로빈', folderName: '로빈' },
          { name: '효광', folderName: '효광' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '어벤츄린', folderName: '어벤츄린' },
          { name: '곽향', folderName: '곽향' }
        ]
      }
    ],
    tags: ['비소', '애쉬베일', '추가공격']
  },
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
  {
    id: 'party_trailblazer_memory_gen_5',
    name: '개척자 (기억) 범용 파티 (마이데이)',
    description: '마이데이의 화력을 개척자(기억)와 스파클로 보조하는 조합입니다.',
    mainDPS: '마이데이',
    category: '추가 공격',
    members: [
      { id: 'char_마이데이', name: '마이데이', role: '메인 딜러', folderName: '마이데이' },
      { id: 'char_개척자_기억', name: '개척자 (기억)', role: '서포터', folderName: '개척자 (기억)', isTrailblazer: true },
      { id: 'char_스파클', name: '스파클', role: '서포터', folderName: '스파클' },
      { id: 'char_단항등황', name: '단항•등황', role: '탱커/힐러', folderName: '단항•등황' }
    ],
    tags: ['개척자', '기억', '마이데이']
  },
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
  }
];
