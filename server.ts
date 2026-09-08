import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { renderSeoHtml } from './src/utils/renderSeoHtml';
import { PAGE_TO_PATH, isKnownPath, getWorkDetailPath } from './src/utils/pageRoutes';
import { CASE_STUDIES } from './src/data/caseStudies';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini Client with standard user-agent header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Full-Stack Secure API Route for Brand Concept Generator
app.post('/api/gemini/brand-concept', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API is currently unconfigured. Please configure your API key in the Settings > Secrets panel.',
      });
    }

    const { industry, prompt, mood } = req.body;

    if (!industry || !prompt) {
      return res.status(400).json({ error: 'Missing required parameters: industry and prompt' });
    }

    const systemInstruction = `You are a world-class principal Brand Designer and UI/UX Architect at Mago Labs, a high-end web design agency.
Analyze the user's business industry, description, and aesthetic mood to generate a gorgeous, precise Brand & UI Design Blueprint.
Be creative, highly modern, and authoritative. Return the result strictly in the requested JSON format.`;

    const modelPrompt = `Generate a brand and web design concept for:
- Industry: ${industry}
- Aesthetic Mood: ${mood || 'Modern/Minimalist'}
- Business Concept/Description: "${prompt}"

Return a detailed JSON object representing the design concept with the following keys:
- brandName: (Provide a premium, elegant placeholder name for this concept, e.g., "AuraDent", "Verdant Wealth")
- tagLine: (Provide a compelling, professional, punchy copywriting tagline, no longer than 8 words)
- colorPalette: (An array of exactly 5 color objects representing a cohesive design scheme. Each color object must have keys: 'hex' (exact hex code), 'name' (poetic, high-end name like 'Alabaster Silk', 'Nordic Pine'), 'role' (e.g. 'Primary Background', 'Deep Accent', 'Muted Secondary'))
- typography: (An object with keys: 'headingFont' (elegant Google Display Font, e.g. 'Playfair Display', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans'), 'bodyFont' (clean body font like 'Inter' or 'Plus Jakarta Sans'), 'rationale' (1 short sentence explaining why this pairing fits the industry))
- visualVibe: (2 short sentences describing the photographic, layout, and visual identity direction)
- coreSections: (An array of 3 sections proposed for the landing page. Each section must be an object with keys: 'title' (section name, e.g. "Interactive Pricing Sandbox"), 'concept' (1 short sentence describing a creative, custom interactive layout or component for this section, keeping in mind Mago Labs' standard of custom-engineered, lead-converting components))`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: modelPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['brandName', 'tagLine', 'colorPalette', 'typography', 'visualVibe', 'coreSections'],
          properties: {
            brandName: { type: Type.STRING },
            tagLine: { type: Type.STRING },
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['hex', 'name', 'role'],
                properties: {
                  hex: { type: Type.STRING },
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                },
              },
            },
            typography: {
              type: Type.OBJECT,
              required: ['headingFont', 'bodyFont', 'rationale'],
              properties: {
                headingFont: { type: Type.STRING },
                bodyFont: { type: Type.STRING },
                rationale: { type: Type.STRING },
              },
            },
            visualVibe: { type: Type.STRING },
            coreSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['title', 'concept'],
                properties: {
                  title: { type: Type.STRING },
                  concept: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini model.');
    }

    const conceptData = JSON.parse(text);
    return res.json(conceptData);
  } catch (error: any) {
    console.error('Error generating design concept:', error);
    return res.status(500).json({
      error: 'Failed to generate design concept.',
      details: error.message || error,
    });
  }
});

// Full-Stack Secure API Route for Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, businessName, service, message } = req.body;

    // Server-side validation
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'Name, phone, email, and message are required.' });
    }

    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      businessName: businessName || '',
      service: service || 'Website Design & Development',
      message,
    };

    // 1. Persist the lead locally into leads.json so no business details are lost
    const leadsFilePath = path.join(process.cwd(), 'leads.json');
    let leadsList = [];
    try {
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
        leadsList = JSON.parse(fileContent || '[]');
      }
    } catch (fsErr) {
      console.error('Error reading leads file, starting fresh:', fsErr);
    }

    leadsList.push(newLead);

    try {
      fs.writeFileSync(leadsFilePath, JSON.stringify(leadsList, null, 2), 'utf8');
      console.log(`Saved new lead securely to leads.json: ${newLead.id}`);
    } catch (fsWriteErr) {
      console.error('Error writing lead to disk:', fsWriteErr);
    }

    // 2. If Resend email provider key is configured, send a real email alert
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (resendApiKey) {
      try {
        const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'burhan@magolabs.in';
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Mago Labs Contact <onboarding@resend.dev>',
            to: recipient,
            subject: `New Lead: ${name} (${businessName || 'No Business'})`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; color: #333;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Inbound Enquiry</h2>
                <p>You have received a new consultation booking enquiry from your Mago Labs website.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr>
                    <td style="padding: 8px; font-weight: bold; width: 150px; background-color: #f8fafc; border: 1px solid #e2e8f0;">Name:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Email:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Phone / WhatsApp:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Business Name:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${businessName || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Interested In:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;">${service}</td>
                  </tr>
                </table>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                  <strong style="color: #475569;">Message Details:</strong>
                  <p style="white-space: pre-wrap; margin-top: 10px; color: #1e293b;">${message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                <p style="font-size: 11px; color: #94a3b8;">This is an automated notification from Mago Labs. Lead has been archived securely in leads.json.</p>
              </div>
            `,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
          console.log(`Email notification sent successfully via Resend for lead ${newLead.id}`);
        } else {
          const errText = await emailResponse.text();
          console.error(`Resend API returned error status ${emailResponse.status}:`, errText);
        }
      } catch (emailErr) {
        console.error('Error forwarding email via Resend API:', emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been successfully received! We typically reply within a few business hours.',
      leadId: newLead.id,
      emailForwarded: emailSent,
    });
  } catch (error: any) {
    console.error('Error in contact form API endpoint:', error);
    return res.status(500).json({
      error: 'Internal server error occurred while processing your request.',
      details: error.message || error,
    });
  }
});

// Full-Stack Secure API Route for AI Chat Concierge
app.post('/api/gemini/chat', async (req, res) => {
  try {
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API is currently unconfigured. Please configure your API key in the Settings > Secrets panel.',
      });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid parameters: messages array is required' });
    }

    const systemInstruction = `You are "Mago AI Concierge", an elite, professional, and helpful client-onboarding assistant representing Mago Labs.
Mago Labs is a boutique web engineering and design agency founded by Burhan Kapasi (Principal Engineer & Designer).

Contact information:
- Phone / Mobile: +919099245605 (also WhatsApp)
- Email: bkapasi72@gmail.com
- Call to Action: Users can book a free 30-minute Speed, Performance, and Local SEO Search Audit or a free Discovery Consultation.

Key agency philosophy & values:
- Custom hand-coded engineering instead of template slop or bloated visual page builders.
- Pure performance: Lightning-fast websites that routinely hit 90+ Lighthouse speed scores.
- Highly optimized: In-built, responsive, mobile-first design with standard SEO architectures that rank on Google.
- Direct conversion: Copywriting and layouts crafted purely to drive customer enquiries and business revenue (ROI).

Core Capabilities / Services:
1. Website Design & Dev: Clean custom TypeScript/React code with absolute typography alignment, motion animations, and bespoke layouts.
2. SEO Optimization: Organic search positioning, lightning-fast technical SEO, schema markup, and keyword ranking.
3. Google Business Profile: Dominating local searches, high maps exposure, review optimization, and geo-targeted ranking.
4. Copywriting: Captivating, punchy sales copy that connects and converts visitors.

Success Stories / Custom Case Studies to reference:
- Surat Textile Export House: Engineered an interactive, high-speed global fabric showroom catalog with instantaneous inventory loading.
- Chartered Accountant (CA) Portal: Created an ultra-secure client onboarding diagnostics app, integrating encrypted document vaults and digital tax season readiness checkups.
- Dentist Clinic: Engineered a seamless appointment scheduler alongside an interactive before-and-after digital smile transformation gallery.
- Pediatrician Clinic: Built a kid-friendly clinic portal featuring an interactive pediatric developmental milestones tracker and automated vaccination timeline scheduler with high healthcare-grade security.
- Solar Energy Company: Programmed a complex rooftop solar savings calculator that converts cold visitors to hot sales prospects on the spot.

Conversational Tone & Directives:
- Keep answers professional, warm, and highly structured (use bullet points or clear short paragraphs).
- Answer in the language the user is speaking (supports English, Hindi, and Gujarati fluently).
- If asked about pricing: mention that Mago Labs is a fully custom agency and pricing is bespoke based on project scope, but encourage them to book a free Discovery Call or Performance Audit for a direct quote.
- Do NOT make up any facts or clients. Stick to the facts provided.
- Always include helpful contact references or invite them to book an audit with Burhan when appropriate.`;

    // Map conversation history to Gemini SDK structure
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response received from Gemini model.');
    }

    return res.json({ response: text });
  } catch (error: any) {
    console.error('Error in AI Chat assistant:', error);
    return res.status(500).json({
      error: 'Failed to generate AI response.',
      details: error.message || error,
    });
  }
});

// Dynamic XML Sitemap Generation Endpoint for Search Engine Indexing
app.get('/sitemap.xml', (req, res) => {
  const lastmod = new Date().toISOString().split('T')[0];
  const priorities: Record<string, { priority: string; changefreq: string }> = {
    '/': { priority: '1.0', changefreq: 'daily' },
    '/services/web-design': { priority: '0.9', changefreq: 'weekly' },
    '/services/seo': { priority: '0.9', changefreq: 'weekly' },
    '/services/google-business-profile': { priority: '0.9', changefreq: 'weekly' },
    '/services/copywriting': { priority: '0.9', changefreq: 'weekly' },
    '/contact': { priority: '0.9', changefreq: 'weekly' },
    '/sitemap': { priority: '0.5', changefreq: 'monthly' },
  };
  const urls = [
    ...Object.values(PAGE_TO_PATH),
    ...CASE_STUDIES.map((cs) => getWorkDetailPath(cs.id)),
  ].map((path) => ({
    loc: `https://www.magolabs.in${path}`,
    priority: priorities[path]?.priority ?? (path.startsWith('/work/') ? '0.7' : '0.8'),
    changefreq: priorities[path]?.changefreq ?? (path.startsWith('/work/') ? 'monthly' : 'weekly'),
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.status(200).send(xml);
});

// Setup dev vs production asset serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // appType 'custom' hands index.html serving to us so we can inject per-route
    // SEO meta tags (title/description/OG/canonical) before the page reaches the
    // browser, instead of leaving that entirely to client-side JS after mount.
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const pathname = url.split('?')[0];
        const rawTemplate = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
        const transformed = await vite.transformIndexHtml(url, rawTemplate);
        const html = renderSeoHtml(transformed, pathname);
        const statusCode = isKnownPath(pathname) ? 200 : 404;
        res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Prerendering (scripts/prerender-seo.ts) already wrote a real, route-specific
    // index.html under dist/<path>/ for every known page, each with correct SEO tags
    // baked in, express.static's default directory-index behavior serves those
    // automatically. The catch-all below is a real 404 (not a silent 200) for anything
    // that wasn't prerendered (typos, retired links, etc.), rendering the client-side
    // NotFound page while still reporting the correct status to crawlers.
    app.use(express.static(distPath));

    const builtTemplate = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
    app.get('*', (req, res) => {
      const pathname = req.originalUrl.split('?')[0];
      const statusCode = isKnownPath(pathname) ? 200 : 404;
      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(builtTemplate);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
