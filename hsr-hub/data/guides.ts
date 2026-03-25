export interface SettingVariant {
  name: string;
  bestRelics: (string | { name: string; note: string })[];
  bestOrnaments: (string | { name: string; note: string })[];
  bestLightCones?: (string | { name: string; note: string })[];
  skillPriority?: string[];
  mainStats: {
    body: string;
    boots: string;
    sphere: string;
    rope: string;
  };
  subStats: string[];
  targetStats: {
    label: string;
    value: string;
    note?: string;
  }[];
}

export interface EidolonVariant {
  name: string;
  labels?: string[]; // Optional labels for efficiency columns (e.g., Light Cone names)
  efficiency: {
    level: number;
    impact: "High" | "Medium" | "Low";
    efficiency1: string;
    efficiency3: string;
    description: string;
  }[];
}

export interface CharacterGuide {
  characterName: string;
  lastUpdated: string;
  patchVersion: string;
  // Variants
  variants?: SettingVariant[];
  eidolonVariants?: EidolonVariant[];
  // 1. 유물 & 장신구 세팅
  bestRelics: (string | { name: string; note: string })[];
  bestOrnaments: (string | { name: string; note: string })[];
  // 2. 권장 주옵션
  mainStats: {
    body: string;
    boots: string;
    sphere: string;
    rope: string;
  };
  // 3. 권장 부옵션
  subStats: string[];
  // 4. 추천 목표 스탯
  targetStats: {
    label: string;
    value: string;
    note?: string;
  }[];
  // 5. 추천 광추
  bestLightCones: (string | { name: string; note: string })[];
  // 6. 행적 우선순위
  skillPriority: string[];
  // 7. 성흔 효율
  recommendedEidolon?: string;
  eidolonEfficiency: {
    level: number;
    impact: "High" | "Medium" | "Low";
    efficiency1: string; // 1인 개체
    efficiency3: string; // 3인 개체
    description: string;
  }[];
}

export const HSR_CHARACTER_GUIDES: CharacterGuide[] = [
  {
    characterName: "반디",
    lastUpdated: "2026-03-08",
    patchVersion: "3.8",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["겁화 연등의 연마궁", "도적국 탈리아"],
    mainStats: {
      body: "공격력",
      boots: "속도\nor 공격력",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "250% 이상" },
      { label: "공격력", value: "2500" },
      { label: "속도", value: "156 이상", note: "종결 167+" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "꿈은 어디로 돌아가야 하는가", "어떤 에이언즈의 몰락", "마음에 새긴 약속"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-13.2 SP)" },
      { level: 1, impact: "High", efficiency1: "108.40%", efficiency3: "107.95%", description: "SP 소모 감소 (-4.4 SP)" },
      { level: 2, impact: "High", efficiency1: "153.99%", efficiency3: "151.16%", description: "화력 대폭 상승 (-4.4 SP)" },
      { level: 3, impact: "Medium", efficiency1: "154.52%", efficiency3: "151.65%", description: "스킬 레벨 상승 (-4.4 SP)" },
      { level: 4, impact: "Low", efficiency1: "154.52%", efficiency3: "151.65%", description: "효과 저항 상승 (-4.4 SP)" },
      { level: 5, impact: "Medium", efficiency1: "160.10%", efficiency3: "157.13%", description: "필살기/특성 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "246.33%", efficiency3: "239.82%", description: "종결 돌파 (-4.4 SP)" }
    ]
  },
  {
    characterName: "백로",
    lastUpdated: "2026-03-08",
    patchVersion: "3.8",
    bestRelics: ["태양과 번개의 여전사", "가상공간을 누비는 메신저", "흔적을 남기지 않은 과객"],
    bestOrnaments: ["사색하는 거목", "바다에 잠긴 루샤카", "불로인의 선주"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도\nor HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "효과 저항", "방어력"],
    targetStats: [
      { label: "속도", value: "134 / 143\n/ 160 이상" },
      { label: "HP", value: "5600 ~ 6400 이상" }
    ],
    bestLightCones: ["섬뜩한 밤", "세월은 흐를 뿐", "수술 후의 대화", "내일의 내일이 올 때까지", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "에너지 회복 보조" },
      { level: 2, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "치유량 증가" },
      { level: 4, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "아군 피해 증가 버프" },
      { level: 6, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "부활 횟수 증가" }
    ]
  },
  {
    characterName: "아케론",
    lastUpdated: "2026-03-08",
    patchVersion: "3.8",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률\nor 치명타 피해",
      boots: "속도\nor 공격력",
      sphere: "공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 이상", note: "1돌파 시 -18% 적용" },
      { label: "치명타 피해", value: "160% 이상" },
      { label: "공격력", value: "4000 이상" }
    ],
    bestLightCones: ["흘러가는 강가를 따라", "끝없는 춤"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-7.4 SP)" },
      { level: 1, impact: "Medium", efficiency1: "111.77%", efficiency3: "113.53%", description: "치명타 확률 증가" },
      { level: 2, impact: "High", efficiency1: "123.38%", efficiency3: "129.82%", description: "공허 캐릭터 요구량 감소" },
      { level: 3, impact: "Medium", efficiency1: "129.42%", efficiency3: "137.06%", description: "필살기/일반 공격 레벨 상승" },
      { level: 4, impact: "High", efficiency1: "137.38%", efficiency3: "145.45%", description: "필살기 피해 취약 부여" },
      { level: 5, impact: "Medium", efficiency1: "142.16%", efficiency3: "149.18%", description: "전투 스킬/특성 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "169.81%", efficiency3: "178.11%", description: "모든 공격이 필살기 피해로 간주" }
    ]
  },
  {
    characterName: "아글라이아",
    lastUpdated: "2026-03-08",
    patchVersion: "3.8",
    bestRelics: ["개선가를 울리는 영웅"],
    bestOrnaments: ["기묘한 나나 낙원"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "번개 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해", "치명타 확률"],
    targetStats: [
      { label: "속도", value: "134 / 161 이상" },
      { label: "치명타 확률", value: "100%" }
    ],
    bestLightCones: ["시간을 황금으로 엮어", "땀은 많이, 눈물은 적게", "천재들의 안부 인사"],
    skillPriority: ["일반 공격", "필살기", "기억 정령 스킬", "기억 정령 특성", "특성", "전투 스킬"],
    recommendedEidolon: "E1 / E2 / E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (2 SP)" },
      { level: 1, impact: "High", efficiency1: "184.87%", efficiency3: "174.24%", description: "SP 소모 감소 (1 SP)" },
      { level: 2, impact: "High", efficiency1: "214.74%", efficiency3: "202.39%", description: "성흔 효과 (1 SP)" },
      { level: 3, impact: "Medium", efficiency1: "232.82%", efficiency3: "215.23%", description: "일반 공격/필살기 레벨 상승 (1 SP)" },
      { level: 4, impact: "High", efficiency1: "272.04%", efficiency3: "252.46%", description: "성흔 효과 (1 SP)" },
      { level: 5, impact: "Medium", efficiency1: "287.54%", efficiency3: "266.89%", description: "전투 스킬/특성 레벨 상승 (1 SP)" },
      { level: 6, impact: "High", efficiency1: "394.79%", efficiency3: "364.82%", description: "성흔 효과 (1 SP)" }
    ]
  },
  {
    characterName: "아낙사",
    lastUpdated: "2026-03-09",
    patchVersion: "3.8",
    bestRelics: ["지식의 바다에 빠진 학자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or\n치명타 피해",
      boots: "속도 or 공격력",
      sphere: "바람 피해",
      rope: "에너지 충전 효율\nor 공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "치명타 확률", value: "88% 이상" },
      { label: "속도", value: "134 이상" }
    ],
    variants: [
      {
        name: "하이퍼캐리",
        bestRelics: ["지식의 바다에 빠진 학자"],
        bestOrnaments: ["이즈모 현세와 타카마 신국"],
        mainStats: {
          body: "치명타 확률 or\n치명타 피해",
          boots: "속도 or 공격력",
          sphere: "바람 피해",
          rope: "에너지 충전 효율\nor 공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
        targetStats: [
          { label: "공격력", value: "3000 이상" },
          { label: "치명타 확률", value: "88% 이상" },
          { label: "속도", value: "134 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치명타 확률 or\n치명타 피해",
          boots: "속도 or 공격력",
          sphere: "바람 피해",
          rope: "에너지 충전 효율\nor 공격력"
        },
        subStats: ["속도", "치명타 확률", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "165 이상" }
        ]
      }
    ],
    bestLightCones: ["생명은 불태워야 하는 것", "우주 대사업"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [], // Default empty
    eidolonVariants: [
      {
        name: "서브 딜러",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "115% / 100%", efficiency3: "117% / 100%", description: "기본 성능 (전광 / 대사업)" },
          { level: 1, impact: "Medium", efficiency1: "129% / 111%", efficiency3: "131% / 111%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "155% / 133%", efficiency3: "158% / 133%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "158% / 136%", efficiency3: "163% / 137%", description: "스킬 레벨 상승" },
          { level: 4, impact: "High", efficiency1: "197% / 167%", efficiency3: "203% / 169%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "214% / 181%", efficiency3: "217% / 181%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "321% / 274%", efficiency3: "324% / 271%", description: "성흔 효과" }
        ]
      },
      {
        name: "메인 딜러",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "115% / 100%", efficiency3: "117% / 100%", description: "기본 성능 (전광 / 대사업)" },
          { level: 1, impact: "Medium", efficiency1: "129% / 111%", efficiency3: "131% / 111%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "155% / 133%", efficiency3: "157% / 133%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "157% / 135%", efficiency3: "161% / 133%", description: "스킬 레벨 상승" },
          { level: 4, impact: "High", efficiency1: "196% / 165%", efficiency3: "201% / 167%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "215% / 182%", efficiency3: "217% / 181%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "330% / 281%", efficiency3: "330% / 277%", description: "성흔 효과" }
        ]
      }
    ]
  },
  {
    characterName: "아처",
    lastUpdated: "2026-03-10",
    patchVersion: "3.8",
    bestRelics: ["별처럼 빛나는 천재", "망국을 애도하는 시인", "거친 파도를 헤치는 선장"],
    bestOrnaments: ["뭇별 경기장", "텐고쿠@라이브스트리밍"],
    mainStats: {
      body: "치명타 확률 or\n치명타 피해",
      boots: "공격력",
      sphere: "양자 피해 or\n공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "100%" },
      { label: "치명타 피해", value: "100%" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: ["이상이 불타는 지옥", "순수 사유의 세례", "별바다 순항", "그 종착지에서 다시 만나자", "침묵만이"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [],
    eidolonVariants: [
      {
        name: "Archer [1 target]",
        labels: ["이상이 불타는 지옥", "별바다 순항"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "113%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "145%", efficiency3: "128%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "174%", efficiency3: "153%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "193%", efficiency3: "170%", description: "스킬 레벨 상승" },
          { level: 4, impact: "High", efficiency1: "213%", efficiency3: "188%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "217%", efficiency3: "192%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "294%", efficiency3: "256%", description: "성흔 효과" }
        ]
      }
    ]
  },
  {
    characterName: "아젠티",
    lastUpdated: "2026-03-10",
    patchVersion: "3.0",
    bestRelics: ["지식의 바다에 빠진 학자", "거친 파도를 헤치는 선장", "스트리트 격투왕"],
    bestOrnaments: ["주인 없는 황폐한 별 츠가냐", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or\n치명타 피해",
      boots: "속도 or 공격력",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "75%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "3500" }
    ],
    variants: [
      {
        name: "기본",
        bestRelics: ["지식의 바다에 빠진 학자", "거친 파도를 헤치는 선장", "스트리트 격투왕"],
        bestOrnaments: ["주인 없는 황폐한 별 츠가냐", "회전을 멈춘 살소토"],
        bestLightCones: ["눈에 담긴 순간", "추궁할 수 없는 곳을 향해", "오늘도 평화로운 하루", "은하철도의 밤", "멈추지 않는 연산"],
        mainStats: {
          body: "치명타 확률 or\n치명타 피해",
          boots: "속도 or 공격력",
          sphere: "물리 피해",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
        targetStats: [
          { label: "치명타 확률", value: "75%" },
          { label: "치명타 피해", value: "150%" },
          { label: "공격력", value: "3500" }
        ]
      },
      {
        name: "더 헤르타 조합",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        bestLightCones: ["영험한 열쇠"],
        mainStats: {
          body: "부 옵션 좋은 것",
          boots: "속도",
          sphere: "부 옵션 좋은 것",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도"],
        targetStats: [
          { label: "속도", value: "168 이상" }
        ]
      }
    ],
    bestLightCones: ["눈에 담긴 순간", "추궁할 수 없는 곳을 향해", "오늘도 평화로운 하루", "은하철도의 밤", "멈추지 않는 연산", "영험한 열쇠"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-7 SP)" },
      { level: 1, impact: "Low", efficiency1: "113.94%", efficiency3: "113.94%", description: "성흔 효과 (-7 SP)" },
      { level: 2, impact: "Medium", efficiency1: "113.94%", efficiency3: "129.11%", description: "성흔 효과 (-7 SP)" },
      { level: 3, impact: "Medium", efficiency1: "119.80%", efficiency3: "136.14%", description: "스킬 레벨 상승 (-7 SP)" },
      { level: 4, impact: "Medium", efficiency1: "126.58%", efficiency3: "143.85%", description: "성흔 효과 (-7 SP)" },
      { level: 5, impact: "Medium", efficiency1: "133.76%", efficiency3: "151.50%", description: "스킬 레벨 상승 (-7 SP)" },
      { level: 6, impact: "High", efficiency1: "151.80%", efficiency3: "171.06%", description: "성흔 효과 (-7 SP)" }
    ]
  },
  {
    characterName: "아를란",
    lastUpdated: "2026-03-10",
    patchVersion: "3.0",
    bestRelics: ["지식의 바다에 빠진 학자", "뇌전을 울리는 밴드", "들이삭과 동행하는 거너"],
    bestOrnaments: ["뭇별 경기장", { name: "창공 전선 그라모스", note: "속도 135 기준" }, "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or\n치명타 피해",
      boots: "속도 or 공격력",
      sphere: "번개 피해",
      rope: "공격력 or\n격파 특수효과"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "방어력"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["어떤 에이언즈의 몰락", "닿을 수 없는 저편", "대체할 수 없는 것", "과거의 핏자국", "비밀 맹세"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "103.54%", efficiency3: "102.87%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "103.54%", efficiency3: "102.87%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "111.57%", efficiency3: "109.39%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "111.57%", efficiency3: "109.39%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "115.27%", efficiency3: "114.29%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "117.82%", efficiency3: "141.24%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "아스타",
    lastUpdated: "2026-03-10",
    patchVersion: "4.0",
    bestRelics: ["가상공간을 누비는 메신저", "눈보라에 맞서는 철위대", "흔적을 남기지 않은 과객", { name: "밤낮의 경계를 나는 매", note: "고속 세팅" }],
    bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카", "불로인의 선주", { name: "꿈의 땅 페나코니", note: "화염 속성 파티인 경우에만" }],
    mainStats: {
      body: "HP or 방어력",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "방어력", "효과 저항"],
    targetStats: [
      { label: "속도", value: "134 이상" }
    ],
    variants: [
      {
        name: "기본",
        bestRelics: ["가상공간을 누비는 메신저", "눈보라에 맞서는 철위대", "흔적을 남기지 않은 과객"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카", "불로인의 선주"],
        mainStats: {
          body: "HP or 방어력",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "HP", "방어력", "효과 저항"],
        targetStats: [
          { label: "속도", value: "134 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "고속 세팅" }],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "HP or 방어력",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "HP", "방어력", "효과 저항"],
        targetStats: [
          { label: "속도", value: "160+ 권장" }
        ]
      }
    ],
    bestLightCones: ["댄스! 댄스! 댄스!", "맞물린 톱니", "아직 전투는 끝나지 않았다", "기억 속 모습", { name: "행성과의 만남", note: "화염 속성 파티인 경우에만" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "어벤츄린",
    lastUpdated: "2026-03-10",
    patchVersion: "4.0",
    bestRelics: ["별빛에 숨은 은둔자", "사수에 잠수한 선구자", "정토 교황의 팔라딘"],
    bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
    mainStats: {
      body: "방어력",
      boots: "속도",
      sphere: "방어력",
      rope: "방어력 or\n에너지 충전 효율"
    },
    subStats: ["방어력", "효과 저항", "속도"],
    targetStats: [
      { label: "방어력", value: "4500 이상" },
      { label: "속도", value: "134 이상" }
    ],
    variants: [
      {
        name: "기본",
        bestRelics: ["별빛에 숨은 은둔자", "사수에 잠수한 선구자", "정토 교황의 팔라딘"],
        bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
        mainStats: {
          body: "방어력",
          boots: "속도",
          sphere: "방어력",
          rope: "방어력 or\n에너지 충전 효율"
        },
        subStats: ["방어력", "효과 저항", "속도"],
        targetStats: [
          { label: "방어력", value: "4500 이상" },
          { label: "속도", value: "134 이상" }
        ]
      },
      {
        name: "서브 딜러 세팅",
        bestRelics: ["별빛에 숨은 은둔자", "사수에 잠수한 선구자"],
        bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
        mainStats: {
          body: "치명타 피해 or\n방어력",
          boots: "속도 or\n방어력",
          sphere: "방어력",
          rope: "방어력 or\n에너지 충전 효율"
        },
        subStats: ["방어력", "치명타 확률", "치명타 피해", "HP"],
        targetStats: [
          { label: "방어력", value: "4000 이상" },
          { label: "속도", value: "134 이상" },
          { label: "치명타 확률", value: "52%", note: "1돌파 시 에충 매듭 권장" }
        ]
      }
    ],
    bestLightCones: ["언제나 불공평한 운명", "언제나 여정이 평탄하기를", "승리의 순간", "여생의 첫날", { name: "우주 시장 동향", note: "아케론 파티 사용 시" }],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "블랙 스완",
    lastUpdated: "2026-03-11",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "사수에 잠수한 선구자"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "범은하 상사"],
    mainStats: {
      body: "효과 명중 or 공격력",
      boots: "속도 or 공격력",
      sphere: "바람 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "효과 명중", value: "120% 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: [
      "시간의 기억에 대한 재구성",
      "그 무수한 봄날",
      "사냥감의 시선",
      "쇼타임",
      { name: "바다는 왜 노래하는가", note: "블랙 스완 1돌파 시 고려" }
    ],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "블레이드",
    lastUpdated: "2026-03-11",
    patchVersion: "3.4",
    bestRelics: ["장수를 원하는 제자", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["고요한 습골지", "회전을 멈춘 살소토", "뭇별 경기장"],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "속도 or HP",
      sphere: "바람 피해 or HP",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "HP", value: "7000 이상" }
    ],
    bestLightCones: [
      "닿을 수 없는 저편",
      "피의 불꽃이여, 앞길을 태워라",
      "비밀 맹세",
      "인사록•음률 사냥",
      "불의 먼 곳에서"
    ],
    skillPriority: ["일반 공격", "특성", "전투 스킬", "필살기"],
    eidolonVariants: [
      {
        name: "1인 개체 (AS 전/후)",
        labels: ["AS 전", "AS 후"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "136%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "115%", efficiency3: "215%", description: "필살기 단일 타겟 피해량 대폭 증가" },
          { level: 2, impact: "Medium", efficiency1: "129%", efficiency3: "241%", description: "치명타 확률 15% 증가" },
          { level: 3, impact: "Low", efficiency1: "134%", efficiency3: "249%", description: "필살기 및 특성 레벨 증가" },
          { level: 4, impact: "High", efficiency1: "153%", efficiency3: "287%", description: "최대 HP 증가 (최대 2회 중첩)" },
          { level: 5, impact: "Low", efficiency1: "164%", efficiency3: "304%", description: "전투 스킬 및 일반 공격 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "200%", efficiency3: "352%", description: "특성 발동에 필요한 스택 수 감소 및 피해량 증가" }
        ]
      },
      {
        name: "3인 개체 (AS 전/후)",
        labels: ["AS 전", "AS 후"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "143%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "106%", efficiency3: "174%", description: "필살기 단일 타겟 피해량 대폭 증가" },
          { level: 2, impact: "Medium", efficiency1: "118%", efficiency3: "195%", description: "치명타 확률 15% 증가" },
          { level: 3, impact: "Low", efficiency1: "126%", efficiency3: "207%", description: "필살기 및 특성 레벨 증가" },
          { level: 4, impact: "High", efficiency1: "144%", efficiency3: "238%", description: "최대 HP 증가 (최대 2회 중첩)" },
          { level: 5, impact: "Low", efficiency1: "152%", efficiency3: "251%", description: "전투 스킬 및 일반 공격 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "206%", efficiency3: "299%", description: "특성 발동에 필요한 스택 수 감소 및 피해량 증가" }
        ]
      }
    ],
    eidolonEfficiency: []
  },
  {
    characterName: "부트힐",
    lastUpdated: "2026-03-11",
    patchVersion: "4.0",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁"],
    mainStats: {
      body: "치명타 확률 or 공격력",
      boots: "속도",
      sphere: "공격력 or 물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "격파 특수효과", value: "350%" },
      { label: "속도", value: "157 이상" }
    ],
    bestLightCones: [
      "두 번째 생명을 향해",
      "그림자처럼 뒤따르는 밤",
      "대립"
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonVariants: [
      {
        name: "성흔 효율",
        labels: ["1개체"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "-", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "109.88%", efficiency3: "-", description: "전투 시작 시 포켓용 시계 스택 획득 및 방어력 무시" },
          { level: 2, impact: "Medium", efficiency1: "116.78%", efficiency3: "-", description: "격파 특수효과 증가 및 전투 스킬 포인트 회복" },
          { level: 3, impact: "Low", efficiency1: "117.86%", efficiency3: "-", description: "필살기 및 일반 공격 레벨 증가" },
          { level: 4, impact: "Medium", efficiency1: "128.74%", efficiency3: "-", description: "받는 피해 감소 및 대상이 받는 피해 증가" },
          { level: 5, impact: "Low", efficiency1: "139.33%", efficiency3: "-", description: "전투 스킬 및 특성 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "173.96%", efficiency3: "-", description: "특성 피해가 인접한 목표에게도 확산 피해를 입힘" }
        ]
      }
    ],
    eidolonEfficiency: []
  },
  {
    characterName: "브로냐",
    lastUpdated: "2026-03-11",
    patchVersion: "3.0",
    variants: [
      {
        name: "일반 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제"],
        bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "치명타 피해", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "168 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제", { name: "밤낮의 경계를 나는 매", note: "고속 세팅" }],
    bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골", { name: "생명의 바커 공", note: "고속 세팅" }],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "치명타 피해", value: "200% 이상" }
    ],
    bestLightCones: [
      "대지로 돌아온 비행",
      "아직 전투는 끝나지 않았다",
      { name: "댄스! 댄스! 댄스!", note: "고속 세팅" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "카스토리스",
    lastUpdated: "2026-03-11",
    patchVersion: "3.6",
    bestRelics: ["망국을 애도하는 시인"],
    bestOrnaments: ["고요한 습골지", { name: "꿈을 엮는 요정의 낙원", note: "기억 파티 조합 시" }, "기묘한 나나 낙원"],
    mainStats: {
      body: "HP or 치명타 피해 or 치명타 확률",
      boots: "HP",
      sphere: "HP or 양자 피해 (히아킨 1돌파 이상 시 양자 피해)",
      rope: "HP"
    },
    subStats: ["치명타 피해", "치명타 확률", "HP"],
    targetStats: [
      { label: "HP", value: "8000 이상" },
      { label: "속도", value: "95 미만" }
    ],
    bestLightCones: [
      "이별이 더 아름답도록",
      "꽃은 잊지 않는다",
      "땀은 많이, 눈물은 적게"
    ],
    skillPriority: ["기억 정령 스킬", "기억 정령 특성", "필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonVariants: [
      {
        name: "목표 1개 (광추별 효율)",
        labels: ["이별이 더 아름답도록", "땀은 많이, 눈물은 적게"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "123%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "151%", efficiency3: "123%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "209%", efficiency3: "169%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "224%", efficiency3: "180%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "224%", efficiency3: "180%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "238%", efficiency3: "192%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "353%", efficiency3: "283%", description: "최종 돌파 효과" }
        ]
      },
      {
        name: "목표 3개 (광추별 효율)",
        labels: ["이별이 더 아름답도록", "땀은 많이, 눈물은 적게"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "123%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "149%", efficiency3: "121%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "230%", efficiency3: "187%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "240%", efficiency3: "194%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "240%", efficiency3: "194%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "262%", efficiency3: "212%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "350%", efficiency3: "283%", description: "최종 돌파 효과" }
        ]
      }
    ],
    eidolonEfficiency: []
  },
  {
    characterName: "케리드라",
    lastUpdated: "2026-03-12",
    patchVersion: "4.0",
    bestRelics: ["고행의 길에 다시 오른 사제"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "공격력 or 속도 (파이논 파티 공격력)",
      sphere: "바람 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "4000" },
      { label: "속도", value: "114 or 134 이상" },
      { label: "참고", value: "파이논 파티 파이논(115) → 케리드라(114) → 선데이 순서 권장" }
    ],
    bestLightCones: [
      "황금 피가 새겨진 시대",
      "거울 속 지난날의 나",
      "찬란하게 빛나는 밤",
      "영원한 미궁의 식사",
      { name: "속세에서의 유희", note: "파이논 파티 2순위" }
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "사이퍼",
    lastUpdated: "2026-03-12",
    patchVersion: "3.3",
    variants: [
      {
        name: "디버퍼 세팅",
        bestRelics: [
          { name: "가상공간을 누비는 메신저", note: "2세트" },
          { name: "고행의 길에 다시 오른 사제", note: "2세트" },
          { name: "천명에 응해 먼 길을 떠난 점술가", note: "2세트" },
          { name: "태양과 번개의 여전사", note: "2세트" }
        ],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or 효과 명중",
          boots: "속도",
          sphere: "양자 피해",
          rope: "에너지 충전 효율 or 공격력"
        },
        subStats: ["속도", "효과 명중", "치명타 피해", "치명타 확률"],
        targetStats: [
          { label: "효과 명중", value: "39% 이하", note: "땀방울 채용 시 66.7%" },
          { label: "속도", value: "170 이상" }
        ]
      },
      {
        name: "서브 딜러 세팅",
        bestRelics: ["사수에 잠수한 선구자"],
        bestOrnaments: ["바다에 잠긴 루샤카", "이즈모 현세와 타카마 신국"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or 효과 명중",
          boots: "속도",
          sphere: "양자 피해",
          rope: "에너지 충전 효율 or 공격력"
        },
        subStats: ["속도", "효과 명중", "치명타 피해", "치명타 확률"],
        targetStats: [
          { label: "효과 명중", value: "39% 이하", note: "땀방울 채용 시 66.7%" },
          { label: "속도", value: "170 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제", "사수에 잠수한 선구자"],
    bestOrnaments: ["바다에 잠긴 루샤카", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 피해 or 치명타 확률 or 효과 명중",
      boots: "속도",
      sphere: "양자 피해",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["속도", "효과 명중", "치명타 피해", "치명타 확률"],
    targetStats: [
      { label: "효과 명중", value: "39% 이하", note: "땀방울 채용 시 66.7%" },
      { label: "속도", value: "170 이상" }
    ],
    bestLightCones: [
      "바람에 흩날리는 거짓말",
      "땀방울처럼 빛나는 결심",
      { name: "휴일의 목욕탕 대모험", note: "서브 딜러 세팅 시" }
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: [
      { level: 1, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 2, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 6, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" }
    ]
  },
  {
    characterName: "클라라",
    lastUpdated: "2026-03-12",
    patchVersion: "4.0",
    bestRelics: [
      { name: "망국을 애도하는 시인", note: "1순위" },
      "스트리트 격투왕",
      "장수를 원하는 제자"
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      { name: "회전을 멈춘 살소토", note: "2순위" },
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "물리 피해",
      rope: "에너지 회복 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "HP"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: [
      { name: "이와 같이 타오르는 여명", note: "1순위" },
      { name: "해 질 무렵 시작되는 춤", note: "2순위" },
      "대체할 수 없는 것",
      "닿을 수 없는 저편",
      "어떤 에이언즈의 몰락"
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-5.2 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-5.2 SP)" },
      { level: 2, impact: "Medium", efficiency1: "109.98%", efficiency3: "109.98%", description: "(-5.2 SP)" },
      { level: 3, impact: "Medium", efficiency1: "113.39%", efficiency3: "113.72%", description: "(-5.2 SP)" },
      { level: 4, impact: "Medium", efficiency1: "113.39%", efficiency3: "113.72%", description: "(-5.2 SP)" },
      { level: 5, impact: "High", efficiency1: "120.44%", efficiency3: "120.52%", description: "(-5.2 SP)" },
      { level: 6, impact: "High", efficiency1: "135.92%", efficiency3: "145.25%", description: "(-5.2 SP)" }
    ]
  },
  {
    characterName: "키레네",
    lastUpdated: "2026-03-12",
    patchVersion: "3.7",
    variants: [
      {
        name: "속도 200 세팅",
        bestRelics: [
          { name: "가상공간을 누비는 메신저", note: "2세트" },
          { name: "고행의 길에 다시 오른 사제", note: "2세트" },
          { name: "태양과 번개의 여전사", note: "2세트" },
          { name: "천명에 응해 먼 길을 떠난 점술가", note: "2세트" }
        ],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "HP or 치명타 피해 or 치명타 확률",
          boots: "속도",
          sphere: "HP or 얼음 피해",
          rope: "HP"
        },
        subStats: ["치명타 확률", "속도", "HP", "치명타 피해"],
        targetStats: [
          { label: "HP", value: "5000 이상" },
          { label: "속도", value: "200 이상" },
          { label: "치명타 확률", value: "50%" }
        ]
      },
      {
        name: "속도 180 세팅",
        bestRelics: ["천지를 재창조한 구세주"],
        bestOrnaments: ["영원의 땅 앰포리어스"],
        mainStats: {
          body: "HP or 치명타 피해 or 치명타 확률",
          boots: "속도",
          sphere: "HP or 얼음 피해",
          rope: "HP"
        },
        subStats: ["치명타 확률", "속도", "HP", "치명타 피해"],
        targetStats: [
          { label: "HP", value: "5000 이상" },
          { label: "속도", value: "180 이상" },
          { label: "치명타 확률", value: "50%" }
        ]
      }
    ],
    bestRelics: [
      { name: "가상공간을 누비는 메신저", note: "2세트" },
      { name: "고행의 길에 다시 오른 사제", note: "2세트" },
      { name: "태양과 번개의 여전사", note: "2세트" },
      { name: "천명에 응해 먼 길을 떠난 점술가", note: "2세트" },
      "천지를 재창조한 구세주"
    ],
    bestOrnaments: ["생명의 바커 공", "영원의 땅 앰포리어스"],
    mainStats: {
      body: "HP or 치명타 피해 or 치명타 확률",
      boots: "속도",
      sphere: "HP or 얼음 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "속도", "HP", "치명타 피해"],
    targetStats: [
      { label: "HP", value: "5000 이상" },
      { label: "속도", value: "180 / 200 이상" },
      { label: "치명타 확률", value: "50%" }
    ],
    bestLightCones: [
      { name: "이 순간처럼 영원한 사랑", note: "1순위" },
      { name: "기억은 영원히 막을 내리지 않는다", note: "2순위" },
      "찰나에 결정되는 승리"
    ],
    skillPriority: ["기억 정령 스킬", "전투 스킬", "특성", "필살기", "기억 정령 특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 2, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 6, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" }
    ]
  },
  {
    characterName: "단항",
    lastUpdated: "2026-03-13",
    patchVersion: "3.0",
    bestRelics: [
      { name: "사수에 잠수한 선구자", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" },
      { name: "밤낮의 경계를 나는 매", note: "3순위" }
    ],
    bestOrnaments: [
      "뭇별 경기장",
      { name: "창공 전선 그라모스", note: "속도 135 기준" },
      "우주 봉인 정거장",
      "회전을 멈춘 살소토"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "치명타 확률", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "120%" },
      { label: "공격력", value: "2500" },
      { label: "참고", value: "기본 속도 135 기준" }
    ],
    bestLightCones: [
      { name: "야경 속에서", note: "1순위" },
      { name: "논검", note: "2순위" },
      "침묵만이",
      "별바다 순항"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "(-14 SP)" },
      { level: 1, impact: "Low", efficiency1: "104.12%", efficiency3: "-", description: "(-14 SP)" },
      { level: 2, impact: "Medium", efficiency1: "110.84%", efficiency3: "-", description: "(-14 SP)" },
      { level: 3, impact: "Medium", efficiency1: "117.35%", efficiency3: "-", description: "(-14 SP)" },
      { level: 4, impact: "Medium", efficiency1: "117.35%", efficiency3: "-", description: "(-14 SP)" },
      { level: 5, impact: "High", efficiency1: "123.32%", efficiency3: "-", description: "(-14 SP)" },
      { level: 6, impact: "High", efficiency1: "123.32%", efficiency3: "-", description: "(-14 SP)" }
    ]
  },
  {
    characterName: "단항•음월",
    lastUpdated: "2026-03-13",
    patchVersion: "4.0",
    bestRelics: [
      { name: "망국을 애도하는 시인", note: "1순위" },
      { name: "황무지의 도적, 황야인", note: "2순위" },
      { name: "들이삭과 동행하는 거너", note: "3순위" }
    ],
    bestOrnaments: [
      "뭇별 경기장",
      "텐고쿠@라이브스트리밍",
      { name: "창공 전선 그라모스", note: "속도 135 기준" }
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "공격력 or 속도",
      sphere: "허수 피해 or 공격력",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "200%" },
      { label: "공격력", value: "3200 이상" }
    ],
    bestLightCones: [
      { name: "이와 같이 타오르는 여명", note: "1순위" },
      { name: "태양보다 밝게 빛나는 것", note: "2순위" },
      "대체할 수 없는 것",
      "어떤 에이언즈의 몰락"
    ],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-13 SP)" },
      { level: 1, impact: "Medium", efficiency1: "112.92%", efficiency3: "114.47%", description: "(-13 SP)" },
      { level: 2, impact: "High", efficiency1: "169.38%", efficiency3: "171.71%", description: "(-17 SP)" },
      { level: 3, impact: "Medium", efficiency1: "184.67%", efficiency3: "187.31%", description: "(-17 SP)" },
      { level: 4, impact: "Medium", efficiency1: "201.18%", efficiency3: "200.77%", description: "(-17 SP)" },
      { level: 5, impact: "Medium", efficiency1: "208.76%", efficiency3: "209.05%", description: "(-17 SP)" },
      { level: 6, impact: "High", efficiency1: "243.29%", efficiency3: "243.22%", description: "(-17 SP)" }
    ]
  },
  {
    characterName: "단항•등황",
    lastUpdated: "2026-03-13",
    patchVersion: "3.6",
    variants: [
      {
        name: "기본",
        bestRelics: [
          { name: "별빛에 숨은 은둔자", note: "1순위" },
          { name: "고행의 길에 다시 오른 사제", note: "2순위" }
        ],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도 or 공격력",
          sphere: "공격력",
          rope: "에너지 충전 효율 or 공격력"
        },
        subStats: ["속도", "공격력"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "참고", value: "파이논 파티 신발/매듭 공격력 권장" }
        ]
      },
      {
        name: "지속 피해 세팅",
        bestRelics: [
          { name: "별빛에 숨은 은둔자", note: "1순위" },
          { name: "고행의 길에 다시 오른 사제", note: "2순위" }
        ],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "공격력"],
        targetStats: [
          { label: "효과 명중", value: "75%" },
          { label: "속도", value: "134 이상" }
        ]
      }
    ],
    bestRelics: [
      { name: "별빛에 숨은 은둔자", note: "1순위" },
      { name: "고행의 길에 다시 오른 사제", note: "2순위" }
    ],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도 or 공격력",
      sphere: "공격력",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: [
      { name: "끝없는 산과 강을 거치더라도", note: "1순위" },
      { name: "언제나 여정이 평탄하기를", note: "2순위" },
      { name: "우주 시장 동향", note: "아케론 파티 사용 시" }
    ],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 2, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 6, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" }
    ]
  },
  {
    characterName: "계네빈",
    lastUpdated: "2026-03-14",
    patchVersion: "3.4",
    bestRelics: [
      { name: "깊은 감옥에 수감된 죄수", note: "1순위" },
      { name: "용암 단조의 화장(火匠)", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "겁화 연등의 연마궁", note: "1순위" },
      { name: "바다에 잠긴 루샤카", note: "2순위" }
    ],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "화염 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["속도", "공격력", "효과 명중"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "속도", value: "134 / 143 이상" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: [
      { name: "바람에 흩날리는 거짓말", note: "1순위" },
      { name: "그 무수한 봄날", note: "2순위" },
      { name: "시간의 기억에 대한 재구성", note: "3순위" },
      "땀방울처럼 빛나는 결심",
      "사냥감의 시선"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "115.05%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "122.56%", efficiency3: "124.52%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "122.56%", efficiency3: "130.96%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "125.42%", efficiency3: "133.53%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "133.19%", efficiency3: "141.79%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "한아",
    lastUpdated: "2026-03-14",
    patchVersion: "3.0",
    bestRelics: [
      { name: "가상공간을 누비는 메신저", note: "1순위" },
      { name: "고행의 길에 다시 오른 사제", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "부러진 용골", note: "1순위" },
      { name: "바다에 잠긴 루샤카", note: "2순위" },
      { name: "생명의 바커 공", note: "선턴 행동 필요 시" }
    ],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "효과 저항", "HP"],
    targetStats: [
      { label: "속도", value: "165 / 175 이상" }
    ],
    bestLightCones: [
      { name: "댄스! 댄스! 댄스!", note: "1순위" },
      { name: "맞물린 톱니", note: "2순위" },
      { name: "아직 전투는 끝나지 않았다", note: "3순위" },
      { name: "행성과의 만남", note: "물리 파티 사용 시" }
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "헤르타",
    lastUpdated: "2026-03-14",
    patchVersion: "4.0",
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" },
      "혹한 밀림의 사냥꾼"
    ],
    bestOrnaments: [
      { name: "주인 없는 황폐한 별 츠가냐", note: "1순위" },
      { name: "질주하는 늑대의 도람 왕조", note: "2순위" },
      "회전을 멈춘 살소토",
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "85%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "2500" }
    ],
    bestLightCones: [
      { name: "동트기 전", note: "1순위" },
      { name: "은하철도의 밤", note: "2순위" },
      { name: "천재들의 휴식", note: "3순위" },
      "멈추지 않는 연산"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "111.40%", efficiency3: "111.38%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "117.22%", efficiency3: "115.97%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "117.22%", efficiency3: "117.87%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "122.26%", efficiency3: "123.07%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "128.76%", efficiency3: "129.03%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "히메코",
    lastUpdated: "2026-03-14",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본",
        bestRelics: [{ name: "재와 뼈마저 불사르는 대공", note: "1순위" }],
        bestOrnaments: [
          { name: "주인 없는 황폐한 별 츠가냐", note: "1순위" },
          { name: "질주하는 늑대의 도람 왕조", note: "2순위" },
          "회전을 멈춘 살소토"
        ],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "공격력 or 속도",
          sphere: "화염 피해",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력"],
        targetStats: [
          { label: "치명타 확률", value: "85%" },
          { label: "치명타 피해", value: "140%" },
          { label: "공격력", value: "2800" }
        ]
      },
      {
        name: "슈퍼 격파",
        bestRelics: [{ name: "곤충 재앙을 잠재우는 철기군", note: "슈퍼 격파 세팅" }],
        bestOrnaments: [{ name: "겁화 연등의 연마궁", note: "슈퍼 격파 세팅 1순위" }],
        mainStats: {
          body: "부 옵션 좋은 것",
          boots: "속도 or 공격력",
          sphere: "부 옵션 좋은 것",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "격파 특수효과", value: "250% 이상" },
          { label: "공격력", value: "2500 이상" }
        ]
      }
    ],
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      { name: "곤충 재앙을 잠재우는 철기군", note: "슈퍼 격파 세팅" }
    ],
    bestOrnaments: [
      { name: "주인 없는 황폐한 별 츠가냐", note: "1순위" },
      { name: "질주하는 늑대의 도람 왕조", note: "2순위" },
      "회전을 멈춘 살소토",
      { name: "겁화 연등의 연마궁", note: "슈퍼 격파 세팅 1순위" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "화염 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "85%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "2800" }
    ],
    bestLightCones: [
      { name: "동트기 전", note: "1순위" },
      { name: "은하철도의 밤", note: "2순위" },
      { name: "천재들의 휴식", note: "3순위" },
      "멈추지 않는 연산"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "108.77%", efficiency3: "113.77%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "113.24%", efficiency3: "118.37%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "119.51%", efficiency3: "122.35%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "119.51%", efficiency3: "122.35%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "123.71%", efficiency3: "129.31%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "143.89%", efficiency3: "136.44%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "후크",
    lastUpdated: "2026-03-14",
    patchVersion: "3.0",
    bestRelics: [
      { name: "사수에 잠수한 선구자", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" },
      "용암 단조의 화장(火匠)"
    ],
    bestOrnaments: [
      { name: "창공 전선 그라모스", note: "1순위" },
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "화염 피해",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: [
      { name: "어떤 에이언즈의 몰락", note: "1순위" },
      { name: "대체할 수 없는 것", note: "2순위" },
      "과거의 핏자국",
      "두더지파가 환영해"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "102.09%", efficiency3: "102.96%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.09%", efficiency3: "102.96%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "108.09%", efficiency3: "109.46%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "108.09%", efficiency3: "120.48%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "111.86%", efficiency3: "123.88%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "124.55%", efficiency3: "137.86%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "부현",
    lastUpdated: "2026-03-14",
    patchVersion: "3.4",
    bestRelics: [
      "태양과 번개의 여전사",
      { name: "장수를 원하는 제자", note: "2세트" },
      { name: "가상공간을 누비는 메신저", note: "2세트" },
      { name: "고행의 길에 다시 오른 사제", note: "2세트" },
      { name: "눈보라에 맞서는 철위대", note: "2세트" }
    ],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "꿈의 땅 페나코니", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "HP", value: "8000" }
    ],
    bestLightCones: [
      { name: "그녀는 두 눈을 감았네", note: "1순위" },
      { name: "승리의 순간", note: "2순위" },
      { name: "기억의 소재", note: "3순위" },
      "여생의 첫날",
      { name: "랜도의 선택", note: "어그로 필요 시" },
      { name: "우주 시장 동향", note: "아케론 파티 사용 시" }
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "갤러거",
    lastUpdated: "2026-03-14",
    patchVersion: "3.4",
    bestRelics: [
      "태양과 번개의 여전사",
      { name: "곤충 재앙을 잠재우는 철기군", note: "슈퍼 격파 파티 시" },
      { name: "유성을 쫓는 괴도", note: "슈퍼 격파 파티 시" }
    ],
    bestOrnaments: [
      { name: "겁화 연등의 연마궁", note: "1순위" },
      { name: "도적국 탈리아", note: "2순위" }
    ],
    mainStats: {
      body: "치유량 증가",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "HP"],
    targetStats: [
      { label: "격파 특수효과", value: "150% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "오직 향만이 변함없이", note: "1순위" },
      { name: "등가교환", note: "전부 에너지 충전 필요 시" },
      { name: "수술 후의 대화", note: "3순위" },
      "무엇이 진실인가",
      "내일의 내일이 올 때까지"
    ],
    skillPriority: ["특성", "전투 스킬", "일반 공격", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "100.43%", efficiency3: "100.33%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "104.01%", efficiency3: "103.88%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "105.17%", efficiency3: "105.20%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "132.13%", efficiency3: "132.02%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "게파드",
    lastUpdated: "2026-03-14",
    patchVersion: "3.6",
    bestRelics: [
      { name: "별빛에 숨은 은둔자", note: "1순위" },
      { name: "정토 교황의 팔라딘", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "부러진 용골", note: "1순위" },
      "불로인의 선주",
      "바다에 잠긴 루샤카"
    ],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도 or 방어력",
      sphere: "방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["방어력", "효과 저항", "효과 명중", "속도"],
    targetStats: [
      { label: "방어력", value: "3000 이상" },
      { label: "효과 저항", value: "70%" }
    ],
    bestLightCones: [
      { name: "언제나 여정이 평탄하기를", note: "1순위" },
      { name: "승리의 순간", note: "2순위" },
      { name: "여생의 첫날", note: "3순위" },
      { name: "랜도의 선택", note: "어그로 필요 시" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "비소",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "바람과 구름을 가르는 용맹함", note: "1순위" },
      { name: "재와 뼈마저 불사르는 대공", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      { name: "이즈모 현세와 타카마 신국", note: "2순위" },
      "회전을 멈춘 살소토"
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "속도 or 공격력",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "치명타 확률", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150% ~ 160%" },
      { label: "공격력", value: "2500 ~ 3000" }
    ],
    bestLightCones: [
      { name: "정복하고 사냥하리", note: "1순위" },
      { name: "순수 사유의 세례", note: "2순위" },
      { name: "고민, 그리고 행복", note: "3순위" },
      "논검",
      "별바다 순항"
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "125.80%", efficiency3: "125.80%", description: "성흔 효과" },
      { level: 2, impact: "High", efficiency1: "170.65%", efficiency3: "170.65%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "182.83%", efficiency3: "182.83%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.80%", efficiency3: "190.80%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "198.76%", efficiency3: "198.76%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "274.01%", efficiency3: "274.01%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "곽향",
    lastUpdated: "2026-03-15",
    patchVersion: "3.4",
    bestRelics: ["태양과 번개의 여전사", "흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골", "사색하는 거목", "불로인의 선주"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "속도", value: "135 이상" },
      { label: "HP", value: "6000 이상" },
      { label: "효과 저항", value: "50% 이상" }
    ],
    bestLightCones: ["섬뜩한 밤", "수술 후의 대화", "같은 심정", { name: "알맞은 타이밍", note: "효과 저항 세팅 시" }, "내일의 내일이 올 때까지", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "히아킨",
    lastUpdated: "2026-03-15",
    patchVersion: "3.4",
    bestRelics: ["태양과 번개의 여전사", "천지를 재창조한 구세주"],
    bestOrnaments: ["사색하는 거목", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "200 이상" },
      { label: "HP", value: "5000 이상" }
    ],
    bestLightCones: ["무지개가 영원히 하늘에 머물길", "기억은 영원히 막을 내리지 않는다", "이야기의 다음 페이지"],
    skillPriority: ["특성", "기억 정령 스킬", "필살기", "기억 정령 특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "히실렌스",
    lastUpdated: "2026-03-15",
    patchVersion: "3.5",
    bestRelics: ["깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사", "우주 봉인 정거장"],
    mainStats: {
      body: "효과 명중",
      boots: "속도 or 공격력",
      sphere: "물리 피해 or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "효과 명중", value: "120% 이상" },
      { label: "속도", value: "134 or 168 이상" },
      { label: "공격력", value: "2400 이상" }
    ],
    bestLightCones: ["바다는 왜 노래하는가", "시간의 기억에 대한 재구성", "그 무수한 봄날", "사냥감의 시선", "밤 인사와 잠든 얼굴"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonVariants: [
      {
        name: "광추별 효율",
        labels: ["바다는 왜 노래하는가", "사냥감의 시선"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "126%", efficiency3: "126%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "209%", efficiency3: "215%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "209%", efficiency3: "215%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "228%", efficiency3: "234%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "273%", efficiency3: "281%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "284%", efficiency3: "291%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "369%", efficiency3: "380%", description: "성흔 효과" }
        ]
      },
      {
        name: "사냥감의 시선 기준",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "167%", efficiency3: "172%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "167%", efficiency3: "172%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "182%", efficiency3: "188%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "218%", efficiency3: "225%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "227%", efficiency3: "234%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "295%", efficiency3: "305%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: []
  },
  {
    characterName: "제이드",
    lastUpdated: "2026-03-15",
    patchVersion: "3.0",
    bestRelics: ["망국을 애도하는 시인", "별처럼 빛나는 천재", "재와 뼈마저 불사르는 대공", "바람과 구름을 가르는 용맹함", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국", "주인 없는 황폐한 별 츠가냐", "질주하는 늑대의 도람 왕조", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률",
      boots: "공격력",
      sphere: "양자 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "3500" }
    ],
    bestLightCones: ["값을 매길 수 없는 건 희망뿐", "동트기 전", "오늘도 평화로운 하루", "은하철도의 밤", "천재들의 휴식"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "147.31%", efficiency3: "107.31%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "163.42%", efficiency3: "119.04%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "176.93%", efficiency3: "129.88%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.63%", efficiency3: "139.94%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "198.60%", efficiency3: "144.66%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "271.89%", efficiency3: "199.00%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "초구",
    lastUpdated: "2026-03-15",
    patchVersion: "3.3",
    variants: [
      {
        name: "디버퍼 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "HP or 화염 피해",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "143 or 167" },
          { label: "효과 명중", value: "178%" }
        ]
      },
      {
        name: "지속 피해 세팅",
        bestRelics: ["깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["즐거움에 취한 바다의 일각"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "화염 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "공격력"],
        targetStats: [
          { label: "속도", value: "143 or 167" },
          { label: "효과 명중", value: "178%" },
          { label: "참고", value: "초구 2돌 이상 추천" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "HP or 화염 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "효과 명중"],
    targetStats: [
      { label: "속도", value: "143 or 167" },
      { label: "효과 명중", value: "178%" }
    ],
    bestLightCones: ["그 무수한 봄날", "바람에 흩날리는 거짓말", "사냥감의 시선", "두더지파가 환영해"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "경원",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["재와 뼈마저 불사르는 대공", "바람과 구름을 가르는 용맹함", "거친 파도를 헤치는 선장"],
    bestOrnaments: ["기묘한 나나 낙원", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "2500" }
    ],
    bestLightCones: ["동트기 전", "밀 내음이 가득한 꿈", "오늘도 평화로운 하루"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "114.74%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.53%", efficiency3: "119.02%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "103.28%", efficiency3: "120.30%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "103.28%", efficiency3: "120.30%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "111.84%", efficiency3: "129.33%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "136.49%", efficiency3: "153.48%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "경류",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["지식의 바다에 빠진 학자", "혹한 밀림의 사냥꾼"],
    bestOrnaments: ["고요한 습골지", "뭇별 경기장"],
    mainStats: {
      body: "HP",
      boots: "HP or 속도",
      sphere: "HP or 얼음 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "7000 이상" },
      { label: "치명타 확률", value: "50% 미만" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["피의 불꽃이여, 앞길을 태워라", "이 몸이 검이니", "과거의 핏자국", "비밀 맹세", "인사록•음률 사냥"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "137% / 100%", efficiency3: "141% / 100%", description: "기본 성능 (AS 후 / 전)" },
      { level: 1, impact: "Medium", efficiency1: "217% / 142%", efficiency3: "192% / 107%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "232% / 155%", efficiency3: "205% / 116%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "248% / 163%", efficiency3: "217% / 123%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "294% / 173%", efficiency3: "257% / 131%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "308% / 183%", efficiency3: "273% / 141%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "423% / 197%", efficiency3: "378% / 153%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "카프카",
    lastUpdated: "2026-03-15",
    patchVersion: "3.5",
    variants: [
      {
        name: "기본",
        bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
        mainStats: {
          body: "공격력 or 효과 명중",
          boots: "속도",
          sphere: "번개 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["효과 명중", "속도", "공격력"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "효과 명중", value: "75%" }
        ]
      },
      {
        name: "4돌파 이상",
        bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
        mainStats: {
          body: "공격력 or 효과 명중",
          boots: "속도",
          sphere: "번개 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "167 이상" },
          { label: "효과 명중", value: "75%" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
    mainStats: {
      body: "공격력 or 효과 명중",
      boots: "속도",
      sphere: "번개 피해 or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "효과 명중", value: "75%" }
    ],
    bestLightCones: ["초보자 임무 시작 전", "필요한 건 기다림 뿐", "바람에 흩날리는 거짓말", "그 무수한 봄날", "땀방울처럼 빛나는 결심"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "영사",
    lastUpdated: "2026-03-15",
    patchVersion: "3.6",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["곤충 재앙을 잠재우는 철기군", "태양과 번개의 여전사"],
        bestOrnaments: ["겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치유량 증가 or 공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율 or 격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "공격력"],
        targetStats: [
          { label: "속도", value: "139 이상" },
          { label: "격파 특수효과", value: "130% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도 or HP",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "HP", "효과 저항", "방어력"],
        targetStats: [
          { label: "속도", value: "160 이상" }
        ]
      }
    ],
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "밤낮의 경계를 나는 매", "태양과 번개의 여전사"],
    bestOrnaments: ["겁화 연등의 연마궁", "생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or 공격력",
      boots: "속도",
      sphere: "공격력 or HP",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "공격력"],
    targetStats: [
      { label: "속도", value: "139 이상" },
      { label: "격파 특수효과", value: "130% 이상" }
    ],
    bestLightCones: ["오직 향만이 변함없이", { name: "등가교환", note: "전부 에너지 충전 필요 시" }, "수술 후의 대화", "무엇이 진실인가", { name: "관의 울림", note: "고속 세팅 1순위" }],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "루카",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "유성을 쫓는 괴도"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "도적국 탈리아"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "효과 명중", value: "67%" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "필요한 건 기다림 뿐", note: "1순위" },
      { name: "밤 인사와 잠든 얼굴", note: "2순위" },
      { name: "그 무수한 봄날", note: "3순위" },
      "땀방울처럼 빛나는 결심"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "106.73%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "117.81%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "127.56%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "135.99%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "140.28%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "151.62%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "나찰",
    lastUpdated: "2026-03-15",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["가상공간을 누비는 메신저", "들이삭과 동행하는 거너", "흔적을 남기지 않은 과객"],
        bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "공격력", value: "3000 이상" },
          { label: "HP", value: "5000 이상" },
          { label: "효과 저항", value: "30% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["태양과 번개의 여전사"],
        bestOrnaments: ["사색하는 거목"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "공격력", value: "3000 이상" },
          { label: "HP", value: "5000 이상" },
          { label: "효과 저항", value: "30% 이상" }
        ]
      }
    ],
    bestRelics: ["태양과 번개의 여전사", "가상공간을 누비는 메신저", "들이삭과 동행하는 거너", "흔적을 남기지 않은 과객"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카", "사색하는 거목"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["공격력", "속도", "효과 저항", "HP"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "HP", value: "5000 이상" },
      { label: "효과 저항", value: "30% 이상" }
    ],
    bestLightCones: ["관의 울림", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }, "수술 후의 대화", "내일의 내일이 올 때까지"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "링스",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["가상공간을 누비는 메신저", "흔적을 남기지 않은 과객"],
        bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "사색하는 거목"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["HP", "속도", "효과 저항", "방어력"],
        targetStats: [
          { label: "HP", value: "5000 이상" },
          { label: "효과 저항", value: "70% 이상" }
        ]
      },
      {
        name: "양자 파티 세팅",
        bestRelics: ["태양과 번개의 여전사"],
        bestOrnaments: ["꿈의 땅 페나코니"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "공격력", value: "3000 이상" },
          { label: "HP", value: "5000 이상" },
          { label: "효과 저항", value: "30% 이상" }
        ]
      }
    ],
    bestRelics: ["태양과 번개의 여전사", "가상공간을 누비는 메신저", "흔적을 남기지 않은 과객"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "사색하는 거목", "꿈의 땅 페나코니"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도",
      sphere: "HP or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "HP", value: "5000 이상" }
    ],
    bestLightCones: ["섬뜩한 밤", "세월은 흐를 뿐", "수술 후의 대화", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "Mar. 7th",
    lastUpdated: "2026-03-15",
    patchVersion: "3.6",
    bestRelics: ["별빛에 숨은 은둔자", "정토 교황의 팔라딘"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카", "축성가의 벨로보그"],
    mainStats: {
      body: "효과 명중 or 방어력",
      boots: "속도",
      sphere: "방어력",
      rope: "방어력 or 에너지 충전 효율"
    },
    subStats: ["방어력", "효과 명중", "효과 저항", "속도"],
    targetStats: [
      { label: "방어력", value: "2500 이상" },
      { label: "효과 저항", value: "70%" }
    ],
    bestLightCones: ["언제나 불공평한 운명", "언제나 여정이 평탄하기를", "여생의 첫날", "기억의 소재"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "에버나이트",
    lastUpdated: "2026-03-15",
    patchVersion: "3.6",
    bestRelics: ["천지를 재창조한 구세주"],
    bestOrnaments: ["고요한 습골지"],
    mainStats: {
      body: "치명타 피해 or HP",
      boots: "속도 or HP",
      sphere: "HP or 얼음 피해",
      rope: "에너지 충전 효율 or HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP"],
    targetStats: [
      { label: "HP", value: "5000 이상", note: "2돌파 시 7000 이상" },
      { label: "속도", value: "120 이상" },
      { label: "치명타 확률", value: "65%" }
    ],
    bestLightCones: ["긴 밤의 별빛에게", "이별이 더 아름답도록", "땀은 많이, 눈물은 적게", "이야기의 다음 페이지"],
    skillPriority: ["필살기", "기억 정령 스킬", "전투 스킬", "특성", "기억 정령 특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "124% / 100%", efficiency3: "124% / 100%", description: "기본 성능 (별빛 / 땀)" },
      { level: 1, impact: "Low", efficiency1: "186% / 150%", efficiency3: "155% / 125%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "356% / 287%", efficiency3: "288% / 232%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "365% / 294%", efficiency3: "295% / 237%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "365% / 294%", efficiency3: "295% / 237%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "424% / 342%", efficiency3: "343% / 276%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "659% / 531%", efficiency3: "529% / 427%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "Mar. 7th (수렵)",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["들이삭과 동행하는 거너"],
    bestOrnaments: ["뭇별 경기장", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "허수 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "120%" },
      { label: "공격력", value: "2400" }
    ],
    bestLightCones: ["야경 속에서", "논검", "고민, 그리고 행복", "별바다 순항"],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "102.45%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "105.36%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "114.91%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "미샤",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["지식의 바다에 빠진 학자", "혹한 밀림의 사냥꾼"],
    bestOrnaments: ["창공 전선 그라모스", "뭇별 경기장", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "얼음 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "2800 이상" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "어떤 에이언즈의 몰락", "마음에 새긴 약속"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-12 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "104.86%", efficiency3: "110.41%", description: "(-12 SP) 성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "114.68%", efficiency3: "120.74%", description: "(-12 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "119.64%", efficiency3: "124.91%", description: "(-12 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "125.49%", efficiency3: "129.85%", description: "(-12 SP) 성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "130.98%", efficiency3: "136.90%", description: "(-12 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "142.19%", efficiency3: "146.35%", description: "(-12 SP) 성흔 효과" }
    ]
  },
  {
    characterName: "맥택",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["사수에 잠수한 선구자", "재와 뼈마저 불사르는 대공"],
    bestOrnaments: ["질주하는 늑대의 도람 왕조", "이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "130%" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["고민, 그리고 행복", "순수 사유의 세례", "논검", "별바다 순항"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "106.95%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "120.01%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "130.45%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "153.80%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "155.18%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "167.21%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "마이데이",
    lastUpdated: "2026-03-16",
    patchVersion: "3.1",
    bestRelics: ["지식의 바다에 빠진 학자", "장수를 원하는 제자"],
    bestOrnaments: ["고요한 습골지", "뭇별 경기장"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "허수 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "8000 이상" },
      { label: "치명타 확률", value: "52% 이하" }
    ],
    bestLightCones: ["피의 불꽃이여, 앞길을 태워라", "닿을 수 없는 저편", "비밀 맹세", "인사록•음률 사냥"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonVariants: [
      {
        name: "피의 불꽃이여, 앞길을 태워라",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "138%", efficiency3: "138%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "145%", efficiency3: "173%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "171%", efficiency3: "205%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "185%", efficiency3: "222%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "216%", efficiency3: "260%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "218%", efficiency3: "261%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "278%", efficiency3: "348%", description: "성흔 효과" }
        ]
      },
      {
        name: "인사록•음률 사냥",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "105%", efficiency3: "125%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "124%", efficiency3: "148%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "134%", efficiency3: "161%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "156%", efficiency3: "188%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "158%", efficiency3: "189%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "200%", efficiency3: "250%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "105%", efficiency3: "125%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "124%", efficiency3: "148%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "134%", efficiency3: "161%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "156%", efficiency3: "188%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "158%", efficiency3: "189%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "200%", efficiency3: "250%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "나타샤",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["태양과 번개의 여전사", "가상공간을 누비는 메신저", "흔적을 남기지 않은 과객"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "사색하는 거목"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "속도", value: "135 이상" },
      { label: "HP", value: "5000 이상" },
      { label: "효과 저항", value: "70% 이상" }
    ],
    bestLightCones: ["섬뜩한 밤", "세월은 흐를 뿐", "수술 후의 대화", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "페라",
    lastUpdated: "2026-03-16",
    patchVersion: "3.3",
    bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카", "생명의 바커 공"],
    mainStats: {
      body: "HP or 효과 명중 or 방어력",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: ["바람에 흩날리는 거짓말", "땀방울처럼 빛나는 결심", "초보자 임무 시작 전"],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  },
  {
    characterName: "파이논 (물리)",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["꿈을 엮는 요정의 낙원", "뭇별 경기장"],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "공격력",
      sphere: "물리 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "치명타 확률", value: "100%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "어떤 에이언즈의 몰락", "대체할 수 없는 것", "과거의 핏자국"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonVariants: [
      {
        name: "이와 같이 타오르는 여명",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "145%", efficiency3: "144%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "184%", efficiency3: "182%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "292%", efficiency3: "370%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "303%", efficiency3: "373%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "303%", efficiency3: "417%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "324%", efficiency3: "468%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "395%", efficiency3: "561%", description: "성흔 효과" }
        ]
      },
      {
        name: "어떤 에이언즈의 몰락",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "127%", efficiency3: "127%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "199%", efficiency3: "254%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "207%", efficiency3: "256%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "207%", efficiency3: "285%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "219%", efficiency3: "319%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "274%", efficiency3: "382%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "127%", efficiency3: "127%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "199%", efficiency3: "254%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "207%", efficiency3: "256%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "207%", efficiency3: "285%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "219%", efficiency3: "319%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "274%", efficiency3: "382%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "청작",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["망국을 애도하는 시인", "별처럼 빛나는 천재", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["뭇별 경기장", "텐고쿠@라이브스트리밍", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "속도 or 공격력 (시인 세트 채용 시 공격력)",
      sphere: "양자 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["값을 매길 수 없는 건 희망뿐", "은하철도의 밤", "멈추지 않는 연산", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.34%", efficiency3: "100.53%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "104.01%", efficiency3: "106.17%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "107.38%", efficiency3: "110.21%", description: "스킬 레벨 상승" },
      { level: 4, impact: "High", efficiency1: "143.52%", efficiency3: "144.18%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "159.38%", efficiency3: "159.28%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "159.38%", efficiency3: "159.28%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "로빈",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["들이삭과 동행하는 거너"],
    bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "공격력 or 속도",
      sphere: "공격력 or 물리 피해 (6돌파 이상 시 물리 피해)",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["공격력", "속도", "방어력", "HP"],
    targetStats: [
      { label: "공격력", value: "4500 이상" },
      { label: "속도", value: "117 이상" }
    ],
    bestLightCones: ["찬란하게 빛나는 밤", "아직 전투는 끝나지 않았다", "내일을 위한 여정"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "High", efficiency1: "124.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "High", efficiency1: "124.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "139.81%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "139.81%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "139.81%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "240.48%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "완•매",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["꿈을 조작하는 시계공", "가상공간을 누비는 메신저", "유성을 쫓는 괴도"],
    bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "방어력 or 속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["격파 특수효과", "효과 저항", "HP"],
    targetStats: [
      { label: "속도", value: "120 or 134" },
      { label: "격파 특수효과", value: "180%" }
    ],
    bestLightCones: ["거울 속 지난날의 나", "바람을 쫓을 때", "기억 속 모습", "댄스! 댄스! 댄스!"],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "파이논 (바람)",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스", "우주 봉인 정거장", "뭇별 경기장"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "바람 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 미만" },
      { label: "속도", value: "134 이상" },
      { label: "공격력", value: "2600" }
    ],
    bestLightCones: ["보답 없는 왕관", "어떤 에이언즈의 몰락", "과거의 핏자국"],
    skillPriority: ["필살기", "전투 스킬", "일반 공격", "특성"],
    recommendedEidolon: "E2 / E6",
    eidolonVariants: [
      {
        name: "보답 없는 왕관",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "116%", efficiency3: "116%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "136%", efficiency3: "136%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "155%", efficiency3: "161%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "166%", efficiency3: "171%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "190%", efficiency3: "195%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "198%", efficiency3: "205%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "266%", efficiency3: "265%", description: "성흔 효과" }
        ]
      },
      {
        name: "어떤 에이언즈의 몰락",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "116%", efficiency3: "118%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "132%", efficiency3: "140%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "145%", efficiency3: "149%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "165%", efficiency3: "169%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "172%", efficiency3: "178%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "233%", efficiency3: "231%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "116%", efficiency3: "118%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "132%", efficiency3: "140%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "145%", efficiency3: "149%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "165%", efficiency3: "169%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "172%", efficiency3: "178%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "233%", efficiency3: "231%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "삼포",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "밤낮의 경계를 나는 매"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사", "우주 봉인 정거장"],
    mainStats: {
      body: "공격력 or 효과 명중",
      boots: "속도",
      sphere: "바람 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["바람에 흩날리는 거짓말", "밤 인사와 잠든 얼굴", "사냥감의 시선", "땀방울처럼 빛나는 결심"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "113.08%", efficiency3: "110.20%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "113.08%", efficiency3: "110.20%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "118.76%", efficiency3: "112.88%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "140.88%", efficiency3: "123.33%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "149.42%", efficiency3: "133.20%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "170.92%", efficiency3: "157.58%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "제레",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "전용 광추 세팅",
        bestRelics: ["별처럼 빛나는 천재", "거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["뭇별 경기장", "창공 전선 그라모스", "회전을 멈춘 살소토"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "공격력 or 속도 (2돌파 이상 시 공격력, 명함 속도 122 이상 시 공격력)",
          sphere: "양자 피해 or 공격력",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80%" },
          { label: "치명타 피해", value: "210%" },
          { label: "공격력", value: "3400" }
        ]
      },
      {
        name: "비 전용 광추 세팅",
        bestRelics: ["별처럼 빛나는 천재", "거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["뭇별 경기장", "창공 전선 그라모스", "회전을 멈춘 살소토"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "속도 or 공격력",
          sphere: "양자 피해 or 공격력",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80%" },
          { label: "치명타 피해", value: "140%" },
          { label: "공격력", value: "2700" }
        ]
      }
    ],
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["야경 속에서", "깊게 든 단잠", "별바다 순항", "논검"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "109.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "130.39%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "142.09%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "142.09%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "146.50%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "182.28%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "서벌",
    lastUpdated: "2026-03-16",
    patchVersion: "3.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["사수에 잠수한 선구자", "뇌전을 울리는 밴드", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["창공 전선 그라모스", "우주 봉인 정거장"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "속도 or 공격력",
          sphere: "번개 피해",
          rope: "공격력 or 에너지 충전 효율"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "70%" },
          { label: "치명타 피해", value: "140%" },
          { label: "공격력", value: "2200" }
        ]
      },
      {
        name: "더 헤르타 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["바다에 잠긴 루샤카", "겁화 연등의 연마궁"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "부 옵션 좋은 것",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "168 이상" },
          { label: "효과 명중", value: "108.4% 이상" }
        ]
      }
    ],
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["창공 전선 그라모스"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: [
      "은하철도의 밤",
      "멈추지 않는 연산",
      "천재들의 휴식",
      "동트기 전",
      { name: "영험한 열쇠", note: "더 헤르타 파티 시 1순위" }
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "114.19%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "105.48%", efficiency3: "118.85%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "105.48%", efficiency3: "118.85%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "109.48%", efficiency3: "124.76%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "127.26%", efficiency3: "145.01%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "은랑",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "고행의 길에 다시 오른 사제"],
        bestOrnaments: ["바다에 잠긴 루샤카", "생명의 바커 공"],
        mainStats: {
          body: "효과 명중 or 치명타 확률",
          boots: "속도",
          sphere: "양자 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "HP", "방어력"],
        targetStats: [
          { label: "속도", value: "167 이상" },
          { label: "효과 명중", value: "67%" }
        ]
      },
      {
        name: "2돌파 서브 딜러 세팅",
        bestRelics: ["별처럼 빛나는 천재"],
        bestOrnaments: ["창공 전선 그라모스"],
        mainStats: {
          body: "치명타 확률 or 효과 명중",
          boots: "속도",
          sphere: "양자 피해 or 공격력",
          rope: "에너지 충전 효율 or 공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "100%" },
          { label: "속도", value: "134 이상" },
          { label: "효과 명중", value: "67%" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "양자 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "효과 명중", "HP", "방어력"],
    targetStats: [
      { label: "속도", value: "167 이상" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: [
      "바람에 흩날리는 거짓말",
      "땀방울처럼 빛나는 결심",
      "휴일의 목욕탕 대모험",
      { name: "계속 내리는 비", note: "2돌파 서브 딜러 세팅 시" },
      "초보자 임무 시작 전"
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "스파클",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제", "가상공간을 누비는 메신저"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "치명타 피해", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "167 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "치명타 피해", value: "200% 이상" }
    ],
    bestLightCones: [
      "대지로 돌아온 비행",
      "속세에서의 유희",
      { name: "댄스! 댄스! 댄스!", note: "고속 세팅 시" },
      "아직 전투는 끝나지 않았다"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "스파키",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["빛나는 공훈의 마법 소녀"],
    bestOrnaments: ["텐고쿠@라이브스트리밍", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["눈부신 파키의 세상", "오늘의 행운", "슈룸 모험기"],
    skillPriority: ["환락 스킬", "특성", "일반 공격", "전투 스킬", "필살기"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "116.50%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "151.23%", efficiency3: "160.78%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "155.45%", efficiency3: "164.89%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "175.64%", efficiency3: "185.88%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "187.73%", efficiency3: "194.94%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "365.69%", efficiency3: "335.63%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "선데이",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "치명타 피해", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "168 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "치명타 피해", value: "200% 이상" }
    ],
    bestLightCones: [
      "대지로 돌아온 비행",
      "아직 전투는 끝나지 않았다",
      { name: "댄스! 댄스! 댄스!", note: "고속 세팅 시" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "소상",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["스트리트 격투왕", "유성을 쫓는 괴도"],
    bestOrnaments: ["도적국 탈리아", "창공 전선 그라모스", "우주 봉인 정거장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "120%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["두 번째 생명을 향해", "야경 속에서", "논검", "깊게 든 단잠", "별바다 순항"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "101.30%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "109.86%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "112.91%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "119.11%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "달리아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.8",
    bestRelics: [
      "곤충 재앙을 잠재우는 철기군", 
      "유성을 쫓는 괴도", 
      { name: "가상공간을 누비는 메신저", note: "2세트" },
      { name: "고행의 길에 다시 오른 사제", note: "2세트" },
      { name: "태양과 번개의 여전사", note: "2세트" },
      { name: "천명에 응해 먼 길을 떠난 점술가", note: "2세트" }
    ],
    bestOrnaments: ["겁화 연등의 연마궁", "도적국 탈리아", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "효과 명중 or HP",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["속도", "효과 명중", "격파 특수효과"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "효과 명중", value: "67%" },
      { label: "HP", value: "4000 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: ["그녀의 불꽃을 잊지 말라", "바람에 흩날리는 거짓말", "먼 길 끝의 귀로", "땀방울처럼 빛나는 결심", "휴일의 목욕탕 대모험"],
    skillPriority: ["특성", "필살기", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "팅운",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["가상공간을 누비는 메신저", "철위대 2세트 + 메신저 2세트"],
    bestOrnaments: ["바다에 잠긴 루샤카", "불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "공격력", value: "2600 이상" }
    ],
    bestLightCones: [
      "댄스! 댄스! 댄스!",
      "아직 전투는 끝나지 않았다",
      { name: "행성과의 만남", note: "번개 딜러와 사용 시" },
      "누락된 추억"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "102.50%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "107.80%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "110.20%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "118.50%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "연경",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 피해",
      boots: "공격력 or 속도",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "공격력", "속도", "치명타 확률"],
    targetStats: [
      { label: "치명타 확률", value: "20~30%" },
      { label: "치명타 피해", value: "200%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["깊게 든 단잠", "야경 속에서", "별바다 순항", "침묵만이 남을 뿐"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "102.80%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "110.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "114.20%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.60%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "유니",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["지식의 바다에 빠진 학자"],
    bestOrnaments: ["텐고쿠@라이브스트리밍", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["무지개", "은하철도의 밤", "멈추지 않는 연산"],
    skillPriority: ["환락 스킬", "특성", "일반 공격", "전투 스킬", "필살기"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "116.50%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "151.23%", efficiency3: "160.78%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "155.45%", efficiency3: "164.89%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "175.64%", efficiency3: "185.88%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "187.73%", efficiency3: "194.94%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "365.69%", efficiency3: "335.63%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "어공",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "가상공간을 누비는 메신저", note: "1순위" }],
    bestOrnaments: [{ name: "부러진 용골", note: "1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 치명타 확률",
      boots: "속도 or HP",
      sphere: "HP or 허수 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "딜러 속도의 + 1" }
    ],
    bestLightCones: [
      { name: "기억 속 모습", note: "1순위" },
      { name: "아직 전투는 끝나지 않았다", note: "2순위" },
      "맞물린 톱니"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "계산 중..." }
    ]
  },
  {
    characterName: "라파",
    lastUpdated: "2026-03-17",
    patchVersion: "3.8",
    bestRelics: ["곤충 재앙을 잠재우는 철기군"],
    bestOrnaments: ["겁화 연등의 연마궁"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "공격력", value: "3200 이상" }
    ],
    bestLightCones: ["인법첩·현란한 파마", "인내심만 있으면 돼", "밤의 인사와 잠든 얼굴"],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-14 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "104.12%", efficiency3: "-", description: "(-14 SP) 성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "110.84%", efficiency3: "-", description: "(-14 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "117.35%", efficiency3: "-", description: "(-14 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "117.35%", efficiency3: "-", description: "(-14 SP) 성흔 효과" },
      { level: 5, impact: "High", efficiency1: "123.32%", efficiency3: "-", description: "(-14 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "123.32%", efficiency3: "-", description: "(-14 SP) 성흔 효과" }
    ]
  },
  {
    characterName: "닥터 레이시오",
    lastUpdated: "2026-03-16",
    patchVersion: "1.6",
    bestRelics: ["사수에 잠수한 선구자", "황토와 죽음의 거룻배"],
    bestOrnaments: ["회전을 멈춘 살소토", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "허수 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "75%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["순수 사유의 세례", "고민, 그리고 행복", "별바다 순항", "논검"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "정운 (SP)",
    lastUpdated: "2026-03-16",
    patchVersion: "2.7",
    bestRelics: ["곤충 재앙을 잠재우는 철기군"],
    bestOrnaments: ["겁화 연등의 연마궁"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: ["먼 곳의 소리", "거울 속의 나", "기억 속의 모습"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  },
  {
    characterName: "야오광",
    lastUpdated: "2026-03-16",
    patchVersion: "3.1",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" }
    ],
    bestLightCones: ["전용 광추", "순수 사유의 세례", "별바다 순항"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "트리비",
    lastUpdated: "2026-03-17",
    patchVersion: "3.1",
    variants: [
      {
        name: "저속 세팅",
        bestRelics: ["망국을 애도하는 시인"],
        bestOrnaments: ["고요한 습골지", "바다에 잠긴 루샤카", "생명의 바커 공"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or HP",
          boots: "HP",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["치명타 피해", "치명타 확률", "HP"],
        targetStats: [
          { label: "속도", value: "95 미만" },
          { label: "HP", value: "6000 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "1순위" }, "망국을 애도하는 시인"],
        bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "고요한 습골지", "바다에 잠긴 루샤카"],
        bestLightCones: [{ name: "댄스! 댄스! 댄스!", note: "1순위" }, "시간이 한 송이 꽃이라면", "맞물린 톱니"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or HP",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["치명타 피해", "치명타 확률", "HP"],
        targetStats: [
          { label: "속도", value: "141 이상" },
          { label: "치명타 확률", value: "60" },
          { label: "치명타 피해", value: "120" }
        ]
      }
    ],
    bestRelics: ["망국을 애도하는 시인", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: ["고요한 습골지", "바다에 잠긴 루샤카", { name: "생명의 바커 공", note: "고속 세팅 시 1순위" }],
    mainStats: {
      body: "치명타 피해 or 치명타 확률 or HP",
      boots: "HP or 속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["치명타 피해", "치명타 확률", "HP"],
    targetStats: [
      { label: "속도", value: "95 미만 or 141 이상" },
      { label: "HP", value: "6000 이상" }
    ],
    bestLightCones: [
      { name: "시간이 한 송이 꽃이라면", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "2순위 (고속 세팅 시 1순위)" },
      { name: "맞물린 톱니", note: "3순위" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonVariants: [
      {
        name: "1개체 (광추별 효율)",
        labels: ["시간이 한 송이 꽃이라면", "댄스! 댄스! 댄스!"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "139%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "173%", efficiency3: "124%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "322%", efficiency3: "231%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "360%", efficiency3: "259%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "398%", efficiency3: "286%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "409%", efficiency3: "294%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "529%", efficiency3: "380%", description: "최종 돌파 효과" }
        ]
      },
      {
        name: "3개체 (광추별 효율)",
        labels: ["시간이 한 송이 꽃이라면", "댄스! 댄스! 댄스!"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "139%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "173%", efficiency3: "124%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "241%", efficiency3: "173%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "269%", efficiency3: "193%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "297%", efficiency3: "214%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "306%", efficiency3: "220%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "425%", efficiency3: "305%", description: "최종 돌파 효과" }
        ]
      }
    ],
    eidolonEfficiency: []
  },
  {
    characterName: "개척자 (화합)",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["꿈을 조작하는 시계공", "유성을 쫓는 괴도", "가상공간을 누비는 메신저"],
        bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "속도", value: "145 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "1순위" }, "꿈을 조작하는 시계공"],
        bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "도적국 탈리아", "겁화 연등의 연마궁"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      }
    ],
    bestRelics: ["꿈을 조작하는 시계공", "유성을 쫓는 괴도", "가상공간을 누비는 메신저", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁", { name: "생명의 바커 공", note: "고속 세팅 시 1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: [
      { name: "거울 속 지난날의 나", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "아군 행동게이지 상승 필요 시 2순위" },
      "바람을 쫓을 때",
      "기억 속 모습"
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "계산 중..." }
    ]
  },
  {
    characterName: "개척자 (기억)",
    lastUpdated: "2026-03-17",
    patchVersion: "3.6",
    variants: [
      {
        name: "카스토리스 파티 세팅",
        bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
        bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율 or HP"
        },
        subStats: ["속도", "치명타 피해", "HP"],
        targetStats: [
          { label: "속도", value: "143 이상" },
          { label: "HP", value: "5000 이상" }
        ]
      },
      {
        name: "범용 세팅",
        bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
        bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 얼음 피해",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해", "HP"],
        targetStats: [
          { label: "속도", value: "143 이상" },
          { label: "치명타 피해", value: "150% 이상" }
        ]
      }
    ],
    bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
    bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 치명타 피해",
      boots: "속도",
      sphere: "HP or 얼음 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해", "HP"],
    targetStats: [
      { label: "속도", value: "143 이상" },
      { label: "HP", value: "5000 이상" },
      { label: "치명타 피해", value: "150% 이상" }
    ],
    bestLightCones: [
      { name: "이 순간처럼 영원한 사랑", note: "1순위" },
      { name: "무지개가 영원히 하늘에 머물길", note: "2순위" },
      { name: "핑크빛 내일을 향해", note: "3순위" },
      "기억은 영원히 막을 내리지 않는다"
    ],
    skillPriority: ["필살기", "특성", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "아글라이아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.0",
    bestRelics: ["번개 4세트"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "180%" }
    ],
    bestLightCones: ["전용 광추", "순수 사유의 세례"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "로빈",
    lastUpdated: "2026-03-16",
    patchVersion: "2.2",
    bestRelics: ["가상공간을 누비는 메신저", "깊은 감옥에 갇힌 죄수"],
    bestOrnaments: ["바다에 잠긴 루샤카", "불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "공격력",
      boots: "공격력",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["공격력", "속도", "효과 저항"],
    targetStats: [
      { label: "공격력", value: "4000 이상" },
      { label: "속도", value: "120 이상" }
    ],
    bestLightCones: ["찬란하게 빛나는 밤", "거울 속의 나", "내일의 기약", "누구의 소리인가?"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "부트힐",
    lastUpdated: "2026-03-16",
    patchVersion: "2.2",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "250% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: ["두 번째 삶을 향해", "별바다 순항", "논검", "강항의 기약"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "아젠티",
    lastUpdated: "2026-03-16",
    patchVersion: "1.5",
    bestRelics: ["스트리트 격투왕"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "물리 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["눈부신 태양보다 밝게", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1",
    eidolonEfficiency: []
  },
  {
    characterName: "한아",
    lastUpdated: "2026-03-16",
    patchVersion: "1.5",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력", "HP", "효과 저항"],
    targetStats: [
      { label: "속도", value: "160 이상" }
    ],
    bestLightCones: ["아직 전투는 끝나지 않았어", "누구의 소리인가?", "댄스! 댄스! 댄스!", "기억 속의 모습"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "토파즈 & 복순이",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      "사수에 잠수한 선구자"
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      "기묘한 나나 낙원",
      "이즈모 현세와 타카마 신국",
      "회전을 멈춘 살소토"
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "공격력 or 속도",
      sphere: "화염 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "2800" }
    ],
    variants: [
      {
        name: "추공 서포터 (권장)",
        bestRelics: ["재와 뼈마저 불사르는 대공"],
        bestOrnaments: ["질주하는 늑대의 도람 왕조"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률",
          boots: "공격력 or 속도",
          sphere: "화염 피해",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80% 이상" },
          { label: "치명타 피해", value: "150% 이상" },
          { label: "공격력", value: "2800 이상" }
        ]
      },
      {
        name: "디버퍼 세팅 (고속)",
        bestRelics: ["사수에 잠수한 선구자"],
        bestOrnaments: ["이즈모 현세와 타카마 신국"],
        mainStats: {
          body: "치명타 확률",
          boots: "속도",
          sphere: "화염 피해",
          rope: "공격력"
        },
        subStats: ["속도", "치명타 확률", "치명타 피해", "공격력"],
        targetStats: [
          { label: "속도", value: "143 / 160 이상" },
          { label: "치명타 확률", value: "80% 이상" }
        ]
      }
    ],
    bestLightCones: [
      { name: "고민, 그리고 행복", note: "1순위" },
      "논검",
      "별바다 순항"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "115.18%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "133.62%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "141.44%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "213.39%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "229.29%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "286.90%", efficiency3: "-", description: "성흔 효과" }
    ]
  },
  {
    characterName: "계네빈",
    lastUpdated: "2026-03-16",
    patchVersion: "1.4",
    bestRelics: ["깊은 감옥에 갇힌 죄수", "화염을 누비는 대장장이"],
    bestOrnaments: ["창공 전선 그라모스", "우주 봉인 정거장"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "화염 피해",
      rope: "공격력"
    },
    subStats: ["속도", "공격력", "효과 명중"],
    targetStats: [
      { label: "공격력", value: "3000" },
      { label: "속도", value: "134" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: ["인내심만 있으면 돼", "밤의 인사와 잠든 얼굴", "고독하게 치유되는 것", "페르마타"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "설의",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "별처럼 빛나는 천재", note: "1순위" },
      "곤충 재앙을 잠재우는 철기군",
      "유성을 쫓는 괴도"
    ],
    bestOrnaments: [
      { name: "도적국 탈리아", note: "1순위" },
      "우주 봉인 정거장",
      "회전을 멈춘 살소토",
      { name: "창공 전선 그라모스", note: "속도 135 기준" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "양자 피해 or 공격력",
      rope: "격파 특수효과"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "마음에 새긴 약속", note: "1순위" },
      "어떤 에이언즈의 몰락"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "(-5.6 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "102.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "104.20%", efficiency3: "-", description: "(-5.6 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "112.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "116.22%", efficiency3: "-", description: "(-5.6 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.79%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" }
    ]
  },
  {
    characterName: "링스",
    lastUpdated: "2026-03-16",
    patchVersion: "1.3",
    bestRelics: ["흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항"],
    targetStats: [
      { label: "HP", value: "5000 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["수술 후의 대화", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }, "따뜻한 저녁 식사 후"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E4 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "블레이드",
    lastUpdated: "2026-03-16",
    patchVersion: "1.2",
    bestRelics: ["가상공간을 누비는 메신저", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토", "경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or HP",
      sphere: "바람 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "7000 이상" },
      { label: "치명타 확률", value: "70%" }
    ],
    bestLightCones: ["닿을 수 없는 저편", "어떤 에이언즈의 몰락", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "나찰",
    lastUpdated: "2026-03-16",
    patchVersion: "1.1",
    bestRelics: ["흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or 공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["공격력", "속도", "효과 저항"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["관의 울림", "알맞은 타이밍", "수술 후의 대화", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  },
  {
    characterName: "경원",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["재와 뼈마저 불사르는 대공"],
    bestOrnaments: ["회전을 멈춘 살소토", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "브로냐",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도 or 공격력",
      sphere: "바람 피해 or HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["치명타 피해", "속도", "효과 저항"],
    targetStats: [
      { label: "치명타 피해", value: "180% 이상" },
      { label: "속도", value: "134 or 160 이상" }
    ],
    bestLightCones: ["아직 전투는 끝나지 않았어", "누구의 소리인가?", "댄스! 댄스! 댄스!", "과거와 미래"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "웰트",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "사수에 잠수한 선구자", note: "1순위" }, { name: "황무지의 도적, 황야인", note: "2순위" }],
    bestOrnaments: [{ name: "이즈모 현세와 타카마 신국", note: "1순위" }, "창공 전선 그라모스", "뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "허수 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "2500 이상" },
      { label: "효과 명중", value: "40% 이상" }
    ],
    bestLightCones: [
      { name: "바람에 흩날리는 거짓말", note: "1순위" },
      { name: "흘러가는 강가를 따라", note: "2순위" },
      "계속 내리는 비",
      "밤 인사와 잠든 얼굴",
      "땀방울처럼 빛나는 결심"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E2",
    eidolonEfficiency: []
  },
  {
    characterName: "클라라",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["스트리트 격투왕", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "HP"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["대체할 수 없는 것", "어떤 에이언즈의 몰락", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "백로",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항"],
    targetStats: [
      { label: "HP", value: "6000 이상" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["세월은 흐를 뿐", "수술 후의 대화", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "Mar. 7th",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["정토 교황의 팔각 모자"],
    bestOrnaments: ["벨로보그의 건설 공정", "부러진 용골"],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도 or 방어력",
      sphere: "방어력",
      rope: "방어력 or 에너지 충전 효율"
    },
    subStats: ["방어력", "효과 명중", "속도", "HP"],
    targetStats: [
      { label: "방어력", value: "3000 이상" },
      { label: "효과 명중", value: "50% 이상" }
    ],
    bestLightCones: ["승리의 순간", "기억의 소재", { name: "랜도의 선택", note: "어그로 필요 시" }, "이게 바로 나야!", "엠버"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "단항",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["밤낮의 경계를 누비는 매"],
    bestOrnaments: ["회전을 멈춘 살소토", "경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["야경 속에서", "별바다 순항", "논검", "침묵만이 남을 뿐"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "아스타",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 공격력",
      boots: "속도",
      sphere: "화염 피해 or HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "격파 특수효과", "공격력", "HP"],
    targetStats: [
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: ["아직 전투는 끝나지 않았어", "누구의 소리인가?", "댄스! 댄스! 댄스!", "기억 속의 모습", "행성과의 만남"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "아를란",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["뇌전을 울리는 밴드", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["어떤 에이언즈의 몰락", "대체할 수 없는 것", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "서벌",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["뇌전을 울리는 밴드", "깊은 감옥에 갇힌 죄수"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "청작",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["경기장", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "정운",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제", "가상공간을 누비는 메신저"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "방어력", "HP"],
        targetStats: [
          { label: "공격력", value: "2000" },
          { label: "속도", value: "167 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "고행의 길에 다시 오른 사제"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "공격력", "방어력", "HP"],
        targetStats: [
          { label: "공격력", value: "2600" },
          { label: "속도", value: "134 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제", "가상공간을 누비는 메신저", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["공격력", "속도", "방어력", "HP"],
    targetStats: [
      { label: "공격력", value: "2000" },
      { label: "속도", value: "167 이상" }
    ],
    bestLightCones: [
      { name: "대지로 돌아온 비행", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "2순위 (고속 세팅 시 1순위)" },
      "맞물린 톱니",
      "아직 전투는 끝나지 않았다"
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "소상",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["스트리트 격투왕", "유성을 쫓는 괴도"],
    bestOrnaments: ["회전을 멈춘 살소토", "도적국 탈리아"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "물리 피해",
      rope: "공격력 or 격파 특수효과"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도", "격파 특수효과"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["야경 속에서", "별바다 순항", "논검", "침묵만이 남을 뿐"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "다리아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.8",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "효과 저항"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "HP", value: "6000 이상" }
    ],
    bestLightCones: ["전용 광추", "거울 속의 나", "기억 속의 모습"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  },
  {
    characterName: "키레네",
    lastUpdated: "2026-03-16",
    patchVersion: "3.7",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "허수 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" }
    ],
    bestLightCones: ["전용 광추", "순수 사유의 세례"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "에버나이트",
    lastUpdated: "2026-03-16",
    patchVersion: "3.6",
    bestRelics: ["양자 4세트"],
    bestOrnaments: ["경기장"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" }
    ],
    bestLightCones: ["전용 광추", "야경 속에서"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "단항·불멸의 거목",
    lastUpdated: "2026-03-16",
    patchVersion: "3.6",
    bestRelics: ["바람 4세트"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" }
    ],
    bestLightCones: ["전용 광추", "야경 속에서"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "하이실렌스",
    lastUpdated: "2026-03-16",
    patchVersion: "3.5",
    bestRelics: ["얼음 4세트"],
    bestOrnaments: ["경기장"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" }
    ],
    bestLightCones: ["전용 광추", "어떤 에이언즈의 몰락"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "세리드라",
    lastUpdated: "2026-03-16",
    patchVersion: "3.5",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력", "효과 저항"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: ["전용 광추", "거울 속의 나"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  },
  {
    characterName: "세이버",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    bestRelics: [
      { name: "거친 파도를 헤치는 선장", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "회전을 멈춘 살소토", note: "1순위" },
      "창공 전선 그라모스",
      "우주 봉인 정거장",
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "물리 피해 증가",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 미만" },
      { label: "속도", value: "134 이상" },
      { label: "공격력", value: "2600" }
    ],
    bestLightCones: [
      { name: "보답 없는 왕관", note: "1순위" },
      { name: "어떤 에이언즈의 몰락", note: "2순위" },
      { name: "과거의 핏자국", note: "3순위" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "112.00%", efficiency3: "115.00%", description: "성흔 효과" },
      { level: 2, impact: "High", efficiency1: "125.00%", efficiency3: "128.00%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "132.00%", efficiency3: "135.00%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "138.00%", efficiency3: "142.00%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "145.00%", efficiency3: "150.00%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "168.00%", efficiency3: "175.00%", description: "성흔 효과" }
    ]
  },
  {
    characterName: "아처",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "허수 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" }
    ],
    bestLightCones: ["전용 광추", "순수 사유의 세례"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "사이퍼",
    lastUpdated: "2026-03-16",
    patchVersion: "3.3",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력", "효과 저항"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: ["전용 광추", "거울 속의 나"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  },
  {
    characterName: "아낙사",
    lastUpdated: "2026-03-16",
    patchVersion: "3.2",
    bestRelics: ["양자 4세트"],
    bestOrnaments: ["경기장"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" }
    ],
    bestLightCones: ["전용 광추", "야경 속에서"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "카스토리체",
    lastUpdated: "2026-03-16",
    patchVersion: "3.2",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "효과 저항"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "HP", value: "6000 이상" }
    ],
    bestLightCones: ["전용 광추", "거울 속의 나"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  },
  {
    characterName: "메모리 헤르타",
    lastUpdated: "2026-03-16",
    patchVersion: "3.0",
    bestRelics: ["지식의 바다에 빠진 학자"],
    bestOrnaments: ["텐고쿠@라이브스트리밍"],
    mainStats: {
      body: "치명타 피해",
      boots: "공격력",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "200%" }
    ],
    bestLightCones: ["전용 광추", "은하철도의 밤"],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "개척자 (보존)",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "정토 교황의 팔라딘", note: "1순위" }],
    bestOrnaments: [{ name: "부러진 용골", note: "1순위" }, "불로인의 선주", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도",
      sphere: "방어력",
      rope: "방어력"
    },
    subStats: ["방어력", "효과 명중", "속도", "HP"],
    targetStats: [
      { label: "방어력", value: "2500 이상" },
      { label: "효과 저항", value: "70%" },
      { label: "속도", value: "135 이상" }
    ],
    bestLightCones: [
      { name: "승리의 순간", note: "1순위" },
      { name: "랜도의 선택", note: "2순위" },
      { name: "기억의 소재", note: "3순위" },
      "여생의 첫날"
    ],
    skillPriority: ["필살기", "특성", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  },
  {
    characterName: "개척자 (파멸)",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "지식의 바다에 빠진 학자", note: "1순위" }, "스트리트 격투왕", "사수에 잠수한 선구자"],
    bestOrnaments: [{ name: "뭇별 경기장", note: "1순위" }, "창공 전선 그라모스", "회전을 멈춘 살소토", "우주 봉인 정거장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "120%" },
      { label: "공격력", value: "2500" }
    ],
    bestLightCones: [{ name: "어떤 에이언즈의 몰락", note: "1순위" }],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [],
    eidolonVariants: [
      {
        name: "1개체",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
          { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "107.53%", efficiency3: "-", description: "스킬 레벨 상승" },
          { level: 4, impact: "Low", efficiency1: "109.58%", efficiency3: "-", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "112.34%", efficiency3: "-", description: "스킬 레벨 상승" },
          { level: 6, impact: "Low", efficiency1: "112.34%", efficiency3: "-", description: "성흔 효과" }
        ]
      },
      {
        name: "3개체",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
          { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "109.38%", efficiency3: "-", description: "스킬 레벨 상승" },
          { level: 4, impact: "Low", efficiency1: "112.04%", efficiency3: "-", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "113.63%", efficiency3: "-", description: "스킬 레벨 상승" },
          { level: 6, impact: "Low", efficiency1: "113.63%", efficiency3: "-", description: "성흔 효과" }
        ]
      }
    ]
  },
  {
    characterName: "완·매",
    lastUpdated: "2026-03-16",
    patchVersion: "1.6",
    bestRelics: ["가상공간을 누비는 메신저", "유성을 쫓는 괴도"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "탈리아"],
    mainStats: {
      body: "HP or 방어력",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "HP", "방어력"],
    targetStats: [
      { label: "격파 특수효과", value: "160% or 180% 이상" },
      { label: "속도", value: "134 or 145 or 160 이상" }
    ],
    bestLightCones: ["거울 속의 나", "기억 속의 모습", "댄스! 댄스! 댄스!", "아직 전투는 끝나지 않았어"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "효광",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "천명에 응해 먼 길을 떠난 점술가", note: "1순위" }
    ],
    bestOrnaments: [
      "바다에 잠긴 루샤카",
      "사색하는 거목"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "160 / 180 / 200" },
      { label: "치명타 확률", value: "100%" },
      { label: "치명타 피해", value: "100%" }
    ],
    bestLightCones: [
      { name: "그녀가 보기로 결심했을 때", note: "1순위" },
      "슈룸 모험기"
    ],
    skillPriority: ["환락 스킬", "전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "데이터 분석 진행 중" }
    ]
  },
  {
    characterName: "더 헤르타",
    lastUpdated: "2026-03-17",
    patchVersion: "3.0",
    bestRelics: [
      { name: "지식의 바다에 빠진 학자", note: "1순위" },
      { name: "혹한 밀림의 사냥꾼", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "이즈모 현세와 타카마 신국", note: "1순위" },
      { name: "뭇별 경기장", note: "2순위" },
      "창공 전선 그라모스",
      "주인 없는 황폐한 별 츠가냐"
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률 or 효과 명중",
      boots: "속도 or 공격력 (2돌파 이상 시 공격력)",
      sphere: "얼음 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["속도", "치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "80" },
      { label: "치명타 피해", value: "160" },
      { label: "공격력", value: "3300" }
    ],
    bestLightCones: [
      { name: "추궁할 수 없는 곳을 향해", note: "1순위" },
      { name: "오늘도 평화로운 하루", note: "2순위" },
      { name: "은하철도의 밤", note: "3순위" },
      "동트기 전"
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [],
    eidolonVariants: [
      {
        name: "1개체 (광추별 효율)",
        labels: ["추궁할 수 없는 곳을 향해", "오늘도 평화로운 하루"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "115.00%", efficiency3: "112.00%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "135.00%", efficiency3: "128.00%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "142.00%", efficiency3: "135.00%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "155.00%", efficiency3: "145.00%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "165.00%", efficiency3: "152.00%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "334.00%", efficiency3: "285.00%", description: "성흔 효과" }
        ]
      }
    ]
  },
  {
    characterName: "망귀인",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["곤충 재앙을 잠재우는 철기군"],
        bestOrnaments: ["겁화 연등의 연마궁"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "격파 특수효과"
        },
        subStats: ["속도", "격파 특수효과", "공격력"],
        targetStats: [
          { label: "속도", value: "145 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["가상공간을 누비는 메신저"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "격파 특수효과"
        },
        subStats: ["속도", "격파 특수효과", "공격력"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "격파 특수효과", value: "220% 이상" }
        ]
      }
    ],
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "가상공간을 누비는 메신저"],
    bestOrnaments: ["겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: [
      { name: "먼 곳의 소리", note: "1순위" },
      { name: "거울 속의 나", note: "2순위" },
      { name: "기억 속의 모습", note: "3순위" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  },
  {
    characterName: "운리",
    lastUpdated: "2026-03-17",
    patchVersion: "3.0",
    bestRelics: [
      { name: "바람과 구름을 가르는 용맹함", note: "1순위" },
      { name: "스트리트 격투왕", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      { name: "회전을 멈춘 살소토", note: "2순위" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 이상" },
      { label: "치명타 피해", value: "120% 이상" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: [
      { name: "해 질 무렵 시작되는 춤", note: "1순위" },
      { name: "대체할 수 없는 것", note: "2순위" },
      { name: "어떤 에이언즈의 몰락", note: "3순위" }
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  }
];
