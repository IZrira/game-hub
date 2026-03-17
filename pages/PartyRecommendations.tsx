
import React, { useState, useMemo } from 'react';
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
import GallerySidebar from '../components/GallerySidebar';
import PageHeader from '../components/PageHeader';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  '메인 딜러': <Sword size={14} className="text-rose-500" />,
  '서브 딜러': <Zap size={14} className="text-yellow-500" />,
  '서포터': <Users size={14} className="text-blue-500" />,
  '탱커/힐러': <Shield size={14} className="text-emerald-500" />,
};

const PartyCard: React.FC<{ party: PartyCombination; gameId: string | undefined }> = ({ party, gameId }) => {
  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';
  const [hoveredMemberIdx, setHoveredMemberIdx] = useState<number | null>(null);

  const getIconUrl = (member: { folderName: string; isTrailblazer?: boolean }) => {
    return encodeURI(`${BASE_IMAGE_URL}/캐릭터/${member.folderName.normalize('NFC')}/${member.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`);
  };

  return (
    <div className="group bg-[#121212] border border-white/5 rounded-3xl hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1 shadow-2xl relative">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white tracking-tight group-hover:text-brand-accent transition-colors">
              {party.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {party.tags.map(tag => (
                <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <Users size={20} className="text-brand-accent" />
          </div>
        </div>

        {/* Party Members Grid */}
        <div className="grid grid-cols-4 gap-3 pt-2 relative">
          {party.members.map((member, idx) => (
            <div 
              key={`${member.id}-${idx}`}
              className="relative"
              onMouseEnter={() => setHoveredMemberIdx(idx)}
              onMouseLeave={() => setHoveredMemberIdx(null)}
            >
              <Link 
                to={`/gallery/${gameId}/character/${member.name}`}
                className="group/member relative block aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-accent/50 transition-all"
              >
                <img 
                  src={getIconUrl(member)} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/member:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/unknown.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-[8px] font-black text-white truncate text-center uppercase tracking-tighter">
                    {member.name}
                  </p>
                </div>
                {/* Role Indicator */}
                <div className="absolute top-1 right-1 p-0.5 bg-black/60 backdrop-blur-sm rounded border border-white/10">
                  {ROLE_ICONS[member.role]}
                </div>
              </Link>
            </div>
          ))}

          {/* Substitutes Overlay - Centered to the Party Grid */}
          {hoveredMemberIdx !== null && party.members[hoveredMemberIdx].substitutes && party.members[hoveredMemberIdx].substitutes!.length > 0 && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-none">
              <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-5 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] min-w-[220px] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.25em]">Substitutes</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                  </div>
                </div>
                
                <div className="flex justify-center gap-3">
                  {party.members[hoveredMemberIdx].substitutes!.map((sub, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="group/sub relative w-20 h-24 rounded-2xl overflow-hidden bg-black/60 border border-white/5 hover:border-brand-accent transition-all duration-500"
                    >
                      <img 
                        src={getIconUrl(sub)} 
                        alt={sub.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/sub:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover/sub:opacity-100 transition-opacity flex flex-col justify-end p-2">
                        <p className="text-[8px] font-black text-white text-center leading-tight uppercase tracking-tighter">
                          {sub.name}
                        </p>
                      </div>
                      {/* Premium Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-transparent opacity-0 group-hover/sub:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Decorative Bottom Line */}
                <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
                
                {/* Arrow (Pointing Down) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                  <div className="w-4 h-4 bg-[#121212]/95 border-r border-b border-white/10 rotate-45 -translate-y-2" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Synergy Optimized</span>
          </div>
          <button className="text-[10px] font-black text-brand-accent uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
            Details <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PartyRecommendations: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    categories.add('전체');
    HSR_PARTIES.forEach(p => categories.add(p.category));
    return Array.from(categories);
  }, []);

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
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      {/* Page Header */}
      <PageHeader gameId={gameId} category="파티" title="추천 파티 조합" />

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        {/* 사이드바 */}
        <GallerySidebar />

        {/* 메인 섹션 */}
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-white/5 rounded-[48px]">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 via-[#050505] to-[#050505]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,125,38,0.1),transparent_70%)]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles size={12} /> Recommended Formations
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
                Party <span className="text-brand-accent">Synergy</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                메인 딜러의 성능을 극대화하는 최적의 파티 조합 가이드입니다. <br className="hidden md:block" />
                단일, 범위, 추공, 지속피해 등 파티 성격별 최적의 구성을 확인하세요.
              </p>
            </div>
          </div>

          {/* Party Building Guide - Moved to Top */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-[32px] bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                  <Info className="text-brand-accent" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white uppercase tracking-tight">Party Building Guide</h2>
                  <p className="text-xs text-brand-accent/60 font-black uppercase tracking-widest">Strategic Intelligence</p>
                </div>
              </div>
              <div className="text-sm text-gray-400 font-medium leading-relaxed">
                <p>
                  본 가이드는 효율적인 전투를 위한 <span className="text-white font-bold">추천 조합</span>일 뿐이며, 게임 내 모든 상황에 적용되는 <span className="text-brand-accent font-bold">무조건적인 정답이 아닙니다.</span> 
                  보유하신 캐릭터의 성급, 광추, 유물 세팅 및 적의 약점 속성에 따라 파티 구성은 언제든지 유동적으로 변할 수 있습니다. 
                  가이드를 참고하시되, 자신만의 최적화된 조합을 찾아가는 즐거움을 느껴보시기 바랍니다.
                </p>
              </div>
            </div>
          </div>

          {/* Filter Section (Sticky within main section) */}
          <div className="sticky top-16 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400">
                  <Filter size={16} />
                </div>
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                      activeCategory === cat 
                        ? 'bg-brand-accent text-black border-brand-accent shadow-lg shadow-brand-accent/20' 
                        : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat} 파티
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="딜러, 파티명, 태그 검색..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="py-12">
            {filteredParties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredParties.map(party => (
                  <PartyCard key={party.id} party={party} gameId={gameId} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 text-gray-700">
                  <Search size={40} />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-widest">No Results Found</h3>
                  <p className="text-gray-500 text-sm font-medium">검색어와 일치하는 파티 조합이 없습니다.</p>
                </div>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('전체'); }}
                  className="text-xs font-black text-brand-accent uppercase tracking-[0.3em] hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyRecommendations;
