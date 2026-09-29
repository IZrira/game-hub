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
    ,analysis: { status:"published", summary:"방어력 기반 누적 실드와 피격 횟수 추가 공격으로 파티를 지키는 허수 보존 캐릭터다.", role:"추가 공격 실드 탱커", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["스킬 없이도 실드를 갱신하며 효과 저항을 지원한다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["아군이 공격받지 않는 전투에서는 추가 공격 충전이 느리다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"추가 공격 파티에서 실드와 눈먼 내기 스택을 동시에 활용한다.", gameplay:{overview:"추가 공격 파티에서 실드와 눈먼 내기 스택을 동시에 활용한다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
