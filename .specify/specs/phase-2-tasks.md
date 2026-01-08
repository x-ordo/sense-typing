# TASKS: Phase 2 Intelligence Deepening

## 1. Database & Schema
- [ ] ** @Arch **: 기존 `supabase/schema.sql` 리뷰 및 Intelligence 필드 추가 마이그레이션 작성.
- [ ] ** @Dev **: 확장된 스키마에 맞춰 Mock Data(Seed) 보강.

## 2. Intelligence Logic (Backend)
- [ ] ** @Dev **: `classifyRisk` 및 `analyzeQuery` 로직을 Zod 기반의 엄격한 타입 검증으로 리팩토링.
- [ ] ** @Dev **: Gemini 프롬프트를 Spec-2에 정의된 Metrics 스코어를 반환하도록 튜닝.

## 3. UI/UX Synchronization
- [ ] ** @Dev **: `SmartSearch`의 결과가 실제 폰트 리스트의 `Type Metrics`를 반영하여 실시간으로 그래프를 그리도록 연결.
- [ ] ** @QA **: 비정상적인 입력값에 대한 AI 예외 처리 및 에러 바운더리 테스트.
