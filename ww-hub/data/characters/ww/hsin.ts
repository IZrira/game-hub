import { WuwaCharacter } from "../../../types";

// Notion에만 있던 3.7 캐릭터에 공개 주소(/gallery/ww/character/hsin)를 주기 위한 최소 정의다.
// 스킬·공명 체인·스탯·재료·소개·성우 같은 상세 정보는 Notion 데이터가 folderName으로 병합되어 채운다.
const hsin: WuwaCharacter = {
  id: "hsin",
  gameId: "ww",
  name: "여우의 별자리",
  folderName: "여우의 별자리",
  attribute: "전도",
  weaponType: "증폭기",
  rarity: 5,
  releaseVersion: "3.7",
};

export default hsin;
