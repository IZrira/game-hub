import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import LazyImage from '../../common-hub/components/LazyImage';
import DetailStickyNav from '../../common-hub/components/DetailStickyNav';
import NotFound from '../../common-hub/pages/NotFound';
import { Gf2MobileNav, Gf2Sidebar, Gf2Tag, GF2_PRIVATE_NOTE } from '../components/Gf2Navigation';
import { Gf2TermProvider, Gf2Text } from '../components/Gf2RichText';
import { findGf2Doll, gf2CommonKeyImage, gf2ElementIcon, gf2JobIcon, gf2Portrait, gf2SkillImage, gf2StatIcon, loadGf2Doll, parseCore, parseHelix, parseMind, parseSkillText, parseStats, parseTerms, splitLines, GF2_AMMO, GF2_ELEMENTS } from '../utils/gf2Data';
import type { Gf2SkillPart } from '../utils/gf2Data';
import type { Gf2Doll } from '../types';

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
  const box = size === 'lg' ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-14 w-14 sm:h-16 sm:w-16';
  return <span className={`grid shrink-0 place-items-center rounded-2xl border border-orange-400/20 bg-[#1a1411] ${box}`}>
    {failed ? <span aria-hidden className="text-sm font-bold text-gray-400">{label.replace(/\s/g, '').slice(0, 2)}</span>
      : <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-[78%] w-[78%] object-contain" onError={() => setFailed(true)} />}
  </span>;
};

const HideOnError: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  return failed ? null : <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" className={className} onError={() => setFailed(true)} />;
};

const Chip: React.FC<{ children: React.ReactNode; tone?: 'plain' | 'accent' }> = ({ children, tone = 'plain' }) => <span className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${tone === 'accent' ? 'border-orange-400/30 bg-orange-400/10 text-orange-100' : 'border-white/10 bg-white/[0.04] text-gray-200'}`}>{children}</span>;

const Section: React.FC<{ id: string; title: string; note?: string; children: React.ReactNode }> = ({ id, title, note, children }) => <section id={id} aria-labelledby={`${id}-h`} className="pt-14">
  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3"><h2 id={`${id}-h`} className="text-2xl font-black sm:text-3xl">{title}</h2>{note && <span className="text-sm font-semibold text-gray-400">{note}</span>}</div>
  {children}
</section>;

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => <div className={`rounded-3xl border border-white/10 bg-[#111] ${className}`}>{children}</div>;

/** 스킬 하나의 이름·유형·탄종·속성·수치와 설명 */
const SkillBody: React.FC<{ part: Gf2SkillPart; label?: string; nested?: boolean }> = ({ part, label, nested }) => {
  const plainTags = part.tags.filter(tag => !isAmmo(tag) && !isElement(tag));
  const typeLabel = label || part.type;
  return <div className="min-w-0">
    {typeLabel && <p className="text-sm font-bold text-orange-300">{typeLabel}</p>}
    <h3 className={`${nested ? 'text-xl' : 'text-2xl'} mt-0.5 font-black leading-snug text-white`}>{part.name}</h3>
    {(plainTags.length > 0 || part.tags.some(isAmmo) || part.tags.some(isElement) || part.meta.length > 0) && <div className="mt-3 flex flex-wrap gap-2">
      {part.tags.filter(isAmmo).map(tag => <Chip key={tag}><Gf2Tag icon={gf2StatIcon(tag)} label={tag} /></Chip>)}
      {part.tags.filter(isElement).map(tag => <Chip key={tag}><Gf2Tag icon={gf2ElementIcon(tag)} label={tag} /></Chip>)}
      {part.meta.map(meta => <Chip key={meta.label} tone="accent">{META_ICON[meta.label] && <HideOnError src={gf2StatIcon(META_ICON[meta.label])} alt="" className="h-4 w-4" />}{meta.label}<b className="tabular-nums text-white">{meta.value}</b></Chip>)}
      {plainTags.map(tag => <Chip key={tag}>{tag}</Chip>)}
    </div>}
    {part.lines.length > 0 && <div className="mt-4 max-w-[78ch] space-y-2 text-base leading-relaxed text-gray-200 md:text-lg">{part.lines.map((line, index) => <p key={index}><Gf2Text text={line} /></p>)}</div>}
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

  useEffect(() => {
    let active = true;
    setDoll(null); setFailed(false);
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

  const [ammo, weakElement] = summary.weakness.split('/').map(part => part.trim());
  const shell = (body: React.ReactNode) => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${summary.name} - 소녀전선2 인형 정보`} url={`/gallery/gf2/character/${summary.name}`} noindex />
    <PageHeader gameId="gf2" category="인형 도감" categoryUrl="/gallery/gf2/dolls" title={summary.name} />
    <Gf2MobileNav />
    <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <Gf2Sidebar />
      <div className="min-w-0">
        <p role="note" className="mb-6 rounded-2xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-sm text-orange-100">{GF2_PRIVATE_NOTE}</p>
        {body}
      </div>
    </main>
  </div>;

  if (failed) return shell(<p className="rounded-2xl border border-white/10 px-4 py-6 text-base text-gray-300">인형 정보를 불러오지 못했습니다. 새로고침하거나 <Link to="/gallery/gf2/dolls" className="text-orange-300 underline">인형 도감</Link>으로 돌아가 주세요.</p>);

  const profile = [['소속', summary.affiliation], ['무기', summary.weapon.replace(/\s*\/\s*/, ' · ')], ['모델', doll?.model], ['성우', parsed?.voices.join(' · ')], ['출시 순서', `${summary.releaseOrder}번째`]].filter(([, value]) => value) as Array<[string, string]>;
  const [bondName, ...bondStats] = parsed?.bond || [];
  const tabs = parsed ? [
    ...(parsed.stats.length ? [{ id: 'stats', label: '능력치' }] : []),
    { id: 'skills', label: '스킬' },
    { id: 'mind', label: '마인드 보강' },
    { id: 'helix', label: '뉴럴 헬릭스' },
    { id: 'bond', label: '결합·리몰딩' },
    ...(parsed.skins.length ? [{ id: 'skins', label: '의상' }] : []),
    ...(parsed.terms.length ? [{ id: 'terms', label: '용어' }] : []),
  ] : [];

  return shell(<Gf2TermProvider terms={parsed?.terms || []}>
    <section className="grid gap-8 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-12">
      <LazyImage src={gf2Portrait(summary)} alt={`${summary.name} 일러스트`} loading="eager" fetchPriority="high" containerClassName="mx-auto aspect-[380/752] w-full max-w-[420px] rounded-3xl border border-white/10 bg-gradient-to-b from-[#1b1410] to-[#0e0e0e]" className="h-full w-full object-contain object-bottom" referrerPolicy="no-referrer" />
      <div className="flex flex-col justify-center">
        <span className="w-fit rounded-lg border border-orange-400/40 bg-orange-400/10 px-2.5 py-1 text-sm font-bold text-orange-200">{summary.rarity}</span>
        <h1 className="mt-4 text-4xl font-black sm:text-5xl">{summary.name}</h1>
        {parsed && parsed.otherNames.length > 0 && <p className="mt-2 text-base font-semibold text-gray-400">{parsed.otherNames.join(' · ')}</p>}
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">직업</dt><dd className="mt-2"><Gf2Tag strong icon={gf2JobIcon(summary.job)} label={summary.job} /></dd></div>
          <div className="rounded-2xl border border-white/10 bg-[#111] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">위상 속성</dt><dd className="mt-2"><Gf2Tag strong icon={gf2ElementIcon(summary.element)} label={summary.element} /></dd></div>
          <div className="rounded-2xl border border-white/10 bg-[#111] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">약점</dt><dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">{summary.weakness ? <>{ammo && <Gf2Tag strong icon={gf2StatIcon(ammo)} label={ammo} />}{weakElement && <Gf2Tag strong icon={gf2ElementIcon(weakElement)} label={weakElement} />}</> : <span className="text-base text-gray-400">미확인</span>}</dd></div>
        </dl>
        {doll?.description && <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-gray-200 md:text-lg">{doll.description}</p>}
        <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {profile.map(([label, value]) => <div key={label} className="flex gap-4 border-b border-white/5 py-3 text-base"><dt className="w-20 shrink-0 font-semibold text-gray-400">{label}</dt><dd className="text-gray-100">{value}</dd></div>)}
        </dl>
      </div>
    </section>

    {!parsed ? <p className="mt-10 text-base text-gray-400" aria-live="polite">스킬과 육성 정보를 불러오는 중입니다.</p> : <>
      <DetailStickyNav activeColor={ACCENT} className="mt-10" tabs={tabs} />

      {parsed.stats.length > 0 && <Section id="stats" title="기본 능력치">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">{parsed.stats.map(stat => <div key={stat.label} className="rounded-2xl border border-white/10 bg-[#111] px-5 py-4">
          <dt className="flex items-center gap-2 text-sm font-semibold text-gray-400"><HideOnError src={gf2StatIcon(stat.label)} alt="" className="h-5 w-5" />{stat.label}</dt>
          <dd className="mt-2 text-2xl font-black tabular-nums">{stat.value}</dd>
        </div>)}</dl>
      </Section>}

      <Section id="skills" title="스킬">
        <div className="space-y-4">{parsed.skills.map(({ key, label, image, parts }) => {
          const [main, ...rest] = parts;
          return <Card key={key} className="p-5 sm:p-7">
            <article className="flex flex-col gap-5 sm:flex-row sm:gap-6">
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

      <Section id="mind" title="마인드 보강" note="중추 Ⅰ~Ⅵ">
        <ol className="grid gap-4 md:grid-cols-2">{parsed.mind.map(block => <li key={block.title}><Card className="h-full p-5 sm:p-6">
          <span className="inline-flex rounded-lg bg-orange-500 px-2.5 py-1 text-sm font-black text-black">{block.title}</span>
          {block.upgrade && <p className="mt-3 text-lg font-bold text-white">{block.upgrade}</p>}
          <div className="mt-2 space-y-1.5 text-base leading-relaxed text-gray-200">{block.lines.map((line, index) => <p key={index}><Gf2Text text={line} /></p>)}</div>
        </Card></li>)}</ol>
      </Section>

      <Section id="helix" title="뉴럴 헬릭스">
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

      <Section id="bond" title="결합키와 리몰딩 코어">
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

      {parsed.skins.length > 0 && <Section id="skins" title="의상" note={`${parsed.skins.length}종`}>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">{parsed.skins.map((skin, index) => <li key={skin} className="overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
          <div className="aspect-[3/4] bg-gradient-to-b from-[#1b1410] to-[#0e0e0e]"><HideOnError src={index === 0 ? gf2Portrait(summary) : gf2SkillImage(summary, skin)} alt={skin} className="h-full w-full object-contain object-bottom" /></div>
          <p className="flex items-center justify-between gap-2 px-4 py-3 text-base font-bold">{skin}<span className="text-sm font-semibold text-gray-400">{index === 0 ? '기본' : '추가'}</span></p>
        </li>)}</ul>
      </Section>}

      {parsed.terms.length > 0 && <Section id="terms" title="용어" note={`${parsed.terms.length}개 · 본문 밑줄 단어에 마우스를 올리거나 누르면 설명이 보입니다`}>
        <Card><dl className="divide-y divide-white/5">{parsed.terms.map(term => <div key={term.term} className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-5 sm:px-6"><dt className="text-base font-bold text-orange-200">{term.term}</dt><dd className="text-base leading-relaxed text-gray-200"><Gf2Text text={term.description} terms={false} /></dd></div>)}</dl></Card>
      </Section>}
    </>}
  </Gf2TermProvider>);
};

export default DollDetailGF2;
