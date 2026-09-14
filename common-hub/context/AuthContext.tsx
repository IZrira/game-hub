import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithProvider: (provider: 'google' | 'discord') => Promise<void>;
  signOut: () => Promise<void>;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        // If the URL has corrupted double hashes like ##access_token, normalize it
        if (window.location.hash.startsWith('##')) {
          const cleanHash = window.location.hash.replace(/^#+/, '#');
          window.history.replaceState(null, '', window.location.pathname + window.location.search + cleanHash);
        }

        const { data: { session: currentSession } } = await supabase.auth.getSession();

        // Handle OAuth hash token recovery (handles single '#' or '##' or query/hash mixes)
        const fullUrl = window.location.href;
        if (!currentSession && fullUrl.includes('access_token')) {
          const accessTokenMatch = fullUrl.match(/[#&]access_token=([^&#]+)/);
          const refreshTokenMatch = fullUrl.match(/[#&]refresh_token=([^&#]+)/);
          const accessToken = accessTokenMatch ? decodeURIComponent(accessTokenMatch[1]) : null;
          const refreshToken = refreshTokenMatch ? decodeURIComponent(refreshTokenMatch[1]) : null;

          if (accessToken && refreshToken) {
            const { data: { session: setSess }, error: setSessionErr } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (setSess) {
              setSession(setSess);
              setUser(setSess.user);
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
              setLoading(false);
              return;
            }
            if (setSessionErr) {
              console.warn('Error setting session from OAuth hash:', setSessionErr.message);
            }
          }

          const { data: { session: refreshedSession } } = await supabase.auth.getSession();
          if (refreshedSession) {
            setSession(refreshedSession);
            setUser(refreshedSession.user);
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        } else {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (err) {
        console.warn('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider: 'google' | 'discord') => {
    if (!supabase) {
      console.warn('Supabase is not initialized. Social login disabled in mock mode.');
      return;
    }
    // Clean redirect URL: exclude any hash fragments to prevent ##access_token
    const cleanRedirectUrl = window.location.origin + window.location.pathname;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: cleanRedirectUrl,
      },
    });
    if (error) {
      console.error(`${provider} Login Error:`, error.message);
    }
  };

  const signOut = async () => {
    if (!supabase) {
      setUser(null);
      setSession(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout Error:', error.message);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithProvider,
        signOut,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
