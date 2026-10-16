/** Only page metadata is handed off; ownership, security and resource tags stay untouched. */
export function capturePrerenderSeoHead(head: HTMLHeadElement): () => void {
  const initialNodes = Array.from(head.children).filter(node => {
    const tag = node.tagName.toLowerCase();
    if (tag === 'title') return true;
    if (tag === 'link') return node.getAttribute('rel')?.toLowerCase() === 'canonical';
    if (tag === 'script') return node.getAttribute('type')?.toLowerCase() === 'application/ld+json';
    if (tag !== 'meta') return false;
    const name = (node.getAttribute('name') || '').toLowerCase();
    const property = (node.getAttribute('property') || '').toLowerCase();
    return ['description', 'keywords', 'robots'].includes(name)
      || name.startsWith('twitter:')
      || property.startsWith('og:')
      || property.startsWith('article:');
  });
  return () => {
    // Captured references, not a fresh selector: never remove later React-owned metadata.
    initialNodes.forEach(node => {
      if (node.parentNode === head) node.remove();
    });
  };
}
