import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: MessageCircle,
};

export default function ContactCard() {
  const { company } = useContent();

  const channels = [
    company.email && { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    company.phone && { icon: Phone, label: 'Phone', value: company.phone, href: `tel:${company.phone.replace(/[^+\d]/g, '')}` },
    company.location && { icon: MapPin, label: 'Location', value: company.location, href: null },
  ].filter(Boolean);

  const socials = Object.entries(company.socials || {}).filter(([, url]) => url);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl p-[1px] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-electric-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="relative rounded-3xl glass-panel bg-navy/80 p-8 sm:p-10 h-full flex flex-col gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Let&rsquo;s talk</h3>
          <p className="text-white/55 text-sm leading-relaxed">
            Reach the {company.name} team directly — we typically respond within one business day.
          </p>
        </div>

        <ul className="flex flex-col gap-5">
          {channels.map((channel) => {
            const content = (
              <div className="flex items-center gap-4">
                <span className="shrink-0 rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3">
                  <channel.icon className="h-5 w-5 text-cyan" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">{channel.label}</p>
                  <p className="text-sm font-medium text-white">{channel.value}</p>
                </div>
              </div>
            );
            return (
              <li key={channel.label}>
                {channel.href ? (
                  <a href={channel.href} className="block rounded-xl transition-transform duration-200 hover:translate-x-1">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>

        {socials.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Follow {company.name}</p>
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
        )}
      </div>
    </motion.div>
  );
}
