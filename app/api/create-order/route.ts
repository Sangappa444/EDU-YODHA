import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const body = await req.json() as { amount: number; currency?: string; receipt?: string };
    const { amount, currency = 'INR', receipt = `order_${Date.now()}` } = body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency,
      receipt,
    });

    return NextResponse.json({ success: true, order });
  } catch (err: unknown) {
    console.error('Razorpay order creation error:', err);
    return NextResponse.json({
      success: false,
      error: 'Failed to create order.'
    }, { status: 500 });
  }
}
