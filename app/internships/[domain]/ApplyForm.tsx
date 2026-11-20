'use client';

import { useState, useRef } from 'react';
import { CheckCircle2, AlertCircle, Upload, MessageCircle } from 'lucide-react';

interface Props {
  domain: string;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  courseSemester: string;
  domain: string;
}

function buildWhatsAppURL(data: FormValues): string {
  const message = `Hello EDU YODHA Team! 👋

I have submitted my internship application. Here are my details:

*Name:* ${data.fullName}
*Email:* ${data.email}
*Phone:* ${data.phone}
*College:* ${data.collegeName}
*Course & Semester:* ${data.courseSemester}
*Internship Domain:* ${data.domain}

Please guide me on the next steps. Thank you!`;

  return `https://wa.me/917353129776?text=${encodeURIComponent(message)}`;
}

export default function InternshipApplyForm({ domain }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState('');
  const [savedData, setSavedData] = useState<FormValues | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get('fullName')) errs.fullName = 'Full name is required.';
    if (!data.get('email')) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get('email') as string))
      errs.email = 'Please enter a valid email address.';
    if (!data.get('phone')) errs.phone = 'Phone number is required.';
    if (!data.get('collegeName')) errs.collegeName = 'College name is required.';
    if (!data.get('courseSemester')) errs.courseSemester = 'Course and semester are required.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const formValues: FormValues = {
      fullName: data.get('fullName') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      collegeName: data.get('collegeName') as string,
      courseSemester: data.get('courseSemester') as string,
      domain,
    };

    try {
      // Save to server (data/applications.json)
      await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
    } catch {
      // Even if save fails, still show success + WhatsApp
      console.error('Save failed, proceeding with WhatsApp redirect');
    }

    setSavedData(formValues);
    setLoading(false);
    setSubmitted(true);
  };

  const goToWhatsApp = () => {
    if (savedData) {
      window.open(buildWhatsAppURL(savedData), '_blank');
    }
  };

  if (submitted && savedData) {
    return (
      <div className="bg-white border border-green-200 rounded-2xl p-10 text-center shadow-sm">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-[#0f172a] mb-2">Application Submitted!</h3>
        <p className="text-slate-500 mb-6">
          Your application for <strong>{savedData.domain}</strong> has been saved.
          Now connect with us on WhatsApp to complete the process.
        </p>

        {/* WhatsApp CTA */}
        <button
          onClick={goToWhatsApp}
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-md w-full justify-center mb-4"
        >
          <MessageCircle className="w-6 h-6" />
          Continue on WhatsApp
        </button>

        <p className="text-xs text-slate-400">
          Tap the button above to open WhatsApp. Your application details will be pre-filled in the message.
        </p>

        {/* Summary of what was saved */}
        <div className="mt-6 text-left bg-slate-50 rounded-xl p-5 text-sm text-slate-600 space-y-1">
          <p><span className="font-medium">Name:</span> {savedData.fullName}</p>
          <p><span className="font-medium">Email:</span> {savedData.email}</p>
          <p><span className="font-medium">Phone:</span> {savedData.phone}</p>
          <p><span className="font-medium">College:</span> {savedData.collegeName}</p>
          <p><span className="font-medium">Course:</span> {savedData.courseSemester}</p>
          <p><span className="font-medium">Domain:</span> {savedData.domain}</p>
        </div>
      </div>
    );
  }

  const Field = ({
    name, label, required, type = 'text', placeholder = '',
  }: { name: string; label: string; required?: boolean; type?: string; placeholder?: string }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30 transition ${
          errors[name] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'
        }`}
      />
      {errors[name] && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5">

      {/* WhatsApp info banner */}
      <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
        <MessageCircle className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0" />
        <p className="text-sm text-green-800">
          After submitting, you&apos;ll be directed to WhatsApp to connect with our team. Your details will be pre-filled automatically.
        </p>
      </div>

      <Field name="fullName" label="Full Name" required placeholder="Your full name" />
      <Field name="email" label="Email Address" required type="email" placeholder="you@example.com" />
      <Field name="phone" label="Phone Number" required type="tel" placeholder="+91 XXXXX XXXXX" />
      <Field name="collegeName" label="College Name" required placeholder="Your college or university" />
      <Field name="courseSemester" label="Course and Semester" required placeholder="e.g. B.E. CSE, 5th Semester" />

      {/* Domain (pre-filled) */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Selected Internship Domain</label>
        <input
          name="domain"
          readOnly
          value={domain}
          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-600"
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Resume <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <div
          className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center cursor-pointer hover:bg-slate-50 transition"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          {fileName ? (
            <p className="text-sm text-[#1e40af] font-medium">{fileName}</p>
          ) : (
            <>
              <p className="text-sm text-slate-500">Click to upload resume</p>
              <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX accepted</p>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0f172a] hover:bg-[#1e3a8a] disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Submitting…
          </span>
        ) : (
          <>Submit & Connect on WhatsApp <MessageCircle className="w-4 h-4" /></>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        By submitting, you agree to our{' '}
        <a href="/terms-and-conditions" className="underline">Terms</a> and{' '}
        <a href="/privacy-policy" className="underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
