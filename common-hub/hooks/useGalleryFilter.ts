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
    const result = (RELIC_DB || []).filter(r => {
      if (r.gameId !== gameId) return false;
      if (searchQuery && !(r.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const order = [
        "신공을 탐구하는 명장", "별을 갈망하는 항법사 아집", 
        "천명에 응해 먼 길을 떠난 점술가", "빛나는 공훈의 마법 소녀",
        "별빛에 숨은 은둔자", "천지를 재창조한 구세주",
        "거친 파도를 헤치는 선장", "태양과 번개의 여전사",
        "망국을 애도하는 시인", "개선가를 울리는 영웅",
        "지식의 바다에 빠진 학자", "고행의 길에 다시 오른 사제",
        "바람과 구름을 가르는 용맹함", "곤충 재앙을 잠재우는 철기군",
        "꿈을 조작하는 시계공", "사수에 잠수한 선구자",
        "깊은 감옥에 수감된 죄수", "재와 뼈마저 불사르는 대공",
        "가상공간을 누비는 메신저", "장수를 원하는 제자",
        "황무지의 도적, 황야인", "용암 단조의 화장(火匠)", "뇌전을 울리는 밴드", "정토 교황의 팔라딘",
        "별처럼 빛나는 천재", "눈보라에 맞서는 철위대", "들이삭과 동행하는 거너",
        "흔적을 남기지 않은 과객", "유성을 쫓는 괴도", "스트리트 격투왕",
        "밤낮의 경계를 나는 매", "혹한 밀림의 사냥꾼"
      ];
      const idxA = order.findIndex(n => a.name?.includes(n));
      const idxB = order.findIndex(n => b.name?.includes(n));
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
    return result;
  }, [RELIC_DB, gameId, searchQuery]);

  const filteredOrnaments = useMemo(() => {
    const result = (ORNAMENT_DB || []).filter(o => {
      if (o.gameId !== gameId) return false;
      if (searchQuery && !(o.name || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const order = [
        "우주 생명과학연구원",
        "추락한 별의 출항지",
        "천 개의 별이 모인 도시",
        "0호 스테이지 펑크 로드",
        "텐고쿠@라이브스트리밍",
        "영원의 땅 앰포리어스",
        "즐거움에 취한 바다의 일각",
        "꿈을 엮는 요정의 낙원",
        "사색하는 거목",
        "고요한 습골지",
        "기묘한 나나 낙원",
        "바다에 잠긴 루샤카",
        "겁화 연등의 연마궁",
        "도람 왕조", // user: 질주하는 늑대의 도람 왕조
        "이즈모 현세와 타카마 신국",
        "주인 없는 황폐한 별 츠가냐",
        "꿈의 땅 페나코니",
        "창공 전선 그라모스",
        "부러진 용골",
        "뭇별 경기장",
        "회전을 멈춘 살소토",
        "축성가의 벨로보그",
        "천체 차분기관",
        "범은하 상사",
        "생명의 바커 공",
        "도적국 탈리아",
        "불로인의 선주",
        "우주 봉인 정거장"
      ];
      let idxA = order.findIndex(n => a.name?.includes(n));
      let idxB = order.findIndex(n => b.name?.includes(n));
      if (idxA === -1 && a.name?.includes("도람")) idxA = order.indexOf("도람 왕조");
      if (idxB === -1 && b.name?.includes("도람")) idxB = order.indexOf("도람 왕조");
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
    return result;
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