# Implementation plan

Follow `docs/MASTER_PROMPT.md` with the later typography amendment. Keep the existing source audit and usable design work; migrate the static prototype into the required Next.js application.

| Checkpoint | Deliverable and verification gate |
| --- | --- |
| CP-00 Project Initialization | Workspace audit, Next.js App Router, TypeScript strict, Tailwind, dependencies, checkpoint files, directory structure; `npm run build` and `npm run lint`. |
| CP-01 Branding & Design System | Full uncropped cover, color and typography tokens, self-host Spectral/Mulish, reusable shell, desktop/mobile visual check and Vietnamese glyph coverage. |
| CP-02 JSON Storage & API Foundation | Versioned content/seed JSON, private runtime directory, atomic queued store, Zod schemas, public APIs and storage tests. |
| CP-03 Landing Page | Eight narrative sections, real navigation, footer and contact path; desktop/mobile QA. |
| CP-04 Hóa đơn chờ đợi | Time input, calculations, PNG/print/copy/share, JSON API persistence; functional tests. |
| CP-05 7 Phút Cho Mình | Accurate timer and progress, pause/resume/reset, completion event; functional tests. |
| CP-06 Product Experience | Product route, ingredient exploration, brew guide, sourced FAQ and configured commerce URL; visual QA. |
| CP-07 Community & Reminders | Submission, moderation status, approved gallery, card generation and download; API/UI tests. |
| CP-08 Strategy Dashboard | Interactive strategy report from PDF, planned versus actual labels and charts; content checks. |
| CP-09 Contact & Admin | Team/contact route and private JSON, admin auth/session and management views; security and workflow tests. |
| CP-10 QA & Production Readiness | Responsive, accessibility, SEO, validation, lint, tests, production build, README and final review. |
| CP-11 Word content amendment | Map supplied DOCX notes and screenshots to existing pages; update content, soften corners without changing section grids; validate JSON, lint, typecheck, tests, build and inspect mobile/desktop. |
| CP-12 Typography update | Self-host Inter for copy and Fraunces for headings as the user-approved temporary replacement for licensed Bogart; verify Vietnamese glyphs, build, and mobile/desktop layout. Embed Bogart when a web-licensed asset or Adobe Fonts kit is supplied. |
| CP-13 Revised Word content | Incorporate the new brand role, microsite proposal, measurement cadence and trigger rules into the existing sections; restore the requested product menu item, keep the current receipt interaction and layout, validate and inspect responsive views. |
| CP-14 Word deletion clarification | Match each `BỎ` caption to the preceding screenshot, remove any screenshot content still present on the website, and verify the relevant sections. |
| CP-15 Homepage story removal | Remove the standalone “Câu chuyện” section, retarget the intro scroll link to the receipt, renumber remaining sections, and verify lint, typecheck, build, and source links. |
| CP-16 Ingredient imagery | Inspect `anhweb`, add matching supplied ingredient photos to the product explorer, label them as illustrations, preserve placeholders for missing photos, and verify data, build, interaction, and responsive layout. |
| CP-17 Full ingredient image cards | Add the four newly supplied ingredient photos, make the selected photo fill the detail card with readable text over the image, and verify all seven tabs at mobile and desktop widths. |
| CP-18 Ingredient label removal | Remove the supplied-illustration label from the product ingredient images and the matching lead copy; verify rendering and interaction. |
| CP-19 Challenge guide video | Add the supplied vertical joining-guide video and poster to `/thu-thach`, align the written steps with the guide and live form, label mock screens accurately, and verify build, playback, and responsive layout. |
| CP-20 Read-only runtime reads | Let public JSON reads use seed data without writing to the application directory, preserve explicit file initialization for writable hosts, and verify the live challenge page after deployment. |
| CP-21 Remove unavailable rules file | Remove the challenge page's rules-file link and related copy, align the homepage entry point with the video guide, then verify the live routes. |
| CP-22 Ingredient percentages in list | Show the seven existing percentages directly in the product ingredient list, add the user-supplied Ngọc Linh phrase, and verify mobile and desktop layout. |
| CP-23 Interactive product journey | Replace the static product gallery with a click-started sequence from box and sachets through seven ingredients and brewing to a finished cup. Use supplied photos, provide skip/replay and reduced-motion behavior, then verify locally and live. |
| CP-24 Remove visitor-facing source citations | Remove file names, page references, and source-attribution notes from visitor pages and their content JSON. Keep planned-versus-actual labels and internal evidence records; verify routes and deployment. |
| CP-25 Campaign phase pages | Add three linked chapters on the homepage and a distinct page for each four-week phase, with story, planned activities, video slots, and a path to the related site experience. Document how to add videos; verify only locally because the user will deploy. |
| CP-26 Positioning and USP | Add the user's positioning, USP, brand roles, and highlight text verbatim to the strategy overview; add a separate concise product-page summary. Clearly label the strategic copy as proposed, preserve existing content and user edits, verify locally, and leave deployment to the user. |
| CP-27 Remove highlight label and repair schema mismatch | Remove the visible highlight heading while retaining the three supplied highlight lines. Align JSON, schema, and component; reproduce and resolve the TypeScript failure, then verify local build and browser output. |
| CP-28 TOWS revision | Replace S-O, W-O, and W-T titles and copy with the user's supplied wording; remove S-T. Render the key and parenthesized title together, update validation and three-column layout, and verify locally without deployment. |
| CP-29 Detailed 7Ps | Replace the seven short strategy-tab summaries and old heading with the user's full Product, Price, Place, Promotion, People, Process, and Physical Evidence copy. Keep tab navigation, mark unverified price/legal/manufacturing claims as plan content, and verify locally. |
| CP-30 Customer context | Replace the old market cards with the user's truth, four pain points, purchase motivation, and four decision drivers. Preserve the existing “Càng quý…” quote, label insight and price as plan assumptions, and verify locally. |
| CP-31 Truth spacing | Reduce the desktop gap between the “Sự thật:” label and its quote while keeping the mobile stacked layout; verify both locally. |
| CP-32 Channel roles and measurement | Replace the old strategy journey section with the user's six channel duties and three measurement paths. Keep copy as supplied, validate the new JSON structure, and verify the local responsive page without deploying. |
| CP-33 Restore four content pillars | Restore the user's four content pillars beneath the channel roles and measurement paths, preserving their prior wording; verify locally and leave production to the user. |
| CP-34 Receipt quiz journey | Add the four-step receipt experience with a name entry, 7:00 reminder, three-card quiz, personalized 9:16 Story image, and product touchpoint. Keep the detailed eight-activity receipt, show symbolic debt as a labeled formula, and require verified URLs and an active code before purchase/voucher actions. Verify locally only. |
| CP-35 Exact weekly phase plan and media slots | Replace W1–W12 activity and goal copy with the user's three tables without rewriting it. Put a single video slot under each Video activity and an expandable video list under each Chuỗi video activity; document MP4 setup and verify locally. |
| CP-36 Monitoring cadence copy | Replace the four monitoring groups with the user's exact labels, metrics, measurement cadence, and tools. Display all fields in the existing cards; verify locally and leave production to the user. |
| CP-37 Risk response table | Replace the overlapping risk lists with the user's six three-column scenarios, preserving supplied wording and emphasis. Validate the data, check the responsive table locally, and leave production to the user. |
| CP-38 Risk accordion correction | Restore the original click-to-read presentation and replace the risk copy with the user's revised five scenarios and fallback actions. Verify locally without deploying. |
| CP-39 Softer section design | Round the transitions between public page sections, give phase and activity cards breathing room, and soften selected visual frames. Preserve the cover artwork and all content; verify desktop and mobile locally. |
| CP-40 Sticky header and strategy phase links | Soften and pin the site header while scrolling. Replace the strategy report's expanded phase cards with links that show only the phase name and week range, using the existing detail routes. Verify desktop and mobile navigation locally. |

After each completed checkpoint: run its verification gate, write observed results, update status, commit focused changes. Never commit `data/runtime`, `.env`, `.next`, `node_modules`, or the large strategy PDF.
