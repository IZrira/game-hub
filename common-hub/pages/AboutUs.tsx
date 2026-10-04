import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Users, Database, Globe, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans text-gray-300">
      <SEO title={t('About Us | Rira Game Hub')} description={t('리라 아카이브의 비전과 운영 철학을 소개합니다.')} />
      <PageHeader gameId="common" title={t('About Us')} />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-24 space-y-20">
        
        {/* 히어로 섹션 */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-white">
            Beyond the Data,
            <br className="hidden md:block" />
            <span className="text-brand-accent"> Towards Victory.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('Rira Game Hub는 여러 서브컬쳐 게임의 도감과 공략을 한곳에서 확인할 수 있도록 직접 운영하는 비공식 팬 아카이브입니다. 사실 정보와 편집 판단을 구분하고, 확인 가능한 범위 안에서 내용을 계속 보완합니다.')}
          </p>
        </section>

        {/* 3대 핵심 가치 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<ShieldCheck size={32} className="text-brand-primary" />}
            title={t('검증 가능한 정보')}
            desc={t('게임 내 설명과 공개된 패치 정보를 기준으로 정리하고, 적용 버전과 검토 시점을 함께 관리합니다.')}
          />
          <ValueCard 
            icon={<Database size={32} className="text-brand-accent" />}
            title={t('지속적인 업데이트')}
            desc={t('자동화된 데이터 생성 결과를 검증한 뒤 반영하며, 패치 이후 달라진 수치와 공략을 순차적으로 갱신합니다.')}
          />
          <ValueCard 
            icon={<Users size={32} className="text-yellow-500" />}
            title={t('오류 제보와 수정')}
            desc={t('누락이나 오류 제보를 다시 확인하고 수정하며, 중요한 변경 사항은 사이트 공지를 통해 기록합니다.')}
          />
        </section>

        {/* 팀 소개 및 운영 철학 */}
        <section className="bg-[#121212] border border-white/5 rounded-[40px] p-10 md:p-16 space-y-12 shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">{t('Our Philosophy')}</h2>
            <div className="w-12 h-1 bg-brand-primary rounded-full" />
          </div>
          
          <div className="space-y-8 text-gray-400 leading-relaxed font-medium">
            <p>
              {t('모바일 및 PC 서브컬쳐 게임 시장은 매일 새로운 콘텐츠와 복잡한 시스템으로 진화하고 있습니다. 유저들은 파편화된 정보 속에서 최적의 플레이 방식을 찾기 위해 많은 시간을 소모합니다. Rira Game Hub는 이러한 비효율을 제거하기 위해 탄생했습니다.')}
            </p>
            <p>
              {t('도감에는 게임에서 확인할 수 있는 명칭, 속성, 수치와 효과를 정리합니다. 세팅 가이드는 빠르게 선택할 수 있는 권장안을 제공하고, 분석 가이드는 그 선택의 이유와 적용 조건, 대안을 설명합니다. 확인되지 않은 내용을 사실처럼 단정하지 않는 것을 기본 원칙으로 삼습니다.')}
            </p>
            <p>
              {t('목표는 필요한 정보를 찾는 시간을 줄이고, 사용자가 자신의 보유 장비와 파티 상황에 맞는 선택을 할 수 있도록 판단 근거를 제공하는 것입니다. 잘못되거나 오래된 정보는 제보를 받아 다시 확인하고 수정합니다.')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
            <a href="mailto:rira.game.hub@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-brand-accent hover:text-white transition-colors">
              <Globe size={18} /> {t('Contact Team')}
            </a>
            <a href="/" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white/10 transition-colors">
              {t('Explore Database')} <ArrowRight size={18} />
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-[#121212] border border-white/5 p-8 rounded-[32px] space-y-6 hover:border-brand-primary/50 transition-colors duration-500 group">
    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10">
      {icon}
    </div>
    <div className="space-y-3">
      <h3 className="text-xl font-black text-white italic tracking-tighter">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default AboutUs;
