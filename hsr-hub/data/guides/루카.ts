import { CharacterGuide } from './index';

export const 루카Guide: CharacterGuide = {
    characterName: "루카",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "유성을 쫓는 괴도"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "도적국 탈리아"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "효과 명중", value: "67%" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "필요한 건 기다림뿐", note: "1순위" },
      { name: "밤 인사와 잠든 얼굴", note: "2순위" },
      { name: "그 무수한 봄날", note: "3순위" },
      "땀방울처럼 빛나는 결심"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "106.73%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "117.81%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "127.56%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "135.99%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "140.28%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "151.62%", efficiency3: "-", description: "성흔 효과" }
    ]
    ,analysis: { status:"published", summary:"열상을 부여하고 강화 일반 공격으로 지속 피해를 즉시 발동하는 물리 공허 딜러다.", role:"단일 지속 피해 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["보스의 높은 HP에 비례한 열상 피해가 강하다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["다수전 대응력이 낮다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"스킬로 열상을 유지하고 투지를 모아 강화 일반 공격으로 정산한다.", gameplay:{overview:"스킬로 열상을 유지하고 투지를 모아 강화 일반 공격으로 정산한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
