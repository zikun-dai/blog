# Blog Rebuild Plan (Astro-first)

This document proposes a clean rebuild of the Hexo blog using a modern stack.
It is written to be reviewed and adjusted before any code is generated.

## Recommendation

Primary choice: Astro
- Fast build and runtime, excellent Markdown/MDX support.
- Content Collections give schema validation and type safety.
- Easy to deploy to Netlify/Vercel/Cloudflare Pages/GitHub Pages.
- Allows rich Markdown features like callouts and diagrams via remark/rehype.

Alternatives (if Astro is not desired)
- Next.js: great React ecosystem, heavier runtime, more complex MD setup.
- Hugo: very fast and mature, but Go templates and Markdown extensibility can be limiting.
- Eleventy: simple and flexible, smaller ecosystem, less "app-like" if needed later.

If you already prefer Astro, proceed with Astro.

Decision snapshot
- If you want the best Markdown + content pipeline with low overhead: Astro.
- If you want a React-first app with full SSR: Next.js.
- If you want zero JS and a static-first pipeline: Hugo or Eleventy.

## Repository Strategy

Keep the existing Hexo site intact. Add a new subfolder:
- `astro-blog/` for the new site

Rationale:
- Avoids risk to the current Hexo build.
- Allows parallel development and incremental migration.

Proposed structure
- `/` existing Hexo site
- `astro-blog/` new Astro site

## Scope and Goals

Must-have:
- Preserve all existing posts and frontmatter.
- Better Markdown support: callouts/admonitions, tables, task lists, code fences.
- Clean theme with modern typography and responsive layout.

Nice-to-have:
- Syntax highlighting with copy button.
- RSS feed, sitemap, and SEO metadata.
- Tags and categories pages.

Out of scope (initial phase)
- Custom CMS integration.
- Multi-language routing.
- Full design system overhaul.

## Data Migration Plan

Source: `source/_posts/*.md`

Target: `astro-blog/src/content/posts/*.md`

Tasks:
1) Normalize Hexo frontmatter to Astro content collections.
   - Map fields: `title`, `date`, `tags`, `categories`, `updated`, `description`.
2) Convert any Hexo-specific helpers or tags.
   - Identify custom tags or helpers (if any) and replace with MD/MDX.
3) Ensure Markdown features:
   - Admonitions (callouts) via `remark-directive` or `remark-admonitions`.
   - GitHub-flavored Markdown via `remark-gfm`.

Frontmatter mapping (proposed)
- `title` -> `title` (string, required)
- `date` -> `pubDate` (date, required)
- `updated` -> `updatedDate` (date, optional)
- `tags` -> `tags` (array of strings, optional)
- `categories` -> `categories` (array of strings, optional)
- `description` -> `description` (string, optional)
- `cover` or `thumbnail` -> `heroImage` (string, optional)

Post slug rule
- Default: filename as slug.
- If Hexo uses `permalink`, add `slug` to frontmatter.

## Technical Route (Astro)

### Core
- Astro 4.x
- `@astrojs/mdx` for MDX support
- `@astrojs/sitemap` for sitemap
- `@astrojs/rss` for RSS

### Markdown enhancements
- `remark-gfm` for tables/task lists
- `remark-directive` + custom plugin for callouts
- `rehype-slug` + `rehype-autolink-headings` for heading anchors

### Syntax highlighting
- Astro built-in Shiki, or `@astrojs/markdown-remark` with `remark-shiki`.
- Optional: add copy button via a small client script.

### Content Collections
- Define a `posts` collection with schema validation.
- Use `slug` derived from filename unless overridden.

Example schema (for discussion)
- `title`: string
- `pubDate`: date
- `updatedDate`: date
- `description`: string
- `tags`: string[]
- `categories`: string[]
- `heroImage`: string

### Theming
- Minimal, fast theme with:
  - 2-column layout on desktop, single-column on mobile.
  - Strong typography and readable content width.
  - Light mode by default (can add optional dark toggle later).

Typography direction (proposal)
- Use one serif for titles and a readable sans for body.
- 60-75 character line length for long-form reading.

Visual direction (proposal)
- Warm, minimal palette with accent for links and callouts.
- Subtle background texture or gradient, not flat white.

## Build Phases

Phase 1: Setup
- Create `astro-blog/` and initialize Astro project.
- Configure MDX and Markdown plugins.
- Add content collections schema.

Phase 2: Content Migration
- Copy posts into `astro-blog/src/content/posts/`.
- Fix frontmatter incompatibilities.
- Add callout syntax and ensure rendering.

Phase 3: Pages and Layout
- Home page with recent posts.
- Post detail page with TOC and reading time.
- Tags/categories index.

Phase 4: Extras
- RSS and sitemap.
- 404 page.
- SEO metadata defaults and per-post overrides.

Phase 5: QA and Parity
- Verify old vs new content counts.
- Check post URLs and redirects if needed.
- Validate RSS and sitemap.

## Risks and Decisions Needed

1) Callout syntax choice
   - Selected: Markdown directives (fixed).
2) Theme direction
   - Provide references or desired style.
3) Deployment target
   - GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

Callout syntax example (Markdown directives)

```md
:::note
This is a note callout.
:::
```

Optional variants: `tip`, `warning`, `danger`, `info`.

Implementation detail (Astro)
- Add `remark-directive` and a small custom remark plugin that converts `:::` blocks to HTML with classes.
- Style callout blocks in the global stylesheet (tone + icon by type).

## Acceptance Checklist

- All posts render correctly in Astro.
- Callouts work in Markdown.
- Build completes without errors.
- Home and post pages are responsive.
- RSS/sitemap available.

Validation checklist
- Post count matches `source/_posts/`.
- Tags/categories lists render correctly.
- Links and images resolve in production build.

## Proposed Next Steps

1) Confirm Astro as the framework or pick an alternative.
2) Confirm the subfolder approach (`astro-blog/`).
3) Choose callout syntax and deployment target.
4) After approval, I will scaffold the Astro project and start migration.

## Draft Commands (for review only)

Scaffold
```sh
mkdir -p astro-blog
cd astro-blog
npm create astro@latest . -- --template minimal
```

Add integrations
```sh
npm install @astrojs/mdx @astrojs/rss @astrojs/sitemap remark-gfm remark-directive rehype-slug rehype-autolink-headings
```
