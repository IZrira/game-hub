import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Gamepad2, Search, Menu, X, Bell, Globe, Download, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { isAdmin } from '../lib/admin';
import LoginModal from './LoginModal';
import '../i18n';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
    
    // 1. Initialize Auth and handle session recovery
    if (supabase) {
      const initializeAuth = async () => {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        // Handle edge case where session is missing but hash is present
        if (!currentSession && window.location.hash.includes('access_token')) {
          const timer = setTimeout(async () => {
            try {
              const hash = window.location.hash.substring(1);
              const params = new URLSearchParams(hash);
              const accessToken = params.get('access_token');
              const refreshToken = params.get('refresh_token');

              if (accessToken && refreshToken) {
                const { data: { session } } = await supabase.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken,
                });

                if (session) {
                  setUser(session.user);
                  window.history.replaceState(null, '', window.location.pathname);
                  return;
                }
              }

              const { data: { session: refreshedSession } } = await supabase.auth.getSession();
              if (refreshedSession) {
                setUser(refreshedSession.user);
                window.history.replaceState(null, '', window.location.pathname);
              }
            } catch (err) {
              // Fail silently in production
            }
          }, 500);

          return () => clearTimeout(timer);
        }
        
        setUser(currentSession?.user ?? null);
      };

      initializeAuth();

      // 2. Subscribe to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setUser(session?.user ?? null);
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        subscription.unsubscribe();
      };
    }

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

  const handleLogout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Logout Error:', error.message);
    }
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
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
            <Gamepad2 size={24} />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">RIRA GAME HUB</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-xs font-black uppercase tracking-widest transition-colors ${location.pathname === '/' ? 'text-brand-accent' : 'text-gray-400 hover:text-white'}`}>{t('HOME')}</Link>
          
          {isAdmin(user?.id) && (
            <Link to="/admin" className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-500/20 hover:bg-amber-500/20 transition-all">
              <ShieldCheck size={14} />
              ADMIN
            </Link>
          )}

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
              onClick={() => setIsLoginModalOpen(true)} 
              className="px-5 py-2 bg-brand-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 active:scale-95"
            >
              {t('LOGIN')}
            </button>
          )}
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
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <UserIcon size={20} className="text-brand-primary" />
                  <span className="text-white font-black">{user.email}</span>
                </div>
                <button onClick={handleLogout} className="btn-secondary w-full flex items-center justify-center gap-2">
                  <LogOut size={18} /> {t('LOGOUT')}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }} 
                className="w-full p-4 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/20"
              >
                {t('LOGIN')}
              </button>
            )}
          </div>
        </div>
      )}
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
