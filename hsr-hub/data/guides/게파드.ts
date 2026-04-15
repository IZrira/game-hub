import { CharacterGuide } from './index';

export const 게파드Guide: CharacterGuide = {
    characterName: "게파드",
    lastUpdated: "2026-03-14",
    patchVersion: "3.6",
    bestRelics: [
      { name: "별빛에 숨은 은둔자", note: "1순위" },
      { name: "정토 교황의 팔라딘", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "부러진 용골", note: "1순위" },
      "불로인의 선주",
      "바다에 잠긴 루샤카"
    ],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도 or 방어력",
      sphere: "방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["방어력", "효과 저항", "효과 명중", "속도"],
    targetStats: [
      { label: "방어력", value: "3000 이상" },
      { label: "효과 저항", value: "70%" }
    ],
    bestLightCones: [
      { name: "언제나 여정이 평탄하기를", note: "1순위" },
      { name: "승리의 순간", note: "2순위" },
      { name: "여생의 첫날", note: "3순위" },
      { name: "랜도의 선택", note: "어그로 필요 시" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  };
