import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ExternalLink, Shield, Swords } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import {
  ANIIMO_ELEMENTS,
  ELEMENT_CHART,
  ELEMENT_META,
  effectivenessLabel,
  type AniimoElement,
  type ElementEffectiveness,
} from '../data/elementChart';

const cellStyle: Record<ElementEffectiveness, string> = {
  1.6: 'border-emerald-400/25 bg-emerald-400/15 text-emerald-300',
  1: 'border-white/5 bg-white/[0.03] text-gray-400',
  0.625: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
};

const TypeChartAniimo: React.FC = () => {
  const [defenders, setDefenders] = useState<AniimoElement[]>(['불']);
  const recommendations = useMemo(() => [...ANIIMO_ELEMENTS].sort((a, b) => {
    const score = (element: AniimoElement) => defenders.reduce((total, defender) => {
      const value = ELEMENT_CHART[element][defender];
      return total + (value === 1.6 ? 2 : value === 1 ? 0 : -1);
    }, 0);
    return score(b) - score(a);
  }), [defenders]);

  const toggleDefender = (element: AniimoElement) => setDefenders(current => {
    if (current.includes(element)) return current.length === 1 ? current : current.filter(value => value !== element);
    return current.length < 2 ? [...current, element] : [current[1], element];
  });

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
      <SEO title="애니모 원소 상성표·약점 계산 | 9원소 공략" description="애니모의 불, 물, 풀, 전기, 얼음, 바위, 바람, 빛, 어둠 상성과 1.6배·1배·0.625배 피해 배율을 확인하고 상대 원소별 추천 공격 원소를 찾으세요." url="/gallery/aniimo/type-chart" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모', url: '/gallery/aniimo' }, { name: '원소 상성표', url: '/gallery/aniimo/type-chart' }]} />
      <PageHeader gameId="aniimo" category="도감" categoryUrl="/gallery/aniimo" title="원소 상성표" />
      <AniimoMobileNav />

      <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]">
        <AniimoSidebar />
        <div className="min-w-0 space-y-8">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-300">Aniimo Battle Guide</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">애니모 원소 상성표</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">공격 원소가 방어 원소에 주는 피해 배율을 한눈에 확인하세요. 효과적이면 1.6배, 보통은 1배, 저항이면 0.625배입니다.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-black">
            <Legend value={1.6} /><Legend value={1} /><Legend value={0.625} />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#121212] p-5 sm:p-7">
          <div className="flex items-start gap-3"><Shield className="mt-0.5 shrink-0 text-violet-300" size={20} /><div><h2 className="font-black">상대 원소 선택</h2><p className="mt-1 text-xs leading-5 text-gray-500">최대 2개까지 선택할 수 있습니다. 복합 원소는 배율을 곱하지 않고 각 방어 원소에 대한 결과를 따로 표시합니다.</p></div></div>
          <div className="mt-5 flex flex-wrap gap-2">{ANIIMO_ELEMENTS.map(element => {
            const active = defenders.includes(element); return <button key={element} type="button" aria-pressed={active} onClick={() => toggleDefender(element)} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black transition ${active ? 'border-violet-300 bg-violet-400 text-black' : 'border-white/10 bg-white/5 text-gray-300 hover:border-violet-400/50'}`}><span>{ELEMENT_META[element].icon}</span>{element}</button>;
          })}</div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">{recommendations.map((attacker, index) => <article key={attacker} className={`rounded-2xl border p-4 ${index === 0 ? 'border-violet-400/40 bg-violet-400/10' : 'border-white/10 bg-black/20'}`}><div className="flex items-center justify-between"><span className="font-black">{ELEMENT_META[attacker].icon} {attacker}</span>{index === 0 && <span className="text-[9px] font-black text-violet-300">추천</span>}</div><div className="mt-3 flex flex-wrap gap-1.5">{defenders.map(defender => { const value = ELEMENT_CHART[attacker][defender]; return <span key={defender} className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${cellStyle[value]}`}>vs {defender} {value}배</span>; })}</div></article>)}</div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212]">
          <div className="border-b border-white/10 p-5 sm:p-7"><div className="flex items-center gap-2"><Swords size={20} className="text-violet-300" /><h2 className="font-black">전체 상성 행렬</h2></div><p className="mt-2 text-xs text-gray-500">세로는 공격 원소, 가로는 상대의 방어 원소입니다.</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[880px] border-collapse text-center text-xs"><thead><tr><th className="sticky left-0 z-10 bg-[#121212] p-3 text-left text-gray-500">공격 ↓ / 방어 →</th>{ANIIMO_ELEMENTS.map(element => <th key={element} className="p-3"><span className="block text-base">{ELEMENT_META[element].icon}</span>{element}</th>)}</tr></thead><tbody>{ANIIMO_ELEMENTS.map(attacker => <tr key={attacker} className="border-t border-white/5"><th className="sticky left-0 z-10 bg-[#121212] p-3 text-left font-black"><span className="mr-2">{ELEMENT_META[attacker].icon}</span>{attacker}</th>{ANIIMO_ELEMENTS.map(defender => { const value = ELEMENT_CHART[attacker][defender]; return <td key={defender} className="p-1.5"><span title={`${attacker} 공격 → ${defender} 방어: ${effectivenessLabel(value)} ${value}배`} className={`block rounded-lg border px-2 py-2.5 font-black ${cellStyle[value]}`}>{value}×</span></td>; })}</tr>)}</tbody></table></div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#121212] p-5 text-xs leading-6 text-gray-500 sm:p-7"><p>표기는 Rira Game Hub의 기존 도감과 맞춰 Earth를 ‘바위’로 통일했습니다. 게임 업데이트로 수치가 바뀔 수 있으므로 아래 출처도 함께 확인해 주세요.</p><div className="mt-3 flex flex-wrap gap-4"><a href="https://wiki.aniimo.com/ko" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-violet-300 hover:text-white">애니모 공식 위키 <ExternalLink size={12} /></a><a href="https://aniimotools.dev/type-chart/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-violet-300 hover:text-white">상성 수치 참고 <ExternalLink size={12} /></a><Link to="/gallery/aniimo" className="font-bold text-violet-300 hover:text-white">애니모 도감으로 돌아가기</Link></div><p className="mt-2">마지막 확인일: 2026-09-19</p></section>
        </div>
      </main>
    </div>
  );
};

const Legend = ({ value }: { value: ElementEffectiveness }) => <span className={`rounded-xl border px-3 py-2 ${cellStyle[value]}`}>{effectivenessLabel(value)} · {value}배</span>;

export default TypeChartAniimo;
