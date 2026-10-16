import { load } from 'cheerio';

/** Inspect all matching head tags, not just the first matching string. */
export function inspectPrerenderHead(html) {
  const $ = load(html);
  const problems = [];
  for (const [selector, label, required] of [
    ['head title', 'title', true],
    ['head link[rel="canonical"]', 'canonical', true],
    ['head meta[name="description"]', 'description', true],
    ['head meta[name="robots"]', 'robots', false],
  ]) {
    const count = $(selector).length;
    if (count > 1 || (required && count !== 1)) problems.push(`Expected ${required ? 'one' : 'at most one'} ${label} tag (${count} found)`);
  }
  const seen = new Set();
  $('head meta[property^="og:"], head meta[property^="article:"], head meta[name^="twitter:"]').each((_, tag) => {
    const key = ($(tag).attr('property') || $(tag).attr('name') || '').toLowerCase();
    if (seen.has(key)) problems.push(`Duplicate metadata tag: ${key}`);
    seen.add(key);
  });
  return {
    problems,
    title: $('head title').first().text().trim(),
    description: ($('head meta[name="description"]').first().attr('content') || '').trim(),
    canonical: ($('head link[rel="canonical"]').first().attr('href') || '').trim(),
  };
}
