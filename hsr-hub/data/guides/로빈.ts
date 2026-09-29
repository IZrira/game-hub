import { CharacterGuide } from './index';

export const 로빈Guide: CharacterGuide = {
    characterName: "로빈",
    lastUpdated: "2026-03-16",
    patchVersion: "2.2",
    bestRelics: ["가상공간을 누비는 메신저", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["바다에 잠긴 루샤카", "불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "공격력",
      boots: "공격력",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["공격력", "속도", "효과 저항"],
    targetStats: [
      { label: "공격력", value: "4000 이상" },
      { label: "속도", value: "120 이상" }
    ],
    bestLightCones: ["찬란하게 빛나는 밤", "거울 속 지난날의 나", "내일을 위한 여정", "누월재운의 뜻"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [], analysis: { status:"published", summary:"필살기로 파티 전체를 즉시 행동시키고 추가 피해를 부여하는 공격형 화합 서포터다.", role:"파티 행동 지원", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["전체 행동 당기기와 공격력·치명타 피해 지원이 강력하다.","협주 중 아군 공격마다 추가 피해를 준다."], weaknesses:["필살기 에너지 요구량이 높다.","협주 중 직접 행동하지 못한다."], teamPrinciple:"공격 횟수가 많은 파티에서 협주 구간에 화력을 집중한다.", gameplay:{overview:"스킬 버프를 유지하고 아군 행동 직후 필살기로 추가 턴을 만든다.",tips:["필살기는 딜러 행동 직후 사용한다.","에너지 회복을 최우선으로 확보한다."]}}
  };
