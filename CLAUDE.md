# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sense Typing is an AI-powered font commerce platform that analyzes user design intent to recommend optimal typographic choices. It combines a luxury editorial UI with intelligence-first search powered by Google Gemini.

## Monorepo Structure

This is an npm workspaces monorepo with the main application in `font-decision-engine/`.

```
sense-typing/
├── font-decision-engine/    # Next.js 15 main application
│   └── src/
│       ├── app/             # App Router pages and API routes
│       ├── components/      # React components
│       ├── lib/             # Core business logic
│       │   ├── ai/          # AI prompts and intent classification
│       │   ├── search/      # Font search engine
│       │   └── supabase/    # Database clients (browser/server)
│       └── types/           # TypeScript definitions
└── supabase/                # Database schema and seed data
```

## Commands

### Development
```bash
cd font-decision-engine && npm run dev    # Start dev server at localhost:3000
```

### Build & Deploy
```bash
npm run build                             # Full monorepo build (install + build + pages:build)
npm run lint -w font-decision-engine      # Run ESLint
npm run pages:build -w font-decision-engine  # Build for Cloudflare Pages
```

### Testing
```bash
npm test -w font-decision-engine          # Run tests (currently placeholder)
```

## Architecture

### Runtime & Deployment
- **Edge Runtime**: All API routes use `export const runtime = 'edge'` for Cloudflare Workers compatibility
- **Cloudflare Pages**: Deployed via `@cloudflare/next-on-pages` adapter
- **Build Output**: `.vercel/output/static` (NOT `.next`)

### Data Flow
1. **Client Components** → `createSupabaseBrowser()` from `lib/supabase/fonts.ts`
2. **Server Components** → `createSupabaseServer()` from `lib/supabase/server.ts`
3. **AI Analysis** → `/api/ai/analyze-project` and `/api/ai/analyze-design` routes call Gemini 1.5 Flash

### Key Patterns

**Supabase Client Configuration**: Browser client disables session persistence for Edge stability:
```typescript
auth: { persistSession: false }
```

**AI Integration**: Uses `@google/genai` SDK with structured JSON responses via `responseMimeType` and `responseSchema`.

**Search Engine** (`lib/search/engine.ts`): Rule-based intent mapping that translates user queries into weighted tag searches. Supports Korean/English keywords.

**Risk Classification** (`lib/ai/intent.ts`): Classifies user queries into risk levels (low/medium/high) based on keyword detection for paywall gating.

### Database Schema (Supabase)
- `fonts` - Core font asset data
- `emotion_tags` - Taxonomy with axis/polarity classification
- `font_emotion_map` - Font-to-tag weighted relationships
- `use_cases` - Risk-categorized usage scenarios
- `font_usecase_map` - Font recommendations per use case

## Environment Variables

Required in `.env.local` and CI/CD secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY` (server-side only)

## CI/CD

- **ci.yml**: Runs lint, security audit, tests, and build verification on push/PR to main
- **deploy.yml**: Auto-deploys to Cloudflare Pages on push to main (only when `font-decision-engine/**` changes)

Both workflows require `--legacy-peer-deps` for npm install due to React 19 peer dependency conflicts.
