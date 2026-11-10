# Test results

## Checkpoint 1 — source audit (2026-11-02)

| Check | Observed result |
| --- | --- |
| `public/images/truong-nhan-cover.png` | Present, 2,403,969 bytes; visually inspected. |
| `references/Tra_Sam_Truong_Nhan_SWOT_TOWS_7Ps.pptx.pdf` | Absent at exact requested path. |
| `public/references/Tra_Sam_Truong_Nhan_SWOT_TOWS_7Ps.pptx.pdf` | Present, 198,462,391 bytes, 38 pages; text extracted and representative pages 1, 9, 12, 18, 21, 26, and 34 rendered/inspected. |
| Master Prompt | No file or text found in workspace search. User asked for its location/content. |
| Git | `main` had no commits; `public/` was untracked. |

Relevant source facts: campaign line and three phases (page 21); 15 × 2 g box, seven ingredients and 3% Ngọc Linh ginseng leaf (page 18); brewing guidance of approximately 300 ml for 5–7 minutes (page 15). The deck has inconsistent price references, so price is excluded until confirmed.

## Typography and prototype audit (2026-11-02)

- `node scripts/build.mjs` passed for the temporary static prototype; HTTP GET `/` returned 200.
- Six local Spectral/Mulish TTF files passed a `fontTools` cmap check for a representative Vietnamese phrase. A complete required-character check remains for CP-01.
- Browser inspection showed the temporary prototype crops the cover. Next.js hero must preserve the whole 16:9 image. This is an open issue, not a passed QA gate.
- Master Prompt supplied after initial audit; static build is not considered CP-00 completion.

## CP-00 — Next.js initialization (2026-11-02)

| Command/check | Result |
| --- | --- |
| `node --version` | `v24.22.1`; meets Next.js minimum. |
| `npm run build` | PASS — Next.js 16.4.4 compiled, TypeScript checked, static homepage generated. |
| `npm run lint` | PASS — zero errors and warnings after PostCSS config adjustment. |
| `npm run typecheck` | PASS. |
| GET `http://localhost:3000/` | HTTP 200 with Next.js dev server. |
| `npm audit --omit=dev --audit-level=moderate` | 0 production vulnerabilities; full install reported 16 moderate including development dependencies. |
| `git check-ignore` | `.next`, `data/runtime`, and 198 MB PDF excluded. |

CP-00 passes. Next.js visual checks and all feature checks remain open for later checkpoints.

## CP-01 — branding and typography (2026-11-02)

| Check | Result |
| --- | --- |
| Required Vietnamese glyphs `ă â ê ô ơ ư đ ễ ữ ộ ự ắ` and uppercase forms | PASS in all six Spectral/Mulish TTF files via `fontTools` cmap. |
| `npm run build`, `npm run lint`, `npm run typecheck` | PASS after shared shell and typography changes. |
| Desktop browser, `localhost:3000` | Full cover visible without crop/overlay. Header, CTA and wordmark render. |
| Mobile browser, 390 × 844 | Cover ratio measured 1.7778; H1 computed 34px; body font computed Mulish and heading Spectral; no horizontal overflow (document scroll width 375px). |
| Mobile menu | Open/close confirmed via visible menu and `aria-expanded` changes. |

The six-route typography review requested in the later brief remains pending until those routes are implemented.

## CP-02 — JSON storage and API foundation (2026-11-02)

| Command/check | Result |
| --- | --- |
| `npm run validate:json` | PASS — 8 content files and 5 empty seed files validated. |
| `npm run test` | PASS — 4 storage tests: concurrent writes/new instance/backup, duplicate and corrupt JSON guard, update/delete, traversal guard. |
| `npm run typecheck`, `npm run lint`, `npm run build` | PASS — no build warning after scoped filesystem tracing annotation. |
| GET `/api/product`, `/api/campaign`, `/api/team`, `/api/strategy`, `/api/ugc` | HTTP 200. Empty UGC returns an empty list. |
| POST invalid `/api/receipts` | HTTP 400. |
| GET `/data/runtime/ugc-submissions.json` | HTTP 404; runtime data is outside `public`. |

Public POST success flows and process-restart persistence remain to be checked with their UI features. `data/runtime` is ignored by Git.

## CP-03 — landing page (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run typecheck`, `npm run lint`, `npm run build` | PASS. |
| Desktop browser, 1440 px | Full 16:9 cover, navigation and editorial section layouts render; no image is broken; document width equals viewport. |
| Mobile browser, 390 px | Hero remains 16:9; all ten sections fit without horizontal overflow; visual checks of story and receipt feature show readable diacritics and no clipping. |
| Source consistency | Homepage uses product facts from JSON and team names from `team.json`. Receipt preview is labeled as illustrative, not actual visitor data. |

Links to feature routes are pending their checkpoints; none is marked complete yet.

## CP-04 — Hóa đơn chờ đợi (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run test` | PASS — 7 tests total, including receipt calculations, 24-hour limit and Vietnam-local date code. |
| `npm run lint`, `npm run typecheck`, `npm run build` | PASS. |
| Mobile browser, 390 px | Eight activities and 16 time inputs fit; no horizontal overflow. |
| Form to API | Entered 8 hours of work and 15 minutes of self-care. POST `/api/receipts` returned 201; printed result shows 8 giờ 15 phút total and 15 phút for self. |
| PNG control | Clicking “Tải PNG” showed “Ảnh PNG đã sẵn sàng để tải.” The in-app browser did not surface a download event, so filesystem delivery in a regular browser remains unverified. |
| Persistence | The generated receipt was present in `data/runtime/receipts.json` after restarting the dev server. |

Print, copy and Web Share controls are implemented; browser-level verification remains for final QA.

## CP-05 — 7 phút cho mình (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run test` | PASS — 9 tests total, including wall-clock countdown and display formatting. |
| `npm run lint`, `npm run typecheck`, `npm run build` | PASS. |
| Mobile browser, 390 px | Start → pause at 06:56 → resume → reset to 07:00 all visible; circular and linear indicators fit with document scroll width 390 px. |
| POST `/api/events` | `timer_completed` returned HTTP 201 and appeared in private `analytics-events.json`. Test record was deleted afterward using the validated store. |

The full seven-minute wait was not run in browser; the elapsed-time helper and event API were verified separately. The completion UI should be included in final QA.

## CP-06 — product experience (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run build` | PASS before the final dynamic-rendering adjustment; rerun build at commit gate. |
| Mobile browser, 390 px | Product content, gallery, ingredient tabs, FAQ and shop disclosure fit; scroll width 375 px, no broken images. |
| Ingredient interaction | Selecting Lá Sâm Ngọc Linh changed the detail panel to the source's 3% statement and verification note. |
| FAQ | Expanded the 3% question and saw the documented answer. |
| Shop state | No unverified purchase link rendered while `officialShopUrl` is null. |

The source provides one full product image. The gallery labels missing official close-up photos instead of inventing them.

## CP-07 — community and reminders (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run lint`, `npm run typecheck`, `npm run build` | PASS. |
| Mobile browser, 390 px | Challenge and reminder pages fit without horizontal overflow. |
| Challenge form | Submitted a disposable QA entry via UI; response showed pending moderation. Public GET `/api/ugc` stayed empty. |
| Admin moderation API | Unauthenticated GET returned 401. With a temporary local test credential, login returned 200, protected GET showed the pending item, PATCH approval returned 200, and the public page then showed the item. |
| Reminder creator | Changed audience, theme and Vietnamese message; preview updated. PNG action reported success. |
| Cleanup | Deleted the exact QA submission and reminder analytics event through the validated JSON store. |

The temporary `.env.local` credential is ignored by Git and will be removed after final admin QA. The in-app browser did not expose the actual downloaded PNG file path.

## CP-08 — interactive strategy report (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run validate:json` | PASS — 9 content JSON files and 5 seed arrays. |
| `npm run lint`, `npm run typecheck`, `npm run build` | PASS. |
| Mobile browser, 390 px | Eight report sections render; document scroll width 375 px; no horizontal overflow. |
| Interactive SWOT and 7Ps | Selecting W changed the detail to weaknesses. Selecting Physical evidence changed the 7Ps panel to the seventh item. |
| Planned data labeling | 500/400/100 million VND budget, chart, KPI targets and absent real results are explicitly labeled as plan versus actual. |

The report summarizes pages 12–37 of the supplied 38-page PDF. A dev-server hot reload briefly kept a stale schema; a server restart resolved it, and the production build passed.

## CP-09 — contact and admin (2026-11-03)

| Check | Result |
| --- | --- |
| `npm run validate:json`, `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build` | PASS; 9 unit tests. |
| Contact page, mobile 390 px | Exact four names, `mailto:` and `tel:` links match team JSON; no horizontal overflow. |
| Contact form | Disposable QA message submitted via browser; success status and private JSON record verified. Admin dashboard showed one contact and admin contacts displayed the message. Record deleted afterward. |
| Admin access | Direct dashboard navigation redirected to login. Unauthorized stats, contacts, submissions and settings APIs returned 401. |
| Temporary local test session | Login 200, protected dashboard/contacts/settings loaded, same-value settings save succeeded, invalid JSON was rejected in UI, `javascript:` shop URL was rejected by API with 400, logout returned to login. |
| Tracking | Clicking a product CTA created one `product_clicked` event; exact QA event deleted afterward. |
| Credential cleanup | Temporary `.env.local` removed; after server restart login controls were disabled with configuration guidance. Runtime receipt, event, UGC and contact arrays were empty. |

The content editor is a validated JSON editor, not field-by-field controls. It provides backup on save. Only HTTPS URLs are accepted for configured public links.

## CP-10 — production readiness (2026-11-03)

| Check | Observed result |
| --- | --- |
| Final JSON, tests, lint, typecheck, production build | PASS after accessibility/contrast/robots fixes — 9 content files, 5 seed arrays, 9 tests; Next.js 16.4.4 build generated all routes and Proxy. |
| HTTP routes on `npm run start` | Ten public pages returned 200. HEAD and ranged GET `/references/Tra_Sam_Truong_Nhan_SWOT_TOWS_7Ps.pptx.pdf` returned 404 without transferring the PDF. GET `/api/admin/stats` returned 401 without a session. |
| SEO | `robots.txt` and `sitemap.xml` returned 200. With no public origin configured, sitemap contained zero URLs. Calling metadata route functions with a disposable `https://example.com` origin produced ten public URLs and its sitemap reference. |
| Typography, in-app Chromium | Six required pages inspected at 390 × 844 and 1440 × 900: home, receipt, product, timer, contact and strategy. Computed body font was Mulish; H1 was Spectral at 34 px mobile and 72 px desktop. All page document widths were within viewport, H1 did not overflow, and no loaded images were broken. Screenshots showed legible Vietnamese and intentional line breaks. |
| Contrast and keyboard review | Computed palette contrast: leaf on ivory 4.61:1, secondary text on ivory 4.71:1. White on gold was 3.25:1, so button hover text was changed to dark green; small gold team numbers were deepened to 5.50:1 on ivory. Ingredient/SWOT/7Ps tabs gained Arrow/Home/End handling and roving tab focus. Code lint/typecheck/build passed; post-change keyboard interaction in a browser remains unverified. |
| UTM event and dashboard count | POST `/api/events` with a disposable UTM payload returned 201. Private JSON contained one matching event, `getAdminStats()` returned source `qa-cp10` with count 1, and validated deletion of that exact event returned true. Runtime arrays were all empty afterward. |
| Final HTTP smoke test after build | Ten public routes 200, unknown route 404, PDF reference route 404, protected stats API 401; `robots.txt` disallows admin and references. |
| Dependency audit | `npm audit --omit=dev --audit-level=moderate`: 0 vulnerabilities. Full audit: 16 moderate advisories in the development ESLint/minimatch chain; suggested force fix would downgrade ESLint incompatibly. |

Native Chrome automation stopped because the Computer Use tool could not determine the existing browser window's URL with confidence. The separate in-app Chromium QA above completed. Actual PNG file delivery in regular Chrome and the seven-minute completion UI remain unverified; prior UI action status, calculation unit tests and completion API checks are recorded in CP-04/CP-05/CP-07.

# CP-11 — Word content amendment (2026-11-04)

| Check | Observed result |
| --- | --- |
| Word source | Extracted all 183 nonempty paragraphs and reviewed an 18-image contact sheet plus the channel-role image. Mapped notes to the navigation, company, challenge, product and strategy sections. |
| JSON and code | `npm run validate:json` passed for 10 content files and 5 seed arrays; `npm run typecheck` passed; `npm run test` passed all 9 tests; `npm run build` compiled all routes. |
| Mobile browser, 390 × 844 | Home, company, product, challenge and strategy loaded; document width was 375 px against a 390 px viewport with no horizontal overflow. Challenge showed the four revised steps; product gallery showed one note; strategy showed six channel roles, six KPI cards and three phase cards. |
| Phase interaction | Opening the first phase revealed weeks 1–4. Computed phase-card radius was 18 px and primary-button radius 999 px. |
| Desktop browser, 1440 × 900 | Homepage document width was 1425 px against a 1440 px viewport. The full hero image retained a 1.7778 ratio. Header navigation placed `Về công ty` second and fit without internal overflow. |
| External rules | The Google Drive URL from the Word file was added as a labeled link; the web tool could not access its content, so the linked rules and hashtag remain unverified. |

## CP-12 — Typography update (2026-11-04)

| Check | Observed result |
| --- | --- |
| Font provenance | Inter and Fraunces variable TTF files plus OFL texts downloaded from `google/fonts` official repository. Bogart was not bundled because no licensed web asset or kit was available; user approved Fraunces temporarily. |
| Vietnamese glyphs | `fontTools` cmap checks of Inter, Fraunces upright and Fraunces italic found no missing letters across all `.tsx` source and content JSON, including the required Vietnamese sample. |
| Build and lint | `npm run build` passed on Next.js 16.4.4 after the font change; TypeScript compiled and all routes generated. `npm run lint` passed without warnings. |
| Mobile browser, 390 × 844 | Home plus receipt, timer, product, contact, strategy and company pages used computed Fraunces headings and Inter body text. All six checked routes had H1 width within its box and document scroll width 375 px, below the 390 px viewport. Screenshots showed legible Vietnamese and no clipped headings. |
| Desktop browser, 1440 × 900 | Homepage used the new computed fonts; H1 and navigation had no internal overflow and document scroll width was 1425 px. |

## CP-13 — Revised Word content (2026-11-05)

| Check | Observed result |
| --- | --- |
| Revised Word source | Extracted 251 nonempty paragraphs and reviewed 19 embedded images. The additions cover brand role/USP, a four-step receipt microsite proposal, monitoring cadence and six response scenarios. |
| Content and schema | `npm run validate:json` passed for 10 content files and 5 seed arrays. New strategy data has three brand-role cards, four receipt concept steps, four monitoring groups and six trigger rules. |
| Code gates | `npm run lint`, `npm run typecheck`, `npm run test` (9 tests) and `npm run build` passed on Next.js 16.4.4. |
| Browser at 1280 px | Strategy page rendered the new copy. Navigation displayed the restored product link in the requested order. Computed body font was Inter and heading font was Fraunces. Document width 1265 px stayed within the 1280 px viewport. |
| Browser at 390 px | Strategy and product pages rendered with document width 375 px against a 390 px viewport. The mobile menu opened and showed all seven links, and product copy displayed the revised convenience/7-minute positioning. |
| Browser at 1100 px | The added menu item initially caused 13 px of horizontal overflow. Moving the menu breakpoint to 1200 px reduced document width to the 1085 px client width; the page then had no horizontal overflow. |
| Claims and plan labeling | The receipt quiz and voucher are labeled as proposed, while the current receipt remains based on entered time. Unverified effects and shop links were not added. The ROAS unit conflict is visible next to its trigger rules. |

## CP-14 — Word deletion clarification (2026-11-05)

| Check | Observed result |
| --- | --- |
| Word image mapping | There are two `BỎ` captions: one after `image3.png` (homepage challenge paragraph) and one after `image6.png` (product gallery note `Một tách trà`). |
| Removal | Deleted the entire homepage paragraph, including its previously retained opening sentences. Search found no remaining copy of the removed product-gallery caption; the gallery contains only the `Hộp trà` note. |
| Code gates | Lint, typecheck and production build passed. |
| Browser | Homepage challenge section showed the heading and four steps with no paragraph beside the heading; document width 1265 px within a 1280 px viewport. Product gallery had only the `Hộp trà` note and no removed caption. |

## CP-15 — Homepage story removal (2026-11-05)

| Check | Observed result |
| --- | --- |
| Source review | The standalone `home-story` section and `#cau-chuyen` target are absent. The intro scroll link points to existing `#hoa-don`; remaining feature labels run 01–06. Community challenge content remains. |
| CSS review | Selectors used only by the removed story section were deleted. |
| Code gates | `npm run lint`, `npm run typecheck`, and `npm run build` passed on Next.js 16.4.4. |

## CP-16 — Ingredient imagery (2026-11-05)

| Check | Observed result |
| --- | --- |
| Source image review | Inspected all 11 files in `anhweb`: three clearly labeled ingredient photos and eight packaging, brewing, or lifestyle images. Copied only the three matching photos to `public/images/ingredients/`. |
| Data and code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed on Next.js 16.4.4. |
| Interactive browser check | In headless Chrome, selecting táo đỏ, đẳng sâm, and cam thảo loaded their images (`naturalWidth > 0`). Selecting lá đinh lăng showed the placeholder without an image. |
| Responsive browser check | At 390 px and 1440 px, the ingredient section rendered with document width equal to viewport width and no horizontal overflow. Screenshots reviewed for layout and readable labels. |

## CP-17 — Full ingredient image cards (2026-11-06)

| Check | Observed result |
| --- | --- |
| New image review | Inspected the four newly named ingredient photos in `anhweb` and copied them to `public/images/ingredients/`; unrelated `xxx.jpg` was excluded. |
| Data and code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed on Next.js 16.4.4. |
| Interactive browser check | Headless Chrome selected all seven ingredient tabs at 390 px and 1440 px. Every selected image loaded (`naturalWidth > 0`), filled the detail card, and had its text over the image. |
| Responsive review | At both widths, document width equaled viewport width with no horizontal overflow. Screenshots for táo đỏ and lá Sâm Ngọc Linh showed readable title, description, percentage, and illustration label over the full-card image. |

## CP-18 — Ingredient label removal (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Browser check | At 390 px in headless Chrome, no “Hình minh họa do nhóm cung cấp” label or matching lead phrase appeared. Táo đỏ and lá Sâm Ngọc Linh images still loaded after tab selection; document width equaled the viewport width. |

## CP-19 — Challenge guide video (2026-11-06)

| Check | Observed result |
| --- | --- |
| Supplied media | `4-Step Joining Guide Video.mp4` is 23,295,557 bytes, 20.015 seconds, 1080 × 1920, H.264 video and AAC audio. Representative frames from each step were inspected. |
| Code gates | `npm run lint`, `npm run typecheck`, and `npm run build` passed on Next.js 16.4.4. |
| Browser layout | At 390 px and 1440 px in headless Chrome, the poster and four cards rendered; document width equaled viewport width with no horizontal overflow. Screenshots were inspected. |
| Browser playback | The video reported 20.015-second metadata and 1080 × 1920 dimensions. Calling `play()` advanced `currentTime` to 0.57 seconds with no media error. |
| External page | The supplied Vercel URL could not be opened by the web tool; verification used the corresponding local `/thu-thach` route. |

## CP-20 — Read-only runtime reads and live verification (2026-11-06)

| Check | Observed result |
| --- | --- |
| Failure before fix | After CP-19 deployed, Vercel marked deployment successful but `/thu-thach` streamed an error digest; GET `/api/ugc` returned 500. The route read a missing runtime JSON file, which attempted a write in the read-only deployment. |
| Code gates | `npm run test` passed 9 tests, including a read-without-file-creation assertion; lint, typecheck, and production build passed. |
| Live page after fix | Vercel status for `a060d8f` was successful. The public `/thu-thach` HTML contained the video source with no streamed error digest; GET `/api/ugc` returned 200 with `{"items":[]}`. |
| Live playback | Headless Chrome opened the public URL at 390 px; all four steps rendered, document width equaled viewport width, and the 20.015-second video advanced to 1.02 seconds with no media error. |

## CP-21 — Remove unavailable rules file (2026-11-06)

| Check | Observed result |
| --- | --- |
| Source and code gates | No visitor-facing `thể lệ` reference remained in `src` or `data/content`. `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px, the challenge page retained one video and four steps, had no old Drive link or rules block, and fit the viewport. The homepage CTA read “Xem hướng dẫn và tham gia”. |
| Live deployment | Vercel reported successful deployment of `3af1a57`. The public `/thu-thach` HTML contained the video, no old Drive link, and no streamed error digest. |
| Live browser | At 390 px, the challenge page showed one video and four steps, no rules-file phrase or Drive link, and no horizontal overflow. The homepage CTA matched the new wording. |

## CP-22 — Ingredient percentages in product list (2026-11-06)

| Check | Observed result |
| --- | --- |
| Data and code gates | The seven requested percentages matched existing `ingredients.json` values. `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Product browser check | Headless Chrome at 390 px and 1440 px showed all seven ingredient names with their percentages; the final label read “Lá Sâm Ngọc Linh (3%) – Quốc bảo Nam Trà My”. Document width equaled viewport width at both sizes. |
| Live deployment | Commit `8ba5553` was pushed to `origin/main`, but GitHub still showed no Vercel status and the public `/san-pham` HTML served the prior ingredient list at the time of this check. Live verification remains pending. |
| Later live verification | Vercel status for `0dce7ad` became successful. Headless Chrome at 390 px read all seven requested labels from the public `/san-pham` list, including “Lá Sâm Ngọc Linh (3%) – Quốc bảo Nam Trà My”; document width equaled viewport width. |

## CP-23 — Interactive product journey (2026-11-06)

| Check | Observed result |
| --- | --- |
| Supplied images | Reviewed the source cover and `anhweb` photos. Copied the matching box/sachet and finished-tea images to stable public paths without changing the originals. |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Interactive browser | Headless Chrome at 390 px and 1440 px showed package, gathering, brewing, and finished-cup scenes in order. Ingredient images, tea-bag filling, water/tea animation, skip, and replay worked. No horizontal overflow at either width. Screenshots reviewed for all four scenes. |
| Reduced motion | With `prefers-reduced-motion: reduce`, the sequence reached the finished cup, skip worked, and no page errors occurred. |
| Live deployment | Vercel reported `e96ebe7` successful. The public `/san-pham` page contained the new journey and no old gallery. |
| Live browser | At 390 px and 1440 px, clicking the start control moved the journey from `package` to `cup`; both supplied photos loaded, document width matched viewport width, and there were no page errors. |

## CP-24 — Remove visitor-facing source citations (2026-11-06)

| Check | Observed result |
| --- | --- |
| Text audit | Visitor code and content JSON had no remaining “tài liệu”, “file Word”, “file nội dung”, “file chỉnh sửa”, “Nguồn:”, or rendered document-page citations. Internal provenance was retained. |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | Headless Chrome at 390 px opened `/`, `/san-pham`, `/ve-du-an`, `/chien-luoc`, and `/thu-thach` with HTTP 200, no visible source-citation phrases, no horizontal overflow, and no page errors. |
| Live deployment | Vercel reported source commit `123de96` successful. |
| Live browser | Headless Chrome at 390 px opened `/`, `/san-pham`, `/ve-du-an`, `/chien-luoc`, and `/thu-thach` with HTTP 200, no visible source-citation phrases, no horizontal overflow, and no page errors. Clicking all 12 product and 25 strategy controls revealed no source-citation phrases or page errors. |

## CP-25 — Campaign phase pages (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. The build included `/giai-doan/[slug]`. |
| Local routes | Headless Chrome at 390 px and 1440 px loaded the homepage and all three phase routes with HTTP 200, three homepage cards, four weekly panels and two video slots per phase, three switcher links, no horizontal overflow and no page errors. |
| Visual review | Reviewed mobile `Bấm hoãn` full-page and desktop `Làm ngay` hero and homepage phase cards. Text, decorative illustrations and card layout were readable at both sizes. |
| Navigation | Clicking a homepage phase card and a phase switcher link navigated to the intended local route. |
| Production | Intentionally not checked or changed, as requested by the user. |

## CP-26 — Positioning and USP copy (2026-11-06)

| Check | Observed result |
| --- | --- |
| Content preservation | All supplied headings, statements, three USP pillars, two brand roles, and three highlight lines were stored in `strategy-report.json` and found in the local strategy page's rendered text. Existing brand-role cards remained. |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | Headless Chrome at 390 px and 1440 px loaded `/chien-luoc` and `/san-pham` with HTTP 200, no horizontal overflow, and no page errors. The product summary rendered on both sizes. |
| Visual review | Reviewed strategy positioning block screenshots at 390 px and 1440 px. Headings, copy, cards, and highlight were readable. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-27 — Highlight label removal and project repair (2026-11-06)

| Check | Observed result |
| --- | --- |
| Reproduced failure | `npm run typecheck` failed with three missing-property errors for `highlightHeading` and `highlight` in `PositioningDraft.tsx`, plus an implicit-any error for `line`. The schema had removed both fields while the component still used them. |
| Fix and code gates | Removed the JSON/UI heading, retained the three highlight lines, and restored the typed `highlight` array. `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 with all three highlight lines, no “HIGHLIGHT BOX” label, no horizontal overflow, and no page errors. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-28 — TOWS revision (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed with exactly three TOWS records. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 and displayed S-O (Tận dụng), W-O (Khắc phục), and W-T (Phòng ngừa) with the requested sentences. S-T was absent; no page errors or horizontal overflow occurred. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-29 — Detailed 7Ps (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed after the 7Ps data and component change. |
| Local browser | Headless Chrome at 390 px and 1440 px opened `/chien-luoc` with HTTP 200. All seven tabs showed their full title, subtitle, and 4–6 requested points; ArrowRight selected the next tab. No page errors or horizontal overflow occurred. |
| Visual review | Reviewed desktop Product and mobile Physical Evidence panels. The detailed content remained readable and the plan-status note distinguished unverified price/legal/manufacturing copy. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-30 — Customer context (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run typecheck`, `npm run lint`, and `npm run build` passed after replacing the market cards. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200. The section displayed the supplied truth, all four pains, motivation and four drivers; the “Càng quý…” quote remained and the old three market cards were absent. No page errors or horizontal overflow. |
| Visual review | Reviewed the full context section at mobile and desktop widths. The layout stayed readable and the plan/price note was visible. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-31 — Truth label spacing (2026-11-06)

| Check | Observed result |
| --- | --- |
| Local browser | At 1440 px, the quote began 16 px after the “Sự thật:” label. At 390 px, it remained stacked 12 px below. `/chien-luoc` returned HTTP 200 at both widths with no page errors or horizontal overflow. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-32 — Channel roles and measurement (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | Headless Chrome opened `/chien-luoc` with HTTP 200 at 390 px and 1440 px. The new heading, all six channel cards, and all three measurement paths rendered. No page errors or horizontal overflow occurred. |
| Visual review | Reviewed section screenshots at both widths; the cards and paths remained legible. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-33 — Restore four content pillars (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 and showed all four restored pillars after the three measurement paths. The six channel cards remained visible; no page errors or horizontal overflow occurred. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-34 — Receipt quiz journey (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed after adding the quiz and settings. |
| Local browser | At 390 px and 1440 px, Chrome completed the entry, all three questions, result, PNG download, and product touchpoint with no page errors or horizontal overflow. Inputs of 0 self-care minutes and 3 delays produced 0 and 21; inputs of 15 self-care minutes and 0 delays produced 15 and 0. The PNG header reported 1080 × 1920 px. The share fallback downloaded the PNG. Both purchase buttons remained disabled while official URLs were null; the detailed receipt section remained available. |
| Homepage | `/` returned HTTP 200 at both widths, displayed the four-step summary, and had no horizontal overflow. |
| Detailed receipt | Expanded the original form and found all 16 hour/minute fields. In print media, the quiz and form controls were hidden as intended for the detailed receipt print view. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-35 — Weekly phase plan and video slots (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed after updating W1–W12 and the media schema. |
| Local browser | Each phase route returned HTTP 200 at 390 px and 1440 px. Each showed four weeks. Activity counts were 3/2/2/1, 3/3/2/2, and 2/3/2/3. Single-video placeholders numbered 5, 5, and 7; phase 2 also showed two distinct empty series lists in W6. No page errors or horizontal overflow occurred. |
| Visual review | Reviewed the first week card of each phase and the W6 series card on mobile; activity text, media placeholders, and goals stayed readable. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-36 — Monitoring cadence copy (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 and displayed all four supplied titles, metric lists, uppercase cadences, and source tools. No page errors or horizontal overflow occurred. |
| Visual review | Reviewed the monitoring cards at both widths; long tool names wrapped within their cards. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-37 — Risk response table (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 with all three table headers and six numbered scenarios. No page errors or horizontal overflow occurred. |
| Content | The local page showed the supplied CVR, UGC, ROAS, and delivery thresholds; the final response text matched the supplied Shopee Mall and Zalo ZNS action. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-38 — Revised risk accordion (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 with five risk summaries. The first action was hidden until its summary was clicked; no table, page errors, or horizontal overflow occurred. |
| Content | Checked all five revised titles and the first and last action/fallback text in local Chrome. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-39 — Softer section design (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | `/`, `/san-pham`, `/chien-luoc`, and `/giai-doan/bam-hoan` returned HTTP 200 at 390 px and 1440 px. Section upper corners measured 24 px and 40 px respectively; no page errors or horizontal overflow. |
| Visual review | Reviewed the cover-to-intro transition, challenge cards, product introduction, and weekly phase cards at both widths. Text and media placeholders remained readable. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-40 — Sticky header and strategy phase links (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Local browser | At 390 px and 1440 px, the header stayed at viewport top after scrolling. The mobile menu opened, three compact phase cards rendered without child details, and clicking phase one reached `/giai-doan/bam-hoan`. No page errors or horizontal overflow occurred. |
| Visual review | Reviewed sticky header and strategy phase cards at both widths. Header corners and cards remained readable, and adjacent report sections did not overlap card content. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-41 — Receipt summary and scroll depth (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, and `npm run build` passed. |
| Receipt page | At 390 px and 1440 px, `/hoa-don-cho-doi` returned HTTP 200. The detailed receipt summary was fully visible, its center was the topmost clickable element, and the footer started below it. Clicking opened the detailed receipt form. No page errors or horizontal overflow occurred. |
| Scroll behavior | On `/`, outgoing section scale progressed from about 0.995 to 0.965 as it left the viewport in local Chrome. A homepage phase link remained clickable. With reduced motion enabled, the scroll animation was absent. |
| Production | Not checked, pushed, or deployed, as requested by the user. |

## CP-42 — Production deployment (2026-11-06)

| Check | Observed result |
| --- | --- |
| Pre-deployment gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test` (9 tests), `npm run build`, and `git diff --check` passed for commit `bf5eecb`. |
| Source | `bf5eecb` and the preceding 17 local commits were pushed to `origin/main`. GitHub Vercel status for `bf5eecb` changed from pending to success with “Deployment has completed.” |
| Production routes | At 390 px and 1440 px, `/`, `/san-pham`, `/chien-luoc`, `/hoa-don-cho-doi`, and `/giai-doan/bam-hoan` each returned HTTP 200 with no page errors or horizontal overflow. |
| Production interactions | Header stayed at the viewport top on the strategy page; all three phase cards and five risk items rendered; phase one opened its detail route; the detailed receipt summary was unobscured and opened on click. |
| Remaining limitation | Vercel's read-only application directory does not persist JSON-backed form submissions. A writable host or persistent storage is still needed for live submissions. |

## CP-43 — Header logo (2026-11-06)

| Check | Observed result |
| --- | --- |
| Asset | Supplied `logo.png` is a 1299 × 1211 RGBA image. Its public copy loaded through Next Image. |
| Code gates | `npm run lint` and `npm run build` passed; the production build also completed its TypeScript check. |
| Local browser | Chrome at 390 px and 1440 px showed the new header logo at 58 px and 72 px high respectively. The image loaded and neither viewport had horizontal overflow. Header screenshots were reviewed. |
| Production | Not pushed or deployed; this user request concerned the local site. |

## CP-44 — Browser tab icon (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local HTTP | GET `/` returned 200 with `<link rel="icon" href="/images/logo-truong-nhan.png" type="image/png"/>`; HEAD for that PNG returned 200 with `Content-Type: image/png`. |
| Production | Not pushed or deployed. |

## CP-45 — Market context balance (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Desktop browser | At 1440 px, both columns measured 224 px high. Their headings and body text started at matching vertical positions; body text used the same Inter font, 16 px size, and 25.6 px line height. |
| Responsive browser | At 900 px and 390 px the columns stacked. All three checked widths had no horizontal overflow; screenshots were reviewed. |
| Production | Not pushed or deployed. |

## CP-46 — TOWS card arrows (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local rendering | GET `/chien-luoc` showed three TOWS cards and no SVG within the TOWS grid. All three heading and body texts remained in the rendered HTML. |
| Production | Not pushed or deployed. |

## CP-47 — Product introduction image (2026-11-06)

| Check | Observed result |
| --- | --- |
| Asset | `sanpham.jpg` is 1254 × 1254 px; the displayed image uses the same square ratio. |
| Code gates | `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local browser | At 390 px, the image rendered at 318 × 318 px inside a 350 × 350 px frame. At 1440 px, it rendered at 626 × 626 px inside a 659 × 659 px frame. The image loaded, no horizontal overflow occurred, and both screenshots showed the full package. |
| Production | Not pushed or deployed. |

## CP-48 — SWOT sizing (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local browser | At 390 px, 900 px, and 1440 px, all four cards measured 110 px high with a 9 px key-to-label gap. The short T panel measured 232 px; switching to S expanded the panel as needed and its four entries fit. No horizontal overflow occurred. |
| Visual review | Inspected mobile and desktop T-state screenshots; keys, labels, and detail text remained readable. |
| Production | Not pushed or deployed. |

## CP-49 — SWOT bullets (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local browser | At 390 px and 1440 px, S and T selections reported `list-style-type: disc`, all list items fit their panels, and neither viewport overflowed horizontally. Screenshots showed a visible gold bullet beside each T item. |
| Production | Not pushed or deployed. |

## CP-50 — Contact avatars (2026-11-06)

| Check | Observed result |
| --- | --- |
| Source mapping | Four supplied portrait filenames matched the four team-member names; copies were placed under `public/images/team/` and referenced from team JSON. |
| Code gates | `npm run validate:json` passed all ten content and five seed files; `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local browser | At 390 px and 1440 px, `/lien-he` returned 200. All four cards showed loaded portraits whose alternative text matched each member's name. No horizontal overflow; contact-grid screenshots reviewed. |
| Production | Not pushed or deployed. |

## CP-51 — Phase media (2026-11-06)

| Check | Observed result |
| --- | --- |
| Source mapping | Inspected nine vertical MP4s and four posters. W1, W2, W3, W5 (two clips), W6, W8, W11 and W12 have video; W1, W2, W6 and W9 have posters. All thirteen configured asset paths exist; W5 is the only two-video series. |
| Storage | The thirteen copied assets total 440,109,382 bytes. The nine MP4s are tracked through Git LFS; poster images are regular Git assets. |
| Code gates | `npm run validate:json` passed ten content and five seed files; `npm run lint` and `npm run build` passed, including the build's TypeScript check. |
| Local routes | At 390 px and 1440 px, all three phase routes returned 200 with four weeks each. Phase media counts were 3/2 video/poster for Bấm hoãn, 4/1 with one series for Làm ngay, and 2/1 for Gửi lời nhắc. All posters loaded; no page errors or horizontal overflow. |
| Playback | On mobile Chrome, the first video in each phase exposed 1080 × 1920 metadata and advanced to 0.64–0.76 seconds after `play()`, with no media error. Representative week screenshots were reviewed at mobile and desktop widths. |
| Content caveat at CP-51 | The clip was initially placed at W11 according to its supplied filename; CP-52 records the supplier's correction to W10. W9 poster displays a visible note that its stories, QR code and link are unverified. |
| AI clip note | W6 video is visibly labeled as AI-simulated because the supplied filename identifies it as such; the page does not treat it as verified KOL/KOC participation. |
| Production | Not pushed or deployed. |

## CP-52 — W10 media correction (2026-11-06)

| Check | Observed result |
| --- | --- |
| Data and asset | The W10 media entry points to `/videos/phases/w10-lan-nay-minh-nhac-ban.mp4`; W11 has no media entry. The public MP4 was renamed with `git mv` and still matches the Git LFS rule. Planned activities are unchanged. |
| Code gates | `npm run validate:json`, `npm run lint` and `npm run build` passed. |
| Local browser | `/giai-doan/gui-loi-nhac` returned 200. W10 rendered exactly the corrected video source; W11 rendered no video. In mobile Chrome, the W10 clip loaded 1080 × 1920 metadata and advanced to 0.34 seconds after `play()` with no media error. |
| Production | Not pushed or deployed. |

## CP-53 — Weekly phase layout (2026-11-06)

| Check | Observed result |
| --- | --- |
| Code gates | `npm run lint` and `npm run build` passed, including TypeScript. |
| Layout | At 1440 px, the first week card computed to approximately 210 px and 839 px columns; its media grid computed to two equal 409 px columns and its week indicator was sticky. At 768 px and 390 px, both the card and media grid computed to one column, with a static week indicator above the content. |
| Routes | `/giai-doan/bam-hoan`, `/giai-doan/lam-ngay` and `/giai-doan/gui-loi-nhac` returned 200 at 390 px and 1440 px. Each had four week cards, expected media columns, and no horizontal overflow. Representative first-week cards were visually reviewed at 390 px, 768 px and 1440 px. |
| Content | Existing weekly activities, media mapping, W5 series and goals were retained. Posters remain uncropped and keep their full-size links. |
| Production | Not pushed or deployed. |

## CP-54 — Weekly media order (2026-11-07)

| Check | Observed result |
| --- | --- |
| Mixed weeks | At 390 px and 1440 px, W1, W2 and W6 rendered poster then video. Poster appeared above video on mobile and to its left on desktop. |
| Single and series weeks | W3, W8, W10 and W12 rendered their lone video at the grid's left edge. W5 remained one two-video series. |
| Code gates | `npm run lint` and `npm run build` passed, including TypeScript. |
| Production | Not pushed or deployed. |

## CP-55 — Production deployment (2026-11-07)

| Check | Observed result |
| --- | --- |
| Pre-deployment gates | `npm run validate:json`, `npm run lint`, `npm run test` (9 tests), `npm run build`, `npm audit --omit=dev --audit-level=moderate` (0 vulnerabilities), and `git diff --check` passed. |
| Initial push | `13e6629` and the preceding local commits were pushed to `origin/main`; nine Git LFS objects totaling 435 MB uploaded. Vercel status reached success. Seven public routes returned 200, and the new avatar and poster assets returned image responses. |
| Media defect | Public W10 and W5 video responses were 133-byte Git LFS pointers, despite HTTP 206 and `video/mp4`; the W10 response contained the pointer's SHA-256 and declared 39,122,476-byte size. |
| Resolver check | A copied W5 pointer was resolved to a 23,295,557-byte MP4 with matching SHA-256. `npm run lint` and the updated `npm run build` passed locally. |
| Resolver deployment | Commit `d2ed383` was pushed to `origin/main`; the Vercel status reached success with “Deployment has completed.” |
| Full video files | All nine public MP4 URLs returned HTTP 206 for byte ranges, with total lengths matching their full local files (23,295,557–90,377,562 bytes). W10, W5 and W2 returned 1,024 real video bytes for 0–1023 requests. |
| Browser playback | Mobile Chrome loaded each of the three phase pages with four weeks, no page errors or horizontal overflow. The first video in W1, W5 and W10 reported 1080 × 1920 metadata and advanced to 0.61–0.66 seconds after `play()` with no media error. |
| Pending edits on production | `/san-pham` showed the revised “Lá Sâm Ngọc Linh (3%)” tab label; `/lien-he` loaded the new `tran-thi-tuong-vy.png` portrait. Both returned 200. |
| Remaining limitation | JSON-backed form submissions cannot persist on Vercel's read-only application directory; this deployment did not change storage. |

## CP-56 — Cross-device phase video codec (2026-11-07)

| Check | Observed result |
| --- | --- |
| Codec audit | Inspected all ten public MP4 files. Nine used H.264/AVC High Level 4.0 with AAC-LC audio; W3 alone used HEVC (`hvc1`) with AAC-LC, explaining the reported audio-only behavior on devices without HEVC video support. |
| Conversion | W3 changed from HEVC to H.264 High Level 4.0, 8-bit `yuv420p`, with AAC audio copied and fast-start metadata. It kept its 718 × 1280 dimensions, 29.8-second duration and all 894 decodable video frames. The new file is 8,053,723 bytes. |
| Local gates | `npm run validate:json`, `npm run lint`, `npm run test` (9 tests), `npm run build` (including TypeScript), and `git diff --check` passed. Local Chrome at 390 px loaded W3, advanced to 1.70 seconds with no media error and produced a nonblank canvas frame. |
| Deployment | Commit `1884949` and its 8.1 MB Git LFS object were pushed to `origin/main`; GitHub's Vercel status reported success and “Deployment has completed.” |
| Production media | W3 returned HTTP 206 with `Content-Type: video/mp4` and a total length of 8,053,723 bytes. A full download had the same SHA-256 as the local transcoded file. |
| Production playback | Mobile-width Chrome opened `/giai-doan/bam-hoan` with HTTP 200, loaded W3 at 718 × 1280, advanced to 1.67 seconds without a media error, and yielded a nonblank rendered frame. Physical devices with the original symptom were not available for direct testing. |

## CP-57 — Latest production assets (2026-11-07)

| Check | Observed result |
| --- | --- |
| Scope | The tracked website diff was a new 1086 × 1141 PNG crop for Trần Thị Tường Vy and deletion of an unused JPG. Team JSON already referenced the PNG. Untracked `anhweb/` source assets were left outside the release. |
| Local gates | `npm run validate:json`, `npm run lint`, `npm run build` including TypeScript, and `git diff --check` passed. Local Chrome at 390 px and 1440 px returned HTTP 200 for `/lien-he`; the portrait loaded and neither viewport overflowed horizontally. |
| Deployment | Commit `5bc739f` was pushed to `origin/main`; Vercel status reached success with “Deployment has completed.” |
| Production | The PNG URL returned HTTP 200 with 1,451,068 bytes. Mobile-width Chrome loaded the optimized portrait at 88 × 92 px on `/lien-he` with HTTP 200. The removed JPG URL returned HTTP 404. |

## CP-58 — Corrected 8-week campaign data (2026-11-09)

| Check | Observed result |
| --- | --- |
| Word extraction | Read all 295 non-empty document paragraphs, including the 8-week split, ten implementation budget rows, three phase totals, nine KPI targets/milestones and W1–W8 asset statuses. |
| Code gates | `npm run validate:json`, `npm run typecheck`, `npm run lint`, `npm run test` (9 tests), `npm run build` and `git diff --check` passed. |
| Content regression | Repository search outside historical docs and binary references found no visitor-facing “12 tuần”, W11/W12, 350.000 Hero views, 250 UGC, 3,5% ROAS, 18% Microsite CVR or 45% NPS values. All configured phase media paths exist. |
| Strategy page | At 390 px and 1440 px, `/chien-luoc` returned HTTP 200 with no page errors or document overflow. It rendered 10 implementation bars, 11 budget rows including reserve, 10 phase-budget rows, 9 KPI cards and 3 KPI milestone rows. The horizontally wide budget table remained contained in its scroll region on mobile. |
| Phase pages | At 390 px, all three routes returned HTTP 200 with 2, 3 and 3 week cards, headings “Hai tuần” or “Ba tuần”, 8/10/9 activity status labels, no page errors and no horizontal overflow. Mobile and desktop screenshots of the changed sections were reviewed. |
| Production | Not pushed or deployed; this checkpoint was verified locally. |

## CP-59 — Fixed value-consideration price (2026-11-09)

| Check | Observed result |
| --- | --- |
| Content | Market pain card 04 now states “390.000 đồng/hộp”; its title and surrounding sentence remain unchanged. |
| Code gates | `npm run validate:json`, `npm run lint` and `git diff --check` passed. |
| Production | Not pushed or deployed. |

## CP-60 — Production deployment (2026-11-09)

| Check | Observed result |
| --- | --- |
| Release gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test` (9 tests), `npm run build`, `npm audit --omit=dev --audit-level=moderate` (0 vulnerabilities), and `git diff --check` passed. |
| Source and deployment | Pushed `4634bf0..6f274a4` to `origin/main`. GitHub's Vercel status for `6f274a4` reached success with “Deployment has completed.” |
| Production routes | `/`, `/chien-luoc`, all three `/giai-doan/*` pages, `/san-pham`, `/lien-he`, and `/hoa-don-cho-doi` each returned HTTP 200 on `https://web-tra-sam-truong-nhan.vercel.app`. |
| Campaign content | Live `/api/campaign` data deeply matched the local JSON; phase ranges were W1–W2, W3–W5 and W6–W8 with 2, 3 and 3 weeks. The live strategy HTML contained the revised 390,000 VND per box card copy. |
| Media | W1, W4, W7 and W8 MP4 range requests returned HTTP 206, 1,024 bytes with MP4 headers, and full-file lengths rather than Git LFS pointers. |
| Remaining limitation | Vercel's read-only application directory still prevents persistent JSON-backed form submissions. This release did not change storage. |

## CP-61 — Final Word campaign corrections (2026-11-09)

| Check | Observed result |
| --- | --- |
| Source extraction | Read the three W1–W8 tables (28 activity rows) and inspected both embedded KPI screenshots in `F:\final.docx`. No tracked changes or comments were present. |
| Content reconciliation | All 28 activity statuses match the document. After edits, 26 visitor-facing titles match exactly; the W1 and W2 titles intentionally omit internal week-transfer notes. The W6 website card feature is present as the first activity in that week. |
| KPI | The P2 milestone renders “Hero Video W2 ≥ 150.000 lượt xem lũy kế”; the existing separate Hero Video KPI card already states publication in W2 and measurement through W5. |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test` (9 tests), `npm run build` and `git diff --check` passed. |
| Local browser | Chrome at 390 px and 1440 px returned HTTP 200 for `/chien-luoc` and all three phase routes. The KPI table displayed the W2 target, phase pages had 2/3/3 week cards, W6 had three activities, and no document overflow occurred. KPI and W6 screenshots were reviewed. |
| Production | Not pushed or deployed; this checkpoint was verified locally. |

## CP-62 — Revised final Word table (2026-11-09)

| Check | Observed result |
| --- | --- |
| Source revision | The updated `F:\final.docx` had a new modification time and SHA-256 `AF039AE4C2B7D591F7AE5D385645E487F4E281D75877FF3E01E84BE514CF5185`. Text comparison found four changed table rows; both KPI images had the same hashes as in CP-61. |
| Content comparison | All 28 revised Word rows now match the local campaign JSON exactly in week, title, order and status. The W2 Hero Video suffix and product-video description are removed; the W6 website launch entry is “Chưa làm”. |
| Code gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test` (9 tests), `npm run build` and `git diff --check` passed. |
| Local browser | Chrome at 390 px and 1440 px returned HTTP 200 for phase 1 and phase 3. All W2 activity titles matched the revised JSON; the W6 launch row used the `not_done` status class, and neither page had horizontal document overflow. |
| Production | Not pushed or deployed; this checkpoint was verified locally. |

## CP-63 — Production deployment (2026-11-09)

| Check | Observed result |
| --- | --- |
| Release gates | `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test` (9 tests), `npm run build`, `npm audit --omit=dev --audit-level=moderate` (0 vulnerabilities) and `git diff --check` passed. |
| Source and deployment | Pushed `6f41075..4291b1b` to `origin/main`; GitHub's Vercel status for `4291b1b` reached success with “Deployment has completed.” |
| Production content | `/`, `/chien-luoc` and all three phase routes returned HTTP 200. Live `/api/campaign` deeply matched the local JSON, including revised W2 titles and the W6 `not_done` status. The strategy page retained “Hero Video W2”. |
| Production media | W7 video returned HTTP 206 for a 1,024-byte range with MP4 header and a 39,122,476-byte total length, rather than a Git LFS pointer. |
| Responsive browser | Chrome at 390 px and 1440 px returned HTTP 200 for the strategy, phase 1 and phase 3 pages. The KPI W2 label and W6 `not_done` status rendered at both widths, with no horizontal overflow. |
| Remaining limitation | Vercel's read-only application directory still does not persist JSON-backed form submissions. |

## CP-64 — Strategy production repair (2026-11-10)

| Check | Observed result |
| --- | --- |
| Reproduction | Production `/chien-luoc` returned HTTP 200 but rendered the global error page at 390 px and 1440 px. Chrome logged React server-render error #441; the response included an error digest. |
| Root cause | After fetching 11 newer remote commits, `npm run validate:json` failed on `data/content/strategy-report.json`: its new `salesScenarios` replaced `orderSourceMix`, which the schema still required. |
| Local gates | After aligning the schema and UI, `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test` (9 tests), `npm run build` (now including JSON validation) and `git diff --check` passed. |
| Local browser | Chrome at 390 px and 1440 px displayed the strategy H1 and all four sales scenarios, with no console/page errors and no horizontal overflow. |
| Deployment | Pushed source commit `a6829c4` to `origin/main`; GitHub's Vercel status reached success with “Deployment has completed.” |
| Production browser | Chrome at 390 px and 1440 px returned HTTP 200, displayed the strategy H1 and all four sales scenarios, logged no console/page errors, and had document width equal to viewport width. |
