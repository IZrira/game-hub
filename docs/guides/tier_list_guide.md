# 🏆 티어표 구조 및 업데이트 가이드 (Tier List Guide)

> **문서 용도**: Rira Game Hub의 스타레일(HSR), 명조(WW), 이환(NTE) 3대 게임 티어표 산정 기준, 데이터 구조, 업데이트 템플릿 및 콘텐츠별 티어 정책을 정의하는 통합 문서입니다.

---

## 1. 📌 티어표 아키텍처 및 데이터 매핑

* **스타레일 (HSR)**: `hsr-hub/data/tiers.ts` 및 Supabase `tier_lists` 테이블.
  * 분류: 혼돈의 기억 (Memory of Chaos), 허구 이야기 (Pure Fiction), 종말의 환영 (Apocalyptic Shadow), 범용 랭킹.
  * 티어 등급: `T0`, `T0.5`, `T1`, `T2`, `T3`, `T4`
* **명조 (WW)**: `ww-hub/data/tiers.ts` 및 Supabase `tier_lists` 테이블.
  * 분류: 역경의 탑 (Tower of Adversity), 홀로그램 전략 (Tactical Hologram), 범용 탐험.
  * 티어 등급: `T0`, `T0.5`, `T1`, `T2`, `T3`
* **이환 (NTE)**: `nte-hub/data/tiers.ts` 및 `nte-hub/pages/TierList.tsx`.
  * 분류: 종합 메타 티어 (Overall Meta), 왜곡 토벌전 특화 (Distortion Boss), 도시 탐색 & 필드 (Urban Overworld).
  * 티어 등급: `S+`, `S`, `A+`, `A`, `B` (6대 속성: 혼, 령, 음, 양, 공, 상)

---

## 2. 📝 티어 업데이트 표준 템플릿

신규 버전 패치나 메타 변화에 따라 티어를 업데이트할 때는 아래 규격을 따릅니다:

```typescript
export interface TierUpdatePayload {
  gameId: 'hsr' | 'ww';
  version: string;
  updatedAt: string;
  categories: {
    categoryName: string;
    tiers: {
      tier: 'T0' | 'T0.5' | 'T1' | 'T2' | 'T3' | 'T4';
      characters: {
        characterId: string;
        characterName: string;
        role: string;
        element?: string;
        path?: string;
        recommendedEidolon?: string; // 권장 성혼/돌파 (예: '명함', '1돌+', '2돌+')
        commentary?: string; // 티어 산정 근거 및 핵심 메커니즘
      }[];
    }[];
  }[];
}
```

---

## 3. ⚖️ 티어 산정 기준 (Evaluation Criteria)

1. **고점 딜량 및 버프 밸류 (Peak Performance)**:
   * 현재 엔드게임 콘텐츠(혼돈 12층, 역경의 탑 심층) 기준 클리어 타임 및 딜사이클 안정성.
2. **범용성 및 파티 유연성 (Versatility)**:
   * 특정 전용 파츠 외에도 다양한 서포터/탱커와의 조합 가능 여부.
3. **돌파 효율 및 투자 대비 성능 (Cost-Efficiency)**:
   * 명함(E0/S0) 상태에서의 기본 완성도 및 주요 돌파(1돌/2돌) 시의 상승 곡선.
