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
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        // Handle OAuth hash token recovery
        if (!currentSession && window.location.hash.includes('access_token')) {
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (accessToken && refreshToken) {
            const { data: { session: setSess } } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (setSess) {
              setSession(setSess);
              setUser(setSess.user);
              window.history.replaceState(null, '', window.location.pathname);
              setLoading(false);
              return;
            }
          }

          const { data: { session: refreshedSession } } = await supabase.auth.getSession();
          if (refreshedSession) {
            setSession(refreshedSession);
            setUser(refreshedSession.user);
            window.history.replaceState(null, '', window.location.pathname);
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
          window.history.replaceState(null, '', window.location.pathname);
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.href,
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
