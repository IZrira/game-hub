import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { supabase } from '../../common-hub/lib/supabase';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import { ANIIMO_PARTY_RECOMMENDATIONS, normalizeAniimoParty, type AniimoPartyRecommendation } from '../data/parties';
import type { AniimoEntry } from '../types';

const entries = aniimoData as AniimoEntry[];

const PartyBuilderAniimo: React.FC = () => {
  const [parties, setParties] = useState<AniimoPartyRecommendation[]>(ANIIMO_PARTY_RECOMMENDATIONS);
  const [category, setCategory] = useState('전체');

  useEffect(() => {
    const load = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('party_recommendations').select('*').eq('game_id', 'aniimo').order('display_order');
      if (!error && data?.length) setParties(data.map(normalizeAniimoParty));
    };
    void load();
  }, []);

  const categories = useMemo(() => ['전체', ...new Set(parties.map(party => party.category))], [parties]);
  const filtered = category === '전체' ? parties : parties.filter(party => party.category === category);

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title="애니모 파티 추천 | 역할별 추천 조합" description="애니모의 역할과 형태를 반영한 추천 파티, 운용 특징과 대체 조합을 확인하세요." url="/gallery/aniimo/party-builder" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모', url: '/gallery/aniimo' }, { name: '파티 추천', url: '/gallery/aniimo/party-builder' }]} />
    <PageHeader gameId="aniimo" category="공략" categoryUrl="/gallery/aniimo" title="파티 추천" />
    <AniimoMobileNav />
    <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]"><AniimoSidebar /><div className="min-w-0 space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10"><div className="flex items-center gap-2 text-violet-300"><Users size={19} /><span className="text-[10px] font-black uppercase tracking-[0.25em]">Recommended Parties</span></div><h1 className="mt-4 text-3xl font-black sm:text-5xl">애니모 파티 추천</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">역할 균형과 형태별 특성을 기준으로 정리한 추천 조합입니다. 카드를 선택하면 각 애니모의 상세 능력과 스킬을 확인할 수 있습니다.</p></section>
      <nav className="flex flex-wrap gap-2" aria-label="파티 분류">{categories.map(value => <button key={value} onClick={() => setCategory(value)} className={`rounded-xl border px-4 py-2 text-xs font-black ${category === value ? 'border-violet-400/40 bg-violet-400/15 text-violet-200' : 'border-white/10 bg-white/[0.03] text-gray-400'}`}>{value}</button>)}</nav>
      <section className="space-y-6">{filtered.map(party => <article key={party.id} className="overflow-hidden rounded-[32px] border border-white/10 bg-[#121212]"><div className="border-b border-white/10 p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="text-[10px] font-black uppercase tracking-widest text-violet-300">{party.category} 추천</span><h2 className="mt-2 text-2xl font-black">{party.name}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-gray-400">{party.description}</p></div><div className="flex flex-wrap gap-2">{party.tags.map(tag => <span key={tag} className="rounded-lg bg-white/5 px-3 py-1.5 text-[10px] font-black text-gray-400">#{tag}</span>)}</div></div></div><div className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">{party.members.map((member, index) => { const entry = entries.find(item => item.number === member.number); const form = entry?.forms.find(item => item.key === member.formKey) || entry?.forms[0]; if (!entry || !form) return null; const subs = member.substitutes || []; return <div key={`${member.number}-${member.formKey}-${index}`} className="group bg-[#121212] p-5 flex flex-col justify-between"><Link to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}${form.key === 'basic-form' ? '' : `?form=${encodeURIComponent(form.key)}`}`} className="block"><div className="aspect-square rounded-2xl bg-gradient-to-br from-white/[0.05] to-violet-500/[0.08] p-4"><img src={form.imageUrl || entry.imageUrl || ''} alt={`${entry.name} 이미지`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain transition group-hover:scale-105" /></div><div className="mt-4 flex items-center justify-between"><span className="rounded-md bg-violet-400/15 px-2 py-0.5 text-[10px] font-black text-violet-300">{member.role}</span><span className="text-[10px] font-bold text-gray-500">{form.label}</span></div><div className="mt-2 flex items-center justify-between"><strong className="text-lg font-black text-white group-hover:text-violet-300 transition-colors">{entry.name}</strong><ArrowRight size={15} className="text-gray-600 group-hover:text-violet-300 transition-colors" /></div><div className="mt-3 flex flex-wrap gap-1">{form.elements.map(element => <span key={element} className="rounded-md bg-white/5 px-2 py-1 text-[9px] font-bold text-gray-500">{element}</span>)}{form.positions.map(position => <span key={position} className="rounded-md bg-white/5 px-2 py-1 text-[9px] font-bold text-gray-500">{position}</span>)}</div></Link>{subs.length > 0 && <div className="mt-4 pt-3 border-t border-white/5 text-[11px]"><span className="text-gray-500 text-[10px] font-bold">대체 가능:</span><div className="mt-1 flex flex-wrap gap-1.5">{subs.map((sub, subIdx) => { const subEntry = entries.find(item => item.number === sub.number); if (!subEntry) return null; return <Link key={subIdx} to={`/gallery/aniimo/character/${encodeURIComponent(subEntry.name)}`} className="text-violet-300 hover:text-white bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold">{subEntry.name}</Link>; })}</div></div>}</div>; })}</div></article>)}</section>
      {filtered.length === 0 && <section className="rounded-3xl border border-dashed border-white/10 py-20 text-center"><Sparkles className="mx-auto text-violet-300" /><h2 className="mt-4 font-black">등록된 추천 파티가 없습니다.</h2><p className="mt-2 text-xs text-gray-500">관리자 페이지에서 추천 조합을 등록할 수 있습니다.</p></section>}
    </div></main>
  </div>;
};

export default PartyBuilderAniimo;
