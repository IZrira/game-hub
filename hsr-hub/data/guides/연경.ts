import { CharacterGuide } from './index';

export const 연경Guide: CharacterGuide = {
    characterName: "연경",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 피해",
      boots: "공격력 or 속도",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "공격력", "속도", "치명타 확률"],
    targetStats: [
      { label: "치명타 확률", value: "20~30%" },
      { label: "치명타 피해", value: "200%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["깊게 든 단잠", "야경 속에서", "별바다 순항", "침묵만이"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "102.80%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "110.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "114.20%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.60%", efficiency3: "-", description: "성흔 효과" }
    ]
    ,analysis: { status:"published", summary:"신검합일로 치명타 능력을 높이고 추가 공격과 빙결을 노리는 얼음 수렵 딜러다.", role:"무피격 단일 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["신검합일 중 높은 치명타 보정과 단일 화력을 얻는다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["피해를 받으면 신검합일이 해제돼 화력이 급감한다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"강한 실드로 피격을 차단하고 신검합일을 유지한다.", gameplay:{overview:"강한 실드로 피격을 차단하고 신검합일을 유지한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
