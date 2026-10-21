/** Shared by the initial HTML and React head; only describes available content. */
export function getWwCharacterSeo({ name, attribute = '', weaponType = '' }) {
  return {
    title: `${name} 캐릭터 공략 및 세팅 정보`,
    description: `명조 ${name}의 ${attribute} 속성·${weaponType} 무기 정보, 기본 능력치, 스킬, 공명 체인, 육성 재료와 추천 세팅을 확인하세요.`,
  };
}
