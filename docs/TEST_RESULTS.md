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
