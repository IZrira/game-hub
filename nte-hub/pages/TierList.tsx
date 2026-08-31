import React, { useState, useMemo, memo } from 'react';
import { useParams, Link } from 'react-router';
import { 
  Filter, Trophy, Search, Users, Shield, Zap, Sword,
  ArrowUp, ArrowDown, Sparkles, LayoutGrid, Swords, Skull,
  Compass, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NTE_TIER_CATEGORIES, NTETierCharacter, NTETierGroup } from '../data/tiers';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { useTranslation } from 'react-i18next';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  '메인 딜러': <Sword size={14} className="text-rose-500" />,
  '서브 딜러': <Zap size={14} className="text-yellow-500" />,
  '서포터': <Users size={14} className="text-blue-500" />,
  '탱커/힐러': <Shield size={14} className="text-emerald-500" />,
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'overall': <Trophy size={16} />,
  'distortion': <Swords size={16} />,
  'overworld': <Compass size={16} />,
};

const CharacterCard = memo(({ char, gameId }: { char: NTETierCharacter, gameId: string | undefined }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte images';
  const imgUrl = `${BASE_IMAGE_URL}/skills/${encodeURIComponent(char.name)}/${encodeURIComponent(char.name)}.webp`;

  return (
    <Link
      to={`/gallery/${gameId}/character/${encodeURIComponent(char.name)}`}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0d0d0d] border border-white/5 hover:border-brand-primary/50 transition-all shadow-lg"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
          <Loader2 className="text-gray-400 animate-spin" size={16} />
        </div>
      )}
      <img 
        src={imgUrl}
        alt={char.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 [image-rendering:-webkit-optimize-contrast] transform-gpu ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = `${BASE_IMAGE_URL}/common/unknown.webp`;
          setIsLoaded(true);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      
      <div className="absolute top-1.5 right-1.5 p-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-brand-accent z-10">
        {ROLE_ICONS[char.role]}
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex flex-col justify-end">
        <span className="text-xs font-black text-white truncate group-hover:text-brand-accent transition-colors">
          {char.name}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[9px] font-bold text-gray-400 bg-white/10 px-1.5 py-0.2 rounded">
            {char.attribute}
          </span>
          <span className="text-[9px] font-medium text-gray-500">
            {char.role}
          </span>
        </div>
      </div>
    </Link>
  );
});

const NTETierList: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<'overall' | 'distortion' | 'overworld'>('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('전체');
  const [attrFilter, setAttrFilter] = useState<string>('전체');

  const currentCategory = useMemo(() => {
    return NTE_TIER_CATEGORIES.find(c => c.id === selectedCategory) || NTE_TIER_CATEGORIES[0];
  }, [selectedCategory]);

  const filteredTiers = useMemo(() => {
    return currentCategory.tiers.map(group => {
      const chars = group.characters.filter(char => {
        const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === '전체' || char.role === roleFilter;
        const matchesAttr = attrFilter === '전체' || char.attribute === attrFilter;
        return matchesSearch && matchesRole && matchesAttr;
      });
      return { ...group, characters: chars };
    }).filter(group => group.characters.length > 0);
  }, [currentCategory, searchQuery, roleFilter, attrFilter]);

  return (
    <div className="flex bg-[#0a0a0a] min-h-screen text-gray-200">
      <SEO 
        title={t("이환(NTE) 티어표 및 에스퍼 등급표 - 최신 메타 순위")}
        description={t("헤테로 시티 최고의 에스퍼 티어표. 종합 메타, 왜곡 토벌 보스전, 도시 탐색 필드 3대 모드별 S+ ~ B 등급 완벽 정리.")}
        keywords="이환, Neverness to Everness, 티어표, 등급표, 잔홍 티어, 구원 티어, 라크리모사, 리라 아카이브"
      />
      <GallerySidebar gameId={gameId || 'nte'} />
      <div className="flex-1 flex flex-col min-w-0">
        <PageHeader gameId={gameId || 'nte'} title={t("NTE Tier List")} />

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 space-y-10">
          {/* Header Description */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-black text-brand-accent tracking-[0.3em] uppercase">Meta Rankings</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mt-1">
                ESPER TIER LIST
              </h1>
              <p className="text-gray-400 text-sm mt-2 font-medium">
                {currentCategory.description}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={t("에스퍼 이름 검색...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-2xl px-5 py-3 pl-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          {/* Mode Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            {NTE_TIER_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-black shadow-lg shadow-brand-primary/20 scale-105'
                    : 'bg-[#141414] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {CATEGORY_ICONS[cat.id]}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Role & Attribute Filter Pills */}
          <div className="flex flex-wrap items-center gap-4 bg-[#121212] p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">포지션:</span>
              {['전체', '메인 딜러', '서브 딜러', '서포터', '탱커/힐러'].map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    roleFilter === role ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">속성:</span>
              {['전체', '혼', '령', '음', '양', '공', '상'].map(attr => (
                <button
                  key={attr}
                  onClick={() => setAttrFilter(attr)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    attrFilter === attr ? 'bg-brand-accent text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          {/* Tier Groups */}
          <div className="space-y-6">
            {filteredTiers.map(group => (
              <div 
                key={group.tier}
                className="bg-[#121212] rounded-[28px] border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row"
              >
                {/* Tier Badge Left Header */}
                <div 
                  className="w-full md:w-36 flex flex-col items-center justify-center p-6 shrink-0 border-b md:border-b-0 md:border-r border-white/5 relative"
                  style={{ backgroundColor: `${group.color}10` }}
                >
                  <span 
                    className="text-4xl md:text-5xl font-black italic tracking-tighter"
                    style={{ color: group.color }}
                  >
                    {group.tier}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold text-center mt-2 px-2">
                    {group.description}
                  </span>
                </div>

                {/* Character Cards Grid */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {group.characters.map(char => (
                      <CharacterCard key={char.id} char={char} gameId={gameId} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTiers.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <p className="text-gray-500 text-sm font-medium">{t("조건에 맞는 에스퍼가 없습니다.")}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NTETierList;
