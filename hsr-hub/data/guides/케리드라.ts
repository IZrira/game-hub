import { CharacterGuide } from './index';

export const 케리드라Guide: CharacterGuide = {
    characterName: "케리드라",
    lastUpdated: "2026-03-12",
    patchVersion: "4.0",
    bestRelics: ["고행의 길에 다시 오른 사제"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "공격력 or 속도 (파이논 파티 공격력)",
      sphere: "바람 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "4000" },
      { label: "속도", value: "114 이상" },
      { label: "속도", value: "134 이상" },
      { label: "참고", value: "파이논 파티 파이논(115) → 케리드라(114) → 선데이 순서 권장" }
    ],
    bestLightCones: [
      "황금 피가 새겨진 시대",
      "거울 속 지난날의 나",
      "찬란하게 빛나는 밤",
      "영원한 미궁의 식사",
      { name: "속세에서의 유희", note: "파이논 파티 2순위" }
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: []
  };
