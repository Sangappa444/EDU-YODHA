import Link from "next/link";
import { MapPin, Mail } from "lucide-react";

interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLinkItem[];
}

const columns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "Internships", href: "/internships" },
      { label: "Career Guide", href: "/career-guide" },
      { label: "Learning", href: "/learning" },
      { label: "Skill Development", href: "/services#skill-development" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms-and-conditions" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#0f172a] text-slate-300"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 mb-4 group"
              aria-label="EDU YODHA LLP Home"
            >
              <span className="text-xl font-extrabold text-white tracking-tight">
                EDU{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #60a5fa, #06b6d4)",
                  }}
                >
                  YODHA
                </span>
              </span>
              <span className="text-xs font-medium text-slate-400 ml-1 tracking-wide">
                LLP
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Empowering Education Through Technology. Building opportunities
              for the next generation through digital learning, skill
              development, and innovative programs.
            </p>

            {/* Registered Office Address */}
            <div className="mt-5 space-y-3">
              <a
                href="https://maps.google.com/?q=Innov8+Prestige+Tech+Platina+Kadubeesanahalli+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 group"
              >
                <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <span>
                  Innov8, Prestige Tech Platina,<br />
                  Kadubeesanahalli,<br />
                  Bengaluru, Karnataka, India.
                </span>
              </a>
              <a
                href="mailto:eduyodha1@gmail.com"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <span>eduyodha1@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Cols 2–4: Links */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              &copy; 2026 EDU YODHA LLP. All Rights Reserved.
            </p>
            <p className="text-xs text-slate-600">
              Registered in India &middot; Karnataka
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
