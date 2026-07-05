import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../components/Common/SectionHeader';
import CTA from '../components/Home/CTA';
import { services, microServices } from '../data/servicesData';
import { getServiceIcon } from '../lib/iconMap';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="pt-40 pb-24">
      <section className="section-container">
        <SectionHeader
          eyebrow="Services"
          title="16 specializations, one accountable team"
          description="Every core service below expands into focused micro-services — mix and match what your project needs."
        />
      </section>

      <section className="section-container mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => {
          const Icon = getServiceIcon(service.icon);
          const related = microServices.filter((m) => m.parent === service.slug);
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group glass-card flex flex-col h-full p-6 hover:scale-[1.02]"
              >
                <div className="rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3 w-fit mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-4">{service.tagline}</p>

                {related.length > 0 && (
                  <ul className="mt-auto flex flex-col gap-1.5 pt-4 border-t border-white/10">
                    {related.map((m) => (
                      <li key={m.name} className="text-xs text-white/50 flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-cyan/60 shrink-0" />
                        {m.name}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </motion.div>
          );
        })}
      </section>

      <CTA
        eyebrow="Not Sure Where to Start"
        title="Tell us the problem — we'll map the right services"
        description="Most projects blend two or three of these specializations. We'll help you scope exactly what's needed."
      />
    </motion.div>
  );
}
