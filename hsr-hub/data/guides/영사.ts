import { CharacterGuide } from './index';

export const 영사Guide: CharacterGuide = {
    characterName: "영사",
    lastUpdated: "2026-03-15",
    patchVersion: "3.6",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["곤충 재앙을 잠재우는 철기군", "태양과 번개의 여전사"],
        bestOrnaments: ["겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치유량 증가 or 공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율 or 격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "공격력"],
        targetStats: [
          { label: "속도", value: "139 이상" },
          { label: "격파 특수효과", value: "130% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도 or HP",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "HP", "효과 저항", "방어력"],
        targetStats: [
          { label: "속도", value: "160 이상" }
        ]
      }
    ],
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "밤낮의 경계를 나는 매", "태양과 번개의 여전사"],
    bestOrnaments: ["겁화 연등의 연마궁", "생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or 공격력",
      boots: "속도",
      sphere: "공격력 or HP",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "공격력"],
    targetStats: [
      { label: "속도", value: "139 이상" },
      { label: "격파 특수효과", value: "130% 이상" }
    ],
    bestLightCones: ["오직 향만이 변함없이", { name: "등가교환", note: "전부 에너지 충전 필요 시" }, "수술 후의 대화", "무엇이 진실인가", { name: "관의 울림", note: "고속 세팅 1순위" }],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  };
