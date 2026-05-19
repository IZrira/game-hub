import { CharacterGuide } from './index';

export const 어벤츄린Guide: CharacterGuide = {
    characterName: "어벤츄린",
    lastUpdated: "2026-03-10",
    patchVersion: "4.0",
    bestRelics: ["별빛에 숨은 은둔자", "사수에 잠수한 선구자", "정토 교황의 팔라딘"],
    bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
    mainStats: {
      body: "방어력",
      boots: "속도",
      sphere: "방어력",
      rope: "방어력 or\n에너지 충전 효율"
    },
    subStats: ["방어력", "효과 저항", "속도"],
    targetStats: [
      { label: "방어력", value: "4500 이상" },
      { label: "속도", value: "134 이상" }
    ],
    variants: [
      {
        name: "기본",
        bestRelics: ["별빛에 숨은 은둔자", "사수에 잠수한 선구자", "정토 교황의 팔라딘"],
        bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
        mainStats: {
          body: "방어력",
          boots: "속도",
          sphere: "방어력",
          rope: "방어력 or\n에너지 충전 효율"
        },
        subStats: ["방어력", "효과 저항", "속도"],
        targetStats: [
          { label: "방어력", value: "4500 이상" },
          { label: "속도", value: "134 이상" }
        ]
      },
      {
        name: "서브 딜러 세팅",
        bestRelics: ["별빛에 숨은 은둔자", "사수에 잠수한 선구자"],
        bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골"],
        mainStats: {
          body: "치명타 피해 or\n방어력",
          boots: "속도 or\n방어력",
          sphere: "방어력",
          rope: "방어력 or\n에너지 충전 효율"
        },
        subStats: ["방어력", "치명타 확률", "치명타 피해", "HP"],
        targetStats: [
          { label: "방어력", value: "4000 이상" },
          { label: "속도", value: "134 이상" },
          { label: "치명타 확률", value: "52%", note: "1돌파 시 에충 매듭 권장" }
        ]
      }
    ],
    bestLightCones: ["언제나 불공평한 운명", "언제나 여정이 평탄하기를", "승리의 순간", "여생의 첫날", { name: "우주 시장 동향", note: "아케론 파티 사용 시" }],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    eidolonEfficiency: []
  };
