import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, Bell, Info, ShieldAlert, Sparkles, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Notice } from '../data/types';

// 보안 처리된 경량 마크다운 렌더러
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  // XSS 방지를 위한 기본 Regex 필터링
  const sanitize = (text: string) => {
    return text
      .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
      .replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim, "")
      .replace(/on\w+="[^"]*"/gim, ""); // onAbort, onClick 등 이벤트 핸들러 제거
  };

  const renderContent = (text: string) => {
    const lines = sanitize(text).split('\n');
    return lines.map((line, idx) => {
      // 제목 (#)
      if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-black text-white mt-6 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold text-brand-accent mt-5 mb-3">{line.replace('## ', '')}</h2>;
      
      // 리스트 (-)
      if (line.startsWith('- ')) return <li key={idx} className="ml-4 text-gray-400 list-disc mb-1">{line.replace('- ', '')}</li>;
      
      // 강조 (**)
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={idx} className="text-gray-400 mb-2 leading-relaxed">
            {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-bold">{part}</strong> : part)}
          </p>
        );
      }

      return <p key={idx} className="text-gray-400 mb-2 leading-relaxed min-h-[1em]">{line}</p>;
    });
  };

  return <div className="markdown-body">{renderContent(content)}</div>;
};

// 공지사항 상세 모달
export const NoticeDetailModal: React.FC<{ notice: Notice; onClose: () => void }> = ({ notice, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-white/5 ${notice.isCritical ? 'text-red-400' : 'text-brand-accent'}`}>
              <Bell size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{t(notice.category)}</span>
                {notice.version && <span className="text-[10px] font-bold text-gray-500">v{notice.version}</span>}
              </div>
              <h3 className="text-xl font-black text-white">{notice.title}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <MarkdownRenderer content={notice.content} />
          {notice.images && notice.images.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4">
              {notice.images.map((img, i) => (
                <img key={i} src={img} alt="Notice Content" className="w-full rounded-2xl border border-white/10" />
              ))}
            </div>
          )}
          <div className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-gray-600 font-bold">
            {t('게시일')}: {notice.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

// 알림 뱃지 헬퍼
export const useNoticeBadge = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('checkedNoticeIds');
    if (saved) setCheckedIds(JSON.parse(saved));
  }, []);

  const markAsRead = (id: string) => {
    if (!checkedIds.includes(id)) {
      const newIds = [...checkedIds, id];
      setCheckedIds(newIds);
      localStorage.setItem('checkedNoticeIds', JSON.stringify(newIds));
    }
  };

  const hasUnread = (allNotices: Notice[]) => {
    const safeNotices = allNotices || [];
    return safeNotices.some(n => !checkedIds.includes(n.id));
  };

  return { checkedIds, markAsRead, hasUnread };
};

// 공지사항 리스트 컴포넌트 (대시보드 노출용 및 전체보기용 공용)
export const NoticeListView: React.FC<{ notices: Notice[]; onNoticeClick: (n: Notice) => void }> = ({ notices, onNoticeClick }) => {
  const { t } = useTranslation();
  const { checkedIds } = useNoticeBadge();
  
  // 수석 엔지니어 권고: 방어 코드 적용
  const safeNotices = useMemo(() => notices || [], [notices]);

  if (safeNotices.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600 font-bold bg-white/[0.02] rounded-[32px] border border-dashed border-white/5">
        {t('새로운 소식이 없습니다.')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {safeNotices.map((notice) => (
        <div 
          key={notice.id} 
          onClick={() => onNoticeClick(notice)}
          className="p-6 rounded-[32px] bg-[#121212] border border-white/5 hover:border-brand-primary/20 transition-all group cursor-pointer relative overflow-hidden"
        >
          {!checkedIds.includes(notice.id) && (
            <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          )}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-widest ${notice.isCritical ? 'text-red-400' : 'text-brand-primary'}`}>
                  {t(notice.category)}
                </span>
                <span className="text-[9px] font-black text-gray-700 tracking-tighter">{notice.createdAt}</span>
              </div>
              <h4 className="text-sm font-bold text-gray-200 group-hover:text-brand-accent transition-colors leading-snug">
                {notice.title}
              </h4>
            </div>
            <ChevronRight size={16} className="text-gray-700 group-hover:text-brand-accent transition-transform group-hover:translate-x-1 shrink-0 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
};
