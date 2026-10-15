import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { GuideLayout, GuideHero, GuideSummary, GuideVariantSelector } from '../../common-hub/components/guides/GuideLayout';
import { GuideBuildContent, GuideFooter, GuideViewTabs, parseGuideOption } from '../../common-hub/components/guides/GuideContent';
import { getPublishedGuides } from '../../common-hub/data/guideSummaries';
import type { GuideArticle } from '../../common-hub/data/guideArticles';
import { useGuideArticle } from '../../common-hub/hooks/useGuideArticle';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';
import { NTE_CHARACTER_DATA } from '../data/characterData';
import { NTE_CARTRIDGES, getNTECartridgeImageUrl } from '../data/cartridges';
import { parseNteCharacterGuide } from '../data/parseCharacterGuide';
import { getNteGuideArcImageUrl } from '../data/guideAssets';
import arcs from '../data/generated/arcs.json';

const characterImage = (character: any) => `${CDN_URL}/nte%20images/skills/${safeEncodeURIComponent(character.folderName || character.name)}/${safeEncodeURIComponent(`${character.fileName || character.name}${character.isTrailblazer ? '_f' : ''}`)}.webp`;
const conditional = (label: string) => /해금|각성|세팅|사용|경우/.test(label);

export default function CharacterGuideDetail() {
  const { slug, charName } = useParams<{ slug: string; charName: string }>();
  const summary = getPublishedGuides('nte').find(item => item.notionPageId && (slug ? item.slug === slug : item.characterId === charName || item.title === `${charName} 세팅 공략`));
  const character = NTE_CHARACTER_DATA.find(item => item.id === summary?.characterId);
  const { article, failed, retry } = useGuideArticle('nte', summary && character ? summary.slug : '');
  if (!summary || !character) return <div className="min-h-[70vh] p-20 text-center text-white"><SEO title="공략을 찾을 수 없음" noindex /><h1 className="text-2xl font-black">캐릭터 공략을 찾을 수 없습니다</h1><Link to="/gallery/nte?menu=공략" className="mt-6 inline-block text-violet-300">공략 목록으로 돌아가기</Link></div>;
  if (!article) return <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 p-8 text-white">
    <SEO title={summary.title} description={summary.excerpt} url={`/gallery/nte/guides/${encodeURIComponent(summary.slug)}`} type="article" />
    {failed ? <div role="alert" className="text-center"><p>공략을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p><button type="button" className="mt-4 rounded-xl bg-brand-primary px-6 py-3" onClick={retry}>다시 불러오기</button></div> : <p role="status" className="text-gray-400">공략을 불러오는 중입니다.</p>}
  </div>;
  return <CharacterGuideContent key={article.slug} article={article} character={character} />;
}

function CharacterGuideContent({ article, character }: { article: GuideArticle; character: (typeof NTE_CHARACTER_DATA)[number] }) {
  const [selectedConsole, setSelectedConsole] = useState(0);

  const guide = parseNteCharacterGuide(article.content);
  const currentConsole = guide.consoles[selectedConsole] || guide.consoles[0];
  const cartridge = NTE_CARTRIDGES.find(item => item.name === currentConsole?.name);
  const characterUrl = `/gallery/nte/character/${encodeURIComponent(character.name)}`;
  const url = `/gallery/nte/guides/${encodeURIComponent(article.slug)}`;
  const primary = [{ id: '추천 아크', title: '추천 아크', items: guide.arcs.map(arc => {
    const registered = arcs.find(item => item.name.replace(/[「」]/g, '') === arc.name);
    return { name: arc.name, rank: arc.rank, note: arc.note, image: getNteGuideArcImageUrl(arc.name), to: registered ? `/gallery/nte/weapon/${encodeURIComponent(registered.name)}` : undefined };
  }) }];
  const sets = [{ title: '콘솔 세트', items: currentConsole ? [{ name: currentConsole.name, note: currentConsole.note, image: cartridge ? getNTECartridgeImageUrl(cartridge.imageFileName, 5) : undefined, effects: cartridge ? [{ label: '2세트 효과', value: cartridge.twoPieceEffect }, { label: '4세트 효과', value: cartridge.fourPieceEffect }] : [] }] : [] }];
  const options = guide.mainStats.map((value, index) => ({ label: `추천 옵션 ${index + 1}`, values: parseGuideOption(value, true) }));
  const targets = guide.statGroups.map(group => ({ label: group.label, conditional: conditional(group.label), items: group.items.map(item => ({ ...item, conditional: conditional(item.label) })) }));
  const skills = guide.skillPriority.map(name => ({ name, detail: character.skills?.find((item: any) => item.type.replace(/\s/g, '') === name.replace(/\s/g, ''))?.name }));
  const awakenings = guide.awakeningPriority.map(rank => ({ name: `각성 ${rank}`, detail: character.eidolons?.find((item: any) => Number(item.rank) === rank)?.name.replace(/^\d+[.、]\s*/, '') }));
  const members = [...new Set(guide.party)].map(name => {
    const member = NTE_CHARACTER_DATA.find(item => item.name === name);
    return { name, image: member ? characterImage(member) : undefined, to: member ? `/gallery/nte/character/${encodeURIComponent(member.name)}` : undefined, details: member ? [member.attribute, member.arc] : [] };
  });

  return <div className="min-h-screen bg-[#0a0a0a] text-white">
    <SEO title={`이환 ${character.name} 공략 | 아크 · 콘솔 세팅 · 육성 우선순위`} description={article.excerpt} image={characterImage(character)} url={url} gameCategory="이환 (NTE)" itemType="세팅 가이드" type="article" publishedTime={article.publishedAt} modifiedTime={article.reviewedAt} breadcrumbData={[{ name: '홈', url: '/' }, { name: '이환', url: '/gallery/nte' }, { name: character.name, url: characterUrl }, { name: '세팅 가이드', url }]} />
    <PageHeader gameId="nte" title={`${character.name} 공략`} category="공략" categoryUrl="/gallery/nte?menu=공략" />
    <GuideLayout navigationKey={`${article.slug}:${selectedConsole}`}>
      <GuideHero name={character.name} image={characterImage(character)} backTo={characterUrl} version={article.applicableVersion} updatedAt={article.reviewedAt} tags={[character.arc, `${character.attribute}속성`]} />
      <GuideViewTabs value="setup" onChange={() => {}} analysisAvailable={false} />
      {guide.consoles.length > 1 && <GuideVariantSelector label="세팅 선택" description="콘솔 설명과 세트 효과만 바뀝니다. 주·부옵션과 기본 목표는 공통이며, 별도 조건을 함께 확인하세요." options={guide.consoles.map((set, index) => ({ label: set.name, value: String(index) }))} value={String(selectedConsole)} onChange={value => setSelectedConsole(Number(value))} />}
      <GuideSummary items={[
        { label: '우선 추천 아크', value: guide.arcs[0]?.name || '', image: primary[0].items[0]?.image },
        { label: '콘솔 세트', value: currentConsole?.name || '', image: sets[0].items[0]?.image },
        { label: '기본 목표', value: guide.statGroups[0]?.items.filter(item => !conditional(item.label)).map(item => ({ label: item.label, value: item.value })) || [] },
      ]} />
      <GuideBuildContent primary={primary} sets={sets} options={options} subStats={guide.subStats} targets={targets} skills={skills} awakenings={awakenings} members={members} optionNote="아래 주·부옵션은 공통 기준입니다. 조건이 붙은 설명은 그대로 함께 확인하세요." notes={guide.notes} />
      <GuideFooter updatedAt={article.reviewedAt} action={<Link to="/gallery/nte?menu=공략" className="guide-back-link">캐릭터 공략 목록</Link>} />
    </GuideLayout>
  </div>;
}
