# 감성·전환 기반 폰트 결정 엔진

> **“지금 이 목적이면, 이 중에서만 고르면 됩니다.”**

## Project Vision

**이 프로젝트의 상품은 폰트가 아닙니다.**
상품은 `Taxonomy(분류 체계)`이며, 수익원은 `결정 권한`입니다.
Noonnu가 폰트 **저장소(Data)**라면, 우리는 폰트 **결정 엔진(Insight)**입니다.

> **저장소는 누구나 만들 수 있다. 하지만 기준을 가진 자만이 시장을 지배한다.**

---

## Documentation & Assets

- **PRD & Guide**: [docs/PRD.md](docs/PRD.md)
- **Taxonomy Structure**: [docs/taxonomy_template.csv](docs/taxonomy_template.csv)
- **Database Schema**: [supabase/schema.sql](supabase/schema.sql)

---

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (if using AI features)
3. Run the app:
   `npm run dev`