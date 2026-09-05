
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Library, Github, Search, Globe, Download } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import AdPlaceholder from './AdPlaceholder';
import Footer from './Footer';
import Navbar from './Navbar';
import CookieBanner from './CookieBanner';
import { useTranslation } from 'react-i18next';
import { logger } from '../utils/logger';
import '../i18n';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { i18n } = useTranslation();

  // Initialize Global Error Logger and Scroll to Top
  useEffect(() => {
    logger.init();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

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

  const languages: ('ko' | 'en' | 'ja')[] = ['ko', 'en', 'ja'];

  const toggleLang = () => {
    const current = (i18n.language || 'ko').slice(0, 2) as 'ko' | 'en' | 'ja';
    const currentIndex = languages.indexOf(current);
    const next = languages[(currentIndex + 1) % languages.length];
    localStorage.setItem('rira_lang', next);
    i18n.changeLanguage(next);
    
    // URL 업데이트 (React Router 리렌더링 없이 히스토리만 수정)
    const url = new URL(window.location.href);
    if (next === 'ko') {
      url.searchParams.delete('lng');
    } else {
      url.searchParams.set('lng', next);
    }
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden w-full relative">
      <Navbar />

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32">
        <AdPlaceholder type="leaderboard" />
      </div>

      <main className="flex-grow w-full">
        {children}
      </main>

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
        <AdPlaceholder type="leaderboard" />
      </div>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
