import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update once domain is verified
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
              via jainamchheda.com
            </p>
          </div>

          <div style="background: white; padding: 28px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">From</span><br/>
                  <span style="font-size: 15px; color: #1e293b; font-weight: 500;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Email</span><br/>
                  <a href="mailto:${email}" style="font-size: 15px; color: #0072FF; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${subject ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Subject</span><br/>
                  <span style="font-size: 15px; color: #1e293b;">${subject}</span>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px 0;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Message</span><br/>
                  <p style="font-size: 15px; color: #334155; line-height: 1.7; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
              <a href="mailto:${email}?subject=Re: ${subject || 'Your message'}"
                style="display: inline-block; background: linear-gradient(135deg, #00C6FF, #0072FF); color: white; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none;">
                Reply to ${name}
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
