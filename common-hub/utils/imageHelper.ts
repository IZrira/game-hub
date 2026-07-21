import { CDN_URL, safeEncodeURIComponent } from './assetManager';

/**
 * 캐릭터 이미지 경로를 안전하게 확인하고 이미지 로드 실패 시 프리미엄 네온 플레이스홀더를 반환합니다.
 */
export const getCharacterImage = (src: string | undefined): string => {
  if (!src) return '/images/placeholders/neon-placeholder.webp';
  return src;
};

/**
 * 캐릭터 폴더 구조에 기반한 경로를 생성합니다.
 */
export const getCharacterArtPath = (gameId: string, folderName: string, artNum: string = 'art01') => {
  const safeFolderName = folderName.replace(/: /g, '_').replace(/:/g, '_');
  if (gameId === 'ww') {
    // 명조는 folderName(한글) 기반 skills 폴더 구조 사용
    return `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(safeFolderName)}/${safeEncodeURIComponent(safeFolderName)}.webp`;
  }
  if (gameId === 'nte') {
    return `${CDN_URL}/nte%20images/characters/${safeEncodeURIComponent(safeFolderName)}/${safeEncodeURIComponent(artNum)}.png`;
  }
  return `${CDN_URL}/${gameId}%20images/캐릭터/${safeEncodeURIComponent(safeFolderName)}/${safeEncodeURIComponent(artNum)}.webp`;
};
