
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  Box, Users, Zap, Shield, Backpack, ChevronRight, Sparkles, 
  Search, Star, Home as HomeIcon, X, Activity, ArrowUpRight, 
  TrendingUp, Filter, Layers, Sword, Book, Hash, ArrowLeft 
} from 'lucide-react';

import { ARCHIVE_DATA } from '../data/games';
import { getGameData } from '../data/dataManager';
import { ITEM_META } from '../data/items';
import { GLOBAL_SPECIAL_TERMS } from '../../hsr-hub/data/terms';
import { Category, Character, Post, LightCone } from '../types';
import InventoryGallery from '../components/InventoryGallery';
import WuwaInventory from '../components/WuwaInventory';
import WuwaEchoGallery from '../components/WuwaEchoGallery';
import GameDashboard from '../components/GameDashboard';
import { useTranslation } from 'react-i18next';
import GallerySidebar from '../components/GallerySidebar';
import SEO from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';
import SearchModal from '../components/SearchModal';
import { DESIGN_CONCEPT } from './theme';
import { useGalleryFilter } from '@/common-hub/hooks/useGalleryFilter';
import { CharacterPremiumCard, LightConePremiumCard, RelicPremiumCard, OrnamentPremiumCard } from '@/common-hub/components/GalleryCards';
import { RelicDetailModal, OrnamentDetailModal } from '@/common-hub/components/GalleryModals';
import { CDN_URL } from '@/common-hub/utils/assetManager';

type SidebarMenu = string;

const Gallery: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeMenu, setActiveMenu] = useState<SidebarMenu>(() => {
    return searchParams.get('menu') || '홈';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [attrFilter, setAttrFilter] = useState('전체');
  const [secondFilter, setSecondFilter] = useState('전체');
  const [rarityFilter, setRarityFilter] = useState('전체');
  const [relicSubTab, setRelicSubTab] = useState<'유물' | '차원 장신구'>('유물');
  const [selectedRelic, setSelectedRelic] = useState<any>(null);
  const [selectedOrnament, setSelectedOrnament] = useState<any>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';

  // Sync activeMenu and searchQuery with searchParams
  useEffect(() => {
    const menuParam = searchParams.get('menu');
    if (menuParam && menuParam !== activeMenu) {
      setActiveMenu(menuParam);
    }
    const searchParam = searchParams.get('search');
    if (searchParam !== null && searchParam !== searchQuery) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Ctrl+K (or Cmd+K) 단축키로 글로벌 검색 모달 열기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSetActiveMenu = (menu: string) => {
    setActiveMenu(menu);
    const newParams: any = { menu };
    if (searchQuery) newParams.search = searchQuery;
    setSearchParams(newParams);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams: any = { menu: activeMenu };
    if (query) newParams.search = query;
    setSearchParams(newParams);
  };

  useEffect(() => {
    setAttrFilter('전체');
    setSecondFilter('전체');
    rarityFilter !== '전체' && setRarityFilter('전체');
  }, [gameId, activeMenu]);

  const { CHARACTER_DB, LIGHTCONE_DB, WEAPON_DATA, RELIC_DB, ORNAMENT_DB } = useMemo(() => getGameData(currentLang), [currentLang]);

  const game = useMemo(() => {
    return ARCHIVE_DATA?.games?.find(g => g.id === gameId) || null;
  }, [gameId]);

  const { filteredCharacters, filteredLightCones, filteredRelics, filteredOrnaments, filterOptions } = useGalleryFilter(
    gameId, searchQuery, attrFilter, secondFilter, rarityFilter,
    CHARACTER_DB, LIGHTCONE_DB, WEAPON_DATA, RELIC_DB, ORNAMENT_DB
  );

  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <Activity className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO 
        title={`${game.title} 갤러리`} 
        description={`${game.title}의 캐릭터, 광추, 유물 및 장신구 도감을 확인하세요. 최신 업데이트 정보를 제공합니다.`}
      />
      {/* 상단바 */}
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 sticky top-16 z-[40] h-12 flex items-center px-8 shadow-2xl justify-between w-full">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[11px] font-black text-gray-500 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('이전으로')}</span>
          </button>
          <div className="h-3 w-px bg-white/10" />
          <nav className="flex items-center gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <Link to="/" className="flex items-center gap-2 hover:text-brand-accent transition-colors">
              <HomeIcon size={12} /> {t('메인')}
            </Link>
            <ChevronRight size={10} />
            <span className="text-brand-light/70">{game.title}</span>
            {activeMenu !== '홈' && (
              <>
                <ChevronRight size={10} />
                <span className="text-brand-accent">{t(activeMenu)}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        {/* 사이드바 */}
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />

        {/* 메인 섹션 */}
        <main className="min-h-[800px] space-y-16 relative z-10">
          {activeMenu === '캐릭터' ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8 mb-8">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">{t('캐릭터 도감')}</h2>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="relative w-full xl:w-72 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      autoComplete="off"
                      placeholder={t('캐릭터 명칭으로 필터링...')} 
                      className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold shadow-inner transition-all placeholder:text-gray-600"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3 items-center w-full">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mr-2">
                      <Filter size={12} /> FILTER
                    </div>
                    <FilterSelect 
                      label={gameId === 'hsr' ? t('운명의 길') : t('무기')} 
                      value={secondFilter} 
                      onChange={setSecondFilter} 
                      options={filterOptions.second} 
                    />
                    <FilterSelect 
                      label={t('속성')} 
                      value={attrFilter} 
                      onChange={setAttrFilter} 
                      options={filterOptions.attr} 
                    />
                    <FilterSelect 
                      label={t('등급')} 
                      value={rarityFilter} 
                      onChange={setRarityFilter} 
                      options={['5', '4']} 
                      formatOption={(opt: string) => `${opt}${t('성')}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredCharacters.map((char: any) => (
                  <CharacterPremiumCard key={char.id} char={char} />
                ))}
              </div>
            </div>
          ) : (activeMenu === '광추' || activeMenu === '무기') ? (
            <>
              <div className="space-y-12 animate-in fade-in duration-500">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8 mb-8">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">{gameId === 'ww' ? t('무기 도감') : t('광추 도감')}</h2>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="relative w-full xl:w-72 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      autoComplete="off"
                      placeholder={t('명칭으로 필터링...')} 
                      className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold shadow-inner transition-all placeholder:text-gray-600"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3 items-center w-full">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mr-2">
                      <Filter size={12} /> FILTER
                    </div>
                    <FilterSelect 
                      label={gameId === 'hsr' ? t('운명의 길') : t('무기')} 
                      value={secondFilter} 
                      onChange={setSecondFilter} 
                      options={filterOptions.second} 
                    />
                    <FilterSelect 
                      label={t('등급')} 
                      value={rarityFilter} 
                      onChange={setRarityFilter} 
                      options={['5', '4', '3']} 
                      formatOption={(opt: string) => `${opt}${t('성')}`}
                    />
                  </div>
                </div>
              </div>

              <AdPlaceholder type="leaderboard" className="my-8" />
              <AdPlaceholder type="leaderboard" className="my-8" />

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredLightCones.map((lc: any) => (
                  <LightConePremiumCard 
                    key={lc.id} 
                    lc={lc} 
                  />
                ))}
              </div>
            </div>
            </>
          ) : activeMenu === '유물 & 장신구' ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8 mb-8">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">{gameId === 'ww' ? t('에코 도감') : t('유물 & 장신구 도감')}</h2>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="relative w-full xl:w-72 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      autoComplete="off"
                      placeholder={t('명칭으로 필터링...')} 
                      className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold shadow-inner transition-all placeholder:text-gray-600"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                  
                  {gameId === 'hsr' && (
                    <div className="flex flex-wrap gap-3 items-center w-full">
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mr-2">
                        <Filter size={12} /> TYPE
                      </div>
                      <button 
                        onClick={() => setRelicSubTab('유물')}
                        className={`h-11 px-6 rounded-xl text-sm font-black transition-all border flex items-center justify-center ${relicSubTab === '유물' ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white/[0.03] border-white/5 text-gray-500 hover:bg-white/10'}`}
                      >
                        {t('터널 유물')}
                      </button>
                      <button 
                        onClick={() => setRelicSubTab('차원 장신구')}
                        className={`h-11 px-6 rounded-xl text-sm font-black transition-all border flex items-center justify-center ${relicSubTab === '차원 장신구' ? 'bg-brand-accent border-brand-accent text-black shadow-lg shadow-brand-accent/30' : 'bg-white/[0.03] border-white/5 text-gray-500 hover:bg-white/10'}`}
                      >
                        {t('차원 장신구')}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {gameId === 'hsr' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {relicSubTab === '유물' ? (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-brand-primary rounded-full" />
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">{t('터널 유물 아카이브')}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredRelics.map((relic: any) => (
                          <RelicPremiumCard key={relic.id} relic={relic} onClick={() => setSelectedRelic(relic)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-brand-accent rounded-full" />
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">{t('차원 장신구 아카이브')}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredOrnaments.map((ornament: any) => (
                          <OrnamentPremiumCard key={ornament.id} ornament={ornament} onClick={() => setSelectedOrnament(ornament)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Modals */}
              {selectedRelic && (
                <RelicDetailModal relic={selectedRelic} onClose={() => setSelectedRelic(null)} />
              )}
              {selectedOrnament && (
                <OrnamentDetailModal ornament={selectedOrnament} onClose={() => setSelectedOrnament(null)} />
              )}
            </div>
          ) : activeMenu === '공략' ? (
            <div className="space-y-12 animate-in fade-in duration-500">
               <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">{t('캐릭터 공략 모음')}</h2>
                    <p className="text-gray-600 font-bold text-sm">{t('캐릭터별 최적의 유물, 광추, 스탯 세팅 가이드를 확인하세요.')}</p>
                  </div>
                  
                  {/* 용어 사전 등 기타 가이드 링크 */}
                  <div className="flex gap-4">
                    <Link to={`/gallery/${gameId}/terminology`} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl transition-all">
                      <Book size={18} className="text-brand-accent" />
                      <span className="text-sm font-bold text-white">{t('용어 사전')}</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* 캐릭터 공략 리스트 (프리미엄 배너 카드 스타일) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCharacters.map((char: any) => (
                  <Link 
                    key={char.id} 
                    to={`/gallery/${gameId}/guide/${char.id}`}
                    className={`group relative isolate ${DESIGN_CONCEPT.EFFECTS.GLASS} hover:${DESIGN_CONCEPT.EFFECTS.GLOW} overflow-hidden transition-all duration-500 shadow-lg flex items-center h-[140px]`}
                    style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.CARD }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2/3" style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}>
                      <img 
                        src={char.gameId === 'hsr' 
                          ? `${CDN_URL}/hsr images/캐릭터/${encodeURIComponent((char.folderName || char.name).normalize('NFC'))}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
                          : `${CDN_URL}/ww images/characters/${encodeURIComponent((char.folderName || char.name).normalize('NFC'))}/art01.webp`
                        }
                        alt={char.name}
                        className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr images/items/unknown.webp`; }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
                    
                    <div className="relative z-10 p-6 flex flex-col justify-center h-full w-full">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-brand-primary/20 text-brand-accent text-[9px] font-black rounded-lg uppercase tracking-widest border border-brand-primary/30">
                          <Book size={10} /> {t('세팅 공략')}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight group-hover:text-brand-accent transition-colors truncate">
                        {t(char.name)}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">
                        {t(char.attribute)} · {t(char.gameId === 'hsr' ? char.path : char.weaponType)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : activeMenu === '인벤토리' ? (
            gameId === 'ww' ? <WuwaInventory /> : <InventoryGallery gameId={gameId} />
          ) : activeMenu === '에코' ? (
            <WuwaEchoGallery />
          ) : activeMenu === '홈' ? (
            <GameDashboard game={game} setActiveMenu={handleSetActiveMenu} />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 border border-dashed border-white/10 rounded-[48px] text-gray-600">
               <Layers size={48} className="mb-4 opacity-20" />
               <p className="font-black uppercase tracking-widest text-sm">{t('준비 중인 섹션입니다')}</p>
            </div>
          )}

          {/* 모든 메뉴 공통 최하단 광고 배너 1개 */}
          {activeMenu !== '홈' && activeMenu !== '인벤토리' && (
            <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
          )}
        </main>
      </div>

      <SearchModal isOpen={isGlobalSearchOpen} onClose={() => setIsGlobalSearchOpen(false)} gameId={gameId} />
    </div>
  );
};


const FilterSelect = ({ label, value, onChange, options, formatOption }: any) => {
  return (
    <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-2xl px-4 h-11 min-w-[44px] border border-white/5 hover:border-brand-primary/30 transition-colors">
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <div className="h-4 w-px bg-white/10" />
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs font-bold text-white focus:outline-none appearance-none cursor-pointer min-w-[60px] text-center"
      >
        <option value="전체" className="bg-[#1a1a1a]">ALL</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-[#1a1a1a]">
            {formatOption ? formatOption(opt) : opt}
          </option>
        ))}
      </select>
      <ChevronRight size={12} className="text-gray-600 rotate-90" />
    </div>
  );
};

export default Gallery;
