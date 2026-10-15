import { load } from 'cheerio';

export function getGoogleVerificationTokens(html) {
  const $ = load(html);
  return $('head meta[name="google-site-verification"]').map((_, tag) => ($(tag).attr('content') || '').trim()).get();
}

/** Ownership must survive in the original HTML response, not just after React executes. */
export function auditGoogleVerification(sourceHtml, builtHtml) {
  const expected = getGoogleVerificationTokens(sourceHtml);
  const actual = getGoogleVerificationTokens(builtHtml);
  const problems = [];
  if (!expected.length || expected.some(token => !token)) problems.push('Source home HTML: Google verification tag missing or empty');
  for (const token of expected) {
    if (token && !actual.includes(token)) problems.push('Built home HTML: configured Google verification tag missing from head');
  }
  return problems;
}
