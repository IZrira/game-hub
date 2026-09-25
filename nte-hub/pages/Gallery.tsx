import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { Search, Users, Zap, Shield, Backpack, Bell, ChevronRight, Book, Filter, Star, Sparkles, ArrowRight, Boxes, CarFront, Gauge, Timer, Wrench, MapPin } from 'lucide-react';
import { ARCHIVE_DATA } from '../../common-hub/data/games';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { DESIGN_CONCEPT } from '../../common-hub/pages/theme';
import { useGalleryFilter } from '@/common-hub/hooks/useGalleryFilter';
import { CharacterPremiumCard, LightConePremiumCard, GuidePremiumCard } from '@/common-hub/components/GalleryCards';
import InventoryGallery from '../../common-hub/components/InventoryGallery';
import { NoticeListView, NoticeDetailModal, useNoticeBadge } from '../../common-hub/components/NoticeComponents';
import { Notice } from '../../common-hub/data/types';
import { getNTECartridgeImageUrl, NTE_CARTRIDGES, NTE_CARTRIDGE_EFFECT_TYPES } from '../data/cartridges';
import { getNTEVehicleImageUrl, NTE_VEHICLES, NTE_VEHICLE_TYPES } from '../data/vehicles';

const GalleryNTE: React.FC = () => {
  const gameId = 'nte';
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeMenu, setActiveMenu] = useState<string>(() => searchParams.get('menu') || '홈');
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [attrFilter, setAttrFilter] = useState(() => searchParams.get('attr') || '전체');
  const [secondFilter, setSecondFilter] = useState(() => searchParams.get('weapon') || '전체');
  const [rarityFilter, setRarityFilter] = useState(() => searchParams.get('rarity') || '전체');
  const [categoryFilter, setCategoryFilter] = useState(() => searchParams.get('category') || '전체');
  const { t } = useTranslation();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const { markAsRead } = useNoticeBadge();

  useEffect(() => {
    const menuParam = searchParams.get('menu') || '홈';
    if (menuParam !== activeMenu) setActiveMenu(menuParam);

    const searchParam = searchParams.get('search') || '';
    if (searchParam !== searchQuery) setSearchQuery(searchParam);

    const attrParam = searchParams.get('attr') || '전체';
    if (attrParam !== attrFilter) setAttrFilter(attrParam);

    const weaponParam = searchParams.get('weapon') || '전체';
    if (weaponParam !== secondFilter) setSecondFilter(weaponParam);

    const rarityParam = searchParams.get('rarity') || '전체';
    if (rarityParam !== rarityFilter) setRarityFilter(rarityParam);

    const categoryParam = searchParams.get('category') || '전체';
    if (categoryParam !== categoryFilter) setCategoryFilter(categoryParam);
  }, [searchParams]);

  const updateFilterParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === '전체') newParams.delete(key);
    else newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleSetActiveMenu = (menu: string) => {
    setActiveMenu(menu);
    const newParams: any = { menu };
    if (searchQuery) newParams.search = searchQuery;
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('search', val);
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { CHARACTER_DB, WEAPON_DB, ECHO_DB, INVENTORY_DB, GUIDES: NTE_CHARACTER_GUIDES } = useMemo(() => getGameData(gameId), [gameId]);
  const [gameNotices, setGameNotices] = useState<Notice[]>([]);

  const game = useMemo(() => ARCHIVE_DATA?.games?.find(g => g.id === gameId) || null, []);

  const { filteredCharacters, filteredLightCones, filterOptions } = useGalleryFilter(
    gameId, debouncedSearchQuery, attrFilter, secondFilter, rarityFilter,
    CHARACTER_DB, WEAPON_DB, WEAPON_DB, ECHO_DB, [], INVENTORY_DB, categoryFilter
  );

  const filteredCartridges = useMemo(() => {
    const normalizedQuery = debouncedSearchQuery.trim().toLocaleLowerCase('ko-KR');
    return NTE_CARTRIDGES.filter((cartridge) => {
      const matchesSearch = !normalizedQuery || [
        cartridge.name,
        cartridge.twoPieceEffect,
        cartridge.fourPieceEffect,
        ...cartridge.blocks,
      ].some((value) => value.toLocaleLowerCase('ko-KR').includes(normalizedQuery));
      const matchesType = attrFilter === '전체' || cartridge.effectType === attrFilter;
      return matchesSearch && matchesType;
    });
  }, [debouncedSearchQuery, attrFilter]);

  const filteredVehicles = useMemo(() => {
    const normalizedQuery = debouncedSearchQuery.trim().toLocaleLowerCase('ko-KR');
    const vehicles = NTE_VEHICLES.filter((vehicle) => {
      const matchesType = attrFilter === '전체' || vehicle.type === attrFilter;
      const matchesSearch = !normalizedQuery || [
        vehicle.name,
        vehicle.type,
        vehicle.description,
        vehicle.acquisition,
      ].some((value) => value.toLocaleLowerCase('ko-KR').includes(normalizedQuery));
      return matchesType && matchesSearch;
    });

    return [...vehicles].sort((a, b) => {
      if (secondFilter === '최고 속도순') return b.topSpeed - a.topSpeed;
      if (secondFilter === '가속순') return b.acceleration - a.acceleration;
      if (secondFilter === '내구도순') return (b.durability ?? -1) - (a.durability ?? -1);
      return 0;
    });
  }, [debouncedSearchQuery, secondFilter, attrFilter]);

  if (!game) return null;

  const seoTitle = activeMenu === '홈' 
    ? `${game.title}: ${t('이환')} ${t('아카이브 | 공략 및 데이터베이스')}`
    : `${game.title}: ${t('이환')} ${t(activeMenu)} ${t('도감 및 데이터베이스')}`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO 
        title={seoTitle} 
        description={`${game.title} ${t('데이터베이스입니다. 최신 캐릭터, 아크, 공략 및 티어표를 확인하세요.')}`}
        url={`/gallery/${gameId}?menu=${activeMenu}`}
        gameCategory={game.title}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: game.title, url: `/gallery/${gameId}` },
          { name: t(activeMenu), url: `/gallery/${gameId}?menu=${activeMenu}` }
        ]}
      />
      <PageHeader gameId="nte" title={activeMenu === '홈' ? '' : activeMenu} />

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />
        <main className="min-h-[800px] space-y-16 relative z-10">
          {activeMenu === '홈' ? (
            <div className="space-y-16">
              <section className="relative p-6 sm:p-10 md:p-12 rounded-[28px] sm:rounded-[40px] bg-[#0a0a0a] border border-white/5 overflow-hidden group">
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <div className="space-y-0.5">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
                      <span className="text-white">Neverness to </span>
                      <span className="text-brand-accent">Everness</span>
                    </h1>
                  </div>
                  <p className="text-gray-400 font-bold max-w-lg text-xs sm:text-sm md:text-base leading-relaxed border-l-2 border-brand-primary/50 pl-4 sm:pl-6">
                    {t("이환 아카이브에 오신 것을 환영합니다. 모든 캐릭터와 아크, 실전 조합 정보를 탐색하세요.")}
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "캐릭터", count: CHARACTER_DB?.length || 0, icon: <Users size={14} />, color: "text-blue-400" },
                  { label: "아크", count: WEAPON_DB?.length || 0, icon: <Zap size={14} />, color: "text-yellow-400" },
                  { label: "콘솔", count: NTE_CARTRIDGES.length, icon: <Boxes size={14} />, color: "text-violet-400" },
                  { label: "이동 수단", count: NTE_VEHICLES.length, icon: <CarFront size={14} />, color: "text-emerald-400" },
                  { label: "인벤토리", count: Object.keys(INVENTORY_DB || {}).length, icon: <Backpack size={14} />, color: "text-brand-accent" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-[28px] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center gap-1">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>{stat.icon}</div>
                    <span className="text-xl font-black text-white leading-none">{stat.count}</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none pt-1">{t(stat.label)}</span>
                  </div>
                ))}
              </div>

              {/* 데이터베이스 카테고리 허브 (Category Hub) */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('데이터베이스 카테고리')}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    {
                      title: t('캐릭터 도감'),
                      description: t('이환 세계관 내 캐릭터들의 프로필, 스킬 메커니즘 및 상세 능력치를 확인합니다.'),
                      path: '/gallery/nte?menu=캐릭터',
                      action: () => handleSetActiveMenu('캐릭터'),
                      icon: Users,
                      stat: `${CHARACTER_DB?.length || 0}${t('명')}`,
                      color: 'text-blue-400'
                    },
                    {
                      title: t('아크 도감'),
                      description: t('캐릭터가 장착하는 아크 및 무기의 고유 스킬과 돌파 효과를 확인합니다.'),
                      path: '/gallery/nte?menu=무기',
                      action: () => handleSetActiveMenu('무기'),
                      icon: Zap,
                      stat: `${WEAPON_DB?.length || 0}${t('개')}`,
                      color: 'text-yellow-400'
                    },
                    {
                      title: t('콘솔 카트리지'),
                      description: t('카트리지별 2세트·4세트 효과와 장착에 필요한 블록 구성을 비교합니다.'),
                      path: '/gallery/nte?menu=콘솔',
                      action: () => handleSetActiveMenu('콘솔'),
                      icon: Boxes,
                      stat: `${NTE_CARTRIDGES.length}${t('종')}`,
                      color: 'text-violet-400'
                    },
                    {
                      title: t('이동 수단 도감'),
                      description: t('자동차, 오토바이 등 이동 수단별 성능과 획득 방법을 한눈에 비교합니다.'),
                      path: '/gallery/nte?menu=이동 수단',
                      action: () => handleSetActiveMenu('이동 수단'),
                      icon: CarFront,
                      stat: `${NTE_VEHICLES.length}${t('종')}`,
                      color: 'text-emerald-400'
                    },
                    {
                      title: t('캐릭터 육성 공략'),
                      description: t('캐릭터별 최적 세팅 및 운용 가이드를 확인합니다.'),
                      path: '/gallery/nte?menu=공략',
                      action: () => handleSetActiveMenu('공략'),
                      icon: Book,
                      stat: t('실전 세팅'),
                      color: 'text-sky-400'
                    },
                    {
                      title: t('엔드콘텐츠 티어표'),
                      description: t('최신 메타 캐릭터 티어리스트를 확인합니다.'),
                      path: '/gallery/nte/tierlist',
                      icon: Star,
                      stat: t('메타 분석'),
                      color: 'text-amber-400'
                    },
                    {
                      title: t('추천 파티 조합'),
                      description: t('추천 파티 조합과 파티 시너지를 확인합니다.'),
                      path: '/gallery/nte/parties',
                      icon: Sparkles,
                      stat: t('파티 구성'),
                      color: 'text-rose-400'
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
                        className="group rounded-[28px] border border-white/5 bg-white/[0.02] p-6 transition hover:border-sky-500/40 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`rounded-xl bg-white/5 p-2.5 ${cat.color} group-hover:scale-110 transition-transform`}>
                            <Icon size={18} />
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">{cat.stat}</span>
                        </div>
                        <h4 className="mt-5 text-lg font-black text-white group-hover:text-sky-400 transition-colors">{cat.title}</h4>
                        <p className="mt-2 min-h-[40px] text-xs leading-5 text-gray-400">{cat.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-black text-sky-400 group-hover:translate-x-1 transition-transform">
                          {t('탐색하기')} <ArrowRight size={13} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('최근 업데이트')}</h3>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {CHARACTER_DB.slice(0, 5).map((char: any, idx: number) => (
                    <CharacterPremiumCard key={char.id} char={char} index={idx} />
                  ))}
                </div>
              </section>
            </div>
          ) : activeMenu === "캐릭터" ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8">{t("캐릭터 도감")}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" placeholder={t("캐릭터 명칭...")} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto">
                    <FilterSelect label={t("이능력 속성")} value={attrFilter} onChange={(val: string) => updateFilterParams('attr', val)} options={filterOptions.attr} />
                    <FilterSelect label={t("등급")} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={["5", "4"]} formatOption={(opt: string) => opt === '5' ? 'S' : opt === '4' ? 'A' : opt} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-4">
                {filteredCharacters.map((char: any, idx: number) => <CharacterPremiumCard key={char.id} char={char} index={idx} />)}
              </div>
            </div>
          ) : (activeMenu === "아크" || activeMenu === "무기") ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-6 sm:mb-8">{t("아크 도감")}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      placeholder={t("아크 명칭...")} 
                      className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" 
                      value={searchQuery} 
                      onChange={(e) => handleSearchChange(e.target.value)} 
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto">
                    <FilterSelect 
                      label={t("종류")} 
                      value={secondFilter} 
                      onChange={(val: string) => updateFilterParams('second', val)} 
                      options={filterOptions.second} 
                    />
                    <FilterSelect 
                      label={t("등급")} 
                      value={rarityFilter} 
                      onChange={(val: string) => updateFilterParams('rarity', val)} 
                      options={["5", "4", "3"]} 
                      formatOption={(opt: string) => opt === '5' ? 'S' : opt === '4' ? 'A' : opt === '3' ? 'B' : opt} 
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2.5 sm:gap-4">
                {filteredLightCones.map((arc: any) => (
                  <LightConePremiumCard key={arc.id || arc.name} lc={arc} />
                ))}
              </div>
            </div>
          ) : activeMenu === "콘솔" ? (
            <div className="space-y-8">
              <section className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-10 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <div className="flex flex-col gap-2 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-violet-400">NTE CONSOLE DATABASE</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase">콘솔 카트리지</h1>
                  <p className="max-w-2xl text-sm leading-6 text-gray-400">카트리지 이름, 세트 효과와 콘솔 배치에 필요한 블록 구성을 한 화면에서 비교할 수 있습니다.</p>
                </div>
                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
                  <div className="relative w-full xl:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="search"
                      placeholder="이름·효과·블록 검색"
                      aria-label="콘솔 카트리지 검색"
                      className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-violet-400"
                      value={searchQuery}
                      onChange={(event) => handleSearchChange(event.target.value)}
                    />
                  </div>
                  <FilterSelect
                    label="효과 유형"
                    value={attrFilter}
                    onChange={(value: string) => updateFilterParams('attr', value)}
                    options={NTE_CARTRIDGE_EFFECT_TYPES}
                    allLabel="전체"
                  />
                  <span className="text-xs font-bold text-gray-500">{filteredCartridges.length} / {NTE_CARTRIDGES.length}종</span>
                </div>
              </section>

              <div className="grid gap-5 xl:grid-cols-2">
                {filteredCartridges.map((cartridge) => (
                  <article key={cartridge.id} className="rounded-[28px] border border-white/10 bg-white/[0.025] p-5 sm:p-7 transition hover:border-violet-400/35 hover:bg-white/[0.04]">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/5 pb-5">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/15 to-orange-500/5">
                          <img
                            src={getNTECartridgeImageUrl(cartridge.imageFileName, 5)}
                            alt={`${cartridge.name} 5성 카트리지`}
                            className="h-full w-full object-contain p-1"
                            loading="lazy"
                          />
                          <span className="absolute bottom-1 right-1 rounded-md bg-black/75 px-1.5 py-0.5 text-[9px] font-black text-amber-300">5성</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-[0.22em] text-violet-400">CARTRIDGE</span>
                          <h2 className="mt-1 text-xl font-black text-white">{cartridge.name}</h2>
                        </div>
                      </div>
                      <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[10px] font-black text-violet-300">{cartridge.effectType}</span>
                    </div>
                    <dl className="mt-5 space-y-5">
                      <div className="grid gap-2 sm:grid-cols-[88px_1fr]">
                        <dt className="text-xs font-black text-sky-400">2세트 효과</dt>
                        <dd className="text-sm font-bold leading-6 text-gray-200">{cartridge.twoPieceEffect}</dd>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-[88px_1fr]">
                        <dt className="text-xs font-black text-amber-400">4세트 효과</dt>
                        <dd className="text-sm leading-6 text-gray-300">{cartridge.fourPieceEffect}</dd>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-[88px_1fr]">
                        <dt className="text-xs font-black text-gray-400">필요 블록</dt>
                        <dd className="flex flex-wrap gap-2">
                          {cartridge.blocks.map((block, index) => (
                            <span key={`${block}-${index}`} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-black text-gray-200">{block}</span>
                          ))}
                        </dd>
                      </div>
                      <div className="grid gap-3 border-t border-white/5 pt-5 sm:grid-cols-[88px_1fr]">
                        <dt className="text-xs font-black text-gray-400">등급별 외형</dt>
                        <dd className="flex flex-wrap gap-3">
                          {([5, 4, 3] as const).map((rarity) => (
                            <figure key={rarity} className="w-[72px]">
                              <div className={`aspect-square overflow-hidden rounded-xl border bg-black/25 ${rarity === 5 ? 'border-amber-400/35' : rarity === 4 ? 'border-violet-400/35' : 'border-blue-400/35'}`}>
                                <img
                                  src={getNTECartridgeImageUrl(cartridge.imageFileName, rarity)}
                                  alt={`${cartridge.name} ${rarity}성 카트리지`}
                                  className="h-full w-full object-contain p-1"
                                  loading="lazy"
                                />
                              </div>
                              <figcaption className={`mt-1 text-center text-[10px] font-black ${rarity === 5 ? 'text-amber-300' : rarity === 4 ? 'text-violet-300' : 'text-blue-300'}`}>{rarity}성</figcaption>
                            </figure>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>

              {filteredCartridges.length === 0 && (
                <div className="rounded-[28px] border border-white/5 bg-white/[0.02] py-16 text-center text-sm font-bold text-gray-500">조건에 맞는 카트리지가 없습니다.</div>
              )}

              <p className="px-2 text-xs leading-5 text-gray-500">현재 공개 자료를 기준으로 정리했으며, 정식 출시 및 업데이트에 따라 명칭과 수치가 달라질 수 있습니다.</p>
            </div>
          ) : (activeMenu === "이동 수단" || activeMenu === "차량") ? (
            <div className="space-y-8">
              <section className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-5 sm:p-8 md:p-10 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <div className="flex flex-col gap-2 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">NTE VEHICLE DATABASE</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black italic tracking-tighter uppercase">이동 수단 도감</h1>
                  <p className="max-w-2xl text-sm leading-6 text-gray-400">종류별 설명과 최고 속도, 가속, 내구도, 획득 방법을 비교할 수 있습니다.</p>
                </div>
                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
                  <div className="relative w-full xl:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="search"
                      placeholder="이름·종류·설명·획득처 검색"
                      aria-label="NTE 이동 수단 검색"
                      className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-400"
                      value={searchQuery}
                      onChange={(event) => handleSearchChange(event.target.value)}
                    />
                  </div>
                  <FilterSelect
                    label="종류"
                    value={attrFilter}
                    onChange={(value: string) => updateFilterParams('attr', value)}
                    options={NTE_VEHICLE_TYPES}
                    allLabel="전체"
                  />
                  <FilterSelect
                    label="정렬"
                    value={secondFilter}
                    onChange={(value: string) => updateFilterParams('weapon', value)}
                    options={['최고 속도순', '가속순', '내구도순']}
                    allLabel="기본순"
                  />
                  <span className="text-xs font-bold text-gray-500">{filteredVehicles.length} / {NTE_VEHICLES.length}종</span>
                </div>
              </section>

              <div className="grid gap-5 xl:grid-cols-2">
                {filteredVehicles.map((vehicle) => (
                  <article key={vehicle.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] transition hover:border-emerald-400/35 hover:bg-white/[0.04]">
                    <div className="grid sm:grid-cols-[210px_1fr]">
                      <div className="relative min-h-[190px] overflow-hidden border-b border-white/5 bg-gradient-to-br from-emerald-400/10 via-black/20 to-sky-500/10 sm:border-b-0 sm:border-r">
                        <img
                          src={getNTEVehicleImageUrl(vehicle.imageFileName)}
                          alt={`${vehicle.name} ${vehicle.type}`}
                          className="absolute inset-0 h-full w-full object-contain p-5 transition duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-[0.22em] text-emerald-400">MOBILITY</span>
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-black text-emerald-300">{vehicle.type}</span>
                        </div>
                        <h2 className="mt-2 text-2xl font-black text-white">{vehicle.name}</h2>
                        <p className="mt-3 text-sm leading-6 text-gray-400">{vehicle.description}</p>
                      </div>
                    </div>

                    <dl className="grid grid-cols-3 border-y border-white/5 bg-black/20">
                      <div className="flex flex-col items-center gap-1 border-r border-white/5 px-2 py-4 text-center">
                        <Gauge size={16} className="text-sky-400" />
                        <dt className="text-[9px] font-black uppercase tracking-wider text-gray-500">최고 속도</dt>
                        <dd className="text-sm font-black text-white">{vehicle.topSpeed} km/h</dd>
                      </div>
                      <div className="flex flex-col items-center gap-1 border-r border-white/5 px-2 py-4 text-center">
                        <Timer size={16} className="text-amber-400" />
                        <dt className="text-[9px] font-black uppercase tracking-wider text-gray-500">가속</dt>
                        <dd className="text-sm font-black text-white">{vehicle.acceleration}</dd>
                      </div>
                      <div className="flex flex-col items-center gap-1 px-2 py-4 text-center">
                        <Wrench size={16} className="text-violet-400" />
                        <dt className="text-[9px] font-black uppercase tracking-wider text-gray-500">내구도</dt>
                        <dd className="text-sm font-black text-white">{vehicle.durability?.toLocaleString('ko-KR') ?? '정보 없음'}</dd>
                      </div>
                    </dl>

                    <div className="flex items-start gap-3 p-5 sm:px-6">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-gray-500">획득 방법</p>
                        <p className="mt-1 text-sm font-bold leading-5 text-gray-200">{vehicle.acquisition}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredVehicles.length === 0 && (
                <div className="rounded-[28px] border border-white/5 bg-white/[0.02] py-16 text-center text-sm font-bold text-gray-500">조건에 맞는 이동 수단이 없습니다.</div>
              )}

              <p className="px-2 text-xs leading-5 text-gray-500">현재 공개 자료를 기준으로 정리했으며, 정식 출시 및 업데이트에 따라 명칭·수치·획득 방법이 달라질 수 있습니다.</p>
            </div>
          ) : activeMenu === "인벤토리" ? (
            <InventoryGallery 
              gameId="nte" 
              customCategories={["전체"]} 
            />
          ) : (
            <div className="py-20 text-center space-y-4 bg-white/[0.02] rounded-[40px] border border-white/5">
              <Book className="mx-auto text-gray-400 opacity-20" size={48} />
              <p className="text-gray-500 font-bold italic uppercase tracking-widest">{t('준비 중인 페이지입니다.')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options, formatOption, allLabel = 'ALL' }: any) => {
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
          {value === '전체' ? allLabel : (formatOption ? formatOption(value) : value)}
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
              {allLabel}
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

export default GalleryNTE;
