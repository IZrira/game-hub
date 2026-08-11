import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Cookie, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rira_cookie_consent');
    if (!consent) {
      // 약간의 딜레이 후 배너 표시하여 자연스러운 트랜지션 유도
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rira_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // 거절해도 기본적 열람은 가능하지만 동의 안함 기록
    localStorage.setItem('rira_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] w-[calc(100%-48px)] sm:w-[400px] bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-500 font-sans">
      <button 
        onClick={handleDecline} 
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={16} />
      </button>
      
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-brand-primary/10 rounded-full shrink-0 border border-brand-primary/20">
          <Cookie size={24} className="text-brand-primary" />
        </div>
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1.5 flex items-center gap-2">
            {t('Cookie Policy')} <ShieldCheck size={14} className="text-green-500" />
          </h3>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">
            {t('Rira Game Hub는 사용자 경험 향상, 편의 기능(다크 모드, 언어 등) 저장 및 애드센스 최적화를 위해 쿠키를 사용합니다. 계속 이용하시면 쿠키 수집에 동의하는 것으로 간주됩니다.')}
          </p>
          <Link to="/privacy" className="text-[11px] text-brand-primary hover:underline mt-2 inline-block" onClick={() => setIsVisible(false)}>
            {t('개인정보처리방침 전문 보기')}
          </Link>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={handleDecline}
          className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/5 transition-colors uppercase tracking-wider"
        >
          {t('필수만 허용')}
        </button>
        <button 
          onClick={handleAccept}
          className="flex-1 px-4 py-2.5 rounded-lg bg-brand-primary text-xs font-black text-black hover:bg-brand-accent transition-colors shadow-[0_0_15px_rgba(var(--brand-primary),0.3)] uppercase tracking-wider"
        >
          {t('모두 동의')}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
