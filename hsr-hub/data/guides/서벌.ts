import { CharacterGuide } from './index';

export const 서벌Guide: CharacterGuide = {
    characterName: "서벌",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["뇌전을 울리는 밴드", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
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
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"감전 부여와 필살기 지속 연장으로 광역 지속 피해를 유지하는 번개 지식 딜러다.",role:"광역 감전 딜러",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["광역 감전을 쉽게 유지한다."],weaknesses:["단일 화력과 고난도 성장성이 낮다."],teamPrinciple:"지속 피해 재발동 캐릭터와 조합한다.",gameplay:{overview:"스킬로 감전 후 필살기로 지속 시간을 연장한다.",tips:["감전이 끊기기 전에 갱신한다."]}}
  };
