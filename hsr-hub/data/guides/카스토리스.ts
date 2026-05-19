import { CharacterGuide } from './index';

export const 카스토리스Guide: CharacterGuide = {
    characterName: "카스토리스",
    lastUpdated: "2026-03-11",
    patchVersion: "3.6",
    bestRelics: ["망국을 애도하는 시인"],
    bestOrnaments: ["고요한 습골지", { name: "꿈을 엮는 요정의 낙원", note: "기억 파티 조합 시" }, "기묘한 나나 낙원"],
    mainStats: {
      body: "HP or 치명타 피해 or 치명타 확률",
      boots: "HP",
      sphere: "HP or 양자 피해 (히아킨 1돌파 이상 시 양자 피해)",
      rope: "HP"
    },
    subStats: ["치명타 피해", "치명타 확률", "HP"],
    targetStats: [
      { label: "HP", value: "8000 이상" },
      { label: "속도", value: "95 미만" }
    ],
    bestLightCones: [
      "이별이 더 아름답도록",
      "꽃은 잊지 않는다",
      "땀은 많이, 눈물은 적게"
    ],
    skillPriority: ["기억 정령 스킬", "기억 정령 특성", "필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonVariants: [
      {
        name: "목표 1개 (광추별 효율)",
        labels: ["이별이 더 아름답도록", "땀은 많이, 눈물은 적게"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "123%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "151%", efficiency3: "123%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "209%", efficiency3: "169%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "224%", efficiency3: "180%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "224%", efficiency3: "180%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "238%", efficiency3: "192%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "353%", efficiency3: "283%", description: "최종 돌파 효과" }
        ]
      },
      {
        name: "목표 3개 (광추별 효율)",
        labels: ["이별이 더 아름답도록", "땀은 많이, 눈물은 적게"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "123%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "149%", efficiency3: "121%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "230%", efficiency3: "187%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "240%", efficiency3: "194%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "240%", efficiency3: "194%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "262%", efficiency3: "212%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "350%", efficiency3: "283%", description: "최종 돌파 효과" }
        ]
      }
    ],
    eidolonEfficiency: []
  };
