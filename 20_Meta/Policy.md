# P-Reinforce 지식 관리 정책 (RL Policy)

본 문서는 사용자의 피드백을 기반으로 지식 분류 및 배치 가중치를 조정하는 정책 파일입니다.

## 1. 보상 가중치 (Reward Weights)
- $w_1$ (Categorization Accuracy): 0.4
- $w_2$ (Graph Connectivity): 0.4
- $w_3$ (User Satisfaction): 0.2

## 2. 분류 및 정원 관리 (Garden Maintenance)
- **Projects**: 현재 진행 중인 구체적인 개발 작업 및 프로젝트 분석.
- **Topics**: 일반적인 개념, 이론, 외부 정보.
- **Decisions**: 판단의 근거 및 히스토리.
- **Skills**: 프롬프트, 코드 패턴, 워크플로우.
- **[NEW] 동기화 규칙**: 프로젝트 내 모든 전략, 설계, 가이드 문서(`docs/` 하위 포함)의 생성/수정 시 즉시 P-Reinforce 위키화를 병행 수행한다.
- **[NEW] 보상 정책**: `10_Wiki/`와 `docs/` 간의 지식 정합성이 100% 유지될 때 지식 엔진의 확신도(Confidence Score) 보너스를 부여한다.

## 3. 피드백 로그 (Feedback Log)
- (초기화) 시스템 가동 시작.
