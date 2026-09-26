import { CharacterGuide } from './index';

export const 어벤츄린웨이브Guide: CharacterGuide = {
  characterName: "어벤츄린•웨이브",
  lastUpdated: "2026-09-26",
  patchVersion: "4.5",
  bestRelics: [
    {
      name: "빛나는 공훈의 마법 소녀",
      note: "1순위: 치명타 피해와 방어력 무시를 제공하는 세트"
    },
    {
      name: "천명에 응해 먼 길을 떠난 점술가",
      note: "2순위: 속도와 치명타 확률, 환락도를 제공하는 세트. 파티 조합과 돌파 유무에 따라 방어력 무시 또는 감소 합계가 100%를 초과하면 사용"
    }
  ],
  bestOrnaments: [
    {
      name: "0호 스테이지 펑크 로드",
      note: "1순위: 환락도와 조건 충족 시 치명타 피해를 제공하는 차원 장신구"
    }
  ],
  mainStats: {
    body: "치명타 확률 or 치명타 피해",
    boots: "속도",
    sphere: "양자 피해 or 공격력",
    rope: "에너지 회복 효율"
  },
  subStats: ["치명타 확률", "치명타 피해", "속도"],
  targetStats: [
    { label: "치명타 확률", value: "100% 권장" },
    { label: "치명타 피해", value: "160% 이상" },
    { label: "속도", value: "180 이하" }
  ],
  bestLightCones: [
    { name: "파도에 내던진 한여름", note: "1순위: 전용 광추" },
    { name: "짧은 휴가", note: "2순위" },
    { name: "오늘의 행운", note: "3순위" }
  ],
  skillPriority: ["필살기", "특성", "환락 스킬", "일반 공격", "전투 스킬"],
  eidolonEfficiency: [],
  synergyCharacters: [
    { name: "애쉬베일", role: "메인 딜러" },
    { name: "로빈•서머레토", role: "서포터" },
    { name: "트리비", role: "서포터" },
    { name: "천야•블레이드", role: "메인 딜러" },
    { name: "히아킨", role: "힐러" },
    { name: "곽향", role: "힐러" },
    { name: "단항•등황", role: "탱커/힐러" },
    { name: "영사", role: "힐러" },
    { name: "개척자 (환락)", role: "서포터" },
    { name: "효광", role: "서포터" },
    { name: "펄", role: "메인 딜러" }
  ]
};
