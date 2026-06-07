import { CharacterGuide } from './index';

export const 트리비Guide: CharacterGuide = {
    characterName: "트리비",
    lastUpdated: "2026-03-17",
    patchVersion: "3.1",
    variants: [
      {
        name: "저속 세팅",
        bestRelics: ["망국을 애도하는 시인"],
        bestOrnaments: ["고요한 습골지", "바다에 잠긴 루샤카", "생명의 바커 공"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or HP",
          boots: "HP",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["치명타 피해", "치명타 확률", "HP"],
        targetStats: [
          { label: "속도", value: "95 미만" },
          { label: "HP", value: "6000 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "1순위" }, "망국을 애도하는 시인"],
        bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "고요한 습골지", "바다에 잠긴 루샤카"],
        bestLightCones: [{ name: "댄스! 댄스! 댄스!", note: "1순위" }, "시간이 한 송이 꽃이라면", "맞물린 톱니"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or HP",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["치명타 피해", "치명타 확률", "HP"],
        targetStats: [
          { label: "속도", value: "141 이상" },
          { label: "치명타 확률", value: "60" },
          { label: "치명타 피해", value: "120" }
        ]
      }
    ],
    bestRelics: ["망국을 애도하는 시인", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: ["고요한 습골지", "바다에 잠긴 루샤카", { name: "생명의 바커 공", note: "고속 세팅 시 1순위" }],
    mainStats: {
      body: "치명타 피해 or 치명타 확률 or HP",
      boots: "HP or 속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["치명타 피해", "치명타 확률", "HP"],
    targetStats: [
      { label: "속도", value: "95 미만" },
      { label: "속도", value: "141 이상" },
      { label: "HP", value: "6000 이상" }
    ],
    bestLightCones: [
      { name: "시간이 한 송이 꽃이라면", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "2순위 (고속 세팅 시 1순위)" },
      { name: "맞물린 톱니", note: "3순위" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonVariants: [
      {
        name: "1개체 (광추별 효율)",
        labels: ["시간이 한 송이 꽃이라면", "댄스! 댄스! 댄스!"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "139%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "173%", efficiency3: "124%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "322%", efficiency3: "231%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "360%", efficiency3: "259%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "398%", efficiency3: "286%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "409%", efficiency3: "294%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "529%", efficiency3: "380%", description: "최종 돌파 효과" }
        ]
      },
      {
        name: "3개체 (광추별 효율)",
        labels: ["시간이 한 송이 꽃이라면", "댄스! 댄스! 댄스!"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "139%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "173%", efficiency3: "124%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "241%", efficiency3: "173%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "269%", efficiency3: "193%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "297%", efficiency3: "214%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "306%", efficiency3: "220%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "425%", efficiency3: "305%", description: "최종 돌파 효과" }
        ]
      }
    ],
    eidolonEfficiency: []
  };
