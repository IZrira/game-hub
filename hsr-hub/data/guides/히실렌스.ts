import { CharacterGuide } from './index';

export const 히실렌스Guide: CharacterGuide = {
    characterName: "히실렌스",
    lastUpdated: "2026-03-15",
    patchVersion: "3.5",
    bestRelics: ["깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사", "우주 봉인 정거장"],
    mainStats: {
      body: "효과 명중",
      boots: "속도 or 공격력",
      sphere: "물리 피해 or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "효과 명중", value: "120% 이상" },
      { label: "속도", value: "134 or 168 이상" },
      { label: "공격력", value: "2400 이상" }
    ],
    bestLightCones: ["바다는 왜 노래하는가", "시간의 기억에 대한 재구성", "그 무수한 봄날", "사냥감의 시선", "밤 인사와 잠든 얼굴"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonVariants: [
      {
        name: "광추별 효율",
        labels: ["바다는 왜 노래하는가", "사냥감의 시선"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "126%", efficiency3: "126%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "209%", efficiency3: "215%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "209%", efficiency3: "215%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "228%", efficiency3: "234%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "273%", efficiency3: "281%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "284%", efficiency3: "291%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "369%", efficiency3: "380%", description: "성흔 효과" }
        ]
      },
      {
        name: "사냥감의 시선 기준",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "167%", efficiency3: "172%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "167%", efficiency3: "172%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "182%", efficiency3: "188%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "218%", efficiency3: "225%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "227%", efficiency3: "234%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "295%", efficiency3: "305%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: []
  };
