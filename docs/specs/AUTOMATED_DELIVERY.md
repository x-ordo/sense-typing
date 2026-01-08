# SPEC: Automated Delivery & Security Auditing

## 1. Objective
코드 변경 사항이 자동으로 검증되고 안전하게 배포되는 신뢰할 수 있는 CI/CD 파이프라인 구축 및 보안 수준 강화.

## 2. CI/CD Pipeline (GitHub Actions)

### 2.1. Integration Workflows (CI)
- **Linting:** Tailwind 및 ESLint 규칙 준수 여부 자동 확인.
- **Unit Testing:** 모든 PR 및 Push 발생 시 Vitest 실행.
- **Security Scanning:** npm audit 및 의존성 취약점 스캔.

### 2.2. Delivery Workflows (CD)
- **Preview Deploy:** 모든 브랜치의 변경 사항을 Cloudflare Pages 프리뷰 환경에 배포.
- **Production Deploy:** `main` 브랜치 병합 시 프로덕션 환경 자동 배포.

## 3. Security Hardening

### 3.1. Secret Management
- `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` 등 민감 정보를 GitHub Secrets 및 Cloudflare Variables로 안전하게 관리.

### 3.2. Dependency Audit
- 주기적인 패키지 업데이트 및 보안 취약점 모니터링 자동화.

## 4. Implementation Phase
1. `.github/workflows/ci.yml` 보강.
2. `SECURITY.md` 가이드라인 작성.
3. `/verify-deps` 커맨드를 통한 무결성 확인.
