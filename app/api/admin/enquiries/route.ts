import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { connectDB } from '@/lib/db';
import { Enquiry } from '@/lib/models/Enquiry';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'eduyodha-fallback-secret'
);

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  try { await jwtVerify(token, JWT_SECRET); return true; }
  catch { return false; }
}

export async function GET(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectDB();
  const enquiries = await Enquiry.find().sort({ submittedAt: -1 }).lean();
  return NextResponse.json({ total: enquiries.length, enquiries });
}

export async function PATCH(req: NextRequest) {
  if (!await verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json() as { id: string; status: string };
  await connectDB();
  const updated = await Enquiry.findByIdAndUpdate(body.id, { status: body.status }, { new: true });
  return NextResponse.json({ success: true, enquiry: updated });
}
