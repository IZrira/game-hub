
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Copy, Check, Share2, Bookmark, ChevronRight, ArrowLeft } from 'lucide-react';
import { ARCHIVE_DATA } from '../data/games';
import PageHeader from '../components/PageHeader';
import AdPlaceholder from '../components/AdPlaceholder';
import TableOfContents from '../components/TableOfContents';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const Detail: React.FC = () => {
  const { t } = useTranslation();
  const { gameId, postId } = useParams<{ gameId: string; postId: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const game = ARCHIVE_DATA.games.find(g => g.id === gameId);
  const post = game?.posts.find(p => p.id === postId);

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2');
      const items: TOCItem[] = Array.from(headings).map((node, i) => {
        const h = node as HTMLElement;
        const id = `heading-${i}`;
        h.id = id;
        return {
          id,
          text: h.textContent || '',
          level: parseInt(h.tagName.substring(1))
        };
      });
      setToc(items);
    }
  }, [post]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) return <div className="p-20 text-center">{t('Post not found.')}</div>;

  return (
    <div className="min-h-screen pb-20 bg-[#0a0a0a] overflow-visible">
      {/* Page Header */}
      <PageHeader gameId={gameId} category={post.category} title={post.title} />

      {/* Header Section */}
      <div className="bg-brand-dark/30 py-10 m-0">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-2 mb-6">
             <span className="bg-brand-primary/20 text-brand-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
               {post.category}
             </span>
             {post.keywords.map(kw => (
               <span key={kw} className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-[10px] font-bold">
                 #{kw}
               </span>
             ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-black shadow-lg shadow-brand-primary/20">
                {post.author[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-brand-light font-bold text-xs uppercase tracking-tight">{post.author}</span>
                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        {/* Main Content */}
        <article className="max-w-3xl mx-auto lg:mx-0 w-full">
          <div 
            ref={contentRef}
            className="prose prose-invert prose-brand max-w-none 
              prose-h1:text-3xl prose-h1:font-black prose-h1:mb-8 prose-h1:mt-12 prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-brand-accent
              prose-p:text-gray-300 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-6
              prose-strong:text-brand-light prose-strong:font-bold prose-strong:bg-brand-primary/20 prose-strong:px-1 prose-strong:rounded
              prose-img:rounded-2xl prose-img:shadow-2xl prose-img:cursor-pointer hover:prose-img:opacity-90 transition-opacity"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('공략 데이터 복사')}</span>
              <button 
                onClick={() => handleCopy('SUNDAYGIFT2024')} 
                className="flex items-center gap-2 text-brand-accent hover:text-white transition-colors"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                <span className="text-xs font-black uppercase tracking-widest">{copied ? t('복사됨!') : t('코드 복사')}</span>
              </button>
            </div>
            <code className="block bg-brand-dark p-4 rounded-xl text-brand-light font-mono text-center text-xl tracking-widest border border-brand-primary/30 shadow-inner">
              SUNDAYGIFT2024
            </code>
          </div>

          <div className="mt-16 flex items-center justify-center gap-4 border-t border-white/5 pt-8">
            <button className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95">
              <Bookmark size={16} /> {t('저장하기')}
            </button>
            <button className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-brand-primary/20 hover:bg-brand-primary/30 text-[10px] font-black uppercase tracking-widest text-brand-accent transition-all hover:scale-105 active:scale-95">
              <Share2 size={16} /> {t('공유하기')}
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
          <TableOfContents selector=".prose" />
          <AdPlaceholder type="skyscraper" />
        </aside>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <AdPlaceholder type="leaderboard" className="mt-12 mb-8" />
      </div>
    </div>
  );
};

export default Detail;
