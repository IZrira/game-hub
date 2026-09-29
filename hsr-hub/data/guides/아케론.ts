import { CharacterGuide } from './index';

export const 아케론Guide: CharacterGuide = {
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
    ,analysis: { status:"published", summary:"공허 동료가 부여한 디버프로 꿈 조각을 쌓아 에너지 없는 광역 필살기를 사용하는 번개 딜러다.", role:"디버프 연계 필살기 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["약점을 무시하는 강인성 감소와 강력한 광역 필살기를 보유한다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["디버프 부여 빈도가 낮으면 필살기 충전이 느리다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"공허 캐릭터와 매 행동 디버프를 부여해 꿈 조각을 빠르게 모은다.", gameplay:{overview:"공허 캐릭터와 매 행동 디버프를 부여해 꿈 조각을 빠르게 모은다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
