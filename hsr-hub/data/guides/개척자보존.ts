import { CharacterGuide } from './index';

export const 개척자보존Guide: CharacterGuide = {
    characterName: "개척자 (보존)",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "정토 교황의 팔라딘", note: "1순위" }],
    bestOrnaments: [{ name: "부러진 용골", note: "1순위" }, "불로인의 선주", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도",
      sphere: "방어력",
      rope: "방어력"
    },
    subStats: ["방어력", "효과 명중", "속도", "HP"],
    targetStats: [
      { label: "방어력", value: "2500 이상" },
      { label: "효과 저항", value: "70%" },
      { label: "속도", value: "135 이상" }
    ],
    bestLightCones: [
      { name: "승리의 순간", note: "1순위" },
      { name: "랜도의 선택", note: "2순위" },
      { name: "기억의 소재", note: "3순위" },
      "여생의 첫날"
    ],
    skillPriority: ["필살기", "특성", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  };
