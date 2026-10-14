import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

export function getNteGuideArcImageUrl(name: string) {
  // These two illustrations keep their quotation marks in the asset repository.
  const fileName = ['세상을 뒤흔든 비', '은하의 찰나'].includes(name) ? `「${name}」` : name;
  return `${CDN_URL}/nte%20images/arcs/${safeEncodeURIComponent(fileName)}.webp`;
}
