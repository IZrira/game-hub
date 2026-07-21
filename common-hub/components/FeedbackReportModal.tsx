import React, { useState } from 'react';
import { X, MessageSquareWarning, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeedbackReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: {
    gameId: string;
    targetId: string; // e.g., Character ID, Weapon ID, etc.
    targetName: string;
    type: 'character' | 'guide' | 'weapon' | 'echo' | 'general';
  };
}

const FeedbackReportModal: React.FC<FeedbackReportModalProps> = ({ isOpen, onClose, contextData }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    // 실제 운영 시엔 API 통신으로 변경. 현재는 UI 데모.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setContent('');
        setEmail('');
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-brand-primary">
            <MessageSquareWarning size={18} />
            <h2 className="font-black uppercase tracking-widest text-sm text-white">{t('Data Error Report')}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4 text-center">
            <CheckCircle2 size={48} className="text-green-500" />
            <h3 className="text-xl font-black text-white">{t('Report Submitted')}</h3>
            <p className="text-sm text-gray-400 font-medium">
              {t('소중한 피드백에 감사드립니다. 담당 에디터가 확인 후 신속하게 반영하겠습니다.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-yellow-500/90 tracking-wide uppercase">{t('Target')}: {contextData.targetName}</p>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                  {t('오타, 잘못된 계수, 스킬 설명 오류 등 데이터베이스와 관련된 문제를 제보해 주세요.')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">{t('Details')}</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('오류 내용을 상세히 적어주세요. (예: 2돌파 스킬 계수가 120%가 아닌 140% 입니다)')}
                  required
                  className="w-full h-32 bg-[#121212] border border-white/10 rounded-xl p-4 text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-brand-primary resize-none transition-colors"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">{t('Email (Optional)')}</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('처리 결과 회신을 원하시면 이메일을 남겨주세요')}
                  className="w-full h-12 bg-[#121212] border border-white/10 rounded-xl px-4 text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-white/5">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 h-12 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest"
              >
                {t('Cancel')}
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting || !content.trim()}
                className="flex-[2] h-12 rounded-xl bg-brand-primary text-black font-black text-xs uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={14} /> {t('Submit Report')}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackReportModal;
