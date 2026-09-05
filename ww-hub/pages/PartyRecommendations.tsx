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

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images';

const normalizeName = (name: string) => {
  if (!name) return "";
  return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
};

const getIconUrl = (member: { folderName?: string; name: string }) => {
  let folder = member.folderName || member.name;
  const isRover = folder.startsWith('방랑자');
  if (isRover && folder === '방랑자 · 전도') {
    folder = '방랑자 · 회절';
  }
  const fileName = isRover ? `${folder}(여)` : folder;
  return encodeURI(`${BASE_IMAGE_URL}/skills/${folder.normalize('NFC')}/${fileName.normalize('NFC')}.webp`);
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
              onError={(e) => (e.currentTarget.style.opacity = '0.3')} 
            />
         </Link>
         
         {/* 돌파 추천 뱃지 (1돌+, 2돌+ 등) */}
         {member.breakthrough && member.breakthrough !== '명함 (S0)' && member.breakthrough !== '명함' && (
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
                      <img src={getIconUrl(sub)} alt={sub.name} className="w-full h-full object-cover rounded-full group-hover/sub:scale-110 transition-transform" />
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

const PartyCard: React.FC<{ party: PartyCombination; gameId: string | undefined }> = React.memo(({ party, gameId }) => {
  const { t } = useTranslation();

  return (
    <div className="group glass-card rounded-[32px] sm:rounded-[44px] md:rounded-[50px] border border-white/5 overflow-visible hover:border-brand-primary/20 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl relative">
      <div className="p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 relative z-20">
        <div className="flex items-center gap-3 sm:gap-4 border-b border-white/5 pb-4 sm:pb-6">
          <div className="w-1.5 h-5 sm:h-6 bg-brand-primary rounded-full shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]" />
          <h4 className="text-base sm:text-xl font-black text-white italic tracking-tight uppercase group-hover:text-brand-accent transition-colors">{t(party.name)}</h4>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 relative">
          {party.members.map((member, idx) => (
            <PartyMemberItem key={idx} member={member} gameId={gameId} />
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

