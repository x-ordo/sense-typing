# Sense Typing - Intelligence Font Store

**"Beyond just listing fonts, we analyze your design intent to recommend the perfect typographic identity."**

Sense Typing은 단순한 무료 폰트 리스트 제공을 넘어, AI 기술과 디자인 직관을 결합하여 사용자의 프로젝트에 가장 적합한 폰트를 '결정'해주는 차세대 타이포그래피 커머스 플랫폼입니다.

## 🚀 Key Features

### 1. AI Intent Analysis (SmartSearch)
- 사용자가 프로젝트의 분위기(vibe)나 목적을 입력하면, Gemini AI가 이를 분석하여 최적의 폰트 조합을 추천합니다.
- 단순 검색을 넘어 디자인 의도를 파악하는 지능형 검색 엔진입니다.

### 2. Global Real-time Preview (Live Test)
- 쇼핑몰 상단에 위치한 전역 미리보기 창을 통해 모든 폰트 상품에 자신의 문구를 즉시 적용해 볼 수 있습니다.
- 타이핑 시 실시간으로 변화하는 **Type Sense Metrics**를 통해 가독성, 권위성, 미니멀리즘 지표를 시각적으로 확인합니다.

### 3. Professional Commerce UI
- **Editorial Design:** 고대비 Zinc & Indigo 테마와 세련된 레이아웃으로 전문 디자인 도구의 신뢰감을 제공합니다.
- **Product Matrix:** 라이선스 허용 범위를 현대적인 시스템 아이콘으로 도식화하여 직관적인 정보를 제공합니다.
- **Market Simulator:** 유료 폰트의 옵션별 가격을 즉시 시뮬레이션할 수 있는 상업적 UI를 포함합니다.

### 4. Admin Font Pipeline (Kanban)
- 운영자를 위한 전역 관리 시스템입니다.
- 사용자 제보 및 크롤링 데이터를 `Submission -> Review -> Live` 단계로 관리하여 데이터 무결성을 유지합니다.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Runtime:** Cloudflare Edge Runtime
- **AI Engine:** Google Gemini 1.5 Flash
- **Styling:** Tailwind CSS, Lucide Icons
- **Database:** Supabase (Auth, Storage, Postgres)
- **Deployment:** Cloudflare Pages

## 📂 Project Structure
- `/app`: 메인 페이지 및 각 서비스 라우트 (Discovery, Market, Identity, Admin)
- `/components`: 전역 미리보기, AI 검색, 폰트 카드 등 고도화된 UI 컴포넌트
- `/lib`: AI 로직, 검색 엔진, 텔레메트리 및 라이선스 게이트웨이
- `/docs`: PRD 및 비즈니스 시나리오 가이드라인
