import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Home as HomeIcon, ChevronRight, Filter, Book, Activity as ActivityIcon, ArrowLeft,
  BookOpen, Users, Zap, Shield, Backpack, Bell, Sparkles, LayoutGrid, Star
} from 'lucide-react';

import { ARCHIVE_DATA } from '../../common-hub/data/games';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SearchModal from '../../common-hub/components/SearchModal';
import { DESIGN_CONCEPT } from '../../common-hub/pages/theme';
import { useGalleryFilter } from '@/common-hub/hooks/useGalleryFilter';
import { CharacterPremiumCard, LightConePremiumCard, RelicPremiumCard, OrnamentPremiumCard, ItemPremiumCard, GuidePremiumCard } from '@/common-hub/components/GalleryCards';
import { RelicDetailModal, OrnamentDetailModal, ItemDetailModal } from '@/common-hub/components/GalleryModals';
import { CDN_URL } from '@/common-hub/utils/assetManager';
import { NoticeListView, NoticeDetailModal, useNoticeBadge } from '../../common-hub/components/NoticeComponents';
import InventoryGallery from '../../common-hub/components/InventoryGallery';
import { GlowStatsDistribution, NeonDivider } from '../../common-hub/components/NeonComponents';
import { getCharacterArtPath, getCharacterImage } from '../../common-hub/utils/imageHelper';
// import removed
import { Notice } from '../../common-hub/data/types';

const GalleryHSR: React.FC = () => {
  const gameId = 'hsr';
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeMenu, setActiveMenu] = useState<string>(() => {
    return searchParams.get('menu') || '홈';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [attrFilter, setAttrFilter] = useState(() => searchParams.get('attr') || '전체');
  const [secondFilter, setSecondFilter] = useState(() => searchParams.get('path') || '전체');
  const [rarityFilter, setRarityFilter] = useState(() => searchParams.get('rarity') || '전체');
  const [categoryFilter, setCategoryFilter] = useState(() => searchParams.get('category') || '전체');
  const [relicSubTab, setRelicSubTab] = useState<'유물' | '차원 장신구'>('유물');
  const [selectedRelic, setSelectedRelic] = useState<any>(null);
  const [selectedOrnament, setSelectedOrnament] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const { markAsRead } = useNoticeBadge();

  useEffect(() => {
    const menuParam = searchParams.get('menu');
    if (menuParam && menuParam !== activeMenu) setActiveMenu(menuParam);
    const searchParam = searchParams.get('search');
    if (searchParam !== null && searchParam !== searchQuery) setSearchQuery(searchParam);
    
    const attrParam = searchParams.get('attr') || '전체';
    if (attrParam !== attrFilter) setAttrFilter(attrParam);
    const pathParam = searchParams.get('path') || '전체';
    if (pathParam !== secondFilter) setSecondFilter(pathParam);
    const rarityParam = searchParams.get('rarity') || '전체';
    if (rarityParam !== rarityFilter) setRarityFilter(rarityParam);
    const categoryParam = searchParams.get('category') || '전체';
    if (categoryParam !== categoryFilter) setCategoryFilter(categoryParam);
  }, [searchParams]);

  const updateFilterParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === '전체') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleSetActiveMenu = (menu: string) => {
    setActiveMenu(menu);
    const newParams: any = { menu };
    if (searchQuery) newParams.search = searchQuery;
    setSearchParams(newParams);
  };

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // 검색 디바운스 로직: 타이핑 시 깜빡임 및 상단 튀기 방지
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      
      const newParams = new URLSearchParams(searchParams);
      if (searchQuery) {
        newParams.set('search', searchQuery);
      } else {
        newParams.delete('search');
      }
      setSearchParams(newParams, { replace: true });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB, HSR_INVENTORY, GUIDES: HSR_CHARACTER_GUIDES } = useMemo(() => {
    // If it's English, we use 'en' (which defaults to HSR in dataManager), 
    // otherwise we pass the explicit gameId to get the correct dataset
    return getGameData(currentLang === 'en' ? 'en' : gameId);
  }, [currentLang, gameId]);
  
  const [gameNotices, setGameNotices] = useState<Notice[]>([]);

  useEffect(() => {
    import('../../common-hub/data/notices').then(({ fetchNotices }) => {
      fetchNotices('hsr').then(setGameNotices);
    });
  }, []);

  const game = useMemo(() => {
    return ARCHIVE_DATA?.games?.find(g => g.id === gameId) || null;
  }, []);

  const { filteredCharacters, filteredLightCones, filteredRelics, filteredOrnaments, filteredItems, filterOptions } = useGalleryFilter(
    gameId, debouncedSearchQuery, attrFilter, secondFilter, rarityFilter,
    CHARACTER_DB, LIGHTCONE_DB, [], RELIC_DB, ORNAMENT_DB, HSR_INVENTORY, categoryFilter
  );

  if (!game) return null;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO title={`${game.title} 갤러리`} description={`${game.title} 도감을 확인하세요.`} />
      <PageHeader gameId="hsr" title={activeMenu === '홈' ? '' : activeMenu} />

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />
        <main className="min-h-[800px] space-y-16 relative z-10">
          {activeMenu === '홈' ? (
            <div className="space-y-16">
              {/* 정제된 히어로 섹션: 더 깔끔하고 가독성 높은 프리미엄 디자인 */}
              <section className="relative p-10 md:p-12 rounded-[40px] bg-[#0a0a0a] border border-white/5 overflow-hidden group">
                <div 
                  style={{
                    backgroundImage: `url(${getCharacterArtPath('hsr', '애쉬베일')})`,
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    filter: 'brightness(0.35)',
                  }} 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                    <Sparkles size={12} className="text-brand-accent animate-pulse" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{t('HSR Archive v1.0')}</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
                      <span className="text-white">HSR </span>
                      <span className="text-brand-accent">Archive</span>
                    </h1>
                  </div>
                  
                  <p className="text-gray-400 font-bold max-w-lg text-sm md:text-base leading-relaxed border-l-2 border-brand-primary/50 pl-6">
                    {t('은하 열차의 여정을 기록하는 가장 정밀한 데이터베이스입니다. 모든 개척자님들을 위한 정밀 공략 자료를 탐사하세요.')}
                  </p>
                </div>
              </section>

              {/* 통계 요약: 깔끔한 스타일 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: '캐릭터', count: CHARACTER_DB?.length || 0, icon: <Users size={14} />, color: 'text-blue-400' },
                  { label: '광추', count: LIGHTCONE_DB?.length || 0, icon: <Zap size={14} />, color: 'text-yellow-400' },
                  { label: '유물 & 장신구', count: (RELIC_DB?.length || 0) + (ORNAMENT_DB?.length || 0), icon: <LayoutGrid size={14} />, color: 'text-purple-400' },
                  { label: '아이템', count: Object.keys(HSR_INVENTORY || {}).length, icon: <Backpack size={14} />, color: 'text-brand-accent' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-[28px] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center gap-1 group hover:bg-white/[0.04] transition-all">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <span className="text-xl font-black text-white leading-none">{stat.count}</span>
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none pt-1">{t(stat.label)}</span>
                  </div>
                ))}
              </div>

              {/* 데이터 시각화: 운명의 길 중심 분석 */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 rounded-[32px] bg-white/[0.01] border border-white/5">
                <GlowStatsDistribution data={CHARACTER_DB} type="path" title="캐릭터 운명의 길 분포" />
                <GlowStatsDistribution data={LIGHTCONE_DB} type="path" title="광추 운명의 길 분포" />
              </section>

              {/* 최근 업데이트 캐릭터 행: 반응형 가로 스크롤 적용 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('최근 업데이트 캐릭터')}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[...CHARACTER_DB]
                    .sort((a, b) => {
                      const vA = parseFloat(a.releaseVersion || '1.0');
                      const vB = parseFloat(b.releaseVersion || '1.0');
                      if (vA !== vB) return vB - vA;
                      
                      // 4.2 버전 특별 정렬
                      if (vA === 4.2) {
                        const order42 = ['에바네시아', '은랑 LV.999', '개척자 (환락)'];
                        const idxA = order42.indexOf(a.name);
                        const idxB = order42.indexOf(b.name);
                        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                      }

                      return (b.rarity || 0) - (a.rarity || 0);
                    })
                    .slice(0, 5)
                    .map((char: any, idx: number) => (
                      <CharacterPremiumCard key={char.id} char={char} index={idx} />
                    ))}
                </div>
              </section>

              <NeonDivider />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* 메인 콘텐츠: 최근 공지사항 중심의 배치 */}
                <section className="xl:col-span-2 space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Bell size={14} /> {t('최신 공지사항')}
                    </h3>
                    <button 
                      onClick={() => {
                        setSearchParams({ menu: '공지사항' });
                        setActiveMenu('공지사항');
                      }}
                      className="text-[10px] font-black text-brand-primary hover:text-brand-accent transition-all flex items-center gap-1 group"
                    >
                      {t('전체 보기')} <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <NoticeListView 
                    notices={gameNotices.slice(0, 3)} 
                    onNoticeClick={(n) => {
                      setSelectedNotice(n);
                      markAsRead(n.id);
                    }} 
                  />
                </section>
              </div>
              {selectedNotice && <NoticeDetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />}
            </div>
          ) : activeMenu === '캐릭터' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t('캐릭터 도감')}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" placeholder={t('캐릭터 명칭...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <FilterSelect label={t('운명의 길')} value={secondFilter} onChange={(val: string) => updateFilterParams('path', val)} options={filterOptions.second} />
                    <FilterSelect label={t('속성')} value={attrFilter} onChange={(val: string) => updateFilterParams('attr', val)} options={filterOptions.attr} />
                    <FilterSelect label={t('등급')} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={['5', '4']} formatOption={(opt: string) => `${opt}${t('성')}`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredCharacters.map((char: any, idx: number) => <CharacterPremiumCard key={char.id} char={char} index={idx} />)}
              </div>
            </div>
          ) : activeMenu === '공지사항' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4">{t('공지사항 아카이브')}</h2>
                <p className="text-gray-400 text-sm">{t('리라 아카이브의 모든 소식과 업데이트 내역을 확인하세요.')}</p>
              </div>
              <div className="glass-card p-10 rounded-[40px] border border-white/5">
                <NoticeListView 
                  notices={gameNotices} 
                  onNoticeClick={(n) => {
                    setSelectedNotice(n);
                    markAsRead(n.id);
                  }} 
                />
              </div>
            </div>
          ) : activeMenu === '광추' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t('광추 도감')}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" placeholder={t('명칭 필터링...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <FilterSelect label={t('운명의 길')} value={secondFilter} onChange={(val: string) => updateFilterParams('path', val)} options={filterOptions.second} />
                    <FilterSelect label={t('등급')} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={['5', '4', '3']} formatOption={(opt: string) => `${opt}${t('성')}`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredLightCones.map((lc: any) => <LightConePremiumCard key={lc.id} lc={lc} />)}
              </div>
            </div>
          ) : activeMenu === '유물 & 장신구' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t('유물 & 장신구 도감')}</h2>
                <div className="flex flex-wrap gap-3 items-center">
                  <button onClick={() => setRelicSubTab('유물')} className={`h-11 px-6 rounded-xl font-black ${relicSubTab === '유물' ? 'bg-brand-primary text-white' : 'bg-white/5 text-gray-500'}`}>{t('터널 유물')}</button>
                  <button onClick={() => setRelicSubTab('차원 장신구')} className={`h-11 px-6 rounded-xl font-black ${relicSubTab === '차원 장신구' ? 'bg-brand-accent text-black' : 'bg-white/5 text-gray-500'}`}>{t('차원 장신구')}</button>
                </div>
              </div>
              {relicSubTab === '유물' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRelics.map((relic: any) => <RelicPremiumCard key={relic.id} relic={relic} onClick={() => setSelectedRelic(relic)} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredOrnaments.map((orn: any) => <OrnamentPremiumCard key={orn.id} ornament={orn} onClick={() => setSelectedOrnament(orn)} />)}
                </div>
              )}
              {selectedRelic && <RelicDetailModal relic={selectedRelic} onClose={() => setSelectedRelic(null)} />}
              {selectedOrnament && <OrnamentDetailModal ornament={selectedOrnament} onClose={() => setSelectedOrnament(null)} />}
            </div>
          ) : activeMenu === '공략' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t('캐릭터 육성 공략')}</h2>
                <div className="relative w-full xl:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" placeholder={t('캐릭터 명칭...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(HSR_CHARACTER_GUIDES || [])
                  .filter((g: any) => !searchQuery || g.characterName.includes(searchQuery))
                  .map((guide: any) => {
                    const char = CHARACTER_DB.find((c: any) => c.name === guide.characterName || c.id === guide.characterName);
                    return { guide, char };
                  })
                  .filter(item => item.char) // 캐릭터 정보가 있는 공략만 표시
                  .sort((a, b) => {
                    // 캐릭터 탭의 정렬 로직과 동일하게 적용
                    const vA = parseFloat(a.char.releaseVersion || '1.0');
                    const vB = parseFloat(b.char.releaseVersion || '1.0');
                    if (vA !== vB) return vB - vA;
                    
                    const rA = a.char.rarity || 0;
                    const rB = b.char.rarity || 0;
                    return rB - rA;
                  })
                  .map((item: any, idx: number) => (
                    <GuidePremiumCard key={`${item.char.id}-${idx}`} char={item.char} guide={item.guide} />
                  ))}
              </div>
            </div>
          ) : activeMenu === '인벤토리' ? (
            <InventoryGallery 
              gameId="hsr" 
              customCategories={["전체", "캐릭터 경험치 재료", "광추 경험치 재료", "유물 경험치 재료", "캐릭터 승급 재료", "행적 재료&광추 승급 재료", "행적 재료", "행적 재료&캐릭터 승급 재료", "합성 소재", "워프 아이템", "소모품", "통용 화폐", "시뮬레이션 우주"]} 
            />
          ) : null}
        </main>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options, formatOption }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 bg-[#1a1a1a] rounded-2xl px-4 h-11 border transition-all ${isOpen ? 'border-brand-primary/50 bg-[#222]' : 'border-white/5 hover:border-white/20'}`}
      >
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{label}</span>
        <span className="text-xs font-bold text-white min-w-[60px] text-left">
          {value === '전체' ? 'ALL' : (formatOption ? formatOption(value) : value)}
        </span>
        <ChevronRight size={12} className={`text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-[-90deg]' : 'rotate-90'}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[160px] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-[100]">
          <div className="max-h-[300px] overflow-y-auto py-2 custom-scrollbar">
            <button
              onClick={() => {
                onChange('전체');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-colors ${value === '전체' ? 'bg-brand-primary/20 text-brand-accent' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              ALL
            </button>
            {options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-xs font-bold transition-colors ${value === opt ? 'bg-brand-primary/20 text-brand-accent' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                {formatOption ? formatOption(opt) : opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryHSR;
