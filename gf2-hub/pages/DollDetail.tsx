import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import * as htmlToImage from 'html-to-image';
import { ChevronDown, Download, MessageSquareWarning, Share2 } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import DetailStickyNav from '../../common-hub/components/DetailStickyNav';
import NotFound from '../../common-hub/pages/NotFound';
import { Gf2Tag, GF2_PRIVATE_NOTE } from '../components/Gf2Navigation';
import { Gf2TermProvider, Gf2Text } from '../components/Gf2RichText';
import { findGf2Doll, gf2CommonKeyImage, gf2ElementIcon, gf2JobIcon, gf2Portrait, gf2SkillImage, gf2StatIcon, loadGf2Doll, parseCore, parseHelix, parseMind, parseSkillText, parseStats, parseTerms, splitLines, GF2_AMMO, GF2_ELEMENTS } from '../utils/gf2Data';
import type { Gf2SkillPart } from '../utils/gf2Data';
import type { Gf2Doll } from '../types';

const CharacterReviewBoard = lazy(() => import('../../common-hub/components/CharacterReviewBoard'));
const FeedbackReportModal = lazy(() => import('../../common-hub/components/FeedbackReportModal'));

const ACCENT = '#f0703c';
const SKILLS: Array<{ key: keyof Gf2Doll; label: string; image: string }> = [
  { key: 'basicAttack', label: '일반 공격', image: '일반 공격' },
  { key: 'active1', label: '액티브 1', image: '액티브1' },
  { key: 'active2', label: '액티브 2', image: '액티브2' },
  { key: 'ultimate', label: '결전기', image: '결전기' },
  { key: 'passive', label: '패시브', image: '패시브' },
];
const META_ICON: Record<string, string> = { '턴 쿨타임': '턴 쿨타임', '리몰딩 소모': '리몰딩 소모' };
const isAmmo = (tag: string) => (GF2_AMMO as readonly string[]).includes(tag);
const isElement = (tag: string) => (GF2_ELEMENTS as readonly string[]).includes(tag);

/** 아이콘이 없으면 빈칸 대신 이름 두 글자를 보여 준다. */
const IconBox: React.FC<{ src: string; label: string; size?: 'md' | 'lg' }> = ({ src, label, size = 'md' }) => {
  const [failed, setFailed] = useState(false);
  const box = size === 'lg' ? 'h-16 w-16 md:h-20 md:w-20' : 'h-14 w-14';
  return <span className={`grid shrink-0 place-items-center rounded-2xl border border-orange-400/20 bg-[#1a1411] ${box}`}>
    {failed ? <span aria-hidden className="text-sm font-bold text-gray-400">{label.replace(/\s/g, '').slice(0, 2)}</span>
      : <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" crossOrigin="anonymous" className="h-[78%] w-[78%] object-contain" onError={() => setFailed(true)} />}
  </span>;
};

const HideOnError: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  return failed ? null : <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" crossOrigin="anonymous" className={className} onError={() => setFailed(true)} />;
};

const Chip: React.FC<{ children: React.ReactNode; tone?: 'plain' | 'accent' }> = ({ children, tone = 'plain' }) => <span className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${tone === 'accent' ? 'border-orange-400/30 bg-orange-400/10 text-orange-100' : 'border-white/10 bg-white/[0.04] text-gray-200'}`}>{children}</span>;

/** 다른 허브 상세와 같은 구역 제목: 번호 배지 + 24px 제목 */
const SectionHeader: React.FC<{ num: number; title: string; id: string; note?: string }> = ({ num, title, id, note }) => <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-black md:h-14 md:w-14 md:text-xl" style={{ backgroundColor: `${ACCENT}20`, color: '#fdba74', borderColor: `${ACCENT}60` }}>{String(num).padStart(2, '0')}</div>
    <h2 id={`${id}-h`} className="text-2xl font-black text-white">{title}</h2>
  </div>
  {note && <span className="text-sm font-semibold text-gray-400">{note}</span>}
</div>;

const Section: React.FC<{ id: string; num: number; title: string; note?: string; children: React.ReactNode }> = ({ id, num, title, note, children }) => <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-b border-white/5 pb-10 pt-4">
  <SectionHeader num={num} title={title} id={id} note={note} />
  {children}
</section>;

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => <div className={`rounded-2xl border border-white/10 bg-[#121212] ${className}`}>{children}</div>;

/** 스킬 하나의 이름·유형·탄종·속성·수치와 설명 */
const SkillBody: React.FC<{ part: Gf2SkillPart; label?: string; nested?: boolean }> = ({ part, label, nested }) => {
  const plainTags = part.tags.filter(tag => !isAmmo(tag) && !isElement(tag));
  const typeLabel = label || part.type;
  return <div className="min-w-0">
    {typeLabel && <p className="text-sm font-bold text-orange-300">{typeLabel}</p>}
    <h3 className={`${nested ? 'text-xl' : 'text-3xl'} mt-1 font-black leading-tight text-white`}>{part.name}</h3>
    {(plainTags.length > 0 || part.tags.some(isAmmo) || part.tags.some(isElement) || part.meta.length > 0) && <div className="mt-3 flex flex-wrap gap-2">
      {part.tags.filter(isAmmo).map(tag => <Chip key={tag}><Gf2Tag icon={gf2StatIcon(tag)} label={tag} /></Chip>)}
      {part.tags.filter(isElement).map(tag => <Chip key={tag}><Gf2Tag icon={gf2ElementIcon(tag)} label={tag} /></Chip>)}
      {part.meta.map(meta => <Chip key={meta.label} tone="accent">{META_ICON[meta.label] && <HideOnError src={gf2StatIcon(META_ICON[meta.label])} alt="" className="h-4 w-4" />}{meta.label}<b className="tabular-nums text-white">{meta.value}</b></Chip>)}
      {plainTags.map(tag => <Chip key={tag}>{tag}</Chip>)}
    </div>}
    {part.lines.length > 0 && <div className="mt-4 max-w-[80ch] space-y-2 text-base leading-relaxed text-gray-200 md:text-lg">{part.lines.map((line, index) => <p key={index}><Gf2Text text={line} /></p>)}</div>}
  </div>;
};

/** 본 스킬 뒤의 교체 스킬·소환물 묶음. 소환물 이름 아래 그 소환물의 스킬을 모은다. */
const groupParts = (parts: Gf2SkillPart[]) => {
  const groups: Array<{ unit?: Gf2SkillPart; skills: Gf2SkillPart[] }> = [];
  for (const part of parts) {
    if (part.kind === 'unit') groups.push({ unit: part, skills: [] });
    else if (groups.length && groups[groups.length - 1].unit) groups[groups.length - 1].skills.push(part);
    else groups.push({ skills: [part] });
  }
  return groups;
};

const DollDetailGF2: React.FC = () => {
  const { charName = '' } = useParams<{ charName: string }>();
  const name = decodeURIComponent(charName);
  const summary = findGf2Doll(name);
  const [doll, setDoll] = useState<Gf2Doll | null>(null);
  const [failed, setFailed] = useState(false);
  const [skinIndex, setSkinIndex] = useState(0);
  const [isSkinOpen, setIsSkinOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    setDoll(null); setFailed(false); setSkinIndex(0);
    loadGf2Doll(name).then(result => { if (active) result ? setDoll(result) : setFailed(true); }).catch(() => active && setFailed(true));
    return () => { active = false; };
  }, [name]);

  const parsed = useMemo(() => doll && ({
    stats: parseStats(doll.stats),
    skills: SKILLS.map(skill => ({ ...skill, parts: parseSkillText(String(doll[skill.key] || '')) })).filter(skill => skill.parts.length),
    mind: parseMind(doll.mind),
    helix: parseHelix(doll.helix),
    core: parseCore(doll.core),
    bond: splitLines(doll.bondKey),
    skins: splitLines(doll.skins),
    terms: parseTerms(doll.terms),
    voices: doll.voice.split('/').map(part => part.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '').trim()).filter(Boolean),
    otherNames: splitLines(doll.names).map(line => line.replace(/^[^:]+:\s*/, '')),
  }), [doll]);

  if (!summary) return <NotFound />;

  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2500); };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${summary.name} | RIRA ARCHIVE`, text: `${summary.name} 인형의 스킬과 육성 정보를 확인해 보세요.`, url }); } catch { /* 사용자가 취소 */ }
      return;
    }
    try { await navigator.clipboard.writeText(url); flash('링크를 복사했습니다.'); } catch { flash('링크를 복사하지 못했습니다.'); }
  };
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 0.95, backgroundColor: '#0a0a0a', cacheBust: true });
      const link = document.createElement('a');
      link.download = `${summary.name}_RIRA_ARCHIVE.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('이미지 캡처 오류:', error);
      flash('이미지를 저장하지 못했습니다.');
    }
  };

  const [ammo, weakElement] = summary.weakness.split('/').map(part => part.trim());
  const skins = parsed?.skins || [];
  const portrait = skinIndex > 0 && skins[skinIndex] ? gf2SkillImage(summary, skins[skinIndex]) : gf2Portrait(summary);
  const profile = [['소속', summary.affiliation], ['무기', summary.weapon.replace(/\s*\/\s*/, ' · ')], ['모델', doll?.model], ['성우', parsed?.voices.join(' · ')], ['출시 순서', `${summary.releaseOrder}번째`]].filter(([, value]) => value) as Array<[string, string]>;
  const [bondName, ...bondStats] = parsed?.bond || [];
  const sections = parsed ? [
    { id: 'skills', label: '스킬' },
    { id: 'mind', label: '마인드 보강' },
    { id: 'helix', label: '뉴럴 헬릭스' },
    { id: 'bond', label: '결합·리몰딩' },
    ...(parsed.skins.length ? [{ id: 'skins', label: '의상' }] : []),
    ...(parsed.terms.length ? [{ id: 'terms', label: '용어' }] : []),
  ] : [];
  const tabs = parsed ? [...(parsed.stats.length ? [{ id: 'stats', label: '능력치' }] : []), ...sections] : [];
  const num = (id: string) => tabs.findIndex(tab => tab.id === id) + 1;

  return <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 text-white">
    <SEO title={`${summary.name} - 소녀전선2 인형 정보`} url={`/gallery/gf2/character/${summary.name}`} noindex />
    <PageHeader gameId="gf2" category="인형 도감" categoryUrl="/gallery/gf2/dolls" title={summary.name} />
    {tabs.length > 0 && <DetailStickyNav activeColor={ACCENT} tabs={tabs} />}

    <Gf2TermProvider terms={parsed?.terms || []}>
      <div className="mx-auto mt-4 max-w-[1600px] space-y-6 px-4 md:px-8">
        <p role="note" className="rounded-2xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-sm text-orange-100">{GF2_PRIVATE_NOTE}</p>

        {failed ? <p className="rounded-2xl border border-white/10 px-4 py-6 text-base text-gray-300">인형 정보를 불러오지 못했습니다. 새로고침하거나 <Link to="/gallery/gf2/dolls" className="text-orange-300 underline">인형 도감</Link>으로 돌아가 주세요.</p> : <>
          <div ref={cardRef} className="relative grid grid-cols-1 items-start gap-8 border-b border-white/5 pb-8 lg:grid-cols-[500px_1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1b1410] to-[#0f0f0f] aspect-[3/4.5] lg:aspect-auto lg:h-[min(750px,calc(100dvh-17rem))] lg:min-h-[480px]">
              <img key={portrait} src={portrait} alt={`${summary.name} 일러스트`} fetchPriority="high" decoding="async" referrerPolicy="no-referrer" crossOrigin="anonymous" className="h-full w-full object-cover object-top" onError={event => { if (skinIndex > 0) event.currentTarget.src = gf2Portrait(summary); }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-orange-300">직업 : {summary.job} | {summary.element}</p>
                <h1 className="text-3xl font-black leading-tight tracking-tighter text-white drop-shadow-lg md:text-5xl">{summary.name}</h1>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-lg border border-orange-400/40 bg-orange-400/15 px-2.5 py-1 text-xs font-black text-orange-200">{summary.rarity}</span>
                  <span className="rounded-lg border border-white/10 px-2 py-0.5 text-[11px] font-bold tracking-wide text-gray-400">출시 {summary.releaseOrder}번째</span>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col gap-6">
              <div className="relative z-30 flex flex-wrap items-center gap-3">
                {skins.length > 1 && <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-inner">
                  <span className="pl-2 pr-1 text-xs font-black text-gray-400">의상</span>
                  <div className="relative">
                    <button type="button" aria-haspopup="listbox" aria-expanded={isSkinOpen} onClick={() => setIsSkinOpen(open => !open)} className="flex min-w-[140px] items-center justify-between rounded-lg bg-orange-500 px-4 py-1 text-xs font-black text-black">
                      <span className="max-w-[140px] truncate">{skins[skinIndex] || '기본'}</span><ChevronDown size={14} className={`ml-2 shrink-0 transition-transform ${isSkinOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isSkinOpen && <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsSkinOpen(false)} />
                      <div role="listbox" className="absolute left-0 top-full z-50 mt-2 flex w-max min-w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121212] py-1 shadow-2xl">
                        {skins.map((skin, index) => <button key={skin} type="button" role="option" aria-selected={skinIndex === index} onClick={() => { setSkinIndex(index); setIsSkinOpen(false); }} className={`px-4 py-2.5 text-left text-xs font-black transition-colors ${skinIndex === index ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>{skin}{index === 0 ? ' (기본)' : ''}</button>)}
                      </div>
                    </>}
                  </div>
                </div>}
                <div className="ml-auto flex items-center gap-2">
                  <button type="button" onClick={handleShare} aria-label="공유하기" title="공유하기" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:text-white"><Share2 size={14} /></button>
                  <button type="button" onClick={handleDownloadImage} aria-label="이미지 저장" title="이미지 저장" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:text-white"><Download size={14} /></button>
                </div>
              </div>
              {notice && <p role="status" className="text-sm font-semibold text-orange-200">{notice}</p>}

              {parsed && parsed.otherNames.length > 0 && <p className="text-base font-semibold text-gray-400">{parsed.otherNames.join(' · ')}</p>}
              <dl className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#121212] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">직업</dt><dd className="mt-2"><Gf2Tag strong icon={gf2JobIcon(summary.job)} label={summary.job} /></dd></div>
                <div className="rounded-2xl border border-white/10 bg-[#121212] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">위상 속성</dt><dd className="mt-2"><Gf2Tag strong icon={gf2ElementIcon(summary.element)} label={summary.element} /></dd></div>
                <div className="rounded-2xl border border-white/10 bg-[#121212] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">약점</dt><dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">{summary.weakness ? <>{ammo && <Gf2Tag strong icon={gf2StatIcon(ammo)} label={ammo} />}{weakElement && <Gf2Tag strong icon={gf2ElementIcon(weakElement)} label={weakElement} />}</> : <span className="text-base text-gray-400">미확인</span>}</dd></div>
              </dl>
              {doll?.description && <p className="max-w-[72ch] text-base leading-relaxed text-gray-200 md:text-lg">{doll.description}</p>}
              <dl className="grid gap-x-8 sm:grid-cols-2">
                {profile.map(([label, value]) => <div key={label} className="flex gap-4 border-b border-white/5 py-3 text-base"><dt className="w-20 shrink-0 font-semibold text-gray-400">{label}</dt><dd className="text-gray-100">{value}</dd></div>)}
              </dl>

              {parsed && parsed.stats.length > 0 && <div id="stats" className="scroll-mt-28 space-y-6 rounded-2xl border border-white/10 bg-[#121212] p-6">
                <div className="border-b border-white/5 pb-6"><div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-black" style={{ backgroundColor: `${ACCENT}20`, color: '#fdba74', borderColor: `${ACCENT}60` }}>01</div>
                  <h2 className="text-2xl font-black text-white">기본 능력치</h2>
                </div></div>
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">{parsed.stats.map(stat => <div key={stat.label} className="rounded-xl border border-white/5 bg-black/30 px-4 py-3">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-gray-400"><HideOnError src={gf2StatIcon(stat.label)} alt="" className="h-5 w-5" />{stat.label}</dt>
                  <dd className="mt-1.5 text-xl font-black tabular-nums">{stat.value}</dd>
                </div>)}</dl>
              </div>}
            </div>
          </div>

          {!parsed ? <p className="text-base text-gray-400" aria-live="polite">스킬과 육성 정보를 불러오는 중입니다.</p> : <>
            <Section id="skills" num={num('skills')} title="스킬">
              <div className="space-y-4">{parsed.skills.map(({ key, label, image, parts }) => {
                const [main, ...rest] = parts;
                return <Card key={key} className="p-5 md:p-8">
                  <article className="flex flex-col gap-5 md:flex-row md:gap-8">
                    <IconBox src={gf2SkillImage(summary, image)} label={label} size="lg" />
                    <div className="min-w-0 flex-1">
                      <SkillBody part={main} label={label} />
                      {rest.length > 0 && <div className="mt-6 space-y-3">{groupParts(rest).map((group, index) => <div key={index} className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                        {group.unit && <div className={group.skills.length ? 'mb-4 border-b border-white/10 pb-4' : ''}>
                          <p className="text-sm font-bold text-gray-400">소환·추가 개체</p>
                          <h3 className="mt-0.5 text-xl font-black">{group.unit.name}</h3>
                          {group.unit.meta.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{group.unit.meta.map(meta => <Chip key={meta.label} tone="accent">{meta.label}<b className="tabular-nums text-white">{meta.value}</b></Chip>)}</div>}
                          {group.unit.lines.length > 0 && <div className="mt-3 space-y-1.5 text-base leading-relaxed text-gray-200">{group.unit.lines.map((line, lineIndex) => <p key={lineIndex}><Gf2Text text={line} /></p>)}</div>}
                        </div>}
                        <div className="space-y-5">{group.skills.map((part, partIndex) => <SkillBody key={partIndex} part={part} nested />)}</div>
                      </div>)}</div>}
                    </div>
                  </article>
                </Card>;
              })}</div>
            </Section>

            <Section id="mind" num={num('mind')} title="마인드 보강" note="중추 Ⅰ~Ⅵ">
              <ol className="grid gap-4 md:grid-cols-2">{parsed.mind.map(block => <li key={block.title}><Card className="h-full p-5 sm:p-6">
                <span className="inline-flex rounded-lg bg-orange-500 px-2.5 py-1 text-sm font-black text-black">{block.title}</span>
                {block.upgrade && <p className="mt-3 text-lg font-bold text-white">{block.upgrade}</p>}
                <div className="mt-2 space-y-1.5 text-base leading-relaxed text-gray-200">{block.lines.map((line, index) => <p key={index}><Gf2Text text={line} /></p>)}</div>
              </Card></li>)}</ol>
            </Section>

            <Section id="helix" num={num('helix')} title="뉴럴 헬릭스">
              <div className="grid gap-4 md:grid-cols-2">{parsed.helix.map(key => key.kind === '고유키 활성 시 능력치'
                ? <Card key={key.kind} className="p-5 md:col-span-2"><p className="text-sm font-bold text-gray-400">{key.kind}</p><p className="mt-1 text-base text-gray-200">{[...key.stats, ...key.lines].join(' · ')}</p></Card>
                : <Card key={`${key.kind}-${key.name}`} className="flex gap-4 p-5 sm:p-6">
                  <IconBox src={key.kind === '공용키' ? gf2CommonKeyImage(key.name) : gf2SkillImage(summary, key.kind)} label={key.kind} />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-orange-300">{key.kind}</p>
                    <h3 className="mt-0.5 text-xl font-black">{key.name}</h3>
                    {key.stats.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{key.stats.map(stat => <Chip key={stat}>{stat}</Chip>)}</div>}
                    <div className="mt-2 space-y-1.5 text-base leading-relaxed text-gray-200">{key.lines.map((line, index) => <p key={index}><Gf2Text text={line} /></p>)}</div>
                  </div>
                </Card>)}</div>
            </Section>

            <Section id="bond" num={num('bond')} title="결합키와 리몰딩 코어">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <Card className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-300">결합키</h3>
                  {bondName ? <><div className="mt-4 flex items-center gap-4"><IconBox src={gf2SkillImage(summary, '결합키')} label="결합" /><p className="text-xl font-black">{bondName}</p></div>
                    <dl className="mt-4">{bondStats.map(line => { const match = line.match(/^(.+?)\s+([\d.]+%)$/); return <div key={line} className="flex justify-between border-b border-white/5 py-3 text-base"><dt className="text-gray-300">{match ? match[1] : line}</dt><dd className="font-bold tabular-nums">{match ? match[2] : ''}</dd></div>; })}</dl></>
                    : <p className="mt-4 text-base text-gray-400">미확인</p>}
                </Card>
                <Card className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-300">리몰딩 코어</h3>
                  {parsed.core.stats.length > 0 && <div className="mt-4 flex flex-wrap gap-2"><span className="self-center text-sm font-semibold text-gray-400">Lv.60 능력치</span>{parsed.core.stats.map(stat => <Chip key={stat.label}>{stat.label}<b className="tabular-nums text-white">+{stat.value.replace(/^\+/, '')}</b></Chip>)}</div>}
                  <ol className="mt-4">{parsed.core.stages.map(stage => <li key={stage.name} className="grid gap-1 border-b border-white/5 py-3 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4">
                    <p className="text-base font-bold">{stage.name}{stage.level && <span className="ml-2 text-sm font-semibold text-gray-400">Lv.{stage.level}</span>}</p>
                    <p className="text-base leading-relaxed text-gray-200"><Gf2Text text={stage.text} /></p>
                  </li>)}</ol>
                  {(parsed.core.slots || parsed.core.costs.length > 0) && <dl className="mt-4 space-y-2 text-sm text-gray-300">
                    {parsed.core.slots && <div className="flex gap-3"><dt className="w-28 shrink-0 font-semibold text-gray-400">성장 데이터 슬롯</dt><dd>{parsed.core.slots}</dd></div>}
                    {parsed.core.costs.length > 0 && <div className="flex gap-3"><dt className="w-28 shrink-0 font-semibold text-gray-400">레벨 업 재화</dt><dd>{parsed.core.costs.map(cost => `${cost.label} ${Number(cost.value).toLocaleString('ko-KR')}`).join(' · ')}</dd></div>}
                  </dl>}
                </Card>
              </div>
            </Section>

            {parsed.skins.length > 0 && <Section id="skins" num={num('skins')} title="의상" note={`${parsed.skins.length}종`}>
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{parsed.skins.map((skin, index) => <li key={skin} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
                <div className="aspect-[3/4] bg-gradient-to-b from-[#1b1410] to-[#0e0e0e]"><HideOnError src={index === 0 ? gf2Portrait(summary) : gf2SkillImage(summary, skin)} alt={skin} className="h-full w-full object-contain object-bottom" /></div>
                <p className="flex items-center justify-between gap-2 px-4 py-3 text-base font-bold">{skin}<span className="text-sm font-semibold text-gray-400">{index === 0 ? '기본' : '추가'}</span></p>
              </li>)}</ul>
            </Section>}

            {parsed.terms.length > 0 && <Section id="terms" num={num('terms')} title="용어" note={`${parsed.terms.length}개 · 본문 밑줄 단어에 마우스를 올리거나 누르면 설명이 보입니다`}>
              <Card><dl className="divide-y divide-white/5">{parsed.terms.map(term => <div key={term.term} className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-5 sm:px-6"><dt className="text-base font-bold text-orange-200">{term.term}</dt><dd className="text-base leading-relaxed text-gray-200"><Gf2Text text={term.description} terms={false} /></dd></div>)}</dl></Card>
            </Section>}

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <button type="button" onClick={() => setIsFeedbackOpen(true)} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition hover:border-orange-400/50 hover:bg-white/10 hover:text-white">
                <MessageSquareWarning size={14} />데이터 오류 제보
              </button>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">출시 순서 {summary.releaseOrder}번째</p>
            </div>

            <Suspense fallback={<div className="min-h-60" />}>
              <CharacterReviewBoard characterId={summary.name} gameId="gf2" />
            </Suspense>
          </>}
        </>}
      </div>
    </Gf2TermProvider>

    {isFeedbackOpen && <Suspense fallback={null}>
      <FeedbackReportModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} contextData={{ gameId: 'gf2', targetId: summary.name, targetName: summary.name, type: 'character' }} />
    </Suspense>}
  </div>;
};

export default DollDetailGF2;
