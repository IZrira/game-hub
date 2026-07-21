import React from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title="개인정보처리방침 (Privacy Policy)" 
        description="Rira Game Hub의 개인정보처리방침을 안내합니다." 
        url="/privacy" 
      />
      <PageHeader title="개인정보처리방침" category="Policy" />
      
      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-12 space-y-12 leading-relaxed text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">1. 개인정보의 수집 및 이용 목적</h2>
          <p>
            Rira Game Hub(이하 "본 사이트")는 사용자에게 더 나은 게임 정보와 통계 분석 서비스를 제공하기 위해 최소한의 정보를 수집할 수 있습니다. 
            수집된 정보는 서비스 제공 및 개선, 사용자 경험 향상, 신규 기능 개발 등을 위한 목적으로만 사용됩니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">2. 쿠키(Cookie) 및 웹 비콘의 사용</h2>
          <p>
            본 사이트는 사용자의 편의를 위해 쿠키(Cookie)를 사용합니다. 쿠키는 웹사이트를 운영하는 데 이용되는 서버가 사용자의 브라우저에 보내는 아주 작은 텍스트 파일로, 사용자의 컴퓨터 하드디스크에 저장됩니다. 
            사용자는 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">3. 구글 애드센스(Google AdSense) 및 타사 광고</h2>
          <p>
            본 사이트는 구글(Google)을 포함한 타사 공급업체와 광고 네트워크의 광고를 게재할 수 있습니다. 구글은 쿠키(웹에서 사용자의 활동을 기록하는 파일)를 사용하여 사용자가 본 사이트 또는 다른 웹사이트를 방문한 기록을 기반으로 맞춤형 광고를 게재합니다. 특히 구글은 **DART 쿠키**를 사용하여 인터넷의 여러 사이트 방문 기록을 바탕으로 사용자에게 적절한 광고를 게재합니다.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>구글 및 타사 공급업체는 쿠키를 사용하여 이전 방문 기록을 기반으로 광고를 제공합니다.</li>
            <li>사용자는 <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Google 광고 설정</a>을 방문하여 맞춤설정 광고에 사용되는 DART 쿠키를 거부할 수 있습니다.</li>
            <li>기타 타사 공급업체의 쿠키 사용을 거부하시려면 <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">aboutads.info</a>를 방문하시기 바랍니다.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">4. 개인정보의 제3자 제공</h2>
          <p>
            본 사이트는 법령에 규정된 경우를 제외하고는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 통계 작성, 학술 연구 또는 시장 조사를 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 가공하여 제공할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">5. 개인정보보호 문의처</h2>
          <p>
            개인정보처리방침과 관련된 문의사항이 있으실 경우, 아래의 연락처로 문의해주시기 바랍니다.
            <br/><br/>
            이메일: <a href="mailto:rira.game.hub@gmail.com" className="text-brand-primary hover:underline">rira.game.hub@gmail.com</a>
          </p>
        </section>

        <div className="pt-8 text-sm text-gray-500">
          <p>본 개인정보처리방침은 2026년 6월 5일부터 적용됩니다.</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
