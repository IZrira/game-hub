import { CharacterGuide } from './index';

export const 제이드Guide: CharacterGuide = {
    characterName: "제이드",
    lastUpdated: "2026-03-15",
    patchVersion: "3.0",
    bestRelics: ["망국을 애도하는 시인", "별처럼 빛나는 천재", "재와 뼈마저 불사르는 대공", "바람과 구름을 가르는 용맹함", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국", "주인 없는 황폐한 별 츠가냐", "질주하는 늑대의 도람 왕조", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률",
      boots: "공격력",
      sphere: "양자 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "3500" }
    ],
    bestLightCones: ["값을 매길 수 없는 건 희망뿐", "동트기 전", "오늘도 평화로운 하루", "은하철도의 밤", "천재들의 휴식"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "147.31%", efficiency3: "107.31%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "163.42%", efficiency3: "119.04%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "176.93%", efficiency3: "129.88%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.63%", efficiency3: "139.94%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "198.60%", efficiency3: "144.66%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "271.89%", efficiency3: "199.00%", description: "성흔 효과" }
    ]
  };
