# PROJECT CHECKPOINT

Project: Truong Nhan Digital Campaign

## Current Status

Current checkpoint: CP-64
Status: DONE (strategy production repair deployed and verified)
Last completed checkpoint: CP-64 (deployed source head `a6829c4`).

## Completed Work

- Completed CP-64: reconciled the new sales-scenario data with the strategy schema and UI, added JSON validation to the build command, deployed `a6829c4`, and confirmed the live strategy report renders without browser errors at mobile and desktop widths.
- Completed CP-63: pushed the two outstanding Word-content commits to `origin/main`, observed Vercel success, and verified live campaign data, route responses, media bytes and responsive pages.
- Completed CP-62: re-read the revised Word table, shortened two W2 titles, changed the W6 website launch status to “Chưa làm”, and verified all 28 rows against local content.
- Completed CP-61: reconciled all 28 Word table rows against the eight-week campaign data, corrected the differing labels, added W6 website card launch, and specified the W2 Hero Video milestone in the P2 KPI table.
- Completed CP-60: pushed the four outstanding CP-58/CP-59 source and record commits to `origin/main`, observed Vercel success, and verified the live eight-week campaign data, price card and representative video bytes.
- Completed CP-59: changed the value-consideration card to the single 390,000 VND per box price and passed JSON and lint checks.
- Completed CP-58: replaced the obsolete 12-week values with the corrected 8-week phase plan, production statuses, budget allocation, KPI milestones and media week mapping; passed local code and responsive browser checks.
- Completed CP-57: deployed the current cropped Trần Thị Tường Vy portrait, removed its unused JPG predecessor, and verified production image loading.
- Completed CP-56: found HEVC video in W3 among the ten public MP4s, transcoded it to H.264 while retaining AAC audio and its URL, and verified local and production playback with visible frames.
- Completed CP-55: pushed the locally validated source and pending avatar and ingredient-label edits, resolved Git LFS pointers during the Vercel build, and verified all nine full video responses and representative playback on production.
- Completed CP-54: ordered poster and video media in the rendered week grid, keeping mixed weeks poster-first and single items on the left.
- Completed CP-53: expanded the weekly phase cards to full width, used a sticky desktop week indicator, separated activities, enlarged the media grid, and highlighted the goal in a cream callout.
- Completed CP-52: moved the mislabeled video from W11 to W10, corrected its public filename, and kept the planned activity text unchanged.
- Completed CP-51: added nine videos and four posters to the phase pages, grouped repeated W5 videos into one series, and kept the planned weekly activity text unchanged.
- Completed CP-50: added the four supplied portraits to the contact cards, kept their paths in team content data, and preserved initial avatars as a fallback.
- Completed CP-49: restored visible bullet markers for each SWOT detail item and verified mobile and desktop rendering.
- Completed CP-48: reduced the SWOT panel and tab heights, moved each label nearer its S/W/O/T key, and verified all content still fits.
- Completed CP-47: used the supplied square product photo at its native aspect ratio so the box appears larger without cropping.
- Completed CP-46: removed the decorative down-right arrows from the three TOWS cards without changing their text or layout.
- Completed CP-45: matched the two market-context columns' body typography and heading levels, aligned their desktop content, and stacked them at narrower widths.
- Completed CP-44: replaced the browser tab icon metadata with the supplied logo PNG and verified the rendered icon link and asset response locally.
- Completed CP-43: copied the supplied transparent logo into public assets and replaced the shared header wordmark with it; verified mobile and desktop locally.
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
- Completed CP-24 by removing visitor-facing source citations from the home, product, company, and strategy pages while retaining plan/actual labels. Local and live mobile checks passed, including interactive product and strategy content.
- Completed CP-25 with three homepage cards, dedicated pages for Bấm hoãn, Làm ngay and Gửi lời nhắc, four-week plans, video slots and local MP4 instructions. Local mobile and desktop checks passed; production was not inspected or updated at the user's request.
- Completed CP-26 by adding the user's positioning and USP copy verbatim to the strategy overview, clearly identifying it as proposed copy, and adding a separate short product summary. Local mobile and desktop checks passed; production was not inspected or updated.
- Completed CP-27 by removing the highlight heading, keeping the three highlight lines, and fixing the schema/component mismatch behind the TypeScript error. Local build and browser checks passed; production was not inspected or updated.
- Completed CP-28 by updating S-O, W-O, and W-T to the requested titles and sentences, removing S-T, and updating the TOWS layout and schema. Local mobile and desktop checks passed; production was not inspected or updated.
- Completed CP-29 by replacing the short 7Ps summaries with the user's seven detailed policies, a responsive tab panel, and a separate plan-status note. Local content, keyboard, build, and browser checks passed; production was not inspected or updated.
- Completed CP-30 by replacing the market cards with the supplied truth, four pain points, purchase motivation and four decision drivers while preserving the existing “Càng quý…” quote. Local mobile and desktop checks passed; production was not inspected or updated.
- Completed CP-31 by bringing the “Sự thật:” label and quote closer together on desktop while preserving the mobile stack. Local browser checks passed; production was not inspected or updated.
- Completed CP-32 by replacing the old strategy journey section with six channel duties and three measurement paths. JSON, lint, typecheck, build, and responsive local browser checks passed; production was not inspected or updated.
- Completed CP-33 by restoring the four content pillars inadvertently removed in CP-32, beneath the channel duties and measurement paths. Local data, code, build, and responsive browser checks passed; production was not inspected or updated.
- Completed CP-34 by adding the four-step receipt quiz, personalized Story export, and product touchpoint while preserving the detailed receipt. Local code, data, build, and browser checks passed; production was not inspected or updated.
- Completed CP-35 by replacing W1–W12 activity and goal text with the three supplied tables, placing single-video slots and two W6 series lists beneath matching activities, and documenting MP4 setup. Local data, code, build, and browser checks passed; production was not inspected or updated.
- Completed CP-36 by replacing the four monitoring rows with the supplied wording and showing their previously hidden tool sources. Local data, code, build, and browser checks passed; production was not inspected or updated.

## Current Task

CP-64 is deployed on the public Vercel site. Phase video setup and H.264/AAC export requirements are documented in `docs/PHASE_VIDEOS.md`; native Git LFS can be enabled in Vercel Project Settings → Git to avoid build-time downloads. Official purchase URLs and an active 15% voucher code are still needed to enable the receipt purchase CTAs and offer; see `docs/RECEIPT_JOURNEY.md`. File-backed submissions still require a writable persistent host; Vercel's application directory is read-only. Bogart remains pending a web-licensed font file or Adobe Fonts kit. KPI definitions remain to be confirmed before a full public launch.

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

1. For writable form submissions and admin operations, configure the required environment variables outside Git and use a writable persistent host or replace JSON storage.
2. Manually verify downloaded PNG files, the seven-minute completion screen, keyboard tab interaction and native Chrome/physical phone rendering before public launch.
3. When licensed Bogart files or an Adobe Fonts kit become available, replace the Fraunces display font and repeat glyph/build/browser checks.

## Resume Command

Read `AGENTS.md`, `docs/MASTER_PROMPT.md`, `docs/CHECKPOINT.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, and `docs/TEST_RESULTS.md`. Continue from the next user request; preserve unrelated user edits in the working tree. CP-25 through CP-64 are deployed. Deploy future changes only when the user asks.
