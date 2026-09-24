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
 * to load every HTML shell prerender-seo.ts wrote, waits for the client-side app
 * to render, and overwrites that same shell with the fully rendered DOM - so the
 * static file on disk has real content, while real visitors still get the normal
 * hydrated, interactive React app.
 *
 * Two different Chromiums, depending on where this runs:
 * - Locally (Windows/Mac/Linux dev machines): full `puppeteer`, which downloads a
 *   real Chromium for whatever OS you're on.
 * - On Vercel (`process.env.VERCEL` is set during its build): `puppeteer-core` +
 *   `@sparticuz/chromium`, a Chromium build compiled specifically for serverless/CI
 *   Linux containers. Vercel's build image is missing shared libraries (nss, atk,
 *   etc.) that full `puppeteer`'s bundled Chromium needs, so on Vercel that launch
 *   fails silently into the fallback below instead of ever rendering content -
 *   this is what actually happened on the first deploy of this script.
 *
 * If Chromium still can't launch in some other environment, this warns and exits
 * successfully rather than failing the whole build - the meta-only shells
 * prerender-seo.ts already wrote are left in place as a fallback, so the build
 * isn't hostage to headless Chromium availability.
 *
 * Navigation deliberately does NOT wait for `networkidle0`: src/index.css opens
 * with `@import url('https://fonts.googleapis.com/...')`, a real external network
 * call on every route, and on Vercel's build sandbox that (plus its cascading
 * fonts.gstatic.com font-file requests) was observed to occasionally stall for
 * minutes, which made "wait until the network goes quiet" a bad readiness signal.
 * Instead this blocks font/image/media requests outright (irrelevant to a text
 * snapshot for crawlers) and waits for real rendered text in #root instead, each
 * route on its own fresh page and its own bounded timeout.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { preview } from 'vite';
import type { Browser } from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

async function launchBrowser(): Promise<Browser> {
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = await import('puppeteer-core');
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const puppeteer = await import('puppeteer');
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

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

/** Scrolls the full page height (capped at a fixed number of steps, since a page
 *  whose height keeps shifting as reveal animations run could otherwise make this
 *  loop run far longer than intended) to trigger scroll-based (whileInView) reveal
 *  animations and lazy-mounted content, then returns to the top before capture. */
async function triggerScrollReveal(page: import('puppeteer-core').Page): Promise<void> {
  await page.evaluate(async () => {
    const step = 800;
    const delay = 40;
    const maxSteps = 40;
    for (let i = 0; i < maxSteps; i++) {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) break;
      window.scrollBy(0, step);
      await new Promise((r) => setTimeout(r, delay));
    }
    window.scrollTo(0, 0);
  });
}

/** Waits for the actual per-route page content to render, bounded by its own timeout -
 *  independent of any network activity elsewhere on the page. Checks <main> specifically,
 *  not #root as a whole: Navbar/Footer/ContactCTA are always-mounted chrome that alone
 *  exceeds any reasonable text-length threshold, so a #root-wide check could (and once
 *  did, for a lazy-loaded route that took a little longer than usual) pass while <main>
 *  - the part that's actually route-specific and behind React.lazy/Suspense - was still
 *  empty, capturing a shell with everything except the page's own content. */
async function waitForContentReady(page: import('puppeteer-core').Page): Promise<void> {
  await page.waitForFunction(
    () => {
      const main = document.querySelector('main');
      return !!main && (main.textContent ?? '').trim().length > 40;
    },
    { timeout: 25000 }
  );
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} exceeded ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
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

  let browser: Browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    console.warn(
      '[prerender-content] Could not launch headless Chromium, skipping full content prerendering. ' +
      'Routes still have correct meta tags from prerender-seo.ts.',
      err
    );
    await closePreview();
    return;
  }

  /** One attempt at rendering a single route. Throws on failure; the caller decides
   *  whether to retry. A fresh page per attempt, so a request left hanging by one
   *  route or attempt (e.g. the Google Fonts @import in src/index.css, which needs
   *  real internet egress and was observed to occasionally stall for minutes in
   *  Vercel's build sandbox) can never bleed into the next one. */
  async function renderRouteOnce(routePath: string, url: string, filePath: string): Promise<void> {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1440, height: 900 });
      // This is a text snapshot for crawlers, not a visual one - fonts, images,
      // and stylesheets add nothing but slow, sometimes-flaky network calls. Analytics
      // (gtag.js) is blocked for the same flaky-external-dependency reason AND so this
      // build-time headless-browser pass never sends real pageviews into GA4 - the
      // index.html config call already skips itself on 127.0.0.1, this is defense in
      // depth against the request even reaching Google's CDN.
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const reqUrl = req.url();
        const type = req.resourceType();
        const isTrackingScript = reqUrl.includes('googletagmanager.com') || reqUrl.includes('google-analytics.com');
        // Blog post bodies come from Contentful's rich text (author-controlled CMS
        // content, not reviewed here) and can embed iframes (YouTube, Maps, etc.).
        // An iframe's own navigation request also has resourceType 'document', same
        // as the page's own top-level load, so it can't be filtered by type alone -
        // this instead blocks anything that isn't the main frame outright. A slow or
        // unreachable embed was observed to hang not just that route's capture but
        // the next several routes too, since Puppeteer's page.close() can itself
        // block on an in-flight sub-frame navigation.
        const isSubFrame = req.frame() !== null && req.frame() !== page.mainFrame();
        if (isSubFrame || type === 'font' || type === 'image' || type === 'media' || reqUrl.includes('fonts.googleapis.com') || reqUrl.includes('fonts.gstatic.com') || isTrackingScript) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await withTimeout(
        (async () => {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await waitForContentReady(page);
          await triggerScrollReveal(page);
          await new Promise((r) => setTimeout(r, 200));
        })(),
        55000,
        `render ${routePath}`
      );

      const html = await page.content();
      fs.writeFileSync(filePath, html, 'utf-8');
    } finally {
      // A page stuck on some in-flight navigation can make close() itself hang -
      // don't let a single bad page stall every route after it. The browser-wide
      // close() at the end of the run cleans up anything left dangling here.
      await withTimeout(page.close(), 5000, 'page.close()').catch(() => {});
    }
  }

  async function renderRouteWithRetry(filePath: string): Promise<boolean> {
    const routePath = routeForHtmlShell(filePath);
    const url = `${origin}${routePath}`;
    // Vercel's shared, 2-core build machine occasionally makes an otherwise-healthy
    // route (no hanging request involved) miss its own timeout budget under load -
    // one retry on a fresh page catches that without masking a genuinely broken route.
    try {
      await renderRouteOnce(routePath, url, filePath);
      return true;
    } catch (firstErr) {
      try {
        await renderRouteOnce(routePath, url, filePath);
        return true;
      } catch (secondErr) {
        console.warn(
          `[prerender-content] Failed to render ${routePath} after 2 attempts, leaving its meta-only shell in place:`,
          (firstErr as Error).message,
          '|',
          (secondErr as Error).message
        );
        return false;
      }
    }
  }

  let rendered = 0;
  let renderedOrAttempted = 0;
  const ROUTES_PER_BROWSER = 8;
  try {
    // Sequential, one route at a time. A concurrency of 2 (matching the build
    // machine's stated core count) was tried and made things dramatically worse in
    // practice - Vercel's advertised "2 cores" evidently doesn't mean 2 full cores'
    // worth of usable headroom for 2 concurrent Chromium instances, and most routes
    // started failing with CDP-level "Runtime.callFunctionOn timed out" errors
    // (the browser's own protocol connection overloaded, not just a slow page).
    // Sequential, one browser tab at a time, is the safe default here.
    for (const filePath of htmlShells) {
      // A long run of many routes was observed to fail progressively more often
      // as it went on (an early route or two failing, then most of the back half
      // failing outright) - the signature of some per-page resource never fully
      // released across a long sequence of newPage()/close() cycles in this
      // environment specifically. Recycling the whole browser periodically is a
      // blunt but reliable guard against that, regardless of its exact cause.
      if (renderedOrAttempted % ROUTES_PER_BROWSER === 0 && renderedOrAttempted > 0) {
        await withTimeout(browser.close(), 10000, 'browser.close() (recycle)').catch(() => {});
        try {
          browser = await launchBrowser();
        } catch (err) {
          console.warn(
            '[prerender-content] Could not relaunch Chromium mid-run, stopping here. ' +
            'Remaining routes keep their correct meta tags from prerender-seo.ts.',
            err
          );
          break;
        }
      }
      if (await renderRouteWithRetry(filePath)) rendered++;
      renderedOrAttempted++;
    }
  } finally {
    await withTimeout(browser.close(), 10000, 'browser.close()').catch(() => {});
    await closePreview();
  }

  console.log(`[prerender-content] Rendered full content into ${rendered}/${htmlShells.length} HTML shell(s).`);
}

main();
