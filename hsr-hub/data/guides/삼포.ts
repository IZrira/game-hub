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
  };
