/**
 * Sanity document schema for a single Insights blog post. Add this file (and the
 * icon options below) to your Sanity Studio's schema — see /sanity/README.md for
 * the full one-time setup. Once it's live, every post is written and published
 * from the Studio's login-protected dashboard; nothing in the website codebase
 * needs to change.
 */
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Generates the page URL: magolabs.in/insights/this-value. Click "Generate" after typing a title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the Insights list page (1–2 sentences).',
      validation: (Rule: any) => Rule.required().max(220),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Performance', value: 'Web Performance' },
          { title: 'Local SEO', value: 'Local SEO' },
          { title: 'Copywriting', value: 'Copywriting' },
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Business Growth', value: 'Business Growth' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Cover Icon',
      type: 'string',
      description: 'Icon shown on the post card and article header (no photography needed).',
      options: {
        list: [
          { title: 'Speed / Performance (Zap)', value: 'Zap' },
          { title: 'Local / Maps (MapPin)', value: 'MapPin' },
          { title: 'Copywriting (PenTool)', value: 'PenTool' },
          { title: 'SEO / Search (Search)', value: 'Search' },
          { title: 'Growth (TrendingUp)', value: 'TrendingUp' },
          { title: 'Trust / Security (ShieldCheck)', value: 'ShieldCheck' },
          { title: 'General (BookOpen)', value: 'BookOpen' },
        ],
      },
      initialValue: 'BookOpen',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Burhan Kapasi',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metaTitle',
      title: 'SEO Title (optional)',
      type: 'string',
      description: 'Overrides the browser tab / Google search title. Leave blank to reuse the Title above.',
    },
    {
      name: 'metaDescription',
      title: 'SEO Description (optional)',
      type: 'text',
      rows: 2,
      description: 'Overrides the Google search snippet. Leave blank to reuse the Excerpt above.',
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
};
