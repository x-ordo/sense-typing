# SPEC: Intelligence Binding Architecture

## 1. Objective
AI(Gemini)가 분석한 추상적인 '디자인 의도'를 데이터베이스에 저장된 실제 폰트 속성과 정밀하게 매칭하는 메커니즘 구축.

## 2. Intelligence Flow
1. **Input:** 유저의 자연어 묘사 (e.g. "신뢰감 있는 금융 서비스")
2. **Analysis:** Gemini 1.5 Flash가 `Tone`, `Summary`, `Recommended Tags` 추출.
3. **Metrics Calculation:** 추출된 태그와 폰트 고유의 `Type Metrics` 점수를 결합.
4. **Data Binding:** Supabase의 `font_emotion_map` 테이블을 기반으로 실제 가용 폰트 필터링.
5. **Output:** 폰트 추천 리스트 + 실시간 지표(Minimalism, Authority 등) 업데이트.

## 3. Type Sense Metrics Algorithm (V2.0)
각 폰트는 0~100 사이의 3대 지표 점수를 가짐:
- **Minimalism (MIN):** 장식이 적고 기하학적인 정도. (Sans-serif 가중치)
- **Authority (AUT):** 신뢰감과 무게감이 느껴지는 정도. (Serif 및 Bold 가중치)
- **Legibility (LEG):** 본문 가독성 및 정교한 굵기 지원 정도.

## 4. Security
- AI 프롬프트 주입 방지 (Input Sanitization).
- API 호출량 제한 (Rate Limiting) 적용.
