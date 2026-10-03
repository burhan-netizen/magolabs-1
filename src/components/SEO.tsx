import { useEffect } from 'react';
import { updateDocumentSEO } from '../utils/seo';
import { PageId } from '../types';
import JsonLd from './JsonLd';

interface SEOProps {
  path: string;
  /** Only pass these for pages whose title/description are genuinely dynamic
   *  per instance (there are none among the static pages any more - dynamic
   *  detail pages like InsightDetail/WorkDetail call updateDocumentSEO directly
   *  instead). Every static page should omit these and let SEO_CONFIG_MAP
   *  (src/utils/seo.ts) be the single source of truth, since that's also what
   *  the prerendered HTML shell and canonical/OG tags are built from - passing
   *  a different string here would silently overwrite the correct SSR'd title
   *  after hydration. */
  title?: string;
  description?: string;
  schemas?: any[];
}

export default function SEO({ title, description, path, schemas }: SEOProps) {
  useEffect(() => {
    // Determine the corresponding PageId from the path parameter
    let pageId: PageId = 'home';
    const normalizedPath = path.replace(/^\//, '').replace(/\/$/, '');

    if (normalizedPath === 'home' || normalizedPath === '') {
      pageId = 'home';
    } else if (normalizedPath.startsWith('services/')) {
      pageId = normalizedPath.replace('services/', '') as PageId;
    } else {
      pageId = normalizedPath as PageId;
    }

    // Call the dynamic helper function to update title and metadata
    updateDocumentSEO(pageId, title, description);

  }, [title, description, path]);

  // Structured data is rendered as real markup so it ships in the prerendered HTML.
  if (!schemas || schemas.length === 0) return null;
  return (
    <>
      {schemas.map((schema, idx) => (
        <JsonLd key={idx} data={schema} />
      ))}
    </>
  );
}
