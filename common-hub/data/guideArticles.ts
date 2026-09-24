import rawArticles from './guideArticles.json';

export type GuideStatus = 'draft' | 'review' | 'published';

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideArticle {
  gameId: string;
  slug: string;
  status: GuideStatus;
  title: string;
  excerpt: string;
  publishedAt: string;
  reviewedAt: string;
  applicableVersion: string;
  author: string;
  content: string;
  sources: GuideSource[];
}

export const GUIDE_ARTICLES = rawArticles as GuideArticle[];

export const getPublishedGuides = (gameId: string) =>
  GUIDE_ARTICLES.filter(article => article.status === 'published' && article.gameId === gameId);

export const getPublishedGuide = (gameId: string, slug: string) =>
  GUIDE_ARTICLES.find(article => article.status === 'published' && article.gameId === gameId && article.slug === slug);
