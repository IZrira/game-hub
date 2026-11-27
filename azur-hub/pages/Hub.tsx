import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import HubIntro from '../../common-hub/components/HubIntro';
import { AzurShell, AzurTag } from '../components/AzurNavigation';
import { AZUR_CHARACTERS, AZUR_ELEMENTS, AZUR_JOBS, AZUR_KIBO, azurCharacterPath, azurElementIcon, azurJobIcon, azurKiboImage, azurPortrait, isFilled, JOB_DESCRIPTIONS } from '../utils/azurData';

const filled = AZUR_CHARACTERS.filter(isFilled);

const HubAzur: React.FC = () => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
  <SEO title="아주르 프로밀리아 허브" url="/gallery/azur" noindex />
  <PageHeader gameId="azur" title="아주르 프로밀리아 허브" />
  <AzurShell>
    <HubIntro title="아주르 프로밀리아" description="캐릭터의 스킬과 전투 포지션, 키보 도감, 원소 상성과 실서 인장을 정리한 도감입니다. 정식 서비스 자료로 계속 보완합니다." searchPath="/gallery/azur/characters" searchLabel="캐릭터 이름으로 검색"
      stats={[{ label: '캐릭터', value: AZUR_CHARACTERS.length }, { label: '정리 완료', value: filled.length }, { label: '키보', value: AZUR_KIBO.length }, { label: '원소', value: AZUR_ELEMENTS.length }]}
      links={[{ label: '캐릭터 도감', to: '/gallery/azur/characters' }, { label: '키보 도감', to: '/gallery/azur/kibo' }, { label: '원소 상성', to: '/gallery/azur/elements' }]} />

    <section aria-labelledby="azur-filled" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="azur-filled" className="text-2xl font-black">정리된 캐릭터</h2>
        <Link to="/gallery/azur/characters" className="inline-flex min-h-11 items-center gap-1 text-sm text-sky-300 hover:text-white">전체 {AZUR_CHARACTERS.length}명 <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filled.map(character => <Link key={character.name} to={azurCharacterPath(character.name)} className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-5 rounded-3xl border border-white/10 bg-[#121212] p-4 transition-colors hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
        <img src={azurPortrait(character.name)} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-40 w-full rounded-2xl bg-[#0f0f0f] object-cover object-top" />
        <div className="min-w-0 space-y-2">
          <span className="text-sm font-bold text-sky-300">{character.rarity}</span>
          <h3 className="text-2xl font-black">{character.name}</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1"><AzurTag icon={azurJobIcon(character.job)} label={character.job} />{character.elements.map(element => <AzurTag key={element} icon={azurElementIcon(element)} label={element} />)}</div>
        </div>
      </Link>)}</div>
    </section>

    <section aria-labelledby="azur-jobs" className="space-y-4">
      <h2 id="azur-jobs" className="text-2xl font-black">전략 직업</h2>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{AZUR_JOBS.map(job => <li key={job} className="rounded-2xl border border-white/10 bg-[#121212] p-4">
        <p className="flex items-center gap-2 text-lg font-black"><img src={azurJobIcon(job)} alt="" width={26} height={26} referrerPolicy="no-referrer" />{job}</p>
        <p className="mt-2 text-base leading-relaxed text-gray-300">{JOB_DESCRIPTIONS[job]}</p>
      </li>)}</ul>
    </section>

    <section aria-labelledby="azur-kibo" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="azur-kibo" className="text-2xl font-black">키보 도감</h2>
        <Link to="/gallery/azur/kibo" className="inline-flex min-h-11 items-center gap-1 text-sm text-sky-300 hover:text-white">전체 {AZUR_KIBO.length}종 <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 xl:grid-cols-8">{AZUR_KIBO.slice(0, 8).map(kibo => <Link key={kibo.no} to="/gallery/azur/kibo" className="grid gap-1 rounded-xl border border-white/5 bg-[#121212] p-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
        <img src={azurKiboImage(kibo.variants[0].file)} alt="" loading="lazy" referrerPolicy="no-referrer" className="aspect-square w-full object-contain" />
        <span className="truncate text-xs font-bold text-gray-300">{kibo.name}</span>
      </Link>)}</div>
    </section>

    <section aria-labelledby="azur-elements" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="azur-elements" className="text-2xl font-black">원소 10종</h2>
        <Link to="/gallery/azur/elements" className="inline-flex min-h-11 items-center gap-1 text-sm text-sky-300 hover:text-white">상성과 실서 인장 <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <div className="flex flex-wrap gap-3">{AZUR_ELEMENTS.map(element => <span key={element} className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-4"><AzurTag icon={azurElementIcon(element)} label={element} /></span>)}</div>
    </section>
  </AzurShell>
</div>;

export default HubAzur;
