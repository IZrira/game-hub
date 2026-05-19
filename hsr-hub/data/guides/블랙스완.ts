import { CharacterGuide } from './index';

export const 블랙스완Guide: CharacterGuide = {
    characterName: "블랙 스완",
    lastUpdated: "2026-03-11",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "사수에 잠수한 선구자"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "범은하 상사"],
    mainStats: {
      body: "효과 명중 or 공격력",
      boots: "속도 or 공격력",
      sphere: "바람 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "효과 명중", value: "120% 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: [
      "시간의 기억에 대한 재구성",
      "그 무수한 봄날",
      "사냥감의 시선",
      "쇼타임",
      { name: "바다는 왜 노래하는가", note: "블랙 스완 1돌파 시 고려" }
    ],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  };
