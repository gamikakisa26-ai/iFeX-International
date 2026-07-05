import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const BASE_FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Website Development', to: '/services/website-development' },
      { label: 'ERP Solutions', to: '/services/erp-solutions' },
      { label: 'Mobile Apps', to: '/services/mobile-app-development' },
      { label: 'AI & Automation', to: '/services/ai-business-automation' },
    ],
  },
];

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageCircle,
};

export default function Footer() {
  const { company } = useContent();
  const pricingVisible = company.pricingVisible !== false;
  const footerLinks = BASE_FOOTER_LINKS.map((group) => ({
    ...group,
    links: group.links.filter((link) => pricingVisible || link.to !== '/pricing'),
  }));
  const socials = Object.entries(company.socials || {}).filter(([, url]) => url);

  return (
    <footer className="relative border-t border-white/10 mt-32">
      <div className="section-container py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <img src="/logo.png" alt={`${company.name} logo`} className="h-9 w-9 object-contain" />
            <span className="font-display font-semibold text-lg text-white">
              {company.name}
            </span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            {company.heroSubtext}
          </p>
          <ul className="flex flex-col gap-2 mt-2 text-sm text-white/50">
            {company.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan" aria-hidden="true" />
                {company.email}
              </li>
            )}
            {company.phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan" aria-hidden="true" />
                {company.phone}
              </li>
            )}
            {company.location && (
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan" aria-hidden="true" />
                {company.location}
              </li>
            )}
          </ul>
        </div>

        {footerLinks.map((group) => (
          <div key={group.heading} className="flex flex-col gap-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest">
              {group.heading}
            </h4>
            <ul className="flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/50 text-sm hover:text-cyan transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 py-6">
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(([platform, href]) => {
            const Icon = SOCIAL_ICONS[platform] || Linkedin;
            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="glass-panel rounded-full p-2.5 text-white/60 hover:text-cyan hover:border-cyan/40 transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
