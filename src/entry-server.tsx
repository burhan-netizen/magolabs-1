/**
 * Build-time only. Renders the whole app for one URL path to an HTML string, waiting
 * for code-split pages to load first, so scripts/prerender-seo.ts can write real page
 * content into each route's static HTML file. Never shipped to the browser.
 */
import { prerender } from 'react-dom/static';
import App, { preloadPageForPath } from './App';
import { BlogData, setBuildTimeBlogData } from './lib/blogData';

async function renderOnce(pathname: string): Promise<string> {
  // progressiveChunkSize: by default React moves any large section into a hidden
  // holding area so a live server can stream it later. These are static files, so
  // raise the limit far above any page size and keep all content in place.
  const { prelude } = await prerender(<App initialPath={pathname} />, {
    progressiveChunkSize: 50 * 1024 * 1024,
  });
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}

/** React marks a section that was still loading when rendering began with this comment. */
const PENDING_MARKER = '<!--$?-->';

export async function renderPage(pathname: string, blogData?: BlogData): Promise<string> {
  // Blog content fetched by the build script, for Insights pages.
  setBuildTimeBlogData(blogData ?? null);
  // Every page except Home is code-split. Load this page's code before rendering,
  // so its content is written straight into the page where it belongs, readable
  // without any JavaScript, instead of into a hidden area that a script moves later.
  await preloadPageForPath(pathname);
  const html = await renderOnce(pathname);

  if (html.includes(PENDING_MARKER)) {
    const at = html.indexOf(PENDING_MARKER);
    throw new Error(
      `[entry-server] "${pathname}" still has content that only appears with JavaScript, near: ` +
        html.slice(Math.max(0, at - 200), at + 120)
    );
  }
  return html;
}
