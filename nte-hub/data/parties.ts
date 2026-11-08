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

// Built from the user-confirmed teams in guideAnalysis.json (2026-11-07). Same 4-person line-ups are listed once.
export const NTE_PARTY_COMBINATIONS: NTEPartyCombination[] = [
  {
    id: "nte_1_잔홍",
    name: "잔홍 붕괴 (고각성 추천) 파티",
    description: "잔홍을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "잔홍",
    tags: [
      "잔홍",
      "사키리",
      "다포딜",
      "아들러"
    ],
    category: "붕괴 (고각성 추천)",
    members: [
      {
        id: "nte-잔홍",
        name: "잔홍",
        role: "메인 딜러",
        folderName: "잔홍",
        attribute: "주"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-아들러",
        name: "아들러",
        role: "서포터",
        folderName: "아들러",
        attribute: "주"
      }
    ]
  },
  {
    id: "nte_2_라크리모사",
    name: "라크리모사 스코치 파티 (아들러형)",
    description: "라크리모사을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "라크리모사",
    tags: [
      "라크리모사",
      "사키리",
      "하니엘",
      "아들러",
      "호토리"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-라크리모사",
        name: "라크리모사",
        role: "메인 딜러",
        folderName: "라크리모사",
        attribute: "암"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-하니엘",
        name: "하니엘",
        role: "서포터",
        folderName: "하니엘",
        attribute: "혼"
      },
      {
        id: "nte-아들러",
        name: "아들러",
        role: "서포터",
        folderName: "아들러",
        attribute: "주",
        substitutes: [
          {
            id: "nte-호토리",
            name: "호토리",
            folderName: "호토리",
            role: "서포터"
          }
        ]
      }
    ]
  },
  {
    id: "nte_3_아카네 린",
    name: "아카네 린 사이클 파티",
    description: "아카네 린을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "아카네 린",
    tags: [
      "아카네 린",
      "감정사",
      "레이븐",
      "링코"
    ],
    category: "사이클",
    members: [
      {
        id: "nte-아카네 린",
        name: "아카네 린",
        role: "메인 딜러",
        folderName: "아카네 린",
        attribute: "상"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령"
      }
    ]
  },
  {
    id: "nte_4_감정사",
    name: "감정사 블라썸 파티",
    description: "감정사을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "감정사",
    tags: [
      "감정사",
      "호토리",
      "일로이",
      "구원"
    ],
    category: "블라썸",
    members: [
      {
        id: "nte-감정사",
        name: "감정사",
        role: "메인 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-호토리",
        name: "호토리",
        role: "서포터",
        folderName: "호토리",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령"
      },
      {
        id: "nte-구원",
        name: "구원",
        role: "서브 딜러",
        folderName: "구원",
        attribute: "령"
      }
    ]
  },
  {
    id: "nte_5_레이븐",
    name: "레이븐 노바·스코치 파티",
    description: "레이븐을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "레이븐",
    tags: [
      "레이븐",
      "다포딜",
      "하니엘",
      "사키리"
    ],
    category: "노바·스코치",
    members: [
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "메인 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-하니엘",
        name: "하니엘",
        role: "서포터",
        folderName: "하니엘",
        attribute: "혼"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      }
    ]
  },
  {
    id: "nte_6_잔홍",
    name: "잔홍 노바·스코치 파티 (링코형)",
    description: "잔홍을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "잔홍",
    tags: [
      "잔홍",
      "다포딜",
      "라크리모사",
      "레이븐",
      "링코",
      "사키리"
    ],
    category: "노바·스코치",
    members: [
      {
        id: "nte-잔홍",
        name: "잔홍",
        role: "메인 딜러",
        folderName: "잔홍",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암",
        substitutes: [
          {
            id: "nte-라크리모사",
            name: "라크리모사",
            folderName: "라크리모사",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령",
        substitutes: [
          {
            id: "nte-사키리",
            name: "사키리",
            folderName: "사키리",
            role: "서포터"
          }
        ]
      }
    ]
  },
  {
    id: "nte_7_라크리모사",
    name: "라크리모사 디스코드 파티",
    description: "라크리모사을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "라크리모사",
    tags: [
      "라크리모사",
      "사키리",
      "다포딜",
      "하니엘"
    ],
    category: "디스코드",
    members: [
      {
        id: "nte-라크리모사",
        name: "라크리모사",
        role: "메인 딜러",
        folderName: "라크리모사",
        attribute: "암"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-하니엘",
        name: "하니엘",
        role: "서포터",
        folderName: "하니엘",
        attribute: "혼"
      }
    ]
  },
  {
    id: "nte_8_레이븐",
    name: "레이븐·다포딜 파티 (감정사)",
    description: "레이븐을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "레이븐",
    tags: [
      "레이븐",
      "다포딜",
      "라크리모사",
      "감정사",
      "호토리",
      "신쿠",
      "치즈",
      "에드가",
      "사키리"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "메인 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암",
        substitutes: [
          {
            id: "nte-라크리모사",
            name: "라크리모사",
            folderName: "라크리모사",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛",
        substitutes: [
          {
            id: "nte-호토리",
            name: "호토리",
            folderName: "호토리",
            role: "서브 딜러"
          },
          {
            id: "nte-신쿠",
            name: "신쿠",
            folderName: "신쿠",
            role: "서브 딜러"
          },
          {
            id: "nte-치즈",
            name: "치즈",
            folderName: "치즈",
            role: "서브 딜러"
          },
          {
            id: "nte-에드가",
            name: "에드가",
            folderName: "에드가",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      }
    ]
  },
  {
    id: "nte_9_잔홍",
    name: "잔홍 스코치 파티 (다포딜형)",
    description: "잔홍을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "잔홍",
    tags: [
      "잔홍",
      "사키리",
      "다포딜",
      "라크리모사",
      "링코",
      "일로이",
      "하니엘",
      "파디아",
      "아들러"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-잔홍",
        name: "잔홍",
        role: "메인 딜러",
        folderName: "잔홍",
        attribute: "주"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암",
        substitutes: [
          {
            id: "nte-라크리모사",
            name: "라크리모사",
            folderName: "라크리모사",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령",
        substitutes: [
          {
            id: "nte-일로이",
            name: "일로이",
            folderName: "일로이",
            role: "서포터"
          },
          {
            id: "nte-하니엘",
            name: "하니엘",
            folderName: "하니엘",
            role: "서포터"
          },
          {
            id: "nte-파디아",
            name: "파디아",
            folderName: "파디아",
            role: "서포터"
          },
          {
            id: "nte-아들러",
            name: "아들러",
            folderName: "아들러",
            role: "서포터"
          }
        ]
      }
    ]
  },
  {
    id: "nte_10_잔홍",
    name: "잔홍 노바·스코치 파티 (사키리형)",
    description: "잔홍을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "잔홍",
    tags: [
      "잔홍",
      "다포딜",
      "레이븐",
      "사키리"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-잔홍",
        name: "잔홍",
        role: "메인 딜러",
        folderName: "잔홍",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      }
    ]
  },
  {
    id: "nte_11_잔홍",
    name: "잔홍 헥스 파티",
    description: "잔홍을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "잔홍",
    tags: [
      "잔홍",
      "링코",
      "일로이",
      "사키리"
    ],
    category: "헥스",
    members: [
      {
        id: "nte-잔홍",
        name: "잔홍",
        role: "메인 딜러",
        folderName: "잔홍",
        attribute: "주"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      }
    ]
  },
  {
    id: "nte_12_나나리",
    name: "나나리 헥스 파티",
    description: "나나리을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "나나리",
    tags: [
      "나나리",
      "링코",
      "일로이",
      "아들러",
      "사키리"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-나나리",
        name: "나나리",
        role: "메인 딜러",
        folderName: "나나리",
        attribute: "령"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-아들러",
            name: "아들러",
            folderName: "아들러",
            role: "힐러"
          }
        ]
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      }
    ]
  },
  {
    id: "nte_13_잔홍",
    name: "잔홍 스코치 파티 (라크리모사형)",
    description: "잔홍을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "잔홍",
    tags: [
      "잔홍",
      "라크리모사",
      "다포딜",
      "사키리",
      "아들러",
      "링코",
      "일로이"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-잔홍",
        name: "잔홍",
        role: "메인 딜러",
        folderName: "잔홍",
        attribute: "주"
      },
      {
        id: "nte-라크리모사",
        name: "라크리모사",
        role: "서브 딜러",
        folderName: "라크리모사",
        attribute: "암",
        substitutes: [
          {
            id: "nte-다포딜",
            name: "다포딜",
            folderName: "다포딜",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주",
        substitutes: [
          {
            id: "nte-아들러",
            name: "아들러",
            folderName: "아들러",
            role: "서포터"
          }
        ]
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령",
        substitutes: [
          {
            id: "nte-일로이",
            name: "일로이",
            folderName: "일로이",
            role: "서포터"
          }
        ]
      }
    ]
  },
  {
    id: "nte_14_나나리",
    name: "나나리·감정사 파티",
    description: "나나리을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "나나리",
    tags: [
      "나나리",
      "감정사",
      "사키리",
      "링코"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-나나리",
        name: "나나리",
        role: "메인 딜러",
        folderName: "나나리",
        attribute: "령"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령"
      }
    ]
  },
  {
    id: "nte_15_신쿠",
    name: "신쿠 차지 기본형 파티",
    description: "신쿠을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "신쿠",
    tags: [
      "신쿠",
      "감정사",
      "일로이",
      "하토르"
    ],
    category: "차지",
    members: [
      {
        id: "nte-신쿠",
        name: "신쿠",
        role: "메인 딜러",
        folderName: "신쿠",
        attribute: "빛"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령"
      },
      {
        id: "nte-하토르",
        name: "하토르",
        role: "서브 딜러",
        folderName: "하토르",
        attribute: "상"
      }
    ]
  },
  {
    id: "nte_16_나나리",
    name: "나나리 블라썸 파티 (구원·일로이)",
    description: "나나리을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "나나리",
    tags: [
      "나나리",
      "민트",
      "감정사",
      "구원",
      "일로이",
      "호토리"
    ],
    category: "블라썸",
    members: [
      {
        id: "nte-나나리",
        name: "나나리",
        role: "메인 딜러",
        folderName: "나나리",
        attribute: "령",
        substitutes: [
          {
            id: "nte-민트",
            name: "민트",
            folderName: "민트",
            role: "메인 딜러"
          }
        ]
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-구원",
        name: "구원",
        role: "서브 딜러",
        folderName: "구원",
        attribute: "령"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-호토리",
            name: "호토리",
            folderName: "호토리",
            role: "힐러"
          }
        ]
      }
    ]
  },
  {
    id: "nte_17_라크리모사",
    name: "라크리모사·레이븐 2딜 파티",
    description: "라크리모사을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "라크리모사",
    tags: [
      "라크리모사",
      "사키리",
      "하니엘",
      "레이븐",
      "링코",
      "일로이"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-라크리모사",
        name: "라크리모사",
        role: "메인 딜러",
        folderName: "라크리모사",
        attribute: "암"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주",
        substitutes: [
          {
            id: "nte-하니엘",
            name: "하니엘",
            folderName: "하니엘",
            role: "서포터"
          }
        ]
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령",
        substitutes: [
          {
            id: "nte-일로이",
            name: "일로이",
            folderName: "일로이",
            role: "서포터"
          }
        ]
      }
    ]
  },
  {
    id: "nte_18_레이븐",
    name: "레이븐·라크리모사 파티 (카오스)",
    description: "레이븐을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "레이븐",
    tags: [
      "레이븐",
      "라크리모사",
      "카오스",
      "스키아",
      "하토르",
      "일로이",
      "사키리"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "메인 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-라크리모사",
        name: "라크리모사",
        role: "서브 딜러",
        folderName: "라크리모사",
        attribute: "암"
      },
      {
        id: "nte-카오스",
        name: "카오스",
        role: "서브 딜러",
        folderName: "카오스",
        attribute: "상",
        substitutes: [
          {
            id: "nte-스키아",
            name: "스키아",
            folderName: "스키아",
            role: "서브 딜러"
          },
          {
            id: "nte-하토르",
            name: "하토르",
            folderName: "하토르",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-사키리",
            name: "사키리",
            folderName: "사키리",
            role: "힐러"
          }
        ]
      }
    ]
  },
  {
    id: "nte_19_나나리",
    name: "나나리 블라썸 파티 (일로이·호토리)",
    description: "나나리을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "나나리",
    tags: [
      "나나리",
      "감정사",
      "일로이",
      "구원",
      "호토리"
    ],
    category: "블라썸",
    members: [
      {
        id: "nte-나나리",
        name: "나나리",
        role: "메인 딜러",
        folderName: "나나리",
        attribute: "령"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-구원",
            name: "구원",
            folderName: "구원",
            role: "힐러"
          }
        ]
      },
      {
        id: "nte-호토리",
        name: "호토리",
        role: "서포터",
        folderName: "호토리",
        attribute: "빛"
      }
    ]
  },
  {
    id: "nte_20_민트",
    name: "민트 블라썸 파티",
    description: "민트을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "민트",
    tags: [
      "민트",
      "호토리",
      "일로이",
      "구원",
      "감정사"
    ],
    category: "블라썸",
    members: [
      {
        id: "nte-민트",
        name: "민트",
        role: "메인 딜러",
        folderName: "민트",
        attribute: "령"
      },
      {
        id: "nte-호토리",
        name: "호토리",
        role: "서포터",
        folderName: "호토리",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-구원",
            name: "구원",
            folderName: "구원",
            role: "힐러"
          }
        ]
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      }
    ]
  },
  {
    id: "nte_21_민트",
    name: "민트 헥스 파티",
    description: "민트을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "민트",
    tags: [
      "민트",
      "링코",
      "사키리",
      "일로이",
      "아들러"
    ],
    category: "헥스",
    members: [
      {
        id: "nte-민트",
        name: "민트",
        role: "메인 딜러",
        folderName: "민트",
        attribute: "령"
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-아들러",
            name: "아들러",
            folderName: "아들러",
            role: "힐러"
          }
        ]
      }
    ]
  },
  {
    id: "nte_22_백장",
    name: "백장 스코치·헥스 파티",
    description: "백장을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "백장",
    tags: [
      "백장",
      "다포딜",
      "사키리",
      "하니엘",
      "링코"
    ],
    category: "스코치·헥스",
    members: [
      {
        id: "nte-백장",
        name: "백장",
        role: "메인 딜러",
        folderName: "백장",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주",
        substitutes: [
          {
            id: "nte-하니엘",
            name: "하니엘",
            folderName: "하니엘",
            role: "서포터"
          }
        ]
      },
      {
        id: "nte-링코",
        name: "링코",
        role: "서포터",
        folderName: "링코",
        attribute: "령"
      }
    ]
  },
  {
    id: "nte_23_백장",
    name: "백장 디스코드 파티",
    description: "백장을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "백장",
    tags: [
      "백장",
      "다포딜",
      "사키리",
      "하니엘"
    ],
    category: "디스코드",
    members: [
      {
        id: "nte-백장",
        name: "백장",
        role: "메인 딜러",
        folderName: "백장",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-하니엘",
        name: "하니엘",
        role: "서포터",
        folderName: "하니엘",
        attribute: "혼"
      }
    ]
  },
  {
    id: "nte_24_백장",
    name: "백장 스코치·디스코드 파티",
    description: "백장을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "백장",
    tags: [
      "백장",
      "사키리",
      "다포딜",
      "파디아"
    ],
    category: "스코치·디스코드",
    members: [
      {
        id: "nte-백장",
        name: "백장",
        role: "메인 딜러",
        folderName: "백장",
        attribute: "주"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-파디아",
        name: "파디아",
        role: "서포터",
        folderName: "파디아",
        attribute: "혼"
      }
    ]
  },
  {
    id: "nte_25_백장",
    name: "백장 헥스 파티",
    description: "백장을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "백장",
    tags: [
      "백장",
      "사키리",
      "다포딜",
      "구원"
    ],
    category: "헥스",
    members: [
      {
        id: "nte-백장",
        name: "백장",
        role: "메인 딜러",
        folderName: "백장",
        attribute: "주"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-다포딜",
        name: "다포딜",
        role: "서브 딜러",
        folderName: "다포딜",
        attribute: "암"
      },
      {
        id: "nte-구원",
        name: "구원",
        role: "서브 딜러",
        folderName: "구원",
        attribute: "령"
      }
    ]
  },
  {
    id: "nte_26_신쿠",
    name: "신쿠 차지 파티 (스키아)",
    description: "신쿠을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "신쿠",
    tags: [
      "신쿠",
      "스키아",
      "감정사",
      "일로이",
      "나나리",
      "구원"
    ],
    category: "차지",
    members: [
      {
        id: "nte-신쿠",
        name: "신쿠",
        role: "메인 딜러",
        folderName: "신쿠",
        attribute: "빛"
      },
      {
        id: "nte-스키아",
        name: "스키아",
        role: "서브 딜러",
        folderName: "스키아",
        attribute: "상"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-나나리",
            name: "나나리",
            folderName: "나나리",
            role: "힐러"
          },
          {
            id: "nte-구원",
            name: "구원",
            folderName: "구원",
            role: "힐러"
          }
        ]
      }
    ]
  },
  {
    id: "nte_27_신쿠",
    name: "신쿠 차지 파티 (아카네 린)",
    description: "신쿠을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "신쿠",
    tags: [
      "신쿠",
      "아카네 린",
      "하토르",
      "스키아",
      "감정사",
      "일로이",
      "나나리",
      "구원"
    ],
    category: "차지",
    members: [
      {
        id: "nte-신쿠",
        name: "신쿠",
        role: "메인 딜러",
        folderName: "신쿠",
        attribute: "빛"
      },
      {
        id: "nte-아카네 린",
        name: "아카네 린",
        role: "서브 딜러",
        folderName: "아카네 린",
        attribute: "상",
        substitutes: [
          {
            id: "nte-하토르",
            name: "하토르",
            folderName: "하토르",
            role: "서브 딜러"
          },
          {
            id: "nte-스키아",
            name: "스키아",
            folderName: "스키아",
            role: "서브 딜러"
          }
        ]
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-나나리",
            name: "나나리",
            folderName: "나나리",
            role: "힐러"
          },
          {
            id: "nte-구원",
            name: "구원",
            folderName: "구원",
            role: "힐러"
          }
        ]
      }
    ]
  },
  {
    id: "nte_28_아카네 린",
    name: "아카네 린 쾌속+차지 파티",
    description: "아카네 린을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "아카네 린",
    tags: [
      "아카네 린",
      "레이븐",
      "신쿠",
      "일로이"
    ],
    category: "쾌속+차지",
    members: [
      {
        id: "nte-아카네 린",
        name: "아카네 린",
        role: "메인 딜러",
        folderName: "아카네 린",
        attribute: "상"
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-신쿠",
        name: "신쿠",
        role: "서브 딜러",
        folderName: "신쿠",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령"
      }
    ]
  },
  {
    id: "nte_29_카오스",
    name: "카오스 스테인+레모라 파티",
    description: "카오스을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "카오스",
    tags: [
      "카오스",
      "하토르",
      "호토리",
      "감정사",
      "에드가",
      "레이븐",
      "하니엘",
      "파디아"
    ],
    category: "스테인+레모라",
    members: [
      {
        id: "nte-카오스",
        name: "카오스",
        role: "메인 딜러",
        folderName: "카오스",
        attribute: "상"
      },
      {
        id: "nte-하토르",
        name: "하토르",
        role: "서브 딜러",
        folderName: "하토르",
        attribute: "상"
      },
      {
        id: "nte-호토리",
        name: "호토리",
        role: "서포터",
        folderName: "호토리",
        attribute: "빛",
        substitutes: [
          {
            id: "nte-감정사",
            name: "감정사",
            folderName: "감정사",
            role: "서포터"
          },
          {
            id: "nte-에드가",
            name: "에드가",
            folderName: "에드가",
            role: "서포터"
          }
        ]
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼",
        substitutes: [
          {
            id: "nte-하니엘",
            name: "하니엘",
            folderName: "하니엘",
            role: "서브 딜러"
          },
          {
            id: "nte-파디아",
            name: "파디아",
            folderName: "파디아",
            role: "서브 딜러"
          }
        ]
      }
    ]
  },
  {
    id: "nte_30_카오스",
    name: "카오스 레모라 파티",
    description: "카오스을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "카오스",
    tags: [
      "카오스",
      "감정사",
      "하니엘",
      "하토르"
    ],
    category: "레모라",
    members: [
      {
        id: "nte-카오스",
        name: "카오스",
        role: "메인 딜러",
        folderName: "카오스",
        attribute: "상"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-하니엘",
        name: "하니엘",
        role: "서포터",
        folderName: "하니엘",
        attribute: "혼"
      },
      {
        id: "nte-하토르",
        name: "하토르",
        role: "서브 딜러",
        folderName: "하토르",
        attribute: "상"
      }
    ]
  },
  {
    id: "nte_31_카오스",
    name: "카오스 레모라+차지 파티",
    description: "카오스을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "카오스",
    tags: [
      "카오스",
      "감정사",
      "일로이",
      "하니엘",
      "하토르"
    ],
    category: "레모라+차지",
    members: [
      {
        id: "nte-카오스",
        name: "카오스",
        role: "메인 딜러",
        folderName: "카오스",
        attribute: "상"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령",
        substitutes: [
          {
            id: "nte-하니엘",
            name: "하니엘",
            folderName: "하니엘",
            role: "힐러"
          }
        ]
      },
      {
        id: "nte-하토르",
        name: "하토르",
        role: "서브 딜러",
        folderName: "하토르",
        attribute: "상"
      }
    ]
  },
  {
    id: "nte_32_나나리",
    name: "나나리 블라썸 파티 (구원·호토리)",
    description: "나나리을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "나나리",
    tags: [
      "나나리",
      "감정사",
      "구원",
      "호토리"
    ],
    category: "블라썸",
    members: [
      {
        id: "nte-나나리",
        name: "나나리",
        role: "메인 딜러",
        folderName: "나나리",
        attribute: "령"
      },
      {
        id: "nte-감정사",
        name: "감정사",
        role: "서브 딜러",
        folderName: "감정사",
        attribute: "빛"
      },
      {
        id: "nte-구원",
        name: "구원",
        role: "서브 딜러",
        folderName: "구원",
        attribute: "령"
      },
      {
        id: "nte-호토리",
        name: "호토리",
        role: "서포터",
        folderName: "호토리",
        attribute: "빛"
      }
    ]
  },
  {
    id: "nte_33_라크리모사",
    name: "라크리모사 스코치 파티 (호토리형)",
    description: "라크리모사을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "라크리모사",
    tags: [
      "라크리모사",
      "사키리",
      "하니엘",
      "호토리"
    ],
    category: "추천 조합",
    members: [
      {
        id: "nte-라크리모사",
        name: "라크리모사",
        role: "메인 딜러",
        folderName: "라크리모사",
        attribute: "암"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주"
      },
      {
        id: "nte-하니엘",
        name: "하니엘",
        role: "서포터",
        folderName: "하니엘",
        attribute: "혼"
      },
      {
        id: "nte-호토리",
        name: "호토리",
        role: "서포터",
        folderName: "호토리",
        attribute: "빛"
      }
    ]
  },
  {
    id: "nte_34_아카네 린",
    name: "아카네 린 스테인 파티",
    description: "아카네 린을(를) 메인 딜러로 하는 4인 조합입니다. 대체 가능한 캐릭터는 각 자리에 함께 표시합니다.",
    mainDPS: "아카네 린",
    tags: [
      "아카네 린",
      "레이븐",
      "일로이",
      "사키리",
      "하니엘",
      "감정사",
      "신쿠",
      "호토리"
    ],
    category: "스테인",
    members: [
      {
        id: "nte-아카네 린",
        name: "아카네 린",
        role: "메인 딜러",
        folderName: "아카네 린",
        attribute: "상"
      },
      {
        id: "nte-레이븐",
        name: "레이븐",
        role: "서브 딜러",
        folderName: "레이븐",
        attribute: "혼"
      },
      {
        id: "nte-일로이",
        name: "일로이",
        role: "힐러",
        folderName: "일로이",
        attribute: "령"
      },
      {
        id: "nte-사키리",
        name: "사키리",
        role: "서포터",
        folderName: "사키리",
        attribute: "주",
        substitutes: [
          {
            id: "nte-하니엘",
            name: "하니엘",
            folderName: "하니엘",
            role: "서포터"
          },
          {
            id: "nte-감정사",
            name: "감정사",
            folderName: "감정사",
            role: "서포터"
          },
          {
            id: "nte-신쿠",
            name: "신쿠",
            folderName: "신쿠",
            role: "서포터"
          },
          {
            id: "nte-호토리",
            name: "호토리",
            folderName: "호토리",
            role: "서포터"
          }
        ]
      }
    ]
  }
]

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
