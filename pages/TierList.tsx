import React, { useState, useMemo, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Filter, Star, Trophy, Search, Users, Shield, Zap, Sword,
  ArrowUp, ArrowDown, Sparkles, LayoutGrid, Compass, Swords, Skull, Box,
  Loader2
} from 'lucide-react';
import { HSR_TIER_DATA, HSR_TIER_CATEGORIES, TierCharacter, HSR_TIER_CHANGE_LOG } from '../data/tiers';
import GallerySidebar from '../components/GallerySidebar';
import SEO from '../components/SEO';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  '메인 딜러': <Sword size={14} />,
  '서브 딜러': <Zap size={14} />,
  '서포터': <Users size={14} />,
  '탱커/힐러': <Shield size={14} />,
};

const CHANGE_BADGES: Record<string, React.ReactNode> = {
  'up': (
    <div className="flex items-center gap-0.5 text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-md border border-emerald-400/20">
      <ArrowUp size={10} strokeWidth={3} />
      <span className="text-[8px] font-black">UP</span>
    </div>
  ),
  'down': (
    <div className="flex items-center gap-0.5 text-rose-400 bg-rose-400/10 px-1.5 py-0.5 rounded-md border border-rose-400/20">
      <ArrowDown size={10} strokeWidth={3} />
      <span className="text-[8px] font-black">DOWN</span>
    </div>
  ),
  'new': (
    <div className="flex items-center gap-0.5 text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded-md border border-brand-accent/20">
      <Sparkles size={10} strokeWidth={3} />
      <span className="text-[8px] font-black uppercase">New</span>
    </div>
  ),
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'chaos': <Swords size={16} />,
  'simulation': <Compass size={16} />,
  'fiction': <LayoutGrid size={16} />,
  'shadow': <Skull size={16} />,
  'divergent': <Box size={16} />,
};

const CharacterCard = memo(({ char, gameId, getIconUrl }: { char: TierCharacter, gameId: string | undefined, getIconUrl: (char: TierCharacter) => string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link
      to={`/gallery/${gameId}/character/${char.name}`}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/5 hover:border-brand-primary/50 transition-all shadow-lg"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
          <Loader2 className="text-gray-700 animate-spin" size={16} />
        </div>
      )}
      <img 
        src={getIconUrl(char)}
        alt={char.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 [image-rendering:-webkit-optimize-contrast] transform-gpu ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      
      {/* Role Badge */}
      <div className="absolute top-1.5 right-1.5 p-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-brand-accent z-10">
        {ROLE_ICONS[char.role]}
      </div>

      {/* Change Badge - Prominent next to image */}
      {char.change && char.change !== 'stay' && (
        <div className="absolute top-1.5 left-1.5 z-20 scale-110 shadow-xl">
          {CHANGE_BADGES[char.change]}
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-2.5 w-full z-10">
        <p className="text-[10px] font-black text-white leading-none truncate group-hover:text-brand-accent transition-colors drop-shadow-md">
          {char.name}
        </p>
      </div>
    </Link>
  );
});

const TierList: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [activeCategory, setActiveCategory] = useState<string>('chaos');
  const [roleFilter, setRoleFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr images';

  const filteredTierList = useMemo(() => {
    const data = HSR_TIER_DATA[activeCategory] || [];
    const query = searchQuery.toLowerCase().trim();
    
    return data.map(group => ({
      ...group,
      characters: group.characters.filter(char => {
        const matchesRole = roleFilter === '전체' || char.role === roleFilter;
        const matchesSearch = query === '' || char.name.toLowerCase().includes(query);
        return matchesRole && matchesSearch;
      })
    }));
  }, [activeCategory, roleFilter, searchQuery]);

  const getIconUrl = (char: TierCharacter) => {
    const folder = char.folderName.normalize('NFC');
    // art01.webp is high-res, but we use CSS optimization to fix jaggedness.
    // If a smaller icon exists, it would be better, but sticking to art01 for consistency.
    const fileName = char.isTrailblazer ? 'art01-01.webp' : 'art01.webp';
    return encodeURI(`${BASE_IMAGE_URL}/캐릭터/${folder}/${fileName}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-24">
      <SEO 
        title="붕괴: 스타레일 티어표" 
        description="최신 메타 분석을 통한 붕괴: 스타레일 캐릭터 티어표입니다. 혼돈의 기억, 허구 이야기, 종말의 환영 등 콘텐츠별 추천 캐릭터를 확인하세요."
      />
      {/* Breadcrumbs */}
      <div className="bg-[#121212] border-b border-white/5 h-12 flex items-center px-8 sticky top-0 z-[100]">
        <nav className="flex items-center gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-brand-accent transition-colors">메인</Link>
          <ChevronRight size={10} />
          <Link to={`/gallery/${gameId}`} className="hover:text-brand-accent transition-colors">갤러리</Link>
          <ChevronRight size={10} />
          <span className="text-brand-accent">티어표</span>
        </nav>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        {/* 사이드바 */}
        <GallerySidebar />

        {/* 메인 섹션 */}
        <div className="space-y-12">
          {/* Header Section */}
          <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Trophy size={200} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-2">
                <h1 className="text-5xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                  <Trophy className="text-brand-primary" size={40} />
                  {HSR_TIER_CATEGORIES.find(c => c.id === activeCategory)?.name} 티어표
                </h1>
                <p className="text-gray-500 font-bold text-lg">
                  {HSR_TIER_CATEGORIES.find(c => c.id === activeCategory)?.description} - 최신 메타 분석 가이드
                </p>
              </div>

              <Link 
                to={`/gallery/${gameId}/parties`}
                className="flex items-center gap-3 px-6 py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl text-brand-accent text-sm font-black uppercase tracking-widest hover:bg-brand-primary/20 hover:scale-105 transition-all shadow-lg shadow-brand-primary/10 whitespace-nowrap"
              >
                <Users size={18} /> 추천 파티 조합
              </Link>

              <div className="relative group w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                <input 
                  type="text" 
                  placeholder="캐릭터 검색..." 
                  className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary w-full font-bold transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">
                <LayoutGrid size={12} /> SELECT CONTENT
              </div>
              <div className="flex flex-wrap gap-3">
                {HSR_TIER_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setRoleFilter('전체');
                    }}
                    className={`px-6 py-3 rounded-xl text-xs font-black transition-all border flex items-center gap-3 ${
                      activeCategory === cat.id
                        ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                        : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {CATEGORY_ICONS[cat.id]}
                    <div className="text-left">
                      <div className="leading-none">{cat.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5 items-center">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest mr-4">
                <Filter size={12} /> ROLE FILTER
              </div>
              {['전체', '메인 딜러', '서브 딜러', '서포터', '탱커/힐러'].map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all border flex items-center gap-2 ${
                    roleFilter === role 
                      ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30' 
                      : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  {role !== '전체' && ROLE_ICONS[role]}
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tier List Content */}
        <div className="space-y-8">
            {filteredTierList.map((group) => (
              <div key={group.tier} className="bg-[#121212] rounded-[32px] border border-white/5 overflow-hidden shadow-xl flex flex-col md:flex-row">
                {/* Tier Label */}
                <div 
                  className="w-full md:w-32 flex flex-col items-center justify-center p-6 shrink-0 border-b md:border-b-0 md:border-r border-white/5"
                  style={{ backgroundColor: `${group.color}10` }}
                >
                  <div 
                    className="text-4xl font-black italic tracking-tighter"
                    style={{ color: group.color }}
                  >
                    {group.tier}
                  </div>
                </div>

                {/* Characters Grid */}
                <div className="flex-1 p-8">
                  {group.characters.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                      {group.characters.map((char) => (
                        <CharacterCard 
                          key={char.id} 
                          char={char} 
                          gameId={gameId} 
                          getIconUrl={getIconUrl} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center py-4">
                      <p className="text-gray-700 font-black uppercase tracking-widest text-[10px] opacity-30">No Characters in this Tier</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredTierList.length === 0 && (
              <div className="py-32 text-center space-y-4 bg-[#121212] rounded-[48px] border border-dashed border-white/10">
                <Search size={48} className="mx-auto text-gray-700 opacity-20" />
                <p className="text-gray-500 font-black uppercase tracking-widest">검색 결과가 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierList;

