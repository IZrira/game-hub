import { CharacterGuide } from './index';

export const Mar7thGuide: CharacterGuide = {
    characterName: "Mar. 7th",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["정토 교황의 팔라딘"],
    bestOrnaments: ["축성가의 벨로보그", "부러진 용골"],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도 or 방어력",
      sphere: "방어력",
      rope: "방어력 or 에너지 충전 효율"
    },
    subStats: ["방어력", "효과 명중", "속도", "HP"],
    targetStats: [
      { label: "방어력", value: "3000 이상" },
      { label: "효과 명중", value: "50% 이상" }
    ],
    bestLightCones: ["승리의 순간", "기억의 소재", { name: "랜도의 선택", note: "어그로 필요 시" }, "이게 바로 나야!", "앰버"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"단일 아군에게 어그로 실드를 제공하고 피격에 반격하며 필살기로 적 전체를 빙결하는 보존 캐릭터다.",role:"단일 실드·빙결 지원",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["지속 시간이 긴 단일 실드와 해제를 제공한다."],weaknesses:["파티 전체 광역 피해 대응이 약하다."],teamPrinciple:"피격을 원하는 아군에게 실드를 부여해 반격을 유도한다.",gameplay:{overview:"핵심 아군의 실드를 유지하고 위험 구간에 필살기로 빙결한다.",tips:["원치 않는 아군의 어그로를 높이지 않는다."]}}
  };
