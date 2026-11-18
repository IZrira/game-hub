// Keep the browser and initial HTML descriptions faithful to the actual DB page.
export function getWwWeaponSeo(weapon, translate = (text) => text) {
  const name = translate(weapon.name);
  const classification = [
    weapon.rarity ? `${weapon.rarity}${translate('성')}` : '',
    weapon.type ? translate(weapon.type) : '',
  ].filter(Boolean).join(' ');
  return {
    title: `${name} ${translate('상세 정보 및 스탯 | 명조 아카이브')}`,
    description: `${translate('명조 (Wuthering Waves)')} ${classification ? `${classification} ` : ''}${name}${translate('의 무기 스킬 효과와 레벨별 성장 스탯, 돌파 및 육성 재료, 획득처와 무기 스토리를 한 페이지에 정리한 명조 무기 도감입니다.')}`,
    heading: name,
  };
}
