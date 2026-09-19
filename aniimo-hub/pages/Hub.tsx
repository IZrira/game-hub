import React from 'react';
import { ArrowRight, ExternalLink, MapPin, PawPrint, Swords } from 'lucide-react';
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
  <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]">
    <AniimoSidebar />
    <div className="min-w-0 space-y-10">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/20 via-[#121212] to-cyan-400/10 p-7 sm:p-12">
        <div className="relative max-w-3xl"><p className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-300">Rira Aniimo Database</p><h1 className="mt-4 text-4xl font-black italic tracking-tighter sm:text-6xl">ANIIMO <span className="text-violet-300">HUB</span></h1><p className="mt-5 text-sm leading-7 text-gray-300 sm:text-base">단순 정보 나열을 넘어 형태별 능력치, 진화 계보, 출현 지역과 전투 상성을 연결한 애니모 전용 데이터 허브입니다.</p><a href="https://www.aniimo.com/ko" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white">애니모 공식 사이트 <ExternalLink size={13} /></a></div>
      </section>

      <section className="grid grid-cols-3 overflow-hidden rounded-3xl border border-white/10 bg-[#121212] divide-x divide-white/10">{[[entries.length, '등록 애니모'], [formCount, '형태 데이터'], [locationCount, '출현 지역']].map(([value, label]) => <div key={label} className="p-5 text-center sm:p-7"><strong className="block text-2xl font-black text-violet-300 sm:text-4xl">{value}</strong><span className="mt-2 block text-[10px] font-bold text-gray-500 sm:text-xs">{label}</span></div>)}</section>

      <section><div className="mb-5"><h2 className="text-2xl font-black">애니모 데이터 탐색</h2><p className="mt-2 text-sm text-gray-500">필요한 도구를 선택하세요.</p></div><div className="grid gap-4 md:grid-cols-3">{tools.map(({ title, description, path, icon: Icon, stat }) => <Link key={path} to={path} className="group rounded-3xl border border-white/10 bg-[#121212] p-6 transition hover:-translate-y-1 hover:border-violet-400/40"><div className="flex items-center justify-between"><span className="rounded-2xl bg-violet-400/10 p-3 text-violet-300"><Icon size={22} /></span><span className="text-[10px] font-black text-gray-600">{stat}</span></div><h3 className="mt-6 text-xl font-black group-hover:text-violet-300">{title}</h3><p className="mt-3 min-h-20 text-xs leading-6 text-gray-400">{description}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-black text-violet-300">바로가기 <ArrowRight size={13} /></span></Link>)}</div></section>

      <section className="rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8"><h2 className="text-xl font-black">Rira 애니모 허브의 차이</h2><div className="mt-5 grid gap-5 text-sm leading-7 text-gray-400 md:grid-cols-3"><p><strong className="block text-white">형태 중심 데이터</strong>기본형·지역형에 따라 달라지는 원소, 능력치, 특성과 진화 계보를 함께 추적합니다.</p><p><strong className="block text-white">바로 쓰는 전투 정보</strong>전체 상성표뿐 아니라 상대 원소를 선택해 유리한 공격 원소를 바로 찾습니다.</p><p><strong className="block text-white">연결된 탐색 구조</strong>지역에서 애니모를 찾고 도감 상세와 형태 데이터까지 자연스럽게 이동합니다.</p></div></section>
    </div>
  </main>
</div>;

export default HubAniimo;
