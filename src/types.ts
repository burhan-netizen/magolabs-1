export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'service-web-design'
  | 'service-seo'
  | 'service-gbp'
  | 'service-copywriting'
  | 'work'
  | 'insights'
  | 'insights-detail'
  | 'contact'
  | 'sitemap'
  | 'privacy'
  | 'terms'
  | 'not-found';

export interface Service {
  id: PageId;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  benefits: string[];
  features: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
}

export interface Industry {
  name: string;
  iconName: string;
  desc: string;
}

export interface Benefit {
  title: string;
  desc: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

/** A single client project shown on the Work page, written as a real case study
 *  (challenge -> approach -> outcome) rather than just a link-out. */
export interface CaseStudy {
  id: string;
  clientName: string;
  url: string;
  domain: string;
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
  scope: string[];
  accent: string;
  logoUrl?: string;
  screenshotUrl?: string;
}

/** Mirrors the Contentful "Blog Post" content type fields, as used on the Insights listing page. */
export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author?: string;
  publishedDate: string;
  coverImageUrl?: string;
}

/** A single post's full content, as used on the Insights detail page. */
export interface BlogPost extends BlogPostSummary {
  bodyHtml: string;
}
