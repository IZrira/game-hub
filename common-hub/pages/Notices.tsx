import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, Calendar, Info, Megaphone, Sparkles } from 'lucide-react';
import { HSR_NOTICES } from '../../hsr-hub/data/notices';
import { WW_NOTICES } from '../../ww-hub/data/notices';
import GallerySidebar from '../components/GallerySidebar';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

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

  const notices = useMemo(() => {
    if (gameId === 'hsr') return HSR_NOTICES;
    if (gameId === 'ww') return WW_NOTICES;
    return [];
  }, [gameId]);

  const gameName = gameId === 'hsr' ? '붕괴: 스타레일' : '명조: 워더링 웨이브';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      <SEO 
        title={`${gameName} 공지사항`} 
        description={`${gameName}의 최신 업데이트 및 이벤트 소식을 확인하세요.`}
      />
      <PageHeader gameId={gameId} category="공지사항" title="최신 소식" />

      <div className="max-w-[1600px] mx-auto w-full px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar />

        <div className="space-y-8">
          <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-5xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                <Bell className="text-brand-primary" size={40} />
                {gameName} 공지사항
              </h1>
              <p className="text-gray-500 font-bold text-lg mt-2">
                게임의 최신 업데이트와 이벤트 소식을 한눈에 확인하세요.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className="group bg-[#121212] border border-white/5 rounded-3xl p-6 hover:border-brand-primary/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">
                        {TYPE_ICONS[notice.type]}
                        {TYPE_LABELS[notice.type]}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold">
                        <Calendar size={12} />
                        {notice.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-brand-accent transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {notice.content}
                    </p>
                  </div>
                  <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all self-start md:self-center">
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}

            {notices.length === 0 && (
              <div className="py-32 text-center space-y-4 bg-[#121212] rounded-[48px] border border-dashed border-white/10">
                <Bell size={48} className="mx-auto text-gray-700 opacity-20" />
                <p className="text-gray-500 font-black uppercase tracking-widest">등록된 공지사항이 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices;
