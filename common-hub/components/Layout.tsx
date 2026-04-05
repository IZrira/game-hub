
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Github, Search } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import AdPlaceholder from './AdPlaceholder';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/[0.05]">
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
              Hub
            </Link>
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors mr-2">About</a>
            
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
