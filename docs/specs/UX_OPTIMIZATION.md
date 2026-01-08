# SPEC: User Experience Optimization

## 1. Objective
디자이너와 개발자가 Sense Typing을 단순 검색 도구가 아닌, 실제 프로젝트의 **'타이포그래피 워크스페이스'**로 활용하도록 유도.

## 2. Core UX Features

### 2.1. Curator Archive (Favorites)
- 유저가 마음에 드는 폰트를 '보관함'에 추가.
- 로컬 스토리지 또는 Supabase Auth 연동을 통한 영구 저장.
- 에디토리얼 디자인 톤을 유지하는 'Minimalist Collection' UI.

### 2.2. Contextual Intelligence (Tooltips & Hover)
- 라이선스 아이콘 호버 시, 해당 폰트의 '허용/제한' 사유를 AI가 요약하여 툴팁으로 제공.
- 폰트 카드 호버 시 비대칭적 레이아웃 변화 및 마이크로 인터랙션 강화.

### 2.3. Multi-language Preview Suite
- 한글 외 영문, 숫자, 특수문자 전용 미리보기 세트 제공.
- 'Vibe Architect' 결과와 연동된 추천 레이아웃 시뮬레이션.

## 3. UI System
- **Indigo Accent:** 행동 유도(CTA) 버튼에 세련된 인디고 그라데이션 적용.
- **Glassmorphism:** 오버레이 컴포넌트에 초고해상도 블러 효과 적용.
