import React, { Suspense, lazy, useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router';
import { 
  Search, Home as HomeIcon, ChevronRight, Filter, Book, Activity as ActivityIcon, ArrowLeft,
  BookOpen, Users, Zap, Shield, Backpack, Bell, Sparkles, LayoutGrid, Star, ArrowRight
} from 'lucide-react';

import { ARCHIVE_DATA } from '../../common-hub/data/archive';
import HSR_CHARACTER_SUMMARY from '../data/generated/character-summary.json';
import HSR_GALLERY_SUMMARY from '../data/generated/gallery-summary.json';
import { useTranslation } from 'react-i18next';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import HubIntro from '../../common-hub/components/HubIntro';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SearchModal from '../../common-hub/components/SearchModal';
import { DESIGN_CONCEPT } from '../../common-hub/pages/theme';
import { useGalleryFilter } from '@/common-hub/hooks/useGalleryFilter';
import { CharacterPremiumCard, LightConePremiumCard, RelicPremiumCard, OrnamentPremiumCard, GuidePremiumCard } from '@/common-hub/components/GalleryCards';
import { RelicDetailModal, OrnamentDetailModal } from '@/common-hub/components/GalleryModals';
import { GlowStatsDistribution } from '../../common-hub/components/NeonComponents';
import ReviewedGuideHighlights from '../../common-hub/components/ReviewedGuideHighlights';

const InventoryGallery = lazy(() => import('../../common-hub/components/InventoryGallery'));

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
  const [lightConeDb, setLightConeDb] = useState<any[]>([]);
  const [relicDb, setRelicDb] = useState<any[]>([]);
  const [ornamentDb, setOrnamentDb] = useState<any[]>([]);
  const [guideDb, setGuideDb] = useState<any[]>([]);
  const [archiveDataLoading, setArchiveDataLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';

  useEffect(() => {
    const menuParam = searchParams.get('menu') || '홈';
    if (menuParam !== activeMenu) setActiveMenu(menuParam);
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

  const CHARACTER_DB = useMemo(() => HSR_CHARACTER_SUMMARY.map(character => ({
    ...character,
    gameId: 'hsr' as const,
    originalName: character.name,
    name: currentLang === 'en' ? t(character.name) : character.name,
    path: currentLang === 'en' ? t(character.path) : character.path,
    attribute: currentLang === 'en' ? t(character.attribute) : character.attribute,
  })), [currentLang, t]);
  const LIGHTCONE_DB = lightConeDb;
  const RELIC_DB = relicDb;
  const ORNAMENT_DB = ornamentDb;

  useEffect(() => {
    let cancelled = false;

    const loadArchiveData = async () => {
      if (activeMenu === '광추' && lightConeDb.length === 0) {
        setArchiveDataLoading(true);
        try {
          const module = await import('../data/lightcones');
          if (!cancelled) setLightConeDb(module.SORTED_LIGHTCONE_DATA);
        } finally {
          if (!cancelled) setArchiveDataLoading(false);
        }
      }

      if (activeMenu === '유물 & 장신구' && relicDb.length === 0 && ornamentDb.length === 0) {
        setArchiveDataLoading(true);
        try {
          const [relicModule, ornamentModule] = await Promise.all([
            import('../data/relics'),
            import('../data/ornaments')
          ]);
          if (!cancelled) {
            setRelicDb(relicModule.RELIC_DATA);
            setOrnamentDb(ornamentModule.ORNAMENT_DATA);
          }
        } finally {
          if (!cancelled) setArchiveDataLoading(false);
        }
      }

      if (activeMenu === '공략' && guideDb.length === 0) {
        setArchiveDataLoading(true);
        try {
          const module = await import('../data/generated/public-guide-catalog.json');
          if (!cancelled) setGuideDb(module.default);
        } finally {
          if (!cancelled) setArchiveDataLoading(false);
        }
      }
    };

    void loadArchiveData();
    return () => { cancelled = true; };
  }, [activeMenu, lightConeDb.length, relicDb.length, ornamentDb.length, guideDb.length]);
  


  const game = useMemo(() => {
    return ARCHIVE_DATA?.games?.find(g => g.id === gameId) || null;
  }, []);

  const { filteredCharacters, filteredLightCones, filteredRelics, filteredOrnaments, filteredItems, filterOptions } = useGalleryFilter(
    gameId, debouncedSearchQuery, attrFilter, secondFilter, rarityFilter,
    CHARACTER_DB, LIGHTCONE_DB, [], RELIC_DB, ORNAMENT_DB, {}, categoryFilter
  );

  if (!game) return null;

  const seoTitle = activeMenu === '홈'
    ? `${game.title} 데이터베이스 DB | 공략, 티어표, 육성 가이드 - 리라 아카이브`
    : `${game.title} ${activeMenu} 도감 DB | 공략, 티어표 - 리라 아카이브`;
  
  const seoDescription = activeMenu === '홈'
    ? `리라 아카이브는 ${game.title}(Honkai Star Rail)의 최신 캐릭터 공략, 종결 유물, 광추 세팅, 티어표를 제공하는 프리미엄 서브컬쳐 게임 데이터베이스(DB, gg)입니다.`
    : `${game.title} ${activeMenu} 전체 목록 및 세부 정보입니다. 서브컬쳐 데이터베이스 리라 아카이브에서 확인하세요.`;

  const seoUrl = activeMenu === '홈'
    ? `/gallery/${gameId}`
    : `/gallery/${gameId}?menu=${encodeURIComponent(activeMenu)}`;
  const breadcrumbs = activeMenu === '홈'
    ? [{ name: '홈', url: '/' }, { name: game.title, url: `/gallery/${gameId}` }]
    : [
        { name: '홈', url: '/' },
        { name: game.title, url: `/gallery/${gameId}` },
        { name: activeMenu, url: seoUrl },
      ];

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO 
        title={seoTitle} 
        description={seoDescription} 
        keywords={`리라 아카이브, 서브컬쳐 데이터베이스, 서브컬쳐 db, 서브컬쳐 gg, ${game.title}, Honkai Star Rail, 붕괴 스타레일, 붕스, 게임 공략, 티어표, 위키, DB, gg, ${activeMenu}`}
        url={seoUrl}
        gameCategory={game.title}
        breadcrumbData={breadcrumbs}
      />
      <PageHeader gameId="hsr" title={activeMenu === '홈' ? '' : activeMenu} />

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />
        <main className="min-h-[800px] space-y-16 relative z-10 min-w-0">
          {activeMenu !== '홈' && <h1 className="sr-only">{game.title} {activeMenu}</h1>}
          {activeMenu === '홈' ? (
            <div className="space-y-8 sm:space-y-10">
              <HubIntro title={t('붕괴: 스타레일')} description={t('캐릭터·광추·유물 도감과 목표 스탯, 세팅·파티 가이드를 확인하세요.')} stats={[{ label: t('캐릭터'), value: CHARACTER_DB.length }, { label: t('광추'), value: HSR_GALLERY_SUMMARY.counts.lightcones }, { label: t('유물 & 장신구'), value: HSR_GALLERY_SUMMARY.counts.relics + HSR_GALLERY_SUMMARY.counts.ornaments }, { label: t('아이템'), value: HSR_GALLERY_SUMMARY.counts.items }]} searchPath="/gallery/hsr?menu=캐릭터" searchLabel={t('캐릭터 이름 검색')} links={[{ label: t('캐릭터 도감'), to: '/gallery/hsr?menu=캐릭터' }, { label: t('캐릭터 육성 공략'), to: '/gallery/hsr?menu=공략' }, { label: t('추천 파티 조합'), to: '/gallery/hsr/parties' }]} />
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <h2 className="text-xl font-bold text-white">{t('최근 업데이트 캐릭터')}</h2>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {filteredCharacters
                    .slice(0, 5)
                    .map((char: any, idx: number) => (
                      <CharacterPremiumCard key={char.id} char={char} index={idx} />
                    ))}
                </div>
              </section>
              <ReviewedGuideHighlights gameId="hsr" accentClassName="text-brand-accent" variant="list" />

              {/* 데이터베이스 카테고리 허브 (Category Hub) */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <h2 className="text-xl font-bold text-white">{t('데이터베이스 카테고리')}</h2>
                </div>
                <div className="grid gap-x-6 sm:grid-cols-2">
                  {[
                    {
                      title: t('캐릭터 도감'),
                      description: t('속성·운명의 길별 전체 캐릭터와 기본 능력치, 행적 및 성혼을 확인합니다.'),
                      path: '/gallery/hsr?menu=캐릭터',
                      action: () => handleSetActiveMenu('캐릭터'),
                      icon: Users,
                      stat: `${CHARACTER_DB?.length || 0}${t('명')}`,
                      color: 'text-blue-400'
                    },
                    {
                      title: t('광추 도감'),
                      description: t('운명의 길별 광추 수치, 중첩 효과 및 추천 캐릭터를 확인합니다.'),
                      path: '/gallery/hsr?menu=광추',
                      action: () => handleSetActiveMenu('광추'),
                      icon: Zap,
                      stat: `${HSR_GALLERY_SUMMARY.counts.lightcones}${t('개')}`,
                      color: 'text-yellow-400'
                    },
                    {
                      title: t('유물 & 차원 장신구'),
                      description: t('터널 유물 및 차원 장신구의 세트 효과와 부위별 옵션을 확인합니다.'),
                      path: '/gallery/hsr?menu=유물%20%26%20장신구',
                      action: () => handleSetActiveMenu('유물 & 장신구'),
                      icon: LayoutGrid,
                      stat: `${HSR_GALLERY_SUMMARY.counts.relics + HSR_GALLERY_SUMMARY.counts.ornaments}${t('세트')}`,
                      color: 'text-purple-400'
                    },
                    {
                      title: t('캐릭터 육성 공략'),
                      description: t('실전 종결 세팅, 유물 및 광추 우선순위, 파티 조합 운용법을 탐색합니다.'),
                      path: '/gallery/hsr?menu=공략',
                      action: () => handleSetActiveMenu('공략'),
                      icon: BookOpen,
                      stat: t('실전 세팅'),
                      color: 'text-emerald-400'
                    },
                    {
                      title: t('엔드콘텐츠 티어표'),
                      description: t('혼돈의 기억 및 허구 이야기 엔드콘텐츠 최신 메타 티어를 확인합니다.'),
                      path: '/gallery/hsr/tierlist',
                      icon: Star,
                      stat: t('메타 분석'),
                      color: 'text-amber-400'
                    },
                    {
                      title: t('추천 파티 조합'),
                      description: t('시너지와 운명의 길을 고려한 정밀 4인 파티 추천 조합을 확인합니다.'),
                      path: '/gallery/hsr/parties',
                      icon: Sparkles,
                      stat: t('조합 가이드'),
                      color: 'text-brand-accent'
                    }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        onClick={(e) => {
                          if (cat.action) {
                            e.preventDefault();
                            cat.action();
                          }
                        }}
                        className="group block border-b border-white/10 py-4 transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`${cat.color}`}>
                            <Icon size={18} />
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cat.stat}</span>
                        </div>
                        <h3 className="mt-2 text-base font-black text-white group-hover:text-brand-primary transition-colors">{cat.title}</h3>
                        <p className="mt-2 text-xs leading-5 text-gray-400">{cat.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-black text-brand-primary group-hover:translate-x-1 transition-transform">
                          {t('탐색하기')} <ArrowRight size={13} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <details className="border-t border-white/10 pt-4">
                <summary className="cursor-pointer py-2 text-sm font-semibold text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300">{t('데이터 분포 보기')}</summary>
              {/* 데이터 시각화: 운명의 길 중심 분석 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <GlowStatsDistribution data={CHARACTER_DB} type="path" title="캐릭터 운명의 길 분포" />
                <GlowStatsDistribution data={HSR_GALLERY_SUMMARY.lightcones} type="path" title="광추 운명의 길 분포" />
              </div>

              </details>
            </div>
          ) : activeMenu === '캐릭터' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8">{t('캐릭터 도감')}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder={t('캐릭터 명칭...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto">
                    <FilterSelect label={t('운명의 길')} value={secondFilter} onChange={(val: string) => updateFilterParams('path', val)} options={filterOptions.second} />
                    <FilterSelect label={t('속성')} value={attrFilter} onChange={(val: string) => updateFilterParams('attr', val)} options={filterOptions.attr} />
                    <FilterSelect label={t('등급')} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={['5', '4']} formatOption={(opt: string) => `${opt}${t('성')}`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-4">
                {filteredCharacters.map((char: any, idx: number) => <CharacterPremiumCard key={char.id} char={char} index={idx} />)}
              </div>
            </div>

          ) : activeMenu === '광추' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8">{t('광추 도감')}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder={t('명칭 필터링...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto">
                    <FilterSelect label={t('운명의 길')} value={secondFilter} onChange={(val: string) => updateFilterParams('path', val)} options={filterOptions.second} />
                    <FilterSelect label={t('등급')} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={['5', '4', '3']} formatOption={(opt: string) => `${opt}${t('성')}`} />
                  </div>
                </div>
              </div>
              {archiveDataLoading && LIGHTCONE_DB.length === 0 ? (
                <div className="py-32 text-center text-sm font-bold text-gray-400">{t('광추 데이터를 불러오는 중입니다.')}</div>
              ) : (
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-4">
                  {filteredLightCones.map((lc: any) => <LightConePremiumCard key={lc.id} lc={lc} />)}
                </div>
              )}
            </div>
          ) : activeMenu === '유물 & 장신구' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8">{t('유물 & 장신구 도감')}</h2>
                <div className="flex flex-wrap gap-3 items-center">
                  <button onClick={() => setRelicSubTab('유물')} className={`h-11 px-6 rounded-xl font-black ${relicSubTab === '유물' ? 'bg-brand-primary text-white' : 'bg-white/5 text-gray-400'}`}>{t('터널 유물')}</button>
                  <button onClick={() => setRelicSubTab('차원 장신구')} className={`h-11 px-6 rounded-xl font-black ${relicSubTab === '차원 장신구' ? 'bg-brand-accent text-black' : 'bg-white/5 text-gray-400'}`}>{t('차원 장신구')}</button>
                </div>
              </div>
              {archiveDataLoading && RELIC_DB.length === 0 && ORNAMENT_DB.length === 0 ? (
                <div className="py-32 text-center text-sm font-bold text-gray-400">{t('유물 데이터를 불러오는 중입니다.')}</div>
              ) : relicSubTab === '유물' ? (
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
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8">{t('캐릭터 육성 공략')}</h2>
                <div className="relative w-full xl:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder={t('캐릭터 명칭...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                </div>
              </div>
              {archiveDataLoading && guideDb.length === 0 ? (
                <div className="py-32 text-center text-sm font-bold text-gray-400">{t('공략 데이터를 불러오는 중입니다.')}</div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(() => {
                  const normalizeGuideName = (name: string) => {
                    if (!name) return "";
                    return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
                  };
                  const seenCharIds = new Set<string>();
                  return guideDb
                    .filter((g: any) => !searchQuery || g.characterName.includes(searchQuery))
                    .map((guide: any) => {
                      const char = CHARACTER_DB.find((c: any) => 
                        c.name === guide.characterName || 
                        c.id === guide.characterName ||
                        normalizeGuideName(c.name) === normalizeGuideName(guide.characterName) ||
                        normalizeGuideName(c.folderName) === normalizeGuideName(guide.characterName)
                      );
                      return { guide, char };
                    })
                    .filter(item => {
                      if (!item.char) return false;
                      if (seenCharIds.has(item.char.id)) return false;
                      seenCharIds.add(item.char.id);
                      return true;
                    })
                    .sort((a, b) => {
                      // 캐릭터 탭의 정렬 로직과 동일하게 적용
                      const vA = parseFloat(a.char.releaseVersion || '1.0');
                      const vB = parseFloat(b.char.releaseVersion || '1.0');
                      if (vA !== vB) return vB - vA;
                      
                      const rA = a.char.rarity || 0;
                      const rB = b.char.rarity || 0;
                      if (rA !== rB) return rB - rA;

                      return (a.char.name || '').localeCompare(b.char.name || '', 'ko-KR');
                    })
                    .map((item: any, idx: number) => (
                      <GuidePremiumCard key={`${item.char.id}-${idx}`} char={item.char} guide={item.guide} />
                    ));
                })()}
              </div>
              )}
            </div>
          ) : activeMenu === '인벤토리' ? (
            <Suspense fallback={<div className="py-32 text-center text-sm font-bold text-gray-400">인벤토리를 불러오는 중입니다.</div>}>
              <InventoryGallery
                gameId="hsr"
                customCategories={["전체", "캐릭터 경험치 재료", "광추 경험치 재료", "유물 경험치 재료", "캐릭터 승급 재료", "행적 재료&광추 승급 재료", "행적 재료", "행적 재료&캐릭터 승급 재료", "합성 소재", "워프 아이템", "소모품", "통용 화폐", "시뮬레이션 우주"]}
              />
            </Suspense>
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
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">{label}</span>
        <span className="text-xs font-bold text-white min-w-[60px] text-left">
          {value === '전체' ? 'ALL' : (formatOption ? formatOption(value) : value)}
        </span>
        <ChevronRight size={12} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-[-90deg]' : 'rotate-90'}`} />
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
