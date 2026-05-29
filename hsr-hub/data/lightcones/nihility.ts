import { HsrLightCone } from '../../types';
import { createDetailedBaseStats, createMaterial } from '../dataFactory';

export const nihilityLightcones: HsrLightCone[] = [
  {
    "id": "lc_그윽",
    "name": "그윽",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "그윽",
    "rarity": 3,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [14, 55, 94, 139, 184, 228, 273, 318],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "타락",
      "description": "전투 시작 시 장착한 캐릭터의 효과 명중이 20% 증가한다. 지속 시간: 3턴",
      "descriptions": [
        "전투 시작 시 장착한 캐릭터의 효과 명중이 20% 증가한다. 지속 시간: 3턴",
        "전투 시작 시 장착한 캐릭터의 효과 명중이 25% 증가한다. 지속 시간: 3턴",
        "전투 시작 시 장착한 캐릭터의 효과 명중이 30% 증가한다. 지속 시간: 3턴",
        "전투 시작 시 장착한 캐릭터의 효과 명중이 35% 증가한다. 지속 시간: 3턴",
        "전투 시작 시 장착한 캐릭터의 효과 명중이 40% 증가한다. 지속 시간: 3턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("고대 부속품", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("고대 부속품", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 2, 3), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 3, 4), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3), createMaterial("고대 엔진", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 9, 4), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3), createMaterial("고대 엔진", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 9, 4), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3), createMaterial("고대 엔진", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n「그는 공허를 응시했다. 마치 만물의 종말에서 높이 걸린 검은 태양처럼, 또 마치 모든 의문에 해답을 내놓는 입처럼. 그 입이 말하길: ███ █ ███ ██ 이 대답은 인간의 어떤 언어로도 설명할 수 없었으나 모두가 이를 이해할 수 있었다」"
  },
  {
    "id": "lc_심연의_고리",
    "name": "심연의 고리",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "심연의 고리",
    "rarity": 3,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [14, 55, 94, 139, 184, 228, 273, 318],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "추궁",
      "description": "장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 24% 증가한다",
        "장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 30% 증가한다",
        "장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 36% 증가한다",
        "장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 42% 증가한다",
        "장착한 캐릭터가 감속 상태의 적에게 가하는 피해가 48% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("고대 부속품", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("고대 부속품", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 2, 3), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 3, 4), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3), createMaterial("고대 엔진", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 9, 4), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3), createMaterial("고대 엔진", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 9, 4), createMaterial("고대 부속품", 12, 2), createMaterial("고대 전동축", 10, 3), createMaterial("고대 엔진", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n「도망자는 이 고통을 아무도 이해하지 못할 거라 여기며 과거의 환영에서 벗어나려고 한다. 그가 고개를 들었을 때, 미래의 자신은 무서운 두 눈을 뜨고 있었다」"
  },
  {
    "id": "lc_숨은_그림자",
    "name": "숨은 그림자",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "숨은 그림자",
    "rarity": 3,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [14, 55, 94, 139, 184, 228, 273, 318],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "장치",
      "description": "전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 60%만큼의 추가 피해를 가한다",
      "descriptions": [
        "전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 60%만큼의 추가 피해를 가한다",
        "전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 75%만큼의 추가 피해를 가한다",
        "전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 90%만큼의 추가 피해를 가한다",
        "전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 105%만큼의 추가 피해를 가한다",
        "전투 스킬 발동 후, 장착한 캐릭터의 다음 일반 공격 1회는 적에게 자신 공격력 120%만큼의 추가 피해를 가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("공조 기계 부품", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("공조 기계 부품", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 2, 3), createMaterial("공조 기계 부품", 12, 2), createMaterial("공조 톱니바퀴", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("공조 기계 부품", 12, 2), createMaterial("공조 톱니바퀴", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 3, 4), createMaterial("공조 기계 부품", 12, 2), createMaterial("공조 톱니바퀴", 10, 3), createMaterial("공조 환류 심장", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 9, 4), createMaterial("공조 기계 부품", 12, 2), createMaterial("공조 톱니바퀴", 10, 3), createMaterial("공조 환류 심장", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("어두운 흑요", 2, 2), createMaterial("허공의 흑요", 6, 3), createMaterial("타락의 흑요", 9, 4), createMaterial("공조 기계 부품", 12, 2), createMaterial("공조 톱니바퀴", 10, 3), createMaterial("공조 환류 심장", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명\n\n「공허가 우리를 찾아낼 수도 있지만, 못 찾아낼 가능성이 높습니다」"
  },
  {
    "id": "lc_밤_인사와_잠든_얼굴",
    "name": "밤 인사와 잠든 얼굴",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "밤 인사와 잠든 얼굴",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "고된 자",
      "description": "적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 12% 증가한다. 최대 중첩수: 3스택. 해당 효과는 지속 피해에도 적용된다",
      "descriptions": [
        "적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 12% 증가한다. 최대 중첩수: 3스택. 해당 효과는 지속 피해에도 적용된다",
        "적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 15% 증가한다. 최대 중첩수: 3스택. 해당 효과는 지속 피해에도 적용된다",
        "적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 18% 증가한다. 최대 중첩수: 3스택. 해당 효과는 지속 피해에도 적용된다",
        "적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 21% 증가한다. 최대 중첩수: 3스택. 해당 효과는 지속 피해에도 적용된다",
        "적이 디버프 효과 1개를 보유할 때마다 장착한 캐릭터가 대상에게 가하는 피해가 24% 증가한다. 최대 중첩수: 3스택. 해당 효과는 지속 피해에도 적용된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("철위대 배지", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("철위대 배지", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 3, 3), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 4, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 12, 4)] }
    ],
    "story": "고요한 빛이 먼지의 실루엣을 비춘다.\n규칙적인 숨소리에 소녀가 단잠을 꾸는 잠꼬대가 섞여있다.\n한 사람의 그림자가 그녀 뒤로 나타나자 쥐 죽은 듯 조용해진다.\n「후후후, 역시 안경을 벗으면 더 귀엽잖아」\n소녀의 잠든 얼굴을 감상하던 기타리스트가 혼잣말한다.\n「잘자, 걱정 많은 천재 소녀」"
  },
  {
    "id": "lc_사냥감의_시선",
    "name": "사냥감의 시선",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "사냥감의 시선",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "자신감",
      "description": "장착한 캐릭터의 효과 명중이 20% 증가하고, 동시에 가하는 지속 피해가 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 효과 명중이 20% 증가하고, 동시에 가하는 지속 피해가 24% 증가한다",
        "장착한 캐릭터의 효과 명중이 25% 증가하고, 동시에 가하는 지속 피해가 30% 증가한다",
        "장착한 캐릭터의 효과 명중이 30% 증가하고, 동시에 가하는 지속 피해가 36% 증가한다",
        "장착한 캐릭터의 효과 명중이 35% 증가하고, 동시에 가하는 지속 피해가 42% 증가한다",
        "장착한 캐릭터의 효과 명중이 40% 증가하고, 동시에 가하는 지속 피해가 48% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("고대 부속품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("고대 부속품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 3, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 4, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] }
    ],
    "story": "사실 사냥감은 대부분 자신의 처지를 깨닫지 못한다.\n눈앞에 보이는 이 사냥감 역시 마찬가지다.\n조준경이 천천히 돌아가고 있는데도 남자는 여전히 지폐 뭉치를 뿌리고 있다.\n「탐욕스러운 모습을 좀 봐, 이 돈이면 내가 비즈니스 몇 건은 더 할 수 있을 것 같은데… 왜 누군가가 그를 죽이려고 하는지 알 것 같군」\n\n그의 마음속의 감회를 들은 듯 남자는 고개를 돌렸다.\n「오래 기다렸다고. 이 돈이면 내 조건을 듣고 결정하기에 충분하지?」"
  },
  {
    "id": "lc_땀방울처럼_빛나는_결심",
    "name": "땀방울처럼 빛나는 결심",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "땀방울처럼 빛나는 결심",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "뒤돌아봄",
      "description": "장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 60%의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 12% 감소한다. 지속 시간: 1턴",
      "descriptions": [
        "장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 60%의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 12% 감소한다. 지속 시간: 1턴",
        "장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 70%의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 13% 감소한다. 지속 시간: 1턴",
        "장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 80%의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 14% 감소한다. 지속 시간: 1턴",
        "장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 90%의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 15% 감소한다. 지속 시간: 1턴",
        "장착한 캐릭터는 적 명중 시 만일 해당 목표가 [함락] 상태가 아닐 경우 100%의 기본 확률로 대상을 [함락] 상태에 빠트린다. [함락] 상태의 적은 방어력이 16% 감소한다. 지속 시간: 1턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공조 기계 부품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("공조 기계 부품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 3, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("고대 전동축", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 4, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("공조 기계 부품", 15, 2), createMaterial("공조 톱니바퀴", 15, 3), createMaterial("공조 환류 심장", 12, 4)] }
    ],
    "story": "링의 불빛이 반짝이고 있지만,\n등 사이로 흘러내리는 땀방울만큼 빛나지는 않는다\n\n그는 자신의 두 주먹으로 중요한 사람들을 지키기로 결심했다.\n그에게 다짐을 준 것도 바로 그들이다\n——무대 위든 아래든 그의 등뒤를 지키고 있다"
  },
  {
    "id": "lc_페르마타",
    "name": "페르마타",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "페르마타",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "쉼표",
      "description": "장착한 캐릭터의 격파 특수효과가 16% 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 16% 증가한다. 해당 효과는 지속 피해에도 적용된다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 16% 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 16% 증가한다. 해당 효과는 지속 피해에도 적용된다",
        "장착한 캐릭터의 격파 특수효과가 20% 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 20% 증가한다. 해당 효과는 지속 피해에도 적용된다",
        "장착한 캐릭터의 격파 특수효과가 24% 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 24% 증가한다. 해당 효과는 지속 피해에도 적용된다",
        "장착한 캐릭터의 격파 특수효과가 28% 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 28% 증가한다. 해당 효과는 지속 피해에도 적용된다",
        "장착한 캐릭터의 격파 특수효과가 32% 증가하고, 감전이나 풍화 상태의 적에게 가하는 피해가 32% 증가한다. 해당 효과는 지속 피해에도 적용된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("철위대 배지", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("철위대 배지", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 3, 3), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 4, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("철위대 배지", 15, 2), createMaterial("철위대 표식", 15, 3), createMaterial("철위대 훈장", 12, 4)] }
    ],
    "story": "레코드판이 돌고 돌아, 고함소리가 열기에 젖어든다.\n그녀는 무방비해 보이는 상태로 황홀한 멜로디에 취한다.\n\n도입부에서 기대감을 주고,\n격렬하고 진지한 서사가 이어지고,\n연이은 클라이맥스를 뛰어넘는다….\n\n레코드판이 멈추고 나서야 고함소리가 사라진다.\n*「임무 종료」*"
  },
  {
    "id": "lc_훗날_기약",
    "name": "훗날 기약",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "훗날 기약",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "교섭 같은 교전",
      "description": "장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 48% 만큼의 추가 피해를 준다",
      "descriptions": [
        "장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 48% 만큼의 추가 피해를 준다",
        "장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 60% 만큼의 추가 피해를 준다",
        "장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 72% 만큼의 추가 피해를 준다",
        "장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 84% 만큼의 추가 피해를 준다",
        "장착한 캐릭터가 일반 공격 혹은 전투 스킬 발동 후 임의의 피격된 적 1기에게 자신의 공격력 96% 만큼의 추가 피해를 준다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("고대 부속품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("고대 부속품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 3, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 4, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] }
    ],
    "story": "처음에는 그것이 일종의 프로그램인 줄 알았다. 그러지 않으면 저렇게 지칠 줄 모를 리가 없었을 테니까.\n하지만 프로그램이라면 최적의 해결책을 버리고 그녀가 설치해둔 함정을 피할 리가 없었다.\n\n「아무래도 장기전이 될 것 같네」\n그녀는 하품을 했다.\n\n「얼른 자. 유기 생명체는 잠을 소중히 해야 한다고」\n주위가 어둑어둑해졌다.\n\n그녀는 갑자기 깨어났다. 하지만 데이터 잔여물은 이미 쓸려나가 파괴된 상태였다. 모든 것이 꿈만 같았다.\n——그러나 패배의 쓴맛은 너무나도 현실적이었다"
  },
  {
    "id": "lc_초보자_임무_시작_전",
    "name": "초보자 임무 시작 전",
    "gameId": "hsr",
    "releaseVersion": "1.1",
    "folderName": "초보자 임무 시작 전",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "빠른 눈썰미",
      "description": "장착한 캐릭터의 효과 명중이 20% 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 4pt 회복한다",
      "descriptions": [
        "장착한 캐릭터의 효과 명중이 20% 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 4pt 회복한다",
        "장착한 캐릭터의 효과 명중이 25% 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 5pt 회복한다",
        "장착한 캐릭터의 효과 명중이 30% 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 6pt 회복한다",
        "장착한 캐릭터의 효과 명중이 35% 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 7pt 회복한다",
        "장착한 캐릭터의 효과 명중이 40% 증가한다. 장착한 캐릭터가 방어력이 감소된 적을 공격하면 에너지를 8pt 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("어두운 흑요", 3, 2), createMaterial("허공의 흑요", 9, 3), createMaterial("타락의 흑요", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "*「얼마나 더 있어야 시작할 수 있지?」\n「나한테 그런 걸 묻다니…. 신입한테 무슨 일이 생겼나 봐?」\n「아니」\n「엘리오께서 그녀를 부른 건 다른 이유 때문이지만, 그래도 초보자 임무에서는 살아남아야 할 텐데」\n「그녀는 괜찮아」\n「그렇다면 안심이야. 블레이디도 믿을 수 있는 선배가 된 모양이네」\n「……」*"
  },
  {
    "id": "lc_쇼타임",
    "name": "쇼타임",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "쇼타임",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "스스로 찾는 즐거움",
      "description": "장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 6% 증가한다. 최대 중첩수: 3스택, 지속 시간: 1턴. 장착한 캐릭터의 효과 명중이 80% 이상일 시, 공격력이 20% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 6% 증가한다. 최대 중첩수: 3스택, 지속 시간: 1턴. 장착한 캐릭터의 효과 명중이 80% 이상일 시, 공격력이 20% 증가한다",
        "장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 7% 증가한다. 최대 중첩수: 3스택, 지속 시간: 1턴. 장착한 캐릭터의 효과 명중이 80% 이상일 시, 공격력이 24% 증가한다",
        "장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 8% 증가한다. 최대 중첩수: 3스택, 지속 시간: 1턴. 장착한 캐릭터의 효과 명중이 80% 이상일 시, 공격력이 28% 증가한다",
        "장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 9% 증가한다. 최대 중첩수: 3스택, 지속 시간: 1턴. 장착한 캐릭터의 효과 명중이 80% 이상일 시, 공격력이 32% 증가한다",
        "장착한 캐릭터가 적에게 디버프 상태를 부여한 후 [트릭]을 1스택 획득한다. [트릭] 스택당 장착한 캐릭터가 가하는 피해가 10% 증가한다. 최대 중첩수: 3스택, 지속 시간: 1턴. 장착한 캐릭터의 효과 명중이 80% 이상일 시, 공격력이 36% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "——그의 죽음을 목격한 자는 누구일까?\n——나야, 내 작은 눈으로 봤어!\n——그의 피를 가져간 사람은 누구지?\n——나야, 내 접시를 썼지!\n——그의 무덤을 판 사람은 누구지?\n——나야, 내 끌과 삽으로 무덤을 팠어!\n\n현인(賢人)은 온갖 계책을 쓰고, 왕은 권세욕에 빠지고, 영웅은 독선적이나 우인은 웃음을 멈추지 않네——\n「이제 올해 최고의 쇼 『페나코니의 섬뜩한 밤』을 선사해 주실 스파클 씨를 소개합니다!"
  },
  {
    "id": "lc_끝없는_춤",
    "name": "끝없는 춤",
    "gameId": "hsr",
    "releaseVersion": "2.2",
    "folderName": "끝없는 춤",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "탐색",
      "description": "장착한 캐릭터의 치명타 확률이 8% 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 8% 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 24% 증가한다",
        "장착한 캐릭터의 치명타 확률이 10% 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 30% 증가한다",
        "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 36% 증가한다",
        "장착한 캐릭터의 치명타 확률이 14% 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 42% 증가한다",
        "장착한 캐릭터의 치명타 확률이 16% 증가한다. 장착한 캐릭터가 방어력 감소 혹은 감속 상태의 적에게 가하는 치명타 피해가 48% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("생각의 가루", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("생각의 가루", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 3, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 4, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] }
    ],
    "story": "춤의 스텝에 따라 빛과 그림자가 교차했다. 그녀는 상대방의 손을 잡고 미소를 띠며 냉담한 두 눈을 바라봤다.\n*「아름다운 레인저… 『기억』의 무대에 온 걸 환영해. 이 거리에서 보니까… 더 매력적이네」*\n\n주변이 점점 어두워지고, 빛 한 줄기가 돔에서 쏟아져 내려와 두 사람의 끊임없이 바뀌는 스텝을 따라 춤을 췄다.\n\n*「하지만 원래 우리와 함께 춤을 춰야 할 사람들은 아직 오지 않았어……」*\n\n회전하는 순간, 그녀는 무표정한 얼굴에 가까이 다가가 차가운 손을 꼭 잡고 조용히 물었다——\n*「뭘 했는지 내게 알려줄래?」*\n\n점점 빨라지는 스텝 속에서, 산산조각 난 과거의 파편들이 손끝을 타고 그녀의 머릿속으로 흘러들어왔다.\n점점 멀어지는 과거에서 그녀는 빗소리와 생명이 사라지기 전 울부짖는 소리를 들었고, 눈앞의 춤추는 자가 가느다란 빗줄기 속에서 핏빛 종이 우산을 쥐고 있는 것을 보았다. 그리고 그녀의 시선이 닿는 곳에는——\n\n수많은 익사자의 시체가 홍수 속에서 떠다니고 있었다.\n\n그녀는 당황하며 손을 빼려고 했다가 뒤로 넘어졌다.\n주변이 다시 밝아졌고, 연회의 시끌벅적한 소리가 다시 들려왔다. 상대방은 방금 무슨 일이 있었는지 전혀 모르는 듯 그녀의 허리를 부드럽게 받쳤다.\n*「기억하는 자, 정말 아름다운 춤이야. 한 번 더 출까?」*"
  },
  {
    "id": "lc_휴일의_목욕탕_대모험",
    "name": "휴일의 목욕탕 대모험",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "휴일의 목욕탕 대모험",
    "rarity": 4,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "진정해",
      "description": "장착한 캐릭터가 가하는 피해가 16% 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 100%의 기본 확률로 취약 상태에 빠트리고 받는 피해를 10% 증가시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
      "descriptions": [
        "장착한 캐릭터가 가하는 피해가 16% 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 100%의 기본 확률로 취약 상태에 빠트리고 받는 피해를 10% 증가시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터가 가하는 피해가 20% 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 100%의 기본 확률로 취약 상태에 빠트리고 받는 피해를 11.5% 증가시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터가 가하는 피해가 24% 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 100%의 기본 확률로 취약 상태에 빠트리고 받는 피해를 13% 증가시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터가 가하는 피해가 28% 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 100%의 기본 확률로 취약 상태에 빠트리고 받는 피해를 14.5% 증가시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터가 가하는 피해가 32% 증가한다. 장착한 캐릭터가 공격 후 피격된 목표를 100%의 기본 확률로 취약 상태에 빠트리고 받는 피해를 16% 증가시킨다, 지속 시간: 2턴. 같은 유형의 효과는 중첩되지 않는다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("공포에 짓밟힌 육신", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("공포에 짓밟힌 육신", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 3, 3), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 4, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 12, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("열렬의 영혼", 3, 2), createMaterial("불꽃의 정령", 9, 3), createMaterial("천공을 불태우는 마귀", 12, 4), createMaterial("공포에 짓밟힌 육신", 15, 2), createMaterial("용기에 찢긴 가슴", 15, 3), createMaterial("영광의 세례를 받은 육신", 12, 4)] }
    ],
    "story": "*「히아, 우리 새로 생긴 특색 목욕탕에 가보자!」*\n\n오크마에서 진료를 마친 소녀는 호기심에 가득 찬 채로 아이와 함께 각양각색의 목욕탕에 들어갔다.\n\n*「과일즙 안마, 한번 받아 보실래요?」*\n소녀는 붉은 두 손을 보곤, 의욕 넘치는 이카를 껴안은 채 몇걸음 뒤로 물러났다——\n*「과일즙은… 마시는 걸 더 선호해요……」\n\n「드로마스가 등 밟아드립니다! 기간 한정 할인 중이에요!」*\n호기심 많은 드로마스가 고개를 숙이자, 콧바람이 소녀의 머리카락을 스쳤다.\n*「다, 다음에 꼭 해볼게요!」\n\n「몸이 건강해지는 약초탕입니다. 몇 분이세요?」*\n소녀는 향긋한 약초 향을 맡으며 조심스레 탕 안으로 발을 들였다.\n*「몸에 아주 좋을 것 같아요……」\n\n「두, 두두!」*\n이카가 물속에서 신나게 배영을 하기 시작했다.\n*「이카도 많이 지쳤나보네……」*\n\n모처럼의 휴가에 소녀는 포도즙을 마시며 적발의 아이와 잠을 잘 자는 비결부터 디저트를 만드는 방법까지 다양한 이야기를 나눴다.\n\n*「큰일이야… 이, 이카가!」*\n놀란 아이의 외침이 목욕탕의 고요함을 깨뜨렸다.\n\n*「두……」\n「이카, 조금만 버텨!」*"
  },
  {
    "id": "lc_세계의_이름으로",
    "name": "세계의 이름으로",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "세계의 이름으로",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "전승자",
      "description": "장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 24% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 18% 증가하고, 공격력이 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 24% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 18% 증가하고, 공격력이 24% 증가한다",
        "장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 28% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 21% 증가하고, 공격력이 28% 증가한다",
        "장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 32% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 24% 증가하고, 공격력이 32% 증가한다",
        "장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 36% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 27% 증가하고, 공격력이 36% 증가한다",
        "장착한 캐릭터가 디버프 효과에 빠진 적에게 가하는 피해가 40% 증가한다. 장착한 캐릭터가 전투 스킬 발동 시 장착한 캐릭터의 이번 공격은 효과 명중이 30% 증가하고, 공격력이 40% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("철위대 배지", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("철위대 배지", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 4, 3), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 5, 4), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3), createMaterial("철위대 훈장", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3), createMaterial("철위대 훈장", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3), createMaterial("철위대 훈장", 14, 4)] }
    ],
    "story": "*「웰트…」\n「좋은… 이름이지?」\n「그럼…」\n「이제부터 너는 웰트야」\n「율자 코어… 그리고 세계를 수호하는 사명도…」\n「다 너에게 맡길게, 웰트야」*"
  },
  {
    "id": "lc_계속_내리는_비",
    "name": "계속 내리는 비",
    "gameId": "hsr",
    "releaseVersion": "1.1",
    "folderName": "계속 내리는 비",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "현실 속 신기루",
      "description": "장착한 캐릭터의 효과 명중이 24% 증가한다. 장착한 캐릭터가 동시에 디버프 효과 3개 이상인 적에게 피해를 가하면 치명타 확률이 12% 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 100%의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 12% 증가한다. 지속 시간: 1턴",
      "descriptions": [
        "장착한 캐릭터의 효과 명중이 24% 증가한다. 장착한 캐릭터가 동시에 디버프 효과 3개 이상인 적에게 피해를 가하면 치명타 확률이 12% 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 100%의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 12% 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 효과 명중이 28% 증가한다. 장착한 캐릭터가 동시에 디버프 효과 3개 이상인 적에게 피해를 가하면 치명타 확률이 14% 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 100%의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 14% 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 효과 명중이 32% 증가한다. 장착한 캐릭터가 동시에 디버프 효과 3개 이상인 적에게 피해를 가하면 치명타 확률이 16% 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 100%의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 16% 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 효과 명중이 36% 증가한다. 장착한 캐릭터가 동시에 디버프 효과 3개 이상인 적에게 피해를 가하면 치명타 확률이 18% 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 100%의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 18% 증가한다. 지속 시간: 1턴",
        "장착한 캐릭터의 효과 명중이 40% 증가한다. 장착한 캐릭터가 동시에 디버프 효과 3개 이상인 적에게 피해를 가하면 치명타 확률이 20% 증가한다. 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기 발동 후 100%의 기본 확률로 [에테르 코드]를 보유하지 않은 랜덤 피격 목표 1기에 [에테르 코드]를 부여한다. [에테르 코드]를 보유한 목표가 받는 피해가 20% 증가한다. 지속 시간: 1턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부속품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("고대 부속품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 4, 3), createMaterial("고대 부속품", 20, 2), createMaterial("고대 전동축", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("고대 부속품", 20, 2), createMaterial("고대 전동축", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 5, 4), createMaterial("고대 부속품", 20, 2), createMaterial("고대 전동축", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("고대 부속품", 20, 2), createMaterial("고대 전동축", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("고대 부속품", 20, 2), createMaterial("고대 전동축", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "그녀는 처마 밑에서 우산을 쓰고 콧노래를 부르며 골목으로 들어갔다.\n얼마 지나지 않아 비가 그쳤다.\n\n그녀는 머리를 긁고 화면을 닦았고, 머리 위 작은 공간에 빗줄기가 다시 미끄러졌다.\n우산 위로 떨어지는 빗소리를 들으며 게임 사운드에 맞춰진 그녀의 기분이 유독 즐거웠다.\n*「역시 비가 오는 날에는 게임이 최고야」*"
  },
  {
    "id": "lc_필요한_건_기다림뿐",
    "name": "필요한 건 기다림뿐",
    "gameId": "hsr",
    "releaseVersion": "1.2",
    "folderName": "필요한 건 기다림뿐",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "거미줄",
      "description": "장착한 캐릭터가 가하는 피해가 24% 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 4.8% 증가한다. 최대 중첩수: 3스택\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 100%의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 60%만큼 번개 속성 지속 피해를 받는다. 지속 시간: 1턴",
      "descriptions": [
        "장착한 캐릭터가 가하는 피해가 24% 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 4.8% 증가한다. 최대 중첩수: 3스택\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 100%의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 60%만큼 번개 속성 지속 피해를 받는다. 지속 시간: 1턴",
        "장착한 캐릭터가 가하는 피해가 28% 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 5.6% 증가한다. 최대 중첩수: 3스택\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 100%의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 70%만큼 번개 속성 지속 피해를 받는다. 지속 시간: 1턴",
        "장착한 캐릭터가 가하는 피해가 32% 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 6.4% 증가한다. 최대 중첩수: 3스택\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 100%의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 80%만큼 번개 속성 지속 피해를 받는다. 지속 시간: 1턴",
        "장착한 캐릭터가 가하는 피해가 36% 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 7.2% 증가한다. 최대 중첩수: 3스택\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 100%의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 90%만큼 번개 속성 지속 피해를 받는다. 지속 시간: 1턴",
        "장착한 캐릭터가 가하는 피해가 40% 증가한다. 장착한 캐릭터가 공격을 발동할 때마다 속도가 8% 증가한다. 최대 중첩수: 3스택\n장착한 캐릭터가 적 명중 시, 해당 목표가 [흐름] 상태가 아니면 해당 목표는 100%의 기본 확률로 [흐름] 상태에 빠진다. [흐름] 상태는 감전과 동일한 상태로 간주한다. [흐름] 상태에서 적은 턴이 시작될 때마다 장착한 캐릭터 공격력의 100%만큼 번개 속성 지속 피해를 받는다. 지속 시간: 1턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("약탈의 본능", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("약탈의 본능", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 4, 3), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 5, 4), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3), createMaterial("짓밟힌 의지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3), createMaterial("짓밟힌 의지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("약탈의 본능", 20, 2), createMaterial("변조된 야망", 20, 3), createMaterial("짓밟힌 의지", 14, 4)] }
    ],
    "story": "*「혹시 나한테 숨기는 게 더 있는 거야?」*\n\n상대방의 잔뜩 움츠린 목과, 침을 삼키는 소리에 그녀가 물어본다.\n두려움에 떠는 사람에게 그녀는 능력을 사용하지 않아도 된다.\n사실 그녀가 무엇을 말하든 결과는 변함없다.\n입밖으로 나온 그녀의 말로 인해 공포심은 점점 더 부풀어 오르게 되고…….\n상대방은 당황해서 그녀가 듣고 싶어 하는 모든 걸 털어놓게 될 것이다.\n\n그녀에게 필요한 건 기다림뿐이다. 그물을 치고 사냥감을 기다리는 거미처럼"
  },
  {
    "id": "lc_고독의_치유",
    "name": "고독의 치유",
    "gameId": "hsr",
    "releaseVersion": "1.3",
    "folderName": "고독의 치유",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [53, 203, 346, 510, 673, 837, 1001, 1164],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "혼돈 영약",
      "description": "장착한 캐릭터의 격파 특수효과가 20% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 24% 증가한다. 지속 시간: 2턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 4pt 회복한다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 20% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 24% 증가한다. 지속 시간: 2턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 4pt 회복한다",
        "장착한 캐릭터의 격파 특수효과가 25% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 30% 증가한다. 지속 시간: 2턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 4.5pt 회복한다",
        "장착한 캐릭터의 격파 특수효과가 30% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 36% 증가한다. 지속 시간: 2턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 5pt 회복한다",
        "장착한 캐릭터의 격파 특수효과가 35% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 42% 증가한다. 지속 시간: 2턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 5.5pt 회복한다",
        "장착한 캐릭터의 격파 특수효과가 40% 증가한다. 장착한 캐릭터가 필살기 발동 시 장착한 캐릭터가 가하는 지속 피해가 48% 증가한다. 지속 시간: 2턴. 장착한 캐릭터가 부여한 지속 피해 효과에 빠진 적이 처치되면 장착한 캐릭터는 에너지를 6pt 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("어두운 흑요", 4, 2), createMaterial("허공의 흑요", 12, 3), createMaterial("타락의 흑요", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "자연에서 탄생한 신비한 것으로 형태와 실체가 없다.\n만물은 공허하며, 한순간의 꿈에 불과하다.\n죽고자 하면 죽을 것이고, 살고자 하면 살 것이다.\n꺼진 것은 다시 빛을 찾고, 마른 것은 다시 채워질 것이다.\n혼돈의 구원을 불쌍히 여기고, 영약은 허영을 키운다.\n별의 어두운 면을 등진 채, 병 속에 봉인되었다.\n\n「이러한 역설을 우리는 오히려 영광으로 여기는 구나」"
  },
  {
    "id": "lc_시간의_기억에_대한_재구성",
    "name": "시간의 기억에 대한 재구성",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "시간의 기억에 대한 재구성",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "결정",
      "description": "장착한 캐릭터의 효과 명중이 40% 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: 4스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 5% 증가하고, 가하는 지속 피해가 목표의 방어력을 7.2% 무시한다.",
      "descriptions": [
        "장착한 캐릭터의 효과 명중이 40% 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: 4스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 5% 증가하고, 가하는 지속 피해가 목표의 방어력을 7.2% 무시한다.",
        "장착한 캐릭터의 효과 명중이 45% 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: 4스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 6% 증가하고, 가하는 지속 피해가 목표의 방어력을 7.9% 무시한다.",
        "장착한 캐릭터의 효과 명중이 50% 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: 4스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 7% 증가하고, 가하는 지속 피해가 목표의 방어력을 8.6% 무시한다.",
        "장착한 캐릭터의 효과 명중이 55% 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: 4스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 8% 증가하고, 가하는 지속 피해가 목표의 방어력을 9.3% 무시한다.",
        "장착한 캐릭터의 효과 명중이 60% 증가한다. 장착한 캐릭터가 풍화, 연소, 감전, 열상 상태에 빠진 적에게 피해를 가하면 각각 [예지]를 1스택 획득한다. 최대 중첩수: 4스택. 단일 전투에서 지속 피해 상태 유형마다 [예지] 효과를 1회 중첩할 수 있다. [예지] 1스택당 장착한 캐릭터의 공격력이 9% 증가하고, 가하는 지속 피해가 목표의 방어력을 10% 무시한다."
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "촛불에 불을 붙이고, 카드를 펼친 후 향기에 몸을 맡긴다——\n불완전한 기억들이 일렁이는 빛과 그림자 속에서 얼굴로 변한다.\n불 속에서 솟아 나온 유령이 그리웠던 자신의 과거 이야기를 속삭였다.\n그녀는 시간을 편집하고, 찰나를 응고시켜 가장 소중한 순간을 영원으로 바꿨다.\n\n*「잃은 것은 너무 많고, 남은 것은 너무 적어…. 우리는 시간의 잔인함에 대항하기 위해 기억을 키우지」*"
  },
  {
    "id": "lc_흘러가는_강가를_따라",
    "name": "흘러가는 강가를 따라",
    "gameId": "hsr",
    "releaseVersion": "2.1",
    "folderName": "흘러가는 강가를 따라",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [29, 111, 189, 278, 367, 456, 546, 635],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "뱃사공",
      "description": "장착한 캐릭터의 치명타 피해가 36% 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 24% 증가하고, 필살기로 가하는 피해가 추가로 24% 증가한다.",
      "descriptions": [
        "장착한 캐릭터의 치명타 피해가 36% 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 24% 증가하고, 필살기로 가하는 피해가 추가로 24% 증가한다.",
        "장착한 캐릭터의 치명타 피해가 42% 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 28% 증가하고, 필살기로 가하는 피해가 추가로 28% 증가한다.",
        "장착한 캐릭터의 치명타 피해가 48% 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 32% 증가하고, 필살기로 가하는 피해가 추가로 32% 증가한다.",
        "장착한 캐릭터의 치명타 피해가 54% 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 36% 증가하고, 필살기로 가하는 피해가 추가로 36% 증가한다.",
        "장착한 캐릭터의 치명타 피해가 60% 증가한다. 장착한 캐릭터가 적 명중 시 적을 [포영] 상태에 빠트린다. 지속 시간: 1턴. 장착한 캐릭터가 공격할 때마다 적 1기당 1회만 발동한다. 장착한 캐릭터가 [포영] 상태에 빠진 적에게 가하는 피해가 40% 증가하고, 필살기로 가하는 피해가 추가로 40% 증가한다."
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("꿈 저장 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("꿈 저장 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] }
    ],
    "story": "「유」와 「무」 사이에 흐르고 있는 얼음같이 차가운 조수는 영원히 양쪽 물가에 부딪히며 모든 것을 최종의 귀착점으로 이끌었다.\n\n물에 빠진 자는 살려달라고 소리쳤다. 슬픔, 즐거움, 달콤함, 고통 모두 이곳에 비쳤다…. 그녀는 그것들을 직접 경험할 수는 없으나, 느낄 수는 있었다——\n끝에 다다르기까지 여전히 가야 할 길은 멀고, 들어야 할 소리는 많으며, 바꿀 수 있는 일도 많다.\n\n그녀가 손을 뻗어 물에 빠진 자들을 공허의 유혹에서 구해내자, 환영들이 하나씩 그녀의 뒤에서 부서졌다.\n그녀는 이 끝없는 세상에서 존재하지 않는 종점을 향해 계속해서 나아가고 있다.\n\n——그리고 이곳에선 영원히 비가 내린다"
  },
  {
    "id": "lc_그_무수한_봄날",
    "name": "그 무수한 봄날",
    "gameId": "hsr",
    "releaseVersion": "2.4",
    "folderName": "그 무수한 봄날",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "흔적 없는 세상만사",
      "description": "장착한 캐릭터의 효과 명중이 60% 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 60%의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 10% 증가한다, 지속 시간: 2턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 60%의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 14% 증가한다, 지속 시간: 2턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다",
      "descriptions": [
        "장착한 캐릭터의 효과 명중이 60% 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 60%의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 10% 증가한다, 지속 시간: 2턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 60%의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 14% 증가한다, 지속 시간: 2턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다",
        "장착한 캐릭터의 효과 명중이 70% 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 60%의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 12% 증가한다, 지속 시간: 2턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 60%의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 16% 증가한다, 지속 시간: 2턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다",
        "장착한 캐릭터의 효과 명중이 80% 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 60%의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 14% 증가한다, 지속 시간: 2턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 60%의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 18% 증가한다, 지속 시간: 2턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다",
        "장착한 캐릭터의 효과 명중이 90% 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 60%의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 16% 증가한다, 지속 시간: 2턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 60%의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 20% 증가한다, 지속 시간: 2턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다",
        "장착한 캐릭터의 효과 명중이 100% 증가하고, 장착한 캐릭터가 일반 공격, 전투 스킬, 필살기를 발동해 적을 공격하면 60%의 기본 확률로 해당 목표를 [무장해제] 상태에 빠트린다. [무장해제] 상태의 적은 받는 피해가 18% 증가한다, 지속 시간: 2턴. 목표가 장착한 캐릭터가 부여한 지속 피해 상태일 시 60%의 기본 확률로 장착한 캐릭터가 부여한 [무장해제] 상태가 [궁지 몰이] 상태로 업그레이드되며, 적이 받는 피해가 추가로 22% 증가한다, 지속 시간: 2턴, 지속 시간 동안 장착한 캐릭터는 해당 목표에게 [무장해제]를 부여할 수 없다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("영생의 새싹", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("영생의 새싹", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] }
    ],
    "story": "몇 차례 소나기가 지나자 봄의 조수가 차오르고 푸른 새싹이 자라났다.\n*「이게 몇 번째 봄이지?」*\n그는 처음 전장에 뛰어들었던 젊은 전사들을 떠올렸다. 해마다 다른 사람들이었지만, 희망과 활기로 가득 찬 모습은 전부 같았다.\n버드나무 가지를 꺾으며 돌아오기를 기다렸지만, 그들이 고향으로 가지고 온 것은… 영원히 녹지 않을 얼음서리였다.\n\n지저귀는 새소리에 그는 두 눈을 감았고, 나뭇잎 사이로 비치는 햇빛이 얼굴을 덮었다.\n*——「역시 남겨진 사람이 가장 외롭구나」*"
  },
  {
    "id": "lc_먼_길_끝의_귀로",
    "name": "먼 길 끝의 귀로",
    "gameId": "hsr",
    "releaseVersion": "2.7",
    "folderName": "먼 길 끝의 귀로",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [30, 116, 197, 290, 383, 476, 569, 662]
    ),
    "skill": {
      "name": "신생",
      "description": "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 적의 약점이 격파될 시 100%의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 18% 증가시킨다, 지속 시간: 2턴. 해당 효과는 2스택 중첩 가능하다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 적의 약점이 격파될 시 100%의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 18% 증가시킨다, 지속 시간: 2턴. 해당 효과는 2스택 중첩 가능하다",
        "장착한 캐릭터의 격파 특수효과가 70% 증가한다. 적의 약점이 격파될 시 100%의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 21% 증가시킨다, 지속 시간: 2턴. 해당 효과는 2스택 중첩 가능하다",
        "장착한 캐릭터의 격파 특수효과가 80% 증가한다. 적의 약점이 격파될 시 100%의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 24% 증가시킨다, 지속 시간: 2턴. 해당 효과는 2스택 중첩 가능하다",
        "장착한 캐릭터의 격파 특수효과가 90% 증가한다. 적의 약점이 격파될 시 100%의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 27% 증가시킨다, 지속 시간: 2턴. 해당 효과는 2스택 중첩 가능하다",
        "장착한 캐릭터의 격파 특수효과가 100% 증가한다. 적의 약점이 격파될 시 100%의 기본 확률로 대상을 [타오름] 상태에 빠트리고 받는 격파 피해를 30% 증가시킨다, 지속 시간: 2턴. 해당 효과는 2스택 중첩 가능하다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("영생의 새싹", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("영생의 새싹", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("영생의 새싹", 20, 2), createMaterial("영생의 꽃", 20, 3), createMaterial("영생의 가지", 14, 4)] }
    ],
    "story": "*「이 사람은… 누구지?」* 소녀는 낯선 자신을 어루만졌다.\n\n그녀는 그날의 불길이 자신을 집어삼켜 보석과 부채를 잿더미로 만든 과정을 떠올렸다.\n\n소녀는 한때 긴 길을 걸으며 전방의 빛을 찾아 나아갔다.\n밖에서 들려오는 소리가 그녀를 불렀고, 깊은 어둠을 헤쳐 나갈 수 있도록 그녀를 이끌었다.\n마음속의 소리는 아직 이루지 못한 맹세와 약속, 그리고 꿈이 그녀를 기다리고 있다고 상기시켰다——\n\n그것들은 불길 속에서 사라지지 않고 오히려 더욱 빛을 발했다.\n\n*「이건 바로 나야……」*\n소녀는 종착점에 서서 더 이상 뒤돌아보지 않았다—\n*「본래의 나이자 새로운 나」*"
  },
  {
    "id": "lc_바람에_흩날리는_거짓말",
    "name": "바람에 흩날리는 거짓말",
    "gameId": "hsr",
    "releaseVersion": "3.0",
    "folderName": "바람에 흩날리는 거짓말",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "기만",
      "description": "장착한 캐릭터의 속도가 18% 증가한다. 장착한 캐릭터가 공격을 발동하면 120%의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 16% 감소한다, 지속 시간: 2턴. 장착한 캐릭터의 속도가 170 이상일 경우 120%의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 8% 감소한다, 지속 시간: 2턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다",
      "descriptions": [
        "장착한 캐릭터의 속도가 18% 증가한다. 장착한 캐릭터가 공격을 발동하면 120%의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 16% 감소한다, 지속 시간: 2턴. 장착한 캐릭터의 속도가 170 이상일 경우 120%의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 8% 감소한다, 지속 시간: 2턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다",
        "장착한 캐릭터의 속도가 21% 증가한다. 장착한 캐릭터가 공격을 발동하면 120%의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 18% 감소한다, 지속 시간: 2턴. 장착한 캐릭터의 속도가 170 이상일 경우 120%의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 9% 감소한다, 지속 시간: 2턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다",
        "장착한 캐릭터의 속도가 24% 증가한다. 장착한 캐릭터가 공격을 발동하면 120%의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 20% 감소한다, 지속 시간: 2턴. 장착한 캐릭터의 속도가 170 이상일 경우 120%의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 10% 감소한다, 지속 시간: 2턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다",
        "장착한 캐릭터의 속도가 27% 증가한다. 장착한 캐릭터가 공격을 발동하면 120%의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 22% 감소한다, 지속 시간: 2턴. 장착한 캐릭터의 속도가 170 이상일 경우 120%의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 11% 감소한다, 지속 시간: 2턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다",
        "장착한 캐릭터의 속도가 30% 증가한다. 장착한 캐릭터가 공격을 발동하면 120%의 기본 확률로 각 단일 적을 [망연] 상태에 빠트리며, [망연] 상태의 적은 방어력이 24% 감소한다, 지속 시간: 2턴. 장착한 캐릭터의 속도가 170 이상일 경우 120%의 기본 확률로 각 단일 적을 [도난] 상태에 빠트리며, [도난] 상태의 적은 방어력이 12% 감소한다, 지속 시간: 2턴. [망연] 또는 [도난]이 중복 부여될 경우, 가장 최근에 부여된 것만 적용된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("있는 듯 없는 듯한 조짐", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("있는 듯 없는 듯한 조짐", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3), createMaterial("끝없는 탄식", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3), createMaterial("끝없는 탄식", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("있는 듯 없는 듯한 조짐", 20, 2), createMaterial("점점 가까워지는 비명", 20, 3), createMaterial("끝없는 탄식", 14, 4)] }
    ],
    "story": "고양이 귀 소녀가 지붕에서 몸을 쭉 펴고 야경 속으로 들어갔다.\n천 년 동안 침묵했던 보물 창고에서 소녀는 가볍게 움직이며, 보물을 품에 안고 소리 없이 도망쳤다.\n*「어리석은 운명 따위 날 쫓아올 수 없지!」*\n\n황야의 냄새가 섞인 폐허에 불어오는 바람은 소녀의 후드를 움직였다.\n소녀는 차가운 돌 위에 누워 거친 식량을 삼키며 손끝에 있는 금화를 갖고 놀았다.\n\n먼 곳에서 나는 작은 소리가 그녀의 귀에 들려왔다. 여명의 빛이 비추는 거룩한 도시에서 북적거리는 사람들은 여전히 축제와 따뜻함을 즐기고 있었다.\n*「얼마나 더 필요하지… 1년, 아니면 만 년?」*\n\n그녀는 기지개를 켜고 불안한 생각을 무시했다.\n*「후후, 사이퍼라는 늘 마지막까지 웃을 테니까!」*\n\n금색 번개가 하늘을 갈랐고, 소녀의 선언이 여전히 바람 속에 흩날렸다.\n——천 년 전과 다름없이 말이다"
  },
  {
    "id": "lc_바다는_왜_노래하는가",
    "name": "바다는 왜 노래하는가",
    "gameId": "hsr",
    "releaseVersion": "3.5",
    "folderName": "바다는 왜 노래하는가",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [29, 111, 189, 278, 367, 456, 546, 635],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "독주",
      "description": "장착한 캐릭터의 효과 명중이 40% 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 80%의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: 3턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 5% 증가한다, 해당 효과 최대 중첩수: 6스택, 아군의 공격을 받을 시 공격자의 속도가 10% 증가한다, 지속 시간: 3턴",
      "descriptions": [
        "장착한 캐릭터의 효과 명중이 40% 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 80%의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: 3턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 5% 증가한다, 해당 효과 최대 중첩수: 6스택, 아군의 공격을 받을 시 공격자의 속도가 10% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 효과 명중이 45% 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 80%의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: 3턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 6.3% 증가한다, 해당 효과 최대 중첩수: 6스택, 아군의 공격을 받을 시 공격자의 속도가 12.5% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 효과 명중이 50% 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 80%의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: 3턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 7.5% 증가한다, 해당 효과 최대 중첩수: 6스택, 아군의 공격을 받을 시 공격자의 속도가 15% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 효과 명중이 55% 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 80%의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: 3턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 8.7% 증가한다, 해당 효과 최대 중첩수: 6스택, 아군의 공격을 받을 시 공격자의 속도가 17.5% 증가한다, 지속 시간: 3턴",
        "장착한 캐릭터의 효과 명중이 60% 증가하고, 장착한 캐릭터가 부여한 디버프 효과에 빠진 적이 있을 시 대상을 80%의 기본 확률로 [혼미] 상태에 빠트린다, 지속 시간: 3턴, 같은 유형의 효과는 중첩되지 않는다. [혼미] 상태일 때 장착한 캐릭터가 부여한 디버프 효과 1개당 받는 지속 피해가 10% 증가한다, 해당 효과 최대 중첩수: 6스택, 아군의 공격을 받을 시 공격자의 속도가 20% 증가한다, 지속 시간: 3턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("공포에 짓밟힌 육신", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("공포에 짓밟힌 육신", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3), createMaterial("영광의 세례를 받은 육신", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3), createMaterial("영광의 세례를 받은 육신", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3), createMaterial("영광의 세례를 받은 육신", 14, 4)] }
    ],
    "story": "파도가 몰아치고, 그 울림이 하늘 끝까지 울려 퍼진다.\n물고기는 텅 빈 바다를 유영하고, 과거의 거품은 출렁거린다. 한 곡의 선율이 여전히 메아리치는 듯하다.\n\n*「존귀한 공주님, 저희와 함께 연회를 즐기시죠!」*\n\n심해의 부름에 응답하기 위해, 그녀는 성대한 무대 위에 혼자 남을 때까지 검은 물결과 함께 춤췄다.\n\n*「바다의 검객이여, 어째서 침묵하고, 무엇을 위해 노래하시나요?」*\n\n그녀는 대지를 딛는 매 순간 고통을 견뎠다. 그녀는 좀처럼 노래하지 않고, 오직 그 핏빛의 검날로 생명의 비명을 연주할 뿐이었다.\n\n*「글래디오럼 경, 나와 함께 별바다를 정복하자!」*\n\n그 뜨거운 불빛을 발견했을 때 그녀는 그것이 연회의 시작이라 믿었고, 마침내 연주의 활을 들었다.\n\n……\n\n*「헬렉트라... 헬렉트라… 노래가 끝난 지금, 어디로 향해야 할까?」*\n\n헛된 희망이 부서질 때마다 그녀는 늘 고독한 선율로 사람들의 질문에 답했지만, 그 소리는 듣는 이를 매혹시킬 뿐이었다——\n\n어쩌면… 인간 세상이든 깊은 바다든, 진정으로 들을 수 있는 자는 연주자 자신뿐일지도 모른다"
  },
  {
    "id": "lc_그녀의_불꽃을_잊지_말라",
    "name": "그녀의 불꽃을 잊지 말라",
    "gameId": "hsr",
    "releaseVersion": "3.8",
    "folderName": "그녀의 불꽃을 잊지 말라",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [53, 203, 346, 510, 673, 837, 1001, 1164],
      [24, 92, 157, 232, 306, 380, 455, 529],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "분신",
      "description": "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 32% 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다.",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 32% 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다.",
        "장착한 캐릭터의 격파 특수효과가 75% 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 42% 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다.",
        "장착한 캐릭터의 격파 특수효과가 90% 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 52% 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다.",
        "장착한 캐릭터의 격파 특수효과가 105% 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 62% 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다.",
        "장착한 캐릭터의 격파 특수효과가 120% 증가한다. 전투 진입 시 장착한 캐릭터와 전투를 시작한 다른 동료가 가하는 격파 피해가 72% 증가한다. 전투를 시작한 동료가 없을 경우, 장착한 캐릭터와 격파 특수효과가 가장 높은 동료에게 효과가 적용된다. 같은 유형의 효과는 중첩되지 않는다. 장착한 캐릭터가 적에게 약점 부여 시 전투 스킬 포인트를 1pt 회복하고, 해당 효과는 최대 1회 발동할 수 있으며, 필살기 발동 시 발동 가능 횟수가 초기화된다."
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("생각의 가루", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("생각의 가루", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 4, 3), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 5, 4), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3), createMaterial("욕망의 거울 조각", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3), createMaterial("욕망의 거울 조각", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("열렬의 영혼", 4, 2), createMaterial("불꽃의 정령", 12, 3), createMaterial("천공을 불태우는 마귀", 15, 4), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3), createMaterial("욕망의 거울 조각", 14, 4)] }
    ],
    "story": "*「자, 내 곁으로 와…」*\n한 줄기 생생한 기억이 화염에 이끌려 그녀의 몸과 마음을 감싼다.\n\n과거는 무덤 속으로 빠져들었다. 과연 그것이 진실일까?\n*「쉿, 흐느끼지 말고, 거부하지도 마……」*\n그녀는 자신을 타인의 마음에 새겼다. 낯선 눈빛이 점차 익숙해졌다.\n*「기억났니?」*\n\n오래된 기억의 잔재가 모두 흩어지고, 얼굴에 매혹적인 꽃향기가 스친다——\n*「내가, 바로 너의 기억이야」*"
  },
  {
    "id": "lc_연옥을_불사른_새로운_몸",
    "name": "연옥을 불사른 새로운 몸",
    "gameId": "hsr",
    "releaseVersion": "4.3",
    "folderName": "연옥을 불사른 새로운 몸",
    "rarity": 5,
    "path": "공허",
    "baseStats": createDetailedBaseStats(
      [62, 240, 409, 602, 796, 989, 1182, 1376],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "단련",
      "description": "장착한 캐릭터의 HP 최대치가 30% 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 20pt 회복하며, 해당 효과는 웨이브마다 1회 발동 가능하다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 2턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 30% 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 30% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 HP 최대치가 30% 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 20pt 회복하며, 해당 효과는 웨이브마다 1회 발동 가능하다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 2턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 30% 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 30% 증가한다",
        "장착한 캐릭터의 HP 최대치가 38% 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 20pt 회복하며, 해당 효과는 웨이브마다 1회 발동 가능하다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 2턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 38% 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 38% 증가한다",
        "장착한 캐릭터의 HP 최대치가 45% 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 20pt 회복하며, 해당 효과는 웨이브마다 1회 발동 가능하다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 2턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 45% 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 45% 증가한다",
        "장착한 캐릭터의 HP 최대치가 53% 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 20pt 회복하며, 해당 효과는 웨이브마다 1회 발동 가능하다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 2턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 53% 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 53% 증가한다",
        "장착한 캐릭터의 HP 최대치가 60% 증가하고, 장착한 캐릭터의 턴 시작 시 에너지를 고정으로 20pt 회복하며, 해당 효과는 웨이브마다 1회 발동 가능하다. 장착한 캐릭터가 전투 스킬을 발동하여 공격 후, 목표를 2턴 동안 [연옥] 상태에 빠트린다. [연옥] 상태의 목표는 받는 치명타 피해가 60% 증가하고, 장착한 캐릭터에게 받는 치명타 피해가 추가로 60% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("천진난만 크레파스", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파구사의 눈물", 4, 2), createMaterial("천진난만 크레파스", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파구사의 눈물", 4, 2), createMaterial("파구사의 술", 4, 3), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파구사의 눈물", 4, 2), createMaterial("파구사의 술", 12, 3), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파구사의 눈물", 4, 2), createMaterial("파구사의 술", 12, 3), createMaterial("파구사의 심장", 5, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파구사의 눈물", 4, 2), createMaterial("파구사의 술", 12, 3), createMaterial("파구사의 심장", 15, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파구사의 눈물", 4, 2), createMaterial("파구사의 술", 12, 3), createMaterial("파구사의 심장", 15, 4), createMaterial("천진난만 크레파스", 20, 2), createMaterial("꿈을 만드는 딥 펜", 20, 3), createMaterial("꿈을 그리는 붓", 14, 4)] }
    ],
    "story": "추후 추가"
  }
];
