const NOTION_HOSTS = ['notion.so', 'notion.com', 'notion.site'];

export function isNotionUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const text = value.trim().replace(/^<|>$/g, '')
      .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)))
      .replace(/&(period|colon|sol|bsol|commat|quest|num|amp);/gi, (_, entity) => ({ period: '.', colon: ':', sol: '/', bsol: '\\', commat: '@', quest: '?', num: '#', amp: '&' })[entity.toLowerCase()])
      .replace(/\\([.:/])/g, '$1');
    const url = new URL(text.startsWith('//') ? `https:${text}` : /^(?:https?:)?\/\//i.test(text) ? text : `https://${text}`);
    const host = url.hostname.toLowerCase().replace(/\.$/, '');
    return NOTION_HOSTS.some(domain => host === domain || host.endsWith(`.${domain}`));
  } catch { return false; }
}

export function sanitizePublicGuideText(text) {
  if (typeof text !== 'string') return text;
  const privateReferences = new Set();
  let result = text.replace(/^\s*\[([^\]]+)\]:\s*(\S+)[^\n]*$/gm, (match, id, url) => {
    if (!isNotionUrl(url.replace(/^<|>$/g, ''))) return match;
    privateReferences.add(id.toLowerCase());
    return '';
  });
  result = result.replace(/(!?)\[([^\]]*)\]\(([^\s)]+)(?:\s+["'][^)]*["'])?\)/g, (match, image, label, url) => isNotionUrl(url) ? image ? '' : label : match);
  result = result.replace(/(!?)\[([^\]]+)\]\[([^\]]*)\]/g, (match, image, label, id) => privateReferences.has((id || label).toLowerCase()) ? image ? '' : label : match);
  result = result.replace(/<((?:https?:)?\/\/[^>]+)>/gi, (match, url) => isNotionUrl(url) ? '' : match);
  // Protect ordinary destinations so a query containing "notion.so" stays intact.
  const ordinaryUrls = [];
  result = result.replace(/(?:https?:\/\/|\/\/|www\.)[^\s<>"'`\])]+/gi, url => {
    if (isNotionUrl(url)) return '';
    ordinaryUrls.push(url);
    return `\u0000guide-url-${ordinaryUrls.length - 1}\u0000`;
  });
  result = result.replace(/\b(?:[a-z0-9-]+\.)*notion\.(?:so|com|site)(?:\.(?=[:/?#\s<>"'`\])]|$))?(?![a-z0-9.-])(?::\d+)?(?:[/?#][^\s<>"'`\])]+)?/gi, url => isNotionUrl(url) ? '' : url);
  result = result.replace(/\u0000guide-url-(\d+)\u0000/g, (_, index) => ordinaryUrls[Number(index)]);
  return result;
}

export function sanitizePublicGuideData(data) {
  if (typeof data === 'string') return sanitizePublicGuideText(data);
  if (Array.isArray(data)) return data.map(sanitizePublicGuideData);
  if (data && typeof data === 'object') return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, sanitizePublicGuideData(value)]));
  return data;
}
