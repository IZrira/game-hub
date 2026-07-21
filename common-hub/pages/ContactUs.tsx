import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Mail, MessageSquare, AlertCircle } from 'lucide-react';

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title="문의하기 (Contact Us)" 
        description="Rira Game Hub와 소통하세요. 건의사항, 제휴 문의, 오탈자 제보 등을 환영합니다." 
        url="/contact"
      />
      <PageHeader title="Contact Us" category="Support" />

      <main className="max-w-[800px] mx-auto px-6 md:px-8 pt-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/20 mb-4">
            <MessageSquare size={32} className="text-brand-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            문의하기
          </h1>
          <p className="text-gray-400 text-lg">
            건의사항, 데이터 수정 요청, 제휴 문의 등을 언제든 보내주세요.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary" />
          
          <div className="space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail size={48} className="text-gray-300" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-2">공식 이메일</h3>
                <a href="mailto:rira.game.hub@gmail.com" className="text-2xl md:text-3xl font-bold hover:text-brand-accent transition-colors">
                  rira.game.hub@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-2xl p-6 mt-12 flex gap-4 items-start">
              <AlertCircle className="text-brand-primary shrink-0 mt-1" size={24} />
              <div className="space-y-2">
                <h4 className="font-bold text-white">이메일 문의 시 유의사항</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-400">
                  <li>버그 제보나 데이터 수정 요청 시, 문제 현상의 스크린샷을 첨부해 주시면 더욱 빠른 처리가 가능합니다.</li>
                  <li>모든 문의에 대해 확인하고 있으나, 상황에 따라 답변이 지연될 수 있는 점 양해 부탁드립니다.</li>
                  <li>욕설, 비방, 스팸 메일은 사전 통보 없이 차단될 수 있습니다.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center pt-8">
              <a 
                href="mailto:rira.game.hub@gmail.com" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-black hover:bg-brand-primary hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <Mail size={18} /> 메일 보내기
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
