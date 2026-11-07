import { PartyCombination } from './index';

// Parties drafted from guide synergy lists and team principles, confirmed 2026-11-07.
export const guideBasedParties: PartyCombination[] = [
  {
    id: "party_c5_h1",
    name: "어벤츄린•웨이브 환락 파티",
    description: "어벤츄린•웨이브를 메인 딜러로 두고 환락 동료 효광·개척자 (환락)와 펄의 회복을 붙인 환락 조합입니다. 펄 대신 곽향을 쓸 수 있습니다.",
    mainDPS: "어벤츄린•웨이브",
    category: "환락",
    members: [
      {
        id: "char_어벤츄린웨이브",
        name: "어벤츄린•웨이브",
        role: "메인 딜러",
        folderName: "어벤츄린•웨이브"
      },
      {
        id: "char_효광",
        name: "효광",
        role: "서포터",
        folderName: "효광"
      },
      {
        id: "char_개척자환락",
        name: "개척자 (환락)",
        role: "서포터",
        folderName: "개척자 (환락)",
        isTrailblazer: true
      },
      {
        id: "char_펄",
        name: "펄",
        role: "탱커/힐러",
        folderName: "펄",
        substitutes: [
          {
            name: "곽향",
            role: "탱커/힐러",
            folderName: "곽향"
          }
        ]
      }
    ],
    tags: [
      "어벤츄린•웨이브",
      "효광",
      "개척자 (환락)",
      "펄",
      "곽향"
    ]
  },
  {
    id: "party_c5_h2",
    name: "애쉬베일·어벤츄린•웨이브 연계 파티",
    description: "애쉬베일의 추가 공격과 어벤츄린•웨이브의 환락 스킬을 함께 쓰는 2딜 조합입니다. 로빈•서머레토는 공격 횟수가 많은 파티에서 열기를 빠르게 모아 두 딜러의 큰 공격을 지원합니다.",
    mainDPS: "애쉬베일",
    category: "추가 공격",
    members: [
      {
        id: "char_애쉬베일",
        name: "애쉬베일",
        role: "메인 딜러",
        folderName: "애쉬베일"
      },
      {
        id: "char_어벤츄린웨이브",
        name: "어벤츄린•웨이브",
        role: "서브 딜러",
        folderName: "어벤츄린•웨이브"
      },
      {
        id: "char_로빈서머레토",
        name: "로빈•서머레토",
        role: "서포터",
        folderName: "로빈•서머레토",
        substitutes: [
          {
            name: "트리비",
            role: "서포터",
            folderName: "트리비"
          }
        ]
      },
      {
        id: "char_히아킨",
        name: "히아킨",
        role: "탱커/힐러",
        folderName: "히아킨",
        substitutes: [
          {
            name: "단항•등황",
            role: "탱커/힐러",
            folderName: "단항•등황"
          },
          {
            name: "곽향",
            role: "탱커/힐러",
            folderName: "곽향"
          }
        ]
      }
    ],
    tags: [
      "애쉬베일",
      "어벤츄린•웨이브",
      "로빈•서머레토",
      "트리비",
      "히아킨",
      "단항•등황",
      "곽향"
    ]
  },
  {
    id: "party_c5_h4",
    name: "아처·토오사카 린 파티",
    description: "토오사카 린을 아처 전용 서포터 세팅으로 쓰는 조합입니다. 아처가 스킬을 충분히 사용한 뒤 린·아처 연계 공격으로 포인트를 회수합니다.",
    mainDPS: "아처",
    category: "단일",
    members: [
      {
        id: "char_아처",
        name: "아처",
        role: "메인 딜러",
        folderName: "아처"
      },
      {
        id: "char_토오사카린",
        name: "토오사카 린",
        role: "서브 딜러",
        folderName: "토오사카 린"
      },
      {
        id: "char_스파클",
        name: "스파클",
        role: "서포터",
        folderName: "스파클"
      },
      {
        id: "char_단항등황",
        name: "단항•등황",
        role: "탱커/힐러",
        folderName: "단항•등황",
        substitutes: [
          {
            name: "히아킨",
            role: "탱커/힐러",
            folderName: "히아킨"
          }
        ]
      }
    ],
    tags: [
      "아처",
      "토오사카 린",
      "스파클",
      "단항•등황",
      "히아킨"
    ]
  },
  {
    id: "party_c5_h6",
    name: "아케론·천야•블레이드 공허 파티",
    description: "공허 동료가 필요한 아케론에 천야•블레이드의 필살기 피해 지원을 더한 조합입니다. 천야•블레이드는 서포터 세팅(고속)으로 씁니다.",
    mainDPS: "아케론",
    category: "단일",
    members: [
      {
        id: "char_아케론",
        name: "아케론",
        role: "메인 딜러",
        folderName: "아케론"
      },
      {
        id: "char_천야블레이드",
        name: "천야•블레이드",
        role: "서포터",
        folderName: "천야•블레이드"
      },
      {
        id: "char_초구",
        name: "초구",
        role: "서포터",
        folderName: "초구",
        substitutes: [
          {
            name: "은랑",
            role: "서포터",
            folderName: "은랑"
          }
        ]
      },
      {
        id: "char_단항등황",
        name: "단항•등황",
        role: "탱커/힐러",
        folderName: "단항•등황"
      }
    ],
    tags: [
      "아케론",
      "천야•블레이드",
      "초구",
      "은랑",
      "단항•등황"
    ]
  },
  {
    id: "party_c5_h7",
    name: "설의 격파 파티",
    description: "설의가 업보를 모을 수 있도록 강인성 소모에 참여하는 격파 서포터를 함께 두는 조합입니다.",
    mainDPS: "설의",
    category: "격파",
    members: [
      {
        id: "char_설의",
        name: "설의",
        role: "메인 딜러",
        folderName: "설의"
      },
      {
        id: "char_완매",
        name: "완•매",
        role: "서포터",
        folderName: "완•매",
        substitutes: [
          {
            name: "달리아",
            role: "서포터",
            folderName: "달리아"
          }
        ]
      },
      {
        id: "char_망귀인",
        name: "망귀인",
        role: "서포터",
        folderName: "망귀인"
      },
      {
        id: "char_영사",
        name: "영사",
        role: "탱커/힐러",
        folderName: "영사"
      }
    ],
    tags: [
      "설의",
      "완•매",
      "달리아",
      "망귀인",
      "영사"
    ]
  },
  {
    id: "party_c5_h8",
    name: "소상 격파 파티",
    description: "개척자 (화합)와 완•매의 격파 지원으로 소상의 격파 연계를 살리는 조합입니다.",
    mainDPS: "소상",
    category: "격파",
    members: [
      {
        id: "char_소상",
        name: "소상",
        role: "메인 딜러",
        folderName: "소상"
      },
      {
        id: "char_개척자화합",
        name: "개척자 (화합)",
        role: "서포터",
        folderName: "개척자 (화합)",
        isTrailblazer: true
      },
      {
        id: "char_완매",
        name: "완•매",
        role: "서포터",
        folderName: "완•매"
      },
      {
        id: "char_영사",
        name: "영사",
        role: "탱커/힐러",
        folderName: "영사"
      }
    ],
    tags: [
      "소상",
      "개척자 (화합)",
      "완•매",
      "영사"
    ]
  },
  {
    id: "party_c5_h9",
    name: "카프카 지속 피해 파티",
    description: "카프카가 블랙 스완과 계네빈의 지속 피해를 즉시 발동하는 지속 피해 조합입니다. 계네빈 자리는 삼포·루카로 바꿀 수 있습니다.",
    mainDPS: "카프카",
    category: "지속 피해",
    members: [
      {
        id: "char_카프카",
        name: "카프카",
        role: "메인 딜러",
        folderName: "카프카"
      },
      {
        id: "char_블랙스완",
        name: "블랙 스완",
        role: "서브 딜러",
        folderName: "블랙 스완"
      },
      {
        id: "char_계네빈",
        name: "계네빈",
        role: "서브 딜러",
        folderName: "계네빈",
        substitutes: [
          {
            name: "삼포",
            role: "서브 딜러",
            folderName: "삼포"
          },
          {
            name: "루카",
            role: "서브 딜러",
            folderName: "루카"
          }
        ]
      },
      {
        id: "char_곽향",
        name: "곽향",
        role: "탱커/힐러",
        folderName: "곽향"
      }
    ],
    tags: [
      "카프카",
      "블랙 스완",
      "계네빈",
      "삼포",
      "루카",
      "곽향"
    ]
  },
  {
    id: "party_c5_h11",
    name: "아를란 실드 파티",
    description: "회복 없이 HP를 낮게 유지해야 하는 아를란을 게파드의 실드로 보호하는 조합입니다. 실드 담당은 개척자 (보존)·Mar. 7th로 바꿀 수 있습니다.",
    mainDPS: "아를란",
    category: "단일",
    members: [
      {
        id: "char_아를란",
        name: "아를란",
        role: "메인 딜러",
        folderName: "아를란"
      },
      {
        id: "char_정운",
        name: "정운",
        role: "서포터",
        folderName: "정운"
      },
      {
        id: "char_페라",
        name: "페라",
        role: "서포터",
        folderName: "페라",
        substitutes: [
          {
            name: "어공",
            role: "서포터",
            folderName: "어공"
          }
        ]
      },
      {
        id: "char_게파드",
        name: "게파드",
        role: "탱커/힐러",
        folderName: "게파드",
        substitutes: [
          {
            name: "개척자 (보존)",
            role: "탱커/힐러",
            folderName: "개척자 (보존)",
            isTrailblazer: true
          },
          {
            name: "Mar. 7th",
            role: "탱커/힐러",
            folderName: "Mar. 7th"
          }
        ]
      }
    ],
    tags: [
      "아를란",
      "정운",
      "페라",
      "어공",
      "게파드",
      "개척자 (보존)",
      "Mar. 7th"
    ]
  },
  {
    id: "party_c5_h12",
    name: "청작 스킬 포인트 파티",
    description: "스킬 포인트를 많이 쓰는 청작에게 한아의 포인트 지원과 정운의 버프를 몰아주는 조합입니다. 백로는 일반 공격으로 포인트를 보태며 회복을 담당합니다.",
    mainDPS: "청작",
    category: "단일",
    members: [
      {
        id: "char_청작",
        name: "청작",
        role: "메인 딜러",
        folderName: "청작"
      },
      {
        id: "char_한아",
        name: "한아",
        role: "서포터",
        folderName: "한아",
        substitutes: [
          {
            name: "스파클",
            role: "서포터",
            folderName: "스파클"
          }
        ]
      },
      {
        id: "char_정운",
        name: "정운",
        role: "서포터",
        folderName: "정운"
      },
      {
        id: "char_백로",
        name: "백로",
        role: "탱커/힐러",
        folderName: "백로"
      }
    ],
    tags: [
      "청작",
      "한아",
      "스파클",
      "정운",
      "백로"
    ]
  },
  {
    id: "party_c5_h13",
    name: "단항 단일 파티",
    description: "단항을 직접 지정하는 버프로 저항 관통 특성을 발동하는 단일 조합입니다.",
    mainDPS: "단항",
    category: "단일",
    members: [
      {
        id: "char_단항",
        name: "단항",
        role: "메인 딜러",
        folderName: "단항"
      },
      {
        id: "char_한아",
        name: "한아",
        role: "서포터",
        folderName: "한아",
        substitutes: [
          {
            name: "정운",
            role: "서포터",
            folderName: "정운"
          }
        ]
      },
      {
        id: "char_페라",
        name: "페라",
        role: "서포터",
        folderName: "페라"
      },
      {
        id: "char_나타샤",
        name: "나타샤",
        role: "탱커/힐러",
        folderName: "나타샤",
        substitutes: [
          {
            name: "백로",
            role: "탱커/힐러",
            folderName: "백로"
          }
        ]
      }
    ],
    tags: [
      "단항",
      "한아",
      "정운",
      "페라",
      "나타샤",
      "백로"
    ]
  },
  {
    id: "party_c5_h16",
    name: "개척자 (파멸) 초반 파티",
    description: "게임 초반에 얻는 캐릭터로 개척자 (파멸)를 운용하는 조합입니다.",
    mainDPS: "개척자 (파멸)",
    category: "단일",
    members: [
      {
        id: "char_개척자파멸",
        name: "개척자 (파멸)",
        role: "메인 딜러",
        folderName: "개척자 (파멸)",
        isTrailblazer: true
      },
      {
        id: "char_어공",
        name: "어공",
        role: "서포터",
        folderName: "어공",
        substitutes: [
          {
            name: "정운",
            role: "서포터",
            folderName: "정운"
          }
        ]
      },
      {
        id: "char_페라",
        name: "페라",
        role: "서포터",
        folderName: "페라"
      },
      {
        id: "char_나타샤",
        name: "나타샤",
        role: "탱커/힐러",
        folderName: "나타샤",
        substitutes: [
          {
            name: "백로",
            role: "탱커/힐러",
            folderName: "백로"
          }
        ]
      }
    ],
    tags: [
      "개척자 (파멸)",
      "어공",
      "정운",
      "페라",
      "나타샤",
      "백로"
    ]
  }
];
