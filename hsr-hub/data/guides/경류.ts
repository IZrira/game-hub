import { CharacterGuide } from './index';

export const 경류Guide: CharacterGuide = {
    characterName: "경류",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["지식의 바다에 빠진 학자", "혹한 밀림의 사냥꾼"],
    bestOrnaments: ["고요한 습골지", "뭇별 경기장"],
    mainStats: {
      body: "HP",
      boots: "HP or 속도",
      sphere: "HP or 얼음 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "7000 이상" },
      { label: "치명타 확률", value: "50% 미만" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["피의 불꽃이여, 앞길을 태워라", "이 몸이 검이니", "과거의 핏자국", "비밀 맹세", "인사록•음률 사냥"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "137% / 100%", efficiency3: "141% / 100%", description: "기본 성능 (AS 후 / 전)" },
      { level: 1, impact: "Medium", efficiency1: "217% / 142%", efficiency3: "192% / 107%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "232% / 155%", efficiency3: "205% / 116%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "248% / 163%", efficiency3: "217% / 123%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "294% / 173%", efficiency3: "257% / 131%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "308% / 183%", efficiency3: "273% / 141%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "423% / 197%", efficiency3: "378% / 153%", description: "성흔 효과" }
    ]
  };
