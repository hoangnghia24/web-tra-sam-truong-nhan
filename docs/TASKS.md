# Tasks

## CP-68 — Receipt repair and latest content/assets

- [x] Reproduce the production receipt failure (HTTP 500 from `/api/receipts`).
- [x] Extract the supplied Word content and inspect its embedded screenshots.
- [x] Inventory the latest phase assets and four supplied product-document images.
- [x] Implement an honest Vercel-safe receipt fallback while preserving JSON persistence on writable hosts.
- [x] Apply the Word revisions to strategy content and UI.
- [x] Add the supplied product documents prominently to the home and product pages.
- [x] Copy and map all latest phase images/videos.
- [x] Run JSON, tests, typecheck, lint, build and responsive browser QA.
- [x] Update checkpoint evidence and continue deployment in CP-69.

## CP-69 — Production deployment and verification

- [x] Commit CP-68 source and documentation.
- [x] Push `main` and all new Git LFS objects to GitHub.
- [x] Observe the production receipt endpoint switch from HTTP 500 to HTTP 201 with ephemeral storage.
- [x] Verify seven public routes, four certificate images and representative MP4 byte ranges.
- [x] Compare live campaign data recursively with the local JSON.
- [x] Verify mobile homepage, receipt creation, strategy content and phase-video metadata in the production browser.
- [x] Record deployment evidence and leave original source-asset directories untracked.

## CP-70 — Replace cover and reconcile latest campaign artwork

- [x] Inspect the supplied and current cover images and confirm both are 1920 × 1080.
- [x] Audit all 46 phase media references against `anh_moi_nhat` by SHA-256.
- [x] Replace the stable public cover asset and use a versioned URL without changing crop behavior.
- [x] Remove five unreferenced legacy posters; retain all 46 current media assets.
- [x] Run focused code/build checks and responsive browser QA.
- [x] Record the local result and commit the verified asset change.
- [x] Keep production unchanged until the user explicitly requests deployment.

## CP-71 — Reconcile full Word detail and final cover

- [x] Re-read all Word paragraphs and tables and inspect all 11 embedded screenshots.
- [x] Compare the requested content groups with the live strategy page and computed typography.
- [x] Restore omitted PESTEL statistics and legal effective dates with the supplied qualifications.
- [x] Restore the funnel channel splits, three phase date ranges and the omitted S-T trust objective.
- [x] Verify the versioned 1920 × 1080 cover at mobile and desktop widths.
- [x] Pass JSON validation, lint, 10 tests and the production build.

## CP-72 — Deploy final cover and reconciled Word content

- [x] Commit and push the verified CP-70 and CP-71 source.
- [x] Wait for the Vercel production build to become active.
- [x] Verify the versioned cover and detailed strategy content on production.
- [x] Record the production result and commit the final checkpoint evidence.

## CP-73 — Five purchase factors interface

- [x] Replace the old motivation/list panel with one semantic five-factor section.
- [x] Use the exact supplied title, numbering, labels and descriptions.
- [x] Balance three cards on the first desktop row and two wider cards on the second.
- [x] Stack all five cards in one column on mobile.
- [x] Pass JSON validation, lint, typecheck, 10 tests and the production build.
- [x] Verify copy, dimensions, overflow and console state at 1280 px and 390 px.

## CP-74 — Deploy five purchase factors interface

- [x] Commit and push the verified CP-73 source.
- [x] Wait for the five-factor interface to become active on production.
- [x] Complete final production browser verification together with CP-76.

## CP-75 — Structured TOWS action cards

- [x] Replace each compressed TOWS body with the exact supplied lead statement and bullet items.
- [x] Render SO/WO/ST/WT titles consistently with an en dash and uppercase action word.
- [x] Add explicit visible gold bullet markers and preserve full line breaks.
- [x] Pass JSON, lint, typecheck, test and production-build gates.
- [x] Verify desktop and mobile rendering locally without horizontal overflow or console errors.

## CP-76 — Deploy structured TOWS cards

- [x] Commit and push the verified CP-75 source.
- [x] Wait for the structured TOWS copy and bullet markers to become active on production.
- [x] Verify exact copy, responsive layout, the previously deployed five-factor cards and console state on production.

## CP-77 — Keep only round-one campaign media

- [x] Inventory and hash every file in `F:\DBC_ND2_DIGICHAMPS (VÒNG LOẠI)`.
- [x] Compare the source set against configured and public phase media.
- [x] Remove the 14 phase images outside the source set; retain all 18 videos because each is an exact source match.
- [x] Convert W2/W4/W5/W6 single-image collections to poster entries.
- [x] Prove 32 source files, 32 public files and 32 unique configured references have exact SHA-256 parity.
- [x] Pass JSON, lint, typecheck, test and production-build gates.
- [x] Verify all three phase routes at desktop and mobile widths without old media references, overflow or console errors.

## CP-78 — Deploy round-one media cleanup

- [x] Commit and push the verified CP-77 source.
- [x] Wait for the reduced media configuration to become active on production.
- [x] Verify live campaign counts, representative retained assets, removed old URLs, responsive rendering and console state.

## CP-79 — Reimport every round-one video

- [x] Re-audit all 18 source MP4 files and the 18 current public videos by SHA-256.
- [x] Copy every source MP4 to a new descriptive `vong-loai-*` public path.
- [x] Update all 18 campaign references and the W2 video title to match the source file.
- [x] Remove every prior public phase-video path.
- [x] Prove the 18 source, public and configured video sets match one-to-one with no missing, extra or duplicate hash.
- [x] Pass JSON, lint, typecheck, test and production-build gates.
- [x] Verify metadata for 4/5/9 videos on all phase routes at desktop and mobile widths without overflow or console errors.

## CP-80 — Deploy reimported round-one videos

- [x] Commit and push the verified CP-79 source and Git LFS pointers.
- [x] Wait for all 18 new `vong-loai-*` URLs to become active on production.
- [x] Verify all new MP4 range responses, exact live campaign references and absence of old paths from rendered pages.
- [x] Verify 4/5/9 responsive browser playback at desktop and mobile widths without media errors or horizontal overflow.
- [x] Record and push the final production evidence.

## CP-81 — Consolidate the risk and conclusion section

- [x] Transcribe the five grouped risk rows from the supplied table without treating the screenshot as operational instructions.
- [x] Replace the nine single-topic records with five grouped categories and preserve all severity, prevention and response text.
- [x] Render one or two detailed signals per group as semantic bullet lists inside the existing accordion.
- [x] Update schema validation from nine `signal` records to five `signals` records.
- [x] Pass JSON, lint, typecheck, test and production-build gates.
- [x] Verify all five accordions, 2/1/2/1/2 signal counts, conclusion copy, desktop/mobile layout and console state locally.

## CP-82 — Deploy the grouped risk section

- [x] Commit and push the verified CP-81 source.
- [x] Wait for the five grouped risk records to become active on production.
- [x] Verify exact rendered content and expand all five accordions on desktop and mobile.
- [x] Confirm no horizontal overflow or browser console warnings/errors.
- [x] Record and push the final production evidence.

## CP-83 — Simplify measurement paths

- [x] Replace the section heading with the supplied “Đo lường hiệu quả” casing.
- [x] Replace LUỒNG A/B/C with LỐI 1, LỐI 2 and SAU MUA.
- [x] Use the exact three requested steps in each path.
- [x] Pass JSON, lint, typecheck, test and production-build gates.
- [x] Verify exact copy, arrows, three-column desktop layout, single-column mobile layout, overflow and console state locally.

## CP-84 — Deploy simplified measurement paths

- [x] Commit and push the verified CP-83 source.
- [x] Wait for the three new paths to become active on production.
- [x] Verify exact copy and responsive layout on production.
- [x] Record and push the final production evidence.

| Status | Task |
| --- | --- |
| DONE | Verify both requested asset paths, inspect source image and 38-page PDF. |
| DONE | Create and commit initial source-audit checkpoint (`d43d066`). |
| DONE | Receive Master Prompt and move checkpoint files into `docs/`. |
| DONE | CP-00: initialize Next.js, strict TypeScript, Tailwind, dependencies and project structure. |
| DONE | CP-01: design tokens, Spectral/Mulish typography, full-image hero, responsive shell. |
| DONE | CP-02: JSON content/seed/runtime, atomic store, schemas and public APIs. |
| DONE | CP-03: complete eight-section landing page. |
| DONE | CP-04: receipt time form, persistence, export and sharing. |
| DONE | CP-05: seven-minute timer and completion tracking. |
| DONE | CP-06: product route and ingredient exploration. |
| DONE | CP-07: community submissions, protected moderation API and reminder cards. |
| DONE | CP-08: strategy report, SWOT/TOWS/7Ps and planned budget chart. |
| DONE | CP-09: contact, team, policy and protected admin. |
| DONE | CP-10: QA, SEO, README, accessibility fixes, security review, tests and production build. |
| DONE | CP-11: apply `NỘI DUNG SỬA WEBSITE.docx` content to company, product, challenge and strategy pages; soften corners while retaining the existing layout. |
| DONE | CP-12: replace body font with self-hosted Inter and use self-hosted Fraunces for headings as the approved temporary Bogart substitute; verify Vietnamese glyphs and responsive layout. |
| DONE | CP-13: apply the revised Word content to product and strategy sections, restore the product navigation link, and verify layout and checks. |
| DONE | CP-14: remove the entire homepage challenge introduction shown above `BỎ`; verify the product gallery card marked `BỎ` remains absent. |
| DONE | CP-15: remove the standalone “Câu chuyện” section from the homepage and keep the remaining section navigation in order. |
| DONE | CP-16: add supplied táo đỏ, đẳng sâm, and cam thảo images to the product ingredient explorer; keep accurate placeholders for four missing ingredients. |
| DONE | CP-17: add the remaining four ingredient images and display each selected ingredient as a full-card photo with text overlay. |
| DONE | CP-18: remove the “Hình minh họa do nhóm cung cấp” label from ingredient images and product lead copy. |
| DONE | CP-19: add the supplied four-step guide video to `/thu-thach`, update the written steps, and verify playback and responsive layout. |
| DONE | CP-20: fix read-only runtime JSON reads so the Vercel challenge page and public UGC GET can render; verify the live video. |
| DONE | CP-21: remove the unavailable challenge rules-file link and every visitor-facing reference to it; update the homepage challenge CTA and steps. |
| DONE | CP-22: display all seven formula percentages in the product ingredient selector and add the supplied Lá Sâm Ngọc Linh phrase; verified on the live product page. |
| DONE | CP-23: replace the static product gallery with a four-scene interactive journey; verified locally and on the live product page. |
| DONE | CP-24: removed visitor-facing source citations across the site; local checks and live deployment verification passed. |
| DONE | CP-25: added three homepage phase cards and dedicated campaign chapter pages with video slots; verified locally, with production review and deployment reserved for the user. |
| DONE | CP-26: added the user's positioning, USP, brand roles, and highlight copy verbatim to the strategy page, plus a separate product summary; verified locally without deployment. |
| DONE | CP-27: removed the highlight label and fixed the schema/component mismatch that broke TypeScript; verified locally without deployment. |
| DONE | CP-28: revised three TOWS entries, removed S-T, and verified the local strategy page without deployment. |
| DONE | CP-29: replaced short 7Ps summaries with the user's seven detailed policies and verified tabs locally without deployment. |
| DONE | CP-30: replaced market cards with the supplied customer truth, pains, motivation, and decision drivers while preserving the existing quote; verified locally. |
| DONE | CP-31: tightened spacing between the customer-truth label and quote; verified desktop and mobile layout locally. |
| DONE | CP-32: replaced the strategy journey section with six channel duties and three measurement paths; verified locally without deployment. |
| DONE | CP-33: restored the four content pillars inadvertently removed in CP-32; verified locally without deployment. |
| DONE | CP-34: added the four-step receipt quiz, personalized 9:16 Story export, product touchpoint, and preserved detailed receipt; verified locally without deployment. |
| DONE | CP-35: updated all twelve weekly phase plans to the supplied copy, added seventeen single-video slots and two video-series lists, and documented how to add MP4 files; verified locally. |
| DONE | CP-36: updated the four monitoring cards to the supplied labels, metrics, cadence, and tools; verified locally. |
| DONE | CP-37: replaced overlapping risk lists with the supplied six-row risk, trigger, and response table; verified locally without deployment. |
| DONE | CP-38: restored the click-to-read risk list and updated it to the user's five revised scenarios; verified locally without deployment. |
| DONE | CP-39: softened section transitions and selected card layouts across the site; verified locally without deployment. |
| DONE | CP-40: softened and pinned the header; linked compact strategy phase cards to their detail pages; verified locally without deployment. |
| DONE | CP-41: exposed the detailed receipt summary above the footer and added subtle scroll depth; verified locally without deployment. |
| DONE | CP-42: pushed current work to `origin/main`, confirmed Vercel success, and checked key public routes and interactions on production. |
| DONE | CP-43: replaced the shared header wordmark with the supplied logo PNG and verified its local responsive rendering. |
| DONE | CP-44: replaced the browser tab icon beside the page title with the supplied logo PNG and verified local metadata and asset responses. |
| DONE | CP-45: balanced the purchase-motivation and decision-factor columns and matched their typography; verified desktop and responsive layout locally. |
| DONE | CP-46: removed the decorative arrows from all three TOWS cards and verified local rendering. |
| DONE | CP-47: enlarged the supplied product photo in the introduction frame by matching its square aspect ratio; verified mobile and desktop locally. |
| DONE | CP-48: reduced SWOT detail and selector heights and tightened each key-to-label gap; verified responsive selection locally. |
| DONE | CP-49: added visible bullet markers to each SWOT detail item and verified mobile and desktop rendering. |
| DONE | CP-50: added the four supplied member portraits to the contact page, matched by filename and team data, and verified responsive rendering. |
| DONE | CP-51: added supplied phase videos and posters by W code, grouped the two W5 videos into one series, and verified media loading and playback locally. |
| DONE | CP-52: corrected the mislabeled “Lần này mình nhắc bạn” video from W11 to W10 and verified the phase page locally. |
| DONE | CP-53: rebuilt weekly phase cards with a sticky desktop week indicator, two-column media and mobile stacking; verified all phase routes locally. |
| DONE | CP-54: placed posters to the left of videos in mixed weeks and kept lone media items on the left; verified W1, W2, W6 and single-video weeks locally. |
| DONE | CP-55: pushed the current site, recovered Git LFS video files during the Vercel build, and verified all nine full media responses and representative browser playback on production. |
| DONE | CP-56: re-encoded the W3 HEVC clip to H.264/AAC, deployed the existing URL, and verified full decode, file integrity and visible browser frames on production. |
| DONE | CP-57: deployed the current cropped Trần Thị Tường Vy portrait, removed its unused JPG, and verified the public contact page. |
| DONE | CP-58: replaced the obsolete 12-week plan with the corrected 8-week Word data, updated budget and KPI reporting, remapped phase media, and verified the affected routes locally. |
| DONE | CP-59: changed market pain card 04 from the 380,000–390,000 VND range to 390,000 VND per box and validated the content. |
| DONE | CP-60: pushed CP-58 and CP-59 to production, verified Vercel success, public routes, eight-week campaign data and phase MP4 responses. |
| DONE | CP-61: aligned the W1–W8 activity table with `F:\final.docx`, added the W6 card feature, clarified the Phase 2 Video chính W2 KPI, and verified locally without deployment. |
| DONE | CP-62: applied the revised Word table's W2 title changes and W6 “Chưa làm” status; verified all 28 rows and local rendering. |
| DONE | CP-63: deployed CP-61 and CP-62 through GitHub/Vercel and verified the revised campaign content and responsive production pages. |
| DONE | CP-64: fixed the strategy route after sales scenarios replaced order-source data, added build-time JSON validation, and verified the deployed page at mobile and desktop widths. |
| DONE | CP-65: changed the remaining strategy persona price range to 390,000 VND per box, deployed it, and verified the live page and API. |
| DONE | CP-66: reconciled all media from `DBC_ND2_BỘ ẤN PHẨM TRUYỀN THÔNG` with W1–W8, corrected week placement and render order, and verified the three phase pages locally. |
| DONE | CP-67: pushed CP-66 to production and verified Vercel success, live W1–W8 media order, poster loading, full MP4 responses and playback. |
| SUPERSEDED | The prior Bogart/Fraunces display-font task is no longer required because CP-85 standardizes the site on Mulish. |
| DONE | CP-85: replaced all 14 phase images from the adjusted round-one set, preserved the 18 videos, applied the supplied 28-row weekly plan as “Đã làm”, moved titles below media and unified the site on Mulish; verified locally. |
| DONE | CP-86: pushed CP-85 to production and verified live campaign data, exact image hashes, captions, Mulish typography and responsive phase pages. |
| DONE | CP-87: reconciled the edited strategy JSON with its schema and page, removed the stale TOWS summary read, rendered four updated actions per quadrant, and passed local data/code/build/browser checks. |
| IN_PROGRESS | CP-88: deploy the reconciled strategy data and verify the production strategy page. |

Typography amendment: the latest user brief supersedes the prior two-font treatment. The public site now uses self-hosted Mulish for display and interface copy, minimizing font variation while retaining Vietnamese glyph coverage.
