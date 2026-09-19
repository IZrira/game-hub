import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry } from '../types';
import { getAniimoLocationPath } from '../utils/location';

const entries = aniimoData as AniimoEntry[];
const locations = [...new Set(entries.flatMap(entry => entry.forms.flatMap(form => form.locations)))].sort((a, b) => a.localeCompare(b, 'ko'));

const LocationsAniimo: React.FC = () => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
  <SEO title={`애니모 출현 지역 ${locations.length}곳 | 지역별 도감`} description={`애니모의 출현 지역 ${locations.length}곳과 지역별 애니모·형태 정보를 확인하세요.`} url="/gallery/aniimo/locations" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모', url: '/gallery/aniimo' }, { name: '지역별 도감', url: '/gallery/aniimo/locations' }]} />
  <PageHeader gameId="aniimo" category="허브" categoryUrl="/gallery/aniimo" title="지역별 도감" />
  <AniimoMobileNav />
  <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]"><AniimoSidebar /><div className="min-w-0 space-y-8"><section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10"><div className="flex items-center gap-3 text-violet-300"><MapPin size={20} /><span className="text-xs font-black uppercase tracking-[0.25em]">Location Archive</span></div><h1 className="mt-4 text-4xl font-black">지역별 애니모 도감</h1><p className="mt-3 text-sm leading-7 text-gray-300">출현 지역을 선택하면 해당 지역에서 만날 수 있는 애니모와 형태를 확인할 수 있습니다.</p></section><section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{locations.map(location => { const count = entries.filter(entry => entry.forms.some(form => form.locations.includes(location))).length; return <Link key={location} to={getAniimoLocationPath(location)} className="group rounded-2xl border border-white/10 bg-[#121212] p-5 hover:border-violet-400/40"><div className="flex items-center justify-between"><h2 className="font-black group-hover:text-violet-300">{location}</h2><span className="text-xs font-bold text-gray-500">{count}종</span></div></Link>; })}</section></div></main>
</div>;

export default LocationsAniimo;
