import React from 'react';
import { Link, useNavigate } from 'react-router';
import { ARCHIVE_DATA } from '../data/archive';
import homeStatsData from '../data/search/home-stats.json';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import { NoticeListView, useNoticeBadge } from '../components/NoticeComponents';
import { Notice } from '../data/types';
import AdPlaceholder from '../components/AdPlaceholder';
import {
  ChevronRight,
  Database,
  FileText,
  Users,
  Globe,
  Terminal,
  Search,
  ArrowRight
} from 'lucide-react';

// WebP banner asset fallbacks for game hubs
export const DEFAULT_GAME_BANNERS = {
  hsr: '/assets/banners/hsr_placeholder.webp',
  ww: '/assets/banners/ww_placeholder.webp',
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [globalNotices, setGlobalNotices] = React.useState<Notice[]>([]);
  const navigate = useNavigate();
  const [dailyHubTab, setDailyHubTab] = React.useState<'patch_notes' | 'notices'>('patch_notes');
  const { markAsRead } = useNoticeBadge();

  React.useEffect(() => {
    import('../data/notices').then(({ fetchNotices }) => {
      fetchNotices().then(setGlobalNotices);
    });
  }, []);

  const gameStats = homeStatsData.games as Record<string, { characters: number; guides: number }>;
  const gameDescriptions: Record<string, { eyebrow: string; categories: string; accent: string; icon: string }> = {
    hsr: { eyebrow: '붕괴: 스타레일 공략 허브', categories: '캐릭터 · 광추 · 유물 · 파티', accent: 'border-purple-400/30 hover:border-purple-400/70', icon: '✦' },
    ww: { eyebrow: '명조: 워더링 웨이브 공략 허브', categories: '공명자 · 무기 · 에코 · 파티', accent: 'border-emerald-400/30 hover:border-emerald-400/70', icon: '◈' },
    nte: { eyebrow: '이환 공략·데이터 허브', categories: '캐릭터 · 아크 · 카트리지 · 이동 수단', accent: 'border-sky-400/30 hover:border-sky-400/70', icon: '◇' },
    aniimo: { eyebrow: '애니모 도감 허브', categories: '애니모 · 진화 · 성격 · 서식지', accent: 'border-amber-400/30 hover:border-amber-400/70', icon: '●' },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-primary font-sans">
      <SEO
        title={t('리라 아카이브 | 애니모·명조·스타레일 게임 DB')}
        description="리라 아카이브는 애니모(Aniimo), 명조(Wuthering Waves), 붕괴: 스타레일, 이환의 캐릭터 도감, 능력치 비교, 티어표와 육성 가이드를 제공하는 통합 게임 데이터베이스입니다."
        keywords="리라 아카이브, 서브컬쳐 데이터베이스, 애니모, Aniimo, 애니모 도감, 애니모 능력치 비교, 명조, Wuthering Waves, 붕괴 스타레일, Honkai Star Rail, 이환, Neverness to Everness, 게임 공략, 티어표, 위키, DB"
        isHomepage={true}
        name="RIRA ARCHIVE"
        googleVerification={import.meta.env.VITE_GOOGLE_VERIFICATION}
      />
      {/* Background Grid/Matrix Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* 사용자의 첫 행동을 검색과 게임 선택으로 제한한 홈 히어로 */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 md:px-10 md:pt-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-brand-primary/10 rounded-full blur-[100px] sm:blur-[150px] -translate-y-1/2 translate-x-1/4 opacity-40" />
          <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-accent/5 rounded-full blur-[80px] sm:blur-[120px] translate-y-1/2 -translate-x-1/4 opacity-30" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <Terminal size={14} className="shrink-0 text-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">{t('4개 게임 통합 아카이브')}</span>
          </div>

          <div className="mt-6 space-y-5">
            <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl md:text-6xl">
              {t('게임을 고르고,')}<br />
              <span className="bg-gradient-to-r from-brand-accent via-brand-light to-brand-primary bg-clip-text text-transparent">{t('필요한 답부터 찾으세요.')}</span>
            </h1>
            <p className="mx-auto max-w-2xl px-2 text-sm font-medium leading-7 text-gray-400 sm:text-base">
              {t('캐릭터 이름이나 장비를 검색하거나, 플레이 중인 게임을 선택해 도감과 세팅·분석 가이드로 바로 이동하세요.')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
            className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-4 rounded-2xl border border-white/10 bg-[#121212] px-5 py-4 text-left shadow-2xl transition hover:border-brand-primary/50 hover:bg-white/[0.06]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary"><Search size={20} /></span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm text-white">{t('전체 게임에서 검색')}</strong>
              <span className="mt-0.5 block truncate text-xs text-gray-500">{t('캐릭터·장비·공략 이름을 입력하세요')}</span>
            </span>
            <kbd className="hidden rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-[10px] font-bold text-gray-400 sm:block">⌘ K</kbd>
          </button>
        </div>
      </section>

      {/* 게임 선택: 같은 목적의 빠른 접근·대형 배너 영역을 하나로 통합 */}
      <section className="relative z-20 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-accent">Choose a game</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{t('플레이 중인 게임')}</h2>
          </div>
          <span className="hidden text-xs text-gray-500 sm:block">{t('도감 · 세팅 · 분석 가이드')}</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {ARCHIVE_DATA.games.map((game) => {
            const meta = gameDescriptions[game.id];
            return <Link key={game.id} to={`/gallery/${game.id}`} className={`group flex min-h-[158px] flex-col justify-between rounded-2xl border bg-[#121212] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.045] ${meta.accent}`}>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400">
                  <span className="text-base text-brand-accent" aria-hidden="true">{meta.icon}</span>
                  <span>{meta.eyebrow}</span>
                </div>
                <h3 className="mt-3 text-xl font-black text-white">{game.title}</h3>
                <p className="mt-1.5 text-[11px] font-medium leading-5 text-gray-500">{meta.categories}</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/5 pt-3">
                <span className="text-[11px] font-bold text-gray-400">{t('캐릭터')} {gameStats[game.id]?.characters ?? 0} · {t('가이드')} {gameStats[game.id]?.guides ?? 0}</span>
                <ArrowRight size={15} className="text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
            </Link>
          })}
        </div>
      </section>

      {/* Rira Daily Hub (패치 노트 및 공지사항 탭) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 mb-8 relative z-20">
        <div className="bg-[#121212] border border-white/5 rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-5">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="text-brand-accent shrink-0" />
                <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-[0.2em] font-mono">{t('Rira Daily Hub')}</h2>
              </div>
              <div className="flex items-center gap-1.5 bg-[#121212] p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setDailyHubTab('patch_notes')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all ${dailyHubTab === 'patch_notes' ? 'bg-brand-primary/20 text-brand-primary' : 'text-gray-400 hover:text-white'}`}
                >
                  {t('패치 노트')}
                </button>
                <button
                  onClick={() => setDailyHubTab('notices')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all ${dailyHubTab === 'notices' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {t('전체 공지')}
                </button>
              </div>
            </div>

            <Link to="/notices" className="inline-flex items-center gap-1.5 text-xs font-black text-gray-400 hover:text-brand-primary uppercase tracking-widest transition-colors self-end sm:self-center">
              {t('+ 더보기')} <ChevronRight size={14} />
            </Link>
          </div>

          <div className="min-h-[160px]">
            {dailyHubTab === 'patch_notes' ? (
              <NoticeListView
                notices={globalNotices.filter(n => n.category === 'Update').slice(0, 3)}
                onNoticeClick={(n) => {
                  markAsRead(n.id);
                  navigate(`/notices/${n.id}`);
                }}
                emptyMessage={t('새로운 패치 노트가 없습니다.')}
              />
            ) : (
              <NoticeListView
                notices={globalNotices.slice(0, 3)}
                onNoticeClick={(n) => {
                  markAsRead(n.id);
                  navigate(`/notices/${n.id}`);
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* 데이터 분석 방법론 섹션 (E-E-A-T 강화) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 space-y-12 sm:space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
              <Users size={20} className="text-brand-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-black italic tracking-tighter uppercase">{t('누가 운영하나요?')}</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
              {t('리라 아카이브는 게임 정보를 한곳에서 빠르게 확인할 수 있도록 직접 운영하는 비공식 팬 아카이브입니다. 등록 데이터와 공략은 게시 전 원문 표기와 사이트 내 연결 상태를 확인합니다.')}
            </p>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
              <Database size={20} className="text-brand-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-black italic tracking-tighter uppercase">{t('어떻게 검토하나요?')}</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
              {t('공개된 게임 정보와 게임 내 설명을 기준으로 데이터를 정리하고, 추천 세팅과 운용 판단은 별도의 분석 영역으로 구분합니다. 패치로 내용이 바뀌면 적용 버전과 검토일을 갱신하며 제보된 오류도 다시 확인합니다.')}
            </p>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <Globe size={20} className="text-yellow-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-black italic tracking-tighter uppercase">{t('왜 Rira Archive인가요?')}</h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
              {t('도감의 사실 정보와 세팅 추천, 선택 이유를 분리해 사용자가 필요한 답을 빠르게 찾도록 구성합니다. 확정하기 어려운 내용은 단정하지 않고 업데이트 과정에서 계속 보완합니다.')}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 pb-16 sm:pb-24">
        <AdPlaceholder type="leaderboard" />
      </div>
    </div>
  );
};

export default Home;
