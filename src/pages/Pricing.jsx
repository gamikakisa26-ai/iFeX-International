import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeader from '../components/Common/SectionHeader';
import CTA from '../components/Home/CTA';
import Button from '../components/Common/Button';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// TODO: replace all pricing figures with your actual package pricing
const PRICING_TABLES = {
  Website: [
    {
      name: 'Starter',
      price: '$2,500',
      cadence: 'one-time',
      description: 'A polished marketing site to establish credibility fast.',
      features: ['Up to 5 pages', 'Responsive design', 'Basic SEO setup', '2 rounds of revisions', '30-day support'],
      highlighted: false,
    },
    {
      name: 'Growth',
      price: '$7,500',
      cadence: 'one-time',
      description: 'Custom design system and CMS for scaling content teams.',
      features: ['Up to 15 pages', 'Headless CMS integration', 'Advanced SEO & analytics', 'Custom animations', '90-day support'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      cadence: 'quoted',
      description: 'Fully bespoke platform with e-commerce or app logic.',
      features: ['Unlimited pages', 'E-commerce / booking systems', 'Multi-language support', 'Dedicated engineer', 'SLA-backed support'],
      highlighted: false,
    },
  ],
  ERP: [
    {
      name: 'Core',
      price: '$12,000',
      cadence: 'starting at',
      description: 'Single-module ERP for inventory or finance.',
      features: ['1 core module', 'Up to 10 user seats', 'Standard reporting', 'Onboarding & training', '60-day support'],
      highlighted: false,
    },
    {
      name: 'Business',
      price: '$28,000',
      cadence: 'starting at',
      description: 'Multi-module ERP connecting several departments.',
      features: ['3 core modules', 'Up to 50 user seats', 'Custom dashboards', 'Role-based permissions', '120-day support'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      cadence: 'quoted',
      description: 'Full-scale ERP across all departments and branches.',
      features: ['Unlimited modules', 'Unlimited seats', 'Multi-branch sync', 'Legacy migration included', 'Dedicated support team'],
      highlighted: false,
    },
  ],
};

function PricingCard({ tier, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl p-8 flex flex-col ${
        tier.highlighted
          ? 'glass-panel border-cyan/40 shadow-glow-cyan bg-white/[0.05]'
          : 'glass-card'
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-electric to-cyan px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
      <p className="text-sm text-white/50 mt-2 mb-6 leading-relaxed">{tier.description}</p>
      <div className="mb-6">
        <span className="text-4xl font-mono font-semibold text-white">{tier.price}</span>
        <span className="text-sm text-white/50 ml-2">{tier.cadence}</span>
      </div>
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
            <Check className="h-4 w-4 text-cyan shrink-0 mt-0.5" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        Component={Link}
        to="/contact"
        variant={tier.highlighted ? 'primary' : 'outline'}
        className="w-full"
      >
        Get Started
      </Button>
    </motion.div>
  );
}

export default function Pricing() {
  const [activeTable, setActiveTable] = useState('Website');

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="pt-40 pb-24">
      <section className="section-container">
        <SectionHeader
          eyebrow="Pricing"
          title="Transparent packages, scoped to your goals"
          description="Every engagement starts with a scoping call — these tiers are a starting point, not a ceiling."
        />

        {/* Toggle */}
        <div className="mt-10 inline-flex glass-panel rounded-full p-1.5">
          {Object.keys(PRICING_TABLES).map((table) => (
            <button
              key={table}
              onClick={() => setActiveTable(table)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 ${
                activeTable === table ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {activeTable === table && (
                <motion.span
                  layoutId="pricing-toggle-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-electric to-cyan"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{table} Packages</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-container mt-14">
        <motion.div
          key={activeTable}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PRICING_TABLES[activeTable].map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </motion.div>
      </section>

      <CTA
        eyebrow="Custom Scope"
        title="Need something between tiers?"
        description="Most enterprise engagements are scoped individually. Tell us your requirements and we'll send a tailored quote."
      />
    </motion.div>
  );
}
