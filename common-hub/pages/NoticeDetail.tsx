import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Calendar } from 'lucide-react';
import { fetchNotices } from '../data/notices';
import { Notice } from '../data/types';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import MarkdownRenderer from '../components/MarkdownRenderer';

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      // Fetch all notices (or a specific one if API supports it, but since it's global fallback, fetch all)
      const data = await fetchNotices();
      const found = data.find(n => n.id === id);
      setNotice(found || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
        <PageHeader category="공지사항" title="로딩 중..." />
        <div className="flex items-center justify-center h-[50vh]">
          <span className="text-gray-500 font-bold">공지사항을 불러오는 중...</span>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
        <PageHeader category="공지사항" title="오류" />
        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
          <span className="text-gray-500 font-bold text-xl">공지사항을 찾을 수 없습니다.</span>
          <button 
            onClick={() => navigate('/notices')}
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={16} /> 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <SEO 
        title={`${notice.title} - 통합 공지사항`} 
        description={notice.content.substring(0, 100)}
      />

      <div className="max-w-7xl mx-auto w-full px-8 pt-20 pb-32">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white flex items-center gap-2 font-bold text-sm transition-colors"
          >
            <ChevronLeft size={16} /> 목록으로
          </button>
        </div>

        <article className="bg-[#121212] rounded-[48px] border border-white/5 p-12 md:p-20 shadow-2xl relative overflow-hidden min-h-[60vh]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div className="space-y-4">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                notice.category === 'Update' ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' :
                notice.category === 'Event' ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30' :
                'bg-blue-400/20 text-blue-400 border border-blue-400/30'
              }`}>
                {notice.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                {notice.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-bold shrink-0">
              <Calendar size={16} />
              {notice.createdAt}
            </div>
          </div>

          <div className="prose prose-invert max-w-4xl mx-auto md:mx-0 text-gray-300 leading-loose font-medium text-lg">
            <MarkdownRenderer content={notice.content} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default NoticeDetail;
