# justintknguyen.com (Astro)

Personal site built from a Claude Design HTML/CSS handoff (kept in `project/` as
reference only — don't edit it, don't treat it as current). Astro 5, static, no adapter.

## Design language — intentional divergence from the original brief

Sơn mài (Vietnamese lacquer) aesthetic: warm near-black, gold + celadon accents,
Cormorant + Spectral serif type. The brief called for sans-serif; serif + gold-forward
was a deliberate, approved departure — don't "correct" it back toward the brief.

## Copy rules

- No em dashes anywhere in copy (brief rule, strictly enforced).
- First person, contractions, grounded specifics over abstraction — see
  `src/content/blog/` and `about.astro` for the calibrated voice.

## Structure

- `src/data/projects.ts` + `src/pages/projects.astro` — project cards have two click
  behaviors: external link (new tab, ↗) or in-page `<dialog>` modal (→, for
  in-progress/private work). Check which pattern a new entry needs before adding one.
- `src/content/blog/` — markdown content collection, rendered via
  `src/pages/blog/[...slug].astro`.
- Two canvas hero components (`SonmaiCanvas.astro`, `LacquerCanvas.astro`) — vanilla JS
  raking-light effects, no framework.

## Deploy

Auto-deploys to Vercel (Hobby/free) on push to `main`. Repo:
github.com/daherro/justin-nguyen-website.

**Known gotcha:** if pushes stop deploying, check Vercel Settings → Git is connected to
`justin-nguyen-website` (not the similarly-named `justin-nguyen` repo it was originally
misconnected to) and Production Branch = `main`.
