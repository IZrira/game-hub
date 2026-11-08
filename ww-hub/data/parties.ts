
export interface PartyMember {
  id: string;
  name: string;
  folderName: string;
  role: string;
}

export interface PartyCombination {
  id: string;
  name: string;
  description: string;
  members: PartyMember[];
  pros: string[];
  cons: string[];
}

export const WW_PARTY_COMBINATIONS: PartyCombination[] = [
  {
    id: 'jiyan_hyper',
    name: '기염 하이퍼캐리',
    description: '기염의 광역 딜링을 극대화하는 조합입니다.',
    members: [
      { id: 'jiyan', name: '기염', folderName: '기염', role: '메인 딜러' },
      { id: 'mortefi', name: '모르테피', folderName: '모르테피', role: '서브 딜러' },
      { id: 'verina', name: '벨리나', folderName: '벨리나', role: '서포터' }
    ],
    pros: ['강력한 광역 딜링', '안정적인 에너지 수급'],
    cons: ['기염의 의존도가 높음']
  },
  {
    id: "ww_c5_w1",
    name: "여우의 별자리·방랑자 · 전도 전자 파티",
    description: "여우의 별자리를 중심으로 방랑자 · 전도와 파수인을 편성하는 전도 조합입니다.",
    members: [
      {
        id: "3e995fae-3dc7-808c-ad4c-e7ab488f85d7",
        name: "여우의 별자리",
        folderName: "여우의 별자리",
        role: "메인 딜러"
      },
      {
        id: "rover_electro",
        name: "방랑자 · 전도",
        folderName: "방랑자 · 전도",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w2",
    name: "경연·루파 용융 파티",
    description: "경연을 중심으로 루파와 파수인을 편성하는 조합입니다.",
    members: [
      {
        id: "3be95fae-3dc7-809a-848d-cf54b30c697b",
        name: "경연",
        folderName: "경연",
        role: "메인 딜러"
      },
      {
        id: "lupa",
        name: "루파",
        folderName: "루파",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w3",
    name: "청초·샤콘 기류 파티",
    description: "청초를 중심으로 샤콘과 파수인을 편성하는 기류 조합입니다.",
    members: [
      {
        id: "3bf95fae-3dc7-80c1-8d1e-faa7793ca6a4",
        name: "청초",
        folderName: "청초",
        role: "메인 딜러"
      },
      {
        id: "chaconne",
        name: "샤콘",
        folderName: "샤콘",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w4",
    name: "양양 · 현령·치사 암흑 파티",
    description: "양양 · 현령을 중심으로 치사와 응결 서포터·힐러 수수를 편성하는 조합입니다.",
    members: [
      {
        id: "yangyang_magistrate",
        name: "양양 · 현령",
        folderName: "양양 · 현령",
        role: "메인 딜러"
      },
      {
        id: "chisa",
        name: "치사",
        folderName: "치사",
        role: "서브 딜러"
      },
      {
        id: "susu",
        name: "수수",
        folderName: "수수",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w5",
    name: "루시·레베카 파티",
    description: "루시와 레베카를 함께 써서 변주 스킬의 시야 공유와 터렛 피해를 강화하는 조합입니다.",
    members: [
      {
        id: "lucy",
        name: "루시",
        folderName: "루시",
        role: "메인 딜러"
      },
      {
        id: "rebecca",
        name: "레베카",
        folderName: "레베카",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w7",
    name: "에이메스 불꽃 파티",
    description: "에이메스를 중심으로 데니아와 모니에를 편성하는 용융 조합입니다.",
    members: [
      {
        id: "aemeath",
        name: "에이메스",
        folderName: "에이메스",
        role: "메인 딜러"
      },
      {
        id: "denia",
        name: "데니아",
        folderName: "데니아",
        role: "서브 딜러"
      },
      {
        id: "mornye",
        name: "모니에",
        folderName: "모니에",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w8",
    name: "루크 · 헤르센·린네 조화 밀집 파티",
    description: "루크 · 헤르센을 중심으로 린네와 파수인을 편성하는 회절 조합입니다.",
    members: [
      {
        id: "luuk",
        name: "루크 · 헤르센",
        folderName: "루크 · 헤르센",
        role: "메인 딜러"
      },
      {
        id: "linne",
        name: "린네",
        folderName: "린네",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w9",
    name: "히유키 서리 파티",
    description: "히유키를 중심으로 치사와 벨리나를 편성하는 조합입니다.",
    members: [
      {
        id: "hiyuki",
        name: "히유키",
        folderName: "히유키",
        role: "메인 딜러"
      },
      {
        id: "chisa",
        name: "치사",
        folderName: "치사",
        role: "서브 딜러"
      },
      {
        id: "verina",
        name: "벨리나",
        folderName: "벨리나",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w10",
    name: "갈브레나·루파 용융 파티",
    description: "갈브레나를 중심으로 루파와 파수인을 편성하는 용융 조합입니다.",
    members: [
      {
        id: "galbrena",
        name: "갈브레나",
        folderName: "갈브레나",
        role: "메인 딜러"
      },
      {
        id: "lupa",
        name: "루파",
        folderName: "루파",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w11",
    name: "아우구스타 강공격 파티",
    description: "강공격 딜러 아우구스타 앞에 유노를 두고 반주 스킬로 넘기는 조합입니다.",
    members: [
      {
        id: "augusta",
        name: "아우구스타",
        folderName: "아우구스타",
        role: "메인 딜러"
      },
      {
        id: "iuno",
        name: "유노",
        folderName: "유노",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w12",
    name: "플로로·칸타렐라 에코 어빌리티 파티",
    description: "플로로를 중심으로 칸타렐라와 로코코를 편성하는 인멸 조합입니다.",
    members: [
      {
        id: "phrolova",
        name: "플로로",
        folderName: "플로로",
        role: "메인 딜러"
      },
      {
        id: "cantarella",
        name: "칸타렐라",
        folderName: "칸타렐라",
        role: "서브 딜러"
      },
      {
        id: "rococo",
        name: "로코코",
        folderName: "로코코",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w13",
    name: "카르티시아 풍식 파티",
    description: "풍식 효과를 활용하는 카르티시아에 샤콘과 방랑자 · 기류를 붙인 기류 조합입니다.",
    members: [
      {
        id: "cartethyia",
        name: "카르티시아",
        folderName: "카르티시아",
        role: "메인 딜러"
      },
      {
        id: "chaconne",
        name: "샤콘",
        folderName: "샤콘",
        role: "서브 딜러"
      },
      {
        id: "rover_aero",
        name: "방랑자 · 기류",
        folderName: "방랑자 · 기류",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w14",
    name: "젠니 광학 효과 파티",
    description: "페비가 광학 효과를 걸어 젠니의 「강렬한 불기운」을 쌓는 회절 조합입니다.",
    members: [
      {
        id: "zani",
        name: "젠니",
        folderName: "젠니",
        role: "메인 딜러"
      },
      {
        id: "phoebe",
        name: "페비",
        folderName: "페비",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w15",
    name: "페비·방랑자 · 회절 파티",
    description: "페비와 방랑자 · 회절로 광학 효과를 운용하는 회절 조합입니다.",
    members: [
      {
        id: "phoebe",
        name: "페비",
        folderName: "페비",
        role: "메인 딜러"
      },
      {
        id: "rover_spectro",
        name: "방랑자 · 회절",
        folderName: "방랑자 · 회절",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w16",
    name: "브렌트·장리 파티",
    description: "브렌트를 중심으로 장리와 루파를 편성하는 용융 조합입니다.",
    members: [
      {
        id: "brant",
        name: "브렌트",
        folderName: "브렌트",
        role: "메인 딜러"
      },
      {
        id: "changli",
        name: "장리",
        folderName: "장리",
        role: "서브 딜러"
      },
      {
        id: "lupa",
        name: "루파",
        folderName: "루파",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w17",
    name: "카멜리아·산화 일반 공격 파티",
    description: "카멜리아를 중심으로 산화와 파수인을 편성하는 조합입니다.",
    members: [
      {
        id: "camellya",
        name: "카멜리아",
        folderName: "카멜리아",
        role: "메인 딜러"
      },
      {
        id: "sanhua",
        name: "산화",
        folderName: "산화",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w18",
    name: "상리요·음림 전도 파티",
    description: "상리요를 중심으로 음림과 벨리나를 편성하는 전도 조합입니다.",
    members: [
      {
        id: "xiangli_yao",
        name: "상리요",
        folderName: "상리요",
        role: "메인 딜러"
      },
      {
        id: "yinlin",
        name: "음림",
        folderName: "음림",
        role: "서브 딜러"
      },
      {
        id: "verina",
        name: "벨리나",
        folderName: "벨리나",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w19",
    name: "금희 협동 공격 파티",
    description: "속성이 다르고 협동 공격을 자주 넣는 절지로 금희의 「봄의 빛」을 빠르게 채우는 조합입니다.",
    members: [
      {
        id: "jinhsi",
        name: "금희",
        folderName: "금희",
        role: "메인 딜러"
      },
      {
        id: "zhezhi",
        name: "절지",
        folderName: "절지",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w20",
    name: "금희 4성 파티",
    description: "연무가 필드 시간이 긴 금희 앞에 쐐기를 깔아 두는 4성 위주 조합입니다.",
    members: [
      {
        id: "jinhsi",
        name: "금희",
        folderName: "금희",
        role: "메인 딜러"
      },
      {
        id: "yuanwu",
        name: "연무",
        folderName: "연무",
        role: "서브 딜러"
      },
      {
        id: "verina",
        name: "벨리나",
        folderName: "벨리나",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w21",
    name: "카를로타·절지 응결 파티",
    description: "카를로타를 중심으로 절지와 파수인을 편성하는 응결 조합입니다.",
    members: [
      {
        id: "carlotta",
        name: "카를로타",
        folderName: "카를로타",
        role: "메인 딜러"
      },
      {
        id: "zhezhi",
        name: "절지",
        folderName: "절지",
        role: "서브 딜러"
      },
      {
        id: "the_shorekeeper",
        name: "파수인",
        folderName: "파수인",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w22",
    name: "카를로타 복링 파티",
    description: "복링의 「오뢰 퇴마진」 버프를 공명 스킬 딜러 카를로타와 절지에게 살리는 조합입니다.",
    members: [
      {
        id: "carlotta",
        name: "카를로타",
        folderName: "카를로타",
        role: "메인 딜러"
      },
      {
        id: "zhezhi",
        name: "절지",
        folderName: "절지",
        role: "서브 딜러"
      },
      {
        id: "buling",
        name: "복링",
        folderName: "복링",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w23",
    name: "카카루 공명 해방 파티",
    description: "공명 해방 딜러 카카루에 음림과 감심을 붙인 조합입니다.",
    members: [
      {
        id: "calcharo",
        name: "카카루",
        folderName: "카카루",
        role: "메인 딜러"
      },
      {
        id: "yinlin",
        name: "음림",
        folderName: "음림",
        role: "서브 딜러"
      },
      {
        id: "jianxin",
        name: "감심",
        folderName: "감심",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w25",
    name: "방랑자 · 인멸·단근 인멸 파티",
    description: "방랑자 · 인멸을 중심으로 단근과 벨리나를 편성하는 인멸 조합입니다.",
    members: [
      {
        id: "rover_havoc",
        name: "방랑자 · 인멸",
        folderName: "방랑자 · 인멸",
        role: "메인 딜러"
      },
      {
        id: "danjin",
        name: "단근",
        folderName: "단근",
        role: "서브 딜러"
      },
      {
        id: "verina",
        name: "벨리나",
        folderName: "벨리나",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w27",
    name: "기염 알토 파티",
    description: "기류 딜러 기염 앞에 알토를 두고 반주 스킬로 넘기는 조합입니다.",
    members: [
      {
        id: "jiyan",
        name: "기염",
        folderName: "기염",
        role: "메인 딜러"
      },
      {
        id: "aalto",
        name: "알토",
        folderName: "알토",
        role: "서브 딜러"
      },
      {
        id: "verina",
        name: "벨리나",
        folderName: "벨리나",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w29",
    name: "앙코·산화 파티",
    description: "앙코를 중심으로 산화와 벨리나를 편성하는 조합입니다.",
    members: [
      {
        id: "encore",
        name: "앙코",
        folderName: "앙코",
        role: "메인 딜러"
      },
      {
        id: "sanhua",
        name: "산화",
        folderName: "산화",
        role: "서브 딜러"
      },
      {
        id: "verina",
        name: "벨리나",
        folderName: "벨리나",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  },
  {
    id: "ww_c5_w32",
    name: "능양·산화 응결 파티",
    description: "능양을 중심으로 산화와 설지를 편성하는 응결 조합입니다.",
    members: [
      {
        id: "lingyang",
        name: "능양",
        folderName: "능양",
        role: "메인 딜러"
      },
      {
        id: "sanhua",
        name: "산화",
        folderName: "산화",
        role: "서브 딜러"
      },
      {
        id: "baizhi",
        name: "설지",
        folderName: "설지",
        role: "서포터"
      }
    ],
    pros: [],
    cons: []
  }
];
