# SPEC: Monitoring & Observability

## 1. Objective
실시간으로 서비스의 상태를 파악하고, 성능 저하 및 에러 발생 시 즉각적으로 대응할 수 있는 모니터링 환경 구축.

## 2. Monitoring Targets

### 2.1. Core Web Vitals (Performance)
- **LCP, CLS, FID:** 사용자가 체감하는 로딩 성능 및 레이아웃 안정성 측정.
- **Tool:** Cloudflare Analytics & Google Search Console.

### 2.2. Error Tracking
- **Runtime Errors:** ErrorBoundary를 통해 캡처된 클라이언트 에러 로그.
- **API Failures:** Gemini 및 Supabase API 호출 성공률 및 지연 시간 모니터링.

### 2.3. AI Token Usage
- Gemini API 호출량 및 비용 모니터링.
- 할당량 도달 전 경고 알림 설정.

## 3. Telemetry Integration
- `src/lib/telemetry.ts`를 통해 수집된 비즈니스 이벤트(폰트 선택, 마켓 전환 등)를 분석하여 UX 개선에 반영.
