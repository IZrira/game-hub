import React, { useMemo } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry, AniimoStats } from '../types';

const entries = aniimoData as AniimoEntry[];
const STAT_LABELS: Record<keyof AniimoStats, string> = {
  total: '종합 속성', hp: 'HP', break: '무력화', attack: '공격',
  magicDefense: '마법 방어', physicalDefense: '물리 방어', energyRecovery: '에너지 회복'
};

const CharacterDetailAniimo: React.FC = () => {
  const { charName = '' } = useParams<{ charName: string }>();
  const item = entries.find(entry => entry.name === decodeURIComponent(charName));
  const related = useMemo(() => item ? entries.filter(entry => entry.number !== item.number && entry.elements.some(value => item.elements.includes(value))).slice(0, 6) : [], [item]);

  if (!item) return <main className="min-h-[70vh] bg-[#0a0a0a] px-6 py-24 text-center text-white"><h1 className="text-3xl font-black">애니모를 찾을 수 없습니다.</h1><Link to="/gallery/aniimo" className="mt-6 inline-block text-violet-300">도감으로 돌아가기</Link></main>;

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${item.name} 능력치·원소·포지션 | 애니모 도감`} description={`애니모 ${item.name}(NO.${item.number})의 ${item.elements.join('/')} 원소, ${item.positions.join('/')} 포지션과 주요 능력치를 확인하세요.`} url={`/gallery/aniimo/character/${encodeURIComponent(item.name)}`} gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모 도감', url: '/gallery/aniimo' }, { name: item.name, url: `/gallery/aniimo/character/${encodeURIComponent(item.name)}` }]} />
    <PageHeader gameId="aniimo" category="캐릭터" categoryUrl="/gallery/aniimo" title={item.name} />
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <Link to="/gallery/aniimo" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white"><ArrowLeft size={16} /> 애니모 도감</Link>
      <section className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="aspect-square rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-400/5 p-8">{item.imageUrl && <img src={item.imageUrl} alt={`${item.name} 이미지`} referrerPolicy="no-referrer" className="h-full w-full object-contain" />}</div>
        <div className="rounded-[32px] border border-white/10 bg-[#121212] p-7 sm:p-10">
          <p className="text-xs font-black tracking-[0.3em] text-violet-300">NO.{item.number}</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-black tracking-tighter">{item.name}</h1>
          <div className="mt-5 flex flex-wrap gap-2">{item.elements.map(value => <Badge key={value} value={value} accent />)}{item.positions.map(value => <Badge key={value} value={value} />)}</div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">{Object.entries(item.stats).map(([key, value]) => <div key={key} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"><p className="text-[10px] font-black text-gray-500">{STAT_LABELS[key as keyof AniimoStats]}</p><p className="mt-1 text-2xl font-black">{value ?? '-'}</p></div>)}</div>
          <p className="mt-7 text-xs leading-6 text-gray-500">마지막 데이터 확인일: {item.checkedAt}</p>
          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white">공식 출처 확인 <ExternalLink size={13} /></a>
        </div>
      </section>
      {related.length > 0 && <section><h2 className="mb-5 text-2xl font-black">같은 원소 애니모</h2><div className="grid grid-cols-3 sm:grid-cols-6 gap-3">{related.map(entry => <Link key={entry.number} to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}`} className="rounded-2xl border border-white/10 bg-[#121212] p-3 text-center hover:border-violet-400/40">{entry.imageUrl && <img src={entry.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="aspect-square w-full object-contain" />}<span className="text-xs font-black">{entry.name}</span></Link>)}</div></section>}
    </main>
  </div>;
};

const Badge = ({ value, accent = false }: { value: string; accent?: boolean }) => <span className={`rounded-lg px-3 py-1.5 text-xs font-black ${accent ? 'bg-violet-400/15 text-violet-300' : 'bg-white/5 text-gray-300'}`}>{value}</span>;
export default CharacterDetailAniimo;
