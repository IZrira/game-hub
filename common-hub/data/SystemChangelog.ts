export interface ChangelogEntry {
  date: string;
  category: 'Update' | 'Notice' | 'Patch' | 'System';
  title: string;
  content: string[]; // 여러 줄의 내용을 배열로 관리
  isHot?: boolean;   // 신규 표시 여부
}

export const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    date: "2026-04-28",
    category: "Update",
    title: "RIRA Game Hub v1.0 정식 오픈 및 통합 아카이브 고도화",
    content: [
      "통합 검색 기능(Search) 도입: 전 아카이브 캐릭터/광추/아이템 실시간 검색 지원",
      "북마크 & 즐겨찾기(Bookmark) 시스템 구축: 나만의 조합 및 가이드 저장 가능",
      "공지사항 시스템 DB(Supabase) 연동: 실시간 공지 업데이트 및 관리자 기능 추가",
      "관리자 전용 대시보드(/admin) 구축: 웹 UI 기반 데이터 및 공지사항 관리 지원",
      "프리미엄 UI/UX 최적화: Glassmorphism 디자인 강화 및 전역 애니메이션 적용",
      "스타레일(HSR): v4.0 ~ v4.2 대규모 데이터 업데이트 완료",
      "명조(WW): 기본 시스템 구축 및 데이터 최적화 진행 중"
    ],
    isHot: true
  },
  {
    date: "2026-04-19",
    category: "Notice",
    title: "SQL 기반 데이터베이스 전환 완료",
    content: [
      "정적 데이터 시스템에서 PostgreSQL(Supabase) 기반의 동적 시스템으로 전환",
      "데이터 정밀도 향상 및 실시간 데이터 무결성 검사 시스템 도입"
    ]
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
  }
];