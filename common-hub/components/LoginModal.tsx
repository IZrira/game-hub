import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gamepad2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  // Disable scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSocialLogin = async (provider: 'discord' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) {
      console.error(`${provider} Login Error:`, error.message);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden bg-[#0f0f0f] border border-white/10 rounded-[32px] shadow-2xl shadow-brand-primary/20"
          >
            {/* Header with Background Pattern */}
            <div className="relative h-32 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-xl relative z-10">
                <Gamepad2 size={32} />
              </div>
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/20 text-white/60 hover:text-white hover:bg-black/40 transition-all z-20"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-6 text-center space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">RIRA GAME HUB</h2>
                <p className="text-sm text-gray-400 font-medium">{t('환영합니다! 로그인을 통해 나만의 공략을 저장하세요.')}</p>
              </div>

              <div className="grid gap-3">
                {/* Discord Login Button */}
                <button
                  onClick={() => handleSocialLogin('discord')}
                  className="flex items-center justify-center gap-3 w-full p-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl font-black transition-all group active:scale-95"
                >
                  <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                    <img src="https://cdn.simpleicons.org/discord/white" alt="Discord" className="w-5 h-5" />
                  </div>
                  <span>Discord로 로그인</span>
                </button>

                {/* Google Login Button */}
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-3 w-full p-4 bg-white hover:bg-gray-100 text-black rounded-2xl font-black transition-all group active:scale-95"
                >
                  <div className="bg-black/5 p-1.5 rounded-lg group-hover:bg-black/10 transition-colors">
                    <img src="https://cdn.simpleicons.org/google" alt="Google" className="w-5 h-5" />
                  </div>
                  <span>Google로 로그인</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                  By logging in, you agree to our <span className="text-gray-400">Terms of Service</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default LoginModal;
