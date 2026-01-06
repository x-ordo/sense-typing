# 🚀 Cloudflare Pages Deployment Configuration

This project is configured for **Cloudflare Pages** using the `Edge Runtime`.
Copy-paste these values into the Cloudflare Dashboard.

## 1. Build Settings (Build & deployments > Settings)

| Setting | Value | Note |
| :--- | :--- | :--- |
| **Project Name** | `font-decision-engine` | Or your choice |
| **Framework Preset** | `Next.js` | Select this first |
| **Build Command** | `npx @cloudflare/next-on-pages` | **Do not use `npm run build`** |
| **Build Output Directory** | `.vercel/output/static` | **CRITICAL: Default `.next` will fail** |
| **Root Directory** | `font-decision-engine` | Required because project is in a subfolder |
| **Node.js Version** | `20` (or `18`) | Set in Environment Variables if needed |

---

## 2. Environment Variables (Settings > Environment variables)

| Variable Name | Value (Example) | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxh...` | Supabase Public Anon Key |
| `GEMINI_API_KEY` | `AIza...` | Google AI Studio Key (Server-side only) |
| `NODE_VERSION` | `20` | Force Node version for build system |

---

## 3. Compatibility Flags (Settings > Functions)

*   **Compatibility Date**: `2024-09-23`
*   **Compatibility Flags**: `nodejs_compat` (Often added automatically by the preset, but good to check)

---

## 4. Troubleshooting

*   **Error:** `Error: No such file or directory... .vercel/output/static`
    *   **Fix:** Ensure **Build Output Directory** is exactly `.vercel/output/static`. The adapter transforms the `.next` build into this Vercel-compatible output that Cloudflare consumes.
*   **Error:** `sh: font-decision-engine: command not found`
    *   **Fix:** Ensure **Root Directory** is set to `font-decision-engine`.
