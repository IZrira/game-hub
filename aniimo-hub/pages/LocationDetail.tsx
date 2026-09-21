import React, { useMemo, useState } from 'react';
import { ArrowLeft, MapPin, Sparkles, Filter, Check } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry, AniimoForm } from '../types';
import { getAniimoLocationPath, toAniimoLocationSlug } from '../utils/location';
import { OFFICIAL_ANIIMO_HABITATS, normalizeHabitat } from '../data/habitats';

const entries = aniimoData as AniimoEntry[];
const habitats = OFFICIAL_ANIIMO_HABITATS;

type FormFilter = 'all' | 'basic' | 'special' | 'exclusive';

const LocationDetailAniimo: React.FC = () => {
  const { locationSlug = '' } = useParams<{ locationSlug: string }>();
  const [activeFilter, setActiveFilter] = useState<FormFilter>('all');

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

  // Determine if a form is exclusive to this habitat
  const isFormExclusive = useMemo(() => {
    return (form: AniimoForm) => {
      const locs = form.locations || [];
      if (locs.length === 0) return false;
      return locs.every(loc => normalizeHabitat(loc) === habitat);
    };
  }, [habitat]);

  // Counts for filters
  const filterCounts = useMemo(() => {
    let basicCount = 0;
    let specialCount = 0;
    let exclusiveCount = 0;

    appearances.forEach(({ forms }) => {
      const hasBasic = forms.some(f => f.key === 'basic-form');
      const hasSpecial = forms.some(f => f.key !== 'basic-form');
      const hasExclusive = forms.some(f => isFormExclusive(f));

      if (hasBasic) basicCount++;
      if (hasSpecial) specialCount++;
      if (hasExclusive) exclusiveCount++;
    });

    return {
      all: appearances.length,
      basic: basicCount,
      special: specialCount,
      exclusive: exclusiveCount
    };
  }, [appearances, isFormExclusive]);

  // Filtered appearances
  const filteredAppearances = useMemo(() => {
    if (activeFilter === 'all') return appearances;

    return appearances.filter(({ forms }) => {
      if (activeFilter === 'basic') {
        return forms.some(f => f.key === 'basic-form');
      }
      if (activeFilter === 'special') {
        return forms.some(f => f.key !== 'basic-form');
      }
      if (activeFilter === 'exclusive') {
        return forms.some(f => isFormExclusive(f));
      }
      return true;
    });
  }, [appearances, activeFilter, isFormExclusive]);

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
          {/* Header Card */}
          <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10">
            <div className="flex items-center gap-3 text-violet-300">
              <MapPin size={20} />
              <span className="text-xs font-black uppercase tracking-[0.25em]">Official Habitat Archive</span>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tighter sm:text-5xl">{habitat}</h1>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              이 서식지에서 확인되는 공식 서식 애니모는 총 <strong className="text-white">{appearances.length}종</strong>입니다.
              {filterCounts.exclusive > 0 && (
                <> 이 지역에서만 독점 출현하는 <strong className="text-amber-400">지역 고유 형태 {filterCounts.exclusive}종</strong>이 포함되어 있습니다.</>
              )}
            </p>

            {/* Filter Tabs */}
            <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/10">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeFilter === 'all'
                    ? 'bg-violet-400 text-black shadow-lg shadow-violet-500/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                전체 ({filterCounts.all})
              </button>
              <button
                onClick={() => setActiveFilter('basic')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeFilter === 'basic'
                    ? 'bg-violet-400 text-black shadow-lg shadow-violet-500/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                기본 형태 ({filterCounts.basic})
              </button>
              <button
                onClick={() => setActiveFilter('special')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeFilter === 'special'
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                특수 형태 ({filterCounts.special})
              </button>
              {filterCounts.exclusive > 0 && (
                <button
                  onClick={() => setActiveFilter('exclusive')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    activeFilter === 'exclusive'
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-amber-400/10 text-amber-300 border border-amber-400/20 hover:bg-amber-400/20'
                  }`}
                >
                  <Sparkles size={13} />
                  <span>지역 고유 형태 ({filterCounts.exclusive})</span>
                </button>
              )}
            </div>
          </section>

          {/* Appearances Grid */}
          <section aria-label={`${habitat} 서식 애니모`} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredAppearances.map(({ entry, forms }) => {
              const primaryForm = forms[0];
              const detailPath = `/gallery/aniimo/character/${encodeURIComponent(entry.name)}${primaryForm.key !== 'basic-form' ? `?form=${encodeURIComponent(primaryForm.key)}` : ''}`;
              const hasExclusive = forms.some(f => isFormExclusive(f));

              return (
                <article
                  key={entry.number}
                  className={`overflow-hidden rounded-2xl border transition hover:border-violet-400/40 bg-[#121212] ${
                    hasExclusive ? 'border-amber-400/30' : 'border-white/10'
                  }`}
                >
                  <Link to={detailPath} className="block relative aspect-square bg-gradient-to-br from-white/[0.06] to-violet-500/[0.06] p-3">
                    {hasExclusive && (
                      <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-400 text-black text-[9px] font-black shadow">
                        <Sparkles size={9} />
                        <span>고유</span>
                      </span>
                    )}
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
                      <h2 className="font-black text-sm">{entry.name}</h2>
                      {entry.detailLocations && entry.detailLocations.length > 0 && (
                        <p className="mt-1 text-[9px] text-cyan-400 font-bold">
                          세부: {entry.detailLocations.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {forms.map(form => {
                        const exclusive = isFormExclusive(form);
                        const isSpecial = form.key !== 'basic-form';
                        return (
                          <Link
                            key={form.key}
                            to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}${form.key !== 'basic-form' ? `?form=${encodeURIComponent(form.key)}` : ''}`}
                            className={`rounded-md px-1.5 py-0.5 text-[9px] font-black transition ${
                              exclusive
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400/30'
                                : isSpecial
                                ? 'bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20'
                                : 'bg-violet-400/10 text-violet-300 hover:bg-violet-400/20'
                            }`}
                          >
                            {form.label.replace(' 형태', '')}
                            {exclusive && ' · 고유'}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {filteredAppearances.length === 0 && (
            <div className="p-12 text-center rounded-3xl border border-white/5 bg-[#121212] text-gray-400">
              선택하신 조건에 해당하는 형태의 애니모가 없습니다.
            </div>
          )}

          {/* Other Official Habitats */}
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
