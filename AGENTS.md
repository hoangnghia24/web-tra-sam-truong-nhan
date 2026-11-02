# Trà Sâm Trường Nhân — workspace guidance

- Before changing code in a new session, read `docs/MASTER_PROMPT.md`, `docs/CHECKPOINT.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, and `docs/TEST_RESULTS.md`; inspect source and continue from the latest unfinished task. Do not restart completed work.
- Work in this repository. Keep checkpoint records in `docs/IMPLEMENTATION_PLAN.md`, `docs/CHECKPOINT.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, and `docs/TEST_RESULTS.md`.
- The design source is `public/images/truong-nhan-cover.png`. The strategy reference is `public/references/Tra_Sam_Truong_Nhan_SWOT_TOWS_7Ps.pptx.pdf`; the requested `references/...` path is absent.
- Use Spectral for display and Mulish for interface copy. Keep the palette aligned with tea green, warm cream, and muted gold from the source artwork.
- Write visitor content in Vietnamese. Preserve the source's distinction between ingredients and proven effects. Do not invent testimonials, performance metrics, purchase URLs, or medical claims.
- Use the Next.js App Router, strict TypeScript, Tailwind, and JSON storage requested in the Master Prompt. Treat `docs/MASTER_PROMPT.md` as the full specification and the user's later typography brief as an amendment.
- Verify each completed checkpoint, record evidence in `docs/TEST_RESULTS.md`, update `docs/CHECKPOINT.md`, then commit source and documentation when Git is available. Mark unfinished work `IN_PROGRESS` and preserve a concrete resume step.
- Do not commit credentials, runtime output, build output, or the 198 MB strategy PDF.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
