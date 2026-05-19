import { CharacterGuide } from './index';

export const 로빈Guide: CharacterGuide = {
    characterName: "로빈",
    lastUpdated: "2026-03-16",
    patchVersion: "2.2",
    bestRelics: ["가상공간을 누비는 메신저", "깊은 감옥에 갇힌 죄수"],
    bestOrnaments: ["바다에 잠긴 루샤카", "불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "공격력",
      boots: "공격력",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["공격력", "속도", "효과 저항"],
    targetStats: [
      { label: "공격력", value: "4000 이상" },
      { label: "속도", value: "120 이상" }
    ],
    bestLightCones: ["찬란하게 빛나는 밤", "거울 속의 나", "내일의 기약", "누구의 소리인가?"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  };
