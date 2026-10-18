import React from 'react';
import { ArrowRight, Brain, ExternalLink, Layers3, MapPin, PawPrint, Sparkles, Swords, Users } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import HubIntro from '../../common-hub/components/HubIntro';
import LazyImage from '../../common-hub/components/LazyImage';
import { getAniimoLocationPath } from '../utils/location';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo-summary.json';
import type { AniimoEntry } from '../types';

import { OFFICIAL_ANIIMO_HABITATS } from '../data/habitats';

const entries = aniimoData as unknown as AniimoEntry[];
const locationCount = OFFICIAL_ANIIMO_HABITATS.length;
const formCount = entries.reduce((total, entry) => total + entry.forms.length, 0);

const tools = [
  { title: '애니모 도감', description: '전체 애니모를 원소·포지션·지역으로 검색하고 기본 상세 정보를 확인합니다.', path: '/gallery/aniimo/characters', icon: PawPrint, stat: `${entries.length}종` },
  { title: '능력치 비교', description: '선택한 애니모의 형태별 능력치와 역할 차이를 비교합니다.', path: '/gallery/aniimo/characters', icon: Layers3, stat: '스탯 비교' },
  { title: '파티 추천', description: '역할과 형태별 특성을 반영해 엄선한 4인 추천 조합과 서포터를 확인합니다.', path: '/gallery/aniimo/party-builder', icon: Users, stat: '추천 조합' },
  { title: '원소 상성표', description: '9개 원소의 공격 배율과 복합 원소 상대 추천 공격 원소를 확인합니다.', path: '/gallery/aniimo/type-chart', icon: Swords, stat: '9원소' },
  { title: '서식지 도감', description: '공식 14대 서식지를 기준으로 만날 수 있는 애니모와 지역 형태를 탐색합니다.', path: '/gallery/aniimo/locations', icon: MapPin, stat: `${locationCount}개 서식지` },
  { title: '성격 가이드', description: '성격 8종의 전투·홈 효과와 역할별 추천 MBTI 조합을 확인합니다.', path: '/gallery/aniimo/personality', icon: Brain, stat: '8성격' },
];

const HubAniimo: React.FC = () => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
  <SEO title="애니모 허브 | 도감·원소 상성·서식지 데이터베이스" description={`애니모 ${entries.length}종의 형태별 도감, 능력치 비교, 9원소 상성표와 ${locationCount}개 공식 서식지 정보를 한곳에서 확인하세요.`} url="/gallery/aniimo" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모 허브', url: '/gallery/aniimo' }]} />
  <PageHeader gameId="aniimo" title="애니모 허브" />
  <AniimoMobileNav />
  <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
    <AniimoSidebar />
    <div className="min-w-0 space-y-8 sm:space-y-10">
      <HubIntro title="애니모" description="형태·진화·서식 정보를 찾고, 능력치와 성격을 비교하세요." searchPath="/gallery/aniimo/characters" searchLabel="이름 또는 도감 번호 검색"
        stats={[{ label: '등록 애니모', value: entries.length }, { label: '형태 데이터', value: formCount }, { label: '원소 상성', value: 9 }, { label: '출현 지역', value: locationCount }]}
        links={[{ label: '전체 도감', to: '/gallery/aniimo/characters' }, { label: '진화·형태 가이드', to: '/gallery/aniimo/guides/evolution-and-forms-guide' }, { label: '원소 상성표', to: '/gallery/aniimo/type-chart' }]} />

      <section aria-labelledby="aniimo-browse-heading" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="aniimo-browse-heading" className="text-xl font-bold">애니모 찾아보기</h2>
          <Link to="/gallery/aniimo/characters" className="inline-flex min-h-11 items-center text-sm text-violet-300 hover:text-white">전체 도감 <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {entries.slice(0, 4).map((entry, index) => <Link key={entry.number} to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}`} className="min-w-0 rounded-2xl border border-white/10 p-3 transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300">
            <LazyImage src={entry.imageUrl || '/assets/unknown.webp'} alt={entry.name} loading={index < 2 ? 'eager' : 'lazy'} containerClassName="aspect-square" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
            <p className="mt-2 text-xs text-gray-400">NO.{entry.number}</p>
            <h3 className="mt-1 font-bold">{entry.name}</h3>
            <p className="mt-1 text-xs text-gray-400">{entry.elements.join(' · ')}</p>
          </Link>)}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="space-y-4 border-t border-white/10 pt-5">
          <h2 className="text-xl font-bold">진화와 형태 살펴보기</h2>
          <p className="text-sm leading-6 text-gray-400">종마다 다른 진화 조건과 지역 형태를 확인하세요. 진화 계보는 각 애니모 상세에서 볼 수 있습니다.</p>
          <div className="flex flex-wrap gap-2">
            {entries.slice(0, 2).map(entry => <Link key={entry.number} to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}`} className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-3 text-sm hover:bg-white/5">{entry.name} 상세 <ArrowRight size={14} /></Link>)}
          </div>
          <Link to="/gallery/aniimo/guides/evolution-and-forms-guide" className="inline-flex min-h-11 items-center gap-2 text-sm text-violet-300 hover:text-white">진화·형태 선택 가이드 <ArrowRight size={14} /></Link>
        </section>
        <section className="space-y-4 border-t border-white/10 pt-5">
          <h2 className="text-xl font-bold">서식지로 찾기</h2>
          <p className="text-sm leading-6 text-gray-400">출현 지역별 애니모와 지역 형태를 확인하세요.</p>
          <div className="flex flex-wrap gap-2">
            {OFFICIAL_ANIIMO_HABITATS.slice(0, 4).map(habitat => <Link key={habitat} to={getAniimoLocationPath(habitat)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm hover:bg-white/5"><MapPin size={14} />{habitat}</Link>)}
          </div>
          <Link to="/gallery/aniimo/locations" className="inline-flex min-h-11 items-center gap-2 text-sm text-violet-300 hover:text-white">전체 서식지 보기 <ArrowRight size={14} /></Link>
        </section>
      </div>
      <section className="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5">
        <div><h2 className="text-xl font-bold">애니모 비교</h2><p className="mt-2 text-sm text-gray-400">도감에서 비교할 형태를 골라 능력치와 역할 차이를 확인하세요.</p></div>
        <Link to="/gallery/aniimo/characters" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm hover:bg-white/5">비교할 애니모 선택 <ArrowRight size={14} /></Link>
      </section>

      <section className="space-y-4" aria-label="애니모 전체 메뉴">
        <h2 className="text-xl font-bold">전체 메뉴</h2>
        <div className="grid gap-x-6 md:grid-cols-2">{tools.map(({ title, description, path, stat }) => <Link key={title} to={path} className="group border-b border-white/10 py-4 transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300">
          <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-base font-bold">{title}</h3><span className="text-xs text-gray-400">{stat}</span></div>
          <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
        </Link>)}</div>
        <a href="https://www.aniimo.com/ko" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-violet-300 hover:text-white">애니모 공식 사이트 <ExternalLink size={13} /></a>
      </section>

    </div>
  </main>
</div>;

export default HubAniimo;
