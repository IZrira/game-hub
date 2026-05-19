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
  };
