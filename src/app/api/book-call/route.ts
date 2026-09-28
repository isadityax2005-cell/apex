import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, consent, honeypot, residence } = body;

    // Honeypot spam check - bots fill this hidden field
    if (honeypot) {
      console.warn('Spam detected via honeypot field');
      return NextResponse.json({ success: true, message: 'Received' }); // silently ignore spam
    }

    // Required fields validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid full name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 6) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number with country code.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'You must accept the privacy policy to proceed.' },
        { status: 400 }
      );
    }

    // Process valid inquiry
    console.log('[LEAD] New booking inquiry received:', {
      name,
      email,
      phone,
      residence: residence || 'General Inquiry',
      message: message || 'N/A',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "We've received your request / Thank you. Our sales manager will review your message and reply within one business day.",
    });
  } catch (error) {
    console.error('API submission error:', error);
    return NextResponse.json(
      { error: 'Oops! Something went wrong while submitting the form. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
