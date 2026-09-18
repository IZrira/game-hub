import React, { useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Compass, ExternalLink, Home, MapPin, Sparkles, Swords } from 'lucide-react';
import { Link, useParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry, AniimoForm, AniimoSkill, AniimoStats } from '../types';

const entries = aniimoData as AniimoEntry[];
const STAT_LABELS: Record<keyof AniimoStats, string> = {
  total: '종합 속성', hp: 'HP', break: '무력화', attack: '공격',
  magicDefense: '마법 방어', physicalDefense: '물리 방어', energyRecovery: '에너지 회복'
};
const STAT_MAX: Record<keyof AniimoStats, number> = { total: 600, hp: 150, break: 150, attack: 150, magicDefense: 150, physicalDefense: 150, energyRecovery: 150 };

const CharacterDetailAniimo: React.FC = () => {
  const { charName = '' } = useParams<{ charName: string }>();
  const item = entries.find(entry => entry.name === decodeURIComponent(charName));
  const [skillTab, setSkillTab] = useState<'combat' | 'unique'>('combat');
  const [formKey, setFormKey] = useState(item?.forms?.[0]?.key || 'basic-form');
  const index = item ? entries.findIndex(entry => entry.number === item.number) : -1;
  const previous = index >= 0 ? entries[(index - 1 + entries.length) % entries.length] : null;
  const next = index >= 0 ? entries[(index + 1) % entries.length] : null;
  const related = useMemo(() => item ? entries.filter(entry => entry.number !== item.number && entry.elements.some(value => item.elements.includes(value))).slice(0, 6) : [], [item]);

  if (!item) return <main className="min-h-[70vh] bg-[#0a0a0a] px-6 py-24 text-center text-white"><h1 className="text-3xl font-black">애니모를 찾을 수 없습니다.</h1><Link to="/gallery/aniimo" className="mt-6 inline-block text-violet-300">도감으로 돌아가기</Link></main>;
  const activeSkills = skillTab === 'combat' ? item.combatSkills : item.uniqueSkills;
  const activeForm: AniimoForm | undefined = item.forms?.find(form => form.key === formKey) || item.forms?.[0];
  const displayImage = activeForm?.imageUrl || item.imageUrl;
  const displayDescription = activeForm?.description || item.description;
  const displayStats = activeForm?.stats || item.stats;
  const evolutionStages = ['유년기', '성장기', '성숙기'].map(stage => ({ stage, nodes: item.evolution.filter(node => node.stage === stage) })).filter(group => group.nodes.length > 0);

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${item.name} 능력치·스킬·진화 | 애니모 도감`} description={`애니모 ${item.name}(NO.${item.number})의 소개, 능력치, 진화, 출현 지역, 특성, 스킬과 공명 육성 정보를 확인하세요.`} url={`/gallery/aniimo/character/${encodeURIComponent(item.name)}`} gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모 도감', url: '/gallery/aniimo' }, { name: item.name, url: `/gallery/aniimo/character/${encodeURIComponent(item.name)}` }]} />
    <PageHeader gameId="aniimo" category="캐릭터" categoryUrl="/gallery/aniimo" title={item.name} />
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-6">
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-white/10 bg-[#17171d] px-3 py-2">
        {previous && <Link to={`/gallery/aniimo/character/${encodeURIComponent(previous.name)}`} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white"><ChevronLeft size={18} /><span className="hidden sm:inline">{previous.name}</span></Link>}
        <span className="text-lg font-black tracking-wider">NO.{item.number}</span>
        {next && <Link to={`/gallery/aniimo/character/${encodeURIComponent(next.name)}`} className="flex items-center justify-end gap-2 text-xs font-bold text-gray-400 hover:text-white"><span className="hidden sm:inline">{next.name}</span><ChevronRight size={18} /></Link>}
      </nav>

      <section className="grid overflow-hidden rounded-[32px] border border-white/10 bg-[#121212] lg:grid-cols-[minmax(0,430px)_1fr]">
        <div className="relative min-h-[360px] bg-gradient-to-br from-violet-500/20 via-cyan-400/5 to-transparent p-8"><span className="absolute left-5 top-5 text-xs font-black italic tracking-[0.25em] text-white/30">NO.{item.number}</span>{displayImage && <img src={displayImage} alt={`${item.name} ${activeForm?.label || ''} 이미지`} referrerPolicy="no-referrer" className="h-full max-h-[460px] w-full object-contain" />}</div>
        <div className="p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3"><h1 className="text-4xl sm:text-5xl font-black tracking-tighter">{item.name}</h1>{item.elements.map(value => <Badge key={value} value={value} accent />)}{item.positions.map(value => <Badge key={value} value={value} />)}</div>
          {item.forms?.length > 1 && <div className="mt-6 flex flex-wrap gap-2">{item.forms.map(form => <button key={form.key} onClick={() => setFormKey(form.key)} className={`rounded-xl px-4 py-2 text-xs font-black ${activeForm?.key === form.key ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{form.label}</button>)}</div>}
          <div className="mt-7"><h2 className="text-sm font-black text-violet-300">소개</h2><p className="mt-2 text-sm leading-7 text-gray-300">{displayDescription}</p></div>
          <div className="mt-8 space-y-3">{Object.entries(displayStats).map(([key, value]) => { const statKey = key as keyof AniimoStats; const numeric = value ?? 0; return <div key={key} className="grid grid-cols-[90px_1fr_36px] items-center gap-3 text-xs"><span className="font-bold text-gray-400">{STAT_LABELS[statKey]}</span><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${Math.min(100, numeric / STAT_MAX[statKey] * 100)}%` }} /></div><span className="text-right font-black">{value ?? '-'}</span></div>; })}</div>
        </div>
      </section>

      {evolutionStages.length > 0 && <Section title="진화 계보"><div className="flex min-w-max items-center gap-5 overflow-x-auto py-4">{evolutionStages.map((group, groupIndex) => <React.Fragment key={group.stage}><div className="grid gap-4">{group.nodes.map((node, nodeIndex) => <div key={`${node.imageUrl}-${nodeIndex}`} className="min-w-28 text-center"><div className="mx-auto h-24 w-24 rounded-2xl border border-white/10 bg-white/5 p-2">{node.imageUrl && <img src={node.imageUrl} alt={`${node.stage} 형태`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain" />}</div><span className="mt-2 inline-block rounded-full bg-violet-400/10 px-3 py-1 text-[10px] font-black text-violet-300">{node.stage}</span></div>)}</div>{groupIndex < evolutionStages.length - 1 && <div className="flex flex-col items-center gap-1 text-gray-600"><ChevronRight size={28} />{evolutionStages[groupIndex + 1].nodes.length > 1 && <span className="text-[9px] font-black text-violet-300">{evolutionStages[groupIndex + 1].nodes.length}가지 분기</span>}</div>}</React.Fragment>)}</div></Section>}

      <div className="grid gap-6 md:grid-cols-2">
        {item.locations.length > 0 && <Section title="출현 지역" icon={<MapPin size={18} />}><div className="flex flex-wrap gap-2">{item.locations.map(location => <Badge key={location} value={location} />)}</div></Section>}
        {item.homeAbilities.length > 0 && <Section title="홈 능력" icon={<Home size={18} />}><div className="flex flex-wrap gap-3">{item.homeAbilities.map((ability, abilityIndex) => <div key={`${ability.type}-${abilityIndex}`} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"><p className="text-[10px] font-bold text-gray-500">능력 {ability.type}</p><p className="text-lg font-black text-violet-300">Lv.{ability.value ?? '-'}</p></div>)}</div></Section>}
      </div>

      {item.explorationSkills.length > 0 && <Section title="탐사 스킬" icon={<Compass size={18} />}><SkillGrid skills={item.explorationSkills} /></Section>}
      {item.traits.length > 0 && <Section title="애니모 특성" icon={<Sparkles size={18} />}><SkillGrid skills={item.traits} /></Section>}
      {(item.combatSkills.length > 0 || item.uniqueSkills.length > 0) && <Section title="스킬 소개" icon={<Swords size={18} />}><div className="mb-5 flex gap-2"><Tab active={skillTab === 'combat'} onClick={() => setSkillTab('combat')}>전투 스킬</Tab><Tab active={skillTab === 'unique'} onClick={() => setSkillTab('unique')}>고유 스킬</Tab></div><SkillGrid skills={activeSkills} showStats /></Section>}

      {item.resonanceLevels.length > 0 && <Section title="공명 단계 육성"><div className="overflow-x-auto"><table className="w-full min-w-[540px] text-sm"><tbody>{item.resonanceLevels.map(level => <tr key={level.level} className="border-t border-white/10 first:border-0"><td className="p-4 font-black text-violet-300">{level.level}</td><td className="p-4 text-gray-300">{level.requirement}</td><td className="p-4"><span className="flex items-center gap-3">{level.materialImageUrl && <img src={level.materialImageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-8 w-8 object-contain" />}{level.material}</span></td></tr>)}</tbody></table></div></Section>}

      {related.length > 0 && <Section title="같은 원소 애니모"><div className="grid grid-cols-3 sm:grid-cols-6 gap-3">{related.map(entry => <Link key={entry.number} to={`/gallery/aniimo/character/${encodeURIComponent(entry.name)}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center hover:border-violet-400/40">{entry.imageUrl && <img src={entry.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="aspect-square w-full object-contain" />}<span className="text-xs font-black">{entry.name}</span></Link>)}</div></Section>}

      <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"><Link to="/gallery/aniimo" className="inline-flex items-center gap-2 font-bold hover:text-white"><ArrowLeft size={15} /> 애니모 도감으로 돌아가기</Link><div><span>마지막 확인일 {item.checkedAt}</span><a href={item.sourceUrl} target="_blank" rel="noreferrer" className="ml-4 inline-flex items-center gap-1 text-violet-300 hover:text-white">공식 출처 <ExternalLink size={12} /></a></div></footer>
    </main>
  </div>;
};

const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"><h2 className="flex items-center gap-2 border-b border-white/10 px-6 py-4 text-lg font-black">{icon && <span className="text-violet-300">{icon}</span>}{title}</h2><div className="p-6">{children}</div></section>;
const SkillGrid = ({ skills, showStats = false }: { skills: AniimoSkill[]; showStats?: boolean }) => <div className="grid gap-4 md:grid-cols-2">{skills.map((skill, index) => <article key={`${skill.name}-${index}`} className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4">{skill.imageUrl && <img src={skill.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-16 w-16 shrink-0 rounded-full bg-[#252531] object-contain p-1" />}<div><h3 className="font-black">{skill.name}</h3><p className="mt-2 text-xs leading-6 text-gray-400">{skill.description}</p>{showStats && <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-gray-300">{skill.skillType && <span>{skill.skillType}</span>}<span>에너지 {skill.energyCost ?? '-'}</span><span>위력 {skill.power ?? '-'}</span></div>}</div></article>)}</div>;
const Tab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => <button onClick={onClick} className={`rounded-xl px-4 py-2 text-xs font-black ${active ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400'}`}>{children}</button>;
const Badge = ({ value, accent = false }: { value: string; accent?: boolean }) => <span className={`rounded-lg px-3 py-1.5 text-xs font-black ${accent ? 'bg-violet-400/15 text-violet-300' : 'bg-white/5 text-gray-300'}`}>{value}</span>;
export default CharacterDetailAniimo;
