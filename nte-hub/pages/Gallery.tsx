import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Search, Users, Zap, Shield, Backpack, Bell, ChevronRight, Book, Filter } from 'lucide-react';
import { ARCHIVE_DATA } from '../../common-hub/data/games';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { DESIGN_CONCEPT } from '../../common-hub/pages/theme';
import { useGalleryFilter } from '@/common-hub/hooks/useGalleryFilter';
import { CharacterPremiumCard, GuidePremiumCard } from '@/common-hub/components/GalleryCards';
import InventoryGallery from '../../common-hub/components/InventoryGallery';
import { NoticeListView, NoticeDetailModal, useNoticeBadge } from '../../common-hub/components/NoticeComponents';
import { Notice } from '../../common-hub/data/types';

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

  const { filteredCharacters, filterOptions } = useGalleryFilter(
    gameId, debouncedSearchQuery, attrFilter, secondFilter, rarityFilter,
    CHARACTER_DB, [], WEAPON_DB, ECHO_DB, [], INVENTORY_DB, categoryFilter
  );

  if (!game) return null;

  const seoTitle = activeMenu === '홈' 
    ? `${game.title}: ${t('이환')} ${t('아카이브 | 공략 및 데이터베이스')}`
    : `${game.title}: ${t('이환')} ${t(activeMenu)} ${t('도감 및 데이터베이스')}`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO 
        title={seoTitle} 
        description={`${game.title} ${t('데이터베이스입니다.')}`}
        url={`/gallery/${gameId}?menu=${activeMenu}`}
        gameCategory={game.title}
        noindex={true}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: game.title, url: `/gallery/${gameId}` },
          { name: t(activeMenu), url: `/gallery/${gameId}?menu=${activeMenu}` }
        ]}
      />
      <PageHeader gameId="nte" title={activeMenu === '홈' ? '' : activeMenu} />

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />
        <main className="min-h-[800px] space-y-16 relative z-10">
          {activeMenu === '홈' ? (
            <div className="space-y-16">
              <section className="relative p-10 md:p-12 rounded-[40px] bg-[#0a0a0a] border border-white/5 overflow-hidden group">
                <div className="relative z-10 space-y-6">
                  <div className="space-y-0.5">
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
                      <span className="text-white">Neverness to </span>
                      <span className="text-brand-accent">Everness</span>
                    </h1>
                  </div>
                  <p className="text-gray-400 font-bold max-w-lg text-sm md:text-base leading-relaxed border-l-2 border-brand-primary/50 pl-6">
                    {t("이환 아카이브에 오신 것을 환영합니다.")}
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "캐릭터", count: CHARACTER_DB?.length || 0, icon: <Users size={14} />, color: "text-blue-400" },
                  { label: "아크", count: WEAPON_DB?.length || 0, icon: <Zap size={14} />, color: "text-yellow-400" },
                  { label: "인벤토리", count: Object.keys(INVENTORY_DB || {}).length, icon: <Backpack size={14} />, color: "text-brand-accent" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-[28px] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center gap-1">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>{stat.icon}</div>
                    <span className="text-xl font-black text-white leading-none">{stat.count}</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none pt-1">{t(stat.label)}</span>
                  </div>
                ))}
              </div>

              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('최근 업데이트')}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {CHARACTER_DB.slice(0, 5).map((char: any, idx: number) => (
                    <CharacterPremiumCard key={char.id} char={char} index={idx} />
                  ))}
                </div>
              </section>
            </div>
          ) : activeMenu === "캐릭터" ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t("캐릭터 도감")}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" placeholder={t("캐릭터 명칭...")} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <FilterSelect label={t("이능력 속성")} value={attrFilter} onChange={(val: string) => updateFilterParams('attr', val)} options={filterOptions.attr} />
                    <FilterSelect label={t("등급")} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={["5", "4"]} formatOption={(opt: string) => opt === '5' ? 'S' : opt === '4' ? 'A' : opt} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredCharacters.map((char: any, idx: number) => <CharacterPremiumCard key={char.id} char={char} index={idx} />)}
              </div>
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

export default GalleryNTE;
