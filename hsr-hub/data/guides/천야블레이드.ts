import { CharacterGuide } from './index';

export const 천야블레이드Guide: CharacterGuide = {
  characterName: "천야•블레이드",
  lastUpdated: "2026-07-29",
  patchVersion: "4.3",
  variants: [
    {
      name: "서브 딜러 세팅",
      bestRelics: ["신공을 탐구하는 명장"],
      bestOrnaments: ["고요한 습골지", "생명의 바커 공"],
      bestLightCones: [
        { name: "연옥을 불사른 새로운 몸", note: "1순위" },
        { name: "밤 인사와 잠든 얼굴", note: "2순위" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
      mainStats: {
        body: "치명타 확률",
        boots: "속도 or HP",
        sphere: "화염 속성 피해 or HP (전용 광추 없을 경우 HP)",
        rope: "에너지 회복 효율"
      },
      subStats: ["속도", "공격력", "치명타 확률", "치명타 피해"],
      targetStats: [
        { label: "속도", value: "141+", note: "최소 속도 (이상 중재 포함)" },
        { label: "HP", value: "6000+" }
      ]
    },
    {
      name: "서포터 세팅",
      bestRelics: [
        { name: "밤낮의 경계를 나는 매", note: "속도 168 이상" },
        { name: "눈보라에 맞서는 철위대", note: "3 서포터 파티 한정 사용" }
      ],
      bestOrnaments: ["생명의 바커 공"],
      bestLightCones: [
        { name: "연옥을 불사른 새로운 몸", note: "1순위" },
        { name: "바람에 흩날리는 거짓말", note: "2순위 (속도 170 이상 필수)" },
        { name: "땀방울처럼 빛나는 결심", note: "3순위" },
        { name: "초보자 임무 시작 전", note: "4순위" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
      mainStats: {
        body: "치명타 확률",
        boots: "속도",
        sphere: "HP",
        rope: "에너지 회복 효율"
      },
      subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
      targetStats: [
        { label: "속도", value: "168+", note: "최소 속도 (이상 중재 포함)" },
        { label: "속도 (바람에 흩날리는 거짓말)", value: "170+", note: "광추 '바람에 흩날리는 거짓말' 한정" }
      ]
    }
  ],
  // 공통 설정 (가이드 규격 상 필수값이므로 서브 딜러 세팅을 기본으로 작성)
  bestRelics: ["신공을 탐구하는 명장"],
  bestOrnaments: ["생명의 바커 공", "고요한 습골지"],
  bestLightCones: ["연옥을 불사른 새로운 몸", "밤 인사와 잠든 얼굴"],
  mainStats: {
    body: "치명타 확률",
    boots: "속도 or HP",
    sphere: "화염 속성 피해 or HP",
    rope: "에너지 회복 효율"
  },
  subStats: ["속도", "치명타 확률", "치명타 피해", "HP", "공격력"],
  targetStats: [
    { label: "속도", value: "141+ / 168+" },
    { label: "HP", value: "6000+" }
  ],
  skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
  eidolonEfficiency: []
};
