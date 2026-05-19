import { HsrLightCone } from '../../types';
import { createDetailedBaseStats, createMaterial } from '../dataFactory';

export const preservationLightcones: HsrLightCone[] = [
  {
    "id": "lc_앰버",
    "name": "앰버",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "앰버",
    "rarity": 3,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [12, 46, 79, 116, 153, 190, 227, 265],
      [15, 58, 98, 145, 191, 238, 284, 331]
    ),
    "skill": {
      "name": "정체",
      "description": "장착한 캐릭터의 방어력이 16%/20%/24%/28%/32% 증가한다. 장착한 캐릭터의 현재 HP 백분율이 50% 미만일 경우 방어력이 추가로 16%/20%/24%/28%/32% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 방어력이 16% 증가한다. 장착한 캐릭터의 현재 HP 백분율이 50% 미만일 경우 방어력이 추가로 16% 증가한다",
        "장착한 캐릭터의 방어력이 20% 증가한다. 장착한 캐릭터의 현재 HP 백분율이 50% 미만일 경우 방어력이 추가로 20% 증가한다",
        "장착한 캐릭터의 방어력이 24% 증가한다. 장착한 캐릭터의 현재 HP 백분율이 50% 미만일 경우 방어력이 추가로 24% 증가한다",
        "장착한 캐릭터의 방어력이 28% 증가한다. 장착한 캐릭터의 현재 HP 백분율이 50% 미만일 경우 방어력이 추가로 28% 증가한다",
        "장착한 캐릭터의 방어력이 32% 증가한다. 장착한 캐릭터의 현재 HP 백분율이 50% 미만일 경우 방어력이 추가로 32% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("소멸된 코어", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("소멸된 코어", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 2, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 3, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「시간에 속박되지 않은 것만이 세월의 흐름에서 영원하리」*"
  },
  {
    "id": "lc_수비",
    "name": "수비",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "수비",
    "rarity": 3,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [12, 46, 79, 116, 153, 190, 227, 265],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "부흥",
      "description": "장착한 캐릭터가 필살기 발동 시 자신의 HP 최대치 18%/21%/24%/27%/30%만큼의 HP를 회복한다",
      "descriptions": [
        "장착한 캐릭터가 필살기 발동 시 자신의 HP 최대치 18%만큼의 HP를 회복한다",
        "장착한 캐릭터가 필살기 발동 시 자신의 HP 최대치 21%만큼의 HP를 회복한다",
        "장착한 캐릭터가 필살기 발동 시 자신의 HP 최대치 24%만큼의 HP를 회복한다",
        "장착한 캐릭터가 필살기 발동 시 자신의 HP 최대치 27%만큼의 HP를 회복한다",
        "장착한 캐릭터가 필살기 발동 시 자신의 HP 최대치 30%만큼의 HP를 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("약탈의 본능", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("약탈의 본능", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 2, 3), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 3, 4), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3), createMaterial("짓밟힌 의지", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 9, 4), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3), createMaterial("짓밟힌 의지", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 9, 4), createMaterial("약탈의 본능", 12, 2), createMaterial("변조된 야망", 10, 3), createMaterial("짓밟힌 의지", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「성벽 뒤의 강인한 시민들이 방어도 승리의 수단임을 증명했다」*"
  },
  {
    "id": "lc_강토_개척",
    "name": "강토 개척",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "강토 개척",
    "rarity": 3,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [12, 46, 79, 116, 153, 190, 227, 265],
      [12, 46, 79, 116, 153, 190, 227, 265]
    ),
    "skill": {
      "name": "컴퍼니",
      "description": "장착한 캐릭터는 적의 약점을 격파할 시 자신의 HP 최대치 12%/14%/16%/18%/20%만큼의 HP를 회복한다",
      "descriptions": [
        "장착한 캐릭터는 적의 약점을 격파할 시 자신의 HP 최대치 12%만큼의 HP를 회복한다",
        "장착한 캐릭터는 적의 약점을 격파할 시 자신의 HP 최대치 14%만큼의 HP를 회복한다",
        "장착한 캐릭터는 적의 약점을 격파할 시 자신의 HP 최대치 16%만큼의 HP를 회복한다",
        "장착한 캐릭터는 적의 약점을 격파할 시 자신의 HP 최대치 18%만큼의 HP를 회복한다",
        "장착한 캐릭터는 적의 약점을 격파할 시 자신의 HP 최대치 20%만큼의 HP를 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 3000, 3), createMaterial("소멸된 코어", 4, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 9000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("소멸된 코어", 12, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 21000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 2, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 4, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 51000, 3), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 111000, 4), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 3, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 3, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 231000, 5), createMaterial("청동의 집념", 2, 2), createMaterial("한철의 맹세", 6, 3), createMaterial("앰버의 수호", 9, 4), createMaterial("소멸된 코어", 12, 2), createMaterial("희미한 빛의 코어", 10, 3), createMaterial("꿈틀대는 코어", 8, 4)] }
    ],
    "story": "세월에서 추출한 희박한 힘. 보잘것없는 찰나의 순간들이 모여 엮어진 장렬한 운명.\n\n*「의지할 곳 없는 나날이 종지부를 찍었습니다, 컴퍼니는 여러분의 손을 잡고 도울 것입니다」*"
  },
  {
    "id": "lc_여생의_첫날",
    "name": "여생의 첫날",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "여생의 첫날",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "지금 이 순간",
      "description": "장착한 캐릭터의 방어력이 16%/18%/20%/22%/24% 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 8%/9%/10%/11%/12% 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다",
      "descriptions": [
        "장착한 캐릭터의 방어력이 16% 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 8% 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다",
        "장착한 캐릭터의 방어력이 18% 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 9% 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다",
        "장착한 캐릭터의 방어력이 20% 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 10% 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다",
        "장착한 캐릭터의 방어력이 22% 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 11% 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다",
        "장착한 캐릭터의 방어력이 24% 증가한다. 전투 진입 후 모든 아군의 모든 속성 저항이 12% 증가한다. 같은 유형의 스킬 효과는 중복 적용되지 않는다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "*「오늘 폼폼이 새 옷으로 갈아입었어~ 좋아 좋아~」*\n*「오늘은 내 생일이야. 난 올해도 귀여워」*\n*「나도 드디어드디어드디어 후배가 생겼다네! 그렇지, 개척자?」*\n\n망설임 없이 셔터를 계속 누른다.\n당시의 즐거움을 담기 위해서야?\n아니면 그때의 자신을 담기 위해서야?"
  },
  {
    "id": "lc_랜도의_선택",
    "name": "랜도의 선택",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "랜도의 선택",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "빠른 세월",
      "description": "장착한 캐릭터가 피격될 확률이 증가하고, 받는 피해가 16%/18%/20%/22%/24% 감소한다",
      "descriptions": [
        "장착한 캐릭터가 피격될 확률이 증가하고, 받는 피해가 16% 감소한다",
        "장착한 캐릭터가 피격될 확률이 증가하고, 받는 피해가 18% 감소한다",
        "장착한 캐릭터가 피격될 확률이 증가하고, 받는 피해가 20% 감소한다",
        "장착한 캐릭터가 피격될 확률이 증가하고, 받는 피해가 22% 감소한다",
        "장착한 캐릭터가 피격될 확률이 증가하고, 받는 피해가 24% 감소한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("소멸된 코어", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("소멸된 코어", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 3, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 4, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("소멸된 코어", 15, 2), createMaterial("희미한 빛의 코어", 15, 3), createMaterial("꿈틀대는 코어", 12, 4)] }
    ],
    "story": "*「안 들려? 내일 못 가! 평민들이랑 놀아봐야 뭐 좋은 걸 배우겠어!」*\n*「하지만 걔네가 말해주는 벨로보그 이야기들은 다 처음 듣는걸……」*\n\n그녀는 아직도 변론하고 싶은 동생을 끌어다 자신 뒤에 숨겼다.\n*「너희들은 랜도의 일원이야. 특히 서벌 너, 언젠간 너도 선택해야 해」*\n\n그녀는 동생이 아무 잘못도 없다는 걸 알고 있지만 어떻게 반박해야 할지 몰랐다.\n온종일 울분을 터뜨린 후, 그녀는 속으로 결심했다.\n*「언젠가 자라면 나도 할 수 있을 거야……」*\n*「나 자신의 선택을」*"
  },
  {
    "id": "lc_우주_시장_동향",
    "name": "우주 시장 동향",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "우주 시장 동향",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [18, 69, 118, 174, 230, 285, 341, 397]
    ),
    "skill": {
      "name": "새로운 개편",
      "description": "장착한 캐릭터의 방어력이 16%/20%/24%/28%/32% 증가한다. 장착한 캐릭터가 피격된 후 100%/105%/110%/115%/120%의 기본 확률로 적을 연소 상태에 빠뜨린다. 턴마다 장착한 캐릭터 방어력의 40%/50%/60%/70%/80%만큼의 지속 피해를 준다. 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 방어력이 16% 증가한다. 장착한 캐릭터가 피격된 후 100%의 기본 확률로 적을 연소 상태에 빠뜨린다. 턴마다 장착한 캐릭터 방어력의 40%만큼의 지속 피해를 준다. 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 20% 증가한다. 장착한 캐릭터가 피격된 후 105%의 기본 확률로 적을 연소 상태에 빠뜨린다. 턴마다 장착한 캐릭터 방어력의 50%만큼의 지속 피해를 준다. 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 24% 증가한다. 장착한 캐릭터가 피격된 후 110%의 기본 확률로 적을 연소 상태에 빠뜨린다. 턴마다 장착한 캐릭터 방어력의 60%만큼의 지속 피해를 준다. 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 28% 증가한다. 장착한 캐릭터가 피격된 후 115%의 기본 확률로 적을 연소 상태에 빠뜨린다. 턴마다 장착한 캐릭터 방어력의 70%만큼의 지속 피해를 준다. 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 32% 증가한다. 장착한 캐릭터가 피격된 후 120%의 기본 확률로 적을 연소 상태에 빠뜨린다. 턴마다 장착한 캐릭터 방어력의 80%만큼의 지속 피해를 준다. 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("영생의 새싹", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("영생의 새싹", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 3, 3), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 4, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("영생의 새싹", 15, 2), createMaterial("영생의 꽃", 15, 3), createMaterial("영생의 가지", 12, 4)] }
    ],
    "story": "행성의 가치는 다시 계산되고 있다……\n\n*「채권 회수가 상호 이익이 된다는 점을 이 프로젝트로 설명할 수 있나요?」*\n*「우리가 전해야 할 메시지는 단 하나, 바로 우리의 존재를 알리는 겁니다」*\n\n*「이 행성에 가치가 있다면 컴퍼니를 위해 가치를 창출해 줘야죠」*"
  },
  {
    "id": "lc_우리는_와일드_파이어",
    "name": "우리는 와일드 파이어",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "우리는 와일드 파이어",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [34, 129, 220, 324, 428, 533, 637, 741],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "눈물을 글썽이는 사람",
      "description": "전투 시작 시 모든 아군이 받는 피해가 8%/10%/12%/14%/16% 감소한다. 지속 시간: 5턴. 동시에 즉시 모든 아군이 각자 손실한 HP의 30%/35%/40%/45%/50%만큼의 HP를 회복한다",
      "descriptions": [
        "전투 시작 시 모든 아군이 받는 피해가 8% 감소한다. 지속 시간: 5턴. 동시에 즉시 모든 아군이 각자 손실한 HP의 30%만큼의 HP를 회복한다",
        "전투 시작 시 모든 아군이 받는 피해가 10% 감소한다. 지속 시간: 5턴. 동시에 즉시 모든 아군이 각자 손실한 HP의 35%만큼의 HP를 회복한다",
        "전투 시작 시 모든 아군이 받는 피해가 12% 감소한다. 지속 시간: 5턴. 동시에 즉시 모든 아군이 각자 손실한 HP의 40%만큼의 HP를 회복한다",
        "전투 시작 시 모든 아군이 받는 피해가 14% 감소한다. 지속 시간: 5턴. 동시에 즉시 모든 아군이 각자 손실한 HP의 45%만큼의 HP를 회복한다",
        "전투 시작 시 모든 아군이 받는 피해가 16% 감소한다. 지속 시간: 5턴. 동시에 즉시 모든 아군이 각자 손실한 HP의 50%만큼의 HP를 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("고대 부속품", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("고대 부속품", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 3, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 4, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("고대 부속품", 15, 2), createMaterial("고대 전동축", 15, 3), createMaterial("고대 엔진", 12, 4)] }
    ],
    "story": "그녀는 사람들이 집을 잃는 것에 익숙하다.\n사람들이 생명을 잃는 것에도 익숙하다.\n하지만 혼자일 때는 울어도 소용이 없다.\n\n*「이 빨간 스카프를 매고, 서로의 고통을 분담한다」*\n*「우리는 한 가족… 우리는 와일드 파이어다」*\n\n넓은 손바닥이 그녀의 머리를 쓰다듬을 때, 그녀는 끝내 눈물을 참을 수 없었다"
  },
  {
    "id": "lc_이게_바로_나야",
    "name": "이게 바로 나야!",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "이게 바로 나야!",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [38, 148, 252, 371, 490, 609, 728, 847],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "지평",
      "description": "장착한 캐릭터의 방어력이 16%/20%/24%/28%/32% 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하며, 증가 수치는 자신 방어력의 60%/75%/90%/105%/120%만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다",
      "descriptions": [
        "장착한 캐릭터의 방어력이 16% 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하며, 증가 수치는 자신 방어력의 60%만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다",
        "장착한 캐릭터의 방어력이 20% 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하며, 증가 수치는 자신 방어력의 75%만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다",
        "장착한 캐릭터의 방어력이 24% 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하며, 증가 수치는 자신 방어력의 90%만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다",
        "장착한 캐릭터의 방어력이 28% 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하며, 증가 수치는 자신 방어력의 105%만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다",
        "장착한 캐릭터의 방어력이 32% 증가한다. 장착한 캐릭터는 필살기 발동 시 가하는 피해량이 증가하며, 증가 수치는 자신 방어력의 120%만큼이다. 해당 효과는 필살기를 발동할 때마다 적 1기당 1회만 적용된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("약탈의 본능", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("약탈의 본능", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 3, 3), createMaterial("약탈의 본능", 15, 2), createMaterial("변조된 야망", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("약탈의 본능", 15, 2), createMaterial("변조된 야망", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 4, 4), createMaterial("약탈의 본능", 15, 2), createMaterial("변조된 야망", 15, 3), createMaterial("짓밟힌 의지", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("약탈의 본능", 15, 2), createMaterial("변조된 야망", 15, 3), createMaterial("짓밟힌 의지", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("약탈의 본능", 15, 2), createMaterial("변조된 야망", 15, 3), createMaterial("짓밟힌 의지", 12, 4)] }
    ],
    "story": "소녀는 뭘 입어도 잘 어울리지만, 소녀는 만족스럽지 않은 모양이다. 등 뒤에 열 벌도 넘는 옷이 쌓여있다.\n\n*「오늘이 마지막이려나?」*\n\n그녀는 조용히 생각했다. 올려다보니 거울 속의 소녀는 오늘 특별히 기뻐 보인다.\n\n*「됐어! 이게 바로 나야!」*"
  },
  {
    "id": "lc_운명의_실을_엮다",
    "name": "운명의 실을 엮다",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "운명의 실을 엮다",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "간파",
      "description": "장착한 캐릭터의 효과 저항이 12%/14%/16%/18%/20% 증가한다. 장착한 캐릭터가 방어력을 100pt 보유할 때마다 가하는 피해가 0.8%/0.9%/1%/1.1%/1.2% 증가하며, 해당 효과는 최대 32%/36%/40%/44%/48% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 효과 저항이 12% 증가한다. 장착한 캐릭터가 방어력을 100pt 보유할 때마다 가하는 피해가 0.8% 증가하며, 해당 효과는 최대 32% 증가한다",
        "장착한 캐릭터의 효과 저항이 14% 증가한다. 장착한 캐릭터가 방어력을 100pt 보유할 때마다 가하는 피해가 0.9% 증가하며, 해당 효과는 최대 36% 증가한다",
        "장착한 캐릭터의 효과 저항이 16% 증가한다. 장착한 캐릭터가 방어력을 100pt 보유할 때마다 가하는 피해가 1% 증가하며, 해당 효과는 최대 40% 증가한다",
        "장착한 캐릭터의 효과 저항이 18% 증가한다. 장착한 캐릭터가 방어력을 100pt 보유할 때마다 가하는 피해가 1.1% 증가하며, 해당 효과는 최대 44% 증가한다",
        "장착한 캐릭터의 효과 저항이 20% 증가한다. 장착한 캐릭터가 방어력을 100pt 보유할 때마다 가하는 피해가 1.2% 증가하며, 해당 효과는 최대 48% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("생각의 가루", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("생각의 가루", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 3, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 4, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("청동의 집념", 3, 2), createMaterial("한철의 맹세", 9, 3), createMaterial("앰버의 수호", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] }
    ],
    "story": "운명은 항상 이유 없이 사람들을 이끌고, 그녀는 어둠 속에 숨어 가장 중요한 순간을 새긴다.\n\n정렬, 조합, 셔플, 드로우…. 그녀는 운명의 손으로 사람들의 가능성을 조종하고, 혼란스러운 표상 아래에서 진실의 궤적을 찾는다.\n\n드디어, 모든 인물이 제자리를 찾았다. 그녀의 손이 응고한 카드 표면을 스치며, 심원한 진실을 맞춰나갔다.\n*「한 장이 부족하네…. 그렇다면, 내가 메꾸도록 하지」*"
  },
  {
    "id": "lc_두_사람의_콘서트",
    "name": "두 사람의 콘서트",
    "gameId": "hsr",
    "releaseVersion": "2.1",
    "folderName": "두 사람의 콘서트",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [43, 166, 283, 417, 551, 685, 819, 953],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "격려",
      "description": "장착한 캐릭터의 방어력이 16%/20%/24%/28%/32% 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 4%/5%/6%/7%/8% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 방어력이 16% 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 4% 증가한다",
        "장착한 캐릭터의 방어력이 20% 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 5% 증가한다",
        "장착한 캐릭터의 방어력이 24% 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 6% 증가한다",
        "장착한 캐릭터의 방어력이 28% 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 7% 증가한다",
        "장착한 캐릭터의 방어력이 32% 증가한다. 필드 위에 실드를 보유한 캐릭터가 1명 있을 때마다 장착한 캐릭터가 가하는 피해가 8% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("생각의 가루", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("흩어진 별모래", 3, 2), createMaterial("생각의 가루", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 3, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("신성한 앰버", 4, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("신성한 앰버", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("신성한 앰버", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] }
    ],
    "story": "*「오빠, 이건……」*\n*「요새 즐겁게 노래한 적이 없잖아. 널 위해 무대를 만들었어. 좀… 초라하지만」*\n*「하지만 선생님은 나와 안 맞는다고 하셨는걸……」*\n*「그렇지 않아, 난 네 노래가 좋거든! 언젠간 너의 꿈을 이루고, 더 큰 무대에서 노래하게 될 거야……」*\n……\n\n수년이 흘러 반짝이는 무대 위에 선 그녀는 무대 아래 수많은 팬들을 내려다보던 중 잠시 다른 생각에 잠겼다——\n꿈을 좇는 기나긴 길에서 그녀는 그 믿음의 눈빛과 자신의 첫 번째 「콘서트」를 잊은 적이 없다.\n화려한 조명도 메이크업도 없이, 단지 한 아이가 꿈을 좇는 다른 아이를 위해 만들어 준 무대만이 있을 뿐이었다.\n\n*「이제 우리의 꿈이 모두 이루어졌어. 하지만… 그걸 여전히 『우리』의 꿈이라고 할 수 있을까…?」*\n그녀는 마이크를 꽉 쥐었다. 다음 노래를 시작하기 전, 그녀는 슬픔을 느낄 겨를조차 없었다"
  },
  {
    "id": "lc_언제나_여정이_평탄하기를",
    "name": "언제나 여정이 평탄하기를",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "언제나 여정이 평탄하기를",
    "rarity": 4,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [17, 65, 110, 162, 214, 266, 318, 370],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "달콤한 꿈",
      "description": "장착한 캐릭터가 제공하는 실드량이 12%/15%/18%/21%/24% 증가한다. 아군이 실드를 보유할 시 가하는 피해가 12%/14%/16%/18%/20% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 제공하는 실드량이 12% 증가한다. 아군이 실드를 보유할 시 가하는 피해가 12% 증가한다",
        "장착한 캐릭터가 제공하는 실드량이 15% 증가한다. 아군이 실드를 보유할 시 가하는 피해가 14% 증가한다",
        "장착한 캐릭터가 제공하는 실드량이 18% 증가한다. 아군이 실드를 보유할 시 가하는 피해가 16% 증가한다",
        "장착한 캐릭터가 제공하는 실드량이 21% 증가한다. 아군이 실드를 보유할 시 가하는 피해가 18% 증가한다",
        "장착한 캐릭터가 제공하는 실드량이 24% 증가한다. 아군이 실드를 보유할 시 가하는 피해가 20% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 4000, 3), createMaterial("생각의 가루", 5, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 12000, 3), createMaterial("흩어진 별모래", 3, 2), createMaterial("생각의 가루", 15, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 28000, 3), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 3, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 6, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 68000, 3), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 148000, 4), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("신성한 앰버", 4, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 5, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("신성한 앰버", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 308000, 5), createMaterial("흩어진 별모래", 3, 2), createMaterial("유성 결정", 9, 3), createMaterial("신성한 앰버", 12, 4), createMaterial("생각의 가루", 15, 2), createMaterial("인상의 파편", 15, 3), createMaterial("욕망의 거울 조각", 12, 4)] }
    ],
    "story": "소년은 별처럼 쏟아지는 빗속을 달리며, 오랜 가뭄 끝에 내린 단비에 환호했다.\n\n그 비는 아주 오랫동안 내렸고, 수레는 초록빛으로 뒤덮인 땅에 멈춰 섰다.\n*「엄마, 누나, 이제 더 이상 굶거나 추위에 떨지 않아도 돼!」*\n에브긴인들의 모닥불은 긴 밤을 따뜻하게 밝혔고, 소년은 누나의 이야기를 들으며 아침을 기다렸다.\n\n*「카카바샤, 너도 지모신께서 주신 행운으로 우리가 할 수 없는 일을 해낼 거야…. 언제나 여정이 평탄하며, 영원히 계략을 들키는 일이 없기를……」*\n\n황금빛 햇살이 꿈에서 새어나와 현실 속 거처를 비추자, 거래와 숫자가 또다시 시야에 들어왔다.\n그는 움켜쥐었던 손을 풀었다——\n\n마치 아무것도 잡지 못한 것처럼, 마치 아직 온기가 남아 있는 것처럼"
  },
  {
    "id": "lc_승리의_순간",
    "name": "승리의 순간",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "승리의 순간",
    "rarity": 5,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [22, 83, 141, 208, 275, 342, 409, 476],
      [27, 104, 177, 261, 344, 428, 512, 595]
    ),
    "skill": {
      "name": "결단",
      "description": "장착한 캐릭터의 방어력이 24%/28%/32%/36%/40% 증가하고, 효과 명중이 24%/28%/32%/36%/40% 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 24%/28%/32%/36%/40% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 방어력이 24% 증가하고, 효과 명중이 24% 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 24% 증가한다",
        "장착한 캐릭터의 방어력이 28% 증가하고, 효과 명중이 28% 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 28% 증가한다",
        "장착한 캐릭터의 방어력이 32% 증가하고, 효과 명중이 32% 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 32% 증가한다",
        "장착한 캐릭터의 방어력이 36% 증가하고, 효과 명중이 36% 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 36% 증가한다",
        "장착한 캐릭터의 방어력이 40% 증가하고, 효과 명중이 40% 증가하며, 자신이 피격될 확률이 증가한다. 장착한 캐릭터는 피격 후 자신의 턴이 끝날 때까지 방어력이 추가로 40% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("철위대 배지", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("철위대 배지", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 4, 3), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 5, 4), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3), createMaterial("철위대 훈장", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 15, 4), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3), createMaterial("철위대 훈장", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 15, 4), createMaterial("철위대 배지", 20, 2), createMaterial("철위대 표식", 20, 3), createMaterial("철위대 훈장", 14, 4)] }
    ],
    "story": "*「져서 울고 싶으면 울어도 돼, 게파드」*\n*「하지만 울고 있어도 일어나야만 해. 날 이길 수 있을 때까지… 5년이 걸리든, 10년이 걸리든 말이야」*\n몇 년이 지나자 남자아이는 울지 않게 되었고, 누나에게도 더 이상 지지 않았다.\n\n이제 그 어떤 것도 두려워하지 않게 된 실버메인 철위대의 방위관은 전장에서 언제나 마지막까지 굳건히 버틴다.\n——적을 철저히 무너뜨릴 수 있는 순간을 노리기 위해서"
  },
  {
    "id": "lc_그녀는_두_눈을_감았네",
    "name": "그녀는 두 눈을 감았네",
    "gameId": "hsr",
    "releaseVersion": "1.3",
    "folderName": "그녀는 두 눈을 감았네",
    "rarity": 5,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [58, 222, 377, 556, 734, 913, 1092, 1270],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "펼쳐진 세계",
      "description": "장착한 캐릭터의 HP 최대치가 24%/28%/32%/36%/40% 증가하고, 에너지 회복효율이 12%/14%/16%/18%/20% 증가한다. 장착한 캐릭터의 HP가 감소하면 모든 아군이 가하는 피해가 9.0%/10.5%/12.0%/13.5%/15.0% 증가한다. 지속 시간: 2턴. 웨이브가 시작될 때마다 모든 아군의 HP를 각자 손실한 HP의 80%/85%/90%/95%/100%만큼 회복한다",
      "descriptions": [
        "장착한 캐릭터의 HP 최대치가 24% 증가하고, 에너지 회복효율이 12% 증가한다. 장착한 캐릭터의 HP가 감소하면 모든 아군이 가하는 피해가 9.0% 증가한다. 지속 시간: 2턴. 웨이브가 시작될 때마다 모든 아군의 HP를 각자 손실한 HP의 80%만큼 회복한다",
        "장착한 캐릭터의 HP 최대치가 28% 증가하고, 에너지 회복효율이 14% 증가한다. 장착한 캐릭터의 HP가 감소하면 모든 아군이 가하는 피해가 10.5% 증가한다. 지속 시간: 2턴. 웨이브가 시작될 때마다 모든 아군의 HP를 각자 손실한 HP의 85%만큼 회복한다",
        "장착한 캐릭터의 HP 최대치가 32% 증가하고, 에너지 회복효율이 16% 증가한다. 장착한 캐릭터의 HP가 감소하면 모든 아군이 가하는 피해가 12.0% 증가한다. 지속 시간: 2턴. 웨이브가 시작될 때마다 모든 아군의 HP를 각자 손실한 HP의 90%만큼 회복한다",
        "장착한 캐릭터의 HP 최대치가 36% 증가하고, 에너지 회복효율이 18% 증가한다. 장착한 캐릭터의 HP가 감소하면 모든 아군이 가하는 피해가 13.5% 증가한다. 지속 시간: 2턴. 웨이브가 시작될 때마다 모든 아군의 HP를 각자 손실한 HP의 95%만큼 회복한다",
        "장착한 캐릭터의 HP 최대치가 40% 증가하고, 에너지 회복효율이 20% 증가한다. 장착한 캐릭터의 HP가 감소하면 모든 아군이 가하는 피해가 15.0% 증가한다. 지속 시간: 2턴. 웨이브가 시작될 때마다 모든 아군의 HP를 각자 손실한 HP의 100%만큼 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("공조 기계 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("공조 기계 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 4, 3), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 5, 4), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3), createMaterial("공조 환류 심장", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 15, 4), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3), createMaterial("공조 환류 심장", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 15, 4), createMaterial("공조 기계 부품", 20, 2), createMaterial("공조 톱니바퀴", 20, 3), createMaterial("공조 환류 심장", 14, 4)] }
    ],
    "story": "이마의 고통은 여생을 함께하겠지만 그것은 과거 고통의 만 분의 일도 안 된다.\n그녀는 과거의 인연이 세상을 떠나기 전까지 자신이 모든 미래를 알고 있다고 자부했다.\n지금의 그녀는 만상이 대체되고 시대가 변하는 것을 「지켜본다」….\n하지만 그녀는 두 눈을 감았다.\n미래는 「제3의 눈」에서 결정되었기에——"
  },
  {
    "id": "lc_언제나_불공평한_운명",
    "name": "언제나 불공평한 운명",
    "gameId": "hsr",
    "releaseVersion": "2.1",
    "folderName": "언제나 불공평한 운명",
    "rarity": 5,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [30, 116, 197, 290, 383, 476, 569, 662]
    ),
    "skill": {
      "name": "올인",
      "description": "장착한 캐릭터의 방어력이 40%/46%/52%/58%/64% 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 40%/46%/52%/58%/64% 증가한다, 지속 시간: 2턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, 100%/115%/130%/145%/160%의 기본 확률로 피격된 적이 받는 피해가 10%/11.5%/13%/14.5%/16% 증가한다, 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 방어력이 40% 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 40% 증가한다, 지속 시간: 2턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, 100%의 기본 확률로 피격된 적이 받는 피해가 10% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 46% 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 46% 증가한다, 지속 시간: 2턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, 115%의 기본 확률로 피격된 적이 받는 피해가 11.5% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 52% 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 52% 증가한다, 지속 시간: 2턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, 130%의 기본 확률로 피격된 적이 받는 피해가 13% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 58% 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 58% 증가한다, 지속 시간: 2턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, 145%의 기본 확률로 피격된 적이 받는 피해가 14.5% 증가한다, 지속 시간: 2턴",
        "장착한 캐릭터의 방어력이 64% 증가한다. 장착한 캐릭터가 아군에게 실드 제공 시, 장착한 캐릭터의 치명타 피해가 64% 증가한다, 지속 시간: 2턴. 장착한 캐릭터가 추가 공격을 발동해 적을 명중하면, 160%의 기본 확률로 피격된 적이 받는 피해가 16% 증가한다, 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("생각의 가루", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("흩어진 별모래", 4, 2), createMaterial("생각의 가루", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 4, 3), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("신성한 앰버", 5, 4), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3), createMaterial("욕망의 거울 조각", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("신성한 앰버", 15, 4), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3), createMaterial("욕망의 거울 조각", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("신성한 앰버", 15, 4), createMaterial("생각의 가루", 20, 2), createMaterial("인상의 파편", 20, 3), createMaterial("욕망의 거울 조각", 14, 4)] }
    ],
    "story": "마지막 카드가 공개되자 낙담, 분노, 체념, 침착 등 수많은 감정이 상대의 얼굴들에 드러났다.\n*「여기까지 왔는데 좀 더 자극적인 게 좋지 않겠나?」*\n그는 모든 칩을 내걸었고, 자신이 운이 없다고 생각한 사람들은 악담을 퍼부으며 게임을 포기하고는 그의 패배를 간절하게 바랐다.\n\n승패, 명성, 운… 그는 그런 것들을 전혀 신경 쓰지 않았다. 그저 가슴이 떨리게 만드는 그 순간에 취해있었다——\n심연과 천당 사이엔 선택이라는 거리만이 존재한다.\n\n칩을 걸고, 또다시 탄식이 울려 퍼진다. 마치 환상과도 같은 이 만족감은 한바탕의 소란 끝에 순식간에 지나갔다.\n*「모 아니면 도, 하지만 내게 선택의 자유 따윈 없지……」*"
  },
  {
    "id": "lc_끝없는_산과_강을_거치더라도",
    "name": "끝없는 산과 강을 거치더라도",
    "gameId": "hsr",
    "releaseVersion": "3.6",
    "folderName": "끝없는 산과 강을 거치더라도",
    "rarity": 5,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [26, 102, 173, 255, 337, 418, 500, 582],
      [21, 81, 138, 203, 268, 333, 398, 463]
    ),
    "skill": {
      "name": "새로운 비늘",
      "description": "장착한 캐릭터의 공격력이 64%/80%/96%/112%/128% 증가한다. 장착한 캐릭터가 필살기 발동 시 모든 아군에게 장착한 캐릭터 공격력의 10%/12.5%/15%/17.5%/20%만큼 HP를 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 10%/12.5%/15%/17.5%/20%만큼 회복하며 모든 아군이 [방위]를 획득한다. [방위] 지속 시간: 3턴. [방위]를 획득한 목표는 가하는 피해가 24%/30%/36%/42%/48% 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 12%/15%/18%/21%/24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 공격력이 64% 증가한다. 장착한 캐릭터가 필살기 발동 시 모든 아군에게 장착한 캐릭터 공격력의 10%만큼 HP를 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 10%만큼 회복하며 모든 아군이 [방위]를 획득한다. [방위] 지속 시간: 3턴. [방위]를 획득한 목표는 가하는 피해가 24% 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 12% 증가한다",
        "장착한 캐릭터의 공격력이 80% 증가한다. 장착한 캐릭터가 필살기 발동 시 모든 아군에게 장착한 캐릭터 공격력의 12.5%만큼 HP를 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 12.5%만큼 회복하며 모든 아군이 [방위]를 획득한다. [방위] 지속 시간: 3턴. [방위]를 획득한 목표는 가하는 피해가 30% 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 15% 증가한다",
        "장착한 캐릭터의 공격력이 96% 증가한다. 장착한 캐릭터가 필살기 발동 시 모든 아군에게 장착한 캐릭터 공격력의 15%만큼 HP를 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 15%만큼 회복하며 모든 아군이 [방위]를 획득한다. [방위] 지속 시간: 3턴. [방위]를 획득한 목표는 가하는 피해가 36% 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 18% 증가한다",
        "장착한 캐릭터의 공격력이 112% 증가한다. 장착한 캐릭터가 필살기 발동 시 모든 아군에게 장착한 캐릭터 공격력의 17.5%만큼 HP를 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 17.5%만큼 회복하며 모든 아군이 [방위]를 획득한다. [방위] 지속 시간: 3턴. [방위]를 획득한 목표는 가하는 피해가 42% 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 21% 증가한다",
        "장착한 캐릭터의 공격력이 128% 증가한다. 장착한 캐릭터가 필살기 발동 시 모든 아군에게 장착한 캐릭터 공격력의 20%만큼 HP를 회복하고, 추가로 현재 HP가 가장 낮은 아군 캐릭터의 HP를 장착한 캐릭터 공격력의 20%만큼 회복하며 모든 아군이 [방위]를 획득한다. [방위] 지속 시간: 3턴. [방위]를 획득한 목표는 가하는 피해가 48% 증가하며, 목표가 소환물을 보유한 경우 가하는 피해가 추가로 24% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("공포에 짓밟힌 육신", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("흩어진 별모래", 4, 2), createMaterial("공포에 짓밟힌 육신", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 4, 3), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("신성한 앰버", 5, 4), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3), createMaterial("영광의 세례를 받은 육신", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("신성한 앰버", 15, 4), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3), createMaterial("영광의 세례를 받은 육신", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("흩어진 별모래", 4, 2), createMaterial("유성 결정", 12, 3), createMaterial("신성한 앰버", 15, 4), createMaterial("공포에 짓밟힌 육신", 20, 2), createMaterial("용기에 찢긴 가슴", 20, 3), createMaterial("영광의 세례를 받은 육신", 14, 4)] }
    ],
    "story": "끝없이 펼쳐진 태고의 땅에서, 소년은 홀로 찾아 나서는 여정에 올랐다.\n그는 떠돌던 그 시절로 돌아간 듯했다. 파도를 헤치고 비바람을 견디며, 거대한 괴수와 싸우고 거친 물결에 맞서 몸부림쳤다.\n\n하지만 잠시 숨을 고르던 그 순간, 그는 결코 외롭지 않았다.\n설령 끝없는 산과 강을 거쳐야 하더라도, 그는 여전히 저 너머의 빛을 볼 수 있었다——\n\n그것은 수많은 생령들의 기대였다.\n부서진 대지가 더 이상 새 생명을 품을 수 없게 되자, 그들은 위로와 보호를 구하고자 그의 곁에 모여들었다.\n\n그것은 또한 동료들이 그의 마음 깊은 곳에 남긴 말들이었다. 그 말들은 마치 끝없이 이어지는 항로처럼, 그들을 굳건히 이어주었다.\n\n그를 괴롭히던 과거 역시 바람과 함께 떠올랐지만, 걸어온 길은 결국 새로운 모습으로 탈바꿈하는 힘이 되어줄 것이다.\n\n*「난 개척의 길을 지키고」*\n소년은 창을 들고 날아올라 빛을 향해 전진했다——\n\n*「사라져가는 모든 희망을 수호하리라!」*"
  },
  {
    "id": "lc_기억의_소재",
    "name": "기억의 소재",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "기억의 소재",
    "rarity": 5,
    "path": "보존",
    "baseStats": createDetailedBaseStats(
      [48, 185, 314, 463, 612, 761, 910, 1058],
      [19, 74, 126, 185, 245, 304, 364, 423],
      [24, 92, 157, 232, 306, 380, 455, 529]
    ),
    "skill": {
      "name": "간직",
      "description": "장착한 캐릭터의 효과 저항이 8%/10%/12%/14%/16% 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치의 16%/20%/24%/28%/32%만큼의 실드를 획득한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 12%/15%/18%/21%/24% 감소한다",
      "descriptions": [
        "장착한 캐릭터의 효과 저항이 8% 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치의 16%만큼의 실드를 획득한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 12% 감소한다",
        "장착한 캐릭터의 효과 저항이 10% 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치의 20%만큼의 실드를 획득한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 15% 감소한다",
        "장착한 캐릭터의 효과 저항이 12% 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치의 24%만큼의 실드를 획득한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 18% 감소한다",
        "장착한 캐릭터의 효과 저항이 14% 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치의 28%만큼의 실드를 획득한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 21% 감소한다",
        "장착한 캐릭터의 효과 저항이 16% 증가한다. 장착한 캐릭터는 피격 후 자신이 실드를 보유하지 않았다면 장착한 캐릭터 HP 최대치의 32%만큼의 실드를 획득한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다. 장착한 캐릭터가 실드를 보유하면 자신이 받는 피해가 24% 감소한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("소멸된 코어", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("소멸된 코어", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 4, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 5, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("청동의 집념", 4, 2), createMaterial("한철의 맹세", 12, 3), createMaterial("앰버의 수호", 15, 4), createMaterial("소멸된 코어", 20, 2), createMaterial("희미한 빛의 코어", 20, 3), createMaterial("꿈틀대는 코어", 14, 4)] }
    ],
    "story": "우주는 쓰레기가 가득 쌓인 황무지 같다.\n가끔 귀한 물건이 있어도 주워가는 사람이 없다.\n그는 지나간 날의 틈새를 넘겨보며, 기억의 씨앗을 골라낸다.\n——새로운 생명이 움트기 위해선, 그 씨앗이 죽어야만 한다.\n분홍색, 파란색, 하얀색의 가져온 보석이,\n그의 묘포에서 반짝인다,\n그래도 우주는 여전히 적막하다"
  }
];
