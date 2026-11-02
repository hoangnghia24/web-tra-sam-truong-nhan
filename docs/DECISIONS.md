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
