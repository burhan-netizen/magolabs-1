<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/324bbfb6-ac80-49d8-8d90-ab443a453a65

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Blog posts (Insights)

Posts are Markdown files in `content/insights/`, one file per post. Cover images go in `public/images/insights/` (WebP, about 1600px wide).

Each file starts with a header:

```
---
title: "Post title"
slug: "post-address"
excerpt: "One or two sentences for the post card and Google."
author: "Burhan Kapasi"
publishedDate: "2026-11-02T00:00+05:30"
coverImage: "/images/insights/post-address.webp"
---
```

The post is written below it in Markdown. Add `draft: true` to the header to hide a post. The page appears at `/insights/<slug>`.

`npm run dev` and `npm run build` turn the files into site data (`scripts/build-insights.ts`), and the build writes every post into its own page and the sitemap. Push to GitHub and Vercel publishes it.
