import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Sparkles, Handshake, TrendingUp } from 'lucide-react';
import SectionHeader from '../components/Common/SectionHeader';
import CTA from '../components/Home/CTA';
import { useContent } from '../context/ContentContext';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: 'Security First',
    detail: 'We treat security as a foundation, not an afterthought bolted on before launch.',
  },
  {
    icon: Sparkles,
    title: 'Craft Over Shortcuts',
    detail: 'Every interface and system is built to a standard we would put our own name on.',
  },
  {
    icon: Handshake,
    title: 'Transparent Partnership',
    detail: 'Clear timelines, honest trade-offs, and no surprises in scope or cost.',
  },
  {
    icon: TrendingUp,
    title: 'Built for Growth',
    detail: 'We design systems that flex with your business, not ones you outgrow in a year.',
  },
];

export default function About() {
  const { company } = useContent();

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" className="pt-40 pb-24">
      <section className="section-container">
        <SectionHeader
          eyebrow={`About ${company.name}`}
          title="A technical partner built for the long run"
          description={`${company.name} was founded on a simple premise: businesses deserve enterprise-grade engineering without enterprise-grade friction.`}
          align="left"
        />
      </section>

      {/* Mission & Vision */}
      <section className="section-container mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-8"
        >
          <div className="rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3 w-fit mb-5">
            <Target className="h-6 w-6 text-cyan" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
          <p className="text-white/60 leading-relaxed">
            {company.mission}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-8"
        >
          <div className="rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3 w-fit mb-5">
            <Eye className="h-6 w-6 text-cyan" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Our Vision</h3>
          <p className="text-white/60 leading-relaxed">
            {company.vision}
          </p>
        </motion.div>
      </section>

      {/* Core values timeline */}
      <section className="section-container py-24">
        <SectionHeader
          eyebrow="How We Operate"
          title="Core values, in practice"
          description="Principles that shape every engagement, from kickoff call to post-launch support."
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric/60 via-cyan/60 to-transparent md:-translate-x-1/2"
          />
          <div className="flex flex-col gap-10 md:gap-16">
            {CORE_VALUES.map((value, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    isEven ? 'md:pr-12' : 'md:ml-auto md:pl-12 md:flex-row-reverse md:text-right'
                  }`}
                >
                  <span className="absolute left-6 md:left-auto md:top-1 top-1 h-3 w-3 rounded-full bg-cyan shadow-glow-cyan -translate-x-1/2 md:translate-x-0" style={isEven ? { right: '-1.6rem' } : { left: '-1.6rem' }} />
                  <div className="glass-card p-6 ml-12 md:ml-0 flex-1">
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      <value.icon className="h-5 w-5 text-cyan shrink-0" aria-hidden="true" />
                      <h3 className="text-base font-semibold text-white">{value.title}</h3>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">{value.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Work With Us"
        title="See if iFeX is the right fit"
        description="Book a short call and we'll tell you honestly whether we're the right partner for your project."
      />
    </motion.div>
  );
}
