import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
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
import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getGameData } from '../data/dataManager';
import { safeEncodeURIComponent } from '../utils/assetManager';
import { stripMarkdown } from '../utils/markdown';
import { GrowthPlannerWidget } from './GrowthPlannerWidget';

interface GameDashboardProps {
  game: Game;
  setActiveMenu: (menu: string) => void;
}

const GameDashboard: React.FC<GameDashboardProps> = ({ game, setActiveMenu }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB, WEAPON_DATA } = useMemo(() => getGameData(currentLang), [currentLang]);

  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // CDN URL
  const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

  const getWwCharacterImage = (folder: string) => {
    let mappedFolder = (folder || '').trim();
    if (!mappedFolder) return '';
    const isRover = mappedFolder.startsWith('방랑자');
    if (isRover && mappedFolder === '방랑자 · 전도') {
      mappedFolder = '방랑자 · 회절';
    }
    const fileName = isRover ? `${mappedFolder}(여)` : mappedFolder;
    return `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(mappedFolder)}/${safeEncodeURIComponent(fileName)}.webp`;
  };

  const parseReleaseVersion = (v: any) => {
    if (!v) return 0;
    const match = String(v).match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  const sortedGameCharacters = [...CHARACTER_DB]
    .filter((c: Character) => c.gameId === game.id)
    .sort((a, b) => {
      const vA = parseReleaseVersion(a.releaseVersion);
      const vB = parseReleaseVersion(b.releaseVersion);
      if (vA !== vB) return vB - vA;
      const rA = Number(a.rarity) || 4;
      const rB = Number(b.rarity) || 4;
      if (rA !== rB) return rB - rA;
      return (a.name || '').localeCompare(b.name || '');
    });

  // Get latest characters
  const latestCharacters = sortedGameCharacters.slice(0, 7);

  // Get latest updates (Characters, Light Cones, Relics/Ornaments)
  const latestUpdates = [
    // 1. 캐릭터 매핑 수정 (art01.webp 사용)
    ...sortedGameCharacters.slice(0, 3).map((c: any) => ({
      id: c.id,
      name: c.name,
      type: '캐릭터',
      rarity: c.rarity,
      image: game.id === 'hsr' 
        ? `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(c.folderName || c.name || '')}/${c.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
        : getWwCharacterImage(c.folderName || c.name || ''),
      link: `/gallery/${game.id}/character/${c.id}`
    })),
    
    // 2. 광추 / 무기 매핑 수정 (운명의 길 폴더 경로 추가 및 WW 데이터 분리)
    ...(game.id === 'ww' 
      ? [...(WEAPON_DATA || [])]
          .sort((a, b) => parseFloat(b.releaseVersion || '1.0') - parseFloat(a.releaseVersion || '1.0'))
          .slice(0, 3)
          .map(w => ({
              id: w.id,
              name: w.name,
              type: '무기',
              rarity: w.rarity,
              image: `${CDN_URL}/ww%20images/Weapons/${safeEncodeURIComponent(w.name || '')}.webp`,
              link: `/gallery/ww/weapon/${encodeURIComponent(w.name)}`
            }))
      : LIGHTCONE_DB.filter(lc => lc.gameId === game.id).slice(0, 3).map((lc: any) => {
          const targetName = lc.fileName || lc.folderName || lc.name;
          return {
            id: lc.id,
            name: lc.name,
            type: '광추',
            rarity: lc.rarity,
            image: `${CDN_URL}/hsr%20images/광추/${safeEncodeURIComponent(lc.path || '')}/${safeEncodeURIComponent(targetName || '')}.webp`,
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
          ? `${CDN_URL}/ww%20images/echoes/${safeEncodeURIComponent(r.name || '')}.webp`
          : `${CDN_URL}/hsr%20images/유물/${safeEncodeURIComponent(r.name || '')}.webp`,
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
      image: `${CDN_URL}/hsr%20images/차원%20장신구/${safeEncodeURIComponent(o.name)}.webp`,
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

  const currentVersion = 'Latest';
  const notices: any[] = [];

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
        </div>

        {/* Quick Access Grid (Shortcuts) */}
        <div>
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <LayoutGrid size={14} /> {t('Quick Access')}
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
                <span className="text-xs font-bold text-gray-300 group-hover:text-white">{t(item.label)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 나만의 육성 플래너 위젯 (LocalStorage 기반) */}
        <GrowthPlannerWidget game={game} availableCharacters={sortedGameCharacters} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* New Characters Section */}
            <div className="bg-[#121212] rounded-[24px] border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-accent" /> {t('최신 캐릭터')}
                </h2>
                <button onClick={() => setActiveMenu('캐릭터')} className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                  {t('전체보기')} <ChevronRight size={12} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {latestCharacters.map((char: Character) => (
                  <Link 
                    key={char.id} 
                    to={`/gallery/${game.id}/character/${char.id}`}
                    className="group relative isolate aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all"
                  >
                    <img 
                      src={game.id === 'hsr' 
                        ? `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(char.folderName || char.name)}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
                        : getWwCharacterImage(char.folderName || char.name)
                      }
                      alt={t(char.name)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 text-transparent"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.endsWith('/assets/unknown.webp')) {
                          target.src = '/assets/unknown.webp';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white font-bold text-sm leading-none mb-1">{t(char.name)}</p>
                          <p className="text-[10px] text-gray-400 uppercase">{t(char.attribute)}</p>
                        </div>
                        {char.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5" />}
                      </div>
                    </div>
                  </Link>
                ))}
                <button onClick={() => setActiveMenu('캐릭터')} className="aspect-[3/4] rounded-xl bg-[#1a1a1a] border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-[#202020] hover:border-white/20 transition-all">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-xs font-bold">{t('더보기')}</span>
                </button>
              </div>
            </div>

            {/* Latest Updates Section */}
            <div className="bg-[#121212] rounded-[24px] border border-white/5 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-brand-primary" /> {t('최신 업데이트 목록')}
                </h2>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5">
                  {t('New Content')}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {latestUpdates.map((item, idx) => (
                  <Link 
                    key={`${item.id}-${idx}`}
                    to={item.link}
                    className="group relative isolate aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all"
                  >
                    <img 
                      src={item.image} 
                      alt={t(item.name)} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 text-transparent border-none outline-none"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.endsWith('/assets/unknown.webp')) {
                          target.src = '/assets/unknown.webp';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 w-full">
                      <div className="flex justify-between items-end">
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm leading-none mb-1 truncate">{t(item.name)}</p>
                          <p className={`text-[9px] font-black uppercase ${
                            item.type === '캐릭터' || item.type === 'Character' ? 'text-brand-accent' :
                            item.type === '광추' || item.type === 'Light Cone' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`}>{t(item.type)}</p>
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
                  <Bell size={16} /> {t('Notice')}
                </h2>
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              </div>
              
              <div className="space-y-4">
                {notices.slice(0, 3).map((notice) => (
                  <div key={notice.id} className="group cursor-default">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                        notice.type === 'update' ? 'text-brand-accent border-brand-accent/30 bg-brand-accent/10' :
                        notice.type === 'event' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                        'text-blue-400 border-blue-400/30 bg-blue-400/10'
                      }`}>
                        {notice.type.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={10} /> {notice.date}
                      </span>
                    </div>
                    <h3 className="text-xs font-black text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                      {notice.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {stripMarkdown(notice.content)}
                    </p>
                    <div className="mt-3 h-px bg-white/5 group-last:hidden" />
                  </div>
                ))}
                
                {notices.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('No Recent Notices')}</p>
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
