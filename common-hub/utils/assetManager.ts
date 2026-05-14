/** 중앙화된 에셋 매니저 유틸리티 */
export const CDN_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main';

/**
 * jsDelivr/GitHub CDN에서 괄호() 문자를 포함하거나 유니코드 불일치(NFC/NFD), 
 * 그리고 공백 문자가 URL에서 문제를 일으키는 경우를 해결하기 위한 인코딩 유틸리티
 */
export const safeEncodeURIComponent = (str: string): string => {
  if (!str) return '';
  // 윈도우 파일 시스템과 CDN 간의 유니코드 불일치 방지를 위해 NFC 정규화 적용
  return encodeURIComponent(str.normalize('NFC'))
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
};