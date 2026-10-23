# Panorama-Rugovë

Landing page for Hotel Restaurant Panorama-Rugovë (Shtupeq i Madh, Rugova, Pejë).
React + Vite + Tailwind CSS v4 single-page app, originally exported from Figma Make.
Production refactor done with Claude Opus 5.5 (`claude-opus-5-5`) in Claude Code.

- Albanian: `/` · privacy at `/privatesia`
- English: `/en` · privacy at `/en/privacy`
- Room request form will be sent through EmailJS (being wired up; see Environment variables).

## Requirements

- Node.js 22
- pnpm 10.34.3 (pinned in `package.json` → `packageManager`). If another version is active, prefix commands with `npx pnpm@10.34.3`.

## Commands

```sh
pnpm install   # install dependencies
pnpm dev       # start the dev server
pnpm build     # production build into dist/
pnpm preview   # serve the production build locally
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values from the EmailJS dashboard. `.env` is git-ignored; never commit it.

| Variable | Meaning |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## Deploy: Cloudflare Pages

### How the build is served

- `pnpm build` runs `vite build`, then `scripts/write-locale-html.mjs`, which writes per-route copies of `index.html` with the right `lang`, title, description and OG tags: `dist/en.html` (`/en`), `dist/en/privacy.html` (`/en/privacy`) and `dist/privatesia.html` (`/privatesia`). Every other route gets the Albanian home `dist/index.html`.
- There is deliberately **no `404.html`**, so Cloudflare Pages treats the site as a single-page app and serves `index.html` for unknown paths; the app then shows its own 404 page.
- `public/_headers` sets basic security headers, and sends `X-Robots-Tag: noindex` on `https://panorama-rugove.pages.dev/*` so the Cloudflare hostname never competes with the real domain in search (this rule stays after launch). It assumes the Pages project is named `panorama-rugove`; if Cloudflare gives the project a different `*.pages.dev` hostname, update the rule. Cloudflare adds `noindex` to preview deployments by itself.
- `public/robots.txt` blocks crawlers until launch.

### First-time setup

1. Push the repository to GitHub (a private repo is fine).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, then pick the repository.
3. Build settings:
   - Framework preset: **None**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Root directory: leave empty
4. Environment variables (**Settings → Variables and Secrets**). Add each one for **both Production and Preview**:

   | Name | Value |
   | --- | --- |
   | `PNPM_VERSION` | `10.34.3` (the build image doesn't read `packageManager`) |
   | `VITE_EMAILJS_SERVICE_ID` | from the EmailJS dashboard |
   | `VITE_EMAILJS_TEMPLATE_ID` | from the EmailJS dashboard |
   | `VITE_EMAILJS_PUBLIC_KEY` | from the EmailJS dashboard |

   The `VITE_*` values are baked in at **build time**: if one is missing, the site still builds but every form submit shows the error message. After changing a variable, start a new deployment. The Node.js default of the v3 build image (22.x) is fine; set `NODE_VERSION` only if a build complains.
5. Save and deploy. Check the site on `https://<project>.pages.dev`. Every push to `main` deploys to production; other branches get preview URLs (`https://<branch>.<project>.pages.dev`).
6. Custom domain (when there is one): **your Pages project → Custom domains → Set up a domain**. If the domain's DNS is on Cloudflare, the record is created for you; otherwise add the `CNAME` that Cloudflare shows (pointing at `<project>.pages.dev`).

### EmailJS allowed domains

In the EmailJS dashboard (account security), the allowed-domains list must contain:

- `localhost` (local testing with `pnpm dev` / `pnpm preview`)
- `<project>.pages.dev`, plus any preview hostnames you test the form on (`<branch>.<project>.pages.dev`); check whether EmailJS accepts a wildcard, otherwise add each one
- the production domain, once it exists

A domain missing from the list makes every send fail, and the form shows its error message.

### At launch

- Remove the `noindex` meta tag from `index.html` and the `Disallow: /` line from `public/robots.txt`.
- Replace the placeholder favicon and the test photos.

## Test photos — replace before launch

The photo slots currently show **free Unsplash photos as test stand-ins**, not photos of the hotel. They are free to use under the [Unsplash License](https://unsplash.com/license) (attribution not required), but they must be replaced with the client's own photos before launch. Downloaded from Unsplash's CDN as WebP (hero 1600 px wide, others 1000 px). To replace one, overwrite the file in `public/images/` (or add a new file) and update its path and `width`/`height` in `src/photos.ts`. Alt texts live in `src/content.ts` (`photoAlt`, and `roomNames` for the rooms).

| Slot | File | Unsplash photo | Photographer |
| --- | --- | --- | --- |
| P-01 hero | `public/images/test-p01-hero.webp` | https://unsplash.com/photos/2XDsKxuRv-s | Waldemar Brandt |
| P-02 double room | `public/images/test-p02-double-room.webp` | https://unsplash.com/photos/nVDaaKMtiMo | Annie Spratt |
| P-03 triple room | `public/images/test-p03-triple-room.webp` | https://unsplash.com/photos/hjo94-g9tYI | Grace Anne Bobadilla |
| P-04 quadruple room | `public/images/test-p04-quadruple-room.webp` | https://unsplash.com/photos/80m7BBm3cYI | Grace Anne Bobadilla |
| P-05 apartment | `public/images/test-p05-apartment.webp` | https://unsplash.com/photos/xtaE1E3si6s | Pratik Bachhav |
| P-06 villa | `public/images/test-p06-villa.webp` | https://unsplash.com/photos/St0CebsccjA | Sophia DeWald |
| P-07 restaurant | `public/images/test-p07-restaurant.webp` | https://unsplash.com/photos/voGMbiNIYqs | Vanessa Zhu |
| P-08 verandas | `public/images/test-p08-verandas.webp` | https://unsplash.com/photos/wKHoG0Xg1SM | Polina Kuzovkova |
| P-09 dishes | `public/images/test-p09-dishes.webp` | https://unsplash.com/photos/fcOaa6j4cUo | Jovan Vasiljević |
| P-10 surroundings | `public/images/test-p10-surroundings.webp` | https://unsplash.com/photos/k3BbV6r_gb4 | Shpëtim Ujkani |
