'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, BookOpen, Briefcase, Target, TrendingUp,
  Star, Download, ArrowRight, Shield, IndianRupee
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
}
interface RazorpayInstance { open(): void; }
interface RazorpayResponse { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string; }

const GUIDE_FEATURES = [
  'Complete career roadmap for engineering & technology students',
  'Step-by-step internship hunting guide',
  'Resume & LinkedIn profile optimization tips',
  'Interview preparation strategies',
  'How to build a strong portfolio',
  'Salary negotiation basics for freshers',
  'Top in-demand skills in 2025–26',
  'Domain-wise career paths (Tech, Marketing, Analytics & more)',
  'Recommended certifications and free learning resources',
  'Common mistakes to avoid when starting your career',
];

const TESTIMONIALS = [
  { name: 'Priya R.', college: 'VTU Engineering Student', text: 'This guide helped me land my first internship. Very practical and easy to follow.' },
  { name: 'Rahul M.', college: 'B.Tech CSE, 3rd Year', text: 'The resume tips alone were worth it. Got interview calls within a week of updating my resume.' },
  { name: 'Anjali K.', college: 'BCA Final Year', text: 'Clear roadmap. Exactly what I needed to figure out what to do after graduation.' },
];

export default function CareerGuidePage() {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async () => {
    if (!name.trim()) { setFormError('Please enter your name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFormError('Please enter a valid email.'); return; }
    if (!phone.trim()) { setFormError('Please enter your phone number.'); return; }
    setFormError('');
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load payment gateway. Please check your internet connection.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500, currency: 'INR', receipt: `cg_${Date.now()}` }),
      });
      const data = await res.json() as { success: boolean; order?: { id: string; amount: number; currency: string } };

      if (!data.success || !data.order) {
        alert('Could not initiate payment. Please try again.');
        setLoading(false);
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'EDU YODHA LLP',
        description: 'Career Guide — ₹500',
        order_id: data.order.id,
        prefill: { name, email, contact: phone },
        theme: { color: '#1e40af' },
        handler: (response: RazorpayResponse) => {
          console.log('Payment success:', response);
          setPaid(true);
          setLoading(false);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (paid) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f172a] mb-3">Payment Successful! 🎉</h1>
          <p className="text-slate-500 mb-6">
            Thank you, <strong>{name}</strong>! Your Career Guide purchase is confirmed.
            We&apos;ll send the guide to <strong>{email}</strong> shortly.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm text-slate-600 font-medium mb-2">What happens next:</p>
            <ul className="text-sm text-slate-500 space-y-1">
              <li>✉️ Guide will be emailed to you within 24 hours</li>
              <li>💬 Reach us on WhatsApp if you don&apos;t receive it</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/917353129776?text=${encodeURIComponent(`Hi! I purchased the EDU YODHA Career Guide.\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlease share the guide. Thank you!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1ebe5d] transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
                Career Development
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                EDU YODHA<br />
                <span className="text-cyan-400">Career Guide</span>
              </h1>
              <p className="text-blue-100 text-lg mb-6">
                A comprehensive, practical guide to help engineering and technology students navigate their career journey — from internships to job offers.
              </p>
              <div className="flex items-center gap-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-blue-100 text-sm">Trusted by students across Karnataka</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur rounded-full px-5 py-2.5">
                <IndianRupee className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold text-xl">500</span>
                <span className="text-blue-200 text-sm">one-time purchase</span>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Career Guide</p>
                  <p className="text-3xl font-bold text-[#0f172a]">₹500</p>
                </div>
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-[#1e40af]" />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30"
                  />
                </div>
                {formError && (
                  <p className="text-xs text-red-500">{formError}</p>
                )}
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Processing…
                  </span>
                ) : (
                  <>Pay ₹500 — Get Guide <ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure Payment</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Digital Delivery</span>
              </div>
              <p className="text-xs text-center text-slate-400 mt-2">Powered by Razorpay</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">What&apos;s Inside the Guide</h2>
            <p className="text-slate-500 max-w-xl mx-auto">10 practical chapters covering everything you need to launch your career confidently.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {GUIDE_FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-[#1e40af]/30 hover:bg-blue-50/30 transition-all">
                <div className="w-6 h-6 rounded-full bg-[#1e40af] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-600 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 border-y py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Target className="w-6 h-6" />, title: 'Goal-Oriented', desc: 'Clear action steps for each stage of your career journey.' },
            { icon: <Briefcase className="w-6 h-6" />, title: 'Industry Relevant', desc: 'Based on current hiring trends in Indian tech companies.' },
            { icon: <TrendingUp className="w-6 h-6" />, title: 'Practical & Actionable', desc: 'No fluff — only practical advice you can apply immediately.' },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1e40af] mx-auto mb-4">{b.icon}</div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">{b.title}</h3>
              <p className="text-slate-500 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0f172a] text-center mb-12">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-600 text-sm mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-[#0f172a] text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0f172a] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Get Your Career Guide Today</h2>
          <p className="text-slate-400 mb-6">One-time purchase. Lifetime access. Start building your career with confidence.</p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-[#1e40af] hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Buy Now — ₹500 <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
