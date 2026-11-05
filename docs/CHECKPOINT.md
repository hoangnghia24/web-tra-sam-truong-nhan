# PROJECT CHECKPOINT

Project: Truong Nhan Digital Campaign

## Current Status

Current checkpoint: CP-23
Status: DONE
Last completed checkpoint: CP-23 (interactive product journey verified on the live product page). CP-23 source was committed as `e96ebe7`. CP-22 source and local verification were committed as `8ba5553`, with its pending-deployment record in `0dce7ad`. CP-21 documentation was committed as `6c08c23` and source as `3af1a57`; CP-20 documentation as `ab9fc6d` and source fix as `a060d8f`; CP-19 as `ed8a39e`; CP-18 as `974d1e5`; CP-17 as `09de756`; CP-16 as `7d7041f`; CP-15 as `cbaa4c5`; CP-14 as `d5b7019`; CP-13 as `6c91f58`; CP-12 as `0395d75`; CP-11 as `9358149`; CP-10 as `0d8ca95`; CP-09 as `5cb6783`; CP-08 as `3ce1dc5`; CP-07 as `8a356ce`; CP-06 as `8a0ddec`; CP-05 as `c7ead3e`; CP-04 as `53be588`; CP-03 as `ef29d26`; CP-02 as `dec7abc`; CP-01 as `d2022cd`; CP-00 as `d8a6b16`.

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
- Completed CP-02 content/seed JSON, Zod schemas, atomic queued JSON storage with backups, JSON validation script, public API foundation, and four storage tests.
- Completed CP-03 ten-section homepage journey (hero, editorial intro, seven campaign sections and closing) with source-based copy, product facts, challenge steps and exact team names.
- Completed CP-04 eight-category receipt with 24-hour validation, JSON persistence, editorial result, PNG/print/copy/share controls and a link to the timer.
- Completed CP-05 seven-minute wall-clock timer with pause/resume/reset, progress indicators, completion message and private event tracking.
- Completed CP-06 product route from JSON with original-image gallery, seven ingredient tabs, preparation, FAQ, source caveats and verified-URL-only shop CTA.
- Completed CP-07 challenge form, approved-only stories, protected moderation API and local personalized reminder creator.
- Completed CP-08 source-based report with interactive SWOT/7Ps, TOWS, budget chart, planned KPIs and explicit lack of real campaign results.
- Completed CP-09 team/about/contact/policy pages, consent-based contact form, protected admin UI/APIs, real JSON dashboard and validated content editors.
- Completed CP-10 README, SEO routes, branded fallback states, UTM source counts, keyboard tabs and contrast fixes. The six requested pages were reviewed at mobile and desktop viewport sizes.
- Completed CP-11 content revisions from the supplied Word file: company overview, navigation order, challenge instructions, ingredient ratios, strategy details, weekly activities, KPI targets and risks. Rounded rectangular UI elements while retaining the site grids and full hero image.
- Completed CP-12 self-hosted Inter for body/interface copy and Fraunces for headings as the user-approved temporary substitute for Bogart. Checked Vietnamese glyphs, production build and responsive rendering.
- Completed CP-13 revised Word positioning, receipt concept, monitoring cadence and trigger scenarios in the existing pages. Restored the product navigation link and corrected its intermediate-width breakpoint.
- Completed CP-14 removal of the homepage challenge introduction marked by the screenshot above `BỎ`; confirmed the product gallery note marked by the other `BỎ` was already absent.
- Completed CP-15 removal of the standalone homepage story section, retargeted the intro scroll control to the receipt, renumbered remaining sections, and removed unused story CSS.
- Completed CP-16 product ingredient imagery for the three matching files in `anhweb`, with source labeling and placeholders for four ingredients without images.
- Completed CP-17 with four additional supplied ingredient photos and a full-card image treatment with readable overlaid copy on the product page.
- Completed CP-18 removal of the ingredient illustration label, matching lead phrase, and unused label styling while retaining ingredient selection and verification notes.
- Completed CP-19 with the supplied four-step video, a poster frame, aligned written instructions, and mobile/desktop playback and layout checks on `/thu-thach`.
- Completed CP-20 by making runtime JSON reads side-effect free and verifying that the deployed challenge page renders and plays the guide video.
- Completed CP-21 by removing the absent rules-file link and references from the challenge page, updating the homepage challenge entry point, and verifying both live routes.
- Completed CP-22 by displaying each supplied formula percentage in the product ingredient selector and adding the requested Ngọc Linh phrase; local and live mobile checks passed.
- Completed CP-23 with a four-scene product journey, supplied photos, animated ingredient gathering and brewing, and start/skip/replay controls. Local and live mobile/desktop checks passed.

## Current Task

CP-23 is complete. Vercel deployed the four-scene `/san-pham` journey, and live browser checks passed at 390 px and 1440 px. File-backed submissions still require a writable persistent host; Vercel's application directory is read-only. Bogart remains pending a web-licensed font file or Adobe Fonts kit. KPI definitions remain to be confirmed before a full public launch.

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
- `data/content/*.json`, `data/seed/*.json`
- `src/lib/json-store.ts`, `schemas.ts`, `api.ts`, `receipt.ts`
- Public API routes under `src/app/api/{product,campaign,team,strategy,receipts,events,ugc,contact}`
- `scripts/validate-json.ts`, `src/lib/json-store.test.ts`, `src/lib/receipt.test.ts`
- `src/app/page.tsx` complete landing journey
- `src/app/hoa-don-cho-doi/page.tsx`, `src/components/receipt/ReceiptExperience.tsx`
- `src/app/7-phut-cho-minh/page.tsx`, `src/components/timer/SevenMinuteTimer.tsx`, `src/lib/timer.ts`, `src/lib/timer.test.ts`
- `src/app/san-pham/page.tsx`, `src/components/product/IngredientExplorer.tsx`
- `src/app/thu-thach/page.tsx`, `src/app/gui-loi-nhac/page.tsx`, community/reminder components and admin login/moderation APIs
- `src/app/chien-luoc/page.tsx`, `src/components/strategy/StrategyExplorer.tsx`, `data/content/strategy-report.json`
- `src/app/{ve-du-an,lien-he,chinh-sach,admin}/*`, contact/admin components and protected admin APIs

## Final Files Added

- `README.md`, `src/app/{error,loading,not-found,robots,sitemap}.tsx/ts`, `src/proxy.ts`, `src/lib/tab-keyboard.ts`; updates to layout, CSS, admin statistics and interactive components.

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
- CP-02 `npm run validate:json`, `npm run test` (4 tests), `npm run typecheck`, `npm run lint`, and `npm run build` passed.
- Public API GETs returned HTTP 200; invalid receipt input returned 400; direct runtime URL returned 404.
- CP-03 `npm run build`, `npm run lint`, and `npm run typecheck` passed; desktop/mobile browser inspection found no broken images or horizontal overflow.
- CP-04 `npm run test` (7 tests), lint, typecheck and build passed. Mobile form POST created a correct receipt. Runtime JSON survived a dev-server restart.
- CP-05 `npm run test` (9 tests), lint, typecheck and build passed. Mobile start/pause/resume/reset worked. POST completion event returned 201 and was removed after testing.
- CP-06 JSON validation, lint, typecheck and build passed. Mobile image/overflow check, ingredient selection and FAQ expansion passed; no fake shop link rendered.
- CP-07 lint, typecheck and build passed. UI submission stayed pending/hidden; protected login/PATCH approval made it public. Reminder preview and PNG status were verified.
- CP-08 validated 9 content files, lint, typecheck and build passed. Mobile 390 px report and SWOT/7Ps tabs passed; plan/actual labels checked.
- CP-09 JSON validation, 9 tests, lint, typecheck and build passed. Exact contacts, form persistence, admin access control, dashboard, content save and click tracking verified.
- CP-10 initial gate: JSON validation, 9 tests, lint, typecheck and production build passed. Ten public routes returned 200; `/references/` returned 404 and protected stats API returned 401. Six named pages were inspected at 390 px and 1440 px with Spectral/Mulish computed styles, no horizontal document overflow and no loaded broken images. Production-only audit found 0 vulnerabilities.
- CP-10 final gate after fixes: JSON validation, 9 tests, lint, typecheck and production build passed. Production HTTP smoke test returned 200 for all ten public routes, 404 for missing/PDF routes and 401 for admin stats. A disposable UTM event incremented admin source count and was removed; all runtime arrays remained empty.
- CP-11: 10 content JSON files and 5 seed arrays validated; 9 tests, lint, typecheck and build passed. At 390 px, five edited pages had no horizontal overflow; the weekly disclosure opened. At 1440 px, the navigation fit and the hero kept its 16:9 ratio.
- CP-12: Inter, Fraunces upright and Fraunces italic contained the checked Vietnamese glyphs. Production build passed. Mobile browser checks on home and six routes found Inter body/Fraunces H1, no H1 or horizontal overflow; desktop homepage header and H1 also fit.
- CP-13: Revised Word content mapped to the existing product and strategy pages. JSON validation, 9 tests, lint, typecheck and production build passed. Browser review confirmed all new content groups and no page overflow at 390 px, 1100 px and 1280 px after the menu breakpoint adjustment.
- CP-14: Mapped both `BỎ` captions to their preceding screenshots. Removed the remaining homepage paragraph, confirmed the product note was already gone, and passed lint, typecheck, build and desktop browser inspection.

## Known Issues

- Native Chrome verification is unavailable this turn: Windows Computer Use stopped when it could not establish the browser URL confidently. The in-app Chromium browser was used for visual QA.
- Full seven-minute completion UI was not exercised in browser; the elapsed-time helper and event API were verified separately.
- PNG button reported success, but the in-app browser did not expose a download event; verify actual file delivery in a regular browser during final QA.
- Full dependency audit reports 16 moderate advisories in the ESLint/minimatch development toolchain; production-only audit found 0. `npm audit fix --force` proposes a breaking ESLint downgrade, so no forced change was made.
- Official purchase URL is not supplied, so no buy link should be shown.
- Bogart is not bundled: a web-licensed font file or Adobe Fonts kit is needed before replacing the temporary Fraunces headings.
- Vercel can display the challenge page and read seed UGC data, but JSON-backed form submissions cannot persist in its read-only application directory. Use a writable persistent Node host or approve a different storage service before accepting live submissions there.

## Next Actions

1. For a real deployment, configure `NEXT_PUBLIC_SITE_URL`, `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` outside Git; use a writable single-process Node host or replace JSON storage.
2. Manually verify downloaded PNG files, the seven-minute completion screen, keyboard tab interaction and native Chrome/physical phone rendering before public launch.
3. When licensed Bogart files or an Adobe Fonts kit become available, replace the Fraunces display font and repeat glyph/build/browser checks.

## Resume Command

Read `AGENTS.md`, `docs/MASTER_PROMPT.md`, `docs/CHECKPOINT.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, and `docs/TEST_RESULTS.md`. Inspect source and continue from CP-23. Do not repeat completed work.
