// Keep the browser and initial HTML descriptions faithful to the actual DB page.
export function getWwWeaponSeo(weapon, translate = (text) => text) {
  const name = translate(weapon.name);
  const classification = [
    weapon.rarity ? `${weapon.rarity}${translate('성')}` : '',
    weapon.type ? translate(weapon.type) : '',
  ].filter(Boolean).join(' ');
  return {
    title: `${name} ${translate('상세 정보 및 스탯 | 명조 아카이브')}`,
    description: `${translate('명조 (Wuthering Waves)')} ${classification ? `${classification} ` : ''}${name}${translate('의 상세 스탯, 무기 스킬, 획득처 및 스토리를 확인하세요.')}`,
    heading: name,
  };
}
