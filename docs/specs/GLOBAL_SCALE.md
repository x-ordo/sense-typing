# SPEC: Global Scale & i18n Architecture

## 1. Objective
Sense Typing을 전 세계 디자이너와 개발자가 사용하는 글로벌 플랫폼으로 확장하기 위한 기술적 기반 구축.

## 2. Technical Strategy

### 2.1. i18n (Internationalization)
- **Framework:** `next-intl` 또는 `react-i18next` 기반의 동적 로케일 라우팅.
- **Support:** 초기 ko, en 지원 후 ja, zh 확장.
- **Font Delivery:** 국가별 로컬 폰트 우선 순위 제어 로직 (Font-face subsetting).

### 2.2. Edge Computing (Cloudflare)
- **CDN Optimization:** 폰트 에셋의 글로벌 에지 캐싱 전략 (Cache Everything, TTL 1y).
- **Edge Analytics:** 국가별 유입 및 AI 사용 패턴 분석.

## 3. Global Identity
- 영문권 사용자를 위한 고대비 에디토리얼 타이포그래피 정교화.
- UTC 기반의 글로벌 어드민 파이프라인 관리.
