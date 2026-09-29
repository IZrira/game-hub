import { CharacterGuide } from './index';

export const 아를란Guide: CharacterGuide = {
    characterName: "아를란",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["뇌전을 울리는 밴드", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["어떤 에이언즈의 몰락", "대체할 수 없는 것", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"스킬 포인트 대신 HP를 소비하고 낮은 체력에서 피해가 증가하는 번개 파멸 딜러다.",role:"저체력 딜러",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["스킬 포인트를 사용하지 않는다."],weaknesses:["저체력 유지가 매우 위험하다."],teamPrinciple:"체력을 회복하지 않고 보호할 강한 실드와 편성한다.",gameplay:{overview:"실드 아래 낮은 HP를 유지해 피해 증가를 받는다.",tips:["실드 공백에서 공격하지 않는다."]}}
  };
