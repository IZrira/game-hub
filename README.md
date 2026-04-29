> **문서 용도**: 프로젝트의 기본 정보, 로컬 실행 방법 및 배포 안내를 위한 메인 가이드 문서입니다.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Studio 앱 실행 및 배포

이 폴더에는 앱을 로컬에서 실행하는 데 필요한 모든 파일이 포함되어 있습니다.

AI Studio에서 앱 보기: https://ai.studio/apps/9932cd68-a065-41f7-95a2-d8970773a489

## 로컬 실행 방법

**사전 요구 사항:** Node.js

1. 의존성 설치:
   `npm install`
2. [.env.local](.env.local) 파일의 `GEMINI_API_KEY`를 본인의 Gemini API 키로 설정합니다.
3. 앱 실행:
   `npm run dev`
