import { CharacterGuide } from './index';

export const 닥터레이시오Guide: CharacterGuide = {
    characterName: "Dr. 레이시오",
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
    eidolonEfficiency: [], analysis: { status:"published", summary:"적의 디버프 수에 따라 추가 공격 확률과 피해가 증가하는 허수 단일 딜러다.", role:"디버프 연계 추가 공격 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["조건 충족 시 높은 빈도의 단일 추가 공격을 한다.","필살기로 동료 공격에도 추가 공격을 연계한다."], weaknesses:["적 디버프 수가 부족하면 추가 공격이 불안정하다.","다수전 대응력이 낮다."], teamPrinciple:"지속적으로 여러 디버프를 거는 공허 캐릭터와 편성한다.", gameplay:{overview:"디버프를 먼저 쌓고 스킬과 필살기로 추론 추가 공격을 반복한다.",tips:["공격 전 디버프 수를 확인한다.","필살기 표식 횟수를 동료 공격으로 소모한다."]}}
};
