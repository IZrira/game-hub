import React from 'react';
import { Link } from 'react-router';
import { Search, Home, ArrowLeft, Ghost } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <SEO 
        title="404 - Page Not Found" 
        description="요청하신 페이지를 찾을 수 없습니다. 리라 아카이브의 다른 공략이나 데이터베이스를 탐색해보세요."
      />
      {/* Search Engine Directive: Inform crawlers that this is a 404 page even if status code is 200 */}
      <meta name="robots" content="noindex, nofollow" />

      <div className="relative mb-12">
        <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] rounded-full" />
        <Ghost size={120} className="text-brand-primary relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-black text-gray-300 uppercase tracking-widest mb-8">
        {t('Archive Data Not Found')}
      </h2>
      
      <p className="text-gray-500 max-w-md mx-auto mb-12 font-medium leading-relaxed">
        {t('찾으시는 페이지가 삭제되었거나, 주소가 변경되었을 수 있습니다. 아래 버튼을 통해 메인 화면으로 돌아가거나 갤러리를 탐색해보세요.')}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-[20px] font-black italic shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
        >
          <Home size={18} /> {t('Back to Home')}
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-8 py-4 bg-white/5 text-gray-300 border border-white/10 rounded-[20px] font-black italic hover:bg-white/10 transition-all w-full sm:w-auto"
        >
          <ArrowLeft size={18} /> {t('Go Back')}
        </button>
      </div>

      <div className="mt-20 pt-12 border-t border-white/5 w-full max-w-2xl">
        <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-6">{t('Quick Links')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/gallery/hsr" className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
            {t('붕괴: 스타레일')}
          </Link>
          <Link to="/gallery/ww" className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
            {t('명조 (Wuthering Waves)')}
          </Link>
          <Link to="/gallery/hsr/tierlist" className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
            {t('티어 리스트')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
