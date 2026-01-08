# Product Requirement Document (PRD): Sense Typing V2

## 1. Product Vision
사용자가 '어떤 폰트를 쓸까?' 고민하는 시간을 혁신적으로 단축하고, 라이선스 리스크가 없는 최적의 디자인 결정을 내리도록 돕는 **지능형 폰트 커머스 플랫폼**.

## 2. Target Audience
- **Vibe-coding Developers:** 디자인 감각은 부족하지만 세련된 결과물을 원하는 개발자.
- **Brand Managers:** 조직 내 일관된 서체 가이드라인과 라이선스 관리가 필요한 운영자.
- **Freelance Designers:** 다양한 시안을 빠르게 테스트하고 라이선스 범위를 즉시 확인하려는 전문가.

## 3. Functional Requirements

### 3.1. Intelligence Hub (Home)
- [x] **SmartSearch:** 자연어 기반 디자인 의도 분석 및 폰트 추천.
- [x] **Dynamic Metrics:** Minimalism, Authority, Legibility 등 폰트 특성 수치화 및 실시간 업데이트.
- [x] **Weekly Best:** 큐레이션된 우수 서체 및 사례 노출.

### 3.2. Discovery & Inventory (/index)
- [x] **Global Preview:** 전역 미리보기 문구 입력 및 모든 카드 즉시 반영.
- [x] **Filter System:** 카테고리, 인기순, 최신순 정렬 및 필터링.
- [x] **License Matrix:** 6대 사용 범위(인쇄, 웹, 영상 등) 아이콘화 및 툴팁 제공.

### 3.3. Premium Market (/market)
- [x] **Price Simulator:** 구매 옵션에 따른 실시간 가격 변동 UI.
- [x] **Technical Specs:** 지원 글자 수, 파일 형식 등 기술 데이터 명시.

### 3.4. Community & Identity (/questions)
- [x] **Font Identification Board:** 이미지 기반 폰트 찾기 질문 및 답변 시스템.

### 3.5. Admin Pipeline (/kanban)
- [x] **Workflow Management:** 데이터 수집부터 검수, 배포까지 3단계 관리.
- [x] **Metadata Control:** 제보자 정보, 라이선스 원문 링크 관리.

## 4. User Experience (UX) Principles
- **Directness:** 설명 대신 상품(폰트)이 즉시 전면에 드러나는 쇼핑몰 구조.
- **Clarity:** 복잡한 라이선스를 아이콘과 툴팁으로 단순화하여 정보의 투명성 확보.
- **Trust:** AI 분석 수치와 기술 명세표를 통해 디자인 결정에 대한 논리적 근거 제시.

## 5. Roadmap
- **V2.1:** 실제 Supabase DB 연동 및 유저 즐겨찾기(Favorite) 기능.
- **V2.2:** AI 분석 결과에 따른 디자인 시스템(Tailwind Config) 자동 생성.
- **V3.0:** 기업용 폰트 라이선스 중앙 관리(SaaS) 대시보드 런칭.