import { CharacterGuide } from './index';

export const 웰트Guide: CharacterGuide = {
    characterName: "웰트",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "사수에 잠수한 선구자", note: "1순위" }, { name: "황무지의 도적, 황야인", note: "2순위" }],
    bestOrnaments: [{ name: "이즈모 현세와 타카마 신국", note: "1순위" }, "창공 전선 그라모스", "뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "허수 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "2500 이상" },
      { label: "효과 명중", value: "40% 이상" }
    ],
    bestLightCones: [
      { name: "바람에 흩날리는 거짓말", note: "1순위" },
      { name: "흘러가는 강가를 따라", note: "2순위" },
      "계속 내리는 비",
      "밤 인사와 잠든 얼굴",
      "땀방울처럼 빛나는 결심"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E2",
    eidolonEfficiency: []
  };
