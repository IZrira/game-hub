import { CharacterGuide } from './index';

export const Mar7th수렵Guide: CharacterGuide = {
    characterName: "Mar. 7th (수렵)",
    lastUpdated: "2026-09-29",
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
    ],
    analysis: { status: "published", summary: "한 아군을 사부로 지정하고 그 행동에 맞춰 충전을 쌓아 강화 일반 공격을 사용하는 허수 수렵 서브 딜러다. 사부의 운명의 길에 따라 추가 피해형과 강인성 감소형으로 역할이 달라진다.", role: "범용 단일 서브 딜러 / 격파 지원", standard: "E6 / 무료 배포", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["사부의 공격으로 충전을 얻어 스킬 포인트를 쓰지 않는 강화 일반 공격을 반복한다.", "사부 속성 약점을 대신 공략할 수 있어 속성 대응력이 좋다.", "강화 공격 후 사부에게 치명타 피해와 격파 특수효과를 지원한다."], weaknesses: ["사부의 공격 빈도가 낮으면 충전 7 도달이 늦다.", "강화 일반 공격은 스킬 포인트를 회복하지 않아 파티 수급량을 주의해야 한다.", "사부를 바꾸면 행동 순서와 추가 효과 계획을 다시 맞춰야 한다."], teamPrinciple: "공격 횟수가 많은 딜러를 사부로 지정한다. 딜러형 사부는 추가 피해를, 지원형 사부는 강인성 감소 증가를 활용한다.", gameplay: { overview: "첫 스킬로 사부를 지정한 뒤 일반 공격과 사부 행동으로 충전을 모은다. 7 충전 즉시 행동 전에 필살기를 사용하면 다음 강화 일반 공격의 타수가 강화된다.", rotation: ["핵심 아군을 사부로 지정한다.", "일반 공격과 사부 행동으로 충전을 쌓는다.", "충전 7 직전 또는 즉시 행동 전에 필살기를 사용한다.", "강화 일반 공격 후 사부 강화 효과를 활용한다."], tips: ["필살기는 강화 일반 공격 바로 전에 사용하는 것이 가장 안정적이다.", "사부의 속성 약점을 March 7th도 깎을 수 있다.", "스킬은 사부 변경이 필요하지 않으면 반복 사용하지 않는다."] } }
  };
