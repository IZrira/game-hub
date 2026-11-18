/** Shared by the initial HTML and React head; only describes available content. */
// The character page is the reference page; setting queries belong to the guide
// page (search recovery D2), so no "공략·세팅" here.
export function getWwCharacterSeo({ name, attribute = '', weaponType = '' }) {
  return {
    title: `${name} 스킬·공명 체인·육성 재료 | 명조 캐릭터 도감`,
    description: `명조 ${name}의 ${attribute} 속성·${weaponType} 무기 정보, Lv.90 기본 능력치, 기본 공격부터 반주 스킬까지의 스킬과 공명 회로, 공명 체인 1~6 효과, 돌파·스킬 육성 재료를 정리한 캐릭터 도감입니다.`,
  };
}
