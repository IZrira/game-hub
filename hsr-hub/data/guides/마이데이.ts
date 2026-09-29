import { CharacterGuide } from './index';

export const 마이데이Guide: CharacterGuide = {
    characterName: "마이데이",
    lastUpdated: "2026-09-29",
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
    bestLightCones: ["피의 불꽃이여, 앞길을 태워라", "닿을 수 없는 저편", "비밀 맹세", "인사록·음률 사냥"],
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
        name: "인사록·음률 사냥",
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
    ],
    analysis: {
      status: "published", summary: "자신의 HP를 소모해 충전을 쌓고 100포인트에서 복수 상태로 돌입하는 허수 파멸 딜러다. 높은 최대 HP와 피해 감수 능력을 바탕으로 자동 강화 스킬을 반복하는 장기전형 캐릭터다.",
      role: "HP 소모형 메인 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀",
      strengths: ["HP 최대치가 공격 배율과 생존력에 동시에 기여해 세팅 방향이 명확하다.", "복수 진입 시 행동 게이지가 100% 증가하고 강화 스킬을 자동 반복한다.", "치명적 피해를 견디는 특성으로 HP 소모형 운용의 위험을 스스로 일부 완화한다."],
      weaknesses: ["복수 진입 전 충전 100을 모으는 예열 시간이 필요하다.", "복수 상태에서는 행동을 직접 선택하기 어려워 목표 전환과 스킬 포인트 계획이 제한된다.", "과도한 치명타 확률 투자는 자체 행적과 겹쳐 효율이 떨어질 수 있다."],
      teamPrinciple: "최대 HP와 치명타 피해를 지원하거나 안정적으로 회복하는 캐릭터를 조합하고, 마이데이가 피해를 안전하게 받아 충전을 빠르게 모을 수 있도록 한다.",
      gameplay: { overview: "전투 스킬로 현재 HP의 절반을 소모하며 충전을 확보하고, 피해를 받아 100포인트에 도달하면 복수 상태에 진입한다. 복수 중에는 자동 강화 스킬의 150포인트 보너스 턴을 목표로 회복과 버프를 유지한다.", rotation: ["전투 스킬로 HP를 소모해 충전을 쌓는다.", "힐러의 회복 타이밍을 조절하며 적 공격도 안전하게 받아낸다.", "충전 100에서 복수 진입과 즉시 행동을 활용한다.", "복수 중 150 충전 보너스 턴까지 버프와 생존 지원을 유지한다."], tips: ["목표 치명타 확률 52%는 자체 보정 적용 전 기준인지 장비 화면 기준인지 일관되게 확인한다.", "복수 진입 직전에 회복을 낭비하지 말고 진입 시 자체 회복을 고려한다.", "죽음 방지 횟수가 소진된 뒤에는 무리한 HP 소모를 피한다."] }
    }
  };
