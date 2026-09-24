import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, Brain, ChevronLeft, ChevronRight, Compass, ExternalLink, Home, MapPin, Shield, Sparkles, Swords, Target } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import aniimoData from '../data/aniimo.json';
import type { AniimoEntry, AniimoEvolutionNode, AniimoForm, AniimoSkill, AniimoStats } from '../types';
import { getAniimoLocationPath } from '../utils/location';
import { getEvolutionCondition } from '../data/evolutionConditions';
import { ANIIMO_ENGLISH_NAMES, getAniimoEvolutionStage } from '../utils/evolutionStage';
import { ELEMENT_META, getElementMatchups } from '../data/elementChart';
import { getRecommendedPersonality } from '../data/personality';
import { AniimoEvolutionTree } from '../components/AniimoEvolutionTree';

const entries = aniimoData as AniimoEntry[];
const STAT_LABELS: Record<keyof AniimoStats, string> = {
  total: '종합 능력치', hp: 'HP', break: '무력화', attack: '공격력',
  magicDefense: '마법 방어', physicalDefense: '물리 방어', energyRecovery: '에너지 회복'
};
const STAT_MAX: Record<keyof AniimoStats, number> = { total: 600, hp: 150, break: 150, attack: 150, magicDefense: 150, physicalDefense: 150, energyRecovery: 150 };

interface ParsedEvolutionCondition {
  criteria: string[];
  unlocks: string[];
  costs: string[];
}

function parseEvolutionCondition(raw: string): ParsedEvolutionCondition {
  const parts = raw.split(' | ').map(p => p.trim()).filter(Boolean);
  const criteria: string[] = [];
  const unlocks: string[] = [];
  const costs: string[] = [];

  parts.forEach(part => {
    if (part.startsWith('소모:') || part.includes('소모:')) {
      costs.push(part.replace(/^소모:\s*/, '').trim());
    } else if (
      part.includes('레벨 달성') ||
      part.includes('포인트 이상') ||
      part.includes('성격에') ||
      part.includes('습득') ||
      part.includes('보유') ||
      part.includes('평가')
    ) {
      criteria.push(part);
    } else {
      unlocks.push(part);
    }
  });

  return { criteria, unlocks, costs };
}

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
  const evolutionStage = getAniimoEvolutionStage(item, activeForm);
  const englishName = ANIIMO_ENGLISH_NAMES[item.number];
  const elementMatchups = getElementMatchups(displayElements);
  const recommendedPersonality = activeForm ? getRecommendedPersonality(activeForm) : null;
  const activeSkills = skillTab === 'combat' ? displayCombatSkills : displayUniqueSkills;
  const evolutionStages = ['유년기', '성장기', '성숙기'].map(stage => ({ stage, nodes: displayEvolution.filter(node => node.stage === stage) })).filter(group => group.nodes.length > 0);
  const evolutionRequirements = displayEvolution.map(node => ({ node, condition: getEvolutionCondition(node.number, node.formKey) })).filter((value): value is { node: AniimoEvolutionNode; condition: string } => Boolean(value.condition));

  // 연관 애니모 데이터 추출
  const sameElementAniimos = entries.filter(e => e.number !== item.number && e.elements.some(elem => displayElements.includes(elem))).slice(0, 6);
  const samePositionAniimos = entries.filter(e => e.number !== item.number && e.positions.some(pos => displayPositions.includes(pos))).slice(0, 6);
  const sameLocationAniimos = displayLocations.length > 0
    ? entries.filter(e => e.number !== item.number && e.forms.some(f => f.locations.some(loc => displayLocations.includes(loc)))).slice(0, 6)
    : [];

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${item.name} 능력치·스킬·진화 | 애니모 도감`} description={`애니모 ${item.name}(NO.${item.number})의 소개, 종합 능력치, 진화 조건, 출현 지역, 특성, 스킬과 공명 육성 정보를 확인하세요.`} url={`/gallery/aniimo/character/${encodeURIComponent(item.name)}`} gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모 도감', url: '/gallery/aniimo' }, { name: item.name, url: `/gallery/aniimo/character/${encodeURIComponent(item.name)}` }]} />
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
          <div className="flex flex-wrap items-center gap-3"><div className="mr-1"><h1 className="text-4xl sm:text-5xl font-black tracking-tighter">{item.name}</h1><p className="mt-1 text-sm font-bold text-gray-500">{englishName}</p><p className="mt-2 text-xs font-black tracking-[0.16em] text-violet-300">{evolutionStage}</p></div>{displayElements.map(value => <Link key={value} to={`/gallery/aniimo/characters?element=${encodeURIComponent(value)}`}><Badge value={value} accent /></Link>)}{displayPositions.map(value => <Link key={value} to={`/gallery/aniimo/characters?position=${encodeURIComponent(value)}`}><Badge value={value} /></Link>)}</div>
          {item.forms?.length > 1 && <div className="mt-6 flex flex-wrap gap-2"><span className="w-full text-[11px] font-bold text-gray-400 mb-1">형태 변환 (능력치·원소 변경):</span>{item.forms.map(form => <button key={form.key} onClick={() => { setFormKey(form.key); setSearchParams(form.key === item.forms[0]?.key ? {} : { form: form.key }, { replace: true }); }} className={`rounded-xl px-4 py-2 text-xs font-black transition ${activeForm?.key === form.key ? 'bg-violet-400 text-black shadow-lg shadow-violet-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{form.label}</button>)}</div>}
          <div className="mt-7"><h2 className="text-sm font-black text-violet-300">소개</h2><p className="mt-2 text-sm leading-7 text-gray-300">{displayDescription}</p></div>
          <div className="mt-8 space-y-3">{Object.entries(displayStats).map(([key, value]) => { const statKey = key as keyof AniimoStats; const numeric = value ?? 0; return <div key={key} className="grid grid-cols-[90px_1fr_36px] items-center gap-3 text-xs"><span className="font-bold text-gray-400">{STAT_LABELS[statKey]}</span><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${Math.min(100, numeric / STAT_MAX[statKey] * 100)}%` }} /></div><span className="text-right font-black">{value ?? '-'}</span></div>; })}</div>
        </div>
      </section>

      {elementMatchups.length > 0 && <Section title="원소 상성" icon={<Swords size={18} />}><p className="mb-5 text-xs leading-5 text-gray-500">현재 형태의 원소가 공격할 때 유리한 상대와, 방어할 때 받는 약점을 원소별로 표시합니다. 복합 원소는 배율을 합산하지 않습니다.</p><div className="grid gap-4 lg:grid-cols-2">{elementMatchups.map(matchup => <article key={matchup.element} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><h3 className="flex items-center gap-2 font-black"><span className="text-lg">{ELEMENT_META[matchup.element].icon}</span>{matchup.element} 원소</h3><MatchupRow label="공격 우위" values={matchup.strongAgainst} tone="strong" /><MatchupRow label="받는 약점" values={matchup.weakTo} tone="weak" /><MatchupRow label="원소 내성" values={matchup.resists} tone="resist" /></article>)}</div><Link to="/gallery/aniimo/type-chart" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-violet-300 hover:text-white">전체 원소 상성표 보기 <ChevronRight size={14} /></Link></Section>}

      {recommendedPersonality && <Section title="추천 성격" icon={<Brain size={18} />}><div className="grid gap-5 lg:grid-cols-[220px_1fr]"><div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.07] p-5"><p className="text-[10px] font-black tracking-widest text-violet-300">{activeForm?.label} · {recommendedPersonality.position}</p><strong className="mt-2 block text-4xl font-black tracking-[0.18em]">{recommendedPersonality.code}</strong><p className="mt-3 text-xs leading-5 text-gray-400">현재 형태의 포지션과 스킬·특성을 기준으로 계산한 범용 추천입니다.</p></div><div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{recommendedPersonality.traits.map(trait => <article key={`${trait.axis}-${trait.code}`} className="rounded-xl border border-white/10 bg-white/[0.025] p-3"><span className="text-lg font-black text-violet-300">{trait.code}</span><strong className="ml-2 text-sm">{trait.name}</strong><p className="mt-2 text-[11px] leading-5 text-gray-400">{trait.combat}</p></article>)}</div><ul className="mt-4 space-y-2">{recommendedPersonality.reason.map(reason => <li key={reason} className="flex gap-2 text-xs leading-5 text-gray-400"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-300" />{reason}</li>)}</ul></div></div><p className="mt-5 text-[11px] leading-5 text-gray-500">T/F는 상대가 주로 사용하는 물리·마법 피해에 따라 바꾸는 것이 좋습니다.</p><Link to="/gallery/aniimo/personality" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-violet-300 hover:text-white">성격 조합 원리 자세히 보기 <ChevronRight size={14} /></Link></Section>}

      {(item.evolution?.length || 0) > 0 && <Section title="진화 계보 및 조건">
        <p className="mb-4 text-xs text-gray-400">단계별 진화(유년기 → 성장기 → 성숙기) 흐름입니다. 지역에 따른 형태 변환과 구별되며, 조건 충족 시 진화가 해제됩니다.</p>
        <Link to="/gallery/aniimo/guides/evolution-and-forms-guide" className="mb-5 inline-flex items-center gap-2 rounded-xl bg-violet-400/10 px-4 py-2 text-xs font-black text-violet-300 hover:bg-violet-400/15 hover:text-white">진화와 형태 선택 기준 보기 <ChevronRight size={14} /></Link>
        <AniimoEvolutionTree currentName={item.name} currentFormKey={activeForm?.key} nodes={item.evolution || []} />
        {evolutionRequirements.length > 0 && <div className="mt-6 border-t border-white/10 pt-6"><h3 className="flex items-center gap-2 text-sm font-black"><Target size={16} className="text-violet-300" /> 진화 해제 &amp; 기준 상세</h3><div className="mt-4 grid gap-3 lg:grid-cols-2">{evolutionRequirements.map(({ node, condition }) => {
          const parsed = parseEvolutionCondition(condition);
          return <article key={`${node.number}-${node.formKey}`} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <strong className="text-sm font-black text-white">{node.name}</strong>
              {node.formLabel && <span className="rounded-md bg-violet-400/15 px-2 py-0.5 text-[10px] font-black text-violet-300">{node.formLabel}</span>}
            </div>
            {parsed.unlocks.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-black text-violet-400 tracking-wider">[진화 해제]</span>
                <ul className="space-y-1 pl-2">
                  {parsed.unlocks.map((u, i) => <li key={i} className="text-xs text-gray-300 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />{u}</li>)}
                </ul>
              </div>
            )}
            {parsed.criteria.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-black text-cyan-400 tracking-wider">[진화 기준]</span>
                <ul className="space-y-1 pl-2">
                  {parsed.criteria.map((c, i) => <li key={i} className="text-xs text-gray-300 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />{c}</li>)}
                </ul>
              </div>
            )}
            {parsed.costs.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-400 tracking-wider">[소모]</span>
                <ul className="space-y-1 pl-2">
                  {parsed.costs.map((cost, i) => <li key={i} className="text-xs text-amber-300 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />{cost}</li>)}
                </ul>
              </div>
            )}
          </article>;
        })}</div><p className="mt-4 text-[10px] text-gray-600">진화 조건 참고: aniimo.kr / 공식 데이터베이스 · 게임 패치에 따라 업데이트될 수 있습니다.</p></div>}
      </Section>}

      <div className="grid gap-6 md:grid-cols-2">
        {displayLocations.length > 0 && <Section title="출현 지역" icon={<MapPin size={18} />}><div className="flex flex-wrap gap-2">{displayLocations.map(location => <Link key={location} to={getAniimoLocationPath(location)} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-black text-gray-300 transition hover:bg-violet-400/15 hover:text-violet-300">{location}</Link>)}</div></Section>}
        {displayHomeAbilities.length > 0 && <Section title="홈 능력" icon={<Home size={18} />}><div className="grid gap-3 sm:grid-cols-2">{displayHomeAbilities.map((ability, abilityIndex) => <article key={`${ability.type}-${abilityIndex}`} className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-white">{ability.name}</h3><span className="rounded-lg bg-violet-400/15 px-2.5 py-1 text-sm font-black text-violet-300">Lv.{ability.value ?? '-'}</span></div><p className="mt-2 text-xs leading-5 text-gray-400">{ability.description}</p></article>)}</div></Section>}
      </div>

      {displayExplorationSkills.length > 0 && <Section title="탐사 스킬" icon={<Compass size={18} />}><SkillGrid skills={displayExplorationSkills} /></Section>}
      {displayTraits.length > 0 && <Section title="애니모 특성" icon={<Sparkles size={18} />}><SkillGrid skills={displayTraits} /></Section>}
      {(displayCombatSkills.length > 0 || displayUniqueSkills.length > 0) && <Section title="스킬 소개" icon={<Swords size={18} />}><div className="mb-5 flex gap-2"><Tab active={skillTab === 'combat'} onClick={() => setSkillTab('combat')}>전투 스킬</Tab><Tab active={skillTab === 'unique'} onClick={() => setSkillTab('unique')}>고유 스킬</Tab></div><SkillGrid skills={activeSkills} showStats /></Section>}

      {displayResonanceLevels.length > 0 && <Section title="공명 단계 육성"><div className="overflow-x-auto"><table className="w-full min-w-[540px] text-sm"><tbody>{displayResonanceLevels.map(level => <tr key={level.level} className="border-t border-white/10 first:border-0"><td className="p-4 font-black text-violet-300">{level.level}</td><td className="p-4 text-gray-300">{level.requirement}</td><td className="p-4"><span className="flex items-center gap-3">{level.materialImageUrl && <img src={level.materialImageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-8 w-8 object-contain" />}{level.material}</span></td></tr>)}</tbody></table></div></Section>}

      {/* 관련 애니모 탐색 섹션 */}
      {(sameElementAniimos.length > 0 || samePositionAniimos.length > 0) && (
        <Section title="관련 애니모 탐색" icon={<Sparkles size={18} />}>
          <div className="space-y-6">
            {sameElementAniimos.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-violet-300 mb-3">같은 원소 ({displayElements.join(', ')}) 애니모</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {sameElementAniimos.map(related => (
                    <Link key={related.number} to={`/gallery/aniimo/character/${encodeURIComponent(related.name)}`} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center transition hover:border-violet-400/40 hover:bg-white/[0.05]">
                      <div className="aspect-square w-full rounded-xl bg-white/5 p-2 mb-2">
                        {related.imageUrl && <img src={related.imageUrl} alt={related.name} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain group-hover:scale-105 transition" />}
                      </div>
                      <strong className="block text-xs font-black truncate group-hover:text-violet-300">{related.name}</strong>
                      <span className="text-[10px] text-gray-500">NO.{related.number}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {samePositionAniimos.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-3">같은 포지션 ({displayPositions.join(', ')}) 애니모</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {samePositionAniimos.map(related => (
                    <Link key={related.number} to={`/gallery/aniimo/character/${encodeURIComponent(related.name)}`} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center transition hover:border-cyan-400/40 hover:bg-white/[0.05]">
                      <div className="aspect-square w-full rounded-xl bg-white/5 p-2 mb-2">
                        {related.imageUrl && <img src={related.imageUrl} alt={related.name} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain group-hover:scale-105 transition" />}
                      </div>
                      <strong className="block text-xs font-black truncate group-hover:text-cyan-300">{related.name}</strong>
                      <span className="text-[10px] text-gray-500">NO.{related.number}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {sameLocationAniimos.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-3">같은 서식 지역 애니모</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {sameLocationAniimos.map(related => (
                    <Link key={related.number} to={`/gallery/aniimo/character/${encodeURIComponent(related.name)}`} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center transition hover:border-emerald-400/40 hover:bg-white/[0.05]">
                      <div className="aspect-square w-full rounded-xl bg-white/5 p-2 mb-2">
                        {related.imageUrl && <img src={related.imageUrl} alt={related.name} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain group-hover:scale-105 transition" />}
                      </div>
                      <strong className="block text-xs font-black truncate group-hover:text-emerald-300">{related.name}</strong>
                      <span className="text-[10px] text-gray-500">NO.{related.number}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"><Link to="/gallery/aniimo" className="inline-flex items-center gap-2 font-bold hover:text-white"><ArrowLeft size={15} /> 애니모 도감으로 돌아가기</Link><div><span>마지막 확인일 {item.checkedAt}</span><a href={activeForm?.sourceUrl || item.sourceUrl} target="_blank" rel="noreferrer" className="ml-4 inline-flex items-center gap-1 text-violet-300 hover:text-white">공식 출처 <ExternalLink size={12} /></a></div></footer>
    </main>
  </div>;
};

const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"><h2 className="flex items-center gap-2 border-b border-white/10 px-6 py-4 text-lg font-black">{icon && <span className="text-violet-300">{icon}</span>}{title}</h2><div className="p-6">{children}</div></section>;

const SkillGrid = ({ skills, showStats = false }: { skills: AniimoSkill[]; showStats?: boolean }) => <div className="grid gap-4 md:grid-cols-2">{skills.map((skill, index) => <article key={`${skill.name}-${index}`} className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4">{skill.imageUrl && <img src={skill.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-16 w-16 shrink-0 rounded-full bg-[#252531] object-contain p-1" />}<div><h3 className="font-black">{skill.name}</h3><p className="mt-2 text-xs leading-6 text-gray-400">{skill.description}</p>{showStats && <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-gray-300">{skill.skillType && <span>{skill.skillType}</span>}<span>에너지 {skill.energyCost ?? '-'}</span><span>위력 {skill.power ?? '-'}</span></div>}</div></article>)}</div>;
const Tab = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => <button onClick={onClick} className={`rounded-xl px-4 py-2 text-xs font-black ${active ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400'}`}>{children}</button>;
const Badge = ({ value, accent = false }: { value: string; accent?: boolean }) => <span className={`rounded-lg px-3 py-1.5 text-xs font-black ${accent ? 'bg-violet-400/15 text-violet-300' : 'bg-white/5 text-gray-300'}`}>{value}</span>;
const MatchupRow = ({ label, values, tone }: { label: string; values: Array<keyof typeof ELEMENT_META>; tone: 'strong' | 'weak' | 'resist' }) => <div className="mt-4 grid grid-cols-[72px_1fr] items-start gap-3"><span className={`inline-flex items-center gap-1 text-[10px] font-black ${tone === 'weak' ? 'text-rose-300' : tone === 'strong' ? 'text-emerald-300' : 'text-cyan-300'}`}>{tone === 'weak' && <Shield size={12} />}{label}</span><div className="flex flex-wrap gap-1.5">{values.map(value => <span key={value} className="rounded-lg bg-white/5 px-2 py-1 text-[10px] font-bold text-gray-300">{ELEMENT_META[value].icon} {value}</span>)}</div></div>;
export default CharacterDetailAniimo;
