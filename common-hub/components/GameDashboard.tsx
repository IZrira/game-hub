import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  Shield, 
  Trophy, 
  BookOpen, 
  Map, 
  Calculator, 
  Gift, 
  Calendar, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Star,
  LayoutGrid,
  List,
  Flame,
  Sparkles
} from 'lucide-react';
import { Character, Game } from '../types';
import { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../data/games';
import { HSR_NOTICES } from '../../hsr-hub/data/notices';
import { WW_NOTICES } from '../../ww-hub/data/notices';
import { WEAPON_DATA } from '../../ww-hub/data/weapons';
import { Bell } from 'lucide-react';

interface GameDashboardProps {
  game: Game;
  setActiveMenu: (menu: string) => void;
}

const GameDashboard: React.FC<GameDashboardProps> = ({ game, setActiveMenu }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // CDN URL
  const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

  // Get latest characters
  const latestCharacters = CHARACTER_DB
    .filter(c => c.gameId === game.id)
    .slice(0, 7);

  // Get latest updates (Characters, Light Cones, Relics/Ornaments)
  const latestUpdates = [
    // 1. 캐릭터 매핑 수정 (art01.webp 사용)
    ...CHARACTER_DB.filter(c => c.gameId === game.id).slice(0, 3).map(c => ({
      id: c.id,
      name: c.name,
      type: '캐릭터',
      rarity: c.rarity,
      image: game.id === 'hsr' 
        ? encodeURI(`${CDN_URL}/hsr images/캐릭터/${(c.folderName || c.name).normalize('NFC')}/${c.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`)
        : encodeURI(`${CDN_URL}/ww images/characters/${(c.folderName || c.name).normalize('NFC')}/art01.webp`),
      link: `/gallery/${game.id}/character/${c.name}`
    })),
    
    // 2. 광추 / 무기 매핑 수정 (운명의 길 폴더 경로 추가 및 WW 데이터 분리)
    ...(game.id === 'ww' 
      ? [...WEAPON_DATA].reverse().slice(0, 3).map(w => ({
          id: w.id,
          name: w.name,
          type: '무기',
          rarity: w.rarity,
          image: encodeURI(`${CDN_URL}/ww images/Weapons/${w.name.normalize('NFC')}.webp`),
          link: `/gallery/ww/weapon/${encodeURIComponent(w.name)}`
        }))
      : LIGHTCONE_DB.filter(lc => lc.gameId === game.id).slice(0, 3).map(lc => {
          const targetName = lc.fileName || lc.folderName || lc.name;
          return {
            id: lc.id,
            name: lc.name,
            type: '광추',
            rarity: lc.rarity,
            image: encodeURI(`${CDN_URL}/hsr images/광추/${(lc.path || '').normalize('NFC')}/${targetName.normalize('NFC')}.webp`),
            link: `/gallery/${game.id}/lightcone/${lc.name}`
          };
        })
    ),
    
    // 3. 유물 매핑 수정 
    // (🚨 4.1 버전 기준 HSR은 신규 유물이 없으므로 0개, WW는 에코 2개 노출로 변경)
    ...[...RELIC_DB].filter(r => r.gameId === game.id).reverse().slice(0, game.id === 'ww' ? 2 : 0).map(r => {
      const isWW = game.id === 'ww';
      return {
        id: r.id,
        name: r.name,
        type: isWW ? '에코' : '유물',
        rarity: 5,
        image: isWW
          ? encodeURI(`${CDN_URL}/ww images/echoes/${r.name.normalize('NFC')}.webp`)
          : encodeURI(`${CDN_URL}/hsr images/유물/${r.name.normalize('NFC')}.webp`),
        link: `/gallery/${game.id}/relic/${r.name}`
      };
    }),
    
    // 4. 차원 장신구 매핑 수정 
    // (🚨 HSR 4.1 신규 장신구가 2개이므로 2개 노출로 변경)
    ...[...ORNAMENT_DB].filter(o => o.gameId === game.id).reverse().slice(0, game.id === 'hsr' ? 2 : 0).map(o => ({
      id: o.id,
      name: o.name,
      type: '장신구',
      rarity: 5,
      image: encodeURI(`${CDN_URL}/hsr images/차원 장신구/${o.name.normalize('NFC')}.webp`),
      link: `/gallery/${game.id}/ornament/${o.name}`
    }))
  ];

  const shortcuts = [
    { label: '캐릭터', icon: <Users size={20} />, action: () => setActiveMenu('캐릭터'), color: 'text-brand-accent' },
    { label: game.id === 'ww' ? '무기' : '광추', icon: <Zap size={20} />, action: () => setActiveMenu(game.id === 'ww' ? '무기' : '광추'), color: 'text-yellow-400' },
    { label: game.id === 'ww' ? '에코' : '유물 & 장신구', icon: <Shield size={20} />, action: () => setActiveMenu(game.id === 'ww' ? '에코' : '유물 & 장신구'), color: 'text-blue-400' },
    { label: '공략 모음', icon: <BookOpen size={20} />, action: () => setActiveMenu('공략'), color: 'text-green-400' },
    { label: '티어표', icon: <Trophy size={20} />, action: () => navigate(`/gallery/${game.id}/tierlist`), color: 'text-orange-500' },
    { label: '추천 파티 조합', icon: <Users size={20} />, action: () => navigate(`/gallery/${game.id}/parties`), color: 'text-pink-400' },
  ];

  const notices = game.id === 'hsr' ? HSR_NOTICES : WW_NOTICES;
  
  // Extract version from the latest update notice
  const latestUpdate = notices.find(n => n.type === 'update');
  const versionMatch = latestUpdate?.title.match(/v?\d+(\.\d+)+/i);
  const currentVersion = versionMatch ? versionMatch[0] : 'Latest';

  return (
    <div className={`relative min-h-[800px] rounded-[32px] overflow-hidden bg-[#0a0a0a] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={game.bannerImage} 
          alt={game.title}
          className="w-full h-[400px] object-cover opacity-20 mask-image-b-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a] to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-white italic tracking-tighter">{game.title}</h1>
              <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-brand-accent uppercase border border-white/5">
                {currentVersion} Updated
              </span>
            </div>
            <p className="text-gray-400 font-medium text-sm">{game.subTitle}</p>
          </div>
          
          {/* Quick Search */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="캐릭터, 광추, 공략 검색..." 
              className="w-full bg-[#151515] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Quick Access Grid (Shortcuts) */}
        <div>
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <LayoutGrid size={14} /> Quick Access
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {shortcuts.map((item, idx) => (
              <button 
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-[#151515] border border-white/5 hover:bg-[#202020] hover:border-white/10 hover:-translate-y-1 transition-all group"
              >
                <div className={`p-3 rounded-xl bg-[#0a0a0a] border border-white/5 group-hover:border-white/10 transition-colors ${item.color}`}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-gray-300 group-hover:text-white">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* New Characters Section */}
            <div className="bg-[#121212] rounded-[24px] border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-accent" /> 최신 캐릭터
                </h2>
                <button onClick={() => setActiveMenu('캐릭터')} className="text-xs font-bold text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
                  전체보기 <ChevronRight size={12} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {latestCharacters.map(char => (
                  <Link 
                    key={char.id} 
                    to={`/gallery/${game.id}/character/${char.name}`}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all"
                  >
                    <img 
                      src={game.id === 'hsr' 
                        ? encodeURI(`${CDN_URL}/hsr images/캐릭터/${(char.folderName || char.name).normalize('NFC')}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`)
                        : encodeURI(`${CDN_URL}/ww images/characters/${(char.folderName || char.name).normalize('NFC')}/art01.webp`)
                      }
                      alt={char.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white font-bold text-sm leading-none mb-1">{char.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase">{char.attribute}</p>
                        </div>
                        {char.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5" />}
                      </div>
                    </div>
                  </Link>
                ))}
                <button onClick={() => setActiveMenu('캐릭터')} className="aspect-[3/4] rounded-xl bg-[#1a1a1a] border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-white hover:bg-[#202020] hover:border-white/20 transition-all">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-xs font-bold">더보기</span>
                </button>
              </div>
            </div>

            {/* Latest Updates Section */}
            <div className="bg-[#121212] rounded-[24px] border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-primary" /> 최신 업데이트 목록
                </h2>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5">
                  New Content
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {latestUpdates.map((item, idx) => (
                  <Link 
                    key={`${item.id}-${idx}`}
                    to={item.link}
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/unknown.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                      <div className="flex justify-between items-end">
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm leading-none mb-1 truncate">{item.name}</p>
                          <p className={`text-[9px] font-black uppercase ${
                            item.type === '캐릭터' ? 'text-brand-accent' :
                            item.type === '광추' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`}>{item.type}</p>
                        </div>
                        {item.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5 flex-shrink-0" />}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Notice / Updates */}
            <div className="bg-[#121212] rounded-[24px] border border-white/5 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-black text-brand-accent uppercase tracking-widest flex items-center gap-2">
                  <Bell size={16} /> Notice
                </h2>
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              </div>
              
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="group cursor-default">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                        notice.type === 'update' ? 'text-brand-accent border-brand-accent/30 bg-brand-accent/10' :
                        notice.type === 'event' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                        'text-blue-400 border-blue-400/30 bg-blue-400/10'
                      }`}>
                        {notice.type.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-bold text-gray-600 flex items-center gap-1">
                        <Calendar size={10} /> {notice.date}
                      </span>
                    </div>
                    <h3 className="text-xs font-black text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                      {notice.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {notice.content}
                    </p>
                    <div className="mt-3 h-px bg-white/5 group-last:hidden" />
                  </div>
                ))}
                
                {notices.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">No Recent Notices</p>
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

export default GameDashboard;
