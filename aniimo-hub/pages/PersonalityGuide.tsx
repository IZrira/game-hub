import React, { useState } from 'react';
import { Brain, ChevronRight, ExternalLink, Home, RefreshCw, Shield, Sparkles, Swords } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AniimoMobileNav, AniimoSidebar } from '../components/AniimoNavigation';

const traits = [
  { axis: 'E / I', code: 'E', name: '애착', combat: '공격 2% · 무력화 2%', use: '공격과 무력화를 함께 올리는 전투형 선택' },
  { axis: 'E / I', code: 'I', name: '낯가림', combat: '에너지 회복 4%', use: '스킬 순환과 에너지 수급이 중요한 경우' },
  { axis: 'S / N', code: 'S', name: '현실', combat: '피해 4%', use: '조건 없이 안정적인 피해 증가' },
  { axis: 'S / N', code: 'N', name: '영감', combat: '치명타율 5%', use: '스킬·특성에 치명타 연계가 있는 경우' },
  { axis: 'T / F', code: 'T', name: '냉정', combat: '물리 방어 6%', use: '물리 피해가 위협적인 콘텐츠' },
  { axis: 'T / F', code: 'F', name: '배려', combat: '마법 방어 6%', use: '마법 피해가 위협적인 콘텐츠' },
  { axis: 'J / P', code: 'J', name: '순종', combat: 'HP 4%', use: '회복량·보호막·전체 생존력을 높일 때' },
  { axis: 'J / P', code: 'P', name: '배려', combat: '피해 감소 4%', use: '받는 피해를 직접 줄이고 싶을 때' },
];

const presets = [
  { id: 'damage', label: '일반 딜러', code: 'ESTJ', summary: '공격·피해·물리 방어·HP를 고르게 챙기는 범용 조합입니다.' },
  { id: 'critical', label: '치명타 딜러', code: 'ENTJ', summary: '스킬이나 특성에 치명타 관련 효과가 있을 때 N을 선택합니다.' },
  { id: 'break', label: '무력화', code: 'ISTP', summary: '에너지 순환과 안정적인 피해, 물리 방어와 피해 감소를 중시합니다.' },
  { id: 'cycle', label: '에너지·지원', code: 'ISTJ', summary: '에너지 회복과 안정적인 생존을 우선하는 지원형 기준입니다.' },
];

const PersonalityGuideAniimo: React.FC = () => {
  const [presetId, setPresetId] = useState('damage');
  const preset = presets.find(value => value.id === presetId) || presets[0];
  const selectedTraits = preset.code.split('').map(code => traits.find(trait => trait.code === code)).filter(Boolean);

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title="애니모 성격 추천·MBTI 효과 | 전투·홈 공략" description="애니모 성격 8종의 전투 보너스와 E/I·S/N·T/F·J/P 선택법, 딜러·치명타·무력화·지원 역할별 추천 성격을 확인하세요." url="/gallery/aniimo/personality" gameCategory="애니모" breadcrumbData={[{ name: '홈', url: '/' }, { name: '애니모', url: '/gallery/aniimo' }, { name: '성격 공략', url: '/gallery/aniimo/personality' }]} />
    <PageHeader gameId="aniimo" category="공략" categoryUrl="/gallery/aniimo" title="성격 공략" />
    <AniimoMobileNav />
    <main className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[230px_minmax(0,1fr)]"><AniimoSidebar /><div className="min-w-0 space-y-8">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-10"><div className="flex items-center gap-2 text-violet-300"><Brain size={20} /><span className="text-[10px] font-black uppercase tracking-[0.28em]">Personality Guide</span></div><h1 className="mt-4 text-4xl font-black sm:text-5xl">애니모 성격 선택 가이드</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">성격은 네 개 축에서 하나씩 선택되어 네 가지 보너스가 동시에 적용됩니다. 이름보다 실제 효과를 보고 전투용과 홈 운영용 개체를 구분하는 것이 핵심입니다.</p></section>
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212]"><div className="border-b border-white/10 p-6"><h2 className="flex items-center gap-2 text-xl font-black"><Sparkles size={18} className="text-violet-300" /> 성격 8종 효과</h2><p className="mt-2 text-xs leading-5 text-gray-500">각 축에서는 둘 중 하나만 적용됩니다. 홈에서는 각 성격에 대응하는 시설의 작업 효율이 20% 증가하는 것으로 알려져 있습니다.</p></div><div className="grid gap-px bg-white/5 md:grid-cols-2">{traits.map(trait => <article key={trait.code} className="bg-[#121212] p-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/15 text-lg font-black text-violet-300">{trait.code}</span><div><p className="text-[10px] font-black text-gray-600">{trait.axis}</p><h3 className="font-black">{trait.name}</h3></div></div><strong className="mt-4 block text-sm text-violet-300">{trait.combat}</strong><p className="mt-2 text-xs leading-5 text-gray-400">{trait.use}</p></article>)}</div></section>
      <section className="rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8"><h2 className="flex items-center gap-2 text-xl font-black"><Swords size={18} className="text-violet-300" /> 역할별 추천 조합</h2><p className="mt-2 text-xs leading-5 text-gray-500">아래 조합은 출발점입니다. 상대의 물리·마법 피해와 애니모의 치명타 연계 여부에 따라 T/F 또는 S/N을 바꾸세요.</p><div className="mt-6 flex flex-wrap gap-2">{presets.map(value => <button key={value.id} onClick={() => setPresetId(value.id)} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${presetId === value.id ? 'bg-violet-400 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{value.label}</button>)}</div><div className="mt-6 rounded-3xl border border-violet-400/20 bg-violet-400/[0.05] p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><strong className="text-5xl font-black tracking-[0.16em] text-violet-300">{preset.code}</strong><div><h3 className="font-black">{preset.label} 추천</h3><p className="mt-2 text-xs leading-5 text-gray-400">{preset.summary}</p></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{selectedTraits.map(trait => trait && <div key={trait.code} className="rounded-2xl bg-black/20 p-4"><strong>{trait.code} · {trait.name}</strong><p className="mt-1 text-xs text-violet-300">{trait.combat}</p></div>)}</div></div></section>
      <section className="grid gap-4 md:grid-cols-3"><Tip icon={<Swords size={18} />} title="S와 N 선택"><p>치명타를 활용할 스킬·특성이 없다면 S의 피해 4%가 안정적입니다. 치명타 연계가 명확한 개체만 N을 우선합니다.</p></Tip><Tip icon={<Shield size={18} />} title="T와 F 선택"><p>고정 정답이 아니라 상대 공격 유형에 맞춥니다. 물리 피해에는 T, 마법 피해에는 F가 유리합니다.</p></Tip><Tip icon={<Home size={18} />} title="전투와 홈 분리"><p>전투용 개체는 전투 보너스를 우선하고, 홈 상주 개체는 배치할 시설에 대응하는 성격을 우선하는 편이 효율적입니다.</p></Tip></section>
      <section className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.04] p-6"><h2 className="flex items-center gap-2 font-black text-amber-200"><RefreshCw size={17} /> 성격 변경 시 주의</h2><p className="mt-3 text-xs leading-6 text-gray-400">게임 내 성격 변경 기능은 확인됐지만 필요한 재료, 원하는 성격을 지정할 수 있는지, 완전 무작위 재설정인지는 아직 확정 정보가 부족합니다. 비용이 확인되기 전에는 희귀 개체의 성격 변경을 서두르지 않는 편이 안전합니다.</p></section>
      <footer className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"><p>참고 자료를 바탕으로 Rira 기준으로 재구성했으며 게임 업데이트에 따라 달라질 수 있습니다.</p><div className="flex gap-4"><a href="https://gamewith.ai/aniimo/ko/articles/personality-guide" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-violet-300 hover:text-white">GameWith 참고 <ExternalLink size={11} /></a><Link to="/gallery/aniimo/characters" className="inline-flex items-center gap-1 text-violet-300 hover:text-white">애니모 도감 <ChevronRight size={11} /></Link></div></footer>
    </div></main>
  </div>;
};

const Tip = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => <article className="rounded-3xl border border-white/10 bg-[#121212] p-6"><div className="flex items-center gap-2 text-violet-300">{icon}<h3 className="font-black text-white">{title}</h3></div><div className="mt-3 text-xs leading-6 text-gray-400">{children}</div></article>;

export default PersonalityGuideAniimo;
