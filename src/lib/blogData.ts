import { BlogPost, BlogPostSummary } from '../types';

/**
 * Blog content that was fetched when the site was built, so Insights pages ship
 * with their text already in the HTML instead of loading it in the browser.
 *
 * - At build time, scripts/prerender-seo.ts hands the data to the page render.
 * - In the browser, the same data is read back from a small JSON block that the
 *   build wrote into the page, so the first render matches the HTML exactly.
 *
 * Posts published after the last build are still fetched in the browser as before.
 */
export interface BlogData {
  /** The post list, on /insights. */
  posts?: BlogPostSummary[];
  /** One full post, on /insights/<slug>. */
  post?: BlogPost;
}

export const BLOG_DATA_ELEMENT_ID = 'blog-data';

let buildTimeData: BlogData | null = null;
let browserData: BlogData | null | undefined;

/** Build time only: sets the data for the page about to be rendered. */
export function setBuildTimeBlogData(data: BlogData | null): void {
  buildTimeData = data;
}

export function getInitialBlogData(): BlogData | null {
  if (typeof document === 'undefined') return buildTimeData;
  if (browserData === undefined) {
    try {
      const element = document.getElementById(BLOG_DATA_ELEMENT_ID);
      browserData = element?.textContent ? (JSON.parse(element.textContent) as BlogData) : null;
    } catch {
      browserData = null;
    }
  }
  return browserData;
}

/** Formats a post date the same way at build time and for every visitor (Indian time), so the page never changes on load. */
export function formatPostDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
}
