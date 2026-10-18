import React from 'react';
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import { Link } from 'react-router';
import { getPublishedGuides } from '../data/guideSummaries';

interface ReviewedGuideHighlightsProps {
  gameId: string;
  accentClassName?: string;
  variant?: 'cards' | 'list';
}

const ReviewedGuideHighlights: React.FC<ReviewedGuideHighlightsProps> = ({
  gameId,
  accentClassName = 'text-violet-300',
  variant = 'cards',
}) => {
  const guides = getPublishedGuides(gameId);

  if (guides.length === 0) return null;

  return (
    <section className="space-y-6" aria-labelledby={`${gameId}-reviewed-guides`}>
      <div className="flex items-end justify-between gap-4 px-2">
        <div>
          {variant === 'cards' && <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${accentClassName}`}>
            <BookOpen size={14} />
            Rira Reviewed
          </div>}
          <h2 id={`${gameId}-reviewed-guides`} className="mt-2 text-xl font-black text-white sm:text-2xl">
            핵심 분석 가이드
          </h2>
          <p className="mt-2 text-xs leading-5 text-gray-400">
            세팅과 전투 선택의 이유를 확인하세요.
          </p>
        </div>
        <Link
          to={`/gallery/${gameId}/guides`}
          className={`hidden shrink-0 items-center gap-1 text-xs font-black transition hover:text-white sm:inline-flex ${accentClassName}`}
        >
          전체 가이드 <ArrowRight size={13} />
        </Link>
      </div>

      <div className={variant === 'list' ? 'divide-y divide-white/10 border-y border-white/10' : 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'}>
        {guides.slice(0, 3).map((guide) => (
          <Link
            key={guide.slug}
            to={`/gallery/${gameId}/guides/${guide.slug}`}
            className={variant === 'list' ? 'group block py-4 transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300' : 'group rounded-[24px] border border-white/5 bg-white/[0.025] p-5 transition hover:border-white/15 hover:bg-white/[0.05]'}
          >
            <h3 className="text-base font-black leading-6 text-white transition group-hover:text-violet-200">
              {guide.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-400">{guide.excerpt}</p>
            <div className={`flex items-center justify-between text-xs text-gray-400 ${variant === 'list' ? 'mt-2' : 'mt-4 border-t border-white/5 pt-4'}`}>
              <span className="flex items-center gap-1.5"><CalendarDays size={12} /> 검수 {guide.reviewedAt}</span>
              <span className={`flex items-center gap-1 ${accentClassName}`}>읽기 <ArrowRight size={12} /></span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to={`/gallery/${gameId}/guides`}
        className={`inline-flex items-center gap-1 px-2 text-xs font-black sm:hidden ${accentClassName}`}
      >
        전체 가이드 <ArrowRight size={13} />
      </Link>
    </section>
  );
};

export default ReviewedGuideHighlights;
