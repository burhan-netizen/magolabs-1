/**
 * Runs after `vite build`. Vercel (per vercel.json) serves this app as static files
 * plus /api serverless functions, it never runs server.ts, so server.ts's per-request
 * SEO injection never applies there. Without this script, every route on a static host
 * would resolve to the same dist/index.html with the same title/description/OG tags.
 *
 * This writes one real, static HTML file per route (dist/about/index.html,
 * dist/services/seo/index.html, etc.), each a copy of the built shell with that route's
 * title/description/OG/canonical tags already baked in. Static hosts serve the matching
 * file for a path automatically, before falling back to the SPA rewrite for anything else.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderSeoHtml } from '../src/utils/renderSeoHtml';
import { PAGE_TO_PATH } from '../src/utils/pageRoutes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`[prerender-seo] Could not find ${templatePath}. Run "vite build" first.`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
let written = 0;

for (const routePath of Object.values(PAGE_TO_PATH)) {
  const html = renderSeoHtml(template, routePath);

  if (routePath === '/') {
    fs.writeFileSync(templatePath, html, 'utf-8');
    written++;
    continue;
  }

  const outDir = path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  written++;
}

console.log(`[prerender-seo] Wrote ${written} route-specific HTML shells with real SEO tags into dist/.`);
