# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static portfolio site for Miranda Morton, an architectural designer, built with **Astro 6** (no UI framework, no integrations). It replaces an old WordPress site at miranda-morton.com. Output is fully static (`output: "static"`).

## Commands

```bash
npm run dev       # local dev server (http://localhost:4321)
npm run build     # static build to ./dist
npm run preview   # serve the built ./dist
```

There is no test runner and no linter configured. `npm run build` is the verification step — it type-checks content collections and fails on bad frontmatter or broken Astro/TS.

## Architecture

**Projects are data, not pages.** Each project is one Markdown file in `src/content/projects/`. The schema is defined in `src/content.config.ts` (a Zod schema loaded via the `glob` loader). To add a project, drop in a new `.md` file — `src/pages/projects/[slug].astro` auto-generates its full page via `getStaticPaths`, and it appears in the home grid and `/projects` list automatically. The `slug` is the filename.

Key schema fields and their behavior:
- `category: "professional" | "academic"` — drives the split columns on the home page.
- `order` — manual sort within a category.
- `confidential: true` — hides the full-docs link and shows a client-confidentiality note instead (used for JLA client work). Mutually exclusive in effect with `fullDocsPdf`.
- `coverImage` / `gallery` / `fullDocsPdf` — **string paths into `/public`** (e.g. `/img/projects/foo.svg`, `/pdfs/foo.pdf`), rendered with plain `<img>`/`<iframe>`. This is a deliberate choice over `astro:assets` optimization so the non-technical owner can swap files in `public/` without touching imports. Trade-off: no automatic image optimization.

**Single source for project cards.** `ProjectCard.astro` is the one card; `ProjectGrid.astro` renders sets of them and takes `split` (labelled Professional/Academic columns) and `limit` (cap per category). The home page uses `split limit={2}`; `/projects` shows everything.

**Pages** (`src/pages/`): `index.astro` (hero + work grid + about teaser + contact), `portfolio.astro` (embedded portfolio PDF), `projects/index.astro` + `projects/[slug].astro`, `about.astro` (bio + experience array + resume PDF), `contact.astro`. All wrap `src/layouts/Layout.astro`, which provides `<head>`, `Nav`, `Footer`, and imports global styles.

**Contact form** (`ContactForm.astro`) posts to **FormSubmit.co** — no backend. It mirrors the field/hidden-input structure of ssebs.com/contact (`name`, `email`, `_subject`, `message`, hidden `_captcha` and `_next`). The owner email `mirandamorton7@yahoo.com` is the FormSubmit target and also appears in `Footer.astro` and `contact.astro`. The success banner is revealed client-side from a `?sent=1` query param (the static page can't read it at build time).

**Styling.** `src/styles/global.css` holds the design tokens as CSS custom properties — the palette is the coolors set `dabfff / 907ad6 / 4f518c / 2c2a4a / 7fdeff` mapped to semantic tokens (`--accent`, `--navy`, etc.) plus shared `.btn`, `.container`, `.section`, `.eyebrow` utilities. Everything else is component-scoped `<style>` blocks. Fonts: Cormorant Garamond (headings) + Inter (body), loaded from Google Fonts in `Layout.astro`.

## Placeholders / pending real content

The site is scaffolded with placeholders to be swapped later, without code changes:
- **Images**: SVG placeholders in `public/img/`. Replace files (or update the path fields in the `.md`).
- **PDFs**: intentionally absent — portfolio/resume/full-docs links are broken until real PDFs are added to `public/pdfs/` (filenames `miranda-morton-portfolio.pdf`, `miranda-morton-resume.pdf`, and per-project files referenced by `fullDocsPdf`).
- **Copy**: the JLA project markdown and the About bio still contain owner-supplied text that may be revised.

Before deploy, update `site` in `astro.config.mjs` to the real production domain (used for the contact form's `_next` redirect URL).

# IF ASKED TO "USE GOOD STANDARDS" OR "FOLLOW @Claude.md", USE THE FOLLOWING

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
