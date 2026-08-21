import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Hub Index', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Archive Notices', path: '/notices' },
    { name: 'Intelligence Blog', path: '/blog' },
  ];

  const policyLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/tos' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5 pt-16 pb-8 px-8 mt-auto font-sans">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 컬럼 1: 브랜드 슬로건 */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">RIRA GAME HUB</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                Integrated Game Database
              </p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs font-medium">
              Comprehensive game data and tactical analysis platform for advanced explorers. 
              All systems operational via RIRA GAME HUB.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-black text-green-500/60 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Status: Operational
            </div>
          </div>

          {/* 컬럼 2: 네비게이션 */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Navigation</h3>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-brand-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 컬럼 3: 지원 게임 (Supported Sectors) */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Supported Sectors</h3>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              <li><Link to="/gallery/hsr" className="hover:text-brand-primary transition-colors">Honkai: Star Rail</Link></li>
              <li><Link to="/gallery/ww" className="hover:text-brand-primary transition-colors">Wuthering Waves</Link></li>
              <li><Link to="/gallery/nte" className="hover:text-brand-primary transition-colors">Neverness to Everness</Link></li>
            </ul>
          </div>

          {/* 컬럼 4: 정책 및 소셜 */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Security & Policy</h3>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 저작권 및 면책 조항 */}
        <div className="pt-8 border-t border-white/5 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <span>Copyright © {currentYear} RIRA ARCHIVE. All rights reserved.</span>
            <span>Archive Identity & Intellectual Property / Ver 1.0.4_Stable</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] leading-relaxed text-gray-400 font-medium">
              <strong className="text-gray-400">Legal Disclaimer:</strong> RIRA ARCHIVE is a non-profit, unofficial fan-operated project intended for educational and research purposes. 
              This terminal is not affiliated with, endorsed by, or representative of HoYoverse, Kuro Games, or any other game developers. 
              All game-related imagery, characters, and assets are the exclusive intellectual property and registered trademarks of their respective owners. 
              RIRA ARCHIVE operates under Fair Use principles for informational analysis.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-black text-gray-300 uppercase tracking-tighter">
              <span>Source Entities: © HoYoverse</span>
              <span>© Kuro Games</span>
              <span>© RIRA ARCHIVE Game Database</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;