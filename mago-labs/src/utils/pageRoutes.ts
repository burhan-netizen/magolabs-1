import { PageId } from '../types';

/**
 * Single source of truth mapping every real page to a real, crawlable URL path.
 * `about-dropdown` is intentionally excluded: it's a nav-only grouping id, never
 * a page that gets rendered or navigated to directly. `not-found` is excluded for
 * the same reason in reverse: it has no real routed path of its own, it's what
 * any *unmatched* path resolves to.
 */
export const PAGE_TO_PATH: Record<Exclude<PageId, 'about-dropdown' | 'not-found'>, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  'service-web-design': '/services/web-design',
  'service-seo': '/services/seo',
  'service-gbp': '/services/google-business-profile',
  'service-copywriting': '/services/copywriting',
  'why-choose-us': '/why-choose-us',
  portfolio: '/portfolio',
  testimonials: '/testimonials',
  insights: '/insights',
  contact: '/contact',
  sitemap: '/sitemap',
};

const PATH_TO_PAGE: Record<string, PageId> = Object.entries(PAGE_TO_PATH).reduce(
  (acc, [pageId, path]) => {
    acc[path] = pageId as PageId;
    return acc;
  },
  {} as Record<string, PageId>
);

/** Whether a given pathname matches one of the app's real, known routes. */
export function isKnownPath(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return normalized in PATH_TO_PAGE;
}

/** Resolve a browser pathname (e.g. "/services/seo") to a known PageId, or 'not-found'
 *  for anything that doesn't match a real route, a genuine 404, not a silent home fallback. */
export function getPageFromPath(pathname: string): PageId {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PATH_TO_PAGE[normalized] ?? 'not-found';
}

/** Resolve a PageId to its real URL path. */
export function getPathFromPage(pageId: PageId): string {
  if (pageId === 'about-dropdown') return PAGE_TO_PATH.about;
  if (pageId === 'not-found') return '/404';
  return PAGE_TO_PATH[pageId] ?? '/';
}
