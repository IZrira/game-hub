export const sanitizeEffect = (text?: string): string => {
  return (text || '').replace(/\s*\[용어\s*설명\][\s\S]*$/i, '').trim();
};
