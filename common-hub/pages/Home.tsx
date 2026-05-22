
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ARCHIVE_DATA, CHARACTER_DB } from '../data/games';
import { ITEM_META } from '../data/items';
import { HSR_CHARACTER_GUIDES } from '../../hsr-hub/data/guides';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import LazyImage from '../components/LazyImage';
import SystemChangelog from '../components/SystemChangelog';
import AdPlaceholder from '../components/AdPlaceholder';
import { 
  ChevronRight, 
  Zap, 
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
  TerminalSquare
} from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

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
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">{t('Initializing Core Intelligence Terminal...')}</span>
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

          <div className="pt-8 flex justify-center gap-6 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <Server size={12} className="text-brand-primary" /> Multi-Game Synchronized
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
              <Zap size={12} className="text-yellow-500" /> Real-time Analytics
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

      {/* 게임 라이브러리 센터 */}
      <section className="max-w-[1600px] mx-auto px-10 py-32 space-y-16">
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
              {t('최신 생성형 AI 기술을 활용한 정밀 데이터 프로세싱과 공식 게임 에셋 추출 기술을 결합합니다. 모든 데이터는 전문 에디터의 인게임 테스트를 통해 최종 검토되어 가장 높은 신뢰도를 보장합니다.')}
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

      {/* 터미널 업데이트 로그 섹션 (공통 공지) */}
      <section className="max-w-6xl mx-auto px-6 mt-16 mb-16">
        <div className="bg-[#0B0E14] border border-white/10 rounded-[24px] p-8 shadow-2xl relative overflow-hidden group hover:border-brand-primary/50 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary/50 group-hover:bg-brand-primary transition-colors" />
          <div className="flex items-center gap-3 mb-8">
            <TerminalSquare size={18} className="text-brand-accent" />
        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] font-mono">{t('System.Changelog')}</h2>
            <div className="flex-1 h-px bg-white/5 ml-4" />
          </div>
          
          {/* 새 자동화 컴포넌트 마운트 */}
          <SystemChangelog />
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
