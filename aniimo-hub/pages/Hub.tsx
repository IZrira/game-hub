import React from 'react';
import { ArrowRight, ExternalLink, Layers3, MapPin, PawPrint, Sparkles, Swords } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry } from '../types';

const entries = aniimoData as AniimoEntry[];
const locationCount = new Set(entries.flatMap(entry => entry.forms.flatMap(form => form.locations))).size;
const formCount = entries.reduce((total, entry) => total + entry.forms.length, 0);

const tools = [
  { title: '애니모 도감', description: '전체 애니모를 원소·포지션·지역으로 검색하고 형태별 능력치를 비교합니다.', path: '/gallery/aniimo/characters', icon: PawPrint, stat: `${entries.length}종` },
  { title: '원소 상성표', description: '9개 원소의 공격 배율과 복합 원소 상대 추천 공격 원소를 확인합니다.', path: '/gallery/aniimo/type-chart', icon: Swords, stat: '9원소' },
  { title: '지역별 도감', description: '출현 지역을 기준으로 만날 수 있는 애니모와 지역 형태를 탐색합니다.', path: '/gallery/aniimo/locations', icon: MapPin, stat: `${locationCount}지역` },
];

const HubAniimo: React.FC = () => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
  <SEO title="애니모 허브 | 도감·원소 상성·지역 데이터베이스" description={`애니모 ${entries.length}종의 형태별 도감, 능력치 비교, 9원소 상성표와 ${locationCount}개 지역별 출현 정보를 한곳에서 확인하세요.`} url="/gallery/aniimo" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모 허브', url: '/gallery/aniimo' }]} />
  <PageHeader gameId="aniimo" title="애니모 허브" />
  <AniimoMobileNav />
  <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
    <AniimoSidebar />
    <div className="min-w-0 space-y-16">
      <section className="group relative overflow-hidden rounded-[28px] border border-white/5 bg-[#0a0a0a] p-6 sm:rounded-[40px] sm:p-10 md:p-12">
        {entries[0]?.imageUrl && <img src={entries[0].imageUrl} alt="대표 애니모" referrerPolicy="no-referrer" className="absolute inset-y-0 right-0 h-full w-3/5 object-contain object-right opacity-30 transition-transform duration-700 [mask-image:linear-gradient(to_left,black,transparent)] group-hover:scale-105" />}
        <div className="relative z-10 max-w-2xl space-y-5"><div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"><Sparkles size={12} className="animate-pulse text-violet-300" /><span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Aniimo Archive v1.0</span></div><h1 className="text-3xl font-black italic uppercase leading-tight tracking-tighter sm:text-5xl md:text-7xl"><span className="text-white">ANIIMO </span><span className="text-violet-300">ARCHIVE</span></h1><p className="max-w-lg border-l-2 border-violet-400/50 pl-4 text-xs font-bold leading-relaxed text-gray-400 sm:pl-6 sm:text-sm md:text-base">형태별 능력치, 진화 계보, 출현 지역과 전투 상성을 연결한 애니모 전용 데이터베이스입니다.</p><a href="https://www.aniimo.com/ko" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white">애니모 공식 사이트 <ExternalLink size={13} /></a></div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">{[
        { value: entries.length, label: '등록 애니모', icon: PawPrint, color: 'text-violet-300' },
        { value: formCount, label: '형태 데이터', icon: Layers3, color: 'text-cyan-300' },
        { value: 9, label: '원소 상성', icon: Swords, color: 'text-rose-300' },
        { value: locationCount, label: '출현 지역', icon: MapPin, color: 'text-emerald-300' },
      ].map(({ value, label, icon: Icon, color }) => <div key={label} className="group flex flex-col items-center justify-center gap-1 rounded-[28px] border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]"><div className={`rounded-xl bg-white/5 p-2.5 transition-transform group-hover:scale-110 ${color}`}><Icon size={14} /></div><strong className="text-xl font-black leading-none text-white">{value}</strong><span className="pt-1 text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</span></div>)}</section>

      <section className="space-y-6"><div className="flex items-center gap-3 px-2"><div className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" /><h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">데이터베이스 메뉴</h2></div><div className="grid gap-4 md:grid-cols-3">{tools.map(({ title, description, path, icon: Icon, stat }) => <Link key={path} to={path} className="group rounded-[28px] border border-white/5 bg-white/[0.02] p-6 transition hover:border-violet-400/30 hover:bg-white/[0.04]"><div className="flex items-center justify-between"><span className="rounded-xl bg-white/5 p-2.5 text-violet-300"><Icon size={18} /></span><span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{stat}</span></div><h3 className="mt-5 text-lg font-black group-hover:text-violet-300">{title}</h3><p className="mt-2 min-h-16 text-xs leading-6 text-gray-400">{description}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-black text-violet-300">탐색하기 <ArrowRight size={13} /></span></Link>)}</div></section>

      <section className="space-y-6"><div className="flex items-center gap-3 px-2"><div className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" /><h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">도감 미리보기</h2></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">{entries.slice(0, 5).map(entry => <Link key={entry.number} to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}`} className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:border-violet-400/30"><div className="aspect-square bg-gradient-to-br from-white/[0.05] to-violet-400/[0.05] p-3">{entry.imageUrl && <img src={entry.imageUrl} alt={`${entry.name} 이미지`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain transition-transform group-hover:scale-105" />}</div><div className="p-3"><p className="text-[9px] font-black tracking-widest text-gray-600">NO.{entry.number}</p><h3 className="font-black group-hover:text-violet-300">{entry.name}</h3></div></Link>)}</div></section>
    </div>
  </main>
</div>;

export default HubAniimo;
