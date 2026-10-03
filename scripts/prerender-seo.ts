/**
 * Runs after `vite build` and the server build of src/entry-server.tsx.
 *
 * Vercel (per vercel.json) serves this app as static files plus /api serverless
 * functions. Without this script every route would resolve to the same
 * dist/index.html: one generic title, and an empty <div id="root"> that only fills
 * in once JavaScript runs.
 *
 * This writes one real, static HTML file per route (dist/about/index.html,
 * dist/services/seo/index.html, etc.). Each one contains:
 *   1. that route's own title/description/OG/canonical tags, and
 *   2. the fully rendered page content and structured data, so search engines,
 *      AI assistants and link previews can read the page without running JavaScript.
 * In the browser, React then attaches to that markup (see src/main.tsx).
 */
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { renderSeoHtml, renderSeoHtmlForConfig } from '../src/utils/renderSeoHtml';
import { PAGE_TO_PATH, getInsightDetailPath, getWorkDetailPath } from '../src/utils/pageRoutes';
import { SEOConfig } from '../src/utils/seo';
import { getAllPosts, getPostBySlug, isContentfulConfigured } from '../src/lib/contentful';
import { BlogData, BLOG_DATA_ELEMENT_ID } from '../src/lib/blogData';
import { BlogPostSummary } from '../src/types';
import { CASE_STUDIES, getCaseStudySEO } from '../src/data/caseStudies';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// dotenv's default config() only reads a file literally named ".env" \u2014 but this
// project (matching Vite's own convention) keeps real secrets in ".env.local", so
// that has to be loaded explicitly. ".env" is still loaded after as a fallback for
// CI environments that use that name instead. This must run before getAllPosts()/
// isContentfulConfigured() are actually called below (not just before they're
// imported \u2014 imports are hoisted, so this couldn't run early enough to affect
// module-load-time reads; contentful.ts now reads its env vars lazily instead).
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });
dotenv.config();

const distDir = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`[prerender-seo] Could not find ${templatePath}. Run "vite build" first.`);
  process.exit(1);
}

/**
 * Three changes to the built page shell that let the browser paint as soon as the
 * HTML arrives, with no further round trip:
 *   1. The stylesheet is placed inside the page. As a separate file it blocked
 *      the first paint until it had been requested and downloaded.
 *   2. The fonts used at the top of every page start downloading straight away.
 *      Otherwise the browser only discovers them after reading the styles.
 *   3. The app's JavaScript starts loading just after the first paint, not
 *      alongside it. Every page is complete in its HTML and its links are real
 *      links, so nothing waits on the script, and on a slow phone connection the
 *      download no longer competes with the content the visitor is waiting to see.
 *      A tap, a key press or a scroll starts it at once.
 * Visitors move between pages without reloading, so the styles are still only
 * downloaded once per visit.
 */
function deferredScriptLoader(src: string): string {
  return (
    '<script>(function(){var done=false;function load(){if(done)return;done=true;' +
    "var s=document.createElement('script');s.type='module';s.crossOrigin='anonymous';" +
    `s.src=${JSON.stringify(src)};document.head.appendChild(s);}` +
    // The browser reports its first paint; start then. Older browsers without that
    // report wait two animation frames (the second one runs after the first paint).
    "try{new PerformanceObserver(function(list,observer){observer.disconnect();setTimeout(load,0);}).observe({type:'paint',buffered:true});}" +
    'catch(e){requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(load,0);});});}' +
    // Background tabs never paint, so a timer makes sure it still loads.
    'setTimeout(load,2000);' +
    "['pointerdown','keydown','touchstart','scroll'].forEach(function(t){addEventListener(t,load,{once:true,passive:true});});" +
    '})();</script>'
  );
}

function inlineCriticalAssets(html: string): string {
  const assetsDir = path.join(distDir, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);

  const preloads = ['poppins-latin-700-normal', 'poppins-latin-400-normal', 'poppins-latin-600-normal']
    .map((name) => assetFiles.find((file) => file.startsWith(`${name}-`) && file.endsWith('.woff2')))
    .filter((file): file is string => Boolean(file))
    .map((file) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${file}">`)
    .join('');

  const stylesheetTag = /<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/;
  const match = html.match(stylesheetTag);
  if (!match) {
    console.warn('[prerender-seo] No stylesheet link found to inline, leaving the page shell as built.');
    return html;
  }
  const css = fs.readFileSync(path.join(assetsDir, match[1]), 'utf-8');
  // A function replacer, so "$" characters in the styles are never read as patterns.
  html = html.replace(stylesheetTag, () => `${preloads}<style>${css}</style>`);

  const scriptTag = /<script type="module"[^>]*src="(\/assets\/[^"]+\.js)"[^>]*><\/script>/;
  if (!scriptTag.test(html)) {
    console.warn('[prerender-seo] No module script found to defer, leaving it as built.');
    return html;
  }
  return html.replace(scriptTag, (_tag, src: string) => deferredScriptLoader(src));
}

const template = inlineCriticalAssets(fs.readFileSync(templatePath, 'utf-8'));
let written = 0;

const ROOT_PLACEHOLDER = '<div id="root"></div>';
if (!template.includes(ROOT_PLACEHOLDER)) {
  console.error(`[prerender-seo] ${templatePath} has no ${ROOT_PLACEHOLDER} to render into.`);
  process.exit(1);
}

// The server build of the app, produced by `vite build --ssr src/entry-server.tsx`.
const ssrEntryPath = path.join(__dirname, '..', 'dist-ssr', 'entry-server.js');
if (!fs.existsSync(ssrEntryPath)) {
  console.error(`[prerender-seo] Could not find ${ssrEntryPath}. Run the server build first.`);
  process.exit(1);
}
const { renderPage } = (await import(pathToFileURL(ssrEntryPath).href)) as {
  renderPage: (pathname: string, blogData?: BlogData) => Promise<string>;
};

/** Renders the real page content for a route and places it inside the root element.
 *  For Insights pages, blogData is the content fetched from Contentful: it is rendered
 *  into the page and also written next to it as JSON, so the browser starts from the
 *  same content instead of fetching it again. */
async function withContent(routePath: string, html: string, blogData?: BlogData): Promise<string> {
  const content = await renderPage(routePath, blogData);
  // "<" is escaped so nothing in a post can close the script element early.
  const dataBlock = blogData
    ? `<script id="${BLOG_DATA_ELEMENT_ID}" type="application/json">${JSON.stringify(blogData).replace(/</g, '\\u003c')}</script>`
    : '';
  // A function replacer, so "$" characters in the page content are never read as
  // replacement patterns.
  // data-prerendered-path tells the browser code which page this markup is for, so
  // it only attaches to it when the address bar matches (see src/main.tsx).
  return html.replace(
    ROOT_PLACEHOLDER,
    () => `<div id="root" data-prerendered-path="${routePath}">${content}</div>${dataBlock}`
  );
}

// Blog posts live in Contentful. Fetch the list once, up front, so the Insights
// listing page and every post page can be written with their content included.
let blogPosts: BlogPostSummary[] | null = null;
if (isContentfulConfigured()) {
  try {
    blogPosts = await getAllPosts();
  } catch (err) {
    // Don't fail the whole production build over a Contentful hiccup at build time:
    // the site still works, posts just load in the browser as a fallback.
    console.warn('[prerender-seo] Could not fetch Contentful posts, they will load in the browser instead:', err);
  }
} else {
  console.warn('[prerender-seo] Contentful env vars not set, blog posts will load in the browser instead.');
}

function writeShell(routePath: string, html: string) {
  if (routePath === '/') {
    fs.writeFileSync(templatePath, html, 'utf-8');
    written++;
    return;
  }
  const outDir = path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  written++;
}

for (const routePath of Object.values(PAGE_TO_PATH)) {
  const blogData = routePath === PAGE_TO_PATH.insights && blogPosts ? { posts: blogPosts } : undefined;
  writeShell(routePath, await withContent(routePath, renderSeoHtml(template, routePath), blogData));
}

// Case studies are a small, static, local list (unlike blog posts, no network
// fetch needed) - each gets a real, unique HTML shell derived from its own
// already-written copy via getCaseStudySEO, not a hand-duplicated title/description.
for (const cs of CASE_STUDIES) {
  const routePath = getWorkDetailPath(cs.id);
  writeShell(routePath, await withContent(routePath, renderSeoHtmlForConfig(template, getCaseStudySEO(cs), routePath)));
}
console.log(`[prerender-seo] Wrote ${CASE_STUDIES.length} case-study shell(s).`);

// Blog posts don't have a fixed PageId path (one per slug), so they're written
// separately here rather than through the static PAGE_TO_PATH loop above. Each
// post page includes its full text.
if (blogPosts) {
  let included = 0;
  for (const summary of blogPosts) {
    const routePath = getInsightDetailPath(summary.slug);
    try {
      const post = await getPostBySlug(summary.slug);
      if (!post) continue;
      const config: SEOConfig = {
        title: `${post.title} | Mago Labs Insights`,
        description: post.excerpt || 'Digital growth, SEO, and web design insights from Mago Labs.',
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.coverImageUrl,
        ogType: 'article',
        twitterCard: 'summary_large_image',
      };
      writeShell(routePath, await withContent(routePath, renderSeoHtmlForConfig(template, config, routePath), { post }));
      included++;
    } catch (err) {
      console.warn(`[prerender-seo] Could not write ${routePath}, it will load in the browser instead:`, err);
    }
  }
  console.log(`[prerender-seo] Included ${included} Contentful blog post(s) with full content.`);
}

// The server build was only needed to render the pages above.
fs.rmSync(path.join(__dirname, '..', 'dist-ssr'), { recursive: true, force: true });

console.log(`[prerender-seo] Wrote ${written} route-specific HTML files with full page content and SEO tags into dist/.`);
