// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    vercel: {
      config: {
        routes: [
          // Images/PDFs live on Lovable's asset CDN and are referenced as /__l5e/assets-v1/*.
          // Vercel has no such route, so proxy those requests to the Lovable-hosted origin.
          {
            src: "/__l5e/(.*)",
            dest: "https://krishna-mishra-portfolio.lovable.app/__l5e/$1",
          },
        ],
      },
    },
  },
});
