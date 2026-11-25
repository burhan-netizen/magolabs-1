---
title: "Google Search Console for a Small Business: How to Set It Up and What to Check"
slug: "google-search-console-setup-for-small-business"
excerpt: "Google Search Console is free and shows exactly how Google sees your website: which searches show it, which pages are indexed and what is broken. Here is how to set it up and the few reports a business owner should check."
author: "Burhan Kapasi"
publishedDate: "2026-11-25T22:00+05:30"
coverImage: "/images/insights/google-search-console-setup-for-small-business.webp"
---
**Google Search Console** is a free tool from Google that shows how your website performs in Google Search: which searches your pages appear for, how many people click, which pages Google has indexed, and what problems are stopping pages from showing up. Setting it up takes about 15 minutes. You add your website as a **Domain property**, prove you own it with a DNS record at your domain provider, submit your sitemap, and then check four reports once a month. If you only ever open one Google tool for your website, make it this one.

Most small business owners have never logged in to Search Console, even when their website was built years ago. That means they cannot answer simple questions like "Does Google even know my services page exists?" or "What do people search before they find us?" Here is how to fix that.

## What Search Console tells you (and what it does not)

| Search Console shows | Search Console does not show |
| --- | --- |
| The searches (queries) your site appeared for | What visitors did after landing on your site |
| Impressions, clicks, click rate and average position | Form submissions, calls or WhatsApp clicks |
| Which pages are indexed and why others are not | Your competitors' data |
| Mobile usability and Core Web Vitals problems | Paid ad performance (that is in Google Ads) |
| Manual actions and security issues on your site | Anything about your Google Business Profile listing |

For what happens after the click, you need Google Analytics or another analytics tool. The two work well together, and Google lets you [connect Search Console to Google Analytics](https://support.google.com/analytics/answer/10737381) so you can see search data next to visitor behaviour.

## Step 1: Choose the right property type

When you add a website, Search Console asks you to pick a property type. Google explains both on its [Add a property](https://support.google.com/webmasters/answer/34592) help page.

- **Domain property** (recommended): covers your whole domain in one place, including www and non-www versions, http and https, and every subdomain. It can only be verified with a DNS record.
- **URL-prefix property**: covers only addresses that start with the exact prefix you enter, such as https://www.yourbusiness.in. If your site also loads on another version, you need a separate property for it. It can be verified in several ways.

For almost every business, a Domain property is the better choice because you never miss data from a version of your site you forgot about.

## Step 2: Verify that you own the website

Google lists the methods on its [Verify your site ownership](https://support.google.com/webmasters/answer/9008080) page:

1. **DNS record (domain name provider)**: Search Console gives you a TXT record. You paste it into the DNS settings wherever your domain is managed (GoDaddy, Hostinger, BigRock, Cloudflare and so on). This is the only method for a Domain property.
2. **HTML file upload**: upload a small file Google gives you to your website.
3. **HTML tag**: add a meta tag to your homepage.
4. **Google Analytics or Google Tag Manager**: if either is already installed on your site with the right access, Search Console can use it.

Two things owners often get wrong:

- **Do not delete the record or file after verifying.** Google says that removing the DNS record or verification file can make you lose verification. Leave it in place permanently.
- **DNS changes can take time to show.** If verification fails straight away, wait a little and try again before assuming something is broken.

If someone else built your website, ask them to add **your own Google account** as a verified owner. The business should own its Search Console property, not the agency or the freelancer. We make the same point about domains and hosting in [Website hosting for a small business in India](/insights/website-hosting-for-small-business-india).

## Step 3: Submit your sitemap

A sitemap is a file that lists the pages on your website so Google can find them. Most website platforms create one automatically, usually at an address like yourbusiness.in/sitemap.xml.

In Search Console, open **Sitemaps**, paste the sitemap address and submit. Come back a few days later and check that the status says Success and that the number of discovered pages looks roughly right. If your site has 15 pages and the sitemap shows 3, or 300, something needs fixing.

Data does not appear instantly. Google says data should start showing in a new property within a few days.

## Step 4: The four reports to check every month

You do not need to understand every screen. These four cover what matters for most businesses.

### 1. Performance (Search results)

This is the most useful report. It shows **queries** (what people typed), **pages**, **countries** and **devices**, with clicks, impressions, click-through rate and average position for each.

Questions to ask:

- Are people finding you for the **services you actually sell**, or only for your business name?
- Which pages get many impressions but few clicks? Their titles and descriptions may need rewriting.
- Are there searches where you sit in positions 8 to 20? Those pages are close to page one and often worth improving first.

Search Console also has a **generative AI performance report** showing how your site appears in AI Overviews and AI Mode in Google Search. Google [rolled it out to all websites](https://support.google.com/webmasters/answer/16984139) by the end of August 2026, though it only shows data once your site has enough impressions in those features. We explain why this matters in [ChatGPT vs Google in 2026](/insights/chatgpt-vs-google-in-2026-how-businesses-get-found).

### 2. Pages (indexing)

This shows which pages Google has indexed and which it has not, with a reason for each. Some reasons are normal (a redirect, a duplicate version of a page). Others need action. Look especially for important service pages listed as "Crawled, currently not indexed" or "Discovered, currently not indexed", or pages blocked by a noindex tag that someone forgot to remove after launch.

### 3. URL Inspection

Paste any address from your site into the search bar at the top. It tells you whether that page is on Google, when it was last crawled and whether there are problems. After you publish a new page or fix an old one, you can click **Request indexing** to ask Google to look at it. This is a request, not a guarantee.

### 4. Experience and security

Check **Core Web Vitals** for slow or jumpy pages on mobile, **HTTPS** for pages not served securely, and **Manual actions** and **Security issues**. The last two should say no issues detected. If they do not, deal with them before anything else, because they can remove your pages from Google.

## Common problems Search Console reveals

- **The site was blocked from Google during development** and nobody removed the block at launch. The Pages report shows it immediately.
- **Old pages from a previous website** still showing errors because they were never redirected to the new pages.
- **Service pages that never got indexed** because nothing on the site linked to them.
- **Ranking only for your business name**, which usually means the site needs proper service and location pages. Our guide [Why is my website not getting traffic?](/insights/why-is-my-website-not-getting-traffic-10-reasons-and-how-to-fix-them) covers the usual causes.
- **Good impressions, poor clicks**, which points to weak page titles and descriptions rather than poor rankings.

## A 10-minute monthly routine

1. Open **Performance**, compare the last 28 days with the previous period, and note any big drop or rise.
2. Sort queries by impressions and look for searches you did not expect, good or bad.
3. Open **Pages** and check whether the number of indexed pages has suddenly changed.
4. Glance at **Manual actions**, **Security issues** and **Core Web Vitals**.
5. Inspect any new page you published that month and request indexing if it is missing.

## FAQ

**Is Google Search Console free?** Yes. There is no paid version. You only need a Google account and access to your domain or website to verify ownership.

**Do I need Search Console if I already have Google Analytics?** Yes. Analytics shows what visitors do on your site. Search Console shows what happens in Google before they arrive, including searches where people saw you but did not click, and pages Google has not indexed at all.

**Will setting up Search Console improve my rankings?** Not by itself. It is a diagnostic tool. It tells you what to fix, and the fixes are what improve rankings.

**Can I see my Google Maps or Business Profile searches in Search Console?** No. Searches and actions on your Business Profile are shown in the Business Profile performance view, not in Search Console. See [How to rank your business on Google Maps in Surat](/insights/how-to-rank-on-google-maps-in-surat) for that side.

**My web designer set it up. How do I get access?** Ask them to add your Google account as an owner under Settings, then Users and permissions. If they used a DNS record on a domain you own, you can also verify yourself with your own record.

**How long does Google keep the data?** The Performance report lets you look back up to 16 months, so it is worth setting up early even if you will not look at it often.

## Want someone to read the reports for you?

Search Console tells you what is wrong, but fixing it takes work on the website itself: new service pages, better titles, faster loading and clean redirects. That is what our [SEO service](/services/seo) does, and if the site itself is holding you back, our [web design](/services/web-design) team can rebuild it properly. Message us on WhatsApp at +91 9099245605 with your website address and we will tell you what your Search Console data is saying.
