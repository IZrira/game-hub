import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { handleImageFallback } from '../../utils/assetManager';
import { isNotionUrl, sanitizePublicGuideText } from '../../utils/publicGuideLinks';
import { GuideEquipmentCard, GuideSectionHeader } from './GuideLayout';

export interface GuideEquipment {
  name: string;
  image?: string;
  to?: string;
  rank?: number;
  note?: string;
  badges?: string[];
  effects?: { label: string; value: string }[];
  alternatives?: { name: string; image?: string; to?: string }[];
  group?: boolean;
}
export interface GuideEquipmentGroup { id?: string; title: string; items: GuideEquipment[]; note?: string }
export interface GuideOption { label: string; values: { value: string; note?: string; rank?: number }[]; note?: string }
// Colon explanations are parsed only in option fields, never equipment names.
export function parseGuideOption(value: string, ranked = false): GuideOption['values'] {
  const separator = value.search(/[:：]/);
  const name = (separator < 0 ? value : value.slice(0, separator)).trim();
  const note = separator < 0 ? undefined : value.slice(separator + 1).trim() || undefined;
  const parts = ranked ? name.split(/\s+or\s+/i).map(item => item.trim()).filter(Boolean) : [name];
  return parts.map((value, index) => ({ value, note, rank: parts.length > 1 ? index + 1 : undefined }));
}
export interface GuideTarget { label: string; value: string; note?: string; conditional?: boolean; description?: boolean }
export interface GuideTargetGroup { label: string; conditional?: boolean; items: GuideTarget[] }
export interface GuidePriority { name: string; detail?: string }
export interface GuideMember { name: string; image?: string; to?: string; details?: string[] }
export interface GuideAnalysisTeam { label: string; slots: GuideMember[][] }
export interface GuideAnalysisGear { name: string; image?: string; to?: string; note?: string; reason: string }
export interface GuideAnalysisTargets { columns: string[]; rows: { label: string; values: string[] }[] }
export interface GuideAnalysisData {
  summary: string;
  metadata?: { label: string; value: string }[];
  strengths?: string[];
  weaknesses?: string[];
  teamPrinciple?: string;
  overview?: string;
  rotation?: string[];
  tips?: string[];
  teams?: GuideAnalysisTeam[];
  gear?: GuideAnalysisGear[];
  targets?: GuideAnalysisTargets;
}

// The earliest action word in a step becomes its label; steps without one stay unlabeled.
const ROTATION_ACTIONS: [string, string][] = [
  ['울티메이트', '울티메이트'], ['바이레일', '바이레일'], ['서포트 스킬', '서포트 스킬'], ['일반 공격', '일반 공격'], ['평타', '일반 공격'], ['평꾹', '일반 공격'],
  ['강공격', '강공격'], ['회피', '회피'], ['교대', '교대'], ['교체', '교대'], ['등장', '교대'], ['필살기', '필살기'], ['전투 스킬', '전투 스킬'],
  // WW words are matched in full so NTE terms such as 「풍미 변주」 do not pick them up.
  ['비술', '비술'], ['공명 해방', '공명 해방'], ['공명 스킬', '공명 스킬'], ['변주 스킬', '변주 스킬'], ['협주 에너지', '협주 에너지'], ['에스퍼 사이클', '에스퍼 사이클'],
];
export function rotationAction(step: string): string | undefined {
  let best: { at: number; label: string } | undefined;
  for (const [word, label] of ROTATION_ACTIONS) {
    const at = step.indexOf(word);
    if (at >= 0 && (!best || at < best.at)) best = { at, label };
  }
  return best?.label;
}

function TeamPortrait({ member }: { member: GuideMember }) {
  const { t } = useTranslation();
  const name = sanitizePublicGuideText(t(member.name));
  const body = <>{member.image && !isNotionUrl(member.image)
    ? <img src={member.image} alt="" loading="lazy" onError={handleImageFallback} />
    : <span className="guide-team-fallback" aria-hidden="true">{name.slice(0, 2)}</span>}<span className="guide-team-name">{name}</span></>;
  return member.to && !isNotionUrl(member.to)
    ? <Link to={member.to} className="guide-team-member">{body}</Link>
    : <span className="guide-team-member">{body}</span>;
}

export function GuidePanel({ title, children, conditional = false, id }: { title: string; children: React.ReactNode; conditional?: boolean; id?: string }) {
  const { t } = useTranslation();
  return <section id={id} className="guide-panel" data-guide-panel>
    <h3 className="guide-panel-title">{conditional && <span className="guide-tag">{t('조건별 목표')}</span>}{sanitizePublicGuideText(t(title))}</h3>
    {children}
  </section>;
}

function EquipmentGroups({ groups }: { groups: GuideEquipmentGroup[] }) {
  return <div className="guide-group-stack">{groups.map((group, index) => <GuidePanel key={index} id={group.id} title={group.title}>
    {group.note && <p className="guide-copy">{sanitizePublicGuideText(group.note)}</p>}
    <div className="guide-equipment-grid">{group.items.map((item, itemIndex) => <GuideEquipmentCard key={itemIndex} {...item} image={item.image || ''} />)}</div>
  </GuidePanel>)}</div>;
}

export function GuidePriorityList({ items, rankLabel = '순위' }: { items: GuidePriority[]; rankLabel?: string }) {
  const { t } = useTranslation();
  return <ol className="guide-priority-list">{items.map((item, index) => <li key={index} className="guide-priority-card">
    <span className="guide-rank">{index + 1}{t(rankLabel)}</span>
    <p className="guide-item-name">{sanitizePublicGuideText(t(item.name))}</p>
    {item.detail && <p className="guide-copy">{sanitizePublicGuideText(t(item.detail))}</p>}
  </li>)}</ol>;
}

export function GuideBuildContent({ primary, sets, setsId, options, subStats, targets, skills = [], awakenings = [], members = [], synergyNote, setupNote, optionNote, notes = [] }: {
  primary: GuideEquipmentGroup[];
  sets: GuideEquipmentGroup[];
  setsId?: string;
  options: GuideOption[];
  subStats: string[];
  targets: GuideTargetGroup[];
  skills?: GuidePriority[];
  awakenings?: GuidePriority[];
  members?: GuideMember[];
  synergyNote?: string;
  setupNote?: string;
  optionNote?: string;
  notes?: string[];
}) {
  const { t } = useTranslation();
  return <>
    <section className="guide-section" data-guide-section="equipment"><GuideSectionHeader num="01" title="추천 장비" /><EquipmentGroups groups={primary} /></section>
    <section id={setsId} className="guide-section" data-guide-section="sets"><GuideSectionHeader num="02" title="세트 세팅" /><EquipmentGroups groups={sets} />{setupNote && <GuidePanel title="세팅 핵심 포인트"><p className="guide-copy">{sanitizePublicGuideText(t(setupNote))}</p></GuidePanel>}</section>
    <section id="권장 스텟" className="guide-section" data-guide-section="stats">
      <GuideSectionHeader num="03" title="옵션과 목표 수치" />
      {optionNote && <p className="guide-copy">{sanitizePublicGuideText(t(optionNote))}</p>}
      <GuidePanel title="주옵션"><div className="guide-option-grid">{options.map((option, index) => <div key={index} className="guide-option-card">
        <h4 className="guide-field-label">{sanitizePublicGuideText(t(option.label))}</h4>
        <ul className="guide-value-list">{option.values.map((item, itemIndex) => <li key={itemIndex}><p className="guide-item-name guide-option-value">{item.rank !== undefined && <span className="guide-rank">{item.rank}순위</span>}{sanitizePublicGuideText(t(item.value))}</p></li>)}</ul>
      </div>)}</div></GuidePanel>
      {options.some(option => option.note || option.values.some(item => item.note)) && <GuidePanel title="선택 조건·설명"><ul className="guide-option-notes">{options.flatMap((option, index) => [
        ...(option.note ? [<li key={`${index}-group`}><h4 className="guide-field-label">{sanitizePublicGuideText(t(option.label))}</h4><p className="guide-copy">{sanitizePublicGuideText(t(option.note))}</p></li>] : []),
        ...option.values.filter(item => item.note).map((item, itemIndex) => <li key={`${index}-${itemIndex}`}><h4 className="guide-field-label">{sanitizePublicGuideText(t(option.label))} — {sanitizePublicGuideText(t(item.value))}</h4><p className="guide-copy">{sanitizePublicGuideText(t(item.note!))}</p></li>),
      ])}</ul></GuidePanel>}
      <GuidePanel title="부옵션 우선순위"><ol className="guide-ranked-list">{subStats.map((stat, index) => <li key={index}><span className="guide-rank">{index + 1}</span><span className="text-sm">{sanitizePublicGuideText(t(stat))}</span></li>)}</ol></GuidePanel>
      {targets.map((group, index) => <GuidePanel key={index} title={group.label} conditional={group.conditional}><div className={group.items.every(item => item.description) ? "guide-target-descriptions" : "guide-target-grid"}>{group.items.map((item, itemIndex) => <div key={itemIndex} className="guide-target-card">
        {item.conditional && <span className="guide-tag">{t('적용 조건')}</span>}
        <p className="guide-field-label">{sanitizePublicGuideText(t(item.label))}</p>
        <p className={item.description ? "guide-copy" : "guide-target-value"}>{sanitizePublicGuideText(t(item.value))}</p>
        {item.note && <p className="guide-copy">{sanitizePublicGuideText(t(item.note))}</p>}
      </div>)}</div></GuidePanel>)}
    </section>
    <section className="guide-section" data-guide-section="priorities"><GuideSectionHeader num="04" title="육성 우선순위" />
      {skills.length > 0 && <GuidePanel id="스킬 육성 우선순위" title="스킬 육성 우선순위"><GuidePriorityList items={skills} /></GuidePanel>}
      {awakenings.length > 0 && <GuidePanel title="각성 우선순위"><GuidePriorityList items={awakenings} /></GuidePanel>}
      {skills.length === 0 && awakenings.length === 0 && <p className="guide-copy">{t('등록된 육성 정보가 없습니다.')}</p>}
    </section>
    <section id="시너지 캐릭터" className="guide-section" data-guide-section="synergy"><GuideSectionHeader num="05" title="시너지 캐릭터" />
      {synergyNote && <GuidePanel title="범용 파티 시너지"><p className="guide-copy">{sanitizePublicGuideText(t(synergyNote))}</p></GuidePanel>}
      <div className="guide-member-grid">{members.map((member, index) => {
        const body = <>{member.image && !isNotionUrl(member.image) && <img src={member.image} alt={sanitizePublicGuideText(member.name)} loading="lazy" onError={handleImageFallback} />}<div className="guide-member-text"><p className="guide-item-name">{sanitizePublicGuideText(t(member.name))}</p>{member.details?.filter(Boolean).map((detail, detailIndex) => <p key={detailIndex} className="guide-copy">{sanitizePublicGuideText(t(detail))}</p>)}</div></>;
        return member.to && !isNotionUrl(member.to) ? <Link key={index} to={member.to} className="guide-member-card">{body}</Link> : <div key={index} className="guide-member-card">{body}</div>;
      })}</div>
      {members.length === 0 && !synergyNote && <p className="guide-copy">{t('등록된 시너지 정보가 없습니다.')}</p>}
    </section>
    {notes.length > 0 && <GuidePanel title="추가 세팅 메모">{notes.map((note, index) => <p key={index} className="guide-copy">{sanitizePublicGuideText(t(note))}</p>)}</GuidePanel>}
  </>;
}

export function GuideViewTabs({ value, onChange, analysisAvailable = true }: { value: 'setup' | 'analysis'; onChange: (value: 'setup' | 'analysis') => void; analysisAvailable?: boolean }) {
  const { t } = useTranslation();
  return <nav aria-label={t('공략 종류 선택')} className="guide-view-tabs">{(['setup', 'analysis'] as const).map(view => <button key={view} type="button" className="guide-choice" aria-pressed={value === view} disabled={view === 'analysis' && !analysisAvailable} title={view === 'analysis' && !analysisAvailable ? t('등록된 분석 가이드가 없습니다.') : undefined} onClick={() => onChange(view)}>{t(view === 'setup' ? '세팅 가이드' : 'RIRA 분석 가이드')}</button>)}</nav>;
}

export function GuideAnalysis({ data }: { data: GuideAnalysisData }) {
  const { t } = useTranslation();
  const list = (items: string[]) => <ul className="guide-value-list">{items.map((item, index) => <li key={index} className="guide-copy">{sanitizePublicGuideText(t(item))}</li>)}</ul>;
  return <section id="RIRA 분석 가이드" className="guide-section" data-guide-section="analysis">
    <GuideSectionHeader num="R" title="RIRA 분석" />
    <GuidePanel title="RIRA 한줄평"><p className="guide-item-name">{sanitizePublicGuideText(t(data.summary))}</p>{data.metadata && <dl className="guide-metadata">{data.metadata.filter(item => item.value).map((item, index) => <div key={index}><dt>{t(item.label)}</dt><dd>{sanitizePublicGuideText(t(item.value))}</dd></div>)}</dl>}</GuidePanel>
    {data.teams?.length ? <GuidePanel title="추천 파티"><ul className="guide-team-list">{data.teams.map((team, index) => <li key={index} className="guide-team-row">
      <p className="guide-field-label">{sanitizePublicGuideText(t(team.label))}</p>
      <ul className="guide-team-slots">{team.slots.map((slot, slotIndex) => <li key={slotIndex} className="guide-team-slot" data-alternatives={slot.length > 1 || undefined}>{slot.map((member, memberIndex) => <React.Fragment key={memberIndex}>
        {memberIndex > 0 && <span className="guide-team-or">{t('또는')}</span>}<TeamPortrait member={member} />
      </React.Fragment>)}</li>)}</ul>
    </li>)}</ul></GuidePanel> : null}
    {data.teamPrinciple && <GuidePanel title="파티 구성 원리"><p className="guide-copy">{sanitizePublicGuideText(t(data.teamPrinciple))}</p></GuidePanel>}
    {data.overview && <GuidePanel title="기본 운용법"><p className="guide-copy">{sanitizePublicGuideText(t(data.overview))}</p></GuidePanel>}
    {data.rotation?.length ? <GuidePanel title="운용 순서"><ol className="guide-step-list">{data.rotation.map((step, index) => {
      const action = rotationAction(step);
      return <li key={index} className="guide-step">
        <p className="guide-step-head"><span className="guide-rank">{index + 1}{t('단계')}</span>{action && <span className="guide-step-action">{t(action)}</span>}</p>
        <p className="guide-copy">{sanitizePublicGuideText(t(step))}</p>
      </li>;
    })}</ol></GuidePanel> : null}
    {data.gear?.length ? <GuidePanel title="장비 선택 근거"><ul className="guide-gear-list">{data.gear.map((item, index) => {
      const icon = item.image && !isNotionUrl(item.image) ? <img src={item.image} alt="" loading="lazy" onError={handleImageFallback} className="guide-gear-icon" /> : <span className="guide-gear-icon" aria-hidden="true" />;
      const name = sanitizePublicGuideText(t(item.name));
      return <li key={index} className="guide-gear-row">{icon}<div className="guide-gear-text">
        <p className="guide-item-name">{item.to && !isNotionUrl(item.to) ? <Link to={item.to} className="guide-gear-link">{name}</Link> : name}{item.note && <span className="guide-gear-note">{sanitizePublicGuideText(t(item.note))}</span>}</p>
        <p className="guide-copy">{sanitizePublicGuideText(t(item.reason))}</p>
      </div></li>;
    })}</ul></GuidePanel> : null}
    {data.targets?.rows.length ? <GuidePanel title="육성 목표"><div className="guide-target-table-wrap"><table className="guide-target-table">
      <thead><tr><th scope="col"><span className="sr-only">{t('단계')}</span></th>{data.targets.columns.map((column, index) => <th key={index} scope="col">{sanitizePublicGuideText(t(column))}</th>)}</tr></thead>
      <tbody>{data.targets.rows.map((row, index) => <tr key={index}><th scope="row">{sanitizePublicGuideText(t(row.label))}</th>{row.values.map((value, valueIndex) => <td key={valueIndex}>{sanitizePublicGuideText(value)}</td>)}</tr>)}</tbody>
    </table></div></GuidePanel> : null}
    <div className="guide-analysis-grid">{data.strengths?.length ? <GuidePanel title="장점">{list(data.strengths)}</GuidePanel> : null}{data.weaknesses?.length ? <GuidePanel title="주의점">{list(data.weaknesses)}</GuidePanel> : null}</div>
    {data.tips?.length ? <GuidePanel title="운용 핵심">{list(data.tips)}</GuidePanel> : null}
  </section>;
}

export function GuideFooter({ message, updatedAt, action }: { message?: string; updatedAt?: string; action?: React.ReactNode }) {
  const { t } = useTranslation();
  return <footer className="guide-footer"><p className="guide-field-label">{t('작성·검수')}: RIRA ARCHIVE</p>{message && <p className="guide-copy">{sanitizePublicGuideText(t(message))}</p>}{updatedAt && <p className="guide-field-label">{t('최종 업데이트')}: {sanitizePublicGuideText(updatedAt)}</p>}{action}</footer>;
}
