import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../Common/SectionHeader';
import { services } from '../../data/servicesData';
import { getServiceIcon } from '../../lib/iconMap';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ServicesOverview() {
  return (
    <section className="section-container py-16 sm:py-24">
      <SectionHeader
        eyebrow="What We Do"
        title="Full-stack solutions, engineered end to end"
        description="From first pixel to production infrastructure, every service is built by the same team — no handoffs, no gaps."
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      >
        {services.map((service) => {
          const Icon = getServiceIcon(service.icon);
          return (
            <motion.div key={service.slug} variants={item}>
              <Link
                to={`/services/${service.slug}`}
                className="group glass-card block h-full p-7 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:text-cyan group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{service.tagline}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex justify-center mt-12">
        <Link
          to="/services"
          className="text-sm font-semibold text-cyan hover:text-white transition-colors duration-200"
        >
          View all 16 services →
        </Link>
      </div>
    </section>
  );
}
