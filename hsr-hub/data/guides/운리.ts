import { CharacterGuide } from './index';

export const 운리Guide: CharacterGuide = {
    characterName: "운리",
    lastUpdated: "2026-03-17",
    patchVersion: "3.0",
    bestRelics: [
      { name: "바람과 구름을 가르는 용맹함", note: "1순위" },
      { name: "스트리트 격투왕", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      { name: "회전을 멈춘 살소토", note: "2순위" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 이상" },
      { label: "치명타 피해", value: "120% 이상" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: [
      { name: "해 질 무렵 시작되는 춤", note: "1순위" },
      { name: "대체할 수 없는 것", note: "2순위" },
      { name: "어떤 에이언즈의 몰락", note: "3순위" }
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  };
