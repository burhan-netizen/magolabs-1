import { PageId } from '../types';

export type IndustryId = 'industry-dentists' | 'industry-ca-firms' | 'industry-manufacturers';

export interface Industry {
  id: IndustryId;
  /** Short name used in links and menus. */
  label: string;
  eyebrow: string;
  /** Headline, split so the last part can carry the brand highlight. */
  headline: string;
  headlineMark: string;
  intro: string;
  problems: { title: string; desc: string }[];
  builds: string[];
  /** Case study ids from src/data/caseStudies.ts. The first one leads. */
  caseIds: string[];
  faqs: { question: string; answer: string }[];
}

const TIMELINE_ANSWER =
  'It depends on the package. A Launch website is live in 5 days, Growth in 14 days and Scale in 21 days.';

export const INDUSTRIES: Industry[] = [
  {
    id: 'industry-dentists',
    label: 'Dentists and clinics',
    eyebrow: 'Websites for dentists and clinics',
    headline: 'New patients look you up',
    headlineMark: 'before they book.',
    intro:
      'A clinic website has two jobs: show a new patient why they can trust you, and make booking easy. We design and build that from scratch.',
    problems: [
      { title: 'Your experience is invisible online.', desc: 'Years of practice mean little to a new patient if there is nothing to find when they search for you.' },
      { title: 'Booking takes too many steps.', desc: 'If a patient has to hunt for your number, they book with the clinic that made it easy.' },
      { title: 'Nearby patients find other clinics first.', desc: 'People search for a dentist near them. If you do not show up, you are not considered.' },
    ],
    builds: [
      'Appointment booking built into the site',
      'Click-to-call and WhatsApp on every page',
      'Treatment pages patients can understand',
      'Doctor profile, experience and qualifications',
      'Google Maps and local SEO setup',
      'Clinic gallery and patient reviews',
    ],
    caseIds: ['drmihirshah'],
    faqs: [
      { question: 'Can patients book appointments on the website?', answer: 'Yes. We build a booking flow into the site, along with click-to-call and WhatsApp, so a patient can reach you in one tap.' },
      { question: 'Will my clinic show up on Google Maps?', answer: 'We set up local SEO on the website, and we can set up and manage your Google Business Profile too. Nobody can honestly promise a specific position, but together they give you the best chance.' },
      { question: 'How long does a clinic website take?', answer: TIMELINE_ANSWER },
    ],
  },
  {
    id: 'industry-ca-firms',
    label: 'CA firms',
    eyebrow: 'Websites for chartered accountants',
    headline: 'Clients check your firm online',
    headlineMark: 'before they call.',
    intro:
      'Even a referred client looks you up first. We build clean, trust-focused websites that make it easy to understand your services and get in touch.',
    problems: [
      { title: 'No website means no way to check.', desc: 'A prospective client who cannot find your firm online has nothing to confirm you are the right choice.' },
      { title: 'An outdated site works against you.', desc: 'It signals the opposite of what a client wants from the firm handling their accounts.' },
      { title: 'Enquiries only come through referrals.', desc: 'People searching Google for a CA in your area never find out you exist.' },
    ],
    builds: [
      'A clear page for each area of practice',
      'Partner profiles and credentials',
      'Enquiry form and click-to-call',
      'Content structure that is easy to scan',
      'SEO foundation and local search setup',
      'Fast, mobile-first pages',
    ],
    caseIds: ['darshangalani', 'kdmayani', 'jaymehta', 'mnp'],
    faqs: [
      { question: 'Our firm has never had a website. Where do we start?', answer: 'Ask for a free website plan. Darshan Galani & Co. started with no website at all, and signed 34 new clients within three months of launch.' },
      { question: 'We already have a website. Can you rebuild it?', answer: 'Yes. Two of the CA firms we work with came to us with an existing website that was not bringing enquiries, and we rebuilt both from scratch.' },
      { question: 'How long does a website for a CA firm take?', answer: TIMELINE_ANSWER },
    ],
  },
  {
    id: 'industry-manufacturers',
    label: 'Manufacturers and B2B suppliers',
    eyebrow: 'Websites for manufacturers and B2B suppliers',
    headline: 'Buyers research suppliers',
    headlineMark: 'before they commit.',
    intro:
      'A serious buyer checks you out online before the first call. We build websites that show the real scale of your business and turn that research into enquiries.',
    problems: [
      { title: 'Nothing to find during due diligence.', desc: 'A buyer who searches for you and finds nothing has no way to confirm you are an established company.' },
      { title: 'A dated website undersells you.', desc: 'It does not reflect the scale or standing your business actually has in the market.' },
      { title: 'Sales conversations have no backup.', desc: 'After a meeting or a call, there is nothing online to support what your team said.' },
    ],
    builds: [
      'Full product or service catalogue',
      'Enquiry forms that reach you directly',
      'Company profile, capacity and credentials',
      'Admin panel so your team can update content',
      'SEO foundation so buyers can find you',
      'Fast, mobile-first pages',
    ],
    caseIds: ['prabhakarprocessors', 'santoshtimbers', 'solway'],
    faqs: [
      { question: 'Can the website show our full product range?', answer: 'Yes. For Santosh Timbers we built a full product catalogue with a direct enquiry form.' },
      { question: 'Can our team update the website without a developer?', answer: 'Yes. For Prabhakar Processors we built a custom admin panel, so their team manages content on their own.' },
      { question: 'How long does a website like this take?', answer: TIMELINE_ANSWER },
    ],
  },
];

export const INDUSTRY_IDS = INDUSTRIES.map((industry) => industry.id) as PageId[];

export function getIndustry(id: PageId): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.id === id);
}
