
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Search, Menu, X, Bell, Globe, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation(); // t 함수 다시 활성화

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
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
    i18n.changeLanguage(next);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
            <Gamepad2 size={24} />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">ARCHIVE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-xs font-black uppercase tracking-widest transition-colors ${location.pathname === '/' ? 'text-brand-accent' : 'text-gray-400 hover:text-white'}`}>{t('HOME')}</Link>
          <Link to="/archive/hsr" className={`text-xs font-black uppercase tracking-widest transition-colors ${location.pathname.startsWith('/archive/hsr') ? 'text-brand-accent' : 'text-gray-400 hover:text-white'}`}>{t('STAR RAIL')}</Link>
          
          <div className="h-4 w-px bg-white/10" />

          {/* 다국어 전환 */}
          <button onClick={toggleLang} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase">
            <Globe size={18} /> {i18n.language}
          </button>
          
          {/* PWA 설치 버튼 (조건부 노출) */}
          {deferredPrompt && (
            <button onClick={handleInstallPWA} className="flex items-center gap-1 text-gray-400 hover:text-brand-primary transition-colors text-xs font-bold uppercase">
              <Download size={18} /> App
            </button>
          )}

          <button className="relative text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-primary rounded-full" />
          </button>
          <button className="btn-primary">{t('LOGIN')}</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 animate-fade-in">
          <div className="flex flex-col gap-6">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-white uppercase tracking-widest">{t('HOME')}</Link>
            <Link to="/archive/hsr" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-white uppercase tracking-widest">{t('STAR RAIL')}</Link>
            <button className="btn-primary w-full">{t('LOGIN')}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
