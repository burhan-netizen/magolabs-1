import { PageId } from '../types';

export type IndustryId = 'industry-dentists' | 'industry-ca-firms' | 'industry-manufacturers' | 'industry-textile' | 'industry-consultants' | 'industry-digital-products';

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
  {
    id: 'industry-textile',
    label: 'Textile businesses',
    eyebrow: 'Websites for textile businesses',
    headline: 'Buyers check your mill online',
    headlineMark: 'before they place an order.',
    intro:
      'Surat runs on textiles, and buyers from across India and abroad now research a mill, processor or trader online before the first call. We build websites that show your range, your capacity and your standing in the market.',
    problems: [
      { title: 'Your reputation is offline only.', desc: 'Years of standing in the market mean little to a new buyer who searches for you and finds an old or empty website.' },
      { title: 'Buyers cannot see your range.', desc: 'Without clear pages for your fabrics, processes and capacity, a buyer has to call just to learn what you do, and many will not.' },
      { title: 'Updating the site needs a developer.', desc: 'When every new product or photo needs someone technical, the website stops matching the business within months.' },
    ],
    builds: [
      'Pages for each fabric, process or product range',
      'Capacity, machinery and certifications up front',
      'Enquiry forms and WhatsApp that reach your team directly',
      'Admin panel so your team can update products and photos',
      'SEO foundation so buyers searching for your products find you',
      'Fast, mobile-first pages for buyers on the move',
    ],
    caseIds: ['prabhakarprocessors'],
    faqs: [
      { question: 'Can our team update the website without a developer?', answer: 'Yes. For Prabhakar Processors, a Surat dyeing and printing mill, we built a custom admin panel so their team manages content on their own.' },
      { question: 'Can the website show our full range of fabrics and processes?', answer: 'Yes. We plan a clear page for each range or process, with photos and specifications, so a buyer understands what you do before they call.' },
      { question: 'Do you work with textile traders as well as mills?', answer: 'Yes. Mills, processors, manufacturers and traders all need the same thing from a website: to look as established online as they are in the market, and to make enquiries easy.' },
      { question: 'How long does a textile business website take?', answer: TIMELINE_ANSWER },
    ],
  },
  {
    id: 'industry-consultants',
    label: 'Consultants',
    eyebrow: 'Websites for consultants and professional services',
    headline: 'Clients judge your expertise',
    headlineMark: 'before the first meeting.',
    intro:
      'In consulting, trust is the product. We build websites that make your expertise easy to understand, put your credentials up front and move a careful visitor towards booking a consultation.',
    problems: [
      { title: 'You look smaller than you are.', desc: 'A thin or generic website makes an experienced consultant look like just another freelancer with a laptop.' },
      { title: 'Your services are hard to understand.', desc: 'If a visitor cannot tell what you do and who it is for within a few seconds, they move on to a firm that explains it better.' },
      { title: 'There is no clear next step.', desc: 'Without an obvious way to book a call, interested visitors leave and forget your name.' },
    ],
    builds: [
      'A clear page for each service you offer',
      'Founder profile, credentials and technologies',
      'Consultation booking flow and click-to-call',
      'Copy written for buyers who compare several firms',
      'SEO foundation and LinkedIn-ready link previews',
      'Fast, mobile-first pages',
    ],
    caseIds: ['astrabizz'],
    faqs: [
      { question: 'We are a small consultancy. Can our website compete with bigger firms?', answer: 'Yes. For Astrabizz Consultancy we built a site that positions a focused team as a credible digital transformation partner, so they can hold their own when pitching to bigger companies.' },
      { question: 'Will you write the content for our services?', answer: 'Yes. Conversion copywriting is part of what we do. We turn what you know into plain language a buyer understands quickly.' },
      { question: 'Can clients book a consultation on the website?', answer: 'Yes. We build a consultation booking flow, along with click-to-call and WhatsApp, so an interested visitor can reach you in one step.' },
      { question: 'How long does a consultant website take?', answer: TIMELINE_ANSWER },
    ],
  },
  {
    id: 'industry-digital-products',
    label: 'Coaches and digital products',
    eyebrow: 'Sales pages for coaches, courses and digital products',
    headline: 'A sales page has to sell',
    headlineMark: 'without anyone on a call.',
    intro:
      'Ebooks, guides, courses and coaching programmes are sold by the page alone. We write and build sales pages that explain the offer, earn trust and take the order, for visitors who arrive cold from social media on their phones.',
    problems: [
      { title: 'Visitors arrive cold.', desc: 'Someone tapping through from Instagram knows nothing about you. The page has to answer every question before they lose interest.' },
      { title: 'Generic copy does not convert.', desc: 'A page full of hype and vague promises reads like every other offer, and the visitor scrolls on.' },
      { title: 'Checkout loses buyers.', desc: 'Every extra step between "I want this" and "paid" costs you sales.' },
    ],
    builds: [
      'Long-form sales page written around one clear promise',
      'Free samples or previews that let the product prove itself',
      'Reviews, FAQ and guarantee where buyers look for them',
      'One-step checkout and instant delivery',
      'Brand identity if you are starting from scratch',
      'Mobile-first design for social media traffic',
    ],
    caseIds: ['momrise', 'tinyhumans'],
    faqs: [
      { question: 'Have you built sales pages for digital products before?', answer: 'Yes. Momrise and Tiny Humans, Big Feelings are our own digital product brands. We wrote, designed and built both sales pages, so we test what we recommend on our own products first.' },
      { question: 'Do you write the sales copy as well?', answer: 'Yes. On a sales page the words do most of the selling, so conversion copywriting is included, not an extra.' },
      { question: 'Can the page take payments and deliver the product?', answer: 'Yes. We set up checkout and instant delivery, so a buyer can pay and receive the product in one step.' },
      { question: 'How long does a sales page take?', answer: TIMELINE_ANSWER },
    ],
  },
];

export const INDUSTRY_IDS = INDUSTRIES.map((industry) => industry.id) as PageId[];

export function getIndustry(id: PageId): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.id === id);
}
