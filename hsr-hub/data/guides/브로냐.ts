import { CharacterGuide } from './index';

export const 브로냐Guide: CharacterGuide = {
    characterName: "브로냐",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도 or 공격력",
      sphere: "바람 피해 or HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["치명타 피해", "속도", "효과 저항"],
    targetStats: [
      { label: "치명타 피해", value: "180% 이상" },
      { label: "속도", value: "134 이상" },
      { label: "속도", value: "160 이상" }
    ],
    bestLightCones: ["아직 전투는 끝나지 않았다", "누월재운의 뜻", "댄스! 댄스! 댄스!", "과거와 미래"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"아군 한 명의 디버프를 해제하고 즉시 행동시키며 공격력과 치명타 피해를 지원하는 화합 캐릭터다.",role:"행동 지원 버퍼",standard:"E0 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["100% 행동 당기기와 강한 단일 버프를 제공한다."],weaknesses:["스킬 포인트 소비가 크다."],teamPrinciple:"브로냐를 딜러 바로 뒤 또는 앞에 맞춰 추가 행동을 만든다.",gameplay:{overview:"딜러 행동 후 스킬로 다시 행동시키고 필살기 버프를 겹친다.",tips:["속도 조율과 포인트 수급을 함께 계산한다."]}}
  };
