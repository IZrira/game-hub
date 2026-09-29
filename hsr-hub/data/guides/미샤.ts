import { CharacterGuide } from './index';

export const 미샤Guide: CharacterGuide = {
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
    ,analysis: { status:"published", summary:"파티가 소비한 스킬 포인트만큼 필살기 타수를 늘리고 높은 빙결 확률을 노리는 얼음 파멸 딜러다.", role:"필살기 바운스 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["스킬 포인트 소비가 필살기 충전과 타수로 전환된다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["단일 목표에 타수가 집중되지 않으면 피해가 분산된다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"포인트 소비가 큰 동료와 함께 최대 타수 필살기를 준비한다.", gameplay:{overview:"포인트 소비가 큰 동료와 함께 최대 타수 필살기를 준비한다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
