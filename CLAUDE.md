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
- Full-bleed cursor-scrubbed hero in `index.html`; section bg gradient matches
  the video's studio backdrop (#B2B6BD → #D9DADE) so the model blends into the page
- Two encodes, both all-keyframe (`-g 1`) for instant seeking:
  `assets/hero-scrub-hd.mp4` (1928px, desktop scrub) and
  `assets/hero-scrub.mp4` (1280px, mobile autoplay loop) — selected by JS via data attrs
- Source file: `assets/hf_20260610_220024_*.mp4` (original render, keep for re-encodes)
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
