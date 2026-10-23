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

## Deploy

Target: Cloudflare Pages, connected to the GitHub repository. Build command `pnpm build`, output directory `dist`. Detailed setup steps will follow.
