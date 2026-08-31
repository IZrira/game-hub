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

const PartyCard: React.FC<{ party: NTEPartyCombination; gameId: string | undefined }> = React.memo(({ party, gameId }) => {
  const { t } = useTranslation();
  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte images';

  const getIconUrl = (member: { folderName?: string; name: string }) => {
    const folder = member.folderName || member.name;
    return encodeURI(`${BASE_IMAGE_URL}/skills/${folder.normalize('NFC')}/${folder.normalize('NFC')}.webp`);
  };

  return (
    <div className="group bg-[#121212] border border-white/5 rounded-3xl hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1 shadow-2xl relative">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white tracking-tight group-hover:text-brand-accent transition-colors">
              {party.name}
            </h3>
            <p className="text-xs text-gray-500">{party.description}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <Users size={20} className="text-brand-accent" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5 pt-2 relative">
          {party.members.map((member: any, idx) => (
            <div key={`${member.id || member.name}-${idx}`} className="relative">
              <Link 
                to={`/gallery/${gameId}/character/${encodeURIComponent(member.name)}`}
                className="group/member relative block aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-accent/50 transition-all"
              >
                <img 
                  src={getIconUrl(member)} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/member:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = `${BASE_IMAGE_URL}/common/unknown.webp`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-[8px] font-black text-white truncate text-center uppercase tracking-tighter">
                    {member.name}
                  </p>
                </div>
                
                {/* 돌파 추천 뱃지 (1돌+, 2돌+ 등) */}
                {member.breakthrough && member.breakthrough !== '명함' && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.2 bg-amber-500 text-black text-[8px] font-black rounded shadow">
                    {member.breakthrough}
                  </div>
                )}

                <div className="absolute top-1 right-1 p-0.5 bg-black/60 backdrop-blur-sm rounded border border-white/10">
                  {ROLE_ICONS[member.role] || <Users size={12} />}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 장점 태그 */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {(party.pros || []).map(pro => (
              <span key={pro} className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                + {pro}
              </span>
            ))}
          </div>
        </div>

        {/* 카테고리 태그 및 대체 추천 */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              {party.category || '이능력 시너지'}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {(party.tags || []).slice(0, 3).map(tag => (
              <span key={tag} className="text-[9px] font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
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

        <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 space-y-12">
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
