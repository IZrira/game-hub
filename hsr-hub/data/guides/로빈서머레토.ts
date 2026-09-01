import { CharacterGuide } from './index';

export const 로빈서머레토Guide: CharacterGuide = {
  characterName: "로빈•서머레토",
  lastUpdated: "2026-09-01",
  patchVersion: "4.5",
  variants: [
    {
      name: "공격력% 서포팅 세팅",
      bestLightCones: [
        { name: "그대는 나아가 노래하리니", note: "1순위" },
        { name: "무지개가 영원히 하늘에 머물길", note: "2순위" },
        { name: "기억은 영원히 막을 내리지 않는다", note: "3순위" },
        { name: "이야기의 다음 페이지", note: "4순위" }
      ],
      bestRelics: [
        { name: "천지를 재창조한 구세주", note: "1순위" },
        { name: "밤낮의 경계를 나는 매", note: "2순위 : 세이버가 고돌파인 경우" }
      ],
      bestOrnaments: [
        { name: "영원의 땅 앰포리어스", note: "1순위 : 전용 광추 사용 시" },
        { name: "생명의 바커 공", note: "2순위 : 전용 광추 없는 경우" }
      ],
      mainStats: {
        body: { value: "HP", note: "기억, 환락 파티 경우 치명타 피해" },
        boots: "속도 or HP",
        sphere: "HP",
        rope: "에너지 회복효율 or HP"
      },
      subStats: ["속도", "HP", "치명타 확률", "치명타 피해", "공격력"],
      targetStats: [
        { label: "HP", value: "8000 이상" },
        { label: "속도", value: "149 이상" },
        { label: "치명타 확률", value: "50%" }
      ],
      skillPriority: ["필살기", "기억 정령 스킬", "기억 정령 특성", "전투 스킬", "특성", "일반 공격"]
    },
    {
      name: "비 공격력% 서포팅 세팅",
      bestLightCones: [
        { name: "그대는 나아가 노래하리니", note: "1순위" },
        { name: "무지개가 영원히 하늘에 머물길", note: "2순위" },
        { name: "기억은 영원히 막을 내리지 않는다", note: "3순위" },
        { name: "이야기의 다음 페이지", note: "4순위" }
      ],
      bestRelics: [
        { name: "천지를 재창조한 구세주", note: "1순위" },
        { name: "밤낮의 경계를 나는 매", note: "2순위 : 세이버가 고돌파인 경우" }
      ],
      bestOrnaments: [
        { name: "영원의 땅 앰포리어스", note: "1순위 : 전용 광추 사용 시" },
        { name: "생명의 바커 공", note: "2순위 : 전용 광추 없는 경우" }
      ],
      mainStats: {
        body: { value: "HP or 공격력", note: "기억, 환락 파티 경우 치명타 피해" },
        boots: "속도",
        sphere: "HP",
        rope: "에너지 회복효율"
      },
      subStats: ["속도", "HP", "치명타 확률", "치명타 피해", "공격력"],
      targetStats: [
        { label: "HP", value: "6500 이상" },
        { label: "속도", value: "160 이상" },
        { label: "치명타 확률", value: "50%" }
      ],
      skillPriority: ["필살기", "기억 정령 스킬", "기억 정령 특성", "전투 스킬", "특성", "일반 공격"]
    }
  ],
  bestRelics: [
    { name: "천지를 재창조한 구세주", note: "1순위" },
    { name: "밤낮의 경계를 나는 매", note: "2순위 : 세이버가 고돌파인 경우" }
  ],
  bestOrnaments: [
    { name: "영원의 땅 앰포리어스", note: "1순위 : 전용 광추 사용 시" },
    { name: "생명의 바커 공", note: "2순위 : 전용 광추 없는 경우" }
  ],
  mainStats: {
    body: { value: "HP", note: "기억, 환락 파티 경우 치명타 피해" },
    boots: "속도 or HP",
    sphere: "HP",
    rope: "에너지 회복효율 or HP"
  },
  subStats: ["속도", "HP", "치명타 확률", "치명타 피해", "공격력"],
  targetStats: [
    { label: "HP", value: "8000 이상" },
    { label: "속도", value: "149 이상" },
    { label: "치명타 확률", value: "50%" }
  ],
  bestLightCones: [
    { name: "그대는 나아가 노래하리니", note: "1순위" },
    { name: "무지개가 영원히 하늘에 머물길", note: "2순위" },
    { name: "기억은 영원히 막을 내리지 않는다", note: "3순위" },
    { name: "이야기의 다음 페이지", note: "4순위" }
  ],
  skillPriority: ["필살기", "기억 정령 스킬", "기억 정령 특성", "전투 스킬", "특성", "일반 공격"],
  recommendedEidolon: "E1 / E2 / E6",
  eidolonEfficiency: []
};
