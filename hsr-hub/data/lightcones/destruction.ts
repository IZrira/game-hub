import { HsrLightCone } from '../../types';
import { createDetailedBaseStats, createMaterial } from '../dataFactory';

export const destructionLightcones: HsrLightCone[] = [
  {
    "id": "lc_태양보다_밝게_빛나는_것",
    "name": "태양보다 밝게 빛나는 것",
    "gameId": "hsr",
    "releaseVersion": "1.3",
    "folderName": "태양보다 밝게 빛나는 것",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "결사 저항",
      "description": "장착한 캐릭터의 치명타 확률이 18% 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: 2턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 18% 증가하고, 에너지 회복효율이 6% 증가한다. [용의 포효] 최대 중첩수: 2스택",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 18% 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: 2턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 18% 증가하고, 에너지 회복효율이 6% 증가한다. [용의 포효] 최대 중첩수: 2스택",
        "장착한 캐릭터의 치명타 확률이 21% 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: 2턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 21% 증가하고, 에너지 회복효율이 7% 증가한다. [용의 포효] 최대 중첩수: 2스택",
        "장착한 캐릭터의 치명타 확률이 24% 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: 2턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 24% 증가하고, 에너지 회복효율이 8% 증가한다. [용의 포효] 최대 중첩수: 2스택",
        "장착한 캐릭터의 치명타 확률이 27% 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: 2턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 27% 증가하고, 에너지 회복효율이 9% 증가한다. [용의 포효] 최대 중첩수: 2스택",
        "장착한 캐릭터의 치명타 확률이 30% 증가한다. 장착한 캐릭터가 일반 공격을 발동하면 [용의 포효]를 1스택 획득한다. 지속 시간: 2턴. [용의 포효] 스택마다 장착한 캐릭터의 공격력이 30% 증가하고, 에너지 회복효율이 10% 증가한다. [용의 포효] 최대 중첩수: 2스택"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "태어났을 때, 그는 한 줌의 빛도 들지 않는 지하 감옥에 갇혀있었다.\n그와 무관한 죄가 그를 이곳에 묶어두고, 그와 무관한 기억이 그를 삼켰다.\n그는 발악하며 최대한 숨을 들이켜려고 했고,\n넓고 넓은 바닷속에서 한 줄기의 빛을 잡으려 했다.\n\n장군이 이 어두운 감옥에 들어선 그날,\n그는 태양보다 빛나는 소년의 눈빛을 보았다"
  },
  {
    "id": "lc_닿을_수_없는_저편",
    "name": "닿을 수 없는 저편",
    "gameId": "hsr",
    "releaseVersion": "1.2",
    "folderName": "닿을 수 없는 저편",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "불능",
      "description": "장착한 캐릭터의 치명타 확률이 18% 증가하고, HP 최대치가 18% 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 24% 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 18% 증가하고, HP 최대치가 18% 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 24% 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다",
        "장착한 캐릭터의 치명타 확률이 21% 증가하고, HP 최대치가 21% 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 28% 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다",
        "장착한 캐릭터의 치명타 확률이 24% 증가하고, HP 최대치가 24% 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 32% 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다",
        "장착한 캐릭터의 치명타 확률이 27% 증가하고, HP 최대치가 27% 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 36% 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다",
        "장착한 캐릭터의 치명타 확률이 30% 증가하고, HP 최대치가 30% 증가한다. 장착한 캐릭터가 피격되거나 자신의 HP를 소모한 후 가하는 피해가 40% 증가한다. 해당 효과는 장착한 캐릭터가 공격을 발동한 후 해제된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "그는 매년 이곳에 새로운 검들을 가지고 온다.\n검의 주인들, 그는 그들의 마지막 모습을 보았다.\n그는 떠날 때마다 아쉬움에 잠긴다…….\n\n자신의 검은 언제쯤 누가 이곳으로 가져와줄까…."
  },
  {
    "id": "lc_어떤_에이언즈의_몰락",
    "name": "어떤 에이언즈의 몰락",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "어떤 에이언즈의 몰락",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "자충수",
      "description": "장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 8% 증가한다. 해당 효과 최대 중첩수: 4스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 12% 증가한다. 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 8% 증가한다. 해당 효과 최대 중첩수: 4스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 12% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 10% 증가한다. 해당 효과 최대 중첩수: 4스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 15% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 12% 증가한다. 해당 효과 최대 중첩수: 4스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 18% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 14% 증가한다. 해당 효과 최대 중첩수: 4스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 21% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터가 공격 발동 시 장착한 캐릭터의 이번 전투에서 공격력이 16% 증가한다. 해당 효과 최대 중첩수: 4스택. 장착한 캐릭터는 적의 약점을 격파한 후 가하는 피해가 24% 증가한다. 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "한 줄기의 빛에서 시작되어,\n그들은 추락하고, 멸망의 위협이 고조되고 있다.\n그들은 어쩔 수 없이 자가 복제를 멈추고, 앞을 다투어 서로 껴안아,\n번식할 권리를 대가로 생존의 가능성을 바꾸고자 했다.\n그들은 손을 맞잡았다, 이렇게 단결해 본 적이 없음에도\n——운명의 길은 끊기고,\n그들은 진정한 죽음을 향해 갔다"
  },
  {
    "id": "lc_대체할_수_없는_것",
    "name": "대체할 수 없는 것",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "대체할 수 없는 것",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "가족",
      "description": "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 8%만큼의 HP를 회복하고, 가하는 피해가 24% 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다",
      "descriptions": [
        "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 8%만큼의 HP를 회복하고, 가하는 피해가 24% 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터의 공격력이 28% 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 9%만큼의 HP를 회복하고, 가하는 피해가 28% 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터의 공격력이 32% 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 10%만큼의 HP를 회복하고, 가하는 피해가 32% 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터의 공격력이 36% 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 11%만큼의 HP를 회복하고, 가하는 피해가 36% 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터의 공격력이 40% 증가한다. 장착한 캐릭터는 적을 처치하거나 피격된 후 즉시 공격력 12%만큼의 HP를 회복하고, 가하는 피해가 40% 증가하며, 자신의 다음 턴이 끝날 때까지 지속된다. 해당 효과는 중첩될 수 없으며 턴마다 1회만 발동할 수 있다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "「스바로그, 만약 어느 날 나도 없어진다면, 데이터베이스를 부탁할게」\n(누구지… 왜 내 기록에 이런 녹음이 있지…)\n「스바로그, 네게 대체할 수 없는 게 있을까?」\n(대체 불가한… 고장 난 부속품은… 교체하면 된다…)\n「스바로그, 너도 언젠가는 찾게 될 거야」\n(그런 건… 귀찮을 뿐…)\n\n「그때가 되면… 여길 떠나」"
  },
  {
    "id": "lc_이_몸이_검이니",
    "name": "이 몸이 검이니",
    "gameId": "hsr",
    "releaseVersion": "1.4",
    "folderName": "이 몸이 검이니",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "옥을 쥐고",
      "description": "장착한 캐릭터의 치명타 피해가 20% 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: 3스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 14% 증가한다. 3스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 12% 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다",
      "descriptions": [
        "장착한 캐릭터의 치명타 피해가 20% 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: 3스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 14% 증가한다. 3스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 12% 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다",
        "장착한 캐릭터의 치명타 피해가 23% 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: 3스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 16.5% 증가한다. 3스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 14% 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다",
        "장착한 캐릭터의 치명타 피해가 26% 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: 3스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 19% 증가한다. 3스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 16% 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다",
        "장착한 캐릭터의 치명타 피해가 29% 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: 3스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 21.5% 증가한다. 3스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 18% 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다",
        "장착한 캐릭터의 치명타 피해가 32% 증가한다. 동료가 공격을 받거나 HP를 소모하면 장착한 캐릭터는 [월식]을 1스택 획득한다. 최대 중첩수: 3스택. [월식] 스택당 장착한 캐릭터의 다음번 공격이 가하는 피해가 24% 증가한다. 3스택까지 중첩 시, 이번 공격은 추가로 목표의 방어력을 20% 무시한다. 해당 효과는 장착한 캐릭터가 공격을 발동하면 해제된다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "검신이 파열되어 뼛속까지 스미는 추위 속으로 떨어진다.\n평범한 도검과 무기는 무용지물이다. 그것들의 한계는 명확하다.\n「내게 이제 검이 무슨 소용인가?」\n그녀는 미련을 두지 않았고, 눈앞의 어느 것도 눈에 들어오지 않았다.\n\n「지금부터, 이 몸이 검이다」\n극한이라는 것을 뛰어넘으려면, 전인미답의 경지에 오르려면\n——자신마저 「장작」으로 여기는 수밖에 없다"
  },
  {
    "id": "lc_꿈은_어디로_돌아가야_하는가",
    "name": "꿈은 어디로 돌아가야 하는가",
    "gameId": "hsr",
    "releaseVersion": "2.3",
    "folderName": "꿈은 어디로 돌아가야 하는가",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "탈바꿈",
      "description": "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: 2턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 24% 증가하고 속도가 20% 감소하며, 같은 유형의 효과는 중첩되지 않는다",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 60% 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: 2턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 24% 증가하고 속도가 20% 감소하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 격파 특수효과가 70% 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: 2턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 28% 증가하고 속도가 20% 감소하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 격파 특수효과가 80% 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: 2턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 32% 증가하고 속도가 20% 감소하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 격파 특수효과가 90% 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: 2턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 36% 증가하고 속도가 20% 감소하며, 같은 유형의 효과는 중첩되지 않는다",
        "장착한 캐릭터의 격파 특수효과가 100% 증가한다. 장착한 캐릭터가 적에게 격파 피해를 가할 시 적을 [궤멸] 상태에 빠트린다, 지속 시간: 2턴. [궤멸] 상태에서 목표가 장착한 캐릭터로부터 받는 격파 피해가 40% 증가하고 속도가 20% 감소하며, 같은 유형의 효과는 중첩되지 않는다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "아스다나 은하계의 변경. 거대한 파도가 넘실거리는 기억의 바다에서 그녀는 작은 불씨처럼 금방이라도 광풍 속에서 꺼질 듯했다.\n「꿈을 꾸지 못하는 사람이 공감각 꿈세계에 들어가려면 『죽음』에 버금가는 대가를 치러야 해」\n동료의 걱정스러운 목소리가 여전히 그녀의 귓가에 맴돌았지만, 그녀는 숨을 깊게 들이쉬고 기억의 영역으로 뛰어들었다.\n조용히 기억의 영역 깊은 곳으로 들어가니, 작은 반딧불들이 틈새 사이로 흩어져 이내 끝없는 어둠에 삼켜졌다.\n\n「무엇을 위해 죽음을 향해 뛰어드는 걸까?」\n깊어져 가는 기억의 바다에서 기억의 영역 생물이 내는 희미한 빛은 마치 먼 곳에 있는 눈처럼 냉담하게 그녀를 바라보았다.\n\n그녀에게 있어 꿈이란 건 여전히 너무나도 아득했다. 그녀는 끝없는 어둠을 바라보았고, 몸과 영혼은 기억 물질의 중압에 의해 무너지기 직전이었다. 의식이 점차 흐릿해지는 것이 느껴졌지만, 머릿속에서는 남은 기억만이 계속해서 되풀이될 뿐이었다.\n하늘을 덮는 곤충 떼가 전선을 뚫었고, 그녀는 화염에 휩싸인 채 곤충 떼를 향해 날아갔다. 곤충 떼의 재는 눈처럼 흩날렸고, 아래에는 기사들의 새까만 잔해가 가득했다.\n그녀는 희생된 철기들에게 일일이 꽃을 바칠 새도 없었다. 그들의 생명은 마치 숫자만 있고 이름은 없는 유전자 코드처럼, 순식간에 피어올랐다가 이내 시들었다.\n\n「무엇을 위해 살아가야 할까?」\n죽음과도 같은 적막 속에서 그녀는 화염이 바다에 녹아들어 남은 미약한 불씨처럼 빛나는 곳을 향해 계속해서 나아갔다….\n얼마나 지났을까, 그녀가 눈을 뜨자 진주처럼 희미하게 빛나는 「미래」가 보였고, 눈물이 그녀의 뺨을 타고 흘러내렸다.\n 「나만의… 『꿈』을 찾기 위해……」"
  },
  {
    "id": "lc_해_질_무렵_시작되는_춤",
    "name": "해 질 무렵 시작되는 춤",
    "gameId": "hsr",
    "releaseVersion": "2.4",
    "folderName": "해 질 무렵 시작되는 춤",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [26, 102, 173, 255, 337, 418, 500, 582], [21, 81, 138, 203, 268, 333, 398, 463]),
    "skill": {
      "name": "심취",
      "description": "장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 36% 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: 2스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 36% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 36% 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: 2스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 36% 증가한다",
        "장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 42% 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: 2스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 42% 증가한다",
        "장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 48% 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: 2스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 48% 증가한다",
        "장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 54% 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: 2스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 54% 증가한다",
        "장착한 캐릭터가 피격될 확률이 대폭 증가하고, 치명타 피해가 60% 증가한다. 장착한 캐릭터가 필살기를 발동하면 [화염의 춤]을 1스택 획득한다, 지속 시간: 2턴, 최대 중첩수: 2스택. [화염의 춤] 스택마다 장착한 캐릭터의 추가 공격으로 가하는 피해가 60% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "찬란한 황혼 속에서 날렵한 그림자 하나가 지붕 위를 빠르게 달렸다.\n\n「리리, 코코, 누가 먼저 결승점에 도착하는지 시합하자!」\n처마에 올라 경비병을 피해 바람을 탄 소녀는 마치 작고 민첩한 동물처럼 태양의 마지막 빛을 쫓았다.\n\n조금은 뜨거운 밤바람이 소녀의 얼굴을 스쳤고, 석양은 고양이를 알록달록하게 물들였다.\n「너희가 이겼어!」\n소녀는 이마에 맺힌 땀을 닦고 고양이들을 품에 안았다.\n별들이 떠오르자, 경계를 푼 소녀의 천진난만한 미소가 하늘을 물들인 노을처럼 피어났다"
  },
  {
    "id": "lc_이와_같이_타오르는_여명",
    "name": "이와 같이 타오르는 여명",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "이와 같이 타오르는 여명",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [31, 120, 204, 301, 398, 495, 591, 687], [18, 69, 118, 174, 230, 285, 341, 396]),
    "skill": {
      "name": "상실",
      "description": "장착한 캐릭터의 기본 속도가 12 증가하고, 피해를 가할 시 목표의 방어력을 18% 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 60% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 기본 속도가 12 증가하고, 피해를 가할 시 목표의 방어력을 18% 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 60% 증가한다",
        "장착한 캐릭터의 기본 속도가 12 증가하고, 피해를 가할 시 목표의 방어력을 22.5% 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 78% 증가한다",
        "장착한 캐릭터의 기본 속도가 12 증가하고, 피해를 가할 시 목표의 방어력을 27% 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 96% 증가한다",
        "장착한 캐릭터의 기본 속도가 12 증가하고, 피해를 가할 시 목표의 방어력을 31.5% 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 114% 증가한다",
        "장착한 캐릭터의 기본 속도가 12 증가하고, 피해를 가할 시 목표의 방어력을 36% 무시한다. 장착한 캐릭터가 필살기를 발동하면 [뜨거운 태양]을 획득하며, 턴 시작 시 해제된다. [뜨거운 태양] 보유 시 장착한 캐릭터가 가하는 피해가 132% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "또다시 여정의 끝에 선 남자의 모습이 뜨거운 황금빛 태양에 삼켜진다.\n\n「황금색 피, 구세의 희망이… 사실은……」\n\n남자의 눈물은 떨어지기도 전에 증발했다.\n「내일 봐, 파이!」\n「끝까지 살아남으라고, 구세주!」\n「가서 앰포리어스의 여명이 되어줘……」\n\n……\n사람들의 염원은 텅 빈 메아리가 되었고, 이름 없는 영웅은 산산이 부서지며 그 격렬한 죽음을 드러냈다.\n\n「만약 분노의 불길이 이 황당한 운명을 불태울 수 없다면……」\n그는 몇 번이고 산꼭대기를 향해 올라갔고, 끊임없이 떨어져 산산조각이 났다——\n\n「내가 그 운명과 함께 불타주지!」"
  },
  {
    "id": "lc_보답_없는_왕관",
    "name": "보답 없는 왕관",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "보답 없는 왕관",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [26, 102, 173, 255, 337, 418, 500, 582], [24, 92, 157, 232, 306, 380, 455, 529]),
    "skill": {
      "name": "기사왕",
      "description": "장착한 캐릭터의 치명타 피해가 36% 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 40% 증가하며, 장착한 캐릭터의 에너지 최대치가 300pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 10%만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 40% 증가시킨다, 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 치명타 피해가 36% 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 40% 증가하며, 장착한 캐릭터의 에너지 최대치가 300pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 10%만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 40% 증가시킨다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 피해가 45% 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 50% 증가하며, 장착한 캐릭터의 에너지 최대치가 300pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 10%만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 50% 증가시킨다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 피해가 54% 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 60% 증가하며, 장착한 캐릭터의 에너지 최대치가 300pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 10%만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 60% 증가시킨다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 피해가 63% 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 70% 증가하며, 장착한 캐릭터의 에너지 최대치가 300pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 10%만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 70% 증가시킨다, 지속 시간: 2턴",
        "장착한 캐릭터의 치명타 피해가 72% 증가한다. 필살기 발동 시 장착한 캐릭터의 공격력이 80% 증가하며, 장착한 캐릭터의 에너지 최대치가 300pt 이상일 경우 장착한 캐릭터의 에너지를 장착한 캐릭터 에너지 최대치의 10%만큼 고정으로 회복하고, 다시 장착한 캐릭터의 공격력을 80% 증가시킨다, 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "환상 속에서 소녀의 귓가에 그날의 대화가 울려 퍼진다.\n\n「멀린, 이 검을 뽑는 건 하나도 어렵지 않은걸요」\n「그래, 사람들이 기대하는 왕이 되는 건 네게 어려운 일이 아니지. 그야 내가 널 지도해주고 있으니까. 하지만 알트리아… 진정 어려운 건, 언제까지나 사람들의 기대에 부응할 수 없다는 거야」\n「그런 상황이 오면 사람들이 더 적합한 왕을 선택하겠죠. 저는 반대하지 않을 거예요」\n「만약 그런 사람이 애초에 존재하지 않는다면?」\n「…그럼, 모두의 기대에 부응할 수 있도록 노력해야죠」\n\n지금의 소녀는 그것이 얼마나 비극적인 일인지 알고 있다. 지금이 바로 그때 그 순간이라면, 그녀는 과연 포기할 것인가?\n\n왕은 말이 없다. 그녀는 그저 검을 꽉 쥐었다.\n바위가 다시 한번 검이 뽑히는 굉음을 냈다"
  },
  {
    "id": "lc_피의_불꽃이여_앞길을_태워라",
    "name": "피의 불꽃이여, 앞길을 태워라",
    "gameId": "hsr",
    "releaseVersion": "3.1",
    "folderName": "피의 불꽃이여, 앞길을 태워라",
    "rarity": 5,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([62, 240, 408, 602, 796, 989, 1183, 1375], [21, 83, 141, 208, 275, 342, 409, 476], [18, 69, 118, 174, 230, 285, 341, 396]),
    "skill": {
      "name": "조망",
      "description": "장착한 캐릭터의 HP 최대치가 18% 증가하고, 받는 치유량이 20% 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 6%만큼 HP를 소모해 이번 공격으로 가하는 피해를 30% 증가시킨다. 해당 효과로 소모된 HP가 500pt보다 높을 경우 피해가 추가로 30% 증가한다.\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다",
      "descriptions": [
        "장착한 캐릭터의 HP 최대치가 18% 증가하고, 받는 치유량이 20% 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 6%만큼 HP를 소모해 이번 공격으로 가하는 피해를 30% 증가시킨다. 해당 효과로 소모된 HP가 500pt보다 높을 경우 피해가 추가로 30% 증가한다.\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다",
        "장착한 캐릭터의 HP 최대치가 21% 증가하고, 받는 치유량이 25% 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 6.5%만큼 HP를 소모해 이번 공격으로 가하는 피해를 35% 증가시킨다. 해당 효과로 소모된 HP가 500pt보다 높을 경우 피해가 추가로 35% 증가한다.\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다",
        "장착한 캐릭터의 HP 최대치가 24% 증가하고, 받는 치유량이 30% 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 7%만큼 HP를 소모해 이번 공격으로 가하는 피해를 40% 증가시킨다. 해당 효과로 소모된 HP가 500pt보다 높을 경우 피해가 추가로 40% 증가한다.\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다",
        "장착한 캐릭터의 HP 최대치가 27% 증가하고, 받는 치유량이 35% 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 7.5%만큼 HP를 소모해 이번 공격으로 가하는 피해를 45% 증가시킨다. 해당 효과로 소모된 HP가 500pt보다 높을 경우 피해가 추가로 45% 증가한다.\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다",
        "장착한 캐릭터의 HP 최대치가 30% 증가하고, 받는 치유량이 40% 증가한다. 전투 스킬 또는 필살기 발동 시 자신의 HP 최대치의 8%만큼 HP를 소모해 이번 공격으로 가하는 피해를 50% 증가시킨다. 해당 효과로 소모된 HP가 500pt보다 높을 경우 피해가 추가로 50% 증가한다.\n현재 HP가 부족하면 해당 효과는 장착한 캐릭터의 현재 HP를 최대 1pt까지 감소시킨다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "차가운 이슬이 칼끝에 맺히고, 칼을 타고 떨어지면서 핏빛 흔적을 남긴다.\n녹슨향이 나는 황야 속, 격전으로 불타오른 불길이 여전히 잿더미 위에서 춤을 추고 있다.\n\n「마이데이모스 님, 방금 그 전투는 마치 신과도 같았어요!」\n윗옷을 벗은 전사는 무기를 닦으며 흥분한 채 외쳤다.\n\n「마이데이 님, 앞으로 저도 마이데이 님처럼 백전백승할래요!」\n아이는 부러진 검을 쥔 채, 존경심에 찬 눈빛으로 그를 바라보았다.\n\n「왕세자님, 크렘노스로 돌아갈 날이 얼마 남지 않았습니다」\n오랜 세월을 겪은 노인이 웃으며 술잔을 들고 그에게 인사를 올렸다.\n\n그는 고개를 끄덕이고는, 계속 야영지 경계선으로 향했다.\n환생의 고통이 여전히 피부 위를 휘저었다. 내일, 그는 크렘노스 고군을 이끌고 다시 타지로 떠날 것이다.\n언제까지 정처 없이 떠돌아다닐지 알 수 없었으나, 그가 확신할 수 있는 건 피의 불꽃이 전부 타버릴 때까지 왕의 책임을 짊어지리라는 것이다.\n\n밤이 점점 더 깊어지자, 그는 홀로 피의 술을 들이켰고, 지나가는 음유시인이 현을 울리자 불안정한 노랫소리가 허공에 울려 퍼졌다——\n「고향은 꿈의 땅이지, 닿을 수 있는 곳이 아니야」"
  },
  {
    "id": "lc_과거의_핏자국",
    "name": "과거의 핏자국",
    "gameId": "hsr",
    "releaseVersion": "3.4",
    "folderName": "과거의 핏자국",
    "rarity": 4,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [21, 83, 141, 208, 275, 342, 409, 476], [15, 58, 98, 145, 191, 238, 284, 330]),
    "skill": {
      "name": "살육",
      "description": "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 24% 증가한다",
      "descriptions": [
        "장착한 캐릭터의 치명타 확률이 12% 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 24% 증가한다",
        "장착한 캐릭터의 치명타 확률이 14% 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 28% 증가한다",
        "장착한 캐릭터의 치명타 확률이 16% 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 32% 증가한다",
        "장착한 캐릭터의 치명타 확률이 18% 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 36% 증가한다",
        "장착한 캐릭터의 치명타 확률이 20% 증가한다. 장착한 캐릭터가 가하는 전투 스킬과 필살기 피해가 40% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "먼 곳에서 폭풍이 형성되고 있는 가운데, 저승의 바다에서 튀어나온 촉수는 표류하는 나약한 생명체를 괴롭히려는 듯했다.\n바다 괴물의 잘린 촉수는 하늘로 솟구치는 파도를 내려치더니 돌멩이처럼 부서지고 해연으로 추락했다.\n\n사람들은 포효가 열 차례의 밤낮 동안 이어지고, 천둥소리를 뒤덮을 정도로 컸다고 했다.\n사람들은 만 개의 목숨이 있어도 저승의 바다에 맞설 수 없다고 했다.\n\n용맹함으로 미숙함을 씻어내고, 거만함으로 나약함을 씻어내고 나서야——\n\n왜소한 그 몸은 비틀거리며 해안가에 올라왔다. 해가 이제 막 떠오르고, 바닷물은 마치 지난날에 흘린 피와 같았다"
  },
  {
    "id": "lc_도망칠_곳은_없다",
    "name": "도망칠 곳은 없다",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "도망칠 곳은 없다",
    "rarity": 4,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [21, 83, 141, 208, 275, 342, 409, 476], [15, 58, 98, 145, 191, 238, 284, 330]),
    "skill": {
      "name": "곤경",
      "description": "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 12%만큼의 HP를 회복한다",
      "descriptions": [
        "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 12%만큼의 HP를 회복한다",
        "장착한 캐릭터의 공격력이 30% 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 15%만큼의 HP를 회복한다",
        "장착한 캐릭터의 공격력이 36% 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 18%만큼의 HP를 회복한다",
        "장착한 캐릭터의 공격력이 42% 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 21%만큼의 HP를 회복한다",
        "장착한 캐릭터의 공격력이 48% 증가한다. 장착한 캐릭터는 적을 처치할 때 자신의 공격력 24%만큼의 HP를 회복한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "그것은 그 남자와의 첫 만남이 아니었다.\n언제부터인가 그 남자는 그림자처럼 그를 따라다녔다.\n몇 번이나 창을 찔러넣어도 그는 다시 나타났다.\n그는 지지 않았지만, 이길 수도 없었다.\n그는 도망치고 싶었으나, 도망칠 곳이 없었다"
  },
  {
    "id": "lc_비밀_맹세",
    "name": "비밀 맹세",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "비밀 맹세",
    "rarity": 4,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [21, 83, 141, 208, 275, 342, 409, 476], [15, 58, 98, 145, 191, 238, 284, 330]),
    "skill": {
      "name": "젖 먹던 힘까지",
      "description": "장착한 캐릭터가 가하는 피해가 20% 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 20% 증가한다",
      "descriptions": [
        "장착한 캐릭터가 가하는 피해가 20% 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 20% 증가한다",
        "장착한 캐릭터가 가하는 피해가 25% 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 25% 증가한다",
        "장착한 캐릭터가 가하는 피해가 30% 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 30% 증가한다",
        "장착한 캐릭터가 가하는 피해가 35% 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 35% 증가한다",
        "장착한 캐릭터가 가하는 피해가 40% 증가하며, 동시에 현재 HP 백분율이 장착한 캐릭터 자신의 HP 백분율 이상인 적에게 가하는 피해가 추가로 40% 증가한다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "소년은 매번 떠나기 전에 팔꿈치 보호대와 장갑을 조심스럽게 확인한다.\n그가 가장 좋아하는 장갑은 충분히 단단하며 많은 비밀을 숨길 수 있다.\n이러다 보니 아무도 그의 손에 감은 붕대와 아래 숨은 상처를 볼 수 없다.\n다들 그를 평범한 사람으로 생각하고 무난하게 그와 인사한다.\n이거면 충분하다"
  },
  {
    "id": "lc_푸른_하늘_아래",
    "name": "푸른 하늘 아래",
    "gameId": "hsr",
    "releaseVersion": "1.0",
    "folderName": "푸른 하늘 아래",
    "rarity": 4,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [21, 83, 141, 208, 275, 342, 409, 476], [15, 58, 98, 145, 191, 238, 284, 330]),
    "skill": {
      "name": "파도치는 따스한 이삭",
      "description": "장착한 캐릭터의 공격력이 16% 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 12% 증가한다. 지속 시간: 3턴",
      "descriptions": [
        "장착한 캐릭터의 공격력이 16% 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 12% 증가한다. 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 20% 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 15% 증가한다. 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 24% 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 18% 증가한다. 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 28% 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 21% 증가한다. 지속 시간: 3턴",
        "장착한 캐릭터의 공격력이 32% 증가한다. 장착한 캐릭터는 적을 처치한 후 치명타 확률이 24% 증가한다. 지속 시간: 3턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("고대 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("고대 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 4, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 5, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("파멸의 칼날", 4, 2), createMaterial("혼돈의 칼날", 12, 3), createMaterial("정멸의 칼날", 15, 4), createMaterial("고대 부품", 20, 2), createMaterial("고대 전달 장치", 20, 3), createMaterial("고대 엔진", 14, 4)] }
    ],
    "story": "푸른 하늘 아래 이삭이 파도처럼 출렁인다.\n소녀는 정성껏 화환을 엮어\n가장 사랑하는 여동생의 머리에 얹었다.\n그때의 그들은 비슷한 키였고,\n그때의 그들은 여전히 그렇게 웃었다"
  },
  {
    "id": "lc_불의_먼_곳에서",
    "name": "불의 먼 곳에서",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "불의 먼 곳에서",
    "rarity": 4,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([48, 185, 314, 463, 612, 761, 910, 1058], [21, 83, 141, 208, 275, 342, 409, 476], [12, 46, 79, 116, 153, 190, 227, 265]),
    "skill": {
      "name": "성불",
      "description": "장착한 캐릭터가 단일 공격에서 소모한 HP가 자신의 최대 HP의 25% 이상이거나, 소모한 HP의 누계가 자신의 최대 HP의 25% 이상일 경우, 즉시 자신의 최대 HP의 15%를 회복하고 가하는 피해가 25% 증가한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다",
      "descriptions": [
        "장착한 캐릭터가 단일 공격에서 소모한 HP가 자신의 최대 HP의 25% 이상이거나, 소모한 HP의 누계가 자신의 최대 HP의 25% 이상일 경우, 즉시 자신의 최대 HP의 15%를 회복하고 가하는 피해가 25% 증가한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터가 단일 공격에서 소모한 HP가 자신의 최대 HP의 25% 이상이거나, 소모한 HP의 누계가 자신의 최대 HP의 25% 이상일 경우, 즉시 자신의 최대 HP의 18%를 회복하고 가하는 피해가 31.25% 증가한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터가 단일 공격에서 소모한 HP가 자신의 최대 HP의 25% 이상이거나, 소모한 HP의 누계가 자신의 최대 HP의 25% 이상일 경우, 즉시 자신의 최대 HP의 21%를 회복하고 가하는 피해가 37.5% 증가한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터가 단일 공격에서 소모한 HP가 자신의 최대 HP의 25% 이상이거나, 소모한 HP의 누계가 자신의 최대 HP의 25% 이상일 경우, 즉시 자신의 최대 HP의 24%를 회복하고 가하는 피해가 43.75% 증가한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다",
        "장착한 캐릭터가 단일 공격에서 소모한 HP가 자신의 최대 HP의 25% 이상이거나, 소모한 HP의 누계가 자신의 최대 HP의 25% 이상일 경우, 즉시 자신의 최대 HP의 27%를 회복하고 가하는 피해가 50% 증가한다. 지속 시간: 2턴. 해당 효과는 3턴마다 1회만 발동할 수 있다"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("꿈 저장 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("보리인의 송곳니", 4, 2), createMaterial("꿈 저장 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 4, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("달의 광기 이빨", 5, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("달의 광기 이빨", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("달의 광기 이빨", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] }
    ],
    "story": "폭발음과 함께 불길이 치솟았다. 그는 뜨거운 열기 속에서도 미동조차 하지 않았다. 자신의 몸이 불타는 것보다, 동료들의 희생이 더 아팠기에.\n\n*「이 불길이 모든 것을 태워버린다면, 나도 함께 타오르겠다」*\n\n그는 무기를 꽉 쥐었다. 자신의 생명을 깎아내어 승리를 쟁취하는 것, 그것이 그가 선택한 파멸의 길이었다. 연기가 자욱한 전장 너머로, 그는 먼 곳에서 불타오르는 희망을 보았다."
  },
  {
    "id": "lc_마음에_새긴_약속",
    "name": "마음에 새긴 약속",
    "gameId": "hsr",
    "releaseVersion": "2.0",
    "folderName": "마음에 새긴 약속",
    "rarity": 4,
    "path": "파멸",
    "baseStats": createDetailedBaseStats([43, 166, 283, 417, 551, 685, 819, 952], [21, 83, 141, 208, 275, 342, 409, 476], [15, 58, 98, 145, 191, 238, 284, 330]),
    "skill": {
      "name": "계승",
      "description": "장착한 캐릭터의 격파 특수효과가 28% 증가한다. 장착한 캐릭터가 필살기를 발동하면 치명타 확률이 15% 증가한다. 지속 시간: 2턴",
      "descriptions": [
        "장착한 캐릭터의 격파 특수효과가 28% 증가한다. 장착한 캐릭터가 필살기를 발동하면 치명타 확률이 15% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 35% 증가한다. 장착한 캐릭터가 필살기를 발동하면 치명타 확률이 18.75% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 42% 증가한다. 장착한 캐릭터가 필살기를 발동하면 치명타 확률이 22.5% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 49% 증가한다. 장착한 캐릭터가 필살기를 발동하면 치명타 확률이 26.25% 증가한다. 지속 시간: 2턴",
        "장착한 캐릭터의 격파 특수효과가 56% 증가한다. 장착한 캐릭터가 필살기를 발동하면 치명타 확률이 30% 증가한다. 지속 시간: 2턴"
      ]
    },
    "ascensionMaterials": [
      { "level": 20, "items": [createMaterial("신용 포인트", 5000, 3), createMaterial("꿈 저장 부품", 8, 2)] },
      { "level": 30, "items": [createMaterial("신용 포인트", 15000, 3), createMaterial("보리인의 송곳니", 4, 2), createMaterial("꿈 저장 부품", 20, 2)] },
      { "level": 40, "items": [createMaterial("신용 포인트", 35000, 3), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 4, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 8, 3)] },
      { "level": 50, "items": [createMaterial("신용 포인트", 85000, 3), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3)] },
      { "level": 60, "items": [createMaterial("신용 포인트", 185000, 4), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("달의 광기 이빨", 5, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 6, 4)] },
      { "level": 70, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("달의 광기 이빨", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] },
      { "level": 80, "items": [createMaterial("신용 포인트", 385000, 5), createMaterial("보리인의 송곳니", 4, 2), createMaterial("늑대 독 송곳니", 12, 3), createMaterial("달의 광기 이빨", 15, 4), createMaterial("꿈 저장 부품", 20, 2), createMaterial("꿈 흐름 밸브", 20, 3), createMaterial("꿈 제조 모터", 14, 4)] }
    ],
    "story": "소년은 낡은 시계를 꼭 쥐었다. 그것은 누군가와의 소중한 약속이자, 그가 나아가야 할 이유였다. 비록 앞길이 어둡고 험난할지라도, 그는 약속을 잊지 않았다.\n\n*「이 약속을 마음에 새기고, 나는 멈추지 않겠어」*\n\n그는 눈물을 닦고 앞을 보았다. 전해진 의지는 그의 안에서 새로운 힘이 되었다. 그는 자신이 받은 것을 다음 사람에게 전하기 위해, 오늘도 묵묵히 자신의 길을 걸어갔다."
  },
];
