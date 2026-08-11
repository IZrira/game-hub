import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title="이용약관 (Terms of Service)" 
        description="Rira Game Hub의 이용약관 및 운영 원칙을 안내합니다." 
        url="/tos"
      />
      <PageHeader title="Terms of Service" category="Legal" />

      <main className="max-w-[800px] mx-auto px-6 md:px-8 pt-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tighter">
          이용약관 <span className="text-brand-primary text-xl md:text-2xl ml-2">Terms of Service</span>
        </h1>

        <div className="prose prose-invert prose-brand max-w-none text-gray-300">
          <p className="lead text-lg text-gray-400 mb-8 border-l-4 border-brand-primary pl-4">
            본 약관은 Rira Game Hub(이하 "본 사이트")가 제공하는 모든 서비스의 이용 조건 및 절차, 사용자와 사이트 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 1 조 (목적)</h3>
          <p>
            이 약관은 본 사이트가 제공하는 게임 정보, 가이드, 도감 및 관련 제반 서비스의 이용과 관련하여 회사와 회원(또는 비회원 사용자)과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 2 조 (용어의 정의)</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>본 사이트:</strong> Rira Game Hub (rira-game-hub.pages.dev) 및 관련 서브도메인 일체</li>
            <li><strong>이용자:</strong> 본 사이트에 접속하여 이 약관에 따라 본 사이트가 제공하는 서비스를 받는 자</li>
            <li><strong>콘텐츠:</strong> 본 사이트가 제공하는 텍스트, 이미지, 동영상, 데이터베이스 등 일체의 정보</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 3 조 (저작권 및 지적재산권)</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>본 사이트 내에 포함된 게임 이미지, 아이콘, 텍스트(캐릭터 이름, 스킬명 등)의 원 저작권은 해당 게임의 원작자(HoYoverse, Kuro Games 등)에게 귀속됩니다.</li>
            <li>본 사이트가 독자적으로 작성한 분석 글, 가이드, 칼럼, 티어표 및 UI/UX 레이아웃의 저작권은 본 사이트에 있습니다.</li>
            <li>이용자는 본 사이트의 정보를 영리 목적으로 무단 복제, 전송, 배포, 크롤링(스크래핑)할 수 없으며, 타 사이트에 인용할 경우 반드시 출처를 명시해야 합니다.</li>
          </ol>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 4 조 (면책 조항)</h3>
          <p>
            본 사이트는 사용자에게 게임 플레이에 도움이 되는 데이터를 제공하는 것을 목적으로 하며, 다음 사항에 대해 책임을 지지 않습니다.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>본 사이트의 데이터(가이드, 티어표 등)는 운영진의 주관적 분석이 포함될 수 있으며, 정보의 절대적인 정확성이나 게임 내 결과물(재화 소모 등)을 보장하지 않습니다.</li>
            <li>사용자가 본 사이트의 정보를 바탕으로 행한 게임 내 결정(가챠, 육성 등)으로 인해 발생한 손실이나 피해에 대해 본 사이트는 법적 책임을 지지 않습니다.</li>
            <li>본 사이트에 포함된 외부 링크(광고, 서드파티 서비스)에 의해 발생하는 문제에 대해 본 사이트는 책임지지 않습니다.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 5 조 (광고 게재 및 수익 창출)</h3>
          <p>
            본 사이트는 구글 애드센스(Google AdSense)를 포함한 외부 광고 네트워크의 광고를 게재할 수 있습니다.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>광고 송출을 위해 타사 공급업체가 쿠키(DART 쿠키 등)를 사용할 수 있으며, 이에 대한 자세한 사항은 [개인정보처리방침]을 따릅니다.</li>
            <li>이용자는 광고를 임의로 차단하거나 비정상적인 방법(어뷰징)으로 클릭을 유도해서는 안 됩니다.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 6 조 (서비스의 변경 및 중단)</h3>
          <p>
            본 사이트는 시스템 점검, 서버 증설 및 교체, 통신 두절 또는 불가항력적 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 또한 운영상의 이유로 언제든지 서비스의 일부 또는 전부를 변경하거나 종료할 수 있습니다.
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">제 7 조 (관할 법원)</h3>
          <p>
            본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따르며, 서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우 본 사이트 운영자의 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
          </p>

          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
            <p>공고일자: 2026년 6월 15일</p>
            <p>시행일자: 2026년 6월 15일</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
