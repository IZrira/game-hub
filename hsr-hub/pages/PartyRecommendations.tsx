import React, { useState, useMemo, memo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Sword, 
  Zap, 
  Shield, 
  Info,
  ArrowRight,
  LayoutGrid,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { HSR_PARTIES, PartyCombination, PartyMember } from '../data/parties';
import { CHARACTER_DB } from '../../common-hub/data/games';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { useTranslation } from 'react-i18next';
import { getCharacterArtPath } from '../../common-hub/utils/imageHelper';

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';

const normalizeName = (name: string) => {
  if (!name) return "";
  return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
};

const PartyMemberItem = memo(({ 
  member, 
  gameId, 
  charMap 
}: { 
  member: PartyMember; 
  gameId: string | undefined; 
  charMap: Map<string, any>;
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  
  const memberChar = charMap.get(normalizeName(t(member.name)));
  const memberImg = memberChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(memberChar.folderName.normalize('NFC'))}/art01.webp` : '';

  return (
    <div 
      className="flex flex-col items-center gap-6 group/member relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-28 h-28 md:w-32 md:h-32">
         <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover/member:opacity-40 transition-opacity" />
         <Link 
           to={`/gallery/${gameId}/character/${encodeURIComponent(member.name)}`}
           className="relative block w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-primary/50 transition-all duration-500 p-1 bg-black/40 shadow-2xl"
         >
            <img src={memberImg} alt={member.name} className="w-full h-full object-cover rounded-full scale-110 group-hover/member:scale-125 transition-transform duration-700" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
         </Link>
         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-brand-accent uppercase tracking-widest opacity-0 group-hover/member:opacity-100 transition-all group-hover/member:-bottom-4 whitespace-nowrap z-10">
           {t(member.role)}
         </div>
      </div>
      <div className="text-center space-y-1">
        <div className="text-base font-black text-white group-hover/member:text-brand-accent transition-colors whitespace-nowrap">{t(member.name)}</div>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">{t(member.role)}</div>
      </div>

      {/* Substitutes Overlay */}
      {isHovered && member.substitutes && member.substitutes.length > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 z-[100] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[200px]">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Substitutes</span>
            </div>
            <div className="flex gap-4 justify-center">
              {member.substitutes.map((sub, sIdx) => {
                const subChar = charMap.get(normalizeName(t(sub.name)));
                const subImg = subChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(subChar.folderName.normalize('NFC'))}/${sub.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}` : '';
                return (
                  <div key={sIdx} className="flex flex-col items-center gap-2 group/sub">
                    <div className="w-16 h-16 rounded-full border border-white/10 overflow-hidden bg-black/40 p-1 group-hover/sub:border-brand-accent transition-all">
                      <img src={subImg} alt={sub.name} className="w-full h-full object-cover rounded-full group-hover/sub:scale-110 transition-transform" />
                    </div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{t(sub.name)}</span>
                  </div>
                );
              })}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-4 h-4 bg-[#121212]/95 border-r border-b border-white/10 rotate-45 -translate-y-2" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const PartyCard = memo(({ party, gameId, charMap }: { party: PartyCombination; gameId: string | undefined; charMap: Map<string, any> }) => {
  const { t } = useTranslation();
  
  return (
    <div className="group glass-card rounded-[50px] border border-white/5 overflow-visible hover:border-brand-primary/20 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl relative">
      <div className="p-10 space-y-8 relative z-20">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="w-1.5 h-6 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]" />
          <h4 className="text-xl font-black text-white italic tracking-tight uppercase group-hover:text-brand-accent transition-colors">{t(party.name)}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 relative">
          {party.members.map((member, idx) => (
            <PartyMemberItem key={idx} member={member} gameId={gameId} charMap={charMap} />
          ))}
        </div>
      </div>
      
      {/* Footer Tags & Description */}
      <div className="px-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-xl">
          {party.description && (
             <p className="text-xs text-gray-400 font-bold leading-relaxed italic border-l-2 border-brand-primary/30 pl-4">
               "{t(party.description).replace(/\s*\([^)]*대체:[^)]*\)/g, '').replace(/\s*[^)]*대체:[^)]*/g, '').trim()}"
             </p>
          )}
          <div className="flex flex-wrap gap-2">
            {party.tags.map(tag => (
              <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                #{t(tag)}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Optimized Comp</span>
        </div>
      </div>
    </div>
  );
});

const PartyRecommendations: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    categories.add('전체');
    HSR_PARTIES.forEach(p => categories.add(p.category));
    return Array.from(categories);
  }, []);

  const charMap = useMemo(() => {
    const map = new Map<string, any>();
    CHARACTER_DB.forEach(c => {
      map.set(normalizeName(t(c.name)), c);
      map.set(normalizeName(c.folderName), c);
    });
    return map;
  }, [t]);

  const filteredParties = useMemo(() => {
    return HSR_PARTIES.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.mainDPS.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === '전체' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24 font-sans">
      <PageHeader gameId={gameId} category={t("파티")} title={t("추천 파티 조합")} />

      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <aside className="hidden lg:block">
          <GallerySidebar />
        </aside>

        <div className="space-y-12">
          {/* Hero Section */}
          <section className="relative p-10 md:p-12 rounded-[40px] bg-[#0a0a0a] border border-white/5 overflow-hidden group">
            <div 
              style={{
                backgroundImage: `url(${getCharacterArtPath('hsr', '로빈')})`,
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                filter: 'brightness(0.35)',
              }} 
              className="absolute inset-0 bg-cover bg-[center_top_-20%] transition-transform duration-700 group-hover:scale-105" 
            />
            
            <div className="relative z-10 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <Sparkles size={12} className="text-brand-accent animate-pulse" />
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{t("Recommended Formations")}</span>
              </div>
              
              <div className="space-y-0.5">
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
                  <span className="text-white">{t("추천 파티 ")}</span>
                  <span className="text-brand-accent">{t("조합")}</span>
                </h1>
              </div>
              
              <p className="text-gray-400 font-bold max-w-lg text-sm md:text-base leading-relaxed border-l-2 border-brand-primary/50 pl-6 mx-auto lg:mx-0">
                {t("메인 딜러의 성능을 극대화하는 최적의 파티 조합 가이드입니다. 캐릭터별 시너지를 고려한 최적의 구성을 확인하세요.")}
              </p>
            </div>
          </section>

          {/* Filters */}
          <div className="sticky top-20 z-40 bg-[#050505]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-4 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto px-2">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    activeCategory === cat 
                      ? 'bg-brand-accent text-black border-brand-accent shadow-xl' 
                      : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'
                  }`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={t("캐릭터, 파티명 검색...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] py-3.5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-brand-accent/50 transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-12">
            {filteredParties.length > 0 ? (
              filteredParties.map(party => (
                <PartyCard key={party.id} party={party} gameId={gameId} charMap={charMap} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-40 space-y-6 bg-white/[0.02] rounded-[50px] border border-dashed border-white/10">
                <LayoutGrid size={48} className="text-gray-800" />
                <div className="text-center">
                   <h3 className="text-xl font-black text-white uppercase tracking-widest opacity-50">{t("No Results")}</h3>
                </div>
              </div>
            )}
          </div>
          
          <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
        </div>
      </div>
    </div>
  );
};

export default PartyRecommendations;
