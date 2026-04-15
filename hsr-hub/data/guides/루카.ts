import { CharacterGuide } from './index';

export const 루카Guide: CharacterGuide = {
    characterName: "루카",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "유성을 쫓는 괴도"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "도적국 탈리아"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "효과 명중", value: "67%" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "필요한 건 기다림 뿐", note: "1순위" },
      { name: "밤 인사와 잠든 얼굴", note: "2순위" },
      { name: "그 무수한 봄날", note: "3순위" },
      "땀방울처럼 빛나는 결심"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "106.73%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "117.81%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "127.56%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "135.99%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "140.28%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "151.62%", efficiency3: "-", description: "성흔 효과" }
    ]
  };
