import { CharacterGuide } from './index';

export const 정운Guide: CharacterGuide = {
    characterName: "정운",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제", "가상공간을 누비는 메신저"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "방어력", "HP"],
        targetStats: [
          { label: "공격력", value: "2000" },
          { label: "속도", value: "167 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "고행의 길에 다시 오른 사제"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "공격력", "방어력", "HP"],
        targetStats: [
          { label: "공격력", value: "2600" },
          { label: "속도", value: "134 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제", "가상공간을 누비는 메신저", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["공격력", "속도", "방어력", "HP"],
    targetStats: [
      { label: "공격력", value: "2000" },
      { label: "속도", value: "167 이상" }
    ],
    bestLightCones: [
      { name: "대지로 돌아온 비행", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "2순위 (고속 세팅 시 1순위)" },
      "맞물린 톱니",
      "아직 전투는 끝나지 않았다"
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"축복으로 단일 딜러의 공격력과 추가 번개 피해를 높이고 필살기로 에너지를 공급하는 화합 캐릭터다.", role:"에너지·공격력 버퍼", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["낮은 스킬 포인트 소비로 에너지와 피해 증가를 제공한다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["내구도가 낮고 축복 대상이 한 명뿐이다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"주 딜러에게 축복을 유지하고 에너지 부족 직전에 필살기를 사용한다.", gameplay:{overview:"주 딜러에게 축복을 유지하고 에너지 부족 직전에 필살기를 사용한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
