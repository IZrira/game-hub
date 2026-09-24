import React from 'react';
import { ArrowLeft, CalendarDays, ExternalLink, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import GallerySidebar from '../components/GallerySidebar';
import { getPublishedGuide } from '../data/guideArticles';
import { AniimoMobileNav, AniimoSidebar } from '../../aniimo-hub/components/AniimoNavigation';

const GAME_LABELS: Record<string, string> = { hsr: '붕괴: 스타레일', ww: '명조', nte: '이환', aniimo: '애니모' };

const GuideArticlePage: React.FC = () => {
  const { gameId = '', slug = '' } = useParams<{ gameId: string; slug: string }>();
  const article = getPublishedGuide(gameId, slug);
  const gameLabel = GAME_LABELS[gameId] || gameId;
  const isAniimo = gameId === 'aniimo';

  if (!article) return <div className="min-h-[70vh] bg-[#0a0a0a] px-6 py-32 text-center text-white"><SEO title="공략을 찾을 수 없음" description="공개되지 않았거나 존재하지 않는 공략입니다." noindex={true} /><h1 className="text-2xl font-black">공개된 공략을 찾을 수 없습니다</h1><Link to={`/gallery/${gameId}`} className="mt-6 inline-flex text-sm font-black text-violet-300">허브로 돌아가기</Link></div>;

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={article.title} description={article.excerpt} url={`/gallery/${gameId}/guides/${article.slug}`} type="article" gameCategory={gameLabel} publishedTime={article.publishedAt} modifiedTime={article.reviewedAt} breadcrumbData={[{ name: '홈', url: '/' }, { name: gameLabel, url: `/gallery/${gameId}` }, { name: '공략', url: `/gallery/${gameId}/guides` }, { name: article.title, url: `/gallery/${gameId}/guides/${article.slug}` }]} />
    <PageHeader gameId={gameId} category="공략" categoryUrl={`/gallery/${gameId}/guides`} title={article.title} />
    {isAniimo && <AniimoMobileNav />}
    <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      {isAniimo ? <AniimoSidebar /> : <GallerySidebar />}
      <article className="min-w-0">
        <header className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/10 via-[#121212] to-transparent p-7 sm:p-10"><div className="flex items-center gap-2 text-violet-300"><ShieldCheck size={17} /><span className="text-[10px] font-black uppercase tracking-[0.25em]">Rira Reviewed Guide</span></div><h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">{article.title}</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-gray-300">{article.excerpt}</p><div className="mt-6 flex flex-wrap gap-3 text-[11px] font-bold text-gray-500"><span className="flex items-center gap-2"><CalendarDays size={13} /> 작성 {article.publishedAt}</span><span>최종 검수 {article.reviewedAt}</span><span>{article.applicableVersion}</span></div></header>
        <div className="prose prose-invert prose-violet mt-8 max-w-none rounded-[32px] border border-white/10 bg-[#121212] p-7 prose-headings:font-black prose-h2:mt-12 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-p:leading-8 prose-p:text-gray-300 prose-li:leading-7 prose-li:text-gray-300 prose-a:text-violet-300 sm:p-10"><ReactMarkdown>{article.content}</ReactMarkdown></div>
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6"><h2 className="font-black">검증 출처</h2><p className="mt-2 text-xs leading-5 text-gray-500">출처는 사실 확인에 사용했으며, 선택 기준과 설명 구성은 Rira의 편집 내용입니다.</p><div className="mt-4 flex flex-wrap gap-3">{article.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-black text-violet-300 hover:text-white">{source.label}<ExternalLink size={12} /></a>)}</div></section>
        <Link to={`/gallery/${gameId}/guides`} className="mt-8 inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-white"><ArrowLeft size={14} /> {gameLabel} 공략 목록</Link>
      </article>
    </main>
  </div>;
};

export default GuideArticlePage;
