import React, { useMemo } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry } from '../types';
import { getAniimoLocationPath, toAniimoLocationSlug } from '../utils/location';

const entries = aniimoData as AniimoEntry[];
const locations = [...new Set(entries.flatMap(entry => entry.forms.flatMap(form => form.locations)))].sort((a, b) => a.localeCompare(b, 'ko'));

const LocationDetailAniimo: React.FC = () => {
  const { locationSlug = '' } = useParams<{ locationSlug: string }>();
  const location = locations.find(candidate => toAniimoLocationSlug(candidate) === locationSlug);
  const appearances = useMemo(() => location ? entries.map(entry => ({
    entry,
    forms: entry.forms.filter(form => form.locations.includes(location))
  })).filter(appearance => appearance.forms.length > 0) : [], [location]);

  if (!location) return <main className="min-h-[70vh] bg-[#0a0a0a] px-6 py-24 text-center text-white"><h1 className="text-3xl font-black">출현 지역을 찾을 수 없습니다.</h1><Link to="/gallery/aniimo" className="mt-6 inline-block text-violet-300">애니모 도감으로 돌아가기</Link></main>;

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${location} 출현 애니모 ${appearances.length}종 | 애니모 지역 도감`} description={`${location}에서 출현하는 애니모 ${appearances.length}종과 각 지역 형태를 확인하세요.`} url={getAniimoLocationPath(location)} gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모 도감', url: '/gallery/aniimo' }, { name: location, url: getAniimoLocationPath(location) }]} />
    <PageHeader gameId="aniimo" category="출현 지역" categoryUrl="/gallery/aniimo" title={location} />
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10">
        <div className="flex items-center gap-3 text-violet-300"><MapPin size={20} /><span className="text-xs font-black uppercase tracking-[0.25em]">Aniimo Location Archive</span></div>
        <h1 className="mt-4 text-4xl font-black tracking-tighter sm:text-5xl">{location}</h1>
        <p className="mt-3 text-sm leading-7 text-gray-300">이 지역에서 확인되는 애니모는 총 <strong className="text-white">{appearances.length}종</strong>입니다. 형태에 따라 출현 지역이 다를 수 있습니다.</p>
      </section>

      <section aria-label={`${location} 출현 애니모`} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {appearances.map(({ entry, forms }) => {
          const primaryForm = forms[0];
          const detailPath = `/gallery/aniimo/character/${encodeURIComponent(entry.name)}${primaryForm.key !== 'basic-form' ? `?form=${encodeURIComponent(primaryForm.key)}` : ''}`;
          return <article key={entry.number} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition hover:border-violet-400/40">
            <Link to={detailPath} className="block aspect-square bg-gradient-to-br from-white/[0.06] to-violet-500/[0.06] p-3">{primaryForm.imageUrl && <img src={primaryForm.imageUrl} alt={`${entry.name} ${primaryForm.label} 이미지`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain transition-transform hover:scale-105" />}</Link>
            <div className="space-y-3 p-3"><div><p className="text-[9px] font-black tracking-widest text-gray-500">NO.{entry.number}</p><h2 className="font-black">{entry.name}</h2></div><div className="flex flex-wrap gap-1">{forms.map(form => <Link key={form.key} to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}${form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : ''}`} className="rounded-md bg-violet-400/10 px-2 py-1 text-[9px] font-black text-violet-300 hover:bg-violet-400/20">{form.label}</Link>)}</div></div>
          </article>;
        })}
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#121212] p-6"><h2 className="font-black">다른 출현 지역</h2><div className="mt-4 flex flex-wrap gap-2">{locations.filter(candidate => candidate !== location).map(candidate => <Link key={candidate} to={getAniimoLocationPath(candidate)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-gray-300 hover:border-violet-400/40 hover:text-white">{candidate}</Link>)}</div></section>
      <Link to="/gallery/aniimo" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white"><ArrowLeft size={15} /> 애니모 도감으로 돌아가기</Link>
    </main>
  </div>;
};

export default LocationDetailAniimo;
