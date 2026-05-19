export type OrnamentType = '차원 장신구';

export interface OrnamentPiece {
  type: string;
  name: string;
  enName: string;
}

export interface Ornament {
  id: string;
  gameId?: 'hsr' | 'ww';
  name: string;
  enName?: string;
  folderName: string;
  type: OrnamentType;
  setEffect: {
    '2piece': string;
    'en_2piece'?: string;
  };
  pieces: OrnamentPiece[];
  image?: string;
}

export const ORNAMENT_DATA: Ornament[] = [
  {
    id: "planar-4-1-01",
    gameId: "hsr",
    name: "0호 스테이지 펑크 로드",
    enName: "Punklorde Stage Zero",
    folderName: "0호 스테이지 펑크 로드",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 환락도가 8% 증가한다. 전투 중 환락도가 처음으로 40%/80% 도달 시 장착한 캐릭터의 치명타 피해가 20%/32% 증가한다.",
      "en_2piece": "Increases the wearer's Elation by 8%. When Elation reaches 40%/80% for the first time in battle, increases the wearer's CRIT DMG by 20%/32%."
    },
    pieces: [
      { type: "Planar Sphere", name: "펑크 로드의 네온 시티", enName: "Punklorde's Rainbow City" },
      { type: "Link Rope", name: "펑크 로드의 데이터 홍수", enName: "Punklorde's Data Deluge" }
    ],
    image: "0호 스테이지 펑크 로드"
  },
  {
    id: "planar-4-1-02",
    gameId: "hsr",
    name: "천 개의 별이 모인 도시",
    enName: "City of Converging Stars",
    folderName: "천 개의 별이 모인 도시",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터가 추가 공격 발동 시 공격력이 24% 증가한다, 지속 시간: 2턴. 적이 처치될 시 모든 아군이 이번 전투에서 치명타 피해가 12% 증가하며, 해당 효과는 중첩되지 않는다.",
      "en_2piece": "When the wearer uses a Follow-Up ATK, increases their ATK by 24% for 2 turns. When an enemy target is defeated, increases CRIT DMG for all allies by 12% for the rest of the current battle. This effect cannot stack"
    },
    pieces: [
      { type: "Planar Sphere", name: "아스트로폴리스 미디어 본부", enName: "Astropolis Media Headquarters" },
      { type: "Link Rope", name: "아스트로폴리스 사원증", enName: "Astropolis Employee Credentials" }
    ],
    image: "천 개의 별이 모인 도시"
  },
  {
    id: "ornament_텐고쿠_라이브스트리밍",
    gameId: "hsr",
    name: "텐고쿠@라이브스트리밍",
    enName: "Tengoku@Livestream",
    folderName: "텐고쿠@라이브스트리밍",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 피해가 16% 증가하며, 같은 턴에 전투 스킬 포인트를 3pt 이상 소모 시 추가로 장착한 캐릭터의 치명타 피해가 32% 증가한다, 지속 시간: 3턴",
      "en_2piece": "Increases the wearer's CRIT DMG by 16%, If 3 or more Skill Points are consumed in the same turn, additionally increases the wearer's CRIT DMG by 32% for 3 turns."
    },
    pieces: [
      { type: "Planar Sphere", name: "라이브 스트리밍의 수많은 창", enName: "Livestream's Protean Vistas" },
      { type: "Link Rope", name: "라이브 스트리밍의 끊김 없는 채팅", enName: "Livestream's Chatter Banter" }
    ],
    image: "텐고쿠@라이브스트리밍"
  },
  {
    id: "ornament_꿈을_엮는_요정의_낙원",
    gameId: "hsr",
    name: "꿈을 엮는 요정의 낙원",
    enName: "Arcadia of Woven Dreams",
    folderName: "꿈을 엮는 요정의 낙원",
    type: "차원 장신구",
    setEffect: {
      "2piece": "파티 내 현재 필드에 있는 아군의 수가 4명이 아닐 경우, 아군 수가 1명 많을/적을 때마다 장착한 캐릭터와 해당 캐릭터의 기억 정령이 가하는 피해가 9%/12% 증가한다, 최대 중첩수: 4/3스택",
      "en_2piece": "When there are currently more or less than 4 ally targets in battle, each additional/missing ally target increases the wearer and their memosprite's DMG by 9%/12%, up to a maximum of 4/3 stacks."
    },
    pieces: [
      { type: "Planar Sphere", name: "비밀 미궁의 평온한 꿈 나무집", enName: "Membrance Maze's Serene Treehouse" },
      { type: "Link Rope", name: "비밀 미궁의 소원 피리", enName: "Membrance Maze's Wishing Whistle" }
    ],
    image: "꿈을 엮는 요정의 낙원"
  },
  {
    id: "ornament_즐거움에_취한_바다의_일각",
    gameId: "hsr",
    name: "즐거움에 취한 바다의 일각",
    enName: "Revelry by the Sea",
    folderName: "즐거움에 취한 바다의 일각",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 공격력이 12% 증가한다. 장착한 캐릭터의 공격력이 2400/3600 이상일 시 가하는 지속 피해가 추가로 12%/24% 증가한다",
      "en_2piece": "Increases the wearer's ATK by 12%. When the wearer's ATK is higher than or equal to 2,400/3,600, increases the DoT DMG dealt by 12%/24%."
    },
    pieces: [
      { type: "Planar Sphere", name: "노래의 해안의 암초섬 등대", enName: "Warbling Shores' Blazing Beacon" },
      { type: "Link Rope", name: "노래의 해안의 선율길", enName: "Warbling Shores' Cantillation Trail" }
    ],
    image: "즐거움에 취한 바다의 일각"
  },
  {
    id: "ornament_영원의_땅_앰포리어스",
    gameId: "hsr",
    name: "영원의 땅 앰포리어스",
    enName: "Amphoreus, The Eternal Land",
    folderName: "영원의 땅 앰포리어스",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 확률이 8% 증가한다. 장착한 캐릭터의 기억 정령이 필드에 있을 시 모든 아군의 속도가 8% 증가하며, 해당 효과는 중첩할 수 없다",
      "en_2piece": "Increases the wearer's CRIT Rate by 8%. While the wearer's memosprite is on the field, increases all allies' SPD by 8%. This effect cannot be stacked."
    },
    pieces: [
      { type: "Planar Sphere", name: "앰포리어스의 서풍의 끝", enName: "Last West Wind of Amphoreus" },
      { type: "Link Rope", name: "앰포리어스의 영원한 시편", enName: "Eternal Verses of Amphoreus" }
    ],
    image: "영원의 땅 앰포리어스"
  },
  {
    id: "ornament_고요한_습골지",
    gameId: "hsr",
    name: "고요한 습골지",
    enName: "Bone Collection's Serene Demesne",
    folderName: "고요한 습골지",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 HP 최대치가 12% 증가한다. 장착한 캐릭터의 HP 최대치가 5000pt 이상일 경우, 장착한 캐릭터와 해당 캐릭터의 기억 정령의 치명타 피해가 28% 증가한다",
      "en_2piece": "Increases the wearer's Max HP by 12%. When the wearer's Max HP is 5000 or higher, increases the wearer's and their memosprite's CRIT DMG by 28%."
    },
    pieces: [
      { type: "Planar Sphere", name: "아이도니아의 무명 비석", enName: "Aidonia's Deceased Gravestones" },
      { type: "Link Rope", name: "아이도니아의 저승 뼈사슬", enName: "Aidonia's Deathward Bone Chains" }
    ],
    image: "고요한 습골지"
  },
  {
    id: "ornament_사색하는_거목",
    gameId: "hsr",
    name: "사색하는 거목",
    enName: "Giant Tree of Rapt Brooding",
    folderName: "사색하는 거목",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 속도가 6% 증가한다. 장착한 캐릭터의 속도가 135/180 이상일 경우, 장착한 캐릭터와 해당 캐릭터의 기억 정령의 치유량이 12%/20% 증가한다",
      "en_2piece": "Increases the wearer's SPD by 6%. When the wearer's Speed is 135/180 or higher, increases the wearer and their memosprite's Outgoing Healing by 12%/20%."
    },
    pieces: [
      { type: "Planar Sphere", name: "깨달음의 나무 정원의 사색하는 거대한 가지", enName: "Grove of Epiphany's Pondering Colossus" },
      { type: "Link Rope", name: "깨달음의 나무 정원의 지식을 잇는 잎사귀 길", enName: "Grove of Epiphany's Interwoven Veins" }
    ],
    image: "사색하는 거목"
  },
  {
    id: "ornament_바다에_잠긴_루샤카",
    gameId: "hsr",
    name: "바다에 잠긴 루샤카",
    enName: "Lushaka, the Sunken Seas",
    folderName: "바다에 잠긴 루샤카",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 에너지 회복효율이 5% 증가한다. 장착한 캐릭터가 파티 편성의 첫 번째 캐릭터가 아닐 경우, 파티 편성의 첫 번째 캐릭터의 공격력이 12% 증가한다",
      "en_2piece": "Increases the wearer's Energy Regeneration Rate by 5%. If the wearer is not the first character in the team lineup, then increases the ATK of the first character in the team lineup by 12%."
    },
    pieces: [
      { type: "Planar Sphere", name: "루샤카의 물에 잠긴 도시", enName: "Lushaka's Waterscape" },
      { type: "Link Rope", name: "루샤카의 쌍생 항로", enName: "Lushaka's Twinlanes" }
    ],
    image: "바다에 잠긴 루샤카"
  },
  {
    id: "ornament_기묘한_나나_낙원",
    gameId: "hsr",
    name: "기묘한 나나 낙원",
    enName: "The Wondrous BananAmusement Park",
    folderName: "기묘한 나나 낙원",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 피해가 16% 증가한다. 장착한 캐릭터가 소환한 목표가 있을 시, 치명타 피해가 추가로 32% 증가한다",
      "en_2piece": "Increases the wearer's CRIT DMG by 16%. When a target summoned by the wearer is on the field, CRIT DMG additionally increases by 32%."
    },
    pieces: [
      { type: "Planar Sphere", name: "나나 낙원의 중앙 광장", enName: "BananAmusement Park's BananAxis Plaza" },
      { type: "Link Rope", name: "나나 낙원의 밈 케이블", enName: "BananAmusement Park's Memetic Cables" }
    ],
    image: "기묘한 나나 낙원"
  },
  {
    id: "ornament_질주하는_늑대의_도람_왕조",
    gameId: "hsr",
    name: "질주하는 늑대의 도람 왕조",
    enName: "Duran, Dynasty of Running Wolves",
    folderName: "질주하는 늑대의 도람 왕조",
    type: "차원 장신구",
    setEffect: {
      "2piece": "아군 캐릭터가 추가 공격을 발동하면 장착한 캐릭터는 [공훈]을 1스택 획득한다, 최대 중첩수: 5스택. [공훈] 스택당 장착한 캐릭터의 추가 공격으로 가하는 피해가 5% 증가하고, 5스택까지 중첩 시 장착한 캐릭터의 치명타 피해가 추가로 25% 증가한다",
      "en_2piece": "When an ally uses follow-up attacks, the wearer gains 1 stack of Merit, stacking up to 5 time(s). Each stack of Merit increases the DMG dealt by the wearer's follow-up attacks by 5%. When there are 5 stacks, additionally increases the wearer's CRIT DMG by 25%."
    },
    pieces: [
      { type: "Planar Sphere", name: "도람의 궁륭 금빛 장막", enName: "Duran's Tent of Golden Sky" },
      { type: "Link Rope", name: "도람의 기계짐승 고삐", enName: "Duran's Mechabeast Bridle" }
    ],
    image: "질주하는 늑대의 도람 왕조"
  },
  {
    id: "ornament_겁화_연등의_연마궁",
    gameId: "hsr",
    name: "겁화 연등의 연마궁",
    enName: "Forge of the Kalpagni Lantern",
    folderName: "겁화 연등의 연마궁",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 속도가 6% 증가한다. 장착한 캐릭터가 화염 속성 약점을 보유한 적을 명중하면 격파 특수효과가 40% 증가한다, 지속 시간: 1턴",
      "en_2piece": "Increases the wearer's SPD by 6%. When the wearer hits an enemy target that has Fire Weakness, the wearer's Break Effect increases by 40%, lasting for 1 turn(s)."
    },
    pieces: [
      { type: "Planar Sphere", name: "연마궁의 연등 심지", enName: "Forge's Lotus Lantern Wick" },
      { type: "Link Rope", name: "연마궁의 염륜 비단", enName: "Forge's Heavenly Flamewheel Silk" }
    ],
    image: "겁화 연등의 연마궁"
  },
  {
    id: "ornament_주인_없는_황폐한_별_츠가냐",
    gameId: "hsr",
    name: "주인 없는 황폐한 별 츠가냐",
    enName: "Sigonia, the Unclaimed Desolation",
    folderName: "주인 없는 황폐한 별 츠가냐",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 확률이 4% 증가한다. 적이 처치될 시 장착한 캐릭터의 치명타 피해가 4% 증가한다. 최대 중첩수: 10",
      "en_2piece": "Increases the wearer's CRIT Rate by 4%. When an enemy target gets defeated, the wearer's CRIT DMG increases by 4%, stacking up to 10 time(s)."
    },
    pieces: [
      { type: "Planar Sphere", name: "츠가냐의 지모신 침상", enName: "Sigonia's Gaiathra Berth" },
      { type: "Link Rope", name: "츠가냐의 윤회 매듭", enName: "Sigonia's Knot of Cyclicality" }
    ],
    image: "주인 없는 황폐한 별 츠가냐"
  },
  {
    id: "ornament_이즈모_현세와_타카마_신국",
    gameId: "hsr",
    name: "이즈모 현세와 타카마 신국",
    enName: "Izumo Gensei and Takama Divine Realm",
    folderName: "이즈모 현세와 타카마 신국",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 공격력이 12% 증가한다. 전투 진입 시 장착한 캐릭터와 운명의 길이 같은 동료가 최소 1명 존재할 경우, 장착한 캐릭터의 치명타 확률이 12% 증가한다",
      "en_2piece": "Increases the wearer's ATK by 12%. When entering battle, if at least one other ally follows the same Path as the wearer, then the wearer's CRIT Rate increases by 12%."
    },
    pieces: [
      { type: "Planar Sphere", name: "이즈모의 재앙신", enName: "Izumo's Magatsu no Morokami" },
      { type: "Link Rope", name: "이즈모의 종시일도", enName: "Izumo's Blades of Origin and End" }
    ],
    image: "이즈모 현세와 타카마 신국"
  },
  {
    id: "ornament_창공_전선_그라모스",
    gameId: "hsr",
    name: "창공 전선 그라모스",
    enName: "Firmament Frontline: Glamoth",
    folderName: "창공 전선 그라모스",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 공격력이 12% 증가한다. 장착한 캐릭터의 속도가 135/160 이상일 경우, 장착한 캐릭터가 가하는 피해가 12%/18% 증가한다",
      "en_2piece": "Increases the wearer's ATK by 12%. When the wearer's SPD is equal to or higher than 135/160, the wearer deals 12%/18% more DMG."
    },
    pieces: [
      { type: "Planar Sphere", name: "그라모스의 철기 군단", enName: "Glamoth's Iron Cavalry Regiment" },
      { type: "Link Rope", name: "그라모스의 적막한 묘비", enName: "Glamoth's Silent Tombstone" }
    ],
    image: "창공 전선 그라모스"
  },
  {
    id: "ornament_꿈의_땅_페나코니",
    gameId: "hsr",
    name: "꿈의 땅 페나코니",
    enName: "Penacony, Land of the Dreams",
    folderName: "꿈의 땅 페나코니",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 에너지 회복효율이 5% 증가한다. 장착한 캐릭터와 같은 속성의 파티 내 다른 아군 캐릭터가 주는 피해가 10% 증가한다",
      "en_2piece": "Increases wearer's Energy Regeneration Rate by 5%. Increases DMG by 10% for all other allies that are of the same Type as the wearer."
    },
    pieces: [
      { type: "Planar Sphere", name: "페나코니의 그랜드 호텔", enName: "Penacony's Grand Hotel" },
      { type: "Link Rope", name: "페나코니의 꿈을 좇는 궤도", enName: "Penacony's Dream-Seeking Tracks" }
    ],
    image: "꿈의 땅 페나코니"
  },
  {
    id: "ornament_뭇별_경기장",
    gameId: "hsr",
    name: "뭇별 경기장",
    enName: "Rutilant Arena",
    folderName: "뭇별 경기장",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 확률이 8% 증가한다. 장착한 캐릭터의 치명타 확률이 70% 이상일 경우, 일반 공격과 전투 스킬이 가하는 피해가 20% 증가한다",
      "en_2piece": "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 70% or higher, the wearer's Basic ATK and Skill DMG increase by 20%."
    },
    pieces: [
      { type: "Planar Sphere", name: "타이키얀 레이저 구장", enName: "Taikiyan Laser Stadium" },
      { type: "Link Rope", name: "타이키얀 아크라이트 트랙", enName: "Taikiyan's Arclight Race Track" }
    ],
    image: "뭇별 경기장"
  },
  {
    id: "ornament_부러진_용골",
    gameId: "hsr",
    name: "부러진 용골",
    enName: "Broken Keel",
    folderName: "부러진 용골",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 효과 저항이 10% 증가한다. 장착한 캐릭터의 효과 저항이 30% 이상일 경우 모든 아군의 치명타 피해가 10% 증가한다",
      "en_2piece": "Increases the wearer's Effect RES by 10%. When the wearer's Effect RES is at 30% or higher, all allies' CRIT DMG increases by 10%."
    },
    pieces: [
      { type: "Planar Sphere", name: "인스머스의 고래 낙하선", enName: "Insumousu's Whalefall Ship" },
      { type: "Link Rope", name: "인스머스의 해진 밧줄", enName: "Insumousu's Frayed Hawser" }
    ],
    image: "부러진 용골"
  },
  {
    id: "ornament_우주_봉인_정거장",
    gameId: "hsr",
    name: "우주 봉인 정거장",
    enName: "Space Sealing Station",
    folderName: "우주 봉인 정거장",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 공격력이 12% 증가한다. 장착한 캐릭터의 속도가 120 이상일 경우 공격력이 추가로 12% 증가한다",
      "en_2piece": "Increases the wearer's ATK by 12%. When the wearer's SPD reaches 120 or higher, the wearer's ATK increases by an extra 12%."
    },
    pieces: [
      { type: "Planar Sphere", name: "「헤르타」의 우주정거장", enName: "Herta's Space Station" },
      { type: "Link Rope", name: "「헤르타」의 궤적", enName: "Herta's Wandering Trek" }
    ],
    image: "우주 봉인 정거장"
  },
  {
    id: "ornament_불로인의_선주",
    gameId: "hsr",
    name: "불로인의 선주",
    enName: "Fleet of the Ageless",
    folderName: "불로인의 선주",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 HP 최대치가 12% 증가한다. 장착한 캐릭터의 속도가 120 이상일 경우 모든 아군의 공격력이 8% 증가한다",
      "en_2piece": "Increases the wearer's Max HP by 12%. When the wearer's SPD reaches 120 or higher, all allies' ATK increases by 8%."
    },
    pieces: [
      { type: "Planar Sphere", name: "나부 선주의 천외 누선", enName: "The Xianzhou Luofu's Celestial Ark" },
      { type: "Link Rope", name: "나부 선주의 불멸의 거목 가지", enName: "The Xianzhou Luofu's Ambrosial Arbor Vines" }
    ],
    image: "불로인의 선주"
  },
  {
    id: "ornament_도적국_탈리아",
    gameId: "hsr",
    name: "도적국 탈리아",
    enName: "Talia: Kingdom of Banditry",
    folderName: "도적국 탈리아",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 격파 특수효과가 16% 증가한다. 장착한 캐릭터의 속도가 145 이상일 경우 격파 특수효과가 추가로 20% 증가한다",
      "en_2piece": "Increases the wearer's Break Effect by 16%. When the wearer's SPD reaches 145 or higher, the wearer's Break Effect increases by an extra 20%."
    },
    pieces: [
      { type: "Planar Sphere", name: "탈리아의 네일스크랩 타운", enName: "Talia's Nailscrap Town" },
      { type: "Link Rope", name: "탈리아의 벗겨진 전선", enName: "Talia's Exposed Electric Wire" }
    ],
    image: "도적국 탈리아"
  },
  {
    id: "ornament_생명의_바커_공",
    gameId: "hsr",
    name: "생명의 바커 공",
    enName: "Sprightly Vonwacq",
    folderName: "생명의 바커 공",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 에너지 회복효율이 5% 증가한다. 장착한 캐릭터의 속도가 120 이상일 경우 전투 진입 시 즉시 행동 게이지가 40% 증가한다\n\n[용어 설명]\n행동 게이지 증가: 행동 게이지가 증가하면 목표의 다음 행동 대기 시간이 단축된다.",
      "en_2piece": "Increases the wearer's Energy Regeneration Rate by 5%. When the wearer's SPD reaches 120 or higher, the wearer's action is Advanced Forward by 40% immediately upon entering battle."
    },
    pieces: [
      { type: "Planar Sphere", name: "바커 공의 탄생의 섬", enName: "Vonwacq's Island of Birth" },
      { type: "Link Rope", name: "바커 공의 섬 둘레 해안", enName: "Vonwacq's Islandic Coast" }
    ],
    image: "생명의 바커 공"
  },
  {
    id: "ornament_범은하_상사",
    gameId: "hsr",
    name: "범은하 상사",
    enName: "Pan-Cosmic Commercial Enterprise",
    folderName: "범은하 상사",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 효과 명중이 10% 증가한다. 동시에 장착한 캐릭터의 현재 효과 명중 25%만큼의 공격력이 증가하며 최대 25% 증가한다",
      "en_2piece": "Increases the wearer's Effect Hit Rate by 10%. Meanwhile, the wearer's ATK increases by an amount that is equal to 25% of the current Effect Hit Rate, up to a maximum of 25%."
    },
    pieces: [
      { type: "Planar Sphere", name: "컴퍼니의 거대 기관 본부", enName: "The IPC's Mega HQ" },
      { type: "Link Rope", name: "컴퍼니의 무역 항로", enName: "The IPC's Trade Route" }
    ],
    image: "범은하 상사"
  },
  {
    id: "ornament_천체_차분기관",
    gameId: "hsr",
    name: "천체 차분기관",
    enName: "Celestial Differentiator",
    folderName: "천체 차분기관",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 피해가 16% 증가한다. 장착한 캐릭터의 치명타 피해가 120% 이상일 경우, 전투 진입 후 장착한 캐릭터의 치명타 확률이 60% 증가한다. 첫 공격 발동 후까지 지속하고 종료된다",
      "en_2piece": "Increases the wearer's CRIT DMG by 16%. When the wearer's current CRIT DMG reaches 120% or higher, after entering battle, the wearer's CRIT Rate increases by 60% until the end of their first attack."
    },
    pieces: [
      { type: "Planar Sphere", name: "스크루별의 기계 태양", enName: "Planet Screwllum's Mechanical Sun" },
      { type: "Link Rope", name: "스크루별의 행성 고리", enName: "Planet Screwllum's Ring System" }
    ],
    image: "천체 차분기관"
  },
  {
    id: "ornament_축성가의_벨로보그",
    gameId: "hsr",
    name: "축성가의 벨로보그",
    enName: "Belobog of the Architects",
    folderName: "축성가의 벨로보그",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 방어력이 15% 증가한다. 장착한 캐릭터의 효과 명중이 50% 이상일 경우 방어력이 추가로 15% 증가한다",
      "en_2piece": "Increases the wearer's DEF by 15%. When the wearer's Effect Hit Rate is 50% or higher, the wearer gains an extra 15% DEF."
    },
    pieces: [
      { type: "Planar Sphere", name: "벨로보그 보존의 보루", enName: "Belobog's Fortress of Preservation" },
      { type: "Link Rope", name: "벨로보그 철위대 방어선", enName: "Belobog's Iron Defense" }
    ],
    image: "축성가의 벨로보그"
  },
  {
    id: "ornament_회전을_멈춘_살소토",
    gameId: "hsr",
    name: "회전을 멈춘 살소토",
    enName: "Inert Salsotto",
    folderName: "회전을 멈춘 살소토",
    type: "차원 장신구",
    setEffect: {
      "2piece": "장착한 캐릭터의 치명타 확률이 8% 증가한다. 장착한 캐릭터의 치명타 확률이 50% 이상일 경우, 필살기와 추가 공격이 가하는 피해가 15% 증가한다",
      "en_2piece": "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 50% or higher, the wearer's Ultimate and follow-up attack DMG increases by 15%."
    },
    pieces: [
      { type: "Planar Sphere", name: "살소토의 움직이는 도시", enName: "Salsotto's Moving City" },
      { type: "Link Rope", name: "살소토의명암 경계선", enName: "Salsotto's Terminator Line" }
    ],
    image: "회전을 멈춘 살소토"
  }
];
