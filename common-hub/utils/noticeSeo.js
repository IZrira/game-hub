/**
 * Meta description for a notice detail page, shared by the initial HTML and the React head.
 * Notice bodies are short Markdown lists from the admin editor, so the body alone is often
 * one short line. A short body is led by the notice title and followed by its date and kind,
 * which are facts the page itself shows.
 */
// "Notice" has no extra label: the sentence already ends in "공지입니다".
const CATEGORY_LABELS = { Update: '업데이트', System: '시스템', Event: '이벤트', Info: '안내' };
const MIN_BODY_LENGTH = 100;
const MAX_LENGTH = 155;

// "- text" and the older escaped second bullet "- \- text" become plain text; headings,
// bold markers and Markdown escapes such as "\~" are dropped.
export function noticePlainText(content) {
  return String(content || '')
    .split('\n')
    .map(line => line.trim().replace(/^#{1,6}\s+/, '').replace(/\*\*/g, '').trim().replace(/^[-*]\s+(?:\\-\s*)?/, ''))
    .join(' ')
    .replace(/\\([\\`*_{}[\]()#+\-.!~|>])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getNoticeDescription(notice) {
  const body = noticePlainText(notice?.content);
  let description = body;
  if ([...body].length < MIN_BODY_LENGTH) {
    const title = String(notice?.title || '').trim();
    const kind = CATEGORY_LABELS[notice?.category];
    const date = String(notice?.createdAt || '').trim();
    const lead = title && !body.includes(title) ? `${title}: ` : '';
    const tail = `${date ? `${date} 등록된 ` : ''}RIRA ARCHIVE ${kind ? `${kind} ` : ''}공지입니다.`;
    description = `${lead}${body}${body && !/[.!?]$/.test(body) ? '.' : ''} ${tail}`.trim();
  }
  const chars = [...description];
  return chars.length > MAX_LENGTH ? `${chars.slice(0, MAX_LENGTH - 1).join('').trim()}…` : description;
}
