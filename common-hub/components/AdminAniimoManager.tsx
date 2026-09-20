import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, FileJson, Search, Shapes, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import aniimoData from '../../aniimo-hub/data/aniimo.json';
import type { AniimoEntry } from '../../aniimo-hub/types';
import { ANIIMO_ENGLISH_NAMES, getAniimoEvolutionStage } from '../../aniimo-hub/utils/evolutionStage';
import AdminAniimoPartyManager from './AdminAniimoPartyManager';

const entries = aniimoData as AniimoEntry[];
const ALL = '전체';

const AdminAniimoManager: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(ALL);
  const [view, setView] = useState<'dex' | 'parties'>('dex');
  const forms = entries.flatMap(entry => entry.forms.map(form => ({ entry, form })));
  const locations = new Set(forms.flatMap(({ form }) => form.locations));
  const incompleteEntries = entries.filter(entry => !ANIIMO_ENGLISH_NAMES[entry.number] || !entry.imageUrl || !entry.description || entry.forms.length === 0);
  const incompleteForms = forms.filter(({ form }) => !form.imageUrl || !form.description || form.elements.length === 0 || form.positions.length === 0);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko');
    return entries.filter(entry => {
      const hasIssue = incompleteEntries.includes(entry) || entry.forms.some(form => incompleteForms.some(value => value.entry.number === entry.number && value.form.key === form.key));
      const matchesStatus = status === ALL || (status === '점검 필요' ? hasIssue : !hasIssue);
      const englishName = ANIIMO_ENGLISH_NAMES[entry.number]?.toLocaleLowerCase('en') || '';
      return matchesStatus && (!keyword || entry.name.toLocaleLowerCase('ko').includes(keyword) || englishName.includes(keyword) || entry.number.includes(keyword));
    });
  }, [query, status, incompleteEntries, incompleteForms]);

  return <div className="space-y-8">
    <nav className="flex gap-2 rounded-2xl border border-white/5 bg-[#111] p-2"><button onClick={() => setView('dex')} className={`rounded-xl px-5 py-3 text-xs font-black ${view === 'dex' ? 'bg-violet-400 text-black' : 'text-gray-400 hover:text-white'}`}>애니모 도감 관리</button><button onClick={() => setView('parties')} className={`rounded-xl px-5 py-3 text-xs font-black ${view === 'parties' ? 'bg-violet-400 text-black' : 'text-gray-400 hover:text-white'}`}>파티 추천 관리</button></nav>
    {view === 'parties' ? <AdminAniimoPartyManager /> : <>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={<Sparkles size={18} />} label="애니모" value={`${entries.length}종`} />
      <Metric icon={<Shapes size={18} />} label="형태 데이터" value={`${forms.length}개`} />
      <Metric icon={<FileJson size={18} />} label="출현 지역" value={`${locations.size}곳`} />
      <Metric icon={incompleteEntries.length || incompleteForms.length ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />} label="데이터 점검" value={incompleteEntries.length || incompleteForms.length ? `${incompleteEntries.length + incompleteForms.length}건` : '정상'} warning={Boolean(incompleteEntries.length || incompleteForms.length)} />
    </section>

    <section className="rounded-[32px] border border-white/5 bg-[#111] p-5 sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <label className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="한국어명, 영문명 또는 도감 번호 검색" className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm font-bold outline-none focus:border-violet-400/50" /></label>
        <div className="flex gap-2">{[ALL, '정상', '점검 필요'].map(value => <button key={value} onClick={() => setStatus(value)} className={`rounded-xl px-4 py-3 text-xs font-black transition ${status === value ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{value}</button>)}</div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500"><span>{filtered.length}종 표시</span><span>데이터 파일 기반 검수 · 직접 수정은 원본 JSON/수집 스크립트에서 진행</span></div>
    </section>

    <section className="overflow-hidden rounded-[32px] border border-white/5 bg-[#111]">
      <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-gray-500"><th className="p-5">도감</th><th className="p-5">성장 단계</th><th className="p-5">형태</th><th className="p-5">원소 / 포지션</th><th className="p-5">출처 확인일</th><th className="p-5 text-right">검수</th></tr></thead><tbody className="divide-y divide-white/5">{filtered.map(entry => {
        const stage = getAniimoEvolutionStage(entry, entry.forms[0]);
        const hasIssue = incompleteEntries.includes(entry) || entry.forms.some(form => incompleteForms.some(value => value.entry.number === entry.number && value.form.key === form.key));
        return <tr key={entry.number} className="hover:bg-white/[0.02]"><td className="p-5"><div className="flex items-center gap-4"><div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1">{entry.imageUrl && <img src={entry.imageUrl} alt="" className="h-full w-full object-contain" referrerPolicy="no-referrer" />}</div><div><strong>{entry.name}</strong><p className="mt-1 text-xs font-bold text-gray-500">NO.{entry.number} · {ANIIMO_ENGLISH_NAMES[entry.number] || '영문명 없음'}</p></div></div></td><td className="p-5 font-bold text-violet-300">{stage}</td><td className="p-5 font-bold text-gray-300">{entry.forms.length}개</td><td className="p-5"><p className="font-bold text-gray-300">{entry.elements.join(' · ') || '-'}</p><p className="mt-1 text-xs text-gray-500">{entry.positions.join(' · ') || '-'}</p></td><td className="p-5 text-xs font-bold text-gray-500">{entry.checkedAt}</td><td className="p-5"><div className="flex items-center justify-end gap-2"><span className={`rounded-lg px-2 py-1 text-[10px] font-black ${hasIssue ? 'bg-rose-400/10 text-rose-300' : 'bg-emerald-400/10 text-emerald-300'}`}>{hasIssue ? '점검 필요' : '정상'}</span><Link to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}`} target="_blank" className="rounded-xl bg-white/5 p-2 text-gray-400 hover:text-white" title="사이트 상세 열기"><ExternalLink size={14} /></Link><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white/5 p-2 text-violet-300 hover:text-white" title="공식 출처 열기"><ExternalLink size={14} /></a></div></td></tr>;
      })}</tbody></table></div>
      {filtered.length === 0 && <div className="p-16 text-center text-sm font-bold text-gray-500">조건에 맞는 애니모가 없습니다.</div>}
    </section>
    </>}
  </div>;
};

const Metric = ({ icon, label, value, warning = false }: { icon: React.ReactNode; label: string; value: string; warning?: boolean }) => <article className="rounded-3xl border border-white/5 bg-[#111] p-6"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${warning ? 'bg-rose-400/10 text-rose-300' : 'bg-violet-400/10 text-violet-300'}`}>{icon}</div><p className="mt-5 text-xs font-black text-gray-500">{label}</p><strong className="mt-1 block text-2xl font-black">{value}</strong></article>;

export default AdminAniimoManager;
