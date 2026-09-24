import React from 'react';
import { ArrowRight, BookOpen, CalendarDays, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import GallerySidebar from '../components/GallerySidebar';
import { getPublishedGuides } from '../data/guideArticles';
import { AniimoMobileNav, AniimoSidebar } from '../../aniimo-hub/components/AniimoNavigation';

const GAME_LABELS: Record<string, string> = {
  hsr: '붕괴: 스타레일',
  ww: '명조',
  nte: '이환',
  aniimo: '애니모',
};

const GuideList: React.FC = () => {
  const { gameId = '' } = useParams<{ gameId: string }>();
  const guides = getPublishedGuides(gameId);
  const gameLabel = GAME_LABELS[gameId] || gameId;
  const isAniimo = gameId === 'aniimo';

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title={`${gameLabel} 공략 모음`} description={`${gameLabel}의 공식 정보와 Rira 분석을 구분해 검수한 공략을 확인하세요.`} url={`/gallery/${gameId}/guides`} gameCategory={gameLabel} noindex={guides.length === 0} breadcrumbData={[{ name: '홈', url: '/' }, { name: gameLabel, url: `/gallery/${gameId}` }, { name: '공략', url: `/gallery/${gameId}/guides` }]} />
    <PageHeader gameId={gameId} title={`${gameLabel} 공략`} />
    {isAniimo && <AniimoMobileNav />}
    <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      {isAniimo ? <AniimoSidebar /> : <GallerySidebar />}
      <div className="min-w-0 space-y-8">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/10 via-[#121212] to-transparent p-7 sm:p-10">
          <div className="flex items-center gap-2 text-violet-300"><ShieldCheck size={18} /><span className="text-[10px] font-black uppercase tracking-[0.25em]">Reviewed Guides</span></div>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">{gameLabel} 공략</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400">공식 사실과 Rira의 선택 기준을 구분하고, 적용 기준일과 출처를 확인한 글만 공개합니다.</p>
        </section>
        {guides.length > 0 ? <section className="grid gap-5 md:grid-cols-2">{guides.map(article => <Link key={article.slug} to={`/gallery/${gameId}/guides/${article.slug}`} className="group rounded-[28px] border border-white/10 bg-[#121212] p-6 transition hover:border-violet-400/35 hover:bg-white/[0.04]"><BookOpen size={22} className="text-violet-300" /><h2 className="mt-5 text-xl font-black group-hover:text-violet-300">{article.title}</h2><p className="mt-3 text-sm leading-6 text-gray-400">{article.excerpt}</p><div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] font-bold text-gray-500"><span className="flex items-center gap-2"><CalendarDays size={13} /> 검수 {article.reviewedAt}</span><span className="flex items-center gap-1 text-violet-300">읽기 <ArrowRight size={13} /></span></div></Link>)}</section> : <section className="rounded-3xl border border-amber-300/15 bg-amber-300/[0.04] p-10 text-center"><h2 className="font-black">검수 완료된 공략이 없습니다</h2><p className="mt-3 text-sm text-gray-400">공식 자료와 실제 데이터를 확인한 글부터 순서대로 공개합니다.</p></section>}
      </div>
    </main>
  </div>;
};

export default GuideList;
