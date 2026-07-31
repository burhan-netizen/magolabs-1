import { PageId } from '../types';

/**
 * Single source of truth mapping every real, fixed page to a real, crawlable URL path.
 * `not-found` is excluded since it has no real routed path of its own, it's what
 * any *unmatched* path resolves to. `insights-detail` is excluded because it isn't
 * one fixed path — it's a family of paths, one per blog post slug (see below).
 */
export const PAGE_TO_PATH: Record<Exclude<PageId, 'not-found' | 'insights-detail'>, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  'service-web-design': '/services/web-design',
  'service-seo': '/services/seo',
  'service-gbp': '/services/google-business-profile',
  'service-copywriting': '/services/copywriting',
  work: '/work',
  insights: '/insights',
  contact: '/contact',
  sitemap: '/sitemap',
  privacy: '/privacy',
  terms: '/terms',
};

const PATH_TO_PAGE: Record<string, PageId> = Object.entries(PAGE_TO_PATH).reduce(
  (acc, [pageId, path]) => {
    acc[path] = pageId as PageId;
    return acc;
  },
  {} as Record<string, PageId>
);

/** Matches "/insights/some-post-slug" (but not bare "/insights"). */
const INSIGHT_DETAIL_PATTERN = /^\/insights\/([a-z0-9-]+)$/;

/** Whether a given pathname matches one of the app's real, known routes. */
export function isKnownPath(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return normalized in PATH_TO_PAGE || INSIGHT_DETAIL_PATTERN.test(normalized);
}

/** Resolve a browser pathname (e.g. "/services/seo") to a known PageId, or 'not-found'
 *  for anything that doesn't match a real route, a genuine 404, not a silent home fallback. */
export function getPageFromPath(pathname: string): PageId {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalized in PATH_TO_PAGE) return PATH_TO_PAGE[normalized];
  if (INSIGHT_DETAIL_PATTERN.test(normalized)) return 'insights-detail';
  return 'not-found';
}

/** Extracts the post slug from a pathname like "/insights/my-post", or null if it isn't one. */
export function getInsightSlugFromPath(pathname: string): string | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const match = normalized.match(INSIGHT_DETAIL_PATTERN);
  return match ? match[1] : null;
}

/** Builds the URL path for a given post slug. */
export function getInsightDetailPath(slug: string): string {
  return `/insights/${slug}`;
}

/** Resolve a PageId to its real URL path. For 'insights-detail' (which has no single fixed
 *  path) this falls back to the Insights listing page — callers that need a specific post's
 *  URL should use getInsightDetailPath(slug) instead. */
export function getPathFromPage(pageId: PageId): string {
  if (pageId === 'not-found') return '/404';
  if (pageId === 'insights-detail') return PAGE_TO_PATH.insights;
  return PAGE_TO_PATH[pageId] ?? '/';
}
