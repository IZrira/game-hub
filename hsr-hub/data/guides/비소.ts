import { CharacterGuide } from './index';

export const 비소Guide: CharacterGuide = {
    characterName: "비소",
    lastUpdated: "2026-09-29",
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
    ],
    analysis: { status: "published", summary: "아군의 공격 횟수로 비황을 모아 약점 속성을 무시하는 단일 필살기를 사용하는 바람 수렵 딜러다. 공격 빈도가 높은 추가 공격 파티에서 필살기 회전과 자체 추가 공격이 동시에 빨라진다.", role: "추가 공격 기반 단일 메인 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["필살기가 약점 속성을 무시하고 강인성을 감소시킨다.", "아군 공격마다 비황을 얻어 에너지 대신 파티 행동 횟수로 필살기를 충전한다.", "동료 공격 후 자체 추가 공격을 발동해 화력과 비황 순환에 기여한다."], weaknesses: ["적이 여럿인 전투에서도 주 화력이 단일 대상에 집중된다.", "공격 횟수가 적은 파티에서는 필살기 회전이 크게 느려진다.", "특성 추가 공격은 턴마다 한 번이라 행동 순서가 나쁘면 발동을 낭비한다."], teamPrinciple: "추가 공격과 빠른 행동을 가진 동료로 비황을 모으고, 방어 감소와 치명타 버프가 겹친 정예에게 필살기를 집중한다.", gameplay: { overview: "스킬로 공격력 버프를 유지하고 동료의 연속 공격으로 비황을 확보한다. 비황은 12까지 저장되므로 6에 즉시 쓰기보다 파티 버프와 적 상태를 맞춘다.", rotation: ["전투 스킬로 공격력 증가를 활성화한다.", "동료 공격과 자체 추가 공격으로 비황을 쌓는다.", "지원 버프와 적 디버프를 준비한다.", "필살기로 약점 상태에 맞는 타격을 선택해 집중 공격한다."], tips: ["비황 12 상한에 닿기 전에는 필살기를 아껴도 된다.", "동료의 공격을 비소 턴 사이에 분산해 특성 추가 공격을 매 턴 회수한다.", "치명타 확률을 높여 다단 필살기의 편차를 줄인다."] } }
  };
