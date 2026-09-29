import { CharacterGuide } from './index';

export const 블랙스완Guide: CharacterGuide = {
    characterName: "블랙 스완",
    lastUpdated: "2026-03-11",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "사수에 잠수한 선구자"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "범은하 상사"],
    mainStats: {
      body: "효과 명중 or 공격력",
      boots: "속도 or 공격력",
      sphere: "바람 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "효과 명중", value: "120% 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: [
      "시간의 기억에 대한 재구성",
      "그 무수한 봄날",
      "사냥감의 시선",
      "쇼타임",
      { name: "바다는 왜 노래하는가", note: "블랙 스완 1돌파 시 고려" }
    ],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"아르카나 중첩을 쌓아 적 턴에 광역 지속 피해와 방어 감소를 발생시키는 바람 공허 딜러다.", role:"지속 피해 핵심 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["여러 지속 피해로 아르카나를 빠르게 쌓을수록 강해진다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["지속 피해 동료가 없으면 중첩 속도와 고점이 낮다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"카프카 등 지속 피해 발동 캐릭터와 아르카나를 누적한다.", gameplay:{overview:"카프카 등 지속 피해 발동 캐릭터와 아르카나를 누적한다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
