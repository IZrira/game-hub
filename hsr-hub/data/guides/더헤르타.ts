import { CharacterGuide } from './index';

export const 더헤르타Guide: CharacterGuide = {
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
    ],
    analysis: {
      status: "published",
      summary: "파티 전체의 공격으로 해독을 한 적에게 몰아 쌓고, 필살기로 정예에게 재배치한 뒤 강화 전투 스킬로 결산하는 지식 파티형 메인 딜러다.",
      role: "지식 메인 딜러 / 스택 결산",
      standard: "E0 / S0, 지식 캐릭터 2명",
      reviewedAt: "2026-11-06",
      reviewer: "RIRA 편집팀",
      strengths: ["아군 공격마다 해독과 에너지를 얻어 파티 전체의 광역 공격 빈도를 자신의 자원으로 활용한다.", "필살기가 해독을 정예에게 모으고 즉시 행동과 영감을 제공해 강화 전투 스킬 결산을 보장한다.", "지식 캐릭터 2명 조합에서 해독 배율과 파티 치명타 피해가 크게 증가한다."],
      weaknesses: ["지식 캐릭터를 2명 채우지 않으면 핵심 행적과 해독 배율의 상당 부분을 잃는다.", "강화 전투 스킬이 주목표의 해독을 1스택으로 초기화해 낮은 스택에서 사용하면 다음 사이클까지 손실이 크다.", "적 수가 적거나 아군 공격이 단일 위주면 에너지와 해독 누적 속도가 늦어진다."],
      teamPrinciple: "광역 공격이 잦은 두 번째 지식 캐릭터를 반드시 배치하고, 나머지 슬롯은 행동 수·에너지·치명타를 지원해 해독 42스택 결산 주기를 앞당긴다.",
      gear: [
        {
          "kind": "lightcone",
          "name": "추궁할 수 없는 곳을 향해",
          "note": "1순위",
          "reason": "치명타 확률 12%를 주고, 필살기를 쓰면 3턴간 전투 스킬·필살기 피해가 60% 오른다. 필살기에 에너지를 140pt 이상 쓰면 전투 스킬 포인트 1pt를 돌려주는데, 더 헤르타의 에너지 최대치는 220이다."
        },
        {
          "kind": "lightcone",
          "name": "오늘도 평화로운 하루",
          "note": "2순위",
          "reason": "에너지 최대치 1pt당 가하는 피해가 0.2% 오른다(최대 160pt). 에너지 최대치 220인 더 헤르타는 최대치 32%를 채운다."
        },
        {
          "kind": "lightcone",
          "name": "은하철도의 밤",
          "note": "3순위",
          "reason": "필드의 적 1기당 공격력이 9%씩 최대 45% 오른다. 다수전이 많은 허구 이야기 전투와 맞는다."
        },
        {
          "kind": "lightcone",
          "name": "동트기 전",
          "note": "4순위",
          "reason": "치명타 피해 36%와 전투 스킬·필살기 피해 18%를 준다. 추가 공격 피해 증가는 더 헤르타에게 쓰이지 않는다."
        },
        {
          "kind": "relic",
          "name": "지식의 바다에 빠진 학자",
          "note": "1순위",
          "reason": "치명타 확률 8%와 전투 스킬·필살기 피해 20%를 준다. 필살기 뒤 즉시 행동으로 쓰는 강화 전투 스킬 피해가 25% 더 오른다."
        },
        {
          "kind": "relic",
          "name": "혹한 밀림의 사냥꾼",
          "note": "2순위",
          "reason": "얼음 속성 피해 10%와 필살기 발동 시 2턴간 치명타 피해 25%를 준다."
        },
        {
          "kind": "ornament",
          "name": "이즈모 현세와 타카마 신국",
          "note": "1순위",
          "reason": "공격력 12%를 주고, 운명의 길이 같은 동료(지식)가 있으면 치명타 확률이 12% 오른다. 지식 2인을 전제로 하는 더 헤르타 파티에서는 항상 조건이 채워진다."
        },
        {
          "kind": "ornament",
          "name": "뭇별 경기장",
          "note": "2순위",
          "reason": "치명타 확률 70% 이상이면 일반 공격·전투 스킬 피해가 20% 오른다. 강화 전투 스킬 결산에 적용된다."
        },
        {
          "kind": "ornament",
          "name": "창공 전선 그라모스",
          "note": "3순위",
          "reason": "공격력 12%에 더해 속도 135/160 이상이면 가하는 피해가 12%/18% 오른다."
        },
        {
          "kind": "ornament",
          "name": "주인 없는 황폐한 별 츠가냐",
          "note": "4순위",
          "reason": "적이 처치될 때마다 치명타 피해가 4%씩 최대 10스택 오른다. 적이 많이 쓰러지는 다수전에서 쓴다."
        }
      ],
      gameplay: {
        overview: "아군 광역 공격으로 여러 적에게 해독을 쌓고 필살기로 가장 높은 스택을 정예에게 재배치한다. 즉시 행동에서 영감을 소비한 강화 전투 스킬을 최고 스택 목표에 사용한다.",
        rotation: ["지식 동료의 광역 공격으로 해독과 에너지를 빠르게 모은다.", "핵심 정예의 해독이 충분해질 때까지 일반 전투 스킬로 스택을 유지한다.", "필살기로 해독을 재배치하고 공격력 버프·영감·즉시 행동을 얻는다.", "해독이 가장 높은 정예를 주목표로 강화 전투 스킬을 사용한다."],
        tips: ["치명타 확률·피해 수치는 퍼센트 기준으로 80%와 160%를 목표로 본다.", "2돌 이상은 강화 스킬 후 행동 게이지 증가가 있어 공격력 신발의 가치가 높아진다.", "해독 42스택에서 추가 피해 증가를 얻으므로 필살기 직후 목표의 실제 스택을 확인한다."]
      }
    }
  };
