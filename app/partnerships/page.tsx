'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, Building2, Globe, Users, Handshake,
  BookOpen, Cpu, FileText, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';

const partnerTypes = [
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Colleges & Universities', desc: 'Partner with EDU YODHA to bring internship programs and skill development to your students.' },
  { icon: <Building2 className="w-6 h-6" />, title: 'Educational Institutions', desc: 'Collaborate with us to expand your educational offerings and digital reach.' },
  { icon: <Cpu className="w-6 h-6" />, title: 'Technology Companies', desc: 'Partner with EDU YODHA to co-develop technology solutions and educational programs.' },
  { icon: <Users className="w-6 h-6" />, title: 'Training Partners', desc: 'Join our network of training partners to deliver skill development programs.' },
  { icon: <BookOpen className="w-6 h-6" />, title: 'Academic Content Creators', desc: 'Collaborate on creating quality educational content and learning resources.' },
  { icon: <Handshake className="w-6 h-6" />, title: 'Industry Collaborators', desc: 'Build meaningful connections between industry and education through our platform.' },
];

export default function PartnershipsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (d: FormData) => {
    const e: Record<string, string> = {};
    if (!d.get('orgName')) e.orgName = 'Organization name is required.';
    if (!d.get('contactPerson')) e.contactPerson = 'Contact person name is required.';
    if (!d.get('email')) e.email = 'Email is required.';
    if (!d.get('partnerInterest')) e.partnerInterest = 'Please describe your interest.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const F = ({ name, label, required, placeholder = '' }: { name: string; label: string; required?: boolean; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
      <input name={name} placeholder={placeholder} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30 transition ${errors[name] ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
      {errors[name] && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors[name]}</p>}
    </div>
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Partnerships</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Let&apos;s Build Something Meaningful Together
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            EDU YODHA welcomes collaboration with educational institutions, technology companies, and industry partners to create meaningful opportunities.
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Partnership Opportunities</h2>
            <p className="text-slate-500 max-w-xl mx-auto">We collaborate with a wide range of partners to advance education and technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map((p) => (
              <div key={p.title} className="border border-slate-200 rounded-2xl p-6 hover:border-[#1e40af] hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1e40af] mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="bg-slate-50 border-t py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Become a Partner</h2>
            <p className="text-slate-500">Fill out the enquiry form and our team will get in touch with you.</p>
          </div>

          {submitted ? (
            <div className="bg-white border border-green-200 rounded-2xl p-10 text-center shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">Enquiry Received!</h3>
              <p className="text-slate-500">Thank you for your interest. Our team will review your enquiry and reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5">
              <F name="orgName" label="Organization Name" required placeholder="Your organization name" />
              <F name="contactPerson" label="Contact Person" required placeholder="Your name" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                <input name="email" type="email" placeholder="you@organization.com" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30 transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Organization Type</label>
                <select name="orgType" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30">
                  <option value="">Select type</option>
                  <option>College / University</option>
                  <option>Educational Institution</option>
                  <option>Technology Company</option>
                  <option>Training Organization</option>
                  <option>Content Creator / Publisher</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Partnership Interest <span className="text-red-500">*</span></label>
                <textarea name="partnerInterest" rows={4} placeholder="Describe how you'd like to partner with EDU YODHA..." className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30 resize-none transition ${errors.partnerInterest ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
                {errors.partnerInterest && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.partnerInterest}</p>}
              </div>
              <button type="submit" className="w-full bg-[#0f172a] hover:bg-[#1e3a8a] text-white font-semibold py-4 rounded-xl transition-colors">
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
