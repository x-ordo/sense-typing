# GUIDE: Security Audit Process

## 1. Automated Checks (Every Commit)
- `npm audit`: 알려진 취약점이 있는 패키지 자동 차단.
- CI 파이프라인에서 하드코딩된 시크릿 검출.

## 2. Periodic Manual Audit (Quarterly)
- **API Security:** Supabase RLS 정책이 의도대로 작동하는지 검토.
- **Access Control:** GitHub 및 Cloudflare 팀원 권한 최소화 원칙(PoLP) 확인.
- **AI Safety:** 프롬프트 인젝션 방어 로직의 유효성 테스트.

## 3. Vulnerability Response
취약점 보고 접수 시:
1. 영향도 평가 (Severity Rating)
2. 긴급 패치 및 테스트
3. 보안 권고문(Security Advisory) 발행
