import InventoryGallery from '../../common-hub/components/InventoryGallery';
import { WW_INVENTORY_DATA } from '../data/inventoryData';

const WuwaInventoryGallery = () => (
  <InventoryGallery
    gameId="ww"
    itemDatabase={WW_INVENTORY_DATA}
    customCategories={["전체", "요리", "돌파 재료", "특수 화폐", "소모품", "무기 및 스킬 재료", "재료", "튜닝 관련 아이템", "에코 육성 재료", "공명자 경험치 재료", "무기 경험치 재료", "공명자 돌파 재료", "무기 제작 재료", "스킬 업그레이드 재료"]}
  />
);

export default WuwaInventoryGallery;
