// Post-build: writes English copies of dist/index.html so /en and /en/privacy carry English
// lang, title, description and OG tags before JavaScript runs (link previews don't run JS).
// Cloudflare Pages serves dist/en.html at /en and dist/en/privacy.html at /en/privacy, without
// a trailing-slash redirect. Every other route keeps the Albanian dist/index.html.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runnerImport } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// Load the copy through Vite so the TypeScript source works on any Node version.
const { module: content } = await runnerImport(path.join(root, "src/content.ts"), { configFile: false, logLevel: "error" });
const en = content.copy.en.seo;

const pages = [
  { file: "en.html", title: en.homeTitle, description: en.homeDescription },
  { file: "en/privacy.html", title: en.privacyTitle, description: en.privacyDescription },
];

const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`write-locale-html: ${label} not found in dist/index.html`);
  return html.replace(pattern, () => replacement);
}

function localize(html, { title, description }) {
  let out = replaceRequired(html, /<html lang="[^"]*">/, '<html lang="en">', "<html lang>");
  out = replaceRequired(out, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`, "<title>");
  out = replaceRequired(out, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(description)}"`, "meta description");
  out = replaceRequired(out, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(title)}"`, "og:title");
  out = replaceRequired(out, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(description)}"`, "og:description");
  return out;
}

const template = await readFile(path.join(dist, "index.html"), "utf8");
for (const page of pages) {
  const target = path.join(dist, page.file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, localize(template, page));
  console.log(`write-locale-html: dist/${page.file}`);
}
