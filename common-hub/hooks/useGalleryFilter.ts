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
  ORNAMENT_DB: any[],
  INVENTORY_DB: any,
  categoryFilter?: string
) => {
  const filterOptions = useMemo(() => {
    if (gameId === 'ww') {
      return {
        second: ['직검', '권총', '권갑', '대검', '증폭기'],
        attr: ['기류', '전도', '회절', '인멸', '용융', '응결']
      };
    }
    if (gameId === 'nte') {
      return {
        second: ['고체', '액체', '기체', '결합', '플라즈마'],
        attr: ['빛', '상', '령', '주', '암', '혼']
      };
    }
    return {
      second: ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'],
      attr: ['물리', '화염', '얼음', '번개', '바람', '양자', '허수']
    };
  }, [gameId]);

  const filteredCharacters = useMemo(() => {
    return (CHARACTER_DB || []).filter(c => {
      if (c.gameId !== gameId) return false;
      if (searchQuery && !(c.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (attrFilter !== '전체' && c.attribute !== attrFilter) return false;
      const pathOrWeapon = gameId === 'hsr' ? c.path : (c.weaponType || c.weapon);
      if (secondFilter !== '전체' && pathOrWeapon !== secondFilter) return false;
      if (rarityFilter !== '전체' && String(c.rarity) !== rarityFilter) return false;
      return true;
    }).sort((a, b) => {
      // 1. 희귀도 우선 (5성 -> 4성)
      const rA = a.rarity || 0;
      const rB = b.rarity || 0;
      if (rA !== rB) return rB - rA;

      // 2. 출시 버전 (최신순)
      const vA = parseFloat(a.releaseVersion || '1.0');
      const vB = parseFloat(b.releaseVersion || '1.0');
      if (vA !== vB) return vB - vA;
      
      // 3. 4.2 버전 특별 정렬 (출시 순서: 에바네시아 -> 은랑 -> 개척자)
      if (vA === 4.2) {
        const order42 = ['에바네시아', '은랑 LV.999', '개척자 (환락)'];
        const idxA = order42.indexOf(a.name);
        const idxB = order42.indexOf(b.name);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      }

      // 4. 운명의 길 순서
      const pathOrder = ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'];
      const pA = gameId === 'hsr' ? a.path : (a.weaponType || a.weapon);
      const pB = gameId === 'hsr' ? b.path : (b.weaponType || b.weapon);
      if (pA !== pB) return pathOrder.indexOf(pA) - pathOrder.indexOf(pB);

      // 5. 이름순
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [CHARACTER_DB, gameId, searchQuery, attrFilter, secondFilter, rarityFilter]);

  const filteredLightCones = useMemo(() => {
    const data = gameId === 'hsr' ? LIGHTCONE_DB : WEAPON_DATA;
    const filtered = (data || []).filter(item => {
      if (searchQuery && !(item.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      const pathOrWeapon = gameId === 'hsr' ? item.path : (item.type || item.weaponType || item.weapon);
      if (secondFilter !== '전체' && pathOrWeapon !== secondFilter) return false;
      if (rarityFilter !== '전체' && String(item.rarity) !== rarityFilter) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      // 1. 출시 버전 (최신순) - 현 버전 아이템을 가장 앞으로
      const vA = parseFloat(a.releaseVersion || '1.0');
      const vB = parseFloat(b.releaseVersion || '1.0');
      if (vA !== vB) return vB - vA;

      // 2. 특정 픽업/신규 아이템 우선순위 (v4.2 후반부 픽업 '다음 꽃피는 계절의 만남' 예외 처리)
      if (vA === 4.2) {
        const priorityName = '다음 꽃피는 계절의 만남';
        if (a.name === priorityName && b.name !== priorityName) return -1;
        if (b.name === priorityName && a.name !== priorityName) return 1;
      }

      // 3. 희귀도 우선
      const rA = a.rarity || 0;
      const rB = b.rarity || 0;
      if (rA !== rB) return rB - rA;

      // 4. 운명의 길 순서
      const pathOrder = ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'];
      const pA = gameId === 'hsr' ? a.path : (a.type || a.weaponType || a.weapon);
      const pB = gameId === 'hsr' ? b.path : (b.type || b.weaponType || b.weapon);
      if (pA !== pB) return pathOrder.indexOf(pA) - pathOrder.indexOf(pB);

      // 5. 이름순
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [LIGHTCONE_DB, WEAPON_DATA, gameId, searchQuery, secondFilter, rarityFilter]);

  const filteredRelics = useMemo(() => {
    return (RELIC_DB || []).filter(r => {
      if (r.gameId !== gameId) return false;
      if (searchQuery && !(r.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).reverse();
  }, [RELIC_DB, gameId, searchQuery]);

  const filteredOrnaments = useMemo(() => {
    return (ORNAMENT_DB || []).filter(o => {
      if (o.gameId !== gameId) return false;
      if (searchQuery && !(o.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).reverse();
  }, [ORNAMENT_DB, gameId, searchQuery]);

  const filteredItems = useMemo(() => {
    return Object.entries(INVENTORY_DB || {}).map(([name, item]: [string, any]) => ({
      ...item,
      name: item.name || name
    })).filter((item: any) => {
      // 1. 물리적 분리 확인: (아이템의 gameId가 있을 경우) 요청한 gameId와 일치해야 함
      if (item.gameId && item.gameId !== gameId) return false;
      
      // 2. 검색어 필터
      if (searchQuery && !(item.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // 3. 카테고리 필터 (HSR/WW 공통 필드 체크: type 또는 category)
      const itemCategory = item.category || item.type || '기타';
      if (categoryFilter && categoryFilter !== '전체' && itemCategory !== categoryFilter) return false;
      
      // 4. 등급 필터
      if (rarityFilter && rarityFilter !== '전체' && String(item.rarity) !== rarityFilter) return false;
      
      return true;
    }).sort((a, b) => {
      // 1. 희귀도 오름차순 (1성 -> 5성)
      const rA = a.rarity || 0;
      const rB = b.rarity || 0;
      if (rA !== rB) return rA - rB;
      
      // 2. 이름순
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [INVENTORY_DB, gameId, searchQuery, rarityFilter, categoryFilter]);

  return {
    filteredCharacters,
    filteredLightCones,
    filteredRelics,
    filteredOrnaments,
    filteredItems,
    filterOptions
  };
};