/** Shared by initial HTML and React. Language queries share the Korean canonical. */
export function getNteCharacterSeo(name) {
  return {
    // Character reference page; setting queries belong to the build guide (search recovery D2).
    title: `${name} 스킬·각성·육성 재료 | 이환(NTE) 캐릭터 도감`,
    description: `이환(NTE) ${name}의 속성, 기본 스탯, 스킬·각성 효과와 육성 재료를 정리한 캐릭터 도감입니다. 스킬별 기능과 효과를 확인하고 다른 이환 캐릭터 도감으로도 바로 이동할 수 있습니다.`,
    url: `/gallery/nte/character/${encodeURIComponent(name)}`,
  };
}
