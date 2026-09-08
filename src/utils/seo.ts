import { PageId } from '../types';
import { getPathFromPage } from './pageRoutes';

export interface SEOConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
}

export const SEO_CONFIG_MAP: Record<PageId, SEOConfig> = {
  home: {
    title: 'Mago Labs | Website Design & Development Company in Surat',
    description: 'Mago Labs is a founder-led website design and development studio in Surat, Gujarat. We build custom, fast, conversion-focused websites, SEO and digital growth solutions for businesses.',
    ogTitle: 'Mago Labs | Website Design & Development Company in Surat',
    ogDescription: 'Mago Labs is a founder-led website design and development studio in Surat, Gujarat. We build custom, fast, conversion-focused websites, SEO and digital growth solutions for businesses.',
    ogImage: 'https://www.magolabs.in/og-image-home.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  about: {
    title: 'About Mago Labs | Founder-Led Digital Studio in Surat',
    description: 'Meet Burhan Kapasi, founder of Mago Labs, a Surat-based website design and development studio. We build custom websites for doctors, manufacturers, CA firms, and local businesses, with clients working directly with the founder.',
    ogTitle: 'About Mago Labs & Founder Burhan Kapasi | Surat',
    ogDescription: 'Founder-led website design and development in Surat, built around custom engineering, real conversion strategy, and direct client access.',
    ogImage: 'https://www.magolabs.in/og-image-about.jpg',
    ogType: 'profile',
    twitterCard: 'summary_large_image'
  },
  services: {
    title: 'Website Design, SEO & Digital Growth Services in Surat | Mago Labs',
    description: 'Custom website design and development, local SEO, Google Business Profile optimization, and conversion copywriting for businesses in Surat and beyond.',
    ogTitle: 'Website Design, SEO & Digital Growth Services in Surat | Mago Labs',
    ogDescription: 'Custom website design and development, local SEO, Google Business Profile optimization, and conversion copywriting for Surat businesses.',
    ogImage: 'https://www.magolabs.in/og-image-services.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-web-design': {
    title: 'Website Design & Development Company in Surat | Mago Labs',
    description: 'Custom website design and development for businesses in Surat, hand-coded from a blank canvas rather than a template, built for fast load times, mobile-first layouts, and real enquiries.',
    ogTitle: 'Website Design & Development Company in Surat | Mago Labs',
    ogDescription: 'Custom-coded websites built for speed, mobile experience, and conversions, not templates.',
    ogImage: 'https://www.magolabs.in/og-image-web-design.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-seo': {
    title: 'SEO Company in Surat | Local SEO Services | Mago Labs',
    description: 'Technical, on-page, and local SEO for Surat businesses, built to improve search visibility for the terms your customers actually search before they call.',
    ogTitle: 'SEO Company in Surat | Local SEO Services | Mago Labs',
    ogDescription: 'Technical, on-page, and local SEO built around real buyer search intent for Surat businesses.',
    ogImage: 'https://www.magolabs.in/og-image-seo.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-gbp': {
    title: 'Google Business Profile Optimization in Surat | Mago Labs',
    description: 'Google Business Profile setup and optimization for Surat businesses: profile accuracy, categories, review strategy, and local citation consistency to improve Google Maps visibility.',
    ogTitle: 'Google Business Profile Optimization in Surat | Mago Labs',
    ogDescription: 'Google Business Profile and Google Maps optimization for Surat businesses, built to turn nearby searches into calls.',
    ogImage: 'https://www.magolabs.in/og-image-gbp.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-copywriting': {
    title: 'Conversion Copywriting Services in Surat | Mago Labs',
    description: 'Clear, human website copy written to build trust and guide visitors toward an enquiry, without generic AI filler or corporate jargon.',
    ogTitle: 'Conversion Copywriting Services in Surat | Mago Labs',
    ogDescription: 'Human-written website copy built around real buyer psychology, not AI filler.',
    ogImage: 'https://www.magolabs.in/og-image-copywriting.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  work: {
    title: 'Website Design Portfolio & Case Studies | Mago Labs',
    description: 'Real websites Mago Labs has designed and built for clients across timber trading, dental care, consulting, energy, and chartered accountancy, and what each project actually solved.',
    ogTitle: 'Website Design Portfolio & Case Studies | Mago Labs',
    ogDescription: 'Real businesses, real problems solved. See what changed for each client and why it mattered.',
    ogImage: 'https://www.magolabs.in/og-image-portfolio.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  insights: {
    title: 'Web Design, SEO & Digital Growth Insights | Mago Labs',
    description: 'Plain-English guides on website design, local SEO, and digital growth to help Surat businesses understand what actually moves the needle online.',
    ogTitle: 'Web Design, SEO & Digital Growth Insights | Mago Labs',
    ogDescription: 'Plain-English guides on website design, local SEO, and digital growth for business owners.',
    ogImage: 'https://www.magolabs.in/og-image-insights.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  // Generic fallback only , real values for each post come from Contentful and are
  // applied via updateDocumentSEO's custom* params once the post loads (see InsightDetail.tsx).
  'insights-detail': {
    title: 'Insights | Mago Labs',
    description: 'Digital growth, SEO, and web design insights from Mago Labs.',
    ogTitle: 'Insights | Mago Labs',
    ogDescription: 'Digital growth, SEO, and web design insights from Mago Labs.',
    ogImage: 'https://www.magolabs.in/og-image-insights.jpg',
    ogType: 'article',
    twitterCard: 'summary_large_image'
  },
  // Generic fallback only , real values for each case study come from getCaseStudySEO
  // (src/data/caseStudies.ts) and are applied via updateDocumentSEO's custom* params
  // once WorkDetail resolves the slug (see WorkDetail.tsx).
  'work-detail': {
    title: 'Website Design Case Study | Mago Labs',
    description: 'A real client project: the challenge, the approach, and what changed.',
    ogTitle: 'Website Design Case Study | Mago Labs',
    ogDescription: 'A real client project: the challenge, the approach, and what changed.',
    ogImage: 'https://www.magolabs.in/og-image-portfolio.jpg',
    ogType: 'article',
    twitterCard: 'summary_large_image'
  },
  contact: {
    title: 'Contact Mago Labs | Website & SEO Services in Surat',
    description: 'Discuss your project with Surat\u2019s Mago Labs. Connect with us on WhatsApp or call +91 9099245605 to talk through your website and digital strategy.',
    ogTitle: 'Discuss Your Project | Mago Labs, Surat',
    ogDescription: 'Speak directly with Burhan Kapasi about your website and digital strategy. No account managers, no runaround.',
    ogImage: 'https://www.magolabs.in/og-image-contact.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  sitemap: {
    title: 'XML & HTML Website Sitemap | Mago Labs',
    description: 'Explore all available services, project portals, client case studies, and resources on Mago Labs. Built with precision, optimized for speed.',
    ogTitle: 'Mago Labs HTML Sitemap',
    ogDescription: 'Full layout and structure of custom-engineered website design and local search ranking services.',
    ogImage: 'https://www.magolabs.in/default-og.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  privacy: {
    title: 'Privacy Policy | Mago Labs',
    description: 'How Mago Labs collects, uses, and protects the personal information you share through our website and contact forms.',
    ogTitle: 'Privacy Policy | Mago Labs',
    ogDescription: 'How Mago Labs collects, uses, and protects your personal information.',
    ogImage: 'https://www.magolabs.in/default-og.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  terms: {
    title: 'Terms of Service | Mago Labs',
    description: 'The terms that govern using the Mago Labs website and working with us on a web design, SEO, or copywriting project.',
    ogTitle: 'Terms of Service | Mago Labs',
    ogDescription: 'The terms that govern using the Mago Labs website and working with us.',
    ogImage: 'https://www.magolabs.in/default-og.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'not-found': {
    title: 'Page Not Found (404) | Mago Labs',
    description: 'The page you were looking for doesn\u2019t exist or may have moved. Explore our services, portfolio, or get in touch with Mago Labs.',
    ogTitle: 'Page Not Found | Mago Labs',
    ogDescription: 'The page you were looking for doesn\u2019t exist or may have moved.',
    ogImage: 'https://www.magolabs.in/default-og.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }
};

/**
 * Dynamically updates document title, meta descriptions, and Open Graph / Twitter tags.
 */
export function updateDocumentSEO(
  pageId: PageId,
  customTitle?: string,
  customDescription?: string,
  customOgImage?: string,
  customPath?: string
): void {
  const defaultConfig = SEO_CONFIG_MAP[pageId];
  
  const finalTitle = customTitle || defaultConfig?.title || 'Mago Labs | Custom Website Design Agency';
  const finalDescription = customDescription || defaultConfig?.description || 'We build premium, custom-designed websites.';
  const finalOgTitle = customTitle || defaultConfig?.ogTitle || finalTitle;
  const finalOgDesc = customDescription || defaultConfig?.ogDescription || finalDescription;
  const finalOgImage = customOgImage || defaultConfig?.ogImage || 'https://www.magolabs.in/default-og.jpg';
  const finalOgType = defaultConfig?.ogType || 'website';
  const finalTwitterCard = defaultConfig?.twitterCard || 'summary_large_image';
  const finalPath = customPath || getPathFromPage(pageId);

  // 1. Update Document Title
  document.title = finalTitle;

  // Helper function to create/update meta tags
  const setMetaTag = (attribute: 'name' | 'property', attrVal: string, contentVal: string) => {
    let tag = document.querySelector(`meta[${attribute}="${attrVal}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', contentVal);
  };

  // 2. Standard Meta Description
  setMetaTag('name', 'description', finalDescription);

  // 3. Open Graph Tags
  setMetaTag('property', 'og:title', finalOgTitle);
  setMetaTag('property', 'og:description', finalOgDesc);
  setMetaTag('property', 'og:image', finalOgImage);
  setMetaTag('property', 'og:type', finalOgType);
  setMetaTag('property', 'og:url', `https://www.magolabs.in${finalPath}`);

  // 4. Twitter Card Tags
  setMetaTag('name', 'twitter:card', finalTwitterCard);
  setMetaTag('name', 'twitter:title', finalOgTitle);
  setMetaTag('name', 'twitter:description', finalOgDesc);
  setMetaTag('name', 'twitter:image', finalOgImage);

  // 5. Canonical URL Link Tag (skipped for 404s, a page that isn't real shouldn't claim a canonical)
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (pageId === 'not-found') {
    linkCanonical?.remove();
  } else {
    const canonicalUrl = `https://www.magolabs.in${finalPath}`;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);
  }

  // 6. Tell search engines not to index the 404 page
  setMetaTag('name', 'robots', pageId === 'not-found' ? 'noindex, nofollow' : 'index, follow');
}

/**
 * Backward compatibility helper function
 */
export function updateSEO(title: string, description: string): void {
  document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);
}
