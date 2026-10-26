import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { personalInfo } from '@/data/content';
import { escapeEmailHtml, validateContactPayload } from '@/lib/contact-validation';
import { takeContactRateLimitToken } from '@/lib/contact-rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  let rawPayload: unknown;
  try {
    rawPayload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Please submit a valid contact form.' }, { status: 400 });
  }

  const validation = validateContactPayload(rawPayload);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { name, email, subject, message, website } = validation.data;
  // A hidden honeypot catches simple bots without adding friction for people.
  if (website) return NextResponse.json({ success: true }, { status: 200 });

  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const clientKey = forwardedFor || req.headers.get('x-real-ip') || 'unknown-client';
  const rateLimit = takeContactRateLimitToken(clientKey);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
    );
  }

  const safeName = escapeEmailHtml(name);
  const safeEmail = escapeEmailHtml(email);
  const safeSubject = escapeEmailHtml(subject);
  const safeMessage = escapeEmailHtml(message);
  const replySubject = encodeURIComponent(`Re: ${subject || 'Your message'}`);

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['jbchheda03@gmail.com'],
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #00C6FF, #0072FF); padding: 24px; border-radius: 8px 8px 0 0; margin-bottom: 0;">
            <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">
              New Portfolio Message
            </h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">
              via ${escapeEmailHtml(personalInfo.siteUrl)}
            </p>
          </div>

          <div style="background: white; padding: 28px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">From</span><br/>
                  <span style="font-size: 15px; color: #1e293b; font-weight: 500;">${safeName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Email</span><br/>
                  <a href="mailto:${encodeURIComponent(email)}" style="font-size: 15px; color: #0072FF; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Subject</span><br/>
                  <span style="font-size: 15px; color: #1e293b;">${safeSubject}</span>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Message</span><br/>
                  <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 8px 0 0; white-space: pre-wrap;">${safeMessage}</p>
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
              <a href="mailto:${encodeURIComponent(email)}?subject=${replySubject}"
                style="display: inline-block; background: linear-gradient(135deg, #00C6FF, #0072FF); color: white; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none;">
                Reply to ${safeName}
              </a>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
