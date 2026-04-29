import { CharacterGuide } from './index';

export const 카프카Guide: CharacterGuide = {
    characterName: "카프카",
    lastUpdated: "2026-03-15",
    patchVersion: "3.5",
    variants: [
      {
        name: "기본",
        bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
        mainStats: {
          body: "공격력 or 효과 명중",
          boots: "속도",
          sphere: "번개 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["효과 명중", "속도", "공격력"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "효과 명중", value: "75%" }
        ]
      },
      {
        name: "4돌파 이상",
        bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
        mainStats: {
          body: "공격력 or 효과 명중",
          boots: "속도",
          sphere: "번개 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "167 이상" },
          { label: "효과 명중", value: "75%" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
    mainStats: {
      body: "공격력 or 효과 명중",
      boots: "속도",
      sphere: "번개 피해 or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "효과 명중", value: "75%" }
    ],
    bestLightCones: ["초보자 임무 시작 전", "필요한 건 기다림뿐", "바람에 흩날리는 거짓말", "그 무수한 봄날", "땀방울처럼 빛나는 결심"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  };
