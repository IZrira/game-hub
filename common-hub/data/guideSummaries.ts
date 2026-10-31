import summaries from './generated/guide-summaries.json';
import type { GuideArticle } from './guideArticles';

export type GuideSummary = Omit<GuideArticle, 'content' | 'sources' | 'analysis'>;
export const GUIDE_SUMMARIES = summaries as GuideSummary[];

export const getPublishedGuides = (gameId: string) =>
  GUIDE_SUMMARIES.filter(article => article.status === 'published' && article.gameId === gameId);

export const getPublishedGuide = (gameId: string, slug: string) =>
  GUIDE_SUMMARIES.find(article => article.status === 'published' && article.gameId === gameId && article.slug === slug);
