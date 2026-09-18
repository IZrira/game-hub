import React from 'react';
import { Database, Search, ShieldCheck, Users } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';

const GalleryAniimo: React.FC = () => {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
      <SEO
        title="애니모 아카이브 | Aniimo 캐릭터·공략 데이터베이스"
        description="애니모(Aniimo)의 캐릭터, 육성 정보와 공략을 정확한 출처를 바탕으로 정리하는 리라 아카이브입니다."
        url="/gallery/aniimo"
        gameCategory="애니모"
        breadcrumbData={[
          { name: '홈', url: '/' },
          { name: '애니모', url: '/gallery/aniimo' }
        ]}
      />
      <PageHeader gameId="aniimo" title="애니모 아카이브" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
        <section className="relative overflow-hidden rounded-[32px] sm:rounded-[48px] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#121212] to-cyan-400/10 p-7 sm:p-12 md:p-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative max-w-3xl space-y-5">
            <span className="inline-flex rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-violet-200">
              Archive Preview
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tighter">
              ANIIMO <span className="text-violet-300">ARCHIVE</span>
            </h1>
            <p className="max-w-2xl text-sm sm:text-base leading-7 text-gray-300">
              애니모 캐릭터와 육성 정보를 한곳에서 탐색할 수 있는 전용 데이터베이스를 준비하고 있습니다.
              공식적으로 확인된 정보만 순차적으로 공개합니다.
            </p>
          </div>
        </section>

        <section aria-labelledby="aniimo-roadmap" className="space-y-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-300">Opening roadmap</p>
            <h2 id="aniimo-roadmap" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">개설 준비 항목</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, title: '캐릭터 도감', text: '이름과 역할, 공개 상태를 기준으로 정리합니다.' },
              { icon: Search, title: '검색과 필터', text: '원하는 캐릭터를 빠르게 찾도록 구성합니다.' },
              { icon: Database, title: '상세 데이터', text: '검증된 능력과 육성 정보를 연결합니다.' },
              { icon: ShieldCheck, title: '출처 검증', text: '확인되지 않은 수치와 추정 정보는 게시하지 않습니다.' }
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <Icon className="mb-5 text-violet-300" size={24} aria-hidden="true" />
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#121212] p-7 sm:p-10">
          <h2 className="text-xl font-black">현재 상태</h2>
          <p className="mt-3 text-sm leading-7 text-gray-400">
            허브 기본 구조와 검색엔진용 고유 페이지를 먼저 개설했습니다. 캐릭터 상세 URL은 공식 데이터가 준비된 뒤
            실제 콘텐츠와 함께 공개하며, 빈 상세 페이지나 임시 식별자 URL은 만들지 않습니다.
          </p>
        </section>
      </main>
    </div>
  );
};

export default GalleryAniimo;
