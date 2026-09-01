import { CharacterGuide } from './index';

export const 세이버Guide: CharacterGuide = {
  characterName: "세이버",
  lastUpdated: "2026-09-01",
  patchVersion: "4.4",
  variants: [
    {
      name: "연계 딜러 및 하이퍼캐리 세팅",
      bestLightCones: [
        { name: "보답 없는 왕관", note: "1순위" },
        { name: "어떤 에이언즈의 몰락", note: "2순위" },
        { name: "과거의 핏자국", note: "3순위" }
      ],
      bestRelics: [
        { name: "지식의 바다에 빠진 학자", note: "1순위" },
        { name: "밤낮의 경계를 나는 매", note: "2순위 : 세이버가 고돌파인 경우" }
      ],
      bestOrnaments: [
        { name: "우주 생명과학연구원", note: "1순위" },
        { name: "회전을 멈춘 살소토", note: "2순위" }
      ],
      mainStats: {
        body: "치명타 피해 or 치명타 확률",
        boots: "속도 or 공격력",
        sphere: "바람 속성 피해 or 공격력",
        rope: "공격력"
      },
      subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
      targetStats: [
        { label: "공격력", value: "2200 이상" },
        { label: "속도", value: "134 이상" },
        { label: "치명타 확률", value: "80%", note: "특성에 치명타 확률 20% 있기 때문에 80%까지" },
        { label: "치명타 피해", value: "200% 이상" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"]
    }
  ],
  bestRelics: [
    { name: "지식의 바다에 빠진 학자", note: "1순위" },
    { name: "밤낮의 경계를 나는 매", note: "2순위 : 세이버가 고돌파인 경우" }
  ],
  bestOrnaments: [
    { name: "우주 생명과학연구원", note: "1순위" },
    { name: "회전을 멈춘 살소토", note: "2순위" }
  ],
  mainStats: {
    body: "치명타 피해 or 치명타 확률",
    boots: "속도 or 공격력",
    sphere: "바람 속성 피해 or 공격력",
    rope: "공격력"
  },
  subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
  targetStats: [
    { label: "공격력", value: "2200 이상" },
    { label: "속도", value: "134 이상" },
    { label: "치명타 확률", value: "80%", note: "특성에 치명타 확률 20% 있기 때문에 80%까지" },
    { label: "치명타 피해", value: "200% 이상" }
  ],
  bestLightCones: [
    { name: "보답 없는 왕관", note: "1순위" },
    { name: "어떤 에이언즈의 몰락", note: "2순위" },
    { name: "과거의 핏자국", note: "3순위" }
  ],
  skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
  recommendedEidolon: "E2 / E6",
  eidolonEfficiency: [
    { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
    { level: 1, impact: "Medium", efficiency1: "112.00%", efficiency3: "115.00%", description: "성흔 효과" },
    { level: 2, impact: "High", efficiency1: "125.00%", efficiency3: "128.00%", description: "성흔 효과" },
    { level: 3, impact: "Medium", efficiency1: "132.00%", efficiency3: "135.00%", description: "스킬 레벨 상승" },
    { level: 4, impact: "Medium", efficiency1: "138.00%", efficiency3: "142.00%", description: "성흔 효과" },
    { level: 5, impact: "Medium", efficiency1: "145.00%", efficiency3: "150.00%", description: "스킬 레벨 상승" },
    { level: 6, impact: "High", efficiency1: "168.00%", efficiency3: "175.00%", description: "성흔 효과" }
  ]
};
