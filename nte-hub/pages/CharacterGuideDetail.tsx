import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Layers, Target, TrendingUp } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { GuideLayout, GuideHero, GuideSummary, GuideVariantSelector, GuideSectionHeader, GuideEquipmentCard } from '../../common-hub/components/guides/GuideLayout';
import { getPublishedGuides } from '../../common-hub/data/guideArticles';
import { CDN_URL, safeEncodeURIComponent, handleImageFallback } from '../../common-hub/utils/assetManager';
import { NTE_CHARACTER_DATA } from '../data/characterData';
import { NTE_CARTRIDGES, getNTECartridgeImageUrl } from '../data/cartridges';
import { parseNteCharacterGuide } from '../data/parseCharacterGuide';
import { getNteGuideArcImageUrl } from '../data/guideAssets';
import arcs from '../data/generated/arcs.json';

const characterImage = (character: any) => `${CDN_URL}/nte%20images/skills/${safeEncodeURIComponent(character.folderName || character.name)}/${safeEncodeURIComponent(`${character.fileName || character.name}${character.isTrailblazer ? '_f' : ''}`)}.webp`;
const conditional = (label: string) => /해금|각성|세팅|사용|경우/.test(label);

export default function CharacterGuideDetail() {
  const { slug, charName } = useParams<{ slug: string; charName: string }>();
  const article = getPublishedGuides('nte').find(item => item.notionPageId && (slug ? item.slug === slug : item.characterId === charName || item.title === `${charName} 세팅 공략`));
  const character = NTE_CHARACTER_DATA.find(item => item.id === article?.characterId);
  const [selectedConsole, setSelectedConsole] = useState(0);
  useEffect(() => { setSelectedConsole(0); }, [article?.slug]);
  if (!article || !character) return <div className="min-h-[70vh] p-20 text-center text-white"><SEO title="공략을 찾을 수 없음" noindex /><h1 className="text-2xl font-black">캐릭터 공략을 찾을 수 없습니다</h1><Link to="/gallery/nte?menu=공략" className="mt-6 inline-block text-violet-300">공략 목록으로 돌아가기</Link></div>;

  const guide = parseNteCharacterGuide(article.content);
  const currentConsole = guide.consoles[selectedConsole] || guide.consoles[0];
  const cartridge = NTE_CARTRIDGES.find(item => item.name === currentConsole?.name);
  const characterUrl = `/gallery/nte/character/${encodeURIComponent(character.name)}`;
  const url = `/gallery/nte/guides/${encodeURIComponent(article.slug)}`;
  const party = [...new Set(guide.party)];

  return <div className="min-h-screen bg-[#0a0a0a] text-white">
    <SEO title={`이환 ${character.name} 공략 | 아크 · 콘솔 세팅 · 육성 우선순위`} description={article.excerpt} image={characterImage(character)} url={url} gameCategory="이환 (NTE)" itemType="세팅 가이드" type="article" publishedTime={article.publishedAt} modifiedTime={article.reviewedAt} breadcrumbData={[{ name: '홈', url: '/' }, { name: '이환', url: '/gallery/nte' }, { name: character.name, url: characterUrl }, { name: '세팅 가이드', url }]} />
    <PageHeader gameId="nte" title={`${character.name} 공략`} category="공략" categoryUrl="/gallery/nte?menu=공략" />
    <GuideLayout navigationKey={`${article.slug}:${selectedConsole}`}>
      <GuideHero name={character.name} image={characterImage(character)} backTo={characterUrl} version={`v${article.applicableVersion}`} updatedAt={article.reviewedAt} tags={[character.arc, `${character.attribute}속성`]} />
      {guide.consoles.length > 1 && <GuideVariantSelector label="콘솔 대안 선택" description="콘솔 설명과 세트 효과만 바뀝니다. 주·부옵션과 기본 목표는 공통이며, 별도 조건을 함께 확인하세요." options={guide.consoles.map((set, index) => ({ label: set.name, value: String(index) }))} value={String(selectedConsole)} onChange={value => setSelectedConsole(Number(value))} />}
      <GuideSummary items={[
        { label: '우선 추천 아크', value: guide.arcs[0]?.name || '' },
        { label: '콘솔 세트', value: currentConsole?.name || '' },
        { label: '기본 목표', value: guide.statGroups[0]?.items.filter(item => !conditional(item.label)).map(item => `${item.label} ${item.value}`).join(' · ') || '' },
      ]} />

      <section className="space-y-5"><GuideSectionHeader num="01" title="추천 아크" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">{guide.arcs.map(arc => {
          const registered = arcs.find(item => item.name.replace(/[「」]/g, '') === arc.name);
          return <GuideEquipmentCard key={arc.rank} name={arc.name} rank={arc.rank} image={getNteGuideArcImageUrl(arc.name)} to={registered ? `/gallery/nte/weapon/${encodeURIComponent(registered.name)}` : undefined} />;
        })}</div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#111318] p-5 sm:p-6">{guide.arcs.map(arc => <div key={arc.rank} className="border-b border-white/10 pb-4 last:border-0 last:pb-0"><p className="mb-2 flex flex-wrap items-center gap-2 text-sm font-bold"><span className="text-xs text-violet-300">{arc.rank}순위</span>{arc.name}</p><p className="whitespace-pre-line text-sm leading-7 text-gray-300">{arc.note}</p></div>)}</div>
      </section>

      <section className="space-y-5"><GuideSectionHeader num="02" title="콘솔 세트와 옵션" />
        {currentConsole && <div className="rounded-2xl border border-white/10 bg-[#111318] p-5 sm:p-6">
          <div className="flex items-start gap-4"><div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20">{cartridge ? <img src={getNTECartridgeImageUrl(cartridge.imageFileName, 5)} alt={cartridge.name} onError={handleImageFallback} className="h-full w-full object-contain p-2" /> : <Layers size={32} className="text-violet-300" />}</div><div className="min-w-0"><h3 className="text-lg font-bold">{currentConsole.name}</h3><p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-300">{currentConsole.note}</p></div></div>
          {cartridge && <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">{[{label:'2세트 효과',text:cartridge.twoPieceEffect},{label:'4세트 효과',text:cartridge.fourPieceEffect}].map(effect => <div key={effect.label} className="rounded-xl bg-black/20 p-4"><span className="text-xs font-bold text-violet-200">{effect.label}</span><p className="mt-2 text-sm leading-6 text-gray-300">{effect.text}</p></div>)}</div>}
        </div>}
        <p className="text-xs leading-6 text-gray-400">아래 주·부옵션은 공통 기준입니다. 조건이 붙은 설명은 그대로 함께 확인하세요.</p>
        <div className="grid gap-3 sm:grid-cols-2">{[{label:'콘솔 주 옵션',items:guide.mainStats,icon:<Target size={17}/>},{label:'콘솔 부 옵션',items:guide.subStats,icon:<TrendingUp size={17}/>}].map(group => <div key={group.label} className="rounded-2xl border border-white/10 bg-[#111318] p-5"><h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-violet-200">{group.icon}{group.label}</h3><ol className="space-y-2">{group.items.map((stat,index)=><li key={index} className="flex items-start gap-3 rounded-lg bg-black/20 p-3 text-sm leading-6 text-gray-200"><span className="shrink-0 text-xs font-bold text-violet-300">{index+1}</span>{stat}</li>)}</ol></div>)}</div>
      </section>

      <section className="space-y-5"><GuideSectionHeader num="03" title="목표 수치와 적용 조건" />{guide.statGroups.map((group,index)=><div key={index} className="rounded-2xl border border-white/10 bg-[#111318] p-5 sm:p-6"><h3 className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-white">{conditional(group.label)&&<span className="rounded-md bg-violet-400/15 px-2 py-1 text-xs text-violet-200">조건별 목표</span>}{group.label}</h3><div className="grid grid-cols-2 gap-3 lg:grid-cols-3">{group.items.filter(item=>!conditional(item.label)).map((stat,itemIndex)=><div key={itemIndex} className="rounded-xl border border-white/10 bg-black/20 p-4"><span className="mb-2 block text-xs font-semibold text-gray-300">{stat.label}</span><span className="text-xl font-bold text-white sm:text-2xl">{stat.value}</span></div>)}</div>{group.items.filter(item=>conditional(item.label)).map((stat,itemIndex)=><div key={itemIndex} className="mt-4 rounded-xl border border-violet-400/25 bg-violet-400/5 p-4"><p className="mb-2 text-sm font-bold text-violet-200">적용 조건: {stat.label}</p><p className="text-base font-bold text-gray-100">{stat.value}</p></div>)}</div>)}</section>

      <section className="space-y-5"><GuideSectionHeader num="04" title="스킬 육성 우선순위" /><ol className="grid grid-cols-2 gap-3 md:grid-cols-3">{guide.skillPriority.map((skill,index)=>{const detail=character.skills?.find((item:any)=>item.type.replace(/\s/g,'')===skill.replace(/\s/g,''));return <li key={index} className="rounded-2xl border border-white/10 bg-[#111318] p-4"><span className="mb-3 block text-xs font-bold text-violet-300">{index+1}순위</span><p className="text-sm font-bold">{skill}</p>{detail&&<p className="mt-2 text-xs leading-5 text-gray-300">{detail.name}</p>}</li>;})}</ol></section>
      <section className="space-y-5"><GuideSectionHeader num="05" title="각성 우선순위" /><ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">{guide.awakeningPriority.map((rank,index)=><li key={index} className="rounded-2xl border border-white/10 bg-[#111318] p-4"><span className="block text-xs font-bold text-gray-300">{index+1}순위</span><p className="my-2 text-lg font-bold text-violet-200">각성 {rank}</p><p className="text-xs leading-5 text-gray-300">{character.eidolons?.find((item:any)=>Number(item.rank)===rank)?.name.replace(/^\d+[.、]\s*/, '')||`각성 ${rank}`}</p></li>)}</ol></section>

      <section className="space-y-5"><GuideSectionHeader num="06" title="시너지 캐릭터" /><div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{party.map(name=>{const member=NTE_CHARACTER_DATA.find(item=>item.name===name);return member?<Link key={name} to={`/gallery/nte/character/${encodeURIComponent(member.name)}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111318] p-3 transition hover:border-violet-400/50"><img src={characterImage(member)} alt={member.name} onError={handleImageFallback} loading="lazy" className="h-14 w-14 shrink-0 rounded-xl bg-black/20 object-cover object-top"/><div className="min-w-0"><p className="text-sm font-bold">{member.name}</p><p className="mt-1 text-xs leading-5 text-gray-300">{member.attribute} · {member.arc}</p></div></Link>:<div key={name} className="rounded-xl border border-white/10 p-4 text-sm">{name}</div>;})}</div></section>
      {guide.notes.length>0&&<section className="rounded-2xl border border-white/10 bg-[#111318] p-5"><h2 className="mb-4 text-lg font-bold">추가 세팅 메모</h2>{guide.notes.map((note,index)=><p key={index} className="whitespace-pre-line text-sm leading-7 text-gray-300">{note}</p>)}</section>}
      <Link to="/gallery/nte?menu=공략" className="guide-back-link">캐릭터 공략 목록</Link>
    </GuideLayout>
  </div>;
}
