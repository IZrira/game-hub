import { CharacterGuide } from './index';

export const 개척자파멸Guide: CharacterGuide = {
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
    ,analysis: { status:"published", summary:"단일과 확산 공격을 전환하며 전투 스킬 포인트를 안정적으로 운용하는 물리 파멸 딜러다.", role:"초기 범용 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["단일·다수전에 유연하게 대응한다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["전용 자원이나 폭발적인 고점이 부족하다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"약점과 적 수에 맞춰 단일·확산 공격을 선택한다.", gameplay:{overview:"약점과 적 수에 맞춰 단일·확산 공격을 선택한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
