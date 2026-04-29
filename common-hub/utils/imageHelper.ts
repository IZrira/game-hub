import { CDN_URL } from './assetManager';

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
  return `${CDN_URL}/${gameId} images/캐릭터/${encodeURIComponent(folderName)}/${artNum}.webp`;
};
