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
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderSeoHtml, renderSeoHtmlForConfig } from '../src/utils/renderSeoHtml';
import { PAGE_TO_PATH, getInsightDetailPath, getWorkDetailPath } from '../src/utils/pageRoutes';
import { SEOConfig } from '../src/utils/seo';
import { getAllPosts, isContentfulConfigured } from '../src/lib/contentful';
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

const template = fs.readFileSync(templatePath, 'utf-8');
let written = 0;

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
  writeShell(routePath, renderSeoHtml(template, routePath));
}

// Case studies are a small, static, local list (unlike blog posts, no network
// fetch needed) - each gets a real, unique HTML shell derived from its own
// already-written copy via getCaseStudySEO, not a hand-duplicated title/description.
for (const cs of CASE_STUDIES) {
  const routePath = getWorkDetailPath(cs.id);
  writeShell(routePath, renderSeoHtmlForConfig(template, getCaseStudySEO(cs), routePath));
}
console.log(`[prerender-seo] Wrote ${CASE_STUDIES.length} case-study shell(s).`);

// Blog posts don't have a fixed PageId path (one per slug), so they're prerendered
// separately here rather than through the static PAGE_TO_PATH loop above.
if (isContentfulConfigured()) {
  try {
    const posts = await getAllPosts();
    for (const post of posts) {
      const routePath = getInsightDetailPath(post.slug);
      const config: SEOConfig = {
        title: `${post.title} | Mago Labs Insights`,
        description: post.excerpt || 'Digital growth, SEO, and web design insights from Mago Labs.',
        ogTitle: post.title,
        ogDescription: post.excerpt,
        ogImage: post.coverImageUrl,
        ogType: 'article',
        twitterCard: 'summary_large_image',
      };
      writeShell(routePath, renderSeoHtmlForConfig(template, config, routePath));
    }
    console.log(`[prerender-seo] Included ${posts.length} Contentful blog post(s).`);
  } catch (err) {
    // Don't fail the whole production build over a Contentful hiccup at build time \u2014
    // the site still works, posts just fetch client-side without a prerendered shell.
    console.warn('[prerender-seo] Could not fetch Contentful posts, skipping their SEO shells:', err);
  }
} else {
  console.warn('[prerender-seo] Contentful env vars not set, skipping blog post SEO shells.');
}

console.log(`[prerender-seo] Wrote ${written} route-specific HTML shells with real SEO tags into dist/.`);
