# 🚀 Cloudflare Pages Deployment Configuration

## Option A: Manual Setup (Dashboard)

This project is configured for **Cloudflare Pages** using the `Edge Runtime`.
Copy-paste these values into the Cloudflare Dashboard.

### 1. Build Settings (Build & deployments > Settings)

| Setting | Value | Note |
| :--- | :--- | :--- |
| **Project Name** | `font-decision-engine` | Or your choice |
| **Framework Preset** | `Next.js` | Select this first |
| **Build Command** | `npx @cloudflare/next-on-pages` | **Do not use `npm run build`** |
| **Build Output Directory** | `.vercel/output/static` | **CRITICAL: Default `.next` will fail** |
| **Root Directory** | `font-decision-engine` | Required because project is in a subfolder |
| **Node.js Version** | `20` (or `18`) | Set in Environment Variables if needed |

---

### 2. Environment Variables (Settings > Environment variables)

| Variable Name | Value (Example) | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxh...` | Supabase Public Anon Key |
| `GEMINI_API_KEY` | `AIza...` | Google AI Studio Key (Server-side only) |
| `NODE_VERSION` | `20` | Force Node version for build system |

---

## Option B: Automated Deployment (GitHub Actions)

A workflow file `.github/workflows/deploy.yml` has been added. To enable it:

1. Go to your GitHub Repository > **Settings** > **Secrets and variables** > **Actions**.
2. Add the following **Repository secrets**:

| Secret Name | Description |
| :--- | :--- |
| `CLOUDFLARE_ACCOUNT_ID` | Find in CF Dashboard > Workers & Pages > Overview (sidebar) |
| `CLOUDFLARE_API_TOKEN` | Create via User Profile > API Tokens (Template: "Edit Cloudflare Workers") |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Public Anon Key |
| `GEMINI_API_KEY` | Your Google Gemini API Key |

Once these are set, every push to `main` will trigger a deployment.

---

## Troubleshooting

*   **Error:** `Error: No such file or directory... .vercel/output/static`
    *   **Fix:** Ensure **Build Output Directory** is exactly `.vercel/output/static`. The adapter transforms the `.next` build into this Vercel-compatible output that Cloudflare consumes.
*   **Error:** `sh: font-decision-engine: command not found`
    *   **Fix:** Ensure **Root Directory** is set to `font-decision-engine`.