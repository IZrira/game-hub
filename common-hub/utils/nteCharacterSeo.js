/** Shared by initial HTML and React. Language queries share the Korean canonical. */
export function getNteCharacterSeo(name) {
  return {
    title: `${name} 종결 세팅 · 추천 파티 조합 & 스킬 매커니즘 | 이환(NTE) 공략 DB`,
    description: `이환(NTE) ${name}의 속성, 기본 스탯, 스킬·각성 효과와 아크·콘솔 세팅 및 육성 재료를 확인하세요.`,
    url: `/gallery/nte/character/${encodeURIComponent(name)}`,
  };
}
