# Changes: October 2026 update

What changed in this version, and what still needs your attention.

## 1. Pages now ship with their content in the HTML

Before, every page was an empty shell that JavaScript filled in. Now `npm run build`
writes one complete HTML file per route (22 files), with the full page content,
structured data and working links already inside.

- `src/entry-server.tsx` renders a page to HTML at build time.
- `scripts/prerender-seo.ts` writes that HTML into each route's file.
- `src/main.tsx` attaches React to the existing markup instead of rebuilding it.
- `package.json` build script now runs a second (server) Vite build before prerendering.
- Structured data (business, services, FAQ, breadcrumbs) is rendered as markup, not injected by script.
- FAQ answers stay in the page (collapsed with CSS) so search engines can read them.
- Navigation, footer, breadcrumbs, sitemap page and case study cards are real `<a href>` links
  (`src/components/PageLink.tsx`). Before, there was not a single internal link a crawler could follow.

Nothing changes in how you deploy: Vercel still runs `npm run build` and serves `dist/`.

## 2. Case study results

- Dr. Mihir Shah Smile Care Clinic: 25 to 58 patients a day, 63% more appointment calls, within 2 months.
- Darshan Galani & Co.: 34 new clients within 3 months, from enquiries through Google.

These appear on the homepage, the Work page and each case study page. Edit them in
`src/data/caseStudies.ts` (the `results` and `outcome` fields) and `src/pages/Home.tsx`
(`RESULTS` and `FEATURED_WORK`).

## 3. No more loader delay

The full-screen loader and its built-in 850 ms wait are gone. Page code is downloaded
quietly in the background, so moving between pages takes roughly a quarter of a second.

## 4. Brand colours and fonts

- Poppins throughout, JetBrains Mono for labels, both bundled with the site (no Google Fonts request).
- Ink and paper base, Signal Amber `#FFC53D` as the single accent. All blue has been removed.
- Tokens live at the top of `src/index.css`: `brand`, `brand-deep`, `brand-soft`, `ink`, `paper`.
- New helper classes: `.eyebrow` (mono label with amber square) and `.marker` (amber highlight).

Bug fixed along the way: the old font setting referred to itself, which browsers treat
as invalid, so the live site was showing the visitor's system font, not Inter.

## 5. Copy

Rewritten in a shorter, more direct style, with repeated points removed: Home, About,
Services, all four service pages, Work, Contact, the footer, the contact banner and the
scope planner. "Hand-coded" and "human-written" are kept, as requested.

The homepage order is now: hero, results, client logos and quotes, the problem, services,
featured work, a "Mago Labs vs the usual agency" comparison, a founder note, process,
health check, FAQ.

## 6. Customer focus and a shorter path to enquiry

The homepage now tells one story in the customer's order: their problem, how we fix it,
what happened for others, their next step.

**One offer everywhere.** Every main button now says "Get a free website audit" and leads
to the same short form. WhatsApp is the second option throughout.

**One short form** (`src/components/LeadForm.tsx`): name and phone are required, website
and a note are optional. It sits on the homepage and is the whole Contact page.
The old form needed name, phone, email and a message, and sat below a five-step planner.
`api/contact.ts` accepts the shorter form and now cleans what visitors type before it
goes into your alert email.

**Removed from pages** (the files are still in `src/components`, unused, if you want them back):

- The simulated "speed audit" phone demo in the hero. Replaced by a real client site with its result.
- The animated particle background and cursor glow in the hero.
- The seven-step process and the founder section on the homepage. The founder story is on About.
- The health check quiz on the homepage. It is still on the Services page.
- The five-step scope planner on the Contact page.
- The mock-up playground and the live-site preview pop-up on the Work page.
- "Home" and "Why Mago" in the menu. The logo goes home.
- The third button in the dark contact banner. The phone number is now a text link.

Work cards now show the problem and what changed. The full story is on each case study page.

Also: the film-grain overlay no longer animates, and the mouse-tracking code only runs in
the internal `?demo=true` mode.

## 7. A path for businesses with no website

- The form has two starting points: "I have a website" (free audit) and "I don't have one
  yet" (free website plan). The second asks what the business does, not for a web address.
- Homepage: a "No website yet? Start here" link in the hero, and an amber section after the
  problem section with the Darshan Galani result (no website, then 34 new clients). Both
  switch the form to the second option and scroll to it.
- Contact page: the headline and bullet points change with the option chosen.
  `/contact?start=new` opens it on the no-website option, for use in ads, posts and messages.
- The dark contact banner on every page has a "No website yet? Get a free website plan" link.
- A new FAQ answers "I don't have a website yet. Where do I start?"
- Your alert email shows which option the person chose in the "Interested In" row.

## 8. Design ideas from the reference components

Used sparingly, one of each, all on the homepage:

- **Trust hero.** The hero is now dark with glass cards, after the "glassmorphism trust hero"
  reference: headline and buttons on the left; on the right a real client site with its
  result, a three-fact card, and the client logos in a glass strip. The reference's stock
  photo, invented stats and placeholder brands were not used.
- **Interactive 3D.** The client site card in the hero tilts gently toward the mouse
  (`src/components/TiltCard.tsx`). Mouse only, a few degrees at most.
- **Hero parallax.** On scroll, the hero cards drift up slightly and the amber glow drifts down.
- **Interactive selector.** "How we fix it" is now a selector: four outcomes on the left, the
  detail and buttons on the right. All four descriptions remain in the page HTML.
- **Scroll animation.** The three results count up when they scroll into view
  (`src/components/CountUp.tsx`). The real figures are what is written into the HTML.

Visitors whose device is set to reduce motion get none of these movements. The menu bar now
has a solid background so it sits cleanly above the dark hero, and the problem section
switched to a light background so dark sections do not stack.

## Please check

1. **Timelines disagree.** The FAQ says 3 to 5 weeks. The scope planner on the Contact page
   offers 3, 5 and 7 day options. I left both as they were. Pick one and make them match.
2. **Hindi and Gujarati.** Removed. The site is English only (see section 10).
3. **Social sharing images are missing.** The pages point to `og-image-home.jpg`,
   `og-image-about.jpg` and others, and to `default-og.jpg`, but none of these files are in
   `public/`. Links shared on WhatsApp or LinkedIn will show no preview image until you add them.
4. **Homepage schema said Ahmedabad.** The business address in the homepage structured data
   was Ahmedabad 380001. I changed it to Surat.
5. **Client permission.** The two results name the clients. Make sure both are happy with that.
6. **Blog posts.** Insights posts still load in the browser from Contentful, so their text is
   not yet in the HTML. Titles and descriptions are.
7. **"Hand-coded" and "human-written".** Kept for now at your request.
8. **The free audit and the free website plan.** The site now promises both, each with a
   reply within one business day. Make sure that is an offer you want to stand behind for every enquiry.
9. **Test the form on the live site** after deploying. Send yourself one enquiry from the
   homepage and one from the Contact page, and confirm both emails arrive.

## Not changed

- Page titles and meta descriptions (the homepage and the web design page still share a title).
- The contact form backend (`api/contact.ts`), apart from the email's colours.
- Privacy and Terms pages.

## 9. Pricing page (new)

- New page at `/pricing` (`src/pages/Pricing.tsx`): Launch from ₹17,999, Growth from ₹29,999 (marked most popular), Scale from ₹49,999, Commerce from ₹64,999, then a side by side table, "In every package", the "Something else?" block and five pricing questions.
- Added to the navbar, footer, HTML sitemap, `sitemap.xml`, page titles (`src/utils/seo.ts`) and the prerender.
- Each "Get a quote" button opens the contact form with the package already written in the message (`/contact?package=Growth`). Each card also has a WhatsApp link with the package named.
- Homepage FAQ "How much does a custom website cost?" now gives the starting prices. The chat assistant prompt in `server.ts` does too.

Please check:
- Launch says "Post-launch support" with no duration. Add the number of days if there is one.
- The five pricing questions are my wording, especially "domain and hosting are billed at cost" and "you can add pages later".
- No timelines are shown on the pricing page.

## 10. English only

- Removed Hindi and Gujarati everywhere: the language switcher (desktop and mobile menu), both translation sets, the translated homepage headline, the floating button labels and the "Let's talk" pill above the closing call to action.
- The chat assistant prompt in `server.ts` now answers in English.

## 11. Websites are the main service

- New quiet section "Alongside your website" (`src/components/AddOnServices.tsx`): SEO, Google Business Profile, Copywriting, Branding and Website care. No prices. One "Let's talk pricing" button that opens the contact form with the message started, plus a WhatsApp link. Shown on the Pricing page and the Services page.
- Services page rebuilt: one large card for websites with the four packages and their starting prices, then the quiet section.
- Menu: "Websites" is marked as the main service; SEO, Google Business Profile and Copywriting sit under an "Alongside your website" label. Footer column follows the same order.
- Branding and Website care have no page of their own. The SEO, Google Business Profile and Copywriting pages are unchanged.
- The homepage "How we fix it" selector still shows four tabs with the website first. Not changed.

## 12. Timelines, support, titles

- Timelines: Launch 5 days, Growth 14, Scale 21, Commerce 28. Shown on the pricing cards, the comparison table, the Services page and in the FAQs. The old "3 to 5 weeks" wording is gone.
- Launch now has 90-day post-launch support.
- The web design page title is now "Custom Website Design & Development Services | Mago Labs", so it no longer matches the homepage title.

## 13. Prices in US dollars outside India

- Prices live in one file: `src/data/packages.ts` (rupees and dollars side by side).
- Visitors whose device is set to Indian time see rupees. Everyone else sees dollars: Launch $599, Growth $1,149, Scale $1,899, Commerce $2,499. There is no switch.
- The dollar prices are not in the page HTML, so Google indexes the rupee prices only.
- Enquiries from overseas visitors are marked "outside India, saw USD prices" in the "Sent From" row of the alert email.
- Limit: this goes by the device's time zone. A visitor in India with a foreign time zone set sees dollars, and the reverse.

## 14. Industry pages

- `/industries/dentists`, `/industries/ca-firms`, `/industries/manufacturers`. Content is in `src/data/industries.ts`; every claim comes from the existing case studies.
- Linked from the footer, the Work page ("By industry") and both sitemaps.

## 15. Blog posts are part of the page

- At build time the Insights list and every post are fetched from Contentful and written into the HTML, text included. Posts published after the last build still load in the browser.
- Needs `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ACCESS_TOKEN` set in Vercel's build settings. To make new posts appear in the HTML straight away, add a Vercel deploy hook as a Contentful webhook, so publishing a post rebuilds the site.
- Post cards are now real links.

## 16. Sharing images, form, clean-up

- Added the 16 social sharing images in `public/` (one per main page).
- Contact form: if the alert email cannot be sent (missing or rejected Resend key), the form now tells the visitor to use WhatsApp or call, instead of saying "sent" while the enquiry is lost. The email also shows which page the enquiry came from.
- Removed four unused components: ScopePlanner, InteractiveShowcase, InteractiveParticleMesh, LiveMockupPlayground.
- Privacy page corrected: it said the site may use analytics. It now states what the site really does (no cookies, no trackers) and lists exactly what the form collects.

## 17. Search result copy

- Every page title is now 60 characters or fewer and every description 160 or fewer, so Google does not cut them off. Rewrote the home, about, services, web design, Google Business Profile, work, contact, sitemap and industry descriptions to lead with what the customer gets and a real result.
- Case study titles shortened ("Client: Website Case Study | Mago Labs"), and their descriptions trimmed to whole sentences.
- Site-wide business schema now lists the founder, LinkedIn and India as an area served.

## 18. New hero showcase

- The single screenshot with the amber caption is replaced by a 3D stack of five real client websites (`src/components/HeroShowcase.tsx`). The front one is in focus, the others recede behind it, and the result line underneath changes with it. It advances on its own, pauses on hover, and can be swiped, clicked, or moved with the dots or arrow keys. Visitors who ask for reduced motion get a still stack.
- Removed the unused TiltCard component.

## 19. Work page rebuilt, two projects added, motion across the site

**Work page**
- Dark hero with two rows of the client websites drifting behind the headline, and three numbers that count up.
- "Three stories worth reading": the featured case studies are large cards that pin and stack like a deck as you scroll (wide screens only; a normal list on phones).
- "Different industries. Same goal.": every other project in a grid with a filter. Cards lean toward the pointer, the screenshot zooms, and the grid re-flows when you filter.
- Code: `src/components/WorkShowcase.tsx`, `src/hooks/useScrollStack.ts`. The old ClientWorkGallery is removed.

**Two projects added** (`src/data/caseStudies.ts`): Momrise and Tiny Humans, Big Feelings, described as our own products. Each has a case study page. Their images in `public/screenshots/` are designed covers, not screenshots: replace `momrise.jpg` and `tinyhumans.jpg` (900 by 430) with real ones.

**Across the site** (`src/utils/ambient.ts`, end of `src/index.css`)
- Amber progress line along the top as you scroll.
- Primary buttons: a light sweep on hover, a press, and a ripple where you click.
- Section headings rise into place as they scroll into view.
- A soft amber light follows the pointer on the dark hero sections and the closing call to action, which also has a slow breathing glow.
- Footer: social icons lean toward the pointer; a giant outlined "Magolabs" rises in at the bottom.
- All of it is switched off for visitors who ask for reduced motion.
