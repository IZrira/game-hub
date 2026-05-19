import { CharacterGuide } from './index';

export const 개척자기억Guide: CharacterGuide = {
    characterName: "개척자 (기억)",
    lastUpdated: "2026-03-17",
    patchVersion: "3.6",
    variants: [
      {
        name: "카스토리스 파티 세팅",
        bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
        bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율 or HP"
        },
        subStats: ["속도", "치명타 피해", "HP"],
        targetStats: [
          { label: "속도", value: "143 이상" },
          { label: "HP", value: "5000 이상" }
        ]
      },
      {
        name: "범용 세팅",
        bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
        bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 얼음 피해",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해", "HP"],
        targetStats: [
          { label: "속도", value: "143 이상" },
          { label: "치명타 피해", value: "150% 이상" }
        ]
      }
    ],
    bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
    bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 치명타 피해",
      boots: "속도",
      sphere: "HP or 얼음 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해", "HP"],
    targetStats: [
      { label: "속도", value: "143 이상" },
      { label: "HP", value: "5000 이상" },
      { label: "치명타 피해", value: "150% 이상" }
    ],
    bestLightCones: [
      { name: "이 순간처럼 영원한 사랑", note: "1순위" },
      { name: "무지개가 영원히 하늘에 머물길", note: "2순위" },
      { name: "핑크빛 내일을 향해", note: "3순위" },
      "기억은 영원히 막을 내리지 않는다"
    ],
    skillPriority: ["필살기", "특성", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  };
