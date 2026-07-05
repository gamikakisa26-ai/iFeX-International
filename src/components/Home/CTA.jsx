import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../Common/Button';

export default function CTA({
  eyebrow = 'Ready When You Are',
  title = 'Let\u2019s build something intelligent together',
  description = 'Tell us about your project — we\u2019ll respond within one business day with next steps.',
  buttonLabel = 'Start a Conversation',
  buttonTo = '/contact',
}) {
  return (
    <section className="section-container py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl glass-panel px-8 py-16 sm:px-16 text-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-electric-cyan opacity-10"
        />
        <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan mb-6">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
          {title}
        </h2>
        <p className="mt-5 text-white/60 max-w-xl mx-auto leading-relaxed">{description}</p>
        <div className="mt-9 flex justify-center">
          <Button Component={Link} to={buttonTo}>
            {buttonLabel}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
