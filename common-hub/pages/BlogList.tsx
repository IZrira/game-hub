import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogData';
import { Clock, User, ChevronRight } from 'lucide-react';

const BlogList: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title="인텔리전스 블로그" 
        description="Rira Game Hub의 심층 분석 게임 칼럼과 가이드를 만나보세요." 
        url="/blog" 
      />
      <PageHeader title="Intelligence Blog" category="Blog" />
      
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map(post => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
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
                  <div className="flex items-center gap-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
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
