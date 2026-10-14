import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowRight, ChevronLeft, Crown, Layers, Sparkles, Target, TrendingUp, Zap } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import TableOfContents from '../../common-hub/components/TableOfContents';
import { getPublishedGuides } from '../../common-hub/data/guideArticles';
import { CDN_URL, safeEncodeURIComponent, handleImageFallback } from '../../common-hub/utils/assetManager';
import { NTE_CHARACTER_DATA } from '../data/characterData';
import { NTE_CARTRIDGES, getNTECartridgeImageUrl } from '../data/cartridges';
import { parseNteCharacterGuide } from '../data/parseCharacterGuide';
import { getNteGuideArcImageUrl } from '../data/guideAssets';
import arcs from '../data/generated/arcs.json';

const COLORS: Record<string, string> = { '빛': '#f1f5f9', '주': '#fb7185', '암': '#c4b5fd', '령': '#6ee7b7', '혼': '#60a5fa', '상': '#fbbf24' };
const characterImage = (character: any) => `${CDN_URL}/nte%20images/skills/${safeEncodeURIComponent(character.folderName || character.name)}/${safeEncodeURIComponent(`${character.fileName || character.name}${character.isTrailblazer ? '_f' : ''}`)}.webp`;

function SectionHeader({ number, title, color }: { number: string; title: string; color: string }) {
  return <div className="flex items-center gap-4 sm:gap-6 px-1 sm:px-4">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[22px] border-2 text-lg font-black shadow-lg" style={{ color, borderColor: `${color}60`, backgroundColor: `${color}20` }}>{number}</span>
    <h2 className="border-l-4 border-white/10 py-1.5 pl-4 sm:pl-6 text-xl sm:text-2xl font-black italic tracking-tight">{title}</h2>
  </div>;
}

function OptionalLink({ to, children, className }: { to?: string; children: React.ReactNode; className: string }) {
  return to ? <Link to={to} className={className}>{children}</Link> : <div className={className}>{children}</div>;
}

export default function CharacterGuideDetail() {
  const { slug, charName } = useParams<{ slug: string; charName: string }>();
  const article = getPublishedGuides('nte').find(item => item.notionPageId && (slug ? item.slug === slug : item.characterId === charName || item.title === `${charName} 세팅 공략`));
  const character = NTE_CHARACTER_DATA.find(item => item.id === article?.characterId);
  const [selectedConsole, setSelectedConsole] = useState(0);
  const asideRef = useRef<HTMLElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // The shared layout clips horizontal overflow, so CSS sticky attaches to it
    // instead of the window. Anchor only this guide's TOC to its reserved column.
    let frame = 0;
    const update = () => {
      const column = asideRef.current;
      const panel = tocRef.current;
      if (!column || !panel) return;
      if (window.innerWidth < 1024) { panel.style.position = ''; return; }
      const bounds = column.getBoundingClientRect();
      panel.style.position = 'fixed';
      panel.style.left = `${bounds.left}px`;
      panel.style.top = `${Math.min(Math.max(96, bounds.top), bounds.bottom - panel.offsetHeight)}px`;
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [article?.slug, selectedConsole]);
  if (!article || !character) return <div className="min-h-[70vh] p-20 text-center text-white"><SEO title="공략을 찾을 수 없음" noindex /><h1 className="text-2xl font-black">캐릭터 공략을 찾을 수 없습니다</h1><Link to="/gallery/nte?menu=공략" className="mt-6 inline-block text-violet-300">공략 목록으로 돌아가기</Link></div>;

  const guide = parseNteCharacterGuide(article.content);
  const color = COLORS[character.attribute] || '#c4b5fd';
  const heroImage = characterImage(character);
  const currentConsole = guide.consoles[selectedConsole] || guide.consoles[0];
  const cartridge = NTE_CARTRIDGES.find(item => item.name === currentConsole?.name);
  const characterUrl = `/gallery/nte/character/${encodeURIComponent(character.name)}`;
  const url = `/gallery/nte/guides/${encodeURIComponent(article.slug)}`;

  return <div className="min-h-screen bg-[#0a0a0a] pb-24 font-sans text-white">
    <SEO title={`이환 ${character.name} 공략 | 아크 · 콘솔 세팅 · 육성 우선순위`} description={article.excerpt} image={heroImage} url={url} gameCategory="이환 (NTE)" itemType="세팅 가이드" type="article" publishedTime={article.publishedAt} modifiedTime={article.reviewedAt} breadcrumbData={[{ name: '홈', url: '/' }, { name: '이환', url: '/gallery/nte' }, { name: character.name, url: characterUrl }, { name: '세팅 가이드', url }]} />
    <PageHeader gameId="nte" title={`${character.name} 가이드`} category="공략" categoryUrl="/gallery/nte?menu=공략" />
    <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 pt-8 sm:gap-12 sm:px-6 md:px-12 lg:flex-row">
      <main key={article.slug} className="guide-content min-w-0 flex-1 space-y-12 sm:space-y-16">
        <Link to={characterUrl} className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs sm:text-sm font-black text-gray-300 transition hover:bg-white/[0.08] hover:text-white"><ChevronLeft size={16} className="transition group-hover:-translate-x-1" />캐릭터 상세 정보로 돌아가기</Link>

        <section className="relative overflow-hidden rounded-[28px] border border-white/5 bg-[#0c0c0c] p-6 sm:rounded-[44px] sm:p-10 md:rounded-[60px] md:p-14">
          <div className="absolute inset-0 bg-cover bg-center opacity-15 blur-xl" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="relative flex flex-col items-center gap-6 md:flex-row md:gap-10">
            <div className="relative shrink-0"><div className="absolute -inset-4 rounded-full blur-3xl opacity-25" style={{ backgroundColor: color }} /><img src={heroImage} alt={character.name} onError={handleImageFallback} className="relative h-32 w-32 rounded-[32px] border-4 border-white/10 bg-black/40 object-cover object-top shadow-2xl sm:h-40 sm:w-40 sm:rounded-[44px]" /></div>
            <div className="min-w-0 space-y-5 text-center md:text-left">
              <div className="flex flex-wrap justify-center gap-2 md:justify-start"><span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-black text-gray-400">{character.arc}</span><span className="rounded-full border px-4 py-1.5 text-[11px] font-black" style={{ color, backgroundColor: `${color}15`, borderColor: `${color}40` }}>{character.attribute}속성</span><span className="flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-1.5 text-[11px] font-black text-violet-300"><Sparkles size={12} />패치 {article.applicableVersion}</span></div>
              <h1 className="text-3xl font-black leading-tight tracking-tighter sm:text-4xl xl:text-6xl">{character.name} <span style={{ color }}>가이드</span></h1>
              <p className="border-l-4 border-white/15 pl-4 text-xs sm:text-base font-bold text-gray-500">최적의 성능을 위한 아크와 콘솔 세팅 데이터입니다.</p>
              <span className="block text-[10px] font-bold text-gray-500">업데이트 {article.reviewedAt}</span>
            </div>
          </div>
        </section>

        <section className="space-y-6"><SectionHeader number="01" title="추천 아크" color={color} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">{guide.arcs.map(arc => {
            const registeredArc = arcs.find(item => item.name.replace(/[「」]/g, '') === arc.name);
            return <OptionalLink key={arc.rank} to={registeredArc ? `/gallery/nte/weapon/${encodeURIComponent(registeredArc.name)}` : undefined} className={`group relative flex flex-col items-center gap-4 overflow-hidden rounded-[28px] border bg-white/[0.02] p-4 pt-10 text-center transition hover:bg-white/[0.05] ${arc.rank === 1 ? 'border-yellow-400/70 shadow-[0_0_35px_rgba(250,204,21,0.1)]' : 'border-white/10'}`}>
            <span className={`absolute left-0 top-0 rounded-br-2xl px-3 py-1.5 text-[10px] font-black ${arc.rank === 1 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-300'}`}>{arc.rank}순위</span>{arc.rank === 1 && <Crown size={16} className="absolute right-3 top-3 text-yellow-400" />}
            <img src={getNteGuideArcImageUrl(arc.name)} alt={arc.name} onError={handleImageFallback} loading="lazy" className="h-28 w-full object-contain transition duration-500 group-hover:scale-110 sm:h-36" />
            <span className="text-sm font-black text-white sm:text-base">{arc.name}</span>
          </OptionalLink>;
          })}</div>
          <div className="space-y-3 rounded-[28px] border border-white/5 bg-white/[0.02] p-5 sm:p-7">{guide.arcs.map(arc => <div key={arc.rank} className="border-b border-white/5 pb-4 last:border-0 last:pb-0"><p className="mb-2 flex items-center gap-2 text-sm font-black"><span className="text-xs" style={{ color }}>{arc.rank}순위</span>{arc.name}</p><p className="whitespace-pre-line text-xs sm:text-sm leading-7 text-gray-400">{arc.note}</p></div>)}</div>
        </section>

        <section className="space-y-6"><SectionHeader number="02" title="추천 콘솔 세트" color={color} />
          {guide.consoles.length > 1 && <div className="flex flex-wrap gap-2">{guide.consoles.map((set, index) => <button key={index} type="button" aria-pressed={selectedConsole === index} onClick={() => setSelectedConsole(index)} className={`rounded-2xl border px-5 py-3 text-xs font-black transition ${selectedConsole === index ? 'border-violet-400/50 bg-violet-400/15 text-violet-200' : 'border-white/10 bg-white/[0.03] text-gray-500 hover:text-white'}`}>{set.label} · {set.name}</button>)}</div>}
          {currentConsole && <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-5 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start"><div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[28px] border border-white/10 bg-black/30">{cartridge ? <img src={getNTECartridgeImageUrl(cartridge.imageFileName, 5)} alt={cartridge.name} onError={handleImageFallback} className="h-full w-full object-contain p-3" /> : <Layers size={44} className="text-violet-300" />}</div><div className="min-w-0 flex-1"><h3 className="text-xl sm:text-2xl font-black">{currentConsole.name}</h3><p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-400">{currentConsole.note}</p></div></div>
            {cartridge && <div className="mt-6 grid gap-4 border-t border-white/5 pt-6 sm:grid-cols-2"><div className="rounded-2xl bg-black/20 p-4"><span className="text-xs font-black text-sky-300">2세트 효과</span><p className="mt-2 text-sm leading-6 text-gray-300">{cartridge.twoPieceEffect}</p></div><div className="rounded-2xl bg-black/20 p-4"><span className="text-xs font-black text-violet-300">4세트 효과</span><p className="mt-2 text-sm leading-6 text-gray-300">{cartridge.fourPieceEffect}</p></div></div>}
          </div>}
          <div className="grid gap-4 sm:grid-cols-2">{[{ label: '콘솔 주 옵션', items: guide.mainStats, icon: <Target size={18} /> }, { label: '콘솔 부 옵션', items: guide.subStats, icon: <TrendingUp size={18} /> }].map(group => <div key={group.label} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-5 sm:p-7"><div className="mb-5 flex items-center gap-3 text-violet-300">{group.icon}<h3 className="font-black">{group.label}</h3></div><div className="space-y-3">{group.items.map((stat, index) => <div key={index} className="flex items-start gap-3 rounded-xl bg-black/25 p-3 text-sm font-bold leading-6 text-gray-300"><span className="shrink-0 text-violet-400">{index + 1}</span>{stat}</div>)}</div></div>)}</div>
        </section>

        <section className="space-y-6"><SectionHeader number="03" title="권장 스텟" color={color} />{guide.statGroups.map((group, index) => <div key={index} className="space-y-4"><h3 className="px-2 text-sm font-black text-gray-400">{group.label}</h3><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{group.items.map((stat, itemIndex) => <div key={itemIndex} className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-5 sm:p-7"><span className="mb-3 block text-[11px] font-black text-gray-500">{stat.label}</span><span className="text-xl sm:text-3xl font-black tracking-tight" style={{ color }}>{stat.value}</span></div>)}</div></div>)}</section>

        <section className="space-y-6"><SectionHeader number="04" title="스킬 육성 우선순위" color={color} /><div className="flex flex-wrap items-stretch gap-3 rounded-[32px] border border-white/5 bg-white/[0.02] p-5 sm:p-8">{guide.skillPriority.map((skill, index) => {
          const detail = character.skills?.find((item: any) => item.type === skill);
          return <React.Fragment key={index}><div className="min-w-[125px] flex-1 rounded-2xl border border-white/10 bg-black/25 p-4"><span className="mb-4 flex items-center justify-between text-xs font-black" style={{ color }}><span>{index + 1}순위</span><Zap size={16} /></span><p className="text-sm font-black">{skill}</p>{detail && <p className="mt-2 text-[11px] leading-5 text-gray-500">{detail.name}</p>}</div>{index < guide.skillPriority.length - 1 && <ArrowRight size={16} className="hidden shrink-0 self-center text-gray-600 sm:block" />}</React.Fragment>;
        })}</div></section>

        <section className="space-y-6"><SectionHeader number="05" title="각성 우선순위" color={color} /><div className="grid grid-cols-3 gap-3 sm:grid-cols-6">{guide.awakeningPriority.map((rank, index) => <div key={index} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-4 text-center"><span className="block text-[10px] font-black text-gray-500">{index + 1}순위</span><span className="my-3 block text-3xl font-black" style={{ color }}>{rank}</span><span className="block text-[11px] font-bold text-gray-400">{character.eidolons?.find((item: any) => Number(item.rank) === rank)?.name || `각성 ${rank}`}</span></div>)}</div></section>

        <section className="space-y-6"><SectionHeader number="06" title="시너지 캐릭터" color={color} /><div className="grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-6">{guide.party.map((name, index) => {
          const member = NTE_CHARACTER_DATA.find(item => item.name === name);
          return member ? <Link key={index} to={`/gallery/nte/character/${encodeURIComponent(member.name)}`} className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] transition hover:border-violet-400/50"><img src={characterImage(member)} alt={member.name} onError={handleImageFallback} loading="lazy" className="aspect-square w-full object-cover object-top transition duration-500 group-hover:scale-105" /><div className="p-3 text-center"><span className="block text-xs font-black">{member.name}</span><span className="mt-1 block text-[10px] font-bold text-gray-500">{member.attribute} · {member.arc}</span></div></Link> : <div key={index} className="rounded-2xl border border-white/10 p-4 text-sm font-bold">{name}</div>;
        })}</div></section>
        {guide.notes.length > 0 && <section className="rounded-3xl border border-white/10 p-6"><h2 className="mb-4 text-xl font-black">추가 세팅 메모</h2>{guide.notes.map((note, index) => <p key={index} className="whitespace-pre-line text-sm leading-7 text-gray-400">{note}</p>)}</section>}
        <Link to="/gallery/nte?menu=공략" className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-white"><ChevronLeft size={16} />캐릭터 공략 목록</Link>
      </main>
      <aside ref={asideRef} className="hidden w-64 shrink-0 lg:block"><div ref={tocRef} className="w-64"><TableOfContents key={`${article.slug}-${selectedConsole}`} selector=".guide-content" /></div></aside>
    </div>
  </div>;
}
