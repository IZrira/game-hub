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
  const text = article.text();
  const wwCharacter = /^\/gallery\/ww\/character\/[^/]+$/.test(routePath);
  if (wwCharacter && /\{\d+\}/.test(text)) problems.push('Unresolved numeric placeholders in initial article');
  if (wwCharacter && /독보적인 전투 메커니즘|은\(는\)|이\(가\)/.test(text)) problems.push('Generic or unresolved generated prose in initial article');
  if (guideDetail && article.length !== 1) problems.push('Expected one prerendered guide article');
  if (guideDetail && bodyLength < 300) problems.push(`Guide article body missing or truncated (${bodyLength} chars; regression floor 300)`);
  if (routePath === '/gallery/nte/parties') {
    const parties = article.find('section[data-nte-party]');
    if (article.length !== 1 || !parties.length) problems.push('NTE party recommendations missing from initial article');
    parties.each((_, party) => {
      if ($(party).find('[data-nte-member]').length !== 4) problems.push('NTE initial party must retain all four members');
    });
  }
  if (adScripts > 1) problems.push(`Duplicate AdSense loader scripts (${adScripts})`);
  return { problems, bodyLength: guideDetail ? bodyLength : undefined, adScripts };
}
