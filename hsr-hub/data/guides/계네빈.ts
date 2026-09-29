import { CharacterGuide } from './index';

export const 계네빈Guide: CharacterGuide = {
    characterName: "계네빈",
    lastUpdated: "2026-03-16",
    patchVersion: "1.4",
    bestRelics: ["깊은 감옥에 수감된 죄수", "용암 단조의 화장(火匠)"],
    bestOrnaments: ["창공 전선 그라모스", "우주 봉인 정거장"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "화염 피해",
      rope: "공격력"
    },
    subStats: ["속도", "공격력", "효과 명중"],
    targetStats: [
      { label: "공격력", value: "3000" },
      { label: "속도", value: "134" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: ["필요한 건 기다림뿐", "밤 인사와 잠든 얼굴", "고독의 치유", "페르마타"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [], analysis: { status:"published", summary:"연소를 부여하고 불쇼 중첩으로 적이 받는 피해를 높이는 화염 지속 피해 서브 딜러다.", role:"지속 피해 디버퍼", standard:"E6 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["광역 연소와 받는 피해 증가를 제공한다.","필살기로 기존 연소 피해를 즉시 발동한다."], weaknesses:["효과 명중과 공격력을 함께 요구한다.","연소 면역·저항 적에게 약하다."], teamPrinciple:"카프카 등 지속 피해를 재발동하는 딜러와 조합한다.", gameplay:{overview:"스킬로 연소를 유지하고 중첩이 쌓인 뒤 필살기로 정산한다.",tips:["연소가 끊기지 않게 한다.","불쇼 중첩 후 폭딜한다."]}}
  };
