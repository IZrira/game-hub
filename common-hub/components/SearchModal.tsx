import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, User, Sword, BookOpen, AlertCircle, ChevronRight, X, Sparkles, Compass, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getGameData } from '../data/dataManager';
import { Character } from '../types';

/**
 * 검색 모달 도메인(게임)별 설정 객체
 * 하드코딩된 분기 처리를 막기 위한 구조화된 Config입니다.
 */
const SEARCH_CONFIG = {
  hsr: {
    gameName: '스타레일',
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
    getGuides: (data: any) => [],
    getGuideName: (g: any) => ''
  }
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, gameId = 'hsr' }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('recent_searches') || '[]');
      return Array.isArray(parsed) ? parsed : []; // 배열이 아닌 데이터로 오염되었을 경우 방지
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState<{title: string; url: string}[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('rira_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  const config = SEARCH_CONFIG[gameId as keyof typeof SEARCH_CONFIG] || SEARCH_CONFIG.hsr;

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
          nextIndex = e.key === 'ArrowDown' ? (currentIndex < items.length - 1 ? currentIndex + 1 : 0) : (currentIndex > 0 ? currentIndex - 1 : items.length - 1);
        } else {
          nextIndex = e.key === 'ArrowDown' ? 0 : items.length - 1;
        }
        items[nextIndex].focus();
      }
    };

    if (isOpen) {
      // 모달이 열릴 때마다 최신 스토리지 기록을 동기화
      try {
        setFavorites(JSON.parse(localStorage.getItem('rira_favorites') || '[]'));
        const parsed = JSON.parse(localStorage.getItem('recent_searches') || '[]');
        setRecentSearches(Array.isArray(parsed) ? parsed : []);
      } catch {
        setFavorites([]);
        setRecentSearches([]);
      }

      window.addEventListener('keydown', handleKeyDown);
      // 스크롤바가 사라질 때 배경 레이아웃이 움직이는 현상 방지
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

  // 현재 설정된 언어에 맞는 데이터 동적 로드
  const currentLang = i18n.language || 'ko';
  const { CHARACTER_DB, LIGHTCONE_DB, WEAPON_DATA, HSR_CHARACTER_GUIDES } = useMemo(() => getGameData(currentLang), [currentLang]);

  // 1. 데이터 카테고리별 필터링 (시각적 위계 로직)
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().replace(/\s+/g, '');
    const exactQ = query.trim();
    const gameName = config.gameName;

    const characters = CHARACTER_DB.filter((c: Character) => c.gameId === gameId && c.name?.replace(/\s+/g, '').toLowerCase().includes(q)).slice(0, 3).map((c: Character) => ({
      name: c.name,
      type: t('캐릭터'),
      routePath: [t(gameName), t('도감'), t(c.attribute), t(config.getCharacterPath(c))].filter(Boolean),
      url: `/gallery/${gameId}/character/${c.id}`
    }));
    
    const weaponsData = config.getWeapons({ LIGHTCONE_DB, WEAPON_DATA });
    const weapons = weaponsData.filter((w: any) => w.name?.replace(/\s+/g, '').toLowerCase().includes(q)).slice(0, 3).map((w: any) => ({
      name: w.name,
      type: t(config.weaponType),
      routePath: [t(gameName), t('무기 도감'), t(config.getWeaponPath(w))].filter(Boolean),
      url: `/gallery/${gameId}/${config.weaponRouteBase}/${w.name}`
    }));

    const guidesData = config.getGuides({ HSR_CHARACTER_GUIDES });
    const guides = guidesData.filter((g: any) => config.getGuideName(g)?.replace(/\s+/g, '').toLowerCase().includes(q)).slice(0, 3).map((g: any) => {
      const charName = config.getGuideName(g);
      return {
        name: t('GuideTitle', { name: charName, defaultValue: `${charName} 세팅 공략` }),
        type: t('공략'),
        routePath: [t(gameName), t('공략 모음'), t(charName)],
        url: `/gallery/${gameId}/guide/${charName}`
      };
    });

    // 1.5 데이터 경로 (Route) 검색
    const staticRoutes = [
      { name: `${gameName} 메인`, url: `/gallery/${gameId}`, routePath: ['메인 허브', gameName] },
      { name: '캐릭터 도감', url: `/gallery/${gameId}?menu=캐릭터`, routePath: [gameName, '도감', '캐릭터'] },
      { name: `${config.weaponType} 도감`, url: `/gallery/${gameId}?menu=${config.weaponType}`, routePath: [gameName, '도감', config.weaponType] },
      { name: `${config.relicType} 도감`, url: `/gallery/${gameId}?menu=${config.relicType}`, routePath: [gameName, '도감', config.relicName] },
      { name: '공략 모음', url: `/gallery/${gameId}?menu=공략`, routePath: [gameName, '정보', '공략'] },
      { name: '티어표', url: `/gallery/${gameId}/tierlist`, routePath: [gameName, '정보', '티어 랭킹'] },
      { name: '추천 파티 조합', url: `/gallery/${gameId}/parties`, routePath: [gameName, '정보', '파티 편성'] },
      { name: '인벤토리', url: `/gallery/${gameId}?menu=인벤토리`, routePath: [gameName, '정보', '아이템'] }
    ];
    const routes = staticRoutes.filter((r: any) => r.name.replace(/\s+/g, '').toLowerCase().includes(q)).slice(0, 3).map((r: any) => ({
      ...r, type: '메뉴 경로'
    }));

    // 1.6 딥링크 필터 점프 제안
    const deepLinks: any[] = [];

    if (config.paths.includes(exactQ)) {
      deepLinks.push({ name: `${exactQ} 캐릭터 모아보기`, url: `/gallery/${gameId}?menu=캐릭터&search=${exactQ}`, routePath: [gameName, '캐릭터 도감', exactQ] });
      deepLinks.push({ name: `${exactQ} ${config.weaponType} 모아보기`, url: `/gallery/${gameId}?menu=${config.weaponType}&search=${exactQ}`, routePath: [gameName, `${config.weaponType} 도감`, exactQ] });
    }
    if (config.attrs.includes(exactQ)) {
      deepLinks.push({ name: `${exactQ} 속성 캐릭터 보기`, url: `/gallery/${gameId}?menu=캐릭터&search=${exactQ}`, routePath: [gameName, '캐릭터 도감', exactQ] });
    }

    return { characters, weapons, guides, routes, deepLinks };
  }, [query, gameId, config]);

  const hasResults = results && (results.characters.length > 0 || results.weapons.length > 0 || results.guides.length > 0 || results.routes.length > 0);

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

  if (!isOpen) return null;

  // React Portal을 사용하여 z-index 충돌을 원천 차단하고 DOM 최상단에 렌더링
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative z-[10001] w-full max-w-2xl bg-[#0d0d0d] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 rounded-[32px]">
        <div className="p-8">
          {/* 검색창 */}
          <div className="relative mb-8 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-primary" size={20} />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={config.placeholders || `${config.gameName} 캐릭터, 장비, 공략을 검색하세요...`}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-base focus:outline-none focus:border-brand-primary transition-all text-white font-bold placeholder:text-gray-600"
              />
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">
              <X size={20} />
            </button>
          </div>

          {/* 검색 결과가 있을 때: 카테고리별 그룹화 */}
          {query && hasResults && (
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 scrollbar-hide">
          <ResultSection title={t('캐릭터')} icon={<User size={14}/>} items={results.characters} onNavigate={handleNavigate} query={query} />
          <ResultSection title={t(config.weaponType)} icon={<Sword size={14}/>} items={results.weapons} onNavigate={handleNavigate} query={query} />
          <ResultSection title={t('공략 모음')} icon={<BookOpen size={14}/>} items={results.guides} onNavigate={handleNavigate} query={query} />
          <ResultSection title={t('메뉴 경로')} icon={<Compass size={14}/>} items={results.routes} onNavigate={handleNavigate} query={query} />
            </div>
          )}

          {/* 검색어 입력 전 초기 화면 */}
          {!query && (
            <div className="space-y-10 animate-in fade-in duration-300 px-2 mt-4">
              
              {/* 즐겨찾기 섹션 */}
              {favorites.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Star size={14} className="fill-yellow-500" /> {t('My Favorites')}
                    </h3>
                    <button onClick={() => { setFavorites([]); localStorage.removeItem('rira_favorites'); }} className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors">{t('Clear')}</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {favorites.map((fav, i) => (
                      <button 
                        key={i}
                        type="button"
                        onClick={() => handleNavigate(fav.url)}
                        className="search-shortcut-item flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-yellow-500/10 hover:border-yellow-500/30 group transition-all text-left focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                      >
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white truncate">{fav.title}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* 최근 검색어 */}
              {recentSearches.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{t('Recent Searches')}</h3>
                    <button onClick={() => { setRecentSearches([]); localStorage.removeItem('recent_searches'); }} className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors">{t('Clear')}</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button 
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="search-shortcut-item px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full text-xs font-bold transition-all text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* 인기 검색어 (핫 키워드) */}
              <section>
                <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Sparkles size={14} /> {t('Trending Now')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {config.popularSearches.map((keyword, i) => (
                    <button 
                      key={keyword}
                      type="button"
                      onClick={() => setQuery(keyword)}
                      className="search-shortcut-item flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-brand-primary/10 hover:border-brand-primary/30 group transition-all text-left focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    >
                      <span className="text-brand-primary font-black italic text-sm w-5">0{i+1}</span>
                      <span className="text-sm font-bold text-gray-300 group-hover:text-white">{keyword}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* 검색 결과가 없을 때: 추천 콘텐츠 제안 */}
          {query && !hasResults && (
            <div className="p-8 md:p-12 text-center bg-[#0a0a0a] rounded-[32px] border border-white/5 animate-in fade-in slide-in-from-bottom-4 mt-4">
              <div className="mb-6 text-orange-500 opacity-50 flex justify-center">
                <Search size={48} />
              </div>
              <p className="text-gray-400 mb-8 font-medium">{t('NoArchiveRecord', { query, defaultValue: `'${query}'에 대한 아카이브 기록이 없습니다.` })}</p>
              
              {results?.deepLinks && results.deepLinks.length > 0 ? (
                <div className="text-left space-y-4 pt-6 border-t border-white/5">
                  <h4 className="text-[11px] font-black text-brand-accent uppercase tracking-widest flex items-center gap-2">
                    <Compass size={14} /> {t('SuggestedRoute', { defaultValue: '혹시 이 경로를 찾으시나요?' })}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.deepLinks.map((link: any, i: number) => (
                      <SearchResultItem key={i} item={{...link, type: '필터 점프'}} onNavigate={handleNavigate} query={query} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-6 border-t border-white/5">
                  <button onClick={() => handleNavigate(`/gallery/${gameId}/guide/${config.guideHero}`)} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary transition-all cursor-pointer group">
                    <p className="text-[10px] font-black text-brand-primary mb-1 uppercase tracking-widest">{t('Recommended Route')}</p>
                    <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{t('NewCharacterGuide', { defaultValue: '신규 캐릭터 공략 보기' })}</p>
                  </button>
                  <button onClick={() => handleNavigate(`/gallery/${gameId}?menu=${config.weaponType}`)} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary transition-all cursor-pointer group">
                    <p className="text-[10px] font-black text-brand-primary mb-1 uppercase tracking-widest">{t('Quick Link')}</p>
                    <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{t('ViewAllWeapons', { weaponType: t(config.weaponType), defaultValue: `${config.weaponType} 도감 전체 보기` })}</p>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// 결과 섹션 컴포넌트 (시각적 위계 유지)
const ResultSection = ({ title, icon, items, onNavigate, query }: any) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-2">
        {icon} {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item: any, i: number) => (
          <SearchResultItem key={i} item={item} onNavigate={onNavigate} query={query} />
        ))}
      </div>
    </div>
  );
};

const SearchResultItem = ({ item, onNavigate, query }: { item: any; onNavigate: (url: string) => void; query?: string }) => {
  return (
    <button type="button" onClick={() => onNavigate(item.url)} className="search-result-item block w-full text-left group p-5 bg-white/[0.02] hover:bg-brand-primary/10 border border-white/5 hover:border-brand-primary/30 rounded-2xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-black text-gray-200 group-hover:text-brand-primary transition-colors">
          <HighlightText text={item.name} query={query || ''} />
        </span>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md border border-white/5 group-hover:border-brand-primary/30 transition-colors">
          {item.type}
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {item.routePath?.map((path: string, idx: number) => (
          <React.Fragment key={idx}>
            <span className="text-[10px] px-2 py-0.5 bg-white/[0.03] border border-white/5 rounded-full text-gray-400 font-bold group-hover:bg-brand-primary/20 group-hover:text-brand-accent group-hover:border-brand-primary/30 transition-colors">
              <HighlightText text={path} query={query || ''} />
            </span>
            {idx < item.routePath.length - 1 && (
              <span className="text-[10px] font-black text-gray-600 shrink-0">&gt;</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </button>
  );
};

/* 검색어 강조 유틸리티 */
const HighlightText = ({ text, query }: { text: string, query: string }) => {
  if (!text) return null; // undefined 또는 null 값이 들어오면 렌더링하지 않음 (크래시 완벽 차단)
  if (!query || typeof text !== 'string') return <>{String(text)}</>;
  
  // 정규식 특수문자 이스케이프 처리 (사용자가 ?, *, ( 등을 입력했을 때 앱이 튕기는 현상 방지)
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