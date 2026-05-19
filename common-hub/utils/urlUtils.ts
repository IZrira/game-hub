/**
 * SEO-friendly URL slug generator.
 * Replaces spaces and underscores with hyphens and converts to lowercase.
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
};

/**
 * Checks if a slug matches a given text (normalized).
 */
export const matchesSlug = (text: string, slug: string): boolean => {
  return slugify(text) === slug;
};
