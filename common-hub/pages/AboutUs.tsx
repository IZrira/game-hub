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
            {t('Rira Game Hub는 전 세계 하드코어 플레이어들을 위한 궁극의 통합 게임 데이터베이스입니다. 우리는 단순한 위키를 넘어, 가장 정밀하고 신뢰할 수 있는 전술 지표를 제공합니다.')}
          </p>
        </section>

        {/* 3대 핵심 가치 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<ShieldCheck size={32} className="text-brand-primary" />}
            title={t('Uncompromised Accuracy')}
            desc={t('전문 에디터 팀의 교차 검증을 통해 오차 없는 스탯과 계수 데이터를 보장합니다.')}
          />
          <ValueCard 
            icon={<Database size={32} className="text-brand-accent" />}
            title={t('Real-time Integration')}
            desc={t('게임 패치와 동시에 업데이트되는 자동화 파이프라인으로 메타의 최전선을 유지합니다.')}
          />
          <ValueCard 
            icon={<Users size={32} className="text-yellow-500" />}
            title={t('Community Driven')}
            desc={t('유저 피드백 시스템을 통해 끊임없이 진화하며, 모두가 함께 만들어가는 집단 지성의 결정체입니다.')}
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
              {t('당사의 데이터 분석팀은 수년간 최고 티어에서 활동해 온 하드코어 게이머들과 전문 데이터 엔지니어들로 구성되어 있습니다. 우리는 게임 내 숨겨진 로직을 시뮬레이션하고, 효율적인 파밍 스케줄을 설계하며, 각 캐릭터의 잠재력을 극한으로 끌어올리는 가이드를 작성합니다.')}
            </p>
            <p>
              {t('우리의 목표는 명확합니다. 여러분이 게임 세계에서 마주하는 모든 난관을 논리적이고 우아하게 돌파할 수 있도록 돕는 가장 강력한 무기가 되는 것입니다.')}
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
