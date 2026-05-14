# P-Reinforce 지식 관리 정책 (RL Policy)

본 문서는 사용자의 피드백을 기반으로 지식 분류 및 배치 가중치를 조정하는 정책 파일입니다.

## 1. 보상 가중치 (Reward Weights)
- $w_1$ (Categorization Accuracy): 0.4
- $w_2$ (Graph Connectivity): 0.4
- $w_3$ (User Satisfaction): 0.2

## 2. 분류 기준 (Categorization Rules)
- **Projects**: 현재 진행 중인 구체적인 개발 작업 및 프로젝트 분석.
- **Topics**: 일반적인 개념, 이론, 외부 정보.
- **Decisions**: 판단의 근거 및 히스토리.
- **Skills**: 프롬프트, 코드 패턴, 워크플로우.

## 3. 피드백 로그 (Feedback Log)
- (초기화) 시스템 가동 시작.
