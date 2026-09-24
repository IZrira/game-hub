import React from 'react';
import { Link, useSearchParams } from 'react-router';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogData';
import { Clock, User, ChevronRight, ShieldCheck } from 'lucide-react';

const BlogList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const game = searchParams.get('game') || undefined;
  const gameQuery = game ? `?game=${game}` : '';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title="공략 검수 중"
        description="Rira Game Hub의 공략 콘텐츠를 공식 자료와 대조해 다시 검수하고 있습니다."
        url="/blog"
        noindex={BLOG_POSTS.length === 0}
      />
      <PageHeader title="리라 아카이브 칼럼" category="블로그" categoryUrl={`/blog${gameQuery}`} gameId={game} />
      
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12">
        {BLOG_POSTS.length === 0 && (
          <section className="mx-auto max-w-2xl rounded-[32px] border border-amber-300/15 bg-amber-300/[0.04] p-8 text-center md:p-12">
            <ShieldCheck className="mx-auto text-amber-200" size={36} />
            <h1 className="mt-5 text-2xl font-black">공략 콘텐츠를 다시 검수하고 있습니다</h1>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              정확하지 않은 정보가 노출되지 않도록 기존 글을 내리고, 게임 내 정보와 공식 자료를 기준으로
              명칭·수치·적용 버전을 확인하고 있습니다. 검수를 마친 공략부터 다시 공개하겠습니다.
            </p>
            <Link to="/" className="mt-7 inline-flex rounded-xl bg-white/10 px-5 py-3 text-xs font-black text-white hover:bg-white/15">
              게임 허브로 돌아가기
            </Link>
          </section>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}${gameQuery}`}
              className="group glass-card rounded-[32px] overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all duration-500 flex flex-col bg-gradient-to-br from-white/[0.03] to-transparent hover:shadow-2xl"
            >
              {post.imageUrl && (
                <div className="w-full aspect-[2/1] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-brand-primary uppercase tracking-widest border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-brand-accent transition-colors leading-tight mb-4">
                  {post.title}
                </h2>
                
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors text-gray-400">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogList;
