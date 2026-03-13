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
    bestLightCones: ["섬뜩한 밤", "세월은 흐를 뿐", "수술 후의 대화", "내일의 내일이 올 때까지", "등가교환"],
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
    bestLightCones: ["언제나 불공평한 운명", "언제나 여정이 평탄하기를", "승리의 순간", "여생의 첫날", { name: "우주 시장 동향", note: "아케론 파티 시 사용" }],
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
      sphere: "HP or 양자 피해 (아글라이아 1돌파 이상 시 양자 피해)",
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
      boots: "공격력 or 속도 (파이논 조합 시 공격력)",
      sphere: "바람 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "4000" },
      { label: "속도", value: "114 or 134 이상" },
      { label: "참고", value: "파이논 조합 시 파이논(115) → 케리드라(114) → 선데이 순서 권장" }
    ],
    bestLightCones: [
      "황금 피가 새겨진 시대",
      "거울 속 지난날의 나",
      "찬란하게 빛나는 밤",
      "영원한 미궁의 식사",
      { name: "속세에서의 유희", note: "파이논 조합 시 2순위" }
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
          { label: "참고", value: "파이논 조합 시 신발/매듭 공격력 권장" }
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
      { name: "우주 시장 동향", note: "아케론 파티 시 사용, 지속 피해 세팅 시" },
      { name: "범은하 상사", note: "지속 피해 세팅" }
    ],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 2, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 6, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" }
    ]
  }
];
