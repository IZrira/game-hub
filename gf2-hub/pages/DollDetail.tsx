import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import LazyImage from '../../common-hub/components/LazyImage';
import DetailStickyNav from '../../common-hub/components/DetailStickyNav';
import NotFound from '../../common-hub/pages/NotFound';
import { Gf2MobileNav, Gf2Sidebar, Gf2Tag, GF2_PRIVATE_NOTE } from '../components/Gf2Navigation';
import { findGf2Doll, gf2ElementIcon, gf2JobIcon, gf2Portrait, gf2SkillImage, gf2StatIcon, loadGf2Doll, parseSkills, parseStats, parseTerms, parseTitledBlocks, splitLines, GF2_AMMO, GF2_ELEMENTS } from '../utils/gf2Data';
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

/** 수치(%, 칸, 턴, 스택, 점)를 강조색으로 표시 */
const Numbered: React.FC<{ text: string }> = ({ text }) => <>{text.split(/(\d+(?:\.\d+)?(?:%|칸|턴|스택|점))/).map((part, index) => index % 2 ? <span key={index} className="font-bold tabular-nums text-orange-300">{part}</span> : part)}</>;

const HideOnError: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  return failed ? null : <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" className={className} onError={() => setFailed(true)} />;
};

const Section: React.FC<{ id: string; title: string; note?: string; children: React.ReactNode }> = ({ id, title, note, children }) => <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 pt-12">
  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/5 pb-3"><h2 id={`${id}-h`} className="text-2xl font-bold">{title}</h2>{note && <span className="text-xs font-bold text-gray-400">{note}</span>}</div>
  {children}
</section>;

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

  if (!summary) return <NotFound />;

  const [ammo, weakElement] = summary.weakness.split('/').map(part => part.trim());
  const shell = (body: React.ReactNode) => <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${summary.name} - 소녀전선2 인형 정보`} url={`/gallery/gf2/character/${summary.name}`} noindex />
    <PageHeader gameId="gf2" category="인형 도감" categoryUrl="/gallery/gf2/dolls" title={summary.name} />
    <Gf2MobileNav />
    <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <Gf2Sidebar />
      <div className="min-w-0">
        <p role="note" className="mb-6 rounded-xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-sm text-orange-100">{GF2_PRIVATE_NOTE}</p>
        {body}
      </div>
    </main>
  </div>;

  if (failed) return shell(<p className="rounded-xl border border-white/10 px-4 py-6 text-base text-gray-300">인형 정보를 불러오지 못했습니다. 새로고침하거나 <Link to="/gallery/gf2/dolls" className="text-orange-300 underline">인형 도감</Link>으로 돌아가 주세요.</p>);

  const stats = doll ? parseStats(doll.stats) : [];
  const mind = doll ? parseTitledBlocks(doll.mind) : [];
  const helix = doll ? parseTitledBlocks(doll.helix) : [];
  const core = doll ? parseTitledBlocks(doll.core) : [];
  const [bondName, ...bondStats] = doll ? splitLines(doll.bondKey) : [];
  const skins = doll ? splitLines(doll.skins) : [];
  const terms = doll ? parseTerms(doll.terms) : [];
  const voices = doll ? doll.voice.split('/').map(part => part.replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '').trim()).filter(Boolean) : [];
  const otherNames = doll ? splitLines(doll.names).map(line => line.replace(/^[^:]+:\s*/, '')) : [];

  return shell(<>
    <section className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <LazyImage src={gf2Portrait(summary)} alt={`${summary.name} 일러스트`} loading="eager" fetchPriority="high" containerClassName="aspect-[4/5] max-h-[640px] rounded-3xl border border-white/10 bg-[#0e0e0e]" className="h-full w-full object-cover object-top" referrerPolicy="no-referrer" />
      <div>
        <span className="rounded-md border border-orange-400/40 px-1.5 py-0.5 text-[11px] font-bold text-orange-300">{summary.rarity}</span>
        <h1 className="mt-3 text-4xl font-black">{summary.name}</h1>
        {otherNames.length > 0 && <p className="mt-1 text-sm font-semibold text-gray-400">{otherNames.join(' · ')}</p>}
        <dl className="mt-5 grid grid-cols-2 border-t border-white/5 sm:grid-cols-3">
          <div className="border-b border-white/5 py-3"><dt className="text-xs font-bold text-gray-400">직업</dt><dd className="mt-1.5"><Gf2Tag strong icon={gf2JobIcon(summary.job)} label={summary.job} /></dd></div>
          <div className="border-b border-white/5 py-3"><dt className="text-xs font-bold text-gray-400">위상 속성</dt><dd className="mt-1.5"><Gf2Tag strong icon={gf2ElementIcon(summary.element)} label={summary.element} /></dd></div>
          <div className="border-b border-white/5 py-3"><dt className="text-xs font-bold text-gray-400">약점</dt><dd className="mt-1.5 flex flex-wrap gap-3">{summary.weakness ? <>{ammo && <Gf2Tag strong icon={gf2StatIcon(ammo)} label={ammo} />}{weakElement && <Gf2Tag strong icon={gf2ElementIcon(weakElement)} label={weakElement} />}</> : <span className="text-sm text-gray-400">미확인</span>}</dd></div>
        </dl>
        {doll?.description && <p className="mt-5 max-w-[64ch] text-base leading-relaxed text-gray-300">{doll.description}</p>}
        <dl className="mt-5 grid gap-x-6 sm:grid-cols-2">
          {[['소속', summary.affiliation], ['무기', summary.weapon.replace(/\s*\/\s*/, ' · ')], ['모델', doll?.model], ['성우', voices.join(' · ')], ['출시 순서', `${summary.releaseOrder}번째`]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="flex gap-3 border-b border-white/5 py-2.5 text-sm"><dt className="w-16 shrink-0 font-bold text-gray-400">{label}</dt><dd className="text-gray-300">{value}</dd></div>)}
        </dl>
      </div>
    </section>

    {!doll ? <p className="mt-10 text-sm text-gray-400" aria-live="polite">스킬과 육성 정보를 불러오는 중입니다.</p> : <>
      {stats.length > 0 && <Section id="stats" title="기본 능력치">
        <dl className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-[#121212] sm:grid-cols-5">{stats.map(stat => <div key={stat.label} className="border-b border-r border-white/5 px-4 py-3">
          <dt className="flex items-center gap-1.5 text-xs font-bold text-gray-400"><HideOnError src={gf2StatIcon(stat.label)} alt="" className="h-4 w-4" />{stat.label}</dt>
          <dd className="mt-1.5 text-xl font-black tabular-nums">{stat.value}</dd>
        </div>)}</dl>
      </Section>}

      <DetailStickyNav activeColor={ACCENT} className="mt-10" tabs={[{ id: 'skills', label: '스킬' }, { id: 'mind', label: '마인드 보강' }, { id: 'helix', label: '뉴럴 헬릭스' }, { id: 'bond', label: '결합·리몰딩' }, ...(skins.length ? [{ id: 'skins', label: '의상' }] : []), ...(terms.length ? [{ id: 'terms', label: '용어' }] : [])]} />

      <Section id="skills" title="스킬">
        {SKILLS.map(({ key, label, image }) => {
          const [main, ...subs] = parseSkills(String(doll[key] || ''));
          if (!main) return null;
          return <article key={key} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-b border-white/5 py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-orange-400/20 bg-[#181210] sm:h-16 sm:w-16"><HideOnError src={gf2SkillImage(summary, image)} alt="" className="h-9 w-9 sm:h-12 sm:w-12" /></span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-400">{label}</p>
              <h3 className="mt-0.5 flex flex-wrap items-baseline gap-x-3 text-xl font-bold">{main.name}<small className="text-xs font-bold text-gray-400">{main.tags.filter(tag => !GF2_AMMO.includes(tag as typeof GF2_AMMO[number]) && !GF2_ELEMENTS.includes(tag as typeof GF2_ELEMENTS[number])).join(' / ')}</small></h3>
              <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                {main.tags.filter(tag => GF2_AMMO.includes(tag as typeof GF2_AMMO[number])).map(tag => <Gf2Tag key={tag} icon={gf2StatIcon(tag)} label={tag} />)}
                {main.tags.filter(tag => GF2_ELEMENTS.includes(tag as typeof GF2_ELEMENTS[number])).map(tag => <Gf2Tag key={tag} icon={gf2ElementIcon(tag)} label={tag} />)}
                {main.meta.map(meta => META_ICON[meta.label] ? <Gf2Tag key={meta.label} icon={gf2StatIcon(META_ICON[meta.label])} label={`${meta.label} ${meta.value}`} /> : <span key={meta.label} className="text-xs font-semibold text-gray-300">{meta.label} <span className="font-bold text-orange-300">{meta.value}</span></span>)}
              </div>
              <ul className="mt-3 max-w-[75ch] space-y-1.5">{main.lines.map((line, index) => <li key={index} className="text-base leading-relaxed text-gray-300"><Numbered text={line} /></li>)}</ul>
              {subs.length > 0 && <div className="mt-4 space-y-4 border-l-2 border-white/10 pl-4">{subs.map(sub => <div key={sub.name}>
                <p className="text-base font-bold">{sub.name}</p>
                <p className="mt-0.5 text-xs font-bold text-gray-400">{[...sub.tags, ...sub.meta.map(meta => `${meta.label} ${meta.value}`)].join(' · ')}</p>
                {sub.lines.map((line, index) => <p key={index} className="mt-1 max-w-[75ch] text-base leading-relaxed text-gray-300"><Numbered text={line} /></p>)}
              </div>)}</div>}
            </div>
          </article>;
        })}
      </Section>

      <Section id="mind" title="마인드 보강" note="중추 Ⅰ~Ⅵ">
        <ol className="mt-2">{mind.map(block => <li key={block.title} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-white/5 py-4">
          <span className="text-sm font-black text-orange-300">{block.title.replace('중추·', '중추 ')}</span>
          <div><p className="text-base font-bold">{block.lines[0]}</p>{block.lines.slice(1).map((line, index) => <p key={index} className="mt-1 text-base leading-relaxed text-gray-300"><Numbered text={line} /></p>)}</div>
        </li>)}</ol>
      </Section>

      <Section id="helix" title="뉴럴 헬릭스">
        <div className="mt-2 grid gap-x-8 md:grid-cols-2">{helix.map(block => {
          const [kind, keyName] = block.title.split('/').map(part => part.trim());
          const icon = /^고유키 \d-\d{2}$/.test(kind) ? kind : kind === '도약키' ? '도약키' : '';
          return <div key={block.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 border-b border-white/5 py-4">
            {icon ? <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#141414]"><HideOnError src={gf2SkillImage(summary, icon)} alt="" className="h-11 w-11" /></span> : <span className="grid h-12 w-12 place-items-center rounded-xl border border-dashed border-white/10 text-[11px] font-bold text-gray-400">{kind.slice(0, 2)}</span>}
            <div className="min-w-0"><p className="text-xs font-bold text-gray-400">{keyName ? kind : ''}</p><p className="text-base font-bold">{keyName || kind}</p>{block.lines.map((line, index) => <p key={index} className="mt-1 text-base leading-relaxed text-gray-300"><Numbered text={line} /></p>)}</div>
          </div>;
        })}</div>
      </Section>

      <Section id="bond" title="결합키와 리몰딩 코어">
        <div className="mt-4 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold">결합키</h3>
            {bondName ? <><div className="mt-3 flex items-center gap-3"><HideOnError src={gf2SkillImage(summary, '결합키')} alt="" className="h-12 w-12" /><p className="text-lg font-bold">{bondName}</p></div>
              <dl className="mt-2">{bondStats.map(line => { const match = line.match(/^(.+?)\s+([\d.]+%)$/); return <div key={line} className="flex justify-between border-b border-white/5 py-2.5 text-sm"><dt className="text-gray-300">{match ? match[1] : line}</dt><dd className="font-bold tabular-nums">{match ? match[2] : ''}</dd></div>; })}</dl></>
              : <p className="mt-3 text-sm text-gray-400">미확인</p>}
          </div>
          <div>
            <h3 className="text-lg font-bold">리몰딩 코어</h3>
            <dl className="mt-2">{core.map(block => <div key={block.title} className="grid gap-1 border-b border-white/5 py-2.5 text-sm sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-3"><dt className="font-bold text-gray-400">{block.title}</dt><dd className="text-gray-300">{block.lines.map((line, index) => <span key={index} className="block"><Numbered text={line} /></span>)}</dd></div>)}</dl>
          </div>
        </div>
      </Section>

      {skins.length > 0 && <Section id="skins" title="의상" note={`${skins.length}종`}>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">{skins.map((skin, index) => <li key={skin} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
          <div className="aspect-[3/4] bg-[#0f0f0f]"><HideOnError src={index === 0 ? gf2Portrait(summary) : gf2SkillImage(summary, skin)} alt={skin} className="h-full w-full object-cover object-top" /></div>
          <p className="flex justify-between gap-2 px-3 py-2.5 text-sm font-bold">{skin}<span className="text-xs font-semibold text-gray-400">{index === 0 ? '기본' : '추가'}</span></p>
        </li>)}</ul>
      </Section>}

      {terms.length > 0 && <Section id="terms" title="용어" note={`${terms.length}개`}>
        <dl className="mt-2">{terms.map(term => <div key={term.term} className="grid gap-1 border-b border-white/5 py-3.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4"><dt className="text-sm font-bold">{term.term}</dt><dd className="text-base leading-relaxed text-gray-300"><Numbered text={term.description} /></dd></div>)}</dl>
      </Section>}
    </>}
  </>);
};

export default DollDetailGF2;
