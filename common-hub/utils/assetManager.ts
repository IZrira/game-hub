/** 중앙화된 에셋 매니저 유틸리티 */
export const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

/** 에셋 버전 (이미지 변경 시 브라우저 캐시 무효화를 위한 버전 태그) */
export const ASSET_VERSION = '20260912_2';

/**
 * URL에 에셋 버전을 쿼리스트링으로 추가하여 브라우저 로컬 캐시를 갱신
 */
export const withAssetVersion = (url: string): string => {
  if (!url) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${ASSET_VERSION}`;
};

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

/**
 * 방랑자(Rover) 이름 및 속성 표준화 및 이미지 경로 생성 유틸리티
 * '방랑자 (회절)', '방랑자 (기류)', '방랑자 (인멸)', '방랑자 (전도)' 등 다양한 형태 지원
 */
export const resolveRoverImageInfo = (nameOrFolder: string = '', attribute?: string, gender: 'f' | 'm' = 'f') => {
  const str = (nameOrFolder || '').trim();
  const isRover = str.includes('방랑자');
  if (!isRover) {
    return null;
  }

  let element = '';
  if (str.includes('회절') || attribute === '회절') element = '회절';
  else if (str.includes('기류') || attribute === '기류') element = '기류';
  else if (str.includes('인멸') || attribute === '인멸') element = '인멸';
  else if (str.includes('전도') || attribute === '전도') element = '전도';
  else element = '회절'; // 기본값

  let canonicalFolder = `방랑자 · ${element}`;
  if (canonicalFolder === '방랑자 · 전도') {
    canonicalFolder = '방랑자 · 회절';
  }
  const genderSuffix = gender === 'm' ? '(남)' : '(여)';
  const fileName = `${canonicalFolder}${genderSuffix}.webp`;

  return {
    isRover: true,
    element,
    canonicalFolder,
    fileName,
    url: withAssetVersion(`${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(canonicalFolder)}/${safeEncodeURIComponent(fileName)}`)
  };
};

/**
 * 다중 CDN 자동 폴백 핸들러 (cdn.jsdelivr.net -> fastly.jsdelivr.net -> raw.githubusercontent.com)
 */
export const handleImageFallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const originalUrl = target.src;
  
  if (originalUrl.includes('cdn.jsdelivr.net')) {
    target.src = originalUrl.replace('cdn.jsdelivr.net', 'fastly.jsdelivr.net');
    return;
  }
  if (originalUrl.includes('fastly.jsdelivr.net')) {
    target.src = originalUrl.replace(
      'https://fastly.jsdelivr.net/gh/IZrira/riragameinfo@main',
      'https://raw.githubusercontent.com/IZrira/riragameinfo/main'
    );
    return;
  }
};