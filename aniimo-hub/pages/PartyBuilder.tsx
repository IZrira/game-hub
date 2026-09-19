import React, { useMemo, useState } from 'react';
import { Check, Clipboard, ExternalLink, RefreshCw, ShieldCheck, Sparkles, Swords, Users, Zap } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import { ANIIMO_ELEMENTS, ELEMENT_CHART, ELEMENT_META, type AniimoElement } from '../data/elementChart';
import { getRecommendedPersonality } from '../data/personality';
import type { AniimoEntry, AniimoForm } from '../types';

const entries = aniimoData as AniimoEntry[];
type FormOption = { id: string; item: AniimoEntry; form: AniimoForm };
const options: FormOption[] = entries.flatMap(item => item.forms.map(form => ({ id: `${item.number}:${form.key}`, item, form })));
const roleRules = [
  { key: 'attacker', label: '어태커', description: '딜 포지션', match: (form: AniimoForm) => form.positions.includes('딜') },
  { key: 'breaker', label: '격파', description: '격파 포지션', match: (form: AniimoForm) => form.positions.includes('격파') },
  { key: 'sustain', label: '지원·생존', description: '서포터 또는 치유', match: (form: AniimoForm) => form.positions.some(value => value === '서포터' || value === '치유') },
  { key: 'energy', label: '에너지', description: '에너지 재생', match: (form: AniimoForm) => form.positions.includes('에너지 재생') },
] as const;

const PartyBuilderAniimo: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const target = ANIIMO_ELEMENTS.includes(searchParams.get('target') as AniimoElement) ? searchParams.get('target') as AniimoElement : '불';
  const selectedIds = [...new Set((searchParams.get('team') || '').split(',').filter(id => options.some(option => option.id === id)))].slice(0, 4);
  const selected = selectedIds.map(id => options.find(option => option.id === id)!).filter(Boolean);
  const setParty = (ids: string[], nextTarget = target) => {
    const params = new URLSearchParams(searchParams);
    ids.length ? params.set('team', ids.join(',')) : params.delete('team');
    params.set('target', nextTarget);
    setSearchParams(params, { replace: true });
  };
  const setSlot = (index: number, id: string) => {
    const next = [...selectedIds];
    if (id) next[index] = id;
    else next.splice(index, 1);
    setParty(next.filter(Boolean));
  };
  const coverage = roleRules.map(rule => ({ ...rule, covered: selected.some(({ form }) => rule.match(form)) }));
  const advantageousAttackers = selected.filter(({ form }) => form.positions.includes('딜') && form.elements.some(element => ELEMENT_CHART[element as AniimoElement]?.[target] === 1.6));
  const resistedAttackers = selected.filter(({ form }) => form.positions.includes('딜') && form.elements.some(element => ELEMENT_CHART[element as AniimoElement]?.[target] === 0.625));
  const score = coverage.filter(rule => rule.covered).length * 20 + selected.length * 5 + (advantageousAttackers.length ? 15 : 0) - (resistedAttackers.length ? 10 : 0);
  const grade = score >= 95 ? '균형 완성' : score >= 70 ? '보완 권장' : '구성 중';
  const autoComplete = () => {
    const next = [...selected];
    const usedNumbers = new Set(next.map(({ item }) => item.number));
    for (const rule of roleRules) {
      if (next.some(({ form }) => rule.match(form)) || next.length >= 4) continue;
      const candidates = options.filter(option => !usedNumbers.has(option.item.number) && rule.match(option.form));
      candidates.sort((a, b) => candidateScore(b, rule.key, target) - candidateScore(a, rule.key, target));
      if (candidates[0]) { next.push(candidates[0]); usedNumbers.add(candidates[0].item.number); }
    }
    const remaining = options.filter(option => !usedNumbers.has(option.item.number)).sort((a, b) => (b.form.stats.total || 0) - (a.form.stats.total || 0));
    while (next.length < 4 && remaining.length) {
      const candidate = remaining.shift()!;
      if (usedNumbers.has(candidate.item.number)) continue;
      next.push(candidate);
      usedNumbers.add(candidate.item.number);
    }
    setParty(next.slice(0, 4).map(option => option.id));
  };
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const suggestions = useMemo(() => coverage.filter(rule => !rule.covered).map(rule => {
    const candidate = options.filter(option => !selected.some(value => value.item.number === option.item.number) && rule.match(option.form)).sort((a, b) => candidateScore(b, rule.key, target) - candidateScore(a, rule.key, target))[0];
    return { rule, candidate };
  }), [selectedIds.join(','), target]);

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title="애니모 파티 조합 도우미 | 역할·원소 상성 분석" description="애니모 4마리를 선택해 어태커, 격파, 지원·생존, 에너지 역할과 적 원소 약점 1.6배 대응을 점검하고 부족한 자리를 추천받으세요." url="/gallery/aniimo/party-builder" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모', url: '/gallery/aniimo' }, { name: '파티 조합', url: '/gallery/aniimo/party-builder' }]} />
    <PageHeader gameId="aniimo" category="공략" categoryUrl="/gallery/aniimo" title="파티 조합 도우미" />
    <AniimoMobileNav />
    <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]"><AniimoSidebar /><div className="min-w-0 space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10"><div className="flex items-center gap-2 text-violet-300"><Users size={19} /><span className="text-[10px] font-black uppercase tracking-[0.25em]">Four Aniimo Party</span></div><h1 className="mt-4 text-3xl font-black sm:text-5xl">파티 조합 도우미</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">4마리의 형태를 선택하면 역할 균형과 적 원소 상성을 동시에 분석합니다. 한 애니모의 여러 형태는 능력과 역할이 다르므로 형태까지 맞춰 선택하세요.</p></section>

      <section className="rounded-3xl border border-white/10 bg-[#121212] p-5 sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><label><span className="mb-2 block text-xs font-black text-gray-400">상대 원소</span><select value={target} onChange={event => setParty(selectedIds, event.target.value as AniimoElement)} className="h-11 rounded-xl border border-white/10 bg-[#0a0a0a] px-4 text-sm font-black outline-none">{ANIIMO_ELEMENTS.map(element => <option key={element} value={element}>{ELEMENT_META[element].icon} {element}</option>)}</select></label><div className="flex flex-wrap gap-2"><button type="button" onClick={autoComplete} className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-400 px-4 text-xs font-black text-black"><RefreshCw size={14} /> 빈 자리 자동 완성</button><button type="button" onClick={copyLink} className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-black text-gray-300">{copied ? <Check size={14} /> : <Clipboard size={14} />}{copied ? '복사 완료' : '조합 링크 복사'}</button></div></div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <label key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="mb-2 block text-[10px] font-black text-violet-300">SLOT {index + 1}</span><select value={selectedIds[index] || ''} onChange={event => setSlot(index, event.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-[#121212] px-3 text-xs font-bold outline-none"><option value="">애니모 선택</option>{entries.map(item => <optgroup key={item.number} label={`NO.${item.number} ${item.name}`}>{item.forms.map(form => { const id = `${item.number}:${form.key}`; const duplicate = selected.some((value, selectedIndex) => selectedIndex !== index && value.item.number === item.number); return <option key={id} value={id} disabled={duplicate}>{form.label} · {form.elements.join('/')} · {form.positions.join('/')}</option>; })}</optgroup>)}</select></label>)}</div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[280px_1fr]"><article className="rounded-3xl border border-violet-400/20 bg-violet-400/[0.06] p-6"><p className="text-xs font-black text-violet-300">조합 평가</p><strong className="mt-3 block text-3xl font-black">{grade}</strong><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${Math.min(100, score)}%` }} /></div><p className="mt-3 text-xs leading-5 text-gray-400">역할 충족 {coverage.filter(rule => rule.covered).length}/4 · 편성 {selected.length}/4{advantageousAttackers.length > 0 ? ` · ${target} 약점 어태커 확보` : ''}</p></article><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{coverage.map(rule => <article key={rule.key} className={`rounded-2xl border p-4 ${rule.covered ? 'border-emerald-400/20 bg-emerald-400/[0.06]' : 'border-amber-400/20 bg-amber-400/[0.05]'}`}><div className="flex items-center gap-2">{rule.covered ? <Check size={15} className="text-emerald-300" /> : <ShieldCheck size={15} className="text-amber-300" />}<strong className="text-sm">{rule.label}</strong></div><p className="mt-2 text-[10px] leading-4 text-gray-500">{rule.covered ? '역할 확보' : rule.description}</p></article>)}</div></section>

      {selected.length > 0 && <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{selected.map(({ id, item, form }) => { const effectiveness = Math.max(...form.elements.map(element => ELEMENT_CHART[element as AniimoElement]?.[target] || 1)); return <article key={id} className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"><div className="aspect-square bg-gradient-to-br from-white/[0.06] to-violet-500/[0.08] p-5">{(form.imageUrl || item.imageUrl) && <img src={form.imageUrl || item.imageUrl || ''} alt="" referrerPolicy="no-referrer" className="h-full w-full object-contain" />}</div><div className="space-y-3 p-5"><div><p className="text-[10px] font-black text-violet-300">NO.{item.number} · {form.label}</p><h2 className="mt-1 text-xl font-black">{item.name}</h2></div><div className="flex flex-wrap gap-1">{form.elements.map(element => <Tag key={element}>{ELEMENT_META[element as AniimoElement]?.icon} {element}</Tag>)}{form.positions.map(position => <Tag key={position}>{position}</Tag>)}</div><div className="flex items-center justify-between text-xs"><span className={effectiveness === 1.6 ? 'font-black text-emerald-300' : effectiveness === 0.625 ? 'font-black text-rose-300' : 'text-gray-400'}>{target} 상대 {effectiveness}배</span><span className="font-black text-violet-300">{getRecommendedPersonality(form).code}</span></div><Link to={`/gallery/aniimo/character/${encodeURIComponent(item.name)}${form.key === 'basic-form' ? '' : `?form=${encodeURIComponent(form.key)}`}`} className="inline-flex text-xs font-black text-gray-400 hover:text-white">상세 정보 보기</Link></div></article>; })}</section>}

      {(suggestions.length > 0 || selected.length === 4) && <section className="rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8"><h2 className="flex items-center gap-2 text-lg font-black"><Sparkles size={18} className="text-violet-300" /> 조합 분석</h2><div className="mt-5 space-y-3">{advantageousAttackers.length === 0 && <Analysis tone="warn">{target} 원소에 1.6배 약점을 찌르는 딜 포지션을 우선 배치하세요.</Analysis>}{resistedAttackers.length > 0 && <Analysis tone="danger">현재 어태커 중 {target} 원소에 0.625배로 저항받는 형태가 있습니다.</Analysis>}{suggestions.map(({ rule, candidate }) => candidate && <button key={rule.key} type="button" onClick={() => selected.length < 4 && setParty([...selectedIds, candidate.id])} disabled={selected.length >= 4} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-left disabled:opacity-50"><span><strong className="text-sm text-amber-300">{rule.label} 보완</strong><span className="ml-3 text-xs text-gray-400">{candidate.item.name} · {candidate.form.label}</span></span><span className="text-xs font-black text-violet-300">추가</span></button>)}{coverage.every(rule => rule.covered) && advantageousAttackers.length > 0 && <Analysis tone="good">핵심 역할과 상대 약점 어태커를 모두 확보했습니다. 실제 스킬 시너지와 에너지 소모량을 마지막으로 확인하세요.</Analysis>}</div></section>}

      <section className="rounded-3xl border border-white/10 bg-[#121212] p-6 text-xs leading-6 text-gray-500"><div className="flex gap-3"><Zap size={17} className="mt-1 shrink-0 text-violet-300" /><p>파티는 어태커 1마리를 중심으로 격파·지원/생존·에너지를 채우는 4마리 기준입니다. 자동 추천은 도감의 포지션·능력치·원소 상성을 이용한 범용 분석이며, 개별 스킬의 전용 시너지와 실제 운용을 완전히 대체하지 않습니다.</p></div><a href="https://gamewith.ai/aniimo/ko/articles/best-team-comps" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 font-black text-violet-300 hover:text-white">파티 편성 참고 자료 <ExternalLink size={12} /></a></section>
    </div></main>
  </div>;
};

const candidateScore = (option: FormOption, role: typeof roleRules[number]['key'], target: AniimoElement) => {
  const advantage = option.form.elements.some(element => ELEMENT_CHART[element as AniimoElement]?.[target] === 1.6) ? 100 : 0;
  const stat = role === 'attacker' ? option.form.stats.attack : role === 'breaker' ? option.form.stats.break : role === 'energy' ? option.form.stats.energyRecovery : option.form.stats.hp;
  return advantage + (stat || 0);
};
const Tag = ({ children }: { children: React.ReactNode }) => <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] font-black text-gray-400">{children}</span>;
const Analysis = ({ children, tone }: { children: React.ReactNode; tone: 'good' | 'warn' | 'danger' }) => <p className={`rounded-2xl border p-4 text-xs leading-5 ${tone === 'good' ? 'border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-200' : tone === 'danger' ? 'border-rose-400/20 bg-rose-400/[0.05] text-rose-200' : 'border-amber-400/20 bg-amber-400/[0.05] text-amber-200'}`}>{children}</p>;

export default PartyBuilderAniimo;
