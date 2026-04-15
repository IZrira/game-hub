import { CharacterGuide } from './index';

export const 계네빈Guide: CharacterGuide = {
    characterName: "계네빈",
    lastUpdated: "2026-03-16",
    patchVersion: "1.4",
    bestRelics: ["깊은 감옥에 갇힌 죄수", "화염을 누비는 대장장이"],
    bestOrnaments: ["창공 전선 그라모스", "우주 봉인 정거장"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "화염 피해",
      rope: "공격력"
    },
    subStats: ["속도", "공격력", "효과 명중"],
    targetStats: [
      { label: "공격력", value: "3000" },
      { label: "속도", value: "134" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: ["인내심만 있으면 돼", "밤의 인사와 잠든 얼굴", "고독하게 치유되는 것", "페르마타"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  };
