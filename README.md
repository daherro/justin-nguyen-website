# Justin Nguyễn — Personal Website

A static personal site and blog built with [Astro](https://astro.build), implementing the Claude Design handoff in `project/`. Sơn mài lacquer aesthetic: warm near-black, warm off-white, gold and celadon accents, Cormorant + Spectral typography.

## Stack

- **Astro 5** (static output) with markdown-based blog posts via content collections
- **No framework runtime** — the two animated hero backgrounds (homepage, About) are vanilla `<canvas>` scripts
- `@astrojs/sitemap` and `@astrojs/rss` for `/sitemap-index.xml` and `/rss.xml`

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  layouts/BaseLayout.astro      <head>, fonts, SEO/OG meta
  components/                   Nav, Footer, backgrounds, canvas effects
  pages/
    index.astro                 Homepage
    projects.astro              Projects index (data in src/data/projects.ts)
    about.astro                 About + timeline
    blog/index.astro            Blog index (featured + list)
    blog/[...slug].astro        Blog post template
    rss.xml.js                  RSS feed
  content/blog/*.md             Blog posts (markdown + frontmatter)
  content.config.ts             Blog collection schema
  data/projects.ts              Projects list
public/assets/                  lacquer-texture.png, sonmai-landscape.png
project/                        Original Claude Design handoff (reference only)
```

## Writing a blog post

Add a markdown file to `src/content/blog/`. Frontmatter schema (see `src/content.config.ts`):

```markdown
---
title: Your post title
date: 2026-06-20          # YYYY-MM-DD
topic: Strategy           # short uppercase label
summary: One-line summary shown in the blog index.
standfirst: Italic subtitle shown under the title on the post page.
draft: false              # optional; omit or set false to publish
---

Body in markdown. The first paragraph gets a drop cap automatically.
```

The most recent post is shown as **Featured** on the blog index; reading time is computed automatically.

## Deploying to Vercel

This is a fully static site, so Vercel needs no adapter — it auto-detects Astro.

1. **Set your domain.** Edit `site` in `astro.config.mjs` to your production URL (currently a placeholder). It drives canonical URLs, the sitemap, and the RSS feed.
2. Push this repo to GitHub.
3. In Vercel: **New Project → import the repo.** Vercel detects Astro automatically:
   - Framework preset: **Astro**
   - Build command: `astro build`
   - Output directory: `dist`
4. Deploy. Add your custom domain in the Vercel dashboard if you have one.

Alternatively, deploy from the CLI: `npm i -g vercel && vercel`.

## Notes

- The design intentionally diverges from the original written brief (serif type and a gold-forward palette rather than a single sans-serif with celadon as the only accent). This is deliberate.
- Update the GitHub link in `src/components/Footer.astro` and `src/pages/about.astro` if `github.com/daherro` changes.
