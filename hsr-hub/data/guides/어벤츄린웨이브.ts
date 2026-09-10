import { CharacterGuide } from './index';

export const 어벤츄린웨이브Guide: CharacterGuide = {
  characterName: "어벤츄린•웨이브",
  lastUpdated: "2026-09-09",
  patchVersion: "4.5",
  bestRelics: [
    { name: "천지를 재창조한 구세주", note: "1순위" },
    { name: "황토와 죽음의 거룻배", note: "2순위" }
  ],
  bestOrnaments: [
    { name: "영원의 땅 앰포리어스", note: "1순위" },
    { name: "회전을 멈춘 살소토", note: "2순위" }
  ],
  mainStats: {
    body: "치명타 피해 or 치명타 확률",
    boots: "속도 or 방어력",
    sphere: "양자 피해 or 방어력",
    rope: "에너지 충전 효율 or 방어력"
  },
  subStats: ["방어력", "속도", "치명타 확률", "치명타 피해"],
  targetStats: [
    { label: "방어력", value: "4000 이상" },
    { label: "속도", value: "134 이상" },
    { label: "치명타 확률", value: "70%" },
    { label: "치명타 피해", value: "140%" }
  ],
  bestLightCones: [
    { name: "운명의 벤처 게임", note: "1순위" },
    { name: "승리의 순간", note: "2순위" },
    { name: "이것이 바로 나다!", note: "3순위" }
  ],
  skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
  recommendedEidolon: "E1 / E2",
  eidolonEfficiency: []
};
