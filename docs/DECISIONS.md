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
