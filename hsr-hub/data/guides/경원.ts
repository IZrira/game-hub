import { CharacterGuide } from './index';

export const 경원Guide: CharacterGuide = {
    characterName: "경원",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["재와 뼈마저 불사르는 대공"],
    bestOrnaments: ["회전을 멈춘 살소토", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"스킬과 필살기로 신군의 공격 단수를 쌓아 강력한 번개 추가 공격을 만드는 지식 딜러다.",role:"소환물 추가 공격 딜러",standard:"E0 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["신군의 높은 광역·단일 혼합 화력을 보유한다."],weaknesses:["경원이 제어되면 신군 행동도 지연된다."],teamPrinciple:"행동 당기기와 제어 해제로 신군 10단을 안정적으로 만든다.",gameplay:{overview:"신군 행동 전 스킬과 필살기로 단수를 최대한 쌓는다.",tips:["신군 행동 전에 버프와 10단을 준비한다."]}}
  };
