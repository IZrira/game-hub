export interface SettingVariant {
  name: string;
  bestRelics: (string | { name: string; note: string })[];
  bestOrnaments: (string | { name: string; note: string })[];
  bestLightCones?: (string | { name: string; note: string })[];
  skillPriority?: string[];
  mainStats: {
    body: string | { value: string; note: string };
    boots: string | { value: string; note: string };
    sphere: string | { value: string; note: string };
    rope: string | { value: string; note: string };
  };
  subStats: string[];
  targetStats: {
    label: string;
    value: string;
    note?: string;
  }[];
}

export interface EidolonVariant {
  name: string;
  labels?: string[]; // Optional labels for efficiency columns (e.g., Light Cone names)
  efficiency: {
    level: number;
    impact: "High" | "Medium" | "Low";
    efficiency1: string;
    efficiency3: string;
    description: string;
  }[];
}

export interface CharacterGuide {
  characterName: string;
  lastUpdated: string;
  patchVersion: string;
  // Variants
  variants?: SettingVariant[];
  eidolonVariants?: EidolonVariant[];
  // 1. 유물 & 장신구 세팅
  bestRelics: (string | { name: string; note: string })[];
  bestOrnaments: (string | { name: string; note: string })[];
  // 2. 권장 주옵션
  mainStats: {
    body: string | { value: string; note: string };
    boots: string | { value: string; note: string };
    sphere: string | { value: string; note: string };
    rope: string | { value: string; note: string };
  };
  // 3. 권장 부옵션
  subStats: string[];
  // 4. 추천 목표 스탯
  targetStats: {
    label: string;
    value: string;
    note?: string;
  }[];
  // 5. 추천 광추
  bestLightCones: (string | { name: string; note: string })[];
  // 6. 행적 우선순위
  skillPriority: string[];
  // 7. 성흔 효율
  recommendedEidolon?: string;
  eidolonEfficiency: {
    level: number;
    impact: "High" | "Medium" | "Low";
    efficiency1: string; // 1인 개체
    efficiency3: string; // 3인 개체
    description: string;
  }[];
}

import { 반디Guide } from './반디';
import { 백로Guide } from './백로';
import { 아케론Guide } from './아케론';
import { 아글라이아Guide } from './아글라이아';
import { 아낙사Guide } from './아낙사';
import { 아처Guide } from './아처';
import { 아젠티Guide } from './아젠티';
import { 아를란Guide } from './아를란';
import { 아스타Guide } from './아스타';
import { 어벤츄린Guide } from './어벤츄린';
import { 블랙스완Guide } from './블랙스완';
import { 블레이드Guide } from './블레이드';
import { 부트힐Guide } from './부트힐';
import { 브로냐Guide } from './브로냐';
import { 카스토리스Guide } from './카스토리스';
import { 케리드라Guide } from './케리드라';
import { 사이퍼Guide } from './사이퍼';
import { 클라라Guide } from './클라라';
import { 키레네Guide } from './키레네';
import { 단항Guide } from './단항';
import { 단항음월Guide } from './단항음월';
import { 단항등황Guide } from './단항등황';
import { 계네빈Guide } from './계네빈';
import { 한아Guide } from './한아';
import { 헤르타Guide } from './헤르타';
import { 히메코Guide } from './히메코';
import { 후크Guide } from './후크';
import { 부현Guide } from './부현';
import { 갤러거Guide } from './갤러거';
import { 게파드Guide } from './게파드';
import { 비소Guide } from './비소';
import { 곽향Guide } from './곽향';
import { 히아킨Guide } from './히아킨';
import { 히실렌스Guide } from './히실렌스';
import { 제이드Guide } from './제이드';
import { 초구Guide } from './초구';
import { 경원Guide } from './경원';
import { 경류Guide } from './경류';
import { 카프카Guide } from './카프카';
import { 영사Guide } from './영사';
import { 루카Guide } from './루카';
import { 나찰Guide } from './나찰';
import { 링스Guide } from './링스';
import { Mar7thGuide } from './Mar7th';
import { 에버나이트Guide } from './에버나이트';
import { Mar7th수렵Guide } from './Mar7th수렵';
import { 미샤Guide } from './미샤';
import { 맥택Guide } from './맥택';
import { 마이데이Guide } from './마이데이';
import { 나타샤Guide } from './나타샤';
import { 페라Guide } from './페라';
import { 파이논물리Guide } from './파이논물리';
import { 청작Guide } from './청작';
import { 로빈Guide } from './로빈';
import { 완매Guide } from './완매';
import { 파이논바람Guide } from './파이논바람';
import { 삼포Guide } from './삼포';
import { 제레Guide } from './제레';
import { 서벌Guide } from './서벌';
import { 은랑Guide } from './은랑';
import { 스파클Guide } from './스파클';
import { 스파키Guide } from './스파키';
import { 선데이Guide } from './선데이';
import { 소상Guide } from './소상';
import { 달리아Guide } from './달리아';
import { 팅운Guide } from './팅운';
import { 연경Guide } from './연경';
import { 유니Guide } from './유니';
import { 어공Guide } from './어공';
import { 라파Guide } from './라파';
import { 닥터레이시오Guide } from './닥터레이시오';
import { 정운SPGuide } from './정운SP';
import { 야오광Guide } from './야오광';
import { 트리비Guide } from './트리비';
import { 개척자화합Guide } from './개척자화합';
import { 개척자기억Guide } from './개척자기억';
import { 토파즈복순이Guide } from './토파즈복순이';
import { 설의Guide } from './설의';
import { 웰트Guide } from './웰트';
import { 정운Guide } from './정운';
import { 단항불멸의거목Guide } from './단항불멸의거목';
import { 하이실렌스Guide } from './하이실렌스';
import { 세리드라Guide } from './세리드라';
import { 세이버Guide } from './세이버';
import { 카스토리체Guide } from './카스토리체';
import { 메모리헤르타Guide } from './메모리헤르타';
import { 개척자보존Guide } from './개척자보존';
import { 개척자파멸Guide } from './개척자파멸';
import { 효광Guide } from './효광';
import { 더헤르타Guide } from './더헤르타';
import { 망귀인Guide } from './망귀인';
import { 운리Guide } from './운리';
import { 애쉬베일Guide } from './애쉬베일';
import { 은랑LV999Guide } from './은랑LV999';
export interface SettingVariant {
  name: string;
  bestRelics: (string | { name: string; note: string })[];
  bestOrnaments: (string | { name: string; note: string })[];
  bestLightCones?: (string | { name: string; note: string })[];
  skillPriority?: string[];
  mainStats: {
    body: string | { value: string; note: string };
    boots: string | { value: string; note: string };
    sphere: string | { value: string; note: string };
    rope: string | { value: string; note: string };
  };
  subStats: string[];
  targetStats: {
    label: string;
    value: string;
    note?: string;
  }[];
}

export interface EidolonVariant {
  name: string;
  labels?: string[]; // Optional labels for efficiency columns (e.g., Light Cone names)
  efficiency: {
    level: number;
    impact: "High" | "Medium" | "Low";
    efficiency1: string;
    efficiency3: string;
    description: string;
  }[];
}

export interface CharacterGuide {
  characterName: string;
  lastUpdated: string;
  patchVersion: string;
  // Variants
  variants?: SettingVariant[];
  eidolonVariants?: EidolonVariant[];
  // 1. 유물 & 장신구 세팅
  bestRelics: (string | { name: string; note: string })[];
  bestOrnaments: (string | { name: string; note: string })[];
  // 2. 권장 주옵션
  mainStats: {
    body: string | { value: string; note: string };
    boots: string | { value: string; note: string };
    sphere: string | { value: string; note: string };
    rope: string | { value: string; note: string };
  };
  // 3. 권장 부옵션
  subStats: string[];
  // 4. 추천 목표 스탯
  targetStats: {
    label: string;
    value: string;
    note?: string;
  }[];
  // 5. 추천 광추
  bestLightCones: (string | { name: string; note: string })[];
  // 6. 행적 우선순위
  skillPriority: string[];
  // 7. 성흔 효율
  recommendedEidolon?: string;
  eidolonEfficiency: {
    level: number;
    impact: "High" | "Medium" | "Low";
    efficiency1: string; // 1인 개체
    efficiency3: string; // 3인 개체
    description: string;
  }[];
}

import { 반디Guide } from './반디';
import { 백로Guide } from './백로';
import { 아케론Guide } from './아케론';
import { 아글라이아Guide } from './아글라이아';
import { 아낙사Guide } from './아낙사';
import { 아처Guide } from './아처';
import { 아젠티Guide } from './아젠티';
import { 아를란Guide } from './아를란';
import { 아스타Guide } from './아스타';
import { 어벤츄린Guide } from './어벤츄린';
import { 블랙스완Guide } from './블랙스완';
import { 블레이드Guide } from './블레이드';
import { 부트힐Guide } from './부트힐';
import { 브로냐Guide } from './브로냐';
import { 카스토리스Guide } from './카스토리스';
import { 케리드라Guide } from './케리드라';
import { 사이퍼Guide } from './사이퍼';
import { 클라라Guide } from './클라라';
import { 키레네Guide } from './키레네';
import { 단항Guide } from './단항';
import { 단항음월Guide } from './단항음월';
import { 단항등황Guide } from './단항등황';
import { 계네빈Guide } from './계네빈';
import { 한아Guide } from './한아';
import { 헤르타Guide } from './헤르타';
import { 히메코Guide } from './히메코';
import { 후크Guide } from './후크';
import { 부현Guide } from './부현';
import { 갤러거Guide } from './갤러거';
import { 게파드Guide } from './게파드';
import { 비소Guide } from './비소';
import { 곽향Guide } from './곽향';
import { 히아킨Guide } from './히아킨';
import { 히실렌스Guide } from './히실렌스';
import { 제이드Guide } from './제이드';
import { 초구Guide } from './초구';
import { 경원Guide } from './경원';
import { 경류Guide } from './경류';
import { 카프카Guide } from './카프카';
import { 영사Guide } from './영사';
import { 루카Guide } from './루카';
import { 나찰Guide } from './나찰';
import { 링스Guide } from './링스';
import { Mar7thGuide } from './Mar7th';
import { 에버나이트Guide } from './에버나이트';
import { Mar7th수렵Guide } from './Mar7th수렵';
import { 미샤Guide } from './미샤';
import { 맥택Guide } from './맥택';
import { 마이데이Guide } from './마이데이';
import { 나타샤Guide } from './나타샤';
import { 페라Guide } from './페라';
import { 파이논물리Guide } from './파이논물리';
import { 청작Guide } from './청작';
import { 로빈Guide } from './로빈';
import { 완매Guide } from './완매';
import { 파이논바람Guide } from './파이논바람';
import { 삼포Guide } from './삼포';
import { 제레Guide } from './제레';
import { 서벌Guide } from './서벌';
import { 은랑Guide } from './은랑';
import { 스파클Guide } from './스파클';
import { 스파키Guide } from './스파키';
import { 선데이Guide } from './선데이';
import { 소상Guide } from './소상';
import { 달리아Guide } from './달리아';
import { 팅운Guide } from './팅운';
import { 연경Guide } from './연경';
import { 유니Guide } from './유니';
import { 어공Guide } from './어공';
import { 라파Guide } from './라파';
import { 닥터레이시오Guide } from './닥터레이시오';
import { 정운SPGuide } from './정운SP';
import { 야오광Guide } from './야오광';
import { 트리비Guide } from './트리비';
import { 개척자화합Guide } from './개척자화합';
import { 개척자기억Guide } from './개척자기억';
import { 토파즈복순이Guide } from './토파즈복순이';
import { 설의Guide } from './설의';
import { 웰트Guide } from './웰트';
import { 정운Guide } from './정운';
import { 단항불멸의거목Guide } from './단항불멸의거목';
import { 하이실렌스Guide } from './하이실렌스';
import { 세리드라Guide } from './세리드라';
import { 세이버Guide } from './세이버';
import { 카스토리체Guide } from './카스토리체';
import { 메모리헤르타Guide } from './메모리헤르타';
import { 개척자보존Guide } from './개척자보존';
import { 개척자파멸Guide } from './개척자파멸';
import { 효광Guide } from './효광';
import { 더헤르타Guide } from './더헤르타';
import { 망귀인Guide } from './망귀인';
import { 운리Guide } from './운리';
import { 애쉬베일Guide } from './애쉬베일';
import { 은랑LV999Guide } from './은랑LV999';
import { 에바네시아Guide } from './에바네시아';
import { 개척자환락Guide } from './개척자환락';
import { 천야블레이드Guide } from './천야블레이드';
import { 히메코노바Guide } from './히메코노바';
import { 토오사카린Guide } from './토오사카린';
import { 길가메시Guide } from './길가메시';

export const HSR_CHARACTER_GUIDES: CharacterGuide[] = [
  길가메시Guide,
  토오사카린Guide,
  히메코노바Guide,
  천야블레이드Guide,
  반디Guide,
  백로Guide,
  아케론Guide,
  아글라이아Guide,
  아낙사Guide,
  아처Guide,
  아젠티Guide,
  아를란Guide,
  아스타Guide,
  어벤츄린Guide,
  블랙스완Guide,
  블레이드Guide,
  부트힐Guide,
  브로냐Guide,
  카스토리스Guide,
  케리드라Guide,
  사이퍼Guide,
  클라라Guide,
  키레네Guide,
  단항Guide,
  단항음월Guide,
  단항등황Guide,
  계네빈Guide,
  한아Guide,
  헤르타Guide,
  히메코Guide,
  후크Guide,
  부현Guide,
  갤러거Guide,
  게파드Guide,
  비소Guide,
  곽향Guide,
  히아킨Guide,
  히실렌스Guide,
  제이드Guide,
  초구Guide,
  경원Guide,
  경류Guide,
  카프카Guide,
  영사Guide,
  루카Guide,
  나찰Guide,
  링스Guide,
  Mar7thGuide,
  에버나이트Guide,
  Mar7th수렵Guide,
  미샤Guide,
  맥택Guide,
  마이데이Guide,
  나타샤Guide,
  페라Guide,
  파이논물리Guide,
  청작Guide,
  로빈Guide,
  완매Guide,
  파이논바람Guide,
  삼포Guide,
  제레Guide,
  서벌Guide,
  은랑Guide,
  스파클Guide,
  스파키Guide,
  선데이Guide,
  소상Guide,
  달리아Guide,
  팅운Guide,
  연경Guide,
  유니Guide,
  어공Guide,
  라파Guide,
  닥터레이시오Guide,
  정운SPGuide,
  야오광Guide,
  트리비Guide,
  개척자화합Guide,
  개척자기억Guide,
  토파즈복순이Guide,
  설의Guide,
  웰트Guide,
  정운Guide,
  단항불멸의거목Guide,
  하이실렌스Guide,
  세리드라Guide,
  세이버Guide,
  카스토리체Guide,
  메모리헤르타Guide,
  개척자보존Guide,
  개척자파멸Guide,
  효광Guide,
  더헤르타Guide,
  망귀인Guide,
  운리Guide,
  애쉬베일Guide,
  은랑LV999Guide,
  에바네시아Guide,
  개척자환락Guide
];
