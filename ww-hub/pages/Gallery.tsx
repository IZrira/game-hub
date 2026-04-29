import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Home as HomeIcon, ChevronRight, Filter, Book, Activity as ActivityIcon, ArrowLeft,
  LayoutGrid, Users, Zap, Shield, Backpack, Sparkles, Bell
} from 'lucide-react';

import { ARCHIVE_DATA } from '../../common-hub/data/games';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SearchModal from '../../common-hub/components/SearchModal';
import { DESIGN_CONCEPT } from '../../common-hub/pages/theme';
import { useGalleryFilter } from '@/common-hub/hooks/useGalleryFilter';
import { LightConePremiumCard, CharacterPremiumCard, ItemPremiumCard, GuidePremiumCard } from '@/common-hub/components/GalleryCards';
import { ItemDetailModal } from '@/common-hub/components/GalleryModals';
import WuwaInventory from './WuwaInventory';
import WuwaEchoGallery from '../components/WuwaEchoGallery';
import { CDN_URL } from '@/common-hub/utils/assetManager';
import { NoticeListView, NoticeDetailModal, useNoticeBadge } from '../../common-hub/components/NoticeComponents';
import { GlowStatsDistribution, NeonDivider } from '../../common-hub/components/NeonComponents';
import { getCharacterArtPath } from '../../common-hub/utils/imageHelper';
// import removed
import { Notice } from '../../common-hub/data/types';

const GalleryWW: React.FC = () => {
  const gameId = 'ww';
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [activeMenu, setActiveMenu] = useState<string>(() => {
    return searchParams.get('menu') || '홈';
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || '';
  });
  const [attrFilter, setAttrFilter] = useState(() => searchParams.get('attr') || '전체');
  const [secondFilter, setSecondFilter] = useState(() => searchParams.get('weapon') || '전체');
  const [rarityFilter, setRarityFilter] = useState(() => searchParams.get('rarity') || '전체');
  const [categoryFilter, setCategoryFilter] = useState(() => searchParams.get('category') || '전체');
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
    const weaponParam = searchParams.get('weapon') || '전체';
    if (weaponParam !== secondFilter) setSecondFilter(weaponParam);
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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams: any = { menu: activeMenu };
    if (query) newParams.search = query;
    setSearchParams(newParams);
  };

  const { CHARACTER_DB, WEAPON_DB, ECHO_DB, WW_INVENTORY, GUIDES: WW_CHARACTER_GUIDES } = useMemo(() => getGameData(currentLang), [currentLang]);
  
  const [gameNotices, setGameNotices] = useState<Notice[]>([]);

  useEffect(() => {
    import('../../common-hub/data/notices').then(({ fetchNotices }) => {
      fetchNotices('ww').then(setGameNotices);
    });
  }, []);

  const game = useMemo(() => {
    return ARCHIVE_DATA?.games?.find(g => g.id === gameId) || null;
  }, []);

  const { filteredCharacters, filteredLightCones, filteredItems, filterOptions } = useGalleryFilter(
    gameId, searchQuery, attrFilter, secondFilter, rarityFilter,
    CHARACTER_DB, [], [], WEAPON_DB, ECHO_DB, WW_INVENTORY, categoryFilter
  );

  if (!game) return null;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO title={`${game.title} 갤러리`} description={`${game.title} 도감을 확인하세요.`} />
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 sticky top-16 z-[40] h-12 flex items-center px-8 shadow-2xl justify-between w-full">
        <div className="flex items-center gap-6">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-[11px] font-black text-gray-500 hover:text-white transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('이전으로')}</span>
          </button>
          <div className="h-3 w-px bg-white/10" />
          <nav className="flex items-center gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <Link to="/" className="flex items-center gap-2 hover:text-brand-accent transition-colors"><HomeIcon size={12} /> {t('메인')}</Link>
            <ChevronRight size={10} /><span className="text-brand-light/70">{game.title}</span>
            {activeMenu !== '홈' && <><ChevronRight size={10} /><span className="text-brand-accent">{t(activeMenu)}</span></>}
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />
        <main className="min-h-[800px] space-y-16 relative z-10">
          {activeMenu === '홈' ? (
            <div className="space-y-16">
              {/* 정제된 히어로 섹션: 명조 감성의 프리미엄 디자인 */}
              <section className="relative p-10 md:p-12 rounded-[40px] bg-[#0a0a0a] border border-white/5 overflow-hidden group">
                <div 
                  style={{
                    backgroundImage: `url(${getCharacterArtPath('ww', '기연')})`,
                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                    filter: 'brightness(0.35)',
                  }} 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                    <Sparkles size={12} className="text-brand-accent animate-pulse" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{t("Resonance Archive v1.0")}</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
                      <span className="text-white">Resonance </span>
                      <span className="text-brand-accent">Archive</span>
                    </h1>
                  </div>
                  
                  <p className="text-gray-400 font-bold max-w-lg text-sm md:text-base leading-relaxed border-l-2 border-brand-primary/50 pl-6">
                    {t("황폐해진 세상에서 피어나는 새로운 희망, 공명자님들의 여정을 돕는 정밀 데이터베이스입니다. 모든 공명 수치를 더욱 정밀하게 확인하십시오.")}
                  </p>
                </div>
              </section>

              {/* 월드 요약: 깔끔한 스타일 */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "캐릭터", count: CHARACTER_DB?.length || 0, icon: <Users size={14} />, color: "text-blue-400" },
                  { label: "무기", count: WEAPON_DB?.length || 0, icon: <Zap size={14} />, color: "text-yellow-400" },
                  { label: "에코", count: ECHO_DB?.length || 0, icon: <Shield size={14} />, color: "text-emerald-400" },
                  { label: "인벤토리", count: Object.keys(WW_INVENTORY || {}).length, icon: <Backpack size={14} />, color: "text-brand-accent" },
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

              {/* 데이터 시각화: 공명자 분석 */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 rounded-[32px] bg-white/[0.01] border border-white/5">
                <GlowStatsDistribution data={CHARACTER_DB} type="element" title="공명 속성 분포" />
                <GlowStatsDistribution data={CHARACTER_DB} type="path" title="공명자 역할 분포" />
              </section>

              {/* 최근 업데이트 캐릭터 행: 반응형 가로 스크롤 적용 */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('최근 공명자 업데이트')}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {CHARACTER_DB.slice(0, 5).map((char: any) => (
                    <CharacterPremiumCard key={char.id} char={char} />
                  ))}
                </div>
              </section>

              <NeonDivider />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* 메인 콘텐츠: 최근 공지사항 중심의 배치 */}
                <section className="xl:col-span-2 space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Bell size={14} /> {t('최신 업데이트 공지')}
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
                    notices={gameNotices} 
                    onNoticeClick={(n) => {
                      setSelectedNotice(n);
                      markAsRead(n.id);
                    }} 
                  />
                </section>
              </div>
              {selectedNotice && <NoticeDetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />}
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
                    <FilterSelect label={t("무기")} value={secondFilter} onChange={(val: string) => updateFilterParams('weapon', val)} options={filterOptions.second} />
                    <FilterSelect label={t("속성")} value={attrFilter} onChange={(val: string) => updateFilterParams('attr', val)} options={filterOptions.attr} />
                    <FilterSelect label={t("등급")} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={["5", "4"]} formatOption={(opt: string) => `${opt}${t("성")}`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredCharacters.map((char: any) => <CharacterPremiumCard key={char.id} char={char} />)}
              </div>
            </div>
          ) : activeMenu === '공지사항' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4">{t('공지사항 아카이브')}</h2>
                <p className="text-gray-400 text-sm">{t('명조 허브의 모든 소식과 업데이트 내역을 한눈에 확인하세요.')}</p>
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
          ) : activeMenu === "무기" ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t("무기 도감")}</h2>
                <div className="flex flex-col xl:flex-row gap-4 items-center">
                  <div className="relative w-full xl:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" placeholder={t("명칭 필터링...")} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <FilterSelect label={t("무기")} value={secondFilter} onChange={(val: string) => updateFilterParams('weapon', val)} options={filterOptions.second} />
                    <FilterSelect label={t("등급")} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={["5", "4", "3"]} formatOption={(opt: string) => `${opt}${t("성")}`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredLightCones.map((lc: any) => <LightConePremiumCard key={lc.id} lc={lc} />)}
              </div>
            </div>
          ) : activeMenu === "인벤토리" ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t("아이템 도감")}</h2>
                <div className="flex flex-wrap gap-3 items-center">
                  <FilterSelect label={t("분류")} value={categoryFilter} onChange={(val: string) => updateFilterParams('category', val)} options={["요리", "돌파 재료", "특수 화폐", "소모품", "무기 및 스킬 재료", "재료", "튜닝 관련 아이템", "에코 육성 재료", "공명자 경험치 재료", "무기 경험치 재료", "공명자 돌파 재료"]} />
                  <FilterSelect label={t("등급")} value={rarityFilter} onChange={(val: string) => updateFilterParams('rarity', val)} options={["5", "4", "3", "2", "1"]} formatOption={(opt: string) => `${opt}${t("성")}`} />
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {filteredItems.map((item: any, idx: number) => (
                  <ItemPremiumCard key={`${item.id}-${idx}`} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
              {selectedItem && <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            </div>
          ) : activeMenu === "에코" ? (
            <WuwaEchoGallery />
          ) : activeMenu === '공략' ? (
            <div className="space-y-12">
              <div className={`${DESIGN_CONCEPT.EFFECTS.GLASS} p-12 shadow-2xl relative z-20`} style={{ borderRadius: DESIGN_CONCEPT.ROUNDING.MODAL }}>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-8">{t('공명자 육성 공략')}</h2>
                <div className="relative w-full xl:w-72">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" placeholder={t('공명자 명칭...')} className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary" value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(WW_CHARACTER_GUIDES || [])
                  .filter((g: any) => !searchQuery || g.characterName.includes(searchQuery))
                  .map((guide: any) => {
                    const char = CHARACTER_DB.find((c: any) => c.name === guide.characterName || c.id === guide.characterName);
                    return { guide, char };
                  })
                  .filter(item => item.char)
                  .map((item: any, idx: number) => (
                    <GuidePremiumCard key={`${item.char.id}-${idx}`} char={item.char} guide={item.guide} />
                  ))}
                {(!WW_CHARACTER_GUIDES || WW_CHARACTER_GUIDES.length === 0) && (
                  <div className="col-span-full py-20 text-center space-y-4 bg-white/[0.02] rounded-[40px] border border-white/5">
                    <Book className="mx-auto text-gray-700 opacity-20" size={48} />
                    <p className="text-gray-500 font-bold italic uppercase tracking-widest">{t('준비 중인 공략입니다.')}</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options, formatOption }: any) => (
  <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-2xl px-4 h-11 border border-white/5">
    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-xs font-bold text-white focus:outline-none appearance-none cursor-pointer">
      <option value="전체">ALL</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{formatOption ? formatOption(opt) : opt}</option>)}
    </select>
    <ChevronRight size={12} className="text-gray-600 rotate-90" />
  </div>
);

export default GalleryWW;
