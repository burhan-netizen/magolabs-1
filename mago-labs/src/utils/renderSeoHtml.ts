import { SEO_CONFIG_MAP } from './seo';
import { getPageFromPath, PAGE_TO_PATH } from './pageRoutes';

const SITE_ORIGIN = 'https://www.magolabs.in';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/default-og.jpg`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Fills the %%SEO_...%% placeholder tokens in the built index.html template with the
 * correct title/description/OG/canonical values for the given URL path. Used both by
 * the dev server (per-request) and by the build-time prerender script (per static file),
 * so every real route ships crawlable, request-independent meta tags in its initial HTML,
 * not just whatever gets patched in by client-side JS after the bundle loads.
 */
export function renderSeoHtml(template: string, pathname: string): string {
  const pageId = getPageFromPath(pathname);
  const config = SEO_CONFIG_MAP[pageId] ?? SEO_CONFIG_MAP.home;
  const path = PAGE_TO_PATH[pageId as keyof typeof PAGE_TO_PATH] ?? '/';

  const replacements: Record<string, string> = {
    '%%SEO_TITLE%%': config.title,
    '%%SEO_DESCRIPTION%%': config.description,
    '%%SEO_OG_TITLE%%': config.ogTitle ?? config.title,
    '%%SEO_OG_DESCRIPTION%%': config.ogDescription ?? config.description,
    '%%SEO_OG_IMAGE%%': config.ogImage ?? DEFAULT_OG_IMAGE,
    '%%SEO_OG_TYPE%%': config.ogType ?? 'website',
    '%%SEO_TWITTER_CARD%%': config.twitterCard ?? 'summary_large_image',
    '%%SEO_URL%%': `${SITE_ORIGIN}${path}`,
  };

  let html = template;
  for (const [token, value] of Object.entries(replacements)) {
    html = html.split(token).join(escapeHtml(value));
  }
  return html;
}
