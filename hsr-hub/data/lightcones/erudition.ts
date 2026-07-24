import { HsrLightCone } from '../../types';
import { createDetailedBaseStats, createMaterial } from '../dataFactory';

export const eruditionLightcones: HsrLightCone[] = [
  {
    "id": "lc_별이_밤하늘을_밝힐_때",
    "name": "별이 밤하늘을 밝힐 때",
    "gameId": "hsr",
    "releaseVersion": "4.4",
    "folderName": "별이 밤하늘을 밝힐 때",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 250, 371, 490, 612, 728, 847],
      [29, 111, 189, 278, 367, 456, 546, 635],
      [24, 92, 156, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "알 수 없음",
      "description": "알 수 없음",
      "descriptions": [
        "알 수 없음",
        "알 수 없음",
        "알 수 없음",
        "알 수 없음",
        "알 수 없음"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("천진난만 크레파스", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("천체 모형", 4, 2), createMaterial("천진난만 크레파스", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 4, 3), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 5, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 15, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 15, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 14, 4)] }
    ],
    "story": ""
  },
  {
    "id": "lc_값을_매길_수_없는_건_희망뿐",
    "name": "값을 매길 수 없는 건 희망뿐",
    "gameId": "hsr",
    "releaseVersion": "2.3",
    "folderName": "값을 매길 수 없는 건 희망뿐",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "약속",
      "description": "장착한 캐릭터의 치명타 확률이 16% 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 120% 초과 시 20%를 초과할 때마다 추가 공격으로 가하는 피해가 12% 증가하며, 해당 효과는 4스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 20% 무시한다, 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 16% 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 120% 초과 시 20%를 초과할 때마다 추가 공격으로 가하는 피해가 12% 증가하며, 해당 효과는 4스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 20% 무시한다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 확률이 19% 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 120% 초과 시 20%를 초과할 때마다 추가 공격으로 가하는 피해가 14% 증가하며, 해당 효과는 4스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 24% 무시한다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 확률이 22% 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 120% 초과 시 20%를 초과할 때마다 추가 공격으로 가하는 피해가 16% 증가하며, 해당 효과는 4스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 28% 무시한다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 확률이 25% 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 120% 초과 시 20%를 초과할 때마다 추가 공격으로 가하는 피해가 18% 증가하며, 해당 효과는 4스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 32% 무시한다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 확률이 28% 증가한다. 전투 중 장착한 캐릭터의 치명타 피해가 120% 초과 시 20%를 초과할 때마다 추가 공격으로 가하는 피해가 20% 증가하며, 해당 효과는 4스택 중첩 가능하다. 전투 시작 시 및 장착한 캐릭터가 일반 공격 발동 후, 필살기 또는 추가 공격이 가하는 피해는 목표의 방어력을 36% 무시한다, 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("꿈 저장 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("꿈 저장 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 4, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 5, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] }
    ],
    "story": "*「보나제이드 씨께서 계속 물자와 자선금을 보내주시지 않았으면 저희 보육원은 아마……」*\n그녀는 아이들의 머리를 부드럽게 쓰다듬으며 원장의 말을 잘랐다.\n*「제가 있는 한 앞으로는 아무 염려 마세요…. 이런 말은 아이들이 걱정할 테니 들려줄 필요도 없고요」*\n\n아이들은 고개를 들고 그녀에게 조잘조잘 최근에 있었던 일, 고민과 꿈을 이야기했다.\n*「보나제이드 님, 다음에는 또 언제 오세요?」\n「너무 무리하게 일하지 말고 일찍 주무세요……」\n「저는 커서 보나제이드 님 같은 사람이 될 거예요!」*\n아이들의 맑은 눈을 보고 있던 그녀는 잠깐 벙쪘다.\n*「나와 같은 사람……」*\n아이들은 그녀에게 사과를 건넸다.*「맞아요! 다른 사람에게 빛과 희망을 가져다주는 사람이요!」*\n\n가난, 과오, 근심, 고난… 그녀는 우주를 거닐며 타인의 저당을 받고 그와 동등한 보답을 줬다.\n생명은 욕망 때문에 존재하고, 욕망 때문에 분주하며, 욕망 때문에 죽는다. 이는 저항할 수 없는 법칙이고, 생명의 필연이다.\n겉과 속이 다른 자선가, 영혼을 저당 잡는 악덕상인… 그녀는 세상 사람들로부터 여러 신분을 부여받았지만, 그녀만이 그 행동 뒤에 숨겨진 도의를 이해하고 있다"
  },
  {
    "id": "lc_눈에_담긴_순간",
    "name": "눈에 담긴 순간",
    "gameId": "hsr",
    "releaseVersion": "1.5",
    "folderName": "눈에 담긴 순간",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "기사도의 훈장",
      "description": "장착한 캐릭터의 치명타 피해가 36% 증가한다. 장착한 캐릭터가 필살기 발동 시, 캐릭터의 에너지 최대치에 따라 장착한 캐릭터의 필살기가 가하는 피해가 증가한다. 에너지 1pt당 피해가 0.36% 증가하며, 최대 180pt까지 계산한다",
      "descriptions": [
        "장착한 캐릭터의 치명타 피해가 36% 증가한다. 장착한 캐릭터가 필살기 발동 시, 캐릭터의 에너지 최대치에 따라 장착한 캐릭터의 필살기가 가하는 피해가 증가한다. 에너지 1pt당 피해가 0.36% 증가하며, 최대 180pt까지 계산한다",
        "장착한 캐릭터의 치명타 피해가 42% 증가한다. 장착한 캐릭터가 필살기 발동 시, 캐릭터의 에너지 최대치에 따라 장착한 캐릭터의 필살기가 가하는 피해가 증가한다. 에너지 1pt당 피해가 0.42% 증가하며, 최대 180pt까지 계산한다",
        "장착한 캐릭터의 치명타 피해가 48% 증가한다. 장착한 캐릭터가 필살기 발동 시, 캐릭터의 에너지 최대치에 따라 장착한 캐릭터의 필살기가 가하는 피해가 증가한다. 에너지 1pt당 피해가 0.48% 증가하며, 최대 180pt까지 계산한다",
        "장착한 캐릭터의 치명타 피해가 54% 증가한다. 장착한 캐릭터가 필살기 발동 시, 캐릭터의 에너지 최대치에 따라 장착한 캐릭터의 필살기가 가하는 피해가 증가한다. 에너지 1pt당 피해가 0.54% 증가하며, 최대 180pt까지 계산한다",
        "장착한 캐릭터의 치명타 피해가 60% 증가한다. 장착한 캐릭터가 필살기 발동 시, 캐릭터의 에너지 최대치에 따라 장착한 캐릭터의 필살기가 가하는 피해가 증가한다. 에너지 1pt당 피해가 0.6% 증가하며, 최대 180pt까지 계산한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "그는 갑옷의 매무새를 가다듬고, 거울 속에 비친 자신의 눈을 보았다. 그 눈에는 수많은 전장을 누비며 쌓아온 긍지와, 지켜야 할 것들에 대한 흔들림 없는 의지가 담겨 있었다.\n\n*「진정한 기사도는 눈에 담긴 순간 결정되는 법」*\n\n그는 장미 한 송이를 집어 들고, 차가운 전장으로 향했다. 그의 뒤로 흩날리는 꽃잎은 고결한 희생의 상징이자, 그가 걸어온 길의 증거였다."
  },
  {
    "id": "lc_동트기_전",
    "name": "동트기 전",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "동트기 전",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "준비된 의지",
      "description": "장착한 캐릭터의 치명타 피해가 36% 증가한다. 장착한 캐릭터의 전투 스킬과 필살기가 가하는 피해가 18% 증가한다. 장착한 캐릭터가 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모하여 추가 공격이 가하는 피해가 48% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 치명타 피해가 36% 증가한다. 장착한 캐릭터의 전투 스킬과 필살기가 가하는 피해가 18% 증가한다. 장착한 캐릭터가 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모하여 추가 공격이 가하는 피해가 48% 증가한다",
        "장착한 캐릭터의 치명타 피해가 42% 증가한다. 장착한 캐릭터의 전투 스킬과 필살기가 가하는 피해가 21% 증가한다. 장착한 캐릭터가 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모하여 추가 공격이 가하는 피해가 56% 증가한다",
        "장착한 캐릭터의 치명타 피해가 48% 증가한다. 장착한 캐릭터의 전투 스킬과 필살기가 가하는 피해가 24% 증가한다. 장착한 캐릭터가 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모하여 추가 공격이 가하는 피해가 64% 증가한다",
        "장착한 캐릭터의 치명타 피해가 54% 증가한다. 장착한 캐릭터의 전투 스킬과 필살기가 가하는 피해가 27% 증가한다. 장착한 캐릭터가 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모하여 추가 공격이 가하는 피해가 72% 증가한다",
        "장착한 캐릭터의 치명타 피해가 60% 증가한다. 장착한 캐릭터의 전투 스킬과 필살기가 가하는 피해가 30% 증가한다. 장착한 캐릭터가 전투 스킬 혹은 필살기 발동 후 [몽신] 효과를 획득한다. 추가 공격 발동 시 [몽신]을 소모하여 추가 공격이 가하는 피해가 80% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("영생의 새싹", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("영생의 새싹", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 4, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 5, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] }
    ],
    "story": "어둠이 가시기 전, 그는 붓을 들어 지도를 그렸다. 매끄러운 종이 위에 그려지는 선 하나하나가 수천 명의 생사를 가르는 전략이 되었다.\n\n*「승부는 동트기 전 결정되는 법이다」*\n\n그는 잠시 눈을 감았다. 차가운 새벽 공기가 머리를 맑게 해주었다. 다가올 전쟁의 폭풍 속에서도, 그는 흔들리지 않는 뿌리처럼 굳건히 자리를 지켰다. 세상이 고요에 잠긴 사이, 그의 연산은 이미 승리를 향해 달리고 있었다."
  },
  {
    "id": "lc_멈추지_않는_연산",
    "name": "멈추지 않는 연산",
    "gameId": "hsr",
    "releaseVersion": "2.3",
    "folderName": "멈추지 않는 연산",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "끝없는 생각",
      "description": "장착한 캐릭터의 공격력이 8% 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 4% 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. 3기 이상의 적을 명중하면 자신의 속도가 8% 증가한다, 지속 시간: 1턴",
      "descriptions": [
        "장착한 캐릭터의 공격력이 8% 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 4% 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. 3기 이상의 적을 명중하면 자신의 속도가 8% 증가한다, 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 9% 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 5% 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. 3기 이상의 적을 명중하면 자신의 속도가 10% 증가한다, 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 10% 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 6% 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. 3기 이상의 적을 명중하면 자신의 속도가 12% 증가한다, 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 11% 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 7% 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. 3기 이상의 적을 명중하면 자신의 속도가 14% 증가한다, 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 12% 증가한다. 공격 발동 후 적을 1기 명중할 때마다 공격력이 추가로 8% 증가하며(최대 중첩수: 5회), 다음 공격 후까지 지속된다. 3기 이상의 적을 명중하면 자신의 속도가 16% 증가한다, 지속 시간: 1턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "영원히 허공에 멈춰 있는 채로,\n빛나는 데이터가 홍수처럼 그의 머릿속으로 밀려 들어왔다.\n과거와 미래의 만물은 부호가 되었고,\n그는 시작의 순간에 종말의 때를 연역했다.\n지식, 답, 진실……\n정보의 안갯속에 찬란한 빛이 떠올랐고,\n모든 것이 그에게 뚜렷해졌다"
  },
  {
    "id": "lc_생명은_불태워야_하는_것",
    "name": "생명은 불태워야 하는 것",
    "gameId": "hsr",
    "releaseVersion": "3.2",
    "folderName": "생명은 불태워야 하는 것",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "정련",
      "description": "장착한 캐릭터 턴 시작 시 에너지를 10pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 60% 증가한다. 적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 12% 감소시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
      "descriptions": [
        "장착한 캐릭터 턴 시작 시 에너지를 10pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 60% 증가한다. 적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 12% 감소시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터 턴 시작 시 에너지를 10pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 70% 증가한다. 적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 15% 감소시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터 턴 시작 시 에너지를 10pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 80% 증가한다. 적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 18% 감소시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터 턴 시작 시 에너지를 10pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 90% 증가한다. 적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 21% 감소시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터 턴 시작 시 에너지를 10pt 회복한다. 적이 장착한 캐릭터가 부여한 약점을 보유했을 경우 장착한 캐릭터가 대상에게 가하는 피해가 100% 증가한다. 적이 장착한 캐릭터의 공격을 받을 시 장착한 캐릭터가 대상의 방어력을 24% 감소시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("있는 듯 없는 듯한 조짐", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("있는 듯 없는 듯한 조짐", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 4, 3), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 5, 4), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3), createMaterial("끝없는 탄식", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3), createMaterial("끝없는 탄식", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3), createMaterial("끝없는 탄식", 14, 4)] }
    ],
    "story": "그윽한 실험 속, 여러 솟구치는 환상이 늘 그의 발걸음을 멈추게 했다.\n\n유혹의 속삭임이 말했다. 그 위험한 과제를 포기해, 굳이 자신의 일생을 걸 필요는 없잖아?\n차가운 위협의 목소리가 말했다. 생사의 경계를 걷는 자는 결국 생명을 불태우게 될 것이다.\n그리고 분노에 찬 고발의 목소리는 신을 모독하는 죄인은 잔혹한 형벌로 내몰아야 한다고 외쳤다.\n\n*「인생을 넘나드는 공연에 마침내 피날레가 도래했군」*\n\n그는 두 눈을 감은 채 신의 불씨를 움켜쥐고는 고통이 죽어가는 혼령을 집어삼키게 두었다.\n단호한 눈동자부터 뛰는 심장, 그리고 온전한 영혼까지… 그는 자기 자신을 가장 순수하고 뜨거운 정련 속에 던졌다——\n\n여러 소리가 끓어오르다 결국 고요로 바뀌었다.\n그렇게 어둠 속에서, 찬란한 진리가 그의 손에서 완성됐다"
  },
  {
    "id": "lc_은하철도의_밤",
    "name": "은하철도의 밤",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "은하철도의 밤",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [53, 203, 346, 510, 673, 837, 1001, 1164],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "별의 무리",
      "description": "필드 위의 적 1기당 장착한 캐릭터의 공격력이 9% 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 때마다, 장착한 캐릭터가 가하는 피해가 30% 증가한다, 지속 시간: 1턴",
      "descriptions": [
        "필드 위의 적 1기당 장착한 캐릭터의 공격력이 9% 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 때마다, 장착한 캐릭터가 가하는 피해가 30% 증가한다, 지속 시간: 1턴",
        "필드 위의 적 1기당 장착한 캐릭터의 공격력이 10.5% 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 때마다, 장착한 캐릭터가 가하는 피해가 35% 증가한다, 지속 시간: 1턴",
        "필드 위의 적 1기당 장착한 캐릭터의 공격력이 12% 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 때마다, 장착한 캐릭터가 가하는 피해가 40% 증가한다, 지속 시간: 1턴",
        "필드 위의 적 1기당 장착한 캐릭터의 공격력이 13.5% 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 때마다, 장착한 캐릭터가 가하는 피해가 45% 증가한다, 지속 시간: 1턴",
        "필드 위의 적 1기당 장착한 캐릭터의 공격력이 15% 증가한다. 해당 효과 최대 중첩수: 5스택. 적의 약점이 격파될 때마다, 장착한 캐릭터가 가하는 피해가 50% 증가한다, 지속 시간: 1턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 40000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 4, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 18, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 165000, 4), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 5, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 18, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 15, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 18, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("영감의 열쇠", 4, 2), createMaterial("계몽의 열쇠", 12, 3), createMaterial("지식의 열쇠", 15, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 18, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "열차가 끝없는 은하수를 따라 달렸다. 창밖으로 스쳐 지나가는 별빛들은 마치 누군가의 꿈처럼 아름답게 빛났다. 그녀는 커피 한 잔을 손에 든 채, 차분한 눈빛으로 그 풍경을 바라보았다.\n\n*「은하철도의 밤은, 누구에게나 공평하게 찾아오는 법이야」*\n\n잃어버린 고향을 그리워하며, 그녀는 다시금 열차의 엔진을 정비했다. 이 여정의 끝에 무엇이 기다리고 있을지 알 수 없지만, 그녀는 동료들과 함께라면 그 어디라도 갈 준비가 되어 있었다."
  },
  {
    "id": "lc_인법첩•요란_파마",
    "name": "인법첩•요란 파마",
    "gameId": "hsr",
    "releaseVersion": "2.6",
    "folderName": "인법첩•요란 파마",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "제악",
      "description": "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 전투 진입 시 즉시 에너지를 30pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 50% 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 전투 진입 시 즉시 에너지를 30pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 50% 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다",
        "장착한 캐릭터의 격파 특수효과가 70% 증가한다. 전투 진입 시 즉시 에너지를 33pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 55% 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다",
        "장착한 캐릭터의 격파 특수효과가 80% 증가한다. 전투 진입 시 즉시 에너지를 35pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 60% 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다",
        "장착한 캐릭터의 격파 특수효과가 90% 증가한다. 전투 진입 시 즉시 에너지를 38pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 65% 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다",
        "장착한 캐릭터의 격파 특수효과가 100% 증가한다. 전투 진입 시 즉시 에너지를 40pt 회복하며, 장착한 캐릭터가 필살기를 발동하면 [뇌둔]을 획득하고, 일반 공격을 2회 발동하면 장착한 캐릭터의 행동 게이지가 70% 증가하고 [뇌둔]이 해제된다. 장착한 캐릭터가 필살기를 발동하면 [뇌둔]이 초기화된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("꿈 저장 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("꿈 저장 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 4, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 5, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] }
    ],
    "story": "「닌자계」의 어느 곳에 음산한 회색 안개가 도시를 뒤덮고 있다.\n\n*「이얏——!」*\n한 소녀의 인영이 괴물 사이를 누빈다. 그 잔영은 마치 화려한 색채가 달빛 없는 대지에 뿌려지고 있는 것 같다.\n\n먼지 속에서 「사닌」들이 고통으로 신음하며 동요한다.\n*「넌… 누구냐……」\n「소인의 닌호는 『라파』. 일심불란, 파사현정이란 뜻이지」*\n「사닌」들은 서로 눈빛을 주고받더니 사방으로 도망치려 했다.\n*「귀공, 사세구를 읊을 준비는 끝났어?」*\n수리검이 눈부시게 회전하면서 위험한 기운이 몰려온다.\n*「오의•요란 멸파살진!」*\n\n뒤에서 일어난 폭발이 상처로 가득한 밤을 밝혔다.\n그녀는 숨을 깊게 들이마신 뒤 헤비메탈처럼 요란한 네온사인 속으로 뛰어들었다.\n*「참으로 추악한 요괴로구나. 요란 닌자 레인저의 장대한•사냥은 계속되어야 해……」*"
  },
  {
    "id": "lc_추궁할_수_없는_곳을_향해",
    "name": "추궁할 수 없는 곳을 향해",
    "gameId": "hsr",
    "releaseVersion": "3.0",
    "folderName": "추궁할 수 없는 곳을 향해",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [29, 111, 189, 278, 367, 456, 546, 635],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "두뇌 게임",
      "description": "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 60% 증가한다, 지속 시간: 3턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 140pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 60% 증가한다, 지속 시간: 3턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 140pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다",
        "장착한 캐릭터의 치명타 확률이 14% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 70% 증가한다, 지속 시간: 3턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 140pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다",
        "장착한 캐릭터의 치명타 확률이 16% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 80% 증가한다, 지속 시간: 3턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 140pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다",
        "장착한 캐릭터의 치명타 확률이 18% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 90% 증가한다, 지속 시간: 3턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 140pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다",
        "장착한 캐릭터의 치명타 확률이 20% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 100% 증가한다, 지속 시간: 3턴. 장착한 캐릭터가 필살기 발동 후 이번 필살기로 소모한 에너지가 140pt 이상일 경우 전투 스킬 포인트를 1pt 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("거친 스케치", 4, 2), createMaterial("역동적인 선화", 12, 3), createMaterial("정교한 컬러 원고", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "*「지식학회의 편지 처리 완료」\n「시뮬레이션 우주 정상 작동 중……」\n「저서 모음집 재출간 완료」\n「쉿, 조용. 헤르타 님께 방해되지 않도록 조심해……」*\n\n……은하계 변경의 고탑 안, 인형들이 질서정연하게 각종 잡다한 일들을 처리하며 그녀가 나타나길 기다리고 있다.\n시간은 빠르게 흘러가고, 셀 수 없이 많은 인물들이 유성처럼 역사의 밤하늘을 지나갔다. 그들은 찰나의 빛을 발하고, 결국 적막으로 돌아갔다.\n*「헤르타 님께서 오랫동안 모습을 드러내지 않으셨어……」\n「아직도 생각하고 계신 건가……」\n\n「흥, 공리 몇 개 얻었다고 끝났다고 생각한 거야?」*\n연산을 하던 그녀는 기지개를 켜며 고개를 들었다. 새로운 생각이 떠오른 듯하다——\n*「의심 못하는 건 존재하지 않아. 난 답을 알아낼 때까지 계속 질문할 거야!」*"
  },
  {
    "id": "lc_밀_내음이_가득한_꿈",
    "name": "밀 내음이 가득한 꿈",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "밀 내음이 가득한 꿈",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "동경",
      "description": "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터의 필살기와 추가 공격이 가하는 피해가 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터의 필살기와 추가 공격이 가하는 피해가 24% 증가한다",
        "장착한 캐릭터의 치명타 확률이 14% 증가한다. 장착한 캐릭터의 필살기와 추가 공격이 가하는 피해가 28% 증가한다",
        "장착한 캐릭터의 치명타 확률이 16% 증가한다. 장착한 캐릭터의 필살기와 추가 공격이 가하는 피해가 32% 증가한다",
        "장착한 캐릭터의 치명타 확률이 18% 증가한다. 장착한 캐릭터의 필살기와 추가 공격이 가하는 피해가 36% 증가한다",
        "장착한 캐릭터의 치명타 확률이 20% 증가한다. 장착한 캐릭터의 필살기와 추가 공격이 가하는 피해가 40% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("있는 듯 없는 듯한 조짐", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("있는 듯 없는 듯한 조짐", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 3, 3), createMaterial("있는 듯 없는 듯한 조짐", 15, 2), createMaterial("점점 가까워지는 비명", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("있는 듯 없는 듯한 조짐", 15, 2), createMaterial("점점 가까워지는 비명", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 4, 4), createMaterial("있는 듯 없는 듯한 조짐", 15, 2), createMaterial("점점 가까워지는 비명", 15, 3), createMaterial("끝없는 탄식", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 12, 4), createMaterial("있는 듯 없는 듯한 조짐", 15, 2), createMaterial("점점 가까워지는 비명", 15, 3), createMaterial("끝없는 탄식", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 12, 4), createMaterial("있는 듯 없는 듯한 조짐", 15, 2), createMaterial("점점 가까워지는 비명", 15, 3), createMaterial("끝없는 탄식", 12, 4)] }
    ],
    "story": "산들바람이 소년의 손끝을 스치며 아직 잉크가 마르지 않은 편지를 먼 곳으로 가져갔다.\n\n*「내 미래는 어떤 모습일까…?」*\n꿈이 머릿속에서 피어올라 하늘 끝으로 날아갔다.\n밀이 바람을 따라 춤을 추며 잔물결을 일으켰다. 마치 그 미숙하지만 진심 어린 마음에 응답하는 것처럼 말이다.\n\n*「무슨 일이 있어도, 설령 손에 검 한 자루만 있을지라도 난 이곳을 지키고 싶어!」*\n소년은 마음속으로 묵묵히 맹세했다——\n\n그 서원은 낙인처럼 마음속에 영원히 새겨졌다"
  },
  {
    "id": "lc_우주_대사업",
    "name": "우주 대사업",
    "gameId": "hsr",
    "releaseVersion": "3.2",
    "folderName": "우주 대사업",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "상호 이익",
      "description": "장착한 캐릭터의 공격력이 8% 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 4% 증가하고, 최대 7개까지 계산한다",
      "descriptions": [
        "장착한 캐릭터의 공격력이 8% 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 4% 증가하고, 최대 7개까지 계산한다",
        "장착한 캐릭터의 공격력이 10% 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 5% 증가하고, 최대 7개까지 계산한다",
        "장착한 캐릭터의 공격력이 12% 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 6% 증가하고, 최대 7개까지 계산한다",
        "장착한 캐릭터의 공격력이 14% 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 7% 증가하고, 최대 7개까지 계산한다",
        "장착한 캐릭터의 공격력이 16% 증가한다. 적이 서로 다른 속성의 약점을 1개 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 8% 증가하고, 최대 7개까지 계산한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공포에 짓밟힌 육신", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("공포에 짓밟힌 육신", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 3, 3), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 4, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 12, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 12, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 12, 4)] }
    ],
    "story": "산들바람이 소년의 손끝을 스치며 아직 잉크가 마르지 않은 편지를 먼 곳으로 가져갔다.\n\n*「내 미래는 어떤 모습일까…?」*\n꿈이 머릿속에서 피어올라 하늘 끝으로 날아갔다.\n밀이 바람을 따라 춤을 추며 잔물결을 일으켰다. 마치 그 미숙하지만 진심 어린 마음에 응답하는 것처럼 말이다.\n\n*「무슨 일이 있어도, 설령 손에 검 한 자루만 있을지라도 난 이곳을 지키고 싶어!」*\n소년은 마음속으로 묵묵히 맹세했다——\n\n그 서원은 낙인처럼 마음속에 영원히 새겨졌다"
  },
  {
    "id": "lc_나의_탄생",
    "name": "「나」의 탄생",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "「나」의 탄생",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "그림 속 소녀",
      "description": "장착한 캐릭터의 추가 공격으로 가하는 피해가 24% 증가한다. 해당 적의 현재 HP 백분율이 50% 이하일 경우, 추가 공격으로 가하는 피해가 추가로 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 추가 공격으로 가하는 피해가 24% 증가한다. 해당 적의 현재 HP 백분율이 50% 이하일 경우, 추가 공격으로 가하는 피해가 추가로 24% 증가한다",
        "장착한 캐릭터의 추가 공격으로 가하는 피해가 30% 증가한다. 해당 적의 현재 HP 백분율이 50% 이하일 경우, 추가 공격으로 가하는 피해가 추가로 30% 증가한다",
        "장착한 캐릭터의 추가 공격으로 가하는 피해가 36% 증가한다. 해당 적의 현재 HP 백분율이 50% 이하일 경우, 추가 공격으로 가하는 피해가 추가로 36% 증가한다",
        "장착한 캐릭터의 추가 공격으로 가하는 피해가 42% 증가한다. 해당 적의 현재 HP 백분율이 50% 이하일 경우, 추가 공격으로 가하는 피해가 추가로 42% 증가한다",
        "장착한 캐릭터의 추가 공격으로 가하는 피해가 48% 증가한다. 해당 적의 현재 HP 백분율이 50% 이하일 경우, 추가 공격으로 가하는 피해가 추가로 48% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("고대 부속품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("고대 부속품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 3, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 4, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] }
    ],
    "story": "처음에 그것은 이전 그림의 자세와 완전히 일치했다.\n그녀는 자신과 똑같은 얼굴을 보며 이건 아직 그녀가 아니라고 생각했다.\n\n*「세상에 두 점의 똑같은 그림이 있을 리가 있겠어?」*\n\n그녀는 관절을 만지작거리며 눈을 뜨는 법을 가르쳤고 손가락이 더 부드러워지도록 가르쳤다.\n그녀는 만족하며 손을 멈췄다.\n\n*「어제와는 사뭇 다른 모습이 바로 오늘의 나야」*"
  },
  {
    "id": "lc_아침_식사_루틴",
    "name": "느낌 있는 아침 식사 루틴",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "느낌 있는 아침 식사 루틴",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "각자 위치로",
      "description": "장착한 캐릭터가 가하는 피해가 12% 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 4% 증가한다. 해당 효과 최대 중첩수: 3스택",
      "descriptions": [
        "장착한 캐릭터가 가하는 피해가 12% 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 4% 증가한다. 해당 효과 최대 중첩수: 3스택",
        "장착한 캐릭터가 가하는 피해가 15% 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 5% 증가한다. 해당 효과 최대 중첩수: 3스택",
        "장착한 캐릭터가 가하는 피해가 18% 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 6% 증가한다. 해당 효과 최대 중첩수: 3스택",
        "장착한 캐릭터가 가하는 피해가 21% 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 7% 증가한다. 해당 효과 최대 중첩수: 3스택",
        "장착한 캐릭터가 가하는 피해가 24% 증가한다. 적 1기를 처치할 때마다, 장착한 캐릭터의 공격력이 8% 증가한다. 해당 효과 최대 중첩수: 3스택"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "아침 식사는 이미 준비되었지만…\n누군가는 먼저 홍차를 마셨고\n누군가는 먼저 사진을 찍었고\n누군가는 먼저 신문을 읽었고\n누군가는 먼저 무언가를 노트에 적었고\n누군가는 먼저 휴대폰을 만지작거렸다.\n\n*「얼른 식기 전에 먹어!」*"
  },
  {
    "id": "lc_세상을_진동시키다",
    "name": "세상을 진정시키지 마",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "세상을 진정시키지 마",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "소리의 힘",
      "description": "장착한 캐릭터가 전투 진입 시 에너지가 즉시 20pt 회복하고, 대상의 필살기가 가하는 피해가 32% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 전투 진입 시 에너지가 즉시 20pt 회복하고, 대상의 필살기가 가하는 피해가 32% 증가한다",
        "장착한 캐릭터가 전투 진입 시 에너지가 즉시 23pt 회복하고, 대상의 필살기가 가하는 피해가 40% 증가한다",
        "장착한 캐릭터가 전투 진입 시 에너지가 즉시 26pt 회복하고, 대상의 필살기가 가하는 피해가 48% 증가한다",
        "장착한 캐릭터가 전투 진입 시 에너지가 즉시 29pt 회복하고, 대상의 필살기가 가하는 피해가 56% 증가한다",
        "장착한 캐릭터가 전투 진입 시 에너지가 즉시 32pt 회복하고, 대상의 필살기가 가하는 피해가 64% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("고대 부속품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("고대 부속품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 3, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 4, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] }
    ],
    "story": "그녀는 무대 위에서 손을 흔들며 모든 사람이 그녀와 함께 자신의 목소리를 내길 원했다.\n노래, 외침, 한탄과 같이 어떤 형태로든 말이다.\n누군가 들을 때까지 자신의 소리를 내야 누군가 합류한다.\n\n*「이 차가운 도심처럼 마음도 차갑게 낙심하지 말아요」*\n\n——세상을 진정시키지 마"
  },
  {
    "id": "lc_오늘도_평화로운_하루",
    "name": "오늘도 평화로운 하루",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "오늘도 평화로운 하루",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "폭풍 전야",
      "description": "전투 진입 후, 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다. 에너지 1pt당 0.2% 증가하며, 최대 160pt까지 계산한다",
      "descriptions": [
        "전투 진입 후, 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다. 에너지 1pt당 0.2% 증가하며, 최대 160pt까지 계산한다",
        "전투 진입 후, 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다. 에너지 1pt당 0.25% 증가하며, 최대 160pt까지 계산한다",
        "전투 진입 후, 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다. 에너지 1pt당 0.3% 증가하며, 최대 160pt까지 계산한다",
        "전투 진입 후, 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다. 에너지 1pt당 0.35% 증가하며, 최대 160pt까지 계산한다",
        "전투 진입 후, 장착한 캐릭터의 에너지 최대치에 따라 장착한 캐릭터가 가하는 피해가 증가한다. 에너지 1pt당 0.4% 증가하며, 최대 160pt까지 계산한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("영생의 새싹", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("영생의 새싹", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 3, 3), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 4, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 12, 4)] }
    ],
    "story": "업무 보고서는 산더미처럼 쌓여 있고, 메신저는 쉴 새 없이 울려댄다. 그녀는 한숨을 내쉬며 안경을 벗어 책상 위에 놓았다. 이 끝도 없는 일상 속에서, 그녀가 원하는 건 오직 평화로운 휴식뿐이었다.\n\n*「오늘도 평화로운 하루가 되길 바랐는데……」*\n\n하지만 그녀는 다시 안경을 고쳐 썼다. 그녀의 연산 없이는 은하계의 질서가 유지될 수 없음을 알고 있었기에. 오늘도 그녀는 자신만의 전장에서, 수많은 데이터와 사투를 벌이며 평화를 지켜내고 있었다."
  },
  {
    "id": "lc_은하_함락의_날",
    "name": "은하 함락의 날",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "은하 함락의 날",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "함락",
      "description": "장착한 캐릭터의 공격력이 16% 증가한다. 장착한 캐릭터가 공격 발동 후, 필드에 해당 속성 약점을 보유한 적이 2기 이상일 경우, 장착한 캐릭터의 치명타 피해가 20% 증가한다, 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 공격력이 16% 증가한다. 장착한 캐릭터가 공격 발동 후, 필드에 해당 속성 약점을 보유한 적이 2기 이상일 경우, 장착한 캐릭터의 치명타 피해가 20% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 공격력이 18% 증가한다. 장착한 캐릭터가 공격 발동 후, 필드에 해당 속성 약점을 보유한 적이 2기 이상일 경우, 장착한 캐릭터의 치명타 피해가 25% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 공격력이 20% 증가한다. 장착한 캐릭터가 공격 발동 후, 필드에 해당 속성 약점을 보유한 적이 2기 이상일 경우, 장착한 캐릭터의 치명타 피해가 30% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 공격력이 22% 증가한다. 장착한 캐릭터가 공격 발동 후, 필드에 해당 속성 약점을 보유한 적이 2기 이상일 경우, 장착한 캐릭터의 치명타 피해가 35% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터가 공격 발동 후, 필드에 해당 속성 약점을 보유한 적이 2기 이상일 경우, 장착한 캐릭터의 치명타 피해가 40% 증가한다, 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("꿈 저장 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("꿈 저장 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 3, 3), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 4, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 12, 4)] }
    ],
    "story": "거대한 행성이 조각나며 우주의 먼지로 사라졌다. 은하계 전체가 비명조차 지르지 못한 채 멸망의 소용돌이에 휘말렸다. 그는 그 참상을 냉정하게 기록하며, 새로운 세계의 탄생을 위한 필수적인 과정이라 여겼다.\n\n*「함락은 곧 새로운 질서의 시작이다」*\n\n파괴된 잔해 위에서, 그는 새로운 연산을 시작했다. 멸망한 은하의 에너지를 흡수하여, 그는 더욱 강력한 지식의 힘을 얻었다. 세상은 끝났지만, 그의 연구는 이제 막 시작되었을 뿐이었다."
  },
  {
    "id": "lc_조화가_침묵한_후",
    "name": "조화가 침묵한 후",
    "gameId": "hsr",
    "releaseVersion": "2.3",
    "folderName": "조화가 침묵한 후",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "적막",
      "description": "장착한 캐릭터의 격파 특수효과가 28% 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 8% 증가한다, 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 28% 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 8% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 35% 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 10% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 42% 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 12% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 49% 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 14% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 56% 증가한다. 장착한 캐릭터가 필살기 발동 후 속도가 16% 증가한다, 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("생각의 가루", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("생각의 가루", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 3, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 4, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("거친 스케치", 3, 2), createMaterial("역동적인 선화", 9, 3), createMaterial("정교한 컬러 원고", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] }
    ],
    "story": "소원하던 영원한 꿈은 한순간에 사라졌다. 땅을 향해 추락할 때, 그는 눈을 감고 싶을 뿐 슬퍼하지 않았다.\n\n밟은 옛길은 이미 산산조각이 나 있었고, 앞길은 여전히 안개에 휩싸여 있었다.\n*「깨어난 후, 세계는 여전히 고통스러운 순환을 겪고 있다. 그 무엇도 벗어날 수 없어. 원래 그랬듯이……」*\n그는 과거를 짊어진 채, 고향 땅을 뒤로하고 이제는 존재하지 않는 낙원을 향해 발걸음을 옮겼다.\n\n그래서 사람들은 왜 잠을 자고, 왜 깨어나는 것일까?\n——하나, 또 하나의 행성이 창밖을 스쳐 지나갔다. 이제 이 답에는 새로운 의미를 부여해야 할지도 모른다.\n*「어쩌면——어쩌면 난 아직……」*"
  },
  {
    "id": "lc_천재들의_휴식",
    "name": "천재들의 휴식",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "천재들의 휴식",
    "rarity": 4,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "각자 위치로",
      "description": "장착한 캐릭터의 공격력이 16% 증가한다. 장착한 캐릭터가 적 처치 시 치명타 피해가 24% 증가한다, 지속 시간: 3턴",
      "descriptions": [
        "장착한 캐릭터의 공격력이 16% 증가한다. 장착한 캐릭터가 적 처치 시 치명타 피해가 24% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 20% 증가한다. 장착한 캐릭터가 적 처치 시 치명타 피해가 30% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터가 적 처치 시 치명타 피해가 36% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 28% 증가한다. 장착한 캐릭터가 적 처치 시 치명타 피해가 42% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 32% 증가한다. 장착한 캐릭터가 적 처치 시 치명타 피해가 48% 증가한다, 지속 시간: 3턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("영생의 새싹", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("영생의 새싹", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 3, 3), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 4, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("영감의 열쇠", 3, 2), createMaterial("계몽의 열쇠", 9, 3), createMaterial("지식의 열쇠", 12, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 12, 4)] }
    ],
    "story": "차 한 잔의 여유는 천재들에게도 필요하다. 고요한 도서관 안, 각자의 연구에 몰두하던 그들은 잠시 손을 멈추고 창밖을 보았다.\n\n*「휴식은 더 위대한 발견을 위한 발판이다」*\n\n어떤 이는 은하계의 지도를 다시 그렸고, 어떤 이는 생명의 기원을 연산했다. 짧은 침묵 속에서, 그들의 머릿속에는 이미 수천 개의 가설과 수만 개의 공식이 소용돌이치고 있었다. 이 평화로운 휴식이 끝나면, 세상은 다시 한번 그들의 지혜에 경탄하게 될 것이다."
  },
  {
    "id": "lc_식견",
    "name": "식견",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "식견",
    "rarity": 3,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [14, 55, 94, 139, 184, 228, 273, 318],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "천재",
      "description": "장착한 캐릭터가 필살기 발동 시 공격력이 24% 증가한다. 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터가 필살기 발동 시 공격력이 24% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 필살기 발동 시 공격력이 30% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 필살기 발동 시 공격력이 36% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 필살기 발동 시 공격력이 42% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 필살기 발동 시 공격력이 48% 증가한다. 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("약탈의 본능", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("약탈의 본능", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 2, 3), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 3, 4), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3), createMaterial("짓밟힌 의지", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 9, 4), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3), createMaterial("짓밟힌 의지", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 9, 4), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3), createMaterial("짓밟힌 의지", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「지혜의 인간이 인간의 신분을 버리지 못한다면, 그는 지혜로부터 버림받을 것이다」*"
  },
  {
    "id": "lc_영험한_열쇠",
    "name": "영험한 열쇠",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "영험한 열쇠",
    "rarity": 3,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [34, 129, 220, 324, 428, 533, 637, 741],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "깨달음",
      "description": "장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 8pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다",
      "descriptions": [
        "장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 8pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다",
        "장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 9pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다",
        "장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 10pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다",
        "장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 11pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다",
        "장착한 캐릭터가 전투 스킬 발동 후 추가로 에너지를 12pt 회복한다. 해당 효과는 단일 턴 내 중복 발동되지 않는다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("소멸된 코어", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("소멸된 코어", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 2, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 3, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 바로 이런 보잘것없는 찰나의 순간들이 모여 장렬한 운명을 엮어낸다.\n\n*「지식은 영원히 저 문 뒤에 있고 열쇠를 주는 이도 없다. 가장 원하는 사람이 손에 넣을 수 있을 뿐」*"
  },
  {
    "id": "lc_아카이브",
    "name": "아카이브",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "아카이브",
    "rarity": 3,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [34, 129, 220, 324, 428, 533, 637, 741],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "박식",
      "description": "장착한 캐릭터가 필살기로 가하는 피해가 28% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 필살기로 가하는 피해가 28% 증가한다",
        "장착한 캐릭터가 필살기로 가하는 피해가 35% 증가한다",
        "장착한 캐릭터가 필살기로 가하는 피해가 42% 증가한다",
        "장착한 캐릭터가 필살기로 가하는 피해가 49% 증가한다",
        "장착한 캐릭터가 필살기로 가하는 피해가 56% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("소멸된 코어", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("소멸된 코어", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 2, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 3, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("영감의 열쇠", 2, 2), createMaterial("계몽의 열쇠", 6, 3), createMaterial("지식의 열쇠", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] }
    ],
    "story": "「인류가 곧 멸망한다 해도, 도서관은 쓸쓸히 등잔을 밝히고, 움직이지 않은 채, 묵묵히 책들을 소장할 것이다. 쓸모없으나 오염되지 않은 채로」"
  },
  {
    "id": "lc_별이_밤하늘을_밝힐_때",
    "name": "별이 밤하늘을 밝힐 때",
    "gameId": "hsr",
    "releaseVersion": "4.4",
    "folderName": "별이 밤하늘을 밝힐 때",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 371, 490, 612, 609, 728, 847],
      [29, 111, 278, 367, 306, 456, 546, 635],
      [24, 92, 232, 306, 230, 380, 455, 529]
    ),
    "skill": {
      "name": "최초의 소원",
      "description": "장착한 캐릭터가 피해를 가할 시 목표의 방어력을 32% 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 6pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: 3스택. [출항] 스택당 전투 지원 스킬 피해가 20% 증가하며, [출항] 3스택 도달 시 [출항] 스택당 필살기 피해가 20% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 피해를 가할 시 목표의 방어력을 32% 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 6pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: 3스택. [출항] 스택당 전투 지원 스킬 피해가 20% 증가하며, [출항] 3스택 도달 시 [출항] 스택당 필살기 피해가 20% 증가한다",
        "장착한 캐릭터가 피해를 가할 시 목표의 방어력을 36% 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 6pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: 3스택. [출항] 스택당 전투 지원 스킬 피해가 25% 증가하며, [출항] 3스택 도달 시 [출항] 스택당 필살기 피해가 25% 증가한다",
        "장착한 캐릭터가 피해를 가할 시 목표의 방어력을 40% 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 6pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: 3스택. [출항] 스택당 전투 지원 스킬 피해가 30% 증가하며, [출항] 3스택 도달 시 [출항] 스택당 필살기 피해가 30% 증가한다",
        "장착한 캐릭터가 피해를 가할 시 목표의 방어력을 44% 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 6pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: 3스택. [출항] 스택당 전투 지원 스킬 피해가 35% 증가하며, [출항] 3스택 도달 시 [출항] 스택당 필살기 피해가 35% 증가한다",
        "장착한 캐릭터가 피해를 가할 시 목표의 방어력을 48% 무시한다. 장착한 캐릭터가 전투 지원 스킬 발동 시 에너지를 6pt 회복하고 [출항]을 획득한다, 지속 시간: 2턴, 최대 중첩수: 3스택. [출항] 스택당 전투 지원 스킬 피해가 40% 증가하며, [출항] 3스택 도달 시 [출항] 스택당 필살기 피해가 40% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("천진난만 크레파스", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("천체 모형", 4, 2), createMaterial("천진난만 크레파스", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 4, 3), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 5, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 15, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 15, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 14, 4)] }
    ],
    "story": "*어린 시절을 돌아보면, 처음으로 「개척」에 관한 모험 이야기를 들었던 때가 떠오른다.\n조그만 심장은 우주의 신비로움과 광활함에 두근거렸고, 그녀는 붓을 들어 우주에 대한 최초의 상상을 그려냈다.\n「한 척의 혜성선, 한 개의 은하 궤도, 한 명의 항법사…」\n「이러면 개척의 가능성이 생기는 거겠지?」\n하지만 저주는 그녀의 발걸음을 늦췄고, 병상은 그녀의 청춘을 가두었다.\n고독한 시간 속에서 높이 쌓인 서적, 어지러운 엔진 설계도, 빈 물감 통이 일상이 되었다.\n수척해진 모습으로 붓을 놀리며, 그녀가 그리던 꿈을 세밀하게 그려 나갔다.\n「어쩌면 제한된 시간 속에서 더 많은 가능성을 쟁취할 수 있을지도 몰라」\n「꿈일지라도, 색채로 밝힐 가치는 있으니까」\n별의 궤적이 다시금 흐르자, 눈을 감고 다시 뜨는 사이 그녀는 이미 출발하여 뭇별로 향하는 여정에 올랐다.\n친구와 함께 품었던 소원을 짊어지고, 꿈꾸던 자신이 되었다.\n「개척의 여정은 지금 이 순간 시작될 거야」\n열차는 우주 사이를 누비고, 항법사와 동료가 함께한 발자취는 굳건한 은하 궤도를 이룬다.\n「함께 뭇별이 있는 미래에 도달하자!」*"
  },
  {
    "id": "lc_고요히_빛나는_불티",
    "name": "고요히 빛나는 불티",
    "gameId": "hsr",
    "releaseVersion": "4.4",
    "folderName": "고요히 빛나는 불티",
    "rarity": 5,
    "path": "지식",
    "baseStats": createDetailedBaseStats(
      [38, 148, 371, 490, 612, 609, 728, 847],
      [29, 111, 278, 367, 306, 456, 546, 635],
      [24, 92, 232, 306, 230, 380, 455, 529]
    ),
    "skill": {
      "name": "발아",
      "description": "장착한 캐릭터의 치명타 확률이 18% 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 누적 4pt 이상의 전투 스킬 포인트를 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: 3턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해는 목표의 방어력을 20% 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 60% 증가하며, 같은 유형의 효과는 중첩되지 않는다",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 18% 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 누적 4pt 이상의 전투 스킬 포인트를 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: 3턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해는 목표의 방어력을 20% 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 60% 증가하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 치명타 확률이 21% 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 누적 4pt 이상의 전투 스킬 포인트를 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: 3턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해는 목표의 방어력을 24% 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 70% 증가하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 치명타 확률이 24% 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 누적 4pt 이상의 전투 스킬 포인트를 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: 3턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해는 목표의 방어력을 28% 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 80% 증가하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 치명타 확률이 27% 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 누적 4pt 이상의 전투 스킬 포인트를 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: 3턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해는 목표의 방어력을 32% 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 90% 증가하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 치명타 확률이 30% 증가한다. 임의의 아군 캐릭터가 자신의 같은 턴 동안 누적 4pt 이상의 전투 스킬 포인트를 소모하면 장착한 캐릭터는 [빛나는 왕관]을 획득한다, 지속 시간: 3턴. 장착한 캐릭터가 [빛나는 왕관] 보유 시, 모든 아군이 가하는 피해는 목표의 방어력을 36% 무시하고, 장착한 캐릭터가 가하는 전투 스킬 피해가 100% 증가하며, 같은 유형의 효과는 중첩되지 않는다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("약탈의 본능", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("천체 모형", 4, 2), createMaterial("약탈의 본능", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 4, 3), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 5, 4), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3), createMaterial("짓밟힌 의지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 15, 4), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3), createMaterial("짓밟힌 의지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("천체 모형", 4, 2), createMaterial("은하계 프레임", 12, 3), createMaterial("은하 모형판", 15, 4), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3), createMaterial("짓밟힌 의지", 14, 4)] }
    ],
    "story": "*마력이 쏟아지는 순간, 보석의 알록달록한 색채가 벽을 가득 수놓았다.\n소녀는 뜻밖의 놀라움에 미소를 지으며, 일렁이는 광점을 조심스레 어루만졌다.\n「성공했어! 앞으로 나도 위대한 마법사가 될 수 있는 걸까?」\n그녀는 마법사로서의 미래를 상상하며, 마음속에 소원의 씨앗을 심었다.\n「힘내! 토오사카 린. 한 번의 성공으로는 부족해, 수없이 성공해야만 해!」\n「미래가 어떤 모습일지 모르지만, 지금은 자신의 마음이 이끄는 대로 나아가자!」\n성공을 맞이한 이 순간, 스스로 세운 기준, 가문의 희망, 짊어진 무거운 책임이 한 몸에 모였다.\n소녀는 묵묵히 응원하고 스스로를 독려하며, 더 나은 자신이 될 준비를 마쳤다.\n앞으로의 길은 길고 험난하겠지만, 불타는 마음은 마법보다 더욱 눈부시게 빛날 것이다*"
  }
];
