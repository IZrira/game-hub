export interface WuwaMainStat {
  cost: number;
  stats: string[];
  note?: string;
}

export interface WuwaCharacterGuide {
  id: string;
  patchVersion: string;
  weapons: {
    name: string;
    rank: number;
  }[];
  echoSets: {
    name: string;
    note?: string;
  }[];
  mainEchoes: {
    name: string;
    reason?: string;
  }[];
  variants?: {
    name: string;
    echoSets: {
      name: string;
      note?: string;
    }[];
    mainEchoes: {
      name: string;
      reason?: string;
    }[];
    mainStats?: WuwaMainStat[];
    note?: string;
  }[];
  targetStats: {
    label: string;
    value: string;
  }[];
  mainStats: WuwaMainStat[];
  subStats: string[];
  skillPriority: string[];
  synergyCharacters: string[];
}

export const WW_CHARACTER_GUIDES: WuwaCharacterGuide[] = [
  {
    id: "jiyan",
    patchVersion: "3.2",
    weapons: [
      { name: "청룡의 천장", rank: 1 },
      { name: "천둥벼락을 다스리는 권능", rank: 2 },
      { name: "금빛 하늘", rank: 3 },
      { name: "가을의 무늬", rank: 4 }
    ],
    echoSets: [
      { name: "스쳐가는 바람 5세트" }
    ],
    mainEchoes: [
      {
        name: "악몽 · 폭주의 고릴라",
        reason: "강공격 피해 보너스와 기류 피해 보너스를 동시에 제공하는 에코. 일반 폭주의 고릴라의 문제점을 보완해서 나온 에코"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "70% 이상" },
      { label: "크리티컬 피해", value: "260% 이상" },
      { label: "공격력", value: "2200 이상" },
      { label: "공명 효율", value: "130% 이상" }
    ],
    mainStats: [
      { cost: 4, stats: ["크리티컬", "크리티컬 피해"] },
      { cost: 3, stats: ["기류 피해 보너스", "공격력"] },
      { cost: 3, stats: ["공격력", "공명 효율"], note: "공명 효율을 부 옵션에서 맞출 수 없을 경우 주 옵션에서 챙긴다" },
      { cost: 1, stats: ["공격력"] },
      { cost: 1, stats: ["공격력"] }
    ],
    subStats: [
      "공명 효율",
      "크리티컬 확률",
      "크리티컬 피해",
      "공격력",
      "강공격 피해 보너스"
    ],
    skillPriority: [
      "공명 회로",
      "공명 해방",
      "공명 스킬",
      "기본 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "유노",
      "린네",
      "파수인",
      "모르테피"
    ]
  },
  {
    id: "baizhi",
    patchVersion: "2.2",
    weapons: [
      { name: "뭇별의 교향곡", rank: 1 },
      { name: "판타지 변주", rank: 2 },
      { name: "심해의 메아리", rank: 3 }
    ],
    echoSets: [], // Variants fallback
    mainEchoes: [], // Variants fallback
    variants: [
      {
        name: "찬란한 광휘 세팅",
        echoSets: [
          { name: "찬란한 광휘 5세트" }
        ],
        mainEchoes: [
          {
            name: "타종 거북이",
            reason: "사용 시 피해 감소 실드와 피해 증가 버프를 파티원에게 제공하는 서포터 에코"
          },
          {
            name: "돌아갈 곳이 없는 오류",
            reason: "장착한 캐릭터의 공명 효율 증가와 파티원의 공격력 증가 버프 제공. 공명 에너지 회복이 느린 설지에게 좋은 에코"
          }
        ]
      },
      {
        name: "떠오르는 구름 세팅",
        echoSets: [
          { name: "떠오르는 구름 5세트", note: "반주 스킬 사용 후 다음에 등장하는 캐릭터의 공격력을 증가시키는 세트로 딜러 캐릭터를 지원하는 세트" }
        ],
        mainEchoes: [
          {
            name: "타종 거북이",
            reason: "사용 시 피해 감소 실드와 피해 증가 버프를 파티원에게 제공하는 서포터 에코"
          },
          {
            name: "음험한 백로",
            reason: "자신의 공명 에너지 회복과 장착한 캐릭터가 반주 스킬 사용 시 다음 교체 캐릭터에게 피해 증가 버프를 제공"
          }
        ]
      }
    ],
    targetStats: [
      { label: "공명 효율", value: "220% 이상" },
      { label: "치료 효과 보너스", value: "48%" },
      { label: "HP", value: "30000 이상" }
    ],
    mainStats: [
      { cost: 4, stats: ["치료 효과 보너스", "HP"] },
      { cost: 3, stats: ["공명 효율", "HP"] },
      { cost: 3, stats: ["공명 효율"] },
      { cost: 1, stats: ["HP"] },
      { cost: 1, stats: ["HP"] }
    ],
    subStats: [
      "공명 효율",
      "HP",
      "크리티컬",
      "크리티컬 피해"
    ],
    skillPriority: [
      "공명 해방",
      "공명 스킬",
      "공명 회로",
      "기본 공격",
      "변주 스킬"
    ],
    isUniversalSynergy: true,
    synergyCharacters: []
  },
  {
    id: "sanhua",
    patchVersion: "2.3",
    weapons: [
      { name: "솟아오르는 화염", note: "1순위" },
      { name: "천년의 회류", note: "2순위" },
      { name: "행진의 서곡", note: "3순위" },
      { name: "예리한 날개깃", note: "4순위" }
    ],
    echoSets: [], // Variants fallback
    variants: [
      {
        name: "떠오르는 구름 세팅",
        echoSets: ["떠오르는 구름 5세트"],
        mainEchoes: [
          {
            name: "음험한 백로",
            reason: "자신의 공명 에너지 회복과 장착한 캐릭터가 반주 스킬 사용 시 다음 교체 캐릭터에게 피해 증가 버프를 제공"
          }
        ],
        note: "빠른 협주 사이클로 메인 딜러에게 공격력을 몰아주는 서브 딜러용 세트"
      },
      {
        name: "냉철한 결단 세팅",
        echoSets: ["냉철한 결단 5세트"],
        mainEchoes: [
          {
            name: "이성(異性) 무장",
            reason: "응결 피해 보너스와 공명 스킬 피해 보너스를 제공하는 에코"
          }
        ],
        note: "산화를 메인 딜러로 사용 할 경우 세트"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "60% 이상" },
      { label: "크리티컬 피해", value: "200% 이상" },
      { label: "공명 효율", value: "150% 이하" }
    ],
    mainStats: [
      { cost: "4", stats: ["크리티컬", "크리티컬 피해"] },
      { cost: "3", stats: ["응결 피해 보너스"] },
      { cost: "3", stats: ["공격력"] },
      { cost: "1", stats: ["공격력"] },
      { cost: "1", stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력",
      "공명 해방 피해 보너스"
    ],
    skillPriority: [
      "공명 해방",
      "공명 회로",
      "공명 스킬",
      "일반 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "카멜리아",
      "파수인",
      "앙코",
      "벨리나",
      "페비",
      "카를로타"
    ]
  },
  {
    id: "lingyang",
    patchVersion: "3.0",
    weapons: [
      { name: "세상 만물의 진리", note: "1순위" },
      { name: "팔방의 천추", note: "2순위" },
      { name: "물결의 파동", note: "3순위" },
      { name: "천상의 나선", note: "4순위" }
    ],
    echoSets: ["야밤의 서리 5세트"],
    mainEchoes: [
      {
        name: "반디의 군세",
        reason: "빙결 효과로 능양의 안정성 향상 및 응결 피해 보너스와 공명 스킬 피해 보너스를 제공하는 에코"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "70% 이상" },
      { label: "크리티컬 피해", value: "230% 이상" },
      { label: "공명 효율", value: "125% 이상" }
    ],
    mainStats: [
      { cost: "4", stats: ["크리티컬", "크리티컬 피해"] },
      { cost: "3", stats: ["응결 피해 보너스"] },
      { cost: "3", stats: ["응결 피해 보너스"] },
      { cost: "1", stats: ["공격력"] },
      { cost: "1", stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력",
      "공명 해방 피해 보너스"
    ],
    skillPriority: [
      "공명 회로",
      "공명 해방",
      "공명 스킬",
      "기본 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "산화",
      "절지",
      "파수인",
      "벨리나",
      "린네",
      "모니에"
    ]
  },
  {
    id: "zhezhi",
    patchVersion: "2.6",
    weapons: [
      { name: "옥수 비단", note: "1순위" },
      { name: "꼭두각시의 손", note: "2순위" },
      { name: "파도의 기록", note: "3순위" },
      { name: "청음", note: "4순위" }
    ],
    echoSets: [],
    variants: [
      {
        name: "하늘의 합주곡 세팅",
        echoSets: ["하늘의 합주곡 5세트"],
        mainEchoes: [
          {
            name: "악몽 · 반디의 군세",
            reason: "응결 피해 보너스와 협동 공격 피해 보너스를 제공하는 에코 하지만 다른 화음 이펙트인 냉철한 결단과 함께 나오기 때문에 파밍 효율이 좋지 못하다"
          },
          {
            name: "헤카테",
            reason: "협동 공격 피해 보너스를 제공하는 에코로 악몽 · 반디의 군세보다 약간 밀리지만 파밍 편의성이 좋아서 추천한다"
          }
        ],
        note: "절지의 딜 비중을 늘리는 세트로 메인 딜러의 공명 체인이 낮은 경우 좋은 선택지"
      },
      {
        name: "떠오르는 구름 세팅",
        echoSets: ["떠오르는 구름 5세트"],
        mainEchoes: [
          {
            name: "음험한 백로",
            reason: "공명 에너지가 회복되고 다음 변주로 등장하는 캐릭터에게 피해 증가 옵션을 주는 서브 딜러용 에코"
          }
        ],
        note: "공명 해방 사용 후 바로 교체하여 메인 딜러의 딜 비중을 높이는 전략 메인 딜러의 공명 체인이 높을 경우 좋은 선택지"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "60% 이상" },
      { label: "크리티컬 피해", value: "260% 이상" },
      { label: "공격력", value: "2000 이상" },
      { label: "공명 효율", value: "160% 이상" }
    ],
    mainStats: [
      { cost: "4", stats: ["크리티컬", "크리티컬 피해"] },
      { cost: "3", stats: ["응결 피해 보너스", "공격력"] },
      { cost: "3", stats: ["공명 효율", "공격력"] },
      { cost: "1", stats: ["공격력"] },
      { cost: "1", stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력",
      "일반 공격 피해 증가"
    ],
    skillPriority: [
      "공명 회로",
      "공명 해방",
      "공명 스킬",
      "변주 스킬",
      "기본 공격"
    ],
    synergyCharacters: [
      "카를로타",
      "금희",
      "능양",
      "파수인",
      "벨리나"
    ]
  },
  {
    id: "youhu",
    patchVersion: "2.1",
    weapons: [
      { name: "팔방의 천추", note: "1순위" },
      { name: "물결의 파동", note: "2순위" },
      { name: "바람의 악센트", note: "3순위" },
      { name: "21형 권갑 · 아이언 팬텀", note: "4순위" }
    ],
    echoSets: [],
    variants: [
      {
        name: "야밤의 서리 세팅",
        echoSets: ["야밤의 서리 5세트"],
        mainEchoes: [
          {
            name: "반디의 군세",
            reason: "응결 피해 보너스와 공명 스킬 피해 보너스를 제공하는 에코로 동일한 속성이기 때문에 사용한다"
          }
        ],
        mainStats: [
          { cost: "4", stats: ["크리티컬", "크리티컬 피해"] },
          { cost: "3", stats: ["공격력"] },
          { cost: "3", stats: ["응결 피해 보너스"] },
          { cost: "1", stats: ["공격력"] },
          { cost: "1", stats: ["공격력"] }
        ],
        note: "유호의 딜링 성능을 극대화 하기 위한 세트"
      },
      {
        name: "찬란한 광휘 세팅",
        echoSets: ["찬란한 광휘 5세트"],
        mainEchoes: [
          {
            name: "타종 거북이",
            reason: "피해 감소 효과와 피해 증가를 제공하는 에코로 서포팅하기 좋은 에코"
          },
          {
            name: "돌아갈 곳이 없는 오류",
            reason: "공명 효율 증가와 파티 모든 캐릭터의 공격력을 증가시키는 에코로 서포팅하기 좋은 에코"
          }
        ],
        mainStats: [
          { cost: "4", stats: ["치료 효과 보너스"] },
          { cost: "3", stats: ["공격력"] },
          { cost: "3", stats: ["응결 피해 보너스"] },
          { cost: "1", stats: ["공격력"] },
          { cost: "1", stats: ["공격력"] }
        ],
        note: "유호를 힐러 포지션으로 사용하고 싶은 경우 좋은 선택지"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "60% 이상" },
      { label: "크리티컬 피해", value: "220% 이상" },
      { label: "공명 효율", value: "125% 이상" }
    ],
    mainStats: [], // variants 내 mainStats 사용
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력"
    ],
    skillPriority: [
      "공명 스킬",
      "공명 회로",
      "공명 해방",
      "기본 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "음림",
      "절지",
      "모르테피"
    ]
  },
  {
    id: "carlotta",
    patchVersion: "3.0",
    weapons: [
      { name: "죽음과 춤", note: "1순위" },
      { name: "위상의 파동", note: "2순위" },
      { name: "뇌전", note: "3순위" },
      { name: "불멸의 성화", note: "4순위" }
    ],
    echoSets: [
      {
        name: "냉철한 결단 5세트",
        note: "카를로타의 핵심인 공명 스킬 피해와 응결 피해 보너스를 제공하는 세트로 버프를 최대치 까지 중첩 가능하다"
      }
    ],
    mainEchoes: [
      {
        name: "이성(異性) 무장",
        reason: "장착 시 응결 피해 보너스와 공명 스킬 피해 보너스 상시로 제공하기 때문에 편의성이 매우 좋다"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "70% 이상" },
      { label: "크리티컬 피해", value: "260% 이상" },
      { label: "공명 효율", value: "120% 이상" },
      { label: "공격력", value: "2200 이상" }
    ],
    mainStats: [
      { cost: 4, stats: ["크리티컬 피해", "크리티컬"] },
      { cost: 3, stats: ["응결 피해 보너스", "공격력"] },
      { cost: 3, stats: ["응결 피해 보너스", "공격력"] },
      { cost: 1, stats: ["공격력"] },
      { cost: 1, stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력",
      "공명 스킬 피해 보너스"
    ],
    skillPriority: [
      "공명 회로",
      "공명 해방",
      "공명 스킬",
      "기본 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "절지",
      "파수인",
      "린네",
      "모니에",
      "산화",
      "복링"
    ]
  },
  {
    id: "hiyuki",
    patchVersion: "3.3",
    weapons: [
      { name: "서린 불꽃", note: "1순위" },
      { name: "천년의 회류", note: "2순위" },
      { name: "예리한 날개깃", note: "3순위" },
      { name: "풍류의 우화시", note: "4순위" }
    ],
    echoSets: [
      {
        name: "소리 없이 내려앉은 기도의 눈 5세트",
        note: "서리 효과 추가 시 응결 피해량과 공명 해방 피해 가할 시 크리티컬이 증가하는 세트로 세팅의 난이도가 낮아진다 또한 반주 스킬 발동 시 다음 등장 캐릭터가 응결 피해가 증가하는 다양한 세트 옵션이 포함되어 있다"
      }
    ],
    mainEchoes: [
      {
        name: "공명의 메아리 · 명식 · 허무의 신",
        reason: "장착 시 응결 피해 보너스와 공명 해방 피해 보너스를 제공하며 소환형 에코이기 때문에 편의성이 좋다"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "75% 이하 (세트 발동 시 100%)" },
      { label: "크리티컬 피해", value: "260% 이상" },
      { label: "공명 효율", value: "130% 이상" }
    ],
    mainStats: [
      { cost: 4, stats: ["크리티컬 피해", "크리티컬"] },
      { cost: 3, stats: ["응결 피해 보너스", "공격력"] },
      { cost: 3, stats: ["응결 피해 보너스", "공격력"] },
      { cost: 1, stats: ["공격력"] },
      { cost: 1, stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력",
      "공명 해방 피해 보너스"
    ],
    skillPriority: [
      "공명 회로",
      "공명 해방",
      "기본 공격",
      "공명 스킬",
      "변주 스킬"
    ],
    synergyCharacters: [
      "린네",
      "치사",
      "모니에",
      "벨리나",
      "절지",
      "음림",
      "산화"
    ]
  },
  {
    id: "chixia",
    patchVersion: "2.1",
    weapons: [
      { name: "죽음과 춤", note: "1순위" },
      { name: "부동의 안개", note: "2순위" },
      { name: "불멸의 성화", note: "3순위" },
      { name: "역설의 격류", note: "4순위" }
    ],
    echoSets: [],
    variants: [
      {
        name: "솟구치는 용암 세팅",
        echoSets: ["솟구치는 용암 5세트"],
        mainEchoes: [
          {
            name: "악몽 · 지옥불 기사",
            reason: "용융 피해를 입히는 동시에 공명 스킬 피해 보너스를 제공하는 에코"
          }
        ],
        note: "용융 딜러 캐릭터가 사용하는 가장 기본적인 세트로 공명 스킬 사용 시 용융 피해가 증가된다"
      },
      {
        name: "울부짖는 늑대의 불꽃 세팅",
        echoSets: ["울부짖는 늑대의 불꽃 5세트"],
        mainEchoes: [
          {
            name: "영광의 사자",
            reason: "장착 시 용융 피해 보너스와 공명 해방 피해 보너스를 제공하는 에코"
          }
        ],
        note: "장리와 퀵스왑 활용할 경우 좋은 세트로 파티의 용융 피해 증가와 공명 해방 피해가 증가한다"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "70% 이상" },
      { label: "크리티컬 피해", value: "200% 이상" },
      { label: "공명 효율", value: "130% 이상" }
    ],
    mainStats: [
      { cost: 4, stats: ["크리티컬", "크리티컬 피해"] },
      { cost: 3, stats: ["공격력"] },
      { cost: 3, stats: ["용융 피해 보너스", "공격력"] },
      { cost: 1, stats: ["공격력"] },
      { cost: 1, stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력"
    ],
    skillPriority: [
      "공명 회로",
      "공명 해방",
      "공명 스킬",
      "기본 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "장리",
      "브렌트",
      "루파",
      "벨리나",
      "파수인"
    ]
  },
  {
    id: "mortefi",
    patchVersion: "2.3",
    weapons: [
      { name: "죽음과 춤", note: "1순위" },
      { name: "부동의 안개", note: "2순위" },
      { name: "화려한 악곡", note: "3순위" },
      { name: "천공의 순간", note: "4순위" }
    ],
    echoSets: [],
    variants: [
      {
        name: "떠오르는 구름 세팅",
        echoSets: ["떠오르는 구름 5세트"],
        mainEchoes: [
          {
            name: "음험한 백로",
            reason: "자신의 공명 에너지 회복과 장착한 캐릭터가 반주 스킬 사용 시 다음 교체 캐릭터에게 피해 증가 버프를 제공"
          }
        ],
        note: "장착한 캐릭터의 다음 캐릭터 등장 시 공격력을 제공하는 세트로 메인 딜러 서포팅에 좋은 세트"
      },
      {
        name: "하늘의 합주곡 세팅",
        echoSets: ["하늘의 합주곡 5세트"],
        mainEchoes: [
          {
            name: "헤카테",
            reason: "협동 공격 피해 보너스를 제공하는 에코로 무난하게 사용하기 좋다"
          }
        ],
        note: "모르테피의 협동 공격 DPS 증가와 아군에게 공격력 버프를 제공하는 세트"
      }
    ],
    targetStats: [
      { label: "크리티컬", value: "70% 이상" },
      { label: "크리티컬 피해", value: "200% 이상" },
      { label: "공명 효율", value: "130% 이상" }
    ],
    mainStats: [
      { cost: 4, stats: ["크리티컬"] },
      { cost: 3, stats: ["공명 효율", "용융 피해 보너스", "공격력"] },
      { cost: 3, stats: ["용융 피해 보너스", "공격력"] },
      { cost: 1, stats: ["공격력"] },
      { cost: 1, stats: ["공격력"] }
    ],
    subStats: [
      "크리티컬",
      "크리티컬 피해",
      "공명 효율",
      "공격력"
    ],
    skillPriority: [
      "공명 해방",
      "공명 회로",
      "공명 스킬",
      "기본 공격",
      "변주 스킬"
    ],
    synergyCharacters: [
      "기염",
      "아우구스타",
      "금희",
      "갈브레나",
      "루파",
      "브렌트",
      "파수인"
    ]
  }
];
