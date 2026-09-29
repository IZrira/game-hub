import { CharacterGuide } from './index';

export const 삼포Guide: CharacterGuide = {
    characterName: "삼포",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "밤낮의 경계를 나는 매"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사", "우주 봉인 정거장"],
    mainStats: {
      body: "공격력 or 효과 명중",
      boots: "속도",
      sphere: "바람 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["바람에 흩날리는 거짓말", "밤 인사와 잠든 얼굴", "사냥감의 시선", "땀방울처럼 빛나는 결심"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "113.08%", efficiency3: "110.20%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "113.08%", efficiency3: "110.20%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "118.76%", efficiency3: "112.88%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "140.88%", efficiency3: "123.33%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "149.42%", efficiency3: "133.20%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "170.92%", efficiency3: "157.58%", description: "성흔 효과" }
    ]
    ,analysis: { status:"published", summary:"다단 바운스로 풍화를 중첩하고 필살기로 적이 받는 지속 피해를 높이는 바람 공허 딜러다.", role:"풍화 지속 피해 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["풍화 5중첩을 빠르게 부여하고 지속 피해 취약을 제공한다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["바운스가 분산되면 핵심 적 중첩이 늦어진다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"단일 정예에게 스킬 바운스를 집중한 뒤 필살기로 지속 피해를 증폭한다.", gameplay:{overview:"단일 정예에게 스킬 바운스를 집중한 뒤 필살기로 지속 피해를 증폭한다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
