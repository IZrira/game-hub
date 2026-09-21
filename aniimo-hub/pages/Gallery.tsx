import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { BarChart3, Check, ExternalLink, Search, Swords, X } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry, AniimoForm, AniimoStats } from '../types';
import { ANIIMO_ENGLISH_NAMES, EVOLUTION_STAGES, getAniimoEvolutionStage } from '../utils/evolutionStage';
import { ELEMENT_META, getElementMatchups } from '../data/elementChart';
import { getRecommendedPersonality, PERSONALITY_PRESETS } from '../data/personality';

const entries = aniimoData as AniimoEntry[];
const ALL = '전체';
const STAT_ROWS: Array<{ key: keyof AniimoStats; label: string }> = [
  { key: 'total', label: '종합 능력치' }, { key: 'hp', label: '체력(HP)' },
  { key: 'break', label: '무력화' }, { key: 'attack', label: '공격력' },
  { key: 'magicDefense', label: '마법 방어력' }, { key: 'physicalDefense', label: '물리 방어력' },
  { key: 'energyRecovery', label: '에너지 회복' }
];
type CompareSelection = { number: string; formKey: string };
type ComparedAniimo = { id: string; item: AniimoEntry; form: AniimoForm; stats: AniimoStats };

const GalleryAniimo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [element, setElement] = useState(ALL);
  const [position, setPosition] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [stage, setStage] = useState(ALL);
  const [personality, setPersonality] = useState(ALL);
  const [selected, setSelected] = useState<CompareSelection[]>([]);

  const elements = useMemo(() => [ALL, ...new Set(entries.flatMap(item => item.elements))], []);
  const positions = useMemo(() => [ALL, ...new Set(entries.flatMap(item => item.positions))], []);
  const locations = useMemo(() => [ALL, ...new Set(entries.flatMap(item => item.forms.flatMap(form => form.locations)).sort((a, b) => a.localeCompare(b, 'ko')))], []);
  const personalities = useMemo(() => [ALL, ...new Set(PERSONALITY_PRESETS.map(preset => preset.code))], []);
  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko');
    return entries.filter(item => {
      const locationForms = location === ALL ? item.forms : item.forms.filter(form => form.locations.includes(location));
      const availableElements = location === ALL ? item.elements : locationForms.flatMap(form => form.elements);
      const availablePositions = location === ALL ? item.positions : locationForms.flatMap(form => form.positions);
      const displayForm = (location === ALL ? item.forms.find(form => form.key === 'basic-form') : locationForms[0]) || item.forms[0];
      const itemStage = getAniimoEvolutionStage(item, displayForm);
      const recommendedPersonality = displayForm ? getRecommendedPersonality(displayForm).code : '';
      const englishName = ANIIMO_ENGLISH_NAMES[item.number]?.toLocaleLowerCase('en') || '';
      return (!keyword || item.name.toLocaleLowerCase('ko').includes(keyword) || englishName.includes(keyword) || item.number.includes(keyword)) &&
        (location === ALL || locationForms.length > 0) &&
        (element === ALL || availableElements.includes(element)) &&
        (position === ALL || availablePositions.includes(position)) &&
        (stage === ALL || itemStage === stage) &&
        (personality === ALL || recommendedPersonality === personality);
    });
  }, [query, element, position, location, stage, personality]);
  const compared = selected.map(selection => {
    const item = entries.find(candidate => candidate.number === selection.number);
    const form = item?.forms.find(candidate => candidate.key === selection.formKey);
    return item && form ? { id: `${item.number}:${form.key}`, item, form, stats: form.stats } : null;
  }).filter(Boolean) as ComparedAniimo[];
  const toggleCompare = (selection: CompareSelection) => setSelected(current => {
    const isSelected = current.some(value => value.number === selection.number && value.formKey === selection.formKey);
    return isSelected
      ? current.filter(value => value.number !== selection.number || value.formKey !== selection.formKey)
      : current.length < 3 ? [...current, selection] : current;
  });

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
      <SEO title="애니모 도감·능력치 비교기 | Aniimo 아카이브" description={`애니모 공식 위키에서 확인한 ${entries.length}종의 원소, 포지션과 능력치를 검색하고 최대 3종까지 비교하세요.`} url="/gallery/aniimo/characters" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모', url: '/gallery/aniimo' }, { name: '애니모 도감', url: '/gallery/aniimo/characters' }]} />
      <PageHeader gameId="aniimo" category="허브" categoryUrl="/gallery/aniimo" title="애니모 도감" />
      <AniimoMobileNav />

      <main className="max-w-[1500px] mx-auto grid gap-8 px-4 sm:px-6 py-10 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]">
        <AniimoSidebar />
        <div className="min-w-0 space-y-10">
        <section className="relative overflow-hidden rounded-[32px] sm:rounded-[48px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-12">
          <div className="relative max-w-3xl space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-300">Rira Analysis Database</p>
            <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter">ANIIMO <span className="text-violet-300">ARCHIVE</span></h1>
            <p className="text-sm sm:text-base leading-7 text-gray-300">전체 {entries.length}종을 원소와 포지션으로 탐색하고, 최대 3종의 핵심 능력치를 한 화면에서 비교할 수 있습니다.</p>
            <div className="flex flex-wrap gap-4"><Link to="/gallery/aniimo/type-chart" className="inline-flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white"><Swords size={13} /> 원소 상성표 보기</Link><a href="https://wiki.aniimo.com/ko" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white">공식 애니모 위키에서 원본 정보 확인 <ExternalLink size={13} /></a></div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#121212] p-5 sm:p-7"><div className="flex items-center gap-2"><span className="text-violet-300">/</span><h2 className="font-black">지역별 애니모</h2></div><p className="mt-2 text-xs text-gray-500">페이지를 이동하지 않고 출현 지역에 맞는 애니모와 형태를 바로 확인하세요.</p><div className="mt-5 flex flex-wrap gap-2">{locations.map(value => <button key={value} type="button" aria-pressed={location === value} onClick={() => setLocation(value)} className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${location === value ? 'border-violet-300 bg-violet-400 text-black' : 'border-white/10 bg-white/5 text-gray-300 hover:border-violet-400/40 hover:text-violet-300'}`}>{value}</button>)}</div></section>

        <section className="rounded-3xl border border-white/10 bg-[#121212] p-5 sm:p-7 space-y-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <label className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="이름 또는 도감 번호 검색" className="w-full h-12 rounded-xl border border-white/10 bg-black/30 pl-11 pr-4 text-sm outline-none focus:border-violet-400/60" /></label>
            <Filter value={element} setValue={setElement} options={elements} label="원소" />
            <Filter value={position} setValue={setPosition} options={positions} label="포지션" />
            <Filter value={stage} setValue={setStage} options={[ALL, ...EVOLUTION_STAGES, '특수 개체']} label="성장 단계" />
            <Filter value={personality} setValue={setPersonality} options={personalities} label="추천 성격" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
            <span>{filtered.length}종 표시</span>
            <div className="flex items-center gap-3">
              <span>비교 선택 <strong className="text-violet-300">{selected.length}</strong>/3</span>
              {selected.length === 0 && <span className="hidden sm:inline text-[11px] text-gray-500">아래 카드의 [비교하기]를 눌러 스탯을 비교하세요</span>}
            </div>
          </div>
        </section>

        {compared.length > 0 && <section className="overflow-hidden rounded-3xl border border-violet-400/20 bg-violet-400/[0.04]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-violet-300" />
              <h2 className="font-black text-sm sm:text-base">능력치 실시간 비교</h2>
              <span className="rounded-full bg-violet-400/20 px-2.5 py-0.5 text-[10px] font-black text-violet-300">{compared.length}/3</span>
            </div>
            <button onClick={() => setSelected([])} className="text-xs font-bold text-gray-400 hover:text-white transition">전체 해제</button>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-gray-500 w-28">항목</th>
                {compared.map(({ id, item, form }) => (
                  <th key={id} className="p-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-black text-white">{item.name}</span>
                      <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-[10px] font-bold text-violet-300">{form.label}</span>
                      <button
                        onClick={() => toggleCompare({ number: item.number, formKey: form.key })}
                        className="mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold text-gray-400 hover:bg-rose-500/20 hover:text-rose-300 transition"
                        title="비교에서 제거"
                      >
                        <X size={12} /> 제거
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/5"><th className="p-4 text-left font-bold text-gray-400">원소</th>{compared.map(({ id, form }) => <td key={id} className="p-4 text-center font-bold text-violet-300">{form.elements.join(' · ') || '-'}</td>)}</tr>
              <tr className="border-t border-white/5"><th className="p-4 text-left font-bold text-gray-400">포지션</th>{compared.map(({ id, form }) => <td key={id} className="p-4 text-center font-bold text-gray-300">{form.positions.join(' · ') || '-'}</td>)}</tr>
              <tr className="border-t border-white/5"><th className="p-4 text-left font-bold text-gray-400">추천 성격</th>{compared.map(({ id, form }) => <td key={id} className="p-4 text-center font-black tracking-widest text-violet-300">{getRecommendedPersonality(form).code}</td>)}</tr>
              <tr className="border-t border-white/5"><th className="p-4 text-left font-bold text-gray-400">공격 우위</th>{compared.map(({ id, form }) => <td key={id} className="p-4 text-center text-xs font-bold text-emerald-300">{formatMatchupElements(form.elements, 'strongAgainst')}</td>)}</tr>
              <tr className="border-t border-white/5"><th className="p-4 text-left font-bold text-gray-400">받는 약점</th>{compared.map(({ id, form }) => <td key={id} className="p-4 text-center text-xs font-bold text-rose-300">{formatMatchupElements(form.elements, 'weakTo')}</td>)}</tr>
              {STAT_ROWS.map(row => {
                const values = compared.map(({ stats }) => stats[row.key]);
                const validValues = values.filter((v): v is number => v !== null && v !== undefined);
                const best = validValues.length > 0 ? Math.max(...validValues) : -1;
                return (
                  <tr key={row.key} className="border-t border-white/5">
                    <th className="p-4 text-left font-bold text-gray-400">{row.label}</th>
                    {compared.map(({ id, stats }) => {
                      const val = stats[row.key];
                      const isBest = val !== null && val !== undefined && val === best && validValues.length > 1;
                      const diff = (val !== null && val !== undefined && best > -1 && compared.length > 1) ? val - best : null;
                      return (
                        <td key={id} className={`p-4 text-center font-black ${isBest ? 'text-violet-300' : 'text-white'}`}>
                          <div>{val ?? '-'}</div>
                          {diff !== null && (
                            <span className={`text-[10px] font-bold ${diff === 0 ? 'text-violet-400/80' : 'text-gray-500'}`}>
                              {diff === 0 ? '최고값' : `${diff}`}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>}

        <section aria-label="애니모 전체 도감" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {filtered.map(item => { const displayForm = (location === ALL ? item.forms.find(form => form.key === 'basic-form') : item.forms.find(form => form.locations.includes(location))) || item.forms[0]; const detailQuery = displayForm && displayForm.key !== 'basic-form' ? `?form=${encodeURIComponent(displayForm.key)}` : ''; const displayImage = displayForm?.imageUrl || item.imageUrl; const displayElements = displayForm?.elements.length ? displayForm.elements : item.elements; const displayPositions = displayForm?.positions.length ? displayForm.positions : item.positions; const isSelected = selected.some(value => value.number === item.number && value.formKey === displayForm.key); const compareFull = selected.length >= 3 && !isSelected; return <article key={item.number} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] hover:border-violet-400/40 transition-colors">
            <Link to={`/gallery/aniimo/character/${encodeURIComponent(item.name)}${detailQuery}`} className="block aspect-square bg-gradient-to-br from-white/[0.06] to-violet-500/[0.06] p-3">{displayImage && <img src={displayImage} alt={`${item.name}${displayForm ? ` ${displayForm.label}` : ''} 이미지`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />}</Link>
            <div className="p-3 space-y-3"><div><p className="text-[9px] font-black tracking-widest text-gray-500">NO.{item.number} · {getAniimoEvolutionStage(item, displayForm)}</p><h2 className="truncate font-black">{item.name}</h2><p className="truncate text-[10px] font-bold text-gray-600">{ANIIMO_ENGLISH_NAMES[item.number]}</p>{location !== ALL && <p className="mt-1 text-[10px] font-bold text-violet-300">{displayForm.label}</p>}</div><div className="flex min-h-10 flex-wrap content-start gap-1">{displayElements.map(value => <Badge key={value} value={value} accent />)}{displayPositions.map(value => <Badge key={value} value={value} />)}<Badge value={`추천 ${getRecommendedPersonality(displayForm).code}`} accent /></div><button disabled={compareFull} onClick={() => toggleCompare({ number: item.number, formKey: displayForm.key })} className={`flex h-9 w-full items-center justify-center gap-1.5 rounded-xl text-[11px] font-black transition-colors ${isSelected ? 'bg-violet-400 text-black' : compareFull ? 'cursor-not-allowed bg-white/5 text-gray-600' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>{isSelected ? <Check size={13} /> : <BarChart3 size={13} />} {isSelected ? '비교 선택됨' : '비교하기'}</button></div>
          </article>; })}
        </section>

        {filtered.length === 0 && <div className="rounded-3xl border border-white/10 py-20 text-center text-gray-500"><X className="mx-auto mb-3" />조건에 맞는 애니모가 없습니다.</div>}
        <p className="text-center text-xs leading-6 text-gray-500">데이터 출처: 애니모 공식 위키 · 마지막 확인일 {entries[0]?.checkedAt} · 공식 업데이트에 따라 수치가 변경될 수 있습니다.</p>
        </div>
      </main>
    </div>
  );
};

const Filter = ({ value, setValue, options, label }: { value: string; setValue: (value: string) => void; options: string[]; label: string }) => <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4"><span className="text-[10px] font-black text-gray-500">{label}</span><select value={value} onChange={event => setValue(event.target.value)} className="h-12 min-w-28 bg-transparent text-sm font-bold outline-none">{options.map(option => <option key={option} value={option} className="bg-[#121212]">{option}</option>)}</select></label>;
const Badge = ({ value, accent = false }: { value: string; accent?: boolean }) => <span className={`rounded-md px-2 py-1 text-[9px] font-black ${accent ? 'bg-violet-400/15 text-violet-300' : 'bg-white/5 text-gray-400'}`}>{value}</span>;
const formatMatchupElements = (elements: string[], key: 'strongAgainst' | 'weakTo') => {
  const values = [...new Set(getElementMatchups(elements).flatMap(matchup => matchup[key]))];
  return values.length ? values.map(value => `${ELEMENT_META[value].icon} ${value}`).join(' · ') : '-';
};

export default GalleryAniimo;
