# Miranda Morton Portfolio Site — Design Spec

**Date:** 2026-06-13
**Status:** Approved (pending user review)

## Goal

A statically-generated portfolio website for Miranda Morton, an architectural
designer fresh out of a master's degree. Primary purpose: **a job-hunting tool**
that showcases her work and resume to firms (recruiters, principals).

Replaces the existing WordPress site at miranda-morton.com. Content and styling
are new; the old site is reference only.

## Tech stack

- **Astro 6** — statically generated, component-based authoring.
- **Content collections** for projects (Markdown + frontmatter).
- **FormSubmit.co** for the contact form (no backend needed).
- Astro image optimization via `src/assets/`; PDFs served from `public/pdfs/`.

## Key architectural decision: projects as data

Project cards appear in three contexts (home page, Projects page, and each
project's own full page). To avoid duplication, projects are modeled as a
**content collection**: one Markdown file per project in `src/content/projects/`.

Frontmatter schema (validated via `src/content/config.ts`):

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Project name |
| `category` | `"professional" \| "academic"` | Drives home-page left/right split |
| `order` | number | Manual sort within category |
| `summary` | string | Short blurb for cards |
| `keyInsights` | string[] | Bullet highlights on the full page |
| `coverImage` | image | Card + hero image |
| `gallery` | image[] | Optional image gallery on full page |
| `fullDocsPdf` | string (optional) | Path under `public/pdfs/`; renders a "View Full Documentation" link |
| `confidential` | boolean (default false) | If true (e.g. JLA work), hides docs link and shows a "Full documentation not available — client confidentiality" note |

**Adding a project = drop in one Markdown file + its images.**

## Components

- `Layout.astro` — base shell: `<head>`, nav, footer, global styles.
- `Hero.astro` — home hero (photo, name/title, CTAs).
- `ProjectCard.astro` — single project card (image + summary); used on home + Projects.
- `ProjectGrid.astro` — renders a set of cards, optionally split professional/academic.
- `AboutSection.astro` — bio / "my journey" block (reused on home, smaller, and About page).
- `ContactForm.astro` — FormSubmit.co form.
- `PdfEmbed.astro` — iframe + download button for a PDF (portfolio + resume).

## Pages

### `/` — Home
- **Hero:** photo of Miranda, title ("Architectural Designer & Drafter" — no "student"), CTAs → Portfolio, About/Resume, LinkedIn.
- **Work:** professional projects (left) then academic projects (right/after), via `ProjectGrid`. CTA → Projects page.
- **About (small):** second photo, short "my journey" bio. CTA → Download resume.
- **Contact:** `ContactForm`.

### `/portfolio` — Portfolio
- Short summary of what the document is.
- `PdfEmbed` of the widescreen portfolio PDF (view inline + download).

### `/projects` — Projects
- Short summary of the page.
- Full list of projects (same card content as home). Each card links to its full page.

### `/projects/[slug]` — Project full page (auto-generated)
- Title, summary, key insights, image gallery.
- If `fullDocsPdf` set: "View Full Documentation" link.
- If `confidential`: confidentiality note instead.

### `/about` — About
- Full bio (the home "fluff", expanded), updated job history/dates (no "student").
- `PdfEmbed` of resume PDF (view inline + download).
- LinkedIn link.

### `/contact` — Contact
- Short summary + `ContactForm`.

## Contact form (recreated from ssebs.com/contact)

- `<form action="https://formsubmit.co/<MIRANDA_EMAIL>" method="POST">`
- Fields: `name` (text, required), `email` (email, required), `_subject` (text, required), `message` (textarea, required).
- Hidden: `_captcha=false`, `_next=<success redirect URL>`.
- Styled to Miranda's site theme (not ssebs's). Email + redirect are placeholders until provided.

## Styling

- New visual style distinct from the old WordPress site — clean, architectural,
  image-forward (proportion, clarity, craft). Specific palette/typography to be
  refined during build; not blocking.

## Assets (provided later)

- Project images + Miranda photos → `src/assets/` (Astro-optimized).
- Portfolio PDF + resume PDF → `public/pdfs/`.
- Scaffold uses lightweight placeholders so the site builds and lays out
  correctly before real assets arrive.

## Out of scope / deferred

- CMS / admin UI (edits are via Markdown files).
- Blog.
- Analytics.
- Final palette/typography (handled during build, iteratively).

## Open items

- Miranda's contact email (FormSubmit endpoint). mirandamorton7@yahoo.com
- Updated job descriptions/dates, resume, portfolio PDF, real project content/images.
- LinkedIn URL: https://www.linkedin.com/in/miranda-morton-34b00230a/
