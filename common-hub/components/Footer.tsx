import React from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: t('홈'), path: '/' },
    { name: t('사이트 소개'), path: '/about' },
    { name: t('공지사항'), path: '/notices' },
  ];

  const policyLinks = [
    { name: t('개인정보 처리방침'), path: '/privacy' },
    { name: t('이용약관'), path: '/tos' },
    { name: t('문의하기'), path: '/contact' },
  ];

  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5 pt-12 sm:pt-16 pb-8 px-4 sm:px-6 md:px-8 mt-auto font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* 컬럼 1: 브랜드 슬로건 */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">RIRA GAME HUB</h2>
              <p className="text-[10px] font-black tracking-[0.16em] text-brand-primary">
                {t('게임 통합 데이터베이스')}
              </p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs font-medium">
              {t('캐릭터와 장비 도감, 세팅 공략과 분석 가이드를 게임별로 정리한 비공식 팬 아카이브입니다.')}
            </p>
          </div>

          {/* 컬럼 2: 네비게이션 */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white">{t('바로가기')}</h3>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-brand-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 컬럼 3: 지원 게임 */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white">{t('지원 게임')}</h3>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              <li><Link to="/gallery/hsr" className="hover:text-brand-primary transition-colors">Honkai: Star Rail</Link></li>
              <li><Link to="/gallery/ww" className="hover:text-brand-primary transition-colors">Wuthering Waves</Link></li>
              <li><Link to="/gallery/nte" className="hover:text-brand-primary transition-colors">Neverness to Everness</Link></li>
              <li><Link to="/gallery/aniimo" className="hover:text-brand-primary transition-colors">Aniimo</Link></li>
            </ul>
          </div>

          {/* 컬럼 4: 정책 및 소셜 */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white">{t('정책 및 안내')}</h3>
            <ul className="space-y-3 text-xs font-bold text-gray-400">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 저작권 및 면책 조항 */}
        <div className="pt-8 border-t border-white/5 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-[10px] font-bold text-gray-400">
            <span>Copyright © {currentYear} RIRA ARCHIVE. All rights reserved.</span>
            <span>{t('비공식 팬 아카이브')}</span>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] leading-relaxed text-gray-400 font-medium">
              <strong className="text-gray-400">{t('면책 안내')}:</strong> {t('RIRA ARCHIVE는 각 게임사와 공식 제휴하거나 승인을 받은 서비스가 아닌 비공식 팬 아카이브입니다. 게임 관련 이미지와 명칭의 권리는 각 권리자에게 있습니다.')}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-bold text-gray-400">
              <span>© HoYoverse</span>
              <span>© Kuro Games</span>
              <span>© Hotta Studio / Perfect World</span>
              <span>© Aniimo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
