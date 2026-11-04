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

After each completed checkpoint: run its verification gate, write observed results, update status, commit focused changes. Never commit `data/runtime`, `.env`, `.next`, `node_modules`, or the large strategy PDF.
