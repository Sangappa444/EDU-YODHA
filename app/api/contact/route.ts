import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Enquiry } from '@/lib/models/Enquiry';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;

    // Server-side validation
    const errors: string[] = [];
    if (!body.fullName || typeof body.fullName !== 'string') errors.push('Full name is required.');
    if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email as string)) errors.push('Valid email is required.');
    if (!body.subject || typeof body.subject !== 'string') errors.push('Subject is required.');
    if (!body.message || typeof body.message !== 'string') errors.push('Message is required.');
    if (errors.length) return NextResponse.json({ success: false, errors }, { status: 400 });

    await connectDB();

    const enquiryId = `ENQ-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    await Enquiry.create({
      enquiryId,
      fullName: String(body.fullName).trim(),
      email:    String(body.email).trim().toLowerCase(),
      phone:    String(body.phone || '').trim(),
      subject:  String(body.subject).trim(),
      message:  String(body.message).trim(),
    });

    return NextResponse.json({ success: true, id: enquiryId });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ success: false, error: 'Failed to send enquiry.' }, { status: 500 });
  }
}
