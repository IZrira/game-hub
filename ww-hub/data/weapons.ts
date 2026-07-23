import { WuwaWeapon } from "./weapon";
import { createWwWeapon } from "./dataFactory";

// --- 1. 대검 (Broadblade) ---
const BROADBLADES: WuwaWeapon[] = [
  createWwWeapon("wp-5-bb-01", "weapon.bb.wp-5-bb-01.name", 5, "대검", 587, "공격력", "36.4%"),
  createWwWeapon("wp-5-bb-02", "weapon.bb.wp-5-bb-02.name", 5, "대검", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-bb-03", "weapon.bb.wp-5-bb-03.name", 5, "대검", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-bb-04", "weapon.bb.wp-5-bb-04.name", 5, "대검", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-bb-05", "weapon.bb.wp-5-bb-05.name", 5, "대검", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-bb-06", "weapon.bb.wp-5-bb-06.name", 5, "대검", 675, "크리티컬", "12.1%"),
  createWwWeapon("wp-5-bb-07", "weapon.bb.wp-5-bb-07.name", 5, "대검", 500, "크리티컬", "36.0%"),
  createWwWeapon("wp-5-bb-08", "weapon.bb.wp-5-bb-08.name", 5, "대검", 413, "공명 효율", "77%", "3.0"),
  createWwWeapon("wp-3-bb-01", "weapon.bb.wp-3-bb-01.name", 3, "대검", 337, "방어력", "61.5%"),
  createWwWeapon("wp-3-bb-02", "weapon.bb.wp-3-bb-02.name", 3, "대검", 337, "공명 효율", "51.8%"),
  createWwWeapon("wp-4-bb-02", "weapon.bb.wp-4-bb-02.name", 4, "대검", 412, "공격력", "30.3%"),
  createWwWeapon("wp-4-bb-03", "weapon.bb.wp-4-bb-03.name", 4, "대검", 462, "공격력", "18.2%"),
  createWwWeapon("wp-4-bb-04", "weapon.bb.wp-4-bb-04.name", 4, "대검", 412, "크리티컬", "20.2%"),
  createWwWeapon("wp-4-bb-05", "weapon.bb.wp-4-bb-05.name", 4, "대검", 412, "크리티컬 피해", "40.5%"),
  createWwWeapon("wp-4-bb-06", "weapon.bb.wp-4-bb-06.name", 4, "대검", 412, "공명 효율", "32.3%"),
  createWwWeapon("wp-4-bb-07", "weapon.bb.wp-4-bb-07.name", 4, "대검", 462, "공격력", "18.2%"),
  createWwWeapon("wp-3-bb-03", "weapon.bb.wp-3-bb-03.name", 3, "대검", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-bb-04", "weapon.bb.wp-3-bb-04.name", 3, "대검", 300, "공명 효율", "32.4%"),
  createWwWeapon("wp-3-bb-05", "weapon.bb.wp-3-bb-05.name", 3, "대검", 300, "방어력", "38.5%"),
  createWwWeapon("wp-3-bb-06", "weapon.bb.wp-3-bb-06.name", 3, "대검", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-bb-07", "weapon.bb.wp-3-bb-07.name", 3, "대검", 300, "공격력", "30.4%"),
  createWwWeapon("wp-2-bb-01", "weapon.bb.wp-2-bb-01.name", 2, "대검", 275, "공격력", "14.8%"),
  createWwWeapon("wp-1-bb-02", "weapon.bb.wp-1-bb-02.name", 1, "대검", 250, "공격력", "11.5%"),
];

// --- 2. 직검 (Sword) ---
const SWORDS: WuwaWeapon[] = [
  createWwWeapon("wp-5-sw-10", "weapon.sw.wp-5-sw-10.name", 5, "직검", 500, "크리티컬", "36%", "3.3"),
  createWwWeapon("wp-5-sw-01", "weapon.sw.wp-5-sw-01.name", 5, "직검", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-sw-02", "weapon.sw.wp-5-sw-02.name", 5, "직검", 587, "공명 효율", "38.8%"),
  createWwWeapon("wp-5-sw-03", "weapon.sw.wp-5-sw-03.name", 5, "직검", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-sw-04", "weapon.sw.wp-5-sw-04.name", 5, "직검", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-sw-08", "weapon.sw.wp-5-sw-08.name", 5, "직검", 412, "공명 효율", "77%"),
  createWwWeapon("wp-5-sw-09", "weapon.sw.wp-5-sw-09.name", 5, "직검", 412, "HP", "72.2%"),
  createWwWeapon("wp-5-sw-05", "weapon.sw.wp-5-sw-05.name", 5, "직검", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-sw-06", "weapon.sw.wp-5-sw-06.name", 5, "직검", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-sw-07", "weapon.sw.wp-5-sw-07.name", 5, "직검", 587, "공명 효율", "38.8%"),
  createWwWeapon("wp-4-sw-03", "weapon.sw.wp-4-sw-03.name", 4, "직검", 413, "공격력", "30.4%"),
  createWwWeapon("wp-3-sw-01", "weapon.sw.wp-3-sw-01.name", 3, "직검", 337, "공명 효율", "51.8%"),
  createWwWeapon("wp-4-sw-04", "weapon.sw.wp-4-sw-04.name", 4, "직검", 413, "공격력", "30.4%"),
  createWwWeapon("wp-4-sw-05", "weapon.sw.wp-4-sw-05.name", 4, "직검", 463, "공격력", "18.2%"),
  createWwWeapon("wp-4-sw-06", "weapon.sw.wp-4-sw-06.name", 4, "직검", 388, "공격력", "36.5%"),
  createWwWeapon("wp-4-sw-07", "weapon.sw.wp-4-sw-07.name", 4, "직검", 412, "크리티컬", "20.2%"),
  createWwWeapon("wp-4-sw-08", "weapon.sw.wp-4-sw-08.name", 4, "직검", 388, "공격력", "36.5%"),
  createWwWeapon("wp-4-sw-09", "weapon.sw.wp-4-sw-09.name", 4, "직검", 462, "공격력", "18.2%"),
  createWwWeapon("wp-4-sw-10", "weapon.sw.wp-4-sw-10.name", 4, "직검", 463, "공격력", "18.2%"),
  createWwWeapon("wp-3-sw-02", "weapon.sw.wp-3-sw-02.name", 3, "직검", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-sw-03", "weapon.sw.wp-3-sw-03.name", 3, "직검", 300, "공명 효율", "32.4%"),
  createWwWeapon("wp-3-sw-04", "weapon.sw.wp-3-sw-04.name", 3, "직검", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-sw-05", "weapon.sw.wp-3-sw-05.name", 3, "직검", 300, "HP", "30.4%"),
  createWwWeapon("wp-2-sw-01", "weapon.sw.wp-2-sw-01.name", 2, "직검", 275, "공격력", "14.8%"),
  createWwWeapon("wp-1-sw-02", "weapon.sw.wp-1-sw-02.name", 1, "직검", 250, "공격력", "11.5%"),
];

// --- 3. 권총 (Pistol) ---
const PISTOLS: WuwaWeapon[] = [
  createWwWeapon("wp-5-ps-01", "weapon.pi.wp-5-ps-01.name", 5, "권총", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-ps-02", "weapon.pi.wp-5-ps-02.name", 5, "권총", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-ps-03", "weapon.pi.wp-5-ps-03.name", 5, "권총", 500, "크리티컬 피해", "72.0%"),
  createWwWeapon("wp-5-ps-04", "weapon.pi.wp-5-ps-04.name", 5, "권총", 500, "크리티컬", "36.0%"),
  createWwWeapon("wp-5-ps-05", "weapon.pi.wp-5-ps-05.name", 5, "권총", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-ps-06", "weapon.pi.wp-5-ps-06.name", 5, "권총", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-4-ps-01", "weapon.pi.wp-4-ps-01.name", 4, "권총", 412, "공격력", "30.3%"),
  createWwWeapon("wp-3-ps-01", "weapon.pi.wp-3-ps-01.name", 3, "권총", 337, "공명 효율", "51.8%"),
  createWwWeapon("wp-4-ps-02", "weapon.pi.wp-4-ps-02.name", 4, "권총", 412, "공격력", "30.3%"),
  createWwWeapon("wp-4-ps-03", "weapon.pi.wp-4-ps-03.name", 4, "권총", 463, "공격력", "18.2%"),
  createWwWeapon("wp-4-ps-04", "weapon.pi.wp-4-ps-04.name", 4, "권총", 387, "공격력", "36.4%"),
  createWwWeapon("wp-4-ps-05", "weapon.pi.wp-4-ps-05.name", 4, "권총", 412, "크리티컬", "20.2%"),
  createWwWeapon("wp-4-ps-06", "weapon.pi.wp-4-ps-06.name", 4, "권총", 387, "공격력", "36.4%"),
  createWwWeapon("wp-4-ps-07", "weapon.pi.wp-4-ps-07.name", 4, "권총", 462, "공격력", "18.2%"),
  createWwWeapon("wp-3-ps-02", "weapon.pi.wp-3-ps-02.name", 3, "권총", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-ps-03", "weapon.pi.wp-3-ps-03.name", 3, "권총", 300, "공격력", "30.4%"),
  createWwWeapon("wp-3-ps-04", "weapon.pi.wp-3-ps-04.name", 3, "권총", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-ps-05", "weapon.pi.wp-3-ps-05.name", 3, "권총", 300, "공격력", "30.4%"),
  createWwWeapon("wp-2-ps-01", "weapon.pi.wp-2-ps-01.name", 2, "권총", 275, "공격력", "14.8%"),
  createWwWeapon("wp-1-ps-02", "weapon.pi.wp-1-ps-02.name", 1, "권총", 250, "공격력", "11.5%"),
];

// --- 4. 권갑 (Gauntlet) ---
const GAUNTLETS: WuwaWeapon[] = [
  createWwWeapon("wp-5-gt-01", "weapon.ga.wp-5-gt-01.name", 5, "권갑", 587, "공격력", "36.4%"),
  createWwWeapon("wp-5-gt-02", "weapon.ga.wp-5-gt-02.name", 5, "권갑", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-gt-03", "weapon.ga.wp-5-gt-03.name", 5, "권갑", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-gt-04", "weapon.ga.wp-5-gt-04.name", 5, "권갑", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-gt-05", "weapon.ga.wp-5-gt-05.name", 5, "권갑", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-5-gt-06", "weapon.ga.wp-5-gt-06.name", 5, "권갑", 500, "크리티컬", "36.0%"),
  createWwWeapon("wp-5-gt-07", "weapon.ga.wp-5-gt-07.name", 5, "권갑", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-gt-08", "weapon.ga.wp-5-gt-08.name", 5, "권갑", 587, "크리티컬 피해", "48.6%"),
  createWwWeapon("wp-3-gt-01", "weapon.ga.wp-3-gt-01.name", 3, "권갑", 337, "방어력", "61.5%"),
  createWwWeapon("wp-3-gt-02", "weapon.ga.wp-3-gt-02.name", 3, "권갑", 337, "공명 효율", "51.8%"),
  createWwWeapon("wp-4-gt-01", "weapon.ga.wp-4-gt-01.name", 4, "권갑", 412, "공격력", "30.3%"),
  createWwWeapon("wp-4-gt-02", "weapon.ga.wp-4-gt-02.name", 4, "권갑", 463, "공격력", "18.2%"),
  createWwWeapon("wp-4-gt-03", "weapon.ga.wp-4-gt-03.name", 4, "권갑", 412, "크리티컬", "20.2%"),
  createWwWeapon("wp-4-gt-04", "weapon.ga.wp-4-gt-04.name", 4, "권갑", 412, "크리티컬 피해", "40.5%"),
  createWwWeapon("wp-4-gt-05", "weapon.ga.wp-4-gt-05.name", 4, "권갑", 387, "공명 효율", "38.8%"),
  createWwWeapon("wp-4-gt-06", "weapon.ga.wp-4-gt-06.name", 4, "권갑", 462, "공격력", "18.2%"),
  createWwWeapon("wp-3-gt-03", "weapon.ga.wp-3-gt-03.name", 3, "권갑", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-gt-04", "weapon.ga.wp-3-gt-04.name", 3, "권갑", 325, "방어력", "30.8%"),
  createWwWeapon("wp-3-gt-05", "weapon.ga.wp-3-gt-05.name", 3, "권갑", 300, "크리티컬 피해", "40.5%"),
  createWwWeapon("wp-3-gt-06", "weapon.ga.wp-3-gt-06.name", 3, "권갑", 300, "방어력", "38.5%"),
  createWwWeapon("wp-2-gt-01", "weapon.ga.wp-2-gt-01.name", 2, "권갑", 275, "공격력", "14.8%"),
  createWwWeapon("wp-1-gt-02", "weapon.ga.wp-1-gt-02.name", 1, "권갑", 250, "공격력", "11.5%"),
];

// --- 5. 증폭기 (Rectifier) ---
const RECTIFIERS: WuwaWeapon[] = [
  createWwWeapon("wp-5-rc-01", "weapon.re.wp-5-rc-01.name", 5, "증폭기", 500, "공격력", "54.0%"),
  createWwWeapon("wp-5-rc-02", "weapon.re.wp-5-rc-02.name", 5, "증폭기", 525, "공명 효율", "38.8%"),
  createWwWeapon("wp-5-rc-03", "weapon.re.wp-5-rc-03.name", 5, "증폭기", 500, "크리티컬", "36.0%"),
  createWwWeapon("wp-5-rc-04", "weapon.re.wp-5-rc-04.name", 5, "증폭기", 500, "크리티컬 피해", "72%"),
  createWwWeapon("wp-4-rc-01", "weapon.re.wp-4-rc-01.name", 4, "증폭기", 412, "공명 효율", "77%"),
  createWwWeapon("wp-5-rc-05", "weapon.re.wp-5-rc-05.name", 5, "증폭기", 500, "크리티컬", "36.0%"),
  {
    id: "wp-5-rc-06", name: "바다의 속삭임", rarity: 5, type: "증폭기", releaseVersion: "2.2", obtain: "튜닝",
    stats: { atk: 500, subStatName: "크리티컬 피해", subStatValue: "72.0%" },
    skill: { 
      name: "진혼곡", 
      description: "공격력이 12%/15%/18%/21%/24% 증가된다. 변주 스킬 혹은 일반 공격 발동 후 10초 내에, 에코 어빌리티 발동 시, 「부드러운 꿈」 1스택을 획득한다. 같은 이름의 에코는 1회만 발동이 가능하고, 최대 2스택 중첩이 가능하며, 10초간 지속된다. 2스택까지 중첩 후, 에코 어빌리티를 발동할 경우, 지속시간이 리셋되지 않는다. 해당 효과는 10초 내에 최대 1회 발생할 수 있으며, 다른 캐릭터로 전환하면 효과가 즉시 종료된다.\n1스택: 일반 공격 피해 보너스가 40%/50%/60%/70%/80% 증가된다.\n2스택: 목표의 인멸 속성 저항을 12%/15%/18%/21%/24% 무시한다" 
    },
    description: "바다에서 누군가는 별을 보고, 누군가는 달을 건져내며, 또 다른 누군가는 수많은 속삭임을 듣는다.\n\n그 속삭임들은 그녀의 독에 스며들어, 휘어진 강줄기를 타고 흘러간다.\n\n마지막엔 마치 해파리 양산처럼, 바다처럼 그녀를 감싸 안는다"
  },
  createWwWeapon("wp-5-rc-07", "weapon.re.wp-5-rc-07.name", 5, "증폭기", 587, "크리티컬", "24.3%"),
  createWwWeapon("wp-5-rc-08", "weapon.re.wp-5-rc-08.name", 5, "증폭기", 500, "크리티컬", "36%", "3.3"),
  createWwWeapon("wp-4-rc-02", "weapon.re.wp-4-rc-02.name", 4, "증폭기", 387, "공격력", "36.4%"),
  createWwWeapon("wp-3-rc-01", "weapon.re.wp-3-rc-01.name", 3, "증폭기", 337, "공명 효율", "51.8%"),
  createWwWeapon("wp-4-rc-03", "weapon.re.wp-4-rc-03.name", 4, "증폭기", 412, "HP", "30.3%"),
  createWwWeapon("wp-4-rc-04", "weapon.re.wp-4-rc-04.name", 4, "증폭기", 463, "공격력", "18.2%", "1.3"),
  { id: "wp-4-rc-05", name: "청음", rarity: 4, type: "증폭기", releaseVersion: "1.0", obtain: "선약 방송국", stats: { atk: 413, subStatName: "크리티컬", subStatValue: "20.2%" }, skill: { name: "강유병존", description: "공명 해방 발동 시, 자신의 공격력이 15%/23.25%/31.5%/39.75%/48% 증가하고, 15초간 지속된다" }, description: "이 증폭기는 황룡 1주(州)의 영윤이 취임식에서 사용한 의식 무기로, 금색 은행잎 무늬는 황룡이 은행나무처럼 오래도록 번영하기를 기원하는 의미를 담고 있다" },
  { id: "wp-4-rc-06", name: "눈부신 빛", rarity: 4, type: "증폭기", releaseVersion: "2.6", obtain: "선약 방송국", stats: { atk: 413, subStatName: "크리티컬 피해", subStatValue: "40.5%" }, skill: { name: "흑조(黑潮) 사냥의 맹세", description: "공명 스킬 발동 시, 공격력과 일반 공격 피해 보너스가 9%/13.9%/18.9%/23.8%/28.8% 증가되고 10초간 지속된다" }, description: "일곱 언덕이 걸출한 검투사에게 수여하는 증폭기. 무기에 조각된 문양은 그리펙을 모티브로 디자인되었다. 그리펙은 타고난 사냥꾼이자 일곱 언덕 사람이 이 땅에서 만난 최초의 파트너이기도 하다. 이 우정은 글로 표현할 필요가 없으며, 세월이 흘러도 결코 흐려지지 않는 고결한 태양처럼 찬란하게 빛난다" },
  createWwWeapon("wp-4-rc-07", "weapon.re.wp-4-rc-07.name", 4, "증폭기", 337, "공명 효율", "51.8%"),
  { id: "wp-4-rc-08", name: "허위의 왈츠", rarity: 4, type: "증폭기", releaseVersion: "2.0", obtain: "게임 내 제작", stats: { atk: 463, subStatName: "공격력", subStatValue: "18.2%" }, skill: { name: "수식", description: "「이상 효과」가 있는 몬스터에게 피해를 입힐 시, 자신의 공격력이 4%/5%/6%/7%/8% 증가하며, 10초간 지속된다. 1초마다 1회 발생할 수 있으며, 최대 4스택 중첩이 가능하다" }, description: "무기의 디자인은 연극 「허위의 왈츠」에서 영감을 받았다.\n\n형식일 뿐 본질이 없는 왈츠, 그의 웅장한 교향악은 귓가에 들리는 음모와 속삭임을 덮고, 휘날리는 치맛자락은 몰래 교환된 문서와 서신을 가린다 —— 완벽하게 호흡을 맞추는 스텝과 함께 모두가 서로의 마음을 안다. 모든 것이 소리없는 증폭기처럼 자연스레 흐르고 있다" },
  createWwWeapon("wp-3-rc-02", "weapon.re.wp-3-rc-02.name", 3, "증폭기", 337, "공명 효율", "51.8%"),
  createWwWeapon("wp-4-rc-09", "weapon.re.wp-4-rc-09.name", 4, "증폭기", 463, "공격력", "18.2%"),
  createWwWeapon("wp-3-rc-03", "weapon.re.wp-3-rc-03.name", 3, "증폭기", 325, "공격력", "24.3%"),
  createWwWeapon("wp-3-rc-04", "weapon.re.wp-3-rc-04.name", 3, "증폭기", 300, "공명 효율", "32.4%"),
  createWwWeapon("wp-3-rc-05", "weapon.re.wp-3-rc-05.name", 3, "증폭기", 300, "HP", "30.4%"),
  createWwWeapon("wp-3-rc-06", "weapon.re.wp-3-rc-06.name", 3, "증폭기", 325, "공격력", "24.3%"),
  createWwWeapon("wp-2-rc-01", "weapon.re.wp-2-rc-01.name", 2, "증폭기", 275, "공격력", "14.8%"),
  createWwWeapon("wp-1-rc-02", "weapon.re.wp-1-rc-02.name", 1, "증폭기", 250, "공격력", "11.5%"),
];

// --- 최종 데이터 통합 및 Export ---
const ALL_WEAPONS: WuwaWeapon[] = [
  ...BROADBLADES,
  ...SWORDS,
  ...PISTOLS,
  ...GAUNTLETS,
  ...RECTIFIERS
];

export const WEAPON_DATA: WuwaWeapon[] = [...ALL_WEAPONS].sort((a, b) => {
  const vA = parseFloat(a.releaseVersion || '1.0');
  const vB = parseFloat(b.releaseVersion || '1.0');
  if (vA !== vB) return vB - vA;

  const rA = a.rarity || 0;
  const rB = b.rarity || 0;
  if (rA !== rB) return rB - rA;

  return (a.name || '').localeCompare(b.name || '');
});