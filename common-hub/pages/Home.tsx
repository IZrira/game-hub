
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { ARCHIVE_DATA, CHARACTER_DB } from '../data/games';
import { ITEM_META } from '../data/items';
import { HSR_CHARACTER_GUIDES } from '../../hsr-hub/data/guides';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import LazyImage from '../components/LazyImage';
import { NoticeListView, useNoticeBadge } from '../components/NoticeComponents';
import { Notice } from '../data/types';
import AdPlaceholder from '../components/AdPlaceholder';
import { 
  ChevronRight, 
  Zap, 
  Bell,
  Activity as ActivityIcon, 
  Database, 
  FileText, 
  Users,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Globe,
  Terminal,
  Server,
  TerminalSquare,
  BookOpen
} from 'lucide-react';

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

  /**
   * @description 프로젝트 전체의 메트릭(게임, 캐릭터, 가이드, 아이템 수)을 연산하여 반환합니다.
   * @returns {{ games: number, characters: number, guides: number, items: number }} 글로벌 통계 객체
   */
  const globalStats = useMemo(() => {
    const guideCount = HSR_CHARACTER_GUIDES ? HSR_CHARACTER_GUIDES.length : 0;
    return {
      games: ARCHIVE_DATA.games.length,
      characters: CHARACTER_DB.length,
      guides: ARCHIVE_DATA.games.reduce((acc, game) => acc + game.posts.length, 0) + guideCount,
      items: Object.keys(ITEM_META).length
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-primary font-sans">
      <SEO 
        title={t('리라 아카이브 | 스타레일 & 명조 고밀도 전략 데이터베이스')} 
        description="리라 아카이브는 붕괴: 스타레일, 명조 등 서브컬쳐 게임의 고밀도 데이터와 심층 분석을 제공하는 프리미엄 전략 가이드입니다. 최신 메타와 티어표, 육성 가이드를 확인하세요."
        isHomepage={true}
        name="RIRA ARCHIVE"
        googleVerification={import.meta.env.VITE_GOOGLE_VERIFICATION}
      />
      {/* Background Grid/Matrix Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* 글로벌 헤로 대시보드 */}
      <section className="relative pt-24 pb-32 px-10 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 opacity-40" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 opacity-30" />
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10 text-center space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <Terminal size={14} className="text-brand-accent animate-pulse" />
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">{t('Initializing Rira Archive Database...')}</span>
          </div>
          
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            <h1 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter">
          {t('완벽한 플레이를 위한')}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-light to-brand-primary italic">{t('데이터의 정점.')}</span>
            </h1>
            <p className="max-w-3xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
          {t('리라 아카이브는 고밀도 데이터와 심층 분석을 통해')}<br/>
          {t('당신의 성장을 완벽하게 서포트하는 프리미엄 전략 가이드입니다.')}
            </p>
          </div>

          <div className="pt-8 flex justify-center items-center gap-4 animate-in fade-in duration-1000 delay-500 flex-wrap">
            <Link to="/blog" className="flex items-center gap-2 text-xs font-black text-white bg-brand-primary/20 border border-brand-primary/50 hover:bg-brand-primary hover:text-black px-6 py-3 rounded-full uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.6)] hover:scale-105">
              <BookOpen size={16} /> {t('인기 공략/칼럼 모아보기')}
            </Link>
            <div className="flex gap-4 px-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                <Server size={12} className="text-brand-primary" /> Multi-Game Synchronized
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                <Zap size={12} className="text-yellow-500" /> Real-time Analytics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 글로벌 통계 메트릭 */}
      <section className="relative z-20 max-w-6xl mx-auto -mt-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_32px_64px_rgba(0,0,0,0.6)] divide-x divide-white/5">
        <StatMetric label={t('보유 캐릭터')} value={globalStats.characters} icon={<Database size={16}/>} color="text-brand-accent" />
        <StatMetric label={t('전략 리포트')} value={globalStats.guides} icon={<FileText size={16}/>} color="text-brand-primary" />
        <StatMetric label={t('분석 데이터')} value={globalStats.items} icon={<Zap size={16}/>} color="text-yellow-500" />
        <StatMetric label={t('활성 아카이브')} value={globalStats.games} icon={<ShieldCheck size={16}/>} color="text-green-500" />
        </div>
      </section>

      {/* Rira Daily Hub (패치 노트 및 공지사항 탭) */}
      <section className="max-w-6xl mx-auto px-6 mt-24 mb-8 relative z-20">
        <div className="bg-[#121212] border border-white/5 rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-brand-accent" />
                <h2 className="text-lg font-black text-white uppercase tracking-[0.2em] font-mono">{t('Rira Daily Hub')}</h2>
              </div>
              <div className="flex items-center gap-2 bg-[#121212] p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setDailyHubTab('patch_notes')}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${dailyHubTab === 'patch_notes' ? 'bg-brand-primary/20 text-brand-primary' : 'text-gray-500 hover:text-white'}`}
                >
                  {t('패치 노트')}
                </button>
                <button
                  onClick={() => setDailyHubTab('notices')}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${dailyHubTab === 'notices' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  {t('전체 공지')}
                </button>
              </div>
            </div>
            
            <Link to="/notices" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-brand-primary uppercase tracking-widest transition-colors">
              {t('+ 더보기')} <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="min-h-[200px]">
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

      {/* 게임 라이브러리 센터 */}
      <section className="max-w-[1600px] mx-auto px-10 py-16 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter italic flex items-center gap-4">
          <span className="text-brand-accent">/</span> {t('아카이브 탐색')}
            </h2>
        <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">{t('분석이 필요한 게임의 데이터베이스를 선택하세요')}</p>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
        <TrendingUp size={14} className="text-brand-accent" /> {t('현재 인기 아카이브')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ARCHIVE_DATA.games.map((game, index) => (
            <Link 
              key={game.id}
              to={`/gallery/${game.id}`}
              className="group relative h-[480px] rounded-[56px] overflow-hidden border border-white/5 bg-[#121212] transition-all duration-700 hover:border-brand-primary/50 hover:shadow-[0_48px_96px_rgba(0,0,0,0.7)]"
            >
              <LazyImage 
                src={game.id === 'hsr' ? '/assets/banners/hsr_placeholder.png' : game.id === 'ww' ? '/assets/banners/ww_placeholder.png' : game.bannerImage} 
                alt={`${game.title} - ${t('리라 아카이브 게임 데이터베이스 탐색')}`}
                loading="eager"
                fetchPriority={index === 0 ? "high" : "auto"}
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-14 flex flex-col justify-between">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-brand-primary/30 backdrop-blur-md border border-brand-primary/30 text-[10px] font-black uppercase tracking-widest text-brand-accent">
                {t('시스템 코드:')} {game.id.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-black uppercase text-gray-400">
                <ActivityIcon size={12} className="text-green-500" /> {t('데이터 동기화 완료')}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-4xl md:text-5xl font-black leading-none text-white tracking-tighter group-hover:text-brand-accent transition-colors italic">
                      {game.title}
                    </h3>
                    <p className="text-gray-400 text-xl font-medium max-w-sm">
                      {game.subTitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-10 pt-4">
                    <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest mb-1">{t('캐릭터 명단')}</span>
                      <span className="text-3xl font-black tabular-nums">{CHARACTER_DB.filter(c => c.gameId === game.id).length}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest mb-1">{t('전략 보고서')}</span>
                      <span className="text-3xl font-black tabular-nums">{game.posts.length}</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all group-hover:bg-brand-accent group-hover:text-white group-hover:scale-105 group-hover:-translate-y-1 shadow-lg shadow-white/5">
                  {game.title} {t('데이터베이스 탐색')} <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          <div className="h-[480px] rounded-[56px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12 bg-white/[0.02] group transition-all hover:bg-white/[0.04]">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 border border-white/5">
              <Cpu size={40} className="text-gray-700" />
            </div>
        <h4 className="text-xl font-black text-gray-600 uppercase tracking-[0.2em] mb-4">{t('새로운 데이터 연결 준비 중')}</h4>
        <p className="text-gray-700 text-base font-medium">{t('Coming Soon: 젠레스 존 제로 & 원신 임팩트')}</p>
          </div>
        </div>
      </section>

      {/* 데이터 분석 방법론 섹션 (E-E-A-T 강화) */}
      <section className="max-w-6xl mx-auto px-6 py-32 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
              <Users size={20} className="text-brand-primary" />
            </div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase">{t('Who Created This?')}</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {t('리라 아카이브의 모든 데이터는 수년간의 서브컬쳐 게임 플레이 경력을 보유한 전담 데이터 분석팀과 에디터들에 의해 정밀하게 검토되고 작성됩니다.')}
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
              <Database size={20} className="text-brand-accent" />
            </div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase">{t('How Is It Built?')}</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {t('수년간의 하드코어 플레이 경험을 가진 전문 에디터 팀의 자체 데이터 시뮬레이션 및 교차 검증을 통해 최상의 전략과 가이드를 도출합니다. 모든 데이터는 철저한 인게임 테스트를 통해 최종 검토되어 가장 높은 신뢰도를 보장합니다.')}
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <Globe size={20} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase">{t('Why Rira Archive?')}</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {t('단순한 정보 나열을 넘어, 사용자가 가장 직관적이고 빠르게 최적의 플레이를 찾을 수 있도록 고밀도의 전술 지능을 제공하는 것이 리라 아카이브의 유일한 목표입니다.')}
            </p>
          </div>
        </div>
      </section>

      {/* SEO & AdSense 봇을 위한 사이트 상세 소개글 (Text-heavy block) */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-10 md:p-14 space-y-8">
          <h2 className="text-2xl font-black text-white border-b border-white/10 pb-4">
            Rira Game Hub: 최고의 서브컬쳐 게임 공략 및 데이터베이스
          </h2>
          <div className="space-y-6 text-gray-400 text-sm md:text-base leading-loose">
            <p>
              Rira Game Hub(리라 게임 허브)는 전 세계 수많은 플레이어들이 열광하는 서브컬쳐 모바일 및 PC 게임에 대한 심도 깊은 데이터베이스와 공략을 제공하는 통합 인텔리전스 터미널입니다. 현재 <strong>붕괴: 스타레일(Honkai: Star Rail)</strong>과 <strong>명조: 워더링 웨이브(Wuthering Waves)</strong>의 실시간 메타 분석, 캐릭터 최적화 세팅, 장비 추천 및 파티 시너지 정보를 제공하고 있으며, 유저들이 게임 내에서 마주하는 다양한 난관을 논리적이고 효율적으로 돌파할 수 있도록 돕고 있습니다.
            </p>
            <p>
              단순히 게임 데이터를 스크래핑하여 나열하는 일반적인 위키나 도감 사이트와는 다릅니다. 당사의 분석팀은 매 업데이트마다 변동되는 몬스터의 스탯, 신규 기믹, 그리고 장비 세트 효과를 자체적으로 시뮬레이션 및 검증합니다. 이를 바탕으로 도출된 <strong>오리지널 칼럼과 가이드</strong>는 초보자부터 최상위 랭커까지 모두가 참고할 수 있는 귀중한 지표가 됩니다. 각 캐릭터의 세팅 페이지에는 최우선으로 투자해야 할 스탯의 목표치와, 타협 가능한 부옵션의 우선순위가 명확히 기재되어 있어 재화 낭비를 최소화할 수 있습니다.
            </p>
            <p>
              또한, 저희 Rira Game Hub는 유저 경험(UX)을 최우선으로 생각합니다. 빠르고 직관적인 SPA(Single Page Application) 환경을 통해 로딩 없는 데이터 검색을 지원하며, 정보의 정확성과 최신성을 유지하기 위해 자동화된 데이터 파이프라인과 전문 에디터의 크로스체크 시스템을 동시에 가동 중입니다. 앞으로도 젠레스 존 제로(Zenless Zone Zero)를 비롯한 다양한 신작 서브컬쳐 게임들의 데이터를 순차적으로 연동하여, 명실상부한 글로벌 최고 수준의 게임 전략 플랫폼으로 도약할 것입니다.
            </p>
          </div>
        </div>
      </section>




      <div className="max-w-[1600px] mx-auto px-10 pb-24">
        <AdPlaceholder type="leaderboard" />
      </div>
    </div>
  );
};

const StatMetric = React.memo(({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 px-8 group text-center">
    <div className={`${color} mb-1 transition-transform group-hover:scale-125 duration-700`}>{icon}</div>
    <div className="text-3xl font-black tabular-nums tracking-tighter">{value.toLocaleString()}</div>
    <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{label}</div>
  </div>
));

export default Home;
