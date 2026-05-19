import { CharacterGuide } from './index';

export const 개척자화합Guide: CharacterGuide = {
    characterName: "개척자 (화합)",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["꿈을 조작하는 시계공", "유성을 쫓는 괴도", "가상공간을 누비는 메신저"],
        bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "속도", value: "145 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "1순위" }, "꿈을 조작하는 시계공"],
        bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "도적국 탈리아", "겁화 연등의 연마궁"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      }
    ],
    bestRelics: ["꿈을 조작하는 시계공", "유성을 쫓는 괴도", "가상공간을 누비는 메신저", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁", { name: "생명의 바커 공", note: "고속 세팅 시 1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: [
      { name: "거울 속 지난날의 나", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "아군 행동게이지 상승 필요 시 2순위" },
      "바람을 쫓을 때",
      "기억 속 모습"
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "계산 중..." }
    ]
  };
