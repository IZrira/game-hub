import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogData';
import { Clock, User, ChevronLeft } from 'lucide-react';

const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, idx) => {
    if (paragraph.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-xl font-black text-brand-accent mt-8 mb-4">
          {paragraph.replace('### ', '')}
        </h3>
      );
    }
    
    if (paragraph.startsWith('- ')) {
      return (
        <ul key={idx} className="list-disc pl-6 space-y-2 text-gray-300 mb-6">
          {paragraph.split('\n').map((li, i) => {
            const text = li.replace('- ', '');
            const parts = text.split('**');
            return (
              <li key={i}>
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-black">{part}</strong> : part)}
              </li>
            );
          })}
        </ul>
      );
    }

    const parts = paragraph.split('**');
    return (
      <p key={idx} className="text-gray-300 leading-relaxed mb-6">
        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-black">{part}</strong> : part)}
      </p>
    );
  });
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const post = useMemo(() => {
    return BLOG_POSTS.find(p => p.id === id);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-black mb-4">Post Not Found</h2>
        <Link to="/blog" className="text-brand-primary hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        url={`/blog/${post.id}`}
        image={post.imageUrl}
      />
      <PageHeader title={post.category} category="Blog" />
      
      <main className="max-w-[800px] mx-auto px-6 md:px-8 pt-12">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-xs font-black text-gray-400 hover:text-white transition-all backdrop-blur-md"
        >
          <ChevronLeft size={14} /> Back to List
        </Link>

        <article>
          <header className="mb-12 space-y-6">
            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-white">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-8">
              <span className="flex items-center gap-2"><Clock size={16} className="text-brand-primary" /> {post.date}</span>
              <span className="flex items-center gap-2"><User size={16} className="text-brand-accent" /> {post.author}</span>
              <span className="px-3 py-1 bg-white/5 rounded-full">{post.category}</span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="w-full aspect-video rounded-[32px] overflow-hidden border border-white/10 mb-12 shadow-2xl">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="max-w-none">
            {renderContent(post.content)}
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
