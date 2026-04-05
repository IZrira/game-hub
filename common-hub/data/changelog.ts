export interface ChangelogEntry {
  date: string;
  category: 'Update' | 'Notice' | 'Patch' | 'System';
  title: string;
  content: string[]; // 여러 줄의 내용을 배열로 관리
  isHot?: boolean;   // 신규 표시 여부
}

export const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    date: "2026-04-05",
    category: "Update",
    title: "통합 아카이브 UI 개편 및 4.1 데이터 적용",
    content: [
      "전체 갤러리 및 카드 UI 무드보드 테마(Glass & Glow) 적용",
      "이미지 지연 로딩(Lazy Load) 및 비동기 렌더링 성능 최적화",
      "붕괴: 스타레일 4.1 신규 광추 추가 및 스킬 설명(1/5중첩) 분리",
      "검색 엔진 최적화(SEO)를 위한 메타 태그 및 구조화 데이터 주입"
    ],
    isHot: true
  },
  {
    date: "2026-04-05",
    category: "Update",
    title: "명조 무기 데이터 대규모 업데이트",
    content: [
      "직검, 대검, 권총 등 전종 무기 90레벨 스탯 추가",
      "무기 상세 페이지 재련(R1~R5) 수치 강조 기능 도입",
      "무기 스토리 원문 데이터 100% 복구 및 적용"
    ]
  },
  {
    date: "2026-04-04",
    category: "Patch",
    title: "시스템 안정화 및 SEO 최적화",
    content: [
      "메타데이터 구조화 데이터(JSON-LD) 주입",
      "모바일 터치 영역 44px 최적화 적용",
      "이미지 레이지 로딩 시스템 도입"
    ]
  }
];