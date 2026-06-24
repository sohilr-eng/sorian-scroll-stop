# Sorian Systems Website — Claude Workspace Guide

## Project Overview
Static marketing site + 1 Vercel serverless function for Sorian Systems LLC,
an EHR/ERP implementation consultancy serving NJ, NY, and Trinidad & Tobago.

- **Live URL**: https://sorian-scroll-stop.vercel.app (also soriansystems.com — DNS being migrated from Siteground)
- **GitHub**: https://github.com/sohilr-eng/sorian-scroll-stop
- **Deployment**: Vercel — auto-deploys on push to `master`

## Tech Stack
- Pure HTML/CSS/JS (no build step, no framework, no package.json)
- Vercel Serverless Function: `api/contact.js` (Node.js)
- Data: Airtable (contact form submissions → "Contacts" table)
- Analytics: Vercel Web Analytics

## Pages
| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Homepage with scroll-scrubbed hero video |
| `about.html` | `/about` | Company profile & methodology |
| `services.html` | `/services` | EHR/ERP service catalog |
| `contact.html` | `/contact` | Lead capture form → Airtable |

## Key Design Tokens (CSS variables, duplicated in each HTML file)
```css
--accent: #FF6B00          /* orange CTA color */
--bg: #0a0a0a              /* near-black background */
--text-primary: #f0f0f0
--text-secondary: rgba(240,240,240,0.5)
```
Fonts: Space Grotesk (headings), Archivo (body), JetBrains Mono (mono)

## Hero Video
- Two-column split hero in `index.html` (text left, phoenix right); section bg
  gradient (#B1B4BB → #C6C9CF → #D9D9E0) is sampled from the render's studio
  backdrop so the emblem dissolves into the page via a radial feather mask
- The phoenix is a **passive autoplay loop** (no scrubbing) with a baked-in idle:
  slow float + amber energy-strip "breathing" pulse. On top of the video, a
  cursor-tracked `.hero-glow` div (radial amber gradient, `mix-blend-mode: screen`)
  follows the pointer over the emblem — JS sets `--gx`/`--gy`, CSS `:hover` fades it in
- Two encodes, normal-GOP (passive loop, no seeking → small files), from the 4K
  source: `assets/hero-phoenix-hd.mp4` (1920px desktop, ~930KB) and
  `assets/hero-phoenix.mp4` (1280px mobile, ~410KB) — selected by JS via data attrs.
  Poster: `assets/hero-phoenix-poster.jpg` (first frame)
- IntersectionObserver pauses the loop when the hero scrolls off-screen
- Source file: `assets/hf_20260623_235035_*.mp4` (4K Kling image-to-video render,
  in the project-root `assets/` folder, keep for re-encodes)
- Superseded scrub-era files (`hero-scrub-hd.mp4`, `hero-scrub.mp4`, and older
  `hf_2026061*` renders) are now unused and safe to delete
- `assets/og-image.jpg` (1200×630) is the social share image, generated from a
  video still — referenced by og:image, twitter:image, and JSON-LD in `index.html`
- The old `frames/` directory (169 pre-rendered JPGs for the canvas animation)
  was removed in June 2026 when the video hero replaced it

## API Route
`api/contact.js` — POST only, proxies to Airtable
Required env vars (set in Vercel dashboard):
- `AIRTABLE_BASE_ID`
- `AIRTABLE_API_KEY`

## Local Development
Because there's no build step, any static file server works:
```powershell
# Option 1 — Vercel CLI (also runs the serverless function locally)
vercel dev          # requires: vercel login, then vercel link

# Option 2 — quick static preview (no API)
npx serve .
# or
python -m http.server 8080
```

## Deployment Workflow
```powershell
# Make changes, then:
git add <files>
git commit -m "description"
git push origin master   # Vercel auto-deploys in ~30s
```

## SEO Files
- `sitemap.xml` — update `<lastmod>` when pages change
- `robots.txt` — allow all, points to sitemap

## Shared CSS Pattern
Styles are inlined in each HTML file's `<style>` tag.
If making a change that affects multiple pages (nav, footer, typography),
**update all four HTML files** — there is no shared stylesheet yet.

## Business Context
- Company: Sorian Systems LLC
- Contact: info@soriansystems.com / +1-848-437-0158
- LinkedIn: linkedin.com/company/sorian-systems
- Service areas: New Jersey, New York, Trinidad & Tobago
- Target clients: healthcare orgs, enterprises adopting EHR/ERP
