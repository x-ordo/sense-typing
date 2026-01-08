# SPEC: Production Hardening & Guides

## 1. Objective
실제 운영 환경에서의 안정성을 확보하고, 협업 및 유지보수를 위한 기술적 가이드라인을 완성함.

## 2. Core Hardening Features

### 2.1. Graceful Error Handling
- **Error Boundaries:** 런타임 에러 발생 시 에디토리얼 디자인 톤을 유지하는 '시스템 복구' UI 노출.
- **Empty States:** 검색 결과가 없거나 아카이브가 비었을 때, 다음 행동을 유도하는 디자인(e.g. "추천 폰트 보기").

### 2.2. Technical SEO & Metadata
- **Dynamic Meta Tags:** 각 폰트 상세 페이지별 고유 메타 데이터(Title, Description, OpenGraph) 적용.
- **JSON-LD:** 검색 엔진이 폰트 상품 정보를 구조적으로 이해할 수 있도록 스키마 마크업 추가.

## 3. Engineering Guides (Documentation)

### 3.1. TDD Guide
- Sense Typing 프로젝트의 테스트 작성 원칙 및 `go` 커맨드 활용법.

### 3.2. Test Strategy
- Unit (Vitest) -> Integration (Supabase Mock) -> E2E (Playwright) 계층별 테스트 전략.
