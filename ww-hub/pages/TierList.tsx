import React, { useState, useMemo, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Filter, Trophy, Search, Users, Shield, Zap, Sword,
  ArrowUp, ArrowDown, Sparkles, LayoutGrid, Swords, Skull,
  Loader2, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WW_TIER_DATA, WW_TIER_CATEGORIES, TierCharacter } from '../data/tiers';
import { WW_CHARACTERS } from '../data/characters';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { useTranslation } from 'react-i18next';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  '메인 딜러': <Sword size={14} />,
  '서브 딜러': <Zap size={14} />,
  '서포터': <Users size={14} />,
  '생존': <Shield size={14} />,
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
  'tower': <Swords size={16} />,
  'hologram': <Skull size={16} />,
};

const CharacterSkeleton = () => (
  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 animate-pulse border border-white/5">
    <div className="absolute bottom-0 left-0 p-2.5 w-full">
      <div className="h-2 w-12 bg-white/10 rounded" />
    </div>
  </div>
);

const TierSkeleton = () => (
  <div className="bg-[#121212] rounded-[32px] border border-white/5 overflow-hidden shadow-xl flex flex-col md:flex-row">
    <div className="w-full md:w-32 flex flex-col items-center justify-center p-6 bg-white/5 shrink-0 border-b md:border-b-0 md:border-r border-white/5">
      <div className="w-12 h-10 bg-white/10 rounded-lg animate-pulse" />
    </div>
    <div className="flex-1 p-8">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {[...Array(10)].map((_, i) => <CharacterSkeleton key={i} />)}
      </div>
    </div>
  </div>
);

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
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      
      <div className="absolute top-1.5 right-1.5 p-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-brand-accent z-10">
        {ROLE_ICONS[char.role]}
      </div>

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
  const { t } = useTranslation();
  const { gameId } = useParams<{ gameId: string }>();
  const [activeCategory, setActiveCategory] = useState<string>('tower');
  const [roleFilter, setRoleFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images';

  const filteredTierList = useMemo(() => {
    const data = WW_TIER_DATA[activeCategory] || [];
    const query = searchQuery.toLowerCase().trim();
    
    const allGroups = data.map(group => ({
      ...group,
      characters: group.characters
        .filter(char => {
          const matchesRole = roleFilter === '전체' || char.role === roleFilter;
          const matchesSearch = query === '' || char.name.toLowerCase().includes(query);
          return matchesRole && matchesSearch;
        })
    })).filter(group => group.characters.length > 0);

    const rankOrder = ['OP', 'SS', 'S+', 'S', 'A', 'B', 'C', 'D', 'E', 'F', '?'];
    return allGroups.sort((a, b) => {
      const idxA = rankOrder.indexOf(a.tier);
      const idxB = rankOrder.indexOf(b.tier);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }, [activeCategory, roleFilter, searchQuery]);

  const carouselData = useMemo(() => {
    let position = 1;
    const items: Array<{ name: string; url: string; position: number }> = [];
    filteredTierList.forEach(group => {
      group.characters.forEach(char => {
        if (items.some(i => i.name === char.name)) return;
        items.push({
          name: char.name,
          url: `/gallery/${gameId || 'ww'}/character/${char.name}`,
          position: position++
        });
      });
    });
    return items.slice(0, 30);
  }, [filteredTierList, gameId]);

  const getIconUrl = (char: TierCharacter) => {
    const folder = char.folderName || char.name;
    return encodeURI(`${BASE_IMAGE_URL}/skills/${folder.normalize('NFC')}/${folder.normalize('NFC')}.webp`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-24 relative">
      <SEO 
        title="명조: 워더링 웨이브 티어표" 
        description="최신 메타 분석을 통한 명조: 워더링 웨이브 캐릭터 티어표입니다."
        carouselData={carouselData}
      />
      <PageHeader gameId={gameId} category={t("티어표")} title={t("종합 메타 랭킹")} />

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar />

        <div className="space-y-12">
          <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2">
                  <h1 className="text-5xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                    <Trophy className="text-brand-primary" size={40} />
                    {WW_TIER_CATEGORIES.find(c => c.id === activeCategory)?.name} 티어표
                  </h1>
                  <p className="text-gray-500 font-bold text-lg">
                    {WW_TIER_CATEGORIES.find(c => c.id === activeCategory)?.description}
                  </p>
                </div>

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

              <div className="pt-8 border-t border-white/5">
                <div className="flex flex-wrap gap-3">
                  {WW_TIER_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-6 py-3 rounded-xl text-xs font-black transition-all border flex items-center gap-3 ${
                        activeCategory === cat.id
                          ? 'bg-brand-primary border-brand-primary text-white'
                          : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      {CATEGORY_ICONS[cat.id]}
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5 items-center">
                {['전체', '메인 딜러', '서브 딜러', '서포터', '생존'].map(role => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all border flex items-center gap-2 ${
                      roleFilter === role 
                        ? 'bg-brand-primary border-brand-primary text-white' 
                        : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory + roleFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {filteredTierList.map((group) => (
                <div key={group.tier} className="bg-[#121212] rounded-[32px] border border-white/5 overflow-hidden shadow-xl flex flex-col md:flex-row group/tier transition-all hover:border-white/10">
                  <div 
                    className="w-full md:w-32 flex flex-col items-center justify-center p-6 shrink-0 border-b md:border-b-0 md:border-r border-white/5 transition-colors"
                    style={{ backgroundColor: `${group.color}10` }}
                  >
                    <div 
                      className="text-4xl font-black italic tracking-tighter text-center transition-transform group-hover/tier:scale-110"
                      style={{ color: group.color }}
                    >
                      {group.tier}
                    </div>
                  </div>

                  <div className="flex-1 p-8">
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
                  </div>
                </div>
              ))}
              {filteredTierList.length === 0 && (
                <div className="py-20 text-center bg-white/[0.02] rounded-[48px] border border-white/5">
                  <p className="text-gray-600 font-black uppercase tracking-widest text-xs opacity-50">데이터가 없습니다.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TierList;
