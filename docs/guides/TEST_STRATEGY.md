# GUIDE: Test Strategy for Sense Typing

## 1. Overview
우리의 테스트 전략은 **'피라미드 구조'**를 따르며, 자동화된 검증을 통해 배포 안정성을 극대화합니다.

## 2. Testing Levels

### 2.1. Unit Testing (Vitest)
- **Target:** 개별 유틸리티 함수, 순수 컴포넌트 로직.
- **Goal:** 최소 단위의 기능 무결성 검증.
- **Coverage:** 비즈니스 로직 80% 이상 필수.

### 2.2. Integration Testing
- **Target:** AI 추천 엔진과 Mock DB의 연동, 페이지 단위 렌더링.
- **Goal:** 컴포넌트 간 상호작용 및 데이터 흐름 검증.

### 2.3. End-to-End Testing (Playwright)
- **Target:** 핵심 사용자 시나리오 (검색 -> 필터링 -> 아카이브 -> 상세 보기).
- **Goal:** 실제 브라우저 환경에서의 최종 사용자 경험 보장.
- **POM:** Page Object Model 패턴을 사용하여 유지보수성 확보.

## 3. Deployment Pipeline
1. `pre-commit`: Lint 및 간단한 Unit Test.
2. `GitHub Actions`: 전체 테스트 슈트 실행 및 결과 리포트.
3. `Cloudflare Preview`: 성공 시 프리뷰 배포.
