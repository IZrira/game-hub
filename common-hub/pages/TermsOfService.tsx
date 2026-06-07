import React from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title="이용약관 (Terms of Service)" 
        description="Rira Game Hub 서비스 이용약관을 안내합니다." 
        url="/tos" 
      />
      <PageHeader title="이용약관" category="Policy" />
      
      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-12 space-y-12 leading-relaxed text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">제 1 조 (목적)</h2>
          <p>
            본 약관은 Rira Game Hub(이하 "서비스")가 제공하는 게임 정보, 통계 데이터 및 관련 제반 서비스의 이용과 관련하여, 
            서비스 제공자와 이용자 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">제 2 조 (용어의 정의)</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong>이용자:</strong> 본 서비스에 접속하여 본 약관에 따라 제공하는 서비스를 받는 자를 말합니다.</li>
            <li><strong>콘텐츠:</strong> 서비스가 제공하는 모든 텍스트, 이미지, 데이터, UI 및 기타 정보 등 일체의 결과물을 의미합니다.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">제 3 조 (지적재산권 및 저작권)</h2>
          <p>
            본 서비스는 비영리, 팬 메이드(Fan-made) 기반의 연구 및 교육적 목적으로 운영됩니다. 
            서비스 내에 포함된 게임 명칭, 캐릭터 이미지, 스킬 정보 및 관련 로고 등 모든 게임 관련 자산의 저작권과 지적재산권은 해당 게임의 원저작권자(HoYoverse, Kuro Games 등)에게 있습니다. 
            본 서비스는 저작권법상의 '공정이용(Fair Use)' 원칙에 따라 정보를 분석하고 제공합니다.
          </p>
          <p className="mt-4 text-brand-accent font-bold">
            이용자는 본 서비스에서 제공하는 데이터를 임의로 상업적 용도로 무단 복제, 배포하거나 2차적 저작물을 생성할 수 없습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">제 4 조 (서비스의 제공 및 변경)</h2>
          <p>
            서비스 제공자는 업무상 또는 기술상의 필요에 따라 제공하고 있는 서비스의 전부 또는 일부를 변경할 수 있습니다. 
            서비스의 내용, 이용방법, 이용시간 등에 대하여 변경이 있는 경우에는 사전에 공지합니다. 단, 사전 공지가 불가능한 불가피한 사유가 있는 경우에는 사후에 공지할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">제 5 조 (면책조항)</h2>
          <p>
            서비스 제공자는 천재지변, 서버 장애, 통신망 오류 기타 불가항력적인 사유로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. 
            또한 이용자가 서비스의 데이터를 활용하여 얻은 결과나 손실에 대해서는 일체의 책임을 지지 않습니다. 모든 데이터와 분석 정보는 참고용으로만 제공됩니다.
          </p>
        </section>

        <div className="pt-8 text-sm text-gray-500">
          <p>본 약관은 2026년 6월 5일부터 적용됩니다.</p>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
