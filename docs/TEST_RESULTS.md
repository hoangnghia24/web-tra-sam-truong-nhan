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
