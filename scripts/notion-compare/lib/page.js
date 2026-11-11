// Build the review page: the template plus the comparison payload embedded as JSON.

/** Embed `payload` at __DATA__; "<" is escaped so data can never close the script tag. */
export function buildReviewPage(template, payload) {
  const json = JSON.stringify(payload).replace(/</g, '\\u003c');
  return template.replace('__DATA__', () => json);
}
