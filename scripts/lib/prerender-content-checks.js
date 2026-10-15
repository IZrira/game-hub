import { load } from 'cheerio';

/** Regression checks, not a ranking, content-quality or AdSense approval score. */
export function inspectPrerenderContent(html, routePath) {
  const $ = load(html);
  const guideDetail = /^\/gallery\/(?:hsr|ww|nte|aniimo)\/guides\/[^/]+$/.test(routePath);
  const article = $('.prerender-shell article').clone();
  article.find('script, style, nav, header, footer, h1').remove();
  const bodyLength = article.text().replace(/\s+/g, ' ').trim().length;
  const adScripts = $('script[src]').toArray().filter(tag => {
    try {
      const url = new URL($(tag).attr('src'), 'https://riragamehub.com');
      return url.hostname === 'pagead2.googlesyndication.com' && url.pathname === '/pagead/js/adsbygoogle.js';
    } catch { return false; }
  }).length;
  const problems = [];
  if (guideDetail && article.length !== 1) problems.push('Expected one prerendered guide article');
  if (guideDetail && bodyLength < 300) problems.push(`Guide article body missing or truncated (${bodyLength} chars; regression floor 300)`);
  if (adScripts > 1) problems.push(`Duplicate AdSense loader scripts (${adScripts})`);
  return { problems, bodyLength: guideDetail ? bodyLength : undefined, adScripts };
}
