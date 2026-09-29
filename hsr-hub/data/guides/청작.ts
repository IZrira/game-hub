import { CharacterGuide } from './index';

export const 청작Guide: CharacterGuide = {
    characterName: "청작",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["경기장", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"스킬 포인트를 소비해 패를 맞추고 강화 일반 공격과 불구인 추가 공격을 노리는 양자 지식 딜러다.",role:"스킬 포인트 소비 광역 딜러",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["고점의 강화 공격 피해가 매우 높다."],weaknesses:["패와 불구인 발동의 무작위성이 크다."],teamPrinciple:"스킬 포인트를 대량 공급하는 지원과 편성한다.",gameplay:{overview:"스킬을 반복해 자버프를 쌓고 패가 완성되면 강화 공격한다.",tips:["파티 포인트를 청작 턴에 남긴다."]}}
  };
