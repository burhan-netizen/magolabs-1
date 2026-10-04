import { PageId } from '../types';
import { getPathFromPage } from './pageRoutes';

export interface SEOConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** Pixel size of ogImage, when known. Apps that show link previews can lay the
   *  card out before the image has downloaded. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
}

export const SEO_CONFIG_MAP: Record<PageId, SEOConfig> = {
  home: {
    title: 'Mago Labs | Website Design & Development Company in Surat',
    description: 'Custom websites that turn visitors into customers. One clinic went from 25 to 58 patients a day. Founder-led studio in Surat. Get a free website audit.',
    // What link previews show when the homepage is shared. Kept separate from the
    // page title above, which is written for search and must not change.
    ogTitle: 'Mago Labs | Websites that get you found, trusted and chosen',
    ogDescription: 'Custom websites that turn visitors into customers. One clinic went from 25 to 58 patients a day. Founder-led studio in Surat. Get a free website audit.',
    ogImage: 'https://www.magolabs.in/og-image-home.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  about: {
    title: 'About Mago Labs | Founder-Led Digital Studio in Surat',
    description: 'Meet Burhan Kapasi, founder of Mago Labs in Surat. Custom websites for clinics, CA firms and manufacturers. You work directly with the founder.',
    ogTitle: 'About Mago Labs & Founder Burhan Kapasi | Surat',
    ogDescription: 'Founder-led website design and development in Surat, built around custom engineering, real conversion strategy, and direct client access.',
    ogImage: 'https://www.magolabs.in/og-image-about.jpg',
    ogType: 'profile',
    twitterCard: 'summary_large_image'
  },
  services: {
    title: 'Website Design & Development Services in Surat | Mago Labs',
    description: 'Websites are our main service: custom-designed, hand-coded and live in 5 to 28 days. SEO, Google Business Profile, copywriting and branding alongside.',
    ogTitle: 'Website Design & Development Services in Surat | Mago Labs',
    ogDescription: 'Websites are our main service: custom-designed, hand-coded and live in 5 to 28 days. SEO, Google Business Profile, copywriting and branding alongside.',
    ogImage: 'https://www.magolabs.in/og-image-services.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-web-design': {
    title: 'Custom Website Design & Development in Surat | Mago Labs',
    description: 'Custom websites, hand-coded from a blank canvas, never a template. Fast, mobile-first and built to bring enquiries. Four packages, live in 5 to 28 days.',
    ogTitle: 'Custom Website Design & Development in Surat | Mago Labs',
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
    description: 'Google Business Profile setup and optimisation for Surat businesses: accurate profile, right categories, more reviews and better Google Maps visibility.',
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
    description: 'Websites Mago Labs has built for clinics, CA firms, manufacturers and more, and what changed after launch. One CA firm signed 34 new clients.',
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
  pricing: {
    title: 'Website Design Pricing & Packages | Mago Labs',
    description: 'Clear website pricing from Mago Labs. Four custom packages: Launch, Growth, Scale and Commerce. Live in 5 to 28 days, with a fixed quote and no hidden fees.',
    ogTitle: 'Website Pricing | Mago Labs',
    ogDescription: 'Four custom website packages with clear starting prices. A fixed quote before any work starts.',
    ogImage: 'https://www.magolabs.in/og-image-pricing.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'industry-dentists': {
    title: 'Website Design for Dentists & Clinics | Mago Labs',
    description: 'Websites for dentists and clinics with appointment booking and local SEO. One clinic went from 25 to 58 patients a day within two months of launch.',
    ogTitle: 'Websites for Dentists & Clinics | Mago Labs',
    ogDescription: 'A clinic website that shows your experience and makes booking easy.',
    ogImage: 'https://www.magolabs.in/og-image-dentists.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'industry-ca-firms': {
    title: 'Website Design for CA Firms & Accountants | Mago Labs',
    description: 'Clean, trust-focused websites for chartered accountancy firms. One firm signed 34 new clients within three months of launching its first website.',
    ogTitle: 'Websites for CA Firms | Mago Labs',
    ogDescription: 'A website that lets prospective clients check your firm before they call.',
    ogImage: 'https://www.magolabs.in/og-image-ca-firms.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'industry-manufacturers': {
    title: 'Website Design for Manufacturers & B2B Suppliers | Mago Labs',
    description: 'Websites for manufacturers and B2B suppliers: product catalogues, enquiry forms and admin panels that show buyers the real scale of your business.',
    ogTitle: 'Websites for Manufacturers & B2B Suppliers | Mago Labs',
    ogDescription: 'A website that shows buyers the real scale of your business.',
    ogImage: 'https://www.magolabs.in/og-image-manufacturers.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  contact: {
    title: 'Contact Mago Labs | Free Website Audit in Surat',
    description: 'Get a free website audit from Mago Labs, Surat. Send your website address, or WhatsApp or call Burhan Kapasi directly on +91 9099245605.',
    ogTitle: 'Discuss Your Project | Mago Labs, Surat',
    ogDescription: 'Speak directly with Burhan Kapasi about your website and digital strategy. No account managers, no runaround.',
    ogImage: 'https://www.magolabs.in/og-image-contact.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  sitemap: {
    title: 'Sitemap | Mago Labs',
    description: 'Every page on the Mago Labs website: services, pricing, industries, client case studies and insights.',
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
  // The image's size is only stated for pages that declare it, and only while the
  // page's own image is the one in use.
  const sized = !customOgImage && defaultConfig?.ogImageWidth && defaultConfig?.ogImageHeight;
  for (const [name, value] of [['og:image:width', defaultConfig?.ogImageWidth], ['og:image:height', defaultConfig?.ogImageHeight]] as const) {
    if (sized) setMetaTag('property', name, String(value));
    else document.querySelector(`meta[property="${name}"]`)?.remove();
  }
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
