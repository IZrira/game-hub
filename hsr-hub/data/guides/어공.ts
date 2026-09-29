import { CharacterGuide } from './index';

export const 어공Guide: CharacterGuide = {
    characterName: "어공",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "가상공간을 누비는 메신저", note: "1순위" }],
    bestOrnaments: [{ name: "부러진 용골", note: "1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 치명타 확률",
      boots: "속도 or HP",
      sphere: "HP or 허수 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "딜러 속도의 + 1" }
    ],
    bestLightCones: [
      { name: "기억 속 모습", note: "1순위" },
      { name: "아직 전투는 끝나지 않았다", note: "2순위" },
      "맞물린 톱니"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "계산 중..." }
    ]
    ,analysis: { status:"published", summary:"활시위 호령 스택 동안 공격력과 치명타 능력치를 크게 높이는 허수 화합 서포터다.", role:"행동 순서형 버퍼", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["짧은 구간에 매우 높은 공격·치명타 버프를 제공한다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["아군 행동 순서가 바뀌면 호령 스택을 엉뚱한 행동이 소비한다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"속도를 정밀 조정해 두 핵심 딜러 행동만 호령 안에 넣는다.", gameplay:{overview:"속도를 정밀 조정해 두 핵심 딜러 행동만 호령 안에 넣는다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
