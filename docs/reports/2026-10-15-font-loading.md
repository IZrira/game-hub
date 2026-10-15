# 초기 폰트 요청 정리

## 원인과 변경 범위

초기 HTML은 Noto Sans KR을 지정하지만 앱의 --font-sans는 Inter, ui-sans-serif, system-ui, sans-serif였다. 초기 HTML 전용 한글 폰트 요청과 후속 글꼴 전환을 없애기 위해 초기 스택을 앱과 일치시키고 Google Fonts 요청에서 Noto Sans KR만 제외했다. 실제 앱 디자인·내용·광고 로딩 정책은 유지한다. Inter 비차단 preload, display=swap, noscript 대체는 그대로다.

## 이전 실측

- cc12ea4 배포 후 모바일 단일 PageSpeed: 성능 73, FCP 2.3초, LCP 2.6초, TBT 860ms, CLS 0.
- 데스크톱: 성능 88, FCP 1.1초, LCP 1.8초, TBT 70ms, CLS 0.
- 보고서: https://pagespeed.web.dev/analysis/https-riragamehub-com/nkdsuw0mpm?form_factor=mobile
- 당시 Google Fonts 전송은 375KiB로 표시됐다. 이번 변경의 절감량을 그 전체로 간주하지 않는다. Inter는 계속 필요하며 실제 전송량은 환경에 따라 달라진다.
- 반복 결과가 동일해 독립 3회 중앙값은 확정하지 않았다. TBT는 INP가 아니다.

## 검증

- 타입 검사 통과, 테스트 36개 파일 / 297개 통과.
- 초기/앱 스택 일치, 요청 family 제한, swap, 비차단 로딩, noscript 검사 추가.
- build, 890개 사이트맵 경로 SEO 감사, 성능 예산 통과.
- 데스크톱 및 390px 모바일 홈 표시 확인.
- 진입 JS gzip 24,159 bytes, 초기 JS 138,713 bytes, CSS 26,898 bytes로 이전과 동일. JavaScript 감소를 주장하지 않는다.
- Notion 동기화 미실행. 사이트맵은 기존 빌드 절차로 검증했으며 URL 변경 없음.
- 광고 및 동의 스크립트의 비용은 남아 있다. 배포 후 측정 전에는 개선율이나 새 점수를 확정하지 않는다.
