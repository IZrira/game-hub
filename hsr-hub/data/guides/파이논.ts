import { CharacterGuide } from './index';

export const 파이논Guide: CharacterGuide = {
  characterName: "파이논",
  lastUpdated: "2026-03-16",
  patchVersion: "3.4",
  variants: [
    {
      name: "물리 세팅",
      bestRelics: ["거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
      bestOrnaments: ["꿈을 엮는 요정의 낙원", "뭇별 경기장"],
      bestLightCones: ["이와 같이 타오르는 여명", "어떤 에이언즈의 몰락", "대체할 수 없는 것", "과거의 핏자국"],
      skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
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
      ]
    },
    {
      name: "바람 세팅",
      bestRelics: ["거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
      bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스", "우주 봉인 정거장", "뭇별 경기장"],
      bestLightCones: ["보답 없는 왕관", "어떤 에이언즈의 몰락", "과거의 핏자국"],
      skillPriority: ["필살기", "전투 스킬", "일반 공격", "특성"],
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
      ]
    }
  ],
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
  ],
  analysis: {
    status: "published",
    summary: "동료의 행동으로 불씨를 모은 뒤 카오스라나로 변신해 파티 자리를 홀로 점유하고 연속 보너스 턴을 폭발시키는 변신형 메인 딜러다.",
    role: "변신형 파멸 메인 딜러",
    standard: "E0 / S0, 물리 세팅",
    reviewedAt: "2026-09-29",
    reviewer: "RIRA 편집팀",
    strengths: ["변신 중 모든 적에게 물리 약점을 부여해 약점 구성에 덜 구애받는다.", "동료가 퇴장한 카오스라나 상태에서 전용 스킬과 보너스 턴을 연속 사용해 혼자 공격 시간을 점유한다.", "동료의 공격과 지원을 불씨로 저장해 변신 구간의 큰 피해로 전환한다."],
    weaknesses: ["변신 전 불씨를 모으는 준비 시간이 필요하고 파티 행동 순서가 어긋나면 첫 필살기가 늦다.", "변신 중 동료가 퇴장하므로 짧은 지속 버프나 변신 이후 갱신이 필요한 지원은 활용하기 어렵다.", "물리 기본 세팅과 바람 대체 세팅의 속도·스킬 우선순위가 달라 장비를 섞으면 목표가 불명확해진다."],
    teamPrinciple: "파이논이 변신하기 전에 공격력·치명타·에너지 관련 장기 버프를 모두 적용하고, 불씨를 빠르게 공급하는 잦은 행동 또는 즉시 행동 서포터를 배치한다.",
    gameplay: {
      overview: "동료 행동으로 불씨를 모으는 동안 파이논의 버프를 준비한다. 필살기 직전에 갱신 가능한 장기 버프를 모두 적용하고 카오스라나 변신 후 전용 스킬과 반격 자원을 순서대로 소비한다.",
      rotation: ["전투 초반 동료들의 공격과 행동 보조로 불씨를 모은다.", "변신 전에 케리드라·선데이 등 핵심 버프를 파이논에게 집중한다.", "필살기로 카오스라나 변신과 물리 약점 경계를 전개한다.", "강화 전투 스킬로 훼멸과 반격 자원을 관리하며 보너스 턴을 모두 소화한다."],
      tips: ["기본 물리 세팅은 변신 중 속도보다 공격력과 치명타를 우선한다.", "케리드라와 사용할 때 파이논이 먼저 행동하도록 115 대 114 순서를 맞춘다.", "변신 직전에 곧 종료될 짧은 버프는 파이논의 긴 단독 행동을 전부 덮지 못하므로 지속 턴을 확인한다."]
    }
  }
};
