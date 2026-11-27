import React, { Suspense, lazy, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import * as htmlToImage from 'html-to-image';
import { Download, MessageSquareWarning, Share2 } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import DetailStickyNav from '../../common-hub/components/DetailStickyNav';
import NotFound from '../../common-hub/pages/NotFound';
import { AzurTag, AZUR_PRIVATE_NOTE } from '../components/AzurNavigation';
import { AZUR_ACCENT, azurElementIcon, azurJobIcon, azurPortrait, azurRarityIcon, azurSkillImage, findAzurCharacter, isFilled, parsePositions, parseSkillBlocks, splitLines } from '../utils/azurData';

const CharacterReviewBoard = lazy(() => import('../../common-hub/components/CharacterReviewBoard'));
const FeedbackReportModal = lazy(() => import('../../common-hub/components/FeedbackReportModal'));

const SKILLS = [
  { key: 'basicAttack', label: '기본 공격', image: '기본 공격' },
  { key: 'skill', label: '성명기', image: '성명기' },
  { key: 'ultimate', label: '성결기', image: '성결기' },
  { key: 'switchSkill', label: '성휴기', image: '성휴기' },
  { key: 'passive', label: '성사', image: '성사' },
] as const;

/** 수치를 강조색으로 표시 */
const Numbered: React.FC<{ text: string }> = ({ text }) => <>{text.split(/(\d+(?:\.\d+)?(?:%|초|개|회|단계|포인트|단))/).map((part, index) => index % 2 ? <span key={index} className="font-bold tabular-nums text-sky-300">{part}</span> : part)}</>;

const HideOnError: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(false);
  return failed ? null : <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" crossOrigin="anonymous" className={className} onError={() => setFailed(true)} />;
};

const IconBox: React.FC<{ src: string; label: string }> = ({ src, label }) => {
  const [failed, setFailed] = useState(false);
  return <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-sky-400/20 bg-[#0f1820] md:h-20 md:w-20">
    {failed ? <span aria-hidden className="text-sm font-bold text-gray-400">{label.slice(0, 2)}</span>
      : <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer" crossOrigin="anonymous" className="h-[78%] w-[78%] object-contain" onError={() => setFailed(true)} />}
  </span>;
};

const SectionHeader: React.FC<{ num: number; title: string; id: string }> = ({ num, title, id }) => <div className="mb-6 flex items-center gap-4">
  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-black md:h-14 md:w-14 md:text-xl" style={{ backgroundColor: `${AZUR_ACCENT}20`, color: '#bae6fd', borderColor: `${AZUR_ACCENT}60` }}>{String(num).padStart(2, '0')}</div>
  <h2 id={`${id}-h`} className="text-2xl font-black text-white">{title}</h2>
</div>;

const Section: React.FC<{ id: string; num: number; title: string; children: React.ReactNode }> = ({ id, num, title, children }) => <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-b border-white/5 pb-10 pt-4">
  <SectionHeader num={num} title={title} id={id} />
  {children}
</section>;

const CharacterDetailAzur: React.FC = () => {
  const { charName = '' } = useParams<{ charName: string }>();
  const character = findAzurCharacter(decodeURIComponent(charName));
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  if (!character) return <NotFound />;
  const ready = isFilled(character);
  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(''), 2500); };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${character.name} | RIRA ARCHIVE`, text: `${character.name}의 스킬과 전투 포지션을 확인해 보세요.`, url }); } catch { /* 사용자가 취소 */ }
      return;
    }
    try { await navigator.clipboard.writeText(url); flash('링크를 복사했습니다.'); } catch { flash('링크를 복사하지 못했습니다.'); }
  };
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 0.95, backgroundColor: '#0a0a0a', cacheBust: true });
      const link = document.createElement('a');
      link.download = `${character.name}_RIRA_ARCHIVE.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('이미지 캡처 오류:', error);
      flash('이미지를 저장하지 못했습니다.');
    }
  };

  const positions = parsePositions(character.positions);
  const profile = [['종족', character.race], ['소속', character.affiliation], ['무기', character.weapon], ['생일', character.birthday], ['출시 버전', character.releaseVersion], ['공개 순서', `${character.releaseOrder}번째`]].filter(([, value]) => value) as Array<[string, string]>;
  const gallery = [`${character.name} 남성`, `${character.name} 여성`, '일러스트 1', '일러스트 2', `${character.name} 섬네일`];
  const tabs = ready ? [{ id: 'skills', label: '스킬' }, { id: 'positions', label: '전투 포지션' }, { id: 'profile', label: '프로필' }, { id: 'gallery', label: '일러스트' }] : [];

  return <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 text-white">
    <SEO title={`${character.name} - 아주르 프로밀리아 캐릭터 정보`} url={`/gallery/azur/character/${character.name}`} noindex />
    <PageHeader gameId="azur" category="캐릭터 도감" categoryUrl="/gallery/azur/characters" title={character.name} />
    {tabs.length > 0 && <DetailStickyNav activeColor={AZUR_ACCENT} tabs={tabs} />}

    <div className="mx-auto mt-4 max-w-[1600px] space-y-6 px-4 md:px-8">
      <p role="note" className="rounded-2xl border border-sky-400/20 bg-sky-400/5 px-4 py-3 text-sm text-sky-100">{AZUR_PRIVATE_NOTE}</p>

      <div ref={cardRef} className="relative grid grid-cols-1 items-start gap-8 border-b border-white/5 pb-8 lg:grid-cols-[500px_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#13202a] to-[#0f0f0f] aspect-[3/4.5] lg:aspect-auto lg:h-[min(750px,calc(100dvh-17rem))] lg:min-h-[480px]">
          <HideOnError src={azurPortrait(character.name)} alt={`${character.name} 일러스트`} className="h-full w-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-sky-300">{ready ? `직업 : ${character.job} | ${character.elements.join('·')}` : '정리 전'}</p>
            <h1 className="text-3xl font-black leading-tight tracking-tighter text-white drop-shadow-lg md:text-5xl">{character.name}</h1>
            <div className="flex items-center justify-between gap-3">
              {character.rarity ? <HideOnError src={azurRarityIcon(character.rarity)} alt={character.rarity} className="h-5" /> : <span />}
              <span className="rounded-lg border border-white/10 px-2 py-0.5 text-[11px] font-bold tracking-wide text-gray-400">공개 {character.releaseOrder}번째</span>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="ml-auto flex items-center gap-2">
              <button type="button" onClick={handleShare} aria-label="공유하기" title="공유하기" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:text-white"><Share2 size={14} /></button>
              <button type="button" onClick={handleDownloadImage} aria-label="이미지 저장" title="이미지 저장" className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:text-white"><Download size={14} /></button>
            </div>
          </div>
          {notice && <p role="status" className="text-sm font-semibold text-sky-200">{notice}</p>}

          {!ready ? <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
            <p className="text-lg font-bold">아직 정리하지 않은 캐릭터입니다.</p>
            <p className="mt-2 text-base leading-relaxed text-gray-300">공식 캐릭터 게시판 공개 순서와 이름만 등록되어 있습니다. 스킬·직업·원소는 정리하는 대로 채웁니다. <Link to="/gallery/azur/characters" className="text-sky-300 underline">캐릭터 도감</Link>에서 정리된 캐릭터를 볼 수 있습니다.</p>
          </div> : <>
            <dl className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#121212] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">전략 직업</dt><dd className="mt-2"><AzurTag strong icon={azurJobIcon(character.job)} label={character.job} /></dd></div>
              <div className="rounded-2xl border border-white/10 bg-[#121212] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">원소</dt><dd className="mt-2 flex flex-wrap gap-x-4">{character.elements.map(element => <AzurTag key={element} strong icon={azurElementIcon(element)} label={element} />)}</dd></div>
              <div className="rounded-2xl border border-white/10 bg-[#121212] px-4 py-3.5"><dt className="text-sm font-semibold text-gray-400">등급</dt><dd className="mt-2 text-base font-bold">{character.rarity}</dd></div>
            </dl>
            {character.description && <div className="max-w-[72ch] space-y-2 text-base leading-relaxed text-gray-200 md:text-lg">{splitLines(character.description).map((line, index) => <p key={index}>{line}</p>)}</div>}
          </>}
        </div>
      </div>

      {ready && <>
        <Section id="skills" num={1} title="스킬">
          <div className="space-y-4">{SKILLS.map(({ key, label, image }) => {
            const blocks = parseSkillBlocks(character[key]);
            if (!blocks.length) return null;
            return <div key={key} className="rounded-2xl border border-white/10 bg-[#121212] p-5 md:p-8">
              <article className="flex flex-col gap-5 md:flex-row md:gap-8">
                <IconBox src={azurSkillImage(character.name, image)} label={label} />
                <div className="min-w-0 flex-1 space-y-5">{blocks.map((block, index) => <div key={index}>
                  {index === 0 && <p className="text-sm font-bold text-sky-300">{label}</p>}
                  <h3 className={`${index === 0 ? 'text-3xl' : 'text-xl'} mt-1 font-black leading-tight text-white`}>{block.title}</h3>
                  <div className="mt-3 max-w-[80ch] space-y-2 text-base leading-relaxed text-gray-200 md:text-lg">{block.lines.map((line, lineIndex) => <p key={lineIndex}><Numbered text={line} /></p>)}</div>
                </div>)}</div>
              </article>
            </div>;
          })}</div>
        </Section>

        <Section id="positions" num={2} title="전투 포지션">
          <ul className="grid gap-4 md:grid-cols-2">{positions.map(position => <li key={position.name} className="rounded-2xl border border-white/10 bg-[#121212] p-5">
            <p className="text-lg font-black text-sky-200">{position.name}</p>
            <p className="mt-2 text-base leading-relaxed text-gray-200">{position.text}</p>
          </li>)}</ul>
        </Section>

        <Section id="profile" num={3} title="프로필">
          <div className="grid gap-4 xl:grid-cols-2">
            <dl className="rounded-2xl border border-white/10 bg-[#121212] px-5 py-2">{profile.map(([label, value]) => <div key={label} className="flex gap-4 border-b border-white/5 py-3 text-base last:border-0"><dt className="w-20 shrink-0 font-semibold text-gray-400">{label}</dt><dd className="text-gray-100">{value}</dd></div>)}</dl>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-[#121212] p-5">
              {character.names && <div><p className="text-sm font-bold text-gray-400">언어별 표기</p><div className="mt-2 space-y-1 text-base text-gray-100">{splitLines(character.names).map(line => <p key={line}>{line}</p>)}</div></div>}
              {character.voice && <div><p className="text-sm font-bold text-gray-400">성우</p><div className="mt-2 space-y-1 text-base text-gray-100">{splitLines(character.voice).map(line => <p key={line}>{line}</p>)}</div></div>}
            </div>
          </div>
        </Section>

        <Section id="gallery" num={4} title="일러스트">
          <ul className="grid gap-4 md:grid-cols-2">{gallery.map(file => <li key={file} className="empty:hidden"><HideOnError src={azurSkillImage(character.name, file)} alt={`${character.name} ${file}`} className="w-full rounded-2xl border border-white/10 bg-[#121212]" /></li>)}</ul>
        </Section>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <button type="button" onClick={() => setIsFeedbackOpen(true)} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition hover:border-sky-400/50 hover:bg-white/10 hover:text-white">
            <MessageSquareWarning size={14} />데이터 오류 제보
          </button>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">공개 순서 {character.releaseOrder}번째</p>
        </div>

        <Suspense fallback={<div className="min-h-60" />}>
          <CharacterReviewBoard characterId={character.name} gameId="azur" />
        </Suspense>
      </>}
    </div>

    {isFeedbackOpen && <Suspense fallback={null}>
      <FeedbackReportModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} contextData={{ gameId: 'azur', targetId: character.name, targetName: character.name, type: 'character' }} />
    </Suspense>}
  </div>;
};

export default CharacterDetailAzur;
