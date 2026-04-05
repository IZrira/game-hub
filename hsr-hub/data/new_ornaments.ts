import { Ornament } from "./ornaments";

export const NEW_PLANAR_ORNAMENTS: Ornament[] = [
  {
    id: "planar-4-1-01",
    gameId: "hsr",
    name: "0호 스테이지 펑크 로드",
    folderName: "0호 스테이지 펑크 로드",
    type: "차원 장신구",
    pieces: [
      "펑크 로드의 네온 시티",
      "펑크 로드의 데이터 홍수"
    ],
    setEffect: {
      "2piece": "장착한 캐릭터의 환락도가 8% 증가한다. 전투 중 환락도가 처음으로 40%/80% 도달 시 장착한 캐릭터의 치명타 피해가 20%/32% 증가한다."
    }
  },
  {
    id: "planar-4-1-02",
    gameId: "hsr",
    name: "천 개의 별이 모인 도시",
    folderName: "천 개의 별이 모인 도시",
    type: "차원 장신구",
    pieces: [
      "아스트로폴리스 미디어 본부",
      "아스트로폴리스 사원증"
    ],
    setEffect: {
      "2piece": "장착한 캐릭터가 추가 공격 발동 시 공격력이 24% 증가한다, 지속 시간: 2턴. 적이 처치될 시 모든 아군이 이번 전투에서 치명타 피해가 12% 증가하며, 해당 효과는 중첩되지 않는다."
    }
  }
];