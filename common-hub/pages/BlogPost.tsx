import React, { useMemo } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogData';
import { Clock, User, ChevronLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const game = searchParams.get('game') || undefined;
  const gameQuery = game ? `?game=${game}` : '';

  const post = useMemo(() => {
    return BLOG_POSTS.find(p => p.id === id);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[100dvh] bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-black mb-4 tracking-tight">Post Not Found</h2>
        <button onClick={() => navigate(`/blog${gameQuery}`)} className="text-brand-primary hover:text-brand-accent transition-colors font-bold flex items-center gap-2">
          <ChevronLeft size={16} /> Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white pb-32 font-sans overflow-x-hidden selection:bg-brand-primary/30">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        url={`/blog/${post.id}`}
        image={post.imageUrl}
        type="article"
      />
      <PageHeader title={post.title} category="블로그" categoryUrl={`/blog${gameQuery}`} gameId={game} />
      
      {/* Premium Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        {post.imageUrl && (
          <>
            <div className="absolute inset-0 z-0">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
          </>
        )}
        <div className="relative z-20 max-w-[800px] mx-auto w-full px-6 md:px-8 pb-12">

          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1.5 bg-brand-primary text-black font-black text-xs uppercase tracking-widest rounded-md shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.5)]">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white mb-6 drop-shadow-2xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-primary" /> {post.date}</span>
            <span className="flex items-center gap-2"><User size={14} className="text-brand-accent" /> {post.author}</span>
          </div>
        </div>
      </div>

      <main className="max-w-[800px] mx-auto px-6 md:px-8 pt-8">
        <article className="glass-card p-8 md:p-12 rounded-[32px] -mt-8 relative z-30 shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/5">
          <p className="text-xl text-gray-400 font-medium leading-relaxed mb-12 italic border-l-4 border-brand-primary pl-6">
            {post.excerpt}
          </p>

          <div className="prose prose-invert prose-brand max-w-none 
            prose-headings:font-black prose-headings:tracking-tight 
            prose-h3:text-2xl prose-h3:text-brand-accent prose-h3:border-b prose-h3:border-white/10 prose-h3:pb-4 prose-h3:mt-12
            prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:text-[1.05rem]
            prose-strong:text-white prose-strong:font-black prose-strong:bg-brand-primary/20 prose-strong:px-1 prose-strong:rounded
            prose-li:text-gray-300 prose-li:leading-[1.8]
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
