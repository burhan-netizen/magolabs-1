import React from 'react';
import { PageId } from '../types';
import { getPathFromPage } from '../utils/pageRoutes';

interface PageLinkProps {
  /** A fixed page to link to. */
  page?: PageId;
  /** An explicit path, for routes that are not a plain PageId (e.g. /work/<id>). */
  href?: string;
  /** Runs the in-app navigation for a normal click. */
  onNavigate: () => void;
  className?: string;
  id?: string;
  title?: string;
  'aria-label'?: string;
  'aria-current'?: 'page';
  children?: React.ReactNode;
  key?: string | number;
}

/**
 * An internal link that is a real <a href>, so search engines and assistants can
 * follow it and people can open it in a new tab, while a normal click still uses
 * the app's instant in-page navigation.
 */
export default function PageLink({ page, href, onNavigate, children, ...rest }: PageLinkProps) {
  const target = href ?? (page ? getPathFromPage(page) : '/');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle new-tab / new-window clicks itself.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate();
  };

  return (
    <a href={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
