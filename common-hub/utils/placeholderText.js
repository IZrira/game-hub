// Values like "추후 추가" read as an unfinished page to visitors and ad reviewers.
const PLACEHOLDER_TEXT = /^(추후\s*(추가|업데이트|공개)|업데이트\s*예정|준비\s*중(입니다)?|TBD|To be added|Coming soon)[.!]?$/i;

/** @param {unknown} value */
export function hasPublishableText(value) {
  if (typeof value !== 'string') return false;
  const text = value.replace(/\*/g, '').trim();
  return text.length > 0 && !PLACEHOLDER_TEXT.test(text);
}
