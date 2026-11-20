import { ExternalLink, Globe, MessageCircle } from 'lucide-react';

interface Platform {
  name: string;
  description: string;
  url: string | null;
  urlLabel: string;
  tag: string;
  whatsappChannel?: string;
}

const platforms: Platform[] = [
  {
    name: 'Vidyari',
    description:
      'An educational platform focused on providing study resources, learning materials, and academic content to support students across engineering and professional courses.',
    url: 'https://www.vidyari.com',
    urlLabel: 'vidyari.com',
    tag: 'Learning Platform',
  },
  {
    name: 'Engineering in Karnataka',
    description:
      'A dedicated platform providing information, guidance, and resources for engineering education and admissions in Karnataka — supporting students at every step.',
    url: null,
    urlLabel: 'Coming Soon',
    tag: 'Admission Guidance',
    whatsappChannel: process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL || 'https://whatsapp.com/channel/',
  },
  {
    name: 'EDU YODHA',
    description:
      'The main EDU YODHA platform connecting students with internship programs, skill development resources, and career opportunities across India.',
    url: 'https://eduyodha.com',
    urlLabel: 'eduyodha.com',
    tag: 'Main Platform',
  },
];

export default function PlatformsSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4] mb-3">
            Digital Presence
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-4">
            Our Digital Platforms
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            EDU YODHA operates multiple digital platforms, each designed to
            serve a specific segment of learners, students, and professionals.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(({ name, description, url, urlLabel, tag, whatsappChannel }) => (
            <div
              key={name}
              className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col gap-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Icon + Tag */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#0f172a] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#1e40af] bg-blue-50 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </div>

              {/* Name & Description */}
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2 mt-auto">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e40af] hover:text-[#06b6d4] transition-colors duration-200"
                  >
                    Visit Platform
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 cursor-default">
                    {urlLabel}
                  </span>
                )}

                {/* WhatsApp Channel button */}
                {whatsappChannel && (
                  <a
                    href={whatsappChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors w-fit"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Join WhatsApp Channel
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
