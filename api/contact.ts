import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests for contact form submission
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Clean every field before it is used: trimmed, length-limited, and with HTML
    // characters escaped so nothing a visitor types can alter the alert email.
    const body = (req.body ?? {}) as Record<string, unknown>;
    const clean = (value: unknown) =>
      String(value ?? '')
        .trim()
        .slice(0, 2000)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const name = clean(body.name);
    const phone = clean(body.phone);
    const email = clean(body.email);
    const website = clean(body.website);
    const businessName = clean(body.businessName) || website;
    const service = clean(body.service);
    const source = clean(body.source);
    const message = clean(body.message) || 'No message added.';

    // The form is deliberately short: a name and a phone number are enough.
    if (!name || !phone) {
      return res.status(400).json({ error: 'A name and a phone number are required.' });
    }

    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      name,
      phone,
      email,
      businessName: businessName || '',
      service: service || 'Website Design & Development',
      source,
      message,
    };

    // 1. Best-effort persistence (temporary disk in Serverless Environments)
    const tempDir = '/tmp';
    const leadsFilePath = path.join(tempDir, 'leads.json');
    let leadsList = [];
    try {
      if (fs.existsSync(leadsFilePath)) {
        const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
        leadsList = JSON.parse(fileContent || '[]');
      }
    } catch (fsErr) {
      console.warn('Error reading temp leads, starting fresh:', fsErr);
    }

    leadsList.push(newLead);

    try {
      fs.writeFileSync(leadsFilePath, JSON.stringify(leadsList, null, 2), 'utf8');
    } catch (fsWriteErr) {
      console.error('Error writing temp lead to disk:', fsWriteErr);
    }

    // 2. Send email alert via Resend API (Recommended for Serverless)
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
                <h2 style="color: #0D0D0D; border-bottom: 3px solid #FFC53D; padding-bottom: 10px;">New Inbound Enquiry</h2>
                <p>You have received a new consultation booking enquiry from your Mago Labs website.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr>
                    <td style="padding: 8px; font-weight: bold; width: 150px; background-color: #f8fafc; border: 1px solid #e2e8f0;">Name:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Email:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${email ? `<a href="mailto:${email}">${email}</a>` : 'Not given'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Phone / WhatsApp:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Website / Business:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0;">${businessName || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Interested In:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0; color: #0D0D0D; font-weight: bold;">${service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Sent From:</td>
                    <td style="padding: 8px; border: 1px solid #e2e8f0; color: #0D0D0D; font-weight: bold;">${source || 'Website'}</td>
                  </tr>
                </table>
                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                  <strong style="color: #475569;">Message Details:</strong>
                  <p style="white-space: pre-wrap; margin-top: 10px; color: #1e293b;">${message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                <p style="font-size: 11px; color: #94a3b8;">This is an automated notification from Mago Labs.</p>
              </div>
            `,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
        } else {
          console.error(`Resend API error status: ${emailResponse.status}`);
        }
      } catch (emailErr) {
        console.error('Error forwarding email via Resend API:', emailErr);
      }
    }

    // If the alert email could not be sent, nobody would ever see this enquiry (the
    // copy on disk above is temporary). Say so, so the form can point the visitor to
    // WhatsApp or a call instead of telling them it was sent.
    if (!emailSent) {
      return res.status(502).json({
        error: 'We could not send your enquiry just now. Please message us on WhatsApp or call instead.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been successfully received!',
      leadId: newLead.id,
      emailForwarded: emailSent,
    });
  } catch (error: any) {
    console.error('Error in Vercel serverless function:', error);
    return res.status(500).json({
      error: 'Internal server error occurred while processing your request.',
    });
  }
}
