import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Gamepad2, Globe, Download, LogOut, User as UserIcon, ShieldCheck, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isAdmin } from '../lib/admin';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import '../i18n';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, signOut, openLoginModal } = useAuth();

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

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl shadow-black/50' 
          : 'bg-transparent border-transparent py-6'
      }`}
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform shrink-0">
            <Gamepad2 size={22} className="sm:w-6 sm:h-6" />
          </div>
          <span className="text-base sm:text-lg md:text-xl font-black text-white tracking-tighter uppercase truncate">RIRA GAME HUB</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to="/" className={`text-xs font-black uppercase tracking-widest transition-colors ${location.pathname === '/' ? 'text-brand-accent' : 'text-gray-400 hover:text-white'}`}>{t('HOME')}</Link>
          
          {isAdmin(user?.id) && (
            <Link to="/admin" className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-amber-500/20 transition-all">
              <ShieldCheck size={14} />
              ADMIN
            </Link>
          )}

          <div className="h-4 w-px bg-white/10" />

          {/* 다국어 전환 */}
          <button onClick={toggleLang} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase py-1 px-2 rounded-lg hover:bg-white/5">
            <Globe size={18} /> {i18n.language}
          </button>
          
          {/* PWA 설치 버튼 (조건부 노출) */}
          {deferredPrompt && (
            <button onClick={handleInstallPWA} className="flex items-center gap-1 text-gray-400 hover:text-brand-primary transition-colors text-xs font-bold uppercase py-1 px-2 rounded-lg hover:bg-white/5">
              <Download size={18} /> App
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <UserIcon size={14} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wider">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl border border-white/10 hover:border-red-500/20 transition-all text-[11px] font-black uppercase tracking-widest"
              >
                <LogOut size={14} />
                {t('LOGOUT')}
              </button>
            </div>
          ) : (
            <button 
              onClick={openLoginModal} 
              className="px-5 py-2 bg-brand-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 active:scale-95"
            >
              {t('LOGIN')}
            </button>
          )}
        </div>

        {/* Mobile Action Group */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleLang} 
            className="p-2 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/10 flex items-center gap-1 text-xs font-bold uppercase active:scale-95"
            aria-label="Change Language"
          >
            <Globe size={16} />
            <span className="text-[10px] font-black">{i18n.language?.toUpperCase()}</span>
          </button>
          
          <button 
            className="p-2 text-white rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d0d10]/98 backdrop-blur-2xl border-b border-white/10 p-5 sm:p-6 shadow-2xl animate-fade-in space-y-5 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`p-3.5 rounded-2xl flex items-center justify-between font-black text-sm uppercase tracking-widest transition-colors ${
                location.pathname === '/' ? 'bg-brand-primary/10 text-brand-accent border border-brand-primary/20' : 'bg-white/5 text-white'
              }`}
            >
              <span>{t('HOME')}</span>
              <Gamepad2 size={16} className="text-brand-accent" />
            </Link>

            {isAdmin(user?.id) && (
              <Link 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black text-sm uppercase tracking-widest flex items-center justify-between"
              >
                <span>ADMIN PANEL</span>
                <ShieldCheck size={16} />
              </Link>
            )}

            {deferredPrompt && (
              <button 
                onClick={() => { handleInstallPWA(); setIsMobileMenuOpen(false); }} 
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-black text-sm uppercase tracking-widest flex items-center justify-between hover:text-white"
              >
                <span>{t('앱 설치 (PWA)')}</span>
                <Download size={16} className="text-brand-primary" />
              </button>
            )}

            <div className="h-px bg-white/10 my-1" />

            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10">
                  <UserIcon size={18} className="text-brand-primary" />
                  <span className="text-white text-xs font-black truncate">{user.email}</span>
                </div>
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="w-full p-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2"
                >
                  <LogOut size={16} /> {t('LOGOUT')}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsMobileMenuOpen(false); openLoginModal(); }} 
                className="w-full p-4 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/20 active:scale-95"
              >
                {t('LOGIN')}
              </button>
            )}
          </div>
        </div>
      )}
      {/* Login Modal */}
      <LoginModal />
    </nav>
  );
};

export default Navbar;
