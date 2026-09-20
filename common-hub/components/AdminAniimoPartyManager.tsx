import React, { useEffect, useMemo, useState } from 'react';
import { Check, Edit3, Plus, Save, Trash2, Users, X } from 'lucide-react';
import aniimoData from '../../aniimo-hub/data/aniimo.json';
import { ANIIMO_PARTY_RECOMMENDATIONS, normalizeAniimoParty, type AniimoPartyRecommendation } from '../../aniimo-hub/data/parties';
import type { AniimoEntry } from '../../aniimo-hub/types';
import { supabase } from '../lib/supabase';

const entries = aniimoData as AniimoEntry[];
const emptyMember = () => ({ number: '', formKey: 'basic-form', role: '' });
const newParty = (): AniimoPartyRecommendation => ({ id: crypto.randomUUID(), name: '', description: '', category: '범용', tags: [], order: 100, members: [emptyMember(), emptyMember(), emptyMember(), emptyMember()] });
const inputClass = 'h-11 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-violet-400/50';

const AdminAniimoPartyManager: React.FC = () => {
  const [parties, setParties] = useState<AniimoPartyRecommendation[]>([]);
  const [editing, setEditing] = useState<AniimoPartyRecommendation | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = async () => {
    if (!supabase) { setParties(ANIIMO_PARTY_RECOMMENDATIONS); return; }
    const { data, error } = await supabase.from('party_recommendations').select('*').eq('game_id', 'aniimo').order('display_order');
    if (!error && data?.length) setParties(data.map(normalizeAniimoParty));
    else setParties(ANIIMO_PARTY_RECOMMENDATIONS);
  };
  useEffect(() => { void load(); }, []);

  const formOptions = useMemo(() => entries.flatMap(entry => entry.forms.map(form => ({ entry, form, value: `${entry.number}:${form.key}` }))), []);
  const updateMember = (index: number, value: string) => {
    if (!editing) return;
    const [number, formKey] = value.split(':');
    const selected = formOptions.find(option => option.value === value);
    const members = [...editing.members];
    members[index] = { number: number || '', formKey: formKey || 'basic-form', role: members[index]?.role || selected?.form.positions[0] || '' };
    setEditing({ ...editing, members });
  };
  const updateRole = (index: number, role: string) => {
    if (!editing) return;
    const members = [...editing.members];
    members[index] = { ...members[index], role };
    setEditing({ ...editing, members });
  };
  const save = async () => {
    if (!editing?.name.trim() || editing.members.some(member => !member.number)) { setMessage('파티명과 4개 슬롯을 모두 입력해 주세요.'); return; }
    setSaving(true);
    const next = [...parties.filter(party => party.id !== editing.id), editing].sort((a, b) => a.order - b.order);
    if (!supabase) { setSaving(false); setMessage('Supabase 연결을 확인해 주세요.'); return; }
    await supabase.from('party_recommendations').delete().eq('game_id', 'aniimo');
    const { error } = await supabase.from('party_recommendations').insert(next.map((party, index) => ({ game_id: 'aniimo', party_id: party.id, name: party.name, description: party.description, category: party.category, element_synergy: party.category, main_dps: party.members[0]?.number || '', tags: party.tags, pros: [], cons: [], members: party.members, display_order: index + 1, updated_at: new Date().toISOString() })));
    setSaving(false);
    if (error) { setMessage(`저장 실패: ${error.message}`); return; }
    setEditing(null); setMessage('추천 파티를 저장했습니다.'); await load();
  };
  const remove = async (id: string) => {
    const next = parties.filter(party => party.id !== id);
    setParties(next);
    if (supabase) await supabase.from('party_recommendations').delete().eq('game_id', 'aniimo').eq('party_id', id);
    setMessage('추천 파티를 삭제했습니다.');
  };

  return <div className="space-y-6">
    <section className="flex flex-col gap-4 rounded-[32px] border border-violet-400/15 bg-[#111] p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="flex items-center gap-2 text-xl font-black"><Users className="text-violet-300" /> 애니모 파티 추천 관리</h2><p className="mt-2 text-xs text-gray-500">추천 조합을 등록하면 공개 파티 추천 페이지에 바로 반영됩니다.</p></div><button onClick={() => setEditing(newParty())} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-400 px-5 py-3 text-xs font-black text-black"><Plus size={15} /> 추천 파티 등록</button></section>
    {message && <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray-300">{message}</p>}
    <section className="grid gap-4 xl:grid-cols-2">{parties.map(party => <article key={party.id} className="rounded-3xl border border-white/10 bg-[#111] p-6"><div className="flex items-start justify-between gap-4"><div><span className="text-[10px] font-black text-violet-300">{party.category}</span><h3 className="mt-1 text-xl font-black">{party.name}</h3><p className="mt-2 text-xs leading-5 text-gray-500">{party.description}</p></div><div className="flex gap-2"><button onClick={() => setEditing({ ...party, members: party.members.map(member => ({ ...member })) })} className="rounded-lg bg-white/5 p-2 text-gray-300"><Edit3 size={15} /></button><button onClick={() => void remove(party.id)} className="rounded-lg bg-rose-500/10 p-2 text-rose-300"><Trash2 size={15} /></button></div></div><div className="mt-5 grid grid-cols-2 gap-2">{party.members.map((member, index) => { const option = formOptions.find(value => value.entry.number === member.number && value.form.key === member.formKey); return <div key={`${member.number}-${index}`} className="rounded-xl bg-black/30 p-3"><strong className="text-xs">{option?.entry.name || member.number}</strong><p className="mt-1 text-[10px] text-gray-500">{option?.form.label} · {member.role}</p></div>; })}</div></article>)}</section>
    {editing && <div className="fixed inset-0 z-[260] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"><div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/10 bg-[#141414] p-6 sm:p-8"><div className="flex items-center justify-between"><h3 className="text-2xl font-black">추천 파티 편집</h3><button onClick={() => setEditing(null)} className="rounded-xl bg-white/5 p-2"><X size={18} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="파티명"><input value={editing.name} onChange={event => setEditing({ ...editing, name: event.target.value })} className={inputClass} /></Field><Field label="분류"><input value={editing.category} onChange={event => setEditing({ ...editing, category: event.target.value })} className={inputClass} /></Field><Field label="태그 (쉼표 구분)"><input value={editing.tags.join(', ')} onChange={event => setEditing({ ...editing, tags: event.target.value.split(',').map(value => value.trim()).filter(Boolean) })} className={inputClass} /></Field><Field label="정렬 순서"><input type="number" value={editing.order} onChange={event => setEditing({ ...editing, order: Number(event.target.value) })} className={inputClass} /></Field></div><Field label="설명"><textarea value={editing.description} onChange={event => setEditing({ ...editing, description: event.target.value })} className={`${inputClass} mt-2 min-h-24 py-3`} /></Field><div className="mt-6 grid gap-3 sm:grid-cols-2">{Array.from({ length: 4 }, (_, index) => { const member = editing.members[index] || emptyMember(); return <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="text-[10px] font-black text-violet-300">SLOT {index + 1}</span><select value={`${member.number}:${member.formKey}`} onChange={event => updateMember(index, event.target.value)} className={`${inputClass} mt-2`}><option value=":basic-form">애니모 선택</option>{entries.map(entry => <optgroup key={entry.number} label={`NO.${entry.number} ${entry.name}`}>{entry.forms.map(form => <option key={form.key} value={`${entry.number}:${form.key}`}>{form.label} · {form.elements.join('/')}</option>)}</optgroup>)}</select><input value={member.role} onChange={event => updateRole(index, event.target.value)} placeholder="역할" className={`${inputClass} mt-2`} /></div>; })}</div><button disabled={saving} onClick={() => void save()} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-400 px-5 py-4 text-sm font-black text-black disabled:opacity-50">{saving ? <Save size={16} /> : <Check size={16} />}{saving ? '저장 중' : '저장'}</button></div></div>}
  </div>;
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => <label className="block text-xs font-black text-gray-400">{label}<div className="mt-2">{children}</div></label>;
export default AdminAniimoPartyManager;
