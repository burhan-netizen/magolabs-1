import { useEffect } from 'react';
import { updateDocumentSEO } from '../utils/seo';
import { PageId } from '../types';

interface SEOProps {
  title: string;
  description: string;
  path: string;
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

    // Dynamic JSON-LD schema injection and management
    const scriptId = 'json-ld-schema-script';
    const existingScripts = document.querySelectorAll(`script[id="${scriptId}"]`);
    existingScripts.forEach((s) => s.remove());

    if (schemas && schemas.length > 0) {
      schemas.forEach((schema) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = scriptId;
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup schemas on unmount to avoid duplicates
      const scriptsToRemove = document.querySelectorAll(`script[id="${scriptId}"]`);
      scriptsToRemove.forEach((s) => s.remove());
    };
  }, [title, description, path, schemas]);

  return null;
}
