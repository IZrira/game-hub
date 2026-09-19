import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ChevronLeft, ChevronRight, Compass, ExternalLink, Home, MapPin, Sparkles, Swords, Target } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry, AniimoEvolutionNode, AniimoForm, AniimoSkill, AniimoStats } from '../types';
import { getAniimoLocationPath } from '../utils/location';
import { getEvolutionCondition } from '../data/evolutionConditions';

const entries = aniimoData as AniimoEntry[];
const STAT_LABELS: Record<keyof AniimoStats, string> = {
  total: '종합 속성', hp: 'HP', break: '무력화', attack: '공격',
  magicDefense: '마법 방어', physicalDefense: '물리 방어', energyRecovery: '에너지 회복'
};
const STAT_MAX: Record<keyof AniimoStats, number> = { total: 600, hp: 150, break: 150, attack: 150, magicDefense: 150, physicalDefense: 150, energyRecovery: 150 };

const CharacterDetailAniimo: React.FC = () => {
  const { charName = '' } = useParams<{ charName: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const item = entries.find(entry => entry.name === decodeURIComponent(charName));
  const requestedFormKey = searchParams.get('form');
  const [skillTab, setSkillTab] = useState<'combat' | 'unique'>('combat');
  const [formKey, setFormKey] = useState(requestedFormKey || item?.forms?.[0]?.key || 'basic-form');
  const index = item ? entries.findIndex(entry => entry.number === item.number) : -1;
  const previous = index >= 0 ? entries[(index - 1 + entries.length) % entries.length] : null;
  const next = index >= 0 ? entries[(index + 1) % entries.length] : null;
  useEffect(() => {
    setFormKey(item?.forms?.some(form => form.key === requestedFormKey) ? requestedFormKey! : item?.forms?.[0]?.key || 'basic-form');
    setSkillTab('combat');
  }, [item?.number, requestedFormKey]);
  if (!item) return <main className="min-h-[70vh] bg-[#0a0a0a] px-6 py-24 text-center text-white"><h1 className="text-3xl font-black">애니모를 찾을 수 없습니다.</h1><Link to="/gallery/aniimo" className="mt-6 inline-block text-violet-300">도감으로 돌아가기</Link></main>;
  const activeForm: AniimoForm | undefined = item.forms?.find(form => form.key === formKey) || item.forms?.[0];
  const displayImage = activeForm?.imageUrl || item.imageUrl;
  const displayDescription = activeForm?.description || item.description;
  const displayStats = activeForm?.stats || item.stats;
  const displayElements = activeForm?.elements?.length ? activeForm.elements : item.elements;
  const displayPositions = activeForm?.positions?.length ? activeForm.positions : item.positions;
  const displayLocations = activeForm?.locations || item.locations;
  const displayHomeAbilities = activeForm?.homeAbilities || item.homeAbilities;
  const displayExplorationSkills = activeForm?.explorationSkills || item.explorationSkills;
  const displayTraits = activeForm?.traits || item.traits;
  const displayCombatSkills = activeForm?.combatSkills || item.combatSkills;
  const displayUniqueSkills = activeForm?.uniqueSkills || item.uniqueSkills;
  const displayEvolution = activeForm?.evolution || item.evolution;
  const displayResonanceLevels = activeForm?.resonanceLevels || item.resonanceLevels;
  const activeSkills = skillTab === 'combat' ? displayCombatSkills : displayUniqueSkills;
  const evolutionStages = ['유년기', '성장기', '성숙기'].map(stage => ({ stage, nodes: displayEvolution.filter(node => node.stage === stage) })).filter(group => group.nodes.length > 0);
  const evolutionRequirements = displayEvolution.map(node => ({ node, condition: getEvolutionCondition(node.number) })).filter((value): value is { node: AniimoEvolutionNode; condition: string } => Boolean(value.condition));

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
          <div className="flex flex-wrap items-center gap-3"><h1 className="text-4xl sm:text-5xl font-black tracking-tighter">{item.name}</h1>{displayElements.map(value => <Badge key={value} value={value} accent />)}{displayPositions.map(value => <Badge key={value} value={value} />)}</div>
          {item.forms?.length > 1 && <div className="mt-6 flex flex-wrap gap-2">{item.forms.map(form => <button key={form.key} onClick={() => { setFormKey(form.key); setSearchParams(form.key === item.forms[0]?.key ? {} : { form: form.key }, { replace: true }); }} className={`rounded-xl px-4 py-2 text-xs font-black ${activeForm?.key === form.key ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{form.label}</button>)}</div>}
          <div className="mt-7"><h2 className="text-sm font-black text-violet-300">소개</h2><p className="mt-2 text-sm leading-7 text-gray-300">{displayDescription}</p></div>
          <div className="mt-8 space-y-3">{Object.entries(displayStats).map(([key, value]) => { const statKey = key as keyof AniimoStats; const numeric = value ?? 0; return <div key={key} className="grid grid-cols-[90px_1fr_36px] items-center gap-3 text-xs"><span className="font-bold text-gray-400">{STAT_LABELS[statKey]}</span><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${Math.min(100, numeric / STAT_MAX[statKey] * 100)}%` }} /></div><span className="text-right font-black">{value ?? '-'}</span></div>; })}</div>
        </div>
      </section>

      {evolutionStages.length > 0 && <Section title="진화 계보"><div className="md:hidden">{evolutionStages.map((group, groupIndex) => <React.Fragment key={group.stage}><EvolutionStage stage={group.stage} nodes={group.nodes} currentName={item.name} currentFormKey={activeForm?.key} />{groupIndex < evolutionStages.length - 1 && <div className="flex flex-col items-center py-3 text-violet-300"><ArrowDown size={22} />{evolutionStages[groupIndex + 1].nodes.length > 1 && <span className="mt-1 text-[10px] font-black">{evolutionStages[groupIndex + 1].nodes.length}가지로 분기</span>}</div>}</React.Fragment>)}</div><div className="hidden items-center justify-center overflow-x-auto py-4 md:flex">{evolutionStages.map((group, groupIndex) => <React.Fragment key={group.stage}><EvolutionStage stage={group.stage} nodes={group.nodes} currentName={item.name} currentFormKey={activeForm?.key} />{groupIndex < evolutionStages.length - 1 && <div className="flex w-20 shrink-0 flex-col items-center"><div className="flex w-full items-center"><span className="h-px flex-1 bg-gradient-to-r from-violet-400/30 to-violet-400" /><ChevronRight size={22} className="-ml-1 text-violet-300" /></div>{evolutionStages[groupIndex + 1].nodes.length > 1 && <span className="mt-2 text-[10px] font-black text-violet-300">{evolutionStages[groupIndex + 1].nodes.length}가지 분기</span>}</div>}</React.Fragment>)}</div>{evolutionRequirements.length > 0 && <div className="mt-6 border-t border-white/10 pt-6"><h3 className="flex items-center gap-2 text-sm font-black"><Target size={16} className="text-violet-300" /> 진화 조건</h3><div className="mt-4 grid gap-3 lg:grid-cols-2">{evolutionRequirements.map(({ node, condition }) => <article key={`${node.number}-${node.formKey}`} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="flex items-center gap-3"><strong>{node.name}</strong>{node.formLabel && <span className="rounded-md bg-violet-400/10 px-2 py-1 text-[9px] font-black text-violet-300">{node.formLabel}</span>}</div><ul className="mt-3 space-y-2">{condition.split(' | ').map(part => <li key={part} className="flex gap-2 text-xs leading-5 text-gray-400"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-300" />{part}</li>)}</ul></article>)}</div><p className="mt-4 text-[10px] text-gray-600">진화 조건 참고: aniimo.kr · 게임 업데이트에 따라 변경될 수 있습니다.</p></div>}</Section>}

      <div className="grid gap-6 md:grid-cols-2">
        {displayLocations.length > 0 && <Section title="출현 지역" icon={<MapPin size={18} />}><div className="flex flex-wrap gap-2">{displayLocations.map(location => <Link key={location} to={getAniimoLocationPath(location)} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-black text-gray-300 transition hover:bg-violet-400/15 hover:text-violet-300">{location}</Link>)}</div></Section>}
        {displayHomeAbilities.length > 0 && <Section title="홈 능력" icon={<Home size={18} />}><div className="grid gap-3 sm:grid-cols-2">{displayHomeAbilities.map((ability, abilityIndex) => <article key={`${ability.type}-${abilityIndex}`} className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-white">{ability.name}</h3><span className="rounded-lg bg-violet-400/15 px-2.5 py-1 text-sm font-black text-violet-300">Lv.{ability.value ?? '-'}</span></div><p className="mt-2 text-xs leading-5 text-gray-400">{ability.description}</p></article>)}</div></Section>}
      </div>

      {displayExplorationSkills.length > 0 && <Section title="탐사 스킬" icon={<Compass size={18} />}><SkillGrid skills={displayExplorationSkills} /></Section>}
      {displayTraits.length > 0 && <Section title="애니모 특성" icon={<Sparkles size={18} />}><SkillGrid skills={displayTraits} /></Section>}
      {(displayCombatSkills.length > 0 || displayUniqueSkills.length > 0) && <Section title="스킬 소개" icon={<Swords size={18} />}><div className="mb-5 flex gap-2"><Tab active={skillTab === 'combat'} onClick={() => setSkillTab('combat')}>전투 스킬</Tab><Tab active={skillTab === 'unique'} onClick={() => setSkillTab('unique')}>고유 스킬</Tab></div><SkillGrid skills={activeSkills} showStats /></Section>}

      {displayResonanceLevels.length > 0 && <Section title="공명 단계 육성"><div className="overflow-x-auto"><table className="w-full min-w-[540px] text-sm"><tbody>{displayResonanceLevels.map(level => <tr key={level.level} className="border-t border-white/10 first:border-0"><td className="p-4 font-black text-violet-300">{level.level}</td><td className="p-4 text-gray-300">{level.requirement}</td><td className="p-4"><span className="flex items-center gap-3">{level.materialImageUrl && <img src={level.materialImageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-8 w-8 object-contain" />}{level.material}</span></td></tr>)}</tbody></table></div></Section>}

      <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"><Link to="/gallery/aniimo" className="inline-flex items-center gap-2 font-bold hover:text-white"><ArrowLeft size={15} /> 애니모 도감으로 돌아가기</Link><div><span>마지막 확인일 {item.checkedAt}</span><a href={activeForm?.sourceUrl || item.sourceUrl} target="_blank" rel="noreferrer" className="ml-4 inline-flex items-center gap-1 text-violet-300 hover:text-white">공식 출처 <ExternalLink size={12} /></a></div></footer>
    </main>
  </div>;
};

const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"><h2 className="flex items-center gap-2 border-b border-white/10 px-6 py-4 text-lg font-black">{icon && <span className="text-violet-300">{icon}</span>}{title}</h2><div className="p-6">{children}</div></section>;
const EvolutionStage = ({ stage, nodes, currentName, currentFormKey }: { stage: string; nodes: AniimoEvolutionNode[]; currentName: string; currentFormKey?: string }) => <div className="shrink-0"><h3 className="mb-3 text-center text-xs font-black text-gray-400">{stage}</h3><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-1">{nodes.map((node, index) => <EvolutionCard key={`${node.imageUrl}-${index}`} node={node} current={node.name === currentName && node.formKey === currentFormKey} />)}</div></div>;
const EvolutionCard = ({ node, current }: { node: AniimoEvolutionNode; current: boolean }) => {
  const content = <><div className={`mx-auto h-24 w-24 rounded-2xl border p-2 transition ${current ? 'border-violet-300 bg-violet-400/15 shadow-[0_0_24px_rgba(167,139,250,0.22)]' : 'border-white/10 bg-white/5'}`}>{node.imageUrl && <img src={node.imageUrl} alt={`${node.name || node.stage} 이미지`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain" />}</div><strong className={`mt-2 block text-sm ${current ? 'text-violet-300' : 'text-white'}`}>{node.name || `${node.stage} 중간 형태`}</strong><span className="mt-1 block text-[10px] font-bold text-gray-500">{node.formLabel || (node.name ? '기본 형태' : '상세 정보 미공개')}{current ? ' · 현재' : ''}</span></>;
  return node.name ? <Link to={`/gallery/aniimo/character/${encodeURIComponent(node.name)}${node.formKey && node.formKey !== 'basic-form' ? `?form=${encodeURIComponent(node.formKey)}` : ''}`} className="min-w-28 rounded-2xl p-2 text-center transition hover:bg-white/5" aria-current={current ? 'page' : undefined}>{content}</Link> : <div className="min-w-28 p-2 text-center">{content}</div>;
};
const SkillGrid = ({ skills, showStats = false }: { skills: AniimoSkill[]; showStats?: boolean }) => <div className="grid gap-4 md:grid-cols-2">{skills.map((skill, index) => <article key={`${skill.name}-${index}`} className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4">{skill.imageUrl && <img src={skill.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-16 w-16 shrink-0 rounded-full bg-[#252531] object-contain p-1" />}<div><h3 className="font-black">{skill.name}</h3><p className="mt-2 text-xs leading-6 text-gray-400">{skill.description}</p>{showStats && <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-gray-300">{skill.skillType && <span>{skill.skillType}</span>}<span>에너지 {skill.energyCost ?? '-'}</span><span>위력 {skill.power ?? '-'}</span></div>}</div></article>)}</div>;
const Tab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => <button onClick={onClick} className={`rounded-xl px-4 py-2 text-xs font-black ${active ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400'}`}>{children}</button>;
const Badge = ({ value, accent = false }: { value: string; accent?: boolean }) => <span className={`rounded-lg px-3 py-1.5 text-xs font-black ${accent ? 'bg-violet-400/15 text-violet-300' : 'bg-white/5 text-gray-300'}`}>{value}</span>;
export default CharacterDetailAniimo;
