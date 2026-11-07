import { CDN_URL, safeEncodeURIComponent, withAssetVersion, resolveRoverImageInfo } from './assetManager';

/**
 * 캐릭터 이미지 경로를 안전하게 확인하고 이미지 로드 실패 시 프리미엄 네온 플레이스홀더를 반환합니다.
 */
export const getCharacterImage = (src: string | undefined): string => {
  if (!src) return '/images/placeholders/neon-placeholder.webp';
  return src;
};

// NTE portraits live at skills/<folder>/<folder>.webp; the player character 감정사 only has gendered files.
const NTE_GENDERED_PORTRAITS = new Set(['감정사']);
export const getNteCharacterIconUrl = (folderName: string): string => {
  const file = `${folderName}${NTE_GENDERED_PORTRAITS.has(folderName) ? '_f' : ''}`;
  return `${CDN_URL}/nte%20images/skills/${safeEncodeURIComponent(folderName)}/${safeEncodeURIComponent(file)}.webp`;
};

/**
 * 캐릭터 폴더 구조에 기반한 경로를 생성합니다.
 */
export const getCharacterArtPath = (gameId: string, folderName: string, artNum: string = 'art01') => {
  const safeFolderName = folderName.replace(/: /g, '_').replace(/:/g, '_');
  if (gameId === 'ww') {
    const roverInfo = resolveRoverImageInfo(safeFolderName);
    if (roverInfo) {
      return roverInfo.url;
    }
    // 명조는 folderName(한글) 기반 skills 폴더 구조 사용
    return withAssetVersion(`${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(safeFolderName)}/${safeEncodeURIComponent(safeFolderName)}.webp`);
  }
  if (gameId === 'nte') {
    return getNteCharacterIconUrl(safeFolderName);
  }
  return `${CDN_URL}/${gameId}%20images/캐릭터/${safeEncodeURIComponent(safeFolderName)}/${safeEncodeURIComponent(artNum)}.webp`;
};
