import { CharacterGuide } from './index';

export const 길가메시Guide: CharacterGuide = {
  characterName: "길가메시",
  lastUpdated: "2026-07-29",
  patchVersion: "4.4",
  variants: [
    {
      name: "연계 딜러 및 하이퍼캐리 세팅",
      bestRelics: [
        { name: "지식의 바다에 빠진 학자", note: "1순위" },
        { name: "밤낮의 경계를 나는 매", note: "2순위 (세이버가 고돌파인 경우)" }
      ],
      bestOrnaments: [
        { name: "우주 생명과학연구원", note: "1순위" },
        { name: "생명의 바커 공", note: "2순위 (세이버가 고돌파인 경우)" }
      ],
      bestLightCones: [
        { name: "보이는 것이 곧 나", note: "1순위" },
        { name: "어떤 에이언즈의 몰락", note: "2순위" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
      mainStats: {
        body: "치명타 확률",
        boots: "속도 or 공격력",
        sphere: "번개 속성 피해 or 공격력",
        rope: "공격력"
      },
      subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
      targetStats: [
        { label: "공격력", value: "4400+" },
        { label: "속도", value: "134+" },
        { label: "치명타 확률", value: "100%" },
        { label: "치명타 피해", value: "160%+" }
      ]
    }
  ],
  // Default shared stats (Required by type)
  bestRelics: ["지식의 바다에 빠진 학자"],
  bestOrnaments: ["우주 생명과학연구원"],
  bestLightCones: ["보이는 것이 곧 나", "어떤 에이언즈의 몰락"],
  skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
  mainStats: {
    body: "치명타 확률",
    boots: "속도 or 공격력",
    sphere: "번개 속성 피해 or 공격력",
    rope: "공격력"
  },
  subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
  targetStats: [
    { label: "공격력", value: "4400+" },
    { label: "속도", value: "134+" },
    { label: "치명타 확률", value: "100%" },
    { label: "치명타 피해", value: "160%+" }
  ],
  eidolonEfficiency: []
};
