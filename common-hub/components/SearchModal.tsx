import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { Search, User, Sword, BookOpen, ChevronRight, X, Sparkles, Compass, Star, Globe, MapPin, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getGameData } from '../data/dataManager';
import { Character } from '../types';
import aniimoData from '../../aniimo-hub/data/aniimo.json';

export interface SearchResultItemData {
  name: string;
  type: string;
  game: 'hsr' | 'ww' | 'nte' | 'aniimo';
  gameLabel: string;
  routePath: string[];
  description?: string;
  url: string;
}

/**
 * 검색 모달 도메인(게임)별 설정 객체
 */
const SEARCH_CONFIG = {
  hsr: {
    gameName: '스타레일',
    badgeColor: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    popularSearches: ['애쉬베일', '4.1 티어표', '천 개의 별이 모인 도시', '수렵 광추'],
    weaponType: '광추',
    relicType: '유물 & 장신구',
    relicName: '유물',
    paths: ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'],
    attrs: ['물리', '화염', '얼음', '번개', '바람', '양자', '허수'],
    placeholders: '스타레일 캐릭터, 광추, 공략을 검색하세요...',
    guideHero: '애쉬베일',
    weaponRouteBase: 'lightcone',
    getCharacterPath: (c: any) => c.path,
    getWeaponPath: (w: any) => w.path,
    getWeapons: (data: any) => data.LIGHTCONE_DB || [],
    getGuides: (data: any) => data.HSR_CHARACTER_GUIDES || [],
    getGuideName: (g: any) => g.characterName
  },
  ww: {
    gameName: '명조',
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    popularSearches: ['금희', '장리', '음림', '직검 무기'],
    weaponType: '무기',
    relicType: '에코',
    relicName: '에코',
    paths: ['직검', '대검', '권총', '권갑', '증폭기'],
    attrs: ['기류', '전도', '회절', '인멸', '용융', '응결'],
    placeholders: '명조 캐릭터, 무기, 에코를 검색하세요...',
    guideHero: '금희',
    weaponRouteBase: 'weapon',
    getCharacterPath: (c: any) => c.weaponType || c.weapon,
    getWeaponPath: (w: any) => w.type || w.weaponType || w.weapon,
    getWeapons: (data: any) => data.WEAPON_DATA || [],
    getGuides: (data: any) => data.GUIDES || [],
    getGuideName: (g: any) => g.name || g.characterName || ''
  },
  nte: {
    gameName: '이환',
    badgeColor: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
    popularSearches: ['린네', '코로모', '시그리카', '아크'],
    weaponType: '아크',
    relicType: '에코',
    relicName: '에코',
    paths: ['고체', '액체', '기체', '결합', '플라즈마'],
    attrs: ['물리', '전도', '용융', '응결', '기류', '에테르'],
    placeholders: '이환 캐릭터, 아크, 아이템을 검색하세요...',
    guideHero: '린네',
    weaponRouteBase: 'arc',
    getCharacterPath: (c: any) => c.arc || c.weapon,
    getWeaponPath: (w: any) => w.type,
    getWeapons: (data: any) => data.WEAPON_DATA || [],
    getGuides: (data: any) => data.GUIDES || [],
    getGuideName: (g: any) => g.characterName || g.name || ''
  },
  aniimo: {
    gameName: '아니모',
    badgeColor: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    popularSearches: ['탄멍멍', '불 속성', '구름 초원', '파티 조합', '진화 조건'],
    weaponType: '성격 프리셋',
    relicType: '서식지',
    relicName: '서식지',
    paths: ['딜', '탱', '힐', '서폿'],
    attrs: ['불', '물', '바람', '번개', '풀', '얼음', '빛', '어둠', '무속성'],
    placeholders: '아니모 이름, 번호, 속성, 서식지를 검색하세요...',
    guideHero: '탄멍멍',
    weaponRouteBase: 'personality',
    getCharacterPath: (c: any) => c.positions?.[0] || '딜',
    getWeaponPath: () => '성격 프리셋',
    getWeapons: () => [],
    getGuides: () => [],
    getGuideName: (g: any) => g.characterName
  }
};

const GAME_TABS: Array<{ id: 'all' | 'hsr' | 'ww' | 'nte' | 'aniimo'; label: string }> = [
  { id: 'all', label: '전체 (All)' },
  { id: 'hsr', label: '스타레일' },
  { id: 'ww', label: '명조' },
  { id: 'nte', label: '이환' },
  { id: 'aniimo', label: '아니모' }
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, gameId = 'all' }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'hsr' | 'ww' | 'nte' | 'aniimo'>(
    gameId === 'all' || gameId in SEARCH_CONFIG ? (gameId as any) : 'all'
  );
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('recent_searches') || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState<{ title: string; url: string }[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('rira_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const initialTab = gameId === 'all' || gameId in SEARCH_CONFIG ? (gameId as any) : 'all';
      setActiveTab(initialTab);
    }
  }, [isOpen, gameId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      // 키보드 상/하 네비게이션
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(document.querySelectorAll<HTMLElement>('.search-result-item, .search-shortcut-item'));
        if (!items.length) return;

        const currentIndex = items.findIndex(item => document.activeElement === item);
        let nextIndex = 0;
        if (currentIndex !== -1) {
          nextIndex = e.key === 'ArrowDown'
            ? (currentIndex < items.length - 1 ? currentIndex + 1 : 0)
            : (currentIndex > 0 ? currentIndex - 1 : items.length - 1);
        } else {
          nextIndex = e.key === 'ArrowDown' ? 0 : items.length - 1;
        }
        items[nextIndex].focus();
      }
    };

    if (isOpen) {
      try {
        setFavorites(JSON.parse(localStorage.getItem('rira_favorites') || '[]'));
        const parsed = JSON.parse(localStorage.getItem('recent_searches') || '[]');
        setRecentSearches(Array.isArray(parsed) ? parsed : []);
      } catch {
        setFavorites([]);
        setRecentSearches([]);
      }

      window.addEventListener('keydown', handleKeyDown);
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  // 언어별/게임별 데이터 로드
  const currentLang = i18n.language || 'ko';
  const hsrData = useMemo(() => getGameData(currentLang === 'en' ? 'en' : 'hsr'), [currentLang]);
  const wwData = useMemo(() => getGameData('ww'), []);
  const nteData = useMemo(() => getGameData('nte'), []);

  // 통합 검색 결과 계산
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().replace(/\s+/g, '');
    const exactQ = query.trim();

    const characters: SearchResultItemData[] = [];
    const weapons: SearchResultItemData[] = [];
    const guides: SearchResultItemData[] = [];
    const routes: SearchResultItemData[] = [];
    const deepLinks: SearchResultItemData[] = [];

    const shouldSearchGame = (gid: 'hsr' | 'ww' | 'nte' | 'aniimo') => {
      return activeTab === 'all' || activeTab === gid;
    };

    // 1. 스타레일 (HSR) 검색
    if (shouldSearchGame('hsr')) {
      const cfg = SEARCH_CONFIG.hsr;
      hsrData.CHARACTER_DB?.filter((c: Character) => c.gameId === 'hsr' && c.name?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 3 : 5)
        .forEach((c: Character) => {
          characters.push({
            name: c.name,
            type: t('캐릭터'),
            game: 'hsr',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '도감', c.attribute, cfg.getCharacterPath(c)].filter(Boolean),
            description: c.summary || c.tagline,
            url: `/gallery/hsr/character/${encodeURIComponent(c.id)}`
          });
        });

      const hsrWeapons = cfg.getWeapons(hsrData);
      hsrWeapons.filter((w: any) => w.name?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 2 : 4)
        .forEach((w: any) => {
          weapons.push({
            name: w.name,
            type: t(cfg.weaponType),
            game: 'hsr',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '광추 도감', cfg.getWeaponPath(w)].filter(Boolean),
            url: `/gallery/hsr/${cfg.weaponRouteBase}/${encodeURIComponent(w.name)}`
          });
        });

      const hsrGuides = cfg.getGuides(hsrData);
      hsrGuides.filter((g: any) => cfg.getGuideName(g)?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 2 : 4)
        .forEach((g: any) => {
          const charName = cfg.getGuideName(g);
          const character = hsrData.CHARACTER_DB?.find((c: Character) =>
            c.gameId === 'hsr' && c.name?.replace(/\s+/g, '').toLowerCase() === charName?.replace(/\s+/g, '').toLowerCase()
          );
          if (character) {
            guides.push({
              name: t('GuideTitle', { name: charName, defaultValue: `${charName} 세팅 공략` }),
              type: t('공략'),
              game: 'hsr',
              gameLabel: cfg.gameName,
              routePath: [cfg.gameName, '공략 모음', charName],
              url: `/gallery/hsr/character/${character.id}/guide`
            });
          }
        });
    }

    // 2. 명조 (WW) 검색
    if (shouldSearchGame('ww')) {
      const cfg = SEARCH_CONFIG.ww;
      wwData.CHARACTER_DB?.filter((c: Character) => c.gameId === 'ww' && c.name?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 3 : 5)
        .forEach((c: Character) => {
          characters.push({
            name: c.name,
            type: t('공명자'),
            game: 'ww',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '도감', c.attribute, cfg.getCharacterPath(c)].filter(Boolean),
            description: c.summary || c.tagline,
            url: `/gallery/ww/character/${encodeURIComponent(c.id)}`
          });
        });

      const wwWeapons = cfg.getWeapons(wwData);
      wwWeapons.filter((w: any) => w.name?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 2 : 4)
        .forEach((w: any) => {
          weapons.push({
            name: w.name,
            type: t(cfg.weaponType),
            game: 'ww',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '무기 도감', cfg.getWeaponPath(w)].filter(Boolean),
            url: `/gallery/ww/${cfg.weaponRouteBase}/${encodeURIComponent(w.name)}`
          });
        });

      const wwGuides = cfg.getGuides(wwData);
      wwGuides.filter((g: any) => cfg.getGuideName(g)?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 2 : 4)
        .forEach((g: any) => {
          const charName = cfg.getGuideName(g);
          const character = wwData.CHARACTER_DB?.find((c: Character) =>
            c.gameId === 'ww' && c.name?.replace(/\s+/g, '').toLowerCase() === charName?.replace(/\s+/g, '').toLowerCase()
          );
          if (character) {
            guides.push({
              name: `${charName} 세팅 공략`,
              type: t('공략'),
              game: 'ww',
              gameLabel: cfg.gameName,
              routePath: [cfg.gameName, '공략 모음', charName],
              url: `/gallery/ww/character/${character.id}/guide`
            });
          }
        });
    }

    // 3. 이환 (NTE) 검색
    if (shouldSearchGame('nte')) {
      const cfg = SEARCH_CONFIG.nte;
      nteData.CHARACTER_DB?.filter((c: Character) => c.gameId === 'nte' && c.name?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 3 : 5)
        .forEach((c: Character) => {
          characters.push({
            name: c.name,
            type: t('이환 캐릭터'),
            game: 'nte',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '도감', c.attribute, cfg.getCharacterPath(c)].filter(Boolean),
            description: c.summary || c.tagline,
            url: `/gallery/nte/character/${encodeURIComponent(c.name)}`
          });
        });

      const nteWeapons = cfg.getWeapons(nteData);
      nteWeapons.filter((w: any) => w.name?.replace(/\s+/g, '').toLowerCase().includes(q))
        .slice(0, activeTab === 'all' ? 2 : 4)
        .forEach((w: any) => {
          weapons.push({
            name: w.name,
            type: t(cfg.weaponType),
            game: 'nte',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '아크 도감', cfg.getWeaponPath(w)].filter(Boolean),
            url: `/gallery/nte/${cfg.weaponRouteBase}/${encodeURIComponent(w.name)}`
          });
        });
    }

    // 4. 아니모 (Aniimo) 검색 (Notion 없이 자체 데이터셋 기반)
    if (shouldSearchGame('aniimo')) {
      const cfg = SEARCH_CONFIG.aniimo;
      const rawAniimo = aniimoData as any[];

      // 4.1 아니모 개체 및 형태 검색
      rawAniimo.filter(item => {
        const nameMatch = item.name?.toLowerCase().replace(/\s+/g, '').includes(q);
        const numberMatch = item.number?.includes(q);
        const elementMatch = item.elements?.some((el: string) => el.toLowerCase().includes(q));
        const posMatch = item.positions?.some((pos: string) => pos.toLowerCase().includes(q));
        const locMatch = item.locations?.some((loc: string) => loc.toLowerCase().includes(q));
        const formMatch = item.forms?.some((f: any) => f.label?.toLowerCase().includes(q));
        return nameMatch || numberMatch || elementMatch || posMatch || locMatch || formMatch;
      }).slice(0, activeTab === 'all' ? 4 : 8).forEach(item => {
        characters.push({
          name: `${item.name} (#${item.number})`,
          type: '아니모',
          game: 'aniimo',
          gameLabel: cfg.gameName,
          routePath: [cfg.gameName, item.elements?.join(', ') || '무속성', item.positions?.join(', ') || '기본'].filter(Boolean),
          description: item.description ? (item.description.slice(0, 70) + (item.description.length > 70 ? '...' : '')) : undefined,
          url: `/gallery/aniimo/character/${encodeURIComponent(item.name)}`
        });
      });

      // 4.2 아니모 서식지 검색
      const allLocations = Array.from(new Set(rawAniimo.flatMap(item => item.locations || []))) as string[];
      allLocations.filter(loc => loc.toLowerCase().replace(/\s+/g, '').includes(q))
        .slice(0, activeTab === 'all' ? 2 : 5)
        .forEach(loc => {
          routes.push({
            name: `${loc} 서식지`,
            type: '서식지',
            game: 'aniimo',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '서식지 도감', loc],
            description: `${loc} 지역에 출현하는 아니모 서식 정보`,
            url: `/gallery/aniimo/locations?search=${encodeURIComponent(loc)}`
          });
        });

      // 4.3 아니모 핵심 도구 및 가이드
      const aniimoTools = [
        { name: '속성 상성표 및 배율 가이드', url: '/gallery/aniimo/type-chart', tags: ['상성', '속성', '배율', '약점'] },
        { name: '성격 프리셋 및 능력치 보정 도감', url: '/gallery/aniimo/personality', tags: ['성격', '프리셋', '스탯', '보정'] },
        { name: '추천 파티 조합 빌더', url: '/gallery/aniimo/party-builder', tags: ['파티', '조합', '빌더', '덱'] },
        { name: '전역 서식지 도감 및 필터', url: '/gallery/aniimo/locations', tags: ['서식지', '위치', '맵', '스폰'] }
      ];

      aniimoTools.filter(tool => tool.name.replace(/\s+/g, '').toLowerCase().includes(q) || tool.tags.some(t => t.includes(q)))
        .forEach(tool => {
          guides.push({
            name: tool.name,
            type: '전략 도구',
            game: 'aniimo',
            gameLabel: cfg.gameName,
            routePath: [cfg.gameName, '도구 & 가이드'],
            url: tool.url
          });
        });
    }

    // 5. 정적 메뉴 라우트 검색
    const allRoutes = [
      { name: '스타레일 메인 아카이브', url: '/gallery/hsr', routePath: ['메인 허브', '스타레일'], game: 'hsr' as const, gameLabel: '스타레일' },
      { name: '스타레일 티어표', url: '/gallery/hsr/tierlist', routePath: ['스타레일', '티어 랭킹'], game: 'hsr' as const, gameLabel: '스타레일' },
      { name: '명조 메인 아카이브', url: '/gallery/ww', routePath: ['메인 허브', '명조'], game: 'ww' as const, gameLabel: '명조' },
      { name: '명조 티어표', url: '/gallery/ww/tierlist', routePath: ['명조', '티어 랭킹'], game: 'ww' as const, gameLabel: '명조' },
      { name: '이환 메인 아카이브', url: '/gallery/nte', routePath: ['메인 허브', '이환'], game: 'nte' as const, gameLabel: '이환' },
      { name: '이환 티어표', url: '/gallery/nte/tierlist', routePath: ['이환', '티어 랭킹'], game: 'nte' as const, gameLabel: '이환' },
      { name: '아니모 메인 허브', url: '/gallery/aniimo', routePath: ['메인 허브', '아니모'], game: 'aniimo' as const, gameLabel: '아니모' },
      { name: '아니모 전체 도감', url: '/gallery/aniimo/characters', routePath: ['아니모', '도감'], game: 'aniimo' as const, gameLabel: '아니모' }
    ];

    allRoutes.filter(r => shouldSearchGame(r.game) && r.name.replace(/\s+/g, '').toLowerCase().includes(q))
      .slice(0, 3)
      .forEach(r => {
        routes.push({
          name: r.name,
          type: '메뉴 경로',
          game: r.game,
          gameLabel: r.gameLabel,
          routePath: r.routePath,
          url: r.url
        });
      });

    // 6. 딥링크 점프
    const currentConfig = activeTab !== 'all' ? SEARCH_CONFIG[activeTab] : SEARCH_CONFIG.hsr;
    if (currentConfig.paths?.includes(exactQ)) {
      deepLinks.push({
        name: `${exactQ} 캐릭터 모아보기`,
        type: '필터 점프',
        game: activeTab !== 'all' ? activeTab : 'hsr',
        gameLabel: currentConfig.gameName,
        routePath: [currentConfig.gameName, '캐릭터 도감', exactQ],
        url: `/gallery/${activeTab !== 'all' ? activeTab : 'hsr'}?menu=캐릭터&search=${exactQ}`
      });
    }

    return { characters, weapons, guides, routes, deepLinks };
  }, [query, activeTab, hsrData, wwData, nteData, t]);

  const hasResults = results && (
    results.characters.length > 0 ||
    results.weapons.length > 0 ||
    results.guides.length > 0 ||
    results.routes.length > 0
  );

  const handleNavigate = (path: string) => {
    if (query.trim() !== '') {
      const updatedSearches = [query.trim(), ...recentSearches.filter(q => q !== query.trim())].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recent_searches', JSON.stringify(updatedSearches));
    }
    navigate(path);
    onClose();
    setQuery('');
  };

  const currentTabConfig = activeTab !== 'all' ? SEARCH_CONFIG[activeTab] : null;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-4 animate-in fade-in duration-200">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-[10001] w-full max-w-2xl bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 rounded-[28px] sm:rounded-[32px]">
        <div className="p-6 sm:p-8">
          {/* 게임 필터 탭 바 */}
          <div className="flex items-center gap-1 sm:gap-2 mb-4 p-1 bg-white/[0.03] border border-white/5 rounded-2xl overflow-x-auto scrollbar-hide">
            {GAME_TABS.map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 ${
                    isSelected
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 검색창 */}
          <div className="relative mb-6 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary" size={20} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  currentTabConfig?.placeholders ||
                  '스타레일, 명조, 이환, 아니모 통합 아카이브를 검색하세요...'
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-14 pr-6 text-sm sm:text-base focus:outline-none focus:border-brand-primary transition-all text-white font-bold placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5 shrink-0"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* 검색 결과가 있을 때 */}
          {query && hasResults && (
            <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2 scrollbar-hide">
              <ResultSection
                title={t('캐릭터 & 아니모')}
                icon={<User size={14}/>}
                items={results.characters}
                onNavigate={handleNavigate}
                query={query}
              />
              <ResultSection
                title={currentTabConfig?.weaponType ? t(currentTabConfig.weaponType) : t('무기 / 장비')}
                icon={<Sword size={14}/>}
                items={results.weapons}
                onNavigate={handleNavigate}
                query={query}
              />
              <ResultSection
                title={t('전략 공략 & 분석 도구')}
                icon={<BookOpen size={14}/>}
                items={results.guides}
                onNavigate={handleNavigate}
                query={query}
              />
              <ResultSection
                title={t('메뉴 & 서식지 경로')}
                icon={<Compass size={14}/>}
                items={results.routes}
                onNavigate={handleNavigate}
                query={query}
              />
            </div>
          )}

          {/* 검색어 입력 전 초기 화면 */}
          {!query && (
            <div className="space-y-8 animate-in fade-in duration-300 px-1 mt-2">
              {/* 즐겨찾기 섹션 */}
              {favorites.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Star size={14} className="fill-yellow-500" /> {t('My Favorites')}
                    </h3>
                    <button
                      onClick={() => { setFavorites([]); localStorage.removeItem('rira_favorites'); }}
                      className="text-[10px] font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      {t('Clear')}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {favorites.map((fav, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleNavigate(fav.url)}
                        className="search-shortcut-item flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-yellow-500/10 hover:border-yellow-500/30 group transition-all text-left focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                      >
                        <span className="text-xs sm:text-sm font-bold text-gray-300 group-hover:text-white truncate">{fav.title}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* 최근 검색어 */}
              {recentSearches.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{t('Recent Searches')}</h3>
                    <button
                      onClick={() => { setRecentSearches([]); localStorage.removeItem('recent_searches'); }}
                      className="text-[10px] font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      {t('Clear')}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="search-shortcut-item px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full text-xs font-bold transition-all text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* 인기 검색어 */}
              <section>
                <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                  <Sparkles size={14} /> {activeTab === 'all' ? t('Trending Keywords') : `${currentTabConfig?.gameName} 인기 키워드`}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(currentTabConfig?.popularSearches || [
                    '탄멍멍', '애쉬베일', '금희', '린네', '4.1 티어표', '속성 상성표'
                  ]).map((keyword, i) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => setQuery(keyword)}
                      className="search-shortcut-item flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-brand-primary/10 hover:border-brand-primary/30 group transition-all text-left focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    >
                      <span className="text-brand-primary font-black italic text-xs w-5">0{i+1}</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-300 group-hover:text-white">{keyword}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* 검색 결과가 없을 때 */}
          {query && !hasResults && (
            <div className="p-8 text-center bg-[#0a0a0a] rounded-[24px] border border-white/5 animate-in fade-in slide-in-from-bottom-4 mt-2">
              <div className="mb-4 text-orange-500 opacity-50 flex justify-center">
                <Search size={40} />
              </div>
              <p className="text-gray-400 mb-6 text-sm font-medium">
                {t('NoArchiveRecord', { query, defaultValue: `'${query}'에 대한 아카이브 기록이 없습니다.` })}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-4 border-t border-white/5">
                <button
                  onClick={() => handleNavigate('/gallery/aniimo/characters')}
                  className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary transition-all cursor-pointer group"
                >
                  <p className="text-[10px] font-black text-amber-400 mb-1 uppercase tracking-widest">ANIIMO</p>
                  <p className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">아니모 전체 도감 둘러보기</p>
                </button>
                <button
                  onClick={() => handleNavigate('/gallery/hsr')}
                  className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary transition-all cursor-pointer group"
                >
                  <p className="text-[10px] font-black text-purple-400 mb-1 uppercase tracking-widest">HONKAI: STAR RAIL</p>
                  <p className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">스타레일 아카이브 바로가기</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// 결과 섹션 컴포넌트
const ResultSection = ({ title, icon, items, onNavigate, query }: any) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">
        {icon} {title} <span className="text-brand-primary">({items.length})</span>
      </h3>
      <div className="grid grid-cols-1 gap-2.5">
        {items.map((item: SearchResultItemData, i: number) => (
          <SearchResultItem key={i} item={item} onNavigate={onNavigate} query={query} />
        ))}
      </div>
    </div>
  );
};

// 개별 검색 결과 아이템 컴포넌트 (게임 뱃지 + 타입 + 명칭 + 설명 + 경로 표기)
const SearchResultItem = ({
  item,
  onNavigate,
  query
}: {
  item: SearchResultItemData;
  onNavigate: (url: string) => void;
  query?: string;
}) => {
  const badgeStyle =
    item.game === 'hsr' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
    item.game === 'ww' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
    item.game === 'nte' ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' :
    item.game === 'aniimo' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
    'bg-white/10 text-gray-300 border-white/10';

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.url)}
      className="search-result-item block w-full text-left group p-4 bg-white/[0.02] hover:bg-brand-primary/10 border border-white/5 hover:border-brand-primary/30 rounded-2xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {/* 게임 구분 뱃지 */}
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border shrink-0 ${badgeStyle}`}>
            {item.gameLabel || item.game.toUpperCase()}
          </span>
          <span className="text-sm font-black text-gray-200 group-hover:text-brand-primary transition-colors truncate">
            <HighlightText text={item.name} query={query || ''} />
          </span>
        </div>
        {/* 데이터 타입 뱃지 */}
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md border border-white/5 shrink-0 group-hover:border-brand-primary/30 transition-colors">
          {item.type}
        </span>
      </div>

      {item.description && (
        <p className="text-xs text-gray-400 line-clamp-1 mb-2 font-medium">
          {item.description}
        </p>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        {item.routePath?.map((path: string, idx: number) => (
          <React.Fragment key={idx}>
            <span className="text-[10px] px-2 py-0.5 bg-white/[0.03] border border-white/5 rounded-full text-gray-400 font-bold group-hover:bg-brand-primary/20 group-hover:text-brand-accent group-hover:border-brand-primary/30 transition-colors">
              <HighlightText text={path} query={query || ''} />
            </span>
            {idx < item.routePath.length - 1 && (
              <span className="text-[10px] font-black text-gray-500 shrink-0">&gt;</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </button>
  );
};

/* 검색어 강조 유틸리티 */
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!text) return null;
  if (!query || typeof text !== 'string') return <>{String(text)}</>;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <span key={i} className="text-brand-primary">{part}</span>
          : part
      )}
    </>
  );
};

export default SearchModal;
