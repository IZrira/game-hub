import { useEffect, useState } from 'react';
import manifest from '../data/generated/article-runtime-manifest.json';
import type { GuideArticle } from '../data/guideArticles';

/** Fetch only the published article selected by this route; never show a late previous response. */
export function useGuideArticle(gameId: string, slug: string) {
  const url = (manifest as Record<string, string>)[`${gameId}/${slug}`];
  const [loaded, setLoaded] = useState<{ url: string; article: GuideArticle }>();
  const [failedUrl, setFailedUrl] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setFailedUrl(undefined);
    void fetch(url, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error(`Article request failed: ${response.status}`);
      return response.json() as Promise<GuideArticle>;
    }).then(article => {
      if (article.gameId !== gameId || article.slug !== slug || article.status !== 'published' || typeof article.content !== 'string') throw new Error('Invalid article response');
      if (!controller.signal.aborted) setLoaded({ url, article });
    }).catch(() => {
      if (!controller.signal.aborted) setFailedUrl(url);
    });
    return () => controller.abort();
  }, [url, gameId, slug, attempt]);
  return { article: loaded && loaded.url === url ? loaded.article : undefined, loading: Boolean(url && loaded?.url !== url && failedUrl !== url), failed: Boolean(url && failedUrl === url), retry: () => { setFailedUrl(undefined); setAttempt(value => value + 1); } };
}
