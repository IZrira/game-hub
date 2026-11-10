import React from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

type GoogleFundingChoices = { callbackQueue?: Array<() => void>; showRevocationMessage?: () => void };

// Reopens Google's consent message (certified CMP set up in AdSense). Google only
// shows it to visitors in regions where it asks for consent (EEA, UK, Switzerland).
const openAdConsentSettings = () => {
  const w = window as unknown as { googlefc?: GoogleFundingChoices };
  w.googlefc = w.googlefc || {};
  w.googlefc.callbackQueue = w.googlefc.callbackQueue || [];
  w.googlefc.callbackQueue.push(() => w.googlefc?.showRevocationMessage?.());
};

const sectionTitle = 'text-2xl font-black text-white border-b border-white/10 pb-4';
const link = 'text-brand-primary-text hover:underline';

const PrivacyPolicy: React.FC = () => {
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
          <h2 className={sectionTitle}>1. 처리하는 정보와 이용 목적</h2>
          <p>Rira Game Hub(이하 "본 사이트")는 게임 정보 서비스를 운영하는 데 필요한 범위에서만 정보를 처리합니다.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong className="text-gray-200">로그인(선택):</strong> Google 또는 Discord로 로그인하면 해당 계정의 이메일 주소, 표시 이름, 프로필 이미지를 받아 로그인 유지와 작성자 표시에 사용합니다. 로그인하지 않아도 모든 정보 페이지를 이용할 수 있습니다.</li>
            <li><strong className="text-gray-200">리뷰·댓글(로그인 사용자):</strong> 닉네임, 평점, 작성 내용, 첨부 이미지, 작성 시각, 좋아요와 신고 기록을 게시와 운영(신고 처리 등)에 사용합니다.</li>
            <li><strong className="text-gray-200">방문 통계:</strong> Cloudflare Web Analytics로 페이지 조회 수, 유입 경로, 기기 유형 같은 집계 통계를 확인합니다. 이 통계 도구는 쿠키를 사용하지 않습니다.</li>
            <li><strong className="text-gray-200">문의:</strong> 이메일로 문의하면 답변을 위해 발신 주소와 문의 내용을 처리합니다.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className={sectionTitle}>2. 쿠키와 브라우저 저장소</h2>
          <p>
            쿠키는 웹사이트가 브라우저에 저장하는 작은 정보 파일입니다. 본 사이트는 언어 설정, 즐겨찾기, 최근 검색어, 화면 고정 설정을 브라우저 저장소에 보관하며, 예전 언어 주소로 들어온 경우 언어 설정을 쿠키(<code>rira_lang</code>)로 한 번 저장합니다. 이 값들은 기능 제공에만 쓰입니다.
          </p>
          <p>사용자는 브라우저 설정에서 쿠키와 사이트 데이터를 확인하거나 차단·삭제할 수 있습니다. 차단하면 일부 설정 기능이 유지되지 않을 수 있습니다.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionTitle}>3. 구글 애드센스(Google AdSense) 및 타사 광고</h2>
          <p>
            본 사이트는 Google을 포함한 타사 공급업체의 광고를 게재할 수 있습니다. Google을 비롯한 타사 공급업체는 쿠키를 사용하여 사용자가 본 사이트 또는 다른 웹사이트를 이전에 방문한 기록을 바탕으로 광고를 게재합니다.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li>Google은 광고 쿠키를 사용하여 Google과 파트너가 본 사이트 및 다른 웹사이트 방문 기록을 바탕으로 사용자에게 광고를 게재할 수 있도록 합니다.</li>
            <li>사용자는 <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className={link}>Google 내 광고 센터</a>에서 맞춤 광고를 사용 중지할 수 있습니다.</li>
            <li>다른 타사 공급업체의 맞춤 광고용 쿠키는 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className={link}>aboutads.info</a>에서 사용 중지할 수 있습니다.</li>
            <li>Google이 파트너 사이트에서 수집한 정보를 사용하는 방식은 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={link}>Google 파트너 사이트 정보 사용 안내</a>에서 확인할 수 있습니다.</li>
            <li>유럽경제지역(EEA), 영국, 스위스 방문자에게는 Google 인증 동의 관리 플랫폼(CMP)의 동의 메시지가 표시되며, 선택에 따라 광고 쿠키 사용 여부가 정해집니다.</li>
          </ul>
          <button
            type="button"
            onClick={openAdConsentSettings}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-bold text-gray-200 hover:bg-white/5"
          >
            광고 동의 설정 변경 (EEA·영국·스위스 방문자)
          </button>
        </section>

        <section className="space-y-4">
          <h2 className={sectionTitle}>4. 처리 위탁과 제3자 제공</h2>
          <p>본 사이트는 서비스 운영을 위해 다음 업체의 서비스를 이용하며, 이용자의 개인정보를 판매하지 않습니다.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-400">
            <li><strong className="text-gray-200">Supabase:</strong> 로그인 계정 관리와 리뷰·댓글·첨부 이미지 저장</li>
            <li><strong className="text-gray-200">Cloudflare:</strong> 웹사이트 호스팅과 방문 통계</li>
            <li><strong className="text-gray-200">Google:</strong> 광고 게재(Google AdSense)와 Google 로그인</li>
            <li><strong className="text-gray-200">Discord:</strong> Discord 로그인</li>
          </ul>
          <p>법령에 근거한 요청이 있는 경우를 제외하고, 위 목적 외로 개인정보를 제3자에게 제공하지 않습니다.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionTitle}>5. 보관과 삭제</h2>
          <p>
            리뷰와 댓글은 작성자가 직접 삭제할 수 있습니다. 로그인 계정 정보와 작성한 게시물의 삭제를 원하면 아래 이메일로 요청해 주세요. 확인 후 지체 없이 처리하며, 법령에 따라 보관해야 하는 정보는 해당 기간 동안만 보관합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionTitle}>6. 개인정보보호 문의처</h2>
          <p>
            개인정보처리방침과 관련된 문의사항이 있으실 경우, 아래의 연락처로 문의해주시기 바랍니다.
            <br/><br/>
            이메일: <a href="mailto:rira.game.hub@gmail.com" className={link}>rira.game.hub@gmail.com</a>
          </p>
        </section>

        <div className="pt-8 text-sm text-gray-400">
          <p>본 개인정보처리방침은 2026년 11월 3일부터 적용됩니다. (이전 버전: 2026년 11월 2일, 2026년 6월 5일 시행)</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
