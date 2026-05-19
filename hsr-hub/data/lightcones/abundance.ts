import { HsrLightCone } from '../../types';
import { createDetailedBaseStats, createMaterial } from '../dataFactory';

export const abundanceLightcones: HsrLightCone[] = [
  {
    "id": "lc_오직_향만이_변함없이",
    "name": "오직 향만이 변함없이",
    "gameId": "hsr",
    "releaseVersion": "2.5",
    "folderName": "오직 향만이 변함없이",
    "rarity": 5,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "안심",
      "description": "장착한 캐릭터의 격파 특수효과가 60%/70%/80%/90%/100% 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠뜨린다. 지속 시간: 2턴. [망우] 상태의 적은 받는 피해가 10%/12%/14%/16%/18% 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 150% 이상이면 받는 피해 증가 효과가 추가로 8%/10%/12%/14%/16% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠뜨린다. 지속 시간: 2턴. [망우] 상태의 적은 받는 피해가 10% 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 150% 이상이면 받는 피해 증가 효과가 추가로 8% 증가한다",
        "장착한 캐릭터의 격파 특수효과가 70% 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠뜨린다. 지속 시간: 2턴. [망우] 상태의 적은 받는 피해가 12% 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 150% 이상이면 받는 피해 증가 효과가 추가로 10% 증가한다",
        "장착한 캐릭터의 격파 특수효과가 80% 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠뜨린다. 지속 시간: 2턴. [망우] 상태의 적은 받는 피해가 14% 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 150% 이상이면 받는 피해 증가 효과가 추가로 12% 증가한다",
        "장착한 캐릭터의 격파 특수효과가 90% 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠뜨린다. 지속 시간: 2턴. [망우] 상태의 적은 받는 피해가 16% 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 150% 이상이면 받는 피해 증가 효과가 추가로 14% 증가한다",
        "장착한 캐릭터의 격파 특수효과가 100% 증가한다. 장착한 캐릭터가 필살기를 발동하여 적 공격 후 해당 적을 [망우] 상태에 빠뜨린다. 지속 시간: 2턴. [망우] 상태의 적은 받는 피해가 18% 증가하고, 장착한 캐릭터의 현재 격파 특수효과가 150% 이상이면 받는 피해 증가 효과가 추가로 16% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("영생의 새싹", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("이계 나무의 씨앗", 4, 2), createMaterial("영생의 새싹", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("이계 나무의 씨앗", 4, 2), createMaterial("생장의 꽃꿀", 4, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("이계 나무의 씨앗", 4, 2), createMaterial("생장의 꽃꿀", 12, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("이계 나무의 씨앗", 4, 2), createMaterial("생장의 꽃꿀", 12, 3), createMaterial("만상의 과실", 5, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("이계 나무의 씨앗", 4, 2), createMaterial("생장의 꽃꿀", 12, 3), createMaterial("만상의 과실", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("이계 나무의 씨앗", 4, 2), createMaterial("생장의 꽃꿀", 12, 3), createMaterial("만상의 과실", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] }
    ],
    "story": "*「첫째, 업무 습관을 정비할 것」*\n*「둘째, 보상 및 처벌 규정을 엄격히 이행할 것」*\n*「물론 가장 중요한 건 복잡하게 얽힌 이해관계를 최대한 빨리 밝혀내는 것……」*\n\n호수와 푸른 산이 어우러진 아름다운 경치를 보고 있었는데, 자신도 모르는 사이에 또 업무에 대해 생각하고 있었고, 스트레스와 짜증이 함께 몰려왔다.\n\n그녀는 서둘러 몸에 지니고 있던 안정향을 피웠다.\n*「세상은 이렇게나 아름다운데, 난 성질이나 부리고 있구나…. 휴일에는 그런 귀찮은 일들을 생각하지 말자……」*"
  },
  {
    "id": "lc_섬뜩한_밤",
    "name": "섬뜩한 밤",
    "gameId": "hsr",
    "releaseVersion": "1.5",
    "folderName": "섬뜩한 밤",
    "rarity": 5,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [53, 203, 346, 510, 673, 837, 1001, 1164],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "깊은 심호흡",
      "description": "장착한 캐릭터의 에너지 회복효율이 12%/14%/16%/18%/20% 증가한다. 아군이 필살기 발동 시 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 10%/11%/12%/13%/14%만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시 해당 아군의 공격력이 2.4%/2.8%/3.2%/3.6%/4% 증가한다. 해당 효과 최대 중첩수: 5스택. 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 에너지 회복효율이 12% 증가한다. 아군이 필살기 발동 시 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 10%만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시 해당 아군의 공격력이 2.4% 증가한다. 해당 효과 최대 중첩수: 5스택. 지속 시간: 2턴",
        "장착한 캐릭터의 에너지 회복효율이 14% 증가한다. 아군이 필살기 발동 시 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 11%만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시 해당 아군의 공격력이 2.8% 증가한다. 해당 효과 최대 중첩수: 5스택. 지속 시간: 2턴",
        "장착한 캐릭터의 에너지 회복효율이 16% 증가한다. 아군이 필살기 발동 시 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 12%만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시 해당 아군의 공격력이 3.2% 증가한다. 해당 효과 최대 중첩수: 5스택. 지속 시간: 2턴",
        "장착한 캐릭터의 에너지 회복효율이 18% 증가한다. 아군이 필살기 발동 시 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 13%만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시 해당 아군의 공격력이 3.6% 증가한다. 해당 효과 최대 중첩수: 5스택. 지속 시간: 2턴",
        "장착한 캐릭터의 에너지 회복효율이 20% 증가한다. 아군이 필살기 발동 시 장착한 캐릭터는 현재 HP 백분율이 가장 낮은 아군의 HP를 대상 HP 최대치의 14%만큼 회복시킨다. 장착한 캐릭터가 아군에게 치유 제공 시 해당 아군의 공격력이 4% 증가한다. 해당 효과 최대 중첩수: 5스택. 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("영생의 새싹", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("영생의 새싹", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 4, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 5, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] }
    ],
    "story": "소녀는 문 뒤에 숨은 채 앞으로 다가가길 꺼린다.\n어쩌면 오늘 밤의 목표가 바로 눈앞에 있어서 그런 걸지도 모른다. 그녀의 심장이 더욱 빠르게 뛰고 있는 것 같다.\n*「무섭지 않아, 난 무섭지 않아……」*\n어둠 속에서 침묵이 비명을 지른다.\n\n소녀는 떨면서 손에 쥐고 있는 「무기」를 꽉 잡았지만 「목표」에 다가가는 것이 여전히 무섭다.\n*「안 무서워… 안… 무… 무서워!」*\n\n몸 뒤의 꼬리는 결국 참지 못하고 번쩍 빛났다.\n*「빨리 해, 겨우 택배 하나 가져오는 거잖아!」*"
  },
  {
    "id": "lc_관의_울림",
    "name": "관의 울림",
    "gameId": "hsr",
    "releaseVersion": "1.1",
    "folderName": "관의 울림",
    "rarity": 5,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [53, 203, 346, 510, 673, 837, 1001, 1164],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "가시",
      "description": "장착한 캐릭터의 공격력이 24%/28%/32%/36%/40% 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 3/3.5/4/4.5/5pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 3회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 12/14/16/18/20pt 증가한다. 지속 시간: 1턴",
      "descriptions": [
        "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 3pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 3회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 12pt 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 28% 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 3.5pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 3회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 14pt 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 32% 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 4pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 3회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 16pt 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 36% 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 4.5pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 3회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 18pt 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 공격력이 40% 증가한다. 장착한 캐릭터가 공격을 발동하면 다른 적 1기를 명중할 때마다 에너지를 5pt 회복한다. 공격할 때마다 해당 방식으로 에너지를 최대 3회 회복한다. 장착한 캐릭터가 필살기를 발동하면 모든 아군의 속도가 20pt 증가한다. 지속 시간: 1턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("영생의 새싹", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("공조 기계 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 4, 3), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 5, 4), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3), createMaterial("공조 환류 심장", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 15, 4), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3), createMaterial("공조 환류 심장", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 15, 4), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3), createMaterial("공조 환류 심장", 14, 4)] }
    ],
    "story": "하얀 아이리스 옆에서 그는 관을 두드린다.\n*「가끔 너와 이 거래를 한 건 널 과소평가한 거라고 생각해」*\n아무런 대답 없이 가시가 그의 손바닥을 뚫는다.\n그러나 그는 웃으며 가시를 잡았다.\n\n*「그래, 우린 서로를 이용하려 하지만 한편으로 서로를 과소평가하고 있지」*"
  },
  {
    "id": "lc_세월은_흐를_뿐",
    "name": "세월은 흐를 뿐",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "세월은 흐를 뿐",
    "rarity": 5,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [58, 222, 377, 556, 734, 913, 1092, 1270],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "아침, 점심, 저녁, 그리고 밤",
      "description": "장착한 캐릭터의 HP 최대치가 18%/21%/24%/27%/30% 증가하고, 치유량이 12%/14%/16%/18%/20% 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군이 공격 발동 후 기록한 치유량의 36%/42%/48%/54%/60%에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다",
      "descriptions": [
        "장착한 캐릭터의 HP 최대치가 18% 증가하고, 치유량이 12% 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군이 공격 발동 후 기록한 치유량의 36%에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다",
        "장착한 캐릭터의 HP 최대치가 21% 증가하고, 치유량이 14% 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군이 공격 발동 후 기록한 치유량의 42%에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다",
        "장착한 캐릭터의 HP 최대치가 24% 증가하고, 치유량이 16% 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군이 공격 발동 후 기록한 치유량의 48%에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다",
        "장착한 캐릭터의 HP 최대치가 27% 증가하고, 치유량이 18% 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군이 공격 발동 후 기록한 치유량의 54%에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다",
        "장착한 캐릭터의 HP 최대치가 30% 증가하고, 치유량이 20% 증가한다. 장착한 캐릭터가 아군에게 치유 제공 시 치유량을 기록한다. 임의의 아군이 공격 발동 후 기록한 치유량의 60%에 따라 임의의 피격된 적 1기에게 장착한 캐릭터 속성의 추가 피해를 준다. 해당 피해는 보너스의 영향을 받지 않고 턴마다 최대 1회 결산한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("풍요의 씨앗", 4, 2), createMaterial("생명의 새싹", 12, 3), createMaterial("영원의 꽃", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "그녀는 창가에서 오랫동안 시간이 흐르는 것을 지켜보았다.\n박하와 형개를 배합해서 향이 부드러운 약을 조제할 때는 창밖에서 꽃이 피어났다.\n향유와 생강을 배합해서 향이 강한 약을 조제할 때는 창밖에서 비가 내렸다.\n작약과 오매를 배합해서 시큼한 약을 조제할 때는 창밖에서 낙엽이 떨어졌다.\n황금과 지모를 배합해서 쓰디쓴 약을 조제할 때는 창밖에서 눈이 내렸다.\n\n아무리 세월이 흘러도 창가에 앉아있는 사람은 변함이 없었다"
  },
  {
    "id": "lc_수술_후의_대화",
    "name": "수술 후의 대화",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "수술 후의 대화",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "상호 치유",
      "description": "장착한 캐릭터의 에너지 회복효율이 8%/10%/12%/14%/16% 증가하고, 필살기 발동 시 치유량이 12%/15%/18%/21%/24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 에너지 회복효율이 8% 증가하고, 필살기 발동 시 치유량이 12% 증가한다",
        "장착한 캐릭터의 에너지 회복효율이 10% 증가하고, 필살기 발동 시 치유량이 15% 증가한다",
        "장착한 캐릭터의 에너지 회복효율이 12% 증가하고, 필살기 발동 시 치유량이 18% 증가한다",
        "장착한 캐릭터의 에너지 회복효율이 14% 증가하고, 필살기 발동 시 치유량이 21% 증가한다",
        "장착한 캐릭터의 에너지 회복효율이 16% 증가하고, 필살기 발동 시 치유량이 24% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "「깼구나… 고마워」\n「네가… 날 구했구나… 나타샤. 고마워해야 할 사람은… 나야」\n「아니, 감사는 내가 해야지… 수술이 끝날 때까지 버텨줘서 고마워」\n\n피곤한 의사와 환자가 눈을 마주치며 서로 말없이 웃었다"
  },
  {
    "id": "lc_알맞은_타이밍",
    "name": "알맞은 타이밍",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "알맞은 타이밍",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "굴절된 시선",
      "description": "장착한 캐릭터의 효과 저항이 16%/20%/24%/28%/32% 증가하고, 장착한 캐릭터의 치유량이 증가한다. 증가 수치는 효과 저항의 33%/36%/39%/42%/45%만큼이다. 치유량은 최대 15%/18%/21%/24%/27% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 효과 저항이 16% 증가하고, 장착한 캐릭터의 치유량이 증가한다. 증가 수치는 효과 저항의 33%만큼이다. 치유량은 최대 15% 증가한다",
        "장착한 캐릭터의 효과 저항이 20% 증가하고, 장착한 캐릭터의 치유량이 증가한다. 증가 수치는 효과 저항의 36%만큼이다. 치유량은 최대 18% 증가한다",
        "장착한 캐릭터의 효과 저항이 24% 증가하고, 장착한 캐릭터의 치유량이 증가한다. 증가 수치는 효과 저항의 39%만큼이다. 치유량은 최대 21% 증가한다",
        "장착한 캐릭터의 효과 저항이 28% 증가하고, 장착한 캐릭터의 치유량이 증가한다. 증가 수치는 효과 저항의 42%만큼이다. 치유량은 최대 24% 증가한다",
        "장착한 캐릭터의 효과 저항이 32% 증가하고, 장착한 캐릭터의 치유량이 증가한다. 증가 수치는 효과 저항의 45%만큼이다. 치유량은 최대 27% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공조 기계 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("공조 기계 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] }
    ],
    "story": "거리는 붐비고, 그는 걷고, 햇빛은 따라온다.\n그는 발걸음을 멈추고 종이 우산을 들고 그늘을 펼친다.\n그 한줄기의 시선도 가렸다"
  },
  {
    "id": "lc_같은_심정",
    "name": "같은 심정",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "같은 심정",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "치료와 수리",
      "description": "장착한 캐릭터의 치유량이 10%/12%/15%/17%/20% 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 2.0/2.5/3.0/3.5/4.0pt 회복된다",
      "descriptions": [
        "장착한 캐릭터의 치유량이 10% 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 2.0pt 회복된다",
        "장착한 캐릭터의 치유량이 12% 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 2.5pt 회복된다",
        "장착한 캐릭터의 치유량이 15% 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 3.0pt 회복된다",
        "장착한 캐릭터의 치유량이 17% 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 3.5pt 회복된다",
        "장착한 캐릭터의 치유량이 20% 증가하고, 전투 스킬 발동 시 모든 아군의 에너지가 4.0pt 회복된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공조 기계 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("공조 기계 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] }
    ],
    "story": "의사가 여자아이를 찾았을 때, 아이는 상처를 입었지만, 작동을 멈춘 기계를 여전히 꼭 껴안고 있었다. 주머니에는 여러 가지 부속품들이 가득했다.\n그녀는 아이를 진료소로 급히 데려와 상처에 좋은 약을 발라주었다.\n땀방울은 뺨에서 흘러내렸다. 아이는 아무 말도 하지 않았지만, 손은 잠시도 멈추지 않았다.\n의사는 아이의 눈에는 기계만 보인다는 것을 알아차렸다. 치료를 기다리는 환자를 마주하는 자신처럼 말이다.\n그래서 그녀는 위로도, 앞으로는 조심하라는 조언도 하지 않고, 그저 아이의 곁에 앉아 조용히 함께 했다"
  },
  {
    "id": "lc_등가교환",
    "name": "등가교환",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "등가교환",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "편안함",
      "description": "장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 50% 미만인 다른 아군 1명의 에너지를 8/10/12/14/16pt 회복한다",
      "descriptions": [
        "장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 50% 미만인 다른 아군 1명의 에너지를 8pt 회복한다",
        "장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 50% 미만인 다른 아군 1명의 에너지를 10pt 회복한다",
        "장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 50% 미만인 다른 아군 1명의 에너지를 12pt 회복한다",
        "장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 50% 미만인 다른 아군 1명의 에너지를 14pt 회복한다",
        "장착한 캐릭터의 턴 시작 시 랜덤으로 현재 에너지 백분율이 50% 미만인 다른 아군 1명의 에너지를 16pt 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("철위대 배지", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("철위대 배지", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 12, 4)] }
    ],
    "story": "용녀가 해준 번개 마사지를 즐긴 후, 여우족 소녀는 손을 내밀어 그녀의 볼을 꼬집는다.\n그녀가 입을 삐죽 내밀자 그녀는 요염하게 웃는다.\n\n*「등가교환이랍니다~」*"
  },
  {
    "id": "lc_따듯한_밤은_길지_않고",
    "name": "따듯한 밤은 길지 않고",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "따듯한 밤은 길지 않고",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "작은 등불",
      "description": "장착한 캐릭터의 HP 최대치가 16%/20%/24%/28%/32% 증가한다. 일반 공격 혹은 전투 스킬 발동 후 모든 아군의 HP를 각자 HP 최대치의 2.0%/2.5%/3.0%/3.5%/4.0%만큼 회복시킨다",
      "descriptions": [
        "장착한 캐릭터의 HP 최대치가 16% 증가한다. 일반 공격 혹은 전투 스킬 발동 후 모든 아군의 HP를 각자 HP 최대치의 2.0%만큼 회복시킨다",
        "장착한 캐릭터의 HP 최대치가 20% 증가한다. 일반 공격 혹은 전투 스킬 발동 후 모든 아군의 HP를 각자 HP 최대치의 2.5%만큼 회복시킨다",
        "장착한 캐릭터의 HP 최대치가 24% 증가한다. 일반 공격 혹은 전투 스킬 발동 후 모든 아군의 HP를 각자 HP 최대치의 3.0%만큼 회복시킨다",
        "장착한 캐릭터의 HP 최대치가 28% 증가한다. 일반 공격 혹은 전투 스킬 발동 후 모든 아군의 HP를 각자 HP 최대치의 3.5%만큼 회복시킨다",
        "장착한 캐릭터의 HP 최대치가 32% 증가한다. 일반 공격 혹은 전투 스킬 발동 후 모든 아군의 HP를 각자 HP 최대치의 4.0%만큼 회복시킨다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "불을 켜고 핫초코 한 잔을 들고 옆에 있는 친구를 바라본다.\n그녀가 자신이 보낸 책과 노트를 읽는 모습을 바라본다.\n그녀가 평소에 좀처럼 내비치지 않는 웃음을 짓는 걸 바라본다.\n\n추운 밤, 아주 작은 행복만으로도 한기를 날려버릴 수 있다."
  },
  {
    "id": "lc_무엇이_진실인가",
    "name": "무엇이 진실인가",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "무엇이 진실인가",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "가설",
      "description": "장착한 캐릭터의 격파 특수효과가 24%/30%/36%/42%/48% 증가한다. 일반 공격 발동 후 장착한 캐릭터는 자신의 HP 최대치의 2.0%/2.5%/3.0%/3.5%/4.0%+800pt만큼 HP를 회복한다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 24% 증가한다. 일반 공격 발동 후 장착한 캐릭터는 자신의 HP 최대치의 2.0%+800pt만큼 HP를 회복한다",
        "장착한 캐릭터의 격파 특수효과가 30% 증가한다. 일반 공격 발동 후 장착한 캐릭터는 자신의 HP 최대치의 2.5%+800pt만큼 HP를 회복한다",
        "장착한 캐릭터의 격파 특수효과가 36% 증가한다. 일반 공격 발동 후 장착한 캐릭터는 자신의 HP 최대치의 3.0%+800pt만큼 HP를 회복한다",
        "장착한 캐릭터의 격파 특수효과가 42% 증가한다. 일반 공격 발동 후 장착한 캐릭터는 자신의 HP 최대치의 3.5%+800pt만큼 HP를 회복한다",
        "장착한 캐릭터의 격파 특수효과가 48% 증가한다. 일반 공격 발동 후 장착한 캐릭터는 자신의 HP 최대치의 4.0%+800pt만큼 HP를 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("꿈 저장 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("꿈 저장 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 12, 4)] }
    ],
    "story": "「만약 모든 시계가 잘못된 시각을 가리킨다면……」\n「만약 한 사람이 약속을 어김으로써 약속을 지킨다면……」\n「만약 꿈속에 빠진 사람이 실제로는 단 한 번도 잠든 적이 없다면……」\n「만약 죽은 자가 살아 돌아왔을 때, 자신의 이름이 빼앗긴 것을 깨닫는다면……」\n\n「만약… 만약……」\n그가 불을 불어서 끄자, 어둠 속에 남은 건 시계의 멈추지 않는 째깍거리는 소리뿐이었다"
  },
  {
    "id": "lc_꿈의_몽타주",
    "name": "꿈의 몽타주",
    "gameId": "hsr",
    "releaseVersion": "2.6",
    "folderName": "꿈의 몽타주",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "아카데믹 편집",
      "description": "장착한 캐릭터의 속도가 8%/9%/10%/11%/12% 증가한다. 약점 격파 상태인 적을 공격하면 에너지를 3/3.5/4/4.5/5pt 회복한다. 해당 효과는 턴마다 최대 2회 발동한다",
      "descriptions": [
        "장착한 캐릭터의 속도가 8% 증가한다. 약점 격파 상태인 적을 공격하면 에너지를 3pt 회복한다. 해당 효과는 턴마다 최대 2회 발동한다",
        "장착한 캐릭터의 속도가 9% 증가한다. 약점 격파 상태인 적을 공격하면 에너지를 3.5pt 회복한다. 해당 효과는 턴마다 최대 2회 발동한다",
        "장착한 캐릭터의 속도가 10% 증가한다. 약점 격파 상태인 적을 공격하면 에너지를 4pt 회복한다. 해당 효과는 턴마다 최대 2회 발동한다",
        "장착한 캐릭터의 속도가 11% 증가한다. 약점 격파 상태인 적을 공격하면 에너지를 4.5pt 회복한다. 해당 효과는 턴마다 최대 2회 발동한다",
        "장착한 캐릭터의 속도가 12% 증가한다. 약점 격파 상태인 적을 공격하면 에너지를 5pt 회복한다. 해당 효과는 턴마다 최대 2회 발동한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("꿈 저장 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("꿈 저장 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 3, 3), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("만상의 과실", 4, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("만상의 과실", 12, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("만상의 과실", 12, 4), createMaterial("꿈 저장 부품", 15, 2), createMaterial("꿈 흐름 밸브", 15, 3), createMaterial("꿈 제조 모터", 12, 4)] }
    ],
    "story": "「좋은꿈의 도시, 죄악의 온상, 혹은 약속의 땅……」\n사람들의 기억을 취한 그는 전율을 일으키는 순간을 엿보곤 이를 휘저어 재구성하고 이어 붙인다.\n「대부분 사람들의 기억은 보잘것없고 무료하지. 일생을 통틀어 소중한 순간은 얼마 되지 않아. 다른 건 존재할 필요도 없어」\n\n프레임 한 컷 한 컷이 그의 손길을 거쳐 화려한 영상이 되어간다——\n「우리는 추억을 옮기는 게 아니라 과거를 창조할 뿐이야」"
  },
  {
    "id": "lc_내일의_내일이_올_때까지",
    "name": "내일의 내일이 올 때까지",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "내일의 내일이 올 때까지",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "이별",
      "description": "장착한 캐릭터의 치유량이 12%/15%/18%/21%/24% 증가한다. 아군의 현재 HP 백분율이 50% 이상일 시 가하는 피해가 12%/14%/16%/18%/20% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 치유량이 12% 증가한다. 아군의 현재 HP 백분율이 50% 이상일 시 가하는 피해가 12% 증가한다",
        "장착한 캐릭터의 치유량이 15% 증가한다. 아군의 현재 HP 백분율이 50% 이상일 시 가하는 피해가 14% 증가한다",
        "장착한 캐릭터의 치유량이 18% 증가한다. 아군의 현재 HP 백분율이 50% 이상일 시 가하는 피해가 16% 증가한다",
        "장착한 캐릭터의 치유량이 21% 증가한다. 아군의 현재 HP 백분율이 50% 이상일 시 가하는 피해가 18% 증가한다",
        "장착한 캐릭터의 치유량이 24% 증가한다. 아군의 현재 HP 백분율이 50% 이상일 시 가하는 피해가 20% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공포에 짓밟힌 육신", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("공포에 짓밟힌 육신", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 3, 3), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("만상의 과실", 4, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("만상의 과실", 12, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("이계 나무의 씨앗", 3, 2), createMaterial("생장의 꽃꿀", 9, 3), createMaterial("만상의 과실", 12, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 12, 4)] }
    ],
    "story": "「트리스비오스, 내일 봐……」\n\n어머니가 먼 길을 떠날 때 소녀는 그녀의 얼굴에 흐르는 눈물을 닦았다.\n\n그녀는 자신이 어머니처럼 될 때까지 수많은 내일을 기다렸다.\n그녀는 불씨를 움켜쥔 채 문 앞에 섰다. 그러자 귓가에 어머니의 말이 들려왔다.\n\n「그곳에는 눈보라도, 추위도, 폭우도 없을 거란다……」\n\n「하지만 내일 만나지 못한다면……」\n\n그녀는 유성이 하늘을 가르듯 어린아이의 모습만을 남긴 채 땅으로 추락했다.\n\n「내일의 내일 보자!」"
  },
  {
    "id": "lc_저기_나_여기_있어",
    "name": "저기, 나 여기 있어",
    "gameId": "hsr",
    "releaseVersion": "1.5",
    "folderName": "저기, 나 여기 있어",
    "rarity": 4,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "무섭지 않아…!",
      "description": "장착한 캐릭터의 HP 최대치가 8%/9%/10%/11%/12% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 16%/19%/22%/25%/28% 증가한다. 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 HP 최대치가 8% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 16% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 HP 최대치가 9% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 19% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 HP 최대치가 10% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 22% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 HP 최대치가 11% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 25% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 HP 최대치가 12% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 치유량이 28% 증가한다. 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공조 기계 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("공조 기계 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 3, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 4, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("풍요의 씨앗", 3, 2), createMaterial("생명의 새싹", 9, 3), createMaterial("영원의 꽃", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] }
    ],
    "story": "세 소녀가 어두운 밤 속을 걷는다. 주변 풍경은 오싹한 분위기가 더해지고 있다.\n\n「곽향 님, 어서 따라오세요, 안 그럼 저희 안 기다려요!」\n그녀는 으스스한 분위기에 영향을 받지 않은 듯 휴대폰을 들고 앞으로 성큼성큼 나아간다.\n\n「저… 저 여기 있어요!」\n앞에 서 있는 소녀가 쭈뼛쭈뼛 대답한다.\n\n「응? 앞쪽에 계셨어요? 그럼, 저랑 쏘쏘 뒤에 있는 건……」\n\n이 장면에 가장 걸맞은 종지부는 분명 소녀의 비명일 것이다"
  },
  {
    "id": "lc_증식",
    "name": "증식",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "증식",
    "rarity": 3,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [14, 55, 94, 139, 184, 228, 273, 318],
      [9, 35, 59, 87, 115, 143, 171, 198]
    ),
    "skill": {
      "name": "풍요의 백성",
      "description": "장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 12%/14%/16%/18%/20% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 12% 증가한다",
        "장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 14% 증가한다",
        "장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 16% 증가한다",
        "장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 18% 증가한다",
        "장착한 캐릭터가 일반 공격 발동 후 다음번 행동 게이지가 20% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("영생의 새싹", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("영생의 새싹", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 2, 3), createMaterial("영생의 새싹", 12, 2), createMaterial("영생의 꽃", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영생의 새싹", 12, 2), createMaterial("영생의 꽃", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 3, 4), createMaterial("영생의 새싹", 12, 2), createMaterial("영생의 꽃", 10, 3), createMaterial("영생의 가지", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 9, 4), createMaterial("영생의 새싹", 12, 2), createMaterial("영생의 꽃", 10, 3), createMaterial("영생의 가지", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 9, 4), createMaterial("영생의 새싹", 12, 2), createMaterial("영생의 꽃", 10, 3), createMaterial("영생의 가지", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「생명이 그 의미를 잃을 때, 계속 생명을 주시옵소서」*"
  },
  {
    "id": "lc_알찬_열매",
    "name": "알찬 열매",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "알찬 열매",
    "rarity": 3,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [14, 55, 94, 139, 184, 228, 273, 318],
      [9, 35, 59, 87, 115, 143, 171, 198]
    ),
    "skill": {
      "name": "감미",
      "description": "전투 시작 시 즉시 모든 아군의 에너지를 6/8/9/11/12pt 회복한다",
      "descriptions": [
        "전투 시작 시 즉시 모든 아군의 에너지를 6pt 회복한다",
        "전투 시작 시 즉시 모든 아군의 에너지를 8pt 회복한다",
        "전투 시작 시 즉시 모든 아군의 에너지를 9pt 회복한다",
        "전투 시작 시 즉시 모든 아군의 에너지를 11pt 회복한다",
        "전투 시작 시 즉시 모든 아군의 에너지를 12pt 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("소멸된 코어", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("소멸된 코어", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 2, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 3, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「목이 마르면 모든 것이 달콤하다」*"
  },
  {
    "id": "lc_풍작",
    "name": "풍작",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "풍작",
    "rarity": 3,
    "path": "풍요",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [12, 46, 79, 116, 153, 190, 227, 265],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "번성",
      "description": "장착한 캐릭터가 전투 스킬 혹은 필살기 발동 시 치유량이 12%/15%/18%/21%/24% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 전투 스킬 혹은 필살기 발동 시 치유량이 12% 증가한다",
        "장착한 캐릭터가 전투 스킬 혹은 필살기 발동 시 치유량이 15% 증가한다",
        "장착한 캐릭터가 전투 스킬 혹은 필살기 발동 시 치유량이 18% 증가한다",
        "장착한 캐릭터가 전투 스킬 혹은 필살기 발동 시 치유량이 21% 증가한다",
        "장착한 캐릭터가 전투 스킬 혹은 필살기 발동 시 치유량이 24% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("철위대 배지", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("철위대 배지", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 2, 3), createMaterial("철위대 배지", 12, 2), createMaterial("철위대 표식", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("철위대 배지", 12, 2), createMaterial("철위대 표식", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 3, 4), createMaterial("철위대 배지", 12, 2), createMaterial("철위대 표식", 10, 3), createMaterial("철위대 훈장", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 9, 4), createMaterial("철위대 배지", 12, 2), createMaterial("철위대 표식", 10, 3), createMaterial("철위대 훈장", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("풍요의 씨앗", 2, 2), createMaterial("생명의 새싹", 6, 3), createMaterial("영원의 꽃", 9, 4), createMaterial("철위대 배지", 12, 2), createMaterial("철위대 표식", 10, 3), createMaterial("철위대 훈장", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「생명은 질서의 정도가 어떤 역치(閾値)를 초월한 존재. 그 탄생은 적막한 우주의 마지막 해답이며, 오래된 혼돈의 시대가 돌아오지 않음을 선포한다」*"
  }
];
