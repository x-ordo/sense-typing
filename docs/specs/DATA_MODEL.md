# SPEC: Type Intelligence Data Model

## 1. Entities

### 1.1. Font (Master)
- `id` (UUID): 폰트 고유 식별자.
- `name` (String): 폰트 명칭.
- `metrics_min` (Int): Minimalism 점수 (0-100).
- `metrics_aut` (Int): Authority 점수 (0-100).
- `metrics_leg` (Int): Legibility 점수 (0-100).
- `is_premium` (Boolean): 유료/무료 여부.

### 1.2. Emotion Tag (Taxonomy)
- `tag` (String): 감정/의도 태그 (e.g. 'Trustworthy', 'Playful').
- `weight_min`: 해당 태그가 Minimalism에 미치는 영향.
- `weight_aut`: 해당 태그가 Authority에 미치는 영향.

### 1.3. Font-Emotion Map (Binding)
- `font_id` (FK)
- `tag_id` (FK)
- `confidence` (Float): AI/전문가가 판단한 매칭 신뢰도.

## 2. Relationships
- One Font has Many Emotion Tags (N:M via Map).
- AI Result contains Multiple Tags.

## 3. Implementation Target (Supabase)
기존 `schema.sql`을 위 사양에 맞춰 확장 마이그레이션 수행 예정.
