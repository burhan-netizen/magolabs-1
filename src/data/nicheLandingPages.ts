import { NicheConfig } from '../pages/NicheLandingPage';

/**
 * Content for the 6 niche/local landing pages (brief section 17). Each PageId here is
 * spelled to exactly match its URL slug (e.g. 'website-design-surat' -> /website-design-surat)
 * because src/components/SEO.tsx derives the PageId straight from the path string for any
 * page not under /services/ - see its normalizedPath logic before changing these ids.
 *
 * /website-design-surat and /website-development-surat, and separately /seo-agency-surat
 * vs the existing /services/seo page, are deliberately differentiated (design/brand vs.
 * technical build; hyper-local Maps-and-search vs. the broader SEO service) rather than
 * merged, to avoid reading as near-duplicate doorway pages to search engines.
 */
export const NICHE_PAGES: Record<string, NicheConfig> = {
  'website-design-surat': {
    id: 'website-design-surat',
    path: '/website-design-surat',
    eyebrow: 'Website Design · Surat',
    h1: 'Website Design in Surat, Built to Look Like You Belong',
    intro: 'If you’re comparing website designers in Surat, the real question isn’t who’s cheapest, it’s whose design actually makes your business look as established as it really is.',
    problemsHeadline: 'Most Surat business websites make the same mistakes.',
    problems: [
      { icon: 'Eye', title: 'Your Website Looks Like a Template', desc: 'Visitors can tell when a site is a recolored theme, and it quietly undercuts how serious your business looks.' },
      { icon: 'ShieldAlert', title: 'Your Brand Doesn’t Come Through', desc: 'Your logo and colors get dropped onto a generic layout instead of a design actually built around your business.' },
      { icon: 'Smartphone', title: 'It Looks Fine on Desktop, Rough on Mobile', desc: 'Most of your customers are checking you out on their phone, exactly where template sites fall apart.' },
      { icon: 'TrendingDown', title: 'It Doesn’t Match How Established You Are', desc: 'A well-run, years-old Surat business with a dated website is telling new customers the wrong story.' },
    ],
    contextParagraphs: [
      'Surat’s business community runs on relationships and reputation, but more of that first impression happens online than it used to. A buyer checking out a textile trader, a manufacturer, or a consultant will look them up before ever calling, and what they find shapes whether they call at all.',
      'Design freelancers and volume agencies in Surat mostly work from templates because it’s faster to sell. That’s fine for a business that just needs a website online. It’s a real problem for a business that needs to look like the established, credible operation it actually is.',
    ],
    solutionHeadline: 'What a Mago Labs design actually involves',
    solutionPoints: [
      'Every design starts from a blank canvas, built around your actual brand, audience, and industry, not a theme with your logo dropped in.',
      'Typography, color, and layout decisions made for how your specific buyers make decisions, not generic “clean and modern” defaults.',
      'Designed mobile-first, since that’s where most first impressions actually happen now.',
    ],
    portfolioIds: ['santoshtimbers', 'drmihirshah', 'astrabizz'],
    faqs: [
      { question: 'Do you only design for businesses based in Surat?', answer: 'No, but Mago Labs is based in Surat, so if you’re local, you get the option of an in-person conversation, not just calls and messages.' },
      { question: 'Can you redesign my existing website instead of starting a new one?', answer: 'Yes. A redesign keeps your existing domain and whatever’s already working, and rebuilds the parts that aren’t.' },
      { question: 'What if I don’t have a logo or brand colors yet?', answer: 'We can work with what you have, or point you toward getting a basic brand identity sorted first, since a good design needs somewhere to start from.' },
      { question: 'How is this different from hiring a freelance designer?', answer: 'A freelancer usually hands you design files and disappears. You get founder-direct involvement from strategy through launch, plus the technical build, not just a mockup.' },
    ],
  },

  'website-development-surat': {
    id: 'website-development-surat',
    path: '/website-development-surat',
    eyebrow: 'Website Development · Surat',
    h1: 'Website Development in Surat: Hand-Coded, Not Templated',
    intro: 'If your business already has a design direction and now needs someone to actually build it properly, this is that.',
    problemsHeadline: 'Template platforms create problems that show up later.',
    problems: [
      { icon: 'Wrench', title: 'Constant Plugin Updates', desc: 'A WordPress site needs its plugins and theme updated regularly just to stay secure and working.' },
      { icon: 'TrendingDown', title: 'Slow, and You Don’t Know Why', desc: 'Bloated themes and stacked plugins quietly drag down load times without any single obvious cause.' },
      { icon: 'ShieldAlert', title: 'You’re a Common Hack Target', desc: 'Widely-used CMS platforms are the most frequently targeted software on the web, simply because of how common they are.' },
      { icon: 'PackageSearch', title: 'Every Small Change Needs a Developer', desc: 'A clunky page-builder setup can make even simple text edits feel like a support ticket.' },
    ],
    contextParagraphs: [
      'Surat’s growing manufacturing, trading, and professional-services businesses increasingly need websites that can handle real functionality, product catalogs, booking flows, enquiry forms, without falling over under normal traffic.',
      'Page builders and template platforms add convenience at the cost of speed, security surface area, and long-term maintenance overhead. For a business that plans to keep growing its website over time, that overhead compounds.',
    ],
    solutionHeadline: 'What a Mago Labs build actually involves',
    solutionPoints: [
      'Every site is hand-coded in modern, production-grade frontend technology (React/TypeScript), not assembled from plugins.',
      'No WordPress, no Shopify, no page-builder bloat, just clean code that loads fast and doesn’t need constant patching.',
      'The same technical foundations, fast load times, secure code, mobile-first, regardless of how simple or complex your requirements are.',
    ],
    portfolioIds: ['santoshtimbers', 'drmihirshah', 'prabhakarprocessors'],
    faqs: [
      { question: 'Do you build on WordPress or Shopify?', answer: 'No. We hand-code every website in modern, custom frontend technology rather than building on WordPress or Shopify, because template platforms come with plugin bloat, slower load times, and less control over how the site actually converts.' },
      { question: 'Can you migrate my existing WordPress site to custom code?', answer: 'Yes. We can rebuild your existing site’s content and structure as a custom-coded site, keeping what’s working and fixing what isn’t.' },
      { question: 'How do I make content changes after launch if there’s no WordPress admin?', answer: 'We build lightweight, easy-to-use content management directly into the site, so routine updates don’t require a full CMS or a developer.' },
      { question: 'Is a custom-coded site actually faster than WordPress?', answer: 'Custom code has no unnecessary plugins or theme bloat to load, so it’s built to be faster by default. We don’t publish a blanket performance number since it depends on your specific content and images, but speed is a first-class concern in every build.' },
    ],
  },

  'seo-agency-surat': {
    id: 'seo-agency-surat',
    path: '/seo-agency-surat',
    eyebrow: 'Local SEO · Surat',
    h1: 'SEO for Surat Businesses That Actually Want the Phone to Ring',
    intro: 'If someone in Surat searches for what you do right now, are you the business that shows up, or is it a competitor?',
    problemsHeadline: 'Local visibility problems that cost you real customers.',
    problems: [
      { icon: 'MapPin', title: 'You’re Invisible on “Near Me” Searches', desc: 'Nearby customers searching for exactly what you offer are finding someone else instead.' },
      { icon: 'ShieldAlert', title: 'Your Google Business Profile Is Incomplete', desc: 'Missing categories, inconsistent details, or a thin profile quietly hurts your local ranking.' },
      { icon: 'TrendingDown', title: 'Competitors Outrank You for Your Own Searches', desc: 'The exact terms your customers use to find businesses like yours are going to someone else.' },
      { icon: 'SearchX', title: 'You Don’t Know What’s Actually Working', desc: 'Without tracking, it’s guesswork which searches bring you real enquiries.' },
    ],
    contextParagraphs: [
      'Surat has dense competition within specific trades, textiles, diamonds, professional services, healthcare, often clustered in the same commercial areas. For a locally-searched business, ranking in the Google Maps 3-pack and local search results often matters more than generic national keyword rankings.',
      'Local SEO is a narrower, more specific discipline than general SEO: it’s about how your business shows up for the searches people make right before they’re ready to call, not just how well your pages rank for broad industry terms.',
    ],
    solutionHeadline: 'What this actually covers',
    solutionPoints: [
      'Google Business Profile optimization, NAP (name/address/phone) consistency, and local keyword targeting, not just generic on-page tweaks.',
      'Built alongside your actual website, since site speed and structure feed directly into how Google ranks you locally.',
      'Focused on buyer-intent local searches, the ones people make right before they call, not vanity traffic.',
    ],
    portfolioIds: ['drmihirshah', 'darshangalani', 'kdmayani'],
    crossLink: {
      before: 'This page is about the local, Maps-and-search side of SEO specifically. For the fuller technical and on-page picture, see our',
      text: 'SEO service page',
      after: '.',
      page: 'service-seo',
    },
    faqs: [
      { question: 'How is this different from your regular SEO service?', answer: 'Our core SEO service covers the full technical and on-page picture. This page is about the specific, local side of it, Google Maps, local search, and the searches people make right when they’re nearby and ready to call.' },
      { question: 'Do I need a new website for this, or can you optimize my existing one?', answer: 'We can work with your existing website. A faster, better-structured site helps local SEO too, but it isn’t a requirement to start.' },
      { question: 'How long before I see results?', answer: 'Technical adjustments and Google Business Profile improvements can bring local visibility gains in 4 to 6 weeks. Ranking for more competitive local keywords generally takes 3 to 6 months of consistent work.' },
      { question: 'Do you manage my Google Business Profile too?', answer: 'Yes, see our Google Business Profile service for the full detail on that side of local visibility.' },
    ],
  },

  'website-design-for-manufacturers': {
    id: 'website-design-for-manufacturers',
    path: '/website-design-for-manufacturers',
    eyebrow: 'Website Design · Manufacturers & Traders',
    h1: 'Websites for Manufacturers, Built for Buyers Doing Due Diligence',
    intro: 'Help buyers, distributors, and procurement teams understand your capabilities before they ever contact you.',
    problemsHeadline: 'How manufacturers quietly lose serious buyers online.',
    problems: [
      { icon: 'SearchX', title: 'A Serious Buyer Finds Nothing', desc: 'A buyer doing due diligence searches for you and finds no website at all, or one that says almost nothing.' },
      { icon: 'PackageSearch', title: 'Your Catalog Lives in PDFs and WhatsApp Photos', desc: 'What you actually make and supply isn’t presented anywhere a buyer can properly evaluate it.' },
      { icon: 'Building2', title: 'Buyers Can’t Tell Your Scale', desc: 'Your production capacity, certifications, and real scale don’t come through from what’s online.' },
      { icon: 'ShieldAlert', title: 'Procurement Teams Need to Vet You First', desc: 'Larger buyers often won’t take a call until they’ve checked you out online, and there’s nothing to check.' },
    ],
    contextParagraphs: [
      'In manufacturing and trading, timber, textiles, industrial processing, most sales still happen through relationships and referrals. But even a referred buyer now checks a company online before committing, especially for larger orders.',
      'No website, or a thin one, quietly raises doubt about legitimacy and scale exactly when a new buyer is deciding whether you’re worth the risk. Santosh Timbers, one of India’s largest timber importers, had no website at all before working with us, despite the actual scale of the business.',
    ],
    solutionHeadline: 'What this actually involves',
    solutionPoints: [
      'A product and capability catalog structured for how buyers actually evaluate suppliers, not just a photo gallery.',
      'Built around the trust signals procurement teams look for: scale, capacity, and process, not fluff.',
      'Direct enquiry paths for the way B2B buyers actually reach out, form, WhatsApp, or a direct call.',
    ],
    portfolioIds: ['santoshtimbers', 'prabhakarprocessors', 'solway'],
    faqs: [
      { question: 'Do you work with manufacturers?', answer: 'Yes. A meaningful part of our portfolio is manufacturers, timber and textile traders, and B2B suppliers, businesses where a buyer needs to trust you before they’ll ever call.' },
      { question: 'Can you build a product catalog into the site?', answer: 'Yes, structured however makes sense for your actual product range, from a straightforward showcase to a fuller catalog with categories and specifications.' },
      { question: 'We don’t have professional product photos yet, is that a problem?', answer: 'It helps to have some, but we can work with what you have and advise on what’s worth photographing first.' },
      { question: 'Our buyers are mostly older and less online, is a website still worth it?', answer: 'Even buyers who don’t search much themselves are often checked by someone on their team before a deal closes, so it still matters.' },
    ],
  },

  'ca-firm-website-design': {
    id: 'ca-firm-website-design',
    path: '/ca-firm-website-design',
    eyebrow: 'Website Design · CA & Accounting Firms',
    h1: 'Websites for CA Firms, Built to Earn a Prospective Client’s Trust',
    intro: 'Present your expertise, people, and services with the credibility your clients expect.',
    problemsHeadline: 'How a CA firm’s website quietly works against it.',
    problems: [
      { icon: 'SearchX', title: 'A Prospective Client Finds Nothing', desc: 'Someone comparing firms searches for you and finds no website, or one that says very little.' },
      { icon: 'TrendingDown', title: 'An Outdated Site Undercuts Real Credibility', desc: 'A dated website reads as a red flag, regardless of how good the actual practice is.' },
      { icon: 'Eye', title: 'Visitors Can’t Tell What You Actually Offer', desc: 'Services, specializations, and who to contact for what aren’t clearly laid out.' },
      { icon: 'ShieldAlert', title: 'There’s No Easy Way to Reach Out', desc: 'A hesitant first-time visitor has no simple, low-pressure way to make first contact.' },
    ],
    contextParagraphs: [
      'For a CA or accounting firm, trust is the entire product before the first meeting. A prospective client comparing firms online will judge credibility fast, and an absent or dated website reads as a warning sign, regardless of how good the actual practice is.',
      'This is one of the most direct cases where a website is quietly doing, or undoing, the sales job before a human is ever involved. We’ve built for four different CA and accounting firms, and the pattern is consistent: the firms are strong, the old websites (or lack of one) simply weren’t representing that.',
    ],
    solutionHeadline: 'What this actually involves',
    solutionPoints: [
      'A clear service and credibility structure, who you are, what you do, why a client should trust you, presented the way a professional-services buyer actually evaluates a firm.',
      'Simple, direct enquiry paths so a hesitant first-time visitor can reach out without friction.',
      'The same founder-direct build process applied to your firm’s own website that you’d expect your firm to apply to a client’s books.',
    ],
    portfolioIds: ['darshangalani', 'kdmayani', 'jaymehta', 'mnp'],
    faqs: [
      { question: 'Do you have experience with CA firms specifically?', answer: 'Yes, genuinely, not as a talking point. Darshan Galani & Co., K.D. Mayani & Co., Jay Mehta & Co., and MNP & Co. are all real client websites we’ve built. See the case studies below.' },
      { question: 'Can you present multiple partners or team members professionally?', answer: 'Yes, structured however makes sense for your firm, individual partner profiles, a team page, or however your practice is actually organized.' },
      { question: 'Do you handle ongoing updates, like changing partner details or services?', answer: 'Yes. We offer flexible post-launch support and maintenance, whether that’s rapid content edits or new features, a direct WhatsApp message away.' },
      { question: 'Will this help us get found by people searching for a CA in our area?', answer: 'Yes, that’s a big part of why it matters. See our local SEO and Google Business Profile pages for how we handle the search visibility side specifically.' },
    ],
  },

  'professional-services-websites': {
    id: 'professional-services-websites',
    path: '/professional-services-websites',
    eyebrow: 'Website Design · Professional Services',
    h1: 'Websites for Professional Services Firms, Built on Credibility',
    intro: 'Present your expertise, people, and services with the credibility your clients expect.',
    problemsHeadline: 'How professional-services firms lose the trust they’ve actually earned.',
    problems: [
      { icon: 'Eye', title: 'Your Website Doesn’t Reflect Your Expertise', desc: 'Clients are buying trust in your judgment, and a generic site undersells exactly that.' },
      { icon: 'SearchX', title: 'Your Services and Process Aren’t Clear', desc: 'A visitor can’t easily tell what you actually do or how working with you would go.' },
      { icon: 'Users', title: 'Your Team’s Expertise Isn’t Presented Well', desc: 'The people and experience behind the firm aren’t shown the way clients actually evaluate them.' },
      { icon: 'TrendingDown', title: 'A Dated Site Undercuts a Strong Practice', desc: 'A genuinely capable firm can still look outdated or generic online, and that costs new business.' },
    ],
    contextParagraphs: [
      'Consulting, advisory, and other professional-services businesses sell expertise and judgment, not a physical product, so the sales process runs almost entirely on credibility signals collected before the first real conversation.',
      'As Astrabizz’s founder put it when we built their site: “in consulting, trust is everything.” That’s true well beyond consulting, for any firm where clients are hiring your judgment, not a product off a shelf.',
    ],
    solutionHeadline: 'What this actually involves',
    solutionPoints: [
      'Positioning built around your actual expertise and the specific outcomes you deliver, not generic consulting-agency claims.',
      'A clear structure for services, process, and how to get in touch, built to move a skeptical visitor toward a real conversation.',
      'If you’re specifically a CA or accounting firm, our dedicated CA firm page covers that in more depth.',
    ],
    portfolioIds: ['astrabizz', 'mnp'],
    crossLink: {
      before: 'Running a CA or accounting practice specifically? See our',
      text: 'CA firm website design page',
      after: 'for examples closer to your field.',
      page: 'ca-firm-website-design',
    },
    faqs: [
      { question: 'What counts as a “professional services” business for you?', answer: 'Consultants, advisors, agencies, accountants, and similar expertise-led businesses where clients are hiring judgment and experience, not a physical product.' },
      { question: 'Do you have experience with consulting firms?', answer: 'Yes. Astrabizz, a business and IT consultancy, is a real example, built specifically to hold its own in front of enterprise clients evaluating multiple consulting partners.' },
      { question: 'How do you handle presenting a team, not just a single founder?', answer: 'We can showcase multiple people and bios however makes sense for your firm’s structure.' },
      { question: 'We’re not big enough for case studies like this yet, is a website still worth it?', answer: 'Yes, if anything it matters more for a newer or smaller firm trying to establish trust quickly, since you don’t yet have years of reputation doing that work for you.' },
    ],
  },
};
