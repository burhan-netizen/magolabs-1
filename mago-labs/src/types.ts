export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'service-web-design'
  | 'service-seo'
  | 'service-gbp'
  | 'service-copywriting'
  | 'why-choose-us'
  | 'portfolio'
  | 'testimonials'
  | 'insights'
  | 'contact'
  | 'about-dropdown'
  | 'sitemap'
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
