# GUIDE: TDD Methodology for Sense Typing

## 1. Core Principle
모든 핵심 비즈니스 로직(AI 분석, 메트릭 계산, 라이선스 검증)은 테스트 코드가 먼저 작성되어야 합니다.

## 2. TDD Cycle
1. **RED:** 실패하는 테스트 코드를 작성합니다. (`tests/unit/` 아래)
2. **GREEN:** 테스트를 통과하기 위한 최소한의 코드를 구현합니다.
3. **REFACTOR:** 코드의 품질을 높이고 중복을 제거합니다.
4. **COMMIT:** `feat(scope): behavior changes` 또는 `style(scope): tidy changes` 단위로 커밋합니다.

## 3. Tooling
- **Test Runner:** Vitest
- **E2E:** Playwright
- **CI:** GitHub Actions (Every PR must pass tests)

## 4. Example
```typescript
// 폰트 메트릭 계산 테스트 예시
test('should calculate high minimalism when font is geometric sans-serif', () => {
  const font = { category: 'Sans Serif', style: 'Geometric' };
  const score = calculateMinimalism(font);
  expect(score).toBeGreaterThan(80);
});
```
