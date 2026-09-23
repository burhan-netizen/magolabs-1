/**
 * Runs after `vite build` and scripts/prerender-seo.ts, as the last step of `npm run
 * build`. prerender-seo.ts writes one real HTML shell per route with correct
 * title/description/OG/canonical tags, but `<div id="root">` in each shell is still
 * empty - all real page content (and the JSON-LD schemas injected by src/components/
 * SEO.tsx) only exists after React runs client-side. Googlebot executes JavaScript
 * before indexing, but most AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot, and
 * most others allowed in public/robots.txt) fetch raw HTML and never run it, so
 * without this step they'd see a correct title/description and nothing else.
 *
 * This spins up a local static preview of dist/, uses a real headless Chromium
 * (via Puppeteer) to load every HTML shell prerender-seo.ts wrote, waits for the
 * client-side app to render, and overwrites that same shell with the fully
 * rendered DOM - so the static file on disk has real content, while real visitors
 * still get the normal hydrated, interactive React app.
 *
 * If Chromium can't launch in this environment (e.g. a locked-down CI/build image
 * missing system libraries), this warns and exits successfully rather than failing
 * the whole build - the meta-only shells prerender-seo.ts already wrote are left in
 * place as a fallback, so the build isn't hostage to headless Chromium availability.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

function findHtmlShells(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlShells(fullPath));
    } else if (entry.isFile() && entry.name === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

/** dist/index.html -> '/', dist/work/santoshtimbers/index.html -> '/work/santoshtimbers' */
function routeForHtmlShell(filePath: string): string {
  const rel = path.relative(distDir, path.dirname(filePath));
  if (rel === '') return '/';
  return `/${rel.split(path.sep).join('/')}`;
}

/** Scrolls the full page height to trigger any scroll-based (whileInView) reveal
 *  animations and lazy-mounted content, then returns to the top before capture. */
async function triggerScrollReveal(page: import('puppeteer').Page): Promise<void> {
  await page.evaluate(async () => {
    const step = 600;
    const delay = 60;
    let scrolled = 0;
    while (scrolled < document.body.scrollHeight) {
      window.scrollBy(0, step);
      scrolled += step;
      await new Promise((r) => setTimeout(r, delay));
    }
    window.scrollTo(0, 0);
  });
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error(`[prerender-content] Could not find ${distDir}. Run "vite build" first.`);
    process.exit(1);
  }

  const htmlShells = findHtmlShells(distDir);
  if (htmlShells.length === 0) {
    console.warn('[prerender-content] No HTML shells found in dist/, skipping.');
    return;
  }

  const previewServer = await preview({
    root: projectRoot,
    build: { outDir: 'dist' },
    preview: { port: 4173, strictPort: false, host: '127.0.0.1' },
  });
  const origin = (previewServer.resolvedUrls?.local?.[0] ?? 'http://127.0.0.1:4173/').replace(/\/$/, '');

  const closePreview = () => new Promise<void>((resolve) => previewServer.httpServer.close(() => resolve()));

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } catch (err) {
    console.warn(
      '[prerender-content] Could not launch headless Chromium, skipping full content prerendering. ' +
      'Routes still have correct meta tags from prerender-seo.ts.',
      err
    );
    await closePreview();
    return;
  }

  let rendered = 0;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    for (const filePath of htmlShells) {
      const routePath = routeForHtmlShell(filePath);
      const url = `${origin}${routePath}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await triggerScrollReveal(page);
        await new Promise((r) => setTimeout(r, 300));

        const html = await page.content();
        fs.writeFileSync(filePath, html, 'utf-8');
        rendered++;
      } catch (err) {
        console.warn(
          `[prerender-content] Failed to render ${routePath}, leaving its meta-only shell in place:`,
          (err as Error).message
        );
      }
    }
  } finally {
    await browser.close();
    await closePreview();
  }

  console.log(`[prerender-content] Rendered full content into ${rendered}/${htmlShells.length} HTML shell(s).`);
}

main();
