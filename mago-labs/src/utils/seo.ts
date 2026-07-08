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
    title: 'Websites That Grow Businesses | Mago Labs',
    description: 'Mago Labs builds high-converting websites that help businesses attract customers, build trust and generate leads. Fast, SEO-friendly, custom-built.',
    ogTitle: 'Websites That Grow Businesses | Mago Labs',
    ogDescription: 'Mago Labs builds high-converting websites that help businesses attract customers, build trust and generate leads. Fast, SEO-friendly, custom-built.',
    ogImage: 'https://www.magolabs.in/og-image-home.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  about: {
    title: 'About Burhan Kapasi & Mago Labs | ROI-Driven Website Agency',
    description: 'Meet Burhan Kapasi, founder of Mago Labs. We build high-performing, custom websites for doctors, Manufacturers, CA firms, and local businesses with an obsession for ROI.',
    ogTitle: 'About Mago Labs & Founder Burhan Kapasi',
    ogDescription: 'Discover our philosophy of craftsmanship, speed-optimization, and high-converting copy without bloated template builders.',
    ogImage: 'https://www.magolabs.in/og-image-about.jpg',
    ogType: 'profile',
    twitterCard: 'summary_large_image'
  },
  services: {
    title: 'Our Digital Growth Services | Mago Labs',
    description: 'Explore our premium services: custom Website Design & Development, high-impact Local SEO, Google Business Profile optimization, and conversion-focused Copywriting.',
    ogTitle: 'Premium Digital Growth Services | Mago Labs',
    ogDescription: 'Bespoke Website Design, Search Engine Optimization (SEO), GBP Map Optimization, and Sales Copywriting services.',
    ogImage: 'https://www.magolabs.in/og-image-services.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-web-design': {
    title: 'Bespoke Web Design & Development Services | Mago Labs',
    description: 'Stunning hand-crafted corporate and product websites designed from a clean sheet. Optimized for instant load speeds, seamless mobile layout, and direct customer bookings.',
    ogTitle: 'Bespoke Web Design & Development Services | Mago Labs',
    ogDescription: 'Hand-crafted websites engineered for ultimate page-speed and conversion rates. Zero templates used.',
    ogImage: 'https://www.magolabs.in/og-image-web-design.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-seo': {
    title: 'Results-Driven Search Engine Optimization (SEO) | Mago Labs',
    description: 'Technical, On-page, and Local SEO solutions engineered to place your business on top of Google search results for valuable local queries.',
    ogTitle: 'Search Engine Optimization (SEO) Services | Mago Labs',
    ogDescription: 'Dominate local search results. Real technical SEO optimization, structured schema markups, and keyword silos.',
    ogImage: 'https://www.magolabs.in/og-image-seo.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-gbp': {
    title: 'Google Business Profile (GBP) Map Optimization | Mago Labs',
    description: 'Rank #1 on Google Maps for local queries. Expert GBP audit, review amplification strategy, and local citation building for high-ticket service bookings.',
    ogTitle: 'Google Business Profile (GBP) MAP Optimization | Mago Labs',
    ogDescription: 'Local map search rankings and Google Business Profile management. Turn nearby searches into direct phone calls and map visits.',
    ogImage: 'https://www.magolabs.in/og-image-gbp.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'service-copywriting': {
    title: 'Conversion-Focused Website Copywriting Services | Mago Labs',
    description: 'Compelling, human-written copy that builds trust and guides users into taking action. Crafted by professional copywriters who understand buyer psychology.',
    ogTitle: 'Conversion Copywriting Services | Mago Labs',
    ogDescription: 'Say goodbye to robotic AI texts. Get persuasive copywriting written by business owners for high-value clients.',
    ogImage: 'https://www.magolabs.in/og-image-copywriting.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'why-choose-us': {
    title: 'Why Choose Mago Labs | High-Performance Custom Web Agency',
    description: 'See why manufacturers, CA firms, doctors, and local businesses choose Mago Labs over standard template agencies. Our unique advantages: speed, support, and direct ROI focus.',
    ogTitle: 'Why Mago Labs is Different | Premium Custom Web Agency',
    ogDescription: 'We reject WordPress templates and page builders. Discover the power of pristine static code and tailored marketing psychology.',
    ogImage: 'https://www.magolabs.in/og-image-why.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  portfolio: {
    title: 'Our Custom Digital Case Studies Portfolio | Mago Labs',
    description: 'Explore our portfolio of 14 bespoke web builds from Healthcare to Heavy B2B Manufacturing. Real custom code, real-world copy, and actual commercial ROI outcomes.',
    ogTitle: 'High-Performance Digital Portfolio & Case Studies | Mago Labs',
    ogDescription: 'Read real-world case studies of digital assets designed to double conversion rates and pass Core Web Vitals.',
    ogImage: 'https://www.magolabs.in/og-image-portfolio.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  testimonials: {
    title: 'Client Reviews & Success Testimonials | Mago Labs',
    description: 'Hear from MSME business owners, doctors, and legal advisors who elevated their digital pipeline with Mago Labs custom website architectures.',
    ogTitle: 'Client Reviews & Success Testimonials | Mago Labs',
    ogDescription: 'Read honest feedback and performance records from businesses powered by Mago Labs.',
    ogImage: 'https://www.magolabs.in/og-image-testimonials.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  insights: {
    title: 'Digital Growth, SEO & Web Design Insights | Mago Labs',
    description: 'Get direct, jargon-free marketing guides, web performance strategies, and local SEO advice to grow your business online.',
    ogTitle: 'Business Growth & Web Insights Blog | Mago Labs',
    ogDescription: 'Actionable, clear marketing guides on search rankings, copy structure, and responsive design for business owners.',
    ogImage: 'https://www.magolabs.in/og-image-insights.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  contact: {
    title: 'Contact Burhan Kapasi & Mago Labs | Request Free Audit',
    description: 'Get a free 30-minute speed and SEO audit of your current website. Connect with us on WhatsApp or call +91 9099245605 to schedule your project consultation.',
    ogTitle: 'Book Your Free Digital Strategy Consultation | Mago Labs',
    ogDescription: 'Speak directly with Burhan Kapasi. Secure your bespoke digital consultation and custom pipeline mapping session.',
    ogImage: 'https://www.magolabs.in/og-image-contact.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  },
  'about-dropdown': {
    title: 'About Burhan Kapasi & Mago Labs | ROI-Driven Website Agency',
    description: 'Meet Burhan Kapasi, founder of Mago Labs. We build high-performing, custom websites for doctors, Manufacturers, CA firms, and local businesses with an obsession for ROI.',
    ogTitle: 'About Mago Labs & Founder Burhan Kapasi',
    ogDescription: 'Discover our philosophy of craftsmanship, speed-optimization, and high-converting copy without bloated template builders.',
    ogImage: 'https://www.magolabs.in/og-image-about.jpg',
    ogType: 'profile',
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
  customOgImage?: string
): void {
  const defaultConfig = SEO_CONFIG_MAP[pageId];
  
  const finalTitle = customTitle || defaultConfig?.title || 'Mago Labs | Custom Website Design Agency';
  const finalDescription = customDescription || defaultConfig?.description || 'We build premium, custom-designed websites.';
  const finalOgTitle = customTitle || defaultConfig?.ogTitle || finalTitle;
  const finalOgDesc = customDescription || defaultConfig?.ogDescription || finalDescription;
  const finalOgImage = customOgImage || defaultConfig?.ogImage || 'https://www.magolabs.in/default-og.jpg';
  const finalOgType = defaultConfig?.ogType || 'website';
  const finalTwitterCard = defaultConfig?.twitterCard || 'summary_large_image';

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
  setMetaTag('property', 'og:url', `https://www.magolabs.in${getPathFromPage(pageId)}`);

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
    const canonicalUrl = `https://www.magolabs.in${getPathFromPage(pageId)}`;
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
