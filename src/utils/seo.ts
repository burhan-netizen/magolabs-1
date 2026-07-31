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
    title: 'Best Web Design Company in Surat | Mago Labs',
    description: 'Mago Labs is a Surat-based web design and SEO company building high-converting websites that help local businesses attract customers, build trust, and generate leads.',
    ogTitle: 'Best Web Design Company in Surat | Mago Labs',
    ogDescription: 'Mago Labs is a Surat-based web design and SEO company building high-converting websites that help local businesses attract customers, build trust, and generate leads.',
    ogImage: 'https://www.magolabs.in/og-image-home.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  about: {
    title: 'About Burhan Kapasi & Mago Labs | Web Design Agency in Surat',
    description: 'Meet Burhan Kapasi, founder of Mago Labs, a Surat-based web design agency. We build high-performing, custom websites for doctors, manufacturers, CA firms, and local businesses with an obsession for ROI.',
    ogTitle: 'About Mago Labs & Founder Burhan Kapasi | Surat',
    ogDescription: 'Discover our philosophy of craftsmanship, speed-optimization, and high-converting copy without bloated template builders.',
    ogImage: 'https://www.magolabs.in/og-image-about.jpg',
    ogType: 'profile',
    twitterCard: 'summary_large_image'
  },
  services: {
    title: 'Web Design, SEO & Digital Growth Services in Surat | Mago Labs',
    description: 'Explore our premium services in Surat: custom Website Design & Development, high-impact Local SEO, Google Business Profile optimization, and conversion-focused Copywriting.',
    ogTitle: 'Premium Digital Growth Services in Surat | Mago Labs',
    ogDescription: 'Bespoke Website Design, Search Engine Optimization (SEO), GBP Map Optimization, and Sales Copywriting services for Surat businesses.',
    ogImage: 'https://www.magolabs.in/og-image-services.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-web-design': {
    title: 'Best Website Developers in Surat | Web Design & Development | Mago Labs',
    description: 'Stunning hand-crafted corporate and product websites designed from a clean sheet by Surat-based developers. Optimized for instant load speeds, seamless mobile layout, and direct customer bookings.',
    ogTitle: 'Best Website Developers in Surat | Mago Labs',
    ogDescription: 'Hand-crafted websites engineered for ultimate page-speed and conversion rates. Zero templates used.',
    ogImage: 'https://www.magolabs.in/og-image-web-design.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-seo': {
    title: 'Best SEO Company in Surat | Search Engine Optimization | Mago Labs',
    description: 'Technical, on-page, and local SEO solutions engineered to place Surat businesses on top of Google search results for valuable local queries.',
    ogTitle: 'Best SEO Company in Surat | Mago Labs',
    ogDescription: 'Dominate local search results in Surat. Real technical SEO optimization, structured schema markups, and keyword silos.',
    ogImage: 'https://www.magolabs.in/og-image-seo.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-gbp': {
    title: 'Google Business Profile (GBP) Optimization in Surat | Mago Labs',
    description: 'Rank #1 on Google Maps for local Surat queries. Expert GBP audit, review amplification strategy, and local citation building for high-ticket service bookings.',
    ogTitle: 'Google Business Profile Optimization in Surat | Mago Labs',
    ogDescription: 'Local map search rankings and Google Business Profile management for Surat businesses. Turn nearby searches into direct phone calls and map visits.',
    ogImage: 'https://www.magolabs.in/og-image-gbp.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-copywriting': {
    title: 'Conversion-Focused Website Copywriting Services in Surat | Mago Labs',
    description: 'Compelling, human-written copy that builds trust and guides users into taking action. Crafted by professional copywriters in Surat who understand buyer psychology.',
    ogTitle: 'Conversion Copywriting Services in Surat | Mago Labs',
    ogDescription: 'Say goodbye to robotic AI texts. Get persuasive copywriting written by business owners for high-value clients.',
    ogImage: 'https://www.magolabs.in/og-image-copywriting.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  work: {
    title: 'Our Work | Client Case Studies from Surat | Mago Labs',
    description: 'See real websites Mago Labs has designed and built for clients across timber trading, dental care, consulting, energy, and chartered accountancy, and what each project actually solved.',
    ogTitle: 'Real Client Work & Case Studies | Mago Labs',
    ogDescription: 'Real businesses, real problems solved. See what changed for each client and why it mattered.',
    ogImage: 'https://www.magolabs.in/og-image-portfolio.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  insights: {
    title: 'Digital Growth, SEO & Web Design Insights for Surat Businesses | Mago Labs',
    description: 'Get direct, jargon-free marketing guides, web performance strategies, and local SEO advice to grow your Surat business online.',
    ogTitle: 'Business Growth & Web Insights Blog | Mago Labs',
    ogDescription: 'Actionable, clear marketing guides on search rankings, copy structure, and responsive design for business owners.',
    ogImage: 'https://www.magolabs.in/og-image-insights.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  // Generic fallback only \u2014 real values for each post come from Contentful and are
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
  contact: {
    title: 'Contact Mago Labs | Web Design & SEO Company in Surat',
    description: 'Get a free 30-minute speed and SEO audit of your current website from Surat\u2019s Mago Labs. Connect with us on WhatsApp or call +91 9099245605 to schedule your project consultation.',
    ogTitle: 'Book Your Free Digital Strategy Consultation | Mago Labs, Surat',
    ogDescription: 'Speak directly with Burhan Kapasi. Secure your bespoke digital consultation and custom pipeline mapping session.',
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
