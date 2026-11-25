import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import HubIntro from '../../common-hub/components/HubIntro';
import LazyImage from '../../common-hub/components/LazyImage';
import { Gf2MobileNav, Gf2Sidebar, Gf2Tag, GF2_PRIVATE_NOTE } from '../components/Gf2Navigation';
import { GF2_DOLLS, GF2_ELEMENTS, GF2_JOBS, gf2DollPath, gf2ElementIcon, gf2JobIcon, gf2Portrait, gf2StatIcon } from '../utils/gf2Data';

const latest = [...GF2_DOLLS].reverse();
const eliteCount = GF2_DOLLS.filter(doll => doll.rarity === '정예').length;
const count = (key: 'job' | 'element', value: string) => GF2_DOLLS.filter(doll => doll[key] === value).length;

const HubGF2: React.FC = () => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
  <SEO title="소녀전선2: 망명 허브" url="/gallery/gf2" noindex />
  <PageHeader gameId="gf2" title="소녀전선2 허브" />
  <Gf2MobileNav />
  <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
    <Gf2Sidebar />
    <div className="min-w-0 space-y-10">
      <p role="note" className="rounded-xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-sm text-orange-100">{GF2_PRIVATE_NOTE}</p>
      <HubIntro title="소녀전선2: 망명" description="전술인형의 스킬, 마인드 보강, 뉴럴 헬릭스와 결합키를 정리한 도감입니다. 직업과 위상 속성으로 인형을 찾고 약점과 육성 정보를 확인하세요." searchPath="/gallery/gf2/dolls" searchLabel="인형 이름으로 검색"
        stats={[{ label: '인형', value: GF2_DOLLS.length }, { label: '정예', value: eliteCount }, { label: '표준', value: GF2_DOLLS.length - eliteCount }, { label: '위상 속성', value: GF2_ELEMENTS.length }]}
        links={[{ label: '인형 도감', to: '/gallery/gf2/dolls' }, { label: '최신순 보기', to: '/gallery/gf2/dolls?sort=latest' }]} />

      <section aria-labelledby="gf2-latest" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="gf2-latest" className="text-2xl font-bold">최근 출시 인형</h2>
          <Link to="/gallery/gf2/dolls?sort=latest" className="inline-flex min-h-11 items-center gap-1 text-sm text-orange-300 hover:text-white">최신순 전체 <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">{latest.slice(0, 3).map((doll, index) => {
          const [ammo, weakElement] = doll.weakness.split('/').map(part => part.trim());
          return <Link key={doll.name} to={gf2DollPath(doll.name)} className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-white/10 bg-[#121212] p-3 transition-colors hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
            <LazyImage src={gf2Portrait(doll)} alt="" loading={index === 0 ? 'eager' : 'lazy'} containerClassName="h-32 rounded-xl bg-[#0f0f0f]" className="h-full w-full object-cover object-top" referrerPolicy="no-referrer" />
            <div className="min-w-0 space-y-2">
              <span className="text-[11px] font-bold text-orange-300">{doll.rarity}</span>
              <h3 className="text-xl font-black">{doll.name}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1"><Gf2Tag icon={gf2JobIcon(doll.job)} label={doll.job} /><Gf2Tag icon={gf2ElementIcon(doll.element)} label={doll.element} /></div>
              {doll.weakness && <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">약점 {ammo && <Gf2Tag icon={gf2StatIcon(ammo)} label={ammo} />}{weakElement && <Gf2Tag icon={gf2ElementIcon(weakElement)} label={weakElement} />}</div>}
            </div>
          </Link>;
        })}</div>
      </section>

      <section aria-labelledby="gf2-browse" className="space-y-2">
        <h2 id="gf2-browse" className="border-b border-white/5 pb-3 text-2xl font-bold">직업과 속성으로 찾기</h2>
        <div className="grid gap-x-10 md:grid-cols-2">
          <div><h3 className="mb-1 mt-4 text-lg font-bold">직업</h3><ul>{GF2_JOBS.map(job => <li key={job}><Link to={`/gallery/gf2/dolls?job=${encodeURIComponent(job)}`} className="flex min-h-12 items-center gap-3 border-b border-white/5 px-1 text-base font-semibold text-gray-300 hover:text-white"><img src={gf2JobIcon(job)} alt="" width={26} height={26} loading="lazy" referrerPolicy="no-referrer" />{job}<span className="ml-auto text-sm tabular-nums text-gray-400">{count('job', job)}명</span></Link></li>)}</ul></div>
          <div><h3 className="mb-1 mt-4 text-lg font-bold">위상 속성</h3><ul>{GF2_ELEMENTS.map(element => <li key={element}><Link to={`/gallery/gf2/dolls?element=${encodeURIComponent(element)}`} className="flex min-h-12 items-center gap-3 border-b border-white/5 px-1 text-base font-semibold text-gray-300 hover:text-white"><img src={gf2ElementIcon(element)} alt="" width={22} height={22} loading="lazy" referrerPolicy="no-referrer" />{element}<span className="ml-auto text-sm tabular-nums text-gray-400">{count('element', element)}명</span></Link></li>)}</ul></div>
        </div>
      </section>

      <section aria-labelledby="gf2-preview" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="gf2-preview" className="text-2xl font-bold">인형 도감</h2>
          <Link to="/gallery/gf2/dolls" className="inline-flex min-h-11 items-center gap-1 text-sm text-orange-300 hover:text-white">출시순 {GF2_DOLLS.length}명 전체 <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">{latest.slice(3, 11).map(doll => <Link key={doll.name} to={gf2DollPath(doll.name)} className="grid gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
          <LazyImage src={gf2Portrait(doll)} alt="" containerClassName="aspect-[3/4] rounded-xl border border-white/10 bg-[#0f0f0f]" className="h-full w-full object-cover object-top" referrerPolicy="no-referrer" />
          <span className="text-center text-xs font-bold text-gray-300">{doll.name}</span>
        </Link>)}</div>
      </section>
    </div>
  </main>
</div>;

export default HubGF2;
