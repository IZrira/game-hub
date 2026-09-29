import { CharacterGuide } from './index';

export const 아스타Guide: CharacterGuide = {
    characterName: "아스타",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 공격력",
      boots: "속도",
      sphere: "화염 피해 or HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "격파 특수효과", "공격력", "HP"],
    targetStats: [
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: ["아직 전투는 끝나지 않았다", "누월재운의 뜻", "댄스! 댄스! 댄스!", "기억 속 모습", "행성과의 만남"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"다단 스킬로 충전을 쌓아 파티 공격력을 높이고 필살기로 전체 속도를 지원하는 화합 캐릭터다.",role:"공격력·속도 버퍼",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["파티 전체에 큰 속도 버프를 제공한다."],weaknesses:["적 수와 약점에 따라 충전 유지가 흔들린다."],teamPrinciple:"화염 약점 다수전 또는 속도 임계점이 필요한 파티에 사용한다.",gameplay:{overview:"스킬로 충전을 쌓고 필살기로 핵심 행동 구간을 앞당긴다.",tips:["충전 감소 전에 다시 적을 공격한다."]}}
  };
