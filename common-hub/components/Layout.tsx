
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import AdPlaceholder from './AdPlaceholder';
import Footer from './Footer';
import Navbar from './Navbar';
import CookieBanner from './CookieBanner';
import { logger } from '../utils/logger';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

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
