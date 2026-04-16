
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Github, Search, Globe, Download } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import AdPlaceholder from './AdPlaceholder';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import '../i18n';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { i18n } = useTranslation(); // t 함수 제거

  // 46,000건 에러 중지용 킬 스위치 등록 (임시)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    }
  };

  const toggleLang = () => {
    const next = i18n.language === 'ko' ? 'en' : 'ko';
    localStorage.setItem('rira_lang', next);
    i18n.changeLanguage(next); // 새로고침 없이 즉시 언어 변경
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-[90] bg-[#121212]/95 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-brand-primary/20">
              <Library className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-light to-brand-accent bg-clip-text text-transparent uppercase">
              RIRA ARCHIVE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-brand-accent' : 'text-gray-400 hover:text-white'}`}>
              HUB
            </Link>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors mr-2">ABOUT</a>
            
            {/* 다국어 전환 */}
            <button onClick={toggleLang} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase">
              <Globe size={18} /> {i18n.language}
            </button>
            
            {/* PWA 설치 버튼 (앱 설치 가능 환경에서만 노출됨) */}
            {deferredPrompt && (
              <button onClick={handleInstallPWA} className="flex items-center gap-1 text-gray-400 hover:text-brand-primary transition-colors text-xs font-bold uppercase">
                <Download size={18} /> App
              </button>
            )}

            <GlobalSearch />

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
               <button className="text-gray-400 hover:text-white transition-colors"><Github size={20}/></button>
            </div>
          </nav>

          <button className="md:hidden text-gray-400 hover:text-white transition-colors">
             <Search size={24} />
          </button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto w-full px-6 pt-4">
        <AdPlaceholder type="leaderboard" />
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <div className="max-w-[1600px] mx-auto w-full px-6 pb-8">
        <AdPlaceholder type="leaderboard" />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
