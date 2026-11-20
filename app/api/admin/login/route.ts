import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'eduyodha-fallback-secret'
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { username: string; password: string };

    const validUser = body.username === process.env.ADMIN_USERNAME;
    const validPass = body.password === process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      return NextResponse.json({ success: false, error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = await new SignJWT({ role: 'admin', username: body.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .setIssuedAt()
      .sign(JWT_SECRET);

    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });
    return res;
  } catch (err) {
    console.error('[admin/login]', err);
    return NextResponse.json({ success: false, error: 'Login failed.' }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete('admin_token');
  return res;
}
