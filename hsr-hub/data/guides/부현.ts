import { CharacterGuide } from './index';

export const 부현Guide: CharacterGuide = {
    characterName: "부현",
    lastUpdated: "2026-03-14",
    patchVersion: "3.4",
    bestRelics: [
      "태양과 번개의 여전사",
      { name: "장수를 원하는 제자", note: "2세트" },
      { name: "가상공간을 누비는 메신저", note: "2세트" },
      { name: "고행의 길에 다시 오른 사제", note: "2세트" },
      { name: "눈보라에 맞서는 철위대", note: "2세트" }
    ],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "꿈의 땅 페나코니", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "HP", value: "8000" }
    ],
    bestLightCones: [
      { name: "그녀는 두 눈을 감았네", note: "1순위" },
      { name: "승리의 순간", note: "2순위" },
      { name: "기억의 소재", note: "3순위" },
      "여생의 첫날",
      { name: "랜도의 선택", note: "어그로 필요 시" },
      { name: "우주 시장 동향", note: "아케론 파티 사용 시" }
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: []
  };
