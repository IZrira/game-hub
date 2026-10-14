import { isNotionUrl as checkNotionUrl, sanitizePublicGuideText as cleanText, sanitizePublicGuideData as cleanData } from '../../scripts/lib/public-guide-links.js';

export const isNotionUrl = (value?: string): boolean => checkNotionUrl(value);
export const sanitizePublicGuideText = (text: string): string => cleanText(text);
export const sanitizePublicGuideData = <T,>(data: T): T => cleanData(data) as T;
