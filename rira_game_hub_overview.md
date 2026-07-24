# 🌐 RIRA Game Hub 프로젝트 개요 (Project Overview)

**[ID]** `RIRA-GH-20260725`
**[Confidence Score]** 0.99 (매우 높음)
**[Reinforced Date]** 2026-07-25
**[Source]** `00_Raw/2026-07-25 rira game hub.md`

---

### 📌 원문 내용 보존 (Original Text Preservation)

**[Raw Data Source]**
아래는 `00_Raw/2026-04-16 rira game hub.md` 파일에서 추출한 원본 텍스트입니다. 이 내용은 지식의 원천으로 그대로 보존됩니다.

```markdown
# 🪐 P-Reinforce: 자율형 지식 정원사 (Autonomous Knowledge Gardener)

> **"파편화된 정보의 중력을 거슬러, 지식의 잎귀를 하나씩 틔웁니다."**

P-Reinforce는 Andre Karpathy의 LLM-Wiki 아키텍처와 강화학습(RL) 이론을 결합한 지식 자동화 엔진입니다. 사용자가 던지는 파편화된 정보를 읽어 의미론적으로 분류하고, 스스로 폴더 트리를 설계하며, 지식 간의 상호 연결을 통해 하나의 거대한 '외부 뇌'를 구축합니다.

---

## 📌 주요 기능 요약
P-Reinforce는 `00_Raw/` 폴더에 입력되는 데이터를 실시간으로 감시하여 다음 작업을 수행합니다:
1.  **의미론적 분류 (Semantic Classification)**: 최신 LLM을 사용하여 문맥과 의도를 파악합니다.
2.  **자동 폴더 관리 (Dynamic Folder Management)**: 지식의 위계에 따라 폴더를 생성하고, 파일이 12개를 초과하면 스스로 하위 카테고리로 세분화(Refactoring)합니다.
3. **지식 합성 (Knowledge Synthesis)**: 파편화된 정보를 Karpathy의 '영속적 위키' 템플릿에 맞춰 정제합니다.
4. **GitHub 자동화 (Git Sync)**: 모든 변화를 자동으로 커밋하여 지식의 타임라인을 보존합니다.
5. **보안 및 인증 연동 (Security & Auth)**: Supabase RLS 정책 및 OAuth 로그인을 통해 안전한 데이터 관리를 수행합니다.

---

## 🧠 강화학습 기반 구조화 로직 (RL Logic)
엔진은 아래 보상 함수 $R$을 극대화하는 방향으로 동작합니다:
$$R = w_1(\text{Categorization Accuracy}) + w_2(\text{Graph Connectivity}) + w_3(\text{User Satisfaction})$$

### 운영 사이클:
- **상태 분석 (State Analysis)**: 현재 `10_Wiki/` 하위의 모든 폴더 트리와 `20_Meta/Graph.json`을 통해 지식 지형도를 파악합니다.
- **분류 행동 (Action - Categorization)**: 
    - **유사도 85% 이상**: 기존 폴더에 배치합니다.
    - **신규 개념**: 즉시 상위 개념을 도출하여 새로운 폴더 브랜치를 생성합니다.
    - **구조 재설계**: 특정 폴더의 파일이 과도하게 많아지면 세분화를 제안합니다.
- **지식 합성 (Action - Synthesis)**: 내용을 정제하고 최소 2개 이상의 [[쌍방향 링크]]를 생성하여 그래프를 강화합니다.
- **보상 및 정책 업데이트**: 사용자의 피드백을 수집하여 `20_Meta/Policy.md` 가중치를 갱신합니다.

---

## 📂 표준 폴더 구조 (The Structure)
```plaintext
root/
├── 00_Raw/                 # [불변] 사용자로부터 입력된 가공되지 않은 모든 원본 데이터
├── 10_Wiki/                # [자동 구조화] 에이전트가 RL 정책에 따라 관리하는 지식 층
│   ├── 🛠️ Projects/        # 프로젝트 중심 요약
│   ├── 💡 Topics/          # 스스로 생성한 주제별 분류
│   ├── ⚖️ Decisions/       # 의사결정 기록
│   └── 🚀 Skills/          # 워크플로우 및 스킬 패턴
├── 20_Meta/                # [시스템] 엔진의 두뇌 데이터 (Policy, Graph, Index)
└── .github/                # GitHub Sync 및 자동화 워크플로우
```

---

## 📝 지식 문서 변환 규격 (The Wiki Template)
모든 강화된 문서는 엄격한 마크다운 표준을 따릅니다:
- **ID 및 메타데이터**: UUID, 확신도(Confidence Score), 강화된 날짜 기록.
- **Karpathy Summary**: 지식의 핵심을 꿰뚫는 단 한 줄의 통찰.
- **구조화된 지식**: 추출된 패턴과 불렛포인트 위주의 간결한 정리.
- **RL 업데이트**: 과거 데이터와의 충돌 여부 및 정책 변화 기록.
- **지식 연결 (Graph)**: 상위(Parent), 연관(Related), 원본(Source) 링크 자동 생성.

---

## 💻 GitHub 동기화 프로토콜
모든 구조적 변화는 즉시 커밋되어 반영됩니다:
`git commit -m "[P-Reinforce] reinforce: 'Topics/Psychology' 폴더 생성 및 문서 연결 최적화"`

---

## 💡 에이전트 학습 가이드
- **칭찬**: *"이 분류가 아주 정확해."* → 해당 주제의 유사도 가중치를 높입니다.
- **교정**: *"이건 '코딩'이 아니라 '비즈니스' 폴더로 옮겨줘."* → 의미론적 경계선(Boundary Shift)을 재설정합니다.
- **사용**: 에이전트가 만든 구조를 유지하며 계속 사용하는 것 자체가 임묵적 보상으로 간주됩니다.

---
*P-Reinforce Architect에 의해 생성되었습니다.*
```