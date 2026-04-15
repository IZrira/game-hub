import { CharacterGuide } from './index';

export const 닥터레이시오Guide: CharacterGuide = {
    characterName: "닥터 레이시오",
    lastUpdated: "2026-03-16",
    patchVersion: "1.6",
    bestRelics: ["사수에 잠수한 선구자", "황토와 죽음의 거룻배"],
    bestOrnaments: ["회전을 멈춘 살소토", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "허수 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "75%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["순수 사유의 세례", "고민, 그리고 행복", "별바다 순항", "논검"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  };
