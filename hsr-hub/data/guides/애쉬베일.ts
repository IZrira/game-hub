import { CharacterGuide } from './index';

export const 애쉬베일Guide: CharacterGuide = {
    characterName: "애쉬베일",
    lastUpdated: "2026-04-06",
    patchVersion: "4.1",
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      { name: "사수에 잠수한 선구자", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "천 개의 별이 모인 도시", note: "서브딜" },
      { name: "질주하는 늑대의 도람 왕조", note: "메인딜" },
      { name: "이즈모 현세와 타카마 신국", note: "다른 수렵 캐릭터와 파티 시" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "번개 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "공격력", value: "3400 이상" },
      { label: "치명타 확률", value: "70% 이상" }
    ],
    bestLightCones: [
      { name: "거짓말의 종막", note: "1순위" },
      "순수 사유의 세례",
      "고민, 그리고 행복",
      "별바다 순항",
      "그 종착지에서 다시 만나자"
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능 (1 Target DPS 기준)" },
      { level: 1, impact: "Medium", efficiency1: "130.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "162.38%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "170.34%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.99%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "205.88%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "315.99%", efficiency3: "-", description: "성흔 효과" }
    ]
  };
