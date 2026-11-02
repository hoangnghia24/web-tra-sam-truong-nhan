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
