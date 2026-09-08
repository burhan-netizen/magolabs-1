import { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { getPathFromPage } from '../utils/pageRoutes';

export interface BreadcrumbItem {
  label: string;
  /** Page to navigate to when clicked. Omit only for the current (last) item. */
  page?: PageId;
  /** Overrides the schema URL derived from `page`, for items whose real path
   *  isn't a plain PageId lookup (e.g. a specific /work/<id> case study). */
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onPageChange: (page: PageId) => void;
}

const SITE_ORIGIN = 'https://www.magolabs.in';

/** Visual breadcrumb trail matching the site's existing eyebrow-label styling,
 *  plus a matching BreadcrumbList JSON-LD schema. Used on pages 2+ levels deep
 *  (service detail, case study detail) - the top-level pages don't need one. */
export default function Breadcrumbs({ items, onPageChange }: BreadcrumbsProps) {
  useEffect(() => {
    const scriptId = 'json-ld-breadcrumb-schema';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.label,
        item: `${SITE_ORIGIN}${item.path ?? (item.page ? getPathFromPage(item.page) : '')}`,
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-neutral-500">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {isLast || !item.page ? (
              <span className="text-neutral-700 dark:text-neutral-300 font-semibold" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onPageChange(item.page!)}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            )}
            {!isLast && <ChevronRight className="h-3 w-3 text-neutral-300" />}
          </span>
        );
      })}
    </nav>
  );
}
