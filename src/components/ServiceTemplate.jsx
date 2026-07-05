import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import Button from './Common/Button';
import CTA from './Home/CTA';
import { getServiceIcon } from '../lib/iconMap';

/**
 * ServiceTemplate
 * Generic detail-page layout shared by all 8 core services.
 * Pass the matching object from `src/data/servicesData.js` as `serviceData`.
 */
export default function ServiceTemplate({ serviceData }) {
  if (!serviceData) return null;
  const Icon = getServiceIcon(serviceData.icon);

  return (
    <div className="pt-40 pb-24">
      {/* Header */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>

          <div className="inline-flex rounded-2xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-5 mb-4">
            <Icon className="h-10 w-10 text-cyan" aria-hidden="true" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            {serviceData.category}
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white leading-[1.1]">
            {serviceData.title}
          </h1>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">{serviceData.description}</p>

          <div className="mt-8">
            <Button Component={Link} to="/contact">
              Discuss Your Project
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Metric strip */}
      {serviceData.metric && (
        <section className="section-container mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel rounded-2xl px-8 py-8 flex items-center gap-6"
          >
            <span className="text-4xl sm:text-5xl font-mono font-semibold gradient-text">
              {serviceData.metric.value}
            </span>
            <span className="text-sm text-white/50 uppercase tracking-widest max-w-[16rem]">
              {serviceData.metric.label}
            </span>
          </motion.div>
        </section>
      )}

      {/* Features */}
      <section className="section-container py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">What&rsquo;s included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {serviceData.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card flex items-center gap-4 p-5"
            >
              <span className="shrink-0 rounded-full bg-cyan/15 p-1.5">
                <Check className="h-4 w-4 text-cyan" aria-hidden="true" />
              </span>
              <span className="text-sm text-white/80">{feature}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white/[0.02] border-y border-white/10 py-24">
        <div className="section-container">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12">How we work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {serviceData.process.map((phase, i) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative glass-card p-6"
              >
                <span className="text-xs font-mono text-cyan/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">{phase.step}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{phase.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Get Started"
        title={`Ready to talk ${serviceData.title.toLowerCase()}?`}
        description="Share your goals and we'll come back with a scoped plan and timeline."
      />
    </div>
  );
}
