# PROJECT CHECKPOINT

Project: Truong Nhan Digital Campaign

## Current Status

Current checkpoint: CP-02
Status: IN_PROGRESS
Last completed checkpoint: CP-01 (verified; commit pending). CP-00 was committed as `d8a6b16`; source audit was committed as `d43d066`.

## Completed Work

- Verified cover image at the requested path and reviewed its contents.
- Found the 38-page strategy PDF at `public/references/`, rather than the requested `references/` path; extracted and inspected representative pages.
- Created a first checkpoint system and committed source audit (`d43d066`).
- Received the Master Prompt after that commit and moved records to its required `docs/` directory.
- Downloaded self-hosted Spectral and Mulish from Google Fonts with OFL license files; verified representative Vietnamese glyphs.
- Created an uncommitted static visual prototype. It does not satisfy the Next.js application requirement and must be migrated.
- Initialized Next.js 16.4.4 App Router with React 19.3.1, strict TypeScript, Tailwind 4, ESLint and requested app libraries. Removed the temporary static prototype source.
- Next.js development server returned HTTP 200 on `http://localhost:3000/`; production build, lint, and typecheck passed.
- Completed CP-01 shared header/footer and PageBanner, responsive typography tokens, and full 16:9 hero with CTAs in a separate content block. Verified mobile navigation and font rendering in browser.

## Current Task

Build CP-02: versioned content/seed JSON, private runtime JSON storage, Zod schemas, and public API foundations.

## Completed Files

- `AGENTS.md`
- `docs/MASTER_PROMPT.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/CHECKPOINT.md`
- `docs/TASKS.md`
- `docs/DECISIONS.md`
- `docs/TEST_RESULTS.md`
- `public/images/truong-nhan-cover.png`
- `public/fonts/*`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `package.json`, `package-lock.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `next.config.ts`
- `src/components/site/SiteHeader.tsx`, `SiteFooter.tsx`, `PageBanner.tsx`

## Files Being Modified

- `data/content/*`, `data/seed/*`
- `src/lib/json-store.ts`, `src/lib/schemas.ts`
- `src/app/api/*`

## Tests Passed

- Source existence and PDF page count checks.
- Six font files contain the checked Vietnamese glyph sample.
- Static prototype built and returned HTTP 200, but this is not the target application.
- `npm run build`, `npm run lint`, `npm run typecheck` passed for the Next.js skeleton.
- GET `http://localhost:3000/` returned HTTP 200.
- `npm audit --omit=dev --audit-level=moderate` found 0 production vulnerabilities.
- CP-01 `npm run build`, `npm run lint`, and `npm run typecheck` passed.
- All six font files contain required Vietnamese glyphs; browser computed fonts are Mulish for body and Spectral for H1.
- Desktop and 390 px mobile inspection showed the complete 16:9 cover; mobile width 390 px with document scroll width 375 px. Mobile menu opened and closed.

## Known Issues

- The Next.js app has only the homepage intro; APIs, runtime storage, other routes, and admin features are not yet implemented.
- Typography must be reviewed again across the six requested routes after those pages exist.
- `npm install` reported 16 moderate vulnerabilities including dev dependencies; production-only audit found 0. Review during CP-10.
- Official purchase URL is not supplied, so no buy link should be shown.

## Next Actions

1. Create content/seed JSON, schemas and a queued atomic JSON store with backups.
2. Add public API route handlers and test write/read/restart behavior.
3. Verify CP-02, record results and commit before CP-03.

## Resume Command

Read `AGENTS.md`, `docs/MASTER_PROMPT.md`, `docs/CHECKPOINT.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, and `docs/TEST_RESULTS.md`. Inspect source and continue from CP-00. Do not repeat completed work.
