# Decisions

## 2026-11-02 — Source of truth

- Use the cover artwork for visual language: deep botanical green, cream, warm gold, mountain imagery, product pack and tea cup.
- Use the PDF at `public/references/` as a read-only source because the requested root `references/` location is absent.
- Treat the deck as a marketing plan, not as proof of medical benefit. The site may state the documented formula and preparation details. Avoid its unverified benefit claims and financial projections.
- Use the campaign line “Sâm không đợi dịp. Bạn đợi gì?” and the sequence Bấm hoãn → Làm ngay → Gửi lời nhắc from pages 21, 23, and 35.
- Build locally in this repo. No hosting destination or authorized commerce URL is supplied.
- Keep the large reference PDF out of Git and deployed assets; keep the cover image in source control.

## 2026-11-02 — Master Prompt and typography amendment

- The Master Prompt arrived after the first source-audit commit. Migrate the static prototype to Next.js App Router rather than treating it as the final architecture.
- Move checkpoint records to `docs/` and preserve the initial source audit as history.
- Use Spectral as the display face for brand storytelling and Mulish for controls/body. Both fonts are self-hosted from Google Fonts with included SIL Open Font License texts. Representative Vietnamese characters were verified in every chosen file. Cormorant Garamond is unnecessary.
- Establish typography tokens with context-specific desktop/mobile sizes, line heights and letter spacing. Avoid a blanket scale, overuse of uppercase, and duplicate wording over the supplied cover.
- The full 16:9 cover must remain visible on desktop and mobile. Place the editorial lead and CTAs in a separate content block after the image.
- Do not treat the PDF's percentage breakdown beyond the highlighted 3% as final product labeling; the Master Prompt explicitly requires verification of the other ratios. The prototype's detailed ingredient percentages must be removed until confirmed.
- JSON file storage targets a writable single-process Node server for this demo. It is unsuitable as durable storage on serverless or multiple processes.

## CP-01 typography implementation

- `next/font/local` serves Spectral 400/600/700 and Mulish 400/600/700 with `display: swap`, local fallback metrics and no browser requests to a font provider. `font-synthesis: none` prevents fake weights. The TTF sources and SIL OFL texts are committed together.
- Shared tokens: H1 `clamp(34px, 5vw, 76px)`, H2 `clamp(28px, 3.8vw, 52px)`, H3 `clamp(24px, 2.3vw, 30px)`, body 16–18px, caption 13–14px, button 14–16px. Spectral headings use tighter tracking and 1.07–1.12 line height; Mulish controls/body use roomier line height. These values follow the user's typography amendment.
- The original 16:9 artwork is a separate full-width hero; the site's H1 appears below it. The image is not cropped, stretched or overlaid.
- Header uses an editorial text wordmark rather than recreating the logo embedded in the cover. The footer labels the site as a campaign simulation until brand authorization is confirmed.

## CP-02 data and API

- Source facts live in versioned `data/content` JSON; empty `data/seed` arrays initialize a private, ignored `data/runtime` on first access.
- JSON writes are validated, serialized per file in one process, written to a temporary file, backed up, then renamed. Corrupt existing JSON is preserved and reported as an error.
- Receipt data stores minutes and no personal identity. Contact and UGC submissions remain private until an admin reviews them; public UGC returns approved fields only.
- In-memory rate limiting and Zod input validation provide baseline abuse protection. This is a local single-process demo; multi-process rate limiting and storage need a different backend.
- The detailed percentage breakdown in the source PDF is excluded from content JSON except for the document's highlighted 3% Ngọc Linh leaf because the Master Prompt requires label verification for the other ratios.

## CP-04 receipt interaction

- Use eight explicit time categories with hours and minutes, a live total and a 24-hour guard. The receipt never asks for a name or contact detail.
- Persist only normalized minutes and a random receipt code. Date in the display code uses Vietnam local time; the ISO timestamp remains UTC.
- Generate an on-page editorial receipt with the same Spectral/Mulish typography. PNG export uses `html-to-image`; print, copy and Web Share offer other ways to keep or send it.

## CP-05 timer

- Base remaining time on a wall-clock deadline rather than subtracting one second per interval. This keeps the countdown accurate if a mobile browser throttles background timers.
- Record completion once per finished session. The timer can be used without account details or purchase, and a failed analytics write does not erase the visitor's completion state.
- Use a tea-toned circular dial, a thin linear bar and short optional breathing prompts; honor reduced-motion preferences in the shared CSS.

## CP-06 product content

- Render the supplied full cover without cropping in the product gallery. Use editorial fact cards for extra views until official product photography exists.
- Keep all seven ingredients selectable. Show the documented 3% leaf ratio, while clearly marking other ratios as pending label verification; ingredient presence does not imply a proven effect.
- Resolve a purchase link only from validated `site-settings.json` or product JSON. When both are null, show the status as text and no fake destination.
- Render homepage and product page dynamically so edits to JSON content can appear without rebuilding the site.

## CP-07 community and reminders

- Keep submitted UGC pending by default and show only approved records publicly. Links to videos must use HTTPS. The protected moderation endpoint changes status in private runtime JSON.
- Use an HTTP-only, same-site signed session cookie with an eight-hour expiry. Credentials and signing secret come only from environment variables; admin login remains disabled when they are absent.
- Personal reminder text remains in component memory. The PNG, copy and Web Share actions are visitor initiated; only an anonymous download event is stored.

## CP-08 report

- Keep detailed strategy notes in validated `strategy-report.json`, with page references to the supplied PDF. The public report renders dynamically so edited content can appear without rebuilding.
- Use interactive SWOT and 7Ps tabs, a Recharts budget chart with an accompanying data table, and editorial cards for journey, phases, KPI and risks.
- Label every budget and KPI as a plan. The deck contains inconsistent statements about product ingredients and some performance figures; visitor product facts follow the separately reviewed ingredient page, while the report avoids presenting draft claims as verified outcomes.

## CP-09 contact and administration

- Render the four team members exactly from `team.json`; use initials rather than invented portraits or roles. Contact submissions require consent and remain private.
- Keep admin disabled until `ADMIN_PASSWORD_HASH` and a 32-character minimum `SESSION_SECRET` are configured. The signed, HTTP-only cookie expires after eight hours. All admin pages guard on the server; all admin APIs also check the session.
- Count only records in private runtime JSON. The dashboard never converts planned KPI targets into observed results.
- Use validated JSON editors for product, team, campaign phase and site settings. Each save writes atomically and preserves a `.bak`; backups are ignored by Git. Public shop and social URLs require HTTPS.
- Track explicit product and shop CTA clicks with an anonymous event. The site never constructs an unverified shop link.

## CP-10 production readiness

- Generate Open Graph metadata, robots and sitemap from `NEXT_PUBLIC_SITE_URL` only after an actual deployment origin is supplied; do not invent a public domain. Exclude admin and local PDF reference routes from indexing.
- Block `/references/` through the Next.js Proxy because the 198 MB source PDF currently sits under `public/references/`. It remains ignored by Git. A non-Next static deployment must also exclude the PDF from its public directory.
- Keep fallback loading, error and 404 states in the same Spectral/Mulish design system. Include a retry action for render errors.
- Store only the optional UTM source, medium and campaign attached to anonymous click/completion events. The admin dashboard counts recorded UTM sources from runtime JSON, not from planned campaign KPIs.
- Use dark text on muted-gold button hover states and a deeper gold for small text on light backgrounds to retain readable contrast.
- Make ingredient, SWOT and 7Ps tabs a single keyboard tab stop with Arrow, Home and End navigation; selected tab and panel remain linked by ARIA attributes.

# CP-11 Word content amendment (2026-11-04)

- Treat the supplied DOCX as the requested content amendment. Its screenshots identify existing elements; the short notes are editing directions for those elements, not proof that product or company claims are independently verified.
- Replace the fourth navigation item `Sản phẩm` with `Về công ty` immediately after `Trang chủ`, using the existing `/ve-du-an` route so the navigation footprint and page section layout stay familiar. Keep `/san-pham` reachable from the homepage, footer and company page.
- Present company history, area, plant count and GMP/ISO as statements from the supplied material, with a visible verification note. The seven ingredient percentages and proposed 390.000 ₫ price are likewise attributed to the Word file and subject to label and current-price checks.
- Preserve campaign moderation even though the homepage approval sentence is removed. It protects visitor submissions; the Word file changes the displayed four-step instructions.
- Keep the user-provided Google Drive rules URL as an external reference. Its content could not be opened through the available web tool, so the website does not claim its contents or invent a hashtag.
- The Word file labels ROAS as 3,5% and NPS as 45%; display those targets verbatim as *plan* and flag their measurement definitions for confirmation. Do not promote the unverified medical phrase or legal filing number as established evidence.
- Add weekly plan details inside the existing phase cards and channel roles within the existing strategy section. Border radii are updated without changing primary grids, section order or the 16:9 hero.

## CP-12 typography update (2026-11-04)

- The user requested Bogart headings and Inter copy, then confirmed no licensed Bogart font file or Adobe Fonts kit is available and chose Fraunces as the temporary heading font. Bogart is offered by Zetafonts under a separate web embedding license; do not bundle the trial font into this website.
- Downloaded Inter and Fraunces variable font files and OFL license texts from the official Google Fonts repository. `next/font/local` self-hosts both; the site makes no external font request. Kept earlier Spectral/Mulish files in the repository as unused historical assets.
- Use Fraunces for all semantic headings and existing display typography, Inter for body and interface text. Switch the display font to licensed Bogart once the user supplies its asset or kit; retain Inter.

## CP-13 revised Word content (2026-11-05)

- Treat `F:\NỘI DUNG SỬA WEBSITE.docx` as the user's revised content reference. The document's mockup steps and operational suggestions describe proposed campaign work; they do not authorize invented product effects, an active voucher, an official shop URL, or claims of measured results.
- Add the new positioning, four-step receipt concept, monitoring cadence and six trigger rules inside the existing strategy sections. Keep the working receipt calculation and page layout because the user requested a content update while retaining the earlier layout.
- State that the Word's 3% ingredient figure and 390.000 ₫ price are source claims needing label or price verification. Do not publish its detoxification, recovery or relaxation statements as proven effects.
- Restore `Sản phẩm` in the navigation after `7 phút cho mình`, as listed in the revised Word. Use `Doanh nghiệp` for the second link to the existing Trường Sinh Group page. Switch to the mobile menu at 1200 px so the longer navigation does not overflow at intermediate widths.
- The Word labels the ROAS KPI as 3,5% but uses 2,5× and 3,5× in a trigger rule. Preserve both with a visible unit clarification request; do not silently reconcile them.

## CP-14 deletion clarification (2026-11-05)

- The user clarified that each screenshot immediately above `BỎ` marks the entire shown website element for removal. `image3.png` shows the homepage challenge introduction paragraph; remove that full paragraph. `image6.png` shows the second product gallery note titled `Một tách trà`; that note was already absent, so retain the single `Hộp trà` note.
- Keep submission moderation and its disclosure on the separate challenge form because the screenshot refers to the homepage paragraph, while visitors still need accurate information about when a submitted story becomes public.

## CP-15 homepage story removal (2026-11-05)

- Interpret “phần câu chuyện” as the standalone homepage section labeled `01 Câu chuyện`, between the introductory CTA and receipt feature. Keep the separate community challenge and its participant stories.
- Point the introductory scroll link to the receipt section and number the six remaining homepage feature sections 01–06. Remove CSS used only by the deleted section.

## CP-16 ingredient imagery (2026-11-05)

- Visual inspection of `anhweb` found three ingredient-specific files: `Táo đỏ.jpg`, `ĐẲNG SÂM.jpg`, and `CAM THẢO.jpg`. The other eight files show packaging, brewing, or people, so they are not assigned to other ingredient names.
- Copy the three matching files into `public/images/ingredients/` with stable URL-safe names and link them in `ingredients.json`. Keep the original `anhweb` directory untouched. Label the photos as illustrations supplied by the group, without claiming they depict the exact ingredients in the packaged tea.
- Keep a neutral “Chưa có ảnh nguyên liệu” visual for lá đinh lăng, kỷ tử, nhân sâm tươi, and lá Sâm Ngọc Linh until matching images are supplied.

## CP-17 full ingredient image cards (2026-11-06)

- Match the new `anhweb` files `đinh lăng.jpg`, `kỉ tử.jpg`, `Nhân sâm.jpg`, and `Lá Sâm Ngọc Linh.jpg` to the four remaining ingredient entries. Leave the unrelated `xxx.jpg` unused.
- Use each selected photo as a full-card image with `object-fit: cover`, a dark lower gradient, and the ingredient name, description, and source-stated percentage over it. Keep the illustration label and the fallback for a future missing image.
- Update the product lead copy to reflect that all seven ingredient illustrations are now present. Do not claim that these photos verify packaged contents or medical effects.

## CP-18 ingredient label removal (2026-11-06)

- The user's later request removes the “Hình minh họa do nhóm cung cấp” overlay from the ingredient card. Remove the matching wording from the product lead and image alternative text as well. Keep the existing source and percentage verification notes.

## CP-19 challenge guide video (2026-11-06)

- The user supplied `anhweb/4-Step Joining Guide Video.mp4`, a 20-second vertical H.264/AAC video. Copy it to `public/videos/` under a stable URL-safe name and derive a poster from its first step; keep the source file untouched.
- Place a native HTML video player beside the four written steps on desktop and above them on mobile. Use controls, inline playback, and deferred loading.
- The video depicts a conceptual checklist-style receipt and four activities: create a receipt, record a moment, post with the required hashtag, and share the link. Align the website cards to the available receipt and submission flows without asserting an unverified hashtag. State that some video screens are illustrative and direct visitors to the linked rules and current form.

## CP-20 read-only runtime reads (2026-11-06)

- On Vercel, `/thu-thach` and GET `/api/ugc` failed because reading a missing runtime JSON file attempted to create it in the read-only application directory. A read now returns validated seed data (or an empty array when no seed is present) without writing. Mutations still create runtime files on writable local hosts; `ensureJsonFile` retains explicit initialization behavior.
- This change makes the hosted page and public read endpoint available. It does not make file-backed submissions durable on Vercel. A writable single-process Node host or a separately approved storage change is required for hosted submission persistence.

## CP-21 unavailable challenge rules file (2026-11-06)

- The user confirmed that there is currently no rules file for the video-led challenge page. Remove the Drive rules link and all page copy that asks visitors to consult that file.
- Keep the four actionable steps and video. Do not supply or infer a required hashtag. Update the homepage challenge steps to match the video-led flow and change its CTA to “Xem hướng dẫn và tham gia”.

## CP-22 ingredient list percentages (2026-11-06)

- The seven percentages already exist in `data/content/ingredients.json` and appear in the selected ingredient detail. Show them next to each ingredient name in the selector so visitors can see the complete formula without selecting every image.
- Add the user's “Quốc bảo Nam Trà My” wording after Lá Sâm Ngọc Linh in that selector. Treat it as user-provided presentation copy, not independent product or medical verification. Retain the existing label-verification note.

## CP-23 interactive product journey (2026-11-06)

- Replace only the “Góc nhìn sản phẩm” gallery with a click-started sequence: supplied box and sachet photo, seven existing ingredient photos converging into a drawn tea bag, animated brewing using the existing water and steeping values, and a supplied finished-tea photo.
- Use `anhweb` photos `1793720638162_...jpg` and `1793720638189_...jpg` under stable public paths; keep the originals untouched. The animation is a visual explanation of the campaign formula and brewing directions, not evidence of the manufacturing process or product effects.
- Provide a visible start, skip, and replay control. Keep stage text readable, support reduced motion, and preserve the user's other uncommitted content edits.

## CP-24 visitor-facing source citation removal (2026-11-06)

- Interpret the request as removing citations and source-attribution copy shown to visitors: file/Word labels, document page numbers, “Nguồn:” notes, and repeated “theo tài liệu” language on home, product, company, and strategy pages.
- Keep internal provenance in repository documentation and non-rendered JSON metadata. Keep budget, KPI, and activity copy marked as planned or proposed; do not present unverified medical, legal, or price statements as established facts.
- Incorporate the user's in-progress removals of source-note fields, but leave unrelated uncommitted content and styling edits out of the commit. Accept both existing and in-progress TOWS key spellings so local JSON validation remains usable.

## CP-25 campaign phase pages (2026-11-06)

- Add a distinct `/giai-doan/[slug]` page for each phase and a three-card entry point on the homepage. Use the existing four-week plan in `campaign.json` rather than duplicating it in page code.
- Store the visitor introduction, action, and video slots in `campaign.json` with schema validation. A `null` video source displays a clear waiting state; a valid local MP4 path displays native controls. `docs/PHASE_VIDEOS.md` explains how to add future assets.
- Keep the three phase pages visibly labeled as a campaign plan. Do not imply that planned videos, community submissions, or campaign outcomes already exist.
- The user requested local review and will update production personally. Do not push, deploy, or inspect the production site for CP-25.

## CP-26 positioning and USP copy (2026-11-06)

- Preserve the user's supplied wording verbatim in a structured `positioningDraft` object in `strategy-report.json` and display it after the persona in the strategy overview. Retain the existing three brand-role cards and the user's unrelated working-tree edits.
- Label this block as proposed strategic copy. Its health-effect and price statements are not treated as verified product facts. Add only a separate, factual convenience/ingredient/7-minute summary on the product page.
- Verify locally. The user's prior instruction to review and update production personally still applies; do not push or inspect production.

## CP-27 highlight label and type repair (2026-11-06)

- Remove only `highlightHeading` from the strategy JSON and UI. Keep the three `highlight` lines, with a non-visible accessible label for the aside.
- The in-progress schema edit removed both fields, but the component still read both, causing TypeScript property errors. Restore the `highlight` array in the schema and remove the stale `highlightHeading` references.
- Continue local-only verification and preserve the user's unrelated campaign and strategy-page edits.

## CP-28 TOWS copy and layout (2026-11-06)

- Use the user's three requested entries in S-O, W-O, W-T order. Remove S-T entirely from the strategy report and require exactly three entries in the schema.
- Present each key and parenthesized title on one heading line, followed by the requested sentence. Change the desktop grid to three columns and retain responsive stacking.
- Keep unrelated working-tree edits in campaign, strategy report, strategy page, and positioning component separate from this checkpoint. Verify locally and leave production to the user.

## CP-29 detailed 7Ps copy (2026-11-06)

- Store each supplied 7P as its full policy title, subtitle, and labeled points in `strategy-report.json`; validate four to six points per tab. Preserve the user's substantive wording while normalizing pasted whitespace.
- Retain the accessible seven-tab interaction and keyboard navigation. Present the longer text as a readable numbered policy panel, with responsive bullet columns.
- Place a separate plan-status note before the tabs. The supplied price, self-declaration number, GMP, and manufacturing text are proposal content, not independently verified current product facts.
- Preserve unrelated working-tree edits and leave production review and deployment to the user.

## CP-30 customer context (2026-11-06)

- Replace the old `market` array with structured `marketContext` data for the supplied truth, four pain points, motivation, and four decision drivers. Normalize pasted whitespace while preserving the user's substantive wording, including the supplied “nghỉ rằng”.
- Keep the existing “Càng quý…” headline exactly as requested. Use separate visual groups for truth, pain cards, and motivation/decision factors.
- Add a distinct note that these are proposed customer insights, not survey findings, and the cited price range is not confirmed current pricing. Preserve unrelated working-tree edits and leave production to the user.

## CP-31 truth label spacing (2026-11-06)

- Size the desktop label column to its text and use a 1rem gap, so the quote begins near “Sự thật:”. Keep the existing one-column mobile layout and .75rem vertical gap. Preserve unrelated edits and leave production to the user.

## CP-32 channel roles and measurement (2026-11-06)

- Replace the old journey, receipt concept, channel summary, and content pillars in section 05 with the supplied six channel duties and three measurement paths. Keep the user's wording and the two separate duties under TikTok Shop and Shopee.
- Store this copy in one validated `channelJourney` object. Present the six duties as numbered cards and the three paths as arrow sequences, with responsive one-column mobile layout.
- Preserve unrelated working-tree edits. Verify locally and leave production review and deployment to the user.

## CP-33 restore content pillars (2026-11-06)

- CP-32 removed the existing four content pillars when replacing section 05. Restore them after the measurement paths; retain the six channel duties and three paths.
- Recover the four titles and bodies from the section's prior data, including the user's wording for the action pillar. Keep the existing responsive `pillar-grid` presentation.
- Preserve unrelated working-tree edits. Verify locally and leave production review and deployment to the user.

## CP-34 receipt quiz journey (2026-11-06)

- Add the user's entry, three-card quiz, personalized receipt, and product touchpoint above the existing eight-activity receipt. Keep the detailed form accessible in an expandable section to satisfy the original receipt specification.
- Ask for today's actual self-care minutes within the third quiz card. Show 0 only when the visitor enters 0; compute the symbolic “debt” as seven minutes per self-reported delay and label it as a campaign metaphor.
- Generate a 1080 × 1920 PNG from a 9:16 Story layout. Use the native image share sheet when available, otherwise download the image for manual TikTok posting.
- Keep purchase CTAs disabled until official platform URLs are supplied. Present 15% voucher as a planned idea until an active code is configured. Document the settings in `docs/RECEIPT_JOURNEY.md`.
- Preserve unrelated user edits; verify locally and leave production to the user.

## CP-35 weekly phase content and videos (2026-11-06)

- Replace only the W1–W12 activities and goals with the user's supplied wording, normalizing pasted layout whitespace. Keep phase names, descriptions, focus, invitations, actions, and the user's uncommitted status note unchanged.
- Attach media metadata to each weekly activity by zero-based `activityIndex`. A Video activity has one nullable MP4 source; a Chuỗi video activity has an ordered list that starts empty. Other activities, including TikTok LIVE, remain text as specified.
- Show media directly under its activity in the week card and remove the outdated phase-level video gallery. Keep planned work visibly distinct from completed work and document file paths and JSON examples in `docs/PHASE_VIDEOS.md`.
- Preserve unrelated working-tree edits and leave production review and deployment to the user.

## CP-36 monitoring cadence copy (2026-11-06)

- Keep the existing four-card monitoring layout and update only the four data rows with the user's supplied wording. Render the previously hidden `sources` field alongside each cadence so every tool name appears.
- Preserve the user's uncommitted strategy heading and other working-tree edits. Verify locally and leave production to the user.

## CP-37 risk response table (2026-11-06)

- Replace the two overlapping risk lists with one semantic table matching the user's three columns and six scenarios. Store titles, triggers, responses, and italicized targets/fallback text in structured JSON.
- Preserve the user's wording, including the supplied proposed thresholds, channel names, and response actions. Keep the existing note that these plans are not automatically implemented.
- Preserve unrelated working-tree edits and verify only on a local build; deployment remains with the user.

## CP-38 risk accordion correction (2026-11-06)

- The user clarified that the original click-to-read layout should remain. Replace the CP-37 table with five native `details` items and show each supplied title in the summary.
- Use the user's revised action and fallback wording exactly; italicize only the supplied “Dự phòng:” label. Keep unrelated strategy content and the user's working-tree edits unchanged.
- Verify only on a local build; deployment remains with the user.

## CP-39 softer section design (2026-11-06)

- Keep the cover artwork full width. Round the upper corners of adjacent public sections and overlap them slightly, using a smaller curve on mobile. Give the footer the same visual transition.
- Turn the homepage challenge steps and weekly phase tiles from joined, ruled grids into separated rounded cards. Soften shadows on selected visual frames without changing copy, navigation, or interaction.
- Preserve concurrent user edits in the working tree. Verify the local build and responsive layout; leave production to the user.

## CP-40 sticky header and strategy phases (2026-11-06)

- Use a sticky header with a soft cream surface, blur, lower corner radius, and subtle shadow. Keep its place in normal document flow and add scroll padding so anchor targets remain visible.
- Make the mobile menu a rounded floating panel under the sticky header. Preserve all existing navigation links and menu behavior.
- In the strategy report, show only phase number, week range, and title on each linked card. The existing `/giai-doan/[slug]` pages retain messages, activities, goals, and video slots.
- Preserve unrelated working-tree edits and verify locally without deploying.

## CP-41 receipt summary and scroll depth (2026-11-06)

- Remove the footer's negative top margin because it covered the last interactive control on `/hoa-don-cho-doi`. Keep the rounded top corners.
- Use a small scale and brightness change as a section leaves the viewport; the following rounded section retains its upward overlap. Gate the scroll animation on browser support and the user's no-preference motion setting.
- Preserve unrelated working-tree edits, especially active receipt and strategy work. Verify local interaction and layout without deploying.

## CP-42 production deployment (2026-11-06)

- The user explicitly authorized production deployment. Include their eight pending content and presentation edits with the 17 local commits that had not reached `origin/main`.
- Correct invalid `strong > p` nesting in the edited positioning highlight without changing its visible wording before deployment.
- Use the repository's existing GitHub to Vercel deployment path. Verify the Vercel commit status and public site after the push. The existing read-only Vercel storage limitation remains for JSON-backed submissions.

## CP-43 header logo (2026-11-06)

- Use the user-supplied transparent PNG in the shared header, so every public page inherits the same mark. Retain the existing accessible home-link label; the image itself is decorative within that labeled link.
- Keep the original `anhweb` file untouched and commit the public copy. Do not deploy without a new user request.

## CP-44 browser tab icon (2026-11-06)

- Reuse the public logo PNG from CP-43 for the browser tab icon. Keeping its distinct URL lets browsers load it in place of the old SVG icon.
- Keep the page title text unchanged; the requested change concerns the icon shown beside it.

## CP-45 market context balance (2026-11-06)

- Use the established Inter body font at the same size and line height in both columns, while preserving the existing Fraunces heading style and all content.
- Align heading and body starts in equal-height desktop columns. Stack the columns at 1050 px and below so long Vietnamese copy remains readable.

## CP-46 TOWS card arrows (2026-11-06)

- Remove only the decorative ArrowDownRight icons from the TOWS cards. Keep their headings and explanatory text as static content, without implying a click interaction.

## CP-47 product introduction image (2026-11-06)

- Keep the user-supplied `sanpham.jpg` as the product introduction image. Its 1254 × 1254 dimensions match the square source; removing the inherited 16:9 CSS constraint lets the full photo fill its frame without cropping the package.
- Update the alternative text to describe the actual photo. Keep the existing responsive layout and frame treatment.
