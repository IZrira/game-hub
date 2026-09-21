import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry } from '../types';
import { getAniimoLocationPath } from '../utils/location';
import { OFFICIAL_ANIIMO_HABITATS, OFFICIAL_HABITAT_TARGETS } from '../data/habitats';

const entries = aniimoData as AniimoEntry[];
const habitats = OFFICIAL_ANIIMO_HABITATS;

const LocationsAniimo: React.FC = () => (
  <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO
      title={`애니모 공식 서식지 ${habitats.length}곳 | 서식지 도감`}
      description={`애니모의 공식 서식지 ${habitats.length}곳과 서식지별 애니모·형태 정보를 확인하세요.`}
      url="/gallery/aniimo/locations"
      gameCategory="애니모"
      breadcrumbData={[
        { name: '홈', url: '/' },
        { name: '애니모', url: '/gallery/aniimo' },
        { name: '서식지 도감', url: '/gallery/aniimo/locations' }
      ]}
    />
    <PageHeader gameId="aniimo" category="허브" categoryUrl="/gallery/aniimo" title="서식지 도감" />
    <AniimoMobileNav />
    <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]">
      <AniimoSidebar />
      <div className="min-w-0 space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10">
          <div className="flex items-center gap-3 text-violet-300">
            <MapPin size={20} />
            <span className="text-xs font-black uppercase tracking-[0.25em]">Official Habitat Archive</span>
          </div>
          <h1 className="mt-4 text-4xl font-black">공식 서식지 도감</h1>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            공식 14개 서식지를 선택하면 해당 서식지에 서식하는 애니모와 형태를 확인할 수 있습니다.
          </p>
        </section>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {habitats.map(habitat => {
            const count = entries.filter(entry => (entry.habitats || []).includes(habitat)).length || OFFICIAL_HABITAT_TARGETS[habitat];
            return (
              <Link
                key={habitat}
                to={getAniimoLocationPath(habitat)}
                className="group rounded-2xl border border-white/10 bg-[#121212] p-5 hover:border-violet-400/40"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-black group-hover:text-violet-300">{habitat}</h2>
                  <span className="text-xs font-bold text-gray-500">{count}종</span>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  </div>
);

export default LocationsAniimo;
