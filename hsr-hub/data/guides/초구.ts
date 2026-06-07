import { CharacterGuide } from './index';

export const 초구Guide: CharacterGuide = {
    characterName: "초구",
    lastUpdated: "2026-03-15",
    patchVersion: "3.3",
    variants: [
      {
        name: "디버퍼 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "HP or 화염 피해",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "143" },
          { label: "속도", value: "167" },
          { label: "효과 명중", value: "178%" }
        ]
      },
      {
        name: "지속 피해 세팅",
        bestRelics: ["깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["즐거움에 취한 바다의 일각"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "화염 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "공격력"],
        targetStats: [
          { label: "속도", value: "143" },
          { label: "속도", value: "167" },
          { label: "효과 명중", value: "178%" },
          { label: "참고", value: "초구 2돌 이상 추천" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "HP or 화염 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "효과 명중"],
    targetStats: [
      { label: "속도", value: "143" },
      { label: "속도", value: "167" },
      { label: "효과 명중", value: "178%" }
    ],
    bestLightCones: ["그 무수한 봄날", "바람에 흩날리는 거짓말", "사냥감의 시선", "두더지파가 환영해"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  };
