import { CharacterGuide } from './index';

export const 블레이드Guide: CharacterGuide = {
    characterName: "블레이드",
    lastUpdated: "2026-03-16",
    patchVersion: "1.2",
    bestRelics: ["가상공간을 누비는 메신저", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토", "뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or HP",
      sphere: "바람 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "7000 이상" },
      { label: "치명타 확률", value: "70%" }
    ],
    bestLightCones: ["닿을 수 없는 저편", "어떤 에이언즈의 몰락", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [], analysis: { status:"published", summary:"자신의 HP를 소모하고 피격·소모 횟수로 추가 공격을 발동하는 바람 파멸 딜러다.", role:"HP 소모 메인 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["스킬 포인트 소비가 적고 자체 회복이 있다.","피격이 화력과 추가 공격으로 연결된다."], weaknesses:["실드가 피격 기반 순환을 방해한다.","HP·치명타를 함께 맞춰야 한다."], teamPrinciple:"실드보다 회복을 사용하고 HP·행동 지원을 제공한다.", gameplay:{overview:"강화 일반 공격을 유지하며 5스택 추가 공격을 회수한다.",tips:["전투 스킬은 공격 턴 전에 갱신한다.","피격 기회를 지나치게 차단하지 않는다."]}}
  };
