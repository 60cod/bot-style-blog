import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Message from ygna.blog <noreply@ygna.blog>',
      to: ['zz6cod@gmail.com'],
      replyTo: email, // User can reply directly to the sender
      subject: 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #030213; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            <p>This email was sent from your blog contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
          </div>
        </div>
      `,
    });

    // Check if Resend returned an error
    if (data.error) {
      console.error('Resend API error:', data.error);
      return NextResponse.json(
        { error: 'Email service error: ' + (data.error.message || 'Unknown error') },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json({ 
      success: true, 
      messageId: data.data?.id || 'unknown' 
    });

  } catch (error) {
    console.error('Email sending failed:', error);

    // Handle specific Resend errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Email service configuration error' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('domain')) {
        return NextResponse.json(
          { error: 'Email domain not verified' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}