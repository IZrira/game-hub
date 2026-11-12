import { WuwaCharacter } from "../../../types";

// Notion에만 있던 3.8 캐릭터에 공개 주소(/gallery/ww/character/lily)를 주기 위한 최소 정의다.
// 스킬·공명 체인·스탯·재료·소개·성우 같은 상세 정보는 Notion 데이터가 folderName으로 병합되어 채운다.
const lily: WuwaCharacter = {
  id: "lily",
  gameId: "ww",
  name: "릴리",
  folderName: "릴리",
  attribute: "회절",
  weaponType: "권총",
  rarity: 5,
  releaseVersion: "3.8",
};

export default lily;
