---
title: "Why Is My Website So Slow? How to Check and Fix Page Speed"
slug: "why-is-my-website-slow-how-to-check-and-fix"
excerpt: "A slow website loses enquiries before visitors see your contact button. Here is how to test your speed for free, what the Core Web Vitals numbers mean, and the usual causes and fixes for a small business site."
author: "Burhan Kapasi"
publishedDate: "2026-11-27T12:00+05:30"
coverImage: "/images/insights/why-is-my-website-slow-how-to-check-and-fix.webp"
---
Most small business websites are slow for a handful of fixable reasons: **images that are far too large, too many plugins and third party scripts, a heavy theme or page builder, and cheap or distant hosting**. You can check your own site for free in two minutes with Google's [PageSpeed Insights](https://pagespeed.web.dev/). Paste your address, look at the mobile result, and check the three **Core Web Vitals**: the main content should appear within **2.5 seconds**, the page should respond to a tap within **200 milliseconds**, and the layout should not jump around. If your site fails those, the fixes below usually solve most of the problem.

Speed matters more than most owners think. The person searching for your service is usually on a phone, often on mobile data, and comparing you with two or three other businesses. If your page is still a white screen after a few seconds, they press back and call the next result. You never see that lost enquiry in any report.

## How to test your website speed (free)

You do not need to pay anyone to find out whether your site is slow.

1. Open [PageSpeed Insights](https://pagespeed.web.dev/) and paste your homepage address.
2. Make sure the **Mobile** tab is selected. Google mainly looks at the mobile version of your site, and most of your visitors are on phones.
3. Look first at the top section, **"Discover what your real users are experiencing"**. This is field data: how real Chrome users actually experienced your site over the last 28 days.
4. Then look at the **performance score** and the list of suggestions below it. This is lab data: a single simulated test.
5. Repeat for your most important pages, such as your main service page and contact page, not just the homepage.

If your site does not get enough visitors, the field data section may say there is not enough data. In that case, rely on the lab score and suggestions.

If you have Google Search Console set up, its **Core Web Vitals** report groups your slow pages together so you can see which templates have the problem. We explain how to set that up in [Google Search Console for a small business](/insights/google-search-console-setup-for-small-business).

## What the numbers mean

Google's [Web Vitals guidance](https://web.dev/articles/vitals) defines three Core Web Vitals. A page passes when at least 75 percent of visits meet the "good" level.

| Metric | What it measures in plain words | Good | Poor |
| --- | --- | --- | --- |
| Largest Contentful Paint (LCP) | How long until the main content (usually the big image or headline) appears | 2.5 seconds or less | More than 4 seconds |
| Interaction to Next Paint (INP) | How quickly the page reacts when someone taps a button or opens a menu | 200 milliseconds or less | More than 500 milliseconds |
| Cumulative Layout Shift (CLS) | How much things jump around while the page loads | 0.1 or less | More than 0.25 |

A few points that confuse owners:

- **The score out of 100 is not the same as passing Core Web Vitals.** The score comes from one lab test and changes slightly every time you run it. The real user data is what reflects your visitors.
- **You do not need 100.** A site that passes all three Core Web Vitals on mobile and feels quick is doing well. Chasing the last few points is rarely worth the money.
- **Desktop scores are usually higher.** If your designer only shows you the desktop result, ask for the mobile one.

## Does speed affect Google rankings?

Yes, but less than people claim. Google's [page experience documentation](https://developers.google.com/search/docs/appearance/page-experience) says Core Web Vitals are used by its ranking systems, but also that good page experience does not replace relevant, helpful content. A fast page about the wrong thing will not rank. A very slow page with great content can still rank, but it loses visitors after they click.

So the real reason to fix speed is **enquiries**, not just rankings. Every second of waiting on a phone is a chance for the visitor to leave. If you also run Google or Meta ads, a slow landing page means you pay for clicks from people who never see your offer.

## The 8 most common reasons a business website is slow

### 1. Huge images

This is the number one cause we see. A photo taken on a phone or downloaded from a stock site can be several megabytes, uploaded straight to the homepage and shown at a fraction of that size. The fix is to resize images to the size they are actually displayed, save them in a modern format like **WebP**, and lazy load images further down the page so they only download when the visitor scrolls to them.

### 2. Too many plugins

WordPress sites in particular collect plugins over the years: sliders, popups, chat widgets, form builders, social feeds, security tools, often several doing the same job. Each one can add its own code to every page. Remove anything you do not actively use.

### 3. A heavy theme or page builder

Many ready made themes and drag and drop builders load a large amount of code for features your site never uses. They are quick to set up but often slow on mobile. Sometimes the only real fix is a cleaner theme or a rebuild.

### 4. Third party scripts

Chat widgets, multiple tracking pixels, embedded Instagram feeds, review widgets and video embeds all load code from other companies' servers. Each one can delay your page or make taps slow to respond, which hurts INP. Keep the ones that earn their place and load the rest only when needed.

### 5. Autoplay video and sliders at the top

A full screen video or a five image slider at the top of the homepage is often the "largest content" Google waits for. Replacing it with one well optimised image and a clear headline usually improves LCP and also makes your message clearer.

### 6. Slow or distant hosting

If the server takes a long time to respond, every page waits before anything else can start. For a business whose customers are in India, use hosting with servers in India or a content delivery network (CDN) with Indian locations. We compare hosting types in [Website hosting for a small business in India](/insights/website-hosting-for-small-business-india).

### 7. No caching

Caching means the server keeps a ready made copy of each page instead of building it from scratch for every visitor. Many hosts and platforms offer it, but it is often switched off or misconfigured.

### 8. Fonts and layout shifts

Loading several custom fonts, or images without set dimensions, makes text and buttons jump as the page loads. That is what CLS measures, and it is also what makes people tap the wrong button.

## Quick fixes you can ask for this week

If you have someone managing your site, this list is a reasonable starting brief:

- Compress and resize every image on the homepage and main service pages, and convert them to WebP.
- Remove unused plugins, widgets and old tracking codes.
- Replace any homepage video or slider with a single fast image.
- Turn on page caching and, if available, a CDN.
- Set width and height on images so the layout does not shift.
- Retest in PageSpeed Insights on mobile and compare with the first result.

Note that the real user data in PageSpeed Insights covers the last 28 days, so improvements take a few weeks to show fully there. The lab score will change straight away.

## When a rebuild makes more sense than fixing

Sometimes the site is slow because of how it was built, not because of one setting. A rebuild is usually the better option when:

- The site runs on an old theme or builder that cannot be made fast without breaking the design.
- It has years of plugins and nobody knows which ones are safe to remove.
- It also looks dated, is hard to use on a phone, or does not bring enquiries.

If several of those apply, read [12 signs your business website needs a redesign](/insights/signs-your-business-website-needs-a-redesign) before paying for another round of speed fixes.

## FAQ

**What is a good page load time for a business website?** Aim for the main content to appear within 2.5 seconds on mobile, which is Google's "good" level for Largest Contentful Paint. Faster is better, but passing all three Core Web Vitals is a sensible target.

**Why is my PageSpeed score different every time I test?** The score comes from a simulated lab test, and small differences in network and server conditions change it slightly each run. Look at the real user data and the trend over several tests rather than one number.

**Will a speed plugin fix my WordPress site?** Caching and image plugins can help, but they cannot fix a bloated theme, too many scripts or poor hosting. Adding a speed plugin on top of twenty other plugins sometimes makes things worse.

**Does my website need to be fast on desktop too?** Yes, but mobile comes first. Most local searches happen on phones, and Google mainly uses the mobile version of your site for indexing and ranking.

**Is a website builder like Wix or Shopify automatically fast?** Not automatically. The platform handles hosting, but large images, many apps and heavy themes can still slow your pages. Test them the same way.

**How often should I check my website speed?** Once a month is plenty, and also after any big change such as a new plugin, theme, homepage banner or tracking code.

## Want a faster website that brings enquiries?

Speed is part of how we build every site: clean code, optimised images and fast hosting, with the contact and WhatsApp buttons visible straight away on a phone. If your current site is slow, our [web design](/services/web-design) team can rebuild it properly, and our [SEO service](/services/seo) can fix the technical issues holding your pages back. Message us on WhatsApp at +91 9099245605 with your website address and we will tell you what is slowing it down.
