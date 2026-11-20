import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Application } from '@/lib/models/Application';

function validateBody(body: Record<string, unknown>) {
  const errors: string[] = [];
  if (!body.fullName || typeof body.fullName !== 'string') errors.push('fullName is required');
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('valid email is required');
  if (!body.phone || typeof body.phone !== 'string') errors.push('phone is required');
  if (!body.collegeName || typeof body.collegeName !== 'string') errors.push('collegeName is required');
  if (!body.courseSemester || typeof body.courseSemester !== 'string') errors.push('courseSemester is required');
  if (!body.domain || typeof body.domain !== 'string') errors.push('domain is required');
  return errors;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const errors = validateBody(body);
    if (errors.length) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    await connectDB();

    const appId = `APP-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const application = await Application.create({
      applicationId:  appId,
      fullName:       String(body.fullName).trim(),
      email:          String(body.email).trim().toLowerCase(),
      phone:          String(body.phone).trim(),
      collegeName:    String(body.collegeName).trim(),
      courseSemester: String(body.courseSemester).trim(),
      domain:         String(body.domain).trim(),
    });

    return NextResponse.json({ success: true, id: application.applicationId });
  } catch (err) {
    console.error('[submit-application]', err);
    return NextResponse.json({ success: false, error: 'Failed to save application.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const all = await Application.find().sort({ submittedAt: -1 }).lean();
    return NextResponse.json({ total: all.length, applications: all });
  } catch (err) {
    console.error('[submit-application GET]', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch.' }, { status: 500 });
  }
}
