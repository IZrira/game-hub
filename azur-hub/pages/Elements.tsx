import React from 'react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AzurShell, AzurTag } from '../components/AzurNavigation';
import { AZUR_ELEMENTS, ELEMENT_MATCHUPS, ELEMENT_SEALS, azurElementIcon, azurGuideImage } from '../utils/azurData';

const SEVEN = ['불', '얼음', '나무', '바람', '땅', '번개', '물'];
const defenders = (element: string) => ({
  strong: Object.entries(ELEMENT_MATCHUPS).filter(([, m]) => m.strong.includes(element)).map(([attacker]) => attacker),
  weak: Object.entries(ELEMENT_MATCHUPS).filter(([, m]) => m.weak.includes(element)).map(([attacker]) => attacker),
});

const Names: React.FC<{ list: string[] }> = ({ list }) => list.length ? <span className="inline-flex flex-wrap gap-x-3 gap-y-1">{list.map(name => <AzurTag key={name} icon={azurElementIcon(name)} label={name} />)}</span> : <span className="text-sm text-gray-400">없음</span>;

const ElementsAzur: React.FC = () => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
  <SEO title="아주르 프로밀리아 원소 상성" url="/gallery/azur/elements" noindex />
  <PageHeader gameId="azur" category="허브" categoryUrl="/gallery/azur" title="원소 상성" />
  <AzurShell>
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black">원소 상성과 실서 인장</h1>
        <p className="mt-2 max-w-[66ch] text-base leading-relaxed text-gray-300">유리한 원소로 공격하면 피해가 25% 늘고, 불리한 원소로 공격하면 25% 줄어듭니다. 7원소는 저마다 유리한 상대 2개와 불리한 상대 2개를 가지며, 빛과 어둠은 서로에게만 유리합니다. 무원소는 상성에서 빠집니다.</p>
        <img src={azurGuideImage('속성 소개')} alt="원소 소개" loading="lazy" referrerPolicy="no-referrer" className="mt-6 w-full max-w-3xl rounded-2xl border border-white/10" />
      </div>

      <section aria-labelledby="matchup-attack" className="space-y-4">
        <h2 id="matchup-attack" className="text-2xl font-black">공격하는 원소 기준</h2>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{AZUR_ELEMENTS.filter(element => element !== '무').map(element => <li key={element} className="rounded-2xl border border-white/10 bg-[#121212] p-4">
          <p className="text-lg font-black"><AzurTag strong icon={azurElementIcon(element)} label={element} /></p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex gap-3"><dt className="w-10 shrink-0 font-bold text-sky-300">유리</dt><dd><Names list={ELEMENT_MATCHUPS[element].strong} /></dd></div>
            <div className="flex gap-3"><dt className="w-10 shrink-0 font-bold text-rose-300">불리</dt><dd><Names list={ELEMENT_MATCHUPS[element].weak} /></dd></div>
          </dl>
        </li>)}</ul>
      </section>

      <section aria-labelledby="matchup-defend" className="space-y-4">
        <h2 id="matchup-defend" className="text-2xl font-black">적 원소로 찾는 공격 원소</h2>
        <ul className="grid gap-3 md:grid-cols-2">{SEVEN.map(element => { const d = defenders(element); return <li key={element} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-[#121212] px-4 py-3 text-sm">
          <span className="w-20 font-black"><AzurTag icon={azurElementIcon(element)} label={`${element} 적`} /></span>
          <span className="font-bold text-sky-300">유리</span><Names list={d.strong} />
          <span className="font-bold text-rose-300">불리</span><Names list={d.weak} />
        </li>; })}</ul>
        <p className="text-base leading-relaxed text-gray-300">원소가 여럿인 적은 상성을 종합해서 계산합니다. 세부 계산식은 아직 확인되지 않았습니다.</p>
      </section>

      <section aria-labelledby="seals" className="space-y-4">
        <h2 id="seals" className="text-2xl font-black">실서 인장과 실서 초과</h2>
        <p className="max-w-[66ch] text-base leading-relaxed text-gray-300">일부 캐릭터와 키보는 피해를 줄 때 그 원소의 실서 인장을 적에게 붙입니다. 같은 원소 인장이 3개 쌓이면 실서 초과가 발동합니다. 쌓인 인장을 소모해 피해를 키우는 실서 폭발도 있습니다.</p>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{ELEMENT_SEALS.map(seal => <li key={seal.element} className="rounded-2xl border border-white/10 bg-[#121212] p-4">
          <p className="text-lg font-black"><AzurTag strong icon={azurElementIcon(seal.element)} label={seal.element} /></p>
          <p className="mt-3 text-sm font-bold text-sky-300">인장 · {seal.seal}</p>
          <p className="mt-1 text-base leading-relaxed text-gray-200">{seal.sealText}</p>
          <p className="mt-3 text-sm font-bold text-amber-300">초과 · {seal.overload}</p>
          <p className="mt-1 text-base leading-relaxed text-gray-200">{seal.overloadText}</p>
        </li>)}</ul>
      </section>
    </div>
  </AzurShell>
</div>;

export default ElementsAzur;
