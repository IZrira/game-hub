import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { Bell, Calendar, Info, Megaphone, Sparkles } from 'lucide-react';
import { fetchNotices } from '../data/notices';
import { Notice } from '../data/types';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { Link } from 'react-router';

const TYPE_ICONS = {
  update: <Sparkles size={16} className="text-brand-accent" />,
  event: <Megaphone size={16} className="text-emerald-400" />,
  info: <Info size={16} className="text-blue-400" />,
};

const TYPE_LABELS = {
  update: '업데이트',
  event: '이벤트',
  info: '공지',
};

const Notices: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchNotices(gameId as 'hsr' | 'ww');
      setNotices(data);
      setLoading(false);
    }
    load();
  }, [gameId]);

  const displayTitle = gameId === 'hsr' ? '붕괴: 스타레일 공지사항' : gameId === 'ww' ? '명조 공지사항' : '통합 공지사항';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <SEO 
        title={displayTitle} 
        description="최신 업데이트 및 이벤트 소식을 확인하세요."
      />
      <PageHeader gameId={gameId} category="공지사항" title="최신 소식" />

      <div className="max-w-[1000px] mx-auto w-full px-8 pt-10 pb-24">
        <div className="space-y-8">
          <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-5xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                <Bell className="text-brand-primary" size={40} />
                {displayTitle}
              </h1>
              <p className="text-gray-400 font-bold text-lg mt-2">
                게임의 최신 업데이트와 이벤트 소식을 한눈에 확인하세요.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="text-center text-gray-400 py-12">공지사항을 불러오는 중...</div>
            ) : notices.length === 0 ? (
              <div className="text-center text-gray-400 py-12">등록된 공지사항이 없습니다.</div>
            ) : (
              notices.map((notice) => (
                <Link 
                  key={notice.id}
                  to={`/notices/${notice.id}`}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-white/[0.04] hover:border-brand-primary/30 transition-all group block"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0 ${
                        notice.category === 'Update' ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30' :
                        notice.category === 'Event' ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30' :
                        'bg-blue-400/20 text-blue-400 border border-blue-400/30'
                      }`}>
                        {notice.category}
                      </div>
                      <h3 className="text-xl font-black text-white group-hover:text-brand-accent transition-colors truncate">
                        {notice.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-bold shrink-0 pl-4 md:pl-0">
                      <Calendar size={14} />
                      <span>{notice.createdAt}</span>
                      {notice.updatedAt && notice.updatedAt !== notice.createdAt && (
                        <span className="text-[11px] font-semibold text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          수정됨 ({notice.updatedAt})
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}

            {notices.length === 0 && (
              <div className="py-32 text-center space-y-4 bg-[#121212] rounded-[48px] border border-dashed border-white/10">
                <Bell size={48} className="mx-auto text-gray-400 opacity-20" />
                <p className="text-gray-400 font-black uppercase tracking-widest">등록된 공지사항이 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices;
