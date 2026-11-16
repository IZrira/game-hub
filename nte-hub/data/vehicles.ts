export interface NTEVehiclePerformance {
  shiftTime: number;
  suspensionHeight: number;
  suspensionDamping: number;
  handbrake: number;
  braking: number;
}

export interface NTEVehicle {
  id: string;
  name: string;
  imageFileName: string | null;
  imageUrl?: string;
  category: '오토바이 · ATV · 자전거' | '지상 이동 수단' | '수상 이동 수단' | '기타' | '구매 불가 지상 이동수단' | '구매 불가 수상 이동수단';
  manufacturer: '노버스' | '레갈리아' | 'TerraX' | "Hikari's" | '란드릭' | '오리컬코스' | 'Porsche' | null;
  type: '자동차' | '오토바이' | '모페드' | '자전거' | '듄 버기' | '수상 바이크' | '휠체어' | '카트' | '밴' | '전차' | '트럭' | '놀이기구 자동차' | '중장비' | '버스' | '택시' | '경찰차' | '보트';
  description: string;
  topSpeed: number | null;
  acceleration: number | null;
  durability: number | null;
  acquisition: string;
  availability?: '출시 예정';
  ownership?: '구매 불가';
  releaseVersion?: string;
  performance?: NTEVehiclePerformance;
}

export const NTE_VEHICLES: NTEVehicle[] = [
  {
    "id": "c2000",
    "name": "C2000",
    "imageFileName": "C2000",
    "category": "지상 이동 수단",
    "manufacturer": "노버스",
    "type": "자동차",
    "description": "우수한 경제성과 뛰어난 성능을 조화시킨 노버스 차량. 넓고 쾌적한 승차감과 효율적인 동력 시스템으로 안정적인 주행 경험을 제공한다.",
    "topSpeed": 130,
    "acceleration": 3,
    "durability": 17000,
    "acquisition": "노버스에서 구매 (50,000 폰즈)",
    "performance": {
      "shiftTime": 4,
      "suspensionHeight": 5,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 3
    }
  },
  {
    "id": "m1000",
    "name": "M1000",
    "imageFileName": "M1000",
    "category": "지상 이동 수단",
    "manufacturer": "노버스",
    "type": "자동차",
    "description": "컴팩트한 차체와 유연한 조작감을 갖춰 혼잡한 도심에서도 여유롭게 주행할 수 있는 노버스 차량.",
    "topSpeed": 146,
    "acceleration": 5,
    "durability": 18000,
    "acquisition": "노버스에서 구매 (350,000 폰즈)",
    "performance": {
      "shiftTime": 5,
      "suspensionHeight": 5,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 4
    }
  },
  {
    "id": "st79",
    "name": "ST79",
    "imageFileName": "ST79",
    "category": "지상 이동 수단",
    "manufacturer": "노버스",
    "type": "자동차",
    "description": "단순하고 실용적인 기계 구조에 레트로 외관과 메카닉 감성의 트랜스미션을 결합한 차량.",
    "topSpeed": 155,
    "acceleration": 5,
    "durability": 19000,
    "acquisition": "노버스에서 구매 (600,000 폰즈)",
    "performance": {
      "shiftTime": 5,
      "suspensionHeight": 5,
      "suspensionDamping": 5,
      "handbrake": 0,
      "braking": 4
    }
  },
  {
    "id": "enforcer",
    "name": "Enforcer",
    "imageFileName": "Enforcer",
    "category": "지상 이동 수단",
    "manufacturer": "노버스",
    "type": "자동차",
    "description": "강렬한 차체 라인과 강력한 성능, 견고한 내구성을 앞세운 고성능 차량.",
    "topSpeed": 172,
    "acceleration": 6,
    "durability": 18700,
    "acquisition": "노버스에서 구매 (1,720,000 폰즈)",
    "performance": {
      "shiftTime": 6,
      "suspensionHeight": 7,
      "suspensionDamping": 2,
      "handbrake": 8,
      "braking": 6
    }
  },
  {
    "id": "griffin",
    "name": "Griffin",
    "imageFileName": "Griffin",
    "category": "지상 이동 수단",
    "manufacturer": "레갈리아",
    "type": "자동차",
    "description": "레갈리아의 장인정신과 첨단 기술을 집약한 차량. 최신 주행 보조·인포테인먼트 시스템과 유선형 차체, 팝업 헤드라이트가 특징이다.",
    "topSpeed": 170,
    "acceleration": 6,
    "durability": 16000,
    "acquisition": "레갈리아에서 구매 (1,500,000 폰즈)",
    "performance": {
      "shiftTime": 6,
      "suspensionHeight": 4,
      "suspensionDamping": 6,
      "handbrake": 4,
      "braking": 0
    }
  },
  {
    "id": "griffin-volante",
    "name": "Griffin Volante",
    "imageFileName": "Griffin Volante",
    "category": "지상 이동 수단",
    "manufacturer": "레갈리아",
    "type": "자동차",
    "description": "공기역학과 미학을 함께 살린 레갈리아의 최신 오픈카. 개방형 차체로 도심 주행의 자유로움을 강조한다.",
    "topSpeed": 170,
    "acceleration": 6,
    "durability": 16000,
    "acquisition": "레갈리아에서 구매 (1,800,000 폰즈)",
    "performance": {
      "shiftTime": 6,
      "suspensionHeight": 4,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 4
    }
  },
  {
    "id": "lavelox",
    "name": "LaVelox",
    "imageFileName": "LaVelox",
    "category": "지상 이동 수단",
    "manufacturer": "레갈리아",
    "type": "자동차",
    "description": "하이브리드 시스템과 첨단 엔진, 최신 소재를 결합해 슈퍼카의 기준을 새롭게 제시한 차량.",
    "topSpeed": 197,
    "acceleration": 8,
    "durability": 15000,
    "acquisition": "레갈리아에서 구매 (10,800,000 폰즈)",
    "performance": {
      "shiftTime": 9,
      "suspensionHeight": 4,
      "suspensionDamping": 8,
      "handbrake": 0,
      "braking": 8
    }
  },
  {
    "id": "pursuit-v8",
    "name": "Pursuit V8",
    "imageFileName": "Pursuit V8",
    "category": "지상 이동 수단",
    "manufacturer": "레갈리아",
    "type": "자동차",
    "description": "정교한 사륜구동 시스템과 묵직한 엔진음으로 기계 장치 특유의 주행 감각을 살린 차량.",
    "topSpeed": 180,
    "acceleration": 7,
    "durability": 16000,
    "acquisition": "레갈리아에서 구매 (4,000,000 폰즈)",
    "performance": {
      "shiftTime": 6,
      "suspensionHeight": 6,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 7
    }
  },
  {
    "id": "pendragon",
    "name": "Pendragon",
    "imageFileName": "Pendragon",
    "category": "지상 이동 수단",
    "manufacturer": "레갈리아",
    "type": "자동차",
    "description": "혁신적인 기술을 바탕으로 슈퍼카의 새로운 영역에 도전하는 레갈리아의 미래 지향형 차량.",
    "topSpeed": 202,
    "acceleration": 9,
    "durability": 13850,
    "acquisition": "레갈리아에서 구매 (12,000,000 폰즈)",
    "performance": {
      "shiftTime": 8,
      "suspensionHeight": 5,
      "suspensionDamping": 5,
      "handbrake": 8,
      "braking": 7
    }
  },
  {
    "id": "novis-st-x-950",
    "name": "Novis ST-X 950",
    "imageFileName": "Novis ST-X 950",
    "category": "오토바이 · ATV · 자전거",
    "manufacturer": "레갈리아",
    "type": "오토바이",
    "description": "슈퍼카의 혈통을 계승하고 고성능 엔진을 탑재해 가속할 때마다 새로운 한계에 도전하는 차량.",
    "topSpeed": 140,
    "acceleration": 6,
    "durability": 4400,
    "acquisition": "레갈리아에서 구매 (250,000 폰즈)",
    "performance": {
      "shiftTime": 8,
      "suspensionHeight": 5,
      "suspensionDamping": 5,
      "handbrake": 8,
      "braking": 6
    }
  },
  {
    "id": "blizzard-v4",
    "name": "Blizzard-V4",
    "imageFileName": "Blizzard-V4",
    "category": "오토바이 · ATV · 자전거",
    "manufacturer": "레갈리아",
    "type": "오토바이",
    "description": "독보적인 공기역학 디자인과 고성능 동력 시스템을 갖춘 레갈리아의 신형 오토바이. 전문 레이서를 위해 제작되었다.",
    "topSpeed": 180,
    "acceleration": 7,
    "durability": 5400,
    "acquisition": "레갈리아에서 구매 (2,450,000 폰즈)",
    "performance": {
      "shiftTime": 10,
      "suspensionHeight": 5,
      "suspensionDamping": 4,
      "handbrake": 9,
      "braking": 7
    }
  },
  {
    "id": "g3",
    "name": "G3",
    "imageFileName": "G3",
    "category": "지상 이동 수단",
    "manufacturer": "TerraX",
    "type": "자동차",
    "description": "강인한 외관과 최첨단 사륜구동 시스템, 고급스러운 실내를 갖춰 비즈니스와 여가 모두에 대응하는 차량.",
    "topSpeed": 138,
    "acceleration": 4,
    "durability": 36650,
    "acquisition": "TerraX에서 구매 (200,000 폰즈)",
    "performance": {
      "shiftTime": 3,
      "suspensionHeight": 7,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 5
    }
  },
  {
    "id": "rover-a1",
    "name": "Rover A1",
    "imageFileName": "Rover A1",
    "category": "오토바이 · ATV · 자전거",
    "manufacturer": null,
    "type": "모페드",
    "description": "가벼운 차체와 높은 에너지 효율을 갖춘 친환경 차량으로 단거리 통근에 적합하다.",
    "topSpeed": 40,
    "acceleration": 2,
    "durability": null,
    "acquisition": "본편 「서장-하 장사꾼과 복덩이-귀가」 시작 후 획득",
    "performance": {
      "shiftTime": 0,
      "suspensionHeight": 2,
      "suspensionDamping": 2,
      "handbrake": 6,
      "braking": 5
    }
  },
  {
    "id": "tomorrow-rush",
    "name": "미래로 질주!",
    "imageFileName": "Tomorrow Rush",
    "category": "지상 이동 수단",
    "manufacturer": null,
    "type": "휠체어",
    "description": "「집사」 Mr.데이비드의 차세대 신개념 탈것. 향후 내연기관, 밀폐형 캐빈과 통일된 타이어 규격을 적용할 계획인 실험적 모델이다.",
    "topSpeed": 50,
    "acceleration": 2,
    "durability": 5400,
    "acquisition": "핑크퍼스 본점에서 교환 (30,000 발바닥 코인)",
    "performance": {
      "shiftTime": 0,
      "suspensionHeight": 1,
      "suspensionDamping": 9,
      "handbrake": 7,
      "braking": 5
    }
  },
  {
    "id": "b100",
    "name": "B100",
    "imageFileName": "B100",
    "category": "지상 이동 수단",
    "manufacturer": "노버스",
    "type": "자동차",
    "description": "경량 차체와 낮은 무게중심 설계를 통해 안정적이면서 날카로운 핸들링을 구현한 Novus의 신형 차량.",
    "topSpeed": 132,
    "acceleration": 4,
    "durability": 14600,
    "acquisition": "핑크퍼스에서 교환 (20,000 발바닥 코인)",
    "performance": {
      "shiftTime": 5,
      "suspensionHeight": 4,
      "suspensionDamping": 7,
      "handbrake": 4,
      "braking": 4
    }
  },
  {
    "id": "k01",
    "name": "K01",
    "imageFileName": "K01",
    "category": "지상 이동 수단",
    "manufacturer": null,
    "type": "카트",
    "description": "질소 부스트 기능을 갖춘 카트형 이동 수단. 최고 속도는 부스트를 사용하지 않는 상태의 수치다.",
    "topSpeed": 80,
    "acceleration": 8,
    "durability": 7200,
    "acquisition": "마켓에서 구매 (6,800,000 폰즈 또는 32,000원)",
    "performance": {
      "shiftTime": 10,
      "suspensionHeight": 2,
      "suspensionDamping": 9,
      "handbrake": 9,
      "braking": 7
    }
  },
  {
    "id": "porsche-918-spyder",
    "name": "Porsche 918 Spyder",
    "imageFileName": "Porsche 918 Spyder",
    "category": "지상 이동 수단",
    "manufacturer": "Porsche",
    "type": "자동차",
    "description": "시대를 앞서가는 미래 지향적 외관과 독보적인 주행 성능을 갖춘 Porsche 컬래버 한정 슈퍼카.",
    "topSpeed": 212,
    "acceleration": 10,
    "durability": 18200,
    "acquisition": "「광란의 질주」 블라인드 박스에서 획득",
    "performance": {
      "shiftTime": 8,
      "suspensionHeight": 4,
      "suspensionDamping": 8,
      "handbrake": 0,
      "braking": 6
    }
  },
  {
    "id": "draco",
    "name": "Draco",
    "imageFileName": "Draco",
    "category": "오토바이 · ATV · 자전거",
    "manufacturer": "레갈리아",
    "type": "오토바이",
    "description": "도로의 한계를 벗어난 독특한 디자인의 컬래버 오토바이. 점프와 좌우 이동이 가능해 높은 기동성을 발휘한다.",
    "topSpeed": 180,
    "acceleration": 7,
    "durability": null,
    "acquisition": "「훼손된 네온」 블라인드 박스에서 획득",
    "performance": {
      "shiftTime": 10,
      "suspensionHeight": 2,
      "suspensionDamping": 7,
      "handbrake": 9,
      "braking": 9
    }
  },
  {
    "id": "yesteryear",
    "name": "「옛 시절」",
    "imageFileName": null,
    "imageUrl": "/assets/nte/vehicles/yesteryear.webp",
    "category": "오토바이 · ATV · 자전거",
    "manufacturer": "란드릭",
    "type": "자전거",
    "description": "두 사람이 함께 탑승할 수 있는 2인용 자전거형 이동 수단. 페달링으로 최대 70 km/h까지 가속할 수 있다.",
    "topSpeed": 30,
    "acceleration": 3,
    "durability": 4400,
    "acquisition": "자전거 매장 Ticking Back에서 구매 (800,000 폰즈)",
    "performance": {
      "shiftTime": 0,
      "suspensionHeight": 1,
      "suspensionDamping": 1,
      "handbrake": 0,
      "braking": 3
    }
  },
  {
    "id": "sirocco",
    "name": "「열풍」",
    "imageFileName": null,
    "imageUrl": "/assets/nte/vehicles/sirocco.webp",
    "category": "오토바이 · ATV · 자전거",
    "manufacturer": "TerraX",
    "type": "듄 버기",
    "description": "비포장 지형 주행에 어울리는 TerraX 계열의 듄 버기.",
    "topSpeed": 95,
    "acceleration": 7,
    "durability": 9150,
    "acquisition": "TerraX에서 구매 (4,000,000 폰즈)",
    "performance": {
      "shiftTime": 10,
      "suspensionHeight": 6,
      "suspensionDamping": 6,
      "handbrake": 7,
      "braking": 7
    }
  },
  {
    "id": "tide",
    "name": "Tide",
    "imageFileName": null,
    "imageUrl": "/assets/nte/vehicles/tide.webp",
    "category": "수상 이동 수단",
    "manufacturer": "Hikari's",
    "type": "수상 바이크",
    "description": "수면 위를 빠르게 이동할 수 있는 최초의 수상 이동 수단. 점프가 가능하며 히카리 조선소에서 튜닝할 수 있다.",
    "topSpeed": 108,
    "acceleration": 5,
    "durability": null,
    "acquisition": "「빛을 좇는 파도」 블라인드 박스에서 획득",
    "performance": {
      "shiftTime": 0,
      "suspensionHeight": 0,
      "suspensionDamping": 0,
      "handbrake": 0,
      "braking": 0
    }
  },
  {
    "id": "porsche-taycan-turbo-gt",
    "name": "Porsche Taycan Turbo GT with Weissach Package",
    "imageFileName": null,
    "imageUrl": "/assets/nte/vehicles/porsche-taycan-turbo-gt.webp",
    "category": "지상 이동 수단",
    "manufacturer": "Porsche",
    "type": "자동차",
    "description": "Weissach Package를 적용해 고성능 주행에 초점을 맞춘 Porsche 컬래버 전기 스포츠카.",
    "topSpeed": 193,
    "acceleration": 9,
    "durability": 20500,
    "acquisition": "「폭주의 그림자」 블라인드 박스에서 획득",
    "performance": {
      "shiftTime": 10,
      "suspensionHeight": 4,
      "suspensionDamping": 8,
      "handbrake": 3,
      "braking": 6
    }
  },
  {
    "id": "porsche-911-turbo-930",
    "name": "Porsche 911 Turbo (930)",
    "imageFileName": null,
    "imageUrl": "/assets/nte/vehicles/porsche-911-turbo-930.webp",
    "category": "지상 이동 수단",
    "manufacturer": "Porsche",
    "type": "자동차",
    "description": "Porsche 컬래버로 공개된 클래식 스포츠카.",
    "topSpeed": 186,
    "acceleration": 7,
    "durability": 16750,
    "acquisition": "「폭주의 그림자」 블라인드 박스에서 획득",
    "performance": {
      "shiftTime": 6,
      "suspensionHeight": 4,
      "suspensionDamping": 6,
      "handbrake": 6,
      "braking": 6
    }
  },
  {
    "id": "a001",
    "name": "A001",
    "manufacturer": "노버스",
    "type": "밴",
    "category": "지상 이동 수단",
    "acquisition": "노버스에서 구매 (500,000 폰즈)",
    "description": "환자 이송에 사용하는 노버스 구급 밴.",
    "imageFileName": null,
    "topSpeed": 148,
    "acceleration": 3,
    "durability": 17600,
    "performance": {
      "shiftTime": 40,
      "suspensionHeight": 0,
      "suspensionDamping": 0,
      "handbrake": 0,
      "braking": 30
    },
    "imageUrl": "/assets/nte/vehicles/a001.webp"
  },
  {
    "id": "e001",
    "name": "E001",
    "manufacturer": "노버스",
    "type": "밴",
    "category": "지상 이동 수단",
    "acquisition": "노버스에서 구매 (500,000 폰즈)",
    "description": "수감자 이송에 사용하는 노버스 밴.",
    "imageFileName": null,
    "topSpeed": 145,
    "acceleration": 3,
    "durability": 19600,
    "performance": {
      "shiftTime": 4,
      "suspensionHeight": 0,
      "suspensionDamping": 0,
      "handbrake": 0,
      "braking": 3
    },
    "imageUrl": "/assets/nte/vehicles/e001.webp"
  },
  {
    "id": "c001",
    "name": "C001",
    "manufacturer": "노버스",
    "type": "밴",
    "category": "지상 이동 수단",
    "acquisition": "쿠바 교환 코인 12,000개로 교환",
    "description": "귀중품 운송에 사용하는 보안업체 밴.",
    "imageFileName": null,
    "topSpeed": 145,
    "acceleration": 3,
    "durability": 19600,
    "performance": {
      "shiftTime": 40,
      "suspensionHeight": 0,
      "suspensionDamping": 0,
      "handbrake": 0,
      "braking": 30
    },
    "imageUrl": "/assets/nte/vehicles/c001.webp"
  },
  {
    "id": "steel-tank",
    "name": "철강호",
    "manufacturer": "TerraX",
    "type": "전차",
    "category": "지상 이동 수단",
    "acquisition": "「가는 길마다 탄탄대로」 블라인드 박스에서 획득",
    "description": "포격 기능을 갖춘 전차형 이동 수단.",
    "imageFileName": null,
    "topSpeed": 35,
    "acceleration": 3,
    "durability": 45000,
    "performance": {
      "shiftTime": 4,
      "suspensionHeight": 60,
      "suspensionDamping": 40,
      "handbrake": 1,
      "braking": 6
    },
    "imageUrl": "/assets/nte/vehicles/steel-tank.webp"
  },
  {
    "id": "ori-tt01",
    "name": "Ori-TT01",
    "manufacturer": "오리컬코스",
    "type": "트럭",
    "category": "지상 이동 수단",
    "acquisition": "오리컬코스에서 구매 (400,000 폰즈)",
    "description": "차량 견인과 사고 수습에 사용하는 구난 트럭.",
    "imageFileName": null,
    "topSpeed": 95,
    "acceleration": 4,
    "durability": 27500,
    "performance": {
      "shiftTime": 3,
      "suspensionHeight": 7,
      "suspensionDamping": 60,
      "handbrake": 0,
      "braking": 40
    },
    "imageUrl": "/assets/nte/vehicles/ori-tt01.webp"
  },
  {
    "id": "ori-lv01",
    "name": "Ori-LV01",
    "manufacturer": "오리컬코스",
    "type": "트럭",
    "category": "지상 이동 수단",
    "acquisition": "도시 타이쿤 물류센터 개방 시 획득",
    "description": "물류센터의 소형 화물 운송에 사용하는 트럭.",
    "imageFileName": null,
    "topSpeed": 100,
    "acceleration": 4,
    "durability": 17200,
    "performance": {
      "shiftTime": 3,
      "suspensionHeight": 7,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 4
    },
    "imageUrl": "/assets/nte/vehicles/ori-lv01.webp"
  },
  {
    "id": "ori-lv03",
    "name": "Ori-LV03",
    "manufacturer": "오리컬코스",
    "type": "트럭",
    "category": "지상 이동 수단",
    "acquisition": "도시 타이쿤 물류센터 레벨 16 달성 시 획득",
    "description": "물류센터의 대형 화물 운송에 사용하는 트럭.",
    "imageFileName": null,
    "topSpeed": 90,
    "acceleration": 4,
    "durability": 26450,
    "performance": {
      "shiftTime": 3,
      "suspensionHeight": 7,
      "suspensionDamping": 6,
      "handbrake": 0,
      "braking": 4
    },
    "imageUrl": "/assets/nte/vehicles/ori-lv03.webp"
  },
  {
    "id": "land-ruler-001",
    "name": "육지의 지배자 001 시제품",
    "manufacturer": "Hikari's",
    "type": "놀이기구 자동차",
    "category": "지상 이동 수단",
    "acquisition": "「가는 길마다 탄탄대로」 블라인드 박스에서 획득",
    "description": "폰즈를 소모하는 부스트 기능이 있는 놀이기구형 자동차.",
    "imageFileName": null,
    "topSpeed": 60,
    "acceleration": 8,
    "durability": 9150,
    "performance": {
      "shiftTime": 8,
      "suspensionHeight": 2,
      "suspensionDamping": 3,
      "handbrake": 7,
      "braking": 8
    },
    "releaseVersion": "1.6",
    "imageUrl": "/assets/nte/vehicles/land-ruler-001.webp"
  },
  {
    "id": "row-toward-tomorrow",
    "name": "「미래로 저어라!」",
    "manufacturer": null,
    "type": "보트",
    "category": "수상 이동 수단",
    "acquisition": "푸카 스타 쿠폰 10,000개로 교환",
    "description": "노를 저어 이동하는 보트형 이동 수단.",
    "imageFileName": null,
    "topSpeed": 45,
    "acceleration": 4,
    "durability": null,
    "performance": {
      "shiftTime": 0,
      "suspensionHeight": 0,
      "suspensionDamping": 0,
      "handbrake": 0,
      "braking": 0
    },
    "imageUrl": "/assets/nte/vehicles/row-toward-tomorrow.webp"
  },
  {
    "id": "npc-light-truck",
    "name": "경형트럭",
    "manufacturer": "오리컬코스",
    "type": "트럭",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 필드 및 배달 임무에서 이용",
    "description": "기본형·카고·탑차·공사 차량 등의 형태가 있는 소형 트럭.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-light-truck.webp"
  },
  {
    "id": "npc-food-truck",
    "name": "푸드트럭",
    "manufacturer": null,
    "type": "트럭",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 필드에서 발견",
    "description": "아이스크림·핫도그 판매용으로 꾸민 푸드트럭.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-food-truck.webp"
  },
  {
    "id": "npc-heavy-truck",
    "name": "대형트럭",
    "manufacturer": "오리컬코스",
    "type": "트럭",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 필드에서 발견",
    "description": "덤프트럭·믹서트럭 등 공사 현장에서 사용하는 대형 차량.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-heavy-truck.webp"
  },
  {
    "id": "npc-forklift",
    "name": "지게차",
    "manufacturer": null,
    "type": "중장비",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 필드에서 발견",
    "description": "포크를 조절할 수 있는 후륜 조향 지게차.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-forklift.webp"
  },
  {
    "id": "npc-loader",
    "name": "로더",
    "manufacturer": null,
    "type": "중장비",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 어스름 구역 공사장",
    "description": "버킷과 유압 팔을 조작할 수 있는 건설 장비.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-loader.webp"
  },
  {
    "id": "npc-roller",
    "name": "롤러",
    "manufacturer": null,
    "type": "중장비",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 어스름 구역 공사장",
    "description": "지면을 다지는 공사용 롤러.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-roller.webp"
  },
  {
    "id": "npc-excavator",
    "name": "굴착기",
    "manufacturer": null,
    "type": "중장비",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 어스름 구역 공사장",
    "description": "정차 후 작업 모드에서 팔과 버킷을 조작할 수 있는 궤도형 굴착기.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-excavator.webp"
  },
  {
    "id": "npc-city-bus",
    "name": "시내버스",
    "manufacturer": null,
    "type": "버스",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 정류장 및 주차 차량 이용",
    "description": "정류장에서 승객으로 탑승하거나 주차된 차량을 운전할 수 있는 시내버스.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-city-bus.webp"
  },
  {
    "id": "npc-taxi",
    "name": "택시",
    "manufacturer": "노버스",
    "type": "택시",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 필드 및 전용 주차장",
    "description": "C2000을 기반으로 택시 전용 도색과 표시등을 적용한 차량.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-taxi.webp"
  },
  {
    "id": "npc-police-car",
    "name": "경찰차",
    "manufacturer": "노버스",
    "type": "경찰차",
    "category": "구매 불가 지상 이동수단",
    "acquisition": "구매 불가 · 경찰 출동 및 주차 차량",
    "description": "C2000을 기반으로 경광등과 범퍼를 장착한 경찰 차량.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-police-car.webp"
  },
  {
    "id": "npc-small-boat",
    "name": "소형 선박",
    "manufacturer": null,
    "type": "보트",
    "category": "구매 불가 수상 이동수단",
    "acquisition": "구매 불가 · 어스름 구역 호수",
    "description": "선외 엔진 두 개를 장착한 소형 선박.",
    "imageFileName": null,
    "topSpeed": null,
    "acceleration": null,
    "durability": null,
    "ownership": "구매 불가",
    "imageUrl": "/assets/nte/vehicles/npc-small-boat.webp"
  }
];

export const NTE_VEHICLE_TYPES = Array.from(new Set(NTE_VEHICLES.map(vehicle => vehicle.type)));
export const NTE_VEHICLE_CATEGORIES: NTEVehicle['category'][] = ['오토바이 · ATV · 자전거', '지상 이동 수단', '수상 이동 수단', '구매 불가 지상 이동수단', '구매 불가 수상 이동수단', '기타'];
export const NTE_VEHICLE_DISPLAY_ORDER = ["rover-a1","yesteryear","sirocco","novis-st-x-950","blizzard-v4","draco","c2000","m1000","enforcer","st79","b100","a001","e001","c001","griffin","griffin-volante","pursuit-v8","lavelox","pendragon","g3","steel-tank","porsche-918-spyder","porsche-taycan-turbo-gt","porsche-911-turbo-930","ori-tt01","ori-lv01","ori-lv03","land-ruler-001","tomorrow-rush","k01","tide","row-toward-tomorrow","npc-light-truck","npc-food-truck","npc-heavy-truck","npc-forklift","npc-loader","npc-roller","npc-excavator","npc-city-bus","npc-taxi","npc-police-car","npc-small-boat"] as const;

export const NTE_VEHICLE_PERFORMANCE_FIELDS: { key: keyof NTEVehiclePerformance; label: string; low: string; high: string }[] = [
  { key: 'shiftTime', label: '변속 시간', low: '느림', high: '빠름' },
  { key: 'suspensionHeight', label: '서스펜션 높이', low: '낮음', high: '높음' },
  { key: 'suspensionDamping', label: '서스펜션 댐핑', low: '부드러움', high: '딱딱함' },
  { key: 'handbrake', label: '핸드 브레이크', low: '약함', high: '강함' },
  { key: 'braking', label: '제동력', low: '약함', high: '강함' },
];

export const normalizeNTEVehicleCategory = (value: string) => value === '2륜 이동 수단' ? '오토바이 · ATV · 자전거' : value === '4륜 이동 수단' ? '지상 이동 수단' : value;

export function getNTEVehicleGroups(vehicles: NTEVehicle[]) {
  return NTE_VEHICLE_CATEGORIES.flatMap(category => {
    const categoryVehicles = vehicles.filter(vehicle => vehicle.category === category);
    if (!categoryVehicles.length) return [];
    const preferred: Array<NTEVehicle['manufacturer']> = category === '오토바이 · ATV · 자전거'
      ? [null, '란드릭', 'TerraX', '레갈리아']
      : category === '지상 이동 수단' ? ['노버스', '레갈리아', 'TerraX', 'Porsche', '오리컬코스', "Hikari's", null]
      : ["Hikari's", null];
    const manufacturers = [...new Set([...preferred, ...categoryVehicles.map(vehicle => vehicle.manufacturer)])]
      .filter(manufacturer => categoryVehicles.some(vehicle => vehicle.manufacturer === manufacturer));
    return [{ category, groups: manufacturers.map(manufacturer => ({ manufacturer, vehicles: categoryVehicles.filter(vehicle => vehicle.manufacturer === manufacturer) })) }];
  });
}

const VEHICLE_IMAGE_BASE_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/nte%20images/Vehicles';
export const getNTEVehicleImageUrl = (imageFileName: string) =>
  VEHICLE_IMAGE_BASE_URL + '/' + encodeURIComponent(imageFileName + '.webp');
