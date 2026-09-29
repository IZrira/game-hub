import { CharacterGuide } from './index';

export const 라파Guide: CharacterGuide = {
    characterName: "라파",
    lastUpdated: "2026-09-29",
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
    bestLightCones: ["인법첩•요란 파마", "은하철도의 밤", "조화가 침묵한 후"],
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
    ],
    analysis: { status: "published", summary: "필살기로 결인 상태에 들어가 약점 속성을 무시하는 강화 일반 공격을 세 차례 사용하는 허수 격파 딜러다. 적의 약점 격파 횟수로 충전을 모아 마지막 광역 타격의 격파 피해를 증폭한다.", role: "광역 격파 메인 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["강화 일반 공격이 허수 약점이 없는 적의 강인성도 감소시킨다.", "다수의 적이 연속 격파될수록 충전과 추가 격파 피해가 빠르게 증가한다.", "결인 상태에서 격파 효율과 격파 특수효과를 자체 확보한다."], weaknesses: ["필살기 밖에서는 강화 일반 공격과 슈퍼 격파가 없어 화력 공백이 크다.", "단일 대상이나 약점 잠금 적을 상대로 충전 획득이 느리다.", "결인 중 스킬과 필살기를 사용할 수 없어 전투 흐름 변경에 대응하기 어렵다."], teamPrinciple: "약점 부여·격파 효율·슈퍼 격파를 지원하는 캐릭터와 편성하고, 잡몹을 먼저 격파해 충전을 확보한 뒤 정예에게 마지막 타격을 집중한다.", gameplay: { overview: "필살기 전 에너지와 적 강인성을 정리하고, 결인 진입 후 세 번의 강화 일반 공격 안에 최대한 많은 격파를 만든다. 충전이 쌓인 마지막 3단 공격을 주요 목표의 격파 구간에 맞춘다.", rotation: ["지원기의 약점 부여와 격파 버프를 준비한다.", "전투 스킬로 적 강인성을 낮추고 필살기를 충전한다.", "필살기로 결인 상태와 채묵 3을 획득한다.", "강화 일반 공격을 연속 사용해 격파와 충전 추가 피해를 회수한다."], tips: ["공격력 3200은 받는 격파 피해 증가 행적의 상한 기준이다.", "정예 격파는 추가 충전과 에너지를 주므로 순서를 계획한다.", "결인 진입 전에 스킬 포인트를 과도하게 남길 필요는 없다."] } }
  };
