import { CharacterGuide } from './index';

export const 에바네시아Guide: CharacterGuide = {
    characterName: "에바네시아",
    lastUpdated: "2026-05-30",
    patchVersion: "4.2",
    bestRelics: ["빛나는 공훈의 마법 소녀"],
    bestOrnaments: ["0호 스테이지 펑크 로드"],
    mainStats: {
      body: "치명타 피해",
      boots: "공격력",
      sphere: "물리 속성 피해 증가 or 공격력",
      rope: "에너지 회복 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%", note: "효광 전용 광추 장착 시 60%" }
    ],
    bestLightCones: [
      "다음 꽃피는 계절의 만남",
      "눈부신 파키의 세상",
      "미래엔 우리가 함께할 거야",
      "슈룸 모험기"
    ],
    skillPriority: ["특성", "환락 스킬", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
  };
