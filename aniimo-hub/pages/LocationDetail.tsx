import React, { useMemo } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry } from '../types';
import { getAniimoLocationPath, toAniimoLocationSlug } from '../utils/location';
import { OFFICIAL_ANIIMO_HABITATS, normalizeHabitat } from '../data/habitats';

const entries = aniimoData as AniimoEntry[];
const habitats = OFFICIAL_ANIIMO_HABITATS;

const LocationDetailAniimo: React.FC = () => {
  const { locationSlug = '' } = useParams<{ locationSlug: string }>();
  const decodedSlug = decodeURIComponent(locationSlug);
  const normalizedCandidate = normalizeHabitat(decodedSlug.replace(/-/g, ' '));
  const habitat = habitats.find(h => toAniimoLocationSlug(h) === toAniimoLocationSlug(normalizedCandidate)) || normalizedCandidate;

  const isValidHabitat = habitats.includes(habitat as any);

  // If accessed via a legacy name or sub-location (e.g. 초승달-만, 스타폴-숲), redirect to canonical habitat URL
  if (isValidHabitat && toAniimoLocationSlug(decodedSlug) !== toAniimoLocationSlug(habitat)) {
    return <Navigate to={getAniimoLocationPath(habitat)} replace />;
  }

  const appearances = useMemo(() => {
    if (!isValidHabitat) return [];
    return entries
      .filter(entry => (entry.habitats || []).includes(habitat))
      .map(entry => {
        const matchingForms = entry.forms.filter(form => (form.locations || []).includes(habitat));
        const formsToDisplay = matchingForms.length > 0 ? matchingForms : entry.forms;
        return {
          entry,
          forms: formsToDisplay
        };
      });
  }, [habitat, isValidHabitat]);

  if (!isValidHabitat) {
    return (
      <main className="min-h-[70vh] bg-[#0a0a0a] px-6 py-24 text-center text-white">
        <h1 className="text-3xl font-black">공식 서식지를 찾을 수 없습니다.</h1>
        <p className="mt-2 text-sm text-gray-400">요청하신 지역은 공식 14대 서식지에 포함되지 않습니다.</p>
        <Link to="/gallery/aniimo/locations" className="mt-6 inline-block text-violet-300">
          서식지 도감으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
      <SEO
        title={`${habitat} 공식 서식지 · 서식 애니모 ${appearances.length}종 | 애니모 서식지 도감`}
        description={`${habitat}에서 서식하는 애니모 ${appearances.length}종과 각 지역 형태를 확인하세요.`}
        url={getAniimoLocationPath(habitat)}
        gameCategory="애니모"
        breadcrumbData={[
          { name: '홈', url: '/' },
          { name: '애니모 허브', url: '/gallery/aniimo' },
          { name: '서식지 도감', url: '/gallery/aniimo/locations' },
          { name: habitat, url: getAniimoLocationPath(habitat) }
        ]}
      />
      <PageHeader gameId="aniimo" category="서식지 도감" categoryUrl="/gallery/aniimo/locations" title={habitat} />
      <AniimoMobileNav />
      <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[230px_minmax(0,1fr)]">
        <AniimoSidebar />
        <div className="min-w-0 space-y-8">
          <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10">
            <div className="flex items-center gap-3 text-violet-300">
              <MapPin size={20} />
              <span className="text-xs font-black uppercase tracking-[0.25em]">Official Habitat Archive</span>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tighter sm:text-5xl">{habitat}</h1>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              이 서식지에서 확인되는 공식 서식 애니모는 총 <strong className="text-white">{appearances.length}종</strong>입니다. 형태 및 세부 출현 스팟에 따라 다양한 특성을 가집니다.
            </p>
          </section>

          <section aria-label={`${habitat} 서식 애니모`} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {appearances.map(({ entry, forms }) => {
              const primaryForm = forms[0];
              const detailPath = `/gallery/aniimo/character/${encodeURIComponent(entry.name)}${primaryForm.key !== 'basic-form' ? `?form=${encodeURIComponent(primaryForm.key)}` : ''}`;
              return (
                <article key={entry.number} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition hover:border-violet-400/40">
                  <Link to={detailPath} className="block aspect-square bg-gradient-to-br from-white/[0.06] to-violet-500/[0.06] p-3">
                    {primaryForm.imageUrl && (
                      <img
                        src={primaryForm.imageUrl}
                        alt={`${entry.name} ${primaryForm.label} 이미지`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain transition-transform hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="space-y-3 p-3">
                    <div>
                      <p className="text-[9px] font-black tracking-widest text-gray-500">NO.{entry.number}</p>
                      <h2 className="font-black">{entry.name}</h2>
                      {entry.detailLocations && entry.detailLocations.length > 0 && (
                        <p className="mt-1 text-[9px] text-cyan-400 font-bold">
                          세부 위치: {entry.detailLocations.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {forms.map(form => (
                        <Link
                          key={form.key}
                          to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}${form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : ''}`}
                          className="rounded-md bg-violet-400/10 px-2 py-1 text-[9px] font-black text-violet-300 hover:bg-violet-400/20"
                        >
                          {form.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#121212] p-6">
            <h2 className="font-black">다른 공식 서식지 (14개)</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {habitats.filter(candidate => candidate !== habitat).map(candidate => (
                <Link
                  key={candidate}
                  to={getAniimoLocationPath(candidate)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-gray-300 hover:border-violet-400/40 hover:text-white"
                >
                  {candidate}
                </Link>
              ))}
            </div>
          </section>
          <Link to="/gallery/aniimo/locations" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white">
            <ArrowLeft size={15} /> 서식지 도감으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LocationDetailAniimo;
