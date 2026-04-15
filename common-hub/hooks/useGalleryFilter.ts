import { useMemo } from 'react';

export const useGalleryFilter = (
  gameId: string | undefined,
  searchQuery: string,
  attrFilter: string,
  secondFilter: string,
  rarityFilter: string,
  CHARACTER_DB: any[],
  LIGHTCONE_DB: any[],
  WEAPON_DATA: any[],
  RELIC_DB: any[],
  ORNAMENT_DB: any[]
) => {
  const filterOptions = useMemo(() => {
    if (gameId === 'ww') {
      return {
        second: ['직검', '권총', '권갑', '대검', '증폭기'],
        attr: ['기류', '전도', '회절', '인멸', '용융', '응결']
      };
    }
    return {
      second: ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'],
      attr: ['물리', '화염', '얼음', '번개', '바람', '양자', '허수']
    };
  }, [gameId]);

  const filteredCharacters = useMemo(() => {
    return CHARACTER_DB.filter(c => {
      if (c.gameId !== gameId) return false;
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (attrFilter !== '전체' && c.attribute !== attrFilter) return false;
      const pathOrWeapon = gameId === 'hsr' ? c.path : (c.weaponType || c.weapon);
      if (secondFilter !== '전체' && pathOrWeapon !== secondFilter) return false;
      if (rarityFilter !== '전체' && String(c.rarity) !== rarityFilter) return false;
      return true;
    });
  }, [CHARACTER_DB, gameId, searchQuery, attrFilter, secondFilter, rarityFilter]);

  const filteredLightCones = useMemo(() => {
    const data = gameId === 'hsr' ? LIGHTCONE_DB : WEAPON_DATA;
    return data.filter(item => {
      if (gameId === 'hsr' && item.gameId !== 'hsr') return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      const pathOrWeapon = gameId === 'hsr' ? item.path : (item.type || item.weaponType || item.weapon);
      if (secondFilter !== '전체' && pathOrWeapon !== secondFilter) return false;
      if (rarityFilter !== '전체' && String(item.rarity) !== rarityFilter) return false;
      return true;
    });
  }, [LIGHTCONE_DB, WEAPON_DATA, gameId, searchQuery, secondFilter, rarityFilter]);

  const filteredRelics = useMemo(() => {
    return RELIC_DB.filter(r => {
      if (r.gameId !== gameId) return false;
      if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [RELIC_DB, gameId, searchQuery]);

  const filteredOrnaments = useMemo(() => {
    return ORNAMENT_DB.filter(o => {
      if (o.gameId !== gameId) return false;
      if (searchQuery && !o.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [ORNAMENT_DB, gameId, searchQuery]);

  return {
    filteredCharacters,
    filteredLightCones,
    filteredRelics,
    filteredOrnaments,
    filterOptions
  };
};