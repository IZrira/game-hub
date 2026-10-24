# 보안 audit 실패 해결

## 재현과 원인

2026-10-24 npm audit로 기존 CI 실패와 동일한 치명 1건·높음 5건(취약 패키지 6개)을 재현했다. 페이지 콘텐츠나 파일 정리 문제가 아니라 package-lock의 취약 버전이 원인이었다. 초기 로컬 조회의 인증서 오류는 시스템 CA를 해당 명령에만 적용해 해결했으며 TLS 검증을 끄지 않았다.

가설은 잠금 버전 잔존 → 선언 범위 제한 → CI 설치 환경 차이 순으로 점검했다. 실제 잠금 파일에서 6개 모두 취약 버전이 확인됐고, 같은 레지스트리의 수정 버전 갱신 후 로컬 audit가 통과해 첫 두 가설을 뒷받침했다. happy-dom은 기존 20.x 선언 범위를 넘어야 했다.

## 변경 버전

- DOMPurify 3.4.16 → 3.4.17
- follow-redirects 1.16.0 → 1.16.1
- happy-dom 20.11.2 → 21.0.4 (테스트 전용)
- markdown-it 14.3.2 → 14.3.3
- undici 7.30.0 → 7.30.1
- Vite 6.4.3 → 6.4.5 (6.x 유지)

직접 의존성의 최소 허용 버전은 DOMPurify 3.4.17, happy-dom 21.0.4, Vite 6.4.4로 올렸다. 나머지 전이 의존성은 기존 부모 패키지의 호환 범위 안에서 잠금 버전만 갱신했다. 공식 npm 레지스트리의 배포 버전·engines를 확인했고 CI Node 22와 호환된다. 강제 audit fix·강제 peer 해제·임의 override는 사용하지 않았다.

참고한 유지관리자 자료:

- [DOMPurify 릴리스](https://github.com/cure53/DOMPurify/releases)
- [happy-dom 릴리스](https://github.com/capricorn86/happy-dom/releases)
- [Vite 릴리스](https://github.com/vitejs/vite/releases)
- 기존 audit에 포함된 [DOMPurify 권고](https://github.com/advisories/GHSA-cg2g-xh64-v4q7), [happy-dom 권고](https://github.com/advisories/GHSA-834v-8h66-3h79), [markdown-it 권고](https://github.com/advisories/GHSA-gfr2-rv44-r23c), [undici 권고](https://github.com/advisories/GHSA-xjj6-f33q-929c).

## 검증

- 알려진 취약 잠금 버전 재유입 검사 6개를 추가했다. 수정 전 6개 모두 실패, 수정 후 6개 모두 통과했다. 하위 설치 경로까지 검사한다.
- `npm audit --audit-level=low`: 알려진 취약점 0건. 기존 CI의 critical 기준보다 엄격한 로컬 검사를 통과했다.
- TypeScript 통과.
- 전체 테스트 69개 파일·524개 테스트 통과. happy-dom 21 업그레이드 이후에도 기존 렌더링 테스트를 모두 유지했다.
- build·SEO 893개 사이트맵 경로·성능 예산 통과. 초기 JS gzip 추정 139,681 / 170,000바이트, 최대 청크 206,540 / 250,000바이트.
- diff 검사 및 잠금 변경 범위를 확인한다. 콘텐츠·Notion 데이터·인증·RLS·화면 디자인은 수정하지 않는다. CI 보안 검사 기준도 그대로 유지한다.
- 원격 CI·audit·Cloudflare와 운영 접근은 push 후 확인해 최종 응답에서 보고한다.

## 유지 기준

보안 검사 실패를 경고로 무시하거나 조건을 완화하지 않는다. 추가한 버전 하한 검사는 이번 권고의 재발 방지일 뿐, 미래에 공개될 취약점을 예측하지 않는다. 후속 의존성 변경에서도 npm audit·타입·전체 테스트·build·CI 결과를 실제로 확인해야 한다. 미래 실패가 영원히 없거나 취약점이 전혀 없다는 보장은 하지 않는다.

변경 범위별 검토: 보안은 알려진 패키지 취약점 제거, 성능은 기존 예산 유지, 디자인은 컴포넌트 변경 없이 기존 렌더링 회귀 테스트 유지로 확인했다. 별도 3인 독립 전체 사이트 감사로 표현하지 않는다. 사용자 기존 AGENTS.md 변경과 무관한 보고서는 커밋 대상에서 제외한다.
