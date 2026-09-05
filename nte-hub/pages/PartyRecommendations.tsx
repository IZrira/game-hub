import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { 
  Users, 
  Search, 
  Sparkles, 
  Sword, 
  Zap, 
  Shield, 
  Info,
  ArrowRight,
  Filter
} from 'lucide-react';
import { NTE_PARTY_COMBINATIONS, NTEPartyCombination } from '../data/parties';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import PageHeader from '../../common-hub/components/PageHeader';
import SEO from '../../common-hub/components/SEO';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../common-hub/lib/supabase';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  '메인 딜러': <Sword size={14} className="text-rose-500" />,
  '서브 딜러': <Zap size={14} className="text-yellow-500" />,
  '서포터': <Users size={14} className="text-blue-500" />,
  '탱커/힐러': <Shield size={14} className="text-emerald-500" />,
};

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte images';

const getIconUrl = (member: { folderName?: string; name: string }) => {
  const folder = member.folderName || member.name;
  return encodeURI(`${BASE_IMAGE_URL}/skills/${folder.normalize('NFC')}/${folder.normalize('NFC')}.webp`);
};

const PartyMemberItem = React.memo(({ 
  member, 
  gameId 
}: { 
  member: any; 
  gameId: string | undefined; 
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex flex-col items-center gap-3 sm:gap-6 group/member relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover/member:opacity-40 transition-opacity" />
        <Link 
          to={`/gallery/${gameId}/character/${encodeURIComponent(member.name)}`}
          className="relative block w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-primary/50 transition-all duration-500 p-1 bg-black/40 shadow-2xl"
        >
          <img 
            src={getIconUrl(member)} 
            alt={member.name} 
            className="w-full h-full object-cover rounded-full scale-110 group-hover/member:scale-125 transition-transform duration-700" 
            onError={(e) => {
              e.currentTarget.src = `${BASE_IMAGE_URL}/common/unknown.webp`;
            }} 
          />
        </Link>
        
        {/* 돌파 추천 뱃지 (1돌+, 2돌+ 등) */}
        {member.breakthrough && member.breakthrough !== '명함' && (
          <div className="absolute top-0 right-0 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-[8px] sm:text-[9px] rounded-full shadow-lg border border-amber-300 z-20">
            {member.breakthrough}
          </div>
        )}

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 sm:px-4 py-0.5 sm:py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[8px] sm:text-[9px] font-black text-brand-accent uppercase tracking-widest opacity-0 group-hover/member:opacity-100 transition-all group-hover/member:-bottom-3 sm:group-hover/member:-bottom-4 whitespace-nowrap z-10">
          {t(member.role)}
        </div>
      </div>
      <div className="text-center space-y-0.5 sm:space-y-1 w-full">
        <div className="text-xs sm:text-base font-black text-white group-hover/member:text-brand-accent transition-colors truncate px-1">{t(member.name)}</div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{t(member.role)}</span>
        </div>
      </div>

      {/* Substitutes Overlay */}
      {isHovered && member.substitutes && member.substitutes.length > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 sm:mb-6 z-[100] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] min-w-[180px] sm:min-w-[200px]">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[8px] sm:text-[9px] font-black text-brand-accent uppercase tracking-widest">{t('대체 캐릭터')}</span>
            </div>
            <div className="flex gap-3 sm:gap-4 justify-center">
              {member.substitutes.map((sub: any, sIdx: number) => {
                return (
                  <div key={sIdx} className="flex flex-col items-center gap-1.5 group/sub">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/10 overflow-hidden bg-black/40 p-1 group-hover/sub:border-brand-accent transition-all relative">
                      <img src={getIconUrl(sub)} alt={sub.name} className="w-full h-full object-cover rounded-full group-hover/sub:scale-110 transition-transform" onError={(e) => { e.currentTarget.src = `${BASE_IMAGE_URL}/common/unknown.webp`; }} />
                      {sub.breakthrough && (
                        <div className="absolute bottom-0 inset-x-0 bg-amber-500/90 text-black text-[7px] sm:text-[8px] font-black text-center py-0.2">
                          {sub.breakthrough}
                        </div>
                      )}
                    </div>
                    <span className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-tighter text-center">
                      {t(sub.name)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#121212]/95 border-r border-b border-white/10 rotate-45 -translate-y-2" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const PartyCard: React.FC<{ party: NTEPartyCombination; gameId: string | undefined }> = React.memo(({ party, gameId }) => {
  const { t } = useTranslation();

  return (
    <div className="group glass-card rounded-[32px] sm:rounded-[44px] md:rounded-[50px] border border-white/5 overflow-visible hover:border-brand-primary/20 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl relative">
      <div className="p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 relative z-20">
        <div className="flex items-center gap-3 sm:gap-4 border-b border-white/5 pb-4 sm:pb-6">
          <div className="w-1.5 h-5 sm:h-6 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]" />
          <h4 className="text-base sm:text-xl font-black text-white italic tracking-tight uppercase group-hover:text-brand-accent transition-colors">{t(party.name)}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-8 relative">
          {party.members.map((member: any, idx) => (
            <PartyMemberItem key={`${member.id || member.name}-${idx}`} member={member} gameId={gameId} />
          ))}
        </div>
      </div>

      {/* Footer Tags & Description */}
      <div className="px-5 sm:px-8 md:px-10 pb-5 sm:pb-8 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div className="space-y-3 sm:space-y-4 max-w-xl">
          {party.description && (
            <p className="text-xs text-gray-400 font-bold leading-relaxed italic border-l-2 border-brand-primary/30 pl-3 sm:pl-4">
              "{t(party.description).replace(/\s*\([^)]*대체:[^)]*\)/g, '').replace(/\s*[^)]*대체:[^)]*/g, '').trim()}"
            </p>
          )}
          {party.pros && party.pros.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {party.pros.map(pro => (
                <span key={pro} className="text-[8px] sm:text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-emerald-400/20">
                  + {t(pro)}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20 self-start md:self-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-[8px] sm:text-[9px] font-black text-brand-accent uppercase tracking-widest">Optimized Comp</span>
        </div>
      </div>
    </div>
  );
});

const NTEPartyRecommendations: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const [parties, setParties] = useState<NTEPartyCombination[]>(NTE_PARTY_COMBINATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');

  // Supabase 클라우드 실시간 동기화 + localStorage 0ms 캐시 로딩
  useEffect(() => {
    const loadParties = async () => {
      try {
        const localData = localStorage.getItem('rira_nte_parties');
        if (localData) {
          try {
            setParties(JSON.parse(localData));
          } catch (e) {}
        }

        if (supabase) {
          const { data, error } = await supabase
            .from('hub_parties')
            .select('*')
            .eq('game_id', 'nte')
            .single();

          if (data && data.party_data && Array.isArray(data.party_data) && data.party_data.length > 0) {
            setParties(data.party_data);
            localStorage.setItem('rira_nte_parties', JSON.stringify(data.party_data));
          }
        }
      } catch (err) {
        console.warn('Could not load remote NTE parties, falling back to static config:', err);
      }
    };

    loadParties();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    parties.forEach(p => {
      p.tags?.forEach(t => tags.add(t));
      if (p.category) tags.add(p.category);
    });
    return ['전체', ...Array.from(tags)];
  }, [parties]);

  const filteredParties = useMemo(() => {
    return parties.filter(party => {
      const matchesSearch = 
        party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.members.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (party.tags && party.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesTag = 
        selectedTag === '전체' ||
        party.category === selectedTag ||
        (party.tags && party.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [parties, searchQuery, selectedTag]);

  return (
    <div className="flex bg-[#0a0a0a] min-h-screen text-gray-200">
      <SEO 
        title={t("이환(NTE) 추천 파티 조합 및 4인 속성 시너지 가이드")}
        description={t("헤테로 시티 최고의 4인 파티 추천. 령, 혼, 음, 양, 공, 상 6대 이능력 속성 연계 및 바이레일 스킬 시너지 덱.")}
        keywords="이환, Neverness to Everness, 파티 추천, 추천 조합, 구원 파티, 민트 파티, 6대 속성 시너지, 리라 아카이브"
      />
      <GallerySidebar gameId={gameId || 'nte'} />
      <div className="flex-1 flex flex-col min-w-0">
        <PageHeader gameId={gameId || 'nte'} title={t("NTE Party Synergy Deck")} />

        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-12 space-y-12">
          {/* Header Description */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-black text-brand-accent tracking-[0.3em] uppercase">Tactical Synergies</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mt-1">
                4-SLOT ESPER COMBINATIONS
              </h1>
              <p className="text-gray-400 text-sm mt-2 font-medium">
                {t("헤테로 시티 왜곡 토벌 및 심층 구역을 위한 최적의 4인 이능력 파티 조합을 확인하세요.")}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder={t("캐릭터, 속성, 파티명 검색...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-2xl px-5 py-3 pl-11 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          {/* Tag Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter size={14} className="text-gray-500 flex-shrink-0 mr-1" />
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex-shrink-0 ${
                  selectedTag === tag 
                    ? 'bg-brand-primary text-black shadow-lg shadow-brand-primary/20 scale-105' 
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Party Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParties.map(party => (
              <PartyCard key={party.id} party={party} gameId={gameId} />
            ))}
          </div>

          {filteredParties.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <p className="text-gray-500 text-sm font-medium">{t("조건에 맞는 파티 조합이 없습니다.")}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NTEPartyRecommendations;
