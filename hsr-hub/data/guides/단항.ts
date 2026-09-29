import { CharacterGuide } from './index';

export const 단항Guide: CharacterGuide = {
    characterName: "단항",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["밤낮의 경계를 나는 매"],
    bestOrnaments: ["회전을 멈춘 살소토", "뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["야경 속에서", "별바다 순항", "논검", "침묵만이"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"치명타로 적을 감속하고 감속 대상에게 강화 필살기를 사용하는 바람 수렵 딜러다.",role:"단일 감속 딜러",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["감속과 높은 단일 필살기 배율을 보유한다."],weaknesses:["치명타 실패 시 감속 연계가 끊긴다."],teamPrinciple:"단항을 직접 지정하는 버프로 저항 관통 특성을 발동한다.",gameplay:{overview:"스킬 치명타로 감속 후 필살기를 사용한다.",tips:["필살기 전 감속 여부를 확인한다."]}}
  };
