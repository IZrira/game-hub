
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  Box, Users, Zap, Shield, Backpack, ChevronRight, Sparkles, 
  Search, Star, Home as HomeIcon, X, Activity, ArrowUpRight, 
  TrendingUp, Filter, Layers, Sword, Book, Hash, ArrowLeft 
} from 'lucide-react';

import { ARCHIVE_DATA, CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../data/games';
import { ITEM_META } from '../data/items';
import { GLOBAL_SPECIAL_TERMS } from '../../hsr-hub/data/terms';
import { Category, Character, Post, LightCone } from '../types';
import InventoryGallery from '../components/InventoryGallery';
import GameDashboard from '../components/GameDashboard';
import GallerySidebar from '../components/GallerySidebar';
import SEO from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';

type SidebarMenu = string;

const ATTR_THEMES: Record<string, { color: string; shadow: string }> = {
  '화염': { color: '#FF4D4D', shadow: 'rgba(255, 77, 77, 0.5)' },
  '얼음': { color: '#3D8CFF', shadow: 'rgba(61, 140, 255, 0.5)' },
  '바람': { color: '#00E676', shadow: 'rgba(0, 230, 118, 0.5)' },
  '번개': { color: '#9D4DFF', shadow: 'rgba(157, 77, 255, 0.5)' },
  '양자': { color: '#8080FF', shadow: 'rgba(128, 128, 255, 0.5)' },
  '허수': { color: '#FFD600', shadow: 'rgba(255, 214, 0, 0.5)' },
  '물리': { color: '#A1A1A1', shadow: 'rgba(161, 161, 161, 0.5)' },
  '기류': { color: '#00E676', shadow: 'rgba(0, 230, 118, 0.5)' },
  '전도': { color: '#9D4DFF', shadow: 'rgba(157, 77, 255, 0.5)' },
  '회절': { color: '#FFD600', shadow: 'rgba(255, 214, 0, 0.5)' },
  '인멸': { color: '#FF4D4D', shadow: 'rgba(255, 77, 77, 0.5)' },
  '용융': { color: '#FF8A8A', shadow: 'rgba(255, 138, 138, 0.5)' },
  '응결': { color: '#3D8CFF', shadow: 'rgba(61, 140, 255, 0.5)' },
};

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

  const game = useMemo(() => {
    return ARCHIVE_DATA?.games?.find(g => g.id === gameId) || null;
  }, [gameId]);

  const filteredCharacters = useMemo(() => {
    if (!CHARACTER_DB) return [];
    return CHARACTER_DB.filter(c => {
      if (c.gameId !== gameId) return false;
      const matchesAttr = attrFilter === '전체' || c.attribute === attrFilter;
      const matchesSecond = secondFilter === '전체' || (gameId === 'hsr' ? c.path === secondFilter : c.weaponType === secondFilter);
      const matchesRarity = rarityFilter === '전체' || c.rarity === parseInt(rarityFilter);
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesAttr && matchesSecond && matchesSearch && matchesRarity;
    });
  }, [gameId, attrFilter, secondFilter, rarityFilter, searchQuery]);

  const filteredLightCones = useMemo(() => {
    if (!LIGHTCONE_DB) return [];
    return LIGHTCONE_DB.filter(lc => {
      if (lc.gameId !== gameId) return false;
      const matchesSecond = secondFilter === '전체' || (gameId === 'hsr' ? lc.path === secondFilter : lc.weaponType === secondFilter);
      const matchesRarity = rarityFilter === '전체' || lc.rarity === parseInt(rarityFilter);
      const matchesSearch = lc.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSecond && matchesSearch && matchesRarity;
    });
  }, [gameId, secondFilter, rarityFilter, searchQuery]);

  const filteredRelics = useMemo(() => {
    if (!RELIC_DB) return [];
    return RELIC_DB.filter(relic => {
      if (relic.gameId !== gameId) return false;
      const matchesSearch = relic.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [gameId, searchQuery]);

  const filteredOrnaments = useMemo(() => {
    if (!ORNAMENT_DB) return [];
    return ORNAMENT_DB.filter(ornament => {
      if (ornament.gameId !== gameId) return false;
      const matchesSearch = ornament.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [gameId, searchQuery]);

  const filterOptions = useMemo(() => {
    if (gameId === 'hsr') {
      return {
        second: ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'],
        attr: ['물리', '화염', '얼음', '번개', '바람', '양자', '허수']
      };
    } else {
      return {
        second: ['장검', '대검', '직검', '권갑', '증폭기', '권총'],
        attr: ['기류', '전도', '회절', '인멸', '용융', '응결']
      };
    }
  }, [gameId]);

  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <Activity className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">
      <SEO 
        title={`${game.title} 갤러리`} 
        description={`${game.title}의 캐릭터, 광추, 유물 및 장신구 도감을 확인하세요. 최신 업데이트 정보를 제공합니다.`}
      />
      {/* 상단바 */}
      <div className="bg-[#121212] border-b border-white/5 sticky top-16 z-[100] h-12 flex items-center px-8 shadow-2xl justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[11px] font-black text-gray-500 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>이전으로</span>
          </button>
          <div className="h-3 w-px bg-white/10" />
          <nav className="flex items-center gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <Link to="/" className="flex items-center gap-2 hover:text-brand-accent transition-colors">
              <HomeIcon size={12} /> 메인
            </Link>
            <ChevronRight size={10} />
            <span className="text-brand-light/70">{game.title}</span>
            {activeMenu !== '홈' && (
              <>
                <ChevronRight size={10} />
                <span className="text-brand-accent">{activeMenu}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        {/* 사이드바 */}
        <GallerySidebar activeMenu={activeMenu} setActiveMenu={handleSetActiveMenu} />

        {/* 메인 섹션 */}
        <main className="min-h-[800px] space-y-16">
          {activeMenu === '캐릭터' ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">캐릭터 도감</h2>
                  <div className="relative group w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                    <input 
                      type="text" 
                      autoComplete="off"
                      placeholder="유닛 검색..." 
                      className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary w-full font-bold"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/5 items-center animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mr-4">
                    <Filter size={12} /> FILTER
                  </div>
                  <FilterSelect 
                    label={gameId === 'hsr' ? '운명의 길' : '무기'} 
                    value={secondFilter} 
                    onChange={setSecondFilter} 
                    options={filterOptions.second} 
                  />
                  <FilterSelect 
                    label="속성" 
                    value={attrFilter} 
                    onChange={setAttrFilter} 
                    options={filterOptions.attr} 
                  />
                  <FilterSelect 
                    label="등급" 
                    value={rarityFilter} 
                    onChange={setRarityFilter} 
                    options={['5', '4']} 
                    formatOption={(opt: string) => `${opt}성`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredCharacters.map(char => (
                  <CharacterPremiumCard key={char.id} char={char} />
                ))}
              </div>
            </div>
          ) : (activeMenu === '광추' || activeMenu === '무기') ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">{gameId === 'ww' ? '무기 도감' : '광추 도감'}</h2>
                  <div className="relative group w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                    <input 
                      type="text" 
                      autoComplete="off"
                      placeholder="이름 검색..." 
                      className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary w-full font-bold"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/5 items-center animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mr-4">
                    <Filter size={12} /> FILTER
                  </div>
                  <FilterSelect 
                    label={gameId === 'hsr' ? '운명의 길' : '무기'} 
                    value={secondFilter} 
                    onChange={setSecondFilter} 
                    options={filterOptions.second} 
                  />
                  <FilterSelect 
                    label="등급" 
                    value={rarityFilter} 
                    onChange={setRarityFilter} 
                    options={['5', '4', '3']} 
                    formatOption={(opt: string) => `${opt}성`}
                  />
                </div>
              </div>

              <AdPlaceholder type="leaderboard" className="my-8" />
              <AdPlaceholder type="leaderboard" className="my-8" />

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {filteredLightCones.map(lc => (
                  <LightConePremiumCard key={lc.id} lc={lc} />
                ))}
              </div>
            </div>
          ) : (activeMenu === '유물 & 장신구' || activeMenu === '에코') ? (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase">{gameId === 'ww' ? '에코 도감' : '유물 & 장신구 도감'}</h2>
                  <div className="relative group w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                    <input 
                      type="text" 
                      autoComplete="off"
                      placeholder="이름 검색..." 
                      className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary w-full font-bold"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                </div>

                {gameId === 'hsr' && (
                  <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
                    <button 
                      onClick={() => setRelicSubTab('유물')}
                      className={`px-8 py-3 rounded-2xl text-sm font-black transition-all border ${relicSubTab === '유물' ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'}`}
                    >
                      터널 유물
                    </button>
                    <button 
                      onClick={() => setRelicSubTab('차원 장신구')}
                      className={`px-8 py-3 rounded-2xl text-sm font-black transition-all border ${relicSubTab === '차원 장신구' ? 'bg-brand-accent border-brand-accent text-black shadow-lg shadow-brand-accent/30' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'}`}
                    >
                      차원 장신구
                    </button>
                  </div>
                )}
              </div>

              {gameId === 'hsr' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {relicSubTab === '유물' ? (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-brand-primary rounded-full" />
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">터널 유물 아카이브</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredRelics.map(relic => (
                          <RelicPremiumCard key={relic.id} relic={relic} onClick={() => setSelectedRelic(relic)} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-brand-accent rounded-full" />
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">차원 장신구 아카이브</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredOrnaments.map(ornament => (
                          <OrnamentPremiumCard key={ornament.id} ornament={ornament} onClick={() => setSelectedOrnament(ornament)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {gameId === 'ww' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRelics.map(relic => (
                    <RelicPremiumCard key={relic.id} relic={relic} onClick={() => setSelectedRelic(relic)} />
                  ))}
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
               <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">캐릭터 공략 모음</h2>
                    <p className="text-gray-600 font-bold text-sm">캐릭터별 최적의 유물, 광추, 스탯 세팅 가이드를 확인하세요.</p>
                  </div>
                  
                  {/* 용어 사전 등 기타 가이드 링크 */}
                  <div className="flex gap-4">
                    <Link to={`/gallery/${gameId}/terminology`} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl transition-all">
                      <Book size={18} className="text-brand-accent" />
                      <span className="text-sm font-bold text-white">용어 사전</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* 캐릭터 공략 리스트 (프리미엄 배너 카드 스타일) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCharacters.map(char => (
                  <Link 
                    key={char.id} 
                    to={`/gallery/${gameId}/guide/${encodeURIComponent(char.name)}`} // 🚨 클릭 시 개별 공략 페이지로 이동!
                    className="group relative bg-[#121212] rounded-[32px] border border-white/5 overflow-hidden hover:border-brand-primary/50 transition-all duration-500 shadow-lg flex items-center h-[140px]"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2/3" style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}>
                      <img 
                        src={char.gameId === 'hsr' 
                          ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(char.folderName.normalize('NFC'))}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
                          : `${BASE_IMAGE_URL}/ww/characters/${encodeURIComponent(char.folderName.normalize('NFC'))}/art01.webp`
                        }
                        alt={char.name}
                        className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = `${BASE_IMAGE_URL}/items/unknown.webp`; }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
                    
                    <div className="relative z-10 p-6 flex flex-col justify-center h-full w-full">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-brand-primary/20 text-brand-accent text-[9px] font-black rounded-lg uppercase tracking-widest border border-brand-primary/30">
                          <Book size={10} /> 세팅 공략
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight group-hover:text-brand-accent transition-colors truncate">
                        {char.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">
                        {char.attribute} · {char.gameId === 'hsr' ? char.path : char.weaponType}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : activeMenu === '인벤토리' ? (
            <InventoryGallery gameId={gameId} />
          ) : activeMenu === '홈' ? (
            <GameDashboard game={game} setActiveMenu={handleSetActiveMenu} />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 border border-dashed border-white/10 rounded-[48px] text-gray-600">
               <Layers size={48} className="mb-4 opacity-20" />
               <p className="font-black uppercase tracking-widest text-sm">준비 중인 섹션입니다</p>
            </div>
          )}

          {/* 모든 메뉴 공통 최하단 광고 배너 1개 */}
          {activeMenu !== '홈' && activeMenu !== '인벤토리' && (
            <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
          )}
        </main>
      </div>
    </div>
  );
};

/* --- 에러 #31 방어용 서브 컴포넌트 --- */
// 🚨 수정 1: %20을 지우고 그냥 띄어쓰기('hsr images')로 바꿉니다. (encodeURI가 알아서 해줍니다)
const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';

// 🚨 수정 2: 유물 폴더 안에 바로 '유물명.webp'를 부르도록 복구 + 맥(Mac) 한글 깨짐 방지 추가
const getMainImageUrl = (item: any) => {
  const safeType = item.type.normalize('NFC');
  const safeName = item.name.normalize('NFC');
  if (item.gameId === 'ww') {
    return encodeURI(`${BASE_IMAGE_URL}/ww/echoes/${safeName}.webp`);
  }
  const url = `${BASE_IMAGE_URL}/${safeType}/${safeName}.webp`;
  return encodeURI(url);
};

// 🚨 수정 3: 유물 폴더 안에 바로 '파츠명.webp'를 부르도록 복구 + 맥(Mac) 한글 깨짐 방지 추가
const getPieceImageUrl = (item: any, pieceIndex: number) => {
  const safeType = item.type.normalize('NFC');
  const safePieceName = item.pieces[pieceIndex].normalize('NFC');
  if (item.gameId === 'ww') {
    return encodeURI(`${BASE_IMAGE_URL}/ww/echoes/${safePieceName}.webp`);
  }
  const url = `${BASE_IMAGE_URL}/${safeType}/${safePieceName}.webp`;
  return encodeURI(url);
};

const SidebarButton = ({ label, active, onClick, icon }: any) => {
  // label이 혹시라도 객체라면 문자열로 강제 변환하여 에러 #31 방지
  const safeLabel = typeof label === 'string' ? label : String(label);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-5 px-5 py-4 rounded-2xl transition-all border ${active ? 'bg-brand-primary/10 text-brand-accent border-brand-primary/20' : 'text-gray-600 hover:bg-white/[0.05] border-transparent'}`}
    >
      <div className={`p-2.5 rounded-xl ${active ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/50' : 'bg-white/5'}`}>
        {icon}
      </div>
      <span className="text-[14px] font-black tracking-tight">{safeLabel}</span>
    </button>
  );
};

const CharacterPremiumCard: React.FC<{ char: Character }> = ({ char }) => {
  const theme = ATTR_THEMES[char.attribute] || { color: '#ffffff', shadow: 'rgba(255, 255, 255, 0.2)' };
  
  const charImageUrl = char.gameId === 'hsr' 
    ? `${BASE_IMAGE_URL}/캐릭터/${char.folderName.normalize('NFC')}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
    : `${BASE_IMAGE_URL}/ww/characters/${char.folderName.normalize('NFC')}/art01.webp`;

  return (
    <Link to={`/gallery/${char.gameId}/character/${encodeURIComponent(char.name)}`} className="group relative aspect-[3/4.5] bg-[#0d0d0d] rounded-[24px] transition-all duration-500 hover:-translate-y-2">
      <div className="absolute inset-0 rounded-[24px] transition-all opacity-0 group-hover:opacity-30 blur-xl -z-10" style={{ backgroundColor: theme.color }} />
      <div className="relative w-full h-full rounded-[22px] border border-white/5 overflow-hidden bg-[#121212] group-hover:border-brand-primary/50 transition-all shadow-xl">
        <img 
          src={encodeURI(charImageUrl)}
          alt={char.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end">
          <div className="flex gap-0.5 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={8} fill={i < char.rarity ? "#FFD600" : "none"} className={i < char.rarity ? "text-[#FFD600]" : "text-gray-900"} />
            ))}
          </div>
          <h3 className="text-lg font-black text-white italic leading-none tracking-tighter truncate mb-1">{char.name}</h3>
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: theme.color }}>{char.attribute}</p>
        </div>
      </div>
    </Link>
  );
};

const LightConePremiumCard: React.FC<{ lc: LightCone }> = ({ lc }) => {
  const targetName = lc.fileName || lc.folderName;
  const lcImageUrl = lc.gameId === 'hsr'
    ? `${BASE_IMAGE_URL}/광추/${lc.path?.normalize('NFC')}/${targetName.normalize('NFC')}.webp`
    : `${BASE_IMAGE_URL}/ww/weapons/${targetName.normalize('NFC')}.webp`;

  return (
    <Link to={`/gallery/${lc.gameId}/${lc.gameId === 'ww' ? 'weapon' : 'lightcone'}/${encodeURIComponent(lc.name)}`} className="group relative aspect-[3/4.5] bg-[#0d0d0d] rounded-[24px] transition-all duration-500 hover:-translate-y-2">
      <div className="relative w-full h-full rounded-[22px] border border-white/5 overflow-hidden bg-[#121212] group-hover:border-brand-primary/50 transition-all shadow-xl">
        <img 
          src={encodeURI(lcImageUrl)}
          alt={lc.name}
          className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          style={{ 
            imageRendering: 'auto',
            transform: 'translateZ(0)'
          }}
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = `${BASE_IMAGE_URL}/items/unknown.webp`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end">
          <div className="flex gap-0.5 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={8} fill={i < lc.rarity ? "#FFD600" : "none"} className={i < lc.rarity ? "text-[#FFD600]" : "text-gray-900"} />
            ))}
          </div>
          <h3 className="text-lg font-black text-white italic leading-none tracking-tighter truncate mb-1">{lc.name}</h3>
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{lc.gameId === 'hsr' ? lc.path : lc.weaponType}</p>
        </div>
      </div>
    </Link>
  );
};

const RelicPremiumCard: React.FC<{ relic: any; onClick: () => void }> = ({ relic, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#121212] rounded-[32px] border border-white/5 p-6 hover:border-brand-primary/30 transition-all duration-500 cursor-pointer"
    >
      <div className="flex gap-6">
        <div className="w-24 h-24 rounded-2xl bg-white/5 p-2 flex items-center justify-center shrink-0">
          <img 
            src={getMainImageUrl(relic)}
            alt={relic.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp';
            }}
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1 pr-2">
          <h3 className="text-[14px] md:text-[16px] font-black text-white italic tracking-tighter truncate mb-1 whitespace-nowrap">{relic.name}</h3>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-accent text-[10px] font-black rounded-md uppercase tracking-widest">{relic.type}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={20} className="text-brand-primary" />
      </div>
    </div>
  );
};

const OrnamentPremiumCard: React.FC<{ ornament: any; onClick: () => void }> = ({ ornament, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#121212] rounded-[32px] border border-white/5 p-6 hover:border-brand-primary/30 transition-all duration-500 cursor-pointer"
    >
      <div className="flex gap-6">
        <div className="w-24 h-24 rounded-2xl bg-white/5 p-2 flex items-center justify-center shrink-0">
          <img 
            src={getMainImageUrl(ornament)}
            alt={ornament.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp';
            }}
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1 pr-2">
          <h3 className="text-[14px] md:text-[16px] font-black text-white italic tracking-tighter truncate mb-1 whitespace-nowrap">{ornament.name}</h3>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-accent text-[10px] font-black rounded-md uppercase tracking-widest">{ornament.type}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight size={20} className="text-brand-accent" />
      </div>
    </div>
  );
};

const RelicDetailModal = ({ relic, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative bg-[#121212] max-w-2xl w-full rounded-[48px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white z-20">
          <X size={24} />
        </button>
        
        <div className="p-12 space-y-10">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-3xl bg-white/5 p-4 flex items-center justify-center shrink-0 relative group">
              <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full opacity-50" />
              <img 
                src={getMainImageUrl(relic)}
                alt={relic.name}
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-brand-primary/20 text-brand-accent text-[11px] font-black rounded-full uppercase tracking-widest border border-brand-primary/30">
                  {relic.type}
                </span>
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter text-white">{relic.name}</h2>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* 세부 파츠 (위로 이동 및 1줄 정렬) */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> 세부 파츠
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {relic.pieces.map((piece: string, idx: number) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center text-center gap-3 group hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-black/20 p-2">
                      <img 
                        src={getPieceImageUrl(relic, idx)}
                        alt={piece}
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-bold text-gray-400 leading-tight group-hover:text-white transition-colors truncate w-full px-1">{piece}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 세트 효과 (아래로 이동 및 세로 배치) */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> 세트 효과
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2">2세트</div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed">{relic.setEffect['2piece']}</p>
                </div>
                {relic.setEffect['4piece'] && (
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                    <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2">4세트</div>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">{relic.setEffect['4piece']}</p>
                  </div>
                )}
                {relic.setEffect['5piece'] && (
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                    <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-2">5세트</div>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">{relic.setEffect['5piece']}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrnamentDetailModal = ({ ornament, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative bg-[#121212] max-w-2xl w-full rounded-[48px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white z-20">
          <X size={24} />
        </button>
        
        <div className="p-12 space-y-10">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-3xl bg-white/5 p-4 flex items-center justify-center shrink-0 relative group">
              <div className="absolute inset-0 bg-brand-accent/20 blur-2xl rounded-full opacity-50" />
              <img 
                src={getMainImageUrl(ornament)}
                alt={ornament.name}
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-brand-accent/20 text-brand-primary text-[11px] font-black rounded-full uppercase tracking-widest border border-brand-accent/30">
                  {ornament.type}
                </span>
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter text-white">{ornament.name}</h2>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {/* 세부 파츠 (위로 이동 및 1줄 정렬) */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> 세부 파츠
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {ornament.pieces.map((piece: string, idx: number) => (
                  <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-colors">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-black/20 p-2">
                      <img 
                        src={getPieceImageUrl(ornament, idx)}
                        alt={piece}
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 leading-tight group-hover:text-white transition-colors">{piece}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 세트 효과 (아래로 이동) */}
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> 세트 효과
              </h4>
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-4">2세트</div>
                <p className="text-gray-300 text-[15px] font-medium leading-relaxed italic">"{ornament.setEffect['2piece']}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options, formatOption }: any) => {
  return (
    <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-2xl px-4 py-2 border border-white/5 hover:border-brand-primary/30 transition-colors">
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
