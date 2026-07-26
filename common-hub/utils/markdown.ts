export const stripMarkdown = (md: string): string => {
  if (!md) return '';
  return md
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Extract text from links
    .replace(/[#*`_~>]/g, '') // Remove style characters
    .replace(/\\/g, '') // Remove escape characters
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
};
