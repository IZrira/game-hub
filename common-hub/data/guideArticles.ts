import rawArticles from './guideArticles.json';
import { sanitizePublicGuideData } from '../utils/publicGuideLinks';
import nteAnalyses from '../../nte-hub/data/guideAnalysis.json';
import { attachNteGuideAnalysis } from '../../scripts/lib/nte-guide-analysis.js';

export type GuideStatus = 'draft' | 'review' | 'published';

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideCharacterAnalysis {
  status: GuideStatus;
  reviewedAt: string;
  reviewer: string;
  role: string;
  standard: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  teamPrinciple: string;
  gameplay: { overview: string; rotation: string[]; tips: string[] };
  /** Optional structured views. Each team slot lists interchangeable character names. */
  teams?: { label: string; slots: string[][] }[];
  /** Equipment shown with its icon and a one-line reason. kind selects the icon source per game. */
  gear?: { kind: string; name: string; note?: string; reason: string }[];
  /** Target stats by tier, e.g. columns ["공격력", "치명 확률"] and rows 기본/종결. */
  targets?: { columns: string[]; rows: { label: string; values: string[] }[] };
}

export interface GuideArticle {
  analysis?: GuideCharacterAnalysis;
  characterId?: string;
  notionDatabaseId?: string;
  notionPageId?: string;
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

export const GUIDE_ARTICLES = sanitizePublicGuideData(rawArticles.map(article => attachNteGuideAnalysis(article, nteAnalyses))) as GuideArticle[];

export const getPublishedGuides = (gameId: string) =>
  GUIDE_ARTICLES.filter(article => article.status === 'published' && article.gameId === gameId);

export const getPublishedGuide = (gameId: string, slug: string) =>
  GUIDE_ARTICLES.find(article => article.status === 'published' && article.gameId === gameId && article.slug === slug);
