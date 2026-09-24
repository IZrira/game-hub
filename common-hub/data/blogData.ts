export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
}

// Only articles that have completed the editorial fact-check may be published.
// The previous eight articles were withdrawn on 2026-09-24; see the audit report
// in docs/reports/content_audit_2026-09-24.md.
export const BLOG_POSTS: BlogPostData[] = [];
