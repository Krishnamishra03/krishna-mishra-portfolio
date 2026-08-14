# Deploy on Vercel

This is a TanStack Start (SSR) app. Nitro builds a Vercel-compatible output
(`.vercel/output`) using the `vercel` preset set in `vite.config.ts`.

## Steps

1. Push the project to GitHub (Lovable editor → + menu → GitHub → Connect project).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Settings (usually auto-detected):
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: leave **empty** (Nitro emits `.vercel/output` automatically)
   - Install Command: `npm install`
   - Node.js Version: **22.x**
4. Deploy.

## Environment variables

None required for the public site. If you later add server secrets
(e.g. `GROQ_API_KEY`), add them under Project → Settings → Environment Variables.

## Notes

- `vercel.json` proxies `/__l5e/*` to the Lovable asset CDN so images/PDFs load.
- Every push to the connected branch triggers an automatic redeploy.
