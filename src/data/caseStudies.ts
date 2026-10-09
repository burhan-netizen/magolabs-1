import { CaseStudy } from '../types';
import type { SEOConfig } from '../utils/seo';

/**
 * Shared source of truth for every real client project, written as a case study
 * (business -> challenge -> approach -> build -> outcome) rather than just a link-out.
 * Lives outside ClientWorkGallery.tsx so scripts/prerender-seo.ts (a plain Node script,
 * no JSX) can import the same data to generate a real, unique HTML shell per project.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'santoshtimbers',
    clientName: 'Santosh Timbers',
    url: 'https://www.santoshtimbers.com',
    domain: 'www.santoshtimbers.com',
    industry: 'Timber & Wood Trading',
    business:
      "One of India's largest timber importers, built on word of mouth and personal networks, with no website to back up that scale when a new buyer went looking online.",
    challenge:
      "Before we stepped in, they had no website at all, so a serious buyer doing due diligence had nothing to find, and nothing to confirm they were dealing with a real, established company.",
    approach:
      "We built them a website from scratch, designed specifically to convert visitors into serious enquiries. Every section was built around establishing trust fast, since bulk timber buyers want to know they are dealing with a real, established company before they pick up the phone.",
    build:
      "A custom-designed website with a full product catalog and a direct enquiry form, structured section by section around the trust signals a bulk buyer actually looks for.",
    outcome:
      "Santosh Timbers now has a professional online presence that matches the scale of their actual business, giving new buyers a reason to trust them before the first conversation even happens.",
    scope: ['Website Design', 'Product Catalog', 'Enquiry Form'],
    accent: '#92400E',
    logoUrl: '/logos/sm/santoshtimbers.webp',
    screenshotUrl: '/screenshots/santoshtimbers.webp',
  },
  {
    id: 'drmihirshah',
    clientName: 'Dr. Mihir Shah Smile Care Clinic',
    url: 'https://www.drmihirshahsmilecareclinic.com',
    domain: 'www.drmihirshahsmilecareclinic.com',
    industry: 'Dental & Healthcare',
    business:
      "A dental practice with over 25 years of real experience, opening a new clinic location with no website to introduce it to anyone in that area.",
    challenge:
      "He needed a way to attract patients who had never heard of him before, and decades of real experience were not going to be visible to anyone searching online.",
    approach:
      "We built him a professional, aesthetically polished website with a built in appointment booking flow, designed to make new patients feel comfortable enough to book their first visit at the new location. The goal was to turn 25 years of real experience into something a first time visitor could instantly sense and trust.",
    build:
      "A polished website with an integrated appointment booking flow and local SEO, so the new clinic location could actually be found and booked, not just visited.",
    outcome:
      "Within two months of launch, the new clinic went from 25 to 58 patients a day. Appointment calls rose 63%, the clinic started appearing in Google searches, and Dr. Shah had to hire more staff to keep up.",
    results: [
      { value: '25 to 58', label: 'Patients a day' },
      { value: '63%', label: 'More appointment calls' },
      { value: '2 months', label: 'From launch to result' },
    ],
    scope: ['Website Design', 'Appointment Booking System', 'Local SEO'],
    accent: '#0D9488',
    logoUrl: '/logos/sm/drmihirshah.webp',
    screenshotUrl: '/screenshots/drmihirshah.webp',
  },
  {
    id: 'astrabizz',
    clientName: 'Astrabizz Consultancy',
    url: 'https://www.astrabizz.com',
    domain: 'www.astrabizz.com',
    industry: 'Business & IT Consulting',
    business:
      "A business and IT consultancy working on ERP, CRM, and AI-driven digital transformation projects, pitching against established firms for enterprise clients.",
    challenge:
      "In consulting, trust is everything. Astrabizz needed a website that could hold its own in front of enterprise clients who are used to dealing with polished, established consulting firms.",
    approach:
      "We designed a site that clearly showcases Denish's expertise and the specific technologies he works with, positioning Astrabizz as a credible digital transformation partner rather than just another freelancer with a laptop. Every page was built to move a skeptical enterprise visitor toward booking a consultation.",
    build:
      "Dedicated service pages and a consultation-booking flow, structured to showcase real technical expertise rather than generic consulting-agency claims.",
    outcome:
      "Astrabizz now has a website that reflects the seriousness of the work they do, giving Denish a genuine edge when pitching to bigger companies evaluating multiple consulting partners.",
    scope: ['Website Design', 'Service Pages', 'Consultation Booking CTA'],
    accent: '#16A34A',
    logoUrl: '/logos/sm/astrabizz.webp',
    screenshotUrl: '/screenshots/astrabizz.webp',
  },
  {
    id: 'solway',
    clientName: 'SolWay Energies',
    url: 'https://www.solwayenergies.com',
    domain: 'www.solwayenergies.com',
    industry: 'Solar & B2B Energy',
    business:
      "A solar and B2B energy distributor working with corporate buyers who do their homework on suppliers before committing.",
    challenge:
      "They had no website to back up conversations happening in meetings and on calls. In B2B energy, buyers research suppliers before committing, and having nothing to find online was quietly costing them credibility.",
    approach:
      "We built a website designed to communicate scale and capability to corporate buyers, structured around the kind of proof a B2B buyer actually looks for before trusting a new supplier.",
    build:
      "A product and service showcase with direct lead capture, built to communicate scale and capability to corporate buyers evaluating a new supplier.",
    outcome:
      "SolWay Energies now has a digital presence that supports their sales conversations instead of undermining them, giving corporate buyers a reason to take the relationship seriously from the first search.",
    scope: ['Website Design', 'Product/Service Showcase', 'Lead Capture'],
    accent: '#D97706',
    logoUrl: '/logos/sm/solway.webp',
    screenshotUrl: '/screenshots/solway.webp',
  },
  {
    id: 'darshangalani',
    clientName: 'Darshan Galani & Co.',
    url: 'https://www.darshangalani.com',
    domain: 'www.darshangalani.com',
    industry: 'Chartered Accountancy',
    business:
      "A chartered accountancy practice that had never had a website, in a field where prospective clients often check online before ever picking up the phone.",
    challenge:
      "The absence of a website can quietly work against a CA firm, since it gives prospective clients no way to check credibility before reaching out.",
    approach:
      "We built the firm a clean, trust focused website from the ground up, structured to make it easy for prospective clients to understand their services and reach out with confidence.",
    build:
      "A clean, trust-focused website with a clear content structure and an SEO foundation, built from the ground up.",
    outcome:
      "The firm started receiving inbound enquiries through Google for the first time, and signed 34 new clients within three months of launch.",
    results: [
      { value: '34', label: 'New clients signed' },
      { value: '3 months', label: 'From launch to result' },
      { value: 'Organic', label: 'Enquiries from Google search' },
    ],
    scope: ['Website Design', 'Content Structure', 'SEO'],
    accent: '#7C3AED',
    logoUrl: '/logos/sm/darshangalani.webp',
    screenshotUrl: '/screenshots/darshangalani.webp',
  },
  {
    id: 'kdmayani',
    clientName: 'K.D. Mayani & Co.',
    url: 'https://www.kdmayaniandco.com',
    domain: 'www.kdmayaniandco.com',
    industry: 'Chartered Accountancy',
    business:
      "A growing chartered accountancy practice operating without a website, missing the chance to build authority before that first conversation.",
    challenge:
      "Missing the opportunity to build authority with prospective clients before that first conversation, at a stage where the practice was actively growing.",
    approach:
      "We built them a structured, professional presence designed around the specific things a CA firm needs to communicate: credibility, clarity, and ease of contact.",
    build:
      "A structured, professional website with local SEO and a direct enquiry form, built around what a CA firm needs to communicate: credibility, clarity, and ease of contact.",
    outcome:
      "K.D. Mayani & Co. now has an authority building website that gives the practice a stronger first impression with every new prospective client who finds them.",
    scope: ['Website Design', 'Local SEO', 'Enquiry Form'],
    accent: '#059669',
    logoUrl: '/logos/sm/kdmayani.webp',
    screenshotUrl: '/screenshots/kdmayani.webp',
  },
  {
    id: 'jaymehta',
    clientName: 'Jay Mehta & Co.',
    url: 'https://www.jaymehtaandco.com',
    domain: 'www.jaymehtaandco.com',
    industry: 'Chartered Accountancy',
    business:
      "A chartered accountancy practice with an existing website that was unprofessional and was not converting visitors into enquiries.",
    challenge:
      "An outdated site can actually work against a CA firm more than having no site at all, since it signals the opposite of what a prospective client wants to feel.",
    approach:
      "We revamped the entire website from the ground up, replacing the old design with a clean, trust focused layout built to convert. The goal was a site that finally matched how the firm actually operates day to day.",
    build:
      "A full website redesign with mobile optimization and a clearer enquiry form, replacing the old design with a clean, trust-focused layout built to convert.",
    outcome:
      "Jay Mehta & Co. now has a website that works beautifully on mobile, loads fast, and gives clients a much stronger reason to trust the practice than the old site ever did.",
    scope: ['Website Redesign', 'Mobile Optimization', 'Enquiry Form'],
    accent: '#0891B2',
    logoUrl: '/logos/sm/jaymehta.webp',
    screenshotUrl: '/screenshots/jaymehta.webp',
  },
  {
    id: 'mnp',
    clientName: 'MNP & Co.',
    url: 'https://www.mnpnco.com',
    domain: 'www.mnpnco.com',
    industry: 'Chartered Accountancy',
    business:
      "A growing accounting practice whose old website technically existed but barely brought in any enquiries.",
    challenge:
      "The old site was not doing the job a website is actually supposed to do for a growing accounting practice.",
    approach:
      "We rebuilt it from scratch with a cleaner layout and a much stronger structure, focused entirely on turning visitors into actual enquiries rather than just having a page online for the sake of it.",
    build:
      "A full rebuild with a cleaner layout, stronger structure, and conversion optimization, focused entirely on turning visitors into actual enquiries.",
    outcome:
      "Since the rebuild, the firm has noticed a real difference in how prospective clients respond after visiting the site, exactly the kind of result a website revamp should deliver.",
    scope: ['Website Redesign', 'Conversion Optimization', 'Enquiry Form'],
    accent: '#2563EB',
    logoUrl: '/logos/sm/mnp.webp',
    screenshotUrl: '/screenshots/mnp.webp',
  },
  {
    id: 'prabhakarprocessors',
    clientName: 'Prabhakar Processors',
    url: 'https://prabhakarprocessors.com',
    domain: 'prabhakarprocessors.com',
    industry: 'Textile Dyeing & Printing',
    business:
      "A dyeing and printing mill with real standing in the textile industry, previously represented online by a site that undersold that reputation.",
    challenge:
      "Their existing website looked unprofessional and did not reflect the scale or authority the business actually has in the market.",
    approach:
      "We rebuilt the website from the ground up with a modern, professional design, built specifically to position Prabhakar Processors as one of the leading names in dyeing and printing.",
    build:
      "A full website redesign with a custom admin panel, so the team can manage content independently without needing a developer for every update.",
    outcome:
      "The new site looks professional, modern, and aesthetic, establishing the trust and credibility that matches the authority Prabhakar Processors already has in the market.",
    scope: ['Website Redesign', 'Admin Panel', 'Content Management'],
    accent: '#78350F',
    logoUrl: '/logos/sm/prabhakarprocessors.webp',
    screenshotUrl: '/screenshots/prabhakarprocessors.webp',
  },
  {
    id: 'momrise',
    clientName: 'Momrise',
    url: 'https://momrise.vercel.app',
    domain: 'momrise.vercel.app',
    industry: 'Digital Product Sales Page',
    business:
      "Momrise is our own brand for busy mothers building an income from home. Its first product is The 2 Hour Work From Home Plan.",
    challenge:
      "A digital product has no salesperson. The page has to explain the plan, earn trust and take the order on its own, for a visitor who arrives cold from social media, usually on a phone.",
    approach:
      "We built one long sales page around a single promise: a flexible income in two focused hours a day. Each section answers the next question a busy mother would ask, and each one ends with the same clear action.",
    build:
      "A mobile-first, single-page sales site in the Momrise brand we created: navy, orange and peach, with a serif headline for warmth.",
    outcome:
      "Momrise has a sales page built to turn social media visitors into buyers without anyone on a call, and a brand system ready for the products that follow.",
    scope: ['Sales Page', 'Brand Identity', 'Conversion Copywriting'],
    accent: '#FF6321',
    screenshotUrl: '/screenshots/momrise.webp',
  },
  {
    id: 'tinyhumans',
    clientName: 'Tiny Humans, Big Feelings',
    url: 'https://tinyhumansbigfeelings.vercel.app',
    domain: 'tinyhumansbigfeelings.vercel.app',
    industry: 'Digital Product Sales Page',
    business:
      "A practical guide for parents of toddlers and preschoolers: 100 exact scripts for meltdowns and everyday battles. One of our own products.",
    challenge:
      "Tired parents do not want theory. The page had to show within seconds that this guide gives them the exact words to say, and make buying a one-tap decision.",
    approach:
      "We opened with the parent's own frustration, then let the product prove itself: sample scripts free on the page, reviews and a short FAQ, all before asking for the sale.",
    build:
      "A single-page sales site with free sample scripts, reviews, an FAQ and instant checkout for the PDF.",
    outcome:
      "A parent can try real scripts before buying and check out in one step, on a page written in the same calm voice as the guide.",
    scope: ['Sales Page', 'Conversion Copywriting', 'Checkout'],
    accent: '#E2674E',
    screenshotUrl: '/screenshots/tinyhumans.webp',
  },
];

/** Fast lookup by id, used by WorkDetail and the prerender script. */
export const CASE_STUDY_IDS = CASE_STUDIES.map((cs) => cs.id);

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.id === id);
}

/** The 5 strongest stories (the two with measured results, then the biggest
 *  businesses) get featured, larger cards with the full 5-part narrative visible on /work.
 *  The rest sit in a compact row so the section reads as "range of work." */
export const FEATURED_CASE_STUDY_IDS = ['drmihirshah', 'darshangalani', 'santoshtimbers', 'prabhakarprocessors', 'solway'];

/** Derives real, non-duplicate SEO metadata for a case study's dedicated page
 *  straight from its own already-written copy, rather than hand-writing (and
 *  risking drifting) a parallel title/description for each project. */
/** Keeps a description within what Google shows (about 155 characters): whole
 *  sentences where they fit, otherwise cut at a word. */
function shortDescription(text: string, limit = 155): string {
  if (text.length <= limit) return text;
  // Split only where a full stop is followed by a space and a capital letter, so
  // names like "Jay Mehta & Co. now has" stay in one piece.
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
  let out = '';
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > limit) break;
    out = next;
  }
  // Use whole sentences only when they fill most of the space.
  if (out.length >= 100) return out;
  const cut = text.slice(0, limit - 3);
  return `${cut.slice(0, cut.lastIndexOf(' '))}...`;
}

export function getCaseStudySEO(cs: CaseStudy): SEOConfig {
  // Google cuts titles off at about 60 characters, so long client names drop the suffix.
  const fullTitle = `${cs.clientName}: Website Case Study | Mago Labs`;
  const title = fullTitle.length <= 60 ? fullTitle : `${cs.clientName}: Website Case Study`;
  return {
    title,
    description: shortDescription(`${cs.industry} website case study. ${cs.outcome}`),
    ogTitle: `${cs.clientName} Case Study | Mago Labs`,
    ogDescription: cs.outcome,
    // Link previews get the JPEG: not every app that shows previews can read WebP.
    ogImage: cs.screenshotUrl ? `https://www.magolabs.in${cs.screenshotUrl.replace(/.webp$/, '.jpg')}` : undefined,
    ogType: 'article',
    twitterCard: 'summary_large_image',
  };
}
