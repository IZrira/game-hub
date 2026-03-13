
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Github, Search } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isHSRRoute = location.pathname.includes('/gallery/hsr');

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

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#0d0d0d] border-t border-white/5 pt-24 pb-32 px-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-4xl space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
                  <Library size={26} className="text-brand-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-[0.2em] uppercase text-white">RIRA ARCHIVE</span>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Integrated Game Intelligence Terminal</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-12 gap-y-6 pt-4">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.3em]">Navigation</span>
                  <Link to="/" className="text-xs font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase">Hub Index</Link>
                  <a href="#" className="text-xs font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase">Data Repositories</a>
                  <a href="#" className="text-xs font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase">Archive API</a>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.3em]">Security & Policy</span>
                  <a href="#" className="text-xs font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase">Privacy Policy</a>
                  <a href="#" className="text-xs font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase">Terms of Service</a>
                  <a href="#" className="text-xs font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase">System Status</a>
                </div>
              </div>
            </div>

            <div className="space-y-12 pt-12 border-t border-white/5">
              {isHSRRoute && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-[11px] font-black text-brand-accent uppercase tracking-[0.4em]">Honkai: Star Rail Common Disclaimer</span>
                  </div>
                  <div className="text-gray-500 text-xs md:text-[14px] leading-relaxed font-medium space-y-1.5 pl-5 border-l border-brand-accent/20">
                    <p>Honkai: Star Rail and all associated assets are trademarks and property of HoYoverse.</p>
                    <p>This is a non-commercial, fan-made resource created for gameplay guide and information purposes.</p>
                    <p>This site is not affiliated with, endorsed by, or representative of HoYoverse.</p>
                    <p className="pt-2 font-black text-gray-400">© All rights reserved by HoYoverse.</p>
                  </div>
                </div>
              )}

              {(isHome || !isHSRRoute) && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-700" />
                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.4em]">Archive Identity & Intellectual Property</span>
                  </div>
                  <div className="text-gray-500 text-xs md:text-[14px] leading-relaxed font-medium space-y-1.5 pl-5 border-l border-white/10">
                    <p>Copyright © 2026 RIRA ARCHIVE. All rights reserved.</p>
                    <p>This website provides comprehensive game data and analytical content for educational and research purposes.</p>
                    <p>All game-related materials, including imagery, characters, and assets, are the intellectual property of their respective owners.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] pt-8">
              <span>System: Synchronized</span>
              <span>•</span>
              <span>Region: Global</span>
              <span>•</span>
              <span>Build: v2.5.0_stable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
