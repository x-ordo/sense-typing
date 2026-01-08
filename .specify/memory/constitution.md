# CONSTITUTION: AI Software Factory Rules

## 1. Operating Principles
- **Quality > Security > Speed > Cost**
- 모든 코드는 배포 전 `npm run build`를 통한 무결성 검증 필수.
- UI/UX는 'Professional Editorial' 정체성을 엄격히 준수.

## 2. Security Baseline
- 하드코딩된 시크릿 절대 금지.
- 모든 API 입력은 유효성 검증(Zod 등) 필수.
- 에러 정보의 외부 노출 최소화.

## 3. Code Standards
- 함수 길이는 20줄 이내 지향.
- 중첩 깊이는 최대 3단계로 제한.
- 컴포넌트는 '에디토리얼 리듬'과 '비대칭성'을 고려하여 설계.

## 4. TDD & QA
- 핵심 비즈니스 로직에 대해 80% 이상의 테스트 커버리지 유지.
- E2E 테스트는 Playwright Page Object Model(POM) 준수.
