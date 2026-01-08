# Security Policy: Sense Typing

## 1. Reporting a Vulnerability
만약 보안 취약점을 발견하셨다면, 공개적인 Issue 등록 대신 `team@sensetyping.cc`로 메일을 보내주시기 바랍니다. 48시간 이내에 검토 및 답변을 드리겠습니다.

## 2. Secure Coding Practices
- **Secrets:** 어떠한 경우에도 API 키나 비밀번호를 코드에 하드코딩하지 않습니다. 모든 비밀 정보는 GitHub Secrets와 환경 변수를 통해 관리합니다.
- **Dependencies:** 주기적으로 `npm audit`을 실행하여 취약한 패키지를 점검하고 업데이트합니다.
- **Validation:** 모든 사용자 입력값은 Zod를 통해 유효성을 검증하며, AI 프롬프트 주입(Injection) 공격에 대비합니다.

## 3. Deployment Security
- Cloudflare Pages의 `Edge Runtime`을 활용하여 인프라 노출을 최소화합니다.
- 모든 운영 환경은 HTTPS를 강제하며, 보안 헤더(HSTS, CSP 등)를 적용합니다.
