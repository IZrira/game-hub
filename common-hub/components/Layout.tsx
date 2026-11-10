
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import AdPlaceholder from './AdPlaceholder';
import Footer from './Footer';
import Navbar from './Navbar';
import { logger } from '../utils/logger';
import { retireServiceWorker } from '../utils/retireServiceWorker';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Initialize Global Error Logger and Scroll to Top
  useEffect(() => {
    logger.init();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Retire legacy workers without a registration/reload cycle on every visit.
  useEffect(() => {
    void retireServiceWorker().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden w-full relative">
      {/* Hidden until keyboard focus; moves focus past the header to the page content. */}
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-white/20 focus:bg-[#121212] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-[#B794F6]"
      >
        {t('본문으로 바로가기')}
      </a>
      <Navbar />

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32">
        <AdPlaceholder type="leaderboard" />
      </div>

      <main id="main-content" tabIndex={-1} className="flex-grow w-full scroll-mt-24 focus:outline-none">
        {children}
      </main>

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
        <AdPlaceholder type="leaderboard" />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
