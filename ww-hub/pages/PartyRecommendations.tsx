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
import { WW_PARTY_COMBINATIONS, PartyCombination } from '../data/parties';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import PageHeader from '../../common-hub/components/PageHeader';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../common-hub/lib/supabase';

const ROLE_ICONS: Record<string, React.ReactNode> = {
  '메인 딜러': <Sword size={14} className="text-rose-500" />,
  '서브 딜러': <Zap size={14} className="text-yellow-500" />,
  '서포터': <Users size={14} className="text-blue-500" />,
  '생존': <Shield size={14} className="text-emerald-500" />,
};

const PartyCard: React.FC<{ party: PartyCombination; gameId: string | undefined }> = React.memo(({ party, gameId }) => {
  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images';

  const getIconUrl = (member: { folderName?: string; name: string }) => {
    let folder = member.folderName || member.name;
    const isRover = folder.startsWith('방랑자');
    if (isRover && folder === '방랑자 · 전도') {
      folder = '방랑자 · 회절';
    }
    const fileName = isRover ? `${folder}(여)` : folder;
    return encodeURI(`${BASE_IMAGE_URL}/skills/${folder.normalize('NFC')}/${fileName.normalize('NFC')}.webp`);
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

        <div className="grid grid-cols-3 gap-3 pt-2 relative">
          {party.members.map((member, idx) => (
            <div key={`${member.id}-${idx}`} className="relative">
              <Link 
                to={`/gallery/${gameId}/character/${member.name}`}
                className="group/member relative block aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-accent/50 transition-all"
              >
                <img 
                  src={getIconUrl(member)} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/member:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-[8px] font-black text-white truncate text-center uppercase tracking-tighter">
                    {member.name}
                  </p>
                </div>
                
                {/* 돌파 추천 뱃지 (1돌+, 2돌+ 등) */}
                {member.breakthrough && member.breakthrough !== '명함 (S0)' && member.breakthrough !== '명함' && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.2 bg-amber-500 text-black text-[8px] font-black rounded shadow">
                    {member.breakthrough}
                  </div>
                )}

                <div className="absolute top-1 right-1 p-0.5 bg-black/60 backdrop-blur-sm rounded border border-white/10">
                  {ROLE_ICONS[member.role] || <Users size={14} />}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {(party.pros || []).map(pro => (
              <span key={pro} className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                + {pro}
              </span>
            ))}
          </div>
        </div>

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
});

const PartyRecommendations: React.FC = () => {
  const { t } = useTranslation();
  const { gameId } = useParams<{ gameId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [partiesList, setPartiesList] = useState<PartyCombination[]>(WW_PARTY_COMBINATIONS);

  // Supabase 실시간 동기화 & localStorage 즉시 로드
  useEffect(() => {
    // 1단계: localStorage 캐시 즉시 적용 (0ms 지연 없음)
    try {
      const local = localStorage.getItem('parties_WW');
      if (local) {
        const localParties = JSON.parse(local);
        if (Array.isArray(localParties) && localParties.length > 0) {
          const parsed: PartyCombination[] = localParties.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            mainDPS: item.mainDPS || '',
            tags: item.tags || [],
            pros: item.pros || [],
            cons: item.cons || [],
            members: (item.slots || []).map((m: any) => ({
              id: m.characterId || m.id,
              name: m.characterName || m.name,
              folderName: m.folderName || m.characterName || m.name,
              role: m.role || '서포터',
              breakthrough: m.breakthrough,
              description: m.description,
              substitutes: m.substitutes?.map((s: any) => ({
                name: s.characterName || s.name,
                folderName: s.folderName || s.characterName || s.name,
                breakthrough: s.breakthrough,
                description: s.description,
                role: s.role
              }))
            }))
          }));
          setPartiesList(parsed);
        }
      }
    } catch (e) {
      console.warn('Local storage party parse error:', e);
    }

    // 2단계: Supabase 클라우드 실시간 동기화 확인
    const fetchCloudParties = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('party_recommendations')
          .select('*')
          .eq('game_id', 'ww')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const parsed: PartyCombination[] = data.map((item: any) => ({
            id: item.party_id || item.id,
            name: item.name,
            description: item.description || '',
            mainDPS: item.main_dps || item.mainDPS || '',
            tags: item.tags || [],
            pros: item.pros || [],
            cons: item.cons || [],
            members: (item.members || []).map((m: any) => ({
              id: m.characterId || m.id,
              name: m.characterName || m.name,
              folderName: m.folderName || m.characterName || m.name,
              role: m.role || '서포터',
              breakthrough: m.breakthrough,
              description: m.description,
              substitutes: m.substitutes?.map((s: any) => ({
                name: s.characterName || s.name,
                folderName: s.folderName || s.characterName || s.name,
                breakthrough: s.breakthrough,
                description: s.description,
                role: s.role
              }))
            }))
          }));
          setPartiesList(parsed);
        }
      } catch (err) {
        console.warn('Supabase cloud fetch failed (using local/fallback data):', err);
      }
    };

    fetchCloudParties();
  }, []);

  const filteredParties = useMemo(() => {
    return partiesList.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [partiesList, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      <PageHeader gameId={gameId} category={t("파티")} title={t("추천 파티 조합")} />

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar />

        <div className="space-y-12">
          <div className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-white/5 rounded-[48px]">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 via-[#050505] to-[#050505]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em]">
                <Sparkles size={12} /> Recommended Formations
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                Party <span className="text-brand-accent">Synergy</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                명조: 워더링 웨이브의 최적 파티 조합 가이드입니다.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-[32px] bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                  <Info className="text-brand-accent" size={24} />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Party Building Guide</h2>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                본 가이드는 추천 조합일 뿐이며, 상황에 따라 유동적으로 변경될 수 있습니다.
              </p>
            </div>
          </div>

          <div className="sticky top-16 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="파티명, 설명 검색..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredParties.map(party => (
                <PartyCard key={party.id} party={party} gameId={gameId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyRecommendations;

