import { CharacterGuide } from './index';

export const Mar7thGuide: CharacterGuide = {
    characterName: "Mar. 7th",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["정토 교황의 팔각 모자"],
    bestOrnaments: ["벨로보그의 건설 공정", "부러진 용골"],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도 or 방어력",
      sphere: "방어력",
      rope: "방어력 or 에너지 충전 효율"
    },
    subStats: ["방어력", "효과 명중", "속도", "HP"],
    targetStats: [
      { label: "방어력", value: "3000 이상" },
      { label: "효과 명중", value: "50% 이상" }
    ],
    bestLightCones: ["승리의 순간", "기억의 소재", { name: "랜도의 선택", note: "어그로 필요 시" }, "이게 바로 나야!", "엠버"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  };
